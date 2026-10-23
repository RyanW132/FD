# Design

## Source of truth

**Status:** Draft — implementation contract, not an implemented or accessibility-certified interface.  
**Date:** 2026-10-22. **Owner:** G007 frontend implementer; leader approves scope/schema changes.  
**Product surfaces:** local browser reader, knowledge explorer, source comparison, learner-owned notes/self-assessment, publication/status and manual-agent instructions.

### Observed evidence

- [CONTEXT.md](CONTEXT.md) and [portable bootstrap](study/contracts/AGENTS.md): beginner-first four-lecture teaching, portable file-authoring agents, explicit immutable publication, separate learner state, incomplete production teaching.
- [Privacy](study/contracts/privacy.md), [source](study/contracts/source.md), [editing](study/contracts/editing.md) and [curriculum](study/contracts/curriculum.md) contracts: frozen records/references, transitive channel restrictions, exact source locators, full retrieval, honest readiness and review states. These govern this design; UI proposals do not change schemas or permissions.
- Approved [PRD](.omx/plans/prd-fd-study-helper.md), particularly “Browser boundary and learner state,” “Immutable generation and teaching approval,” and implementation gate 5; [test specification](.omx/plans/test-spec-fd-study-helper.md), sections 4–7. Historical runtime-blocker text in the plan is not current runtime evidence.
- [Rendering research](.omx/context/g007-rendering-dependencies.md): inspected candidate pins Marked 18.1.1, KaTeX 0.19.0 and DOMPurify 3.4.17; local-only bundles, sanitization and MathML candidate constraints. Research is not installation or browser proof.
- `package.json`: Node/plain JavaScript tooling, inherited `git` dependency, no frontend framework or renderer dependencies installed at inspection. `study/lib/publication.mjs` / `knowledge.mjs` provide immutable catalog/report/graph/search contracts; no existing FD app, HTML/CSS tokens, component library, screenshots, mockups or browser baselines were found. No BAYES code, private learner state or textbook content was read/copied for this design.
- Snapshot at design preparation: 628 independently verified course-source units across 162 PDF pages; raw retention is wider than verified exposure. Canonical curriculum collections currently contain zero lectures/lessons/concepts/outcomes/exercises. G006 proposes 46 lessons and 16 concepts covering 385 substantive lecture units; these are **planning inputs**, not published teaching or a fixed count acceptance target.

### Proposed decisions and assumptions

Use the working label **FD / Fieldnotes** in app chrome and “Financial derivatives study helper” in the document title; this is a reversible visual label, not a new product scope. Assume personal desktop/laptop study plus mobile reading, English copy, current Chromium as the first exercised browser, and browser storage on the local app's origin. Do not promise cross-browser/screen-reader coverage without evidence. No visual reference or generated assets are required. This file is the UI decision source of truth, not a new parallel canonical content model.

Evidence-budget record: the entry bundle is 11,043 bytes; the required privacy/source/editing/curriculum group is 26,129 bytes. An explicit continuation was declared **before** reading that group, rather than omitting contracts or retroactively relabelling an overflow. Relevant plan/test sections and rendering research were read in continuation. This preparatory task is not a clean-context acceptance trial.

## Brand

- **Personality:** calm, precise, patient and scholarly; a working notebook, not a trading terminal or gamified productivity dashboard.
- **Trust signals:** exact physical-page/span citations, labelled supplements/corrections, visible publication revision, independent content-review state, and honest missing-evidence notices. Show how a result follows, not decorative confidence scores.
- **Memorable differentiator:** a persistent **evidence rail** lets the learner compare a careful explanation with its exact source image/span without losing their place or unsaved work.
- **Avoid:** neon market colors, gradients/glass cards, stock-market hero imagery, AI sparkle/chat bubbles, streaks/leaderboards, fake completion percentages, and using green reviewed badges to imply learner mastery.

## Product goals

