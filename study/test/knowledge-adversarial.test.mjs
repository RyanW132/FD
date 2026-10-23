import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat, utimes, mkdir, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { openKnowledge, queryKnowledge, readKnowledge } from '../lib/knowledge.mjs';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { knowledgeFixture, fixture, pendingRecords, put, refresh, longLesson, latePhrase, fourthPhrase, digest, sourceRef, privateFixture, reviewedLinkFixture, forgeGeneration } from './fixtures/knowledge/helpers.mjs';

const success=r=>assert.equal(r.ok,true,JSON.stringify(r));
const edges=g=>g.edges;

// Synthetic review labels below are test data, not authenticated independent approval.
test('full-text search finds an exact sentence beyond character 3000',async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root);
  assert.ok(longLesson.indexOf(latePhrase)>3000);
  const result=queryKnowledge(k.index,latePhrase);
  assert.ok(result.hits.some(hit=>hit.id==='lesson-one'),JSON.stringify(result));
  assert.equal((await readKnowledge(k.projection,'lesson-one',{full:true})).text,longLesson);
});

test('fourth article is searchable and fully retrievable rather than tour-sampled',async t=>{
  const {root}=await knowledgeFixture(t,{extraConcepts:true}),k=await openKnowledge(root);
  const result=queryKnowledge(k.index,fourthPhrase);
  assert.ok(result.hits.some(hit=>hit.id==='concept-four'),JSON.stringify(result));
  assert.match((await readKnowledge(k.projection,'concept-four',{full:true})).text,/fourth concept article/);
});

test('initial read stays within 32KiB and explicit UTF8 continuation reconstructs every byte',async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root),chunks=[];
  let offset=0,revision;
  do{
    const result=await readKnowledge(k.projection,'lesson-one',{offset,...(revision?{revision}:{})});
    assert.equal(result.offset,offset);assert.ok(Buffer.byteLength(result.text)<=32768);
    assert.ok(Buffer.byteLength(JSON.stringify(result))<=32768,'Initial serialized evidence, including locator and continuation metadata, must fit 32KiB');
    assert.equal(result.text.includes('\uFFFD'),false);
    assert.equal(result.totalBytes,Buffer.byteLength(longLesson));
    assert.equal(result.sha256,digest(longLesson));
    if(offset===0)assert.equal(result.complete,false);
    if(revision)assert.equal(result.revision,revision);else revision=result.revision;
    chunks.push(Buffer.from(result.text));
    if(result.nextOffset!==null)assert.ok(result.nextOffset>offset);
    offset=result.nextOffset;
  }while(offset!==null);
  assert.deepEqual(Buffer.concat(chunks),Buffer.from(longLesson));
});

test('explicit full read is not clipped by initial retrieval budget',async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root);
  const result=await readKnowledge(k.projection,'lesson-one',{full:true,maxBytes:32});
  assert.equal(result.text,longLesson);assert.equal(result.complete,true);assert.equal(result.nextOffset,null);
});

test('small UTF8 chunks preserve multi-byte glyphs without normalization',async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root),parts=[];
  let offset=0;
  while(offset!==null){const r=await readKnowledge(k.projection,'lesson-one',{offset,maxBytes:37});assert.ok(Buffer.byteLength(r.text)<=37);assert.equal(r.text.includes('\uFFFD'),false);parts.push(r.text);offset=r.nextOffset;}
  assert.equal(parts.join(''),longLesson);
});

for(const id of ['missing','../sources/manifest.json','/etc/passwd','study\\private\\secret.md','lesson-one\0'])test(`read denies unsafe or unknown ID ${JSON.stringify(id)}`,async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root);
  await assert.rejects(async()=>readKnowledge(k.projection,id,{full:true}));
});
for(const offset of [-1,1.5,NaN,Infinity,Number.MAX_SAFE_INTEGER])test(`read rejects invalid byte offset ${String(offset)}`,async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root);
  await assert.rejects(async()=>readKnowledge(k.projection,'lesson-one',{offset}));
});

test('read rejects byte offsets inside an encoded UTF8 character',async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root);
  const offset=Buffer.from(longLesson.slice(0,longLesson.indexOf('α'))).length+1;
  await assert.rejects(async()=>readKnowledge(k.projection,'lesson-one',{offset}));
});

