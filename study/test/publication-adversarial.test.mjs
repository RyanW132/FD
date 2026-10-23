import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, rm, stat, utimes, symlink, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { captureProject } from '../lib/capture.mjs';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { selectPublication } from '../lib/policy.mjs';
import { exposureDigest } from '../lib/contracts.mjs';
import { fixture, teachingFixture, pendingRecords, teachingRecords, digest, markdown, sourceRef } from './fixtures/publication/helpers.mjs';

const lessonPath = 'study/lessons/one.md';
async function put(root,path,bytes) { await mkdir(dirname(join(root,path)),{recursive:true}); await writeFile(join(root,path),bytes); }
async function json(root,path,value) { await put(root,path,JSON.stringify(value)); }
async function publish(root,options={}) { return buildPublication(root,{publish:true,...options}); }
function success(result) { assert.equal(result.ok,true,JSON.stringify(result)); }
function rejected(result) { assert.equal(result.ok,false,JSON.stringify(result)); }
async function refreshReview(root,records) {
  for(const input of records.reviews.reviews['review-one'].inputHashes) input.sha256=digest(await readFile(join(root,input.path)));
  await json(root,'study/reviews.json',records.reviews);
}
async function allOutputs(generation) {
  const collected=[];
  for(const item of generation.catalog.items) collected.push((await generation.readBytes(item.output)).toString());
  return JSON.stringify(generation.catalog)+'\n'+JSON.stringify(generation.report)+'\n'+collected.join('\n');
}

test('capture readers retain exact bytes after same-mtime canonical mutation',async t=>{
  const {root}=await teachingFixture(t);const snapshot=await captureProject(root);
  const original=await snapshot.readBytes(lessonPath);const before=await stat(join(root,lessonPath));
  await put(root,lessonPath,'<a id="lesson"></a>Changed canonical teaching.');
  await utimes(join(root,lessonPath),before.atime,before.mtime);
  assert.deepEqual(await snapshot.readBytes(lessonPath),original);
  await assert.rejects(snapshot.recheck(),/changed/i);
});

test('captured byte buffers cannot mutate future snapshot reads',async t=>{
  const {root}=await teachingFixture(t);const snapshot=await captureProject(root);
  const original=await snapshot.readBytes(lessonPath),copy=await snapshot.readBytes(lessonPath);copy.fill(88);
  assert.deepEqual(await snapshot.readBytes(lessonPath),original);
});

test('capture never falls back to a newly added canonical path',async t=>{
  const {root}=await fixture(t);const snapshot=await captureProject(root);
  await put(root,'study/new.md','not captured');
  await assert.rejects(snapshot.readBytes('study/new.md'));
});

for(const [name,mutate] of [
  ['same-mtime bytes',async root=>{const p=join(root,lessonPath),s=await stat(p);await writeFile(p,'changed');await utimes(p,s.atime,s.mtime);}],
  ['added candidate',root=>put(root,'study/new.md','new')],
  ['removed candidate',root=>rm(join(root,lessonPath))],
])test(`capture rejects ${name} during capture/recheck`,async t=>{
  const {root}=await teachingFixture(t);
  await assert.rejects(captureProject(root,{testHooks:{afterCapture:()=>mutate(root)}}),/changed|ENOENT/i);
});

for(const path of ['../outside.md','/etc/passwd','study\\bad.md','study/a\0b'])test(`snapshot denies unsafe lookup ${JSON.stringify(path)}`,async t=>{
  const {root}=await fixture(t);const snapshot=await captureProject(root);await assert.rejects(snapshot.readBytes(path));
});

test('candidate symlinks are not accepted even when their target is internal',async t=>{
  const {root}=await fixture(t);await symlink('sources/manifest.json',join(root,'study/alias.json'));
  await assert.rejects(captureProject(root),/symlink/i);
});

test('status-only pending production can publish without claiming teaching readiness',async t=>{
  const {root}=await fixture(t);const result=await publish(root);success(result);
  const generation=await readGeneration(root);assert.equal(generation.report.readiness.teachingComplete,false);
});

test('explicit reviewed publication captures all catalog bytes and deterministic rebuilds',async t=>{
  const {root}=await teachingFixture(t);const first=await publish(root);success(first);
  const generation=await readGeneration(root);assert.equal(generation.digest,first.digest);
  for(const item of generation.catalog.items)assert.equal(digest(await generation.readBytes(item.output)),item.sha256);
  const second=await publish(root);success(second);assert.equal(second.digest,first.digest);
  assert.deepEqual((await readGeneration(root)).catalog,generation.catalog);
});

