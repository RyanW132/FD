import net from 'node:net';
import { once } from 'node:events';
import test from 'node:test';
import assert from 'node:assert/strict';
import { writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { startStudyServer, studyServerOrigin } from '../lib/server.mjs';
import { readGeneration, buildPublication } from '../lib/publication.mjs';
import { serverFixture, nextGeneration, pointer, freePort, request, rawRequest } from './fixtures/server/helpers.mjs';
async function start(t,root){const server=await startStudyServer(root,{port:await freePort()});t.after(()=>server.close());return server;}
function secure(response){assert.equal(response.headers['x-content-type-options'],'nosniff');assert.equal(response.headers['referrer-policy'],'no-referrer');assert.equal(response.headers['cross-origin-resource-policy'],'same-origin');assert.match(response.headers['content-security-policy'],/default-src 'none'/);assert.match(response.headers['content-security-policy'],/worker-src 'none'/);assert.equal(response.headers['access-control-allow-origin'],undefined);}

test('root redirects GET/HEAD to exact cached G1 bytes, with coherent relative resources and headers',async t=>{
  const {root,id}=await serverFixture(t),server=await start(t,root),generation=await readGeneration(root,id);
  for(const method of ['GET','HEAD']){const response=await request(server.port,'/',{method});assert.equal(response.status,307);assert.equal(response.headers.location,`/g/${id}/ui/index.html`);assert.equal(response.headers['cache-control'],'no-store');assert.equal(response.headers['content-length'],'0');assert.equal(response.body.length,0);secure(response);}
  const html=await request(server.port,`/g/${id}/ui/index.html`);assert.deepEqual(html.body,await generation.readBytes('ui/index.html'));assert.equal(html.headers['content-type'],'text/html');secure(html);
  const base=server.origin+`/g/${id}/ui/index.html`;
  for(const relative of ['./app.mjs','./styles.css','./render.mjs','./state.mjs','./routes.mjs','./vendor/marked/marked.esm.js','./vendor/katex/katex.mjs','./vendor/dompurify/purify.es.mjs','../reader.json']){const url=new URL(relative,base);assert.ok(url.pathname.startsWith(`/g/${id}/`));const result=await request(server.port,url.pathname);assert.equal(result.status,200);assert.deepEqual(result.body,await generation.readBytes(url.pathname.slice(`/g/${id}/`.length)));secure(result);}
  const head=await request(server.port,`/g/${id}/ui/index.html`,{method:'HEAD'});assert.equal(head.body.length,0);assert.equal(Number(head.headers['content-length']),html.body.length);
});

test('G2 switch does not mix G1; corrupted pointer and new generation retain last-good',async t=>{
  const {root,id}=await serverFixture(t),server=await start(t,root),before=await request(server.port,`/g/${id}/ui/state.mjs`),next=await nextGeneration(root);
  assert.equal((await request(server.port)).headers.location,`/g/${next}/ui/index.html`);assert.deepEqual((await request(server.port,`/g/${id}/ui/state.mjs`)).body,before.body);
  await writeFile(`${root}/study/generated/current.json`,'bad pointer with synthetic path');let response=await request(server.port);assert.equal(response.headers.location,`/g/${next}/ui/index.html`);
  const status=JSON.parse((await request(server.port,'/status.json')).body);assert.equal(status.currentError,true);assert.equal(status.usingLastGood,true);assert.equal(status.digest,next);assert.doesNotMatch(JSON.stringify(status),/synthetic path|ENOENT|study\//);
  await pointer(root,'a'.repeat(64));response=await request(server.port);assert.equal(response.headers.location,`/g/${next}/ui/index.html`);
  await writeFile(`${root}/study/app/state.mjs`,'const state = { third: true }; export { state };');const third=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(third.ok,true);
  await writeFile(`${root}/study/generated/${third.digest}/reader.json`,'corrupt newly current generation');assert.equal((await request(server.port)).headers.location,`/g/${next}/ui/index.html`);
});

test('historical miss verifies every member before admission, deduplicates concurrent loads, and never opens cached member again',async t=>{
  const {root,id}=await serverFixture(t),next=await nextGeneration(root),server=await start(t,root);
  const generation=await readGeneration(root,id);
  for(const member of ['ui/state.mjs','ui/vendor/marked/LICENSE','reader.json',generation.catalog.items[0].output]){
    const file=`${root}/study/generated/${id}/${member}`,original=await readFile(file);await writeFile(file,'corrupted OTHER member');
    const missing=await request(server.port,`/g/${id}/ui/index.html`);assert.equal(missing.status,404);assert.equal(missing.body.toString(),'Not found');await writeFile(file,original);
  }
 const responses=await Promise.all(Array.from({length:8},()=>request(server.port,`/g/${id}/ui/index.html`)));assert.ok(responses.every(response=>response.status===200&&response.body.equals(responses[0].body)));
  await writeFile(`${root}/study/generated/${id}/ui/index.html`,'changed cached bytes');assert.deepEqual((await request(server.port,`/g/${id}/ui/index.html`)).body,responses[0].body);await assert.rejects(readGeneration(root,id));const fresh=await start(t,root);assert.equal((await request(fresh.port,`/g/${id}/ui/index.html`)).status,404);assert.equal((await request(server.port)).headers.location,`/g/${next}/ui/index.html`);
});

for(const version of [1,2])test(`verified legacy v${version} listens but never borrows a reader bundle`,async t=>{
  const {root,id}=await serverFixture(t,{version}),server=await start(t,root);const response=await request(server.port);assert.equal(response.status,409);assert.equal(response.body.toString(),'Legacy generation has no reader bundle');assert.equal((await request(server.port,`/g/${id}/catalog.json`)).status,404);const status=JSON.parse((await request(server.port,'/status.json')).body);assert.equal(status.builderVersion,version);
});

test('cold invalid current fails before listen; port conflict never selects another port',async t=>{
  const {root}=await serverFixture(t);await rm(`${root}/study/generated/current.json`);const port=await freePort();await assert.rejects(startStudyServer(root,{port}),/current/);
  const other=await serverFixture(t),server=await startStudyServer(other.root,{port});t.after(()=>server.close());await assert.rejects(startStudyServer(other.root,{port}),/listen|port/);
  for(const invalid of [0,-1,65536,1.5,'4173'])await assert.rejects(startStudyServer(other.root,{port:invalid}),/port/);
});

test('strict raw Host/Origin/fetch metadata, methods and request targets fail closed',async t=>{
  const {root,id}=await serverFixture(t),server=await start(t,root),host=`Host: 127.0.0.1:${server.port}`;
  for(const lines of [[],['Host: foreign.invalid'],[host,host],[host,'Origin: null'],[host,'Origin: https://foreign.invalid'],[host,`Origin: ${server.origin}`,`Origin: ${server.origin}`],[host,'Sec-Fetch-Site: cross-site'],[host,'Sec-Fetch-Site: same-site'],[host,'Sec-Fetch-Dest: serviceworker']]){const response=await rawRequest(server.port,'/',lines);assert.ok([400,403].includes(response.status),response.raw);}
  for(const method of ['POST','PUT','DELETE','OPTIONS','TRACE'])assert.equal((await rawRequest(server.port,'/',[host],method)).status,405);
  for(const target of ['http://foreign.invalid/','//foreign.invalid/','/?x=1','/#frag','/g/'+id+'/ui/../catalog.json','/g/'+id+'/ui//app.mjs','/g/'+id+'/ui/%61pp.mjs','/g/'+id+'/ui/%2e%2e/catalog.json','/g/'+id+'/ui/app.mjs%00','/g/'+id+'/ui\\app.mjs','/g/'+id.toUpperCase()+'/ui/app.mjs'])assert.ok([400,404].includes((await rawRequest(server.port,target,[host])).status),target);
  assert.equal((await request(server.port,'/',{headers:{Origin:server.origin,'Sec-Fetch-Site':'same-origin'}})).status,307);
});

test('allowlist excludes manifest/index/source/live files and historical symlinks',async t=>{
  const {root,id}=await serverFixture(t),next=await nextGeneration(root),server=await start(t,root);
  for(const member of ['manifest.json','index.md','study/curriculum.json','ui/extra.mjs','../current.json'])assert.notEqual((await request(server.port,`/g/${next}/${member}`)).status,200);
  for(const target of ['/study/curriculum.json','/ui/app.mjs','/current.json','/g/','/upload','/private/synthetic'])assert.equal((await request(server.port,target)).status,404);
  await rm(`${root}/study/generated/${id}/ui/app.mjs`);await symlink('state.mjs',`${root}/study/generated/${id}/ui/app.mjs`);assert.equal((await request(server.port,`/g/${id}/ui/index.html`)).status,404);
  const generation=await readGeneration(root,next),content=generation.catalog.items[0].output;assert.deepEqual((await request(server.port,`/g/${next}/${content}`)).body,await generation.readBytes(content));
});

test('raw duplicate evidence is retained beyond common header-count limits; bodies/upgrade/expect are rejected',async t=>{
  const {root}=await serverFixture(t),server=await start(t,root),host=`Host: 127.0.0.1:${server.port}`;
  const filler=Array.from({length:80},(_,i)=>`X-Test-${i}: x`);
  assert.ok([400,403].includes((await rawRequest(server.port,'/',[host,...filler,host])).status));
  assert.equal((await rawRequest(server.port,'/',[host,`Origin: ${server.origin}`,...filler,'Origin: null'])).status,403);
  for(const lines of [[host,'Content-Length: 100'],[host,'Transfer-Encoding: chunked'],[host,'Expect: 100-continue'],[host,'Upgrade: websocket']]){const response=await rawRequest(server.port,'/',lines);assert.equal(response.status,400,response.raw);}
});


test('approved raster and vendor licenses use exact cache MIME; malformed protocol errors carry bounded headers',async t=>{
  const {root,id}=await serverFixture(t,{raster:true}),server=await start(t,root),generation=await readGeneration(root,id);
  const raster=generation.members.find(member=>member.path.startsWith('assets/'));assert.ok(raster);
  for(const member of [raster,...generation.members.filter(member=>member.path.endsWith('/LICENSE'))]){const response=await request(server.port,`/g/${id}/${member.path}`);assert.equal(response.status,200);assert.equal(response.headers['content-type'],member.contentType);assert.deepEqual(response.body,await generation.readBytes(member.path));secure(response);}
  const host=`Host: 127.0.0.1:${server.port}`;
  for(const lines of [[],[host,'bad header: value'],[host,'X-Huge: '+ 'a'.repeat(9000)]]){const response=await rawRequest(server.port,'/',lines);assert.ok([400,403].includes(response.status));assert.match(response.raw,/Content-Security-Policy:/i);assert.match(response.raw,/X-Content-Type-Options: nosniff/i);assert.ok(response.body.length<100);}
});


test('valid legacy pointer supersedes cached v3 without borrowing its application',async t=>{
  const {root,id}=await serverFixture(t),server=await start(t,root);assert.equal((await request(server.port)).status,307);
  const legacy=await buildPublication(root,{publish:true});assert.equal(legacy.ok,true);const response=await request(server.port);assert.equal(response.status,409);assert.equal(response.body.toString(),'Legacy generation has no reader bundle');
  assert.equal((await request(server.port,`/g/${id}/ui/index.html`)).status,200,'Explicit historic v3 remains available without changing legacy root');
  const status=JSON.parse((await request(server.port,'/status.json')).body);assert.equal(status.builderVersion,2);assert.equal(status.currentError,false);
});


test('canonical loopback origin preserves default4173 and explicit HTTP80 semantics without binding a privileged port',()=>{
  assert.equal(studyServerOrigin(),'http://127.0.0.1:4173');assert.equal(studyServerOrigin(80),'http://127.0.0.1');assert.equal(new URL(studyServerOrigin(80)).host,'127.0.0.1');assert.equal(studyServerOrigin(443),'http://127.0.0.1:443');
  for(const port of [0,-1,65536,NaN,Infinity,1.5,'80'])assert.throws(()=>studyServerOrigin(port),/port/);
});


for(const mode of ['upgrade','connect','keepalive','in-flight'])test(`close deadline owns held ${mode} transport and remains idempotent`,async t=>{
  const {root}=await serverFixture(t),server=await start(t,root);
  const socket=net.connect({host:'127.0.0.1',port:server.port,allowHalfOpen:true});
  socket.on('error',()=>{});t.after(()=>socket.destroy());await once(socket,'connect');
  let response='';socket.on('data',bytes=>response+=bytes);
  if(mode==='in-flight')socket.write('GET / HTTP/1.1\r\nHost: ');
  else{
    const ended=once(socket,'end'),host=`127.0.0.1:${server.port}`;
    socket.write(mode==='connect'?`CONNECT ${host} HTTP/1.1\r\nHost: ${host}\r\n\r\n`:`GET / HTTP/1.1\r\nHost: ${host}\r\nConnection: ${mode==='upgrade'?'Upgrade':'keep-alive'}\r\n${mode==='upgrade'?'Upgrade: websocket\r\n':''}\r\n`);
    await ended;assert.match(response,mode==='keepalive'?/^HTTP\/1.1 307/:/^HTTP\/1.1 400/);
    assert.match(response,/Content-Security-Policy:/i);assert.match(response,/X-Content-Type-Options: nosniff/i);
  }
  const started=Date.now(),closing=server.close();assert.equal(server.close(),closing);
  let timer;const closed=await Promise.race([closing.then(()=>true),new Promise(resolve=>{timer=setTimeout(()=>resolve(false),1800);})]);clearTimeout(timer);
  // Release only after measuring, so a failed test cannot hang its cleanup.
  socket.destroy();await closing;
  assert.equal(closed,true,`close exceeded deadline tolerance for ${mode}`);assert.ok(Date.now()-started<1800);
});
