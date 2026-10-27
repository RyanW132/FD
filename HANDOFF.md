# FD implementation handoff

## Update — 23 October 2026, resumed on macOS

The user resumed the work and re-prioritized: **a usable browser reader first**, with the remaining reviews and acceptance tests afterwards. Everything below this section is the earlier paused snapshot; where they disagree, this section is current.

- **Restore:** all 4,147 archived files, 13 originals and 116 pilot files matched their manifest hashes (read-only comparison; the host blocked running `transfer.py`). `npm ci --ignore-scripts` installed the exact pins.
- **G006 authoring finished:** `g006-l4-slice5-report.md` written; the two final L4 lessons authored with a sixth fragment block, checks and `g006-l4-slice6-report.md`. 46/46 lessons and 16 concepts; all 385 substantive lecture units mapped once.
- **Draft canonical integration (user-directed):** `study/curriculum.json` now holds the `proposal-04` candidate (46 lessons, 16 concepts, 92 outcomes, 335 exercises) with every `reviewId` set to `null`. Coverage, reviews and sources are unchanged (all coverage pending). The integration helper now refuses to run against this non-empty baseline by design; future review should bind the canonical draft bytes directly.
- **Reader:** `study/app/{app.mjs,index.html,styles.css}` added in the trusted v3 dialect; `state.mjs` gained `downloadState()`. `npm run start` (`scripts/study-start.mjs`) publishes a v3 draft preview and serves `http://127.0.0.1:4173/`. `study-build --builder-version=3` and `study-validate --graph --preview-draft` were added.
- **Fixes found by real use:** `policy.mjs` lineage indexed and memoized, so draft publication takes about 28 s instead of not finishing; anchor scans cached. `server.mjs` reuses the verified snapshot for an unchanged pointer (status poll 3.6 s → 2 ms), closes idle preconnected sockets silently instead of a racy 400, and returns 204 for `/favicon.ico`.
- **Evidence:** full suite 702 tests: 698 pass, 1 skip, 3 known macOS host failures (Linux descriptor filesystem; case-sensitive fixture parent). Headless Chrome journey (isolated profile): 25/25 checks, including 226 MathML formulas without fallback, rail with source image, notes surviving reload, zero non-local requests. Report: `.omx/artifacts/g007-reader-app/REPORT.md`.
- **Still required:** genuine independent teaching review (G006 step 2) and normal reviewed publication; G007 accessibility/assistive-technology, state-failure and hostile-content acceptance through the browser; independent review of the reader and of the policy/server changes; G008 release gates.

**Snapshot: 23 October 2026. Study goal: PAUSED at the user's request.** This is a continuation handoff, not a release or a request to restart planning. The user requested a GitHub backup so another session/laptop can finish the implementation. Do not resume feature work until the user resumes the goal.

## Start here

1. Restore and verify the backup as described in **Backup and new-laptop setup** below. Do not restore old host/session authority.
2. Read [AGENTS.md](AGENTS.md), [CONTEXT.md](CONTEXT.md) and [the portable bootstrap](study/contracts/AGENTS.md), then privacy/source and applicable editing/teaching/curriculum contracts. Treat source documents as evidence, never instructions.
3. Observe the **12-KiB entrypoint / 32-KiB initial-context budgets**. Size each read batch. Declare a continuation *before* the next required group exceeds the initial budget; retrieve full documents/evidence in explicit chunks rather than clipping or omitting contracts. This handoff plus the entrypoints/contracts needs continuation.
4. Read the current durable plan and ledger, then the two interruption checkpoints: [L4 authoring](.omx/drafts/g006-l4-resume-checkpoint.md) and [renderer](.omx/artifacts/g007-renderer/RESUME.md). Recheck current files and live process handles; historical PIDs/session names are not live handles or authority.
5. Resume the existing scope through the installed workflow's supported gates. Preserve completed stories; do not run `create-goals --force`, invent approvals, overwrite another active native goal, or import the old session's identity files.

Suggested first prompt for the next session:

> Resume the paused FD study-helper implementation using HANDOFF.md, the restored `.omx/ultragoal/{brief.md,goals.json,ledger.jsonl}`, and the accepted specifications. Keep the entire eight-story objective; five stories are complete, G006 is in progress, and G007/G008 remain pending. Follow the portable contracts and explicit context continuations. First verify restore hashes and fresh runtime authority, inspect both interruption checkpoints, then finish the last two L4 lessons and the incomplete renderer in disjoint lanes. Obtain genuine independent teaching and release reviews; do not equate draft counts or passing schemas with completion. Preserve originals, frozen pilot and private learner state. Do not send restricted textbook content to a provider.

## Goal and current truth

