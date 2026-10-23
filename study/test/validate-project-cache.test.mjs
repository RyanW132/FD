import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { syncBuiltinESMExports } from 'node:module';
import path from 'node:path';
import os from 'node:os';
import { validateProject, projectFiles, sha256 } from '../lib/contracts.mjs';
const baseline=JSON.parse(await fs.readFile(new URL('./fixtures/contracts/pending.json',import.meta.url)));
async function fixture(t){
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'fd-validation-cache-'));
  t.after(()=>fs.rm(root,{recursive:true,force:true}));
  const records=structuredClone(baseline),original=Buffer.from('synthetic original');
  Object.assign(records.manifest.sources['source-a'],{sha256:sha256(original),byteLength:original.length});
  const extraction=Buffer.from('<a id="one"></a>One\n<a id="two"></a>Two\n');
  for(const id of ['one','two']){
    records.units.units[id]={id,sourceId:'source-a',locator:{pdfPage:1},extractionRef:{kind:'markdown',path:'study/extraction.md',anchor:id},contentHash:sha256(extraction),status:'needs-review',classification:'unknown',issueIds:[]};
    records.coverage.coverage[id]={unitId:id,lessonIds:[],outcomeIds:[],disposition:'pending',reason:'Synthetic',reviewId:null};
  }
  records.units.pages['source-a:1'].unitIds=['one','two'];
  for(const [p,bytes] of [...Object.entries(projectFiles).map(([k,p])=>[p,JSON.stringify(records[k])]),['context/source.pdf',original],['study/extraction.md',extraction]]){
    await fs.mkdir(path.dirname(path.join(root,p)),{recursive:true});await fs.writeFile(path.join(root,p),bytes);
  }
  return {root,records};
}
// Builtin interception is scoped to this sequential test file, with no production hooks.
async function withReads(hook,run){
  const original=fs.readFile;
  fs.readFile=async(...args)=>hook(original,...args);syncBuiltinESMExports();
  try{return await run();}finally{fs.readFile=original;syncBuiltinESMExports();}
}
test('each successful distinct path is read once for validation plus once for final recheck',{concurrency:false},async t=>{
  const {root}=await fixture(t),counts=new Map();
  const result=await withReads(async(read,p,...args)=>{counts.set(p,(counts.get(p)??0)+1);return read(p,...args);},()=>validateProject(root,{contextBudget:false}));
  assert.equal(result.ok,true,JSON.stringify(result.errors));
  assert.equal(counts.get(path.join(root,'study/extraction.md')),2);
  assert.ok([...counts.values()].every(n=>n===2),JSON.stringify([...counts]));
});
test('same-size same-mtime mutation is rejected by final bytes, even with cached valid references',{concurrency:false},async t=>{
  const {root}=await fixture(t),target=path.join(root,'study/extraction.md');
  await fs.utimes(target,1700000000,1700000000);const before=await fs.stat(target);let changed=false;
  const result=await withReads(async(read,p,...args)=>{
    const bytes=await read(p,...args);
    if(p===target&&!changed){changed=true;await fs.writeFile(target,Buffer.from(bytes.toString().replace('One','XXX')));await fs.utimes(target,before.atime,before.mtime);}
    return bytes;
  },()=>validateProject(root,{contextBudget:false}));
  const after=await fs.stat(target);assert.equal(after.size,before.size);assert.equal(after.mtimeMs,before.mtimeMs);
  assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.code==='INPUT_CHANGED'));
  assert.deepEqual(result.readiness,{accountingComplete:false,conversionComplete:false,teachingComplete:false});
});
test('cache never survives a validation invocation',{concurrency:false},async t=>{
  const {root}=await fixture(t);assert.equal((await validateProject(root,{contextBudget:false})).ok,true);
  await fs.writeFile(path.join(root,'study/extraction.md'),'<a id="one"></a>changed');
  const result=await validateProject(root,{contextBudget:false});assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.code==='CONTENT_HASH'||e.code==='REFERENCE'));
});
test('deletion and confinement escape during validation remain fatal',{concurrency:false},async t=>{
  for(const escape of [false,true]){
    const {root}=await fixture(t),target=path.join(root,'study/extraction.md');let changed=false;
    const result=await withReads(async(read,p,...args)=>{
      const bytes=await read(p,...args);
      if(p===target&&!changed){changed=true;await fs.rm(target);if(escape)await fs.symlink('/etc/passwd',target);}
      return bytes;
    },()=>validateProject(root,{contextBudget:false}));
    assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.code==='INPUT_CHANGED'));
  }
});
test('initial failed reads and unsafe paths cannot become cached successes',{concurrency:false},async t=>{
  for(const badPath of ['study/missing.md','../outside.md']){
    const {root,records}=await fixture(t);records.units.units.one.extractionRef.path=badPath;
    await fs.writeFile(path.join(root,projectFiles.units),JSON.stringify(records.units));
    const result=await validateProject(root,{contextBudget:false});assert.equal(result.ok,false);assert.ok(result.errors.some(e=>e.code==='REFERENCE'||e.code==='PATH'));
  }
});
