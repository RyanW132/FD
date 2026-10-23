import { validateSourceQA } from './source-qa.mjs';
import { markdownAssets, decodeUtf8 } from './assets.mjs';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import {
  createHash
} from 'node:crypto';
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const own=(o,k)=>Object.hasOwn(o??{},k);
const ID=/^[a-z][a-z0-9]*(?:[-:][a-z0-9]+)*$/;
const HASH=/^[a-f0-9]{64}$/;
const schemas={
  sources:'id kind originalPath sha256 byteLength access exposure extractionStatus tool pageCount derivedRevision issueIds',issues:'id scopeRef reason status resolutionRef',missingSources:'id label expectedKind reason',
  pages:'sourceId pdfPage status unitIds issueIds',units:'id sourceId locator extractionRef contentHash status classification issueIds',transcriptAssociations:'transcriptUnitId lectureUnitIds confidence rationale',
  coverage:'unitId lessonIds outcomeIds disposition reason reviewId',reviews:'id reviewer reviewedAt subjectRefs inputHashes verdict evidenceRef',
  lectures:'id title sourceId lessonIds',lessons:'id title path lectureIds sourceUnitIds outcomeIds conceptIds prerequisiteIds order reviewId supplemental',concepts:'id title path evidenceRefs prerequisiteIds order reviewId',outcomes:'id lessonIds conceptIds action conditions successCriterion exerciseIds evidenceRefs',exercises:'id outcomeIds promptRef answerRef origin evidenceRefs',
  links:'id from to type evidenceRefs basis reason reviewId',exceptions:'id sourceId unitIds outputRefs channels approvedBy approvedAt rationale inputDigest'
};
const roots={
  manifest:['sources','issues','missingSources'],units:['pages','units','transcriptAssociations'],coverage:['coverage'],curriculum:['lectures','lessons','concepts','outcomes','exercises','links'],reviews:['reviews'],exposureExceptions:['exceptions']
};
const enums={
  kind:['lecture','transcript','seminar','solution','textbook'],access:['unverified','permitted','blocked'],extractionStatus:['pending','partial','complete','blocked'],classification:['unknown','substantive','administrative','blank'],disposition:['pending','taught','reference-only','excluded','blocked'],origin:['source','supplemental'],confidence:['verified','tentative','unmapped'],basis:['source','pedagogical'],verdict:['approved','changes-needed']
};
// Reserved namespace segments, not filesystem identity or reference normalization.
export const isPrivatePath=p=>typeof p==='string'&&/^study\/private(?:\/|$)/i.test(p);
export function isSafePath(p){
  return typeof p==='string'&&p.length>0&&!p.includes('\\')&&!p.includes('\0')&&!path.posix.isAbsolute(p)&&!/^\w+:/.test(p)&&p.split('/').every(s=>s&&s!=='.'&&s!=='..');
}
export async function confinedPath(root,p){
  if(!isSafePath(p))throw Error('Unsafe repository path');
  const base=await realpath(root);
  const full=await realpath(path.join(base,p));
  if(full!==base&&!full.startsWith(base+path.sep))throw Error('Path escapes repository');
  return full;
}
function collections(records){
  const out={};
  for(const [r,names]of Object.entries(roots))for(const n of names)out[n]=records[r]?.[n]??{};
  return out;
}
function checkObject(o,keys,at,err){
  if(!o||typeof o!=='object'||Array.isArray(o)){
    err('SHAPE','Expected object',at);
    return false;
  }
  for(const k of Object.keys(o))if(!keys.includes(k)||['__proto__','constructor','prototype'].includes(k))err('UNKNOWN_FIELD',`Unknown field ${k}`,at);
  for(const k of keys)if(!own(o,k))err('MISSING_FIELD',`Missing ${k}`,at);
  return true;
}
function refsIn(value,out=[]){
  if(!value||typeof value!=='object')return out;
  if(own(value,'kind')&&['record','markdown','source'].includes(value.kind))out.push(value);
  else for(const v of Object.values(value))refsIn(v,out);
  return out;
}
function validateRecordsInternal(records,options={}){
  const errors=[];
  const err=(code,message,p)=>errors.push({
    code,message,...(p?{
      path:p
    }:{})
  });
  const c=collections(records);
  const selected={
    manifest:options.sources!==false,units:options.sources!==false,coverage:options.coverage!==false,curriculum:options.curriculum!==false,reviews:true,exposureExceptions:true
  };
  for(const [root,names]of Object.entries(roots)){
    if(!selected[root])continue;
    const obj=records[root];
    if(!checkObject(obj,['schemaVersion',...names],root,err))continue;
    if(obj.schemaVersion!==1)err('SCHEMA_VERSION','Expected schemaVersion 1',root);
    for(const name of names){
      if(!obj[name]||typeof obj[name]!=='object'||Array.isArray(obj[name])){
        err('SHAPE','Expected keyed records',root+'.'+name);
        continue;
      }
      for(const [key,v]of Object.entries(obj[name])){
        const at=root+'.'+name+'.'+key;
        if(!checkObject(v,schemas[name].split(' '),at,err))continue;
        const id=v.id??v.unitId??v.transcriptUnitId;
        if(name!=='pages'&&(!ID.test(key)||id!==key))err('ID','Key must equal stable lowercase record ID',at);
        for(const [field,val]of Object.entries(v)){
          if(field.endsWith('Ids')||['evidenceRefs','subjectRefs','inputHashes','outputRefs','channels'].includes(field)){
            if(!Array.isArray(val))err('TYPE',`${field} must be array`,at);
            else if(new Set(val.map(x=>JSON.stringify(x))).size!==val.length)err('DUPLICATE',`Duplicate ${field}`,at);
          }
          if(['originalPath','path'].includes(field)&&!isSafePath(val))err('PATH','Unsafe path',at);
          if(enums[field]&&!enums[field].includes(val))err('ENUM',`Invalid ${field}`,at);
          if(['sha256','contentHash','inputDigest'].includes(field)&&(val===null?field!=='contentHash':typeof val!=='string'||!HASH.test(val)))err('HASH',`Invalid ${field}`,at);
        }
        for(const field of ['evidenceRefs','subjectRefs','outputRefs'])for(const ref of Array.isArray(v[field])?v[field]:[])validateRefShape(ref,err);
        for(const field of ['scopeRef','resolutionRef','extractionRef','promptRef','answerRef','evidenceRef'])if(v[field]!==null&&own(v,field))validateRefShape(v[field],err);
        for(const field of ['title','reason','rationale','label','expectedKind','reviewer','reviewedAt','approvedBy','approvedAt','action','conditions','successCriterion'])if(own(v,field)&&typeof v[field]!=='string')err('TYPE',`${field} must be string`,at);
        if(own(v,'supplemental')&&typeof v.supplemental!=='boolean')err('TYPE','supplemental must be boolean',at);
        if(name==='sources'){
          checkObject(v.exposure,['browser','export','agent'],at+'.exposure',err);
          if(v.kind==='textbook'&&Object.values(v.exposure??{}).some(policy=>policy!=='deny'))err('POLICY','Textbook exposure requires scoped exceptions, never blanket allowance',at);
          for(const ch of ['browser','export','agent'])if(!['allow','deny'].includes(v.exposure?.[ch]))err('POLICY','Unclassified channel denies exposure',at);
          if(v.tool!==null){
            checkObject(v.tool,['name','version','configHash'],at+'.tool',err);
            if(!HASH.test(v.tool?.configHash))err('HASH','Invalid tool configHash',at);
          }
          if(!Number.isSafeInteger(v.byteLength)||v.byteLength<0||!(v.pageCount===null||Number.isSafeInteger(v.pageCount)&&v.pageCount>0))err('COUNT','Invalid byte/page count',at);
          if(v.pageCount===null&&v.originalPath?.toLowerCase().endsWith('.pdf')&&!v.issueIds?.length)err('ACCOUNTING','Unknown PDF page count requires issue',at);
          if(v.extractionStatus==='complete'&&(v.access!=='permitted'||v.tool===null||!HASH.test(v.derivedRevision)))err('CONVERSION','Complete source requires access/tool/revision',at);
        }
        if(name==='issues'){
          if(!['open','resolved'].includes(v.status)||v.status==='resolved'&&v.resolutionRef===null)err('ISSUE','Invalid issue status/resolution',at);
        }
        if(['pages','units'].includes(name)&&!['pending','verified','needs-review','blocked'].includes(v.status))err('STATUS','Invalid status',at);
        if(name==='units'){
          checkObjectOptional(v.locator,['pdfPage','printedPage','slideLabel','region','lineStart','lineEnd','paragraphId'],at+'.locator',err);
          for(const field of ['printedPage','slideLabel','region','paragraphId'])if(own(v.locator,field)&&(typeof v.locator[field]!=='string'||!v.locator[field].trim()))err('LOCATOR',`Invalid ${field}`,at);
          const s=c.sources[v.sourceId];
          if(!s)err('REFERENCE','Unknown source',at);
          else{
            if(s.originalPath.endsWith('.pdf')){
              if(!Number.isInteger(v.locator?.pdfPage)||v.locator.pdfPage<1||s.pageCount!==null&&v.locator.pdfPage>s.pageCount)err('LOCATOR','PDF page out of bounds',at);
            }
            else if(!Number.isInteger(v.locator?.lineStart)||!Number.isInteger(v.locator?.lineEnd)||v.locator.lineStart<1||v.locator.lineEnd<v.locator.lineStart)err('LOCATOR','Invalid line range',at);
            if(s.kind==='textbook'&&v.extractionRef&&!v.extractionRef.path?.startsWith(`study/private/${s.id}/`))err('PRIVATE_PATH','Textbook extraction must remain source-private',at);
          }
          if(v.status==='verified'&&(!v.extractionRef||!HASH.test(v.contentHash)||v.classification==='unknown'))err('VERIFIED_UNIT','Verified units require extraction/hash/classification',at);
          if(v.extractionRef&&v.extractionRef.kind!=='markdown')err('REFERENCE','Extraction must be Markdown reference',at);
        }
        if(name==='pages'){
          if(key!==`${v.sourceId}:${v.pdfPage}`)err('ID','Page key must be sourceId:pdfPage',at);
          const s=c.sources[v.sourceId];
          if(!s||!Number.isInteger(v.pdfPage)||v.pdfPage<1||v.pdfPage>s.pageCount)err('LOCATOR','Invalid page accounting locator',at);
          for(const id of v.unitIds??[])if(c.units[id]?.sourceId!==v.sourceId||c.units[id]?.locator.pdfPage!==v.pdfPage)err('ACCOUNTING','Page unit mismatch',at);
        }
        if(name==='transcriptAssociations'){
          const tu=c.units[v.transcriptUnitId];
          if(!tu||c.sources[tu.sourceId]?.kind!=='transcript')err('ASSOCIATION','Association requires transcript unit',at);
          if(v.confidence==='verified'&&(tu?.status!=='verified'||!v.lectureUnitIds?.length))err('ASSOCIATION','Verified association requires verified units',at);
          for(const uid of v.lectureUnitIds??[])if(c.sources[c.units[uid]?.sourceId]?.kind!=='lecture'||v.confidence==='verified'&&c.units[uid]?.status!=='verified')err('ASSOCIATION','Invalid lecture association unit',at);
        }
        if(name==='exercises'){
          if(v.promptRef?.kind!=='markdown'||v.answerRef?.kind!=='markdown'||JSON.stringify(v.promptRef)===JSON.stringify(v.answerRef))err('ANSWER','Distinct Markdown prompt and answer required',at);
          if(v.origin==='source'&&!(v.evidenceRefs??[]).some(r=>r.kind==='source'&&c.units[r.unitId]?.status==='verified'))err('EVIDENCE','Source exercises need verified unit evidence',at);
        }
        if(name==='reviews'){
          if(!v.subjectRefs?.length||!v.inputHashes?.length||!v.reviewer?.trim()||!Number.isFinite(Date.parse(v.reviewedAt)))err('REVIEW','Review requires subjects, inputs, reviewer and timestamp',at);
          for(const h of v.inputHashes??[]){
            checkObject(h,['path','sha256'],at+'.inputHashes',err);
            if(!isSafePath(h.path)||!HASH.test(h.sha256)||h.path==='study/reviews.json')err('REVIEW_HASH','Invalid/self-referential review hash',at);
          }
        }
        if(name==='exceptions'){
          if(!c.sources[v.sourceId]||!v.unitIds?.length||!v.outputRefs?.length||!v.channels?.length||v.channels.some(ch=>!['browser','export','agent'].includes(ch))||!v.approvedBy?.trim()||!Number.isFinite(Date.parse(v.approvedAt))||!v.rationale?.trim())err('EXCEPTION','Invalid scoped exposure exception',at);
          for(const id of v.unitIds??[])if(c.units[id]?.sourceId!==v.sourceId)err('EXCEPTION','Exception unit belongs to other source',at);
        }
      }
    }
  }
  function requireIds(values,col,at){
    for(const id of values??[])if(typeof id!=='string'||!own(c[col],id))err('REFERENCE',`Unknown ${col} ID ${id}`,at);
  }
  for(const [name,items]of Object.entries(c))for(const [id,v]of Object.entries(items)){
    const at=name+'.'+id;
    for(const [field,col]of Object.entries({
      issueIds:'issues',lessonIds:'lessons',lectureIds:'lectures',sourceUnitIds:'units',outcomeIds:'outcomes',conceptIds:'concepts',exerciseIds:'exercises',lectureUnitIds:'units'
    }))if(own(v,field))requireIds(v[field],col,at);
    if(v.reviewId!==null&&own(v,'reviewId')&&!own(c.reviews,v.reviewId))err('REFERENCE','Unknown reviewId',at);
    if(name==='lectures'){
      if(c.sources[v.sourceId]?.kind!=='lecture')err('REFERENCE','Lecture requires lecture source',at);
      for(const lid of v.lessonIds??[])if(!c.lessons[lid]?.lectureIds.includes(id))err('RECIPROCAL','Lecture/lesson mismatch',at);
    }
    if(name==='lessons'&&v.reviewId&&v.sourceUnitIds?.some(uid=>c.units[uid]?.status!=='verified'))err('EVIDENCE','Reviewed lesson requires verified source units',at);
    if(name==='lessons')for(const lecture of v.lectureIds??[])if(!c.lectures[lecture]?.lessonIds.includes(id))err('RECIPROCAL','Lesson/lecture mismatch',at);
    if(['lessons','concepts'].includes(name)){
      if(!Number.isFinite(v.order))err('ORDER','Order required',at);
      for(const p of v.prerequisiteIds??[]){
        const prereq=c.lessons[p]??c.concepts[p];
        if(!prereq)err('REFERENCE','Unknown prerequisite',at);
        else if(prereq.order>=v.order)err('ORDER','Prerequisite must precede dependent',at);
      }
    }
    if(name==='lessons')for(const o of v.outcomeIds??[])if(!c.outcomes[o]?.lessonIds.includes(id))err('RECIPROCAL','Lesson/outcome mismatch',at);
    if(name==='outcomes'){
      if(!v.exerciseIds?.length||!v.evidenceRefs?.length||!v.action?.trim()||/^understand\b/i.test(v.action)||!v.conditions?.trim()||!v.successCriterion?.trim())err('OUTCOME','Observable outcome requires practice, evidence and criterion',at);
      for(const l of v.lessonIds??[])if(!c.lessons[l]?.outcomeIds.includes(id))err('RECIPROCAL','Outcome/lesson mismatch',at);
      for(const e of v.exerciseIds??[])if(!c.exercises[e]?.outcomeIds.includes(id))err('RECIPROCAL','Outcome/exercise mismatch',at);
    }
    if(name==='exercises')for(const o of v.outcomeIds??[])if(!c.outcomes[o]?.exerciseIds.includes(id))err('RECIPROCAL','Exercise/outcome mismatch',at);
    if(name==='coverage'){
      if(!c.units[id])err('REFERENCE','Coverage requires unit',at);
      if(v.disposition==='taught'){
        if(!v.lessonIds?.length||!v.outcomeIds?.length||!v.reviewId||c.units[id]?.status!=='verified')err('COVERAGE','Taught requires verified unit, lessons/outcomes/review',at);
        for(const lid of v.lessonIds??[])if(!c.lessons[lid]?.sourceUnitIds.includes(id))err('COVERAGE','Taught lesson does not cite covered unit',at);
        for(const oid of v.outcomeIds??[])if(!c.outcomes[oid]?.lessonIds.some(lid=>v.lessonIds.includes(lid)))err('COVERAGE','Coverage outcome not in taught lessons',at);
      }
      if(v.disposition==='excluded'&&(!v.reason?.trim()||!v.reviewId))err('COVERAGE','Exclusion requires reason/review',at);
    }
  }
  for(const id of Object.keys(c.units))if(!own(c.coverage,id))err('COVERAGE','Unit lacks disposition',id);
  const visiting=new Set(),done=new Set();
  const visit=(id,trail=[])=>{
    if(visiting.has(id)){
      err('DAG',`Prerequisite cycle: ${[...trail,id].join(' -> ')}`);
      return;
    }
    if(done.has(id))return;
    visiting.add(id);
    for(const p of (c.lessons[id]??c.concepts[id])?.prerequisiteIds??[])visit(p,[...trail,id]);
    visiting.delete(id);
    done.add(id);
  };
  for(const id of [...Object.keys(c.lessons),...Object.keys(c.concepts)])visit(id);
  for(const ref of refsIn(records))validateRefShape(ref,err);
  validateEdges(c.links,c,err,true);
  if(records.graph)validateGraph(records.graph,c,err);
  const sources=Object.values(c.sources),units=Object.values(c.units),pages=Object.values(c.pages);
  const accountingComplete=sources.length>0&&sources.every(s=>s.originalPath.endsWith('.pdf')?s.pageCount!==null&&Array.from({
    length:s.pageCount
  },(_,i)=>pages.some(p=>p.sourceId===s.id&&p.pdfPage===i+1)).every(Boolean):false);
  const conversionComplete=accountingComplete&&sources.every(s=>s.extractionStatus==='complete')&&pages.every(p=>p.status==='verified'&&p.unitIds.length>0)&&units.length>0&&units.every(u=>u.status==='verified');
  return {
    ok:errors.length===0,errors,readiness:{
      accountingComplete,conversionComplete,teachingComplete:false
    },counts:{
      sources:sources.length,pages:pages.length,knownPdfPages:sources.reduce((n,s)=>n+(s.pageCount??0),0),units:units.length,lessons:Object.keys(c.lessons).length,unknownUnits:units.filter(u=>u.classification==='unknown').length
    }
  };
}
export function validateRecords(records,options={}){
  try{
    return validateRecordsInternal(records,options);
  }catch(e){
    return {
      ok:false,errors:[{
        code:'SHAPE',message:`Malformed canonical records: ${e.message}`
      }],readiness:{
        accountingComplete:false,conversionComplete:false,teachingComplete:false
      },counts:{}
    };
  }
}
function checkObjectOptional(o,keys,at,err){
  if(!o||typeof o!=='object'||Array.isArray(o)){
    err('SHAPE','Expected object',at);
    return;
  }
  for(const k of Object.keys(o))if(!keys.includes(k))err('UNKNOWN_FIELD',`Unknown ${k}`,at);
}
function validateRefShape(r,err){
  if(!r||typeof r!=='object'||Array.isArray(r)){
    err('REFERENCE','Expected reference object');
    return;
  }
  const fields={
    record:['kind','path','id'],markdown:['kind','path','anchor'],source:['kind','unitId']
  };
  if(!fields[r.kind]){
    err('REFERENCE','Invalid reference kind');
    return;
  }checkObject(r,fields[r.kind],'reference',err);
  if(r.kind!=='source'&&!isSafePath(r.path))err('PATH','Unsafe reference path');
  if(r.kind==='markdown'&&(!/^[A-Za-z][A-Za-z0-9_:.-]*$/.test(r.anchor)))err('ANCHOR','Invalid anchor');
  if(r.kind==='record'&&!ID.test(r.id)||r.kind==='source'&&!ID.test(r.unitId))err('ID','Invalid reference ID');
}
function validateEdges(edges,c,err,nonderived=false,nodes=null){
  const seen=new Set();
  const types=id=>nodes?nodes[id]?.type:Object.keys(c).find(k=>['lessons','concepts','outcomes','units','sources','lectures'].includes(k)&&own(c[k],id))?.replace(/s$/,'');
  const allowed={
    contains:['source:unit','lecture:unit','lecture:lesson'],teaches:['lesson:outcome'],covers:['lesson:unit'],cites:['lesson:unit','outcome:unit','concept:unit'],uses:['outcome:concept'],requires:['lesson:lesson','lesson:concept','concept:lesson','concept:concept'],related:['lesson:lesson','lesson:concept','concept:lesson','concept:concept'],contradicts:['lesson:lesson','lesson:concept','concept:lesson','concept:concept'],exemplifies:['lesson:concept']
  };
  for(const e of Object.values(edges)){
    checkObject(e,schemas.links.split(' '),'edge',err);
    const key=`${e.from}:${e.to}:${e.type}`;
    if(seen.has(key))err('EDGE','Duplicate edge');
    seen.add(key);
    if(!allowed[e.type]?.includes(`${types(e.from)}:${types(e.to)}`)||nonderived&&!['related','contradicts','exemplifies'].includes(e.type)||!e.evidenceRefs?.length||!e.reason?.trim())err('EDGE','Invalid edge endpoints/type/evidence');
    if(e.type==='requires'&&!(c.lessons[e.from]??c.concepts[e.from])?.prerequisiteIds.includes(e.to))err('EDGE','Noncanonical prerequisite');
    if(e.type==='uses'&&!c.outcomes[e.from]?.conceptIds.includes(e.to))err('EDGE','Noncanonical concept use');
  }
}
function validateGraph(g,c,err){
  checkObject(g,['schemaVersion','inputDigest','generatedAt','nodes','edges'],'graph',err);
  if(g.schemaVersion!==1||!HASH.test(g.inputDigest)||!Array.isArray(g.nodes)||!Array.isArray(g.edges)){
    err('GRAPH','Invalid graph');
    return;
  }
  const nodes={};
  for(const n of g.nodes){
    checkObject(n,['id','type','title','ref','summary','tags','revision'],'node',err);
    if(own(nodes,n.id)||!ID.test(n.id)||!['source','unit','lecture','lesson','concept','outcome'].includes(n.type))err('GRAPH','Invalid/duplicate node');
    validateRefShape(n.ref,err);
    if(!Array.isArray(n.tags)||n.tags.some(t=>typeof t!=='string')||typeof n.title!=='string'||typeof n.summary!=='string'||!HASH.test(n.revision))err('GRAPH','Invalid node fields');
    nodes[n.id]=n;
  }validateEdges(g.edges,c,err,false,nodes);
}
export async function resolveReference(root,ref,records){
  return resolveCapturedReference(p=>readFileFromRoot(root,p),ref,records);
}
async function readFileFromRoot(root,p){return readFile(await confinedPath(root,p));}
export async function resolveCapturedReference(readBytes,ref,records){
  try{
    let errors=[];
    validateRefShape(ref,(code,message)=>errors.push({
      code,message
    }));
    if(errors.length)return {
      ok:false,error:errors[0].message
    };
    if(ref.kind==='source'){
      const unit=collections(records).units[ref.unitId];
      if(!unit)return {
        ok:false,error:'Unknown source unit'
      };
      return {
        ok:true,unit,source:collections(records).sources[unit.sourceId],available:unit.status==='verified'
      };
    }
    const bytes=await readBytes(ref.path);
    if(ref.kind==='record'){
      const json=JSON.parse(bytes);
      const matches=Object.values(json).filter(v=>v&&typeof v==='object'&&!Array.isArray(v)&&own(v,ref.id)).map(v=>v[ref.id]);
      if(matches.length!==1)return {
        ok:false,error:'Record selector must resolve uniquely'
      };
      return {
        ok:true,path:ref.path,bytes,record:matches[0]
      };
    }
    const text=decodeUtf8(bytes);
    const anchors=[...text.matchAll(/<(?:a|span|h[1-6])\b[^>]*\bid=["']([^"']+)["'][^>]*>/gi)].filter(m=>m[1]===ref.anchor);
    if(anchors.length!==1)return {
      ok:false,error:'Anchor must exist exactly once'
    };
    const start=anchors[0].index+anchors[0][0].length;
    const segment=text.slice(start).split(/<(?:a|span|h[1-6])\b[^>]*\bid=/i)[0].replace(/<[^>]*>/g,'').trim();
    if(!segment)return {
      ok:false,error:'Anchor content is empty'
    };
    return {
      ok:true,path:ref.path,bytes,anchor:ref.anchor
    };
  }catch(e){
    return {
      ok:false,error:e.message
    };
  }
}
export const projectFiles={
  manifest:'study/sources/manifest.json',units:'study/sources/units.json',coverage:'study/sources/coverage.json',curriculum:'study/curriculum.json',reviews:'study/reviews.json',exposureExceptions:'study/exposure-exceptions.json'
};
export async function validateProject(root,options={}){
  // One validation operation uses one byte snapshot per successfully read path.
  // A fresh confined byte comparison below detects drift; this is not publication capture.
  const cached=new Map();
  const result=await validateCapturedProject(async p=>{
    if(!cached.has(p))cached.set(p,await readFileFromRoot(root,p));
    return cached.get(p);
  },options);
  for(const [p,bytes] of cached){
    try{
      if(!bytes.equals(await readFileFromRoot(root,p)))throw Error('Validation input bytes changed');
    }catch{
      result.errors.push({code:'INPUT_CHANGED',message:'Validation input changed or is no longer confined/readable',path:p});
    }
  }
  if(result.errors.length){
    result.ok=false;
    result.readiness={accountingComplete:false,conversionComplete:false,teachingComplete:false};
  }
  return result;
}
export async function validateCapturedProject(readBytes,options={}){
  const records={};
  const loadErrors=[];
  for(const [key,file]of Object.entries(projectFiles)){
    try{
      records[key]=JSON.parse(await readBytes(file));
    }catch(e){
      loadErrors.push({
        code:'LOAD',message:e.message,path:file
      });
    }
  }
  let result;
  try{
    result=validateRecords(records,options);
  }catch(e){
    result={
      ok:false,errors:[{
        code:'SHAPE',message:e.message
      }],readiness:{
        accountingComplete:false,conversionComplete:false,teachingComplete:false
      },counts:{}
    };
  }result.errors.push(...loadErrors);
  const err=(code,message,p)=>result.errors.push({
    code,message,path:p
  });
  const c=collections(records);
  result.readiness.accountingComplete=Object.keys(c.sources).length>0&&Object.values(c.sources).every(s=>!s.originalPath?.endsWith('.pdf')||s.pageCount!==null&&Array.from({
    length:s.pageCount
  },(_,i)=>Object.values(c.pages).some(p=>p.sourceId===s.id&&p.pdfPage===i+1)).every(Boolean));
  for(const ref of refsIn(records)){
    const resolved=await resolveCapturedReference(readBytes,ref,records);
    if(!resolved.ok)err('REFERENCE',resolved.error,ref.path??ref.unitId);
  }
  for(const s of Object.values(c.sources)){
    try{
      const bytes=await readBytes(s.originalPath);
      if(sha256(bytes)!==s.sha256||bytes.length!==s.byteLength)err('ORIGINAL_HASH','Original bytes differ',s.originalPath);
      if(s.kind==='transcript'){
        // Physical separators match ingestion: CRLF, lone CR/LF, no invented final line.
        const count=decodeUtf8(bytes).match(/[^\r\n]*(?:\r\n|\n|\r|$)/g).filter((line,i,all)=>line!==''||i<all.length-1).length;
        const ranges=Object.values(c.units).filter(u=>u.sourceId===s.id).sort((a,b)=>a.locator.lineStart-b.locator.lineStart);
        let next=1;
        for(const u of ranges){
          if(u.locator.lineStart!==next||u.locator.lineEnd>count)err('LINE_ACCOUNTING','Overlap/gap/out-of-range transcript lines',u.id);
          next=u.locator.lineEnd+1;
        }
        if(next!==count+1)result.readiness.accountingComplete=false;
      }
    }catch(e){
      err('ORIGINAL_HASH',e.message,s.originalPath);
    }
  }
  result.readiness.conversionComplete=result.readiness.accountingComplete&&Object.values(c.sources).every(s=>s.extractionStatus==='complete')&&Object.values(c.pages).every(p=>p.status==='verified'&&p.unitIds.length>0)&&Object.keys(c.units).length>0&&Object.values(c.units).every(u=>u.status==='verified');
  for(const u of Object.values(c.units)){
    if(u.extractionRef&&u.contentHash){
      const r=await resolveCapturedReference(readBytes,u.extractionRef,records);
      if(r.ok&&sha256(r.bytes)!==u.contentHash)err('CONTENT_HASH','Extraction bytes changed',u.id);
    }
  }
  result.errors.push(...await validateSourceQA(readBytes,records));
  const currentReviews=new Set();
  for(const review of Object.values(c.reviews)){
    let current=review.verdict==='approved';
    for(const h of review.inputHashes??[]){
      try{
        if(sha256(await readBytes(h.path))!==h.sha256){
          current=false;
          err('STALE_REVIEW','Review input bytes changed',h.path);
        }
      }catch(e){
        current=false;
        err('REVIEW_HASH',e.message,h.path);
      }
    }
    const required=new Set();
    const visited=new Set();
    function requireUnit(id){
      const u=c.units[id],source=c.sources[u?.sourceId];
      if(!u||!source)return;
      required.add(projectFiles.units);
      required.add(projectFiles.manifest);
      required.add(source.originalPath);
      if(u.extractionRef)required.add(u.extractionRef.path);
    }
    const visitedRefs=new Set();
    function requireEvidence(ref){
      const marker=JSON.stringify(ref);if(visitedRefs.has(marker))return;visitedRefs.add(marker);
      if(ref.path)required.add(ref.path);
      if(ref.kind==='source'){requireUnit(ref.unitId);return;}
      if(ref.kind==='markdown'){
        for(const unit of Object.values(c.units))if(unit.extractionRef?.path===ref.path&&unit.extractionRef.anchor===ref.anchor)requireUnit(unit.id);
        for(const item of [...Object.values(c.lessons),...Object.values(c.concepts)])if(item.path===ref.path)requireTeaching(item.id);
        for(const exercise of Object.values(c.exercises))if([exercise.promptRef,exercise.answerRef].some(part=>part?.path===ref.path&&part.anchor===ref.anchor)){
          for(const evidence of exercise.evidenceRefs)requireEvidence(evidence);
        }
        return;
      }
      if(ref.kind!=='record')return;
      const root=Object.keys(projectFiles).find(name=>projectFiles[name]===ref.path);
      const matches=Object.values(records[root]??{}).filter(value=>value&&typeof value==='object'&&own(value,ref.id)).map(value=>value[ref.id]);
      if(matches.length!==1)return;
      const item=matches[0];
      if(c.units[item.id]===item)requireUnit(item.id);
      if(c.lectures[item.id]===item)for(const unit of Object.values(c.units))if(unit.sourceId===item.sourceId)requireUnit(unit.id);
      if(c.sources[item.id]===item)for(const unit of Object.values(c.units))if(unit.sourceId===item.id)requireUnit(unit.id);
      if(c.lessons[item.id]===item||c.concepts[item.id]===item)requireTeaching(item.id);
      if(c.links[item.id]===item)requireLink(item);
      for(const id of item.sourceUnitIds??[])requireUnit(id);
      for(const id of item.lessonIds??[])requireTeaching(id);
      for(const id of item.outcomeIds??[])requireEvidence({kind:'record',path:projectFiles.curriculum,id});
      for(const evidence of item.evidenceRefs??[])requireEvidence(evidence);
      for(const id of item.conceptIds??[])requireTeaching(id);
      for(const id of item.exerciseIds??[]){const exercise=c.exercises[id];if(exercise){requireEvidence(exercise.promptRef);requireEvidence(exercise.answerRef);for(const evidence of exercise.evidenceRefs)requireEvidence(evidence);}}
    }
    function requireLink(link){
      const marker='link:'+link.id;if(visited.has(marker))return;visited.add(marker);
      required.add(projectFiles.curriculum);
      requireTeaching(link.from);requireTeaching(link.to);
      for(const ref of link.evidenceRefs??[])requireEvidence(ref);
    }
    function requireTeaching(id){
      if(visited.has(id))return;
      visited.add(id);
      const item=c.lessons[id]??c.concepts[id];
      if(!item)return;
      required.add(projectFiles.curriculum);
      required.add(projectFiles.coverage);
      required.add(item.path);
      for(const uid of item.sourceUnitIds??[])requireUnit(uid);
      for(const ref of item.evidenceRefs??[])requireEvidence(ref);
      for(const dep of [...item.conceptIds??[],...item.prerequisiteIds??[]])requireTeaching(dep);
      for(const oid of item.outcomeIds??[]){
        const o=c.outcomes[oid];
        for(const ref of o?.evidenceRefs??[])requireEvidence(ref);
        for(const id of o?.conceptIds??[])requireTeaching(id);
        for(const eid of o?.exerciseIds??[]){
          const e=c.exercises[eid];
          if(e?.promptRef)required.add(e.promptRef.path);
          if(e?.answerRef)required.add(e.answerRef.path);
          for(const ref of e?.evidenceRefs??[])requireEvidence(ref);
        }
      }
    }
    for(const ref of review.subjectRefs??[]){
      // Markdown is a valid subject selector, but cannot bypass canonical provenance.
      // A shared teaching file conservatively binds every canonical item in that file.
      if(ref.kind==='markdown'){
        for(const item of [...Object.values(c.lessons),...Object.values(c.concepts)]){
          if(item.path===ref.path)requireTeaching(item.id);
        }
      }
      if(ref.kind==='record'){
        if(ref.path===projectFiles.curriculum){requireTeaching(ref.id);if(c.links[ref.id])requireLink(c.links[ref.id]);}
        if(ref.path===projectFiles.coverage&&c.coverage[ref.id]){
          required.add(projectFiles.coverage);
          requireUnit(ref.id);
          for(const lid of c.coverage[ref.id].lessonIds)requireTeaching(lid);
        }
      }
      if(ref.path)required.add(ref.path);
      if(ref.kind==='source')requireUnit(ref.unitId);
    }
    for(const p of [...required])if(p.endsWith('.md')){
      try{for(const asset of markdownAssets(await readBytes(p),p))required.add(asset.target);}
      catch(error){current=false;err('REVIEW_ASSET',error.message,p);}
    }
    for(const p of required)if(!review.inputHashes?.some(h=>h.path===p)){
      current=false;
      err('REVIEW_HASH','Subject bytes missing from review hash set',p);
    }
    if(current)currentReviews.add(review.id);
  }
  for(const item of [...Object.values(c.lessons),...Object.values(c.concepts),...Object.values(c.coverage),...Object.values(c.links)])if(item.reviewId){
    const id=item.id??item.unitId;
    const review=c.reviews[item.reviewId];
    if(!review?.subjectRefs.some(ref=>ref.kind==='record'&&ref.path===(c.coverage[id]===item?projectFiles.coverage:projectFiles.curriculum)&&ref.id===id||ref.kind==='markdown'&&ref.path===item.path))err('REVIEW_BINDING','Review does not bind subject',id);
    else if(review.verdict!=='approved')err('REVIEW_REJECTED','Subject review requests changes',id);
    else if(!currentReviews.has(item.reviewId))err('STALE_REVIEW','Subject review is not current',id);
  }
  for(const e of Object.values(c.exceptions)){
    try{
      if(await exposureDigestCaptured(readBytes,e,records)!==e.inputDigest)err('EXCEPTION_DIGEST','Exposure scope/input/output bytes changed',e.id);
    }catch(error){
      err('EXCEPTION',error.message,e.id);
    }
  }
  if(options.contextBudget!==false){
    let total=0;
    for(const f of ['CONTEXT.md','CLAUDE.md','study/contracts/AGENTS.md'])try{
      total+=(await readBytes(f)).length;
    }catch{}try{
      const text=(await readBytes('AGENTS.md')).toString('utf8');
      const marker=text.match(/<!-- FD:STUDY:START -->([\s\S]*?)<!-- FD:STUDY:END -->/);
      if(marker)total+=Buffer.byteLength(marker[0])+(text.slice(marker.index+marker[0].length).startsWith('\r\n')?2:text.slice(marker.index+marker[0].length).startsWith('\n')?1:0);
    }catch{}result.counts.contextBytes=total;
    if(total>12*1024)err('CONTEXT_BUDGET','Study entrypoint bundle exceeds 12 KiB','CONTEXT.md');
  }
  const lectureUnits=Object.values(c.units).filter(u=>c.sources[u.sourceId]?.kind==='lecture');
  const lectures=Object.values(c.lectures);
  result.readiness.teachingComplete=lectures.length===4&&Object.values(c.sources).filter(s=>s.kind==='lecture').every(s=>s.pageCount!==null&&Array.from({
    length:s.pageCount
  },(_,i)=>Object.values(c.pages).some(p=>p.sourceId===s.id&&p.pdfPage===i+1&&p.status==='verified'&&p.unitIds.length>0)).every(Boolean))&&lectureUnits.length>0&&lectureUnits.every(u=>u.status==='verified'&&u.classification!=='unknown'&&(u.classification!=='substantive'||['taught','excluded'].includes(c.coverage[u.id]?.disposition)&&currentReviews.has(c.coverage[u.id]?.reviewId)))&&Object.values(c.lessons).length>0&&Object.values(c.lessons).every(l=>currentReviews.has(l.reviewId))&&Object.values(c.pages).filter(p=>c.sources[p.sourceId]?.kind==='lecture').every(p=>p.status==='verified'&&p.unitIds.length>0);
  result.ok=result.errors.length===0;
  if(!result.ok)result.readiness={
    accountingComplete:false,conversionComplete:false,teachingComplete:false
  };
  return result;
}
// Channel and span selection are part of the digest; changing policy or output bytes needs new approval.
export async function exposureDigest(root,exception,records){
  return exposureDigestCaptured(p=>readFileFromRoot(root,p),exception,records);
}
export async function exposureDigestCaptured(readBytes,exception,records){
  const c=collections(records),source=c.sources[exception.sourceId];
  if(!source)throw Error('Unknown exception source');
  const sourceHash=sha256(await readBytes(source.originalPath));
  const units=exception.unitIds.map(id=>{
    const u=c.units[id];
    if(!u||u.sourceId!==source.id)throw Error('Invalid exception source unit');
    return u;
  });
  const outputs=[];
  for(const ref of exception.outputRefs){
    const resolved=await resolveCapturedReference(readBytes,ref,records);
    if(!resolved.ok||!resolved.bytes)throw Error('Exception output must resolve to exact file bytes');
    outputs.push({
      ref,sha256:sha256(resolved.bytes)
    });
  }
  return sha256(JSON.stringify({
    sourceId:source.id,sourceHash,units,outputs,channels:[...exception.channels].sort()
  }));
}
