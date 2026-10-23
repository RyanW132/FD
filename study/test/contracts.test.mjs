import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readFile,mkdtemp,mkdir,writeFile,rm
} from 'node:fs/promises';
import {
  tmpdir
} from 'node:os';
import path from 'node:path';
import {
  validateRecords,validateProject,resolveReference,sha256,projectFiles,isSafePath
} from '../lib/contracts.mjs';
const fixture=JSON.parse(await readFile(new URL('./fixtures/contracts/pending.json',import.meta.url),'utf8'));
const copy=()=>structuredClone(fixture);
test('honest blocked project with known physical page is valid but never converted',()=>{
  const r=validateRecords(copy());
  assert.equal(r.ok,true);
  assert.equal(r.readiness.accountingComplete,true);
  assert.equal(r.readiness.conversionComplete,false);
  assert.equal(r.readiness.teachingComplete,false);
});
test('missing source does not increase supplied-source count',()=>{
  const f=copy();
  assert.equal(validateRecords(f).counts.sources,1);
  assert.equal(Object.keys(f.manifest.missingSources).length,3);
});
test('unknown schema version and root fields fail',()=>{
  for(const change of [f=>f.manifest.schemaVersion=2,f=>f.curriculum.claims={}]){
    const f=copy();
    change(f);
    assert.equal(validateRecords(f).ok,false);
  }
});
test('strict page identity prevents duplicated accounting under different keys',()=>{
  const f=copy();
  f.units.pages['source-a:2']=structuredClone(f.units.pages['source-a:1']);
  assert.equal(validateRecords(f).ok,false);
});
test('unsafe Windows and POSIX paths reject without filesystem access',()=>{
  for(const p of ['../x','/etc/passwd','C:/x','x\\y','a/../b','a//b','a\0b'])assert.equal(isSafePath(p),false,p);
  assert.equal(isSafePath('study/lessons/one.md'),true);
});
test('unknown evidence union variant rejected at record validation',()=>{
  const f=copy();
  f.manifest.issues['issue-a']={
    id:'issue-a',scopeRef:{
      kind:'claim',id:'x'
    },reason:'blocked',status:'open',resolutionRef:null
  };
  assert.equal(validateRecords(f).ok,false);
});
test('textbook exposure cannot unlock all channels',()=>{
  const f=copy();
  f.manifest.sources['source-a'].kind='textbook';
  f.manifest.sources['source-a'].exposure.agent='allow';
  assert.equal(validateRecords(f).ok,false);
});
test('prototype keys rejected as records',()=>{
  const f=copy();
  f.manifest.sources=JSON.parse('{"__proto__":{}}');
  assert.equal(validateRecords(f).ok,false);
  assert.equal({}.polluted,undefined);
});
test('record and markdown selectors have distinct resolution semantics',async t=>{
  const root=await mkdtemp(path.join(tmpdir(),'fd-own-contract-'));
  t.after(()=>rm(root,{
    recursive:true,force:true
  }));
  await writeFile(path.join(root,'r.json'),JSON.stringify({
    sources:{
      'source-a':{
        id:'source-a'
      }
    }
  }));
  await writeFile(path.join(root,'r.md'),'<a id="section"></a>\nActual content.');
  assert.equal((await resolveReference(root,{
    kind:'record',path:'r.json',id:'source-a'
  },copy())).ok,true);
  assert.equal((await resolveReference(root,{
    kind:'markdown',path:'r.md',anchor:'section'
  },copy())).ok,true);
  assert.equal((await resolveReference(root,{
    kind:'record',path:'r.md',id:'section'
  },copy())).ok,false);
});
test('project review hashes read current bytes, not status labels',async t=>{
  const root=await mkdtemp(path.join(tmpdir(),'fd-own-review-'));
  t.after(()=>rm(root,{
    recursive:true,force:true
  }));
  const f=copy(),bytes='original';
  f.manifest.sources['source-a'].sha256=sha256(bytes);
  f.manifest.sources['source-a'].byteLength=bytes.length;
  await mkdir(path.join(root,'context'));
  await writeFile(path.join(root,'context/source.pdf'),bytes);
  f.reviews.reviews['review-a']={
    id:'review-a',reviewer:'independent workflow reviewer',reviewedAt:'2026-10-21T00:00:00Z',subjectRefs:[{
      kind:'record',path:projectFiles.manifest,id:'source-a'
    }],inputHashes:[{
      path:projectFiles.manifest,sha256:'a'.repeat(64)
    }],verdict:'approved',evidenceRef:{
      kind:'markdown',path:'evidence.md',anchor:'review'
    }
  };
  await writeFile(path.join(root,'evidence.md'),'<a id="review"></a>\nWritten review.');
  for(const [name,file]of Object.entries(projectFiles)){
    await mkdir(path.dirname(path.join(root,file)),{
      recursive:true
    });
    await writeFile(path.join(root,file),JSON.stringify(f[name]));
  }
  const r=await validateProject(root);
  assert.equal(r.ok,false);
  assert.ok(r.errors.some(e=>e.code==='STALE_REVIEW'));
});