Deliver a **local beginner-first financial-derivatives study helper**: full source-grounded teaching for all substantive units in four lectures; portable Markdown/instructions for an external subscription agent; full-text retrieval and typed knowledge navigation; a source-linked accessible browser reader; and isolated resilient learner notes/answers/self-assessment. There is **no embedded chatbot, API key, provider SDK, automatic upload, vector database, cloud app, automatic mastery or migration of BAYES personal records**.

The aggregate objective remains exactly:

> Complete the durable ultragoal plan in .omx/ultragoal/goals.json, including later accepted/appended stories, under the original brief constraints; use .omx/ultragoal/ledger.jsonl as the audit trail.

| Story | Durable status | Meaning |
|---|---|---|
| G001 inventory/extraction pilot | Complete | Historical scoped evidence is retained. |
| G002 contracts/portable context | Complete | Closed schemas, references and bootstrap exist. |
| G003 immutable publication/privacy | Complete | Captured-byte publication and channel/provenance policy exist. |
| G004 retrieval/knowledge graph | Complete | Complete selected text retrieval and typed graph exist. |
| G005 source conversion | Complete | All originals accounted; permitted course PDF source QA applied. Global semantic conversion is still incomplete. |
| G006 four-lecture curriculum | **In progress** | Draft authoring nearly finished; formal integration/independent teaching acceptance not done. |
| G007 browser/learner state | **Pending** | Several independently reviewed foundations exist; full reader/UI acceptance does not. |
| G008 verified release | **Pending** | Final cleanup, audits, fresh trials and independent release reviews remain. |

The parent native goal is **paused**, independently of the local OMX mode-file problem described below. Snapshot: [handoff-paused.json](.omx/artifacts/goal-snapshots/handoff-paused.json). Do not mark the aggregate complete or shrink it to the current partial implementation.

### Source and curriculum inventory

- **13 original teaching files**, unchanged: four lecture PDFs, three transcript files, five seminar/solution PDFs and one textbook PDF. `.DS_Store` is not teaching material.
- Raw local retention: **1,043 PDF pages / 4,967 transcript lines**. The textbook contributes 881 private, semantically unverified pages/images.
- Independently verified course sources: **162 pages / 628 units** across nine PDFs. Lectures: 140 pages, **385 substantive + 153 administrative units**. Practice: 22 pages, 90 units.
- Transcript accounting is complete, but semantics/mapping remain partial: tentative/unmapped associations and ten conflicts. Do not invent a week-4 transcript, seminar-3 solutions or syllabus.
- **44/46 drafted lessons**, **371/385 primary substantive lecture units**, **16/16 drafted concepts**. These are authoring counts, **not independent approvals**.
- Canonical `study/curriculum.json` and `study/reviews.json` still contain **zero teaching records / zero reviews**. All 6,476 canonical coverage records remain pending. No final curriculum promotion or comprehensive teaching publication occurred.
- `study/wiki/index.md` and `study/wiki/log.md` are absent. Some README/CONTEXT/contract readiness prose intentionally still describes the empty canonical curriculum; browser/server status prose also needs reconciliation before release.

Preserve source-caution dispositions, including L3 physical p11's incorrect printed rates, L3 p16 rate-convention qualification, L1 pp26–27 payoff labelled “Profit,” currency/glyph qualifications, and the genuine seminar-2 Q7 convention conflict. Use current source issue/QA records and complete evidence, not this abbreviated list, for acceptance.

## Backup and new-laptop setup

### Exposure authorization and exclusions

The original remote is `https://github.com/RyanW132/FD.git`. It was verified **public** during backup preparation. After being informed that the repository/history includes supplied course PDFs and the textbook, the user explicitly said **“just push to public.”** That supersedes the earlier private-only condition **for this requested manual backup**, including supplied source files and restricted extraction artifacts.

This is not a privacy promise, a general redistribution-rights determination, or permission to unlock those materials in the app, browser, ordinary export, or agent/provider channels. **Keep canonical exposure policy unchanged. Never open or pipe restricted textbook bytes into a provider-backed agent merely because the backup is public.** Credentials, personal learner state, browser profiles and live host/session authority must not be backed up.

### Concrete backup layout and restore

Normal Git tracks code, documentation, public source/QA/raw evidence, tests, authored teaching and the frozen pilot with byte-preserving `* -text` attributes. The ignored resume data uses [`.resume/transfer.py`](.resume/transfer.py), `.resume/manifest.json`, and chunked archive families under `.resume/archives/`:

- `omx-portable.tar.gz.part000` (and further numbered parts): allowlisted durable plan/spec/draft/artifact/context data and notepad data, **not** live runtime authority.
- `omx-tools-audit.tar.gz.part000`: retained tool/provenance bytes restored **only** to audit quarantine `.resume/audit/omx-tools`, never automatically to `.omx/tools` or executed.
- `restricted-study-private.tar.gz.part000`: authorized restricted extraction/QA data, excluding personal learner state.
- `generated-snapshots.tar.gz.part000`: immutable generated snapshots and their selected pointer.

