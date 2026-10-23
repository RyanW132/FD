# Independent lecture 3–4 source-fidelity review

## Verdict

**PASS — approved for the exact source-annotation bytes bound in `lecture-3.json`
and `lecture-4.json`.** This is faithful source conversion/region accounting only,
not teaching coverage, lesson quality, learner mastery, browser rendering or
release readiness. No source-author files were changed by this reviewer.

Reviewer: `/root/g005_source_qa_lecture34`. Source author:
`/root/g005_sources_lecture34`, a different native performer. That independent
workflow, rather than editable reviewer text, supplies review independence.
Names/digests/timestamps are audit and freshness evidence, not authentication.

| Source | Physical pages individually viewed | Original-source units | Substantive | Administrative |
|---|---:|---:|---:|---:|
| lecture-3 | 41 of 41, pages 1–41 | 155 | 113 | 42 |
| lecture-4 | 32 of 32, pages 1–32 | 121 | 88 | 33 |
| Total | 73 of 73 | 276 | 201 | 75 |

## Evidence and method

Every production page PNG was actually displayed using `view_image`, separately
labelled by lecture/physical page, in complete sequential batches. These were
the full-page 120-dpi files under `study/sources/assets/lecture-{3,4}/`, not
thumbnails, contact sheets, historical pilot images, OCR text or a sample.
Every complete normalized Markdown page and each of its anchored units was read
and compared with that displayed page. All 73 images were legible at their native
605 × 454 rendering; no higher-resolution fallback was necessary.

The review checked definitions, conditions, propositions, derivations, signs,
fraction/denominator scope, exponents, subscripts, summation bounds, cash-flow
timing, worked answers and every table cell. No plotted chart, axis/legend figure
or graphical cash-flow timeline occurs in these 73 original pages. Tables and
boxed mathematical/textual regions are represented semantically; images alone
were not accepted as mathematical transcription. Physical pages and printed
slide labels agree except title pages, which have no printed slide number.

`lecture-34-review-start-bindings.json` freezes the actual reviewed originals,
drafts, all raw pages, all images and all normalized pages. It was created before
visual review; subsequent checks reject changed bytes rather than rebinding them.
Every substantive extraction anchor has its own physical locator, raw link,
original image and applicable local caution **before the next anchor**. Page
hashes bind whole normalized files; the units nevertheless select granular
semantic spans rather than whole-page placeholders. Administrative units cover
only actual title/outline/footer/section-strip furniture. Repeated substantive
summary propositions remain substantive, not discarded as administration.

### Complete review route

| Pages | Direct semantic review |
|---|---|
| L3 1–6 | Title/outline exclusions; dated cash flows, all rate categories, benchmark statements as dated source statements, rate-convention example. |
| L3 7–12 | Discrete and continuous FV/PV, frequency table, effective rate, exponential limits, both rate conversions, printed p11 error and separately labelled corrections, zero-rate discounting. |
| L3 13–18 | Coupon/principal separation, full pricing sums, all cash-flow/zero-rate cells, numerical yield, matched-convention par qualification, par-yield derivation and example. |
| L3 19–24 | Sequential bootstrap logic, complete instrument table, all zero-rate inversions and intermediate discount factor, 1.5-/2-year coupon cash flows, curve table and interpolation alternatives. |
| L3 25–30 | Forward accumulation identity and discount-factor ratio, example and non-forecast caveat, all forward-table cells, FRA roles/signs/notional, terminal versus start settlement, full denominator and example. |
| L3 31–36 | Borrower/lender answers, decreasing price derivative, duration definition/weights, basis-point units, every duration-table cell and small-change repricing. |
| L3 37–41 | Tangent/convexity assumptions, every comparison-table cell, second derivative and second-order formula, numerical convexity example, immunisation benefits/limitations and every substantive summary statement. |
| L4 1–6 | Title/outline exclusions; investment/consumption definitions and limits, risk-transfer uses/non-forecast caveat, short-sale mechanics/risks and all long/short cash-flow cells. |
| L4 7–12 | Forward/futures comparison, delivery price versus new forward price, daily settlement and margin, pricing assumptions/limits, notation, no-income replication, overpriced arbitrage and profit. |
| L4 13–18 | Reverse cash-and-carry and costs, constrained-short inequality and owners' substitution, known-income derivation/sum/timing, all two-column arbitrage content, yield formula and cash-versus-yield distinction. |
| L4 19–24 | Inception/later value, offsetting-forward replication, price versus value numerical example, deterministic/uncertain rates and variation-margin mechanism, stock-index assumptions, FX quotation/sign conventions. |
| L4 25–30 | USD/AUD calculation and all arbitrage cash flows, storage and convenience-yield conditions, cash/proportional carry formulas, carry table, storage timing/example, contango/backwardation and non-expectations caveat. |
| L4 31–32 | All formula-matching situations/answers, all seven substantive summary propositions and replication principle. |

