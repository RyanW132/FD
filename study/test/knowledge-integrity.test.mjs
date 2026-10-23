import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { openKnowledge, readKnowledge, queryKnowledge } from '../lib/knowledge.mjs';
import { teachingFixture, digest } from './fixtures/publication/helpers.mjs';

async function rehashReviews(root,records){
  for(const input of records.reviews.reviews['review-one'].inputHashes)input.sha256=digest(await readFile(`${root}/${input.path}`));
  await writeFile(`${root}/study/reviews.json`,JSON.stringify(records.reviews));
}
async function rewriteGeneration(root,source,mutate){
  const base=`${root}/study/generated/${source}`;
  const manifest=JSON.parse(await readFile(`${base}/manifest.json`));
  const files=new Map(await Promise.all(manifest.files.map(async entry=>[entry.path,await readFile(`${base}/${entry.path}`)])));
  mutate(manifest,files);
  manifest.files=manifest.files.map(entry=>({...entry,sha256:digest(files.get(entry.path)),byteLength:files.get(entry.path).length}));
  const raw=Buffer.from(JSON.stringify(manifest,null,2)+'\n'),id=digest(raw),destination=`${root}/study/generated/${id}`;
  await mkdir(destination,{recursive:true});await writeFile(`${destination}/manifest.json`,raw);
  for(const [name,bytes]of files){await mkdir(`${destination}/${name.split('/').slice(0,-1).join('/')}`,{recursive:true});await writeFile(`${destination}/${name}`,bytes);}
  return id;
}

test('rehashed v2 knowledge cannot downgrade itself to legacy v1',async t=>{
  const {root}=await teachingFixture(t);const built=await buildPublication(root,{publish:true});assert.equal(built.ok,true);
  const id=await rewriteGeneration(root,built.digest,(manifest,files)=>{
    manifest.builderVersion=1;
    const graph=JSON.parse(files.get('graph.json'));graph.inputDigest='1'.repeat(64);files.set('graph.json',Buffer.from(JSON.stringify(graph)));
  });
  await assert.rejects(readGeneration(root,id),/legacy/i);
});

for(const location of ['study/lessons/one.md','study/extracted/lecture-one.md'])test(`malformed UTF8 in ${location} rejects full retrieval and normal/draft publication`,async t=>{
  const {root,records}=await teachingFixture(t);
  const old=await readFile(`${root}/${location}`);const bytes=Buffer.concat([old,Buffer.from([0xc3,0x28])]);await writeFile(`${root}/${location}`,bytes);
  if(location.includes('extracted')){
    for(const unit of Object.values(records.units.units))unit.contentHash=digest(bytes);
    await writeFile(`${root}/study/sources/units.json`,JSON.stringify(records.units));
  }
  await rehashReviews(root,records);
  for(const previewDraft of [false,true]){
    await assert.rejects(openKnowledge(root,{channel:'browser',previewDraft}));
    assert.equal((await buildPublication(root,{publish:true,previewDraft})).ok,false);
  }
});

test('valid BOM CRLF and multibyte full teaching bytes survive publication and retrieval',async t=>{
  const bytes=Buffer.from('\uFEFF<a id="lesson"></a>\r\nα 😀\r\n'+ 'complete 😀 '.repeat(6000));
  const {root,records}=await teachingFixture(t,undefined,{'study/lessons/one.md':bytes});await rehashReviews(root,records);
  const knowledge=await openKnowledge(root,{channel:'browser'});
  const full=await readKnowledge(knowledge.projection,'lesson-one',{full:true});assert.deepEqual(Buffer.from(full.text),bytes);
  assert.equal(full.draft,false);assert.equal(full.warning,null);
  const result=queryKnowledge(knowledge.index,'complete');assert.equal(result.draft,false);assert.equal(result.warning,null);assert.equal(result.hits[0].draft,false);assert.equal(result.hits[0].warning,null);
  const chunks=[];let offset=0;
  do{const chunk=await readKnowledge(knowledge.projection,'lesson-one',{offset,maxBytes:1024});chunks.push(Buffer.from(chunk.text));offset=chunk.nextOffset;}while(offset!==null);
  assert.deepEqual(Buffer.concat(chunks),bytes);
  const built=await buildPublication(root,{publish:true});assert.equal(built.ok,true,JSON.stringify(built.errors));
  const generation=await readGeneration(root,built.digest);const item=generation.catalog.items.find(item=>item.id==='lesson-one');assert.deepEqual(await generation.readBytes(item.output),bytes);
});

