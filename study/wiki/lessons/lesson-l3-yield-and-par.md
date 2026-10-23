# Yield to maturity and par yield are different questions

<a id="status"></a>
**Unreviewed author draft; independent teaching review pending.** Scope: ten mapped substantive units on Lecture 3 physical pp15–18. Supplemental derivations/calculations are distinguished from source statements. **Page 16's coupon-versus-yield table needs matched quotation/payment conventions.** Its original statements are preserved and visibly qualified below, not silently rewritten. No current-market claim, financial recommendation, source-issue closure or learner-mastery claim is made.

<a id="motivation"></a>
## Which unknown are we trying to find?

The [coupon-bond pricing lesson](lesson-l3-coupon-bond-pricing.md#source-price) started with cash flows and zero rates and calculated a price. Two new questions reverse different parts of that task:

- **Yield to maturity (YTM):** given a price and fixed promised cash flows, which **single discount-rate quote** reproduces the price?
- **Par yield:** given a maturity, payment dates and discount factors, which **coupon rate** makes the price equal to face value?

Solving for a discount rate is not the same as solving for a coupon amount. Keeping that distinction explicit prevents confusing a bond's coupon, yield and the zero curve used to price it.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain and derive the relationships:** distinguish zero-curve pricing, continuous YTM and a nominal annual par coupon; explain price-yield monotonicity for positive promised future payments; derive the par-coupon equation and the matched-convention coupon/yield comparison. Success requires correct symbols, annual/periodic/currency units, explicit p16 qualification and a reason YTM is neither an arithmetic average of zero rates nor an automatic realised return.
2. **Solve and verify:** use a sign-changing price bracket and bisection to reproduce the source YTM, compute the source par yield from all discount factors, and reprice the resulting cash flows. Correctly apply or reject the par rule under matching/mismatched conventions and handle zero/negative rates or invalid domains. Use full internal precision, money to cents, and a YTM root bracket width below 1e-12 annual decimal with price residual below 1e-8 currency unit for the numerical author check; source rounded rates remain explicitly approximate.

Prerequisites are [coupon-bond pricing](lesson-l3-coupon-bond-pricing.md#foundations), [equivalent quotes](lesson-l3-continuous-and-equivalent-rates.md#conversion), [zero factors](lesson-l3-zero-rates-and-discounting.md#discount-factor) and [numeric foundations](../concepts/concept-numeric-foundations.md#numeric-rates). Missing planned shared bond/zero concept pages are not prerequisites you must somehow open; all required definitions are supplied here.

<a id="foundations"></a>
## 1. Keep the local symbols and conventions separate

| Symbol | Meaning here | Unit or qualification |
|---|---|---|
| F, B | Face value at maturity; observed price/value today | Same specified currency; source uses USD 100 face |
| q | Nominal annual coupon rate as a decimal | Annual coupon amount Fq; equal coupon K = Fq/m |
| m | Positive integer coupons per year | Regular dates one complete period apart |
| n, t_i, C_i | Number of future payments, time of payment i, total cash flow i | n integer; t_i in years; C_i in currency, final coupon + principal included once |
| y | Continuous annual decimal YTM | exp(−y t_i) discounts every source cash flow in the yield equation |
| j | Equivalent nominal annual yield compounded m times per year | Periodic yield a = j/m; require 1 + a > 0 |
| R(t_i), P_i | Maturity-specific continuous zero rate; P(0,t_i) | Annual decimal rate; positive dimensionless factor |
| A | **Annuity factor in this lesson**, Σ P_i | Sum of factors; not the starting principal A used in earlier growth lessons |
| d | P(0,T), discount factor for final principal | Positive dimensionless number |
| c | **The source p17's annual coupon amount on USD 100 face** | USD per year in the source formula; numerically equals the annual percentage number, not its decimal |

The summation Σ means add over i = 1,…,n. exp(x) is positive exponential growth; ln reverses exp on positive inputs. A percentage is divided by 100 before use as an annual decimal. A rate per year times years gives a dimensionless exponent. The subscript on t_i or C_i labels a payment; R(t_i) labels a maturity-dependent rate, not multiplication.

Assume fixed, positive future receipts for the YTM monotonicity argument, at least one receipt and strictly positive payment times; no default, fees, taxes, embedded options or changes in schedule. Value on a regular coupon date just after any current coupon, with n complete remaining periods. The source example's coupons are nominal annual paid semiannually but its zero rates and YTM are **continuous**. We keep those conventions rather than quietly changing the yield to a semiannual quote. Irregular periods, accrued interest, contingent payments and market quote conventions require further specification outside this lesson.

<a id="ytm-definition"></a>
## 2. YTM is a rate inferred from an already known price

The source defines yield to maturity as the single discount rate reproducing the observed price:

    B = Σ C_i exp(−y t_i).

[L3 physical p15, upper definition/equation; `lecture-3-p015-yield-definition`](../../sources/annotated/lecture-3/page-015.md#lecture-3-p015-yield-definition). Every term uses the same y, unlike a nonflat zero curve that supplies a different R(t_i) for each date. The coupon amounts and price are fixed inputs; y is the unknown.

The source calls this an **internal rate of return**: a rate at which the present value of promised receipts equals the initial price. It contrasts this compressed one-rate description with the full zero curve. [L3 physical p15, lower do-not-confuse box; `lecture-3-p015-yield-versus-zero`](../../sources/annotated/lecture-3/page-015.md#lecture-3-p015-yield-versus-zero).

**Supplemental economic limits:** this equation is not a forecast of future reinvestment rates. Realised wealth at maturity also depends on coupons being received and on how they are reinvested. Interpreting YTM as a compounded realised return requires, among other things, paying the assumed price, receiving the promised payments, holding to maturity and reinvesting intervening coupons consistently with the yield convention, without the omitted costs/taxes/default effects. Selling earlier introduces a future sale-price risk. The algebraic YTM can be computed without assuming these events will occur; do not turn it into a guaranteed investment return.

<a id="monotonicity"></a>
## 3. Why a bracketed search works — no black box required

Hold all positive C_i and positive t_i fixed. If y increases, every exponent −y t_i becomes smaller. exp is increasing in its input, so every discount factor and every positive term decreases. Therefore **price is strictly decreasing in continuous yield**. This reasoning uses no derivative or unexplained calculus.

Let **f(y)** be calculated price minus target price: f(y) = Σ C_i exp(−y t_i) − B. If f is positive, the guess prices the bond too high: raise y. If f is negative, lower y. With all the stated positive future cash flows, price changes continuously from arbitrarily large values as y falls without bound toward zero as y rises without bound. Thus a positive target price has one finite real root. This uniqueness statement does not automatically apply to signed or contingent cash-flow patterns, a zero-time-only payment, or an invalid target price.

**Bisection** repeatedly halves a bracket [lo, hi] whose calculated prices straddle B:

1. Verify price(lo) > B > price(hi).
2. Take midpoint y_mid = (lo + hi)/2; calculate its price using every cash flow.
3. If its price is above B, replace lo by the midpoint; otherwise replace hi.
4. Repeat until the yield bracket and price residual are small enough; substitute the final candidate into the full equation.

The interval is a **yield bracket**, not a range of possible principal amounts. Check the residual in currency and quote the final rate with its continuous convention. A numerical solver is useful because a sum of exponentials generally does not isolate y with one logarithm; the source is not asking you to average its zero quotes.

<a id="source-ytm"></a>
## 4. Reproduce the source yield, including its rounded price input

For the preceding USD 100-face bond, the source uses **B = USD 98.39**, flows **3, 3, 3, 103** at years **0.5, 1, 1.5, 2**, and solves

    98.39 = 3 exp(−0.5y) + 3 exp(−y)
          + 3 exp(−1.5y) + 103 exp(−2y).

It reports **y ≈ 6.76%**. [L3 physical p15, middle numerical equation and answer; `lecture-3-p015-yield-example`](../../sources/annotated/lecture-3/page-015.md#lecture-3-p015-yield-example).

**Supplemental checked search:** at y = 0.06 the price is about **USD 99.831228739079**, above 98.39; at y = 0.07 it is about **USD 97.938869522326**, below. The root lies between 6% and 7% continuous.

| Step | Trial y (annual decimal) | Price (USD, approx.) | Next action |
|---:|---:|---:|---|
| 1 | 0.065 | 98.880406149111 | Raise lower bound |
| 2 | 0.0675 | 98.408482832500 | Raise lower bound |
| 3 | 0.06875 | 98.173388141261 | Lower upper bound |
| 4 | 0.068125 | 98.290863388650 | Lower upper bound |
| 5 | 0.0678125 | 98.349655074856 | Lower upper bound |
| 6 | 0.06765625 | 98.379064443352 | Lower upper bound |

Continuing gives **y ≈ 0.067598162341429**, or **6.7598162341429% annually continuous**. It reproduces USD 98.39 within the stated numerical tolerance. Rounded to two decimal percentage places, this is the source's **6.76%**. Substituting rounded y = 0.0676 gives about **USD 98.389654024121**, which itself rounds to USD 98.39 but is not exactly equal before rounding.

The p14 zero-curve calculation gave an unrounded price about USD 98.385062772940. Here the source explicitly uses the cents-rounded **98.39 as the target**. Solving against the unrounded p14 value is a slightly different numerical problem; do not silently change the target or describe rounded-rate reconstruction as exact.

**Not an average:** the arithmetic mean of source zero quotes (5.0% + 5.8% + 6.4% + 6.8%)/4 is **6.125%**. Using y = 0.06125 gives approximately **USD 99.592647492489**, not USD 98.39. Dates, amounts and nonlinear discount factors matter, especially the large final principal. YTM is not obtained by averaging those four percentages.

<a id="source-par-table"></a>
## 5. Preserve p16's table, then qualify it before using it

**Original source relationships, with their missing convention requirement made explicit:**

| Printed comparison | Printed price conclusion | Required teaching qualification |
|---|---|---|
| Coupon rate > yield | Above par | Compare like-for-like annual/periodic conventions |
| Coupon rate = yield | At par | Equality must use matched compounding/payment convention |
| Coupon rate < yield | Below par | Apply the same matched convention and standard fixed schedule |

**Par** means price equals face value; **above par** means price > F; **below par** means price < F. [L3 physical p16, upper table; `lecture-3-p016-printed-coupon-yield-table`](../../sources/annotated/lecture-3/page-016.md#lecture-3-p016-printed-coupon-yield-table).

**Source caveat, not a rewrite:** in the adjacent source example, the coupon is **6% nominal annual paid semiannually**, while y ≈ 6.76% is **annually continuous**. Comparing identical printed numbers in those two conventions does not prove par. The canonical issue `source-l3-p016-rate-conventions` remains open; the labelled derivation below qualifies the rule without editing the original image/table or claiming independent approval.

<a id="matched-par-derivation"></a>
### Derive the matched rule instead of memorising it

For a regular bond with n = mT complete periods, use a **nominal annual yield j compounded m times yearly**. Its periodic yield is **a = j/m**, and its one-period discount factor is **v = 1/(1 + a)**, with 1 + a > 0. Payment i is discounted by v^i. Each coupon is Fq/m, so

    B/F = (q/m)(v + v² + ... + vⁿ) + vⁿ.

Define A_v = v + v² + ... + vⁿ > 0, a dimensionless annuity factor under this single yield. For each i, a v^i = v^(i−1) − v^i because (1 + a)v = 1. Adding these differences cancels the interior terms, giving **a A_v = 1 − vⁿ**. This identity also holds at a = 0 without dividing by zero.

Subtract 1 from B/F and use 1 = a A_v + vⁿ:

    B/F − 1 = (q/m − a) A_v = ((q − j)/m) A_v.

F, m and A_v are positive. Therefore the price-minus-face sign is the sign of **q − j**: above, at or below par when the **matched nominal** coupon exceeds, equals or falls below the matched nominal yield. This proof assumes the stated regular dates, principal repayment and no other cash flows/options; it does not settle every market quote/accrued-interest convention.

<a id="continuous-par-match"></a>
### Translate continuous yield before comparing

For continuous y, the period accumulation factor over 1/m year is exp(y/m). The equivalent periodic yield is a = exp(y/m) − 1, so the **matched nominal annual yield** is

    j = m[exp(y/m) − 1].

Thus the coupon rate making this regular bond par under a **single continuous yield y** is

    q_par = m[exp(y/m) − 1],

not generally q_par = y. Both formulas are supplemental derivations using the earlier rate-equivalence relationship. They are not a formula for arbitrary nonflat zero-curve par yield; that requires the full factor set below.

**Counterexample to unmatched equality:** with source cash flows 3, 3, 3, 103, a nominal 6% semiannual yield gives periodic 3% and exactly **USD 100**. A **continuous** 6% yield instead gives **USD 99.831228739079 → USD 99.83**, not par. The coupon for par at continuous y = 0.06 is 2[exp(0.03) − 1] ≈ **0.060909067907034**, or **6.0909067907034% nominal annual paid semiannually**. Conversely, nominal 6% semiannual corresponds to continuous 2 ln(1.03) ≈ **5.91176044830888%**, not continuous 6%.

<a id="source-concept-check"></a>
### Answer the source concept check with the convention repaired

The source asks whether its **6% coupon and approximately 6.76% yield** imply a price above or below USD 100; its answer is **below par**, consistent with USD 98.39. [L3 physical p16, lower question and supplied answer; `lecture-3-p016-concept-check`](../../sources/annotated/lecture-3/page-016.md#lecture-3-p016-concept-check).

The conclusion survives the qualification. Using the unrounded continuous YTM from the rounded-price equation, matched j = 2[exp(y/2) − 1] ≈ **0.068753520161978**, or **6.8753520161978% nominal annual semiannual**. The actual nominal coupon 6% is below that matched yield, so B < F. Alternatively, the already checked price 98.39 < 100 directly answers the question. Do not use this correct conclusion to excuse an unconditional equality rule for unmatched quotes.

<a id="par-definition"></a>
## 6. Par yield: change the coupon while keeping the curve fixed

The source defines the **par yield for maturity T** as the coupon rate that makes a bond's price equal to face value. [L3 physical p17, opening paragraph; `lecture-3-p017-par-yield-definition`](../../sources/annotated/lecture-3/page-017.md#lecture-3-p017-par-yield-definition).

For this question, payment dates and discount factors are given; the unknown is the coupon. This differs from YTM, which fixes coupon cash flows and an observed price, then solves one discount-rate parameter. A par quote depends on frequency/dates as well as maturity and the curve; it is not automatically the last zero rate or an average of the zero rates.

<a id="annuity-factor"></a>
### A values the coupons; d values the principal

The source sets **A = Σ P(0,t_i)** and **d = P(0,T)**. A describes the present value of receiving USD 1 at **every coupon date**, including maturity; d is the factor for the single principal repayment. [L3 physical p17, middle definitions; `lecture-3-p017-annuity-and-principal-factors`](../../sources/annotated/lecture-3/page-017.md#lecture-3-p017-annuity-and-principal-factors).

A as a factor sum is dimensionless; multiplying it by a coupon in USD yields today's USD value. The source's “value of receiving USD 1 each date” is the unit-coupon interpretation of this ratio. **A is not the principal variable from earlier lessons.** d is only the final factor, not A divided by the payment count. Provided there is at least one coupon date and all factors are positive, A > 0, so division by A below is valid.

<a id="par-equation"></a>
### Derive the annual coupon rate and the source's c notation

For general face F and equal coupons Fq/m, par requires

    (Fq/m) A + Fd = F.

Subtract Fd, divide by positive F and solve:

    (q/m) A = 1 − d
    q_par = m(1 − d)/A.

This is a **discount-factor-weighted** relationship, not an average of rates. Equivalently q_par = (1 − d)/[Σ (1/m)P_i]. Each factor in the denominator is weighted by the coupon-period year fraction 1/m under these equal-period conventions. That denominator is in years when the coupon rate is interpreted per year, so its inverse supplies an annual rate. Irregular accrual fractions would need their own stated schedule; do not substitute m blindly.

The source chooses **face USD 100** and denotes the **annual coupon amount in USD by c**, not the annual decimal rate q. Since c = 100q numerically in this USD 100-face example, each coupon is c/m and the source writes

    A(c/m) + 100d = 100
    c = 100m(1 − d)/A.

[L3 physical p17, lower derivation and boxed result; `lecture-3-p017-par-equation`](../../sources/annotated/lecture-3/page-017.md#lecture-3-p017-par-equation). For example, c = 6 dollars per year on 100 face corresponds to q = 0.06 = 6% annually, not q = 6. “Numerically equal to the percentage” is a special consequence of the 100-face scale, not permission to mix money with a dimensionless rate.

<a id="source-par-factors"></a>
## 7. Reproduce all factors in the source par example

The source reuses the p14 curve and two-year semiannual dates. It displays **d = 0.87284** and **A = 3.70027**, both rounded. [L3 physical p18, upper numerical definitions; `lecture-3-p018-par-discount-factors`](../../sources/annotated/lecture-3/page-018.md#lecture-3-p018-par-discount-factors).

| Date (years) | Continuous zero decimal | Exponent | P_i (approx.) |
|---:|---:|---:|---:|
| 0.5 | 0.050 | −0.025 | 0.975309912028 |
| 1.0 | 0.058 | −0.058 | 0.943649947437 |
| 1.5 | 0.064 | −0.096 | 0.908464016069 |
| 2.0 | 0.068 | −0.136 | 0.872842632489 |

All four factors contribute to **A ≈ 3.700266508023**. The final factor alone is **d ≈ 0.872842632489**. Principal PV is 100d ≈ **USD 87.284263248872**. The coupons must provide the remaining present value **USD 12.715736751128** to reach par, explaining the numerator 100(1 − d).

<a id="source-par-calculation"></a>
### Solve the coupon and reprice it

Using m = 2 and the full-precision factors:

    c = 100 × 2 × (1 − d)/A ≈ USD 6.872876169086 per year,
    q_par = c/100 ≈ 0.0687287616908623,
    coupon each half-year = c/2 ≈ USD 3.436438084543.

The source displays c ≈ **6.87**, concluding a **6.87% annual par yield with semiannual coupon payments**. [L3 physical p18, middle calculation/conclusion; `lecture-3-p018-par-calculation`](../../sources/annotated/lecture-3/page-018.md#lecture-3-p018-par-calculation).

**Supplemental precision check:** substituting the source's *rounded* d = 0.87284 and A = 3.70027 gives c ≈ **6.873011969397**, which also rounds to 6.87. The small difference is rounding of factors, not a source error. With full precision the new bond pays approximately 3.436438084543 at the first three dates and 103.436438084543 at maturity. Then **(c/2)A + 100d = USD 100** by construction.

If the coupon is fixed instead at the rounded quote **6.87%**, payments are USD 3.435 and the full-curve price is approximately **USD 99.994678703929**, not exactly USD 100 (to cents, USD 99.99). Quote rounding can prevent exact par, so use the unrounded theoretical coupon for identity checks. An actual contract's payment rounding would be an additional convention.

The original 6% coupon had price 98.385062772940… under this curve; increasing the coupon to the derived par level fills the shortfall. The **6.872876% par coupon**, **6.759816% continuous YTM of the existing 6% bond** and **6.8% two-year continuous zero rate** answer different questions. None should be substituted for another merely because their numbers are close.

<a id="boundaries"></a>
## 8. Domain and interpretation checks

- **Zero yield in YTM pricing:** exp(0) = 1, so the source fixed-coupon bond's price at y = 0 is **USD 112**. This does not make its 6% coupon zero.
- **Zero curve in par-coupon pricing:** if all P_i = 1, then d = 1 and A = n > 0. The par coupon is **q_par = 0**: principal already has full face value today, so positive coupons would put price above face. Distinguish changing the price of an existing coupon bond from choosing a new par coupon.
- **Negative yields:** finite continuous negative y still gives positive factors. For the source positive future payments, y = −1% gives approximately **USD 114.171265280434 → USD 114.17**. Monotonicity still applies; it does not imply every yield is positive.
- **Negative theoretical par coupons:** if d > 1, then 1 − d < 0 and the derived q_par can be negative. That is a mathematical result under the given curve. A product restricted to nonnegative coupons might then have no permitted coupon that prices at par; do not silently floor the solution at zero.
- **Degenerate schedules/domains:** no coupon dates means A = 0, so the par-coupon division is invalid. At zero remaining maturity, settled/current payments need a separate specification; do not force the regular n > 0 schedule. Discrete yield conversion requires 1 + j/m > 0; a continuous y is any finite real number. Nonpositive discount factors cannot be valid exponential factors.
- **Limits of the comparison:** all source/table interpretations assume the specified fixed schedule and conventions. Credit/default, early redemption/options, fees, taxes and sale/reinvestment outcomes are not determined by a computed YTM or par quote.

<a id="practice"></a>
## Progressive practice — supplemental tasks and separate answers

<a id="exercise-questions-prompt"></a>
### 1. Name the unknown (outcome 1)
For each, state inputs and unknown: (a) price from a given zero curve; (b) YTM from a given price; (c) par coupon from given dates/factors. Explain why YTM is not an arithmetic average or guaranteed realised return. [Answer](#exercise-questions-answer).

<a id="exercise-ytm-prompt"></a>
### 2. Perform the source search (outcome 2)
Using target USD 98.39 and the source four flows, verify the 6%/7% continuous bracket, calculate the first two midpoints and explain each update. State the final checked yield and the effect of substituting rounded 6.76%. [Answer](#exercise-ytm-answer).

<a id="exercise-conventions-prompt"></a>
### 3. Repair the p16 equality rule (outcomes 1–2)
Price the source 6% coupon bond at (a) nominal 6% semiannual yield and (b) continuous 6% yield. Derive the nominal coupon that produces par in case (b). Then explain why the source's actual approximately 6.76% continuous YTM still implies below par after convention matching. [Answer](#exercise-conventions-answer).

<a id="exercise-par-prompt"></a>
### 4. Reconstruct the source par coupon (outcome 2)
Using all four source factors, compute A, d, annual monetary c on USD 100 face, annual decimal q and each coupon. Reprice the full-precision coupon to par. Explain why a rounded 6.87% coupon need not reprice exactly to 100. [Answer](#exercise-par-answer).

<a id="exercise-transfer-prompt"></a>
### 5. Transfer the par formula (outcome 2)
A separate one-year GBP 100-face bond pays semiannually; supplied appropriate factors are P(0,0.5) = 0.97 and P(0,1) = 0.90. Find A, d, annual decimal par coupon and each monetary coupon. Verify the price. These are hypothetical factors, not current market quotes. [Answer](#exercise-transfer-answer).

<a id="exercise-boundaries-prompt"></a>
### 6. Compare zero/negative cases (outcome 2)
At a flat numerically zero curve, what is the source 6% coupon bond's price and what coupon would a new par bond need? What happens to the sign of the par coupon if d > 1 with A > 0? Why can a schedule with A = 0 not use the formula? [Answer](#exercise-boundaries-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach the distinctions (outcome 1)
Explain why price falls with continuous yield for this positive-payment bond, why a bracketed solver works, and how par yield changes a different unknown. Derive the matched coupon-versus-yield rule and explain the source c versus decimal q distinction. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Audit a combined claim (outcome 2)
A learner says, “6% coupon equals 6% continuous yield, so par; par yield is the average of the four zero quotes; c = 6.87 means decimal 6.87; solving YTM guarantees my realised return.” Correct every claim with the checked examples, units and assumptions. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## Supplemental answers — no independent approval implied

<a id="exercise-questions-answer"></a>
### Answer 1
(a) Given amounts/dates and matching zero factors, solve **price**. (b) Given amounts/dates and observed price, solve one **yield quote** under a stated compounding convention. (c) Given face, dates/frequency and factors, set price to face and solve the **coupon**. YTM depends nonlinearly on amounts and dates, so it is not an arithmetic average of zero rates. Realised compounded return also needs performance, holding/reinvestment assumptions and costs/taxes accounted for. If you named “rate” for every unknown, specify which rate and what is held fixed.

<a id="exercise-ytm-answer"></a>
### Answer 2
At 6% continuous, price ≈ **USD 99.831228739079**; at 7%, ≈ **USD 97.938869522326**, so 98.39 lies between. Midpoint **0.065** gives **98.880406149111**, too high, so raise lo to 0.065. Next midpoint **0.0675** gives **98.408482832500**, still high, so raise lo again. Continued bisection gives y ≈ **0.067598162341429 = 6.7598162341429% annually continuous**. Its full-equation residual is below 1e-8 USD. Rounded 0.0676 produces **98.389654024121**, cents-rounded 98.39, not exact pre-round equality. If you lowered y when price was too high, revisit the monotonicity argument.

<a id="exercise-conventions-answer"></a>
### Answer 3
(a) With matched nominal semiannual yield, periodic yield is 0.06/2 = **0.03**; summing discounted 3,3,3,103 gives **USD 100**. (b) Continuous 0.06 gives **USD 99.831228739079 → USD 99.83**. Its matched nominal coupon for par is 2[exp(0.06/2) − 1] ≈ **0.060909067907034**, or **6.0909067907034%**, not 6%. For the actual source yield, equivalent nominal semiannual j ≈ **6.8753520161978%**, above the actual 6% coupon, so price is below face. The p16 conclusion is preserved but its equality rule needs the convention qualification. If you only compared the printed numbers, convert both to the same periodic/annual basis and retry.

<a id="exercise-par-answer"></a>
### Answer 4
A ≈ **3.700266508023**, d ≈ **0.872842632489**. Full-precision c = 100 × 2(1 − d)/A ≈ **USD 6.872876169086 per year**; q = c/100 ≈ **0.0687287616908623**, or **6.87287616908623% nominal annual**. Each coupon is approximately **USD 3.436438084543**, final cash flow approximately **USD 103.436438084543**. Using unrounded values, (c/2)A + 100d = **USD 100**. Fixed rounded q = 0.0687 gives coupon 3.435 and price ≈ **USD 99.994678703929**, not exact par. If you used c = 0.0687 directly as an annual dollar coupon, distinguish source monetary c from decimal q.

<a id="exercise-transfer-answer"></a>
### Answer 5
A = 0.97 + 0.90 = **1.87** and d = **0.90**. q = 2(1 − 0.90)/1.87 ≈ **0.106951871657754 = 10.6951871657754% nominal annual**. Each coupon = 100q/2 ≈ **GBP 5.3475935828877**. The final payment is that coupon plus GBP 100. Check with full precision: (100q/2) × 1.87 + 100 × 0.90 = **GBP 10 + GBP 90 = GBP 100**. The high hypothetical coupon follows the supplied factors; it is not a recommendation or observed rate. If you averaged 0.97 and 0.90, remember these are factors, not annual yields.

<a id="exercise-boundaries-answer"></a>
### Answer 6
With all factors one, the existing bond is worth **USD 112** because its positive coupons remain. For a new par bond, d = 1, A = 4 and q_par = 2(1 − 1)/4 = **0**. If d > 1 and A > 0, q_par is negative; a nonnegative-coupon restriction could rule out that theoretical solution. If A = 0, division is invalid and the regular positive-number-of-coupon-dates assumptions have failed. Do not claim zero-time or no-coupon-date cases determine a unique coupon via this formula.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — model checklist
Raising continuous y reduces every positive future receipt's discount factor, so price decreases; evaluate two bounds and repeatedly halve the interval containing the target price. YTM solves a discount rate with coupons/price fixed; par yield solves a coupon with factors and target face value fixed. Under matched periodic yield a = j/m, positive annuity factor A_v gives B/F − 1 = ((q − j)/m)A_v, establishing the comparison. For continuous y, first use j = m[exp(y/m) − 1]. The source c is annual USD coupon on face 100, while q = c/100 is the decimal annual coupon rate. If a derivation omits the convention, annotate each rate before repeating it.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8 — audit checklist
Equal 6% labels under mismatched conventions do not establish par: continuous 6% prices the source coupon schedule at **USD 99.83**, while matched nominal semiannual 6% gives **USD 100**. The par coupon uses **m(1 − d)/A**, not the zero-rate average; source full-precision result is approximately **6.872876%**, whereas the four zero quotes average **6.125%**. On 100 face, c = 6.87 is annual coupon dollars and a 6.87% annual percentage; the decimal is **q = 0.0687**, not 6.87. A computed YTM is a price-equation solution, not a guarantee about default, holding/sale, reinvestment, taxes or fees. Correct arithmetic alone does not repair an incorrect quote label or return interpretation.

<a id="stop"></a>
## Stop and check understanding

Give your own explanations for exercises 7–8 before moving on. A tutor should diagnose the unknown being solved, rate units, cash-flow dates, bracket direction, par equation and economic limitations separately; retry the smallest missed distinction. Keep learner responses private. Later construction of zero curves is outside this slice; no missing later lesson is needed to finish these exercises.

<a id="evidence"></a>
## Original evidence and unresolved source qualification

All ten mapped units are cited above. Full raw/normalized pp15–18 and all four original PNGs were read/displayed, checking the yield equation, table, concept-check answer, source c units and rounded par factors. Source fidelity is verified; the p16 convention issue remains open. The original table is preserved, qualified teaching is labelled, and no independent approval is inferred from author arithmetic.

| Physical page | Normalized | Raw | Original |
|---|---|---|---|
| 15 | [Page 15](../../sources/annotated/lecture-3/page-015.md) | [Raw 15](../../sources/extracted/lecture-3/page-015.md#page-15) | [Image 15](../../sources/assets/lecture-3/page-015.png) |
| 16 | [Page 16](../../sources/annotated/lecture-3/page-016.md) | [Raw 16](../../sources/extracted/lecture-3/page-016.md#page-16) | [Image 16](../../sources/assets/lecture-3/page-016.png) |
| 17 | [Page 17](../../sources/annotated/lecture-3/page-017.md) | [Raw 17](../../sources/extracted/lecture-3/page-017.md#page-17) | [Image 17](../../sources/assets/lecture-3/page-017.png) |
| 18 | [Page 18](../../sources/annotated/lecture-3/page-018.md) | [Raw 18](../../sources/extracted/lecture-3/page-018.md#page-18) | [Image 18](../../sources/assets/lecture-3/page-018.png) |
