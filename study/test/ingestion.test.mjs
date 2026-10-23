import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, readdir, symlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { originalLines, transcriptMarkdown, toolchain, ingest, applyQA } from '../lib/ingestion.mjs';
import { sha256, projectFiles, validateProject } from '../lib/contracts.mjs';
const fixture=JSON.parse(await readFile(new URL('./fixtures/contracts/pending.json',import.meta.url)));
async function setup(t,{transcript=false,transcriptText='\uFEFFfirst\r\n\r\nlast',kind='lecture',access='permitted'}={}){
 const root=await mkdtemp(path.join(os.tmpdir(),'fd-ingest-test-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const records=structuredClone(fixture),id='source-a',source=records.manifest.sources[id];
 const bytes=Buffer.from(transcript?transcriptText:'%PDF synthetic fixture');
 Object.assign(source,{kind:transcript?'transcript':kind,originalPath:transcript?'context/source.txt':'context/source.pdf',sha256:sha256(bytes),byteLength:bytes.length,access,pageCount:transcript?null:2,extractionStatus:'pending'});
 if(kind!=='textbook')source.exposure={browser:'allow',agent:'allow',export:'deny'};
 records.units.pages=transcript?{}:Object.fromEntries([1,2].map(n=>[`${id}:${n}`,{sourceId:id,pdfPage:n,status:'pending',unitIds:[],issueIds:[]}]));
 await mkdir(path.join(root,'context'));await writeFile(path.join(root,source.originalPath),bytes);
 for(const[k,p]of Object.entries(projectFiles)){await mkdir(path.dirname(path.join(root,p)),{recursive:true});await writeFile(path.join(root,p),JSON.stringify(records[k],null,2)+'\n');}
 return {root,records,source};
}
function fakeTools({encrypted=false,empty=false,missing=false}={}){return async(command,args)=>{
 if(missing)throw Error('missing');
 if(args[0]==='-v')return{stdout:path.basename(command)+' version 26.01.0',stderr:''};
 if(command.endsWith('pdfinfo'))return{stdout:`Pages: 2\nEncrypted: ${encrypted?'yes':'no'}\n`,stderr:''};
 if(command.endsWith('pdftotext')){await writeFile(args.at(-1),empty?'\f\f':'Definition\nTable a b\nFormula x²/2\n\fImage-only diagram\f');return{stdout:'',stderr:''};}
 if(command.endsWith('pdftoppm')){for(const n of[1,2])await writeFile(args.at(-1)+`-${n}.png`,Buffer.from([137,80,78,71,13,10,26,10,1,2,3]));return{stdout:'',stderr:''};}
 throw Error('Unexpected subprocess');
};}
test('physical transcript lines preserve CRLF, BOM, blank and nonterminated lines',()=>{
 const b=Buffer.from('\uFEFFone\r\n\r\nthree');assert.deepEqual(originalLines(b),['\uFEFFone\r\n','\r\n','three']);
 assert.equal(originalLines(Buffer.from('a\n')).length,1);assert.equal(originalLines(Buffer.alloc(0)).length,0);
 const md=transcriptMarkdown(b);assert.equal(md.lines,3);assert.match(md.bytes.toString(),/id="line-2"/);assert.match(md.bytes.toString(),/three/);
 assert.throws(()=>originalLines(Buffer.from([255])),/encoded|encoding/i);
});
test('missing extraction tools fail explicitly',async()=>{await assert.rejects(toolchain(undefined,fakeTools({missing:true})),/unavailable/);});
test('dry-run captures exact originals and tools without any writes',async t=>{
 const {root}=await setup(t);const before=await readdir(path.join(root,'study'));
 const result=await ingest(root,{sourceIds:['source-a'],dryRun:true,run:fakeTools()});assert.equal(result.dryRun,true);assert.deepEqual(await readdir(path.join(root,'study')),before);
});
test('hash changes and unregistered sources fail before extraction',async t=>{
 const{root,source}=await setup(t);await writeFile(path.join(root,source.originalPath),'changed');await assert.rejects(ingest(root,{sourceIds:['source-a'],dryRun:true,run:fakeTools()}),/bytes changed/);
 await writeFile(path.join(root,'context/new.pdf'),'new');await assert.rejects(ingest(root,{sourceIds:['source-a'],dryRun:true,run:fakeTools()}),/Unregistered/);
});
test('symlink source rejected without following it',async t=>{
 const{root}=await setup(t);await symlink('/etc/passwd',path.join(root,'context/unregistered'));await assert.rejects(ingest(root,{sourceIds:['source-a'],dryRun:true,run:fakeTools()}),/Symlink/);
});
test('access-denied source cannot trigger extraction fallback',async t=>{
 const{root}=await setup(t,{access:'blocked'});await assert.rejects(ingest(root,{sourceIds:['source-a'],run:fakeTools()}),/access not permitted/);
});
test('encrypted PDF fails closed without text/render fallback or canonical changes',async t=>{
 const{root}=await setup(t);const before=await readFile(path.join(root,projectFiles.units));await assert.rejects(ingest(root,{sourceIds:['source-a'],run:fakeTools({encrypted:true})}),/access\/encryption/);assert.deepEqual(await readFile(path.join(root,projectFiles.units)),before);
});
test('complete multi-topic raw pages remain unknown pending granular QA; repeat deterministic',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});
 const p='study/sources/extracted/source-a/page-001.md',raw=await readFile(path.join(root,p));assert.match(raw.toString(),/Definition/);assert.match(raw.toString(),/x²/);
 const first=await readFile(path.join(root,projectFiles.units));const units=JSON.parse(first);assert.equal(Object.keys(units.units).length,2);assert.equal(units.units['source-a:page-1:unreviewed'].classification,'unknown');assert.equal(units.pages['source-a:1'].status,'needs-review');
 await ingest(root,{sourceIds:['source-a'],run:fakeTools()});assert.deepEqual(await readFile(path.join(root,p)),raw);assert.deepEqual(await readFile(path.join(root,projectFiles.units)),first);
});
test('empty or image-only raw PDF pages are never auto-certified blank',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools({empty:true})});const units=JSON.parse(await readFile(path.join(root,projectFiles.units)));assert.ok(Object.values(units.units).every(u=>u.classification==='unknown'&&u.status==='needs-review'));
});
test('transcript preserves original bytes plus exact original line anchor ranges',async t=>{
 const{root,source}=await setup(t,{transcript:true});await ingest(root,{sourceIds:['source-a'],run:fakeTools()});assert.deepEqual(await readFile(path.join(root,'study/sources/extracted/source-a/original.txt')),await readFile(path.join(root,source.originalPath)));const units=JSON.parse(await readFile(path.join(root,projectFiles.units)));assert.deepEqual(Object.values(units.units).map(u=>u.locator),[1,2,3].map(n=>({lineStart:n,lineEnd:n})));
});
test('textbook derivatives and detailed memberships are exclusively private; stdout model filtered',async t=>{
 const{root}=await setup(t,{kind:'textbook'});const result=await ingest(root,{sourceIds:['source-a'],run:fakeTools()});assert.equal(result.restrictedSourceCount,1);assert.deepEqual(result.selected,[]);assert.equal(result.results[0].id,undefined);await assert.rejects(readFile(path.join(root,'study/sources/extracted/source-a/page-001.md')),/ENOENT/);assert.ok((await readFile(path.join(root,'study/private/source-a/extracted/page-001.md'))).length);
 const units=JSON.parse(await readFile(path.join(root,projectFiles.units)));assert.ok(Object.values(units.units).every(u=>u.extractionRef.path.startsWith('study/private/source-a/')));
});
test('explicit reviewed QA map required; no arbitrary path or author-label shortcut',async t=>{
 const{root}=await setup(t);await assert.rejects(applyQA(root,['study/sources/qa-drafts/source-a.json']),/independent review tree/);await assert.rejects(applyQA(root,['../bad.json']),/independent review tree/);
});
async function qaFixture(root,{pages=[1,2],reviewer='independent-verifier'}={}){
 const draft={schemaVersion:1,sourceId:'source-a',sourceHash:sha256(await readFile(path.join(root,'context/source.pdf'))),author:'source-author',pages:[]};
 for(const n of pages){
  const num=String(n).padStart(3,'0'),rawPath=`study/sources/extracted/source-a/page-${num}.md`,imagePath=`study/sources/assets/source-a/page-${num}.png`,normalizedPath=`study/sources/annotated/source-a/page-${num}.md`;
  const md=Buffer.from(`<a id="definition"></a>\nDefinition with explicit symbols.\n\n<a id="example"></a>\nExample with table values.\n`);await mkdir(path.dirname(path.join(root,normalizedPath)),{recursive:true});await writeFile(path.join(root,normalizedPath),md);
  draft.pages.push({pdfPage:n,rawPath,rawHash:sha256(await readFile(path.join(root,rawPath))),imagePath,imageHash:sha256(await readFile(path.join(root,imagePath))),normalizedPath,normalizedHash:sha256(md),units:['definition','example'].map((name,i)=>({id:`source-a:page-${n}:${name}`,sourceId:'source-a',locator:{pdfPage:n,region:name},extractionRef:{kind:'markdown',path:normalizedPath,anchor:name},contentHash:sha256(md),status:'needs-review',classification:'substantive',issueIds:[]})),issues:[],observations:['Synthetic independent test fixture, not real semantic review']});
 }
 const draftPath='study/sources/qa-drafts/source-a.json',draftBytes=Buffer.from(JSON.stringify(draft));await mkdir(path.dirname(path.join(root,draftPath)),{recursive:true});await writeFile(path.join(root,draftPath),draftBytes);
 const review={schemaVersion:1,sourceId:'source-a',sourceHash:draft.sourceHash,draftPath,draftHash:sha256(draftBytes),reviewer,reviewedAt:'2026-10-22T00:00:00Z',verdict:'approved',pages:draft.pages.map(p=>({pdfPage:p.pdfPage,verdict:'approved',rawHash:p.rawHash,imageHash:p.imageHash,normalizedHash:p.normalizedHash,unitIds:p.units.map(u=>u.id),allRegionsAccounted:true}))};
 const reviewPath='study/sources/qa-reviews/source-a.json';await mkdir(path.dirname(path.join(root,reviewPath)),{recursive:true});await writeFile(path.join(root,reviewPath),JSON.stringify(review));return{draft,review,reviewPath};
}
test('independent hash-bound QA replaces unknown placeholders with every granular unit',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const{reviewPath}=await qaFixture(root);const result=await applyQA(root,[reviewPath]);assert.equal(result.approvedPages,2);const units=JSON.parse(await readFile(path.join(root,projectFiles.units)));assert.equal(Object.keys(units.units).length,4);assert.ok(Object.values(units.units).every(u=>u.status==='verified'));assert.ok(Object.values(units.pages).every(p=>p.unitIds.length===2&&p.status==='verified'));const coverage=JSON.parse(await readFile(path.join(root,projectFiles.coverage)));assert.ok(Object.values(coverage.coverage).every(c=>c.disposition==='pending'));assert.equal(result.readiness.teachingComplete,false);
});
test('partial page QA leaves remaining source conversion partial',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const{reviewPath}=await qaFixture(root,{pages:[1]});await applyQA(root,[reviewPath]);assert.equal(JSON.parse(await readFile(path.join(root,projectFiles.manifest))).sources['source-a'].extractionStatus,'partial');
});
test('stale normalized bytes cannot reuse independent QA approval',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const{draft,reviewPath}=await qaFixture(root);const before=await readFile(path.join(root,projectFiles.units));await writeFile(path.join(root,draft.pages[0].normalizedPath),'changed');await assert.rejects(applyQA(root,[reviewPath]),/Stale QA evidence/);assert.deepEqual(await readFile(path.join(root,projectFiles.units)),before);
});
test('source author cannot use identical reviewer audit identity',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const{reviewPath}=await qaFixture(root,{reviewer:'source-author'});await assert.rejects(applyQA(root,[reviewPath]),/author\/reviewer/);
});
test('concurrent original mutation is caught by final byte recheck',async t=>{
 const{root,source}=await setup(t);const before=await readFile(path.join(root,projectFiles.manifest));
 // onProgress is observability only; schedule no unawaited test work.
 const fs=await import('node:fs');
 await assert.rejects(ingest(root,{sourceIds:['source-a'],run:fakeTools(),onProgress:()=>fs.writeFileSync(path.join(root,source.originalPath),'mutated')}),/Original source bytes changed|ORIGINAL_HASH/);
 assert.deepEqual(await readFile(path.join(root,projectFiles.manifest)),before);
});
test('existing raw evidence is immutable and changed bytes are never overwritten',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const p=path.join(root,'study/sources/extracted/source-a/page-001.md');await writeFile(p,'changed evidence');await assert.rejects(ingest(root,{sourceIds:['source-a'],run:fakeTools()}),/Existing extraction differs/);assert.equal(await readFile(p,'utf8'),'changed evidence');
});
test('existing cooperating ingestion lock fails closed without deleting it',async t=>{
 const{root}=await setup(t);const lock=path.join(root,'study/.ingestion-lock');await mkdir(lock);await writeFile(path.join(lock,'owner'),'another writer');await assert.rejects(ingest(root,{sourceIds:['source-a'],run:fakeTools()}),/already running/);assert.equal(await readFile(path.join(lock,'owner'),'utf8'),'another writer');
});