test('canonical multi-file edits alone never advance an explicitly published pointer',async t=>{
  const {root}=await teachingFixture(t);const first=await publish(root);success(first);
  await put(root,lessonPath,'<a id="lesson"></a>New completed batch not yet published.');
  assert.equal((await readGeneration(root)).digest,first.digest);
  const dry=await buildPublication(root,{previewDraft:true});
  assert.equal((await readGeneration(root)).digest,first.digest,'A build without publish must not switch pointer');
});

test('old publication remains byte-identical after canonical lesson and curriculum change',async t=>{
  const {root,records}=await teachingFixture(t);const first=await publish(root);success(first);
  const g1=await readGeneration(root,first.digest),before=await allOutputs(g1);
  await put(root,lessonPath,'<a id="lesson"></a>New reviewed teaching.');
  records.curriculum.lessons['lesson-one'].title='New reviewed title';await json(root,'study/curriculum.json',records.curriculum);
  await refreshReview(root,records);const second=await publish(root);success(second);assert.notEqual(second.digest,first.digest);
  assert.equal(await allOutputs(await readGeneration(root,first.digest)),before);
  assert.equal(await allOutputs(g1),before);
});

test('stale lesson review rejects normal publish but permits visibly non-teaching draft',async t=>{
  const {root}=await teachingFixture(t);success(await publish(root));
  await put(root,lessonPath,'<a id="lesson"></a>Changed after synthetic review.');
  rejected(await publish(root));const draft=await publish(root,{previewDraft:true});success(draft);
  const generation=await readGeneration(root);assert.equal(generation.report.draft,true);
  assert.equal(generation.report.readiness.teachingComplete,false);
  assert.match(JSON.stringify(generation.report),/draft|stale/i);
});

test('re-review binds exact current bytes and restores reviewed publication',async t=>{
  const {root,records}=await teachingFixture(t);await put(root,lessonPath,'<a id="lesson"></a>Fresh synthetic revision.');
  rejected(await publish(root));await refreshReview(root,records);success(await publish(root));
  assert.equal((await readGeneration(root)).report.draft,false);
});

for(const [name,mutate]of[
  ['unknown schema field',r=>{r.curriculum.lessons['lesson-one'].trusted=true;}],
  ['unresolved lesson path',r=>{r.curriculum.lessons['lesson-one'].path='study/missing.md';}],
  ['review subject mismatch',r=>{r.reviews.reviews['review-one'].subjectRefs=[markdown('study/review-evidence.md','review')];}],
])test(`draft preview cannot bypass ${name}`,async t=>{
  const {root,records}=await teachingFixture(t);mutate(records);
  await json(root,'study/curriculum.json',records.curriculum);await json(root,'study/reviews.json',records.reviews);
  rejected(await publish(root,{previewDraft:true}));
});

for(const stage of ['beforeCommit','afterGeneration'])test(`failure at ${stage} retains complete old publication`,async t=>{
  const {root,records}=await teachingFixture(t);const first=await publish(root);success(first);
  await put(root,lessonPath,'<a id="lesson"></a>Next valid revision.');await refreshReview(root,records);
  try { await publish(root,{testHooks:{[stage]:()=>{throw Error('synthetic crash');}}}); } catch(error) { assert.match(error.message,/synthetic crash/); }
  const current=await readGeneration(root);assert.equal(current.digest,first.digest);await allOutputs(current);
});

test('build rejects changed candidate after capture and leaves old pointer untouched',async t=>{
  const {root}=await teachingFixture(t);const first=await publish(root);success(first);
  const result=await publish(root,{testHooks:{afterCapture:()=>put(root,'study/racing.md','race')}});rejected(result);
  assert.equal((await readGeneration(root)).digest,first.digest);
});