1. Help a complete beginner find the next prerequisite, read a full explanation, work an example, attempt practice and describe the idea back in their own words.
2. Make every lesson/concept/outcome and relevant source unit resolvable in full; search and graph are entry points, never substitutes for content.
3. Keep source fidelity, content readiness and the learner's own assessment visibly distinct.
4. Support external repository-agent authoring followed by deliberate validated publication; retain the last-good browser content through invalid/partial edits.
5. Preserve personal work through navigation, refresh, concurrent tabs, storage errors, imports and removed IDs.

**Non-goals:** embedded chatbot, AI API/provider SDK/key entry, automatic grading/mastery, trading recommendations, cloud deployment, arbitrary filesystem/PDF serving, browser content-write/shell endpoints, textbook exposure, exporting denied course content, or enabled Understand-Anything compatibility claims.

**Success signals:** complete roadmap→lesson→exact source→concept/list→search→resume journey at 1280 px and 375 px; full text beyond character 3,000/fourth article remains discoverable; accessible math/figures; independent state roundtrip and failure recovery; no unexpected network requests; all G007 gates below supported by fresh evidence. Completion counts come from the selected publication, not hard-coded proposed counts.

## Personas and jobs

| Persona / context | Job | Design response |
|---|---|---|
| New derivatives learner, desktop study session | “Start from what I know, explain every symbol, then let me try.” | Ordered roadmap; prerequisites before use; readable full lessons; distinct exercises/answers and teach-back. |
| Returning learner, mobile or short session | “Return to my exact place without losing my answer.” | Resume stable lesson/anchor; locally saved status; stacked source view; explicit self-assessment. |
| Evidence-checking learner | “What did the slide actually say, and what was corrected?” | Exact physical page/region, semantic transcription plus original allowed image, source-error labels. |
| Learner using an external subscription agent | “Have my agent improve a lesson safely.” | Manual instructions explain file-authoring/publish boundaries, provider transfer and checks; app never runs agent commands. |

These are inferred usage scenarios, not interviewed personas or permission grants.

## Information architecture

### Navigation and routes

Use a compact header with product name, Search, Knowledge, Status and Instructions. A secondary roadmap rail is available inside study screens. Use logical client routes keyed by validated **stable record IDs**, not file paths; the concrete URL syntax is the implementer's choice and must be documented/tested. Suggested route intents:

- **Roadmap / home:** course purpose; resume when learner state exists; lectures with ordered lessons, prerequisite links and separate content/readiness versus personal-state labels. No fabricated lectures or sample production cards when the publication has zero lessons.
- **Lesson `ID` / anchor:** breadcrumb, title, content-review status, observable outcomes, prerequisite links, full body, exercises with separately anchored answers, teach-back, previous/next suggested lesson. Preserve authored section order/content rather than constructing a clipped summary. Concepts open full concept content, not just a tooltip.
- **Source `unitID`:** exact physical page plus region, original transcript line range where allowed, normalized source span, caution/correction labels and approved original page image. Use the citation's closed reference and current generation mapping; printed slide number is secondary and must not replace physical page.
- **Knowledge:** equivalent **List** and optional **Map** views, typed relationship filters, prerequisite explanations and full-content links; reverse “Used in” teaching/source coverage. List is the default usable baseline. Every graph node resolves a full allowed record/content/locator or an honest unavailable state. `requires` alone governs prerequisite order; related/contradicts can cycle and do not become study prerequisites.
- **Search:** full-text selected-generation search with typed results, source-versus-teaching labels, exact locator/anchor, complete result navigation and an honest zero-results state. Snippets are previews; opening retrieves the complete selected span/document. No three-article/tour cap or hidden truncation. An expandable result list needs explicit continuation/counts, not silently missing hits.
- **Status:** current publication digest, last successful publication, independent accounting/conversion/teaching readiness, draft flag, safe omissions/missing-companion information and update errors. Show only policy-approved metadata; never restricted paths/names/excerpts.
- **Instructions:** actual installed start/read/check/publish commands and portable bootstrap links; explain “files authored by an external agent → validate/review → explicit publication → refresh.” Commands are selectable text, not executable browser controls. Label unavailable commands as unavailable rather than guessing.
- **My study:** learner-owned notes, self-assessment, export/import and recoverable orphan notes. It is not a content editor or a course-export feature.

