# G006 financial calculation golden fixtures

## Status and boundaries

**92 numerical cases, 6 explicit caution dispositions, 77 public source-unit bindings across 60 physical pages.** The fixtures are supplemental calculation oracles authored independently ahead of production lessons. They do **not** approve source conversion, certify all formulas/lessons, award mastery, authenticate reviewers, or establish comprehensive teaching coverage. No lesson bindings exist yet.

Files:
- [`financial-golden-fixtures.json`](financial-golden-fixtures.json): stable case IDs, literal expected constants, inputs, output units, assumptions, derivations, exact source-unit IDs/physical regions and original/normalized/image SHA-256 bindings.
- [`financial-golden.test.mjs`](financial-golden.test.mjs): test-only binary64 calculations, frozen-value comparisons, cashflow/replication identities, boundary checks and deliberately wrong-answer rejection. No production pricing/grading implementation is introduced.

## Numerical independence and conventions

Expected constants were frozen separately with Python standard-library `decimal.Decimal` at **60 decimal digits**, using exact rational cashflow algebra and Decimal `exp`/`ln`. They are literal JSON numbers at test time, not recomputed using the Node functions being checked. Examples with exact independent checks include `20/21` and `330/371` par-bootstrap discount factors, six/seven-contract residual variances `0.0145`/`0.014625`, observed bond repricing, covered-interest-parity replication, and the finite-difference duration/convexity check. This is a deterministic numerical cross-check, not a formal proof or substitute for a different reviewer checking every actual lesson formula and used answer.

Inputs use decimal annual rates and years unless explicitly named `months` or `basisPoints`; illustrative month year fractions are months/12, not a claim about an actual dated ACT/360 or ACT/365 contract. Output units distinguish currency, currency/unit, USD/AUD, index points, discount factors, annual rate, years, years squared, and signed/raw contract counts. Quote frequency, coupon dates, premiums, dividend/storage dates and financing assumptions are case-specific.

Every golden numerical comparison uses absolute tolerance **1e-8** on internal values, not formatted strings. For later lesson displays, compare monetary cents with **0.01 currency-unit** tolerance after checking the unrounded result/convention; a slide printed only to whole dollars or three decimals must be labelled at its actual precision, not silently treated as cent-accurate. Domain identities have their own justified numerical tolerance (finite-difference derivatives: 1e-7/2e-7).

## Risk-to-test map

| Source scope | Calculations covered | Important errors prevented |
|---|---|---|
| Lecture 1 pp22,24–27,29–30,33,36–37 | Long/short forward payoff; FX quantity/quotation; call/put intrinsic value; buyer/writer profit; premium interest convention; daily futures gain and margin balance | Payoff versus profit; premium inside maximum; negative loss versus negative price; forgetting quantity; daily settlement versus final forward settlement |
| Lecture 2 pp7,10–20,24–25 | Conditional cross-market currency conversion; long/short hedge effective price and basis; minimum-variance ratio; contract quantity/rounding; airline full precision versus displayed rounded route; market-beta targets | Wrong basis/hedge sign; price-change versus return units; ratio versus contract count; wrong variance denominator; notional versus margin/index points; target-beta direction |
| Lecture 3 pp6–18,19–23,25–27,29–30,33–39 | Simple/discrete/continuous growth and discounting; annual/semiannual rate conversions; months and basis points; individual-cashflow spot valuation; matched-convention par and par yield; exact-price zero bootstrap and supplemental par-quote bootstrap; forward rates; FRA start/terminal settlement; duration, convexity and repricing | Decimal-percent confusion; wrong time basis; printed growth-rate error; coupon equals unmatched continuous yield; par versus zero rate; rounding intermediate zero rates; FRA sign/date/simple discount; exact repricing versus approximation |
| Lecture 4 pp6,8,11–13,15–16,18–21,23–29 | Share short/dividend cashflows; carry and reverse carry arbitrage; known cash income versus proportional yield; current delivery price versus existing contract value; index and currency carry; cash-storage payment timing; proportional storage/convenience yield | Wrong cash-income/yield sign; foreign/domestic rate reversal; wrong storage date; forward price/value conflation; invented guaranteed convenience-yield cashflows |
| Seminar 2 question7: problem p2, solution pp6–7 | Conditional annual one-year zero rate; supplied semiannual 0.5/1/1.5-year curve | Treating conflicting conventions as one unique answer; inventing an annual fractional-maturity coupon schedule or a printed official numerical extension |

The JSON source map is the precise citation list; this table is navigation, not a replacement for exact locators. All cited canonical units were verified substantive and agent-channel permitted when bound. Test runs hash the unchanged original course PDFs, normalized pages and original-page PNGs and check exact unit locators/anchors. Restricted textbook material and learner state were not opened or used.

## Preserved source cautions

- Lecture 1 physical pp26–27 actually label the vertical axes **Profit**; never silently relabel them. Equality with terminal payoff requires zero upfront value/premium and no additional financing/transaction costs.
- Lecture 1 p24 prints a dollar-prefixed multiplier although the exposure is GBP1 million. The GBP quantity times USD/GBP interpretation is explicit.
- Lecture 2 p7 actually prints London **$100**. The displayed $3 spread needs the conditional **£100** interpretation. Literal USD100 versus USD150 instead has the opposite signed price difference; neither conditional branch silently rewrites the PDF.
- Lecture 3 p11 printed rates **10.15%** and **10.41%** are not correct. Correct rates are **9.894667007884882% continuous**, **10.14351489971605% nominal annual semiannual**, and the distinct **10.400742136017955% effective annual**.
- Lecture 3 p16's coupon/yield par rule needs matched payment and yield conventions. Identical 6% coupon and continuous-yield labels do not establish par.
- Seminar2 Q7: the problem says annual coupons, the supplied solution uses semiannual coupons and continuous zeros. Annual one-year cashflow106 and supplied semiannual cashflows3/103 produce different conditional rates. No unique annual1.5-year answer is asserted. The semiannual1.5-year numeric extension is independently computed and labelled supplemental, not a printed official answer.

Focused visual reinspection in this task: lecture3 p11/p35/p38/p39, lecture4 p16, seminar2 problem p2 and solution p6/p7. Other citations use the existing separately authored/independently reviewed normalized public evidence; this task does not claim a fresh visual review of all60 pages.

## Required later lesson binding

After lesson paths and answer anchors stabilize, the independent lesson reviewer must match every used example/formula to its actual assumptions, intermediate steps and answer, add exact lesson/answer hash bindings in a separately reviewed integration, and compute additional examples not represented here. The current empty `lessonBindings` arrays explicitly remain pending. The test-only formulas are not imported by product code. Passing these fixtures alone cannot establish that a lesson displays or teaches the right answer.

## Verification

- `node --check study/test/financial-golden.test.mjs` — passed.
- `node --test study/test/financial-golden.test.mjs` — **110 passed, 0 failed, 0 skipped** (includes92 frozen numerical cases, source-byte/metadata bindings and16 cross-check/boundary tests).
- `node --check study/test/financial-golden.test.mjs && node --test study/test/*.test.mjs` — **386 passed, 0 failed, 0 skipped**, 22.36 seconds. This is a fresh whole-suite snapshot, not a claim that concurrently authored future lessons are covered.
- First focused run exposed two fixture-harness defects (an arbitrary minimum prose-length assertion and the incorrect manifest field `path` instead of `originalPath`); both were corrected without weakening numerical expectations. Final focused and whole-suite runs above are green. No timing/retry workaround was introduced.

Stop condition: numerical fixtures and reproducible focused/full-suite evidence complete; production lesson binding and independent pedagogy/release review remain future gates.
