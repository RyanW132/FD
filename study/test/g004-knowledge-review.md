# G004 independent knowledge review

Status: APPROVE for this bounded G004 code-reviewer lane — all three findings independently verified resolved on 2026-10-22; no remaining scoped blocker. This is not integrated architecture/release approval.

Reviewer: independent code-reviewer lane, 2026-10-22. This review did not edit implementation, originals, frozen pilot, generated snapshots, private learner state, or OMX/goal state. Only this report is reviewer-owned. Final integrated architecture/release approval remains a separate gate.

## Scope and method

Read repository governance, CONTEXT/manual bootstrap and source/privacy/curriculum contracts; continued with the relevant approved PRD/test-spec requirements and implementation/tests. Reviewed `study/lib/{knowledge,policy,contracts,publication,capture,assets}.mjs`, `scripts/study-{knowledge-cli,query,read,graph,validate,check}.mjs`, knowledge tests and fixture helpers, integration status and retrieval documentation. Inspection and dynamic reproductions use synthetic fixtures only; no restricted extraction was printed or transferred.

Checked full-document search/read and byte continuation, physical source references, policy lineage including shared spans/assets and private ancestors, channel separation, typed/canonical graph navigation, nonderived-link review closure, draft handling, same-capture publication bindings, and legacy compatibility. The root-cause guard identified the two findings below rather than treating the green suite as sufficient approval.

## Findings

### HIGH — version-1 compatibility bypasses version-2 coherence validation — RESOLVED 2026-10-22

Location: `study/lib/publication.mjs:64,72-80` (pre-fix lines).

`readGeneration` accepts a manifest relabelled `builderVersion: 1` and then skips all graph/search/parent-digest checks, without enforcing the actual legacy payload contract. A synthetic valid version-2 generation was relabelled version 1, its `graph.inputDigest` replaced with 64 ones, and its payload/manifest hashes recomputed. The reader accepted it and returned the mismatched graph. This broad compatibility branch routes around the primary coherence contract.

Fix: enforce the exact genuine G3 version-1 payload shapes/membership, excluding version-2 parent fields and graph/search or other reserved knowledge payloads; preserve genuine version-1 bytes/read behavior. Add relabelled/rehashed hybrid rejection tests and verify the real existing G3 digest remains readable unchanged.

Independent retarget: the unchanged original relabelled-version-2 reproduction now rejects with `Invalid legacy generation payload`. Inspection confirms a separate closed legacy validator checks catalog/report/item keys and permitted membership before returning version-1 content. The actual G3 `b72d36099b272b953e5ecf52545139fba6f607340f7f0eeab727bd822c51953c` snapshot remains readable, with unchanged manifest hash. No canonical input or old snapshot was rewritten for this verification.

### MEDIUM — projection silently repairs malformed UTF-8 — RESOLVED 2026-10-22

Location: `study/lib/policy.mjs:7,103` (pre-fix lines).

`Buffer.toString('utf8')` replaces malformed sequences before `knowledge.mjs`'s fatal decoder sees the projected bytes. A fully hash-bound synthetic lesson containing bytes `C3 28` passed `openKnowledge`/full read: its 36 original bytes became 38 projected bytes containing U+FFFD. This is undocumented evidence mutation, not the documented asset-URL normalization, and masks a broken source-text contract.

Fix: fail explicitly on malformed UTF-8 at projection decoding boundaries (full files and anchored spans). Cover normal/draft publication and retrieval rejection, retaining BOM, CRLF and valid multibyte-byte preservation tests.

Independent retarget: the unchanged original malformed-lesson reproduction now rejects both ordinary and explicit-preview retrieval/publication. Projection/asset scanning now uses a fatal UTF-8 decoder with `ignoreBOM: true`, preserving BOM as document content rather than silently dropping it. Dedicated extraction and valid BOM/CRLF/multibyte controls are included in the fresh focused suite.

### MEDIUM — draft query/read responses drop persistent unreviewed status — RESOLVED 2026-10-22

Location: `study/lib/knowledge.mjs:76,80,105-106` (pre-fix lines).

Confirmed using a synthetic `changes-needed` review and explicit preview: the selected item has `draft: true`, but query response, hits and full-read response contain neither a draft marker nor warning. The returned text is therefore indistinguishable from reviewed retrieval once detached from the command invocation. The approved PRD requires persistent draft/unreviewed warnings; README also asks callers to preserve that warning, which is absent from these DTOs.

