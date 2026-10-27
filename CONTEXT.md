# FD study-helper context

## Goal and boundaries

Build a local, beginner-first financial-derivatives study helper with a canonical Markdown knowledge base. Teach every substantive unit in all four supplied lectures through detailed lessons and observable outcomes, not summaries alone. Knowledge navigation is inspired by Understand-Anything; complete retrieval and teaching coverage must be independently proved.

Use an existing repository-capable subscription agent, such as Claude Code, to teach and edit files. There is no embedded AI, API key requirement or automatic provider upload. Subscription agents may send read content to their provider; local files do not imply offline processing. No cloud deployment, vector database, automatic mastery, mutation of originals/BAYES, or fabricated missing material is in scope.

## Current readiness

- All 13 originals are preserved and locally raw-converted: 1,043 PDF pages and 4,967 transcript lines. Raw retention is not semantic approval.
- All four lectures have independent source QA: 140 pages, 538 granular units (385 substantive, 153 administrative). Their canonical conversion is complete. Practice sources add 22 independently reviewed pages/90 units; all nine course PDFs are canonically complete. See [conversion status](study/test/g005-conversion-status.md) for validation gaps.
- Transcript line accounting passes; semantic conversion remains partial, associations tentative/unmapped and ten conflicts documented. Textbook derivatives (881 Markdown pages/images) remain private and semantically unverified. Unknown lineage is omitted from the verified knowledge base.
- Production contracts, immutable publication and agent-channel full-text query/read/graph are implemented. Canonical curriculum holds all 46 lessons/16 concepts as **unreviewed drafts** (`reviewId: null`, all coverage pending); aggregate conversion/teaching are incomplete. Marked 18.1.1, KaTeX 0.19.0 and DOMPurify 3.4.17 are installed locally, without a CDN. `npm run start` publishes a v3 draft preview and serves the browser reader at `http://127.0.0.1:4173/`; independent teaching review and full browser accessibility/state acceptance remain pending.
- The frozen 44-page pilot and its one independently reviewed provisional lesson are not production teaching or learner mastery. See [pilot revalidation](study/test/pilot-revalidation-report.md).

## Context map

| Resource | Role |
|---|---|
| `context/` | Immutable originals; read permitted evidence, never edit |
| `study/sources/manifest.json`, `units.json`, `coverage.json` | Production identities, physical accounting, granular source units and teaching dispositions |
| `study/curriculum.json`, `study/reviews.json`, `study/exposure-exceptions.json` | Canonical teaching links, exact-byte reviews and narrowly scoped exceptions |
| `study/wiki/` | Authored lessons/concepts, index and change log as implemented |
| `study/app/` | Browser reader in the trusted v3 dialect; served only from a published generation |
| `study/pilot/` | Frozen exploratory evidence; not production publication |
| `study/private/` | Ignored restricted extraction/assets/derivatives; not a public content tree |
| `study/generated/` | Ignored immutable allowed-content generations; explicit `current.json` pointer |
| `study/contracts/` | Portable bootstrap plus source, curriculum, teaching, editing and privacy contracts |
| `scripts/`, `study/lib/`, `study/test/` | Current validation implementation and regression evidence |

Consult [README.md](README.md) for verified query/read/graph, pilot-revalidation, validation and explicit publish/draft commands. Retrieval CLI uses agent-channel policy; it does not authorize browser/export or private provider exposure. Captured bytes are validated before atomic publication; failed batches retain the last-good generation. Draft query/read responses retain `draft: true` and an unreviewed `warning`, including empty query results and each chunk; normal responses carry `draft: false` and `warning: null`, not a completeness/mastery claim. Explicit preview never bypasses structural or privacy validation. Do not assume proposed files or commands already exist: report absence explicitly. Canonical fields and validators follow the reviewed model; see [source](study/contracts/source.md) and [curriculum](study/contracts/curriculum.md) contracts.

## Source cautions

Week-4 transcript, seminar-3 solutions and syllabus are missing companions, not supplied sources. Week numbering alone cannot establish transcript/lecture mapping. Missing solutions may receive clearly labelled supplemental answers, never invented official answers.

Flattened mathematical extraction is not authoritative: inspect original page images before teaching equations. Preserve source error/caveat labels: lecture 3 physical page 11 has incorrect printed rates; lecture 1 page 26 labels a payoff graph “Profit”; lecture 3 page 16 needs matched rate conventions; seminar 2 question 7 leaves payment/rate conventions ambiguous. [Issue registry](study/pilot/source-issues.json) records precise dispositions. Do not silently repair the original or present ambiguity as certainty.

## Begin a task

Read [the bootstrap](study/contracts/AGENTS.md), select the task contracts, then retrieve target outcomes, full cited source units and prerequisite concepts. Initial task context is at most 32 KiB UTF-8 cumulatively. Compute sizes before each batch and declare continuation before the next required contract group would exceed that cap; then retrieve the full group/evidence in explicit continuation chunks rather than truncating it. Keep source text, authored teaching and private learner state distinct. Use query IDs/references and revision-pinned byte continuation; `--full` explicitly reads the complete selected document without a hidden cap. Exact source locators still require resolving source-unit references. Prepared content is not learned content.
