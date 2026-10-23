import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPilotAdapter, mapAsset, materializeAdapter } from '../../scripts/study-revalidate-pilot.mjs';
import { validateCapturedProject, validateProject, resolveCapturedReference, projectFiles, sha256 } from '../lib/contracts.mjs';
import { markdownAssets } from '../lib/assets.mjs';
import { readConfinedBytes } from '../lib/capture.mjs';
import { selectPublication } from '../lib/policy.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const falseReadiness = { accountingComplete: false, conversionComplete: false, teachingComplete: false };
let adapter;
before(async () => { adapter = await createPilotAdapter(root); });
function mutated(change) {
  const records = structuredClone(adapter.records), files = new Map(adapter.files);
  change(records, files);
  for (const [key, p] of Object.entries(projectFiles)) files.set(p, Buffer.from(JSON.stringify(records[key])));
  return { records, files, readBytes: async p => {
    assert(files.has(p), 'Not captured');
    return Buffer.from(files.get(p));
  } };
}
test('frozen pilot adapts exactly 44 byte-identical page/image pairs without promoting 49 provisional topics', async () => {
  assert.equal(adapter.pageEvidence.length, 44);
  assert.equal(adapter.provisionalRegionCount, 49);
  const result = await validateCapturedProject(adapter.readBytes, { contextBudget: false });
  assert(result.ok, JSON.stringify(result.errors));
  assert.deepEqual(result.readiness, falseReadiness);
  assert.equal(result.counts.unknownUnits, 44);
  assert.equal(result.counts.pages, 1043);
  assert.equal(result.counts.lessons, 0);
  assert.equal(Object.keys(adapter.records.reviews.reviews).length, 0);
  for (const page of adapter.pageEvidence) {
    assert.equal(sha256(await adapter.readBytes(page.adaptedMarkdownPath)), page.markdownSha256);
    assert.equal(sha256(await adapter.readBytes(page.adaptedImagePath)), page.imageSha256);
  }
});
test('disk validator and standalone CLI work without any OMX folder, plans or installed tools', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'fd-pilot-portable-test-'));
  try {
    await materializeAdapter(adapter, temp);
    const result = await validateProject(temp, { contextBudget: false });
    assert(result.ok, JSON.stringify(result.errors));
    assert.deepEqual(result.readiness, falseReadiness);
    await assert.rejects(readFile(path.join(temp, '.omx/ultragoal/brief.md')), { code: 'ENOENT' });
    for (const p of ['study/pilot', 'scripts/study-revalidate-pilot.mjs', 'study/lib/contracts.mjs', 'study/lib/source-qa.mjs', 'study/lib/capture.mjs', 'study/lib/assets.mjs', 'study/lib/policy.mjs']) {
      await mkdir(path.dirname(path.join(temp, p)), { recursive: true });
      await cp(path.join(root, p), path.join(temp, p), { recursive: true });
    }
    const resultCli = await promisify(execFile)(process.execPath, ['scripts/study-revalidate-pilot.mjs'], { cwd: temp, windowsHide: true });
    const output = JSON.parse(resultCli.stdout);
    assert.equal(output.verdict, 'PASS');
    assert.equal(output.legacyAudit, null);
    assert.deepEqual(output.readiness, falseReadiness);
  } finally { await rm(temp, { recursive: true, force: true }); }
});
for (const channel of ['browser', 'agent', 'export']) test(`${channel} projection and draft contain no unknown pilot evidence or textbook content`, async () => {
  for (const draft of [false, true]) {
    const selected = await selectPublication(adapter, { channel, draft });
    assert.equal(selected.items.length, 0);
    assert.equal(selected.payloads.size, 0);
    assert.equal(selected.omitted, 44);
  }
});
test('whole-page candidates cannot be marked verified while their substantive classification is unknown', async () => {
  const changed = mutated(records => {
    for (const unit of Object.values(records.units.units)) unit.status = 'verified';
  });
  const result = await validateCapturedProject(changed.readBytes, { contextBudget: false });
  assert(!result.ok);
  assert.equal(result.errors.filter(e => e.code === 'VERIFIED_UNIT').length, 44);
  assert.deepEqual(result.readiness, falseReadiness);
});
test('even asserting 44 substantive pages does not create topic coverage, missing conversions or reviewed teaching', async () => {
  const changed = mutated(records => {
    for (const unit of Object.values(records.units.units)) { unit.status = 'verified'; unit.classification = 'substantive'; }
    for (const page of Object.values(records.units.pages)) if (page.unitIds.length) page.status = 'verified';
  });
  const result = await validateCapturedProject(changed.readBytes, { contextBudget: false });
  assert(result.ok, JSON.stringify(result.errors));
  assert.deepEqual(result.readiness, falseReadiness);
  assert.equal(Object.values(changed.records.coverage.coverage).every(c => c.disposition === 'pending'), true);
});
test('source references resolve but explicitly report provisional units unavailable as verified evidence', async () => {
  for (const unit of Object.values(adapter.records.units.units)) {
    const source = await resolveCapturedReference(adapter.readBytes, { kind: 'source', unitId: unit.id }, adapter.records);
    assert(source.ok && !source.available);
    assert((await resolveCapturedReference(adapter.readBytes, unit.extractionRef, adapter.records)).ok);
  }
  assert(!(await resolveCapturedReference(adapter.readBytes,
    { kind: 'markdown', path: adapter.pageEvidence[0].adaptedMarkdownPath, anchor: 'invented-anchor' }, adapter.records)).ok);
});
test('same-size captured Markdown changes invalidate the unit hash independently of labels', async () => {
  const changed = mutated((records, files) => {
    const p = adapter.pageEvidence[0].adaptedMarkdownPath;
    files.set(p, Buffer.from(files.get(p).toString().replace('Financial', 'XFinancial').slice(1)));
  });
  const result = await validateCapturedProject(changed.readBytes, { contextBudget: false });
  assert(!result.ok);
  assert(result.errors.some(e => e.code === 'CONTENT_HASH'));
});
for (const [name, p] of [
  ['original', 'context/lecture slides/Lecture 3 Interest rates and bonds.pdf'],
  ['Markdown', 'study/pilot/lecture-3/pages/lecture-3-pdfPage-007.md'],
  ['image', 'study/pilot/lecture-3/assets/page-07.png'],
  ['raw extraction', 'study/pilot/lecture-3/extracted-layout.txt'],
  ['visual binding ledger', 'study/pilot/qa/view-bindings.json'],
  ['page accounting', 'study/pilot/page-accounting.json'],
  ['source cautions', 'study/pilot/source-issues.json'],
  ['historical lesson', 'study/pilot/lessons/pilot-compounding-discounting.md']
]) test(`${name} byte drift fails instead of regenerating a binding`, async () => {
  await assert.rejects(createPilotAdapter(root, { readBytes: async candidate => {
    const bytes = await readConfinedBytes(root, candidate);
    if (candidate !== p) return bytes;
    const changed = Buffer.from(bytes); changed[0] ^= 1; return changed;
  } }));
});
test('asset remapping preserves bytes and exact relative mapping; wrong image cannot be substituted', async () => {
  const bytes = Buffer.from('<a id="page"></a>Evidence\n![Original](../assets/page.png)');
  assert.equal(mapAsset(bytes, 'study/pilot/l3/pages/page.md', 'study/pilot/l3/assets/page.png'),
    'study/evidence/pilot/l3/assets/page.png');
  assert.throws(() => mapAsset(bytes, 'study/pilot/l3/pages/page.md', 'study/pilot/l3/assets/other.png'));
  assert.throws(() => markdownAssets(bytes, 'study/pilot/l3/pages/page.md'), /outside evidence/);
  for (const target of ['https://example.invalid/a.png', '/etc/a.png', '../../../../outside.png', '../assets/a.svg', '../assets/a.png?x', '..\\a.png']) {
    assert.throws(() => markdownAssets(Buffer.from(`![Original](${target})`), 'study/evidence/pilot/page.md'));
  }
});
// Isolated policy fixture, not an ingestion-managed extraction or semantic QA approval.
test('synthetic textbook canary remains private even with verified extraction and browser/agent/public drafts', async () => {
  const changed = mutated((records, files) => {
    const id = 'synthetic-private-textbook-span', p = 'study/private/textbook-hull-11/canary.md';
    const bytes = Buffer.from('<a id="canary"></a>SYNTHETIC-PRIVATE-TEXTBOOK-CANARY-NOT-REAL-CONTENT');
    files.set(p, bytes);
    records.units.units[id] = { id, sourceId: 'textbook-hull-11', locator: { pdfPage: 1, region: 'Synthetic privacy fixture, not actual textbook content' },
      extractionRef: { kind: 'markdown', path: p, anchor: 'canary' }, contentHash: sha256(bytes), status: 'verified', classification: 'substantive', issueIds: [] };
    records.coverage.coverage[id] = { unitId: id, lessonIds: [], outcomeIds: [], disposition: 'pending', reason: 'Synthetic privacy test only', reviewId: null };
    records.units.pages['textbook-hull-11:1'] = { sourceId: 'textbook-hull-11', pdfPage: 1, status: 'verified', unitIds: [id], issueIds: [] };
  });
  const result = await validateCapturedProject(changed.readBytes, { contextBudget: false });
  assert(result.ok, JSON.stringify(result.errors));
  for (const channel of ['browser', 'agent', 'export']) {
    const selected = await selectPublication(changed, { channel, draft: true });
    assert.equal(selected.items.length, 0);
    assert.equal(selected.payloads.size, 0);
  }
});
test('synthetic public-unit policy control projects only its exact bound Markdown and raster asset', async () => {
  // This policy fixture toggles a status only to test projection mechanics, not semantic certification.
  const page = adapter.pageEvidence[0];
  const changed = mutated(records => {
    records.units.units[page.sourceUnitId].status = 'verified';
    records.units.units[page.sourceUnitId].classification = 'administrative';
  });
  const selected = await selectPublication(changed, { channel: 'browser', draft: true });
  assert.equal(selected.items.length, 1);
  assert.equal(selected.items[0].id, page.sourceUnitId);
  assert.equal(selected.payloads.size, 2);
  const image = [...selected.payloads].find(([p]) => p.startsWith('assets/'));
  assert.equal(sha256(image[1]), page.imageSha256);
  const content = selected.payloads.get(selected.items[0].output).toString();
  assert(content.includes('../' + image[0]));
  assert(!content.includes('SYNTHETIC-PRIVATE-TEXTBOOK-CANARY'));
  assert.equal((await selectPublication(changed, { channel: 'export', draft: true })).items.length, 0);
});
test('remaining transcript accounting and companions stay pending rather than inventing week-to-lecture mapping', () => {
  const transcripts = Object.values(adapter.records.manifest.sources).filter(s => s.kind === 'transcript');
  assert.equal(transcripts.length, 3);
  assert(transcripts.every(s => s.pageCount === null && s.extractionStatus === 'pending'));
  assert.deepEqual(adapter.records.units.transcriptAssociations, {});
  assert.equal(Object.keys(adapter.records.manifest.missingSources).length, 3);
  assert.equal(Object.values(adapter.records.manifest.sources).filter(s => s.pageCount === null).length, 3);
});
