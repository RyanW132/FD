import test from 'node:test';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile, readdir, rm, stat, utimes } from 'node:fs/promises';
import path from 'node:path';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { teachingFixture, digest } from './fixtures/publication/helpers.mjs';
const repository=path.resolve(import.meta.dirname,'../..');
const json=value=>Buffer.from(JSON.stringify(value,null,2)+'\n');
const app={
  'index.html':'<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Study helper</title><link rel="stylesheet" href="./styles.css"></head><body><main id="app"></main><script type="module" src="./app.mjs"></script></body></html>\n',
  'app.mjs':"import { renderer } from './render.mjs';\nimport { state } from './state.mjs';\nimport { READER_URL } from './routes.mjs';\n",
  'render.mjs':"import { marked } from './vendor/marked/marked.esm.js';\nimport katex from './vendor/katex/katex.mjs';\nimport DOMPurify from './vendor/dompurify/purify.es.mjs';\nconst renderer = [marked,katex,DOMPurify]; export { renderer };\n",
  'state.mjs':'const state = {}; export { state };\n',
  'routes.mjs':"const READER_URL = new URL('../reader.json', import.meta.url);\nconst GENERATION_ROOT = new URL('../', import.meta.url);\nexport { READER_URL, GENERATION_ROOT };\n",
  'styles.css':'body { color: black; }\n',
};
const distributions={marked:['lib/marked.esm.js','LICENSE'],katex:['dist/katex.mjs','LICENSE'],dompurify:['dist/purify.es.mjs','LICENSE']};
async function v3Fixture(t){
  const {root}=await teachingFixture(t);
  for(const [name,text]of Object.entries(app)){await mkdir(`${root}/study/app`,{recursive:true});await writeFile(`${root}/study/app/${name}`,text);}
  for(const name of ['package.json','package-lock.json'])await writeFile(`${root}/${name}`,await readFile(`${repository}/${name}`));
  for(const [name,files]of Object.entries(distributions))for(const file of ['package.json',...files]){const relative=`node_modules/${name}/${file}`;await mkdir(path.dirname(`${root}/${relative}`),{recursive:true});await writeFile(`${root}/${relative}`,await readFile(`${repository}/${relative}`));}
  return root;
}
async function build(t){const root=await v3Fixture(t);const result=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(result.ok,true,JSON.stringify(result.errors));return {root,id:result.digest};}
async function rewrite(root,id,mutate){
  const base=`${root}/study/generated/${id}`,manifest=JSON.parse(await readFile(`${base}/manifest.json`));
  const files=new Map(await Promise.all(manifest.files.map(async entry=>[entry.path,await readFile(`${base}/${entry.path}`)])));
  mutate(manifest,files);manifest.files=manifest.files.filter(entry=>files.has(entry.path));
  for(const name of files.keys())if(!manifest.files.some(entry=>entry.path===name))manifest.files.push({path:name,contentType:'application/json'});
  for(const entry of manifest.files){entry.sha256=digest(files.get(entry.path));entry.byteLength=files.get(entry.path).length;}
  const bytes=json(manifest),next=digest(bytes),destination=`${root}/study/generated/${next}`;await mkdir(destination,{recursive:true});await writeFile(`${destination}/manifest.json`,bytes);
  for(const [name,bytes]of files){await mkdir(path.dirname(`${destination}/${name}`),{recursive:true});await writeFile(`${destination}/${name}`,bytes);}
  return next;
}

