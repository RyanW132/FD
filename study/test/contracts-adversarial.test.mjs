import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, readFile, rm, symlink, stat, utimes } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { validateRecords, validateProject, resolveReference } from '../lib/contracts.mjs';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const original = '%PDF-1.4\nsynthetic source, not user content\n';
const extraction = '<a id="unit-one"></a>\nA definition.\n\n<a id="unit-two"></a>\nA distinct equation.\n';
const markdown = (path, anchor) => ({ kind: 'markdown', path, anchor });
const sourceRef = unitId => ({ kind: 'source', unitId });
const recordRef = (path, id) => ({ kind: 'record', path, id });

function pendingRecords() {
  return {
    manifest: { schemaVersion: 1, sources: {
      'lecture-one': {
        id: 'lecture-one', kind: 'lecture', originalPath: 'context/synthetic.pdf',
        sha256: digest(original), byteLength: Buffer.byteLength(original), access: 'permitted',
        exposure: { browser: 'allow', export: 'deny', agent: 'deny' },
        extractionStatus: 'pending', tool: null, pageCount: 1, derivedRevision: null, issueIds: [],
      },
    }, issues: {}, missingSources: {} },
    units: { schemaVersion: 1, pages: {
      'lecture-one:1': { sourceId: 'lecture-one', pdfPage: 1, status: 'pending', unitIds: ['unit-one'], issueIds: [] },
    }, units: {
      'unit-one': { id: 'unit-one', sourceId: 'lecture-one', locator: { pdfPage: 1 }, extractionRef: null,
        contentHash: null, status: 'pending', classification: 'unknown', issueIds: [] },
    }, transcriptAssociations: {} },
    coverage: { schemaVersion: 1, coverage: {
      'unit-one': { unitId: 'unit-one', lessonIds: [], outcomeIds: [], disposition: 'pending', reason: 'Awaiting extraction', reviewId: null },
    } },
    curriculum: { schemaVersion: 1, lectures: {
      'lecture-one': { id: 'lecture-one', title: 'Synthetic lecture', sourceId: 'lecture-one', lessonIds: [] },
    }, lessons: {}, outcomes: {}, exercises: {}, concepts: {}, links: {} },
    reviews: { schemaVersion: 1, reviews: {} },
    exposureExceptions: { schemaVersion: 1, exceptions: {} },
  };
}

function assertRejected(records, description) {
  const result = validateRecords(records);
  assert.equal(result.ok, false, `${description}: ${JSON.stringify(result)}`);
  assert.ok(result.errors.length > 0, 'Rejection includes actionable errors');
}

async function fixture(t, records = pendingRecords(), extraFiles = {}) {
  const root = await mkdtemp(join(tmpdir(), 'fd-contract-adversarial-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const files = {
    'study/sources/manifest.json': JSON.stringify(records.manifest),
    'study/sources/units.json': JSON.stringify(records.units),
    'study/sources/coverage.json': JSON.stringify(records.coverage),
    'study/curriculum.json': JSON.stringify(records.curriculum),
    'study/reviews.json': JSON.stringify(records.reviews),
    'study/exposure-exceptions.json': JSON.stringify(records.exposureExceptions),
    'context/synthetic.pdf': original,
    'study/extracted/lecture-one.md': extraction,
    ...extraFiles,
  };
  for (const [path, bytes] of Object.entries(files)) {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), bytes);
  }
  return { root, records };
}

test('pending unknown-classification unit is structurally valid but not converted or taught', () => {
  const result = validateRecords(pendingRecords());
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.conversionComplete, false);
  assert.equal(result.readiness.teachingComplete, false);
});

test('blocked known page may honestly have no identified units', () => {
  const records = pendingRecords();
  records.manifest.sources['lecture-one'].access = 'blocked';
  records.manifest.sources['lecture-one'].extractionStatus = 'blocked';
  records.units.pages['lecture-one:1'].status = 'blocked';
  records.units.pages['lecture-one:1'].unitIds = [];
  records.units.units = {};
  records.coverage.coverage = {};
  const result = validateRecords(records);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.conversionComplete, false);
  assert.equal(result.readiness.teachingComplete, false);
});

