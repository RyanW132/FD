# G005 independent ingestion/core review

## Initial Code Review Summary — superseded by the recheck below

**Files Reviewed:** 11 (9 requested implementation/test files, the supporting publication fixture helper, and the package command wrapper)
**Total Issues:** 1

### By Severity
- CRITICAL: 0
- HIGH: 0
- MEDIUM: 1
- LOW: 0

### Issues

**[MEDIUM] Production transcript granularity amplifies standalone validation I/O**

File: `study/lib/contracts.mjs:347–348`, `study/lib/contracts.mjs:381–383`, `study/lib/contracts.mjs:405–408`.

Issue: `validateProject` supplies an uncached live filesystem reader. The general-reference loop resolves every extraction, then the content-hash loop resolves it again. The new ingester creates one unit per original transcript line (`study/lib/ingestion.mjs:142–145`), so thousands of references repeatedly read and realpath the same complete Markdown files. This is an observed scalability defect on the actual supplied corpus, not an argument against exhaustive line accounting.

Bounded evidence (course transcripts only; no private text read):

| Transcript | Units | Unique bytes | Minimum bytes read by the two loops |
|---|---:|---:|---:|
| Week 1 | 1,705 | 131,955 | 449,966,550 |
| Week 2 | 1,603 | 120,883 | 387,550,898 |
| Week 3 | 1,659 | 127,771 | 423,944,178 |
| Total | 4,967 | 380,609 | 1,261,461,626 |

There are at least 9,934 transcript file reads/path resolutions per standalone validation, before other files and review work. Resolving the first 30 week-1 references through the actual uncached reader read 3,958,650 bytes in 217 ms in a warm bounded trial. First-100 resolutions per transcript with an in-memory reader took 84–104 ms. These measurements establish repeated I/O, not the exact cause or duration of the leader's separately observed four-minute termination. No full standalone validation success is claimed here.

Fix: reuse each exact path's bytes within one validation invocation, with an explicit fresh end-of-operation byte/identity recheck (or reuse an existing captured-view boundary that supplies equivalent guarantees). Do not add a process-global cache, metadata-only/mtime freshness shortcut, skipped references, reduced line accounting, silent fallback, or private-policy bypass. Preserve original/hash/source-QA/exception checks and captured-publication rechecks.

Acceptance: add a repeated-reference fixture proving reads scale with unique paths plus bounded final rechecks, preserve stale/same-mtime/original/QA/exception rejection, prove a second invocation sees changed bytes, run the full actual standalone validator to completion, and rerun the scoped/full regressions. This review requests that bounded repair before closing G005.

### Stage 1 — Specification compliance and root-cause guard

- The reviewed extraction path preserves original baselines, locally checks PDF encryption/access/page counts before text/render work, retains raw text plus original full-page rasters, and never auto-certifies flattened math, image-only pages, or textbook semantic fidelity.
- `--resume-existing` is explicit, reconstructs expected outputs, validates source/tool/config/revision/member hashes and confined paths, and does not rerender. Failure retains its cooperative gate. Existing/stale locks are not automatically broken.
- Canonical writes are accurately described as cooperative staged replacements with rollback, not a three-file atomic filesystem transaction. Capture/live knowledge/publication gates reject an active/abandoned ingestion lock; immutable previous generations remain readable.
- Independent source maps are byte-bound to draft, raw page, image, normalized page, exhaustive page unit selection/issues and original source. Changing the tool label alone does not bypass the lasting hook. Editable names/digests are explicitly not authentication.
- Default textbook output remains source-private and denied. Synthetic scoped-exception fixtures retain their separate path/model rather than weakening the ingester's restricted-source guard. No restricted evidence was opened or emitted to the provider for this review; original book bytes were processed locally only to compare hashes/bytes with manifest and Git.
- No broad fallback, permission downgrade, dependency expansion, or diagnostic-suppressing success path was found in scope. The requested performance repair must address repeated reads, not skip validation or convert failure to a default result.

### Stage 2 — Fresh validation evidence

- `node --test study/test/ingestion.test.mjs`: **40/40 PASS**, about 4.3 seconds.
- `node --test study/test/pilot-revalidation.test.mjs study/test/publication-adversarial.test.mjs`: **92/92 PASS**, about 19.7 seconds.
- `node scripts/study-check.mjs --syntax --static`: **30 files PASS**. This is syntax and the repository's bounded static rule, not ESLint or a typechecker.
- Direct `validateSourceQA` over current records: **no errors**; reader explicitly refused private paths. All **140 lecture pages / 538 lecture units** were independently approved and current at the check. This checks freshness/structure, not a new visual/math review.
- All **13 originals** matched both manifest SHA-256/length and exact `HEAD` bytes.
- All **116 frozen pilot files** retained aggregate SHA-256 `574b07e5b64153fcb82bd7c072691a3e56661eeb0364e7367f0f5a8960f50c04` (sorted path + NUL + binary file SHA + LF).
- Current canonical unit count at the final filtered check: **6,476**. Other source-authoring lanes were active; this review is implementation-hash pinned, not a claim that concurrent canonical metadata was frozen throughout.
- Leader subsequently reported the uncached standalone CLI completed **EXIT 0 / PASS / no errors** against its earlier 6,408-unit candidate, with accounting true and conversion/teaching false. The earlier exit 143 was not reproduced. This is relayed leader evidence, not this lane's command or final-current-candidate validation, and does not remove the measured I/O amplification.

### Reviewed implementation hashes

