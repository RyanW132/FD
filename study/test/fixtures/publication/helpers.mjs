import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
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


export { digest, original, extraction, markdown, sourceRef, recordRef, pendingRecords, teachingRecords, fixture, teachingFixture };