test('unknown PDF count remains source-level unresolved without fabricated pages', () => {
  const records = pendingRecords();
  const source = records.manifest.sources['lecture-one'];
  source.pageCount = null;
  source.access = 'blocked';
  source.extractionStatus = 'blocked';
  source.issueIds = ['issue-count'];
  records.manifest.issues['issue-count'] = { id: 'issue-count',
    scopeRef: recordRef('study/sources/manifest.json', 'lecture-one'), reason: 'Page count unavailable', status: 'open', resolutionRef: null };
  records.units.pages = {};
  records.units.units = {};
  records.coverage.coverage = {};
  const result = validateRecords(records);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.accountingComplete, false);
  assert.equal(result.readiness.conversionComplete, false);
  assert.equal(result.readiness.teachingComplete, false);
});

for (const [name, mutate] of [
  ['null content hash', unit => { unit.contentHash = null; }],
  ['null extraction reference', unit => { unit.extractionRef = null; }],
  ['unknown classification', unit => { unit.classification = 'unknown'; }],
  ['out-of-bounds physical page', unit => { unit.locator.pdfPage = 2; }],
]) {
  test(`verified unit rejects ${name}`, () => {
    const records = pendingRecords();
    const unit = records.units.units['unit-one'];
    Object.assign(unit, { status: 'verified', classification: 'substantive', contentHash: digest(extraction),
      extractionRef: markdown('study/extracted/lecture-one.md', 'unit-one') });
    mutate(unit);
    assertRejected(records, name);
  });
}

test('missing companion cannot carry forged original/hash fields or count as a source', () => {
  const records = pendingRecords();
  records.manifest.missingSources['missing-solutions'] = { id: 'missing-solutions', label: 'Missing solutions',
    expectedKind: 'solution', reason: 'Not supplied' };
  const valid = validateRecords(records);
  assert.equal(valid.ok, true, JSON.stringify(valid.errors));
  records.manifest.missingSources['missing-solutions'].sha256 = 'a'.repeat(64);
  records.manifest.missingSources['missing-solutions'].originalPath = 'context/imagined.pdf';
  assertRejected(records, 'Missing record is not an invented original');
});

for (const [name, mutate] of [
  ['source exposure', records => { records.manifest.sources['lecture-one'].exposure.extra = 'allow'; }],
  ['unit locator', records => { records.units.units['unit-one'].locator.offset = 1; }],
  ['source tool', records => { records.manifest.sources['lecture-one'].tool = { name: 'fixture', version: '1', configHash: 'a'.repeat(64), execute: 'bad' }; }],
  ['coverage', records => { records.coverage.coverage['unit-one'].approved = true; }],
]) {
  test(`closed schemas reject unknown nested ${name} fields`, () => {
    const records = pendingRecords();
    mutate(records);
    assertRejected(records, `Unexpected ${name} field`);
  });
}

test('prototype-polluting JSON keys are rejected without changing global objects', () => {
  const records = pendingRecords();
  records.units.units['unit-one'].locator = JSON.parse('{"pdfPage":1,"__proto__":{"polluted":true}}');
  assertRejected(records, 'Prototype key');
  assert.equal({}.polluted, undefined);
});

for (const path of ['../outside.md', '/tmp/outside.md', 'C:/outside.md', 'study\\outside.md', 'study/bad\0name.md']) {
  test(`Markdown reference rejects unsafe path ${JSON.stringify(path)}`, async t => {
    const { root, records } = await fixture(t);
    const result = await resolveReference(root, markdown(path, 'unit-one'), records);
    assert.equal(result.ok, false, JSON.stringify(result));
  });
}

test('reference union rejects record IDs disguised as Markdown anchors', async t => {
  const { root, records } = await fixture(t);
  const result = await resolveReference(root, { kind: 'markdown', path: 'study/curriculum.json', id: 'lecture-one' }, records);
  assert.equal(result.ok, false, JSON.stringify(result));
});

test('Markdown anchor resolution rejects duplicate explicit anchors', async t => {
  const { root, records } = await fixture(t, pendingRecords(), {
    'study/duplicate.md': '<a id="same"></a>\nFirst\n<a id="same"></a>\nSecond\n',
  });
  assert.equal((await resolveReference(root, markdown('study/duplicate.md', 'same'), records)).ok, false);
});

