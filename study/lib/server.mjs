import http from 'node:http';
import { readGeneration, readCurrentDigest } from './publication.mjs';
import { uiMembers } from './ui-bundle.mjs';

const securityHeaders=Object.freeze({
  'Content-Security-Policy':"default-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self'; style-src-attr 'none'; connect-src 'self'; img-src 'self'; font-src 'none'; worker-src 'none'; child-src 'none'; frame-src 'none'; object-src 'none'; media-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
  'X-Content-Type-Options':'nosniff',
  'Referrer-Policy':'no-referrer',
  'Cross-Origin-Resource-Policy':'same-origin',
});
const fixedMembers=new Set(['reader.json','catalog.json','report.json','graph.json','search.json',...uiMembers.map(member=>member.path)]);
const hashPattern=/^[a-f0-9]{64}$/;
function routeMembers(generation){
  const content=new Set(generation.catalog.items.map(item=>item.output));
  return new Map(generation.members.filter(member=>fixedMembers.has(member.path)||content.has(member.path)&&/^content\/[a-f0-9]{64}\.md$/.test(member.path)||/^assets\/[a-f0-9]{64}\.(?:png|jpe?g|webp)$/.test(member.path)).map(member=>[member.path,member]));
}
function rawValues(request,name){const values=[];for(let i=0;i<request.rawHeaders.length;i+=2)if(request.rawHeaders[i].toLowerCase()===name)values.push(request.rawHeaders[i+1]);return values;}
function guarded(request,authority,origin){
  const hosts=rawValues(request,'host'),origins=rawValues(request,'origin'),sites=rawValues(request,'sec-fetch-site'),destinations=rawValues(request,'sec-fetch-dest');
  return hosts.length===1&&hosts[0]===authority&&origins.length<=1&&(!origins.length||origins[0]===origin)&&sites.length<=1&&(!sites.length||['same-origin','none'].includes(sites[0]))&&destinations.length<=1&&(!destinations.length||!['worker','sharedworker','serviceworker'].includes(destinations[0]));
}
function targetValid(target){return typeof target==='string'&&target.length<=2048&&target.startsWith('/')&&!target.startsWith('//')&&!/[^A-Za-z0-9_./-]/.test(target)&&!target.slice(1).includes('//')&&!target.split('/').some(part=>part==='.'||part==='..');}

export function studyServerOrigin(port=4173){
  if(!Number.isInteger(port)||port<1||port>65535)throw Error('Invalid study server port');
  return new URL(`http://127.0.0.1:${port}`).origin;
}