const canary='SYNTHETIC_RESTRICTED_BOOK_CANARY_47';
// Isolated synthetic policy evidence; never impersonates ingestion-managed private source outputs.
async function restrictedFixture(t,{unknown=false,transitive=false}={}) {
  const records=teachingRecords();
  const source={...structuredClone(records.manifest.sources['lecture-one']),id:'book',kind:'textbook',
    originalPath:'context/SENSITIVE-BOOK-NAME.pdf',sha256:digest('synthetic book original'),byteLength:23,
    exposure:{browser:unknown?'unknown':'deny',export:'deny',agent:'deny'}};
  source.byteLength=Buffer.byteLength('synthetic book original');
  records.manifest.sources.book=source;
  const text=`<a id="selected"></a>\n${canary} selected raw paragraph.\n<a id="sibling"></a>\n${canary} sibling never approved.\n`;
  for(const id of ['selected','sibling']) {
    records.units.units[`book-${id}`]={id:`book-${id}`,sourceId:'book',locator:{pdfPage:1},extractionRef:markdown('study/private/book/extracted.md',id),contentHash:digest(text),status:'verified',classification:'substantive',issueIds:[]};
    records.coverage.coverage[`book-${id}`]={unitId:`book-${id}`,lessonIds:[],outcomeIds:[],disposition:'reference-only',reason:'Restricted reference',reviewId:null};
  }
  records.units.pages['book:1']={sourceId:'book',pdfPage:1,status:'verified',unitIds:['book-selected','book-sibling'],issueIds:[]};
  if(transitive)records.curriculum.concepts['concept-one'].evidenceRefs.push(sourceRef('book-selected'));
  else records.curriculum.lessons['lesson-one'].sourceUnitIds.push('book-selected');
  const result=await teachingFixture(t,records,{
    'context/SENSITIVE-BOOK-NAME.pdf':'synthetic book original','study/private/book/extracted.md':text,
    [lessonPath]:`<a id="lesson"></a>\nA paraphrased restricted explanation without a literal canary.\n![${canary} confidential alt](../private/book/secret.png)\n`,
    'study/private/book/secret.png':Buffer.from(`synthetic image bytes ${canary}`),
  });
  for(const path of ['context/SENSITIVE-BOOK-NAME.pdf','study/private/book/extracted.md','study/private/book/secret.png'])records.reviews.reviews['review-one'].inputHashes.push({path,sha256:digest(await readFile(join(result.root,path)))});
  await refreshReview(result.root,records);return result;
}

for(const transitive of [false,true])test(`restricted ${transitive?'transitive concept':'direct lesson'} lineage cannot leak into generated defaults`,async t=>{
  const {root}=await restrictedFixture(t,{transitive});const result=await publish(root);success(result);
  const generation=await readGeneration(root),outputs=await allOutputs(generation);
  for(const secret of [canary,'SENSITIVE-BOOK-NAME','private/book.md','private/secret.png','paraphrased restricted explanation'])assert.equal(outputs.includes(secret),false,secret);
  assert.ok(!generation.catalog.items.some(item=>item.id==='lesson-one'),'Denied lineage omits teaching even without literal canary');
});

test('unknown policy cannot be silently interpreted as permission in draft publication',async t=>{
  const {root}=await restrictedFixture(t,{unknown:true});const result=await publish(root,{previewDraft:true});
  if(result.ok)assert.equal((await allOutputs(await readGeneration(root))).includes(canary),false);else rejected(result);
});

test('exact browser exception for one anchor never unlocks restricted sibling bytes',async t=>{
  const {root,records}=await restrictedFixture(t);
  const exception={id:'selected-output',sourceId:'book',unitIds:['book-selected'],
    outputRefs:[markdown('study/private/book/extracted.md','selected')],channels:['browser'],
    approvedBy:'Synthetic test approver, not an authenticated real approval',approvedAt:'2026-10-21T00:00:00Z',rationale:'Only selected synthetic paragraph',inputDigest:'0'.repeat(64)};
  exception.inputDigest=await exposureDigest(root,exception,records);records.exposureExceptions.exceptions[exception.id]=exception;
  await json(root,'study/exposure-exceptions.json',records.exposureExceptions);
  const result=await publish(root);success(result);const outputs=await allOutputs(await readGeneration(root));
  assert.equal(outputs.includes('selected raw paragraph'),true,'Exact selected browser output remains usable');
  const exported=await selectPublication(await captureProject(root),{channel:'export'});
  for(const bytes of exported.payloads.values())assert.equal(bytes.toString().includes(canary),false,'Browser exception grants no export permission');
  assert.equal(outputs.includes('sibling never approved'),false,'File-wide digest cannot turn selected anchor permission into whole-file exposure');
  assert.equal(outputs.includes('paraphrased restricted explanation'),false,'Exception does not authorize unrelated lesson output');
});

test('changed selected exception output expires authorization rather than exposing edited bytes',async t=>{
  const {root,records}=await restrictedFixture(t);
  const exception={id:'selected-output',sourceId:'book',unitIds:['book-selected'],outputRefs:[markdown('study/private/book/extracted.md','selected')],channels:['browser'],approvedBy:'Synthetic reviewer',approvedAt:'2026-10-21T00:00:00Z',rationale:'Selected output only',inputDigest:'0'.repeat(64)};
  exception.inputDigest=await exposureDigest(root,exception,records);records.exposureExceptions.exceptions[exception.id]=exception;
  await json(root,'study/exposure-exceptions.json',records.exposureExceptions);
  await put(root,'study/private/book/extracted.md',`<a id="selected"></a>\n${canary} EDITED-AFTER-APPROVAL`);
  const result=await publish(root,{previewDraft:true});
  if(result.ok)assert.equal((await allOutputs(await readGeneration(root))).includes('EDITED-AFTER-APPROVAL'),false);else rejected(result);
});