test('internal v3 opt-in emits complete bound cached reader and exact trusted bundle; default remains v2',async t=>{
  const {root,id}=await build(t),generation=await readGeneration(root,id);
  assert.equal(generation.builderVersion,3);assert.equal(generation.members.filter(m=>m.path.startsWith('ui/')).length,12);
  const reader=JSON.parse(await generation.readBytes('reader.json'));assert.ok(reader.documents.length>4);assert.equal(reader.exercises.length,1);assert.equal(reader.inputDigest,generation.catalog.inputDigest);
  for(const name of Object.keys(app))assert.equal((await generation.readBytes(`ui/${name}`)).toString(),app[name]);
  await writeFile(`${root}/study/generated/${id}/ui/app.mjs`,'changed disk');assert.equal((await generation.readBytes('ui/app.mjs')).toString(),app['app.mjs']);await assert.rejects(readGeneration(root,id),/changed/);
  const old=await buildPublication(root,{publish:true});assert.equal(old.ok,true);assert.equal((await readGeneration(root,old.digest)).builderVersion,2);
});

test('missing v3 inputs fail without changing last-good v2 pointer and without fallback',async t=>{
  const {root}=await teachingFixture(t);const old=await buildPublication(root,{publish:true});assert.equal(old.ok,true);
  const result=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(result.ok,false);assert.equal((await readGeneration(root)).digest,old.digest);
});

for(const name of ['extra.json','extra.md','ui/extra.mjs','ui/vendor/font.woff2','ui/vendor/marked/extra.js'])test(`v3 rejects rehashed unknown ${name}`,async t=>{
  const {root,id}=await build(t);const next=await rewrite(root,id,(_m,f)=>f.set(name,Buffer.from('{}')));await assert.rejects(readGeneration(root,next));
});
for(const version of [1,2])test(`v3 rejects downgrade to ${version}`,async t=>{const {root,id}=await build(t);const next=await rewrite(root,id,m=>{m.builderVersion=version;});await assert.rejects(readGeneration(root,next));});
for(const name of ['reader.json','ui/app.mjs','ui/vendor/dompurify/LICENSE'])test(`v3 requires ${name} and exact MIME`,async t=>{
  const {root,id}=await build(t);let next=await rewrite(root,id,(_m,f)=>f.delete(name));await assert.rejects(readGeneration(root,next));
  next=await rewrite(root,id,m=>{m.files.find(e=>e.path===name).contentType='text/markdown';});await assert.rejects(readGeneration(root,next));
});
for(const field of ['draft','inputDigest','documents'])test(`v3 rejects rehashed reader ${field} mismatch`,async t=>{const {root,id}=await build(t);const next=await rewrite(root,id,(_m,f)=>{const r=JSON.parse(f.get('reader.json'));r[field]=field==='draft'?true:field==='inputDigest'?'0'.repeat(64):[];f.set('reader.json',json(r));});await assert.rejects(readGeneration(root,next));});

for(const hook of ['afterCapture','beforeCommit','afterGeneration'])test(`trusted input same-mtime mutation at ${hook} retains pointer`,async t=>{
  const {root,id}=await build(t);const file=`${root}/node_modules/marked/LICENSE`,before=await stat(file),original=await readFile(file);
  const result=await buildPublication(root,{publish:true,builderVersion:3,testHooks:{[hook]:async()=>{const changed=Buffer.from(original);changed[0]^=1;await writeFile(file,changed);await utimes(file,before.atime,before.mtime);}}});
  assert.equal(result.ok,false);assert.equal((await readGeneration(root)).digest,id);
});

test('finished generation is fully verified after hook and before pointer; G1 remains immutable',async t=>{
  const {root,id}=await build(t);const original=await readFile(`${root}/study/generated/${id}/ui/app.mjs`);await writeFile(`${root}/study/app/state.mjs`,'const state = {next:true}; export { state };\n');
  const result=await buildPublication(root,{publish:true,builderVersion:3,testHooks:{afterGeneration:async()=>{for(const name of await readdir(`${root}/study/generated`))if(/^[a-f0-9]{64}$/.test(name)&&name!==id)await writeFile(`${root}/study/generated/${name}/ui/app.mjs`,'corrupt finished app');}}});
  assert.equal(result.ok,false);assert.equal((await readGeneration(root)).digest,id);assert.deepEqual(await readFile(`${root}/study/generated/${id}/ui/app.mjs`),original);
});

