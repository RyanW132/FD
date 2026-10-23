# G002 independent portability verification

Date: 2026-10-21. Scope: portable contracts/validators only; browser, publication and full retrieval are later work. Verification used the repository entrypoint and canonical files, not `.omx` runtime/planning/state. No implementation, source or seed files were changed by this verifier.

## Verdict

**PASS — bounded G002 portable contract checks pass after a discovered review-binding bypass was repaired and independently rechecked.** Production data remains truthfully incomplete; this is not a conversion/teaching acceptance report.

## Evidence

Fresh documented commands:

| Command | Result |
|---|---|
| `node scripts/study-inventory.mjs --check` | PASS: 13 originals, no errors |
| `node scripts/study-validate.mjs --sources --coverage --curriculum --context-budget` | PASS structurally; accounting/conversion/teaching all **false**; 13 sources, 1,043 PDF pages, zero units/lessons |
| `node scripts/study-check.mjs --syntax --static` | PASS: six JS files; syntax plus bounded `eval`/`new Function` prohibition, not a full linter/typechecker |
| `node --test study/test/*.test.mjs` | PASS: 61 tests, zero failures/skips |

- Independent byte check: for each of the 13 manifest sources, compared `git show HEAD:<originalPath>` bytes, current original bytes, manifest SHA-256 and byte length; **13 matched, zero failures**. The canonical manifest is currently versionable but untracked; no staging/commit was performed.
- Manual fresh-agent bootstrap completed through root `AGENTS.md`, `CONTEXT.md`, README and selected contracts. Entry bundle = **8,380 UTF-8 bytes**, below 12,288. Initial entrypoint/README/all five task contracts = **30,716 bytes**, below 32,768. Initial path/byte log: AGENTS 625; CONTEXT 4,584; CLAUDE 220; contracts/AGENTS 2,951; README 3,053; privacy 3,048; source 5,888; curriculum 4,010; teaching 3,379; editing 2,958. Subsequent implementation/test inspection was continuation, not initial teaching context.
- `rg -n '\.omx|OMX|omx|\.codex|\.agents' scripts study/lib study/contracts README.md CONTEXT.md AGENTS.md CLAUDE.md` found only explanatory portability prose, no implementation runtime dependency. Existing CLI fixture test runs from an ordinary temporary canonical repository without OMX artifacts.
- Tests directly exercise closed schema/reference forms, unsafe POSIX/Windows paths and external symlinks, pending/blocked records, unknown PDF counts, missing companions, duplicate/empty anchors, prerequisite cycles, stale same-mtime source/lesson edits, missing linked-concept hashes, and nonvacuous readiness controls.
- Textbook source exposure is denied on all channels by default; blanket allowance and general-tree textbook extraction are rejected. The privacy contract explicitly denies textbook derivatives/provider/browser/export by default and does not falsely claim OS enforcement or a current publication allowlist.
- `git check-ignore -v study/private/sentinel.txt study/generated/sentinel.txt study/private/textbook/private-index.json study/generated/current.json`: all four ignored by `.gitignore` lines 5–6. `git ls-files study/private study/generated`: empty. Existing tracked originals remain tracked.

## Resolved finding: Markdown-only approval bypassed dependency closure

The initial implementation invoked `requireTeaching(ref.id)` only for `kind: record` review subjects, while also accepting a Markdown subject matching a lesson/concept path as its current approval.

A fresh synthetic temporary fixture reproduced:

1. Start with `study/test/fixtures/contracts/pending.json`; provide a hash-correct synthetic original, verified source unit and existing extraction anchor; add a lesson referencing that unit.
2. Set the lesson's `reviewId` to an approved review whose sole subject is `{kind:"markdown",path:"study/lesson.md",anchor:"lesson"}` and sole hash input is that lesson file. Provide a resolvable written-review evidence anchor.
3. `validateProject(root,{contextBudget:false})` returns **`ok:true`, `errors:[]`**, despite absent source/extraction/curriculum/coverage hashes.
4. Change `curriculum.lessons["lesson-a"].title`, rewrite canonical curriculum without changing any review bytes, and rerun: still **`ok:true`, `errors:[]`**.

The implementation owner repaired `study/lib/contracts.mjs:457–463`: Markdown subjects now invoke full teaching dependency closure for every canonical lesson/concept sharing that file. Two regression tests cover lesson and concept subjects. This verifier independently reran the original temporary-fixture probe: missing curriculum/coverage/units/manifest/original/extraction hashes now reject; supplying all exact hashes accepts; a later curriculum title-byte change invalidates approval with `STALE_REVIEW`. All four documented commands were rerun after the fix: inventory PASS, structural validation PASS with all readiness flags false, syntax/static PASS, **61/61 tests PASS**. No implementation edits were performed in this verification lane.

## Gaps

None for the bounded G002 acceptance checks above.

## Risks and explicit nonclaims

- No browser, immutable publication, retrieval/graph generation or OS privacy enforcement was claimed or tested.
- Independent human/agent identity is procedural evidence, not authenticated by editable review metadata.
- The 32-KiB task-context rule is a documented manual procedure, not a runtime enforcement guarantee.
- Current incomplete production seeds cannot demonstrate production teaching quality/mastery. Existing positive synthetic readiness tests establish validator behavior, not real-course completeness.