for (const subjectKind of ['lesson', 'concept']) {
  test(`Markdown-bound ${subjectKind} review requires transitive source and canonical hashes`, async t => {
    const root = await mkdtemp(path.join(tmpdir(), 'fd-markdown-review-'));
    t.after(() => rm(root, { recursive: true, force: true }));
    const records = copy();
    const original = 'synthetic original';
    const extraction = '<a id="unit"></a>\nVerified definition.\n';
    const teaching = '<a id="teaching"></a>\nDetailed authored explanation.\n';
    const source = records.manifest.sources['source-a'];
    source.sha256 = sha256(original);
    source.byteLength = Buffer.byteLength(original);
    const unit = {
      id: 'unit-a', sourceId: 'source-a', locator: { pdfPage: 1 },
      extractionRef: { kind: 'markdown', path: 'study/extraction.md', anchor: 'unit' },
      contentHash: sha256(extraction), status: 'verified', classification: 'substantive', issueIds: [],
    };
    records.units.units['unit-a'] = unit;
    records.units.pages['source-a:1'].unitIds = ['unit-a'];
    records.coverage.coverage['unit-a'] = {
      unitId: 'unit-a', lessonIds: [], outcomeIds: [], disposition: 'pending',
      reason: 'Not fully taught', reviewId: null,
    };
    const subject = subjectKind === 'lesson' ? {
      id: 'lesson-a', title: 'Lesson', path: 'study/teaching.md', lectureIds: [],
      sourceUnitIds: ['unit-a'], outcomeIds: [], conceptIds: [], prerequisiteIds: [],
      order: 1, reviewId: 'review-a', supplemental: true,
    } : {
      id: 'concept-a', title: 'Concept', path: 'study/teaching.md',
      evidenceRefs: [{ kind: 'source', unitId: 'unit-a' }], prerequisiteIds: [],
      order: 1, reviewId: 'review-a',
    };
    records.curriculum[subjectKind === 'lesson' ? 'lessons' : 'concepts'][subject.id] = subject;
    const review = {
      id: 'review-a', reviewer: 'Independent workflow reviewer', reviewedAt: '2026-10-21T00:00:00Z',
      subjectRefs: [{ kind: 'markdown', path: subject.path, anchor: 'teaching' }],
      inputHashes: [{ path: subject.path, sha256: sha256(teaching) }], verdict: 'approved',
      evidenceRef: { kind: 'markdown', path: 'study/review-evidence.md', anchor: 'review' },
    };
    records.reviews.reviews[review.id] = review;
    async function write(relative, bytes) {
      await mkdir(path.dirname(path.join(root, relative)), { recursive: true });
      await writeFile(path.join(root, relative), bytes);
    }
    for (const [name, relative] of Object.entries(projectFiles)) await write(relative, JSON.stringify(records[name]));
    await write(source.originalPath, original);
    await write(unit.extractionRef.path, extraction);
    await write(subject.path, teaching);
    await write('study/review-evidence.md', '<a id="review"></a>\nIndependent review findings.\n');
    const missing = await validateProject(root);
    assert.equal(missing.ok, false, 'A Markdown-only hash cannot approve a canonical teaching record');
    for (const relative of [projectFiles.curriculum, projectFiles.coverage, projectFiles.units,
      projectFiles.manifest, source.originalPath, unit.extractionRef.path]) {
      assert.ok(missing.errors.some(error => error.code === 'REVIEW_HASH' && error.path === relative), relative);
    }
    review.inputHashes = await Promise.all([subject.path, projectFiles.curriculum, projectFiles.coverage,
      projectFiles.units, projectFiles.manifest, source.originalPath, unit.extractionRef.path].map(async relative => ({
      path: relative, sha256: sha256(await readFile(path.join(root, relative))),
    })));
    await write(projectFiles.reviews, JSON.stringify(records.reviews));
    const valid = await validateProject(root);
    assert.equal(valid.ok, true, JSON.stringify(valid.errors));
    subject.title += ' changed after review';
    await write(projectFiles.curriculum, JSON.stringify(records.curriculum));
    const stale = await validateProject(root);
    assert.equal(stale.ok, false);
    assert.ok(stale.errors.some(error => error.code === 'STALE_REVIEW' && error.path === projectFiles.curriculum));
  });
}