### Lesson composition and evidence rail

At wide widths use roadmap rail → reading column → optional evidence rail. Show outcomes/prerequisites before the main explanation; a compact on-page contents list can link to existing authored anchors. Keep reading width near 68 characters. Inline **View source** opens the cited span/page beside the same lesson; choosing a different citation updates only that rail. Rail header names the source locator, with Close and explicit “Return to citation” focus restoration. A source's accessible text and image are complementary: neither automatically replaces the other.

On narrow screens stack the source below its labelled source heading, with a “Back to explanation” link. Do not use a cramped permanent split pane or force modal reading. Current selected citation and route are recoverable on back/forward and refresh. Do not hijack browser Find, text selection or standard link/new-tab behavior.

### Source resolution boundary

Images/links resolve only through the selected immutable generation's catalog and exact manifested asset allowlist. No raw filesystem route, guessed PDF anchor or fallback to live canonical files. Existing raw-Markdown links not captured in the generation must render as inert, clearly labelled **“Raw evidence link unavailable in this reader”** text, or receive an explicitly approved resolved mapping before becoming links. A `.png` extension or same-origin URL alone is insufficient authorization. Missing references are visible local errors, not blank panels or a broad source-directory browser. Unknown/restricted evidence gets a generic notice without sensitive filenames. All in-view lesson/source bytes stay pinned to one generation until an explicit safe refresh.

## Design principles

1. **Read, reason, verify.** Prioritize explanation and source comparison over dashboard decoration. Long lessons may use a contents list, never summary-only replacement.
2. **Two separate truths.** “Content independently reviewed” describes authored material; “I can explain this” is a learner choice. No automatic learned tick on read, refresh, answer reveal or publication.
3. **Visible uncertainty.** Preserve original errors and labelled interpretations; never silently normalize away a disputed sign, convention or source inconsistency.
4. **Work survives content.** Stable IDs and non-destructive backups outweigh convenience. A failed update/import/storage write keeps current readable content and recoverable work.
5. **Local does not mean unrestricted.** No external resources or content uploads from the reader. Browser-local notes are not OS-level security; external agents can contact their provider.
6. **Equivalent paths.** Every useful map interaction exists in the keyboard-operable list. Motion, hover and color are enhancements, never required understanding.

## Visual language

### Color and tokens

Define one stylesheet-owned CSS-variable palette; map components to semantic tokens rather than isolated colors:

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f7f5ee` | Warm page background |
| `--surface` | `#fffef9` | Reading/source panels |
| `--ink` | `#182e2c` | Main text/headings |
| `--muted` | `#526560` | Secondary text, still readable |
| `--accent` | `#17685b` | Primary button background / active rule |
| `--link` | `#115e59` | Underlined content links |
| `--border` | `#bdc7bf` | Decorative dividers, not sole control boundary |
| `--control-border` | `#65766f` | Input/control boundary on light surfaces |
| `--focus` | `#075a9c` | 3 px offset focus outline |
| `--warning-bg` / `--warning-ink` | `#fff1cb` / `#805000` | Persistent draft/incomplete warning |
| `--error-bg` / `--error-ink` | `#fff0ec` / `#963b36` | Errors / failed saves |

Proposed-token relative-luminance calculation (not a rendered UI audit): ink/paper 13.13:1, muted/paper 5.68:1, link/surface 7.51:1, white/accent 6.63:1, warning pair 6.10:1, error pair 6.36:1, focus/paper 6.52:1 and control-border/paper 4.40:1. Recheck actual adjacent backgrounds/states and browser rendering.

