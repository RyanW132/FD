// Read-only in-memory integration test; no canonical metadata promotion.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sourceQARevision, validateSourceQA} from '../../lib/source-qa.mjs';
const ids=['seminar-1-problems','seminar-1-solutions','seminar-2-problems','seminar-2-solutions','seminar-3-problems'];
const read=p=>readFile(new URL('../../../'+p,import.meta.url));
const manifest=JSON.parse(await read('study/sources/manifest.json'));
const records={manifest:{...manifest,sources:{},issues:{}},units:{pages:{},units:{}}};
for(const id of ids){
  const source=structuredClone(manifest.sources[id]);
  const draft=JSON.parse(await read(`study/sources/qa-drafts/${id}.json`));
  source.extractionStatus='complete'; source.issueIds=draft.pages.flatMap(p=>p.issues.map(i=>i.id));
  source.derivedRevision=sourceQARevision(source.sha256,await read(`study/sources/extracted/${id}/ingestion.json`),await read(`study/sources/qa-reviews/${id}.json`));
  records.manifest.sources[id]=source;
  for(const p of draft.pages){
    records.units.pages[`${id}:${p.pdfPage}`]={sourceId:id,pdfPage:p.pdfPage,status:'verified',unitIds:p.units.map(u=>u.id),issueIds:p.issues.map(i=>i.id)};
    for(const u of p.units)records.units.units[u.id]={...u,status:'verified'};
    for(const issue of p.issues)records.manifest.issues[issue.id]=issue;
  }
}
assert.deepEqual(await validateSourceQA(read,records),[]);
let negativeChecks=0;
for(const path of ['study/sources/qa-drafts/seminar-1-problems.json','study/sources/qa-reviews/seminar-1-problems.json','study/sources/extracted/seminar-1-problems/page-001.md','study/sources/assets/seminar-1-problems/page-001.png','study/sources/annotated/seminar-1-problems/page-001.md']){
  const tamperedRead=async p=>p===path?Buffer.concat([await read(p),Buffer.from(' ') ]):read(p);
  const errors=await validateSourceQA(tamperedRead,records);
  assert.ok(errors.some(e=>e.code==='SOURCE_QA'&&e.path==='seminar-1-problems'),path+' must invalidate');
  negativeChecks++;
}
console.log(JSON.stringify({sourceCount:ids.length,pageCount:Object.keys(records.units.pages).length,unitCount:Object.keys(records.units.units).length,errors:[],staleEvidenceRejections:negativeChecks}));
