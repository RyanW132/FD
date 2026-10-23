import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { fixture, teachingFixture, digest } from './fixtures/publication/helpers.mjs';

const json=value=>Buffer.from(JSON.stringify(value,null,2)+'\n');
const mime=name=>name.endsWith('.json')?'application/json':name.endsWith('.md')?'text/markdown':name.endsWith('.png')?'image/png':name.endsWith('.webp')?'image/webp':'image/jpeg';
// Rewrite only temporary synthetic generations. Rehash every payload and the
// manifest so these tests exercise grammar/coherence, not stale byte hashes.
async function rewrite(root,source,mutate){
  const base=join(root,'study/generated',source);
  const manifest=JSON.parse(await readFile(join(base,'manifest.json')));
  const files=new Map(await Promise.all(manifest.files.map(async entry=>[entry.path,await readFile(join(base,entry.path))])));
  mutate(manifest,files);
  manifest.files=manifest.files.filter(entry=>files.has(entry.path));
  for(const name of files.keys())if(!manifest.files.some(entry=>entry.path===name))manifest.files.push({path:name,contentType:mime(name)});
  manifest.files=manifest.files.map(entry=>({...entry,sha256:digest(files.get(entry.path)),byteLength:files.get(entry.path).length}));
  const raw=json(manifest),id=digest(raw),destination=join(root,'study/generated',id);
  await mkdir(destination,{recursive:true});await writeFile(join(destination,'manifest.json'),raw);
  for(const [name,bytes]of files){await mkdir(dirname(join(destination,name)),{recursive:true});await writeFile(join(destination,name),bytes);}
  return id;
}
async function builtFixture(t,teaching=true,previewDraft=false){
  const {root}=await (teaching?teachingFixture(t):fixture(t));
  const built=await buildPublication(root,{publish:true,previewDraft});assert.equal(built.ok,true,JSON.stringify(built.errors));
  return {root,id:built.digest};
}
function editJSON(files,name,mutate){const value=JSON.parse(files.get(name));mutate(value);files.set(name,json(value));}
function editCatalogAndSearch(files,mutate){
  editJSON(files,'catalog.json',catalog=>mutate(catalog.items));
  editJSON(files,'search.json',search=>{
    mutate(search.documents);
    const graph=JSON.parse(files.get('graph.json'));
    search.revision=digest(Buffer.from(JSON.stringify({nodes:graph.nodes,edges:graph.edges,documents:search.documents})));
  });
}

for(const name of ['extra.json','extra.md','reader.json','ui/app.mjs','vendor/font.woff2',`content/${'a'.repeat(64)}.md`,`assets/${'a'.repeat(64)}.svg`])test(`v2 rejects rehashed unsupported member ${name}`,async t=>{
  const {root,id}=await builtFixture(t);
  const changed=await rewrite(root,id,(_manifest,files)=>files.set(name,Buffer.from('synthetic extra payload')));
  await assert.rejects(readGeneration(root,changed),/v2 generation/);
});

for(const name of ['catalog.json','report.json','index.md','graph.json','search.json','content'])test(`v2 rejects wrong MIME for ${name}`,async t=>{
  const {root,id}=await builtFixture(t);
  const changed=await rewrite(root,id,(manifest)=>{const entry=manifest.files.find(entry=>name==='content'?entry.path.startsWith('content/'):entry.path===name);entry.contentType=entry.contentType==='text/markdown'?'application/json':'text/markdown';});
  await assert.rejects(readGeneration(root,changed),/v2 generation/);
});

for(const extension of ['png','jpg','jpeg','webp'])test(`v2 accepts hash-named ${extension} assets and rejects incorrect name hash or MIME`,async t=>{
  const {root,id}=await builtFixture(t);const bytes=Buffer.from('synthetic raster bytes');const name=`assets/${digest(bytes)}.${extension}`;
  const valid=await rewrite(root,id,(_manifest,files)=>files.set(name,bytes));
  assert.deepEqual(await (await readGeneration(root,valid)).readBytes(name),bytes);
  const wrongHash=await rewrite(root,id,(_manifest,files)=>files.set(`assets/${'0'.repeat(64)}.${extension}`,bytes));
  await assert.rejects(readGeneration(root,wrongHash),/v2 generation/);
  const wrongMime=await rewrite(root,valid,manifest=>{manifest.files.find(entry=>entry.path===name).contentType='text/markdown';});
  await assert.rejects(readGeneration(root,wrongMime),/v2 generation/);
});

for(const name of ['catalog.json','report.json','index.md','graph.json','search.json'])test(`v2 requires ${name}`,async t=>{
  const {root,id}=await builtFixture(t);const changed=await rewrite(root,id,(_manifest,files)=>files.delete(name));
  await assert.rejects(readGeneration(root,changed),/manifest|v2 generation/);
});

test('v2 rejects duplicate manifested members even with matching hashes',async t=>{
  const {root,id}=await builtFixture(t);const changed=await rewrite(root,id,manifest=>manifest.files.push({...manifest.files[0]}));
  await assert.rejects(readGeneration(root,changed),/manifest entry/);
});

test('v2 rejects catalog output outside content grammar despite coherent search and hashes',async t=>{
  const {root,id}=await builtFixture(t);
  const changed=await rewrite(root,id,(_manifest,files)=>{
    const old=JSON.parse(files.get('catalog.json')).items[0].output;
    files.set('arbitrary.md',files.get(old));files.delete(old);
    editCatalogAndSearch(files,items=>{for(const item of items)if(item.output===old)item.output='arbitrary.md';});
  });
  await assert.rejects(readGeneration(root,changed),/v2 generation/);
});

test('v2 rejects rehashed index inconsistent with report',async t=>{
  const {root,id}=await builtFixture(t);const changed=await rewrite(root,id,(_manifest,files)=>files.set('index.md',Buffer.from('unexpected index')));
  await assert.rejects(readGeneration(root,changed),/v2 generation/);
});

test('v2 catalog member must exist and bind its bytes',async t=>{
  const {root,id}=await builtFixture(t);
  for(const remove of [false,true]){
    const changed=await rewrite(root,id,(_manifest,files)=>{const name=JSON.parse(files.get('catalog.json')).items[0].output;if(remove)files.delete(name);else files.set(name,Buffer.from('changed content'));});
    await assert.rejects(readGeneration(root,changed),/v2 generation|catalog output binding/);
  }
});

for(const previewDraft of [false,true])test(`actual emitted v2 accepts empty and shared-output catalogs (draft=${previewDraft})`,async t=>{
  for(const teaching of [false,true]){
    const {root,id}=await builtFixture(t,teaching,previewDraft);const generation=await readGeneration(root,id);
    assert.equal(generation.catalog.draft,previewDraft);
    if(teaching){assert.ok(new Set(generation.catalog.items.map(item=>item.output)).size<generation.catalog.items.length);assert.ok(generation.catalog.items.some(item=>item.locator));}
    else assert.deepEqual(generation.catalog.items,[]);
  }
});

for(const version of [1,3])test(`v2 cannot be relabelled builder version ${version}`,async t=>{
  const {root,id}=await builtFixture(t);const changed=await rewrite(root,id,manifest=>{manifest.builderVersion=version;});
  await assert.rejects(readGeneration(root,changed),version===1?/legacy/:/manifest/);
});