Fix: preserve explicit projection/index draft state, including empty query results; expose draft status and an unreviewed warning in query results/hits and every read/full/continuation response. Include additional metadata in existing serialized byte-budget accounting. Keep canonical graph schema unchanged and do not weaken default review rejection or privacy checks.

Independent retarget: `policy.mjs:169` retains projection draft state, `knowledge.mjs:41` retains index state even with no documents, and the shared explicit draft/warning DTO is included in query responses/hits and each read response. Three synthetic unreviewed/stale/changes-needed cases still reject default retrieval; all explicit-preview full reads and 12 reconstructed chunks preserve the warning and exact BOM/CRLF/multibyte/escaped content. Query/hit metadata fits a requested 2048-byte budget; an insufficient 1024-byte budget fails explicitly. Every bounded read remains at most 32768 serialized UTF-8 bytes. A truly empty draft capture still reports draft/unreviewed status; reviewed index/query/read responses report `draft: false`, `warning: null`. Canonical graph shape remains unchanged.

## Fresh evidence before fixes

- `npm run test:contracts`: **221 passed, 0 failed**, 19.158 seconds.
- `node scripts/study-check.mjs --syntax --static`: **passed**, 24 JS/MJS files; bounded static rule is no eval/new Function, not a full linter/typechecker.
- `node scripts/study-validate.mjs --sources --coverage --curriculum --context-budget --graph --json`: **passed**; 13 sources, 1043 page accounts, 0 units, 0 lessons; all readiness flags false; entrypoint bundle 10243 UTF-8 bytes; graph 0 nodes/edges.
- Production query for continuous compounding: **0 hits**; production graph: **0 nodes/edges**. These are truthful pending-state results, not real-course completion.
- Existing G3 snapshot `b72d36099b272b953e5ecf52545139fba6f607340f7f0eeab727bd822c51953c`: **readable**, manifest SHA-256 still equals that digest; draft/incomplete empty catalog preserved.
- Understand-Anything integration remains pinned at `b8c807c632743ab695ec43cb654a0f1efe216bc8`, `disabled-unverified`, with plugin/adapter/compatibility booleans false. No upstream compatibility claim was tested or granted.

## Limits

Synthetic positive controls establish mechanisms, not faithful conversion or pedagogy for all four lectures. No production source units/lessons exist. No browser implementation, renderer security, OS isolation against filesystem-capable agents, reviewer authentication, automatic mastery, upstream compatibility, or end-to-end real-course acceptance is claimed. Reports/digests are audit/coherence evidence, not semantic authority.

## Final fresh verification after all fixes

- `npm run test:contracts`: **231 passed, 0 failed**, 12.149 seconds, independently executed in this reviewer lane.
- `node --test study/test/knowledge-integrity.test.mjs study/test/knowledge.test.mjs study/test/knowledge-adversarial.test.mjs`: **70 passed, 0 failed** (before the final source-span-only test addition); latest `node --test study/test/knowledge-integrity.test.mjs`: **10 passed, 0 failed**, including that final source-span full/chunk control. Full regression above includes all 10.
- `node scripts/study-check.mjs --syntax --static`: **passed**, 25 JS/MJS files, with the same bounded-static limitation as above.
- `node scripts/study-check.mjs --publication-boundary --original-hashes`: **passed**; all 13 original identities unchanged and current G3 immutable snapshot integrity valid at the preserved `b72d36099b272b953e5ecf52545139fba6f607340f7f0eeab727bd822c51953c` digest.
- Canonical validation remains **passed**, with 13 sources / 1043 page accounts / 0 units / 0 lessons; all readiness flags remain false and graph remains empty.
- Production `study-query --preview-draft` returns an empty result with explicit `draft: true` and the unreviewed warning, not a fabricated article.
- Independent original repro probes reject relabelled/rehashed mixed v2-as-v1 and malformed lesson bytes. Existing G3 digest and exact manifest hash remain unchanged; focused tests also reject stripped hybrid/reserved/unknown legacy payload fields and malformed extraction bytes.
- Additional independent dynamic probe: all three preview states, explicit empty capture, every full/bounded read, 12 total continuation chunks, serialized budgets, and reviewed false/null status **passed**. The initial deliberately too-small 1024-byte query budget correctly raised `Budget too small for one hit`; rerunning with 2048 bytes demonstrated a bounded successful response rather than weakening the budget.

The fixes repair the original boundaries rather than swallowing failures or adding alternate permissive paths. No remaining CRITICAL/HIGH/MEDIUM/LOW finding was identified in this scoped review. Historical findings above remain recorded as resolved evidence. The leader still owns final integration and any separate architecture/release gate.