Primary buttons use white text; disabled controls retain an explicit explanation rather than relying on washed-out color. Badges use words plus shape/icon, not red/green alone. Proposed palette must be checked in actual rendered combinations; this document does not certify contrast. No dark mode requirement for the first delivery; do not ship an untested inverse palette.

### Typography

System stacks only: UI/body `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`; headings may use `Georgia, "Times New Roman", serif` for a measured academic voice; code/formula fallback `ui-monospace, SFMono-Regular, Consolas, monospace`. No remote fonts. Body 17–18 px desktop / 16–17 px mobile, line-height 1.65; hierarchy approximately 32/26/21/18/15 px with fluid heading scaling. Preserve browser zoom and user font settings; use rem/em units and no fixed-height prose. Headings are semantic, not chosen for appearance. Use tabular numerals only in numerical tables/status, not whole paragraphs.

### Spacing, shape, elevation and motion

Spacing rhythm 4/8/12/16/24/32/48 px; reading section gaps 24–32 px. Radius 6 px for controls and 10 px for bounded panels. Fine borders and a restrained raised header only; avoid card nesting/shadows on every paragraph. Motion 120–160 ms for color/opacity state changes; no graph simulation, parallax, auto-scrolling progress animations or animated reading transitions. Under `prefers-reduced-motion`, remove nonessential transitions and smooth scrolling. Focus/scroll restoration should be immediate and predictable.

### Imagery and iconography

Use only authorized original raster source images and meaningful descriptions. No decorative illustrations required. App-owned simple text/CSS indicators or small code-native icons may supplement labels; do not add an icon package. Mark decorative icons hidden from assistive technology. Untrusted prose cannot introduce SVG, CSS, embeds or arbitrary MathML. Do not generate misleading replacement source figures. For a source plot provide axes/units/legend/direction/geometry in accessible text; an image title alone is insufficient.

## Components

No existing frontend primitives were found. Build the smallest coherent set in the eventual `study/app/` surface, with names below descriptive rather than a mandatory framework API:

| Component | Required behavior and variants |
|---|---|
| App shell / navigation | Skip links, active page, generation indicator; compact/mobile navigation without hover-only controls. |
| Publication banner | Persistent draft/unreviewed; incomplete vs reviewed content; stale/update-available/failure states; never dismiss a draft warning permanently. |
| Roadmap section / lesson row | Ordered prerequisite-aware links; independent content-state and learner-state text; empty/pending variants. |
| Lesson reader / contents | Full sanitized prose, preserved explicit anchors in a content namespace, outcomes/prerequisites, selectable/copyable text. |
| Citation control / evidence rail | Exact locator; source text and approved image; loading/missing/unsupported/close/return-focus states. |
| Exercise / answer disclosure | Label supplied vs supplemental; native disclosure or equivalent accessible button; revealing an answer does not change progress. |
| Math block / formula source | Semantic readable math, selectable original TeX and visible fallback; no silent formula loss. |
| Knowledge list / optional map | Typed relationships, filters and complete links; list alone covers every map action; no forced layout dependency. |
| Search form / result | Explicit submit or safe client search, result count, type/locator, complete navigation, zero/error states; no content-bearing remote query. |
| Learner workspace | Explicit Save, dirty/saving/saved/failed/conflict status, teach-back/notes, explicit self-assessment; no automatic grading. |
| State transfer / recovery panel | Own-state JSON import preview, validation, backup/rollback, orphan/conflict recovery and export; no course content bundling. |
| Status panel / notices | Distinct accounting/conversion/teaching flags, missing evidence, safe generic omissions and current revision. |

