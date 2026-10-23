import { sourceQARevision } from './source-qa.mjs';
import path from 'node:path';
import { promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readdir, readFile, writeFile, rename, rm, rmdir, lstat, realpath } from 'node:fs/promises';
import { sha256, validateRecords, projectFiles, validateCapturedProject } from './contracts.mjs';
import { readConfinedBytes } from './capture.mjs';
import { decodeUtf8 } from './assets.mjs';
const exec = promisify(execFile);
const json = value => Buffer.from(JSON.stringify(value,null,2)+'\n');
const number = n => String(n).padStart(3,'0');
const config = Object.freeze({schemaVersion:1,layout:true,encoding:'UTF-8',pageBreaks:true,dpi:120,imageFormat:'png',crop:false,ocr:false});
export function originalLines(bytes){
  const text=decodeUtf8(bytes);
  // A terminating separator ends its physical line; it does not invent another line.
  return text.match(/[^\r\n]*(?:\r\n|\n|\r|$)/g).filter((s,i,a)=>s!==''||i<a.length-1);
}
export function transcriptMarkdown(bytes){
  const lines=originalLines(bytes);
  return {lines:lines.length,bytes:Buffer.from('# Original transcript — raw, unverified\n\n'+lines.map((line,i)=>`<a id="line-${i+1}"></a>\n\n\`\`\`text\n${line.replace(/[\r\n]+$/,'')}\n\`\`\`\n`).join('\n'))};
}
export async function toolchain(toolDir,run=exec){
  const tools={};
  for(const name of ['pdfinfo','pdftotext','pdftoppm']){
    const command=toolDir?path.join(toolDir,name):name;
    let result;try{result=await run(command,['-v'],{windowsHide:true,maxBuffer:1024*1024});}catch{throw Error(`Required local tool unavailable: ${name}`);}
    const match=(result.stdout+'\n'+result.stderr).match(/version\s+(\S+)/i);
    if(!match)throw Error(`Unrecognized tool version: ${name}`);
    tools[name]={command,version:match[1]};
  }
  return tools;
}
async function walk(root,rel){
  let out=[];
  for(const entry of await readdir(path.join(root,rel),{withFileTypes:true})){
    if(entry.name==='.DS_Store')continue;
    const p=rel+'/'+entry.name;
    if(entry.isSymbolicLink())throw Error('Symlink source rejected');
    if(entry.isDirectory())out.push(...await walk(root,p));else if(entry.isFile())out.push(p);else throw Error('Unsupported source entry');
  }
  return out.sort();
}
async function safeParents(root,rel){
  if(!rel.startsWith('study/')||rel.split('/').some(p=>!p||p==='.'||p==='..')||/[\\\0]/.test(rel))throw Error('Unsafe output path');
  let current=root;
  for(const part of rel.split('/').slice(0,-1)){
    current=path.join(current,part);
    try{await mkdir(current);}catch(e){if(e.code!=='EEXIST')throw e;}
    const stat=await lstat(current);if(!stat.isDirectory()||stat.isSymbolicLink())throw Error('Unsafe output parent');
  }
}
async function immutableWrite(root,rel,bytes){
  await safeParents(root,rel);
  try{const prior=await readConfinedBytes(root,rel);if(!prior.equals(bytes))throw Error('Existing extraction differs; explicit revision required');return;}catch(e){if(e.code!=='ENOENT')throw e;}
  await writeFile(path.join(root,rel),bytes,{flag:'wx',mode:rel.startsWith('study/private/')?0o600:0o644});
}
export async function inspectInputs(root){
  const manifestBytes=await readConfinedBytes(root,'study/sources/manifest.json'),manifest=JSON.parse(manifestBytes);
  if(manifest.schemaVersion!==1||!manifest.sources||typeof manifest.sources!=='object'||Array.isArray(manifest.sources))throw Error('Invalid source manifest');
  for(const [id,s]of Object.entries(manifest.sources))if(!/^[a-z][a-z0-9]*(?:[-:][a-z0-9]+)*$/.test(id)||s.id!==id||typeof s.originalPath!=='string')throw Error('Invalid stable source identity');
  const expected=Object.values(manifest.sources).map(s=>s.originalPath).sort();
  if(JSON.stringify(await walk(root,'context'))!==JSON.stringify(expected))throw Error('Unregistered or missing original source');
  const originals=new Map();
  for(const source of Object.values(manifest.sources)){
    const bytes=await readConfinedBytes(root,source.originalPath);
    if(bytes.length!==source.byteLength||sha256(bytes)!==source.sha256)throw Error('Original source bytes changed');
    originals.set(source.id,bytes);
  }
  return {manifest,manifestBytes,originals};
}
function sourcePaths(source){
  const base=source.kind==='textbook'?`study/private/${source.id}`:'study/sources';
  return source.kind==='textbook'?{raw:base+'/extracted',assets:base+'/assets',report:base+'/ingestion.json'}:{raw:`${base}/extracted/${source.id}`,assets:`${base}/assets/${source.id}`,report:`${base}/extracted/${source.id}/ingestion.json`};
}
export async function ingest(root,{sourceIds=[],allApproved=false,pilot=false,dryRun=false,resumeExisting=false,toolDir=process.env.STUDY_POPPLER_DIR,run=exec,onProgress=()=>{}}={}){
  root=await realpath(root);
  const initial=await inspectInputs(root),tools=await toolchain(toolDir,run);
  const selected=Object.values(initial.manifest.sources).filter(s=>allApproved?s.access==='permitted':sourceIds.length?sourceIds.includes(s.id):pilot&&['lecture-3','seminar-2-problems'].includes(s.id));
  if(sourceIds.some(id=>!initial.manifest.sources[id]))throw Error('Unknown source ID');
  if(!selected.length)throw Error('Select --all-approved, --pilot or --source ID');
  if(selected.some(s=>s.access!=='permitted'))throw Error('Source access not permitted; no fallback attempted');
  const plan={ok:true,dryRun,selected: selected.filter(s=>s.kind!=='textbook').map(s=>({id:s.id,sha256:s.sha256,pageCount:s.pageCount})),restrictedSourceCount:selected.filter(s=>s.kind==='textbook').length,tools:Object.fromEntries(Object.entries(tools).map(([k,v])=>[k,v.version])),config};
  if(dryRun)return plan;
  const lock='study/.ingestion-lock';await safeParents(root,lock);
  try{await mkdir(path.join(root,lock));}catch{throw Error('Ingestion already running or lock requires inspection');}
  await safeParents(root,'study/private/ingestion-stage/placeholder');
  const tmp=await mkdtemp(path.join(root,'study/private/ingestion-stage/run-'));
  const privateTemps=[];
  let completed=false;
  try{
    const records={};const before=new Map();
    for(const [key,p] of Object.entries(projectFiles)){const b=await readConfinedBytes(root,p);before.set(p,b);records[key]=JSON.parse(b);}
    if(!before.get('study/sources/manifest.json').equals(initial.manifestBytes))throw Error('Manifest changed during capture');
    if(!validateRecords(records).ok)throw Error('Initial canonical records are invalid');
    const summary=[];
    for(const source of selected){
      const paths=sourcePaths(source),restricted=source.kind==='textbook';
      let work=tmp;
      if(restricted){await safeParents(root,`study/private/${source.id}/staging/placeholder`);work=await mkdtemp(path.join(root,`study/private/${source.id}/staging/run-`));privateTemps.push(work);}
      const input=path.join(work,source.id+(source.originalPath.endsWith('.pdf')?'.pdf':'.txt'));
      await writeFile(input,initial.originals.get(source.id),{flag:'wx'});
      const files=new Map(),unitCandidates=[],pageCandidates=[];
      const toolConfig={...config,tools:plan.tools};
      const revision=sha256(JSON.stringify({sourceHash:source.sha256,toolConfig}));
      let resumed;
      if(resumeExisting){
        resumed=JSON.parse(await readConfinedBytes(root,paths.report));
        if(resumed.schemaVersion!==1||resumed.sourceId!==source.id||resumed.sourceHash!==source.sha256||resumed.revision!==revision||JSON.stringify(resumed.config)!==JSON.stringify(toolConfig)||resumed.rawExtractionComplete!==true||resumed.semanticQA!=='needs-review'||!Array.isArray(resumed.membership)||resumed.membershipDigest!==sha256(JSON.stringify(resumed.membership)))throw Error('Existing extraction report identity/config mismatch');
        const expected=source.originalPath.endsWith('.pdf')?[paths.raw+'/rawfull-layout.txt',...Array.from({length:source.pageCount},(_,i)=>[paths.raw+`/page-${number(i+1)}.md`,paths.assets+`/page-${number(i+1)}.png`]).flat()]:[paths.raw+'/original.txt',paths.raw+'/transcript.md'];
        if(JSON.stringify(resumed.membership.map(m=>m.path).sort())!==JSON.stringify(expected.sort()))throw Error('Existing extraction membership mismatch');
        for(const member of resumed.membership){const bytes=await readConfinedBytes(root,member.path);if(bytes.length!==member.byteLength||sha256(bytes)!==member.sha256)throw Error('Existing extraction hash mismatch');}
      }
      if(source.originalPath.endsWith('.pdf')){
        let info;try{info=await run(tools.pdfinfo.command,[input],{windowsHide:true,maxBuffer:1024*1024});}catch{throw Error('PDF metadata access failed; no fallback attempted');}
        const pageFields=info.stdout.split(/\r?\n/).filter(line=>/^Pages:/.test(line));
        const encryptionFields=info.stdout.split(/\r?\n/).filter(line=>/^Encrypted:/.test(line));
        const pages=Number(pageFields[0]?.match(/^Pages:\s+(\d+)\s*$/)?.[1]);
        if(pageFields.length!==1||encryptionFields.length!==1||!/^Encrypted:\s+no\s*$/i.test(encryptionFields[0])||pages!==source.pageCount)throw Error('PDF access/encryption/page count gate failed');
        const full=path.join(work,source.id+'.txt');
        try{if(!resumeExisting)await run(tools.pdftotext.command,['-layout','-enc','UTF-8',input,full],{windowsHide:true,maxBuffer:1024*1024});}catch{throw Error('Text extraction failed; no fallback attempted');}
        const raw=resumeExisting?await readConfinedBytes(root,paths.raw+'/rawfull-layout.txt'):await readFile(full);decodeUtf8(raw);files.set(paths.raw+'/rawfull-layout.txt',raw);
        const chunks=decodeUtf8(raw).split('\f');
        if(chunks.length!==pages+1||chunks.at(-1).trim()!=='')throw Error('Extraction physical page accounting mismatch');
        const prefix=path.join(work,source.id+'-page');
        try{if(!resumeExisting)await run(tools.pdftoppm.command,['-r',String(config.dpi),'-png',input,prefix],{windowsHide:true,maxBuffer:1024*1024});}catch{throw Error('Page rendering failed; no fallback attempted');}
        const rendered=resumeExisting?Array.from({length:pages},(_,i)=>`${source.id}-page-${i+1}.png`):(await readdir(work)).filter(n=>n.startsWith(source.id+'-page-')&&n.endsWith('.png'));
        if(rendered.length!==pages)throw Error('Rendered page membership mismatch');
        for(let n=1;n<=pages;n++){
          const filename=rendered.find(name=>Number(name.match(/-(\d+)\.png$/)?.[1])===n);if(!filename)throw Error('Missing physical page image');
          const image=resumeExisting?await readConfinedBytes(root,paths.assets+`/page-${number(n)}.png`):await readFile(path.join(work,filename));if(!image.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('Invalid page raster');
          const rawPath=paths.raw+`/page-${number(n)}.md`,imagePath=paths.assets+`/page-${number(n)}.png`;
          const imageLink=restricted?`../assets/page-${number(n)}.png`:`../../assets/${source.id}/page-${number(n)}.png`;
          const md=Buffer.from(`# Physical page ${n} — raw extraction, needs review\n\n<a id="page-${n}"></a>\n\n![Original full uncropped page ${n}](${imageLink})\n\nRaw layout text below may flatten formulas, tables and glyphs. The image is source evidence; no semantic verification is claimed.\n\n\`\`\`text\n${chunks[n-1]}\n\`\`\`\n`);
          files.set(rawPath,md);files.set(imagePath,image);
          const id=`${source.id}:page-${n}:unreviewed`;
          unitCandidates.push({id,sourceId:source.id,locator:{pdfPage:n,region:'Full physical page; granular semantic QA pending'},extractionRef:{kind:'markdown',path:rawPath,anchor:`page-${n}`},contentHash:sha256(md),status:'needs-review',classification:'unknown',issueIds:[]});
          pageCandidates.push({sourceId:source.id,pdfPage:n,status:'needs-review',unitIds:[id],issueIds:[]});
        }
      }else{
        const raw=initial.originals.get(source.id),converted=transcriptMarkdown(raw);
        files.set(paths.raw+'/original.txt',raw);files.set(paths.raw+'/transcript.md',converted.bytes);
        for(let n=1;n<=converted.lines;n++){
          const id=`${source.id}:line-${n}`;
          unitCandidates.push({id,sourceId:source.id,locator:{lineStart:n,lineEnd:n},extractionRef:{kind:'markdown',path:paths.raw+'/transcript.md',anchor:`line-${n}`},contentHash:sha256(converted.bytes),status:'needs-review',classification:'unknown',issueIds:[]});
        }
      }
      const membership=[...files].sort(([a],[b])=>a.localeCompare(b)).map(([p,b])=>({path:p,sha256:sha256(b),byteLength:b.length}));
      const report={schemaVersion:1,sourceId:source.id,sourceHash:source.sha256,revision,config:toolConfig,rawExtractionComplete:true,semanticQA:'needs-review',pages:pageCandidates.length,lines:pageCandidates.length?null:unitCandidates.length,membership,membershipDigest:sha256(JSON.stringify(membership))};
      if(resumed&&JSON.stringify(resumed)!==JSON.stringify(report))throw Error('Existing extraction reconstruction mismatch');
      files.set(paths.report,json(report));
      for(const [p,b]of files)await immutableWrite(root,p,b);
      for(const unit of unitCandidates){
        // Never replace an independently approved page's granular normalized units.
        const page=unit.locator.pdfPage&&records.units.pages[`${source.id}:${unit.locator.pdfPage}`];
        if(page?.status==='verified'||records.manifest.sources[source.id].extractionStatus==='complete')continue;
        records.units.units[unit.id]=unit;
        records.coverage.coverage[unit.id]={unitId:unit.id,lessonIds:[],outcomeIds:[],disposition:'pending',reason:'Raw extraction retained; independent semantic QA and teaching pending',reviewId:null};
      }
      for(const page of pageCandidates)if(records.units.pages[`${source.id}:${page.pdfPage}`]?.status!=='verified')records.units.pages[`${source.id}:${page.pdfPage}`]=page;
      Object.assign(records.manifest.sources[source.id],{extractionStatus:records.manifest.sources[source.id].extractionStatus==='complete'?'complete':'partial',tool:{name:'poppler/local-utf8-ingestion',version:tools.pdftotext.version,configHash:sha256(JSON.stringify(toolConfig))},derivedRevision:Object.values(records.units.units).some(u=>u.sourceId===source.id&&u.status==='verified')?records.manifest.sources[source.id].derivedRevision:revision});
      summary.push(restricted?{restricted:true,pages:pageCandidates.length,rawExtractionComplete:true,semanticQA:'needs-review'}:{id:source.id,pages:pageCandidates.length,lines:report.lines,revision,rawExtractionComplete:true,semanticQA:'needs-review'});
      onProgress(restricted?{restricted:true,pages:pageCandidates.length}:{id:source.id,pages:pageCandidates.length,lines:report.lines});
    }
    const structural=validateRecords(records);if(!structural.ok)throw Error('Canonical candidate failed structural validation: '+JSON.stringify(structural.errors.slice(0,4)));
    const candidateFiles=new Map(Object.entries(projectFiles).map(([k,p])=>[p,json(records[k])]));
    const captured=new Map();
    const validated=await validateCapturedProject(async p=>{if(candidateFiles.has(p))return candidateFiles.get(p);if(!captured.has(p))captured.set(p,await readConfinedBytes(root,p));return captured.get(p);},{contextBudget:false});
    if(!validated.ok)throw Error('Canonical candidate reference validation failed: '+JSON.stringify(validated.errors.slice(0,4)));
    await inspectInputs(root);
    for(const [p,b]of captured)if(!b.equals(await readConfinedBytes(root,p)))throw Error('Captured reference changed during ingestion');
    for(const [p,b] of before)if(!b.equals(await readConfinedBytes(root,p)))throw Error('Canonical input changed during ingestion');
    const targets=['manifest','units','coverage'].map(k=>[projectFiles[k],json(records[k])]);
    // Cooperating writers use this lock. Recoverable staged files precede canonical replacement.
    const staged=[],committed=[];
    try{
      for(const [p,b]of targets){await writeFile(path.join(root,p+'.ingest-next'),b,{flag:'wx'});staged.push(p);}
      for(const [p]of targets){await rename(path.join(root,p+'.ingest-next'),path.join(root,p));committed.push(p);}
    }catch(e){for(const p of committed)await writeFile(path.join(root,p),before.get(p));throw e;}
    finally{for(const p of staged)await rm(path.join(root,p+'.ingest-next'),{force:true});}
    completed=true;
    return {...plan,dryRun:false,results:summary,warning:'Raw extraction is complete only where reported; semantic conversion and teaching are not certified.'};
  }finally{for(const dir of privateTemps)await rm(dir,{recursive:true,force:true});await rm(tmp,{recursive:true,force:true});if(!resumeExisting||completed)await rmdir(path.join(root,lock));}
}

// These records are freshness/audit evidence, not reviewer authentication. The
// independent performer workflow must supply the approved map, never its author.
export async function applyQA(root,reviewPaths){
  root=await realpath(root);await inspectInputs(root);
  const lock='study/.ingestion-lock';await safeParents(root,lock);
  try{await mkdir(path.join(root,lock));}catch{throw Error('Ingestion already running or lock requires inspection');}
  try{
    const records={},before=new Map(),bound=new Map();
    const read=async p=>{if(!bound.has(p))bound.set(p,await readConfinedBytes(root,p));return bound.get(p);};
    for(const [key,p]of Object.entries(projectFiles)){const b=await read(p);before.set(p,b);records[key]=JSON.parse(b);}
    if(!validateRecords(records).ok)throw Error('Initial canonical records are invalid');
    let approvedPages=0;
    for(const reviewPath of reviewPaths){
      if(!/^study\/sources\/qa-reviews\/[a-z0-9-]+\.json$/.test(reviewPath))throw Error('QA review must use the independent review tree');
      const reviewBytes=await read(reviewPath),review=JSON.parse(reviewBytes),source=records.manifest.sources[review.sourceId];
      if(!source||source.kind==='textbook'||source.exposure.agent!=='allow')throw Error('Unsupported or restricted QA source');
      if(review.schemaVersion!==1||review.verdict!=='approved'||review.sourceHash!==source.sha256||!review.reviewer?.trim()||!Number.isFinite(Date.parse(review.reviewedAt))||!Array.isArray(review.pages)||!review.pages.length)throw Error('Incomplete independent approval');
      if(review.draftPath!==`study/sources/qa-drafts/${source.id}.json`)throw Error('Unexpected draft map path');
      const draftBytes=await read(review.draftPath);if(sha256(draftBytes)!==review.draftHash)throw Error('Stale QA draft hash');
      const draft=JSON.parse(draftBytes);
      if(draft.schemaVersion!==1||draft.sourceId!==source.id||draft.sourceHash!==source.sha256||!draft.author?.trim()||draft.author===review.reviewer||!Array.isArray(draft.pages))throw Error('Invalid author/reviewer audit evidence');
      const seen=new Set();
      for(const approval of review.pages){
        if(seen.has(approval.pdfPage)||approval.verdict!=='approved'||approval.allRegionsAccounted!==true)throw Error('Page approval missing exhaustive region accounting');seen.add(approval.pdfPage);
        const matches=draft.pages.filter(p=>p.pdfPage===approval.pdfPage);if(matches.length!==1)throw Error('Missing/duplicate reviewed page draft');
        const page=matches[0],paths=sourcePaths(source),n=number(page.pdfPage);
        if(page.rawPath!==`${paths.raw}/page-${n}.md`||page.imagePath!==`${paths.assets}/page-${n}.png`||page.normalizedPath!==`study/sources/annotated/${source.id}/page-${n}.md`)throw Error('Unexpected QA evidence path');
        for(const [field,hash]of [['rawPath','rawHash'],['imagePath','imageHash'],['normalizedPath','normalizedHash']])if(page[hash]!==approval[hash]||sha256(await read(page[field]))!==page[hash])throw Error('Stale QA evidence bytes');
        if(!Array.isArray(page.units)||!page.units.length||JSON.stringify(page.units.map(u=>u.id))!==JSON.stringify(approval.unitIds))throw Error('QA units do not match independently approved selection');
        const pageKey=`${source.id}:${page.pdfPage}`,old=records.units.pages[pageKey];if(!old)throw Error('Unknown physical page');
        const unitIds=[];
        for(const unit of page.units){
          if(unit.sourceId!==source.id||unit.locator?.pdfPage!==page.pdfPage||unit.status!=='needs-review'||unit.classification==='unknown'||unit.extractionRef?.path!==page.normalizedPath||unit.contentHash!==page.normalizedHash)throw Error('Invalid granular QA unit');
          if(unitIds.includes(unit.id))throw Error('Duplicate granular unit');
          const existing=records.units.units[unit.id];if(existing&&(existing.sourceId!==source.id||existing.locator.pdfPage!==page.pdfPage))throw Error('Unit ID collision');
          unitIds.push(unit.id);records.units.units[unit.id]={...unit,status:'verified'};
          records.coverage.coverage[unit.id]={unitId:unit.id,lessonIds:[],outcomeIds:[],disposition:'pending',reason:'Source region independently verified; teaching disposition pending',reviewId:null};
        }
        for(const id of old.unitIds)if(!unitIds.includes(id)){delete records.units.units[id];delete records.coverage.coverage[id];}
        const issueIds=[];
        for(const issue of page.issues??[]){
          if(!issue||typeof issue!=='object')throw Error('QA issues must be closed canonical Issue records');
          const existing=records.manifest.issues[issue.id];if(existing&&JSON.stringify(existing)!==JSON.stringify(issue))throw Error('Issue ID collision');
          records.manifest.issues[issue.id]=issue;issueIds.push(issue.id);
          if(!source.issueIds.includes(issue.id))source.issueIds.push(issue.id);
        }
        records.units.pages[pageKey]={sourceId:source.id,pdfPage:page.pdfPage,status:'verified',unitIds,issueIds};approvedPages++;
      }
      source.derivedRevision=sourceQARevision(source.sha256,await read(`study/sources/extracted/${source.id}/ingestion.json`),reviewBytes);
      source.extractionStatus=Array.from({length:source.pageCount},(_,i)=>records.units.pages[`${source.id}:${i+1}`]).every(p=>p?.status==='verified')?'complete':'partial';
    }
    const overrides=new Map(Object.entries(projectFiles).map(([k,p])=>[p,json(records[k])]));
    const validated=await validateCapturedProject(p=>overrides.has(p)?overrides.get(p):read(p),{contextBudget:false});
    if(!validated.ok)throw Error('QA canonical candidate rejected: '+JSON.stringify(validated.errors.slice(0,5)));
    await inspectInputs(root);
    for(const [p,b]of bound)if(!b.equals(await readConfinedBytes(root,p)))throw Error('QA capture changed during validation');
    const targets=['manifest','units','coverage'].map(k=>[projectFiles[k],json(records[k])]);
    const staged=[],committed=[];
    try{
      for(const [p,b]of targets){await writeFile(path.join(root,p+'.ingest-next'),b,{flag:'wx'});staged.push(p);}
      for(const [p]of targets){await rename(path.join(root,p+'.ingest-next'),path.join(root,p));committed.push(p);}
    }catch(e){for(const p of committed)await writeFile(path.join(root,p),before.get(p));throw e;}
    finally{for(const p of staged)await rm(path.join(root,p+'.ingest-next'),{force:true});}
    return {ok:true,approvedPages,readiness:validated.readiness,warning:'QA-map hashes establish freshness, not reviewer authentication or learner mastery.'};
  }finally{await rmdir(path.join(root,lock));}
}