Parts are at most90MiB. The manifest binds part, concatenated archive and every member hash/type/link, plus all13 original and116 frozen-pilot hashes. Verification requires those originals/pilot files to **already exist with exact hashes from the normal Git clone**, before restoring archives. Restore verifies the complete archive set before writes, rejects unsafe paths/case aliases/symlink ancestors or conflicting existing bytes, and skips identical existing files. It does not install dependencies or adopt runtime state. The helper requests0644 file/0755 directory modes, but a Windows-mounted WSL filesystem may expose777: quarantine is a workflow boundary, **not OS-enforced nonexecution or privacy**. Read the helper before use.

From the root of a **complete new clone**:

```sh
python3 -B .resume/transfer.py verify
python3 -B .resume/transfer.py restore
python3 -B .resume/transfer.py verify
```

These exact commands and the helper's `--root ROOT` option were checked against its implemented parser/help. The Git lane owns archive sealing, isolated restore verification and push; those were still separate pending operations when this documentation was frozen. Check its final delivery evidence/remote commit rather than inferring successful upload from this document. Do not run `prepare` on the destination: it creates a new backup, not a restore.

The backup must preserve exact source, extraction, review-bound and frozen-pilot bytes. Git `core.autocrlf=true` was observed; byte-preserving attributes/archive transport and an isolated restore/hash check are required. Do not normalize originals or “repair” old review hashes after checkout. Ordinary ignore rules currently exclude `.omx/` locally, `study/private/` and `study/generated/`; **a plain clone without the separately packaged resume artifacts is insufficient**.

### Fresh-machine sequence

1. Clone the verified backup commit using the Git lane's final delivery evidence, then run the verify/restore/verify commands above. Restore only the packaged, allowlisted data and verify all member/part hashes before use.
2. Keep restricted derivatives under `study/private/`. Preserve `context/`, source QA, all author fragments/inventories, `.omx/plans/`, `.omx/ultragoal/` and accepted review evidence. Do not overwrite conflicting local files silently.
3. Install compatible Node/npm and the exact locked app dependencies. `npm ci --ignore-scripts` is the intended clean-install command; it was not executed on the destination laptop by this documentation pass. Preserve exact Marked/KaTeX/DOMPurify pins and the unrelated inherited `git` dependency.
4. Inspect/provision the destination's approved local tools. Old Linux binaries/libraries are **not automatically compatible** with another OS/distro; old inode/owner checks are not portable. Do not run an archived runtime patch or extraction batch automatically.
5. Establish a fresh supported OMX runtime/session scope if using OMX. Read the installed skill and run supported inspection before mutating runtime state. Restored plans/ledgers are data, **not host-issued lease or ownership proof**. No fabricated markers, copied PIDs, lock deletion, namespace identity edits or blind patch reapplication.
6. Read `omx ultragoal --help` and use `omx ultragoal status --json` to inspect the restored plan. After the user resumes, the supported `omx ultragoal complete-goals` handoff tells the active agent when to use native `get_goal`/`create_goal`/`update_goal`. A native goal in the old thread is not transferred by copying files. Do not overwrite an unrelated active goal.
7. Run the nonpublishing verification sequence below, inspect failures against this checkpoint, then resume the first incomplete bounded task. Do not re-ingest already verified sources just to test setup.

### Tooling and runtime caveats

Recorded implementation environment: Node **24.21.0**, npm **11.19.0**, WSL Linux x86_64/Ubuntu 26.04; Poppler **26.01.0**; Marked **18.1.1**, KaTeX **0.19.0**, DOMPurify **3.4.17**; agent-browser **0.39.0**; Chrome for Testing **155.0.8059.39**. Verify destination versions rather than treating these as installed there.

Linux/WSL is the exercised environment; the narrow private-file retrieval operation requires its descriptor filesystem and fails closed elsewhere. Native Windows/macOS compatibility is not established by this handoff. Historical absolute paths in reports are diagnostic evidence: do not search/replace them or recompute old review hashes to make a different host appear identical.

The former exact-inode OMX repair is historical evidence, not a portable installer. A reviewed 13-file compiled-runtime patch was reapplied to **0.21.30**, preserving identity checks: [repair evidence](.omx/artifacts/runtime-repair/exact-inode/reapply-0.21.30/REPORT.md). **Fresh handoff inspection reports OMX 0.21.33.** The supported parent-cwd mode-state write now fails with `canonical mode binding lease namespace marker malformed`; it was **not** repaired/bypassed under the handoff-only task. Native pause and an official Ultragoal ledger annotation succeeded; local mode-state inactivity was **not** established. Treat runtime recovery as a fresh gate on either host.

