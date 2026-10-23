import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile, mkdtemp, rm, lstat, rename, cp } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { captureProject, readConfinedBytes } from '../lib/capture.mjs';
import { selectPublication } from '../lib/policy.mjs';
import { openKnowledge, queryKnowledge } from '../lib/knowledge.mjs';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import * as contracts from '../lib/contracts.mjs';
import { fixture, pendingRecords, teachingFixture, teachingRecords, digest, markdown } from './fixtures/publication/helpers.mjs';

async function put(root,name,bytes){await mkdir(dirname(join(root,name)),{recursive:true});await writeFile(join(root,name),bytes);}
async function save(root,name,value){await put(root,name,JSON.stringify(value));}
async function unitFixture(t,location){
  const records=pendingRecords(),text='<a id="one"></a>\nSynthetic first paragraph.\n<a id="two"></a>\nSynthetic second paragraph.\n';
  const unit=records.units.units['unit-one'];Object.assign(unit,{extractionRef:markdown(location,'one'),contentHash:digest(text),status:'verified',classification:'substantive'});
  records.units.units['unit-two']={...structuredClone(unit),id:'unit-two',extractionRef:markdown(location,'two')};
  records.units.pages['lecture-one:1'].unitIds.push('unit-two');
  records.coverage.coverage['unit-two']={...structuredClone(records.coverage.coverage['unit-one']),unitId:'unit-two'};
  return {...await fixture(t,records,{[location]:text}),text};
}
for(const value of ['study/private','study/private/one.md','study/PRIVATE/one.md','Study/private/one.md','STUDY/PrIvAtE/one.md'])test(`reserved private segments: ${value}`,()=>assert.equal(contracts.isPrivatePath(value),true));
for(const value of ['study/private-notes/one.md','study/private.md','study/privately/one.md','studying/private/one.md','study/public/private/one.md','other/study/private/one.md',null,undefined])test(`private boundary near miss: ${value}`,()=>assert.equal(contracts.isPrivatePath(value),false));

for(const directory of ['private','PRIVATE','Private'])test(`capture excludes unreferenced reserved ${directory} directory`,async t=>{
  const {root}=await fixture(t);const name=`study/${directory}/synthetic.md`;await put(root,name,'synthetic only');
  const capture=await captureProject(root);assert.equal(capture.membership.includes(name),false);await assert.rejects(capture.readBytes(name),/not captured/i);
});
for(const location of ['study/private/example.md','study/PRIVATE/example.md','Study/private/example.md'])test(`policy omits reserved source path ${location} despite allowed source channel`,async t=>{
  const {root}=await unitFixture(t,location);const selected=await selectPublication(await captureProject(root));assert.deepEqual(selected.items,[]);
});
for(const location of ['study/private-notes/example.md','study/Private.md'])test(`policy preserves genuine near-miss public path ${location}`,async t=>{
  const {root}=await unitFixture(t,location);const selected=await selectPublication(await captureProject(root));assert.equal(selected.items.length,2);
});

test('reserved-case selected exception remains exact, anchor-scoped and channel-scoped',async t=>{
  const location='study/PRIVATE/example.md';const {root,records}=await unitFixture(t,location);
  const exception={id:'selected-one',sourceId:'lecture-one',unitIds:['unit-one'],outputRefs:[markdown(location,'one')],channels:['browser'],approvedBy:'Synthetic reviewer',approvedAt:'2026-10-21T00:00:00Z',rationale:'Synthetic exact selector',inputDigest:'0'.repeat(64)};
  exception.inputDigest=await contracts.exposureDigest(root,exception,records);records.exposureExceptions.exceptions[exception.id]=exception;await save(root,'study/exposure-exceptions.json',records.exposureExceptions);
  let capture=await captureProject(root);assert.deepEqual((await selectPublication(capture)).items.map(item=>item.id),['unit-one']);assert.deepEqual((await selectPublication(capture,{channel:'export'})).items,[]);
  exception.outputRefs[0].path='study/private/example.md';
  // Even a byte-identical different spelling on a case-sensitive filesystem
  // is not permission for the original selector.
  await put(root,exception.outputRefs[0].path,await readFile(join(root,location)));
  exception.inputDigest=await contracts.exposureDigest(root,exception,records);await save(root,'study/exposure-exceptions.json',records.exposureExceptions);
  capture=await captureProject(root);assert.deepEqual((await selectPublication(capture)).items,[]);
});

test('exact stored public case and genuinely distinct Alpha/alpha remain readable',async t=>{
  const {root}=await fixture(t);await put(root,'study/Alpha.md','upper');
  assert.equal((await readConfinedBytes(root,'study/Alpha.md')).toString(),'upper');
  try{await writeFile(join(root,'study/alpha.md'),'lower',{flag:'wx'});}catch(error){if(error.code==='EEXIST'){t.skip('Filesystem does not support distinct case names');return;}throw error;}
  assert.equal((await readConfinedBytes(root,'study/Alpha.md')).toString(),'upper');assert.equal((await readConfinedBytes(root,'study/alpha.md')).toString(),'lower');
});

