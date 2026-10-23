# Coupon cash flows, yield and par yield

**Source-grounded quick reference — author draft; independent semantic review pending.** Prerequisite: [zero rates and discount factors](concept-zero-discount-factors.md#zero-formulas). Use [the full yield/par lesson](../lessons/lesson-l3-yield-and-par.md#outcomes) for stepwise teaching.

<a id="bond-objects"></a>
## Three rates answer three different questions

A bond's **face value** \(F>0\) is principal promised at maturity; its **price** \(B\) is value today, which need not equal face. A regular coupon bond with nominal annual decimal coupon rate \(q\) and positive integer payment frequency \(m\) pays \(Fq/m\) each full coupon period. The final receipt includes both the last coupon and principal, exactly once. This reference assumes fixed payments occur, with no default, fees or optional changes; amounts share one currency and times are years from the same valuation date.

| Object | What it does | Convention here |
|---|---|---|
| Zero rate \(R(t_i)\) | Prices a single dated payment | Annual continuous decimal, possibly different by maturity |
| Yield to maturity (YTM) \(y\) | Reproduces one given bond price using one rate for all its payments | Annual continuous decimal in this source |
| Par coupon rate \(q_{\mathrm{par}}\) | Sets the scheduled coupon so the curve-priced bond equals face | Nominal annual decimal, paid in \(m\) regular instalments |

The subscript \(i\) labels payment rows; \(t_i>0\) is the date in years, \(C_i\) the complete receipt there, and \(n\) the number of rows. Sum means add all rows. Let \(P_i=P(0,t_i)=e^{-R(t_i)t_i}\). Then distinguish

\[
B=\sum_{i=1}^{n} C_iP_i
\quad\text{(curve pricing)},\qquad
B=\sum_{i=1}^{n}C_i e^{-yt_i}
\quad\text{(solve for one YTM)}.
\]

Exponent arguments are dimensionless. YTM is not the arithmetic average of zero rates; it is the rate solving that price equation. For positive future receipts, increasing this continuous yield decreases every PV, so a solution is unique when it exists. A numerical solution should bracket and reprice, not report an unchecked guess. Sources: [L3 p15 upper yield equation](../../sources/annotated/lecture-3/page-015.md#lecture-3-p015-yield-definition) and [lower yield-versus-zero warning](../../sources/annotated/lecture-3/page-015.md#lecture-3-p015-yield-versus-zero).

<a id="bond-par"></a>
## Par: solve for the coupon, not for a guessed average rate

**Par** means \(B=F\). Set \(A=\sum_iP_i\), the sum of factors on all coupon dates, and \(d=P(0,T)\), the final principal's factor at maturity \(T\). Both are dimensionless. The coupon leg is \((Fq/m)A\); principal is \(Fd\). Divide the par-price equation by positive face and rearrange:

\[
\frac{Fq_{\mathrm{par}}}{m}A+Fd=F
\ \Longrightarrow\ 
q_{\mathrm{par}}=\frac{m(1-d)}{A}.
\]

The final coupon is already in \(A\); adding it again with principal double counts it. Positive factors give \(A>0\). If \(d>1\), the algebra can produce a negative par coupon; a contract forbidding negative coupons adds a constraint not imposed by this formula.

**Preserve the source's units:** p17 sets face to 100 and uses \(c\) for the **annual coupon amount on that face scale**, not our decimal \(q\). Its equation is \(Ac/m+100d=100\), hence \(c=100m(1-d)/A\). On that scale \(c=100q_{\mathrm{par}}\); the same numeral is a percent quote, but its coupon-payment use is currency per year. Sources: [p17 definitions of annuity/principal factors](../../sources/annotated/lecture-3/page-017.md#lecture-3-p017-annuity-and-principal-factors) and [lower par equation](../../sources/annotated/lecture-3/page-017.md#lecture-3-p017-par-equation).

<a id="bond-example"></a>
## Supplemental mini-example: equal accumulation, different numbers

A one-year bond pays one coupon of USD 5 and principal USD 100, so its only receipt is USD 105. At price USD 100, continuous YTM solves

\[
100=105e^{-y},\qquad y=\ln(105/100)\approx0.048790164169.
\]

That is about **4.879016% annually continuous**, not the 5% nominal annual coupon. The one-year effective return is \(e^y-1=0.05\), and the factor is \(100/105\approx0.952380952381\). Multiplying USD 105 by the unrounded factor returns USD 100. The bond is at par despite unequal printed continuous-yield and nominal-coupon numbers. Compare coupon and yield only after matching compounding/payment conventions; do not apply an unqualified “coupon equals yield” test across them.

<a id="bond-limits"></a>
## Limits worth remembering

YTM is a price summary, not an automatic realised return. Default, sale before maturity, changing prices, fees and coupon reinvestment affect realised results; reinvestment at the YTM is an additional assumption. A nonflat zero curve's par coupon is discount-factor weighted, not an average of its zero quotes. Irregular first/last coupon periods need an explicit payment and accrual schedule, not automatic use of \(Fq/m\). Use [matched-convention explanation](../lessons/lesson-l3-yield-and-par.md#continuous-par-match) rather than treating continuous YTM as a nominal quote.

<a id="bond-selfcheck"></a>
## Supplemental self-check

A one-year, USD 100-face bond has two full half-year coupons, with factors 0.97 at six months and 0.90 at one year. Find its nominal annual par coupon rate and each coupon amount. Reprice both coupons plus principal; do not average zero rates.

<a id="bond-answer"></a>
## Separate supplemental answer

Here \(m=2\), \(A=0.97+0.90=1.87\), \(d=0.90\). Thus

\[
q_{\mathrm{par}}=\frac{2(1-0.90)}{1.87}\approx0.106951871658,
\qquad \frac{100q_{\mathrm{par}}}{2}\approx5.347593582888\text{ USD}.
\]

The nominal annual rate is about **10.695187%**, with each coupon about **USD 5.35** when displayed to cents. Retaining precision, coupon-leg PV is USD 10 and principal PV is USD 90, summing to USD 100. Equivalently add first coupon times 0.97 to final coupon-plus-100 times 0.90. Rounding each contractual coupon to cents would define a slightly different payment stream; the exact par calculation uses the unrounded coupon.

<a id="bond-navigation"></a>
## Full teaching and related lookups

[Coupon pricing](../lessons/lesson-l3-coupon-bond-pricing.md), [yield/par derivations](../lessons/lesson-l3-yield-and-par.md#par-equation), [bootstrap extension](../lessons/lesson-l3-bootstrap-extension.md), and [duration/convexity](concept-duration-and-convexity.md). Existing lesson files remain authored drafts, not teaching approvals.
