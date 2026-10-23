# Extend and interpolate the zero curve

> **Production-curriculum draft — independent teaching review pending.** Primary teaching: Lecture 3, physical pages 22–24 (seven units). Secondary practice: Seminar 2 Q7 (six distinct units). The seminar's problem and solution disagree on coupon frequency; this lesson preserves that conflict. No canonical teaching coverage, review approval or financial recommendation is claimed.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain and diagnose a bootstrap extension:** derive the next-factor equation from a dated coupon schedule, explain the order of the source steps, distinguish observed-node inference from interpolation, and identify the missing conventions in Seminar 2 Q7 without inventing a unique annual-coupon answer.
2. **Calculate and check an extension:** reproduce the lecture's 1.5- and two-year factors/rates and full price checks, compare two explicitly chosen interpolation rules, and reproduce the supplied seminar version only under its semiannual-payment/continuous-zero convention. Check positivity, denominators, maturity and rounding before reporting results.

Read [the short-end bootstrap](lesson-l3-bootstrap-short-end.md) first. Supporting bridges are [coupon pricing](lesson-l3-coupon-bond-pricing.md), [yield/par](lesson-l3-yield-and-par.md), [zero-rate discounting](lesson-l3-zero-rates-and-discounting.md), [continuous/equivalent rates](lesson-l3-continuous-and-equivalent-rates.md), [discrete compounding](lesson-l3-discrete-compounding.md), [numeric foundations](../concepts/concept-numeric-foundations.md), [exponents/logs](../concepts/concept-exponents-and-logs.md), and [rate conventions](../concepts/concept-rate-conventions.md). Planned standalone zero-discount-factor and bond-yield concept pages remain unavailable; the needed definitions are repeated here.

<a id="foundations"></a>
## 1. The equation has one unknown only after earlier payments are priced

A bond is a list of promised dated payments, not just a face value and a rate. Let \(B\) be its full price today in USD, \(F>0\) its face in USD, and \(C_i\) its entire USD payment at time \(t_i\) years from today. The index \(i\) simply numbers payments in time order, with the last numbered \(n\). A regular annual nominal coupon rate \(q\) is a decimal per year; with \(m\) equal payments per year, each coupon is \(K=Fq/m\) USD. Here \(m=2\), payment intervals are 0.5 years, and the final payment \(C_n=K+F\) includes principal exactly once. The integer \(m\) and a regular complete-period schedule are assumptions, not something a fractional maturity supplies automatically.

Let \(d_i=d(t_i)=P(0,t_i)\) be the dimensionless value today of one unit paid at \(t_i\). The price identity is

\[
B=C_1d_1+C_2d_2+\cdots+C_nd_n=\sum_{i=1}^{n}C_id_i.
\]

The summation sign means add the present value of **each** payment. Suppose every earlier \(d_i\), for \(i<n\), is already known. Define \(E=\sum_{i=1}^{n-1}C_id_i\), the earlier-payment PV in USD. Subtract \(E\) from both sides, leaving \(B-E=C_nd_n\), and divide by the nonzero final cash flow:

\[
\boxed{d_n=\frac{B-E}{C_n}.}
\]

The numerator is the part of today's price left to pay for the final receipt. The division cancels USD units. This is the central bootstrap step: **value earlier receipts, subtract their PV, divide by the final receipt**. No root-search algorithm is required when only this one discount factor is unknown.

To report an annual continuously compounded zero rate for maturity \(T=t_n>0\), use

\[
d(T)=e^{-R(T)T},\qquad R(T)=-\frac{\ln d(T)}{T}.
\]

Here \(e^x\) is a positive growth factor and \(\ln\) reverses it; the exponent \(-R(T)T\) and log argument \(d(T)\) are dimensionless. Rate \(R(T)\) is an annual decimal, not the coupon rate or the period rate. Multiplying by 100 displays percent. Semiannual **cash payments** are consistent with continuously compounded **zero quotations**.