for(const hook of ['afterCapture','beforeCommit','afterGeneration'])test(`every explicit package, vendor and UI input is fresh at ${hook}`,async t=>{
  const {root,id}=await build(t);
  const inputs=['package.json','package-lock.json',...Object.entries(distributions).flatMap(([name,files])=>['package.json',...files].map(file=>`node_modules/${name}/${file}`)),...Object.keys(app).map(name=>`study/app/${name}`)];
  for(const input of inputs){
    const file=`${root}/${input}`,original=await readFile(file),before=await stat(file);
    const result=await buildPublication(root,{publish:true,builderVersion:3,testHooks:{[hook]:async()=>{const changed=Buffer.from(original);changed[changed.length-1]^=1;await writeFile(file,changed);await utimes(file,before.atime,before.mtime);}}});
    assert.equal(result.ok,false,input);assert.equal((await readGeneration(root)).digest,id,input);await writeFile(file,original);
  }
});

for(const input of ['study/app/routes.mjs','node_modules/katex/dist/katex.mjs','node_modules/dompurify/LICENSE','node_modules/marked/package.json'])test(`missing trusted input ${input} fails without fallback`,async t=>{
  const {root,id}=await build(t);await rm(`${root}/${input}`);const result=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(result.ok,false);assert.equal((await readGeneration(root)).digest,id);
});

test('unreferenced node_modules is excluded; new app membership cannot silently join the bundle',async t=>{
  const {root,id}=await build(t);await writeFile(`${root}/node_modules/unused.js`,'not captured');
  const unchanged=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(unchanged.ok,true);assert.equal(unchanged.digest,id);
  await writeFile(`${root}/study/app/extra.mjs`,'export {};');const denied=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(denied.ok,false);assert.equal((await readGeneration(root)).digest,id);
});
for(const hook of ['afterCapture','beforeCommit','afterGeneration'])test(`app membership changes at ${hook} retain pointer`,async t=>{
  const {root,id}=await build(t);const result=await buildPublication(root,{publish:true,builderVersion:3,testHooks:{[hook]:()=>writeFile(`${root}/study/app/extra.mjs`,'export {};')}});assert.equal(result.ok,false);assert.equal((await readGeneration(root)).digest,id);
});
test('G2 changes only its own bundle and G1 remains byte-identical',async t=>{
  const {root,id}=await build(t),first=await readGeneration(root,id);const bytes=await Promise.all(first.members.map(async entry=>[entry.path,await first.readBytes(entry.path)]));
  await writeFile(`${root}/study/app/state.mjs`,'const state = {next:true}; export { state };\n');const second=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(second.ok,true);assert.notEqual(second.digest,id);assert.equal((await readGeneration(root)).digest,second.digest);
  const again=await readGeneration(root,id);for(const [name,original]of bytes)assert.deepEqual(await again.readBytes(name),original,name);
});
test('v3 rejects duplicate manifest members and unsupported builder opt-ins',async t=>{
  const {root,id}=await build(t);const next=await rewrite(root,id,m=>m.files.push({...m.files[0]}));await assert.rejects(readGeneration(root,next),/manifest entry/);
  for(const builderVersion of [1,4,'3'])assert.equal((await buildPublication(root,{publish:true,builderVersion})).ok,false);
});

for(const kind of ['pin','integrity','installed-version','license','vendor-bytes'])test(`trusted package ${kind} mismatch fails`,async t=>{
  const {root,id}=await build(t);
  const file=kind==='pin'?'package.json':kind==='integrity'?'package-lock.json':kind==='vendor-bytes'?'node_modules/marked/lib/marked.esm.js':'node_modules/dompurify/package.json';
  if(kind==='vendor-bytes')await writeFile(`${root}/${file}`,'export const marked = {};');
  else{const data=JSON.parse(await readFile(`${root}/${file}`));if(kind==='pin')data.dependencies.marked='^18.1.1';else if(kind==='integrity')data.packages['node_modules/katex'].integrity='sha512-invalid';else if(kind==='installed-version')data.version='3.4.16';else data.license='MIT';await writeFile(`${root}/${file}`,json(data));}
  const result=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(result.ok,false);assert.equal((await readGeneration(root)).digest,id);
});

