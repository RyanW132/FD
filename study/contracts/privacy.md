# Provenance and privacy contract

## Three separate stores

- **Source evidence:** unchanged originals plus extracted raw text and page/figure images. Inspect permitted originals when needed; do not edit them.
- **Authored teaching:** canonical lessons/concepts, metadata, coverage, indexes and logs. These are not learner records.
- **Learner state:** personal notes, answers, teach-back and progress. Keep it independent/private; never copy it from BAYES or into authored content, logs, review evidence or fixtures.

## Access is not exposure permission

The textbook is locally available (881 physical pages), but browser, export and external-agent/provider channels are denied by default. Textbook extraction, images, restricted derivatives, private indexes/reports and QA evidence belong exclusively under ignored `study/private/`, not general extraction/assets, pilot or generated-public trees. Local extraction is a separate rights/access gate; do not bulk-extract merely because the PDF is readable.

Check canonical source channel decisions for every task, including ordinary course sources; unknown permission denies. Canonical course sources allow browser/agent use and deny export/public distribution. Textbook local extraction is permitted, but its exposure channels remain denied. Local CLI selection of private content is only a local read, not consent to send it to a provider or publish it. Explain provider transfer and obtain appropriate explicit scope before restricted agent use. Do not silently pipe private output into an agent.

Every projection inherits the most restrictive policy of **all** evidence inputs, including paraphrases/summaries, snippets, lessons/concepts, graph nodes/edges, search/indexes, reports and adapter output. Unknown or unresolved provenance denies exposure. Generic restricted-status markers must not leak excerpts, sensitive paths or filenames. Literal canary scanning alone cannot prove paraphrase safety; independent provenance/content review is also required.

## Selected exceptions only

Use the reviewed canonical exception model and validator; do not invent a broad source unlock. An exception must identify exact source units/spans, output references and bound input/output bytes, approved channels, approver, time and rationale. Changed source/output bytes invalidate it. Approval of one selected reference never permits other spans or another channel. Missing evidence/approval remains denied.

## Explicit local private source-unit read

Ordinary query/read/graph CLI uses only the agent-channel projection. There is no CLI channel override, private query/graph mode or private teaching-file read. `--preview-draft` never overrides source privacy.

The narrow local exception is `node scripts/study-read.mjs --id SOURCE_UNIT_ID --include-private --output study/private/retrieval/NAME.json`, with optional `--full` or bounded offset/max-byte/revision flags. These are placeholders for an existing source-unit ID and a new safe filename, not production records supplied by this documentation. Production source units now exist; choose an actual canonical ID. The restricted positive path is tested with synthetic evidence, not by exposing real textbook content.

This operation validates captured source/extraction identity and an access-permitted source unit, reads its exact anchored extraction span, and writes only the explicitly named ignored JSON file. The envelope retains source locator/status/classification and warns if extraction is unverified. Stdout contains only success, the chosen output path and a transfer warning, never the private evidence bytes. Existing outputs are never overwritten. Output is confined to `study/private/retrieval/` using a pinned parent descriptor; this implementation requires Linux/WSL's descriptor filesystem and fails closed elsewhere. It is not a general claim that agents cannot read private files.

The local read changes no policy, exception, browser/export generation or agent graph/query index. Do not pass its file to a provider, browser or export without separate channel permission. A subscription agent must not open the resulting evidence merely because the local command succeeded.

## Current publication boundary

The builder selects the browser channel by default; it does not grant export or provider permission. The policy module evaluates known transitive source-unit provenance and omits denied/unknown candidates. A generic omission count/status is not permission to expose restricted names or excerpts. Selection must account for every owner of shared/identical extraction spans as well as lesson/concept full-file siblings; one public owner must not launder restricted evidence through a shared path or anchor. Draft preview obeys the same policy. Publication contains selected bytes only, not a copy of the source tree or denied originals.

Assets use a deliberately narrow grammar: inline Markdown images with safe relative paths inside the study evidence trees and raster PNG/JPG/JPEG/WebP files. Relative parent segments must normalize within those trees. Private, remote, HTML-embedded, reference-style and SVG assets are unsupported and fail closed. Reviewed teaching must bind referenced image bytes in its review hashes; a changed image cannot reuse a current reviewed label. A future renderer must still sanitize content; publication validation is not browser rendering protection.

## Exception digest API

[The contracts module](../lib/contracts.mjs) exports `exposureDigest(root, exception, records)` and the captured-reader variant `exposureDigestCaptured(readBytes, exception, records)`. Use these helpers to compute `inputDigest`; do not construct a blanket source allow or silently invent a different serialization.

The digest is SHA-256 of UTF-8 `JSON.stringify` over an object in this key order: `sourceId`, `sourceHash`, `units`, `outputs`, `channels`. `sourceHash` is freshly hashed original-source bytes. `units` contains the full selected SourceUnit records in `unitIds` order. Each `outputs` entry, in `outputRefs` order, contains `ref` followed by `sha256` of its full resolved output-file bytes. `channels` is the sorted approved-channel array. Even an anchored output binds its whole file for freshness; the selection itself remains scoped to the exact reference/anchor. Source, selected unit, output or channel changes therefore invalidate the approval digest. The helper computes freshness; it does not establish consent or authenticate an approver. No exception records are seeded by default.

## Honest boundaries

These instructions are cooperative agent guidance, **not** OS enforcement or proof that an agent with filesystem access cannot read private files. Captured publication provenance checks now exist; browser/server serving allowlists remain a separate future gate. Neither authenticates reviewers nor enforces filesystem access against an agent.

Ignore rules prevent new matching untracked files from normal inclusion; they do not remove already tracked originals or erase repository history. Do not delete or untrack the supplied book or other originals. Do not claim restricted material has never been committed. Do not publish the whole pilot/repository by treating local availability as redistribution consent.