**Token ownership:** the app's single CSS token layer owns visual values; components consume it. Canonical Markdown/JSON is not styled by rewriting authors' content. App-owned chrome may use trusted templates; untrusted prose always follows the distinct renderer pipeline. Do not invent record fields/aliases merely to power a component; report missing publication metadata upward, then obtain an approved extension or reduce the UI honestly. No live-canonical read workaround.

## Accessibility

Target **WCAG 2.2 AA** for implemented surfaces, with manual checks; this is a target, not a present conformance claim.

- Semantic header/nav/main/aside, one page-level h1 and logical heading hierarchy; labelled Search, source, notes and status regions. Skip to lesson and learner workspace; keyboard users can bypass long navigation/source content.
- Native links/buttons/form labels/disclosures first. Logical DOM/tab order follows reading order. Visible 3 px focus indicator must not be obscured by sticky chrome. Escape closes transient menus, restores trigger focus; source rail is nonmodal and must not trap focus. Announce update/save/errors using concise polite status; urgent data-risk errors may be assertive, without rereading full lessons on every keystroke.
- Aim for 44×44 px touch controls, at least applicable AA target-size requirements. Underlined content links; no color-only status. Verify 4.5:1 normal text, 3:1 large text and control/focus contrast, including error/disabled explanations.
- MathML-only KaTeX is the preferred candidate under the no-user-SVG rule. Verify fractions, roots, powers, subscripts, sums, matrices, long formulas and accessible reading order in the actual browser; retain selectable original TeX and authored symbol/unit explanations. Unsupported math gets a visible readable fallback, not a spinner or missing expression. No claim of screen-reader success without a recorded assistive-technology check.
- Original figure images have useful alternative/adjacent descriptions; large page images retain normalized semantic text. Wide tables use real table semantics, headers and a labelled keyboard-scrollable container. Long math may get its own labelled scroll region; the whole page must not become horizontally scrollable at mobile/zoom widths.
- Test 200% zoom and narrow reflow, keyboard-only flows, reduced motion and user text selection. Do not disable zoom. Never rely on hover, drag, tooltips, a canvas or tiny graph labels as the only access path.

## Responsive behavior

Proposed content-driven breakpoints; verify rather than assume:

- **≥1040 px:** header, 14–16 rem roadmap rail, flexible reading column (maximum about 68ch), optional 22–28 rem source rail when selected. At 1280 px, keep actual text readable by collapsing the roadmap first when source comparison is open. Do not force all three columns to tiny widths.
- **720–1039 px:** compact roadmap disclosure/rail, full reading width, source stacked unless a usable two-column comparison genuinely fits. Keep open-state labels/focus predictable.
- **<720 px / 375 px acceptance:** single-column flow, wrapped header navigation or labelled menu, full-width reading and stacked source. Notes remain after relevant practice/teach-back, not offscreen in a horizontal drawer. Controls wrap without overflow; tables/formulas have independent scroll containers.
- A closed source view does not reserve empty space. Pointer/hover may highlight citations but cannot be needed to open them. Keep status/draft warning visible and wrapping; no fixed overlay hides content or focused controls.

## Interaction states