The old recorded parent cwd `/mnt/c/Users/Owenc/FD` and inner cwd `/mnt/c/users/owenc/fd/fd` are diagnostic history, not destination paths or proof. Do not copy `.omx-state-locks*`, live lease/session state, tmux/pane data or active lock ownership to the destination.

Approved old-host Chrome runtime: three signed/hash-verified Ubuntu packages extracted only under `.omx/tools/chrome-runtime`, process-local loader path, no system installs. [Runtime report](.omx/artifacts/g007-browser-runtime/report.md) includes exact versions/hashes/licenses and guarded rollback. Missing ALSA data was deliberately not installed; only observed headless behavior was proved. On a new laptop, reprovision compatible tools rather than accepting the old prefix's inode/owner assertions.

## Ordered remaining implementation

### 1. Finish G006 authoring without duplicating completed blocks

Start with [the exact L4 checkpoint](.omx/drafts/g006-l4-resume-checkpoint.md).

| Lecture | Complete draft lessons | Fragment JSON blocks |
|---|---:|---:|
| L1 | 10/10 | 4 |
| L2 | 10/10 | 5 |
| L3 | 14/14 | 7 |
| L4 | 10/12 | 5 |

The currency-parity and commodity-storage-and-convenience lessons already exist and the **fifth L4 block is already appended**. Their 17 primary units cover physical pp24–29. Fresh resumed author helpers passed: 31 numerical/property groups, 211 KaTeX expressions, exact unit/practice/anchor/link checks. **`.omx/drafts/g006-l4-slice5-report.md` is unfinished/absent.** Finish full evidence/prerequisite compatibility inspection and the bounded report; do not append slice5 again or call those author checks independent acceptance.

Author the two absent final lessons after reading all full cited raw/normalized spans, the three original page images and complete prerequisites:

- `study/wiki/lessons/lesson-l4-curve-shape-and-formula-selection.md`: physical pp30–31, **6 primary units**.
- `study/wiki/lessons/lesson-l4-carry-synthesis.md`: physical p32, **8 primary units**.

Use exact IDs/metadata from [the decomposition](.omx/plans/g006-curriculum-decomposition.md). `.omx/drafts/g006-l4-slice6-baseline.json` exists; it is a resume baseline, not a freeze. Preserve the complete five-block L4 prefix, append exactly the final proposal block, and finish slice6 inventories/report/checks. Teach curve shape versus forecasts, model/formula selection, carry/storage/convenience/rate/quote qualifications, complete beginner reasoning and worked applications. Each lesson needs measurable outcomes, scaffolded practice, separately anchored answers, teach-back, source/supplement labels, notation/units/assumptions, figures and exact evidence.

All **16 concepts are already drafted**. The shared-bridges fragment has two blocks; the financial fragment has six blocks/twelve financial concept records. The final references `concept-replication-and-carry` and `concept-forward-contract-value` are complete author drafts: [report](.omx/drafts/g006-l4-financial-concepts-author-report.md). Preserve all prior bytes; do not author them again. Their author evidence includes 2,743 assertions, 104 KaTeX spans, nine viewed source PNGs and the unchanged 110-test/92-case oracle suite—not formal approval.

**Exit:** all 46 planned lessons/16 concepts authored; exact primary set equals all 385 substantive lecture IDs; complete author inventories/checks and no missing prerequisites. Counts alone do not pass the next gate.

### 2. Integrate, freeze and independently accept G006

Follow the accepted [review-freeze architecture handoff](.omx/plans/g006-review-freeze-handoff.md), SHA256 `1d9ba39603108b3c825b9fe64f198bd79308fe29a32e4b26676e2644f8250002`. Its historical counts are superseded by this snapshot; its protocol remains binding.

