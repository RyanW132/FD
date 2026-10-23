import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
const hash=b=>createHash('sha256').update(b).digest('hex');
export function sourceQARevision(sourceHash,reportBytes,reviewBytes){return hash(JSON.stringify({sourceHash,rawReportHash:hash(reportBytes),independentReviewMapHash:hash(reviewBytes)}));}
// Cooperative freshness binding, never authentication of the named reviewer.
// Only the captured reader is used: no fallback to live filesystem state.
export async function validateSourceQA(readBytes,records){
  const errors=[];
  for(const source of Object.values(records.manifest?.sources??{})){
    const all=Object.values(records.units?.units??{}).filter(u=>u.sourceId===source.id);
    // Source-scoped private evidence may also be a selected, independently governed
    // exception. The ingester owns extracted/, not every private derivative path.
    const needsBinding=all.some(u=>u.status==='verified'&&(source.tool?.name==='poppler/local-utf8-ingestion'||/^study\/sources\/(?:annotated|extracted)\//.test(u.extractionRef?.path??'')||u.extractionRef?.path?.startsWith(`study/private/${source.id}/extracted/`)));
    if(!needsBinding)continue;
    try{
      if(source.kind==='textbook'||source.exposure.agent!=='allow')throw Error('Restricted source lacks independent semantic QA');
      const reviewPath=`study/sources/qa-reviews/${source.id}.json`,reportPath=`study/sources/extracted/${source.id}/ingestion.json`;
      const reviewBytes=await readBytes(reviewPath),reportBytes=await readBytes(reportPath),review=JSON.parse(reviewBytes),report=JSON.parse(reportBytes);
      if(source.derivedRevision!==sourceQARevision(source.sha256,reportBytes,reviewBytes)||report.sourceHash!==source.sha256)throw Error('Source QA revision is stale');
      if(review.schemaVersion!==1||review.sourceId!==source.id||review.sourceHash!==source.sha256||review.verdict!=='approved'||!review.reviewer?.trim()||!Number.isFinite(Date.parse(review.reviewedAt))||!Array.isArray(review.pages))throw Error('Invalid source approval map');
      const draftPath=`study/sources/qa-drafts/${source.id}.json`;
      if(review.draftPath!==draftPath)throw Error('Unexpected source draft path');
      const draftBytes=await readBytes(draftPath);if(hash(draftBytes)!==review.draftHash)throw Error('Source QA draft changed');
      const draft=JSON.parse(draftBytes);
      if(draft.sourceId!==source.id||draft.sourceHash!==source.sha256||!draft.author?.trim()||draft.author===review.reviewer||!Array.isArray(draft.pages))throw Error('Invalid separate author/reviewer audit evidence');
      const reviewed=new Set();
      for(const approval of review.pages){
        if(reviewed.has(approval.pdfPage)||approval.verdict!=='approved'||approval.allRegionsAccounted!==true)throw Error('Incomplete page region review');reviewed.add(approval.pdfPage);
        const matches=draft.pages.filter(p=>p.pdfPage===approval.pdfPage);if(matches.length!==1)throw Error('Ambiguous reviewed page');const page=matches[0];
        const num=String(page.pdfPage).padStart(3,'0');
        if(page.rawPath!==`study/sources/extracted/${source.id}/page-${num}.md`||page.imagePath!==`study/sources/assets/${source.id}/page-${num}.png`||page.normalizedPath!==`study/sources/annotated/${source.id}/page-${num}.md`)throw Error('Unexpected reviewed evidence path');
        for(const [p,h]of [['rawPath','rawHash'],['imagePath','imageHash'],['normalizedPath','normalizedHash']])if(page[h]!==approval[h]||hash(await readBytes(page[p]))!==page[h])throw Error('Reviewed source evidence changed');
        const current=records.units.pages[`${source.id}:${page.pdfPage}`];
        if(!current||current.status!=='verified'||!isDeepStrictEqual(current.issueIds,(page.issues??[]).map(i=>i.id))||!Array.isArray(page.units)||!page.units.length||!isDeepStrictEqual(current.unitIds,approval.unitIds)||!isDeepStrictEqual(page.units.map(u=>u.id),approval.unitIds))throw Error('Approved page unit selection changed');
        const actual=all.filter(u=>u.locator.pdfPage===page.pdfPage).map(u=>u.id).sort();if(!isDeepStrictEqual(actual,[...approval.unitIds].sort()))throw Error('Page has missing or extra granular units');
        for(const unit of page.units)if(unit.status!=='needs-review'||unit.classification==='unknown'||unit.contentHash!==page.normalizedHash||!isDeepStrictEqual(records.units.units[unit.id],{...unit,status:'verified'}))throw Error('Approved source unit changed');
        for(const issue of page.issues??[])if(!source.issueIds.includes(issue.id)||!isDeepStrictEqual(records.manifest.issues[issue.id],issue))throw Error('Approved source issue changed');
      }
      for(const unit of all)if(unit.status==='verified'&&!reviewed.has(unit.locator.pdfPage))throw Error('Verified source unit lacks reviewed page');
      if(source.extractionStatus==='complete'&&(!source.pageCount||Array.from({length:source.pageCount},(_,i)=>i+1).some(n=>!reviewed.has(n))))throw Error('Complete source lacks exhaustive page approval');
    }catch{errors.push({code:'SOURCE_QA',message:'Independent source QA is missing, stale or does not match current evidence',path:source.id});}
  }
  return errors;
}