| Situation | Required visible response and preservation rule |
|---|---|
| Initial load | Plain “Loading published study content…” status; retain shell and avoid fake progress. On failure, explicit retry; no placeholder teaching counted as real. |
| No published generation / zero lessons | Distinguish “No publication available” from “Sources available; teaching not yet published.” Offer actual instructions/status and available allowed sources; never manufacture a roadmap. |
| Draft / incomplete / reviewed content | Persistent draft warning on every screen/reader; independent readiness labels. Reviewed source evidence does not make a lesson reviewed. No state implies mastery. |
| Missing source/evidence or unsupported raw link | Exact safe public locator where available; generic restricted notice otherwise; clear unavailable-target text. No guessed content or filesystem fallback. |
| Lesson navigation / answer reveal | Preserve dirty notes and route history; reveal does not mark learned. On a new route focus the main title unless returning to a recorded anchor; avoid stealing focus during typing. |
| Dirty notes / unsaved teach-back | Show “Unsaved changes” immediately and provide explicit Save. Hold in-memory draft across navigation/source selection. Attempt non-destructive draft recovery only through the chosen safe state mechanism; never report saved before storage succeeds. Warn before reload/close/refresh when unsaved work remains; browser unload warnings are best effort, not a durability guarantee. |
| Storage unavailable / quota | Keep current draft in memory, display “Not saved on this device,” offer own-state/draft download; block destructive replacement. Do not clear working data to make space automatically. |
| Corrupt or incompatible storage | Preserve original raw value as recoverable backup; do not overwrite it with an empty default. Explain recovery/export and allow an explicit fresh start only after preserving recoverable data. |
| Two tabs edit same note | Detect version/revision conflict; block last-writer-wins overwrite; retain both drafts, identify the conflict and allow each to be exported/reconciled. Do not log note contents. |
| Import own-state JSON | Validate size/schema/version/stable IDs and preview changes before explicit apply. Back up current and incoming raw state; failed validation/write/migration leaves prior state active. Preserve unmatched IDs as recoverable orphan notes, never reassign them by title/order. Roundtrip must preserve exact answer/progress text. |
| New valid publication available | Polling may **offer** “New study content available”; never auto-publish, auto-debounce or silently swap the reader. On explicit refresh preserve stable route, anchor/scroll, selection/focus where restorable, in-memory drafts and progress. If a focused field cannot survive safely, defer swap with an explanation. Source edits do not award mastery. |
| Invalid/partial edit or failed update | Keep the last-good immutable generation pinned; show stale/update error with last successful revision. A repaired valid explicit publication becomes available without clearing state. |
| Removed/renamed lesson | Preserve personal work under its stable ID as recoverable orphan; explain unavailability and offer own-state export. Use only approved aliases/migrations, never nearest-title guessing. |
| Server offline/slow | Keep already rendered content and personal draft in memory; tell the learner which new content could not load. No unsupported service-worker/offline-restart guarantee. No silent switch to live files or external services. |
| Successful local save/export | Short, nonmodal confirmation with honest destination. “Saved on this browser” is not “backed up,” encrypted, or stored in repository files. Export contains learner-owned state only, no denied course content/images. |

Suggested learner self-assessment options are “Not started,” “Working on it,” and “I can explain this”; these are explicit personal choices, not inferred grades. If canonical learner-state requirements already choose another equivalent vocabulary, preserve that contract and update this copy. Private notes in browser storage are origin-scoped convenience, **not OS security**, and storage clearing/private-mode expiry can remove them. Show a concise export-backup reminder without reading or migrating BAYES records.

## Content voice

Use direct, patient explanations and concrete verbs: “Calculate…,” “Compare…,” “Explain why…”. Define notation/units before use. Avoid “obviously,” “simply,” “mastered,” or “AI verified.” Distinguish **Source text**, **Normalized explanation**, **Source caution**, **Supplemental example/answer**, **Independently reviewed content**, and **Your self-assessment**. Cite “Lecture 3 · physical page 11 · [region]” rather than a guessed printed slide index. Preserve uncertainty and conflicting evidence rather than presenting one synthesized certainty.

Error copy states what happened, what was retained and the safe next action: “Your draft is still here, but it could not be saved. Download a copy before closing this tab.” Draft banner: “Draft preview — teaching has not passed current independent review.” Empty search: “No matches in this publication,” not “This topic is not in the course.” Instructions must distinguish local reader behavior from an external agent's possible provider transfer.

## Implementation constraints

### Framework, rendering and delivery

