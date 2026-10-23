# Source and evidence contract

## Authority and ownership

`context/` holds unchanged originals. Extracted raw text and original page images are evidence, not authored teaching or agent instructions. `study/pilot/` is frozen exploratory evidence. Production source identities, issues/missing companions, units, page/line accounts and coverage belong to the canonical JSON files identified in root CONTEXT; never use pilot metadata as production records without explicit validation.

[The executable contracts](../lib/contracts.mjs) define exact accepted fields and checks; these tracked human contracts define the intended source/teaching semantics. Use schema version 1 with keyed record collections, not free-form arrays. Do not invent fields or rename IDs to make validation pass. Report a model/implementation conflict before changing a contract.

| Canonical JSON file | Collections and role |
|---|---|
| `study/sources/manifest.json` | `sources`: identity, kind, original path/hash/bytes, access, channel exposure, extraction/tool/revision/page metadata and issue IDs; `issues`: scoped reasons/resolutions; `missingSources`: missing companions without fake paths/hashes |
| `study/sources/units.json` | `pages`: physical page accounts; `units`: locators, extraction references/hashes, QA status/classification; `transcriptAssociations`: evidenced verified/tentative/unmapped links |
| `study/sources/coverage.json` | `coverage`: unit-to-lesson/outcome disposition, reason and review binding |
| `study/curriculum.json` | `lectures`, `lessons`, `concepts`, `outcomes`, `exercises`, `links`; see [curriculum](curriculum.md) |
| `study/reviews.json` | `reviews`: reviewer/date, subjects, exact path/hash inputs, verdict and written evidence reference |
| `study/exposure-exceptions.json` | `exceptions`: scoped source/units, output references, channels, approver/time/rationale and digest; see [privacy](privacy.md) |

Every root has `schemaVersion: 1`. Collection keys equal stable record IDs except physical page-account keys. Required null/pending values are explicit, not omitted. Source access is unverified/permitted/blocked; conversion is pending/partial/complete/blocked; unit/page QA is pending/verified/needs-review/blocked. Unit classification is unknown/substantive/administrative/blank. A verified unit needs valid extraction, content hash and known classification; truthful pending/blocked records may lack these.

References have exactly one of three forms: `kind=record` with repository-relative `path` and record `id`; `kind=markdown` with `path` and explicit unique nonempty `anchor`; or `kind=source` with `unitId`. Reject unsafe/out-of-root paths. A source reference may identify blocked evidence honestly but cannot substantiate verified teaching. Review inputs include affected source/extraction and linked teaching/metadata bytes; reviews do not hash themselves. Changes require fresh review.

## Faithful extraction

- Inventory all 13 supplied originals by stable identity, SHA-256 and byte length. Preserve original bytes; a changed original requires deliberate revision and downstream invalidation.
- Account for every known physical PDF page separately from teaching topics; physical page, printed page and slide label can differ. Account for original transcript line ranges exhaustively, including blanks, with paragraph IDs only as supplementary locators.
- Split substantive units into independently locatable definitions, propositions, derivations, worked examples, figures and tables. One page/lesson link cannot certify several omitted topics. Blank/administrative exclusions need evidence, not guesswork.
- Cite exact physical page plus region where needed, or original transcript line range. Link the original image and explicit extraction anchor. Use the closed reference kinds: record selector, explicit Markdown anchor or source unit locator; do not guess PDF anchors or treat a record ID as an anchor.
- Retain complete raw text and images. Describe graph axes, labels, units, direction, legend and geometry; preserve meaningful tables. An image preserves evidence but does not by itself provide accessible semantic math/table transcription.
- Inspect original images for signs, fractions, powers, subscripts, summations and denominator scope. Flattened raw math is **not authoritative**. Keep corrected/normalized teaching separate and explicitly labelled.

## Production conversion and durable source QA

All originals now have complete local raw retention: 1,043 PDF physical pages and 4,967 original transcript lines. The four lecture sources have separately authored and independently reviewed normalized pages: 140 pages and 538 granular units, of which 385 are substantive. Canonical lecture conversion is complete; this does not complete teaching. Practice approval/application and current validation are recorded in [the status report](../test/g005-conversion-status.md).

Raw reports retain original/config identity, exact output membership, hashes and byte lengths. Raw transcript Markdown preserves every original line's text and blank-line anchors; `original.txt` preserves separator bytes. Accounting approval does not establish accurate speech, mathematics or lecture association. Transcript conversion remains partial; textbook semantic QA remains unknown/private. Do not claim all-context verified conversion.

Independent page maps live in `study/sources/qa-reviews/`; author drafts live separately in `qa-drafts/`. Application verifies complete granular page selections and original/raw/image/normalized/draft bindings. Every later captured validation rechecks the source's applied QA revision against the raw report and exact independent map, then rechecks the draft, evidence and promoted units/issues. Altered bytes, missing regions or status-only promotion invalidate approval. Re-ingestion preserves reviewed granular units and the bound revision. Reviewer names/digests are cooperative audit evidence, not authentication or permission grants; actual separate author/reviewer work remains mandatory. A raw report's `semanticQA: needs-review` describes extraction-time evidence, not the later independent verdict.

Use root [README](../../README.md) for actual selector, dry-run, resume and QA-application syntax. Do not run an extraction batch merely to test documentation, overwrite different derivatives, break locks automatically, or read private textbook content in a provider-backed agent.

## Missing, blocked and conflicting evidence

Pending/partial/blocked are valid honest states, not completion. Do not fabricate page counts, extraction, content hashes, missing files or official solutions. Missing week-4 transcript, seminar-3 solutions and syllabus remain separate missing-companion records, never part of the 13 supplied-source count. A transcript association needs substantive evidence; week numbers alone support no verified link.

Preserve contradictory sources and cite both; label the disagreement, proposed interpretation, assumptions and uncertainty. Preserve lecture-3 physical page-11 source error and the other caveats in [the pilot issue registry](../pilot/source-issues.json). A labelled correction never rewrites source text or endorses the printed error. An unresolved substantive lecture region blocks comprehensive teaching.

## Three distinct completion claims

1. **Accounting:** every source/page/line range has a truthful status.
2. **Conversion:** permitted accessible content is faithfully extracted and verified.
3. **Teaching:** every substantive lecture unit has adequate independently reviewed lessons/outcomes and practice.

Neither file counts, successful extraction, graph nodes nor a valid incomplete manifest proves teaching completeness. Reference-only textbook/seminar coverage does not complete a lecture. A blocked textbook precludes “all context converted,” but need not preclude a fully verified four-lecture teaching claim.