test('query pagination is complete and rejects another snapshot token',async t=>{
  const {root}=await knowledgeFixture(t,{extraConcepts:true}),k=await openKnowledge(root);
  const all=queryKnowledge(k.index,'concept',{limit:100}),ids=[];let offset=0;
  while(offset!==null){const r=queryKnowledge(k.index,'concept',{offset,limit:1});assert.ok(r.hits.length<=1);ids.push(...r.hits.map(h=>h.id));offset=r.nextOffset;}
  assert.deepEqual(ids,all.hits.map(h=>h.id));assert.equal(new Set(ids).size,ids.length);
  assert.throws(()=>queryKnowledge(k.index,'concept',{revision:'0'.repeat(64)}));
  await assert.rejects(async()=>readKnowledge(k.projection,'lesson-one',{revision:'0'.repeat(64)}));
});

test('graph follows every concept of a multi-concept outcome to exact source units',async t=>{
  const {root}=await knowledgeFixture(t,{extraConcepts:true}),k=await openKnowledge(root);
  const es=edges(k.graph);
  assert.ok(es.some(e=>e.from==='lesson-one'&&e.to==='outcome-one'&&e.type==='teaches'));
  for(const id of ['concept-one','concept-two','concept-three','concept-four']){
    assert.ok(es.some(e=>e.from==='outcome-one'&&e.to===id&&e.type==='uses'),id);
    const cite=es.find(e=>e.from===id&&e.to==='unit-one'&&e.type==='cites');assert.ok(cite,id);
    assert.ok(cite.evidenceRefs.some(ref=>ref.kind==='source'&&ref.unitId==='unit-one'));
  }
  const node=k.projection.metadata.nodes.find(n=>n.id==='unit-one');
  assert.deepEqual(node.locator,{pdfPage:1});
});

test('graph has unique typed endpoints and all reverse source coverage remains represented',async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root),ids=k.graph.nodes.map(n=>n.id);
  assert.equal(new Set(ids).size,ids.length);
  const keys=k.graph.edges.map(e=>JSON.stringify([e.type,e.from,e.to]));assert.equal(new Set(keys).size,keys.length);
  for(const e of k.graph.edges){assert.ok(ids.includes(e.from),JSON.stringify(e));assert.ok(ids.includes(e.to),JSON.stringify(e));assert.ok(e.evidenceRefs.length>0);}
  for(const suffix of ['one','two','three','four']){
    assert.ok(k.graph.edges.some(e=>e.type==='contains'&&e.from===`source:lecture-${suffix}`&&e.to===`unit-${suffix}`));
    assert.ok(k.graph.edges.some(e=>e.type==='covers'&&e.from==='lesson-one'&&e.to===`unit-${suffix}`));
  }
});

test('canonical prerequisite direction and related cycles coexist',async t=>{
  const {root,records}=await knowledgeFixture(t,{extraConcepts:true});
  records.curriculum.concepts['concept-two'].prerequisiteIds=['concept-one'];records.curriculum.concepts['concept-two'].order=1;
  for(const [id,from,to]of [['related-a','concept-one','concept-two'],['related-b','concept-two','concept-one']])records.curriculum.links[id]={id,from,to,type:'related',evidenceRefs:[sourceRef('unit-one')],basis:'source',reason:'Synthetic related definitions',reviewId:'review-one'};
  for(const id of ['related-a','related-b'])records.reviews.reviews['review-one'].subjectRefs.push({kind:'record',path:'study/curriculum.json',id});
  await put(root,'study/curriculum.json',JSON.stringify(records.curriculum));await refresh(root,records);
  const k=await openKnowledge(root);
  assert.ok(k.graph.edges.some(e=>e.type==='requires'&&e.from==='concept-two'&&e.to==='concept-one'));
  assert.equal(k.graph.edges.filter(e=>e.type==='related').length,2);
});

test('canonical prerequisite cycles reject instead of generating an invented roadmap',async t=>{
  const {root,records}=await knowledgeFixture(t,{extraConcepts:true});
  records.curriculum.concepts['concept-two'].prerequisiteIds=['concept-one'];records.curriculum.concepts['concept-one'].prerequisiteIds=['concept-two'];
  await put(root,'study/curriculum.json',JSON.stringify(records.curriculum));await refresh(root,records);
  await assert.rejects(openKnowledge(root),/prereq|cycle|order|valid/i);
});

test('explicit conflict preserves both source evidence references',async t=>{
  const {root,records}=await knowledgeFixture(t,{extraConcepts:true});
  records.curriculum.links.conflict={id:'conflict',from:'concept-one',to:'concept-two',type:'contradicts',evidenceRefs:[sourceRef('unit-one'),sourceRef('unit-two')],basis:'source',reason:'Synthetic explicitly unresolved conflict',reviewId:'review-one'};
  records.reviews.reviews['review-one'].subjectRefs.push({kind:'record',path:'study/curriculum.json',id:'conflict'});
  await put(root,'study/curriculum.json',JSON.stringify(records.curriculum));await refresh(root,records);
  const k=await openKnowledge(root),conflict=k.graph.edges.find(e=>e.type==='contradicts');assert.ok(conflict);
  assert.deepEqual(conflict.evidenceRefs.map(r=>r.unitId).sort(),['unit-one','unit-two']);
});