// Only whole-generation verification enters this process-local cache. HTTP
// request members are looked up in it, never opened as filesystem paths.
export async function startStudyServer(root,{port=4173}={}){
  // Match browser origin serialization, including explicit HTTP port 80.
  const origin=studyServerOrigin(port),authority=new URL(origin).host;
  const seenSockets=new WeakSet(),transports=new Set();
  const cache=new Map(),pending=new Map();let current,currentError=false,refreshing;
  function admit(generation){
    if(!cache.has(generation.digest))cache.set(generation.digest,{generation,members:routeMembers(generation)});
    return cache.get(generation.digest);
  }
  async function load(digest){
    if(!hashPattern.test(digest))throw Error('Unavailable generation');
    if(cache.has(digest))return cache.get(digest);
    if(!pending.has(digest)){
      const promise=readGeneration(root,digest).then(admit).finally(()=>pending.delete(digest));pending.set(digest,promise);
    }
    return pending.get(digest);
  }
  async function refresh(){
    // Generations are immutable and fully verified on admission, so an unchanged
    // pointer reuses that verified snapshot instead of re-hashing every member.
    if(!refreshing)refreshing=(async()=>{
      try{current=await load(await readCurrentDigest(root));currentError=false;}
      catch{currentError=true;if(!current)throw Error('No verified current generation');}
    })().finally(()=>{refreshing=undefined;});
    await refreshing;
  }
  // No socket is opened until the complete current generation is verified.
  await refresh();
  function respond(request,response,status,body='',headers={}){
    const bytes=Buffer.isBuffer(body)?body:Buffer.from(body);
    response.writeHead(status,{...securityHeaders,'Cache-Control':'no-store','Content-Type':'text/plain','Content-Length':bytes.length,'Connection':'close',...headers});
    response.end(request.method==='HEAD'?undefined:bytes);
  }
  async function handle(request,response){
    if(!guarded(request,authority,origin))return respond(request,response,403,'Forbidden');
    if(!['GET','HEAD'].includes(request.method))return respond(request,response,405,'Method not allowed',{Allow:'GET, HEAD'});
    if(request.headers.upgrade!==undefined||request.headers['transfer-encoding']!==undefined||request.headers['content-length']!==undefined&&request.headers['content-length']!=='0')return respond(request,response,400,'Bad request');
    if(!targetValid(request.url))return respond(request,response,400,'Bad request');
    // Browsers request an icon automatically; the fixed bootstrap HTML declares none.
    if(request.url==='/favicon.ico')return respond(request,response,204,'');
    if(request.url==='/'||request.url==='/status.json'){
      await refresh();const generation=current.generation;
      if(request.url==='/status.json')return respond(request,response,200,JSON.stringify({ok:true,digest:generation.digest,builderVersion:generation.builderVersion,draft:generation.catalog.draft,currentError,usingLastGood:currentError}),{'Content-Type':'application/json'});
      if(generation.builderVersion!==3)return respond(request,response,409,'Legacy generation has no reader bundle');
      return respond(request,response,307,'',{Location:`/g/${generation.digest}/ui/index.html`});
    }
    const match=/^\/g\/([a-f0-9]{64})\/(.+)$/.exec(request.url);
    if(!match)return respond(request,response,404,'Not found');
    let snapshot;try{snapshot=await load(match[1]);}catch{return respond(request,response,404,'Not found');}
    const member=snapshot.members.get(match[2]);
    if(snapshot.generation.builderVersion!==3||!member)return respond(request,response,404,'Not found');
    const bytes=await snapshot.generation.readBytes(member.path);
    respond(request,response,200,bytes,{'Content-Type':member.contentType,'Cache-Control':'public, max-age=31536000, immutable'});
  }
  const server=http.createServer({requireHostHeader:false,maxHeaderSize:8192,connectionsCheckingInterval:1000,headersTimeout:5000,requestTimeout:10000,keepAliveTimeout:1000},(request,response)=>{
    if(seenSockets.has(request.socket))return respond(request,response,400,'Bad request');
    seenSockets.add(request.socket);
    handle(request,response).catch(()=>{if(!response.headersSent)respond(request,response,500,'Request failed');else response.destroy();});
  });
  // Preserve all raw duplicate-header evidence within the 8-KiB byte bound.
  server.on('connection',socket=>{
    transports.add(socket);socket.once('close',()=>transports.delete(socket));
  });
  server.maxHeadersCount=0;server.setTimeout(10000,socket=>socket.destroy());
  // Reject protocol features instead of accepting body/upload or upgraded paths.
  server.on('checkContinue',(request,response)=>respond(request,response,400,'Bad request'));
  server.on('checkExpectation',(request,response)=>respond(request,response,400,'Bad request'));
  function rejectSocket(socket){if(seenSockets.has(socket))return socket.destroy();seenSockets.add(socket);if(!socket.writable)return socket.destroy();const headers=Object.entries(securityHeaders).map(([name,value])=>`${name}: ${value}\r\n`).join('');socket.end(`HTTP/1.1 400 Bad Request\r\n${headers}Cache-Control: no-store\r\nContent-Length: 11\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\nBad request`);}
  // A preconnected socket that times out before sending any bytes is closed
  // silently: writing a 400 there can race a browser's first request on it.
  server.on('clientError',(_error,socket)=>{if(socket.bytesRead===0)socket.destroy();else rejectSocket(socket);});server.on('connect',(_request,socket)=>rejectSocket(socket));server.on('upgrade',(_request,socket)=>rejectSocket(socket));
  await new Promise((resolve,reject)=>{server.once('error',()=>reject(Error('Unable to listen on study server port')));server.listen(port,'127.0.0.1',resolve);});
  let closing;
  return Object.freeze({port,origin,close(){
    if(!closing)closing=new Promise((resolve,reject)=>{
      // HTTP's pool excludes detached Upgrade/CONNECT sockets; ownership does not.
      const deadline=setTimeout(()=>{for(const socket of transports)socket.destroy();},1000);deadline.unref();
      server.close(error=>{clearTimeout(deadline);cache.clear();pending.clear();if(error)reject(error);else resolve();});
    });
    return closing;
  }});
}
