import test from 'node:test';
import assert from 'node:assert/strict';
import { writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { captureProject } from '../lib/capture.mjs';
import { validateCapturedProject, validateProject, resolveCapturedReference } from '../lib/contracts.mjs';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { fixture, teachingFixture, digest } from './fixtures/publication/helpers.mjs';

test('captured validation stays independent of later live original changes',async t=>{
  const {root}=await fixture(t);const capture=await captureProject(root);
  await writeFile(join(root,'context/synthetic.pdf'),'changed original');
  assert.equal((await validateCapturedProject(capture.readBytes)).ok,true);
  assert.equal((await validateProject(root)).ok,false);
});

test('captured reference resolver never reads an uncaptured path',async t=>{
  const {root}=await fixture(t);const capture=await captureProject(root);
  await writeFile(join(root,'study/late.md'),'<a id="late"></a>New content');
  const result=await resolveCapturedReference(capture.readBytes,{kind:'markdown',path:'study/late.md',anchor:'late'},capture.records);
  assert.equal(result.ok,false);
});

test('generation bytes remain immutable when a returned buffer is changed',async t=>{
  const {root}=await teachingFixture(t);const result=await buildPublication(root,{publish:true});assert.equal(result.ok,true,JSON.stringify(result));
  const generation=await readGeneration(root);const expected=await generation.readBytes('index.md');
  const copy=await generation.readBytes('index.md');copy.fill(0);
  assert.deepEqual(await generation.readBytes('index.md'),expected);
  assert.deepEqual(await (await readGeneration(root)).readBytes('index.md'),expected);
});

test('plain build validates without switching a previous explicit publication',async t=>{
  const {root}=await fixture(t);assert.equal((await buildPublication(root,{publish:true})).ok,true);
  const pointer=await readFile(join(root,'study/generated/current.json'));
  const result=await buildPublication(root);assert.equal(result.ok,true);
  assert.deepEqual(await readFile(join(root,'study/generated/current.json')),pointer);
});

async function saveReview(root,records){
  for(const input of records.reviews.reviews['review-one'].inputHashes)input.sha256=digest(await readFile(join(root,input.path)));
  await writeFile(join(root,'study/reviews.json'),JSON.stringify(records.reviews));
}

for(const origin of ['concept','answer'])test(`private ${origin} origin propagates into dependent public lesson`,async t=>{
  const {root,records}=await teachingFixture(t);
  // Private tree semantics are exact, not filename substring semantics.
  const {mkdir}=await import('node:fs/promises');await mkdir(join(root,'study/private'));
  const privateFile='study/private/content.md';await writeFile(join(root,privateFile),'<a id="concept"></a>Secret concept\n<a id="answer"></a>Secret answer');
  const review=records.reviews.reviews['review-one'];
  if(origin==='concept'){
    records.curriculum.concepts['concept-one'].path=privateFile;
    for(const ref of review.subjectRefs)if(ref.kind==='markdown'&&ref.path==='study/concepts/one.md')ref.path=privateFile;
  }else records.curriculum.exercises['exercise-one'].answerRef.path=privateFile;
  await writeFile(join(root,'study/lessons/one.md'),'<a id="lesson"></a>PARAPHRASED-PRIVATE-ORIGIN');
  await writeFile(join(root,'study/curriculum.json'),JSON.stringify(records.curriculum));
  review.inputHashes.push({path:privateFile,sha256:digest(await readFile(join(root,privateFile)))});
  await saveReview(root,records);
  const result=await buildPublication(root,{publish:true});assert.equal(result.ok,true,JSON.stringify(result));
  const generation=await readGeneration(root);assert.equal(generation.report.readiness.teachingComplete,false);
  assert.equal(generation.catalog.items.some(item=>item.id==='lesson-one'),false);
  for(const item of generation.catalog.items)assert.equal((await generation.readBytes(item.output)).includes(Buffer.from('PARAPHRASED-PRIVATE-ORIGIN')),false);
});

test('same record ID in unrelated JSON cannot bind a reviewed lesson',async t=>{
  const {root,records}=await teachingFixture(t);
  const unrelated='study/unrelated.json';await writeFile(join(root,unrelated),JSON.stringify({records:{'lesson-one':{id:'lesson-one'}}}));
  const review=records.reviews.reviews['review-one'];
  review.subjectRefs=review.subjectRefs.filter(ref=>!(ref.kind==='markdown'&&ref.path==='study/lessons/one.md')&&!(ref.kind==='record'&&ref.id==='lesson-one'));
  review.subjectRefs.push({kind:'record',path:unrelated,id:'lesson-one'});
  review.inputHashes.push({path:unrelated,sha256:digest(await readFile(join(root,unrelated)))});await saveReview(root,records);
  for(const previewDraft of [false,true]){
    const result=await buildPublication(root,{publish:true,previewDraft});assert.equal(result.ok,false);
    assert.ok(result.errors.some(error=>error.code==='REVIEW_BINDING'));
  }
});