We retain the source's classroom assumptions: all listed payments occur, supplied prices are full comparable prices, there is no added accrued-interest or settlement adjustment, and the earlier factors price these payments appropriately. No claim about today's markets or guaranteed realised returns follows.

<a id="one-half-cashflows"></a>
## 2. The 1.5-year bond: first construct its entire timeline

The preceding source table gives face USD100, annual coupon amount USD8 and price USD96. Semiannual payments are USD8 / 2 = USD4. The source's three payments are:

| Date, years from today | Coupon, USD | Principal, USD | Total receipt, USD | Factor known before this step? |
|---:|---:|---:|---:|---|
| 0.5 | 4 | 0 | 4 | Yes: 0.949 |
| 1.0 | 4 | 0 | 4 | Yes: 0.900 |
| 1.5 | 4 | 100 | 104 | No: solve for it |

In words: pay USD96 today; receive USD4 in six months, USD4 in one year, and USD104 in eighteen months. The source writes this rate-form equation with rounded earlier annual continuous decimals:

\[
4e^{-0.10469(0.5)}+4e^{-0.10536(1)}+104e^{-1.5R(1.5)}=96.
\]

**Source rounding qualification:** 0.10469 and 0.10536 are rounded rates, so their exponential factors are approximations to 0.949 and 0.900. We preserve the displayed source expression, but use the exact factors implied by the observed zero-coupon prices for calculation.

