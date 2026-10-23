# Reproducible local source ingestion

This is tooling/accounting documentation, not a semantic-QA or comprehensive-teaching approval. Originals remain unchanged. Raw extraction preserves evidence; flattened formulas, damaged tables, ambiguous source text and image-only regions remain **needs review**, never guessed or automatically blank.

## Commands

```sh
# Use installed tools on PATH, or select an explicit user-local Poppler directory.
node scripts/study-ingest.mjs --pilot --dry-run --tool-dir /path/to/poppler/bin
node scripts/study-ingest.mjs --source lecture-1 --tool-dir /path/to/poppler/bin
node scripts/study-ingest.mjs --all-approved --tool-dir /path/to/poppler/bin
# Equivalent tool selection: STUDY_POPPLER_DIR=/path/to/poppler/bin
node scripts/study-ingest.mjs --apply-qa study/sources/qa-reviews/lecture-1.json
```

`npm run study-ingest -- ...` is the same CLI. The project does not require OMX for ingestion. The current workstation provisioned approved Poppler 26.01.0 under `.omx/tools/poppler/bin`; this is an explicit local executable location, not an implicit runtime dependency. No document-upload service, provider API, password fallback, OCR fallback or network request is used. Subprocesses use direct argument arrays and hidden Windows process windows.

`--pilot` selects the complete production lecture-3 and seminar-2-problems sources (43 pages). It is **not** the frozen 44-page historical pilot or its approvals. Repeated `--source ID` selects exact registered sources; `--all-approved` selects access-permitted originals only. Conflicting/unknown flags and unknown IDs fail. `--dry-run` verifies original hashes/membership and tool versions and reports the plan without repository writes. It does not certify document access or perform extraction. Actual PDF processing first requires unique, unambiguous `pdfinfo` page/encryption fields and an unencrypted PDF; failures never trigger bypass extraction.

## Exact evidence and deterministic artifacts

Public course source files are at `extracted/<sourceId>/page-NNN.md`, `rawfull-layout.txt`, `ingestion.json` and `assets/<sourceId>/page-NNN.png`. Every image is a full uncropped physical page rendered at 120 dpi. Every raw Markdown page has a physical-page anchor, original image and uncorrected layout text. Physical and printed slide/page labels must not be conflated.

Transcripts retain `extracted/<sourceId>/original.txt` byte for byte, including BOM, UTF-8, blank lines and CRLF. `transcript.md` supplies an explicit anchor for every original physical line; canonical ranges cover each original line once. A terminating newline ends its line rather than inventing another line. Week labels do not establish lecture associations.

The per-source deterministic report binds original SHA-256, extraction revision, tool versions and fixed extraction configuration, exact output membership, every output's SHA-256/byte length and a membership digest. No timestamps, temporary paths or volatile command logs enter this report. Same original bytes/tool configuration produce the same artifacts. Existing differing raw artifacts are never overwritten: they require an explicit reviewed revision, not a silent refresh. Originals, frozen pilot, annotations and review maps are never overwritten by raw ingestion.

All textbook derivatives, detailed reports and images are ignored/private under `study/private/textbook-hull-11/`; future textbook staging is also source-private. Restricted evidence does not enter general extraction/assets, search/graph/publication or public report content. Backend extraction may run locally without exposing evidence to an agent. Do not read or upload these private bytes merely because the local command succeeded. Raw extraction and PNG counts alone cannot certify textbook semantic/visual QA; canonical textbook conversion remains partial unless separately permissible, genuine independent QA exists.

## Staging, interruption and live readers

`study/.ingestion-lock` is the cooperating-writer boundary. Ingestion stages candidate canonical JSON, validates exact captured references, rechecks original/canonical/reference bytes, then replaces the three canonical files with exception rollback. This is **not** filesystem-wide three-file crash atomicity. An interruption can leave the lock or `.ingest-next` files. Do not automatically break an existing lock or delete another writer's files. Inspect the failed operation and reconcile exact candidates/previous metadata before a deliberate recovery.

Live publication and knowledge capture fail closed while any ingestion lock exists (including an abandoned lock or symlink), with a generic status. They check before capture and again during stability rechecks, including publication commit gates. Existing immutable generation reads remain available. The ingester's internal captured-candidate validation does not bypass content/privacy rules; it simply does not invoke a live publication capture.

## Independent page QA

Authors own `annotated/<sourceId>/page-NNN.md` and `qa-drafts/<sourceId>.json`. Their granular SourceUnits stay `needs-review`, and each substantive anchored span must retain its own original image/locator and essential local caveats. Independent reviewers—not source authors—inspect original images and annotations, formulas, tables/figures and exhaustive region accounting before writing `qa-reviews/<sourceId>.json`.

Review maps have schema version 1, sourceId, sourceHash, draftPath, draftHash, reviewer, reviewedAt, verdict `approved`, and a `pages` array. Each page binds pdfPage, verdict `approved`, rawHash, imageHash, normalizedHash, ordered unitIds and `allRegionsAccounted: true`. The referenced draft binds author/sourceHash and, per page, raw/image/normalized paths and hashes, exact closed SourceUnit records, canonical Issue records and observations. A map is cumulative for the source's approved pages. SourceUnit IDs, locators, classification, issue links and extraction references cannot be silently changed during import; only `needs-review` → `verified` promotion is allowed. The import replaces page placeholders only after all granular regions in that page are independently approved. Source issues remain faithfully represented, not silently fixed.

After QA application, existing `Source.derivedRevision` is SHA-256 of UTF-8 JSON in this exact key order:

```text
{sourceHash, rawReportHash, independentReviewMapHash}
```

`rawReportHash` binds that source's deterministic `ingestion.json`; `independentReviewMapHash` binds the full exact review-map bytes. The raw report retains the original extraction revision/configuration. Every captured validation checks this durable binding, the draft hash, raw/image/normalized bytes and exact current granular unit selection/records. Renaming a tool marker cannot bypass QA for recognized production annotation/extraction paths. Repeat raw ingestion preserves current approvals only when unchanged evidence still passes those checks. Unknown/unreviewed private textbook pages require no invented approval.

Reviewer names, timestamps and editable records are **audit/freshness evidence, not identity authentication or permissions**. The independent performer workflow is a separate requirement. Source review does not author teaching coverage: all substantive dispositions remain pending until reviewed lessons/outcomes/practice exist. Accounting, faithful semantic conversion and comprehensive teaching are distinct claims.
