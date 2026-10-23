import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyState,validateState,previewImport,openLearnerState} from '../app/state.mjs';
const record=id=>({id,notes:'exact α\n',answer:'$12',teachBack:'my words',assessment:'working on it'});
test('closed learner schema roundtrips exact text and orphan/derived IDs without inferred mastery',()=>{
 const state=emptyState();assert.deepEqual(state.records,[]);state.records=[record('removed-lesson'),record('exercise-one-answerRef')];const raw=' \n'+JSON.stringify(state,null,2)+'\n';const preview=previewImport(raw);assert.equal(preview.raw,raw);assert.deepEqual(preview.state,state);assert.equal(preview.recordCount,2);assert.deepEqual(validateState(raw),state);
});
test('learner state rejects unknown/prototype keys, duplicate IDs, enums, invalid Unicode, bounds and incompatible schemas',()=>{
 const cases=[s=>s.extra=true,s=>s.schemaVersion=2,s=>s.records=[record('../path')],s=>s.records=[record('constructor')],s=>s.records=[record('a'),record('a')],s=>s.records=[{...record('a'),assessment:'mastered'}],s=>s.records=[{...record('a'),answer:'\ud800'}],s=>s.records=[{...record('a'),answer:'a'.repeat(65537)}],s=>s.view.scrollY=-1,s=>s.view.selection={start:2,end:1,direction:'none'},s=>s.view.extra=true];
 for(const change of cases){const state=emptyState();change(state);assert.throws(()=>validateState(JSON.stringify(state)));}
 for(const raw of ['null','[]','{','{"__proto__":{}}','{"constructor":{}}',' '.repeat(1048577)])assert.throws(()=>validateState(raw));
});
test('disabled storage returns recoverable in-memory state rather than claiming save',async()=>{
 const session=await openLearnerState({indexedDB:null,tabId:'tab-test'});assert.equal(session.status().mode,'unavailable');const state=emptyState();state.records=[record('orphan')];session.edit(JSON.stringify(state));assert.equal((await session.save()).status,'failed');assert.equal(session.status().dirty,true);assert.deepEqual(validateState(session.exportRaw()),state);session.close();
});
test('UTF8 byte/count limits reject rather than truncate, including poison fields nested in view/records',()=>{
 const state=emptyState();state.records=[record('one')];state.records[0].notes='α'.repeat(32768);assert.equal(validateState(JSON.stringify(state)).records[0].notes,state.records[0].notes);state.records[0].notes+='α';assert.throws(()=>validateState(JSON.stringify(state)));
 const many=emptyState();many.records=Array.from({length:1001},(_,i)=>record('id-'+i));assert.throws(()=>validateState(JSON.stringify(many)));
 for(const target of ['view','record','selection']){const s=emptyState();s.records=[record('one')];s.view.selection={start:0,end:0,direction:'none'};const value=target==='view'?s.view:target==='record'?s.records[0]:s.view.selection;Object.defineProperty(value,'__proto__',{value:{polluted:true},enumerable:true});assert.throws(()=>validateState(JSON.stringify(s)));}
});
test('storage factory receives only the explicit FD database/version and thrown denial is recoverable',async()=>{
 const calls=[];const indexedDB={open(name,version){calls.push([name,version]);throw Error('synthetic disabled storage');},databases(){throw Error('must never enumerate');}};
 const session=await openLearnerState({indexedDB,tabId:'tab-denied'});assert.deepEqual(calls,[['fd-fieldnotes-v1',1]]);assert.equal(session.status().mode,'unavailable');assert.equal((await session.checkpointDraft()).status,'failed');session.close();
});
test('applyImport requires a real validated preview rather than an arbitrary raw wrapper',async()=>{
 const session=await openLearnerState({indexedDB:null,tabId:'tab-preview'});const raw=JSON.stringify(emptyState());assert.throws(()=>session.applyImport({raw}));assert.equal((await session.applyImport(previewImport(raw))).status,'failed');assert.equal(session.exportRaw(),raw);session.close();
});
