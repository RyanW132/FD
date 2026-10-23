# Duration, convexity and local price sensitivity

**Source-grounded quick reference — author draft; independent semantic review pending.** Prerequisites: [bond yields](concept-bond-yields.md#bond-objects) and [local derivatives](concept-local-derivatives.md#derivatives-outcomes). The necessary exponential derivative is taught in [the duration lesson's bridge](../lessons/lesson-l3-duration-derivation.md#exponential-bridge), not assumed to have been covered by the general derivative reference.

<a id="sensitivity-model"></a>
## Fix the model before choosing a sensitivity

Hold each cash receipt \(C_i\ge0\) and its date \(t_i\ge0\) fixed; \(i\) labels a finite payment list with at least one positive future receipt. Amounts share one currency and times are years from valuation. Include final principal once. Let \(y\) be **one annual continuously compounded decimal yield**, not a different zero rate for each date. Assume the promised fixed cash flows occur and no options/defaults change them. Then positive price and PV weights are

\[
B(y)=\sum_i C_i e^{-yt_i}>0,\qquad
w_i=\frac{C_i e^{-yt_i}}{B},\qquad \sum_i w_i=1.
\]

Weights are dimensionless. The exponent \(-yt_i\) is dimensionless. A derivative \(B'\) is the local price slope as this yield varies; \(B''\) is the slope's rate of change, not its square. The exponential rule contributes a factor \(-t_i\) each time we differentiate, giving

\[
B'=-\sum_i t_iC_i e^{-yt_i},\qquad
B''=\sum_i t_i^2C_i e^{-yt_i}.
\]

These are currency·years and currency·years² respectively. Negative yields remain allowed because exponential factors stay positive. See the linked lesson for the limit/chain-rule derivation rather than treating these rules as unexplained calculus.

<a id="sensitivity-measures"></a>
## Normalised measures versus position-sized sensitivity

\[
D=-\frac{B'}B=\sum_i t_iw_i\quad\text{(years)},\qquad
C=\frac{B''}B=\sum_i t_i^2w_i\quad\text{(years}^2\text{)}.
\]

Here \(D\) is duration and \(C\) is convexity; the latter is **not** a cash receipt \(C_i\). Duration is PV-weighted payment time; convexity is PV-weighted **squared** time. The negative slope is \(-BD\); dollar curvature is \(BC\). Doubling a position doubles \(B,BD,BC\), but leaves \(D,C\) unchanged. Sources: [L3 p33 duration definition](../../sources/annotated/lecture-3/page-033.md#lecture-3-p033-duration-definition), [PV weights](../../sources/annotated/lecture-3/page-033.md#lecture-3-p033-duration-weights), and [p38 convexity definition](../../sources/annotated/lecture-3/page-038.md#lecture-3-p038-convexity-definition).

Because nonnegative weights sum to one, duration lies between the earliest and latest positive-payment times; convexity lies between their squares. A single-payment zero due at \(T\) has \(D=T\), \(C=T^2\). Signed asset/liability combinations do not inherit positive-weight bounds, and zero price forbids this normalisation. [Source duration/maturity boundary, p33](../../sources/annotated/lecture-3/page-033.md#lecture-3-p033-duration-maturity).

<a id="sensitivity-approximation"></a>
## Local change: convert basis points first

Let \(h\) be the signed change in the annual decimal yield, and \(\Delta B=B(y+h)-B(y)\). One basis point (bp) is 0.0001 annual decimal; \(k\) bp means \(h=k/10000\). Using measures at the **starting** yield,

\[
\frac{\Delta B}{B}\approx-Dh+\tfrac12 Ch^2,
\qquad
\Delta B\approx-BDh+\tfrac12 BCh^2.
\]

Omit the squared term for the duration-only tangent. The half arises because a trial quadratic \(B+ah+bh^2\) has first derivative \(a\) and second derivative \(2b\) at zero: matching price derivatives sets \(a=B'\), \(b=B''/2\). This motivates a local approximation, not an exact finite-shock identity. Positive convexity adds a positive correction for either sign of nonzero \(h\), while the duration term reverses sign. Years cancel rate units in the relative change; multiply by price for currency. [Source second-order formula, p38](../../sources/annotated/lecture-3/page-038.md#lecture-3-p038-convexity-approximation).

<a id="sensitivity-example"></a>
## Supplemental mini-example: a two-year zero

USD 100 is due at year 2, starting at \(y=0\). Price is USD 100, slope −200 USD·years, curvature 400 USD·years²; thus \(D=2\), \(C=4\). For +100 bp, \(h=0.01\):

| Calculation | Price, USD |
|---|---:|
| Duration only: 100 − 200 × 0.01 | 98.00 |
| Add curvature: 400 × 0.01² / 2 = 0.02 | 98.02 |
| Exact model repricing: \(100e^{-0.02}\) | 98.019867330676 |

The quadratic slightly overestimates the exact price; agreement to cents does not establish equality. Its relative change is −0.02 + 0.0002 = −0.0198 (−1.98%), and its currency change is −USD 1.98. The exact model is still a model, not a future trading-price guarantee.

<a id="sensitivity-limits"></a>
## Scope and traps

This continuous-yield duration is not automatically a discretely compounded modified duration. A parallel zero-curve shift can be analysed with the **curve's own** starting PV weights; that differs from simply assigning every bond the same YTM change. Nonparallel shifts need more than one sensitivity. Large moves leave higher-order errors; a tangent can even predict a negative price while the actual positive-cash-flow price stays positive. Positive convexity here does not generalise to callable or other option-dependent/changing cash flows. Matching duration does not remove default, basis, liquidity, rebalancing or model risk. See [full immunisation limitations](../lessons/lesson-l3-convexity-and-immunisation.md#limitations).

<a id="sensitivity-selfcheck"></a>
## Supplemental self-check

At zero continuous yield, a claim pays USD 50 at year 1 and USD 50 at year 3. Calculate price, PV weights, both derivatives, duration and convexity. Estimate price for +10 bp to second order; explain why convexity is not duration squared in this case.

<a id="sensitivity-answer"></a>
## Separate supplemental answer

Both PVs are USD 50, so \(B=100\) and weights are 0.5 each. Slope is \(-(1\times50+3\times50)=-200\) USD·years; curvature is \(1^2\times50+3^2\times50=500\) USD·years². Consequently \(D=2\) years and \(C=5\) years², not \(D^2=4\): averaging squared times differs from squaring their average. For \(h=10/10000=0.001\), relative change is approximately \(-2(0.001)+5(0.001)^2/2=-0.0019975\). Price is approximately **USD 99.80025** (USD 99.80 to cents), with curvature correction USD 0.00025. This is an estimate, not an assertion of exact repricing.

<a id="sensitivity-navigation"></a>
## Full lessons

[Duration derivation](../lessons/lesson-l3-duration-derivation.md#outcomes), [duration application](../lessons/lesson-l3-duration-application.md), [convexity and immunisation](../lessons/lesson-l3-convexity-and-immunisation.md#outcomes), and [rates synthesis](../lessons/lesson-l3-rates-synthesis.md). All exist as authored drafts; this reference grants no independent teaching approval.
