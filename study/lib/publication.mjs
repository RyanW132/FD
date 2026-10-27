import { mkdir, open, readFile, readdir, rename, rm, lstat } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { captureProject, readConfinedBytes } from './capture.mjs';
import { sha256, isSafePath, validateCapturedProject } from './contracts.mjs';
import { selectPublication, isDraftFreshnessError } from './policy.mjs';
import { buildKnowledge } from './knowledge.mjs';
const digestPattern=/^[a-f0-9]{64}$/;
async function plainDirectory(p){await mkdir(p,{recursive:true});if((await lstat(p)).isSymbolicLink())throw Error('Symlink publication directory');}
function json(value){return Buffer.from(JSON.stringify(value,null,2)+'\n');}
export async function buildPublication(root,{publish=false,previewDraft=false,builderVersion=2,testHooks={}}={}){
  if(![2,3].includes(builderVersion))return {ok:false,errors:[{code:'FLAG',message:'Unsupported builder version'}]};
  if(previewDraft&&!publish)return {ok:false,errors:[{code:'FLAG',message:'Draft preview requires explicit publish'}]};
  const generated=path.join(root,'study/generated');await plainDirectory(path.join(root,'study'));await plainDirectory(generated);
  await syncDirectory(generated);await syncDirectory(path.join(root,'study'));await syncDirectory(root);
  const lock=path.join(generated,'.publish-lock');
  try{await mkdir(lock);}catch(e){if(e.code==='EEXIST')return {ok:false,errors:[{code:'LOCKED',message:'Publication is already locked; no automatic stale-lock breaking'}]};throw e;}
  let stage;
  try{
    const bundle=builderVersion===3?await import('./ui-bundle.mjs'):null;
    const capture=await captureProject(root,{testHooks,additionalInputs:bundle?.uiAdditionalInputs??[]});
    const validation=await validateCapturedProject(capture.readBytes);
    // Only genuine freshness failures may downgrade. Missing hash inputs/bindings remain fatal.
    const draftReason=isDraftFreshnessError;
    const fatal=validation.errors.filter(error=>!(previewDraft&&draftReason(error)));
    if(fatal.length)return {ok:false,errors:fatal};
    const records=capture.records;
    const unreviewed=[...Object.values(records.curriculum.lessons),...Object.values(records.curriculum.concepts)].some(x=>!x.reviewId);
    if(unreviewed&&!previewDraft)return {ok:false,errors:[{code:'UNREVIEWED',message:'Teaching requires current review or explicit draft preview'}]};
    const selected=await selectPublication(capture,{draft:previewDraft});
    const readiness=previewDraft?{accountingComplete:validation.readiness.accountingComplete,conversionComplete:validation.readiness.conversionComplete,teachingComplete:false}:validation.readiness;
    if(!Object.values(records.curriculum.lessons).every(lesson=>selected.items.some(item=>item.type==='lesson'&&item.id===lesson.id)))readiness.teachingComplete=false;
    const report={schemaVersion:1,inputDigest:capture.digest,draft:previewDraft,draftReasons:previewDraft?[...new Set([...validation.errors.filter(draftReason).map(error=>error.code),...(unreviewed?['UNREVIEWED']:[])])]:[],status:previewDraft?'draft-incomplete':readiness.teachingComplete?'reviewed-complete':'incomplete',readiness,omitted:selected.omitted};
    const catalog={schemaVersion:1,inputDigest:capture.digest,draft:previewDraft,items:selected.items.map(item=>{const unit=selected.metadata.nodes.find(node=>node.id===item.id&&node.type==='unit');return unit?{...item,locator:unit.locator,status:unit.status}:item;})};
    const knowledge=await buildKnowledge(selected);
    const payloads=new Map(selected.payloads);payloads.set('graph.json',json(knowledge.graph));payloads.set('search.json',json(knowledge.index));payloads.set('catalog.json',json(catalog));payloads.set('report.json',json(report));
    payloads.set('index.md',Buffer.from(`# Study helper\n\n${previewDraft?'DRAFT — INCOMPLETE — NOT REVIEWED':'Explicit publication'}\n\nTeaching complete: ${readiness.teachingComplete}\n`));
    if(bundle){
      const {validateReader}=await import('./reader.mjs');
      validateReader(selected.reader,{catalog,inputDigest:capture.digest,draft:previewDraft,files:payloads});
      payloads.set('reader.json',json(selected.reader));
    }
    const ui=bundle?await bundle.captureUIBundle(capture,payloads):new Map();
    for(const [name,bytes]of ui)payloads.set(name,bytes);
    const uiTypes=new Map(bundle?.uiMembers.map(member=>[member.path,member.contentType])??[]);
    const manifest={schemaVersion:1,builderVersion,channel:'browser',mode:previewDraft?'draft':'reviewed',inputDigest:capture.digest,files:[...payloads].sort(([a],[b])=>a.localeCompare(b)).map(([p,b])=>({path:p,sha256:sha256(b),byteLength:b.length,contentType:uiTypes.get(p)??(p.endsWith('.json')?'application/json':p.endsWith('.md')?'text/markdown':p.endsWith('.png')?'image/png':p.endsWith('.webp')?'image/webp':'image/jpeg')}))};
    const digest=sha256(json(manifest));
    if(!publish)return {ok:true,digest,report,errors:[]};
    stage=path.join(generated,'.stage-'+randomUUID());await mkdir(stage);
    for(const [p,b]of payloads){await mkdir(path.dirname(path.join(stage,p)),{recursive:true});await durableWrite(path.join(stage,p),b);}
    await durableWrite(path.join(stage,'manifest.json'),json(manifest));
    await testHooks.beforeCommit?.();await capture.recheck();
    const directories=new Set([stage]);
    for(const member of payloads.keys()){let dir=path.dirname(path.join(stage,member));while(dir!==stage){directories.add(dir);dir=path.dirname(dir);}}
    for(const dir of [...directories].sort((a,b)=>b.length-a.length))await syncDirectory(dir);
    const destination=path.join(generated,digest);
    let exists;try{await lstat(destination);exists=true;}catch(e){if(e.code!=='ENOENT')throw e;exists=false;}
    if(exists){await readGeneration(root,digest);await rm(stage,{recursive:true});stage=null;}
    else{await rename(stage,destination);stage=null;}
    await syncDirectory(generated);
    await testHooks.afterGeneration?.();await capture.recheck();
    // Re-open the entire finished generation, including every bundle member.
    await readGeneration(root,digest);
    const pointer=path.join(generated,'.current-'+randomUUID());
    try{await durableWrite(pointer,json({schemaVersion:1,digest}));await rename(pointer,path.join(generated,'current.json'));await syncDirectory(generated);}finally{await rm(pointer,{force:true});}
    return {ok:true,digest,report,errors:[]};
  }catch(e){return {ok:false,errors:[{code:'PUBLICATION',message:e.message}]};}
  finally{if(stage)await rm(stage,{recursive:true,force:true});await rm(lock,{recursive:true});}
}
async function syncDirectory(p){const fd=await open(p,'r');try{await fd.sync();}finally{await fd.close();}}
async function durableWrite(p,b){const fd=await open(p,'wx');try{await fd.writeFile(b);await fd.sync();}finally{await fd.close();}}
async function readPlain(base,p){return readConfinedBytes(base,p);}
// Version 1 predates knowledge payloads and parent bindings. Accept only its
// original closed payload contract, never a version-2 generation relabelled v1.
function validateLegacyGeneration(manifest,files,catalog,report){
  const keys=(value,expected)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).sort().join(',')===expected.split(',').sort().join(',');
  const fail=()=>{throw Error('Invalid legacy generation payload');};
  if(!keys(catalog,'schemaVersion,draft,items')||!keys(report,'schemaVersion,draft,draftReasons,status,readiness,omitted')||!keys(report.readiness,'accountingComplete,conversionComplete,teachingComplete')||Object.values(report.readiness).some(v=>typeof v!=='boolean')||!Array.isArray(report.draftReasons)||report.draftReasons.some(v=>typeof v!=='string')||!Number.isSafeInteger(report.omitted)||report.omitted<0)fail();
  if(report.status!==(report.draft?'draft-incomplete':report.readiness.teachingComplete?'reviewed-complete':'incomplete'))fail();
  const members=new Set(['catalog.json','report.json','index.md']);
  const ids=new Set();
  for(const item of catalog.items){
    if(!keys(item,'id,type,title,ref,output,sha256,draft')||typeof item.id!=='string'||ids.has(item.id)||!['unit','lesson','concept','exercise'].includes(item.type)||typeof item.title!=='string'||item.draft!==catalog.draft||!digestPattern.test(item.sha256)||!/^content\/[a-f0-9]{64}\.md$/.test(item.output))fail();
    ids.add(item.id);
    const ref=item.ref;
    if(!(keys(ref,'kind,unitId')&&ref.kind==='source'&&typeof ref.unitId==='string'||keys(ref,'kind,path,id')&&ref.kind==='record'&&isSafePath(ref.path)&&typeof ref.id==='string'||keys(ref,'kind,path,anchor')&&ref.kind==='markdown'&&isSafePath(ref.path)&&typeof ref.anchor==='string'))fail();
    members.add(item.output);
  }
  for(const [name,bytes]of files){
    if(members.has(name))continue;
    const asset=/^assets\/([a-f0-9]{64})\.(png|jpe?g|webp)$/.exec(name);
    if(!asset||sha256(bytes)!==asset[1])fail();
  }
  if([...members].some(name=>!files.has(name)))fail();
  const expectedIndex=`# Study helper\n\n${report.draft?'DRAFT — INCOMPLETE — NOT REVIEWED':'Explicit publication'}\n\nTeaching complete: ${report.readiness.teachingComplete}\n`;
  if(!files.get('index.md').equals(Buffer.from(expectedIndex)))fail();
  for(const entry of manifest.files){const expected=entry.path.endsWith('.json')?'application/json':entry.path.endsWith('.md')?'text/markdown':entry.path.endsWith('.png')?'image/png':entry.path.endsWith('.webp')?'image/webp':'image/jpeg';if(entry.contentType!==expected)fail();}
}
// Version 2 adds knowledge payloads, but not arbitrary manifested resources.
// Content names hash selectors (not bytes); raster names hash their bytes.
function validateV2Generation(manifest,files,catalog,report){
  const fail=()=>{throw Error('Invalid v2 generation output payload');};
  const members=new Map([['catalog.json','application/json'],['report.json','application/json'],['index.md','text/markdown'],['graph.json','application/json'],['search.json','application/json']]);
  for(const item of catalog.items){
    if(!/^content\/[a-f0-9]{64}\.md$/.test(item.output))fail();
    members.set(item.output,'text/markdown');
  }
  for(const entry of manifest.files){
    let expected=members.get(entry.path);
    if(!expected){
      const asset=/^assets\/([a-f0-9]{64})\.(png|jpe?g|webp)$/.exec(entry.path);
      if(!asset||sha256(files.get(entry.path))!==asset[1])fail();
      expected=asset[2]==='png'?'image/png':asset[2]==='webp'?'image/webp':'image/jpeg';
    }
    if(entry.contentType!==expected)fail();
  }
  if([...members.keys()].some(name=>!files.has(name)))fail();
  const expectedIndex=`# Study helper\n\n${report.draft?'DRAFT — INCOMPLETE — NOT REVIEWED':'Explicit publication'}\n\nTeaching complete: ${report.readiness.teachingComplete}\n`;
  if(!files.get('index.md').equals(Buffer.from(expectedIndex)))fail();
  const graph=JSON.parse(files.get('graph.json')),search=JSON.parse(files.get('search.json'));
  if([catalog,report,graph,search].some(output=>output.inputDigest!==manifest.inputDigest)||search.schemaVersion!==1||graph.schemaVersion!==1||!Array.isArray(graph.nodes)||!Array.isArray(graph.edges)||!Array.isArray(search.documents)||!digestPattern.test(search.revision))throw Error('Mixed captured input binding');
  const draft=manifest.mode==='draft';
  const warning=draft?'DRAFT — UNREVIEWED preview; not reviewed teaching or evidence of mastery.':null;
  // V2 and V3 emit this same envelope; documents inherit catalog mode and do
  // not carry a separate warning field. Do not invent legacy-v1 fields.
  if(search.draft!==draft||search.warning!==warning||search.documents.some(document=>document.draft!==draft))throw Error('Mixed search mode binding');
  const semantic=sha256(Buffer.from(JSON.stringify({nodes:graph.nodes,edges:graph.edges,documents:search.documents})));
  if(semantic!==search.revision)throw Error('Mixed knowledge revision');
  const documentIds=new Set();
  for(const document of search.documents){const item=catalog.items.find(item=>item.id===document.id);const {text,byteLength,...metadata}=document;if(documentIds.has(document.id)||!item||JSON.stringify(metadata)!==JSON.stringify(item)||typeof text!=='string'||Buffer.byteLength(text)!==byteLength||sha256(Buffer.from(text))!==item.sha256)throw Error('Mixed search content');documentIds.add(document.id);}
  if(search.documents.length!==catalog.items.length)throw Error('Incomplete search content');
}
async function validateV3Generation(manifest,files,catalog,report){
  const {uiMembers,validateUIBundle}=await import('./ui-bundle.mjs');
  const required=new Map([['reader.json','application/json'],...uiMembers.map(member=>[member.path,member.contentType])]);
  for(const [name,type]of required)if(!files.has(name)||manifest.files.find(entry=>entry.path===name)?.contentType!==type)throw Error('Invalid v3 generation manifest');
  const baseFiles=new Map([...files].filter(([name])=>!required.has(name)));
  validateV2Generation({...manifest,files:manifest.files.filter(entry=>!required.has(entry.path))},baseFiles,catalog,report);
  validateUIBundle(files);
  const {validateReader}=await import('./reader.mjs');
  validateReader(JSON.parse(files.get('reader.json')),{catalog,inputDigest:manifest.inputDigest,draft:manifest.mode==='draft',files});
}
// Reads only the current pointer; the generation it names is verified separately.
export async function readCurrentDigest(root){
  const generated=path.join(root,'study/generated');if((await lstat(generated)).isSymbolicLink())throw Error('Generated symlink');
  const p=JSON.parse(await readPlain(generated,'current.json'));if(Object.keys(p).sort().join(',')!=='digest,schemaVersion'||p.schemaVersion!==1)throw Error('Invalid pointer');
  if(!digestPattern.test(p.digest))throw Error('Invalid generation digest');
  return p.digest;
}
export async function readGeneration(root,digest){
  const generated=path.join(root,'study/generated');if((await lstat(generated)).isSymbolicLink())throw Error('Generated symlink');
  if(digest===undefined)digest=await readCurrentDigest(root);
  if(!digestPattern.test(digest))throw Error('Invalid generation digest');
  const base=path.join(generated,digest);if((await lstat(base)).isSymbolicLink())throw Error('Generation symlink');
  const raw=await readPlain(base,'manifest.json'),manifest=JSON.parse(raw);
  if(sha256(raw)!==digest||Object.keys(manifest).sort().join(',')!=='builderVersion,channel,files,inputDigest,mode,schemaVersion'||!([1,2,3].includes(manifest.builderVersion))||manifest.channel!=='browser'||!['draft','reviewed'].includes(manifest.mode)||manifest.schemaVersion!==1||!digestPattern.test(manifest.inputDigest)||!Array.isArray(manifest.files))throw Error('Invalid generation manifest');
  const files=new Map();
  for(const f of manifest.files){if(Object.keys(f).sort().join(',')!=='byteLength,contentType,path,sha256'||!['application/json','text/markdown','image/png','image/webp','image/jpeg',...(manifest.builderVersion===3?['text/html','text/javascript','text/css','text/plain']:[])].includes(f.contentType)||!isSafePath(f.path)||f.path==='manifest.json'||files.has(f.path)||!digestPattern.test(f.sha256)||!Number.isSafeInteger(f.byteLength)||f.byteLength<0)throw Error('Invalid manifest entry');const b=await readPlain(base,f.path);if(b.length!==f.byteLength||sha256(b)!==f.sha256)throw Error('Generation bytes changed');files.set(f.path,b);}
  const actual=[];async function walk(dir,rel=''){for(const e of await readdir(dir,{withFileTypes:true})){const p=rel+e.name;if(e.isSymbolicLink())throw Error('Generated symlink');if(e.isDirectory())await walk(path.join(dir,e.name),p+'/');else if(e.isFile())actual.push(p);else throw Error('Unsupported generated entry');}}await walk(base);
  if(JSON.stringify(actual.sort())!==JSON.stringify([...files.keys(),'manifest.json'].sort()))throw Error('Unmanifested generation membership');
  const readBytes=async p=>{if(!files.has(p))throw Error('Output not in manifest');return Buffer.from(files.get(p));};
  const catalog=JSON.parse(await readBytes('catalog.json')),report=JSON.parse(await readBytes('report.json'));
  if(catalog.schemaVersion!==1||!Array.isArray(catalog.items)||typeof catalog.draft!=='boolean'||report.schemaVersion!==1||typeof report.draft!=='boolean'||catalog.draft!==report.draft||report.draft!==(manifest.mode==='draft'))throw Error('Invalid catalog/report mode');
  if(manifest.builderVersion===1)validateLegacyGeneration(manifest,files,catalog,report);
  if(manifest.builderVersion===2)validateV2Generation(manifest,files,catalog,report);
  if(manifest.builderVersion===3)await validateV3Generation(manifest,files,catalog,report);
  for(const item of catalog.items)if(!files.has(item.output)||sha256(files.get(item.output))!==item.sha256)throw Error('Invalid catalog output binding');
  return Object.freeze({digest,builderVersion:manifest.builderVersion,members:Object.freeze(manifest.files.map(entry=>Object.freeze({...entry}))),catalog,report,readBytes});
}
export const openGeneration=readGeneration;