for(const syntax of [
  '![Image](../assets/one.png)',
  '<img src="../assets/one.png" alt="synthetic image">',
  '![Image][figure]\n\n[figure]: ../assets/one.png',
])test(`asset reference is captured or rejected, never silently dangling: ${syntax.split('\n')[0]}`,async t=>{
  const {root,records}=await teachingFixture(t,teachingRecords(),{[lessonPath]:`<a id="lesson"></a>\n${syntax}\n`,'study/assets/one.png':Buffer.from('synthetic image bytes')});
  await refreshReview(root,records);const result=await publish(root);
  if(!result.ok)return;
  const generation=await readGeneration(root),bytes=await allOutputs(generation);
  assert.ok(bytes.includes('synthetic image bytes') || !bytes.includes('../assets/one.png'),'Allowed referenced assets must be materialized/relinked or publication must reject');
});

for(const tamper of ['unknown field','unsafe digest','wrong version','symlink'])test(`generation reader rejects current-pointer ${tamper}`,async t=>{
  const {root}=await fixture(t);const first=await publish(root);success(first);
  const pointer=join(root,'study/generated/current.json');
  if(tamper==='symlink'){await rm(pointer);await symlink('../curriculum.json',pointer);}
  else await writeFile(pointer,JSON.stringify(tamper==='unknown field'?{schemaVersion:1,digest:first.digest,extra:true}:tamper==='unsafe digest'?{schemaVersion:1,digest:'../sources'}:{schemaVersion:2,digest:first.digest}));
  await assert.rejects(readGeneration(root));
});

for(const mutation of ['catalog bytes','missing payload','extra file','payload symlink'])test(`existing immutable generation rejects ${mutation} and cannot be reused`,async t=>{
  const {root}=await teachingFixture(t);const first=await publish(root);success(first);
  const base=join(root,'study/generated',first.digest);
  if(mutation==='catalog bytes')await writeFile(join(base,'catalog.json'),'{}');
  else if(mutation==='missing payload')await rm(join(base,'index.md'));
  else if(mutation==='extra file')await writeFile(join(base,'unlisted-secret.md'),'unlisted mutable data');
  else{await rm(join(base,'index.md'));await symlink('report.json',join(base,'index.md'));}
  await assert.rejects(readGeneration(root,first.digest));
  rejected(await publish(root));
});

test('opened generation reader is pinned even when generation files are modified afterwards',async t=>{
  const {root}=await teachingFixture(t);const first=await publish(root);success(first);
  const generation=await readGeneration(root),before=await generation.readBytes('index.md');
  await writeFile(join(root,'study/generated',first.digest,'index.md'),'tampered after open');
  assert.deepEqual(await generation.readBytes('index.md'),before);
  const copy=await generation.readBytes('index.md');copy.fill(0);assert.deepEqual(await generation.readBytes('index.md'),before);
});

test('captured parsed metadata cannot be modified to bypass lineage policy',async t=>{
  const {root}=await restrictedFixture(t);const snapshot=await captureProject(root);
  assert.throws(()=>{snapshot.records.manifest.sources.book.exposure.browser='allow';},TypeError);
  assert.throws(()=>{snapshot.records.curriculum.lessons['lesson-one'].sourceUnitIds=[];},TypeError);
  const selected=await selectPublication(snapshot);
  assert.equal(selected.items.some(item=>item.id==='lesson-one'),false);
});

test('precommit member additions leave the current generation unchanged',async t=>{
  const {root}=await teachingFixture(t);const first=await publish(root);success(first);
  const result=await publish(root,{testHooks:{beforeCommit:()=>put(root,'study/late.md','late member')}});rejected(result);
  assert.equal((await readGeneration(root)).digest,first.digest);
});

async function diskGenerationBytes(root,id) {
  const chunks=[];
  async function visit(directory) { for(const entry of await readdir(directory,{withFileTypes:true})) { const p=join(directory,entry.name); if(entry.isDirectory())await visit(p);else if(entry.isFile())chunks.push(await readFile(p)); } }
  await visit(join(root,'study/generated',id));return Buffer.concat(chunks).toString();
}