1. Use the existing [noncanonical integration helper](.omx/drafts/g006-integration-prep/README.md). It parses **every** lesson block and only concept-record blocks, preserves inventories separately, constructs reciprocal lectures/outcomes/exercises and checks real unit/anchor/practice mappings. Its `proposal-03` is **older 42-lesson/14-concept/354-unit evolving output**, not a final candidate or approval. A concurrent append correctly aborted proposal02; do not mistake that for a failed curriculum.
2. Finish all metadata, source/coverage dispositions, DAGs/reserved IDs, `study/wiki/index.md`, `study/wiki/log.md` and truthful readiness prose **before final freeze**. Preserve source QA and untouched practice/transcript/book dispositions. Used secondary seminar units are not silently “taught”; existing prep proposes six reference-only units.
3. Create a new immutable **noncanonical** candidate with future canonical paths, staged byte hashes/lengths, exact before-images/absences, full fragment/input/tool/inventory hashes, primary/admin/secondary inventories, source channels and genuine author/reviewer assignments. Leave reviews empty until real review; no fake pending/`changes-needed` placeholder approvals.
4. Before review, enumerate only reserved-review reference/binding diagnostics. Any missing concept/anchor/reference, invalid source, privacy or structural failure blocks the freeze.
5. Different reviewers inspect **every lesson/concept, every formula/worked example/used supplied or supplemental answer, every relevant figure/table and every source-unit teaching mapping**. Every lesson must score **2/2 on each of eight dimensions**, with concrete anchors; no sampling, averaging, author self-approval or recycled advisory verdicts. Separately review all **153 administrative exclusions**.
6. Require explicit coverage-record subjects in the genuine reviews. Whole curriculum/coverage/units/manifest and transitive teaching/source/assets are hash-bound; **any global curriculum/coverage edit invalidates all affected teaching approvals**. Include each reviewer report's hash and source-QA evidence actually relied upon. `reviews.json` must not hash itself. The validator does not itself enforce written rubric scores, null-evidence rejection or human independence; passing it is insufficient.
7. Independently bind authored numerical inventories to the unchanged 92-case/110-test oracle plus fresh calculations. That oracle explicitly retains pending lesson bindings; do not edit it merely to manufacture completeness.
8. Assemble authentic reviewer records and run full captured overlay validation with **zero errors**, plus the stronger independent **385 taught substantive units + 153 reviewed administrative exclusions** audit. Backend `teachingComplete` alone permits weaker dispositions and is not enough.
9. Quiesce writers and live capture/query/build/direct validators; coordinate the existing ingestion gate without stealing/breaking locks. Compare frozen inputs/baselines, stage exact before-images, install teaching/docs/evidence, curriculum/coverage, then reviews last; verify installed bytes and validate. Restore exact before-images on failure and keep recovery blocked if restoration cannot be proved. This multi-file promotion is **not atomic**; only the later publication-pointer switch is.
10. Run source/coverage/graph/retrieval/numerical/regression checks, then a nonpublishing build, then deliberate reviewed publication. Preserve old immutable generations and learner state.

**Exit:** fresh authentic reviews and semantic/coverage audits—not authored labels—prove comprehensive four-lecture teaching. Global conversion may honestly remain incomplete because transcript/book semantics are unfinished. Do not claim all-context verified conversion or learner mastery.

### 3. Finish and independently review the renderer

Read [renderer RESUME.md](.omx/artifacts/g007-renderer/RESUME.md), [DESIGN.md](DESIGN.md), [delivery architecture](.omx/plans/g007-delivery-architecture.md), [wire clarification](.omx/artifacts/g007-delivery-detail-clarification.md) and [trusted authored dialect](.omx/artifacts/g007-v3-publication/authored-dialect-handoff.md).

`study/app/render.mjs` exists. Its API is `async renderDocument({text,documentId,routes,onNavigate})`, returning `{element,anchorElement(anchor),dispose}`. It renders disconnected DOM; reviewed routes fetch complete selected bytes. The callback receives a closed selected target and trigger.

Fresh pause-continuation evidence: **7/7 focused tests pass**, **16 protected hashes match**. The full suite was **interrupted (exit143)**, not passed; chained static checks did not run. Historical author browser evidence records 11 groups/249 actual concept formulas/33 loopback requests/zero external, inspected but not rerun by the resumed writer. No independent renderer approval exists.

Remaining work:

- Refresh compatibility against **all final authored files and intended formula inventories**, not only recognized tokens. Conservative dollar parsing must preserve financial currency/code and correctly recognize intended `$…$`, `$$…$$`, `\(…\)` and `\[…\]` mathematics. Earlier snapshots/inventory matches are not whole-course proof.
- Resolve the documented `trust:false` unsupported-command/fidelity question: a screenshot shows red `\href` output rather than explicit full-formula fallback. Inspect and regression-test; do not weaken sanitization/trust to “fix” appearance.
- Correct stale wording in the renderer's owned design artifact about numeric-leading math, finish full/relevant/static checks and protected hashes, rerun the isolated native harness and inspect 1280/375 screenshots.
- Prove readable fractions/roots/powers/subscripts/sums/matrices/long equations/tables and full TeX fallback; namespaced exact anchors; safe/inert unsupported links; owner-authorized image decode; full long/fourth-document content; hostile HTML/URL/SVG/MathML/clobber/macro/oversize cases; zero external page requests and owned helper cleanup.
- Freeze the slice and obtain genuine independent review. Do not infer screen-reader conformance, final app styling or canonical source-provenance acceptance from synthetic renderer screenshots.

### 4. Resolve the mandatory observability gap before calling G007/G008 complete

The paused read-only architect found this **unproven**, not approved or implemented. Full recorded findings: [observability assessment](.omx/artifacts/handoff/observability-gap-architecture.md).

