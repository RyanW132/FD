import path from 'node:path';
import { sha256 } from './contracts.mjs';

// Exact approved browser artifacts verified against the installation's registry
// tarballs. Hashes bind shipped bytes, not malicious-local-owner authenticity.
const packages = [
  {name:'marked',version:'18.1.1',integrity:'sha512-zEGgrtUG8crk+TrMacJSVABU4DYDDkS8uqgU3ohrn/2fW9C2AEfUrO3m6IhpIpQpl7YcVpiXXC9cSMWDANT3dg==',module:'lib/marked.esm.js',output:'marked.esm.js',moduleHash:'930457e5d55439f90465015cc507d3323366e80df5f7a701b61189d4e1046bda',licenseHash:'8e3a3f82f59a60958f56ca08f445647c32a4733dc7ca6c2c46f6eb898471ab9c',license:'MIT'},
  {name:'katex',version:'0.19.0',integrity:'sha512-v6Tznz3zJ7u3niRCoDTsumM2+HA2XXcCu+WAacCeHD2z3p9A9Ks987o5FzfTGBN0e8A0vjEgIDvLbICrXpdw/Q==',module:'dist/katex.mjs',output:'katex.mjs',moduleHash:'e5bc26598084ad869939ecaa262673814f26ed586312a409b5f8427c01e4f681',licenseHash:'766ccc1f306c885aa45542a9846bbd0a505b27a0374f146778171c2254ce18e3',license:'MIT'},
  {name:'dompurify',version:'3.4.17',integrity:'sha512-B/pSlYVHQ58kqISD/yDjuJ1yfzI34m1gF4lAod2bwSRhiN4K5Cl3H8Af7hqB2PmTL911tdEudnnXn5FnhRoz0w==',module:'dist/purify.es.mjs',output:'purify.es.mjs',moduleHash:'60c5d5ccbb466de3de3ba863461a92bf134f8c156cef7992da43e0f659bc5cbd',licenseHash:'cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30',license:'(MPL-2.0 OR Apache-2.0)'},
];
const appNames=['index.html','app.mjs','render.mjs','state.mjs','routes.mjs','styles.css'];
export const uiMembers=Object.freeze([
  ...appNames.map(name=>Object.freeze({source:`study/app/${name}`,path:`ui/${name}`,contentType:name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':'text/javascript'})),
  ...packages.flatMap(pkg=>[
    Object.freeze({source:`node_modules/${pkg.name}/${pkg.module}`,path:`ui/vendor/${pkg.name}/${pkg.output}`,contentType:'text/javascript',sha256:pkg.moduleHash}),
    Object.freeze({source:`node_modules/${pkg.name}/LICENSE`,path:`ui/vendor/${pkg.name}/LICENSE`,contentType:'text/plain',sha256:pkg.licenseHash}),
  ]),
]);
export const uiAdditionalInputs=Object.freeze(['package.json','package-lock.json',...packages.flatMap(pkg=>[`node_modules/${pkg.name}/package.json`,`node_modules/${pkg.name}/${pkg.module}`,`node_modules/${pkg.name}/LICENSE`])]);

export async function captureUIBundle(capture,payloads){
  const fail=()=>{throw Error('Invalid trusted UI bundle inputs');};
  const packageJSON=JSON.parse(await capture.readBytes('package.json')),lock=JSON.parse(await capture.readBytes('package-lock.json'));
  if(lock.lockfileVersion!==3)fail();
  for(const pkg of packages){
    const installed=JSON.parse(await capture.readBytes(`node_modules/${pkg.name}/package.json`)),locked=lock.packages?.[`node_modules/${pkg.name}`];
    if(packageJSON.dependencies?.[pkg.name]!==pkg.version||lock.packages?.['']?.dependencies?.[pkg.name]!==pkg.version||installed.name!==pkg.name||installed.version!==pkg.version||installed.license!==pkg.license||locked?.version!==pkg.version||locked.integrity!==pkg.integrity||locked.resolved!==`https://registry.npmjs.org/${pkg.name}/-/${pkg.name}-${pkg.version}.tgz`)fail();
  }
  const expected=uiMembers.filter(member=>member.source.startsWith('study/app/')).map(member=>member.source).sort();
  if(JSON.stringify(capture.membership.filter(name=>name==='study/app'||name.startsWith('study/app/')).sort())!==JSON.stringify(expected))fail();
  const files=new Map();for(const member of uiMembers)files.set(member.path,await capture.readBytes(member.source));
  const validationFiles=new Map([...payloads,...files]);
  validateUIBundle(validationFiles);
  return files;
}

export function validateUIBundle(files){
  for(const name of files.keys())if(name.startsWith('ui/')&&!uiMembers.some(member=>member.path===name))throw Error('Invalid trusted UI bundle membership');
  for(const member of uiMembers){
    const bytes=files.get(member.path);
    if(!Buffer.isBuffer(bytes)||member.sha256&&sha256(bytes)!==member.sha256)throw Error('Invalid trusted UI bundle bytes');
  }
  if(!files.get('ui/index.html').equals(Buffer.from(bootstrapHTML)))invalid();
  for(const name of ['app.mjs','render.mjs','state.mjs','routes.mjs'])authoredModule('ui/'+name,files.get('ui/'+name),files);
  authoredCSS(files.get('ui/styles.css'));
}

// Version-3 trusted authored-source dialect, not an arbitrary-JavaScript parser
// or a capability sandbox. Vendors bypass it only through the exact hash map.
export const bootstrapHTML='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Study helper</title><link rel="stylesheet" href="./styles.css"></head><body><main id="app"></main><script type="module" src="./app.mjs"></script></body></html>\n';
const invalid=()=>{throw Error('Unsupported trusted UI source dialect');};
function lex(text,{css=false}={}){
  if(/[\u2028\u2029]/.test(text))invalid();
  const tokens=[];let i=0;
  while(i<text.length){
    const c=text[i];
    if(/[ \t\r\n]/.test(c)){i++;continue;}
    if(c==='/'&&text[i+1]==='*'){const end=text.indexOf('*/',i+2);if(end<0)invalid();i=end+2;continue;}
    if(!css&&c==='/'&&text[i+1]==='/'){while(i<text.length&&!/[\r\n]/.test(text[i]))i++;continue;}
    if(c==='"'||c==="'"){
      const quote=c;let value='',escaped=false,closed=false;i++;
      while(i<text.length){const next=text[i++];if(next===quote){closed=true;break;}if(/[\r\n]/.test(next))invalid();if(next==='\\'){if(css||i===text.length||!"\\\"'nrtbfv0".includes(text[i])||text[i]==='0'&&/[0-9]/.test(text[i+1]??''))invalid();escaped=true;value+=next+text[i++];}else value+=next;}
      if(!closed)invalid();tokens.push({type:'string',value,escaped});continue;
    }
    if(/[A-Za-z_$]/.test(c)){let value=c;i++;while(i<text.length&&/[A-Za-z0-9_$]/.test(text[i]))value+=text[i++];tokens.push({type:'id',value,adjacentParen:text[i]==='('});continue;}
    if(/[0-9]/.test(c)){let value=c;i++;while(i<text.length&&/[0-9]/.test(text[i]))value+=text[i++];tokens.push({type:'number',value});continue;}
    if((css?'{}()[];:,.#%>+*-~=|!@':'{}()[];:,.?%>+*-~=|!&^<').includes(c)){tokens.push({type:'punct',value:c});i++;continue;}
    // No templates, regex literals, ambiguous division, identifier escapes,
    // non-ASCII identifiers or unrecognized lexical forms in this dialect.
    invalid();
  }
  return tokens;
}
function value(tokens,index){return tokens[index]?.type==='string'?undefined:tokens[index]?.value;}
function sequence(tokens,index,expected){return expected.every((part,offset)=>tokens[index+offset]?.type!=='string'&&value(tokens,index+offset)===part);}
function namedList(tokens,start){
  let i=start;if(value(tokens,i++)!=='{')invalid();
  if(value(tokens,i)==='}')invalid();
  for(;;){
    if(tokens[i++]?.type!=='id')invalid();
    if(value(tokens,i)==='as'){i++;if(tokens[i++]?.type!=='id')invalid();}
    if(value(tokens,i)==='}'){i++;break;}
    if(value(tokens,i++)!==',')invalid();
    if(value(tokens,i)==='}'){i++;break;}
  }
  return i;
}
const fixedURLs=new Map([
  ['READER_URL','../reader.json'],['GENERATION_ROOT','../'],
  ['CATALOG_URL','../catalog.json'],['REPORT_URL','../report.json'],
  ['GRAPH_URL','../graph.json'],['SEARCH_URL','../search.json'],
  ['STATUS_URL','/status.json'],
]);
const forbidden=new Set(['Worker','SharedWorker','serviceWorker','WebSocket','EventSource','XMLHttpRequest','importScripts','eval','Function','createElementNS','Image','Audio']);
function authoredModule(name,bytes,files){
  const tokens=lex(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  let i=0,body=false;const declarations=new Set(),stack=[];
  while(i<tokens.length){
    const token=tokens[i],word=token.value;
    if(token.type==='id'&&word==='import'){
      if(body||stack.length)invalid();let end=i+1;
      if(value(tokens,end)==='{')end=namedList(tokens,end);
      else if(tokens[end++]?.type!=='id')invalid();
      if(value(tokens,end++)!=='from')invalid();const specifier=tokens[end++];
      if(specifier?.type!=='string'||specifier.escaped||value(tokens,end++)!==';'||!/^\.\.?\/[A-Za-z0-9_./-]+$/.test(specifier.value))invalid();
      const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(name),specifier.value));
      if(!uiMembers.some(member=>member.path===resolved&&member.contentType==='text/javascript'))invalid();
      i=end;continue;
    }
    body=true;
    if(token.type==='id'&&word==='export'){
      if(stack.length)invalid();const end=namedList(tokens,i+1);if(value(tokens,end)!==';')invalid();i=end+1;continue;
    }
    if(sequence(tokens,i,['const',value(tokens,i+1),'=','new','URL','('])){
      const id=value(tokens,i+1),literal=tokens[i+6];
      if(name!=='ui/routes.mjs'||stack.length||!fixedURLs.has(id)||declarations.has(id)||literal?.type!=='string'||literal.escaped||literal.value!==fixedURLs.get(id)||!sequence(tokens,i+7,[',','import','.','meta','.','url',')',';']))invalid();
      if(id!=='GENERATION_ROOT'&&id!=='STATUS_URL'&&!files.has(literal.value.slice(3)))invalid();
      declarations.add(id);i+=15;continue;
    }
    if(sequence(tokens,i,['new','URL'])){
      if(name!=='ui/routes.mjs'||!sequence(tokens,i,['new','URL','(','member',',','GENERATION_ROOT',')']))invalid();
      i+=7;continue;
    }
    if(token.type==='id'){
      if(forbidden.has(word)||word==='fetch'&&name!=='ui/routes.mjs'||word==='Blob'&&name!=='ui/state.mjs')invalid();
      if(word==='URL'){
        if(name!=='ui/state.mjs'||value(tokens,i+1)!=='.'||!['createObjectURL','revokeObjectURL'].includes(value(tokens,i+2))||value(tokens,i+3)!=='(')invalid();
      }
      if(['setTimeout','setInterval'].includes(word)&&value(tokens,i+1)==='('&&tokens[i+2]?.type==='string')invalid();
      if(word==='createElement'&&value(tokens,i+1)==='('){const tag=tokens[i+2];if(tag?.type!=='string'||tag.escaped||['script','iframe','object','embed','link','style','base'].includes(tag.value.toLowerCase()))invalid();}
    }
    if(token.type==='punct'){
      if(['(','[','{'].includes(word))stack.push(word);
      else if([')',']','}'].includes(word)){if(stack.pop()!=={')':'(',']':'[','}':'{'}[word])invalid();}
    }
    i++;
  }
  if(stack.length||name==='ui/routes.mjs'&&(!declarations.has('READER_URL')||!declarations.has('GENERATION_ROOT')))invalid();
}
function authoredCSS(bytes){
  const tokens=lex(new TextDecoder('utf-8',{fatal:true}).decode(bytes),{css:true});const stack=[];
  const functions=new Set(['var','calc','min','max','clamp','rgb','rgba','hsl','hsla']);
  for(let i=0;i<tokens.length;i++){
    const token=tokens[i],word=token.value;
    if(token.type==='punct'&&word==='@'&&value(tokens,i+1)!=='media')invalid();
    if(token.type==='id'&&token.adjacentParen&&!functions.has(word))invalid();
    if(token.type==='id'&&['url','image','image-set','behavior','binding'].includes(word.toLowerCase()))invalid();
    if(token.type==='punct'){
      if(['(','[','{'].includes(word))stack.push(word);
      else if([')',']','}'].includes(word)&&stack.pop()!=={')':'(',']':'[','}':'{'}[word])invalid();
    }
  }
  if(stack.length)invalid();
}