async function aliasFixture(t){
  // Optional parent permits an explicit bounded same-mount run. It contains
  // only this test's newly created synthetic fixtures and is never a source tree.
  const parent=process.env.FD_CASE_ALIAS_TEST_PARENT??tmpdir();await mkdir(parent,{recursive:true});const root=await mkdtemp(join(parent,'fd-case-'));
  t.after(()=>rm(root,{recursive:true,force:true}));await put(root,'Probe.txt','synthetic');
  try{const exact=await lstat(join(root,'Probe.txt')),alias=await lstat(join(root,'probe.txt'));if(exact.ino!==alias.ino||exact.dev!==alias.dev)throw Object.assign(Error(),{code:'ENOENT'});}catch(error){if(error.code==='ENOENT'){t.skip('Filesystem does not resolve case aliases; run with explicit same-mount synthetic parent');return;}throw error;}
  const original=await fixture(t);await cp(original.root,root,{recursive:true});return root;
}
for(const name of ['study/mixed/file.md','study/Mixed/FILE.md','Study/Mixed/File.md'])test(`physical read rejects filesystem alias ${name}`,async t=>{
  const root=await aliasFixture(t);if(!root)return;await put(root,'study/Mixed/File.md','synthetic');
  assert.equal((await readConfinedBytes(root,'study/Mixed/File.md')).toString(),'synthetic');await assert.rejects(readConfinedBytes(root,name),/exact.*path|case.*alias/i);
});
test('capture rejects shared source-span filename aliases rather than losing owner identity',async t=>{
  const root=await aliasFixture(t);if(!root)return;const {records}=await unitFixture(t,'study/extracted/Shared.md');
  records.manifest.sources['lecture-two']={...structuredClone(records.manifest.sources['lecture-one']),id:'lecture-two',exposure:{browser:'deny',agent:'deny',export:'deny'}};
  records.units.units['unit-two'].sourceId='lecture-two';records.units.units['unit-two'].extractionRef=markdown('study/extracted/shared.md','one');
  await save(root,'study/sources/manifest.json',records.manifest);
  await put(root,'study/extracted/Shared.md','<a id="one"></a>\nSynthetic shared span.');await save(root,'study/sources/units.json',records.units);
  await assert.rejects(captureProject(root),/exact.*path|case.*alias/i);
});
test('captured asset reference aliases fail closed while exact stored asset case works',async t=>{
  const root=await aliasFixture(t);if(!root)return;
  const {records,text}=await unitFixture(t,'study/extracted/example.md');
  await put(root,'study/extracted/example.md',text+'![synthetic](../assets/Figure.png)\n');await put(root,'study/assets/Figure.png','synthetic raster');await save(root,'study/sources/units.json',records.units);
  assert.equal((await selectPublication(await captureProject(root))).items.length,2);
  await put(root,'study/extracted/example.md',text+'![synthetic](../assets/figure.png)\n');
  await assert.rejects(selectPublication(await captureProject(root)),/not captured/i);
});
test('capture membership refuses aliased canonical root directory',async t=>{
  const root=await aliasFixture(t);if(!root)return;await rename(join(root,'study'),join(root,'Study'));
  await assert.rejects(captureProject(root),/exact.*path|case.*alias/i);
});
test('fresh recheck rejects case-only rename of a referenced excluded directory',async t=>{
  const root=await aliasFixture(t);if(!root)return;const records=pendingRecords();records.units.units['unit-one'].extractionRef=markdown('study/private/Named/example.md','one');
  await put(root,'study/private/Named/example.md','<a id="one"></a>\nSynthetic');await save(root,'study/sources/units.json',records.units);
  const capture=await captureProject(root);await rename(join(root,'study/private/Named'),join(root,'study/private/named'));
  await assert.rejects(capture.recheck(),/exact.*path|case.*alias/i);
});

test('restricted asset-owner alias cannot be omitted from shared asset lineage',async t=>{
  const root=await aliasFixture(t);if(!root)return;const {records}=await unitFixture(t,'study/extracted/example.md');
  records.manifest.sources['lecture-two']={...structuredClone(records.manifest.sources['lecture-one']),id:'lecture-two',exposure:{browser:'deny',agent:'deny',export:'deny'}};
  records.units.units['unit-two'].sourceId='lecture-two';
  await save(root,'study/sources/manifest.json',records.manifest);await save(root,'study/sources/units.json',records.units);
  await put(root,'study/extracted/example.md','<a id="one"></a>\n![public](../assets/Figure.png)\n<a id="two"></a>\n![restricted owner](../assets/figure.png)\n');
  await put(root,'study/assets/Figure.png','synthetic raster');
  await assert.rejects(selectPublication(await captureProject(root)),/not captured/i);
});