test('Markdown anchor must exist rather than matching nearby prose', async t => {
  const { root, records } = await fixture(t);
  assert.equal((await resolveReference(root, markdown('study/extracted/lecture-one.md', 'absent'), records)).ok, false);
});

test('source reference can resolve pending locator without inventing verified extraction', async t => {
  const { root, records } = await fixture(t);
  const result = await resolveReference(root, sourceRef('unit-one'), records);
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(result.unit.status, 'pending');
  assert.equal(result.unit.extractionRef, null);
});

test('realpath confinement rejects a Markdown symlink outside fixture root', async t => {
  const { root, records } = await fixture(t);
  const outside = await mkdtemp(join(tmpdir(), 'fd-outside-'));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await writeFile(join(outside, 'secret.md'), '<a id="secret"></a>\nOutside root\n');
  await symlink(join(outside, 'secret.md'), join(root, 'study', 'escape.md'));
  const result = await resolveReference(root, markdown('study/escape.md', 'secret'), records);
  assert.equal(result.ok, false, JSON.stringify(result));
});

function teachingRecords() {
  const records = pendingRecords();
  const source = structuredClone(records.manifest.sources['lecture-one']);
  const unit = structuredClone(records.units.units['unit-one']);
  for (const suffix of ['one', 'two', 'three', 'four']) {
    const sourceId = `lecture-${suffix}`, unitId = `unit-${suffix}`;
    records.manifest.sources[sourceId] = { ...structuredClone(source), id: sourceId,
      extractionStatus: 'complete', tool: { name: 'synthetic', version: '1', configHash: digest('config') }, derivedRevision: digest('revision') };
    records.units.units[unitId] = { ...structuredClone(unit), id: unitId, sourceId, status: 'verified', classification: 'substantive',
      extractionRef: markdown('study/extracted/lecture-one.md', 'unit-one'), contentHash: digest(extraction) };
    records.units.pages[`${sourceId}:1`] = { sourceId, pdfPage: 1, status: 'verified', unitIds: [unitId], issueIds: [] };
    records.coverage.coverage[unitId] = { unitId, lessonIds: ['lesson-one'], outcomeIds: ['outcome-one'],
      disposition: 'taught', reason: 'Synthetic teaching fixture', reviewId: 'review-one' };
    records.curriculum.lectures[sourceId] = { id: sourceId, title: `Synthetic ${sourceId}`, sourceId, lessonIds: ['lesson-one'] };
  }
  records.curriculum.lessons['lesson-one'] = { id: 'lesson-one', title: 'Synthetic lesson', path: 'study/lessons/one.md',
    lectureIds: Object.keys(records.curriculum.lectures), sourceUnitIds: Object.keys(records.units.units),
    outcomeIds: ['outcome-one'], conceptIds: ['concept-one'], prerequisiteIds: [], order: 1, reviewId: 'review-one', supplemental: false };
  records.curriculum.concepts['concept-one'] = { id: 'concept-one', title: 'Synthetic definition', path: 'study/concepts/one.md',
    evidenceRefs: [sourceRef('unit-one')], prerequisiteIds: [], order: 0, reviewId: 'review-one' };
  records.curriculum.outcomes['outcome-one'] = { id: 'outcome-one', lessonIds: ['lesson-one'], conceptIds: ['concept-one'],
    action: 'Calculate', conditions: 'Given the synthetic inputs', successCriterion: 'Give the stated answer',
    exerciseIds: ['exercise-one'], evidenceRefs: [sourceRef('unit-one')] };
  records.curriculum.exercises['exercise-one'] = { id: 'exercise-one', outcomeIds: ['outcome-one'],
    promptRef: markdown('study/exercises/one.md', 'prompt'), answerRef: markdown('study/exercises/one.md', 'answer'),
    origin: 'source', evidenceRefs: [sourceRef('unit-one')] };
  records.reviews.reviews['review-one'] = { id: 'review-one', reviewer: 'Synthetic independent fixture reviewer',
    reviewedAt: '2026-10-21T00:00:00Z', subjectRefs: [
      markdown('study/lessons/one.md', 'lesson'), markdown('study/concepts/one.md', 'concept'),
      recordRef('study/curriculum.json', 'lesson-one'),
      ...Object.keys(records.units.units).map(id => recordRef('study/sources/coverage.json', id)),
      ...Object.keys(records.units.units).map(sourceRef),
    ], inputHashes: [], verdict: 'approved', evidenceRef: markdown('study/review-evidence.md', 'review') };
  return records;
}