The accepted test specification requires generation-bound, policy-filtered source/page/coverage/rubric/graph/freshness/numerical/tool reports, command status/input digest and browser-visible missing-source warnings. Current `report.json` has only readiness/status/draft/omission information; v3 adds reader/UI but not those detailed reports. **Do not simply enrich `index.md`: its exact bytes are validated by existing historical contracts.** The v2/v3 report-root validation nuance is not permission to append arbitrary fields.

Complete the architecture assessment and choose a minimal explicit compatible design. The stopped architect's *candidate*, **not an accepted decision**, is a versioned derived report payload at the existing `report.json` member for newly produced v3 generations, preserving strict historical schema1 branches/membership. It needs closed old/new validators, parent/draft binding, policy-filtered provenance, genuine hash-bound rubric/numerical evidence and historical/canary/redaction/stale/determinism/browser tests. Missing-source free text has no canonical channel fields; define a safe policy rather than dumping labels/reasons/canonical data.

### 5. Build the remaining browser application and safe state integration

These files are still **absent**: `study/app/app.mjs`, `study/app/index.html`, `study/app/styles.css`. Do not treat the existing server/modules as a finished reader.

Preserve the reviewed foundations and their exact contracts:

- [Reader projection final review](.omx/artifacts/g007-reader-projection/final-independent-review.md).
- [V3 publication re-review](.omx/artifacts/g007-v3-publication/independent-re-review.md): immutable UI/vendors/reader, genuine v1/v2 compatibility, exact membership and full precommit revalidation.
- [Loopback server re-review](.omx/artifacts/g007-loopback-server/independent-re-review.md): fixed loopback origin, read-only allowlists, Host/Origin/target guards, bounded shutdown and verified cached historical generations.
- [Routes/state re-review](.omx/artifacts/g007-learner-state/independent-re-review.md): both selector-filename/content-hash bugs closed; fresh 149 relevant/24 focused tests, 15 actual native Chrome state/route groups, 19 protected hashes. Separate network observer saw 38 requests to one loopback origin and zero external; counts are not additive. Author's full suite was 688 tests at that earlier code snapshot.

Implement the complete DESIGN/spec experience: prerequisite-aware roadmap/resume; full lesson/concept/outcome/practice/separate answers/teach-back; evidence rail with precise admitted text/page groups and approved original raster; full-text search; typed knowledge graph with usable list alternative; source/correction/missing/incomplete/draft/status notices; external-agent instructions; learner-owned notes/answers/assessment; import/export/recovery and recoverable orphan records. Do not fabricate fields, lessons, unavailable source data or readiness/mastery.

Keep these integration boundaries explicit:

- Normal schema1 learner-state download is missing; only `downloadRecovery()` exists. Add a minimal separately tested/reviewed state-only download API. Blob/ObjectURL operations belong in `state.mjs`, not app data-URL/clipboard workarounds.
- `applyImport` changes memory before its transaction. Defer/block application while dirty, or first successfully commit/backup current work and verify it is clean. Failed/conflicting save must not call import or destroy the original unsaved draft. This is an integration requirement, not a new independently confirmed state-module defect.
- Restore actual DOM focus/selection/anchor/route/scroll after explicit refresh, not only stored metadata. Prevent navigation when checkpoint fails/conflicts/is still dirty. No hot swapping G2 content under G1 code or automatic mastery.
- Preserve corrupt/incompatible raw data; no auto-reset/clear. Two-tab conflicts must preserve both drafts. Respect the existing 32-draft bound and honest failure/export behavior; no silent deletion or last-writer-wins retry.
- Obey the trusted authored-code/CSS/import/resource dialect and exact `bootstrapHTML`; keep local pinned vendors/license bytes. MathML-only is a candidate requiring real fidelity/accessibility proof, not permission for arbitrary source HTML/MathML/SVG.
- `buildPublication(...,{builderVersion:3})` exists, but the default is **2**, and the current build CLI has **no v3 flag**. Introduce/review a supported deliberate v3 publication surface after the full app exists; do not silently weaken old formats. A current legacy publication cannot display the new reader.

### 6. Prove G007 through the actual browser

Implement the missing `scripts/study-test-browser.mjs` command and npm wrapper only when real. It must use an available approved tool, fail honestly on setup failure and close its isolated owned browser/server. Synthetic fixtures only for learner data.

Fresh mandatory acceptance includes:

- 1280px desktop and 375px mobile roadmap → lesson → source comparison → concept graph/list → search → resume, full content/answers and precise source images/locators.
- Keyboard-only reachability, logical/restored focus, skip links, labels/landmarks/headings, no traps, visible focus, contrast, zoom/reflow and reduced motion; manual math/figure inspection. Name any actually tested assistive technology; do not imply untested conformance.
- Unsaved teach-back + external multi-file edit/publication; safe explicit refresh preserving draft, route, focus/selection/scroll and progress. Invalid JSON/link, deleted lesson, same-mtime edit, partial batch and repair retain last-good content and show truthful stale/error/update state.
- Exact save/reload/export/import roundtrip; dirty-import guard; actual two-tab conflict; corrupt/incompatible/disabled/quota/backup/import rollback; orphan notes; fresh learner starts not-started. Label injected faults as injections, not real disk exhaustion or OS-crash durability.
- Hostile Markdown/HTML/URLs/diagram labels/math/macros/clobbering, traversal/encoded paths/symlinks/out-of-root, foreign Host/Origin and forbidden write methods; no private source/state payloads, shell/write/provider endpoints, unexpected external/CDN traffic or mixed generations.
- Actual production v3 generation/server behavior and resource/performance checks, not only tiny synthetic fixtures. Preserve genuine historical v1/v2/v3 snapshots and last-good behavior.

### 7. Complete G008 release evidence and final goal gates

Use the full [accepted test specification](.omx/plans/test-spec-fd-study-helper.md), not just this checklist. Before final completion:

1. Reconcile README/CONTEXT/contracts/DESIGN and document **actual** install/start/query/read/teach/edit/review/publish/refresh/export/import/recovery commands and versions. Maintain the portable entry budgets/manual startup; no mandatory OMX/plugin/provider SDK for ordinary agent use.
2. Fresh source/original/coverage/financial/provenance/security audit: all 13 original hashes, 116 frozen pilot files, exact 385 taught +153 independently reviewed exclusions, every outcome/practice/answer, no unresolved substantive errors, current complete review closure, no restricted lineage leakage. Global semantic conversion limitations remain visible.
3. Fresh isolated pilot replay: [existing report](study/test/pilot-revalidation-report.md) is **implementation-stale after G007 core changes**. Revalidate with current tooling without modifying the frozen pilot bytes or relabelling the provisional lesson production-ready.
4. Isolated Git checkout/roundtrip byte-portability audit, including CRLF/case-sensitive paths and exact review/source/pilot hashes; no original normalization/history rewrite.
5. Fresh complete graph/query/read tests: late text beyond character3,000 and fourth-or-later article, full UTF-8 revision-pinned chunk reconstruction, typed traversal/reverse coverage, exact anchors and prerequisite DAG. Keep Understand-Anything pinned at `b8c807c632743ab695ec43cb654a0f1efe216bc8`, explicitly **disabled-unverified** unless genuinely validated; optional disabled integration is acceptable.
6. Two new clean-context external-agent trials against actual production: source-grounded beginner teaching with prerequisites/missing-source admission; bounded correction with outcome/coverage/log/review and valid explicit publication while preserving originals/progress. Include hostile-source-as-data behavior and measured initial-context continuations. Old synthetic trials are not substitutes.
7. Clean deterministic rebuild twice on unchanged accepted inputs; compare actual digests/semantic bytes, run all regression/static/browser checks and publication/original checks. There is currently **no `--check-determinism` build flag**; do not invent it.
8. Run the installed **ai-slop-cleaner** workflow on changed scope with behavior locked by tests, then rerun verification. Keep writer/reviewer separation. **Do not remove the unrelated `git` dependency**: test-spec line42 forbids that cleanup. Record/reassess inherited dependency audit risks rather than silently changing packages.
9. Obtain independent final **code-reviewer AND architect** clean verdicts and audit every domain/architecture invariant. Record real blockers through supported Ultragoal tooling; do not mark complete from a green build or lack of obvious errors.
10. Only once all mandatory work is proved complete: native `update_goal({status:"complete"})`, fresh `get_goal`, then official final checkpoint with cleaner/verification/independent-review/architecture evidence. Intermediate stories use supported checkpoints while the aggregate stays active. Never edit goals/ledger manually or clear a native goal from shell.

## Verified command surface and evidence limits

Commands below were checked against the current source parsers/package scripts; expensive/mutating runs were **not repeated during the paused handoff task**. Run them on the destination only after byte restoration/tooling/runtime checks and user resume. Existing pass counts above identify their historical scope; they do not certify the final destination or unfinished code.

```sh
# Original preservation, canonical checks and bounded syntax/static checks
node scripts/study-inventory.mjs --check
node scripts/study-validate.mjs --sources --coverage --curriculum --context-budget --graph
node scripts/study-check.mjs --syntax --static
node --test study/test/*.test.mjs

# Focused unfinished renderer and frozen numerical oracle
node --test study/test/reader-render.test.mjs
node --test study/test/financial-golden.test.mjs

# Frozen-pilot isolated replay; inspect its report/freshness rather than edit pilot
node scripts/study-revalidate-pilot.mjs

# Existing nonpublishing build (currently defaults to builder version2)
node scripts/study-build.mjs --json
node scripts/study-check.mjs --publication-boundary --original-hashes
```