test('agent browser and export policy stay channel-specific',async t=>{
  const {root,records}=await knowledgeFixture(t);
  for(const s of Object.values(records.manifest.sources))s.exposure={browser:'allow',agent:'deny',export:'deny'};
  await put(root,'study/sources/manifest.json',JSON.stringify(records.manifest));await refresh(root,records);
  const browser=await openKnowledge(root,{channel:'browser'});assert.ok(queryKnowledge(browser.index,latePhrase).hits.length);
  for(const channel of ['agent','export']){const k=await openKnowledge(root,{channel});assert.equal(queryKnowledge(k.index,latePhrase).hits.length,0);await assert.rejects(async()=>readKnowledge(k.projection,'lesson-one',{full:true}));}
});

test('denied transitive provenance removes paraphrased titles text and graph edges',async t=>{
  const {root}=await knowledgeFixture(t,{restricted:true}),k=await openKnowledge(root);
  const publicBytes=JSON.stringify({graph:k.graph,index:k.index});
  for(const phrase of ['SECRET PARAPHRASED','Denied paraphrase','context/synthetic.pdf','manifest.json'])assert.equal(publicBytes.includes(phrase),false,phrase);
  assert.equal(queryKnowledge(k.index,'paraphrase').hits.length,0);
  assert.equal(k.graph.nodes.some(n=>n.id==='lesson-one'),false);
  assert.equal(k.graph.edges.some(e=>e.from==='lesson-one'||e.to==='lesson-one'),false);
});

for(const path of ['study/lessons/one.md','context/synthetic.pdf'])test(`same-mtime change to ${path} invalidates fresh knowledge but not opened bytes`,async t=>{
  const {root}=await knowledgeFixture(t),k=await openKnowledge(root),old=await readKnowledge(k.projection,'lesson-one',{full:true});
  const p=join(root,path),before=await stat(p);await put(root,path,'changed after review');await utimes(p,before.atime,before.mtime);
  await assert.rejects(openKnowledge(root),/hash|review|valid|source/i);
  assert.deepEqual(await readKnowledge(k.projection,'lesson-one',{full:true}),old);
  assert.ok(queryKnowledge(k.index,latePhrase).hits.length);
});

test('pending unit never gains invented extraction or teaching completeness',async t=>{
  const records=pendingRecords();records.manifest.sources['lecture-one'].exposure.agent='allow';
  const {root}=await fixture(t,records),k=await openKnowledge(root);
  assert.equal(queryKnowledge(k.index,'definition').hits.length,0);
  const unit=k.graph.nodes.find(n=>n.id==='unit-one');
  if(unit){assert.deepEqual(unit.locator,{pdfPage:1});assert.equal(unit.status,'pending');}
  await assert.rejects(async()=>readKnowledge(k.projection,'unit-one',{full:true}));
});

test('immutable published generation retains coherent query graph and bytes after live edits',async t=>{
  const {root}=await knowledgeFixture(t);success(await buildPublication(root,{publish:true}));
  const g=await readGeneration(root),before=await g.readBytes('graph.json');
  await put(root,'study/lessons/one.md','unreviewed live update');
  const old=await readGeneration(root,g.digest);assert.deepEqual(await old.readBytes('graph.json'),before);
  const graph=JSON.parse(before),search=JSON.parse(await old.readBytes('search.json'));
  const manifest=JSON.parse(await readFile(join(root,'study/generated',old.digest,'manifest.json'),'utf8'));
  for(const output of [graph,search,old.catalog,old.report])assert.equal(output.inputDigest,manifest.inputDigest);
  assert.equal(search.revision,digest(JSON.stringify({nodes:graph.nodes,edges:graph.edges,documents:search.documents})));
});


const run=promisify(execFile),readCLI=fileURLToPath(new URL('../../scripts/study-read.mjs',import.meta.url));
async function cli(root,args){try{const r=await run(process.execPath,[readCLI,...args],{cwd:root,windowsHide:true,maxBuffer:2*1024*1024});return {code:0,...r};}catch(e){return {code:e.code,stdout:e.stdout??'',stderr:e.stderr??''};}}