async function teachingFixture(t, records = teachingRecords(), extraFiles = {}) {
  const result = await fixture(t, records, {
    'study/lessons/one.md': '<a id="lesson"></a>\nSynthetic detailed lesson.\n',
    'study/concepts/one.md': '<a id="concept"></a>\nSynthetic concept definition.\n',
    'study/exercises/one.md': '<a id="prompt"></a>\nCalculate 1 + 1.\n<a id="answer"></a>\nThe answer is 2.\n',
    'study/review-evidence.md': '<a id="review"></a>\nSynthetic review evidence; not actual approval of user material.\n',
    ...extraFiles,
  });
  const review = records.reviews.reviews['review-one'];
  for (const path of ['study/lessons/one.md', 'study/concepts/one.md', 'study/exercises/one.md',
    'study/curriculum.json', 'study/sources/manifest.json', 'study/sources/units.json',
    'study/sources/coverage.json', 'context/synthetic.pdf', 'study/extracted/lecture-one.md']) {
    review.inputHashes.push({ path, sha256: digest(await readFile(join(result.root, path))) });
  }
  await writeFile(join(result.root, 'study/reviews.json'), JSON.stringify(records.reviews));
  return result;
}

test('fully reviewed synthetic four-lecture fixture establishes positive readiness control', async t => {
  const { root } = await teachingFixture(t);
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.accountingComplete, true);
  assert.equal(result.readiness.conversionComplete, true);
  assert.equal(result.readiness.teachingComplete, true);
});

test('physical page accounting cannot substitute for a second untaught substantive unit', async t => {
  const records = teachingRecords();
  records.units.units['unit-extra'] = { ...structuredClone(records.units.units['unit-one']), id: 'unit-extra',
    extractionRef: markdown('study/extracted/lecture-one.md', 'unit-two') };
  records.units.pages['lecture-one:1'].unitIds.push('unit-extra');
  records.coverage.coverage['unit-extra'] = { unitId: 'unit-extra', lessonIds: [], outcomeIds: [],
    disposition: 'pending', reason: 'Equation not yet taught', reviewId: null };
  const { root } = await teachingFixture(t, records);
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.accountingComplete, true);
  assert.equal(result.readiness.conversionComplete, true);
  assert.equal(result.readiness.teachingComplete, false);
});

test('verified unit with nonexistent extraction anchor fails project validation', async t => {
  const records = teachingRecords();
  records.units.units['unit-one'].extractionRef.anchor = 'nonexistent';
  const { root } = await teachingFixture(t, records);
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, false, JSON.stringify(result));
  assert.equal(result.readiness.teachingComplete, false);
});

test('exercise requires separate prompt and answer references', () => {
  const records = teachingRecords();
  records.curriculum.exercises['exercise-one'].answerRef = structuredClone(records.curriculum.exercises['exercise-one'].promptRef);
  assertRejected(records, 'Answer cannot be prompt');
});

test('exercise rejects an existing but empty answer anchor', async t => {
  const { root } = await teachingFixture(t, teachingRecords(), {
    'study/exercises/one.md': '<a id="prompt"></a>\nCalculate 1 + 1.\n<a id="answer"></a>\n   \n',
  });
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, false, JSON.stringify(result));
});

test('exercise and outcome references must be reciprocal', () => {
  const records = teachingRecords();
  records.curriculum.exercises['exercise-one'].outcomeIds = [];
  assertRejected(records, 'Nonreciprocal exercise');
});

test('source-origin exercise cannot use a pending unit as verified evidence', () => {
  const records = teachingRecords();
  records.units.units['unit-one'].status = 'pending';
  assertRejected(records, 'Pending source exercise evidence');
});

