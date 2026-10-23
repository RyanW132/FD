# Independent lecture 1–2 source-conversion review

Reviewer: `g005-source-qa-lecture12` (separate native reviewer from author `g005-sources-lecture12-author`). Identity strings are audit data, not authentication.

## Scope and acceptance criteria

Review all original lecture 1 and 2 physical pages (38 + 29), all 262 proposed source units, raw extraction and normalized annotation. Every substantive source region must remain faithful, granular and locatable, including mathematical notation, tables, diagrams, questions and printed answers. Administrative classification must be supported by actual images. Each isolated substantive span must retain its original image/physical locator and material source cautions. Source errors must be preserved, not silently corrected.

## Evidence actually inspected

- All **67 production PNGs** opened separately using `view_image`, in page order. Batches returned separate full-page images, never contact sheets or samples. `lecture-12-view-bindings.json` freezes their viewed SHA-256 bytes. All glyphs necessary for this review were readable; no high-resolution fallback or textbook read was necessary.
- All **67 normalized Markdown pages**, all **67 raw Markdown pages**, both complete draft unit/issue maps. Repeated call slides L1 pp33–35 were inspected independently and retained as separate physical pages.
- L1 pp1–4,7–10 and L2 pp1–2 are administrative except L1p5 exposure and p6 central question. Source-stated course objectives/roadmap/contact/exam announcements are not production outcomes, current regulations, or learning evidence. Page-frame units cover administrative titles/header/footer; original navigation/header typography remains in raw/image evidence.
- L1 pp11–16 and19–21/28/30–32/38: every contract/motive/market/risk/CCP/forward/futures/margin/option/exercise-right definition, scenario, comparison, question and supplied answer compared with image.
- L1p17: both embedded BIS chart panels, distinct FX dual scales, units, ticks, colours, jagged series versus survey interpolation, legend/footnotes/provenance. Accessible prose does not invent exact observations or interpret turnover as exposure; p18 questions remain separate.
- L1 pp22–27: full payoff tables, all bid/offer/maturity cells missing from raw extraction, £1m quantity × USD/GBP, positive/negative/zero payoffs, graph axis wording and slope/crossing. No invented graph tick values or currency-axis labels.
- L1 pp33–38: all call/put exercise/payoff rows, full max operand order, premium outside max, break-even premium-interest convention, European/American exercise opportunities.
- L2 pp3–10: all motives, share/call quantities and premiums/results, original cross-market labels and footnote, protective-put contract count/value versus profit, exposure-based long/short directions.
- L2 pp11–20: short/long effective-price algebra and signs, closing basis, convergence conditions, cross-hedging selection, complete variance/derivative/optimal-ratio equations, price-change rather than level standard deviations, regression, quantity ratio, airline inputs/rounding/direction/residual question.
- L2 pp21–29: index weighting statements retained as supplied historical source claims; $50/$5 multipliers versus margin, notionals, one-for-one hedge, full excess-return beta regression, idiosyncratic/systematic distinction, signed beta adjustment, numerical zero-beta decision, unanswered extension, residual risks, firm-hedging benefits/costs and controls, full summary.

## Source issues preserved

- L1p5: title £10 million versus scenario $10 million; scenario not changed.
- L1p24: printed $1,000,000 multiplier preserved; intended £1,000,000 × USD/GBP interpretation distinctly labelled.
- L1 pp26–27: original graphs say **Profit**, text says payoff; no relabelled original axes. Equality requires zero initial value/no premium and no extra financing/transaction costs.
- L2p7: original image really prints London **$100** and **$100 × 1.5300 = $153** with USD/GBP. Intended £100 is conditional, not raw-OCR correction. Printed frictions/settlement footnote ends at “settlement”; no continuation invented.
- L2p20: 37.14 follows displayed **rounded 0.780**, not exact unrounded ratio. No invented estimation frequency.
- L2p17: “higher correlation” is preserved source wording, with signed/magnitude scope clarification.

## Findings requiring author correction

Review initially requested (not self-edited): L1p37 isolated question needs premium-interest convention; L1p27 isolated long graph needs explicit zero-value/cost assumptions; L2p7 isolated arbitrage trade needs frictions footnote; L2p24 isolated formula needs signed-to-short convention and beta-neutral scope. Also L2p7 authored blanket assertion that no literal-label arbitrage follows is overbroad: only the source's displayed conversion/$3/buy-New-York conclusion fails from the literal currency labels. Final disposition is recorded below after correction inspection.

## Reproducible bounded checks

`python3 study/sources/qa-reviews/verify-lecture-12.py`

This re-hashes viewed images/source/drafts/pages, compares all raw page bodies and whole extracted text with a fresh local Poppler `pdftotext -layout -enc UTF-8` run, checks physical/printed/region/anchor/unit identity, exact self-contained substantive image links, any frozen review maps, and 51 independent numerical recomputations (Decimal precision40). It does not automatically certify image semantics. Original source SHA-256 values are fixed in the helper; viewed-image hashes are never rebound by the helper. `lecture-12-mechanical-checks.json` records results.

Manual algebra checks: short $S_2+(F_1-F_2)=F_1+(S_2-F_2)$; long $S_2-(F_2-F_1)=F_1+(S_2-F_2)$. Expanding variance of $\Delta S-h\Delta F$ yields $\sigma_S^2+h^2\sigma_F^2-2h\rho\sigma_S\sigma_F$; differentiation yields $2h\sigma_F^2-2\rho\sigma_S\sigma_F$, so $h^*=\rho\sigma_S/\sigma_F$ when $\sigma_F>0$. No source second-order proof or unanswered extension solution was invented.

## Boundaries

Conversion review only: not G6 teaching approval, mathematical pedagogy rubric, mastery, whole-course coverage, current external market/regulatory facts, browser raw-link resolution, or source redistribution permission. No textbook material or learner private state read. Original course files, raw/assets, canonical metadata and author files not edited by reviewer. Independent map records bind exact bytes and selected IDs; later edits invalidate approval and cannot be repaired by simply rebinding hashes.

## Final disposition

**REQUEST CHANGES.** All 67 pages were visually/semantically inspected and mechanical checks pass, but the six exact isolated-span findings in `lecture-12-findings.json` must be corrected by the author and independently reinspected. No approved per-source map has been issued. Original-source limitations above remain intentional, not requests to rewrite the PDF.


## Independent correction recheck — 2026-10-22T14:21:07.063549+00:00

**APPROVED for source conversion of lecture1 and2 only.** The prior REQUEST CHANGES and original finding hashes remain above/in `lecture-12-findings.json` as history. All six findings are now independently resolved in `lecture-12-recheck.json`. The reviewer read all four corrected pages in full and viewed their unchanged original production images again; conventions/cautions are now inside the affected anchored spans before the next anchor. The London-currency caveat correctly limits itself to the source's displayed conversion/direction/$3 conclusion, without denying a possible reverse gross spread from literal USD quotes. Source labels remain unchanged.

Current exact approved draft hashes:
- lecture1: `dd37325de357594cd492feda0f85b5b1af78375c3976263db4df21479b6f97d6`
- lecture2: `0397a441ddb1f37f80048d59bffb53cd9dab58a972570658ea0ca40636f755f7`

Frozen per-source maps `lecture-1.json` / `lecture-2.json` bind all67 original source/raw/image/normalized pages and exact262 unit IDs. Fresh mechanical checks passed again, including unchanged frozen view hashes, source hashes and67 raw page bodies versus a new Poppler extraction. The approval is stale if any bound byte or unit selection changes. No canonical promotion was performed by the reviewer. All readiness/privacy/source-error boundaries above still apply.