// Benign ingestion-shaped private page, never copied from actual source files.
async function privatePageFixture(t,{publicTeaching=false,exception=false}={}){
  const records=publicTeaching?teachingRecords():pendingRecords();
  if(publicTeaching)for(const source of Object.values(records.manifest.sources))source.exposure.agent='allow';
  if(!publicTeaching){records.manifest.sources={};records.units.units={};records.units.pages={};records.coverage.coverage={};records.curriculum.lectures={};}
  const source={...pendingRecords().manifest.sources['lecture-one'],id:'reference-one',kind:'textbook',exposure:{browser:'deny',agent:'deny',export:'deny'}};
  records.manifest.sources[source.id]=source;
  // The verified exception control is outside ingestion-managed extraction;
  // it is a synthetic selector test, not a fabricated source-QA approval.
  const location=`study/private/reference-one/${exception?'selected':'extracted'}/page-0001.md`,asset='study/private/reference-one/assets/page-0001.png';
  const text='# Physical page 1 — raw extraction, needs review\n\n<a id="page-1"></a>\n\n![Original full uncropped page 1](../assets/page-0001.png)\n\nRaw layout text below may flatten formulas, tables and glyphs. The image is source evidence; no semantic verification is claimed.\n\n```text\nSynthetic harmless fixture.\n```\n';
  const unit={...pendingRecords().units.units['unit-one'],id:'reference-unit',sourceId:source.id,extractionRef:markdown(location,'page-1'),contentHash:digest(text),status:exception?'verified':'needs-review',classification:exception?'substantive':'unknown'};
  records.units.units[unit.id]=unit;
  records.units.pages['reference-one:1']={sourceId:source.id,pdfPage:1,status:unit.status,unitIds:[unit.id],issueIds:[]};
  records.coverage.coverage[unit.id]={unitId:unit.id,lessonIds:[],outcomeIds:[],disposition:exception?'reference-only':'pending',reason:'Synthetic reference fixture',reviewId:null};
  const result=await (publicTeaching?teachingFixture:fixture)(t,records,{[location]:text,[asset]:Buffer.from([137,80,78,71,13,10,26,10])});
  if(exception){
    const selected={id:'reference-selection',sourceId:source.id,unitIds:[unit.id],outputRefs:[unit.extractionRef],channels:['browser'],approvedBy:'Synthetic reviewer',approvedAt:'2026-10-21T00:00:00Z',rationale:'Only this synthetic unit',inputDigest:'0'.repeat(64)};
    selected.inputDigest=await contracts.exposureDigest(result.root,selected,records);records.exposureExceptions.exceptions[selected.id]=selected;await save(result.root,'study/exposure-exceptions.json',records.exposureExceptions);
  }
  const capture=await captureProject(result.root);const validation=await contracts.validateCapturedProject(capture.readBytes);assert.equal(validation.ok,true,JSON.stringify(validation.errors));
  await assert.rejects(capture.readBytes(asset),/not captured/i);
  return {...result,capture,location,asset};
}

test('ingestion-shaped private page with uncaptured private image is omitted without graph failure',async t=>{
  const {root,capture}=await privatePageFixture(t);
  const selected=await selectPublication(capture,{channel:'agent'});assert.deepEqual(selected.items,[]);assert.equal(selected.payloads.size,0);
  const knowledge=await openKnowledge(root);assert.deepEqual(knowledge.index.documents,[]);assert.deepEqual(knowledge.graph.nodes,[]);
});

test('unrelated public teaching stays queryable alongside an omitted ingestion-shaped private page',async t=>{
  const {root}=await privatePageFixture(t,{publicTeaching:true});
  const knowledge=await openKnowledge(root);assert.ok(queryKnowledge(knowledge.index,'Synthetic lesson').hits.some(hit=>hit.id==='lesson-one'));
  assert.equal(knowledge.index.documents.some(item=>item.id==='reference-unit'),false);
  const built=await buildPublication(root,{publish:true});assert.equal(built.ok,true,JSON.stringify(built.errors));
  const generation=await readGeneration(root,built.digest);assert.ok(generation.catalog.items.some(item=>item.id==='lesson-one'));assert.equal(generation.catalog.items.some(item=>item.id==='reference-unit'),false);
});

test('exact unit exception does not authorize its uncaptured private image or publish that unit',async t=>{
  const {root,capture,records}=await privatePageFixture(t,{exception:true});
  const selectedException=records.exposureExceptions.exceptions['reference-selection'];assert.equal(await contracts.exposureDigestCaptured(capture.readBytes,selectedException,records),selectedException.inputDigest);
  const selected=await selectPublication(capture);assert.deepEqual(selected.items,[]);assert.equal(selected.payloads.size,0);
  const built=await buildPublication(root,{publish:true});assert.equal(built.ok,true,JSON.stringify(built.errors));
  const generation=await readGeneration(root,built.digest);assert.deepEqual(generation.catalog.items,[]);
  const manifest=JSON.parse(await readFile(join(root,'study/generated',built.digest,'manifest.json')));assert.equal(manifest.files.some(item=>item.path.startsWith('assets/')),false);
});