test('an allowed owner cannot launder an asset also owned by restricted teaching',async t=>{
  const {root,records}=await restrictedFixture(t);
  await put(root,'study/concepts/one.md','<a id="concept"></a>\n![Public-looking image](shared.png)');
  await put(root,lessonPath,'<a id="lesson"></a>\n![Restricted origin](../concepts/shared.png)');
  await put(root,'study/concepts/shared.png',Buffer.from(`image ${canary}`));
  records.reviews.reviews['review-one'].inputHashes.push({path:'study/concepts/shared.png',sha256:digest(await readFile(join(root,'study/concepts/shared.png')))});
  await refreshReview(root,records);const result=await publish(root);
  if(result.ok)assert.equal((await diskGenerationBytes(root,result.digest)).includes(canary),false,'Shared asset inherits restricted owner, not just allowed referring owner');else rejected(result);
});

for(const change of ['missing review asset hash','same-mtime reviewed asset bytes'])test(`reviewed image dependencies reject ${change}`,async t=>{
  const records=teachingRecords();const {root}=await teachingFixture(t,records,{
    [lessonPath]:'<a id="lesson"></a>\n![Reviewed diagram](figure.png)',
    'study/lessons/figure.png':Buffer.from('synthetic reviewed figure'),
  });
  if(change==='same-mtime reviewed asset bytes')records.reviews.reviews['review-one'].inputHashes.push({path:'study/lessons/figure.png',sha256:digest(await readFile(join(root,'study/lessons/figure.png')))});
  await refreshReview(root,records);
  if(change==='same-mtime reviewed asset bytes') {
    success(await publish(root));const p=join(root,'study/lessons/figure.png'),before=await stat(p);await writeFile(p,'edited diagram same mtime');await utimes(p,before.atime,before.mtime);
  }
  rejected(await publish(root));
  if(change==='missing review asset hash')rejected(await publish(root,{previewDraft:true}));
});

test('safe normalized parent-relative image is captured and rewritten within repository',async t=>{
  const {root,records}=await teachingFixture(t,teachingRecords(),{
    [lessonPath]:'<a id="lesson"></a>\n![Reviewed source diagram](../assets/figure.png)',
    'study/assets/figure.png':Buffer.from('synthetic parent-relative figure'),
  });
  records.reviews.reviews['review-one'].inputHashes.push({path:'study/assets/figure.png',sha256:digest(await readFile(join(root,'study/assets/figure.png')))});
  await refreshReview(root,records);const result=await publish(root);success(result);
  assert.ok((await diskGenerationBytes(root,result.digest)).includes('synthetic parent-relative figure'));
});

test('record evidence resolves by path and kind despite a public concept with a colliding unit ID',async t=>{
  const {root,records}=await restrictedFixture(t);
  records.curriculum.lessons['lesson-one'].sourceUnitIds=records.curriculum.lessons['lesson-one'].sourceUnitIds.filter(id=>id!=='book-selected');
  records.curriculum.concepts['concept-one'].evidenceRefs=[{kind:'record',path:'study/sources/units.json',id:'book-selected'}];
  records.curriculum.concepts['book-selected']={id:'book-selected',title:'Unrelated allowed concept shares an ID',path:'study/concepts/public-alias.md',evidenceRefs:[sourceRef('unit-one')],prerequisiteIds:[],order:0,reviewId:'review-one'};
  await put(root,lessonPath,'<a id="lesson"></a>\nSensitive derived teaching '+canary);
  await put(root,'study/concepts/public-alias.md','<a id="alias"></a>\nUnrelated public concept.');
  records.reviews.reviews['review-one'].subjectRefs.push(markdown('study/concepts/public-alias.md','alias'));
  records.reviews.reviews['review-one'].inputHashes.push({path:'study/concepts/public-alias.md',sha256:digest(await readFile(join(root,'study/concepts/public-alias.md')))});
  await json(root,'study/curriculum.json',records.curriculum);await refreshReview(root,records);
  const selected=await selectPublication(await captureProject(root));
  for(const bytes of selected.payloads.values())assert.equal(bytes.toString().includes(canary),false,'Matching ID in another canonical file cannot redirect restricted evidence');
  const result=await publish(root);
  if(result.ok)assert.equal((await diskGenerationBytes(root,result.digest)).includes(canary),false);else rejected(result);
});

test('pre-existing empty digest directory is corruption, not a retryable missing destination',async t=>{
  const {root}=await fixture(t);const dry=await buildPublication(root);success(dry);
  const directory=join(root,'study/generated',dry.digest);await mkdir(directory);
  const result=await publish(root);rejected(result);
  assert.deepEqual(await readdir(directory),[],'Invalid existing generation stays unchanged');
});