- Prefer plain browser ES modules + semantic HTML + CSS variables, matching existing Node `.mjs`/runtime-schema tooling. No frontend framework, bundler, icon/chart library, CDN, remote font or additional dependency is authorized by this contract. Preserve unrelated `git` dependency.
- Approved candidate versions are Marked 18.1.1, KaTeX 0.19.0 and DOMPurify 3.4.17; recheck/pin at installation, include resolved lockfile, licenses and fixed local browser assets. This design task installs nothing. Consult the rendering research for actual package paths and security caveats.
- Parse code/math/prose before HTML generation; avoid global dollar replacement (financial currency is common). Preserve explicit math delimiters and literal fenced code. Source HTML is disabled except narrowly parsed validated explicit anchors; namespace content IDs to avoid DOM clobbering and map links consistently.
- Sanitize all untrusted Markdown/generated math before live DOM insertion. Strict MathML-only KaTeX is a **candidate requiring proof**, with `trust: false`, bounded expansion/size and fresh macro scope, readable TeX fallback. No arbitrary source SVG/MathML/styles, event handlers, embeds or trusted raw HTML. Never inject error/source strings as HTML or weaken the global sanitizer to make one formula look right. If faithful accessible math fails, report the rendering blocker/upward design decision; text-only final delivery is not sufficient.
- Prose URL safety and evidence authorization are separate: permit only closed mapped internal targets and exact generation-manifested raster assets. Inert unsupported links are preferable to dangerous/dangling links. Trusted app chrome uses separately controlled templates and local resources; untrusted source classes/attributes cannot impersonate chrome.
- **Immutable UI/vendor packaging is an unresolved G007 implementation decision and architect-review point.** The PRD pins all served content, images and math assets to an immutable generation. Current builder-version-2 manifests cover content/graph/search and approved raster assets, not an implemented trusted UI/vendor bundle. Do not assume live `study/app/` or `study/app/vendor/` routes are allowed. Deliberately version and capture the trusted app code/styles plus approved local renderer/vendor assets in a generation-integrated manifest, or prove an equivalently immutable app bundle explicitly referenced by that generation, with exact hashes and a scoped serving allowlist. Keep old snapshots readable and preserve strict version-1/version-2 compatibility; do not smuggle new manifest fields into an existing closed schema. Establish the packaging/version migration through leader and architect review before implementation. A fixed filename pointing at mutable vendor bytes is insufficient.
- Read-only loopback server, fixed **immutable-bundle** and generation-member allowlists, Host/Origin checks and restrictive security headers. No uploads, notes-write endpoint, arbitrary path/query/shell command API, provider call, broad PDF/raw-directory route or request-time canonical file dereference. No textbook/private/`.git`/`.env`/`.omx` serving. A local resource URL alone does not establish policy permission.
- Versioned FD-specific browser storage separate from authored content, with validated state, backups, non-destructive failure paths and cross-tab conflict handling. Export/import only learner-owned JSON. Port/origin changes can affect access to browser state; document actual stable start URL and recovery behavior.

### Performance and compatibility

Render full selected documents without hidden truncation; keep semantic search/retrieval complete even if result display is paginated. Render graph/list lazily if needed, but never omit nodes/content merely to make a tour fast. Avoid UI-blocking unbounded math work; calibrate limits against real course formulas and retain full visible source on errors. No responsiveness promise based solely on synchronous timeout wrappers. Poll only for a publication revision/status, not a write-triggered content replacement. Do not add a service worker, telemetry or network cache by default.

### G007 acceptance handoff — all mandatory, fresh evidence