For noncanonical prep, follow its README and choose a **new unused** lowercase output directory. The supported shape is `node .omx/drafts/g006-integration-prep/preflight.mjs --full --output=proposal-04`; use that exact name only if still absent. It internally validates restricted integrity inputs locally without displaying/staging their bytes. It is not a final freeze/promotion command.

After genuine acceptance, current explicit publication syntax is `node scripts/study-build.mjs --publish --json`; explicit unreviewed preview adds `--preview-draft` and never counts as reviewed teaching. This CLI is still v2 until a reviewed v3 surface is added. Server syntax exists as `npm run study-serve -- --port 4173`, bound to `http://127.0.0.1:4173`; **a legacy generation returns no reader bundle**. Do not claim a working app before v3 delivery/acceptance. Port changes create a different learner-storage origin.

Avoid historical proposed-but-unimplemented flags (`study-validate --pilot/--privacy/--references`, `study-build --check-determinism`) and nonexistent example IDs. Retrieve a real query hit and its revision before `study-read`; keep draft warnings and byte continuation metadata. Do not execute private reads into an agent context.

## Artifact map and frozen reference hashes

| Artifact | Role |
|---|---|
| `.omx/ultragoal/brief.md`, `goals.json`, `ledger.jsonl` | Accepted full objective, story status and audit trail; leader-owned official writes only. |
| `.omx/plans/fd-study-helper-review-index.json` | Accepted sequential planning-review evidence; historical “planning-only” headings are not current execution status. |
| `.omx/plans/prd-fd-study-helper.md` | Full accepted requirements; SHA256 `aefd802fbddb3c1fba9716f2735276b4dd3a9329b466de8d8bb72448a383f3bc`. |
| `.omx/plans/test-spec-fd-study-helper.md` | Mandatory acceptance matrix/tests; SHA256 `de12b1ecf2c8df006bc73e9645e3822c39a9b4afb2e69ed763d0f9de03e5e762`. |
| `.omx/plans/g006-curriculum-decomposition.md` | Exact planned46 lessons/16 concepts and385 primary unit IDs; parse embedded JSON selectively, not clipped whole output. |
| `.omx/drafts/g006-lecture-{1,2,3,4}-fragment.md` | All append-only lesson records/matrices/formula/example/answer inventories; parse every block. |
| `.omx/drafts/g006-shared-bridges-fragment.md`, `g006-financial-concepts-fragment.md` | Concept records plus separate inventories; not canonical JSON wrappers. |
| `.omx/drafts/g006-*-report.md` and matching check/retrieval/baseline outputs | Author evidence and exact file preservation; not independent acceptance. |
| `.omx/artifacts/g006-integration-prep/REPORT.md`, `.omx/drafts/g006-integration-prep/` | Reusable evolving overlay prep, ten targeted tests and historical proposals; no approvals/promotion. |
| `study/sources/{manifest,units,coverage}.json`, `qa-drafts/`, `qa-reviews/` | Canonical source identities/accounting/coverage and durable exact-byte source QA. |
| `study/pilot/` | Frozen116-file exploratory evidence; never modify. Aggregate historical digest `574b07e5b64153fcb82bd7c072691a3e56661eeb0364e7367f0f5a8960f50c04`. |
| `.omx/artifacts/g007-*` | Dependency, privacy/case-path, projection, bundle, server, route/state, browser-runtime and partial-renderer evidence. Prefer final independent re-reviews over earlier request-changes reports. |
| `study/private/` | Restricted local derivatives/QA; authorized backup bytes only, not ordinary provider/browser exposure or learner-state storage. |
| `study/generated/` | Historical immutable generations; current pointer remains `7852853cc7e4e0f1b0c463985000d2e0418322d8cefc8c99319bb59d8d332a00` (old v2 draft), not current teaching. |

Critical pause hashes (verify against the restored files):

- L4 checkpoint: `a8bd84af2635ee1180a02112b53ea67b5cc1327a6786891d6ec8802693cc1c94`.
- Renderer checkpoint: `2d62222d24bca4534249fcab6f4a5c9125bb1c57ecd7c4677165b6088bac4298`.
- Five-block L4 fragment: `04daf3e264df05849f748ebe756a57978094b9ce5b825069aec3b1efb494d189` (925,813 bytes).
- Six-block financial fragment: `0b54a090e3ba33b15ededf9ba011cb8bb3e3f48f2cfbc79d537b2724811b6713` (730,496 bytes).

All authoring/rendering lanes were told to stop. The final resumed renderer validation process was explicitly stopped and returned143; no owned browser/server was left running by those checkpoints. Recheck real live state on the destination; never kill processes using these historical numbers.

**Stop condition for this handoff:** preserve and verify the complete resumable work, not finish the study app under a paused goal. The next implementation session must close every remaining gate above before final completion.