test('prerequisite cycles report the cycle rather than accepting a sorted-looking roadmap', () => {
  const records = teachingRecords();
  records.curriculum.concepts['concept-one'].prerequisiteIds = ['lesson-one'];
  records.curriculum.lessons['lesson-one'].prerequisiteIds = ['concept-one'];
  const result = validateRecords(records);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some(e => /cycle/i.test(e.message) && /concept-one/.test(e.message) && /lesson-one/.test(e.message)), JSON.stringify(result.errors));
});

test('reciprocal related edges are valid and do not create prerequisite dependencies', () => {
  const records = teachingRecords();
  for (const [id, from, to] of [['link-one', 'lesson-one', 'concept-one'], ['link-two', 'concept-one', 'lesson-one']]) {
    records.curriculum.links[id] = { id, from, to, type: 'related', evidenceRefs: [sourceRef('unit-one')],
      basis: 'pedagogical', reason: 'Useful related view', reviewId: null };
  }
  // Sync validation checks shape and relationships, not filesystem review freshness.
  records.reviews.reviews['review-one'].inputHashes = [{ path: 'study/curriculum.json', sha256: digest('synthetic') }];
  const result = validateRecords(records);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.deepEqual(records.curriculum.lessons['lesson-one'].prerequisiteIds, []);
});

test('byte edits invalidate review even when the original modification timestamp is restored', async t => {
  const { root } = await teachingFixture(t);
  const path = join(root, 'study/lessons/one.md');
  const before = await stat(path);
  await writeFile(path, '<a id="lesson"></a>\nChanged teaching after review.\n');
  await utimes(path, before.atime, before.mtime);
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, false, JSON.stringify(result));
  assert.ok(result.errors.some(e => e.code === 'STALE_REVIEW'), JSON.stringify(result.errors));
  assert.equal(result.readiness.teachingComplete, false);
});

test('review rejects its own reviews file as a hash input', () => {
  const records = teachingRecords();
  records.reviews.reviews['review-one'].inputHashes = [{ path: 'study/reviews.json', sha256: digest('self') }];
  assertRejected(records, 'Self-hashing review');
});

test('review missing a linked concept byte hash cannot certify teaching', async t => {
  const { root, records } = await teachingFixture(t);
  const review = records.reviews.reviews['review-one'];
  review.inputHashes = review.inputHashes.filter(h => h.path !== 'study/concepts/one.md');
  review.subjectRefs = review.subjectRefs.filter(ref => ref.path !== 'study/concepts/one.md');
  await writeFile(join(root, 'study/reviews.json'), JSON.stringify(records.reviews));
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, false, 'Linked concept must be in required review input closure');
  assert.equal(result.readiness.teachingComplete, false);
});

test('textbook extraction cannot be placed in public general extraction tree', () => {
  const records = pendingRecords();
  records.manifest.sources['lecture-one'].kind = 'textbook';
  records.curriculum.lectures = {};
  records.units.units['unit-one'].extractionRef = markdown('study/extracted/book.md', 'book');
  assertRejected(records, 'Public textbook extraction');
});

test('minimal entrypoint budget measures UTF-8 bytes, not JavaScript character count', async t => {
  const { root } = await fixture(t, pendingRecords(), { 'CONTEXT.md': '£'.repeat(6 * 1024 + 1) });
  const result = await validateProject(root);
  assert.equal(result.ok, false, JSON.stringify(result));
  assert.ok(result.errors.some(e => e.code === 'CONTEXT_BUDGET'), JSON.stringify(result.errors));
});

test('inherited governance alone does not consume the newly authored entrypoint budget', async t => {
  const { root } = await fixture(t, pendingRecords(), { 'AGENTS.md': 'Existing inherited governance\n'.repeat(1000), 'CONTEXT.md': 'Read the source index.\n' });
  const result = await validateProject(root);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.ok(result.counts.contextBytes < 12 * 1024);
  assert.equal(result.readiness.teachingComplete, false);
});

test('empty curriculum and unidentified verified page cannot produce vacuous conversion completion', async t => {
  const records = pendingRecords();
  Object.assign(records.manifest.sources['lecture-one'], { extractionStatus: 'complete',
    tool: { name: 'synthetic', version: '1', configHash: digest('config') }, derivedRevision: digest('revision') });
  records.units.pages['lecture-one:1'].status = 'verified';
  records.units.pages['lecture-one:1'].unitIds = [];
  records.units.units = {};
  records.coverage.coverage = {};
  records.curriculum.lectures = {};
  const { root } = await fixture(t, records);
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.accountingComplete, true);
  assert.equal(result.readiness.conversionComplete, false, 'Unidentified page has not been faithfully converted');
  assert.equal(result.readiness.teachingComplete, false);
});

