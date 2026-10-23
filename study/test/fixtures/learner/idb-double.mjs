// Deterministic transaction fault double, NOT IndexedDB/browser conformance proof.
export function memoryIDB(){
 const control={data:new Map(),failKey:null,abortAfter:null,delay:0,calls:[],pending:Promise.resolve()};
 const db={objectStoreNames:{contains:()=>true},close(){},transaction(){
  let release;const previous=control.pending;control.pending=new Promise(resolve=>{release=resolve;});
  let snapshot,started=false,ended=false,running=false,timer;const requests=[];
  const tx={oncomplete:null,onabort:null,onerror:null,abort(){if(ended)return;ended=true;clearTimeout(timer);queueMicrotask(()=>{tx.onabort?.();release();});},objectStore(){return store;}};
  function pump(){
   if(!started||ended||running)return;clearTimeout(timer);
   if(!requests.length){timer=setTimeout(()=>{if(ended)return;ended=true;control.data=snapshot;tx.oncomplete?.();release();},control.delay);return;}
   running=true;const {request,action,key}=requests.shift();queueMicrotask(()=>{
    try{request.result=action();request.onsuccess?.();if(control.abortAfter===key)tx.abort();}catch{tx.abort();}
    running=false;pump();
   });
  }
  function enqueue(action,key){const request={};requests.push({request,action,key});pump();return request;}
  const store={get:key=>enqueue(()=>structuredClone(snapshot.get(key))),getAllKeys:()=>enqueue(()=>[...snapshot.keys()]),getAll:()=>enqueue(()=>structuredClone([...snapshot.values()])),
   put(value,key){if(control.failKey===key)throw Error('injected write failure');return enqueue(()=>{snapshot.set(key,structuredClone(value));return key;},key);},
   add(value,key){return enqueue(()=>{if(snapshot.has(key))throw Error('duplicate');snapshot.set(key,structuredClone(value));return key;},key);}};
  previous.then(()=>{snapshot=structuredClone(control.data);started=true;pump();});return tx;
 }};
 control.factory={open(name,version){control.calls.push([name,version]);const request={result:db};queueMicrotask(()=>request.onsuccess?.());return request;}};
 return control;
}