test('legacy compatibility rejects stripped knowledge hybrid and unknown legacy catalog fields',async t=>{
  const {root}=await teachingFixture(t);const built=await buildPublication(root,{publish:true});assert.equal(built.ok,true);
  for(const variation of ['parent','item','reserved']){
    const id=await rewriteGeneration(root,built.digest,(manifest,files)=>{
      manifest.builderVersion=1;
      files.delete('graph.json');files.delete('search.json');manifest.files=manifest.files.filter(entry=>files.has(entry.path));
      for(const name of ['catalog.json','report.json']){const value=JSON.parse(files.get(name));delete value.inputDigest;files.set(name,Buffer.from(JSON.stringify(value)));}
      const catalog=JSON.parse(files.get('catalog.json'));
      // Remove G4-only locators to first recover the original v1 item shape.
      for(const item of catalog.items){delete item.locator;delete item.status;}
      if(variation==='parent')catalog.inputDigest=manifest.inputDigest;
      if(variation==='item')catalog.items[0].unexpected=true;
      files.set('catalog.json',Buffer.from(JSON.stringify(catalog)));
      if(variation==='reserved'){files.set('knowledge.json',Buffer.from('{}'));manifest.files.push({path:'knowledge.json',contentType:'application/json'});}
    });
    await assert.rejects(readGeneration(root,id),/legacy/i);
  }
});

for(const state of ['unreviewed','stale','changes-needed'])test(`draft query and each read retain explicit warning for ${state} previews`,async t=>{
  const {root,records}=await teachingFixture(t);
  if(state==='unreviewed'){
    for(const collection of ['lessons','concepts'])for(const item of Object.values(records.curriculum[collection]))item.reviewId=null;
    await writeFile(`${root}/study/curriculum.json`,JSON.stringify(records.curriculum));await rehashReviews(root,records);
  }else if(state==='stale')await writeFile(`${root}/study/lessons/one.md`,'<a id="lesson"></a>\nChanged detailed lesson.\n');
  else{records.reviews.reviews['review-one'].verdict='changes-needed';await writeFile(`${root}/study/reviews.json`,JSON.stringify(records.reviews));}
  await assert.rejects(openKnowledge(root,{channel:'browser'}));
  const knowledge=await openKnowledge(root,{channel:'browser',previewDraft:true});
  for(const query of ['lesson','absent-search-term']){
    const result=queryKnowledge(knowledge.index,query);assert.equal(result.draft,true);assert.match(result.warning,/draft.*unreviewed/i);
    for(const hit of result.hits){assert.equal(hit.draft,true);assert.match(hit.warning,/draft.*unreviewed/i);}
    assert.ok(Buffer.byteLength(JSON.stringify(result))<=32768);
  }
  for(const options of [{full:true},{maxBytes:4},{offset:4,maxBytes:4}]){
    const read=await readKnowledge(knowledge.projection,'lesson-one',options);assert.equal(read.draft,true);assert.match(read.warning,/draft.*unreviewed/i);
  }
});

test('empty draft projection retains warning even when no documents match',async()=>{
  const {buildKnowledge}=await import('../lib/knowledge.mjs');
  const knowledge=await buildKnowledge({draft:true,items:[],metadata:{nodes:[],edges:[]}});
  const result=queryKnowledge(knowledge.index,'absent');assert.equal(result.total,0);assert.equal(result.draft,true);assert.match(result.warning,/draft.*unreviewed/i);
});

test('anchored source selection preserves CRLF and multibyte bytes through full and chunk reads',async t=>{
  const span=Buffer.from('<a id="unit-one"></a>\r\nα 😀\r\n'+'source 😀 '.repeat(5000));
  const bytes=Buffer.concat([Buffer.from('\uFEFF'),span]);
  const {root,records}=await teachingFixture(t,undefined,{'study/extracted/lecture-one.md':bytes});
  for(const unit of Object.values(records.units.units))unit.contentHash=digest(bytes);
  await writeFile(`${root}/study/sources/units.json`,JSON.stringify(records.units));await rehashReviews(root,records);
  const knowledge=await openKnowledge(root,{channel:'browser'});
  assert.deepEqual(Buffer.from((await readKnowledge(knowledge.projection,'unit-one',{full:true})).text),span);
  const parts=[];let offset=0;
  do{const chunk=await readKnowledge(knowledge.projection,'unit-one',{offset,maxBytes:1024});parts.push(Buffer.from(chunk.text));offset=chunk.nextOffset;}while(offset!==null);
  assert.deepEqual(Buffer.concat(parts),span);
});