test('selected output authorization expires when bound original bytes change coherently',async t=>{
  const {root,records}=await restrictedFixture(t);
  const exception={id:'selected-output',sourceId:'book',unitIds:['book-selected'],outputRefs:[markdown('study/private/book/extracted.md','selected')],channels:['browser'],approvedBy:'Synthetic reviewer',approvedAt:'2026-10-21T00:00:00Z',rationale:'Exact original only',inputDigest:'0'.repeat(64)};
  exception.inputDigest=await exposureDigest(root,exception,records);records.exposureExceptions.exceptions[exception.id]=exception;
  await json(root,'study/exposure-exceptions.json',records.exposureExceptions);
  const changed='changed synthetic book original';await put(root,records.manifest.sources.book.originalPath,changed);
  Object.assign(records.manifest.sources.book,{sha256:digest(changed),byteLength:Buffer.byteLength(changed)});
  await json(root,'study/sources/manifest.json',records.manifest);await refreshReview(root,records);
  const selected=await selectPublication(await captureProject(root));
  assert.equal(selected.items.some(item=>item.id==='book-selected'),false,'Old inputDigest cannot authorize newly bound original');
});

test('default generation payloads contain no restricted raw text, filenames, alt text, or image bytes',async t=>{
  const {root}=await restrictedFixture(t);const result=await publish(root);success(result);
  const everyByte=await diskGenerationBytes(root,result.digest);
  for(const secret of [canary,'SENSITIVE-BOOK-NAME','private/book/secret.png','selected raw paragraph','sibling never approved','paraphrased restricted explanation'])assert.equal(everyByte.includes(secret),false,secret);
});

for(const shape of ['identical unit span','public whole-file owner','restricted whole-file owner'])test(`shared extraction ${shape} inherits the restrictive owner`,async t=>{
  const {root,records}=await restrictedFixture(t);
  // Remove private asset syntax so the assertion isolates content-owner provenance.
  await put(root,lessonPath,'<a id="lesson"></a>\nA separately classified lesson.');
  if(shape==='identical unit span') {
    records.units.units['unit-one'].extractionRef=structuredClone(records.units.units['book-selected'].extractionRef);
    records.units.units['unit-one'].contentHash=records.units.units['book-selected'].contentHash;
  } else {
    records.curriculum.concepts['concept-one'].path='study/private/book/extracted.md';
    if(shape==='restricted whole-file owner') {
      // Public unit's broader containing file overlaps the denied concept's evidence.
      records.curriculum.concepts['concept-one'].evidenceRefs=[sourceRef('book-selected')];
      records.units.units['unit-one'].extractionRef=markdown('study/private/book/extracted.md','sibling');
      records.units.units['unit-one'].contentHash=records.units.units['book-selected'].contentHash;
    }
  }
  await json(root,'study/sources/units.json',records.units);await json(root,'study/curriculum.json',records.curriculum);
  const selected=await selectPublication(await captureProject(root));
  for(const bytes of selected.payloads.values())assert.equal(bytes.toString().includes(canary),false,'No public alias may expose identical/containing restricted bytes');
});

for(const evidence of ['empty concept','restricted source record','restricted lecture record'])test(`dependent teaching denies ${evidence} lineage rather than treating it as neutral`,async t=>{
  const {root,records}=await restrictedFixture(t);
  records.curriculum.lessons['lesson-one'].sourceUnitIds=records.curriculum.lessons['lesson-one'].sourceUnitIds.filter(id=>id!=='book-selected');
  await put(root,lessonPath,`<a id="lesson"></a>\nDerived sensitive teaching ${canary}`);
  if(evidence==='empty concept')records.curriculum.concepts['concept-one'].evidenceRefs=[];
  else if(evidence==='restricted source record')records.curriculum.concepts['concept-one'].evidenceRefs=[{kind:'record',path:'study/sources/manifest.json',id:'book'}];
  else {
    // A lecture record carries its source policy through all units of that source.
    records.manifest.sources['lecture-two'].exposure.browser='deny';
    records.curriculum.concepts['concept-one'].evidenceRefs=[{kind:'record',path:'study/curriculum.json',id:'lecture-two'}];
  }
  await json(root,'study/sources/manifest.json',records.manifest);await json(root,'study/curriculum.json',records.curriculum);
  const selected=await selectPublication(await captureProject(root));
  assert.equal(selected.items.some(item=>item.id==='lesson-one'),false,'Public unit evidence cannot cancel unclassified or denied prerequisite evidence');
  for(const bytes of selected.payloads.values())assert.equal(bytes.toString().includes(canary),false);
});

