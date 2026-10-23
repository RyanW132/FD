#!/usr/bin/env node
// Independent, read-only transcript audit. Never reads private extraction or PDF text.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const read = p => fs.readFileSync(p);
const json = p => JSON.parse(read(p));
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
function splitPhysical(bytes) {
  const lines = [];
  let start = 0;
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] !== 10 && bytes[i] !== 13) continue;
    const textEnd = i;
    const separator = bytes[i] === 13 && bytes[i + 1] === 10 ? 'CRLF' : bytes[i] === 13 ? 'CR' : 'LF';
    if (separator === 'CRLF') i++;
    lines.push({ start, end: i + 1, text: decoder.decode(bytes.subarray(start, textEnd)), separator });
    start = i + 1;
  }
  if (start < bytes.length) lines.push({ start, end: bytes.length, text: decoder.decode(bytes.subarray(start)), separator: null });
  return lines;
}
const fixtures = [
  ['', []], ['a', ['a']], ['a\n', ['a']], ['a\n\n', ['a', '']],
  ['\r\n', ['']], ['a\r\nb\rc\nlast', ['a', 'b', 'c', 'last']],
  ['\uFEFFa\r\n\r\nlast', ['\uFEFFa', '', 'last']],
];
for (const [input, expected] of fixtures) assert.deepEqual(splitPhysical(Buffer.from(input)).map(x => x.text), expected);
const expected = [
  { id: 'transcript-week-1', lines: 1705, bytes: 71639, sha256: 'f760b4cee2b4dd52a683d78c6d0d72324a9393027feea641362c8b8cd52f6520' },
  { id: 'transcript-week-2', lines: 1603, bytes: 64239, sha256: '87e5d91c1be5fbf463fe84b486c328afcfcaea4844fcfb282f342859d6e073d0' },
  { id: 'transcript-week-3', lines: 1659, bytes: 69111, sha256: 'c65b6b4a8d053ab12a0ddb7f46f4ec6c8566b29fa5a3387688b4482e0ae00917' },
];
const manifest = json('study/sources/manifest.json');
const unitRoot = json('study/sources/units.json');
const coverage = json('study/sources/coverage.json').coverage;
const checks = [];
const inputs = [];
const bind = p => { const b = read(p); const result = { path: p, sha256: hash(b), byteLength: b.length }; inputs.push(result); return b; };
for (const e of expected) {
  const s = manifest.sources[e.id];
  assert.equal(s.access, 'permitted'); assert.equal(s.exposure.agent, 'allow');
  assert.ok(s.originalPath.startsWith('context/lecture_transcripts/'));
  const original = bind(s.originalPath);
  const rawPath = `study/sources/extracted/${e.id}`;
  const retained = bind(`${rawPath}/original.txt`);
  const markdown = bind(`${rawPath}/transcript.md`);
  const ingestionBytes = bind(`${rawPath}/ingestion.json`);
  const ingestion = JSON.parse(ingestionBytes);
  assert.equal(hash(original), e.sha256); assert.equal(original.length, e.bytes);
  assert.equal(s.sha256, e.sha256); assert.equal(s.byteLength, e.bytes);
  assert.ok(original.equals(retained), `${e.id}: original.txt differs`);
  const lines = splitPhysical(original);
  assert.equal(lines.length, e.lines);
  const rebuilt = Buffer.concat(lines.map(x => original.subarray(x.start, x.end)));
  assert.ok(rebuilt.equals(original), `${e.id}: scanner loses original bytes`);
  assert.ok(lines.every(x => !x.text.includes('```')), 'Literal Markdown fence requires another representation');
  const expectedMarkdown = Buffer.from('# Original transcript — raw, unverified\n\n' + lines.map((x, i) => `<a id="line-${i + 1}"></a>\n\n\`\`\`text\n${x.text}\n\`\`\`\n`).join('\n'));
  assert.ok(expectedMarkdown.equals(markdown), `${e.id}: anchored Markdown omits/changes line text`);
  const anchors = [...decoder.decode(markdown).matchAll(/<a id="line-(\d+)"><\/a>/g)].map(x => +x[1]);
  assert.deepEqual(anchors, Array.from({ length: e.lines }, (_, i) => i + 1));
  const units = Object.values(unitRoot.units).filter(u => u.sourceId === e.id).sort((a, b) => a.locator.lineStart - b.locator.lineStart);
  assert.equal(units.length, e.lines);
  const covers = [];
  for (let i = 0; i < units.length; i++) {
    const u = units[i], n = i + 1;
    assert.equal(u.id, `${e.id}:line-${n}`);
    assert.deepEqual(u.locator, { lineStart: n, lineEnd: n });
    assert.deepEqual(u.extractionRef, { kind: 'markdown', path: `${rawPath}/transcript.md`, anchor: `line-${n}` });
    assert.equal(u.contentHash, hash(markdown));
    assert.equal(u.status, 'needs-review'); assert.equal(u.classification, 'unknown');
    const c = coverage[u.id]; assert.ok(c); assert.equal(c.disposition, 'pending');
    assert.deepEqual(c.lessonIds, []); assert.deepEqual(c.outcomeIds, []); assert.equal(c.reviewId, null);
    covers.push(c);
  }
  const sourceAssociations = Object.values(unitRoot.transcriptAssociations).filter(a => units.some(u => u.id === a.transcriptUnitId));
  assert.equal(sourceAssociations.length, 0, 'Re-audit new association semantics before accepting');
  assert.equal(s.extractionStatus, 'partial');
  assert.equal(ingestion.sourceHash, e.sha256); assert.equal(ingestion.lines, e.lines);
  assert.equal(ingestion.rawExtractionComplete, true); assert.equal(ingestion.semanticQA, 'needs-review');
  for (const member of ingestion.membership) {
    assert.ok([`${rawPath}/original.txt`, `${rawPath}/transcript.md`].includes(member.path));
    const b = read(member.path); assert.equal(hash(b), member.sha256); assert.equal(b.length, member.byteLength);
  }
  assert.equal(ingestion.membership.length, 2);
  checks.push({ sourceId: e.id, verdict: 'PASS', originalBytes: original.length, originalSHA256: hash(original),
    rawByteIdentity: true, fullAnchoredTextIdentity: true, physicalLines: lines.length,
    blankLines: lines.filter(x => x.text === '').length, separators: {
      CRLF: lines.filter(x => x.separator === 'CRLF').length, LF: lines.filter(x => x.separator === 'LF').length,
      CR: lines.filter(x => x.separator === 'CR').length, unterminated: lines.filter(x => x.separator === null).length },
    utf8BOM: original.subarray(0, 3).equals(Buffer.from([239, 187, 191])),
    unitCount: units.length, pendingCoverageCount: covers.length, associationCount: sourceAssociations.length,
    sourceMetadataDigest: hash(Buffer.from(JSON.stringify(s))),
    sourceSpecificCanonicalDigest: hash(Buffer.from(JSON.stringify({ units, coverage: covers, associations: sourceAssociations }))) });
}
const lecturePages = {
  1: [20, 22, 24, 25, 26, 27, 28, 30, 37, 38],
  2: [4, 6, 7, 9, 13, 14, 16, 17, 20, 25, 29],
  3: [1, 6, 8, 11, 12, 14, 15, 16],
};
for (const [lecture, pages] of Object.entries(lecturePages)) for (const page of pages) bind(`study/sources/annotated/lecture-${lecture}/page-${String(page).padStart(3, '0')}.md`);
bind('study/lib/policy.mjs');
const result = { schemaVersion: 1, verdict: 'PASS', scope: 'Raw transcript byte/physical-line/anchor accounting only; not audio accuracy, independent semantic conversion, mapping or teaching approval',
  fixtureChecks: fixtures.length, totalOriginalBytes: checks.reduce((n, x) => n + x.originalBytes, 0),
  totalPhysicalLines: checks.reduce((n, x) => n + x.physicalLines, 0), checks, inputs };
if (process.argv.includes('--compare-report')) {
  const report = json('study/sources/qa-reviews/transcript-accounting-review.json');
  assert.deepEqual(result, report.accounting, 'Bound input/status changed: independent re-review needed');
}
console.log(JSON.stringify(result, null, 2));
