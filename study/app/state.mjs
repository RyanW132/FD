const DATABASE = 'fd-fieldnotes-v1';
const STORE = 'state';
const LIMITS = Object.freeze({raw:1048576,records:1000,text:65536,id:256,drafts:32});
const encoder = new TextEncoder();
const idPattern = new RegExp('^[a-z][a-z0-9]*([-:][a-z0-9]+)*(-(promptRef|answerRef))?$');
const poison = new Set(['__proto__','prototype','constructor']);
const previews = new WeakSet();
function invalid(){throw Error('Invalid learner state');}
function bytes(value,max){if(typeof value!=='string'||!value.isWellFormed()||encoder.encode(value).length>max)invalid();}
function shape(value,fields){
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.getPrototypeOf(value)!==Object.prototype)invalid();
  const keys=Object.keys(value);if(keys.length!==fields.length||keys.some(key=>poison.has(key)||!fields.includes(key)))invalid();
}
function stableId(value){bytes(value,LIMITS.id);if(poison.has(value)||!idPattern.test(value))invalid();}
function count(value,max){if(!Number.isSafeInteger(value)||value<0||value>max)invalid();}
function viewShape(view){
  shape(view,['documentId','anchor','focus','selection','scrollY']);
  if(view.documentId!==null)stableId(view.documentId);
  for(const name of ['anchor','focus'])if(view[name]!==null){bytes(view[name],256);if(!view[name]||poison.has(view[name])||view[name].includes('\0'))invalid();}
  count(view.scrollY,10000000);
  if(view.selection!==null){shape(view.selection,['start','end','direction']);count(view.selection.start,1000000);count(view.selection.end,1000000);if(view.selection.start>view.selection.end||!['forward','backward','none'].includes(view.selection.direction))invalid();}
}
function emptyState(){return {schemaVersion:1,records:[],view:{documentId:null,anchor:null,focus:null,selection:null,scrollY:0}};}
function validateState(raw){
  bytes(raw,LIMITS.raw);const state=JSON.parse(raw);shape(state,['schemaVersion','records','view']);
  if(state.schemaVersion!==1||!Array.isArray(state.records)||state.records.length>LIMITS.records)invalid();
  const ids=new Set();
  for(const record of state.records){
    shape(record,['id','notes','answer','teachBack','assessment']);stableId(record.id);if(ids.has(record.id))invalid();ids.add(record.id);
    for(const name of ['notes','answer','teachBack'])bytes(record[name],LIMITS.text);
    if(!['not started','working on it','I can explain this'].includes(record.assessment))invalid();
  }
  viewShape(state.view);return state;
}
function previewImport(raw){const state=validateState(raw);const preview=Object.freeze({raw,state,recordCount:state.records.length});previews.add(preview);return preview;}
function validEnvelope(value){shape(value,['revision','raw']);count(value.revision,Number.MAX_SAFE_INTEGER);validateState(value.raw);return value;}
function draftShape(value){shape(value,['tabId','sequence','baseRevision','raw']);stableId(value.tabId);count(value.sequence,Number.MAX_SAFE_INTEGER);count(value.baseRevision,Number.MAX_SAFE_INTEGER);validateState(value.raw);return value;}
function connect(indexedDB){return new Promise((resolve,reject)=>{
  if(!indexedDB){reject(Error('Storage unavailable'));return;}
  let request;try{request=indexedDB.open(DATABASE,1);}catch(error){reject(error);return;}
  let settled=false;
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(STORE))request.result.createObjectStore(STORE);};
  request.onerror=()=>{settled=true;reject(Error('Storage unavailable'));};
  request.onblocked=()=>{settled=true;reject(Error('Storage blocked'));};
  request.onsuccess=()=>{if(settled){request.result.close();return;}resolve(request.result);};
});}
function transaction(db,mode,work){return new Promise((resolve,reject)=>{
  let tx;try{tx=db.transaction(STORE,mode);}catch(error){reject(error);return;}
  let result;
  tx.oncomplete=()=>resolve(result);tx.onabort=()=>reject(Error('State transaction failed'));tx.onerror=()=>{};
  try{work(tx.objectStore(STORE),value=>{result=value;},tx);}catch{tx.abort();}
});}
async function openLearnerState(options={}){
  const tabId=options.tabId??('tab-'+globalThis.crypto.randomUUID());stableId(tabId);
  const factory=Object.hasOwn(options,'indexedDB')?options.indexedDB:globalThis.indexedDB;
  let db=null,mode='unavailable',raw=JSON.stringify(emptyState()),baseRevision=0,sequence=0,dirty=false,lastStatus='not saved',queue=Promise.resolve();
  let stored={active:null,backup:null,incoming:null,drafts:[]};
  function remember(values){stored=values;}
  try{
    db=await connect(factory);db.onversionchange=()=>{db.close();mode='unavailable';};
    const values=await transaction(db,'readwrite',(store,done,tx)=>{
      const request=store.getAllKeys();request.onsuccess=()=>{
        const keys=request.result,read=store.getAll();read.onsuccess=()=>{
          try{
            const map=new Map(keys.map((key,index)=>[key,read.result[index]]));
            if(!map.has('active')){const initial={revision:0,raw};store.add(initial,'active');map.set('active',initial);}
            done({active:map.get('active'),backup:map.get('backup')??null,incoming:map.get('incoming')??null,drafts:keys.filter(key=>typeof key==='string'&&key.startsWith('draft:')).map(key=>map.get(key))});
          }catch{tx.abort();}
        };
      };
    });
    remember(values);validEnvelope(values.active);if(values.backup!==null){validEnvelope(values.backup);if(values.backup.revision!==values.active.revision-1)invalid();}
    if(values.incoming!==null)validateState(values.incoming);
    if(values.drafts.length>LIMITS.drafts)invalid();for(const draft of values.drafts)draftShape(draft);
    raw=values.active.raw;baseRevision=values.active.revision;mode='ready';lastStatus='saved';
  }catch{if(db)mode='recovery';}
  function status(){return {mode,dirty,sequence,baseRevision,lastStatus};}
  function edit(nextRaw){validateState(nextRaw);if(sequence===Number.MAX_SAFE_INTEGER)invalid();raw=nextRaw;sequence++;dirty=true;lastStatus='unsaved';return status();}
  function enqueue(operation){const result=queue.then(operation);queue=result.catch(()=>{});return result;}
  function snapshot(){return {tabId,sequence,baseRevision,raw};}
  async function persist(draft,replace,incoming){
    // Queued writes use only this tab's last committed revision, never a conflict's revision.
    draft={...draft,baseRevision};
    if(mode!=='ready'||!db){lastStatus='failed';return {status:'failed'};}
    lastStatus='saving';
    try{
      const result=await transaction(db,'readwrite',(store,done,tx)=>{
        const request=store.getAllKeys();request.onsuccess=()=>{
          try{
            const keys=request.result,read=store.get('active');read.onsuccess=()=>{
              try{
                const current=validEnvelope(read.result),backupRead=store.get('backup');backupRead.onsuccess=()=>{
                  try{
                    if(backupRead.result!==undefined){validEnvelope(backupRead.result);if(backupRead.result.revision!==current.revision-1)invalid();}
                    if(!keys.includes('draft:'+tabId)&&keys.filter(key=>typeof key==='string'&&key.startsWith('draft:')).length>=LIMITS.drafts)invalid();
                    store.put(draft,'draft:'+tabId);
                    if(current.revision!==draft.baseRevision){done({status:'conflict',current,backup:backupRead.result??null});return;}
                    if(!replace){done({status:'checkpointed',current,backup:backupRead.result??null});return;}
                    if(current.revision===Number.MAX_SAFE_INTEGER)invalid();
                    const active={revision:current.revision+1,raw:draft.raw};
                    store.put(current,'backup');if(incoming!==undefined)store.put(incoming,'incoming');store.put(active,'active');
                    done({status:'saved',current:active,backup:current});
                  }catch{tx.abort();}
                };
              }catch{tx.abort();}
            };
          }catch{tx.abort();}
        };
      });
      lastStatus=result.status;
      stored.drafts=stored.drafts.filter(value=>value.tabId!==tabId).concat([draft]);
      stored.active=result.current;stored.backup=result.backup;
      if(result.status==='saved'){
        stored.backup=result.backup;if(incoming!==undefined)stored.incoming=incoming;
        baseRevision=result.current.revision;if(sequence===draft.sequence)dirty=false;
      }
      return result;
    }catch{lastStatus='failed';return {status:'failed'};}
  }
  function save(){const draft=snapshot();return enqueue(()=>persist(draft,true));}
  function checkpointDraft(){const draft=snapshot();return enqueue(()=>persist(draft,false));}
  function checkpoint(view){
    const state=validateState(raw);viewShape(view);state.view=structuredClone(view);edit(JSON.stringify(state));return save();
  }
  function applyImport(preview){
    if(!preview||!previews.has(preview)||typeof preview.raw!=='string')invalid();const incoming=preview.raw;validateState(incoming);edit(incoming);const draft=snapshot();return enqueue(()=>persist(draft,true,incoming));
  }
  function exportRaw(){return raw;}
  function exportRecovery(){return JSON.stringify({schemaVersion:1,kind:'fd-recovery',stored,memory:snapshot(),status:status()});}
  function downloadRecovery(){const objectURL=URL.createObjectURL(new Blob([exportRecovery()],{type:'application/json'}));return {href:objectURL,revoke:()=>URL.revokeObjectURL(objectURL)};}
  function close(){if(db)db.close();mode='closed';}
  return Object.freeze({status,edit,save,checkpointDraft,checkpoint,applyImport,exportRaw,exportRecovery,downloadRecovery,close});
}
export {DATABASE,LIMITS,emptyState,validateState,previewImport,openLearnerState};