test('changes-needed review rejects normal publication but explicit preview is visibly unreviewed',async t=>{
  const {root,records}=await teachingFixture(t);records.reviews.reviews['review-one'].verdict='changes-needed';
  await json(root,'study/reviews.json',records.reviews);
  const normal=await publish(root);rejected(normal);assert.ok(normal.errors.some(error=>error.code==='REVIEW_REJECTED'));
  const preview=await publish(root,{previewDraft:true});success(preview);
  const generation=await readGeneration(root);assert.equal(generation.report.draft,true);
  assert.equal(generation.report.readiness.teachingComplete,false);
  assert.ok(generation.report.draftReasons.includes('REVIEW_REJECTED'));
  assert.ok(generation.catalog.items.every(item=>item.draft===true));
});

for(const verdict of ['approved','changes-needed'])test(`missing required input hashes stay fatal in preview with ${verdict} verdict`,async t=>{
  const {root,records}=await teachingFixture(t);const review=records.reviews.reviews['review-one'];review.verdict=verdict;
  review.inputHashes=review.inputHashes.filter(input=>input.path!=='study/concepts/one.md');
  await json(root,'study/reviews.json',records.reviews);rejected(await publish(root,{previewDraft:true}));
});

test('late mutation after generation rename cannot switch current pointer to an unchecked candidate',async t=>{
  const {root,records}=await teachingFixture(t);const first=await publish(root);success(first);
  await put(root,lessonPath,'<a id="lesson"></a>\nFresh completed batch.');await refreshReview(root,records);
  const result=await publish(root,{testHooks:{afterGeneration:()=>put(root,'study/late-member.md','late race')}});rejected(result);
  assert.equal((await readGeneration(root)).digest,first.digest);
});

async function addReviewedFile(root,records,path,bytes) {
  await put(root,path,bytes);
  records.reviews.reviews['review-one'].inputHashes.push({path,sha256:digest(await readFile(join(root,path)))});
}

for(const shape of ['concept path','prerequisite lesson path','exercise prompt','exercise answer','Markdown evidence','ordinary source extraction'])test(`private ${shape} taints public derived teaching despite allowed course-source policy`,async t=>{
  const {root,records}=await teachingFixture(t);
  await put(root,lessonPath,`<a id="lesson"></a>\nPublic paraphrase of a private contributor ${canary}`);
  if(shape==='concept path') {
    const path='study/private/secret-concept.md';
    await addReviewedFile(root,records,path,'<a id="concept"></a>\nPrivate concept from ordinary permitted evidence.');
    records.curriculum.concepts['concept-one'].path=path;
    for(const ref of records.reviews.reviews['review-one'].subjectRefs)if(ref.path==='study/concepts/one.md')ref.path=path;
  } else if(shape==='prerequisite lesson path') {
    const path='study/private/secret-lesson.md';
    await addReviewedFile(root,records,path,'<a id="lesson"></a>\nPrivate prerequisite lesson.');
    const privateLesson=structuredClone(records.curriculum.lessons['lesson-one']);
    Object.assign(privateLesson,{id:'private-lesson',path,title:'Private prerequisite',order:0,conceptIds:[],prerequisiteIds:[]});
    records.curriculum.lessons['private-lesson']=privateLesson;
    records.curriculum.lessons['lesson-one'].prerequisiteIds=['private-lesson'];
    records.curriculum.outcomes['outcome-one'].lessonIds.push('private-lesson');
    for(const lecture of Object.values(records.curriculum.lectures))lecture.lessonIds.push('private-lesson');
    for(const coverage of Object.values(records.coverage.coverage))coverage.lessonIds.push('private-lesson');
    records.reviews.reviews['review-one'].subjectRefs.push(markdown(path,'lesson'),{kind:'record',path:'study/curriculum.json',id:'private-lesson'});
  } else if(shape.startsWith('exercise')) {
    const path='study/private/secret-exercise.md';await addReviewedFile(root,records,path,await readFile(join(root,'study/exercises/one.md')));
    records.curriculum.exercises['exercise-one'][shape==='exercise prompt'?'promptRef':'answerRef'].path=path;
  } else if(shape==='Markdown evidence') {
    const path='study/private/secret-evidence.md';await addReviewedFile(root,records,path,'<a id="private"></a>\nPrivate contribution.');
    records.curriculum.concepts['concept-one'].evidenceRefs.push(markdown(path,'private'));
  } else {
    const path='study/private/course/source.md';await addReviewedFile(root,records,path,await readFile(join(root,'study/extracted/lecture-one.md')));
    for(const unit of Object.values(records.units.units))unit.extractionRef.path=path;
  }
  await json(root,'study/curriculum.json',records.curriculum);await json(root,'study/sources/coverage.json',records.coverage);await json(root,'study/sources/units.json',records.units);await refreshReview(root,records);
  const selected=await selectPublication(await captureProject(root));
  assert.equal(selected.items.some(item=>item.id==='lesson-one'),false,'Public derived teaching must inherit private path origin');
  for(const bytes of selected.payloads.values())assert.equal(bytes.toString().includes(canary),false);
  const result=await publish(root);success(result);
  assert.equal((await diskGenerationBytes(root,result.digest)).includes(canary),false);assert.equal(result.report.readiness.teachingComplete,false,'Withheld teaching must not be advertised complete');
});

