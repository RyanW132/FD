import path from 'node:path';
import { markdownAssets, decodeUtf8 } from './assets.mjs';
import { sourceQARevision } from './source-qa.mjs';
import { sha256, isPrivatePath, resolveCapturedReference, exposureDigestCaptured, projectFiles, validateCapturedProject } from './contracts.mjs';
const key=ref=>JSON.stringify(ref);
export const isDraftFreshnessError=error=>error.code==='REVIEW_REJECTED'||error.code==='STALE_REVIEW'&&['Review input bytes changed','Subject review is not current'].includes(error.message);
export function anchoredBytes(bytes,anchor){
  const text=decodeUtf8(bytes),matches=[...text.matchAll(/<(?:a|span|h[1-6])\b[^>]*\bid=["']([^"']+)["'][^>]*>/gi)];
  const i=matches.findIndex(m=>m[1]===anchor);if(i<0)throw Error('Missing anchor');
  const end=matches[i+1]?.index??text.length;
  return Buffer.from(text.slice(matches[i].index,end));
}
export async function selectPublication(capture,{channel='browser',draft=false}={}){
  if(!['browser','agent','export'].includes(channel))throw Error('Unknown channel');
  const validation=await validateCapturedProject(capture.readBytes);
  const metadataValidated=!validation.errors.some(e=>!(draft&&isDraftFreshnessError(e)));
  const r=capture.records,c={};for(const root of Object.values(r))for(const [name,value]of Object.entries(root))if(name!=='schemaVersion')c[name]=value;
  const candidates=[];
  for(const u of Object.values(c.units??{}))if(u.extractionRef)candidates.push({id:u.id,type:'unit',title:'Source evidence',ref:u.extractionRef,owner:u});
  for(const type of ['lessons','concepts'])for(const item of Object.values(c[type]??{}))candidates.push({id:item.id,type:type.slice(0,-1),title:item.title,ref:{kind:'file',path:item.path},owner:item});
  for(const e of Object.values(c.exercises??{}))for(const part of ['promptRef','answerRef'])candidates.push({id:e.id+'-'+part,type:'exercise',title:part==='promptRef'?'Exercise':'Answer',ref:e[part],owner:e});
  function record(ref){
    const root=Object.keys(projectFiles).find(k=>projectFiles[k]===ref.path);
    const matches=Object.values(r[root]??{}).filter(v=>v&&typeof v==='object'&&Object.hasOwn(v,ref.id)).map(v=>v[ref.id]);
    return matches.length===1?matches[0]:undefined;
  }
  const assetOwners=new Map(),ownerAssets=new Map();
  function privateOrigin(item){return !!item&&(isPrivatePath(item.path)||isPrivatePath(item.extractionRef?.path)||isPrivatePath(item.promptRef?.path)||isPrivatePath(item.answerRef?.path)||(item.evidenceRefs??[]).some(ref=>isPrivatePath(ref.path))||[...ownerAssets.get(item)??[]].some(isPrivatePath));}
  function lineage(item,seen=new Set()){
    if(!item||seen.has(item))return {units:new Set(),unknown:!item,private:privateOrigin(item)};seen.add(item);
    const out={units:new Set(),unknown:false,private:privateOrigin(item)};
    function merge(x){for(const id of x.units)out.units.add(id);out.unknown ||= x.unknown;out.private ||= x.private;}
    function addUnit(id){
      const unit=c.units?.[id];if(!unit){out.unknown=true;return;}
      const peers=Object.values(c.units).filter(other=>other.id===id||unit.extractionRef&&other.extractionRef?.path===unit.extractionRef.path&&other.extractionRef?.anchor===unit.extractionRef.anchor);
      for(const peer of peers){out.units.add(peer.id);if(peer.status!=='verified'||peer.classification==='unknown')out.unknown=true;if(peer!==item)merge(lineage(peer,seen));}
      if(unit.extractionRef)for(const owner of candidates.filter(candidate=>candidate.ref.kind==='file'&&candidate.ref.path===unit.extractionRef.path))merge(lineage(owner.owner,seen));
    }
    if(item.sourceId&&c.units?.[item.id]===item)addUnit(item.id);
    if(c.sources?.[item.id]===item||item.sourceId&&c.lectures?.[item.id]===item){
      const sourceId=c.sources?.[item.id]===item?item.id:item.sourceId;
      const units=Object.values(c.units??{}).filter(unit=>unit.sourceId===sourceId);
      if(!units.length)out.unknown=true;for(const unit of units)addUnit(unit.id);
    }
    for(const id of item.sourceUnitIds??[]){if(c.units?.[id])addUnit(id);else out.unknown=true;}
    for(const [field,collection]of [['conceptIds',c.concepts],['outcomeIds',c.outcomes],['exerciseIds',c.exercises],['lessonIds',c.lessons]])for(const id of item[field]??[])merge(lineage(collection?.[id],seen));
    for(const id of item.prerequisiteIds??[]){const matches=[c.lessons?.[id],c.concepts?.[id]].filter(Boolean);if(matches.length!==1)out.unknown=true;else merge(lineage(matches[0],seen));}
    for(const ref of item.evidenceRefs??[]){
      if(ref.kind==='source'){if(c.units?.[ref.unitId])addUnit(ref.unitId);else out.unknown=true;}
      else if(ref.kind==='record')merge(lineage(record(ref),seen));
      else if(ref.kind==='markdown'){
        const owners=candidates.filter(x=>x.ref.path===ref.path&&(!x.ref.anchor||x.ref.anchor===ref.anchor));
        if(!owners.length)out.unknown=true;for(const o of owners)merge(lineage(o.owner,seen));
      }
    }
    for(const target of ownerAssets.get(item)??[])for(const contributor of assetOwners.get(target)??[])merge(lineage(contributor.owner,seen));
    if(out.units.size===0&&!(item.sourceUnitIds?.length||item.prerequisiteIds?.length||item.conceptIds?.length||item.outcomeIds?.length||item.exerciseIds?.length||item.lessonIds?.length||item.evidenceRefs?.length))out.unknown=true;
    return out;
  }
  for(const candidate of candidates){
    const raw=await capture.readBytes(candidate.ref.path);
    const selected=candidate.ref.kind==='markdown'?anchoredBytes(raw,candidate.ref.anchor):raw;
    for(const asset of markdownAssets(selected,candidate.ref.path)){
      // Public asset spellings must resolve for every owner, even denied ones.
      // Private images may be uncaptured and are always denied below.
      if(!isPrivatePath(asset.target))await capture.readBytes(asset.target);
      const owners=assetOwners.get(asset.target)??[];owners.push(candidate);assetOwners.set(asset.target,owners);
      const assets=ownerAssets.get(candidate.owner)??new Set();assets.add(asset.target);ownerAssets.set(candidate.owner,assets);
    }
  }
  const validExceptions=[];
  for(const exception of Object.values(c.exceptions??{}))if(exception.channels.includes(channel)&&await exposureDigestCaptured(capture.readBytes,exception,r)===exception.inputDigest)validExceptions.push(exception);
    function permitted(dependencies,ref){
      let allowed=!dependencies.unknown&&dependencies.units.size>0;
      for(const id of dependencies.units){
        const unit=c.units[id],source=c.sources?.[unit?.sourceId];
        if(!source||source.access!=='permitted'){allowed=false;continue;}
        if((source.exposure[channel]!=='allow'||dependencies.private||isPrivatePath(unit.extractionRef?.path)||isPrivatePath(ref.path))&&!validExceptions.some(e=>e.sourceId===source.id&&e.unitIds.includes(id)&&e.outputRefs.some(output=>key(output)===key(ref))))allowed=false;
      }
      return allowed;
    }
  const items=[],payloads=new Map(),selectedOwners=new Map(),selectedAssets=new Map();let omitted=0;
  for(const candidate of candidates){
    const dependencies=lineage(candidate.owner);
    // Whole-file teaching also inherits every sibling owner: a span exception cannot unlock siblings.
    for(const other of candidates.filter(x=>x.ref.path===candidate.ref.path&&(candidate.ref.kind==='file'||x.ref.kind==='file'||x.ref.anchor===candidate.ref.anchor))){const more=lineage(other.owner);for(const id of more.units)dependencies.units.add(id);dependencies.unknown ||= more.unknown;dependencies.private ||= more.private;}
    let allowed=permitted(dependencies,candidate.ref);
    const raw=await capture.readBytes(candidate.ref.path);
    const selectedBytes=candidate.ref.kind==='markdown'?anchoredBytes(raw,candidate.ref.anchor):raw;
    for(const asset of markdownAssets(selectedBytes,candidate.ref.path)){
      const contributors=assetOwners.get(asset.target)??[];
      // Every referring owner contributes provenance; review closure separately binds asset bytes.
      const provenance={units:new Set(),unknown:contributors.length===0,private:isPrivatePath(asset.target)};
      for(const contributor of contributors){const more=lineage(contributor.owner);for(const id of more.units)provenance.units.add(id);provenance.unknown ||= more.unknown;provenance.private ||= more.private;}
      if(isPrivatePath(asset.target)||!permitted(provenance,{kind:'asset',path:asset.target}))allowed=false;
    }
    if(!allowed){omitted++;continue;}
    let bytes=await capture.readBytes(candidate.ref.path);
    if(candidate.ref.kind==='markdown'){const checked=await resolveCapturedReference(capture.readBytes,candidate.ref,r);if(!checked.ok)throw Error('Invalid output selector');bytes=anchoredBytes(bytes,candidate.ref.anchor);}
    const text=decodeUtf8(bytes);
    let rendered=text;const bindings=new Map();
    for(const image of markdownAssets(bytes,candidate.ref.path)){
      const asset=await capture.readBytes(image.target),assetOutput='assets/'+sha256(asset)+path.posix.extname(image.target).toLowerCase();
      bindings.set(image.target,assetOutput);
      payloads.set(assetOutput,asset);rendered=rendered.replace(image.token,image.token.replace(image.url,'../'+assetOutput));
    }
    bytes=Buffer.from(rendered);
    const output='content/'+sha256(Buffer.from(key(candidate.ref)))+'.md';payloads.set(output,bytes);
    selectedOwners.set(candidate.id,candidate);selectedAssets.set(candidate.id,bindings);
    items.push({id:candidate.id,type:candidate.type,title:candidate.title,ref:candidate.type==='unit'?{kind:'source',unitId:candidate.id}:candidate.ref.kind==='file'?{kind:'record',path:projectFiles.curriculum,id:candidate.id}:candidate.ref,output,sha256:sha256(bytes),draft});
  }
  // Metadata is a policy projection too: never pass canonical collections downstream.
  const nodes=[],edges=[];
  const nodeKey=(type,id)=>type==='source'?'source:'+id:id;
  const admitted=new Map(items.map(item=>[item.id,item]));
  const metadata=new Map();
  for(const [collection,type]of [['sources','source'],['units','unit'],['lectures','lecture'],['lessons','lesson'],['concepts','concept'],['outcomes','outcome']]){
    for(const owner of metadataValidated?Object.values(c[collection]??{}):[]){
      const ref=type==='unit'?{kind:'source',unitId:owner.id}:{kind:'record',path:type==='source'?projectFiles.manifest:projectFiles.curriculum,id:owner.id};
      const content=items.find(item=>item.id===owner.id&&item.type===type);
      // Content nodes inherit the exact span/file decision, including scoped exceptions.
      let allowed=['unit','lesson','concept'].includes(type)?!!content:permitted(lineage(owner),ref);
      if(type==='outcome'&&!(owner.lessonIds??[]).every(id=>admitted.has(id)))allowed=false;
      if(!allowed)continue;
      const id=nodeKey(type,owner.id);
      if(metadata.has(id))throw Error('Graph ID collision');
      const safe={id,type,title:owner.title??(type==='source'?'Source evidence':type==='unit'?'Source unit':owner.action??'Learning outcome'),ref,
        summary:'',tags:[],revision:sha256(Buffer.from(JSON.stringify(owner)))};
      if(type==='unit'){safe.locator=structuredClone(owner.locator);safe.status=owner.status;}
      metadata.set(id,{safe,owner,type});nodes.push(safe);
    }
  }
  function evidenceUnits(ref){
    if(ref.kind==='source')return new Set([ref.unitId]);
    const owners=ref.kind==='record'?[record(ref)].filter(Boolean):candidates.filter(candidate=>candidate.ref.path===ref.path&&(!candidate.ref.anchor||candidate.ref.anchor===ref.anchor)).map(candidate=>candidate.owner);
    const result=new Set();
    // Reuse the same canonical dependency closure that admitted the evidence,
    // including lecture/source records, outcome concepts and prerequisites.
    for(const owner of owners)for(const id of lineage(owner).units)result.add(id);
    return result;
  }
  function add(type,from,to,evidenceRefs,basis='source',reason='Derived from canonical records',reviewId=null){
    if(!metadata.has(from)||!metadata.has(to))return;
    const id='edge:'+sha256(Buffer.from(JSON.stringify([type,from,to])));
    if(edges.some(e=>e.id===id))return;
    edges.push({id,from,to,type,evidenceRefs,basis,reason,reviewId});
  }
  for(const {safe:n,owner:o,type}of metadata.values()){
    const ev=[n.ref];
    if(type==='unit')add('contains',nodeKey('source',o.sourceId),n.id,ev);
    if(type==='lecture'){
      for(const {safe:u,owner}of metadata.values())if(u.type==='unit'&&owner.sourceId===o.sourceId)add('contains',n.id,u.id,[u.ref]);
      for(const id of o.lessonIds)add('contains',n.id,id,ev);
    }
    if(type==='lesson'){
      for(const id of o.outcomeIds)add('teaches',n.id,id,ev);
      for(const id of o.sourceUnitIds){add('covers',n.id,id,ev);add('cites',n.id,id,ev);}
    }
    if(type==='outcome')for(const id of o.conceptIds)add('uses',n.id,id,ev);
    if(['outcome','concept'].includes(type))for(const ref of o.evidenceRefs??[])for(const unitId of evidenceUnits(ref)){
      if(metadata.get(unitId)?.type==='unit')add('cites',n.id,unitId,[{kind:'source',unitId}]);
    }
    if(['lesson','concept'].includes(type))for(const id of o.prerequisiteIds)add('requires',n.id,id,ev,'pedagogical','Canonical prerequisite',o.reviewId);
  }
  for(const link of Object.values(c.links??{})){
    if(draft&&validation.errors.length)continue; // A downgraded review is never a current reviewed relationship.
    const review=c.reviews?.[link.reviewId];
    if(!review||review.verdict!=='approved'||!review.subjectRefs.some(ref=>ref.kind==='record'&&ref.path===projectFiles.curriculum&&ref.id===link.id)||!permitted(lineage(link),{kind:'record',path:projectFiles.curriculum,id:link.id}))continue;
    // Evidence references must themselves name admitted records/units. No denied filenames leak.
    if(!link.evidenceRefs.every(ref=>ref.kind==='source'?metadata.has(ref.unitId):ref.kind==='record'?[...metadata.values()].some(n=>key(n.safe.ref)===key(ref)):items.some(item=>key(item.ref)===key(ref))))continue;
    add(link.type,link.from,link.to,structuredClone(link.evidenceRefs),link.basis,link.reason,link.reviewId);
  }
  nodes.sort((a,b)=>a.id.localeCompare(b.id));edges.sort((a,b)=>a.id.localeCompare(b.id));
  // Legacy policy-only adapters have no parent digest; do not invent one or
  // make their standalone CLI load browser dependencies.
  const reader=channel==='browser'&&metadataValidated&&capture.digest!==undefined?await projectReader():undefined;
  return {items,payloads,omitted,draft,inputDigest:capture.digest,metadata:{nodes,edges},...(reader?{reader}:{}),readAllowed:async p=>{if(!payloads.has(p))throw Error('Not an allowed output');return Buffer.from(payloads.get(p));}};

  async function projectReader(){
    const {readerDocumentTokens,validateReader}=await import('./reader.mjs');
    const compare=(a,b)=>a<b?-1:a>b?1:0;
    const ordered=values=>[...values].sort((a,b)=>compare(a.id,b.id));
    const sorted=values=>[...new Set(values)].sort(compare);
    const tokens=new Map(items.map(item=>[item.id,readerDocumentTokens(payloads.get(item.output))]));
    const documents=ordered(items).map(item=>({id:item.id,anchors:tokens.get(item.id).anchors,links:[]}));
    const documentsById=new Map(documents.map(doc=>[doc.id,doc]));
    const selectedCandidates=[...selectedOwners.values()];
    // Only a validated, revision-bound QA draft identifies a normalized page.
    // These paths and positions never leave this selected-policy stage.
    const normalized=new Map();
    for(const sourceId of new Set(selectedCandidates.filter(x=>x.type==='unit').map(x=>x.owner.sourceId))){
      const source=c.sources[sourceId];
      let reviewBytes,reportBytes,review,qa;
      try{
        reviewBytes=await capture.readBytes(`study/sources/qa-reviews/${sourceId}.json`);
        reportBytes=await capture.readBytes(`study/sources/extracted/${sourceId}/ingestion.json`);
        review=JSON.parse(reviewBytes);qa=JSON.parse(await capture.readBytes(review.draftPath));
      }catch{continue;}
      if(source.derivedRevision!==sourceQARevision(source.sha256,reportBytes,reviewBytes)||review.verdict!=='approved')continue;
      for(const page of qa.pages){
        const approval=review.pages.find(entry=>entry.pdfPage===page.pdfPage);
        if(!approval||approval.verdict!=='approved')continue;
        const aliases=selectedCandidates.filter(x=>x.type==='unit'&&x.owner.sourceId===sourceId&&x.ref.path===page.normalizedPath&&approval.unitIds.includes(x.id));
        if(!aliases.length)continue;
        const raw=decodeUtf8(await capture.readBytes(page.normalizedPath));
        const positions=new Map([...raw.matchAll(/<(?:a|span|h[1-6])\b[^>]*\bid=["']([^"']+)["'][^>]*>/gi)].map(match=>[match[1],match.index]));
        const spans=new Map();
        for(const candidate of aliases){
          if(!positions.has(candidate.ref.anchor))continue;
          const span=spans.get(candidate.ref.anchor)??[];span.push(candidate.id);spans.set(candidate.ref.anchor,span);
        }
        const groups=[...spans].sort(([a],[b])=>positions.get(a)-positions.get(b)).map(([,ids])=>{const unitIds=sorted(ids);return {documentId:unitIds[0],unitIds};});
        if(groups.length)normalized.set(page.normalizedPath,groups);
      }
    }
    function destination(href,ownerPath){
      if(typeof href!=='string'||!href||/[\\\0%?:]/.test(href)||href.startsWith('/')||href.split('#').length>2)return null;
      const [file,anchor]=href.split('#');
      if(anchor!==undefined&&!anchor)return null;
      const target=file?path.posix.normalize(path.posix.join(path.posix.dirname(ownerPath),file)):ownerPath;
      if(!target.startsWith('study/')||isPrivatePath(target))return null;
      return {path:target,anchor};
    }
    function rasterBinding(candidate,target){
      if(isPrivatePath(target)||!/\.(?:png|jpe?g|webp)$/i.test(target))return null;
      const dependencies=lineage(candidate.owner);
      const grounding=selectedCandidates.filter(owner=>owner.id===candidate.id||owner.type==='unit'&&dependencies.units.has(owner.id));
      const member=grounding.map(owner=>selectedAssets.get(owner.id)?.get(target)).find(Boolean);
      if(!member||!payloads.has(member))return null;
      const contributors=assetOwners.get(target)??[];
      const provenance={units:new Set(),unknown:!contributors.length,private:false};
      for(const contributor of contributors){const more=lineage(contributor.owner);for(const id of more.units)provenance.units.add(id);provenance.unknown ||= more.unknown;provenance.private ||= more.private;}
      return permitted(provenance,{kind:'asset',path:target})?member:null;
    }
    for(const document of documents){
      const candidate=selectedOwners.get(document.id);
      for(const href of tokens.get(document.id).hrefs){
        let target;
        // Published inline images were already approved for this exact owner.
        const rewritten=[...selectedAssets.get(candidate.id).values()].find(member=>href==='../'+member);
        if(rewritten)target={kind:'asset',member:rewritten};
        else{
          const resolved=destination(href,candidate.ref.path);if(!resolved)continue;
          if(resolved.anchor===undefined){
            const raster=rasterBinding(candidate,resolved.path);
            if(raster)target={kind:'asset',member:raster};
            else if(normalized.has(resolved.path))target={kind:'page',groups:structuredClone(normalized.get(resolved.path))};
            else{
              const whole=ordered(selectedCandidates.filter(x=>x.ref.path===resolved.path&&x.ref.kind==='file'&&['lesson','concept'].includes(x.type)))[0];
              if(whole)target={kind:'document',documentId:whole.id,anchor:null};
            }
          }else{
            const matches=ordered(selectedCandidates.filter(x=>x.ref.path===resolved.path&&documentsById.get(x.id).anchors.includes(resolved.anchor)));
            // Fragment-only links share the captured original owner path, not
            // necessarily the same selected chunk. Prefer self among span aliases.
            const selected=(href.startsWith('#')&&matches.find(x=>x.id===candidate.id))||matches[0];
            if(selected)target={kind:'document',documentId:selected.id,anchor:resolved.anchor};
          }
        }
        if(target)document.links.push({ownerId:document.id,href,target});
      }
    }
    const lessons=ordered(Object.values(c.lessons).filter(item=>admitted.get(item.id)?.type==='lesson'));
    const concepts=ordered(Object.values(c.concepts).filter(item=>admitted.get(item.id)?.type==='concept')).map(({id,order})=>({id,order}));
    const outcomes=ordered(Object.values(c.outcomes).filter(item=>metadata.get(item.id)?.type==='outcome'&&item.lessonIds.some(id=>lessons.some(lesson=>lesson.id===id))));
    const outcomeIds=new Set(outcomes.map(item=>item.id));
    const exercises=[];
    for(const exercise of ordered(Object.values(c.exercises))){
      const prompt=selectedCandidates.find(item=>item.owner===exercise&&item.ref===exercise.promptRef);
      const answer=selectedCandidates.find(item=>item.owner===exercise&&item.ref===exercise.answerRef);
      if(!prompt||!answer||!exercise.outcomeIds.length||!exercise.outcomeIds.every(id=>outcomeIds.has(id)))continue;
      exercises.push({id:exercise.id,outcomeIds:sorted(exercise.outcomeIds),promptDocumentId:prompt.id,answerDocumentId:answer.id,origin:exercise.origin});
    }
    const exerciseIds=new Set(exercises.map(item=>item.id));
    const projectedOutcomes=outcomes.map(({id,action,conditions,successCriterion,exerciseIds:ids})=>({id,action,conditions,successCriterion,exerciseIds:sorted(ids.filter(id=>exerciseIds.has(id)))}));
    const projectedLessons=lessons.map(({id,order,outcomeIds:ids})=>{
      const selectedOutcomes=sorted(ids.filter(id=>outcomeIds.has(id)));
      return {id,order,outcomeIds:selectedOutcomes,exerciseIds:sorted(projectedOutcomes.filter(item=>selectedOutcomes.includes(item.id)).flatMap(item=>item.exerciseIds))};
    });
    const result={schemaVersion:1,inputDigest:capture.digest,draft,documents,lessons:projectedLessons,concepts,outcomes:projectedOutcomes,exercises};
    const catalog={schemaVersion:1,inputDigest:capture.digest,draft,items:items.map(item=>{const unit=metadata.get(item.id);return unit?.type==='unit'?{...item,locator:unit.safe.locator,status:unit.safe.status}:item;})};
    validateReader(result,{catalog,inputDigest:capture.digest,draft,files:payloads});
    return result;
  }

}