| File | SHA-256 |
|---|---|
| `study/lib/ingestion.mjs` | `9912f7c35c94c43282e4f4d528dd36bd8b39379921aeba7b368e1f1b41591f2d` |
| `study/lib/source-qa.mjs` | `def245a5483cc90b20db02cf2426ea0bc29f6eff01cfac6564cf4f393419727c` |
| `study/lib/capture.mjs` | `830775614cc52218519ae3713584f0a7627a19e6c24dc5f892f57e0d0ababc6c` |
| `study/lib/contracts.mjs` | `15e0bf84b899df360b0b93ad9351f6d2e197391a7241b0e32666ba82c0c0bfd9` |
| `scripts/study-ingest.mjs` | `1ff203325966ea639faf6a83c7521fd9ff82871bd9bb4d314f6cc8fe99afe225` |
| `scripts/study-revalidate-pilot.mjs` | `12d764d1652fbf917eaf682ada6f19a49dbbd559a2dca5aa965559a83e0d3e22` |
| `study/test/ingestion.test.mjs` | `5a880839e941f8dccd164f921cda35b7d8731beeae294d3ed2f526d160fbf7c9` |
| `study/test/pilot-revalidation.test.mjs` | `900b6fa4a8ee6c2e15086711a31fda2a7f7ea91a3d1adae957aaf951270e40df` |
| `study/test/publication-adversarial.test.mjs` | `0908e26343c8dbd3ac23b2874201062842dedd55108733b853f68a96203266a4` |
| `study/test/fixtures/publication/helpers.mjs` | `d95aa3b022b7261e1356018e2165e984b0a098f40fe1885fcb1a5cda74a7a47d` |
| `package.json` | `1c6b62e33866269c4d78ad82094851a79754f57cedae33e4a12f70ec6b07a5db` |

### Limits and handoff

Source images/mathematics were reviewed by the separate source-QA lanes, not re-reviewed here. Book semantic QA is still unknown/partial and cannot be certified by a provider-backed review. Practice authoring, comprehensive curriculum, browser delivery, final release and the independent architect lane are separate gates. This leaf lane did not spawn children or mutate production/tests/native-goal/OMX state. Initial entry context was 11,342 bytes; continuation was declared before the required contract group exceeded the cumulative 32-KiB cap. Full applicable privacy/source/editing/curriculum contracts and relevant approved plan/test sections were then read in continuations; clipped tool output was not counted as complete evidence.

### Recommendation

**REQUEST CHANGES** — one bounded MEDIUM performance repair and fresh independent recheck. No additional confirmed security/correctness blocker found in the reviewed ingestion/QA changes. This is the code-review lane only, not combined architecture/release approval.

---

## Independent repair recheck — current verdict

**Files Reviewed:** 12 cumulatively, including the new regression file.
**Open Issues:** 0 — CRITICAL 0 / HIGH 0 / MEDIUM 0 / LOW 0.

### Resolution of the initial MEDIUM finding

`study/lib/contracts.mjs:347–366` now caches successfully read exact-path bytes only within one `validateProject` invocation. Every cached path receives a fresh confined filesystem read and exact byte comparison before return. Any failed comparison/read/confinement check appends `INPUT_CHANGED`, makes the result invalid, and resets all readiness flags to false. There is no global cache, mtime shortcut, skipped reference, policy bypass, silent success fallback or production test hook. The existing captured-publication contract is unchanged; this standalone validation cache is explicitly not represented as publication capture.

The new `study/test/validate-project-cache.test.mjs` supplies five sequential regression tests covering two underlying reads per distinct successful path (initial read plus fresh recheck), same-size/same-mtime mutation, isolation between invocations, deletion/confinement escape and initially missing/unsafe paths. Built-in read interception is confined to the sequential test file and restored in `finally`; no production injection API was added. The prior issue is **resolved**.

### Fresh independent evidence

- This lane ran `node --test study/test/*.test.mjs`: **276/276 PASS**, 0 failed/skipped, about **16.4 seconds**.
- This lane ran `node scripts/study-check.mjs --syntax --static`: **32 files PASS**, no errors. Bounded static analysis remains accurately distinguished from a linter/typechecker.
- This lane reran enduring source-QA validation with a reader that refuses private evidence: **no errors**, current **6,476 units / 628 verified units / 162 verified physical pages**. This is byte-binding verification, not a substitute for the source verifiers' actual visual/math review.
- This lane rechecked all **13 original manifest hashes/lengths** and the unchanged **116-file frozen pilot aggregate** `574b07e5b64153fcb82bd7c072691a3e56661eeb0364e7367f0f5a8960f50c04`.
- Leader's separately executed actual standalone CLI completed **EXIT 0 / PASS**, **48.70 seconds**, peak **350,380 kB**. Its JSON result was inspected by this lane: no errors; **13 sources / 1,043 physical PDF pages / 6,476 units / 5,848 unknown units / 0 lessons / 11,043 context bytes**; accounting true, conversion false, teaching false. This establishes completion on the current production candidate without misrepresenting it as full semantic conversion or teaching.
- Prior ingestion, capture, QA, CLI, pilot and publication-fixture hashes in the historical table remain unchanged. New current bounds: `study/lib/contracts.mjs` SHA-256 **`cfc4ee17e68f69ea573ef6bd2d3a81f1d536ea412e28dd30dd02e60077ddd7a1`**; `study/test/validate-project-cache.test.mjs` SHA-256 **`8002b888a0c452713b074babc74ddc10b960ffa886d3bf4704e30b83a8274c1f`**. Later unrelated additions are outside these reviewed bounds.

### Recommendation

**APPROVE** — scoped code-review lane. The initial REQUEST CHANGES and evidence are preserved above; no outstanding finding remains after the bounded repair. Independent architecture, comprehensive teaching, browser delivery and final-release gates remain separate, and book semantic QA remains unknown/partial rather than certified.