test('source-span exception cannot unlock a public lesson depending on a different private concept path',async t=>{
  const {root,records}=await restrictedFixture(t);
  await put(root,lessonPath,`<a id="lesson"></a>\nUnrelated private derived lesson ${canary}`);
  await addReviewedFile(root,records,'study/private/other-concept.md','<a id="concept"></a>\nUnrelated private conceptual evidence.');
  records.curriculum.concepts['concept-one'].path='study/private/other-concept.md';
  const exception={id:'selected-output',sourceId:'book',unitIds:['book-selected'],outputRefs:[markdown('study/private/book/extracted.md','selected')],channels:['browser'],approvedBy:'Synthetic approver',approvedAt:'2026-10-21T00:00:00Z',rationale:'Selected book source span only',inputDigest:'0'.repeat(64)};
  exception.inputDigest=await exposureDigest(root,exception,records);records.exposureExceptions.exceptions[exception.id]=exception;
  await json(root,'study/curriculum.json',records.curriculum);await json(root,'study/exposure-exceptions.json',records.exposureExceptions);
  const selected=await selectPublication(await captureProject(root));
  assert.ok(selected.items.some(item=>item.id==='book-selected'),'Control: approved selected span is available');
  assert.equal(selected.items.some(item=>item.id==='lesson-one'),false);
});

test('restricted shared asset taints a dependent public lesson even without a direct image reference',async t=>{
  const {root,records}=await restrictedFixture(t);
  records.curriculum.lessons['lesson-one'].sourceUnitIds=records.curriculum.lessons['lesson-one'].sourceUnitIds.filter(id=>id!=='book-selected');
  await put(root,lessonPath,`<a id="lesson"></a>\nParaphrase of shared-asset concept ${canary}`);
  await put(root,'study/concepts/one.md','<a id="concept"></a>\n![Diagram](shared.png)');
  await addReviewedFile(root,records,'study/concepts/shared.png',`image ${canary}`);
  records.curriculum.concepts['private-concept']={id:'private-concept',title:'Restricted asset origin',path:'study/concepts/restricted-owner.md',evidenceRefs:[sourceRef('book-selected')],prerequisiteIds:[],order:0,reviewId:'review-one'};
  await addReviewedFile(root,records,'study/concepts/restricted-owner.md','<a id="restricted"></a>\n![Diagram](shared.png)');
  await json(root,'study/curriculum.json',records.curriculum);
  const selected=await selectPublication(await captureProject(root));
  assert.equal(selected.items.some(item=>item.id==='lesson-one'),false);
  for(const bytes of selected.payloads.values())assert.equal(bytes.toString().includes(canary),false);
});

for(const subject of ['lesson','concept','coverage'])test(`review subjects must bind canonical ${subject} path, not an unrelated same-ID record`,async t=>{
  const {root,records}=await teachingFixture(t);const review=records.reviews.reviews['review-one'];
  const id=subject==='lesson'?'lesson-one':subject==='concept'?'concept-one':'unit-one';
  if(subject!=='coverage') {
    const subjectPath=subject==='lesson'?lessonPath:'study/concepts/one.md';
    review.subjectRefs=review.subjectRefs.filter(ref=>!(ref.kind==='markdown'&&ref.path===subjectPath));
    if(subject==='concept')review.subjectRefs.push({kind:'record',path:'study/curriculum.json',id});
  }
  const originalPath=subject!=='coverage'?'study/curriculum.json':'study/sources/coverage.json';
  for(const ref of review.subjectRefs)if(ref.kind==='record'&&ref.id===id&&ref.path===originalPath)ref.path='study/unrelated-record.json';
  await addReviewedFile(root,records,'study/unrelated-record.json',JSON.stringify({schemaVersion:1,unrelated:{[id]:{id,note:'Not the reviewed canonical subject'}}}));
  await json(root,'study/reviews.json',records.reviews);
  const result=await publish(root);rejected(result);
  rejected(await publish(root,{previewDraft:true}));
});