import { captureProject } from '../lib/capture.mjs';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { openKnowledge } from '../lib/knowledge.mjs';
test('active or abandoned ingestion lock blocks live knowledge and publication, not immutable old generation',async t=>{
 const{root}=await setup(t);const publication=await buildPublication(root,{publish:true});assert.equal(publication.ok,true,JSON.stringify(publication.errors));await mkdir(path.join(root,'study/.ingestion-lock'));
 await assert.rejects(openKnowledge(root),/ingestion batch/);const blocked=await buildPublication(root,{publish:true});assert.equal(blocked.ok,false);assert.match(blocked.errors[0].message,/ingestion batch/);const old=await readGeneration(root,publication.digest);assert.ok(old);
});
test('ingestion lock appearing after capture invalidates that capture',async t=>{
 const{root}=await setup(t);await assert.rejects(captureProject(root,{testHooks:{afterCapture:()=>mkdir(path.join(root,'study/.ingestion-lock'))}}),/ingestion batch/);
});
for(const hook of ['beforeCommit','afterGeneration'])test(`late ingestion lock at ${hook} preserves last-good publication pointer`,async t=>{
 const{root}=await setup(t);const first=await buildPublication(root,{publish:true});assert.equal(first.ok,true);const pointer=await readFile(path.join(root,'study/generated/current.json'));
 const result=await buildPublication(root,{publish:true,testHooks:{[hook]:()=>mkdir(path.join(root,'study/.ingestion-lock'))}});assert.equal(result.ok,false);assert.match(result.errors[0].message,/ingestion batch/);assert.deepEqual(await readFile(path.join(root,'study/generated/current.json')),pointer);
});
test('unsafe stable source IDs cannot escape staging paths',async t=>{
 const{root}=await setup(t);const p=path.join(root,projectFiles.manifest),m=JSON.parse(await readFile(p));m.sources['source-a'].id='../escape';await writeFile(p,JSON.stringify(m));await assert.rejects(ingest(root,{sourceIds:['source-a'],run:fakeTools()}),/stable source identity/);
});
test('symlink output parent rejects extraction without writing through it',async t=>{
 const{root}=await setup(t);const outside=await mkdtemp(path.join(os.tmpdir(),'fd-ingest-outside-'));t.after(()=>rm(outside,{recursive:true,force:true}));await symlink(outside,path.join(root,'study/sources/assets'));await assert.rejects(ingest(root,{sourceIds:['source-a'],run:fakeTools()}),/Unsafe output parent/);assert.deepEqual(await readdir(outside),[]);
});
for(const target of ['raw','image','review-map','draft-map','unit-selection','tool-marker-bypass'])test(`enduring independent QA rejects later ${target} tampering`,async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const{draft,reviewPath}=await qaFixture(root);await applyQA(root,[reviewPath]);
 const valid=await validateProject(root,{contextBudget:false});assert.equal(valid.ok,true,JSON.stringify(valid.errors));
 if(target==='raw'||target==='tool-marker-bypass')await writeFile(path.join(root,draft.pages[0].rawPath),'changed raw bytes');
 if(target==='image')await writeFile(path.join(root,draft.pages[0].imagePath),Buffer.from('changed raster bytes'));
 if(target==='review-map'){const p=path.join(root,reviewPath),r=JSON.parse(await readFile(p));r.note='edited map metadata';await writeFile(p,JSON.stringify(r));}
 if(target==='draft-map'){const p=path.join(root,'study/sources/qa-drafts/source-a.json'),d=JSON.parse(await readFile(p));d.pages[0].observations.push('edited draft metadata');await writeFile(p,JSON.stringify(d));}
 if(target==='unit-selection'){const p=path.join(root,projectFiles.units),u=JSON.parse(await readFile(p));u.units['source-a:page-1:definition'].locator.region='edited approved region';await writeFile(p,JSON.stringify(u));}
 if(target==='tool-marker-bypass'){const p=path.join(root,projectFiles.manifest),m=JSON.parse(await readFile(p));m.sources['source-a'].tool.name='manually-renamed';await writeFile(p,JSON.stringify(m));}
 const result=await validateProject(root,{contextBudget:false});assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.code==='SOURCE_QA'),JSON.stringify(result.errors));
});
test('manually promoted raw placeholder cannot claim independent source QA',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const p=path.join(root,projectFiles.units),u=JSON.parse(await readFile(p));u.units['source-a:page-1:unreviewed'].status='verified';u.units['source-a:page-1:unreviewed'].classification='substantive';u.pages['source-a:1'].status='verified';await writeFile(p,JSON.stringify(u));const result=await validateProject(root,{contextBudget:false});assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.code==='SOURCE_QA'));
});
test('repeat extraction preserves exact approved source revision and independent map bytes',async t=>{
 const{root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const{reviewPath}=await qaFixture(root);await applyQA(root,[reviewPath]);const before=await readFile(path.join(root,projectFiles.manifest)),review=await readFile(path.join(root,reviewPath));await ingest(root,{sourceIds:['source-a'],run:fakeTools()});assert.deepEqual(await readFile(path.join(root,projectFiles.manifest)),before);assert.deepEqual(await readFile(path.join(root,reviewPath)),review);assert.equal((await validateProject(root,{contextBudget:false})).ok,true);
});
test('ambiguous PDF metadata cannot spoof an encryption allow decision',async t=>{
 const{root}=await setup(t),base=fakeTools();await assert.rejects(ingest(root,{sourceIds:['source-a'],run:(cmd,args)=>args[0]!=='-v'&&cmd.endsWith('pdfinfo')?Promise.resolve({stdout:'Pages: 2\nEncrypted: no\nEncrypted: yes (print:no copy:no)\n',stderr:''}):base(cmd,args)}),/access\/encryption/);
});
test('resume existing exact extraction rebuilds canonical records without extraction/rendering',async t=>{
 const {root,records}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});
 const expected=await readFile(path.join(root,projectFiles.units));
 for(const key of ['manifest','units','coverage'])await writeFile(path.join(root,projectFiles[key]),JSON.stringify(records[key],null,2)+'\n');
 const run=async(command,args)=>{if(args[0]!=='-v'&&!command.endsWith('pdfinfo'))throw Error('Must not extract/render');return fakeTools()(command,args);};
 await ingest(root,{sourceIds:['source-a'],resumeExisting:true,run});assert.deepEqual(await readFile(path.join(root,projectFiles.units)),expected);
});
test('resume rejects changed existing bytes, tools, membership and symlinks',async t=>{
 for(const kind of ['bytes','tools','membership','symlink']){
 const {root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});
 const p=path.join(root,'study/sources/extracted/source-a/page-001.md');
 if(kind==='bytes')await writeFile(p,'tampered');
 if(kind==='symlink'){await rm(p);await symlink('/etc/passwd',p);}
 if(kind==='membership'){const reportPath=path.join(root,'study/sources/extracted/source-a/ingestion.json'),report=JSON.parse(await readFile(reportPath));report.membership.pop();report.membershipDigest=sha256(JSON.stringify(report.membership));await writeFile(reportPath,JSON.stringify(report));}
 const run=async(command,args)=>{const r=await fakeTools()(command,args);if(kind==='tools'&&args[0]==='-v')r.stdout=r.stdout.replace('26.01.0','27.0');return r;};
 await assert.rejects(ingest(root,{sourceIds:['source-a'],resumeExisting:true,run}),/hash mismatch|config mismatch|membership mismatch|[Ss]ymlink/);
 }
});
test('failed resume keeps publication gate closed and canonical bytes unchanged',async t=>{
 const {root}=await setup(t);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});
 const before=await readFile(path.join(root,projectFiles.units));await writeFile(path.join(root,'study/sources/extracted/source-a/page-001.md'),'changed');
 await assert.rejects(ingest(root,{sourceIds:['source-a'],resumeExisting:true,run:fakeTools()}),/hash mismatch/);
 assert.deepEqual(await readFile(path.join(root,projectFiles.units)),before);assert.deepEqual(await readdir(path.join(root,'study/.ingestion-lock')),[]);
});
test('resume transcript and restricted evidence retain deterministic private-aware records',async t=>{
 for(const options of [{transcript:true},{kind:'textbook'}]){
 const {root}=await setup(t,options);await ingest(root,{sourceIds:['source-a'],run:fakeTools()});const before=await readFile(path.join(root,projectFiles.units));
 const run=async(command,args)=>{if(args[0]!=='-v'&&!command.endsWith('pdfinfo'))throw Error('Must not extract/render');return fakeTools()(command,args);};
 await ingest(root,{sourceIds:['source-a'],resumeExisting:true,run});assert.deepEqual(await readFile(path.join(root,projectFiles.units)),before);
 }
});
test('captured accounting matches ingestion for CR, empty, BOM and trailing separators',async t=>{
 for(const transcriptText of ['a\r\rb','', '\uFEFFa\r\n\r\nlast','a\n','a\r']){
 const {root}=await setup(t,{transcript:true,transcriptText});await ingest(root,{sourceIds:['source-a'],run:fakeTools()});
 const result=await validateProject(root,{contextBudget:false});assert.equal(result.ok,true,JSON.stringify(result.errors));assert.equal(result.readiness.accountingComplete,true);assert.equal(result.readiness.conversionComplete,false);
 }
});
test('ingestion-managed restricted source cannot forge semantic approval by changing status or tool marker',async t=>{
 const {root}=await setup(t,{kind:'textbook'});await ingest(root,{sourceIds:['source-a'],run:fakeTools()});
 const units=JSON.parse(await readFile(path.join(root,projectFiles.units))),manifest=JSON.parse(await readFile(path.join(root,projectFiles.manifest)));
 for(const u of Object.values(units.units)){u.status='verified';u.classification='substantive';}for(const p of Object.values(units.pages))p.status='verified';
 manifest.sources['source-a'].extractionStatus='complete';manifest.sources['source-a'].tool.name='synthetic-label-bypass';
 await writeFile(path.join(root,projectFiles.units),JSON.stringify(units));await writeFile(path.join(root,projectFiles.manifest),JSON.stringify(manifest));
 const result=await validateProject(root,{contextBudget:false});assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.code==='SOURCE_QA'));
});