test('explicit local private unit retrieval writes exact selected span only and never unlocks agent',async t=>{
  const {root}=await privateFixture(t),output='study/private/retrieval/selected.json';
  success(await buildPublication(root,{publish:true}));const publishedBefore=await readGeneration(root);const graphBefore=await publishedBefore.readBytes('graph.json');
  const result=await cli(root,['--id','unit-one','--include-private','--output',output,'--full']);
  assert.equal(result.code,0,JSON.stringify(result));
  for(const marker of ['PRIVATE_EXACT','PRIVATE_SIBLING','synthetic.pdf'])assert.equal((result.stdout+result.stderr).includes(marker),false);
  assert.match(result.stdout,/provider|external/i);
  const saved=JSON.parse(await readFile(join(root,output),'utf8'));
  assert.match(JSON.stringify(saved),/PRIVATE_EXACT_SELECTED_PARAGRAPH/);
  assert.equal(JSON.stringify(saved).includes('PRIVATE_SIBLING'),false);
  assert.deepEqual(saved.locator,{pdfPage:1});
  assert.equal((await readGeneration(root)).digest,publishedBefore.digest);
  assert.deepEqual(await (await readGeneration(root)).readBytes('graph.json'),graphBefore);
  const k=await openKnowledge(root);assert.equal(queryKnowledge(k.index,'PRIVATE_EXACT').hits.length,0);
  await assert.rejects(async()=>readKnowledge(k.projection,'unit-one',{full:true}));
});

for(const output of ['study/retrieval/leak.json','../leak.json','/tmp/leak.json','study/private/retrieval/../leak.json','study\\private\\retrieval\\leak.json'])test(`private retrieval rejects unsafe output ${JSON.stringify(output)}`,async t=>{
  const {root}=await privateFixture(t),result=await cli(root,['--id','unit-one','--include-private','--output',output,'--full']);
  assert.notEqual(result.code,0);assert.equal((result.stdout+result.stderr).includes('PRIVATE_EXACT'),false);
});

test('private retrieval never overwrites an existing output',async t=>{
  const {root}=await privateFixture(t),output='study/private/retrieval/existing.json';await put(root,output,'keep original bytes');
  const r=await cli(root,['--id','unit-one','--include-private','--output',output,'--full']);assert.notEqual(r.code,0);
  assert.equal(await readFile(join(root,output),'utf8'),'keep original bytes');
});

test('private retrieval rejects a symlinked output directory',async t=>{
  const {root}=await privateFixture(t);await mkdir(join(root,'elsewhere'));await symlink('../../elsewhere',join(root,'study/private/retrieval'));
  const result=await cli(root,['--id','unit-one','--include-private','--output','study/private/retrieval/leak.json','--full']);assert.notEqual(result.code,0);
});

test('same-mtime source mutation blocks private output instead of trusting old evidence',async t=>{
  const {root}=await privateFixture(t),p=join(root,'context/synthetic.pdf'),s=await stat(p);await put(root,'context/synthetic.pdf','changed');await utimes(p,s.atime,s.mtime);
  const r=await cli(root,['--id','unit-one','--include-private','--output','study/private/retrieval/changed.json','--full']);
  assert.notEqual(r.code,0);assert.equal((r.stdout+r.stderr).includes('PRIVATE_EXACT'),false);
});

test('private include flag is not a query or graph policy override',async t=>{
  const {root}=await privateFixture(t),script=fileURLToPath(new URL('../../scripts/study-query.mjs',import.meta.url));
  await assert.rejects(run(process.execPath,[script,'--query','PRIVATE_EXACT','--include-private'],{cwd:root,windowsHide:true}));
});


for(const policy of ['deny','unknown'])test(`shared extraction span inherits ${policy} lineage across every aliased unit`,async t=>{
  const {root,records}=await knowledgeFixture(t);records.manifest.sources['lecture-four'].exposure.agent=policy;
  await put(root,'study/sources/manifest.json',JSON.stringify(records.manifest));await refresh(root,records);
  let k;try{k=await openKnowledge(root);}catch(error){assert.equal(policy,'unknown');assert.match(error.message,/invalid/i);return;}
  const data=JSON.stringify({graph:k.graph,index:k.index});
  assert.equal(queryKnowledge(k.index,'A definition').hits.length,0);
  for(const id of ['unit-one','unit-two','unit-three','unit-four'])assert.equal(k.graph.nodes.some(n=>n.id===id),false);
  assert.equal(data.includes('Synthetic detailed lesson'),false);
});

test('initial query JSON including hit metadata fits the evidence budget',async t=>{
  const {root}=await knowledgeFixture(t,{extraConcepts:true}),k=await openKnowledge(root);
  const r=queryKnowledge(k.index,'concept',{limit:100,maxBytes:1024});
  assert.ok(Buffer.byteLength(JSON.stringify(r))<=1024);assert.ok(r.hits.length>0);
});


