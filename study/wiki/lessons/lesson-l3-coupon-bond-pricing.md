# Price coupon and principal cash flows

<a id="status"></a>
**Unreviewed author draft; independent teaching review pending.** Scope: all five mapped substantive units on Lecture 3 physical pp13–14. Source inputs/formulas are cited; expanded derivations, exercises and answer explanations are supplemental, not official solutions. No source originals are changed, investment recommendation is made or learner mastery inferred.

<a id="motivation"></a>
## A bond is several dated promises, not just its final repayment

A zero-payment investment has one future receipt. A **coupon bond** adds interest receipts before the final repayment, so buying it means buying a schedule of cash flows. The price today is not necessarily the principal printed on the contract. It depends on what is promised, when it arrives and the discount factors appropriate to those dates.

Prerequisite: [zero rates and discount factors](lesson-l3-zero-rates-and-discounting.md#outcomes). [Numeric foundations](../concepts/concept-numeric-foundations.md#numeric-rates) and [continuous compounding](lesson-l3-continuous-and-equivalent-rates.md#continuous-values) provide arithmetic and rate notation. The needed steps are repeated below. Planned shared zero-discount-factor and bond-yield concept pages are not yet available; this lesson does not require a missing page to understand its formulas.

<a id="outcomes"></a>
## What you will be able to do

1. **Construct the promises and pricing rule:** given face value, annual coupon rate, payment frequency and maturity, distinguish principal from price; build every payment/date pair; derive the periodic coupon and the sum of maturity-specific present values. Success requires consistent currency/year/decimal conventions, the last coupon and principal each counted once, and an explanation of why one arbitrary rate cannot replace a supplied nonflat zero curve.
2. **Calculate and audit a coupon-bond price:** given the complete schedule and continuously compounded zero rates, show each exponent, factor and present value, sum at a common date and check the result. Reproduce every source table row and the USD 98.39 rounded price, solve a new schedule, and diagnose zero-coupon, zero-rate, sign and rounding boundaries. Money must be correct to cents using full intermediate precision; a correct total without the dated reasoning is insufficient.

**Readiness check:** What is 6% of USD 100 per year, and what is half of that annual coupon amount? It is USD 6 per year, paid as USD 3 each half-year under the regular semiannual convention. If you obtained USD 6 every half-year, start with the next section.

<a id="promises"></a>
## 1. Separate face value, coupons and price

The source says a coupon bond normally pays **coupons at specified dates** and **face value**, also called principal or par value, **at maturity**. [L3 physical p13, upper text and bullets; `lecture-3-p013-coupon-principal`](../../sources/annotated/lecture-3/page-013.md#lecture-3-p013-coupon-principal).

A bond is a debt promise. The **issuer** owes the contractual payments; the **holder** is entitled to receive them. A **coupon** is a scheduled interest payment. The **face value F** is the contractual principal repaid at maturity in this simple fixed-rate, non-amortising bond. It is not automatically the **price B** paid today. “Non-amortising” means principal is not gradually repaid in earlier instalments. We assume performance rather than claim that an issuer cannot default.

Let **q** be the nominal annual coupon rate as a decimal and **m** the positive integer number of regular coupon payments per year. The annual coupon amount is Fq; each equal coupon is

    K = Fq/m.

Here K is a cash payment in the bond's currency. It is not a rate or a forward delivery price: symbols have local meanings. For F = USD 100, q = 0.06 and m = 2, annual coupon = 100 × 0.06 = USD 6, and K = 6/2 = **USD 3**. The 3% of face paid each half-year is a coupon calculation, **not** the discount rate to apply to that payment.

For n = mT complete regular periods over T years, the first n − 1 cash flows are K and the last is **K + F**. The last coupon does not disappear when principal is returned. Conversely, once K + F is included as the last cash flow, adding another F would repay principal twice.

<a id="foundations"></a>
## 2. Dates, factors and the sum symbol — supplemental foundation

| Symbol | Meaning | Units/convention |
|---|---|---|
| F | Face value/principal repaid at maturity | USD in the source; another currency only if specified |
| B | Bond's value/price today | Same currency as F |
| q, m, K | Annual decimal coupon rate, payments/year, payment per coupon date | q = 0.06 for 6%; K = Fq/m is currency |
| T | Years remaining to maturity | Nonnegative elapsed years |
| n | Number of scheduled future payments | Positive integer for the worked schedules |
| i | Index naming one payment, from 1 to n | Label, not an interest rate |
| t_i | Time of payment i | Years from today |
| C_i | Total cash flow at that date | Currency, including final principal where due |
| R(t_i) | Continuous annual decimal zero rate for maturity t_i | Per year; parentheses indicate maturity dependence |
| P(0,t_i) | Discount factor from t_i to time 0 | Positive and dimensionless |

The symbol **Σ** means “add this expression for every listed i.” Thus Σ from i = 1 to 3 of a_i means a_1 + a_2 + a_3; the subscript identifies a list item, not multiplication. We will spell out the source's four terms before using the compact notation.

**Assumptions:** value just after any current coupon has been paid, with the next regular coupon in one complete period; all future amounts/date conventions are specified; no default, fees, taxes or extra options/cash flows; the supplied discount curve is appropriate to the payments' currency/risk/collateral assumptions. This is a model of full cash-flow value, not an introduced market clean-price/accrued-interest convention. We do not add an accrued-interest adjustment not specified by the problem.

For continuous rates, P(0,t_i) = exp(−R(t_i)t_i). exp(x) = e^x is positive; x must be dimensionless. Annual decimal rate × years gives that exponent. A negative exponent means a reciprocal, not a negative cash value. Money received in different years must first be valued at the same date before the present values can be added. Review [the exponential bridge](../concepts/concept-exponents-and-logs.md#powers-exponential) if that notation is unfamiliar.

<a id="pricing-sum"></a>
## 3. Derive the price by adding today's equivalents

For one receipt, PV = cash flow × its discount factor. A package of receipts is valued by summing those same-date equivalents under the stated linear pricing assumptions:

    B = C_1 P(0,t_1) + C_2 P(0,t_2) + ... + C_n P(0,t_n)
      = Σ C_i P(0,t_i)
      = Σ C_i exp(−R(t_i)t_i).

This is the source's pricing sum. [L3 physical p13, middle boxed equation; `lecture-3-p013-bond-pricing-sum`](../../sources/annotated/lecture-3/page-013.md#lecture-3-p013-bond-pricing-sum). Each product has currency units today; factors themselves have no currency. Add the full-precision products and round the final result, not every term prematurely.

For a regular fixed coupon K and final principal F, an equivalent **supplemental decomposition** is

    B = K × [P(0,t_1) + ... + P(0,t_n)] + F × P(0,T).

The bracket includes the **final coupon date**. This form separates all coupons from principal and gives an independent way to check the combined final cash flow. It is not permission to add principal again to a C_n already equal to K + F.

<a id="maturity-matching"></a>
## 4. Match each cash flow to its own zero rate

The source's key principle is to use the zero rate for each cash flow's **own maturity**. It contrasts pricing from the zero curve with a single yield measure. [L3 physical p13, lower key-principle box; `lecture-3-p013-own-maturity-discounting`](../../sources/annotated/lecture-3/page-013.md#lecture-3-p013-own-maturity-discounting).

A **zero curve** supplies a rate or factor for each required horizon. A **nonflat** curve has different rates across those horizons. Applying only the final maturity's rate to every payment, or averaging the rates, discards supplied information. A **yield to maturity** instead asks which one rate would reproduce a price already given; the next lesson teaches that inverse question. If all relevant zero rates happen to equal the same continuous number, using that common rate is a valid flat-curve special case. The source's warning is not a prohibition on that special case and not a claim any arbitrarily chosen common rate must be correct.

The no-arbitrage interpretation compares the bond with a package of matching single-date claims under consistent trading/risk assumptions. It does not establish a real-world executable trade merely from a table, and it does not promise actual cash flows if default or other omitted features intervene.

<a id="source-data"></a>
## 5. Build every row of the source schedule

The source bond has **USD 100 face value**, **6% annual coupon paid semiannually** and **two years** to maturity. The source table is transposed below for accessible row-by-row reading; the numbers and dates are unchanged. [L3 physical p14, opening paragraph and table; `lecture-3-p014-coupon-data`](../../sources/annotated/lecture-3/page-014.md#lecture-3-p014-coupon-data).

m = 2, T = 2, n = 2 × 2 = **4** payment dates. K = 100 × 0.06/2 = **USD 3**. Time 0 is today; no source coupon is due now.

| Payment i | t_i (years) | Coupon (USD) | Principal (USD) | Total C_i (USD) | Source zero quote | Decimal continuous R(t_i) |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0.5 | 3 | 0 | 3 | 5.0% | 0.050 |
| 2 | 1.0 | 3 | 0 | 3 | 5.8% | 0.058 |
| 3 | 1.5 | 3 | 0 | 3 | 6.4% | 0.064 |
| 4 | 2.0 | 3 | 100 | 103 | 6.8% | 0.068 |

Timeline in words: receive USD 3 after six months, USD 3 after twelve, USD 3 after eighteen, and USD 103 after twenty-four. The split coupon/principal columns are supplemental aids; the source table gives their combined cash flows. The undiscounted total is **3 + 3 + 3 + 103 = USD 112**, not the price today.

<a id="source-price"></a>
## 6. Reproduce the price, including intermediate checks

The source specifies **continuous compounding** for the zero rates. It prints

    B = 3 exp(−0.05 × 0.5) + 3 exp(−0.058 × 1)
      + 3 exp(−0.064 × 1.5) + 103 exp(−0.068 × 2)
      ≈ USD 98.39.

[L3 physical p14, lower displayed calculation; `lecture-3-p014-coupon-pricing-calculation`](../../sources/annotated/lecture-3/page-014.md#lecture-3-p014-coupon-pricing-calculation). The original uses equality with a cents-rounded amount; the approximation sign here makes the rounding explicit.

**Supplemental full calculation:**

| t_i (years) | Exponent −R(t_i)t_i | Discount factor (approx.) | C_i (USD) | Present value (USD, approx.) |
|---:|---:|---:|---:|---:|
| 0.5 | −0.025 | 0.975309912028 | 3 | 2.925929736085 |
| 1.0 | −0.058 | 0.943649947437 | 3 | 2.830949842310 |
| 1.5 | −0.096 | 0.908464016069 | 3 | 2.725392048206 |
| 2.0 | −0.136 | 0.872842632489 | 103 | 89.902791146338 |

Adding the unrounded entries gives **USD 98.385062772940**, displayed **USD 98.39**. The long decimal is an approximation, not extra quoted market precision.

A separate coupon/principal check uses the factor sum **3.700266508023**: 3 × 3.700266508023… + 100 × 0.872842632489… ≈ **USD 98.385062772940**. All four coupons are included in the first term; principal appears once in the second. The price is below face value, but that conclusion comes from the matched calculation—not from comparing an annual coupon percentage with an unspecified rate convention.

**Reasonableness checks:** every positive-rate discount factor lies below one; each discounted receipt is below its future amount; the total is below the undiscounted USD 112. Principal is most of the final USD 103, so its discounted value dominates. Doubling face value while retaining the same coupon percentage and curve doubles every payment and the price: a separate USD 200-face version would cost **USD 196.770125545879 → USD 196.77**, not twice the already-rounded USD 98.39.

<a id="transfer-example"></a>
## 7. A new complete calculation — supplemental

Consider a separate **GBP 1,000-face**, two-year bond paying a **4% annual coupon once per year**. Value immediately after any current coupon; no costs/default/extra flows. K = 1000 × 0.04/1 = **GBP 40**. Its receipts are GBP 40 at year one and **GBP 1,040 at year two**. Given continuous zero rates of 3% at one year and 4% at two years:

    B = 40 exp(−0.03 × 1) + 1040 exp(−0.04 × 2)
      ≈ GBP 998.858821584042
      → GBP 998.86.

The first term is about GBP 38.817821341940; the second is about GBP 960.041000242101. Both are today's GBP values. The 4% coupon sets payments; the separate 3%/4% zero quotes value them. Their numerical equality at the final maturity does not imply par because the entire schedule and conventions matter.

<a id="limits"></a>
## 8. Boundaries and common mistakes

- **No coupons:** q = 0 removes coupon flows; the price becomes F P(0,T), the zero-payment case. It does not remove repayment of principal.
- **All zero rates numerically zero:** every P is one, so the source bond's price is its undiscounted **USD 112**, not USD 100. “Zero rate” as a maturity-specific quote is different from a quote whose number is zero.
- **Negative rates:** positive factors can exceed one. A supplemental one-year zero-coupon claim to USD 100 at continuous −1% has price 100 exp(0.01) ≈ **USD 101.01**. This is valid model arithmetic, not an investment recommendation or proof of real financing availability.
- **Payment today:** a flow at time 0 has factor one. However, our regular schedules begin in one complete period; do not insert a time-0 coupon unless specified. If nothing remains payable, there is no positive-maturity schedule to value.
- **Coupon frequency versus compounding:** m = 2 determines coupon size/dates. It does not convert the source's continuous zero quotes into nominal semiannual quotes. The discounting convention remains the one supplied.
- **Principal versus price:** a face value of USD 100 fixes a future repayment, not what a buyer must pay today. Paying a price today is an outflow for the buyer; B here quotes the positive value of future promised receipts.
- **Missing curve point or irregular period:** identify the missing rate, day-count or timing convention rather than inventing an average. This lesson does not assume a universal clean-price, stub-period or default-recovery rule.

<a id="practice"></a>
## Progressive supplemental practice — answers are separate

<a id="exercise-timeline-prompt"></a>
### 1. Make the promises visible (outcome 1)
For the source bond, identify F, q, m, T and K. Write all four dates and cash flows and explain why the last is USD 103. What would go wrong if you appended another USD 100 at year two? [Answer](#exercise-timeline-answer).

<a id="exercise-notation-prompt"></a>
### 2. Read a sum and its conventions (outcome 1)
Expand Σ C_i P(0,t_i) for the four source payments. Explain i, t_i, R(t_i) and P(0,t_i), including units. Does “semiannual coupon” let you use 0.068/2 as the discount return for every half-year? [Answer](#exercise-notation-answer).

<a id="exercise-source-prompt"></a>
### 3. Rebuild the source calculation (outcome 2)
Use the source's four zero rates to compute all exponents, factors and PVs. Give the final price to cents and verify it by separating coupons from principal. Compare with USD 112 and USD 100 without assuming those numbers must be the price. [Answer](#exercise-source-answer).

<a id="exercise-transfer-prompt"></a>
### 4. Transfer and scale (outcome 2)
Reconstruct the GBP 1,000-face, 4%-annual-coupon example at 3%/4% continuous zero rates. Then, as a separate calculation, double the source USD bond's face value and price it without first rounding its USD 100-face price. State why GBP and USD amounts are not added. [Answer](#exercise-transfer-answer).

<a id="exercise-boundaries-prompt"></a>
### 5. Diagnose special cases (outcome 2)
What is the source bond worth if all zero quotes are numerically zero? What is a one-year zero-coupon USD 100 claim worth at continuous −1%? A learner discounts the source's entire USD 112 at the final 6.8% rate for two years: identify the date error without needing that erroneous numerical result. [Answer](#exercise-boundaries-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 6. Teach a beginner the price rule (outcome 1)
Explain principal, coupon, price and a maturity-specific discount factor. Build the final payment and explain why you first translate each flow into today's currency amount, then add. Distinguish given-curve pricing from finding a single yield. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 7. Audit a proposed answer (outcome 2)
Someone says, “Face is 100, so price is 100; the 6% coupon is a 6% discount rate; the last cash flow is only 100; and rounding the price then doubling is exact.” Correct all four claims using the source example and a recomputation check. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## Supplemental answers and diagnostic feedback

<a id="exercise-timeline-answer"></a>
### Answer 1
F = **USD 100**, q = **0.06**, m = **2/year**, T = **2 years** and K = **USD 3**. At years **0.5, 1, 1.5, 2**, receive **3, 3, 3, 103 USD** respectively. The last receipt is 3 coupon + 100 principal. Appending another 100 would count principal twice. If you wrote 6 every half-year, divide the annual coupon amount by two and retry the timeline.

<a id="exercise-notation-answer"></a>
### Answer 2
B = 3P(0,0.5) + 3P(0,1) + 3P(0,1.5) + 103P(0,2), in USD today. i labels the row; t_i is years; R(t_i) is that maturity's annual decimal continuous zero quote; P is its dimensionless discount factor. Semiannual coupons fix payment dates and amounts, not zero-rate compounding. The supplied zero curve is not a constant nominal 6.8% semiannual quote. If you averaged the rates, return to one row and identify the rate specifically attached to its date.

<a id="exercise-source-answer"></a>
### Answer 3
Exponents: **−0.025, −0.058, −0.096, −0.136**. Factors: approximately **0.975309912028, 0.943649947437, 0.908464016069, 0.872842632489**. Row PVs in USD: **2.925929736085, 2.830949842310, 2.725392048206, 89.902791146338**. Sum ≈ **98.385062772940 → USD 98.39**. Check: 3 × 3.700266508023… + 100 × 0.872842632489… gives the same unrounded amount. This is below both USD 112 undiscounted receipts and USD 100 face; neither is automatically today's price. If the terms are correct but the last payment differs, check whether coupon/principal was omitted or counted twice.

<a id="exercise-transfer-answer"></a>
### Answer 4
GBP coupons are 1000 × 0.04 = **40** annually, so price = 40 exp(−0.03) + 1040 exp(−0.08) ≈ **GBP 998.858821584042 → GBP 998.86**. The separate double-face source bond has coupons USD 6 and final USD 206; its price is 2 × 98.3850627729396… ≈ **USD 196.770125545879 → USD 196.77**. Doubling rounded USD 98.39 would give USD 196.78, a rounding artefact. GBP and USD are different units and these are independent examples, not a currency conversion. If you only doubled principal, rebuild all coupon amounts as well.

<a id="exercise-boundaries-answer"></a>
### Answer 5
With every rate numerically zero, all factors equal one and B = 3 + 3 + 3 + 103 = **USD 112**. The negative-rate zero-coupon price is 100 exp(0.01) ≈ **USD 101.005016708417 → USD 101.01**, positive and above face. Discounting all USD 112 at year two moves the first three coupons to the wrong date and ignores their supplied zero rates. If you thought a factor above one must be invalid, distinguish a negative interest rate from a negative factor.

<a id="exercise-explain-teachback-answer"></a>
### Answer 6 — model checklist
The principal is repaid at maturity; coupons are earlier interest promises plus the final coupon; price is today's value of the entire schedule. Divide the annual coupon amount by payment frequency to find each regular coupon. At maturity combine coupon and principal once. Multiply every flow by the positive factor for its own date and add only after each is expressed in the same currency today. A given zero curve provides those factors; solving a single yield from an already known price is a different question. If the account contains no dates, sketch the four source receipts before repeating it.

<a id="exercise-apply-teachback-answer"></a>
### Answer 7 — audit checklist
Face **USD 100** is a future principal promise; price is approximately **USD 98.39** under the supplied curve. The **6% nominal annual coupon** sets **USD 3** payments, whereas the separate continuously compounded zero rates discount them. The final cash flow is **USD 103**, not 100. Full-precision pricing gives 98.3850627729396…; doubling then rounding yields **USD 196.77**, not 196.78. Check both the expanded four-term sum and coupon-plus-principal decomposition. These calculations assume the specified schedule and performance; they do not certify a real bond's risks or a learner's mastery.

<a id="stop"></a>
## Stop and check understanding

Give a tutor your own explanations for exercises 6–7. Check payment construction, date/rate matching, signs, sum and rounding separately; retry the smallest missed step before repeating the full price. Keep learner work private. Next: [yield to maturity and par yield](lesson-l3-yield-and-par.md#outcomes). No independent approval follows from an author calculation passing.

<a id="evidence"></a>
## Source evidence

All five units are cited above. Full normalized/raw pp13–14 and both original PNGs were read/displayed. The source payment table, final USD 103, continuous exponents and rounded USD 98.39 were visually checked; original bytes remain unchanged. Canonical source fidelity is verified, but this teaching draft still needs independent review.

| Physical page | Normalized | Raw | Original |
|---|---|---|---|
| 13 | [Page 13](../../sources/annotated/lecture-3/page-013.md) | [Raw 13](../../sources/extracted/lecture-3/page-013.md#page-13) | [Image 13](../../sources/assets/lecture-3/page-013.png) |
| 14 | [Page 14](../../sources/annotated/lecture-3/page-014.md) | [Raw 14](../../sources/extracted/lecture-3/page-014.md#page-14) | [Image 14](../../sources/assets/lecture-3/page-014.png) |
