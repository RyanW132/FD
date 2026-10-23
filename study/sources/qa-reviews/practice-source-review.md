# Independent G005 practice-source fidelity review

## Verdict

**PASS — approve the current exact bytes of all five practice-source drafts: 22 physical pages, 90 units (68 substantive, 22 administrative).** This is source-fidelity approval only. It is not a teaching-completeness, browser-rendering, release or learner-mastery verdict. No canonical source records were promoted by this reviewer.

Author: `g005-practice-source-author`. Independent reviewer: `g005-practice-source-qa`. These labels/digests document the separate workflow; they do not authenticate identities or grant access.

## Evidence and scope

The reviewer displayed **each of the 22 exact production PNGs separately through `view_image`**, at readable full-page resolution, and read every complete raw and normalized Markdown page. No sampling or contact-sheet-only review was used. All questions, subparts, definitions, tables, supplied explanatory answers, numerical chains, equation signs, denominators, exponents and page continuations were compared. These are text/table/formula pages; there are no omitted plotted diagrams.

A fresh independent Poppler rerun from each original PDF reproduced **every production PNG byte-for-byte and every complete layout-text extraction byte-for-byte**. Every raw Markdown code block exactly matches its complete original physical-page text, including extraction artifacts. All original SHA-256 values match the canonical manifest and author draft. Hash equality supplements the actual visual/semantic review; it does not replace it.

| Source | Pages individually viewed | Substantive / administrative | Regions independently checked |
|---|---:|---:|---|
| Seminar 1 problems | 1–2 | 6 / 2 | All Q1–Q6 prompts and numerical inputs; wheat/corn/airline quantities and hedge-ratio notation |
| Seminar 1 solutions | 1–7 | 23 / 7 | p1 all three participant examples and start of mismatch list; p2 controls, Q2 and complete market table; p3 tradeoffs and Q3; p4 full hedge arithmetic and basis; p5 Q4 and both hedger effects; p6 convergence and all cross-hedge risks; p7 Q6 count and minimum-variance reasoning |
| Seminar 2 problems | 1–2 | 7 / 2 | All Q1–Q7 prompts; forward-pricing inputs; coupon timing; rate definitions; all nine Treasury-table cells and annual-coupon assumption |
| Seminar 2 solutions | 1–7 | 24 / 7 | p1 four comparison dimensions and contradictory default statements; p2 copper hedge and both forward calculations; p3 expectations/arbitrage and Q5 start; p4 remaining prompts, financing model and Q6; p5 all rate definitions/table/conventions; p6 every bootstrap equation and rounded number; p7 entire extension equation |
| Seminar 3 problems | 1–4 | 8 / 4 | p1 LIBOR/SONIA historical prompts and compounding formula; p2 every bond table cell/PV formula and forward-rate equation; p3 FRA direction, settlement denominator, duration/convexity signs and coefficients; p4 all daily-settlement table cells and forward-arbitrage inputs |

All **90 explicit anchors** exactly match the granular draft-unit selections and ordering. Each substantive span independently contains its physical-page/region locator, original full-page image and resolvable preserved-raw link before the next anchor. Classifications, source IDs, stable IDs, whole-normalized-page hashes, closed reference/record fields and issue closure pass. All author units remain `needs-review`; approval is in the separate reviewer maps.

## Independent answer checks

The reviewer independently checked every supplied conceptual answer and reproduced all supplied numerical chains, with **31 arithmetic checks** recorded in `practice-source-review-checks.json`:

- Seminar 1: cash-and-carry profit $30/ounce; 10 short wheat contracts; $240,000 cash revenue plus $17,500 futures gain = $257,500, effective $5.15/bushel; closing basis −$0.05. Corn basis strengthens from −$0.10 to −$0.05; effective short-hedger price $3.05 versus $3.00 if unchanged, and the same strengthening hurts a long hedger. The minimum-variance airline position is 19.047619… long contracts, rounded to 19. The stated hedge ratio and over-hedging condition agree with variance minimization.
- Seminar 2: continuous growth gives stock forwards $51.522726… and $53.091827…, correctly rounded. Under the **solution's** semiannual/continuous conventions, the exact half-year discount factor is 0.97, its zero rate is 0.0609184149…, the one-year factor is 0.9571844660… and rate 0.0437591516…, consistent with printed approximations. The 1.5-year equation correctly includes 4, 4 and 104 cash flows; numerical reconstruction checks the equation without pretending the source prints a numerical final rate.
- Algebra/signs: short hedge cash plus futures equals initial futures plus closing basis; long fuel/copper exposure calls for long futures; above-fair forward calls for selling forward/buying underlying; future/expected-spot distinction is retained. Discount-factor signs, FRA receive-fixed numerator and simple-discount denominator, forward-rate denominator, negative duration term and positive half-convexity term match the actual source images.