Source: [cash flows and printed equation, L3 p22](../../sources/annotated/lecture-3/page-022.md#lecture-3-p022-one-point-five-cashflows).

<a id="one-half-solution"></a>
### Isolate, solve, convert and reprice

1. First coupon PV: USD4 × 0.949 = **USD3.796** (USD3.80 if independently displayed to cents).
2. Second coupon PV: USD4 × 0.900 = **USD3.600**.
3. Earlier total: \(E=3.796+3.600=7.396\) USD. Keep all digits here.
4. Remaining PV: \(B-E=96-7.396=88.604\) USD.
5. Final factor: \(d(1.5)=88.604/104=0.851961538461538\ldots\).
6. Annual continuous zero rate: \(-\ln(0.851961538461538\ldots)/1.5\approx0.106809263882\), or **10.6809263882%**.
7. Price check: \(4(0.949)+4(0.900)+104(88.604/104)=3.796+3.600+88.604=96\) USD exactly under the supplied prices.

The source displays \(e^{-1.5R(1.5)}=0.85196\) and \(R(1.5)=10.681\%\). These are rounded results, not additional observations. If you use the rounded factor 0.85196 literally, its implied rate is about 10.6810467741%; both round to the printed 10.681%, but they are not the same unrounded number. Carry the exact quotient into the next step.

Source: [rearrangement and answer, L3 p22](../../sources/annotated/lecture-3/page-022.md#lecture-3-p022-one-point-five-solution).

<a id="two-year-equation"></a>
## 3. The two-year bond: use the new factor, not an average rate

This bond's face is USD100, annual coupon amount USD12, price USD101.60, and semiannual coupon USD6. Its final USD106 is principal plus the last USD6 coupon. Use the newly determined factor at 1.5 years:

| Date, years | Entire receipt, USD | Factor used (rounded for display) | PV, USD (retain precision) |
|---:|---:|---:|---:|
| 0.5 | 6 | 0.949 | 5.694 |
| 1.0 | 6 | 0.900 | 5.400 |
| 1.5 | 6 | 0.851961538462 | 5.111769230769 |
| 2.0 | 106 | Unknown at start | Remaining price |

The source's displayed rate equation is

\[
101.6=6e^{-0.10469(0.5)}+6e^{-0.10536(1)}+6e^{-0.10681(1.5)}+106e^{-2R(2)}.
\]

Again, those three rate coefficients are rounded displays. The factor-form calculation below retains exact earlier factors. There is no instruction to replace the three earlier rates by their arithmetic average or by the two-year rate.

Source: [two-year equation, L3 p23](../../sources/annotated/lecture-3/page-023.md#lecture-3-p023-two-year-equation).

<a id="two-year-solution"></a>
### Work the remaining-PV calculation

The earlier total is

\[
E=5.694+5.400+5.111769230769\ldots=16.205769230769\ldots\text{ USD}.
\]

Subtract it from the price, then divide by **106**, not 100:

\[
B-E=85.394230769231\ldots\text{ USD},\qquad
d(2)=\frac{85.394230769231\ldots}{106}=0.805605950653120\ldots.
\]

Now \(R(2)=-\ln d(2)/2\approx0.108080275497\), or **10.8080275497%**, which rounds to the source's **10.808%**. Repricing gives earlier PV USD16.205769230769… plus final PV USD85.394230769231… = **USD101.60**. The final PV displayed to cents is USD85.39, but retaining its unrounded value avoids addition drift. Rounding each row before summing is not the calculation method.

Source: [two-year result, L3 p23](../../sources/annotated/lecture-3/page-023.md#lecture-3-p023-two-year-solution).

<a id="order-question"></a>
### The source's check: why not calculate two years first?

Before the 1.5-year step, the two-year bond has **two** unknown factors: one multiplying its USD6 payment at 1.5 years, one multiplying USD106 at two years. A single price equation cannot uniquely identify both without an additional assumption or instrument. After the 1.5-year bond identifies its factor, the two-year equation has one unknown. Sorting instruments by maturity is useful because of this dependency, but maturity order alone does not guarantee solvability when coupon dates or instruments are missing.

Source question: [bootstrap order, L3 p23](../../sources/annotated/lecture-3/page-023.md#lecture-3-p023-bootstrap-order-question).

<a id="curve-table"></a>
## 4. Assemble all five source nodes

All zero rates below are **annual continuously compounded**. Factor precision in the middle column is author working precision; percentages in the last column reproduce the source display, not exact rates.

| Maturity, years | Factor inferred from source price | Annual continuous decimal, rounded | Source zero-rate display |
|---:|---:|---:|---:|
| 0.25 | 0.975 | 0.101271231937 | 10.127% |
| 0.50 | 0.949 | 0.104692960744 | 10.469% |
| 1.00 | 0.900 | 0.105360515658 | 10.536% |
| 1.50 | 0.851961538462 | 0.106809263882 | 10.681% |
| 2.00 | 0.805605950653 | 0.108080275497 | 10.808% |

Each row refers to a distinct maturity. A graph joining these points would put years on the horizontal axis and annual continuous zero percent on the vertical axis. The points are the computed nodes; a line drawn between them would add an interpolation rule. The table remains the accessible numerical description and does not hide this distinction.

Source: [entire curve table, L3 p24](../../sources/annotated/lecture-3/page-024.md#lecture-3-p024-zero-curve-table).

<a id="interpolation"></a>
## 5. Between nodes: state a model, do not invent an observed quote

The source says an interpolation method must be chosen and lists zero rates, discount factors, log discount factors and forward rates as possible quantities to interpolate. This describes choices in the source, not a recommendation about a current market system. The five instruments do not uniquely determine every intermediate maturity. “Interpolate” means choose a rule to fill a value **between** known dates; using it outside their range is extrapolation and needs its own assumptions.

**Supplemental worked interpolation.** Choose linear interpolation of annual continuous **zero rates**, between \(a=1\) and \(b=1.5\) years. For a date \(t\) between them, define the dimensionless weight \(w=(t-a)/(b-a)\). Linear means move the fraction \(w\) of the way from the left rate to the right:

\[
R(t)=(1-w)R(a)+wR(b),\qquad d(t)=e^{-R(t)t}.
\]

At \(t=1.25\), \(w=0.25/0.5=0.5\). Using unrounded node rates, \(R(1.25)\approx0.106084889770\), or **10.6084889770%**. The factor is approximately **0.875809995039**, so a USD100 receipt there has model PV **USD87.58** (unrounded USD87.5809995039).

For contrast, choose linear interpolation of **discount factors** over the same dates: \(d(t)=(1-w)d(a)+wd(b)\). At the same midpoint, this gives \((0.900+0.851961538461538\ldots)/2=0.875980769230769\ldots\), a USD100 PV of **USD87.60** (unrounded USD87.5980769231). Both rules reproduce the endpoint factors, but they produce different intermediate prices. Thus the intermediate value was not uniquely observed in the five input quotes. A linear average of endpoint zero rates here is an expressly chosen interpolation rule, **not** a general way to bootstrap a coupon-bond rate or calculate par yield.

Neither a smooth-looking curve nor interpolation alone proves absence of arbitrage. Full consistency depends on the instruments, prices, conventions and model restrictions. These methods need not imply the same forward rates; deriving those rates is outside this lesson.

Source: [interpolation choices, L3 p24](../../sources/annotated/lecture-3/page-024.md#lecture-3-p024-interpolation). The formulas and midpoint comparison are labelled author supplements.

<a id="limits"></a>
## 6. Check whether the operation is defined

- With positive final receipt \(C_n\), a finite real continuous zero rate requires \(B-E>0\). **Positive price alone is insufficient**: earlier coupons might already account for that price or more.
- If \(B-E=0\), the inferred factor is zero; its real logarithm is undefined and no finite continuous rate represents it. If \(B-E<0\), the factor is negative and outside this model. Recheck cash flows, conventions, prices and earlier factors; do not hide the inconsistency by taking an absolute value.
- If \(C_n=0\), division by it is invalid. That price equation contains no final-date payment from which to identify its factor. If several unknown factors remain, one equation is insufficient without further information.
- If \(T=0\), the discount factor for an immediate unit is 1, but no rate is identifiable from it; \(-\ln d/T\) must not be evaluated. For positive \(T\), factor 1 means zero rate; a factor above 1 means a negative rate. Do not require every factor to be below 1 or strictly decreasing without an additional nonnegative-rate assumption.
- In interpolation require distinct endpoints \(b>a\). Equal endpoints cause a zero denominator. Weights between zero and one apply to interpolation; negative weights or weights above one indicate extrapolation, not the same claim.
- A coupon rate and a continuously compounded zero rate are not directly interchangeable. A bond price above face does not mean its final discount factor must exceed 1: the lecture's two-year USD101.60 bond has positive coupons and factor about 0.805606.

**Supplemental boundary illustration:** suppose earlier PV \(E=5\) USD and final receipt \(C_n=100\) USD is due in one year. Prices USD105, USD106, USD5 and USD4 imply factors 1, 1.01, 0 and −0.01 respectively. The first two give rates 0 and approximately −0.9950330853% annual continuous; the latter two cannot give finite real rates under this model. These deliberately chosen inputs test algebraic boundaries, not actual quotes.

<a id="seminar-problem"></a>
## 7. Secondary practice integration: preserve Seminar 2 Q7 as written

This is **secondary practice evidence**, not part of the thirteen-unit primary lecture allocation across these two lessons. The following source-origin prompt retains the problem's payment assumption and questions.

<a id="exercise-seminar-source"></a>
### Q7 source-origin prompt — problem version (outcomes 1 and 2)

You observe the following Treasury bond data:

| Maturity, years | Coupon rate (annual) | Price per 100 par |
|---:|---:|---:|
| 0.5 | 0% | 97.00 |
| 1.0 | 6% | 101.50 |
| 1.5 | 8% | 104.00 |

**Assume annual coupon payments.**

- Compute the 0.5-year zero rate.
- Using that, estimate the 1-year zero rate.
- Briefly explain what the next step would be if we wanted to extend the zero curve to longer maturities.

Source: [problem Q7, physical p2](../../sources/annotated/seminar-2-problems/page-002.md#seminar-2-problems-p002-q7). This is not silently rewritten to say “semiannual.” Read the diagnostic answer below before treating any solution as unconditional.

<a id="seminar-conflict"></a>
### The supplied solution is a different, conditional version

The supplied solution repeats the same table but says **semiannual** coupon payments and explicitly chooses **continuously compounded** zero rates. That is a change of assumptions, not just a different algebraic route. The problem itself does not state the zero-rate quotation convention. At a fractional maturity, “annual coupons” also does not uniquely state the annual payment dates or treatment of a partial-year **stub** (a shorter-than-regular coupon period), including how that stub's amount is calculated.

Thus one must ask for the payment schedule, annual rate quotation, valuation/settlement date treatment and any stub/day-count rule before claiming a unique annual-coupon extension. We do not invent those missing terms. The factor 97/100 at 0.5 years is available from the zero-coupon promise, but a numerical annual **rate quote** still needs a compounding convention. A coupon-frequency disagreement does not affect that zero-coupon factor; it does affect the later cash flows.

Sources: [supplied solution version, p5](../../sources/annotated/seminar-2-solutions/page-005.md#seminar-2-solutions-p005-q7); [explicit factor convention, p5](../../sources/annotated/seminar-2-solutions/page-005.md#seminar-2-solutions-p005-q7-discount-factor). These are preserved source disagreements, not corrections to the original files. Other Q6 material on the same page is outside this integration and is not endorsed here.

<a id="seminar-half-year"></a>
### Conditional supplied calculation 1 — the half-year rate

**For this subsection and the next two only**, adopt the supplied solution's regular semiannual coupons and annual continuously compounded zeros, with full prices in USD per USD100 face. Its factor relation is \(P(0,T)=e^{-R(T)T}\). Price USD97 for a single USD100 half-year receipt gives

\[
d(0.5)=0.97,\qquad R(0.5)=-\ln(0.97)/0.5\approx0.0609184149694.
\]

The percent is **6.09184149694%**, displayed by the solution as **6.09%**, with decimal 0.0609. Repricing from the exact factor gives USD97.00. The solution's rounded rate display is not exact: \(e^{-0.0609(0.5)}\approx0.970008931301\), not exactly 0.97. Keep 0.97 from the actual price when moving to the next bond.

Source: [half-year calculation, supplied solutions p6](../../sources/annotated/seminar-2-solutions/page-006.md#seminar-2-solutions-p006-q7-half-year).

<a id="seminar-one-year"></a>
### Conditional supplied calculation 2 — the one-year rate

Under this **semiannual** schedule, a 6% annual nominal coupon on USD100 is USD3 per half-year. Receipts are USD3 at 0.5 years and USD103 at one year. They are not the receipts automatically specified by the separate annual-coupon problem.

The supplied equation is \(101.50=3e^{-0.0609(0.5)}+103e^{-R(1)}\). Using the exact earlier factor, its intended calculation is

\[
101.50=3(0.97)+103d(1),\qquad
E=2.91,\qquad B-E=98.59,
\]
\[
d(1)=98.59/103=0.957184466019417\ldots,\qquad
R(1)=-\ln d(1)\approx0.0437591516427.
\]

So the annual continuous percent is **4.37591516427%**, displayed as **4.38%**. Check: USD2.91 + USD98.59 = USD101.50.

The source displays factor **0.95718**, decimal rate **0.0438**, and equality signs with rounded inputs. These are approximations. In particular \(-\ln(0.95718)\approx0.0437638174412\), not exactly 0.0438. Using rounded 0.0609 inside the earlier exponential also changes the arithmetic slightly. The exact-factor calculation preserves the observed price and makes the rounding qualification visible.

Source: [one-year calculation and rounding issue, supplied solutions p6](../../sources/annotated/seminar-2-solutions/page-006.md#seminar-2-solutions-p006-q7-one-year).

<a id="seminar-extension"></a>
### Conditional supplied next step — and a labelled author completion

For the source solution's 8% annual nominal coupon and semiannual schedule, receipts are USD4 at 0.5, USD4 at 1, USD104 at 1.5 years. The price is also USD104, but equal price and final receipt do not cancel the earlier coupons. The source writes

\[
104=4d(0.5)+4d(1)+104d(1.5)
\]

in exponential form and says to solve for the last rate. It **does not print a numerical 1.5-year answer**. The following completion is an author supplement conditional on that same supplied schedule, not a newly discovered official answer:

| Date, years | Receipt, USD | Factor (rounded for display) | PV, USD |
|---:|---:|---:|---:|
| 0.5 | 4 | 0.97 | 3.88 |
| 1.0 | 4 | 0.957184466019 | 3.828737864078 |
| 1.5 | 104 | To solve | Remaining price |

Earlier PV is USD7.708737864078…; remaining PV is USD96.291262135922…. Divide by 104 to get \(d(1.5)=0.925877520537715\ldots\). Its rate is \(-\ln d(1.5)/1.5\approx0.0513422135480\), or **5.13422135480%** annual continuous. Repricing: USD3.88 + USD3.828737864078… + USD96.291262135922… = USD104.00.

Source: [extension equation, supplied solutions p7](../../sources/annotated/seminar-2-solutions/page-007.md#seminar-2-solutions-p007-q7-extension). This calculation reproduces and extends the **supplied version**; it is not an unconditional solution of the problem's different annual-payment wording.

<a id="practice"></a>
## 8. Further progressive practice

All prompts below are supplemental except the separately retained Q7 problem above. Answers are in the next section.

<a id="exercise-lecture"></a>
### A. Reconstruct and audit the lecture (outcomes 1 and 2)

Starting with factors 0.949 and 0.900, reproduce every coupon, earlier PV, remainder, final factor and continuous zero rate for both source coupon bonds. Reprice both. Recreate all five rows of the curve table and identify which entries are rounded.

<a id="exercise-order"></a>
### B. Explain the dependency (outcome 1)

Answer the slide's question: why could the two-year rate not be calculated before the 1.5-year rate? Count unknown factors in the price equation. Explain why using the two-year bond's annual coupon rate or averaging earlier zero rates is not a solution.

<a id="exercise-interpolation"></a>
### C. Choose and disclose an intermediate-date model (outcomes 1 and 2)

At 1.25 years compare linear interpolation of continuous zero rates with linear interpolation of discount factors between the one- and 1.5-year lecture nodes. Calculate each factor and the PV of USD100. Are these two observed market quotes? Does matching endpoints alone guarantee no arbitrage? What fails if the endpoint dates are equal?

<a id="exercise-seminar-conditional"></a>
### D. Reproduce only the supplied seminar version (outcome 2)

Explicitly assume semiannual coupons and continuous zeros. From the seminar's prices compute both printed zero-rate answers without intermediate rounding. State the printed rounding caveats. Write the 1.5-year equation and complete it numerically as a labelled supplement. Reprice all three instruments.

<a id="exercise-boundaries"></a>
### E. Test the domain before taking logs (outcome 2)

Use earlier PV USD5 and a final USD100 receipt at one year. Diagnose prices USD105, USD106, USD5 and USD4. Then explain the failures when final receipt is zero or maturity is zero. Can a factor greater than one be valid?

<a id="exercise-teachback"></a>
### F. Teach back the distinction (outcomes 1 and 2)

Explain the bootstrap subtraction/division/log steps to a beginner, name their units and required conditions, and contrast three statements: an observed-price node, an interpolated value, and a conditional supplied answer to a convention-conflicted problem. Include a reverse price check and say why the annual/semiannual issue cannot be removed by rounding.

<a id="answers"></a>
## 9. Separate answers — source conflict and supplemental practice

<a id="answer-seminar-source"></a>
### Q7 answer — diagnostic response to the original problem, not an invented unique annual solution

The zero-coupon row gives \(d(0.5)=97/100=0.97\). To quote an annual rate, first choose the missing rate convention; **if** continuous, it is 6.09184149694% (about 6.09%). The separate solution assumes semiannual coupons, whereas this prompt says annual coupons. Do not insert USD3 at 0.5 and USD103 at 1 without declaring that changed schedule. An annual-coupon interpretation needs an actual schedule; in particular the 1.5-year bond needs specified payment dates, stub amount/day-count treatment and relevant valuation convention. Those details are absent, so no uniquely determined annual-coupon extension is asserted here. Once a complete schedule and a zero-rate convention are supplied, value known earlier payments, subtract them from price and divide by the final payment to infer its factor. The supplied-version numbers below are conditional, not an unconditional answer to this different prompt.

<a id="answer-lecture"></a>
### Answer A — lecture amounts, rates and repricing

At 1.5 years coupons are USD4; the first two PVs are USD3.796 and USD3.600, total USD7.396. Subtraction from USD96 leaves USD88.604. Division by the final USD104 gives 0.851961538461538…; the annual continuous rate is 0.106809263882, or 10.6809263882%. The price check is USD7.396 + USD88.604 = USD96.00.

At two years coupons are USD6; earlier PVs are USD5.694, USD5.400 and USD5.111769230769…, total USD16.205769230769…. Subtraction from USD101.60 leaves USD85.394230769231…. Division by USD106 gives 0.805605950653120…; its annual continuous rate is 0.108080275497, or 10.8080275497%. The two totals sum back to USD101.60. The full source table is 0.25/10.127%, 0.50/10.469%, 1.00/10.536%, 1.50/10.681%, 2.00/10.808% (years/annual continuous percent). All five printed percentages are rounded; exact short factors are 0.975, 0.949, 0.900 and the later factors are the exact quotients just derived.

<a id="answer-order"></a>
### Answer B — count unknowns, not just rows

Before extending to 1.5 years, the two-year price equation contains unknown \(d(1.5)\) and \(d(2)\). Its one observed price cannot separate two unknowns. The 1.5-year bond supplies the extra equation; because its earlier factors are known, it yields \(d(1.5)\), and only then does the two-year equation leave one unknown. Coupon rate determines receipts, not their discount rates. An arithmetic average is not inferred from the pricing equation and generally will not reprice the instrument.

<a id="answer-interpolation"></a>
### Answer C — two expressly chosen models

The weight is \((1.25-1)/(1.5-1)=0.5\). Linear continuous-zero interpolation gives annual decimal 0.106084889770 and factor 0.875809995039, hence USD87.5809995039, displayed USD87.58. Linear factor interpolation gives 0.875980769231 and USD87.5980769231, displayed USD87.60. They agree at the given nodes, not at every date between them. Neither intermediate price is an extra observed quote from these source data. Matching endpoints alone is not a general no-arbitrage proof. Equal endpoint dates make the weight's denominator zero; the formula cannot be used.

<a id="answer-seminar-conditional"></a>
### Answer D — conditional supplied-version calculations, plus author extension

With **semiannual coupons and continuous zeros**, the half-year factor is 0.97 and annual rate 0.0609184149694 (6.09184149694%); USD100 × 0.97 = USD97.00. The one-year schedule is USD3 at 0.5 and USD103 at 1. Earlier PV is USD2.91, remaining PV USD98.59, factor 98.59/103 = 0.957184466019417…, and annual rate 0.0437591516427 (4.37591516427%). The two PVs reprice USD101.50.

The printed 0.0609 and 0.95718 are rounded, so the source's displayed exponential/log equalities are approximate; carry exact factors instead. The 1.5-year schedule is USD4, USD4, USD104 at 0.5, 1, 1.5. Its equation is \(104=4(0.97)+4(98.59/103)+104d(1.5)\). Earlier PV USD7.708737864078… leaves USD96.291262135922…, giving factor 0.925877520537715… and annual continuous rate 0.0513422135480 (5.13422135480%). Their PV sum is USD104.00. This last numeric answer is an author completion: p7 prints only the equation and next-step explanation. None of these conditional coupon-bond answers uniquely follows from the separate annual-payment question.

<a id="answer-boundaries"></a>
### Answer E — positive remainder, nonzero denominator, positive time

The factor formula \((B-5)/100\) gives respectively 1, 1.01, 0, −0.01. The first gives rate zero; the second gives \(-\ln1.01\approx-0.009950330853\), or −0.9950330853%. These reprice USD105 and USD106 as USD5 plus USD100 or USD101 final PV. The last two do not admit finite real continuous rates: zero or negative factors cannot enter the real log. If the final receipt is zero, its factor cannot be isolated by dividing. If maturity is zero, an immediate factor must be 1 but cannot identify a rate; division by time is forbidden. A factor greater than one is consistent with a negative rate under the stated model.

<a id="answer-teachback"></a>
### Answer F — evidence, model and conditional interpretation

Earlier USD payments times dimensionless factors produce earlier USD PV. Subtract that from today's USD price; divide the positive remainder by the positive final USD payment to get its dimensionless factor. At positive maturity, the factor's negative natural log divided by years gives an annual continuous decimal rate. Reinsert all factors into the PV sum to check the observed price, for example USD7.396 + USD88.604 = USD96. An observed-price node comes from that price plus specified cash flows; an intermediate value also needs an interpolation rule. A supplied seminar answer additionally needs its explicit semiannual convention, which conflicts with the annual wording. Rounding can change last digits, not create or remove a coupon payment at a date. The conflict remains visible rather than being “fixed” by a calculator.

<a id="source-map"></a>
## Primary source-to-teaching and practice map

| Exact primary lecture unit | Teaching anchor | Outcome | Practice / separate answer |
|---|---|---|---|
| lecture-3-p022-one-point-five-cashflows | [Timeline](#one-half-cashflows) | 1, 2 | [A](#exercise-lecture) / [answer](#answer-lecture) |
| lecture-3-p022-one-point-five-solution | [Solve 1.5](#one-half-solution) | 2 | [A](#exercise-lecture) / [answer](#answer-lecture) |
| lecture-3-p023-bootstrap-order-question | [Why this order](#order-question) | 1 | [B](#exercise-order) / [answer](#answer-order) |
| lecture-3-p023-two-year-equation | [Timeline/equation](#two-year-equation) | 1, 2 | [A](#exercise-lecture) / [answer](#answer-lecture) |
| lecture-3-p023-two-year-solution | [Solve two years](#two-year-solution) | 2 | [A](#exercise-lecture) / [answer](#answer-lecture) |
| lecture-3-p024-interpolation | [Between nodes](#interpolation) | 1, 2 | [C](#exercise-interpolation) / [answer](#answer-interpolation) |
| lecture-3-p024-zero-curve-table | [Complete curve](#curve-table) | 2 | [A](#exercise-lecture) / [answer](#answer-lecture) |

<a id="secondary-map"></a>
## Separate secondary practice evidence map — not primary ownership

| Exact secondary practice unit | Teaching anchor | Outcome | Practice / separate answer |
|---|---|---|---|
| seminar-2-problems-p002-q7 | [Preserved annual prompt](#exercise-seminar-source) | 1, 2 | [Q7](#exercise-seminar-source) / [diagnostic answer](#answer-seminar-source) |
| seminar-2-solutions-p005-q7 | [Different supplied version](#seminar-conflict) | 1 | [Q7](#exercise-seminar-source) / [diagnostic answer](#answer-seminar-source) |
| seminar-2-solutions-p005-q7-discount-factor | [Explicit conventions](#seminar-conflict) | 1, 2 | [D](#exercise-seminar-conditional) / [conditional answer](#answer-seminar-conditional) |
| seminar-2-solutions-p006-q7-half-year | [Half-year calculation](#seminar-half-year) | 2 | [D](#exercise-seminar-conditional) / [conditional answer](#answer-seminar-conditional) |
| seminar-2-solutions-p006-q7-one-year | [One-year calculation](#seminar-one-year) | 2 | [D](#exercise-seminar-conditional) / [conditional answer](#answer-seminar-conditional) |
| seminar-2-solutions-p007-q7-extension | [Supplied next step](#seminar-extension) | 1, 2 | [D](#exercise-seminar-conditional) / [conditional answer](#answer-seminar-conditional) |

These mappings propose teaching and practice links only. Source QA and author arithmetic do not establish independent lesson approval; the canonical curriculum, coverage and Review records remain unchanged.
