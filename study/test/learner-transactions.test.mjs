import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyState,openLearnerState,previewImport} from '../app/state.mjs';
import {memoryIDB} from './fixtures/learner/idb-double.mjs';
function raw(note){const state=emptyState();state.records=[{id:'orphan-one',notes:note,answer:'α\n$25',teachBack:'exact',assessment:'not started'}];return ' \n'+JSON.stringify(state)+'\n';}
async function open(control,tabId){return openLearnerState({indexedDB:control.factory,tabId});}
test('transaction double: SAVED follows completion; sequence race keeps newer dirty; own queued saves serialize',async()=>{
 const c=memoryIDB(),s=await open(c,'tab-a');c.delay=15;s.edit(raw('first'));const saving=s.save();await new Promise(resolve=>setTimeout(resolve,5));assert.equal(s.status().dirty,true);assert.equal(c.data.get('active').revision,0);s.edit(raw('second'));const second=s.save();assert.equal((await saving).status,'saved');assert.equal(s.status().dirty,true);assert.equal((await second).status,'saved');assert.equal(s.status().dirty,false);assert.equal(c.data.get('active').raw,raw('second'));assert.equal(c.data.get('backup').raw,raw('first'));s.close();
});
test('transaction double: two sessions conflict retains active plus both drafts without last-writer retry',async()=>{
 const c=memoryIDB(),a=await open(c,'tab-a'),b=await open(c,'tab-b');a.edit(raw('first'));b.edit(raw('second'));assert.equal((await a.save()).status,'saved');const result=await b.save();assert.equal(result.status,'conflict');assert.equal(c.data.get('active').raw,raw('first'));assert.equal(c.data.get('draft:tab-b').raw,raw('second'));assert.equal(c.data.get('draft:tab-a').raw,raw('first'));assert.equal(b.status().baseRevision,0);assert.equal(b.status().dirty,true);a.close();b.close();
});
for(const fault of ['backup','incoming','active','abort'])test('transaction double: import '+fault+' failure rolls back every write and retains raw memory',async()=>{
 const c=memoryIDB(),s=await open(c,'tab-a');s.edit(raw('before'));await s.save();const before=structuredClone(c.data);if(fault==='abort')c.abortAfter='active';else c.failKey=fault;
 const incoming=raw('incoming'),result=await s.applyImport(previewImport(incoming));assert.equal(result.status,'failed');assert.deepEqual(c.data,before);assert.equal(s.exportRaw(),incoming);assert.equal(s.status().dirty,true);s.close();
});
test('transaction double: successful import preserves exact incoming and previous raw; checkpoint restores view',async()=>{
 const c=memoryIDB(),s=await open(c,'tab-a');s.edit(raw('before'));await s.save();const incoming=raw('import');const preview=previewImport(incoming);assert.equal(s.exportRaw(),raw('before'));await s.applyImport(preview);assert.equal(c.data.get('incoming'),incoming);assert.equal(c.data.get('backup').raw,raw('before'));
 const view={documentId:'removed',anchor:'exact',focus:'answer',selection:{start:1,end:2,direction:'backward'},scrollY:25};assert.equal((await s.checkpoint(view)).status,'saved');const restored=await open(c,'tab-restored');assert.deepEqual(JSON.parse(restored.exportRaw()).view,view);assert.equal(JSON.parse(restored.exportRaw()).records[0].answer,'α\n$25');s.close();restored.close();
});
test('transaction double: corrupt/incompatible active or backup never reset or overwrite',async()=>{
 for(const value of ['{broken',JSON.stringify({schemaVersion:2}),raw('valid')]){
  const c=memoryIDB();c.data.set('active',{revision:2,raw:value});if(value===raw('valid'))c.data.set('backup',{revision:1,raw:'broken backup'});const before=structuredClone(c.data),s=await open(c,'tab-recovery');assert.equal(s.status().mode,'recovery');assert.equal((await s.save()).status,'failed');assert.deepEqual(c.data,before);assert.equal(JSON.parse(s.exportRecovery()).stored.active.raw,value);s.close();
 }
});
test('transaction double: recovery count cap blocks replacement without pruning prior drafts',async()=>{
 const c=memoryIDB(),s=await open(c,'tab-overflow');for(let i=0;i<32;i++)c.data.set('draft:tab-'+i,{tabId:'tab-'+i,sequence:0,baseRevision:0,raw:raw('recover')});const before=structuredClone(c.data);s.edit(raw('new'));assert.equal((await s.save()).status,'failed');assert.deepEqual(c.data,before);s.close();
});
