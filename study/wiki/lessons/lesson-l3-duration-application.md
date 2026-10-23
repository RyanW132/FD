# Use duration and understand tangent error

> **Production-curriculum draft — independent teaching review pending.** Primary source: Lecture 3 physical pp 35–37, six units. Printed tables and rounding are preserved; expanded calculations and added exercises are labelled author supplements. These are fixed-cash-flow classroom models, not financial recommendations or approved teaching coverage.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain the weighted table and tangent model:** build the source payment schedule, interpret each PV, weight and time contribution, and describe the price-yield curve and tangent in accessible words. Explain the sign, units, starting-point and fixed-payment assumptions and why rounded equality does not mean zero approximation error.
2. **Reproduce and check the calculations:** compute every source table cell, price, derivative and duration; obtain signed bp-based relative/absolute changes; reproduce every source repricing/error row and compare positive and negative shocks using full precision. Distinguish arithmetic rounding from genuine tangent error and diagnose when the model or approximation is inapplicable.

Prerequisite: [duration derivation](lesson-l3-duration-derivation.md), including its exponential derivative bridge. [Coupon pricing](lesson-l3-coupon-bond-pricing.md#foundations), [yield/par](lesson-l3-yield-and-par.md#ytm-definition), [numeric foundations](../concepts/concept-numeric-foundations.md#numeric-rates), [exponents/logs](../concepts/concept-exponents-and-logs.md#powers-outcomes), [local derivatives](../concepts/concept-local-derivatives.md#derivatives-approximations) and [rate conventions](../concepts/concept-rate-conventions.md#rates-quote) support the calculation. The planned duration/convexity and zero-factor reference concepts remain missing; no later convexity formula is needed here.

<a id="schedule"></a>
## 1. Read the source's bond and set the units

The source describes a **three-year, 10% coupon bond paying semiannually**, with **12% continuously compounded yield**. Its table uses payments 5 and 105: a 100-face scale, with six USD 5 coupons and USD 100 principal. We use **USD as an explicit teaching currency label** for the slide's otherwise unlabelled cash amounts; the amounts themselves are unchanged. A 10% annual coupon on 100 face is 10 per year, paid as 5 every half-year. It is not a 10% coupon each half-year and not a 12% coupon.

Assume valuation just after any current coupon, with six complete half-year periods remaining. No current coupon is added. All amounts/dates stay fixed as the yield changes; performance is assumed, with no options, defaults, fees or added accrued-interest adjustment. The final 105 is the last 5 coupon plus 100 principal once.

| Payment | Time \(t_i\), years | Coupon, USD | Principal, USD | Entire receipt \(C_i\), USD |
|---:|---:|---:|---:|---:|
| 1 | 0.5 | 5 | 0 | 5 |
| 2 | 1.0 | 5 | 0 | 5 |
| 3 | 1.5 | 5 | 0 | 5 |
| 4 | 2.0 | 5 | 0 | 5 |
| 5 | 2.5 | 5 | 0 | 5 |
| 6 | 3.0 | 5 | 100 | 105 |
| Total | Not a date | 30 | 100 | 130 |

The USD 130 total is undiscounted cash received at different dates, **not today's price**. The continuous annual discount-yield variable is \(y\), initially 0.12. For each row, exponent \(-yt_i\) is dimensionless, factor \(e^{-yt_i}\) is positive, and \(V_i=C_ie^{-yt_i}\) is PV in USD. Price \(B=\sum_iV_i\); weight \(w_i=V_i/B\) is dimensionless; duration contribution \(t_iw_i\) is in years. Define the numerator \(N=\sum_i t_iV_i\), in USD·years, so \(B'=-N\) and \(D=N/B\). Here the prime means derivative with respect to annual **continuous** decimal yield, with dates and amounts held fixed.

<a id="source-table"></a>
## 2. Preserve the complete printed weighted table

The source prints the following rounded values. Its last column is **time × weight**, not weight alone.

