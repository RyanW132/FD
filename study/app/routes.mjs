const READER_URL = new URL('../reader.json', import.meta.url);
const GENERATION_ROOT = new URL('../', import.meta.url);
const CATALOG_URL = new URL('../catalog.json', import.meta.url);
const REPORT_URL = new URL('../report.json', import.meta.url);
const GRAPH_URL = new URL('../graph.json', import.meta.url);
const SEARCH_URL = new URL('../search.json', import.meta.url);
const STATUS_URL = new URL('/status.json', import.meta.url);
const hashPattern=new RegExp('^[a-f0-9]{64}$');
const contentPattern=new RegExp('^content/[a-f0-9]{64}[.]md$');
const assetPattern=new RegExp('^assets/[a-f0-9]{64}[.](png|jpg|jpeg|webp)$');
const idPattern=new RegExp('^[a-z][a-z0-9]*([-:][a-z0-9]+)*(-(promptRef|answerRef))?$');
const draftWarning='DRAFT — UNREVIEWED preview; not reviewed teaching or evidence of mastery.';
function invalid(){throw Error('Unavailable published selection');}
function keys(value,fields){if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==fields.length||Object.keys(value).some(key=>!fields.includes(key)))invalid();}
function unique(values){if(!Array.isArray(values)||values.some(value=>typeof value!=='string'||!value)||new Set(values).size!==values.length)invalid();return values;}
function indexed(values){if(!Array.isArray(values))invalid();const map=new Map();for(const value of values){if(!value||typeof value.id!=='string'||!idPattern.test(value.id)||map.has(value.id))invalid();map.set(value.id,value);}return map;}
function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
function selectedModel(input){
  const bundle=structuredClone(input),catalog=bundle.catalog,reader=bundle.reader,report=bundle.report,graph=bundle.graph,search=bundle.search;
  if(!catalog||!hashPattern.test(catalog.inputDigest)||typeof catalog.draft!=='boolean')invalid();
  for(const value of [catalog,reader,report,graph,search])if(!value||value.schemaVersion!==1||value.inputDigest!==catalog.inputDigest)invalid();
  for(const value of [reader,report,search])if(value.draft!==catalog.draft)invalid();
  if(!report.readiness||['accountingComplete','conversionComplete','teachingComplete'].some(key=>typeof report.readiness[key]!=='boolean')||report.status!==(catalog.draft?'draft-incomplete':report.readiness.teachingComplete?'reviewed-complete':'incomplete')||catalog.draft&&report.readiness.teachingComplete)invalid();
  if(search.warning!==(catalog.draft?draftWarning:null)||!hashPattern.test(search.revision))invalid();
  keys(reader,['schemaVersion','inputDigest','draft','documents','lessons','concepts','outcomes','exercises']);
  const items=indexed(catalog.items),documents=indexed(reader.documents),searchDocs=indexed(search.documents),nodes=indexed(graph.nodes);
  if(items.size!==documents.size||items.size!==searchDocs.size||!Array.isArray(graph.edges))invalid();
  for(const edge of graph.edges)if(!nodes.has(edge.from)||!nodes.has(edge.to))invalid();
  for(const item of items.values()){
    if(!contentPattern.test(item.output)||!hashPattern.test(item.sha256)||item.draft!==catalog.draft||!['unit','lesson','concept','exercise'].includes(item.type))invalid();
    const document=documents.get(item.id),searchDocument=searchDocs.get(item.id);if(!document||!searchDocument)invalid();
    keys(document,['id','anchors','links']);unique(document.anchors);if(!Array.isArray(document.links))invalid();
    for(const field of Object.keys(item))if(JSON.stringify(item[field])!==JSON.stringify(searchDocument[field]))invalid();
    if(typeof searchDocument.text!=='string'||new TextEncoder().encode(searchDocument.text).length!==searchDocument.byteLength)invalid();
  }
  function document(id){const item=items.get(id);if(!item)invalid();return item;}
  function checkTarget(target){
    if(!target||typeof target!=='object')invalid();
    if(target.kind==='document'){
      keys(target,['kind','documentId','anchor']);const item=document(target.documentId);
      if(target.anchor===null){if(!['lesson','concept'].includes(item.type))invalid();}
      else if(!documents.get(item.id).anchors.includes(target.anchor))invalid();
    }else if(target.kind==='asset'){
      keys(target,['kind','member']);if(!assetPattern.test(target.member))invalid();
    }else if(target.kind==='page'){
      keys(target,['kind','groups']);if(!Array.isArray(target.groups)||!target.groups.length)invalid();const seen=new Set(),spans=new Set();let page;
      for(const group of target.groups){
        keys(group,['documentId','unitIds']);unique(group.unitIds);if(!group.unitIds.includes(group.documentId))invalid();const main=document(group.documentId);if(spans.has(main.output))invalid();const groupOutputs=new Set();
        for(const id of group.unitIds){const item=document(id);if(item.type!=='unit'||item.sha256!==main.sha256||searchDocs.get(id).text!==searchDocs.get(main.id).text||spans.has(item.output)||seen.has(id))invalid();seen.add(id);groupOutputs.add(item.output);if(item.locator?.pdfPage!==undefined){if(page!==undefined&&page!==item.locator.pdfPage)invalid();page=item.locator.pdfPage;}}
        for(const output of groupOutputs)spans.add(output);
      }
    }else invalid();
  }
  for(const doc of documents.values()){
    const hrefs=new Set();for(const link of doc.links){keys(link,['ownerId','href','target']);if(link.ownerId!==doc.id||typeof link.href!=='string'||!link.href||hrefs.has(link.href))invalid();hrefs.add(link.href);checkTarget(link.target);}
  }
  const lessons=indexed(reader.lessons),concepts=indexed(reader.concepts),outcomes=indexed(reader.outcomes),exercises=indexed(reader.exercises);
  for(const [collection,type] of [[lessons,'lesson'],[concepts,'concept']]){
    for(const value of collection.values())if(document(value.id).type!==type||!Number.isFinite(value.order))invalid();
    for(const item of items.values())if(item.type===type&&!collection.has(item.id))invalid();
  }
  const used=new Set();
  for(const lesson of lessons.values()){
    unique(lesson.outcomeIds);unique(lesson.exerciseIds);const expected=new Set();
    for(const id of lesson.outcomeIds){const outcome=outcomes.get(id);if(!outcome)invalid();used.add(id);unique(outcome.exerciseIds).forEach(value=>expected.add(value));}
    if(lesson.exerciseIds.length!==expected.size||lesson.exerciseIds.some(id=>!expected.has(id)))invalid();
  }
  for(const outcome of outcomes.values()){
    if(!used.has(outcome.id)||['action','conditions','successCriterion'].some(key=>typeof outcome[key]!=='string'||!outcome[key]))invalid();
    for(const id of unique(outcome.exerciseIds))if(!exercises.get(id)?.outcomeIds.includes(outcome.id))invalid();
  }
  for(const exercise of exercises.values()){
    if(!['source','supplemental'].includes(exercise.origin)||!unique(exercise.outcomeIds).length)invalid();
    for(const id of exercise.outcomeIds)if(!outcomes.get(id)?.exerciseIds.includes(exercise.id))invalid();
    for(const name of ['promptDocumentId','answerDocumentId'])if(document(exercise[name]).type!=='exercise')invalid();
    if(exercise.promptDocumentId===exercise.answerDocumentId)invalid();
  }
  freeze(bundle);
  function target(ownerId,href){return documents.get(ownerId)?.links.find(link=>link.href===href)?.target??null;}
  function anchor(id,value){document(id);if(value!==null&&!documents.get(id).anchors.includes(value))invalid();return value;}
  return Object.freeze({bundle,document,target,anchor});
}
function fragmentFor(model,id,anchor=null){model.document(id);model.anchor(id,anchor);return '#document='+encodeURIComponent(id)+(anchor===null?'':'&anchor='+encodeURIComponent(anchor));}
function parseFragment(model,fragment){
  if(typeof fragment!=='string'||!fragment.startsWith('#'))invalid();
  const values=new URLSearchParams(fragment.slice(1)),entries=[...values.keys()];
  if(entries.some(key=>!['document','anchor'].includes(key))||new Set(entries).size!==entries.length||!values.has('document'))invalid();
  const documentId=values.get('document'),anchor=values.has('anchor')?values.get('anchor'):null;
  if(fragmentFor(model,documentId,anchor)!==fragment)invalid();return {documentId,anchor};
}
async function responseBytes(url,mime){
  const response=await fetch(url,{credentials:'omit',redirect:'error',cache:'no-store'});
  if(!response.ok||response.url!==url.href||response.headers.get('Content-Type')!==mime)invalid();
  const bytes=new Uint8Array(await response.arrayBuffer());return bytes;
}
async function jsonResource(url){const bytes=await responseBytes(url,'application/json');return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}
async function digest(bytes){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(value=>value.toString(16).padStart(2,'0')).join('');}
function generationIdentity(){
  const parts=GENERATION_ROOT.pathname.split('/');
  if(GENERATION_ROOT.protocol!=='http:'||GENERATION_ROOT.hostname!=='127.0.0.1'||parts.length!==4||parts[1]!=='g'||!hashPattern.test(parts[2])||parts[3]!==''||GENERATION_ROOT.search||GENERATION_ROOT.hash)invalid();
  return parts[2];
}
async function loadRoutes(){
  const generationDigest=generationIdentity();
  const [catalog,report,reader,graph,search]=await Promise.all([CATALOG_URL,REPORT_URL,READER_URL,GRAPH_URL,SEARCH_URL].map(jsonResource));
  const model=selectedModel({catalog,report,reader,graph,search});
  for(const document of search.documents)if(await digest(new TextEncoder().encode(document.text))!==document.sha256)invalid();
  function documentURL(id){const member=model.document(id).output;let url=new URL(member, GENERATION_ROOT);if(url.origin!==GENERATION_ROOT.origin||!url.pathname.startsWith(GENERATION_ROOT.pathname)||url.search||url.hash)invalid();return url.href;}
  async function readDocument(id){const item=model.document(id),member=item.output,url=new URL(member, GENERATION_ROOT);const bytes=await responseBytes(url,'text/markdown');if(await digest(bytes)!==item.sha256)invalid();return {id,text:new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes),draft:catalog.draft,warning:search.warning};}
  async function rasterURL(ownerId,href){
    const target=model.target(ownerId,href);if(!target||target.kind!=='asset')invalid();const member=target.member,url=new URL(member, GENERATION_ROOT);
    const extension=member.split('.').at(-1),mime=extension==='png'?'image/png':extension==='webp'?'image/webp':'image/jpeg';
    const bytes=await responseBytes(url,mime);if(await digest(bytes)!==member.slice(7,71))invalid();return url.href;
  }
  async function pollStatus(){
    const status=await jsonResource(STATUS_URL);keys(status,['ok','digest','builderVersion','draft','currentError','usingLastGood']);
    if(status.ok!==true||!hashPattern.test(status.digest)||![1,2,3].includes(status.builderVersion)||['draft','currentError','usingLastGood'].some(key=>typeof status[key]!=='boolean')||status.currentError!==status.usingLastGood)invalid();
    return freeze({...status,updateAvailable:status.builderVersion===3&&!status.currentError&&status.digest!==generationDigest});
  }
  async function refresh(session,view){
    const status=await pollStatus();if(!status.updateAvailable)return {status:'unavailable'};
    const saved=await session.checkpoint(view);if(saved.status!=='saved')return saved;
    if(session.status().dirty)return {status:'dirty'};
    const member='/g/'+status.digest+'/ui/index.html',url=new URL(member, GENERATION_ROOT);
    if(url.origin!==GENERATION_ROOT.origin)invalid();globalThis.location.assign(url.href);return {status:'navigating'};
  }
  return Object.freeze({generationDigest,inputDigest:catalog.inputDigest,model,documentURL,readDocument,rasterURL,pollStatus,refresh,fragmentFor:(id,anchor=null)=>fragmentFor(model,id,anchor),parseFragment:fragment=>parseFragment(model,fragment)});
}
export {selectedModel,fragmentFor,parseFragment,loadRoutes};
