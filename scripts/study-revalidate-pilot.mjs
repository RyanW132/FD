#!/usr/bin/env node
// A bounded adapter test, never a production import or granular-fidelity approval.
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { sha256, projectFiles, validateProject, validateCapturedProject, resolveCapturedReference } from '../study/lib/contracts.mjs';
import { readConfinedBytes } from '../study/lib/capture.mjs';
import { markdownAssets } from '../study/lib/assets.mjs';
import { selectPublication } from '../study/lib/policy.mjs';
const execute = promisify(execFile);
const frozen = {
  'study/pilot/inventory.json': 'b9529a66324a3a8f6518ea2ec5a8c49a71fa18609c76ff7dc2ffe2f0bfcd4b89',
  'study/pilot/page-accounting.json': '469b5be22038cca0d9076b57b4e251a70303c2d7cb9874c17709805243ade731',
  'study/pilot/substantive-regions.json': 'fff5bbfeeca4f27e1b8401ef18b3a712b80f4b71520211f0f5af38a8874fa8c0',
  'study/pilot/source-issues.json': '8227461d11f76978e75c72f7497d4a86323ac5a30dae45ee05b5ff30ef29d13a',
  'study/pilot/qa/view-bindings.json': '337ed716abd608397a6dcb00a83aabe154017898cecdc11f490d827a81f5e7e6',
  'study/pilot/qa/visual-review.json': '4315511f108c33a9899e650251982c6d6c78d22f3561505de47f6620686339b4',
  'study/pilot/qa/lesson-review.md': 'a79c8b35ef89169d4694975435d5a2749cc101f43273e9f0b7a9d2607647f742',
  'study/pilot/qa/lesson-review.checks.json': '099b8fb94d07a50ac8c6373e82f563e0dd4fc9ced673f8211245e10f4da1b812',
  'study/pilot/qa/verify-pilot.py': '9eff477b43c401152fd3fed973b259c3533f89c92b7e24cc9eb1ab705c3ea14d',
  'study/pilot/qa/lesson-review.py': '46935bfd879d58a66d85116d20290f47fbfba66cee89970efa473dc56d8102e6'
};
const remap = p => p.replace(/^study\/pilot\//, 'study/evidence/pilot/');
const pendingReadiness = { accountingComplete: false, conversionComplete: false, teachingComplete: false };
const expectedIds = new Set([
  ...Array.from({ length: 41 }, (_, i) => `lecture-3-pdfPage-${String(i + 1).padStart(3, '0')}`),
  'seminar-2-problems-pdfPage-001', 'seminar-2-problems-pdfPage-002', 'lecture-1-pdfPage-026'
]);
async function fileMembership(root, directory) {
  const result = [];
  for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
    const relative = `${directory}/${entry.name}`;
    assert(!entry.isSymbolicLink(), `Symlink in frozen evidence: ${relative}`);
    if (entry.isDirectory()) result.push(...await fileMembership(root, relative));
    else if (entry.isFile()) result.push(relative);
    else throw Error(`Unsupported evidence entry: ${relative}`);
  }
  return result.sort();
}
export function mapAsset(bytes, oldPath, oldImagePath) {
  // Only the root prefix changes. The copied Markdown and image bytes do not.
  const assets = markdownAssets(bytes, remap(oldPath));
  assert.equal(assets.length, 1, 'Exactly one original-page asset required');
  assert.equal(assets[0].target, remap(oldImagePath), 'Asset must resolve to its bound original image');
  return assets[0].target;
}
export async function createPilotAdapter(root, { readBytes = p => readConfinedBytes(root, p) } = {}) {
  const files = new Map();
  const inputHashes = {};
  async function read(p) {
    const bytes = await readBytes(p);
    inputHashes[p] = sha256(bytes);
    return bytes;
  }
  for (const [p, digest] of Object.entries(frozen)) assert.equal(sha256(await read(p)), digest, `Frozen evidence drift: ${p}`);
  const json = async p => JSON.parse(await read(p));
  const inventory = await json('study/pilot/inventory.json');
  const pages = (await json('study/pilot/page-accounting.json')).pages;
  const regions = (await json('study/pilot/substantive-regions.json')).pages;
  const bindings = await json('study/pilot/qa/view-bindings.json');
  const visual = await json('study/pilot/qa/visual-review.json');
  const lessonChecks = await json('study/pilot/qa/lesson-review.checks.json');
  const canonical = await json(projectFiles.manifest);
  assert.equal(inventory.sources.length, 13);
  assert.deepEqual(new Set(pages.map(p => p.id)), expectedIds);
  assert.equal(pages.length, 44);
  assert.equal(bindings.pages.length, 44);
  assert.equal(visual.verdict, 'PASS');
  assert.equal(visual.pages.length, 44);
  assert.equal(lessonChecks.automatedChecksVerdict, 'PASS');
  assert.equal(lessonChecks.checkCount, 110);
  const originals = [];
  const manifest = { schemaVersion: 1, sources: {}, issues: {}, missingSources: {} };
  const units = { schemaVersion: 1, pages: {}, units: {}, transcriptAssociations: {} };
  const coverage = { schemaVersion: 1, coverage: {} };
  const curriculum = { schemaVersion: 1, lectures: {}, lessons: {}, concepts: {}, outcomes: {}, exercises: {}, links: {} };
  for (const source of inventory.sources) {
    const bytes = await read(source.originalPath);
    assert.equal(sha256(bytes), source.sha256, `Original drift: ${source.id}`);
    assert.equal(bytes.length, source.bytes);
    files.set(source.originalPath, bytes);
    const tracked = canonical.sources[source.id];
    assert(tracked, `Missing canonical identity ${source.id}`);
    assert.equal(tracked.sha256, source.sha256);
    assert.equal(tracked.byteLength, source.bytes);
    assert.equal(tracked.originalPath, source.originalPath);
    assert.equal(tracked.pageCount, source.pdfPageCount ?? null);
    assert.deepEqual(tracked.exposure, source.access.channels);
    const kind = ({ 'seminar-solutions': 'solution', 'seminar-problems': 'seminar' })[source.kind] ?? source.kind;
    assert.equal(tracked.kind, kind);
    manifest.sources[source.id] = {
      id: source.id, kind, originalPath: source.originalPath,
      sha256: source.sha256, byteLength: source.bytes, access: 'permitted',
      exposure: source.access.channels, extractionStatus: 'pending', tool: null,
      pageCount: source.pdfPageCount ?? null, derivedRevision: null, issueIds: []
    };
    for (let n = 1; n <= (source.pdfPageCount ?? 0); n++) units.pages[`${source.id}:${n}`] = {
      sourceId: source.id, pdfPage: n, status: 'pending', unitIds: [], issueIds: []
    };
    if (source.kind === 'transcript') {
      const lines = bytes.toString('utf8').split(/\r?\n/).length - (bytes.at(-1) === 10 ? 1 : 0);
      assert.equal(lines, source.originalLineCount);
    }
    // No textbook filename or content in the public report.
    originals.push({ sourceId: source.id, sha256: source.sha256, byteLength: bytes.length });
  }
  assert.deepEqual((await fileMembership(root, 'context')).filter(p => !p.endsWith('/.DS_Store')),
    inventory.sources.map(s => s.originalPath).sort());
  for (const [id, label, expectedKind] of [
    ['missing-transcript-4', 'Week 4 transcript', 'transcript'],
    ['missing-seminar-3-solutions', 'Seminar 3 official solutions', 'solution'],
    ['missing-syllabus', 'Syllabus and official learning outcomes', 'syllabus']
  ]) manifest.missingSources[id] = { id, label, expectedKind, reason: 'Not supplied; no invented content.' };
  const rawFiles = {};
  for (const [sid, p] of [
    ['lecture-3', 'study/pilot/lecture-3/extracted-layout.txt'],
    ['seminar-2-problems', 'study/pilot/seminar-2-problems/extracted-layout.txt'],
    ['lecture-1', 'study/pilot/figure-sample/extracted-layout.txt']
  ]) rawFiles[sid] = (await read(p)).toString('utf8');
  const pageEvidence = [];
  for (const page of pages) {
    const md = await read(page.markdownPath), image = await read(page.imagePath);
    const binding = bindings.pages.find(p => p.pageId === page.id);
    const visualBinding = visual.pages.find(p => p.pageId === page.id);
    assert(binding && visualBinding, 'Missing independent visual binding');
    for (const candidate of [page, binding, visualBinding]) {
      assert.equal(candidate.markdownPath, page.markdownPath);
      assert.equal(candidate.imagePath, page.imagePath);
      assert.equal(candidate.markdownSha256, sha256(md), `Markdown drift: ${page.id}`);
      assert.equal(candidate.imageSha256, sha256(image), `Image drift: ${page.id}`);
    }
    const text = md.toString('utf8');
    const raw = page.sourceId === 'lecture-1' ? rawFiles['lecture-1'].replace(/\f+$/, '') : rawFiles[page.sourceId].split('\f')[page.pdfPage - 1];
    assert.equal(sha256(Buffer.from(raw)), page.extractedTextSha256, `Raw extraction drift: ${page.id}`);
    assert(text.includes('```text\n' + raw + '```'), `Complete raw page absent: ${page.id}`);
    assert(text.includes(`pdfPage:${page.pdfPage}`));
    assert(text.includes(manifest.sources[page.sourceId].sha256));
    assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    const asset = mapAsset(md, page.markdownPath, page.imagePath);
    files.set(remap(page.markdownPath), md); files.set(asset, image);
    const id = 'pilot-' + page.id.toLowerCase().replace('pdfpage', 'page');
    units.units[id] = {
      id, sourceId: page.sourceId,
      locator: { pdfPage: page.pdfPage, region: 'Whole-page provisional candidate; granular topics unreviewed' },
      extractionRef: { kind: 'markdown', path: remap(page.markdownPath), anchor: page.id },
      contentHash: sha256(md), status: 'needs-review', classification: 'unknown', issueIds: []
    };
    units.pages[`${page.sourceId}:${page.pdfPage}`] = {
      sourceId: page.sourceId, pdfPage: page.pdfPage, status: 'needs-review', unitIds: [id], issueIds: []
    };
    coverage.coverage[id] = {
      unitId: id, lessonIds: [], outcomeIds: [], disposition: 'pending',
      reason: 'Image preservation reused by exact hash only; whole-page discovery is not granular source fidelity or teaching coverage.', reviewId: null
    };
    assert(regions.some(p => p.pageId === page.id));
    pageEvidence.push({ pageId: page.id, sourceId: page.sourceId, pdfPage: page.pdfPage,
      rawTextSha256: page.extractedTextSha256, markdownSha256: sha256(md), imageSha256: sha256(image),
      adaptedMarkdownPath: remap(page.markdownPath), adaptedImagePath: asset, sourceUnitId: id,
      status: 'needs-review', classification: 'unknown' });
  }
  const issues = (await json('study/pilot/source-issues.json')).issues;
  assert.equal(issues.length, 4);
  for (const issue of issues) {
    const page = pageEvidence.find(p => p.pageId === issue.pageId);
    const id = issue.id;
    manifest.issues[id] = {
      id, scopeRef: { kind: 'source', unitId: page.sourceUnitId }, reason: issue.correctionNotOriginal,
      status: 'open', resolutionRef: null
    };
    units.units[page.sourceUnitId].issueIds.push(id);
    units.pages[`${page.sourceId}:${page.pdfPage}`].issueIds.push(id);
    manifest.sources[page.sourceId].issueIds.push(id);
  }
  // Revalidate the actual historical lesson/source hash closure, not a new review identity.
  for (const [p, digest] of Object.entries(lessonChecks.hashes)) {
    if (p.startsWith('.omx/')) continue; // Historical workflow evidence, not portable product input.
    assert.equal(sha256(await read(p)), digest, `Historical lesson input drift: ${p}`);
  }
  assert.equal(bindings.sourceIssueRegistrySha256, inputHashes['study/pilot/source-issues.json']);
  const readBytesCaptured = async p => {
    assert(files.has(p), `Path not captured by adapter: ${p}`);
    return Buffer.from(files.get(p));
  };
  const records = { manifest, units, coverage, curriculum,
    reviews: { schemaVersion: 1, reviews: {} }, exposureExceptions: { schemaVersion: 1, exceptions: {} } };
  for (const [key, p] of Object.entries(projectFiles)) files.set(p, Buffer.from(JSON.stringify(records[key], null, 2) + '\n'));
  return { records, files, readBytes: readBytesCaptured, inputHashes, originals, pageEvidence,
    provisionalRegionCount: regions.reduce((n, p) => n + p.provisionalRegions.length, 0) };
}
export async function materializeAdapter(adapter, destination) {
  for (const [p, bytes] of adapter.files) {
    await mkdir(path.dirname(path.join(destination, p)), { recursive: true });
    await writeFile(path.join(destination, p), bytes);
  }
}
async function legacyAudit(root) {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'fd-pilot-historical-'));
  try {
    // Only actual available historical evidence is copied; nothing is synthesized.
    for (const p of ['study/pilot', 'context', '.omx/tools/poppler', '.omx/artifacts/source-preflight/inventory.json',
      '.omx/plans/test-spec-fd-study-helper.md', '.omx/ultragoal/brief.md']) {
      await mkdir(path.dirname(path.join(temp, p)), { recursive: true });
      await cp(path.join(root, p), path.join(temp, p), { recursive: true });
    }
    const runs = [];
    for (const script of ['verify-pilot.py', 'lesson-review.py']) {
      const command = ['python3', `study/pilot/qa/${script}`];
      const result = await execute(command[0], command.slice(1), { cwd: temp, windowsHide: true, maxBuffer: 2 * 1024 * 1024 });
      const output = JSON.parse(result.stdout);
      assert.equal(output.verdict, 'PASS');
      runs.push({ command: command.join(' '), verdict: output.verdict, checks: output.checks ?? null,
        pagesActuallyViewedHistorical: output.pagesActuallyViewed ?? null, stdoutSha256: sha256(result.stdout) });
    }
    return { scope: 'Unchanged historical scripts run against a disposable exact-byte mirror; mechanical replay, not a new visual or teaching review.', runs };
  } finally { await rm(temp, { recursive: true, force: true }); }
}
export async function revalidatePilot(root, { legacy = false } = {}) {
  const implementationHashes = {};
  for (const p of ['scripts/study-revalidate-pilot.mjs', 'study/lib/contracts.mjs', 'study/lib/source-qa.mjs', 'study/lib/capture.mjs', 'study/lib/assets.mjs', 'study/lib/policy.mjs']) implementationHashes[p] = sha256(await readFile(path.join(root, p)));
  const before = {};
  for (const p of await fileMembership(root, 'study/pilot')) before[p] = sha256(await readConfinedBytes(root, p));
  const adapter = await createPilotAdapter(root);
  const captured = await validateCapturedProject(adapter.readBytes, { contextBudget: false });
  assert(captured.ok, JSON.stringify(captured.errors));
  assert.deepEqual(captured.readiness, pendingReadiness);
  const temp = await mkdtemp(path.join(os.tmpdir(), 'fd-pilot-contract-'));
  let disk;
  try {
    await materializeAdapter(adapter, temp);
    disk = await validateProject(temp, { contextBudget: false });
    assert(disk.ok, JSON.stringify(disk.errors));
    assert.deepEqual(disk.readiness, pendingReadiness);
  } finally { await rm(temp, { recursive: true, force: true }); }
  for (const unit of Object.values(adapter.records.units.units)) {
    const ref = await resolveCapturedReference(adapter.readBytes, unit.extractionRef, adapter.records);
    assert(ref.ok, ref.error);
    const source = await resolveCapturedReference(adapter.readBytes, { kind: 'source', unitId: unit.id }, adapter.records);
    assert(source.ok && !source.available, 'Unknown whole-page candidate cannot become verified evidence');
  }
  const projection = {};
  for (const channel of ['browser', 'agent', 'export']) {
    const selected = await selectPublication(adapter, { channel, draft: true });
    assert.equal(selected.items.length, 0, 'Unreviewed whole-page candidates must not publish');
    assert.equal(selected.payloads.size, 0);
    projection[channel] = { selectedItems: 0, payloads: 0, omittedCandidates: selected.omitted };
  }
  const audit = legacy ? await legacyAudit(root) : null;
  for (const [p, digest] of Object.entries(before)) assert.equal(sha256(await readConfinedBytes(root, p)), digest, `Frozen pilot changed during verification: ${p}`);
  assert.deepEqual(await fileMembership(root, 'study/pilot'), Object.keys(before).sort());
  for (const [p, digest] of Object.entries(implementationHashes)) assert.equal(sha256(await readFile(path.join(root, p))), digest, `Implementation changed during verification: ${p}`);
  return {
    schemaVersion: 1, verdict: 'PASS', scope: 'Frozen 44-page pilot integrity and incomplete isolated contract adapter only; not a production import or faithful semantic-math/teaching certification.',
    command: 'node scripts/study-revalidate-pilot.mjs' + (legacy ? ' --legacy-audit' : ''),
    originalHashes: adapter.originals, pages: adapter.pageEvidence,
    inputHashes: Object.fromEntries(Object.entries(adapter.inputHashes).filter(([p]) => !p.startsWith('context/'))),
    implementationHashes, checks: { originalCount: 13, exactPageLocators: 44, rawTextHashBindings: 44,
      markdownHashBindings: 44, imageHashBindings: 44, independentVisualBindingsReused: 44,
      provisionalRegionsNotPromoted: adapter.provisionalRegionCount, canonicalPdfPageAccounts: Object.keys(adapter.records.units.pages).length,
      sourceIssueCautionsPreserved: 4, historicalLessonChecks: 110, frozenPilotFilesUnchanged: Object.keys(before).length,
      capturedValidation: captured, diskValidation: disk, projection },
    readiness: pendingReadiness, legacyAudit: audit,
    remainingG5Gates: [
      'Split each page into independently locatable definitions, propositions, derivations, examples, tables and figures; independently review classifications and exclusions. The 49 provisional regions on 44 pages are not that taxonomy.',
      'Reconcile signs, powers, fractions, subscripts, summations and denominator scope against original images. Raw flattened math remains untrusted; image preservation is the only reused visual claim.',
      'Create accessible semantic tables and figure descriptions, normalize extraction glyphs only in labelled derived text, and bind all changed bytes to fresh review.',
      'Preserve L3 p11 corrected-rate labels, L3 p16 matched conventions, L1 p26 Profit/payoff distinction and seminar 2 Q7 unresolved cashflow conventions.',
      'Convert remaining permitted course pages and account for all transcript lines without inferring lecture mapping from week numbers. All absent extractions remain pending; three missing companions remain absent.',
      'Keep textbook extraction deferred/private with browser, agent and export denied. This adapter hashes its unchanged original for integrity, never extracts or publishes its content.',
      'The provisional lesson review is reused only for its existing exact input bytes. New production metadata, source units, coverage and teaching require fresh independent review; no learner mastery is claimed.'
    ]
  };
}
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const args = process.argv.slice(2);
    assert(args.every(a => ['--legacy-audit', '--write-report'].includes(a)), 'Usage: node scripts/study-revalidate-pilot.mjs [--legacy-audit] [--write-report]');
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const report = await revalidatePilot(root, { legacy: args.includes('--legacy-audit') });
    if (args.includes('--write-report')) {
      const json = 'study/test/pilot-revalidation-report.json';
      await writeFile(path.join(root, json), JSON.stringify(report, null, 2) + '\n');
      await writeFile(path.join(root, 'study/test/pilot-revalidation-report.md'),
        '# Frozen pilot contract revalidation\n\n## Verdict\nPASS — bounded integrity and incomplete isolated adapter only. **Not production conversion, semantic math fidelity or comprehensive teaching.**\n\n## Evidence\n' +
        `- Reproduce: \`${report.command}\`. Optional historical replay uses real locally available historical inputs in a disposable mirror; ordinary validation needs no OMX.\n` +
        '- All 13 original hashes, 44 raw page/text/image bindings, 44 independent visual bindings and 4 source cautions remain exact. Both current captured and disk validators pass.\n' +
        '- 1043 physical page accounts remain truthful; 44 whole-page candidates are needs-review/unknown, with pending coverage and no production reviews. All three readiness flags remain false.\n' +
        '- Browser, agent and export projections select zero items/payloads, including drafts. Textbook bytes are only integrity-hashed, never extracted or exposed.\n' +
        `- Exact input, adapter mapping and implementation hashes: [machine evidence](pilot-revalidation-report.json). Frozen pilot files unchanged: ${report.checks.frozenPilotFilesUnchanged}.\n` +
        (report.legacyAudit ? '- Both unchanged historical Python checkers passed in the mirror (44 preserved images, 110 lesson checks); no new visual/rubric review is inferred.\n' : '- Historical Python replay not requested in this run.\n') +
        '\n## Gaps / G5 prerequisites\n' + report.remainingG5Gates.map(x => '- ' + x).join('\n') +
        '\n\n## Risks\nThis adapter tests honest incomplete representation, not whether arbitrary whole-page promotion is semantically justified. Validators cannot replace independent topic splitting, source QA, provenance review or teaching review. No production records or frozen evidence were changed.\n');
    }
    process.stdout.write(JSON.stringify({ verdict: report.verdict, checks: report.checks, readiness: report.readiness, legacyAudit: report.legacyAudit }, null, 2) + '\n');
  } catch (error) { process.stderr.write(`Pilot revalidation failed: ${error.message}\n`); process.exitCode = 1; }
}