test('an unrelated review label cannot authorize a newly proposed nonderived edge',async t=>{
  const {root,records}=await knowledgeFixture(t,{extraConcepts:true});
  records.curriculum.links.unbound={id:'unbound',from:'concept-one',to:'concept-two',type:'related',evidenceRefs:[sourceRef('unit-one')],basis:'pedagogical',reason:'Synthetic proposal not independently reviewed as an edge',reviewId:'review-one'};
  await put(root,'study/curriculum.json',JSON.stringify(records.curriculum));await refresh(root,records);
  let k;try{k=await openKnowledge(root);}catch(error){assert.match(error.message,/review|valid/i);return;}
  assert.equal(k.graph.edges.some(e=>e.id==='unbound'||e.type==='related'),false);
});


test('independently reviewed nonderived link with complete input closure is retained',async t=>{
  const {root}=await reviewedLinkFixture(t),k=await openKnowledge(root);
  assert.ok(k.graph.edges.some(e=>e.type==='contradicts'&&e.from==='concept-one'&&e.to==='concept-two'));
});
for(const missing of ['context/synthetic.pdf','study/extracted/lecture-one.md','study/sources/manifest.json','study/sources/units.json'])test(`nonderived link cannot borrow another review's closure when missing ${missing}`,async t=>{
  const {root,records}=await reviewedLinkFixture(t);
  records.reviews.reviews['review-link'].inputHashes=records.reviews.reviews['review-link'].inputHashes.filter(h=>h.path!==missing);
  await put(root,'study/reviews.json',JSON.stringify(records.reviews));
  for(const previewDraft of [false,true])await assert.rejects(openKnowledge(root,{previewDraft}),/review|valid/i);
});

test('nonderived link source evidence becomes stale after same-mtime original byte mutation',async t=>{
  const {root}=await reviewedLinkFixture(t),p=join(root,'context/synthetic.pdf'),before=await stat(p);
  await put(root,'context/synthetic.pdf','original changed after link review');await utimes(p,before.atime,before.mtime);
  for(const previewDraft of [false,true])await assert.rejects(openKnowledge(root,{previewDraft}),/source|valid|hash/i);
});

for(const mode of ['missing graph','mixed parent','recombined search'])test(`v2 reader rejects independently rehashed ${mode}`,async t=>{
  const {root}=await knowledgeFixture(t);success(await buildPublication(root,{publish:true}));const original=await readGeneration(root);
  const id=await forgeGeneration(root,original,async({payloads})=>{
    if(mode==='missing graph')payloads.delete('graph.json');
    else if(mode==='mixed parent'){const graph=JSON.parse(payloads.get('graph.json'));graph.inputDigest='1'.repeat(64);payloads.set('graph.json',Buffer.from(JSON.stringify(graph)));}
    else{const search=JSON.parse(payloads.get('search.json'));search.documents[0].text='recombined unrelated payload';payloads.set('search.json',Buffer.from(JSON.stringify(search)));}
  });
  await assert.rejects(readGeneration(root,id),/manifest|binding|knowledge|output|search/i);
});

test('record evidence resolves full canonical path plus ID rather than a colliding unit ID',async t=>{
  const {root,records}=await knowledgeFixture(t);
  records.curriculum.concepts['concept-one'].evidenceRefs=[{kind:'record',path:'study/sources/coverage.json',id:'unit-two'}];
  await put(root,'study/curriculum.json',JSON.stringify(records.curriculum));await refresh(root,records);
  const k=await openKnowledge(root),cites=k.graph.edges.filter(e=>e.from==='concept-one'&&e.type==='cites').map(e=>e.to).sort();
  // This coverage record refers to a lesson that teaches all four units. Its ID
  // happens to equal one unit ID, but that cannot collapse evidence to that unit.
  assert.deepEqual(cites,['unit-four','unit-one','unit-three','unit-two']);
});

test('nonderived link review must bind assets reached through source evidence',async t=>{
  const {root,records}=await reviewedLinkFixture(t,{asset:true});
  assert.ok((await openKnowledge(root)).graph.edges.some(e=>e.type==='contradicts'),'Valid asset closure control');
  records.reviews.reviews['review-link'].inputHashes=records.reviews.reviews['review-link'].inputHashes.filter(h=>h.path!=='study/extracted/diagram.png');
  await put(root,'study/reviews.json',JSON.stringify(records.reviews));
  for(const previewDraft of [false,true])await assert.rejects(openKnowledge(root,{previewDraft}),/valid|review/i);
});