### Corrections and qualifications retained

- **L3 physical p11:** the original visibly prints 10.15% and 10.41%. Those
  incorrect answers remain explicitly identified as printed source claims. Every
  affected substantive span separately gives continuous annual
  **9.894667007884882%**, nominal annual semiannual **10.14351489971605%**, and
  distinct effective annual **10.400742136017955%**. Independent arithmetic
  confirms these. The correction's extra anchor is not a fabricated original
  SourceUnit.
- **L3 physical p16:** the original coupon/yield table is preserved. Each affected
  substantive span explicitly qualifies it: coupon/payment and yield compounding
  conventions must match; nominal annual semiannual coupon and continuously
  compounded yield quotations are not interchangeable. The separate caution
  anchor is not a fabricated original SourceUnit.
- L3 p35–39 and L4 p26 retain original rounding with labelled editorial notes.
  Recomputed duration/convexity, exact reprices and currency cash flows round to
  the printed values. For example, L3 p37's 10-bp error is about 0.000356, which
  supports the source's displayed “approximately 0.000” at three decimals.
- L3 p5's benchmark claims and source attributions remain dated-source evidence,
  explicitly not a fresh current-policy verification. No external-policy claim
  was needed or made in this review.

## Fresh reproducible validation

```sh
python3 study/sources/qa-reviews/verify-lecture-34.py
# Optional explicit alternative tool directory:
python3 study/sources/qa-reviews/verify-lecture-34.py /path/to/poppler/bin
```

Fresh completed result after writing both review maps: **1,375 checks PASS**;
73 pages, 276 units, 201 substantive, 75 administrative. Full check details are
in `lecture-34-verification-checks.json`. This verifier does not author or rebind
approvals and does not substitute for semantic inspection.

It rehashes every frozen file, checks exact page membership, every unit/reference/
anchor/hash and local caveat, re-runs original `pdfinfo`, independently re-runs
`pdftotext -layout -enc UTF-8` and `pdftoppm -r 120 -png` for all 73 pages in a
temporary directory, and compares **every original-derived raw/image byte**.
It also independently recomputes displayed numerical results, table values,
bootstrap/forward/FRA calculations, duration/convexity/repricing and L4 pricing/
arbitrage examples. It checks both review maps against the frozen exact draft
hash and page/unit ordering. No textbook or private learner material was read.

Exact bindings:

| Artifact | SHA-256 |
|---|---|
| L3 original | `df4aabe19a4bf757759406b1a8b4c95f4ab1656361d68456c6c2fdacf5ab047e` |
| L4 original | `f71e7435395a3ed959a45fb5ac77e2991ad8aca0996cfd647960af1549544403` |
| L3 author draft | `2e393c63cb8eacb3a4dfbd319e73e97b147439c4fc6cb82ac4d588906d4a6b53` |
| L4 author draft | `c5b547349494960d075a436733a8fcec404f7895b7cdd24985d518fd06071df1` |
| L3 independent map | `e4d5f84a247059a3bca4f5cf3e8181ba9a611c8cca679f380b3234e9cca02fd0` |
| L4 independent map | `b82b13525eb3e8fc47649874c52199a01b5c0bef4564bed040162f6e6cba5203` |

## Gaps, process deviation and remaining risks

- **No unresolved source-fidelity gap** was found in these reviewed bytes.
  Canonical promotion/application and durable derived-revision checks remain
  the ingester's separate responsibility; this reviewer changed neither.
- **Context-budget deviation:** initial mandatory contract retrieval totalled
  34,594 UTF-8 bytes, 1,826 bytes above the 32-KiB initial cap before continuation
  was declared. This is recorded as a process failure, not falsely reported as
  compliant. Subsequent full source evidence was retrieved in explicit complete
  continuation batches without clipped text. Source fidelity is independently
  supported by the full inspection and reproduction above.
- Complete beginner lessons, prerequisites, learning outcomes/practice, separate
  answers, independent teaching review and coverage are still separate work.
  Mathematical source transcription does not prove pedagogy or learner mastery.
- Raw/asset URL delivery and browser sanitization/rendering are later G7 gates.
  Review maps do not grant provider/export permission or authenticate actors.
- Any changed bound input invalidates this approval and requires fresh independent
  review. Do not regenerate hashes to revive it automatically.