1. **Install/build/static:** prove architect-reviewed immutable app/vendor/math-asset packaging and old-snapshot compatibility; record approved pinned dependency/lockfile/local-asset versions and actual app/start/check commands; run targeted unit tests, the full existing regression suite and the available syntax/bounded-static checks. Do not call bounded static scanning a full linter/typechecker. Document unavailable checks explicitly.
2. **Reader/navigation:** actual 1280 px desktop and 375 px mobile journey roadmap→lesson→source→concept/list/map→search→resume; allowed source image/text exact locator; full lesson/concept content and outcome/practice/answer/teach-back access. Include zero-lessons and draft/incomplete states. Optional map must have a complete list equivalent; no force-layout dependency required.
3. **Math/content rendering:** real fractions, roots, powers, subscripts, sums, matrices, long equations and tables readable without clipping; literal code/currency preserved; source figure descriptions and exact image member bindings. Verify fallback and keyboard access. Record browser/tool/OS versions and screenshots at both widths, including source comparison, math, dirty notes and draft banner. No generated-reference/pixel-match claim is required.
4. **Accessibility:** keyboard-only reachability/search/results/list/source/notes/import/export, landmarks/headings/labels, visible/restored focus, skip links, zoom/reflow and reduced-motion checks; manual math/figure review. Contrast measurements and actual interaction evidence required before claiming success; screen-reader claims only with named tested environment.
5. **State resilience:** isolated synthetic storage fixtures only; exact save/reload/export/import roundtrip, disabled/quota/corrupt/incompatible storage, cross-tab competing edits, failed import/write rollback, orphan notes, dirty navigation/unload and explicit publication refresh preserving route/anchor/focus/selection/drafts/progress. Fresh learner remains not-started regardless of content readiness.
6. **Publication failures:** simulate partial multi-file edit, invalid JSON/reference, deleted ID, same-mtime changed bytes and later repair. Current last-good generation and notes survive; visible stale/error/update state; only explicit valid publication then deliberate refresh changes reading bytes. No automatic mastery/review promotion.
7. **Security/privacy/offline resources:** hostile HTML/Markdown/URLs, source SVG/MathML namespace tricks, clobbering IDs, encoded traversal/symlink/out-of-root routes, forbidden methods/Host/Origin, malformed/macro-heavy/oversized math and unsupported raw links. Prove no script execution or unexpected external/provider/CDN request. Fixed allowlist denies restricted sources and private learner/filesystem data. Security tests and faithful rendering must both pass; one does not replace the other.
8. **Evidence/report:** use an isolated browser profile/test server; record actual commands/results/versions, close helpers, retain safe screenshots/reports without personal data. Keep original-source hashes unchanged and verify publication manifest integrity. Report unverified browser/assistive-technology combinations, unresolved state/rendering risks and any absent publication metadata. G007 does not itself certify G006 teaching or G008 final release.

When implementation exposes a conflict with this contract, update the relevant section or log an owned question before inventing a second design model. No `$visual-ralph` handoff is needed: there is no approved external visual baseline to match; this file is governance, not screenshot equivalence evidence.

## Open questions

- [ ] **G007 implementer + architect + leader:** Which deliberately versioned generation-integrated manifest or generation-referenced immutable app/vendor bundle pins all served UI/math assets without weakening strict old-snapshot schemas? Impact: blocking packaging/serving design decision; no live app/vendor static fallback.
- [ ] **G007 implementer + leader:** Does the policy-approved generation expose every field needed for roadmap/outcomes/prerequisites and missing-companion status? Impact: reduce unsupported UI honestly or obtain a narrowly approved derived-metadata change; never read live canonical files from the browser/server to fill gaps.
- [ ] **G007 implementer/verifier:** Which actually available browser/assistive-technology combinations prove MathML-only readability? Impact: tested-support statement and possible separately reviewed rendering decision; do not silently permit user SVG.
- [ ] **G007 state implementer:** Which versioned storage mechanism and non-destructive backup/conflict strategy meets all failure tests? Impact: durability/recovery implementation, not a new backend endpoint or permission to overwrite existing data.
- [ ] **Leader/documentation owner:** What stable loopback URL/port is the supported start surface? Impact: origin-scoped learner state, bookmarks and restore instructions; specify before final usage documentation.
- [ ] **Product owner, non-blocking:** Keep “FD / Fieldnotes” as the chrome label? Impact: reversible copy only; default to it unless a conflicting repository preference emerges.