test('historical v3 checks pinned vendor and license bytes even after rehashing',async t=>{
  const {root,id}=await build(t);
  for(const name of ['ui/vendor/marked/marked.esm.js','ui/vendor/dompurify/LICENSE']){const next=await rewrite(root,id,(_m,f)=>f.set(name,Buffer.from('unapproved substituted bytes')));await assert.rejects(readGeneration(root,next),/trusted UI bundle/);}
});

test('v3 draft projection is parent-bound and explicitly incomplete',async t=>{
  const root=await v3Fixture(t),result=await buildPublication(root,{publish:true,previewDraft:true,builderVersion:3});assert.equal(result.ok,true,JSON.stringify(result.errors));
  const generation=await readGeneration(root,result.digest),reader=JSON.parse(await generation.readBytes('reader.json'));assert.equal(reader.draft,true);assert.equal(generation.report.readiness.teachingComplete,false);
});


for(const [name,source]of Object.entries(app).filter(([name])=>name.endsWith('.mjs')))test(`synthetic ${name} has separate Node syntax evidence`,()=>{
  const result=spawnSync(process.execPath,['--check','--input-type=module'],{input:source,encoding:'utf8',windowsHide:true,timeout:5000});assert.equal(result.status,0,result.stderr);
});
for(const [name,source]of [['ui/app.mjs',"import x from 'https://external.invalid/x';"],['ui/styles.css','body { background:url(https://external.invalid/x); }'],['ui/index.html','<script src="/live/app.mjs"></script>']])test(`historical v3 rehashed unsupported resource in ${name} rejects`,async t=>{
  const {root,id}=await build(t);const next=await rewrite(root,id,(_m,f)=>f.set(name,Buffer.from(source)));await assert.rejects(readGeneration(root,next),/UI/);
});

const emittedDraftWarning='DRAFT — UNREVIEWED preview; not reviewed teaching or evidence of mastery.';
for(const draft of [false,true])test(`v3 search envelope binds parent mode and warning (draft=${draft})`,async t=>{
  const root=await v3Fixture(t),result=await buildPublication(root,{publish:true,previewDraft:draft,builderVersion:3});assert.equal(result.ok,true);
  const original=await readGeneration(root,result.digest),search=JSON.parse(await original.readBytes('search.json'));
  assert.equal(search.draft,draft);assert.equal(search.warning,draft?emittedDraftWarning:null);assert.ok(search.documents.every(document=>document.draft===draft&&!Object.hasOwn(document,'warning')));
  for(const mutate of [s=>{s.draft=!draft;},s=>{s.warning=draft?null:emittedDraftWarning;},s=>{delete s.draft;},s=>{delete s.warning;},s=>{s.draft=String(draft);},s=>{s.warning=false;},s=>{s.warning='other warning';}]){
    const changed=await rewrite(root,result.digest,(_manifest,files)=>{const value=JSON.parse(files.get('search.json'));mutate(value);files.set('search.json',json(value));});
    await assert.rejects(readGeneration(root,changed),/search mode/);
  }
});

test('search document mode cannot contradict parent even with rehashed matching catalog metadata',async t=>{
  const {root,id}=await build(t);const changed=await rewrite(root,id,(_manifest,files)=>{
    const catalog=JSON.parse(files.get('catalog.json')),search=JSON.parse(files.get('search.json')),graph=JSON.parse(files.get('graph.json'));
    catalog.items[0].draft=true;search.documents.find(document=>document.id===catalog.items[0].id).draft=true;
    search.revision=digest(Buffer.from(JSON.stringify({nodes:graph.nodes,edges:graph.edges,documents:search.documents})));
    files.set('catalog.json',json(catalog));files.set('search.json',json(search));
  });await assert.rejects(readGeneration(root,changed),/search mode/);
});
