# Bond-price derivatives and duration weights

> **Production-curriculum draft — independent teaching review pending.** Primary evidence: Lecture 3 physical pp 32–34, nine units. Exponential differentiation is taught here as a labelled prerequisite supplement; it was deliberately not assumed in the local-derivatives bridge. No source originals or frozen bridges are changed.

<a id="outcomes"></a>
## What you will be able to do

1. **Derive the sensitivity with its assumptions:** construct the fixed-payment continuous-yield price function, use a stated exponential limit and a stepwise linear-chain-rule derivation to differentiate it, then explain why its negative slope and PV-weighted duration interpretation hold for positive future cash flows.
2. **Calculate and audit duration statements:** form positive weights that sum to one, check maturity bounds and zero-coupon cases, and convert signed basis-point moves into relative and currency first-order changes. Distinguish a local continuous-yield sensitivity from an exact finite change, a maturity-specific zero curve and a differently compounded duration measure.

The planned sequence follows [FRA mechanics](lesson-l3-fra-mechanics.md), but this lesson now changes from contract settlement to **mathematical derivatives** of a bond-price function. Read [exponents/logs](../concepts/concept-exponents-and-logs.md#powers-outcomes) and [local derivatives](../concepts/concept-local-derivatives.md#derivatives-outcomes), with [numeric foundations](../concepts/concept-numeric-foundations.md#numeric-outcomes) and [rate conventions](../concepts/concept-rate-conventions.md#rates-quote) as needed. [Coupon pricing](lesson-l3-coupon-bond-pricing.md#foundations) and [yield/par](lesson-l3-yield-and-par.md#ytm-definition) explain the financial inputs. Planned standalone zero-factor and duration/convexity concepts remain missing; the required mathematics and financial assumptions are supplied below.

<a id="price-function"></a>
## 1. Build the price function before taking its derivative

A fixed-coupon bond promises coupon payments on specified dates and principal at maturity. Let face value \(F>0\) be the principal amount promised back at maturity, in currency units. Let annual nominal coupon rate \(q\) be a nonnegative decimal and coupon frequency \(m\) a positive integer number of payments per year. For a regular complete-period schedule each coupon is \(Fq/m\); the final cash flow includes that final coupon **plus \(F\), exactly once**. Coupon frequency describes payments, not the convention used to discount them.

We now hold every amount and date fixed and vary **one annually continuously compounded yield \(y\)**. The local notation is:

| Symbol | Meaning | Unit / condition |
|---|---|---|
| \(i=1,\ldots,n\) | Label for each payment in the finite list | \(n\) is a positive integer |
| \(C_i\) | Entire receipt at date \(i\), including principal when due | Same currency for every row |
| \(t_i\) | Time from today's valuation to payment \(i\) | Years, positive for the main model |
| \(y\) | One discount-yield variable applied to all the payments | Annual decimal, continuous convention |
| \(e^{-yt_i}\) | Factor converting that future receipt to today's value | Positive, dimensionless |
| \(V_i=C_i e^{-yt_i}\) | Present value of payment \(i\) | Currency today |
| \(B(y)\) | Sum of all these present values as a function of \(y\) | Positive price in currency |
| \(B'(y)=dB/dy\) | Local price slope as yield varies | Currency per annual decimal yield unit; equivalently currency·years |
| \(D\) | Duration at the starting yield | Years |

The summation sign means add every row, not multiply by the number of rows unless every term really is identical. The price function in the source is

\[
\boxed{B(y)=\sum_{i=1}^{n} C_i e^{-yt_i}.}
\]

At least one future receipt must be positive, and we assume \(C_i\ge0\) with no negative payment legs for the sign/weight claims below. The source's ordinary bond has positive coupons and final principal. We assume these promised amounts are paid, dates remain fixed, and there are no extra costs, defaults, embedded options or yield-dependent cash flows. This is a full cash-flow price, not an unexplained clean-price/accrued-interest quotation.

A **single yield** is not the same object as a maturity-specific zero curve \(R(t_i)\). Curve pricing uses \(\sum_i C_i e^{-R(t_i)t_i}\); yield-to-maturity instead selects one \(y\) that reproduces a given price. Here we analyse how the one-variable price \(B(y)\) changes if that common yield changes. We are not replacing every nonflat zero curve by one arbitrarily chosen rate. The interpretation of a market curve shock needs further care below.

Source: [price-yield function, L 3 p 32](../../sources/annotated/lecture-3/page-032.md#lecture-3-p032-price-yield-function).

<a id="local-slope"></a>
## 2. A derivative is a local slope, not a finite price loss

A function gives an output for an input; \(B(y)\) means “price at yield \(y\).” For a nonzero yield change \(h\), the average price slope is

\[
\frac{B(y+h)-B(y)}{h}.
\]

The derivative is the limiting slope as \(h\) approaches zero from either direction, **not** a calculation with zero in the denominator. A tangent line passes through the starting point with this local slope. Its prediction for a small finite change is \(B(y+h)\approx B(y)+B'(y)h\), not an assertion of exact equality for a curved function.

If the input yield is quoted as an annual decimal, a change of 0.001 is a different input move from 0.1 or 1. The numerical slope is measured per **one whole annual decimal rate unit**, not per one basis point. Multiplying the slope by the actual decimal move restores currency units. Keep the starting yield fixed when evaluating the derivative used for the tangent.

<a id="exponential-bridge"></a>
## 3. The needed exponential derivative — a labelled mathematical supplement

The exponent/log bridge established positive \(e^x\), the identity \(e^{a+b}=e^ae^b\), and the requirement that \(x\) be dimensionless. We now introduce one **fundamental exponential limit**:

\[
\lim_{u\to0}\frac{e^u-1}{u}=1.
\]

We use this standard mathematical identity as a foundation here; a complete analytic proof of the construction of the exponential and this limit is outside this lesson. Its meaning is that for a very small dimensionless change \(u\), exponential growth \(e^u\) differs from 1 by approximately \(u\). The base \(e\) is the exponential base whose instantaneous proportional growth per unit input is one. That is an interpretation of the identity, not a separate proof.

**Supplemental numerical illustration, not proof:**

| Nonzero \(u\) | \((e^u-1)/u\), rounded | Interpretation |
|---:|---:|---|
| +0.01 | 1.005016708417 | Slightly above 1 |
| +0.001 | 1.000500166708 | Closer to 1 from above |
| −0.01 | 0.995016625083 | Slightly below 1 |
| −0.001 | 0.999500166625 | Closer to 1 from below |

Now derive the derivative rather than merely announce it. For fixed \(x\), use the exponent addition rule:

\[
\frac{e^{x+u}-e^x}{u}=e^x\frac{e^u-1}{u}.
\]

As \(u\to0\), \(e^x\) stays fixed and the last factor approaches 1. Hence

\[
\frac{d}{dx}e^x=e^x.
\]

This derivative identity is now justified **conditional on the explicitly stated fundamental limit**. We have not assumed that the earlier derivative bridge already taught it.

<a id="chain-rule"></a>
### The inner exponent changes too: derive the required chain-rule case

For one receipt, write \(V(y)=C e^{-yt}\), with \(C\) and \(t>0\) fixed. The exponent \(-yt\) is dimensionless: annual yield times years. Changing yield by \(h\) changes the exponent by \(-th\). Factor the difference quotient:

\[
\frac{V(y+h)-V(y)}{h}
=C e^{-yt}\frac{e^{-th}-1}{h}.
\]

Set \(u=-th\). For \(h\ne0\), also \(u\ne0\), so

\[
\frac{e^{-th}-1}{h}
=(-t)\frac{e^u-1}{u}.
\]

As \(h\to0\), \(u\to0\), and the last ratio tends to 1. Therefore

\[
\boxed{\frac{d}{dy}\bigl(Ce^{-yt}\bigr)=-tCe^{-yt}.}
\]

The **chain rule** is the name for accounting for the change of an inner input as well as the outer function. Here the outer exponential contributes \(e^{-yt}\), and the inner linear exponent contributes slope \(-t\); the constant cash amount \(C\) multiplies both. The direct quotient above derives exactly the linear-inner case we need, so no general chain-rule mastery is hidden in the step. Do not omit the factor \(t\), lose the minus sign, or differentiate the held-fixed coupon/date.

If \(t=0\), this special substitution would divide by zero through \(u\). Treat that case separately: \(Ce^0=C\) is constant in yield and has derivative zero. The final formula gives zero too, but the separate reasoning avoids an invalid intermediate division.

<a id="first-derivative"></a>
## 4. Add the individual slopes and establish the sign

There are finitely many payments. Differences of sums are sums of differences, and the derivative of a finite sum is the sum of the derivatives. Thus

\[
\boxed{B'(y)=-\sum_{i=1}^{n}t_i C_i e^{-yt_i}.}
\]

Every \(t_i\), positive \(C_i\) and exponential factor is positive in the ordinary future-payment model. At least one term is strictly positive, so the leading minus sign makes \(B'(y)<0\): increasing continuous yield reduces price. Negative **yield** does not invalidate this: the exponential factor is still positive. Negative **cash-flow legs**, however, would change the sign argument and cannot inherit this conclusion automatically.

The terms \(t_iC_ie^{-yt_i}=t_iV_i\) have currency·year units. Therefore \(B'\) has currency·year units when annual yield has inverse-year units. The derivative is not simply \(-B\), because different payment dates have different multiplying times.

Source: [price derivative and opposite direction, L 3 p 32](../../sources/annotated/lecture-3/page-032.md#lecture-3-p032-price-first-derivative). The source's strict inequality is taught with its positive-future-payment assumptions explicit.

<a id="duration-definition"></a>
## 5. Normalise the slope to define duration

A USD 1000-sized holding usually has a larger currency slope than an otherwise identical USD 100-sized holding. To compare **relative** sensitivities, divide by the positive price. The source defines

\[
D=\frac{\sum_i t_i C_i e^{-yt_i}}{B}.
\]

Combining this with the derivative just derived gives

\[
\boxed{D=-\frac{B'(y)}{B(y)},\qquad B'(y)=-B(y)D.}
\]

The numerator has currency·years and the denominator currency, leaving **years**. Scaling every payment by the same positive number scales price and derivative by that number, but leaves duration unchanged. This is why a percentage sensitivity need not rank two portfolios' absolute currency risks without also knowing their prices.

Source: [duration definition, L 3 p 33](../../sources/annotated/lecture-3/page-033.md#lecture-3-p033-duration-definition).

<a id="weights"></a>
### Derive the weighted-average interpretation

Define the weight of payment \(i\) as its share of the total present value:

\[
w_i=\frac{V_i}{B}=\frac{C_i e^{-yt_i}}{B}.
\]

These are dimensionless, nonnegative weights; positive receipts have positive weights. Their sum is

\[
\sum_i w_i=\frac{\sum_i V_i}{B}=\frac{B}{B}=1.
\]

Substituting in the duration formula gives \(D=\sum_i t_iw_i\). Duration is therefore a **PV-weighted average payment time**, not a cash-flow-count average and not a simple average weighted by undiscounted face amounts. Each contribution \(t_iw_i\) is in years; it is **not** itself the dimensionless weight. A contribution can exceed one year without its weight exceeding one.

Source: [weights and their sum, L 3 p 33](../../sources/annotated/lecture-3/page-033.md#lecture-3-p033-duration-weights).

<a id="bounds"></a>
### Bounds and the zero-coupon case

Let \(t_{\min}\) and \(t_{\max}\) be the earliest and latest dates with positive cash flow. For every such date, \(t_{\min}\le t_i\le t_{\max}\). Multiply each inequality by its nonnegative weight and add. Because weights sum to one,

\[
t_{\min}\le D\le t_{\max}.
\]

If positive cash flows arrive at different dates, the average lies strictly between those extreme dates. A zero-coupon bond has only one positive receipt at maturity \(T\), so its weight is 1 and **\(D=T\)**. A standard coupon bond has some positive receipts before maturity and a positive final receipt, making duration strictly shorter than maturity. This statement requires genuinely earlier positive payments; a final-payment-only claim is the zero-coupon boundary, even if that final amount has several contractual labels.

Source: [duration versus maturity, L 3 p 33](../../sources/annotated/lecture-3/page-033.md#lecture-3-p033-duration-maturity).

<a id="worked-weights"></a>
### A complete small example — supplemental

A hypothetical USD claim pays USD 50 in one year and USD 50 in three years. Use continuous yield \(y=0\), fixed payments and no other cash flows. Both factors are 1, so PVs are USD 50 and USD 50, price \(B=100\) USD, and weights are 0.5 and 0.5. The time-weighted PV numerator is \(1(50)+3(50)=200\) USD·years. Hence

\[
B'=-200\text{ USD}\cdot\text{years},\qquad
D=200/100=1(0.5)+3(0.5)=2\text{ years}.
\]

This lies between one and three years. It is not three-year duration just because the last payment is at three years. Doubling both receipts doubles price to USD 200 and slope to −400 USD·years, but duration remains two years. Zero yield does not make the price insensitive to a change in yield.

<a id="first-order"></a>
## 6. Derive relative and absolute price-change estimates

For a small yield change \(\Delta y\), the tangent approximation is \(\Delta B\approx B'(y)\Delta y\). Substitute \(B'=-BD\):

\[
\boxed{\frac{\Delta B}{B}\approx-D\Delta y,\qquad
\Delta B\approx-BD\Delta y,\qquad
B_{\mathrm{tangent}}=B(1-D\Delta y).}
\]

Here \(B,D\) are evaluated at the **starting yield**, and \(\Delta B=B(y+\Delta y)-B(y)\) denotes the actual finite change. The right side is a first-order estimate. \(\Delta B/B\) is a dimensionless fraction, not currency and not yet a percent display. A positive yield move gives a negative predicted price change; a negative yield move gives a positive predicted price change when duration is positive.

For the two-receipt supplemental example, a +25 bp move means \(\Delta y=0.0025\). Relative change is approximately \(-2(0.0025)=-0.005=-0.5\%\); currency change approximately USD 100 × (−0.005) = −USD 0.50; estimated price **USD 99.50**. This is a local estimate, not an exact repricing claim.

Source: [first-order duration sensitivity, L 3 p 34](../../sources/annotated/lecture-3/page-034.md#lecture-3-p034-duration-first-order).

<a id="basis-points"></a>
### Convert basis points before multiplying

One basis point is one hundredth of a **percentage point**:

\[
1\text{ bp}=0.01\%=0.0001\text{ in annual decimal yield}.
\]

Thus \(k\) signed basis points correspond to \(\Delta y=k/10000\). A rise of 10 bp is \(+0.001\), not 0.1; a fall of 10 bp is \(-0.001\). A 100 bp rise is +0.01, one percentage point, not a 100% proportional rise in the original yield. For example 12.0% to 12.1% is +0.1 percentage point = +10 bp; the input to the duration formula is 0.121 − 0.120 = 0.001.

Source: [basis-point warning, L 3 p 34](../../sources/annotated/lecture-3/page-034.md#lecture-3-p034-basis-point).

<a id="comparison"></a>
### Compare like-for-like percentage sensitivity

For the same small signed \(\Delta y\), larger positive \(D\) gives larger magnitude of \(-D\Delta y\). This compares **percentage price sensitivity**, not necessarily currency loss. Currency sensitivity also depends on starting price/position size through \(BD\).

A two-year zero has duration two years; a ten-year zero has duration ten years. For the same +10 bp move, their first-order relative changes are −0.002 (−0.2%) and −0.010 (−1.0%). The longer zero is five times as sensitive in this local **relative** sense. Different initial prices or holding sizes can change an absolute-currency comparison. This qualification makes the source's prediction question precise.

Source: [longer-duration percentage sensitivity, L 3 p 34](../../sources/annotated/lecture-3/page-034.md#lecture-3-p034-longer-duration-sensitivity).

<a id="limits"></a>
## 7. Model boundaries and convention traps

- The source calls this “Macaulay duration under continuous compounding.” For this continuous-yield price function, the PV-weighted time and the negative normalised derivative coincide. Do **not** transfer that identity unchanged to a derivative with respect to a nominal discrete yield: its compounding convention introduces an adjustment. We have not silently switched to a discrete modified-duration formula.
- The one common yield change affects every term coherently. A **parallel shift** means adding the same rate change at every maturity under a specified zero-curve convention. One may separately differentiate a fixed-cash-flow curve price with respect to such a shift, using that curve's own PV weights. Those weights need not equal this single-YTM model's weights. Arbitrary nonparallel curve movements cannot be summarised by substituting one unspecified \(\Delta y\).
- Changing cash-flow amounts/dates, including option exercise or default effects, violates the held-fixed assumptions. Negative cash-flow portfolios can have negative weights or cancellations; the positive-weight bounds and sign conclusions then need not hold.
- Zero price makes normalisation by \(B\) invalid. An empty/all-zero schedule cannot identify a useful duration by this formula. A payment at time zero has zero slope, and a schedule consisting solely of it has duration zero when its price is positive; strict negative slope requires a positive future receipt.
- A finite continuous yield may be zero or negative; discount factors remain positive. The derivation does not require a positive yield, nor division by yield.
- The tangent is local. A sufficiently large positive change can even make the linear estimate negative while the true positive-cash-flow exponential price remains positive. That diagnoses extrapolation failure, not a negative real bond price. [Duration application](lesson-l3-duration-application.md) checks exact repricing and the source's finite-shock errors.

<a id="practice"></a>
## 8. Progressive practice

<a id="exercise-bridge"></a>
### A. Supplemental exponential bridge (outcome 1)

State the fundamental limit being used and why the numerical table is not a proof. Derive the derivative of \(Ce^{-yt}\) using the change \(u=-th\), explain both the minus sign and the factor \(t\), and handle \(t=0\) without dividing by zero.

<a id="exercise-derive"></a>
### B. Supplemental financial derivation (outcome 1)

Starting from fixed dated receipts, derive \(B(y)\), \(B'(y)\), \(D=-B'/B\), the weights and their sum. State all units and the conditions supporting negative slope and maturity bounds. Explain why a single YTM and a nonflat zero curve are different.

<a id="exercise-weights"></a>
### C. Supplemental calculation (outcome 2)

For USD 50 at year 1 and USD 50 at year 3 at zero continuous yield, compute every factor, PV, weight, time-weighted contribution, price, derivative and duration. Check the bounds and scaling if both receipts double. Estimate the effect of +25 bp.

<a id="exercise-prediction"></a>
### D. Source prediction question (outcomes 1 and 2)

Which should be more sensitive to a rate change: a **two-year zero-coupon bond or a ten-year zero-coupon bond**? Why?

Source: [sensitivity prediction, L 3 p 32](../../sources/annotated/lecture-3/page-032.md#lecture-3-p032-sensitivity-prediction). In your authored answer distinguish relative sensitivity from currency sensitivity and use the +10 bp comparison above.

<a id="exercise-basis"></a>
### E. Supplemental signs, units and boundaries (outcome 2)

A hypothetical position has starting price USD 80 and continuous-yield duration five years. Estimate its relative change, currency change and new price for +20 bp and −20 bp. State whether these are exact prices. What fails for zero starting price, signed cash-flow weights, or a nominal discrete yield substituted without conversion?

<a id="exercise-teachback"></a>
### F. Supplemental teach-back (outcomes 1 and 2)

Explain why duration has years even though it predicts a percentage change. Describe the exponential derivative bridge, the role of fixed payments, the zero-coupon boundary, the starting-point tangent and the correct bp-to-decimal conversion. Correct the claims “duration is always maturity” and “the derivative itself is the currency price change.”

<a id="answers"></a>
## 9. Separate authored answers

<a id="answer-bridge"></a>
### Answer A — supplemental derivation

The accepted identity is \(\lim_{u\to0}(e^u-1)/u=1\); computed examples illustrate convergence but do not prove the limit. The difference quotient for \(Ce^{-yt}\) is \(Ce^{-yt}(e^{-th}-1)/h\). For fixed \(t>0\), set \(u=-th\), giving \(-tCe^{-yt}(e^u-1)/u\); its limit is \(-tCe^{-yt}\). The minus sign comes from discounting's negative exponent and \(t\) is the slope magnitude of the inner exponent with respect to yield. At \(t=0\), the value is the constant \(C\), with derivative zero; do not divide by \(u=0\).

<a id="answer-derive"></a>
### Answer B — supplemental model and units

Add each currency PV \(C_ie^{-yt_i}\) to obtain \(B\). Add the term derivatives to get \(B'=-\sum_i t_iC_ie^{-yt_i}\), in currency·years. Divide its negative by positive currency price to get duration in years. Define \(w_i=C_ie^{-yt_i}/B\); summing gives 1 and duration is \(\sum_i t_iw_i\). With nonnegative receipts and at least one strictly positive future receipt, slope is negative. With positive PV weights, duration lies between earliest/latest positive-payment dates. A nonflat zero curve uses separate \(R(t_i)\), whereas the source varies one common continuous yield; nonparallel curve changes are not this one-variable calculation.

<a id="answer-weights"></a>
### Answer C — supplemental full calculation

Both factors equal 1, PVs are USD 50 each, price is USD 100, weights are 0.5 each, and time contributions are 0.5 and 1.5 years. Their sum gives \(D=2\) years. The numerator is USD 200·years and derivative −USD 200·years. Duration lies between 1 and 3. Doubling payments gives price USD 200 and derivative −USD 400·years, but duration still 2. For +25 bp use 0.0025: relative change ≈−0.005=−0.5%, currency change ≈−USD 0.50 and estimated price USD 99.50. These are first-order estimates, not exact finite repricing.

<a id="answer-prediction"></a>
### Answer D — authored answer to the source prediction

Each zero has one PV weight of 1 at maturity, so durations are 2 and 10 years. For the same +10 bp move (0.001 annual decimal), first-order relative changes are −0.2% and −1.0%; the ten-year zero is five times as sensitive **in percentage terms**. A longer wait magnifies the exponent's response to yield through the factor \(t\). Absolute currency changes also depend on price and position size, so duration alone does not answer every currency-risk comparison.

<a id="answer-basis"></a>
### Answer E — supplemental conversion and limits

+20 bp =+0.002 annual decimal. Relative change ≈−5×0.002=−0.01=−1%; currency change ≈−USD 0.80; estimated price USD 79.20. For −20 bp the signs reverse: +1%, +USD 0.80, estimate USD 80.80. The full price function is not given, so exact finite prices/errors cannot be claimed. At zero price the normalising division fails; signed PV weights do not imply ordinary positive-weight bounds; a different yield compounding convention requires differentiating that convention rather than reusing this continuous-yield measure unchanged.

<a id="answer-teachback"></a>
### Answer F — supplemental explanation

Duration is a currency-normalised slope with years; multiplying by an annual yield change cancels years, giving a dimensionless relative change. The exponential limit plus the inner slope \(-t_i\) derives each payment's slope; fixed cash flows let those slopes add. Only a single-payment zero must have duration exactly maturity; earlier positive coupons pull the weighted average earlier. The derivative is a rate of price change, so multiply by the decimal yield move for the tangent's currency-change estimate. Ten bp is 0.001, not 0.1. Use starting price/duration and distinguish that estimate from exact repricing.

<a id="source-map"></a>
## Exact primary source-to-teaching and practice map

| Unit ID | Teaching anchor | Outcomes | Practice / answer |
|---|---|---|---|
| lecture-3-p032-price-first-derivative | [First derivative](#first-derivative) | 1 | [B](#exercise-derive) / [answer](#answer-derive) |
| lecture-3-p032-price-yield-function | [Price function](#price-function) | 1 | [B](#exercise-derive) / [answer](#answer-derive) |
| lecture-3-p032-sensitivity-prediction | [Original question](#exercise-prediction) | 1, 2 | [D](#exercise-prediction) / [answer](#answer-prediction) |
| lecture-3-p033-duration-definition | [Normalised slope](#duration-definition) | 1, 2 | [B](#exercise-derive), [C](#exercise-weights) / [B answer](#answer-derive), [C answer](#answer-weights) |
| lecture-3-p033-duration-maturity | [Bounds](#bounds) | 1, 2 | [D](#exercise-prediction) / [answer](#answer-prediction) |
| lecture-3-p033-duration-weights | [Weights](#weights) | 1, 2 | [B](#exercise-derive), [C](#exercise-weights) / [B answer](#answer-derive), [C answer](#answer-weights) |
| lecture-3-p034-basis-point | [Rate units](#basis-points) | 2 | [E](#exercise-basis) / [answer](#answer-basis) |
| lecture-3-p034-duration-first-order | [Tangent formula](#first-order) | 1, 2 | [F](#exercise-teachback) / [answer](#answer-teachback) |
| lecture-3-p034-longer-duration-sensitivity | [Comparison](#comparison) | 1, 2 | [D](#exercise-prediction) / [answer](#answer-prediction) |

Mappings and author calculations are staging evidence only. Independent teaching review and planned financial-concept integration remain pending.
