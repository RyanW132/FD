# G005 conversion status — 2026-10-22

## Result and stop boundary

**G005's bounded ingestion/conversion-evidence stage is complete; the final nonpublishing build passes.** All 13 originals have local raw retention. All nine course PDFs have independently approved canonical source conversion; comprehensive beginner teaching and browser delivery remain downstream work. The actual final 6,476-unit standalone CLI validation and nonpublishing build pass with no errors: `accountingComplete: true`, `conversionComplete: false`, `teachingComplete: false`. Aggregate conversion is honestly incomplete because transcript/textbook semantic QA remains partial/unknown. This is not all-context semantic conversion, teaching completion or a new publication.

This report was written by the documentation lane. It does not replace independent source/code reviews, promote canonical statuses or authenticate reviewers. Later immutable publications retain their own captured state, not this report's live canonical observations.

## Evidence and readiness

| Scope | Verified state | Limit |
|---|---|---|
| Originals | 13 originals preserved; fresh inventory check passes | No deletion, mutation or history-removal claim |
| Raw conversion | 1,043 PDF pages plus 4,967 original transcript lines retained locally | Extraction counts are not semantic approval |
| Four lectures | 140 independently viewed/reviewed pages; 538 granular units: 385 substantive, 153 administrative; canonical sources complete | Source fidelity is not teaching or mastery |
| Five practice sources | Separate reviewer viewed/approved 22 pages/90 units: 68 substantive, 22 administrative, including supplied answer checks; canonical application and final standalone validation pass | Teaching coverage and browser integration remain downstream |
| Three transcripts | Independent exact-byte/line/anchor accounting passes; 1,705/1,603/1,659 lines | Semantic conversion partial; ten conflicts; no verified canonical lecture associations |
| Textbook | 881 Markdown page extractions and 881 PNGs retained exclusively under the private source tree | Metadata-only observation; no provider-backed content read or semantic QA approval |
| Production curriculum | Zero lessons | All substantive teaching coverage remains pending |
| Browser | Not implemented; Poppler available locally | Approved Marked/KaTeX/DOMPurify are not installed yet |

Canonical metadata after the ingestion owner's successful practice application contains **6,476 units**: 628 verified course-PDF units (538 lecture and 90 practice), 4,967 unknown transcript-line units and 881 unknown private textbook-page units. The 90 granular practice units replaced the 22 raw page placeholders. All nine course PDF sources are complete; transcript and textbook conversion remain partial.

Independent exact-byte source evidence:

- Lectures 1–2: [review and recheck](../sources/qa-reviews/lecture-12-review.md), [current recheck evidence](../sources/qa-reviews/lecture-12-recheck.json).
- Lectures 3–4: [independent source review](../sources/qa-reviews/lecture-34-review.md).
- Practice: [22-page fidelity and supplied-answer review](../sources/qa-reviews/practice-source-review.md).
- Transcripts: [accounting/mapping review](../sources/qa-reviews/transcript-accounting-review.md). Week 2 crosses lectures 1–2, week 3 crosses lectures 2–3; filenames are not exact lecture mappings. No transcript evidence establishes lecture 4 coverage. Raw captions are not proof of accurate speech or correct mathematics.

Unknown transcript/textbook units are omitted from the verified default knowledge projection. Draft mode does not bypass unknown-lineage or channel restrictions. Private extraction success grants no agent/browser/export permission. No restricted content or learner state was opened for this documentation pass.

## Reproducible checks

Run from the repository root. These five commands were executed successfully during the earlier G005 documentation pass; this final status refresh inspected the recorded integration results without rerunning those batches:

```sh
node scripts/study-ingest.mjs --source lecture-1 --dry-run --tool-dir .omx/tools/poppler/bin
node study/sources/qa-reviews/verify-transcript-accounting.mjs --compare-report
node study/sources/qa-reviews/practice-source-review-binding.mjs
node scripts/study-inventory.mjs --check
node scripts/study-check.mjs --syntax --static
```

Results:

- Nonwriting ingestion preflight: original/source checks pass; all three Poppler tools report **26.01.0**. The directory is workspace-local, not a portable installation requirement. `--tool-dir`, `STUDY_POPPLER_DIR` or `PATH` supplies tool discovery.
- Transcript independent scanner: **PASS**, 4,967 physical lines, 204,989 original bytes, seven scanner fixtures; fixed report comparison passes. It does not refresh semantic approval automatically.
- Practice in-memory binding helper: **five sources, 22 pages, 90 units, zero errors; five stale-evidence rejection checks**. It constructs copies only; it does not apply canonical metadata or rerun visual review.
- Original inventory: **13/13 pass**.
- Syntax and bounded static check: **31 files pass**. Static scope prohibits `eval`/`new Function`; it is not a full linter/typechecker.

## Final integration evidence

The following fresh results were executed by the integration owner or independent code-review lane, not by this documentation lane:

- Actual current standalone validator: **EXIT 0 / PASS**, **48.70 seconds**, peak **350,380 kB**, no errors; **13 sources / 1,043 physical PDF pages / 6,476 units / 5,848 unknown units / 0 lessons / 11,043 context bytes**. Accounting true; aggregate conversion and teaching false. This supersedes the earlier bounded 6,408-unit candidate pass; the earlier exit 143 was not reproduced.
- Integration owner's full test suite: **276/276 PASS**, zero failures, about **25.98 seconds**. Independent reviewer separately reran the full suite: **276/276 PASS**, zero failures/skips, about **16.4 seconds**.
- New per-invocation validator-cache regressions: **5/5 PASS**. The independent recheck confirms fresh exact-byte rechecks, no global/mtime cache, no skipped references or weakened privacy/freshness boundary.
- Independent syntax/bounded static check: **32 files PASS**, no errors.
- Enduring source QA: **628 verified granular course-PDF units across 162 verified physical pages**, no errors. Practice review maps remain byte-unchanged after canonical application. These checks revalidate bindings, not new visual/math judgments.
- [Independent ingestion/core review](g005-ingestion-code-review.md): **APPROVE, zero open issues**. Its initial MEDIUM repeated-I/O finding and REQUEST CHANGES remain preserved as history; the narrow cache repair and fresh recheck resolve that finding. This is scoped code approval, not final architecture/release approval.
- Actual-corpus nonpublishing build (`node scripts/study-build.mjs --json`): **PASS**, `ok: true`, `errors: []`, `draft: false`, `status: incomplete`; accounting true, aggregate conversion/teaching false, **5,848 omitted unknown-lineage units**. Candidate digest: `c0306eafdc88c959828492d0529f7d8c853b1d1c737e6d4ea20220f7b9f4c886`; input digest: `53420eaa6a39bcc3afea05d6fffd017539a6a47fa98e2e1480d6aa3044e6a695`. The documentation lane inspected the integration owner's JSON result; it did not independently rerun the build.

This documentation pass did not rerun mutating extraction, resume, QA-application or publication batches. Those operations are grounded in the actual CLI, ingestion integration tests and the ingestion owner's executed batches. Root [README](../../README.md) documents supported flags and side effects. The final build omitted `--publish`: no candidate generation was written and no pointer was switched. `study/generated/current.json` still selects the earlier G004 generation `7852853cc7e4e0f1b0c463985000d2e0418322d8cefc8c99319bb59d8d332a00`, not this validated G005 candidate.

## Frozen-pilot current-contract revalidation

The previous G004-era Markdown/JSON pilot reports were preserved byte-for-byte at `.omx/artifacts/g005/pilot-report-before-g005.{md,json}` before the supported current revalidation run. These ignored local historical artifacts are not portable bootstrap dependencies.

Current supported `node scripts/study-revalidate-pilot.mjs --write-report` rerun: **PASS**. All 13 original identities, 44 raw/Markdown/image/independent visual bindings and 116 frozen files remain exact. Both current captured and disk validation pass, and all six implementation hash bindings match current bytes. Historical replay was not run (`legacyAudit: null`). The adapter uses a disposable isolated candidate with **44 needs-review/unknown whole-page units and false readiness**, not the 6,476-unit production corpus. Its pending taxonomy/conversion gates describe that deliberately incomplete fixture. It cannot undo or certify G005's separate production QA. Historical Python replay is not requested in this refresh, and the frozen pilot is not edited. Current report links: [bounded explanation](pilot-revalidation-report.md), [exact machine evidence](pilot-revalidation-report.json).

## Remaining downstream gates — G006–G008

The G005 standalone validation, nonpublishing build and scoped ingestion/core review gates are closed. Remaining work is downstream, not evidence that the whole course is ready:

1. Author and independently review complete four-lecture beginner lessons/outcomes/practice, with every formula and answer checked. Source retention and approved source counts do not certify teaching.
2. Implement/test local browser delivery, sanitized math/content and private resilient learner storage; perform final independent release/architecture checks.
3. Keep transcript semantic review/tentative mappings and textbook semantic QA limitations explicit. Do not claim all-context verified conversion or fabricate missing official materials. Restricted textbook evidence remains denied to agent/browser/export channels.

## Portable context validation

The updated study entrypoint bundle is **11,043/12,288 UTF-8 bytes**, counting only the root study marker plus `CONTEXT.md`, `CLAUDE.md` and the portable bootstrap. Inherited governance is untouched. The mandatory privacy/source/editing/curriculum group is **26,129 bytes**: entry plus that group is **37,172 bytes**, already above the 32,768-byte initial cap before tool wrappers or README. Declare continuation **before** that group, then retrieve it fully; do not omit contracts or relabel an over-budget read retroactively.

Documentation links and byte limits were checked locally. The final status refresh verified all nine report links, all six current pilot implementation hash bindings, the recorded build digests/readiness, the unchanged earlier publication pointer, and canonical metadata counts without opening private/source content. Historical failed bootstrap trials remain failed; updating instructions does not rewrite their evidence.
