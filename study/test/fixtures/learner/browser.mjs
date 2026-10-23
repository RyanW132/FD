import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import os from 'node:os';
import {learnerFixture} from './helpers.mjs';
import {buildPublication} from '../../../lib/publication.mjs';
const run=promisify(execFile),cleanup=[],results=[],out='.omx/artifacts/g007-learner-state';
const command=async args=>(await run('agent-browser',args,{windowsHide:true,maxBuffer:4*1024*1024})).stdout;
const session=(await command(['session','id','--scope','worktree','--prefix','g007-learner-'+process.pid])).trim();
const browser=async args=>command(['--session',session,...args]);
async function evaluate(code){const output=await browser(['eval','-b',Buffer.from(code).toString('base64'),'--json']);const parsed=JSON.parse(output);if(parsed.success===false)throw Error(output);return parsed.data?.result??parsed.data;}
async function check(name,code){const result=await evaluate('(async()=>{'+code+'})()');assert.equal(result,true,name+': '+JSON.stringify(result));results.push({name,pass:true});}
try{
 const fixture=await learnerFixture({after:fn=>cleanup.push(fn)});const origin=fixture.server.origin;
 await browser(['--allowed-domains','127.0.0.1','open',origin]);
 await browser(['wait','--fn','globalThis.routesTest || globalThis.routeError']);
 const initial=await evaluate('({ready:!!globalThis.routesTest,error:globalThis.routeError,ua:navigator.userAgent})');assert.equal(initial.ready,true,JSON.stringify(initial));
 const versions={node:process.version,os:os.type()+' '+os.release(),agentBrowser:(await command(['--version'])).trim(),userAgent:initial.ua,session};
 await check('same generation full document and owner raster authorization',`
  const r=routesTest,items=r.model.bundle.catalog.items;const doc=items[0];const full=await r.readDocument(doc.id);
  if(full.text!==r.model.bundle.search.documents.find(d=>d.id===doc.id).text||!r.documentURL(doc.id).includes('/g/'+r.generationDigest+'/content/'))return false;
  const owner=r.model.bundle.reader.documents.find(d=>d.links.some(l=>l.target.kind==='asset'));if(!owner)return false;
  const link=owner.links.find(l=>l.target.kind==='asset');const raster=await r.rasterURL(owner.id,link.href);
  let rejected=0;for(const args of [['unknown',link.href],[owner.id,'../raw.png']])try{await r.rasterURL(...args);}catch{rejected++;}
  globalThis.syntheticOwner=owner.id;return rejected===2&&raster.includes('/g/'+r.generationDigest+'/assets/')&&r.inputDigest!==r.generationDigest;
 `);
 await check('absent state initializes only FD database; exact save and completion',`
  globalThis.a=await learnerTest.openLearnerState({tabId:'tab-a'});if(a.status().mode!=='ready')return false;
  globalThis.state=learnerTest.emptyState();state.records=[{id:'orphan-one',notes:'exact α\\n',answer:'$125',teachBack:'my explanation',assessment:'working on it'}];
  globalThis.raw=' \\n'+JSON.stringify(state,null,2)+'\\n';a.edit(raw);const pending=a.save();if(!a.status().dirty)return false;const saved=await pending;
  globalThis.savedRevision=saved.current.revision;return saved.status==='saved'&&!a.status().dirty&&a.exportRaw()===raw;
 `);
 await check('sequence race leaves newer in-memory draft dirty after older save completes',`
  state.records[0].notes='older';a.edit(JSON.stringify(state));const old=a.save();state.records[0].notes='newer';a.edit(JSON.stringify(state));await old;
  return a.status().dirty&&JSON.parse(a.exportRaw()).records[0].notes==='newer';
 `);
 await browser(['tab','new',origin]);await browser(['wait','--fn','globalThis.routesTest || globalThis.routeError']);
 await check('second real tab opens same origin revision',`globalThis.b=await learnerTest.openLearnerState({tabId:'tab-b'});return b.status().mode==='ready';`);
 const tabs=JSON.parse(await browser(['tab','list','--json']));
 // CLI supports stable tab refs; these are the two exclusively owned tabs.
 await browser(['tab','t1']);
 await check('first tab saves newer draft',`return (await a.save()).status==='saved';`);
 await browser(['tab','t2']);
 await check('stale second tab preserves current plus its conflict draft without retry',`
  const state=learnerTest.emptyState();state.records=[{id:'second-orphan',notes:'competing',answer:'exact',teachBack:'retained',assessment:'not started'}];b.edit(JSON.stringify(state));
  const result=await b.save();const recovery=JSON.parse(b.exportRecovery());return result.status==='conflict'&&b.status().dirty&&recovery.stored.drafts.some(d=>d.tabId==='tab-b')&&JSON.parse(result.current.raw).records[0].notes==='newer';
 `);
 await browser(['tab','t1']);
 await check('import preview, atomic incoming raw and previous valid backup',`
  const previous=a.exportRaw();const imported=learnerTest.emptyState();imported.records=[{id:'removed-id',notes:'import exact',answer:'α\\nβ',teachBack:'',assessment:'I can explain this'}];const incoming='\\n'+JSON.stringify(imported,null,2)+'  ';
  const preview=learnerTest.previewImport(incoming);if(a.exportRaw()!==previous)return false;const result=await a.applyImport(preview);const recovery=JSON.parse(a.exportRecovery());
  return result.status==='saved'&&recovery.stored.backup.raw===previous&&recovery.stored.incoming===incoming&&a.exportRaw()===incoming;
 `);
 await check('injected backup write failure rolls back active/import/draft and retains memory',`
  const before=JSON.parse(a.exportRecovery()).stored.active;const put=IDBObjectStore.prototype.put;
  IDBObjectStore.prototype.put=function(value,key){if(key==='backup')throw new DOMException('synthetic quota','QuotaExceededError');return put.call(this,value,key);};
  let result;try{const state=learnerTest.emptyState();state.records=[{id:'failed-import',notes:'recover me',answer:'',teachBack:'',assessment:'not started'}];result=await a.applyImport(learnerTest.previewImport(JSON.stringify(state)));}finally{IDBObjectStore.prototype.put=put;}
  const c=await learnerTest.openLearnerState({tabId:'tab-check'});const same=c.exportRaw()===before.raw;c.close();return result.status==='failed'&&same&&a.status().dirty&&a.exportRaw().includes('recover me');
 `);
 await check('injected abort after active request success never reports saved',`
  const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(value,key){const request=put.call(this,value,key);if(key==='active')request.addEventListener('success',()=>this.transaction.abort());return request;};
  let result;try{result=await a.save();}finally{IDBObjectStore.prototype.put=put;}return result.status==='failed'&&a.status().dirty;
 `);
 await check('disabled storage injection preserves export and refresh failure stays G1',`
  const disabled=await learnerTest.openLearnerState({indexedDB:null,tabId:'tab-disabled'});disabled.edit(a.exportRaw());const result=await disabled.checkpoint(learnerTest.emptyState().view);const ok=result.status==='failed'&&disabled.status().dirty&&disabled.exportRaw().includes('recover me');disabled.close();return ok;
 `);
 await check('recovery draft queue preserves latest sequence',`
  const first=a.checkpointDraft();const state=JSON.parse(a.exportRaw());state.records[0].notes='latest queued';a.edit(JSON.stringify(state));const second=a.checkpointDraft();await first;await second;
  const recovered=JSON.parse(a.exportRecovery()).stored.drafts.find(d=>d.tabId==='tab-a');return recovered.sequence===a.status().sequence&&recovered.raw===a.exportRaw();
 `);
 await check('view checkpoint commits exact stable route focus selection and learner state',`
  globalThis.view={documentId:'removed-id',anchor:'exact-anchor',focus:'answer-field',selection:{start:1,end:4,direction:'backward'},scrollY:321};
  const result=await a.checkpoint(view);const c=await learnerTest.openLearnerState({tabId:'tab-reload'});const state=JSON.parse(c.exportRaw());c.close();return result.status==='saved'&&JSON.stringify(state.view)===JSON.stringify(view)&&state.records[0].notes==='latest queued';
 `);

 await writeFile(fixture.root+'/study/app/styles.css','body { color: navy; }\n');
 const next=await buildPublication(fixture.root,{publish:true,builderVersion:3});assert.equal(next.ok,true,JSON.stringify(next.errors));
 await check('status offers G2 without changing G1 model; failed checkpoint prevents navigation',`
  const original=location.href,old=routesTest.generationDigest,status=await routesTest.pollStatus();if(!status.updateAvailable||status.digest===old)return false;
  const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(value,key){if(key==='backup')throw new DOMException('synthetic quota','QuotaExceededError');return put.call(this,value,key);};
  let result;try{result=await routesTest.refresh(a,view);}finally{IDBObjectStore.prototype.put=put;}
  return result.status==='failed'&&location.href===original&&routesTest.generationDigest===old&&a.status().dirty;
 `);
 await evaluate('routesTest.refresh(a,view).then(()=>true)');
 await browser(['wait','--url','**/g/'+next.digest+'/ui/index.html']);
 await browser(['wait','--fn','globalThis.routesTest || globalThis.routeError']);
 await check('explicit refresh navigates only after committed view/recovery and restores exact stable state',`
  globalThis.a=await learnerTest.openLearnerState({tabId:'tab-after-refresh'});const state=JSON.parse(a.exportRaw()),recovery=JSON.parse(a.exportRecovery());
  return state.view.documentId==='removed-id'&&state.view.anchor==='exact-anchor'&&state.view.focus==='answer-field'&&state.view.selection.direction==='backward'&&state.view.scrollY===321&&state.records[0].notes==='latest queued'&&recovery.stored.drafts.some(d=>d.tabId==='tab-a'&&JSON.parse(d.raw).view.anchor==='exact-anchor');
 `);
 // Controlled corruption in this isolated FD database, never an actual user's storage.
 await check('corrupt and incompatible raw remain untouched and downloadable',`
  async function setActive(value){await new Promise((resolve,reject)=>{const req=indexedDB.open('fd-fieldnotes-v1',1);req.onsuccess=()=>{const db=req.result,tx=db.transaction('state','readwrite');tx.objectStore('state').put(value,'active');tx.oncomplete=()=>{db.close();resolve();};tx.onabort=reject;};});}
  for(const raw of ['{broken',JSON.stringify({schemaVersion:2,records:[],view:{}})]){await setActive({revision:100,raw});const c=await learnerTest.openLearnerState({tabId:'tab-corrupt'});if(c.status().mode!=='recovery'||(await c.save()).status!=='failed'||JSON.parse(c.exportRecovery()).stored.active.raw!==raw)return false;const download=c.downloadRecovery();if(!download.href.startsWith('blob:'))return false;download.revoke();c.close();}
  return true;
 `);
 await writeFile(out+'/browser-results.json',JSON.stringify({ok:true,versions,results,tabs},null,2)+'\n');console.log(JSON.stringify({ok:true,assertions:results.length,versions}));
}finally{
 try{await browser(['close']);}finally{for(const fn of cleanup.reverse())await fn();}
}