| Time, years | Cash flow (USD label added) | Printed present value | Printed \(t_i\times\) weight, years |
|---:|---:|---:|---:|
| 0.5 | 5 | 4.709 | 0.025 |
| 1.0 | 5 | 4.435 | 0.047 |
| 1.5 | 5 | 4.176 | 0.066 |
| 2.0 | 5 | 3.933 | 0.083 |
| 2.5 | 5 | 3.704 | 0.098 |
| 3.0 | 105 | 73.256 | 2.333 |
| Total | 130 | 94.213 | 2.653 |

Source: [data and entire table, L 3 p 35](../../sources/annotated/lecture-3/page-035.md#lecture-3-p035-duration-example-table).

**Rounding qualification:** adding the displayed time-contribution rows gives 2.652, while the source total is 2.653 because the total is calculated before rounding the rows. Do not “repair” the original total by summing rounded cells, nor claim all displayed cells are exact. The full-precision calculation below explains the source results.

<a id="full-weights"></a>
### Reconstruct every row, with enough precision to audit the total

Compute each exponent first: \(-0.12(0.5)=-0.06\), then −0.12, −0.18, −0.24, −0.30 and −0.36. Exponentiating produces factors; multiply by the actual receipt to get PV. Only after summing PVs to get \(B\) can you divide each PV by that same \(B\) to form a weight.

| \(t_i\), years | Exponent | Factor (approx.) | PV \(V_i\), USD (approx.) | Weight \(w_i\) (approx.) | \(t_iw_i\), years (approx.) |
|---:|---:|---:|---:|---:|---:|
| 0.5 | −0.06 | 0.941764533584 | 4.708822667921 | 0.049980593343 | 0.024990296671 |
| 1.0 | −0.12 | 0.886920436717 | 4.434602183586 | 0.047069950178 | 0.047069950178 |
| 1.5 | −0.18 | 0.835270211411 | 4.176351057056 | 0.044328809675 | 0.066493214512 |
| 2.0 | −0.24 | 0.786627861067 | 3.933139305333 | 0.041747300768 | 0.083494601535 |
| 2.5 | −0.30 | 0.740818220682 | 3.704091103409 | 0.039316127236 | 0.098290318090 |
| 3.0 | −0.36 | 0.697676326071 | 73.256014237458 | 0.777557218802 | 2.332671656405 |

**Work the first row:** the factor is \(e^{-0.06}\approx0.941764533584\), so PV is \(5e^{-0.06}\approx4.708822667921\) USD. Dividing by the total price 94.213020554763… gives weight 0.0499805933426…; multiplying by 0.5 years gives 0.0249902966713… years. This is about 5% of the price, arriving in half a year.

**Work the final row:** PV is \(105e^{-0.36}\approx73.256014237458\) USD. Its weight is 0.7775572188016…, not 2.333. Multiplying that weight by 3 years gives 2.3326716564048… years. A large final principal therefore dominates the weighted time, but earlier coupons still pull it below maturity.

All row values in this expanded table are rounded for display; author calculation retains unrounded factors/PVs. A sum of twelve-decimal displays is still not the definition of the exact underlying exponential sum.

<a id="results"></a>
## 3. Price, derivative, duration and reasonableness checks

Adding the unrounded PVs gives

\[
B\approx94.213020554763\text{ USD}.
\]

The time-weighted PV numerator is

\[
N=0.5V_1+1V_2+1.5V_3+2V_4+2.5V_5+3V_6
\approx249.948089184693\text{ USD}\cdot\text{years}.
\]

Hence \(B'=-N\approx-249.948089184693\) USD·years and

\[
D=\frac{N}{B}\approx2.653010037391\text{ years}.
\]

This reproduces the source's **\(B=94.213\)** and **\(D=2.653\) years**, as rounded displays. [Source results, L 3 p 35](../../sources/annotated/lecture-3/page-035.md#lecture-3-p035-duration-example-results).

Check four independent features:

1. Positive-rate factors are below 1, so each PV is less than its future receipt; price 94.213… is below the undiscounted 130.
2. Unrounded weights sum to 1. They are fractions of PV, not fractions of the 130 undiscounted total.
3. Duration 2.653… lies strictly between the earliest positive receipt at 0.5 and maturity 3. It is less than 3 because earlier coupons have positive weight.
4. The derivative is negative and satisfies \(-B'/B=D\). The source's column sum is duration, not the derivative or price change. Multiplying the derivative by a specified yield move is a separate operation.

<a id="small-change"></a>
## 4. Source +10 bp move: keep relative change separate from currency change

The yield rises from 12.0% to 12.1%. Its annual decimal move is \(\Delta y=0.121-0.120=+0.001\), i.e.10 bp. Use the **starting** price and duration at 12%, not a duration recomputed at the new yield inside the tangent formula.

The source uses its rounded displays:

\[
\frac{\Delta B}{B}\approx-2.653(0.001)=-0.002653,
\]
\[
\Delta B\approx-94.213(2.653)(0.001)\approx-0.250.
\]

The relative fraction −0.002653 is **−0.2653%**, not −0.002653% and not a loss of 2.653%. The last line is in USD on the 100-face teaching scale. The rounded-input product before its final three-decimal display is −0.249947089 USD. These are source display calculations, not exact repricing.

**Author full-precision tangent:** \(-D\Delta y\approx-0.002653010037391\), or −0.2653010037391%; absolute predicted change \(-N\Delta y\approx-0.249948089185\) USD. Both methods predict about a quarter-dollar fall. Their tiny numerical difference comes from rounding inputs, not a different financial model.

Source: [10 bp change and duration calculations, L 3 p 36](../../sources/annotated/lecture-3/page-036.md#lecture-3-p036-duration-small-change).

<a id="new-price"></a>
### Compare the estimate with an actual new price calculation

The source subtracts its rounded 0.250 change from 94.213 and obtains **93.963**. Using unrounded starting price and slope instead gives the tangent estimate

\[
B_{\mathrm{tangent}}=94.213020554763\ldots-0.249948089184693\ldots
\approx93.963072465578\text{ USD}.
\]

“Exact repricing” below means evaluate the fixed-cash-flow model itself at the new yield, rather than its tangent; it does not mean an observed future market transaction. At \(y_{\mathrm{new}}=0.121\), calculate all six terms again:

\[
B(0.121)=5e^{-0.121(0.5)}+5e^{-0.121(1)}+5e^{-0.121(1.5)}
+5e^{-0.121(2)}+5e^{-0.121(2.5)}+105e^{-0.121(3)}
\approx93.963428716033\text{ USD}.
\]

Exact model price minus full-precision tangent is approximately **USD 0.000356250454**. Both round to 93.963 at three decimal places and **USD 93.96** at cents. The approximation is very close for this example, but its actual error is **not zero**. The source's statement that direct repricing is approximately 93.963 is consistent with its displayed precision.

Source: [new-price estimate and repricing comparison, L 3 p 36](../../sources/annotated/lecture-3/page-036.md#lecture-3-p036-duration-new-price).

<a id="tangent-picture"></a>
## 5. Understand the graph without needing a later convexity formula

The source says duration replaces a curved price-yield relationship with a tangent line, is accurate for small yield changes, and has growing error for larger changes. It describes an ordinary option-free bond's curve as **convex**. Here “option-free” means no contractual option changes the promised payment pattern in the model. **Convex** is a shape description: the graph bends upward and lies above its local tangent. It does not mean price rises with yield.

The source page describes the relationship but does not contain a plotted graph. The following is an **authored accessible graph description**:

- Horizontal axis: annual continuous yield, either decimal or percentage with an explicitly stated scale. Vertical axis: positive bond price in USD on the source 100-face scale.
- Starting point: yield 0.12 (12%), price 94.213020554763… USD.
- The tangent passes through this point. Its slope is approximately −249.948089184693 USD per annual decimal yield unit. On a horizontal axis measured in percentage points, the numerical slope per one percentage point is 100 times smaller; do not mix the axes.
- Moving right (higher yield), both the curve and tangent go down. The curve becomes less steep and stays **above** the tangent, so duration predicts a slightly larger loss than full repricing in these examples.
- Moving left (lower yield), both go up. The actual curve again lies above the tangent, so the price gain is larger than the tangent predicts.
- They meet with the same slope at the starting point; separation at another yield is the approximation error. The comparison table below gives accessible numerical points for the described graph.

Why does the curve bend this way without invoking a second-derivative formula? From the preceding lesson, \(B'(y)=-\sum_i t_iC_ie^{-yt_i}\). As \(y\) rises, every positive exponential term decreases, so the magnitude of this negative slope gets smaller: the slope becomes **less negative**. To the right, the curve therefore falls less quickly than a line that keeps the old negative slope. To the left, the reverse reasoning gives a larger rise than that line predicts. This is an intuitive first-derivative explanation of the upward bend for fixed positive receipts. Formal convexity sensitivities and higher-order corrections are later material, not prerequisites for this comparison.

Source: [tangent approximation and convex shape, L 3 p 37](../../sources/annotated/lecture-3/page-037.md#lecture-3-p037-tangent-approximation).

<a id="printed-errors"></a>
## 6. Preserve every source approximation/repricing row

The source prints these rounded figures. Its “Error” is exact model price minus duration estimate, with displayed precision:

| Yield increase | Printed exact price | Printed duration estimate | Printed error |
|---|---:|---:|---:|
| 10 bp | 93.963 | 93.963 | approximately 0.000 |
| 100 bp | 91.749 | 91.714 | 0.035 |
| 200 bp | 89.354 | 89.214 | 0.140 |

Source: [entire errors table, L 3 p 37](../../sources/annotated/lecture-3/page-037.md#lecture-3-p037-duration-errors-table). No original value is silently changed. “Approximately 0.000” describes the chosen rounding; it is not an exact-zero-error claim.

<a id="full-errors"></a>
### Recompute all rows independently with one fixed starting tangent

For each signed move \(h=\Delta y\), use the same starting \(B\) and \(N\). Exact model price is \(B(0.12+h)=\sum_i C_i e^{-(0.12+h)t_i}\); tangent is \(B(0.12)-Nh\); error is exact minus tangent. All currency values below are USD per the source 100-face scale.

| Move | Decimal \(h\) | New yield, annual continuous | Exact model price (approx.) | Tangent price (approx.) | Exact minus tangent (approx.) |
|---|---:|---:|---:|---:|---:|
| +10 bp | +0.001 | 12.1% | 93.963428716033 | 93.963072465578 | 0.000356250454 |
| +100 bp | +0.010 | 13.0% | 91.748854281305 | 91.713539662916 | 0.035314618389 |
| +200 bp | +0.020 | 14.0% | 89.353956742828 | 89.214058771069 | 0.139897971759 |

Work the 100 bp row: \(h=0.01\), so tangent currency change is \(-249.948089184693\ldots(0.01)\approx-2.499480891847\) USD. Subtract from 94.213020554763… to get 91.713539662916…. Reprice the six fixed receipts at 0.13 to get 91.748854281305…. Subtract tangent from repriced value to obtain 0.035314618389… USD. Rounded to three decimals, these are 91.714,91.749 and 0.035, matching the source.

For 200 bp, double the **tangent** predicted change to approximately −4.998961783694 USD, giving 89.214058771069…. Exact repricing at 0.14 is 89.353956742828…, leaving error 0.139897971759… USD, displayed 0.140. Doubling a shock doubles a linear prediction, but does **not** exactly double the actual price change or approximation error. Here the error is roughly four times the 100 bp error; no universal error bound or exact scaling law is asserted from three observations.

At cents precision, +100 bp gives exact **USD 91.75** versus tangent **USD 91.71**, and +200 bp gives exact **USD 89.35** versus tangent **USD 89.21**. The appropriate tolerance depends on the intended use and holding size; “small” is not a universal number of bp that guarantees a desired accuracy.

<a id="negative-shocks"></a>
### Supplemental negative-shock check

A tangent should not be mistaken for a symmetric exact-price model. With the same starting price and derivative:

| Move | New yield | Exact model price, USD (approx.) | Tangent price, USD (approx.) | Exact minus tangent, USD (approx.) |
|---|---:|---:|---:|---:|
| −10 bp | 11.9% | 94.463325589860 | 94.462968643948 | 0.000356945912 |
| −100 bp | 11.0% | 96.748511552979 | 96.712501446610 | 0.036010106369 |

For −100 bp, tangent relative gain is \(+D(0.01)\approx0.026530100374\), or **2.6530100374%**; predicted currency gain is USD 2.499480891847…. Exact gain is larger because the curve lies above the tangent. Positive and negative equal-size moves have opposite tangent changes, but their exact changes and errors are not exactly symmetric. This is a supplemental illustration of the shape already explained, not a later convexity formula inserted without teaching.

<a id="limits"></a>
## 7. What this calculation does not establish

- It varies **one common continuous yield** while keeping all cash flows and dates fixed. It is not automatically a prediction for a nonparallel change in an actual maturity-specific zero curve. A curve-parallel-shift sensitivity would have to be defined using that curve and its own PV weights; equal initial prices do not force equal sensitivities.
- Coupon rates determine payments. Changing \(y\) from 12% to 13% does not change the USD 5 coupons. Time does not advance during this sensitivity calculation; it is a same-valuation-date scenario, not a one-year holding-period return.
- A different yield compounding convention changes the derivative measure. Semiannual coupons do not turn the continuous-yield duration into a discrete modified-duration measure by name alone.
- Positive weights/bounds and the described upward bend rely on fixed nonnegative cash flows with a positive future receipt. Signed portfolios, options, credit/default-sensitive payments or other changing inputs require different analysis.
- Negative or zero continuous yields remain mathematically valid; the exponential is positive. If price is zero, duration normalisation is undefined. A pure immediate payment has zero yield sensitivity, and an all-zero schedule gives no duration through division by price.
- The tangent can eventually predict a negative price for a large positive shock; the fixed positive-payment exact model cannot. Stop treating that extrapolation as a valid price. No accuracy guarantee for arbitrary finite shocks follows from the derivative alone.
- Source rounding, internal arithmetic error and genuine approximation error are separate. Use full-precision inputs to measure the tangent error, then round outputs for display. Neither identical printed prices nor passing author tests establishes independent teaching approval.

<a id="practice"></a>
## 8. Progressive supplemental practice

<a id="exercise-table"></a>
### A. Rebuild the weighted schedule (outcomes 1 and 2)

Construct every source payment/date pair and all six exponents, factors, PVs, weights and time contributions. Show the totals \(B,N,D\), check weight sum/maturity bounds and explain why the final printed 2.333 is not a weight. Why do the three-decimal time rows sum to 2.652 while the source total is 2.653?

<a id="exercise-small"></a>
### B. Reproduce the small move (outcome 2)

Convert 12.0% to 12.1% into bp and a decimal move. Reproduce both the source rounded-input duration calculation and the full-precision tangent. Reprice all six cash flows at the new yield. Explain why both displayed 93.963 values do not imply identical unrounded prices.

<a id="exercise-errors"></a>
### C. Audit the entire error table (outcomes 1 and 2)

Recalculate all three positive-shock rows with one fixed starting tangent. State the sign and definition of error, all new yields and cents-rounded exact/tangent prices. Compare the 100 bp and 200 bp errors without claiming a universal scaling law.

<a id="exercise-negative"></a>
### D. Reverse the yield direction (outcome 2)

Work the −10 bp and −100 bp supplemental rows. Explain why the tangent changes reverse exactly but the exact changes do not. Keep price changes distinct from a bond's realised holding-period return.

<a id="exercise-graph"></a>
### E. Describe an accessible graph (outcome 1)

Specify axes and units, starting point, tangent slope, left/right movements and which price lies above the other. Explain upward bending with the changing first-derivative slope, without relying on an unexplained convexity formula. Is there an original plotted graph on p 37?

<a id="exercise-limits"></a>
### F. Diagnose scope and boundaries (outcomes 1 and 2)

Explain why a semiannual coupon does not determine yield compounding; why changing market cash flows or a nonparallel zero-curve move invalidates an unqualified reuse of this calculation; and why positive cash-flow duration lies below maturity. What would a negative tangent price or a zero starting price tell you?

<a id="exercise-teachback"></a>
### G. Teach back an audit checklist (outcomes 1 and 2)

A learner says: “The 130 cash total is today's price;2.333 is the final weight;10 bp means 0.1; identical 93.963 displays prove exact duration; and the 100 bp price loss is a guaranteed realised return.” Correct every claim with dates, units, full-precision figures and model limits.

<a id="answers"></a>
## 9. Separate supplemental answers

<a id="answer-table"></a>
### Answer A — full table and interpretation

Receipts are 5, 5, 5, 5, 5, 105 USD at 0.5, 1, 1.5, 2, 2.5, 3 years. Exponents are −0.06, −0.12, −0.18, −0.24, −0.30,−0.36. Factors are approximately 0.941764533584, 0.886920436717, 0.835270211411, 0.786627861067, 0.740818220682,0.697676326071. Multiplying gives PVs 4.708822667921, 4.434602183586, 4.176351057056, 3.933139305333, 3.704091103409, 73.256014237458 USD. Their unrounded sum is 94.213020554763… USD.

Dividing by that price gives weights 0.049980593343, 0.047069950178, 0.044328809675, 0.041747300768, 0.039316127236,0.777557218802 (rounded), summing to 1 before rounding. Multiply by respective times to get 0.024990296671, 0.047069950178, 0.066493214512, 0.083494601535, 0.098290318090, 2.332671656405 years. Total duration is 2.653010037391… years; numerator 249.948089184693… USD·years; derivative its negative. Duration lies between 0.5 and 3. The final 2.333 is a rounded **time contribution**, with final weight about 0.777557, not above 1. The rounded contribution rows sum to 2.652; their unrounded total rounds to 2.653. Do not sum already-rounded rows to redefine duration.

<a id="answer-small"></a>
### Answer B — source and full-precision small-change checks

0.121−0.120=+0.001=+10 bp. Source relative estimate is−0.002653=−0.2653%; its rounded-input currency product is−0.249947089 USD, displayed−0.250. The printed subtraction 94.213−0.250 gives 93.963. Full-precision relative estimate is−0.002653010037391, currency change−0.249948089185 USD and tangent price 93.963072465578 USD. Repricing at 0.121 gives 93.963428716033 USD; error exact minus tangent is 0.000356250454 USD. Both round to 93.963 at three decimals and USD 93.96 at cents, but their unrounded values differ.

<a id="answer-errors"></a>
### Answer C — every positive-shock row

The +10, +100,+200 bp moves are 0.001, 0.01, 0.02, making yields 12.1%, 13%, 14%. Exact prices are 93.963428716033, 91.748854281305, 89.353956742828 USD; tangent prices 93.963072465578, 91.713539662916, 89.214058771069 USD. Errors exact minus tangent are positive 0.000356250454, 0.035314618389, 0.139897971759 USD. Cents-rounded exact/tangent pairs are 93.96/93.96,91.75/91.71,89.35/89.21. The source's three-decimal error displays are approximately 0.000, 0.035,0.140. The 200 bp error is roughly four times the 100 bp error here; this observed comparison is not a universal guarantee. All tangent rows hold the original slope fixed.

<a id="answer-negative"></a>
### Answer D — supplemental negative moves

−10 bp gives yield 11.9%, exact 94.463325589860 USD, tangent 94.462968643948 USD and positive error 0.000356945912 USD. −100 bp gives yield 11%, exact 96.748511552979 USD, tangent 96.712501446610 USD and positive error 0.036010106369 USD. The −100 bp tangent predicts a 2.6530100374% gain, or USD 2.499480891847; the true model gain is larger. The linear formula changes sign with the shock, but the exponential curve is not a straight line and its finite changes are not symmetric. Dates and payments are held fixed at one valuation date; these are yield-shock scenarios, not guaranteed realised investment returns.

<a id="answer-graph"></a>
### Answer E — accessible tangent description

Put annual continuous yield horizontally and USD price vertically. At 12% the point is approximately 94.213020554763 USD; the tangent slope is−249.948089184693 USD per annual decimal yield unit. To the right, both prices fall, but the true curve stays above the tangent as its slope becomes less negative. To the left, both rise and the true curve again lies above the tangent. This upward bend is the convex shape described for fixed positive payments, not a claim that price rises with yield. The source p 37 has text/table, **not an original plotted graph**; our description is an accessible authored explanation of its tangent statement.

<a id="answer-limits"></a>
### Answer F — assumptions before reuse

Semiannual specifies payment dates/coupon size; the source separately specifies continuous yield discounting. A different yield convention needs its own derivative. Yield-dependent cash flows break the fixed-payment derivation, and a nonparallel zero-curve change does not supply the one common yield move assumed here. Positive earlier cash-flow weights pull duration below final maturity, with the zero-coupon boundary equal to maturity. A negative tangent price signals excessive extrapolation of a local line, since the exact positive-payment model stays positive. At zero starting price the division defining duration fails; it is not automatically duration zero.

<a id="answer-teachback"></a>
### Answer G — audit checklist

The 130 is undiscounted cash at several dates; today's continuous-yield price is 94.213020554763… USD. The final weight is 0.777557218802…, while 2.333 is the rounded three-year contribution. Ten bp is 0.001 annual decimal, not 0.1. Identical 93.963 displays hide a nonzero model tangent error of about 0.000356250454 USD. A 100 bp scenario reprices fixed payments at a changed yield today; it is not a guaranteed holding-period return with coupon reinvestment, time passing, credit and other effects. Check schedule, convention, weights, starting slope, signed decimal shock, repricing and rounding separately before accepting a calculation.

<a id="source-map"></a>
## Exact primary source-to-teaching and practice map

| Unit ID | Teaching anchor | Outcomes | Practice / answer |
|---|---|---|---|
| lecture-3-p035-duration-example-results | [Price/derivative/duration](#results) | 1, 2 | [A](#exercise-table) / [answer](#answer-table) |
| lecture-3-p035-duration-example-table | [Preserved table](#source-table), [full working](#full-weights) | 1, 2 | [A](#exercise-table) / [answer](#answer-table) |
| lecture-3-p036-duration-new-price | [New price comparison](#new-price) | 2 | [B](#exercise-small) / [answer](#answer-small) |
| lecture-3-p036-duration-small-change | [10 bp move](#small-change) | 2 | [B](#exercise-small) / [answer](#answer-small) |
| lecture-3-p037-duration-errors-table | [Printed errors](#printed-errors), [unrounded comparison](#full-errors) | 1, 2 | [C](#exercise-errors) / [answer](#answer-errors) |
| lecture-3-p037-tangent-approximation | [Accessible shape explanation](#tangent-picture) | 1 | [E](#exercise-graph) / [answer](#answer-graph) |

These are proposed teaching/practice mappings only. Independent review and concept integration remain pending; no canonical Review or coverage record is created by this draft.