No official Seminar 3 solutions exist in the supplied corpus. None were fabricated or approved. These annotations transcribe its questions, not an invented answer key.

## Source conflicts preserved, not silently repaired

1. **Seminar 2 Q7:** problem p2 explicitly assumes annual coupons; solution p5 explicitly switches to semiannual coupons and continuously compounded zero rates. All affected independently retrievable solution spans retain a local convention warning. The annual fractional-maturity schedule/quote ambiguity remains open.
2. **Seminar 2 solutions p1:** the Settlement paragraph acknowledges OTC writer default while Credit risk makes the contradictory option-buyer claim. Both are retained; the local qualification distinguishes market loss from counterparty default and does not promise risk elimination by clearing.
3. **Seminar 2 solutions p5:** the source's cash-flow-weighted-average description of par yield is retained as source wording, not an exact general arithmetic-average identity. The exact discounted-cash-flow definition is locally distinguished.
4. **Seminar 2 solutions p6:** rounded exponent/discount-factor equalities remain visibly labelled approximations. Exact 0.97 is used in independent calculations.
5. The bond-futures discussion is labelled a simplified financing/coupon comparison, not a full conversion-factor/accrued-interest/delivery-option/stochastic-rate model.

Open source issues are not marked resolved merely because their transcriptions are approved.

## Reproducible checks

- `python3 study/sources/qa-reviews/practice-source-review-checks.py --approve` — initial approval creation only; **1,083 checks passed**, fresh 22-page rerender/text equality, 90-unit closure, 31 arithmetic checks. Refuses overwriting existing maps.
- `python3 study/sources/qa-reviews/practice-source-review-checks.py` — fresh read-only evidence/map verification and reviewer-report refresh; **1,083 checks passed**. Does not change source/draft/canonical files or maps.
- `node study/sources/qa-reviews/practice-source-review-binding.mjs` — direct in-memory `validateSourceQA` populated only these five sources from the drafts/maps, promoted copied unit/page statuses, inserted draft issues and computed `sourceQARevision(sourceHash, rawReportBytes, mapBytes)`. Result: `{"sourceCount":5,"pageCount":22,"unitCount":90,"errors":[],"staleEvidenceRejections":5}`. Independent mutations to draft/map/raw/image/normalized bytes each invalidate approval. No canonical writes occurred. The ingestion owner must still perform actual canonical application/integration validation.
- Python AST syntax check and `node --check study/sources/qa-reviews/practice-source-review-binding.mjs` — passed.

Per-page exact raw/image/normalized hashes, all unit IDs, all check descriptions and the five immutable review-map hashes are in `practice-source-review-checks.json`. That file is reviewer evidence, not a substitute for the separately hash-bound approval maps.

## Bootstrap and privacy boundaries

Entrypoint files totalled **11,342 bytes**. Before the next mandatory 23,472-byte privacy/source/editing/curriculum group would have exceeded the 32,768-byte initial cap, the reviewer explicitly declared continuation. All required contracts were then read in full; source evidence continued explicitly without truncation. The author's separately reported initial-budget failure is not rewritten as a pass.

All five sources have permitted local access and agent-channel allowance. No textbook/private content, learner work or BAYES data was opened. Only `study/sources/qa-reviews/` files were authored by this reviewer; original PDFs, raw extraction/assets, normalized pages, author drafts, frozen pilot, canonical metadata and runtime state were not edited.

## Gaps and risks

- No source-fidelity approval gap remains for these exact five drafts. Any changed original/raw/image/normalized/draft bytes require fresh review; editable reviewer names are not authentication.
- Browser serving of raw links and rendering of mixed currency/math text remain G007 integration checks; this review does not prove a renderer exists or handles those bytes correctly.
- Actual canonical application, teaching coverage and independent beginner-lesson/formula/answer review remain downstream work. Source completeness is not teaching completeness or mastery.
