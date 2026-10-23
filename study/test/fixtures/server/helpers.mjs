import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import net from 'node:net';
import http from 'node:http';
import { teachingFixture, fixture, digest } from '../publication/helpers.mjs';
import { buildPublication } from '../../../lib/publication.mjs';
import { bootstrapHTML, uiAdditionalInputs } from '../../../lib/ui-bundle.mjs';
export const repository=path.resolve(import.meta.dirname,'../../../..');
export const json=value=>Buffer.from(JSON.stringify(value,null,2)+'\n');
export async function serverFixture(t,{version=3,raster=false}={}){
  const {root,records}=await (version===1?fixture(t):teachingFixture(t,undefined,raster?{'study/concepts/one.md':'<a id="concept"></a>\n![figure](../assets/figure.png)\n','study/assets/figure.png':Buffer.from('synthetic raster')}:{}));
  if(raster){records.reviews.reviews['review-one'].inputHashes.push({path:'study/assets/figure.png',sha256:digest('synthetic raster')});await writeFile(`${root}/study/reviews.json`,json(records.reviews));}
  if(version===3){
    const app={'index.html':bootstrapHTML,'app.mjs':"import { render } from './render.mjs';\nimport { state } from './state.mjs';\nimport { READER_URL } from './routes.mjs';\n",'render.mjs':"import { marked } from './vendor/marked/marked.esm.js';\nimport katex from './vendor/katex/katex.mjs';\nimport DOMPurify from './vendor/dompurify/purify.es.mjs';\nconst render = [marked,katex,DOMPurify]; export { render };\n",'state.mjs':'const state = {}; export { state };\n','routes.mjs':"const READER_URL = new URL('../reader.json', import.meta.url);\nconst GENERATION_ROOT = new URL('../', import.meta.url);\nexport { READER_URL, GENERATION_ROOT };\n",'styles.css':'body { color: black; }\n'};
    await mkdir(`${root}/study/app`,{recursive:true});for(const [name,bytes]of Object.entries(app))await writeFile(`${root}/study/app/${name}`,bytes);
    for(const relative of uiAdditionalInputs){await mkdir(path.dirname(`${root}/${relative}`),{recursive:true});await writeFile(`${root}/${relative}`,await readFile(`${repository}/${relative}`));}
  }
  const built=await buildPublication(root,{publish:true,builderVersion:version===1?2:version});assert.equal(built.ok,true,JSON.stringify(built.errors));let id=built.digest;
  if(version===1){
    const base=`${root}/study/generated/${id}`,manifest=JSON.parse(await readFile(`${base}/manifest.json`)),files=new Map();
    manifest.builderVersion=1;manifest.files=manifest.files.filter(entry=>!['graph.json','search.json'].includes(entry.path));
    for(const entry of manifest.files){let bytes=await readFile(`${base}/${entry.path}`);if(entry.path.endsWith('.json')){const value=JSON.parse(bytes);delete value.inputDigest;bytes=json(value);}files.set(entry.path,bytes);entry.sha256=digest(bytes);entry.byteLength=bytes.length;}
    const bytes=json(manifest);id=digest(bytes);await mkdir(`${root}/study/generated/${id}`);await writeFile(`${root}/study/generated/${id}/manifest.json`,bytes);for(const [name,bytes]of files)await writeFile(`${root}/study/generated/${id}/${name}`,bytes);await pointer(root,id);
  }
  return {root,id};
}
export async function nextGeneration(root){await writeFile(`${root}/study/app/state.mjs`,'const state = { next: true }; export { state };\n');const built=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(built.ok,true,JSON.stringify(built.errors));return built.digest;}
export async function pointer(root,id){await writeFile(`${root}/study/generated/current.json`,json({schemaVersion:1,digest:id}));}
export async function freePort(){const server=net.createServer();await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});const port=server.address().port;await new Promise(resolve=>server.close(resolve));return port;}
export function request(port,target='/',{method='GET',headers={}}={}){return new Promise((resolve,reject)=>{const req=http.request({host:'127.0.0.1',port,path:target,method,headers,agent:false},res=>{const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks)}));});req.on('error',reject);req.end();});}
export function rawRequest(port,target='/',lines=[],method='GET'){return new Promise((resolve,reject)=>{const socket=net.connect({host:'127.0.0.1',port});let raw='';socket.setTimeout(5000,()=>socket.destroy(Error('raw request timeout')));socket.on('error',reject);socket.on('data',bytes=>{raw+=bytes.toString('latin1');});socket.on('end',()=>resolve({status:Number(raw.split(' ')[1]),raw,body:raw.split('\r\n\r\n').slice(1).join('\r\n\r\n')}));socket.on('connect',()=>socket.end(`${method} ${target} HTTP/1.1\r\n${lines.join('\r\n')}\r\nConnection: close\r\n\r\n`));});}
