# Zero rates and discount factors

**Source-grounded quick reference — author draft; independent semantic review pending.** Prerequisite: [rate conventions](concept-rate-conventions.md#rates-quote). For first-time teaching use [zero rates and discounting](../lessons/lesson-l3-zero-rates-and-discounting.md#outcomes); this page is a lookup, not an approved lesson or investment recommendation.

<a id="zero-meaning"></a>
## What is being priced?

A **zero-coupon claim** has one future payment and no earlier coupons. A **zero rate** is the rate for that single maturity, not an average of coupon-bond yields. Let today be time 0; let \(T>0\) be time to payment in years, \(R(T)\) the annual **continuously compounded decimal** zero rate for that maturity, and \(F\) the future receipt in one currency. Assume the payment occurs as specified, without additional fees or default losses. The **discount factor** \(P(0,T)\) is today's value of one currency unit paid at \(T\); it is dimensionless. [Source definition, L3 physical p12, upper region](../../sources/annotated/lecture-3/page-012.md#lecture-3-p012-zero-rate).

<a id="zero-formulas"></a>
## Convert in the direction you need

The exponential \(e^x\) is positive; \(\ln\) is its inverse on positive inputs. Annual rate times years makes a dimensionless exponent. Accumulation and discounting undo one another:

\[
P(0,T)=e^{-R(T)T},\qquad
\mathrm{PV}=FP(0,T),\qquad
F=\frac{\mathrm{PV}}{P(0,T)}.
\]

The minus sign in the exponent reverses growth; it does not make value negative. To recover the **same continuous convention**, take the logarithm of the factor and divide by time:

\[
\ln P(0,T)=-R(T)T,\qquad
R(T)=-\frac{\ln P(0,T)}{T}.
\]

The inversion is a labelled algebraic supplement to the source. Sources: [p12 middle boxed factor](../../sources/annotated/lecture-3/page-012.md#lecture-3-p012-discount-factor) and [middle cash-flow PV equation](../../sources/annotated/lecture-3/page-012.md#lecture-3-p012-cashflow-present-value).

<a id="zero-example"></a>
## Supplemental mini-example

USD 1000 is due in two years. Its two-year zero quote is 5% annually continuous, so \(R(2)=0.05\), not 5. Then

\[
P(0,2)=e^{-0.05(2)}\approx0.904837418036,
\quad \mathrm{PV}=1000P(0,2)\approx904.837418035960\text{ USD}.
\]

Round only the final currency amount: **USD 904.84**. Using the unrounded factor, dividing PV by it returns USD 1000, and \(-\ln P(0,2)/2=0.05\) recovers the quote. One factor is a price per unit future payment, not a currency payment itself.

<a id="zero-limits"></a>
## Boundaries and common mix-ups

- Require \(P(0,T)>0\) for this logarithmic inversion. Negative rates are allowed: they give factors above 1 for positive time. Do not impose “all discount factors must be below 1” or a decreasing curve without additional assumptions.
- At \(T=0\), the factor is 1 and present/future payment coincide. A time-zero factor cannot identify a rate by division by zero.
- A zero continuous rate gives factor 1 at every specified maturity. This differs from a **zero-coupon** claim, which describes its payment pattern, not its interest rate.
- Different maturities can have different zero rates. Discount each dated cash flow with its own factor; do not average quoted rates and discount the whole bond at that guess.
- A nominal annual rate with periodic compounding must first be used with its own accumulation rule or converted to an equivalent continuous quote. Equal printed percentages need not give equal factors. See [convention lookup and preserved source corrections](concept-rate-conventions.md#rates-cautions); no source error is repaired by silently changing its numbers.

<a id="zero-selfcheck"></a>
## Supplemental self-check

A USD 500 payment is due in two years at a continuous zero rate of −1% annually. Find the factor and PV, then explain why PV exceeds the future payment. Can a factor at time zero identify that rate?

<a id="zero-answer"></a>
## Separate supplemental answer

Use \(R=-0.01\), \(T=2\). The negative signs cancel in the exponent:

\[
P(0,2)=e^{0.02}\approx1.020201340027,
\qquad \mathrm{PV}=500e^{0.02}\approx510.100670013378\text{ USD}.
\]

Thus PV is **USD 510.10**; at the stipulated negative rate a larger present amount accumulates to the smaller future amount. The factor remains positive. Time zero gives factor 1 for every finite continuous rate, so it does not identify the rate.

<a id="zero-navigation"></a>
## Where to go next

[Full zero-rate lesson](../lessons/lesson-l3-zero-rates-and-discounting.md#inversion), [coupon pricing](../lessons/lesson-l3-coupon-bond-pricing.md), [bootstrap short end](../lessons/lesson-l3-bootstrap-short-end.md), and [bond-yield reference](concept-bond-yields.md). These lesson files exist as authored drafts, not independent teaching approvals.
