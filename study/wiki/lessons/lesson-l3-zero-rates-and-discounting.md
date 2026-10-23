# Zero rates and maturity-specific discount factors

<a id="status"></a>
**Unreviewed author draft — independent teaching review pending.** Scope: all four mapped substantive units on Lecture 3 physical p12. Supplemental explanations, derivations, examples and answers are labelled below; they are not additional official source solutions. This lesson does not claim current market rates, recommend investments, complete bond pricing or establish learner mastery.

<a id="motivation"></a>
## A payment's date chooses its rate

You can now [move money between dates under continuous compounding](lesson-l3-continuous-and-equivalent-rates.md#continuous-values). But a one-year payment and a five-year payment need not use the same annual rate. A **zero rate** attaches a return convention to a single maturity, and a **discount factor** states how much one unit of currency due then is worth now under that convention.

The word “zero” does **not** mean the quoted rate is 0%. It refers here to no intermediate payments: one investment starts now and pays at the selected maturity. This distinction prevents a particularly costly vocabulary error before later bond lessons.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain zero rates and discount factors:** given a dated single-payment investment or a small schedule, identify each maturity and its continuously compounded zero rate; explain the no-intermediate-payment meaning of “zero”; derive the discount factor and cash-flow PV relation. Success requires correct symbols/units, a distinction between a quoted rate and a factor, and an explanation of why an average rate or later coupon/yield concept cannot silently replace the maturity-specific input.
2. **Calculate and invert with matched conventions:** given a continuous zero rate or positive discount factor and T > 0, compute the other quantity, discount a cash flow, reverse the calculation and use each supplied maturity's own factor in a short schedule. Money must be correct to the penny after final-only rounding; rates shown to six decimal percentage places must be within 0.000001 percentage point. Success also requires valid zero/negative-rate and zero-time cases, and rejection of nonpositive log inputs or division by zero.

**Readiness check:** At 5% annually continuous for five years, is the exponent 5 × 5 or 0.05 × 5? The decimal-rate answer is 0.25. If unsure, revisit [percentage conversion](../concepts/concept-numeric-foundations.md#numeric-rates) and the foundation below before calculating.

<a id="foundations"></a>
## 1. Definitions before notation — supplemental bridge

**Today** is time 0. **Maturity** is the future payment date, measured here by elapsed T years. A **cash flow** is an amount paid or received at its date; receipts are positive and payments negative from a chosen viewpoint. $ denotes USD; £ denotes GBP in separately labelled examples. Do not add amounts in different currencies without an explicit conversion, or amounts at different dates without translating them to a common date.

A **rate quote** describes proportional growth under a convention; a **factor** multiplies an amount. For continuous annual decimal r, the accumulation factor over T years is exp(rT), where exp(x) = e^x is always positive and rT is dimensionless. Its reciprocal exp(−rT) reverses the growth. ln is the inverse of exp on positive dimensionless inputs: ln(exp(x)) = x. These prerequisites are taught in the [previous lesson](lesson-l3-continuous-and-equivalent-rates.md#foundations); the relevant identities are repeated here so the inversion is not a hidden step.

| Notation | Read it as | Meaning and units |
|---|---|---|
| T | Maturity horizon | Years from today, T ≥ 0 |
| R(T) | “R at maturity T” | Continuous annual decimal **zero rate for that whole horizon**; parentheses label its dependence on maturity, not multiplication |
| P(0,T) | “Discount factor from T to today” | Positive dimensionless present-value multiplier for a payment at T; 0 and T label dates |
| C_T | “Cash flow at T” | Signed amount in the specified currency; subscript T labels its payment date |
| PV(C_T) | Present value of that cash flow | Amount in the same currency, valued today |
| A, FV | Starting amount and future amount | Same-currency amounts used in accumulation checks |

Assume the supplied zero rates apply to the specified cash-flow risk/currency/conventions, and there are no fees/default/extra intermediate payments in the single-payment model. This is a stated valuation model, not a claim all real payments share one discount curve. The curve is given, not estimated from market data here. Rates may vary **across maturities**; R(5) is not assumed equal to R(1), nor is R(5) a promise that every future short-term rate will equal it.

<a id="zero-definition"></a>
## 2. What a T-year zero rate describes

The source defines the T-year zero rate as the return on an investment with **no intermediate payments and one payment at T**. [L3 physical p12, upper definition; `lecture-3-p012-zero-rate`](../../sources/annotated/lecture-3/page-012.md#lecture-3-p012-zero-rate).

Picture a timeline: an initial amount is invested at time 0; no interest is paid out at the intervening dates; the accumulated amount arrives at T. Even with a positive rate, “zero” still describes the absence of intermediate payments. It does not say there is no economic return or no risk.

**Supplemental distinction for later lessons:** a **coupon** is a scheduled interest payment on debt; a debt instrument paying coupons before maturity has several dated cash flows. A quoted **yield** can summarise such an instrument using a particular pricing convention. We have not derived yield or priced coupon bonds here. Do not substitute a coupon percentage or one instrument's yield for R(T) without justification. A **zero-rate curve** is a set of these maturity-specific rates; a **discount curve** is the corresponding collection of P(0,T) factors.

<a id="discount-factor"></a>
## 3. Derive the discount factor by reversing one payment

For a single maturity, apply the continuous model with r replaced by its maturity-specific quote R(T):

    FV = A exp(R(T)T).

If the future payment is **one currency unit**, today's amount A must satisfy 1 = A exp(R(T)T). Divide by the positive growth factor:

    A = 1/exp(R(T)T) = exp(−R(T)T).

The source calls this multiplier the discount factor:

    P(0,T) = exp(−R(T)T).

[L3 physical p12, middle boxed formula; `lecture-3-p012-discount-factor`](../../sources/annotated/lecture-3/page-012.md#lecture-3-p012-discount-factor). In this explanation, “one currency unit” is a standardised payoff; P itself is a ratio of same-currency amounts and therefore dimensionless. A factor 0.90 would mean £0.90 today per £1 due then, or $0.90 per $1 in a separate USD model—not a conversion between dollars and pounds.

For positive R(T) and positive T, P is between zero and one. At a zero quote, P = 1. For a negative quote, P can exceed one while staying positive. **A discount factor is not generally 1 − the quoted rate:** that would omit both exponential convention and horizon.

<a id="cashflow-pv"></a>
## 4. Scale the one-unit value to the cash flow

If one future unit has present value P(0,T), then C_T future units have present value C_T times that multiplier, under this linear no-extra-cost model:

    PV(C_T) = C_T P(0,T) = C_T exp(−R(T)T).

This is the source's cash-flow PV formula. [L3 physical p12, middle present-value equation; `lecture-3-p012-cashflow-present-value`](../../sources/annotated/lecture-3/page-012.md#lecture-3-p012-cashflow-present-value).

Units check: currency × dimensionless factor = currency today. Because P is positive, a receipt remains a positive value and a payment a negative value; **a negative PV does not imply a negative discount factor**. To reverse the calculation, divide by the **same** factor: C_T = PV(C_T)/P(0,T). Using another maturity's rate or another compounding convention would not be the inverse.

<a id="five-year-example"></a>
## 5. Work both sides of the source's five-year example

The source gives a **five-year zero rate of 5%**, in the continuous convention just defined, and displays `100 exp(0.05 × 5) = $128.40` and `100 exp(−0.05 × 5) = $77.88`. [L3 physical p12, lower example; `lecture-3-p012-five-year-example`](../../sources/annotated/lecture-3/page-012.md#lecture-3-p012-five-year-example).

These are **two different questions**, not successive amounts in the same investment. Supplemental full working:

1. R(5) = 0.05 per year and T = 5 years. Their product is **0.25**, not 25 or 0.05 alone.
2. Forward factor exp(0.25) ≈ **1.284025416687741**. Starting with **$100 today**, FV ≈ **$128.4025416687741**, rounded **$128.40** at five years.
3. Backward factor P(0,5) = exp(−0.25) ≈ **0.778800783071405**. Starting instead with the promise of **$100 in five years**, PV ≈ **$77.8800783071405**, rounded **$77.88** today.
4. The unrounded factors multiply to one. The unrounded $128.4025416687741… discounted with P(0,5) returns $100. Conversely $77.8800783071405… grows to $100.

| Question | Known amount/date | Operation | Calculated amount/date |
|---|---|---|---|
| What does today's money become? | $100 at time 0 | Multiply by exp(+0.25) | $128.40 at year 5, rounded |
| What is a future receipt worth now? | $100 at year 5 | Multiply by exp(−0.25) | $77.88 at time 0, rounded |

These are the original example's two numbers with an accessible timeline, not a source table of market quotes. The two **rounded** outputs need not exactly reverse; use full internal precision and round money only at the final display. A five-year quote by itself does not tell us the one-year zero rate.

<a id="inversion"></a>
## 6. Infer a continuous zero rate from a factor — supplemental derivation

Sometimes P(0,T) is given directly. If P > 0 and **T > 0**, take ln of the source's exponential equation:

    ln(P(0,T)) = −R(T)T
    R(T) = −ln(P(0,T))/T.

The input to ln is a positive dimensionless factor. The minus sign and division by the horizon are both necessary. This is an authored rearrangement of the p12 equation, not a new printed formula.

**Worked example:** suppose P(0,2) = 0.90 for a two-year GBP cash flow. Then R(2) = −ln(0.90)/2 ≈ **0.052680257828913**, or **5.2680257828913% annually continuous**. Substitution gives exp(−2R(2)) = **0.90** using the unrounded rate. A £1,000 two-year receipt has PV = 1000 × 0.90 = **£900**, and reversing 900/0.90 returns £1,000. A 10% reduction in value over two years is not automatically a 5% continuous annual rate; the logarithm accounts for the compounding convention.

If a rate is supplied as nominal annual compounded m times yearly instead, its complete-period discount factor would be `(1 + R_m(T)/m)^(−mT)` with a positive base. Here R_m(T) labels the nominal quote for that maturity/frequency. Convert to continuous using the preceding lesson or stay consistently discrete. Do not place the nominal percentage unchanged into exp(−R(T)T). A real partial-period calculation still needs an explicit convention.

<a id="maturity-schedule"></a>
## 7. A small schedule: match each payment to its own maturity

This is a **supplemental extension** of the single-payment source formula, not a claim p12 supplies a multi-cash-flow market example. Suppose two certain GBP receipts share the model's risk assumptions: **£200 in one year** and **£300 in two years**. Given continuous zero rates R(1) = **0.03** and R(2) = **0.04**, use the matching rate for each date before adding today's values.

| Receipt | Continuous zero quote for its horizon | Exponent | Factor (approx.) | PV in GBP (approx.) |
|---|---:|---:|---:|---:|
| £200 at T = 1 year | 3% annually | −0.03 × 1 = −0.03 | 0.970445533549 | £194.0891067097 |
| £300 at T = 2 years | 4% annually | −0.04 × 2 = −0.08 | 0.923116346387 | £276.9349039160 |

After conversion to the same date and currency, add: **£194.0891067097… + £276.9349039160… = £471.0240106257…**, rounded **£471.02**. The promised £500 is spread across two dates; treating it all as payable at year two would change the question.

An **incorrect average-rate shortcut** would replace both rates by (3% + 4%)/2 = **3.5%** and compute 200 exp(−0.035) + 300 exp(−0.035 × 2) ≈ **£472.8392292233**, rounded £472.84. That is **not** the £471.02 value implied by the supplied factors. No arithmetic averaging rule preserves all maturity-specific discounted cash flows. If a required maturity's rate is missing, interpolation would need a separately justified convention; do not invent it by averaging the available percentages.

<a id="boundaries"></a>
## 8. Domain checks and limits — supplemental

- **A zero rate is not necessarily a zero-valued rate.** “No intermediate payments” explains the name; numerical R(T) may be positive, zero or negative.
- **Numerical zero rate:** R(T) = 0 gives P(0,T) = 1 and PV(C_T) = C_T. Time alone creates no discount in this model.
- **Negative rate:** at R(2) = −0.01, T = 2, factor exp(0.02) ≈ **1.020201340027**. A £500 receipt has PV ≈ **£510.1006700134**, rounded **£510.10**. A positive factor above one is valid; it is not a negative price or a default probability.
- **Today:** P(0,0) = 1 under the no-cost convention, and a cash flow today already has its present value. Inversion `−ln(P)/T` is **not valid at T = 0**. P = 1 at zero time does not identify a unique rate; P ≠ 1 is inconsistent with this model for a same-date exchange.
- **Invalid factor:** P ≤ 0 is outside the finite-real continuous-rate model and cannot be inserted into ln. A nonpositive cash flow is a different matter: negative payments and C_T = 0 can still be multiplied by a positive P.
- **Risk/convention matching:** cash flows with different currency, credit or collateral assumptions do not automatically share the same factor. A five-year zero quote prices one horizon; it does not by itself determine coupon payments, a coupon bond's yield or missing points on a curve.

<a id="practice"></a>
## Progressive supplemental practice

<a id="exercise-meaning-prompt"></a>
### 1. Decode the name and notation (outcome 1)
An investment has no intermediate payments, pays at year three and is quoted at 4.5% annually continuous. Can it have a “zero rate” even though 4.5% is not zero? Define R(3), P(0,3) and C_3, including units. Is R(3) multiplied by three merely because it has parentheses? [Answer](#exercise-meaning-answer).

<a id="exercise-source-prompt"></a>
### 2. Rebuild the source example (outcomes 1–2)
For R(5) = 5% continuous, compute P(0,5), the FV of $100 today and the PV of a separate $100 receipt at year five. State the exponent and each amount's date. Explain why $128.40 and $77.88 are not two successive legs of the same question. [Answer](#exercise-source-answer).

<a id="exercise-invert-prompt"></a>
### 3. Factor-to-rate transfer (outcome 2)
A two-year discount factor is 0.95 for the stated GBP cash-flow model. Find its continuous annual zero rate, the PV of £500 due in two years and the future amount recovered by dividing that PV by the factor. Check the inferred rate by substitution. [Answer](#exercise-invert-answer).

<a id="exercise-schedule-prompt"></a>
### 4. Discount and match dates (outcome 2)
First, compute the PV of £750 due in three years at R(3) = 4.5% continuous. Separately, reconstruct the worked schedule of £200 at year one and £300 at year two with R(1) = 3% and R(2) = 4%. Explain why neither the five-year source rate nor a 3.5% average is an authorised replacement. [Answer](#exercise-schedule-answer).

<a id="exercise-boundaries-prompt"></a>
### 5. Sign and domain challenge (outcome 2)
For £500 due in two years, calculate PV when R(2) is −1% and when it is 0%. What is the PV of a **payment** of £500 under the negative-rate factor? Is P = −0.95 a valid factor? Can P(0,0) = 1 identify a unique zero rate? Explain without taking a log of a nonpositive number or dividing by zero. [Answer](#exercise-boundaries-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 6. Teach one-unit pricing (outcome 1)
Explain “zero,” derive P(0,T) by asking what amount grows to one unit at T, then scale to C_T. Explain why maturity and convention belong on the rate, and distinguish a rate from a discount factor and a later coupon/yield quantity. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 7. Diagnose a valuation (outcome 2)
A learner says, “Zero rate means 0%; discounting £100 at 5% for five years gives £95; the p12 five-year rate must also price a one-year payment; P(0,0) = 1 proves the rate is 0%.” Correct all four claims with at least one full calculation and the appropriate zero-time limitation. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## Supplemental answers — not supplied official solutions

<a id="exercise-meaning-answer"></a>
### Answer 1
Yes: “zero” means no intermediate payments, not a zero percentage. R(3) = **0.045 per year, continuously compounded**, is the three-year zero quote. P(0,3) is a positive dimensionless present-value multiplier; C_3 is the signed GBP amount at year three if the question specifies GBP, or the amount in whatever single currency is specified. The prompt itself does not choose a currency, so do not invent one as source data. Parentheses in R(3) label maturity dependence, not multiplication; the exponent separately contains R(3) × 3 years. If the distinction is unclear, say “the rate for three years” before doing arithmetic.

<a id="exercise-source-answer"></a>
### Answer 2
R(5) = **0.05**, T = **5**, product **0.25**. P(0,5) = exp(−0.25) ≈ **0.778800783071405**. Today's $100 becomes **$128.4025416687741… → $128.40** at year five. A separate future $100 has present value **$77.8800783071405… → $77.88** today. The known $100 is at opposite ends of the timeline in the two questions. If you chained $128.40 to $77.88 as one operation, restate which amount is given before applying a factor.

<a id="exercise-invert-answer"></a>
### Answer 3
T = 2 and P = 0.95 > 0. R(2) = −ln(0.95)/2 ≈ **0.0256466471937753**, or **2.56466471937753% annually continuous**. PV = 500 × 0.95 = **£475**; reversing gives 475/0.95 = **£500**. With unrounded R(2), exp(−2R(2)) = 0.95. If you gave 2.5%, you divided a simple percentage loss by two instead of inverting continuous accumulation.

<a id="exercise-schedule-answer"></a>
### Answer 4
First problem: exponent = −0.045 × 3 = **−0.135**. PV = 750 exp(−0.135) ≈ **£655.2869337660**, rounded **£655.29**. Separate schedule: 200 exp(−0.03) ≈ **£194.0891067097** and 300 exp(−0.08) ≈ **£276.9349039160**. Sum unrounded values: **£471.0240106257 → £471.02**. Each cash flow uses its supplied maturity-specific quote. A five-year quote concerns a different maturity; averaging the annual quotes would change both supplied discount factors and produces £472.84 in the worked counterexample, not the correct schedule value. If you added the nominal £500 first, retry one payment/date at a time.

<a id="exercise-boundaries-answer"></a>
### Answer 5
Negative rate: factor exp(0.02) ≈ **1.020201340027**, receipt PV ≈ **£510.1006700134 → £510.10**. Zero quote: factor one, receipt PV = **£500**. For the negative-rate **payment**, C_2 = −£500 and PV ≈ **−£510.10**; the factor remains positive. P = −0.95 is invalid under the finite-real continuous model. At zero time every finite rate produces P(0,0) = 1, so it does not identify a unique rate. If you rejected the negative PV, distinguish the cash-flow sign from the factor's domain.

<a id="exercise-explain-teachback-answer"></a>
### Answer 6 — model checklist
A zero investment pays only at maturity. To obtain one unit at T, invest exp(−R(T)T) units today because multiplying by exp(R(T)T) recovers one. That positive dimensionless ratio is P(0,T); multiplying C_T by it gives same-currency present value. R(T) is a convention-labelled annual rate for a particular maturity, not the factor itself. A coupon concerns scheduled payments and a yield is a different later pricing quotation; neither automatically replaces the supplied zero rate. If your explanation omits dates, put time 0 and T at the ends of a short timeline and retry.

<a id="exercise-apply-teachback-answer"></a>
### Answer 7 — diagnosis checklist
“Zero” describes no intermediate payments, not 0%. At the **assumed continuous five-year** 5% quote, £100 due at year five has PV = 100 exp(−0.05 × 5) ≈ **£77.88**, not £95; this supplemental GBP relabelling does not alter the source's USD example. A five-year quote does not establish a one-year quote; use that maturity's supplied factor or acknowledge missing information. P(0,0) = 1 holds for any finite rate, so no unique rate is inferable at zero time. A sufficient answer corrects all four concepts rather than only the number. Retry by identifying the convention, date and given amount before calculation.

<a id="stop"></a>
## Stop and check understanding

Explain exercises 6–7 in your own words. A tutor should check terminology, date matching, units, inversion and domain separately and retry the smallest missed step. Keep learner responses private. Later coupon-bond pricing and yield work use these foundations but are not required to complete this lesson. The planned shared zero-discount-factor concept is not yet present; the full explanation is supplied here, not delegated to a broken prerequisite link. No author test certifies mastery.

<a id="evidence"></a>
## Exact evidence and boundaries

All four p12 substantive units are cited above. Full normalized and raw page 12 were read; the original PNG was actually displayed and checked for R(T), P(0,T), the negative exponent, both ±0.05 × 5 examples and their dollar amounts. Source-unit verification concerns fidelity, not approval of this draft. No source issue is attached to these four units.

- [Complete normalized p12](../../sources/annotated/lecture-3/page-012.md)
- [Unchanged raw p12](../../sources/extracted/lecture-3/page-012.md#page-12)
- [Original p12 image](../../sources/assets/lecture-3/page-012.png)

The inversion, signed-flow examples, multi-date schedule and domain tests are labelled supplements derived from the source relationships. They do not fabricate missing market data or assert a universal choice of discount curve.