test('same-mtime original byte change invalidates manifest hash and readiness', async t => {
  const { root } = await teachingFixture(t);
  const path = join(root, 'context/synthetic.pdf');
  const before = await stat(path);
  await writeFile(path, original.replace('synthetic', 'Synthetic'));
  await utimes(path, before.atime, before.mtime);
  const result = await validateProject(root, { contextBudget: false });
  assert.equal(result.ok, false, JSON.stringify(result));
  assert.ok(result.errors.some(e => e.code === 'ORIGINAL_HASH'), JSON.stringify(result.errors));
  assert.equal(result.readiness.conversionComplete, false);
  assert.equal(result.readiness.teachingComplete, false);
});

test('record union resolves JSON record rather than a Markdown anchor', async t => {
  const { root, records } = await fixture(t);
  const result = await resolveReference(root, recordRef('study/sources/manifest.json', 'lecture-one'), records);
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(result.record.id, 'lecture-one');
});

test('record selector fails when the same ID appears in multiple JSON collections', async t => {
  const { root, records } = await fixture(t, pendingRecords(), {
    'study/ambiguous.json': JSON.stringify({ schemaVersion: 1, lessons: { shared: { id: 'shared' } }, concepts: { shared: { id: 'shared' } } }),
  });
  const result = await resolveReference(root, recordRef('study/ambiguous.json', 'shared'), records);
  assert.equal(result.ok, false, JSON.stringify(result));
});

test('Markdown union resolves one explicit nonempty anchor', async t => {
  const { root, records } = await fixture(t);
  const result = await resolveReference(root, markdown('study/extracted/lecture-one.md', 'unit-two'), records);
  assert.equal(result.ok, true, JSON.stringify(result));
  assert.equal(result.bytes.toString(), extraction);
});

for (const badRef of [null, { kind: 'claim', id: 'imaginary' }, { kind: 'source', unitId: 'unit-one', path: 'context/synthetic.pdf' }]) {
  test(`closed evidence reference union rejects ${JSON.stringify(badRef)}`, () => {
    const records = teachingRecords();
    records.reviews.reviews['review-one'].inputHashes = [{ path: 'study/curriculum.json', sha256: digest('fixture') }];
    records.curriculum.outcomes['outcome-one'].evidenceRefs = [badRef];
    assertRejected(records, 'Invalid evidence union member');
  });
}

test('textbook source cannot replace scoped exposure exceptions with blanket allow', () => {
  const records = pendingRecords();
  records.manifest.sources['lecture-one'].kind = 'textbook';
  records.manifest.sources['lecture-one'].exposure = { browser: 'allow', export: 'allow', agent: 'allow' };
  records.curriculum.lectures = {};
  assertRejected(records, 'Textbook exposure must stay scoped and default-denied');
});


test('portable validation CLI works from canonical fixture without ignored OMX artifacts', async t => {
  const { root } = await fixture(t);
  const script = fileURLToPath(new URL('../../scripts/study-validate.mjs', import.meta.url));
  const { stdout, stderr } = await promisify(execFile)(process.execPath, [script, '--sources', '--coverage', '--curriculum', '--json'],
    { cwd: root, windowsHide: true });
  assert.equal(stderr, '');
  const result = JSON.parse(stdout);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.conversionComplete, false);
  assert.equal(result.readiness.teachingComplete, false);
});

test('blocked unit may retain a truthful locator with null extraction/hash and unknown classification', () => {
  const records = pendingRecords();
  records.units.units['unit-one'].status = 'blocked';
  records.units.pages['lecture-one:1'].status = 'blocked';
  records.coverage.coverage['unit-one'].disposition = 'blocked';
  records.manifest.sources['lecture-one'].extractionStatus = 'blocked';
  const result = validateRecords(records);
  assert.equal(result.ok, true, JSON.stringify(result.errors));
  assert.equal(result.readiness.conversionComplete, false);
  assert.equal(result.readiness.teachingComplete, false);
});
