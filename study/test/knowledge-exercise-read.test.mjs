import test from 'node:test';
import assert from 'node:assert/strict';
import { openKnowledge, queryKnowledge, readKnowledge, readLocalPrivate } from '../lib/knowledge.mjs';
import { teachingFixture, teachingRecords, digest } from './fixtures/publication/helpers.mjs';

const prompt='<a id="prompt"></a>\r\nExerciseprompt α 😀 '+ 'synthetic multibyte 😀 '.repeat(200)+'\r\n';
const answer='<a id="answer"></a>\r\nExerciseanswer β 😀 '+ 'synthetic answer 😀 '.repeat(200)+'\r\n';
async function exerciseKnowledge(t,previewDraft=false,channel='agent'){
  const records=teachingRecords();
  for(const source of Object.values(records.manifest.sources))source.exposure.agent='allow';
  const {root}=await teachingFixture(t,records,{'study/exercises/one.md':prompt+answer});
  return {root,...await openKnowledge(root,{previewDraft,channel})};
}
for(const previewDraft of [false,true])test(`actual exercise query IDs roundtrip full and revision-pinned UTF8 chunks (draft=${previewDraft})`,async t=>{
  const knowledge=await exerciseKnowledge(t,previewDraft);
  for(const [term,suffix,expected] of [['Exerciseprompt','promptRef',prompt],['Exerciseanswer','answerRef',answer]]){
    const result=queryKnowledge(knowledge.index,term);assert.equal(result.hits.length,1);
    const hit=result.hits[0];assert.equal(hit.id,`exercise-one-${suffix}`);
    const full=await readKnowledge(knowledge.projection,hit.id,{full:true,revision:hit.revision});
    assert.equal(full.text,expected);assert.equal(full.complete,true);assert.equal(full.draft,previewDraft);assert.equal(full.warning,previewDraft?hit.warning:null);assert.equal(full.sha256,hit.sha256);
    const chunks=[];let offset=0;
    do{
      const chunk=await readKnowledge(knowledge.projection,hit.id,{offset,maxBytes:73,revision:hit.revision});
      chunks.push(Buffer.from(chunk.text));assert.equal(chunk.draft,previewDraft);assert.equal(chunk.warning,full.warning);assert.equal(chunk.revision,hit.revision);assert.ok(Buffer.byteLength(JSON.stringify(chunk))<=32768);offset=chunk.nextOffset;
    }while(offset!==null);
    assert.deepEqual(Buffer.concat(chunks),Buffer.from(expected));
  }
});

test('derived exercise reads retain revision, UTF8 boundary, budget and hash guards',async t=>{
  const knowledge=await exerciseKnowledge(t),id='exercise-one-promptRef';
  await assert.rejects(readKnowledge(knowledge.projection,id,{revision:'0'.repeat(64)}),/Revision changed/);
  await assert.rejects(readKnowledge(knowledge.projection,id,{maxBytes:32769}),/budget exceeded/);
  const split=Buffer.from(prompt).indexOf(Buffer.from('😀'))+1;
  await assert.rejects(readKnowledge(knowledge.projection,id,{offset:split}),/UTF-8 byte offset/);
  await assert.rejects(readKnowledge({...knowledge.projection,readAllowed:async()=>Buffer.from('changed')},id,{full:true}),/hash changed/);
});

test('unknown and channel-denied derived IDs cannot cause path fallback',async t=>{
  const knowledge=await exerciseKnowledge(t);
  await assert.rejects(readKnowledge(knowledge.projection,'exercise-absent-promptRef'),/Unknown or unavailable/);
  const denied=await openKnowledge(knowledge.root,{channel:'export'});
  assert.equal(queryKnowledge(denied.index,'Exerciseprompt').hits.length,0);
  for(const suffix of ['promptRef','answerRef'])await assert.rejects(readKnowledge(denied.projection,`exercise-one-${suffix}`),/Unknown or unavailable/);
});

test('content boundary rejects arbitrary uppercase and malformed derived suffixes before reading',async()=>{
  for(const id of ['Exercise-one-promptRef','exercise-one-PromptRef','exercise-one-answerREF','exercise-one-promptRefs','exercise-one-promptRef-answerRef','exercise-one/promptRef','exercise-one--promptRef','-promptRef','exercise-one:promptRef']){
    let reads=0;
    const projection={revision:digest('revision'),items:[{id,output:'not-a-filesystem-path',sha256:digest('bytes')}],readAllowed:async()=>{reads++;return Buffer.from('bytes');}};
    await assert.rejects(readKnowledge(projection,id),/Invalid content ID/,id);assert.equal(reads,0);
  }
});

test('canonical content IDs remain readable and private source-unit grammar stays narrow',async t=>{
  const knowledge=await exerciseKnowledge(t);
  assert.match((await readKnowledge(knowledge.projection,'lesson-one',{full:true})).text,/Synthetic detailed lesson/);
  assert.match((await readKnowledge(knowledge.projection,'unit-one',{full:true})).text,/A definition/);
  for(const suffix of ['promptRef','answerRef'])await assert.rejects(readLocalPrivate('unused-root',`exercise-one-${suffix}`,{}),/Invalid source-unit ID/);
});
