# Convexity correction and limits of immunisation

> **Production-curriculum draft — independent teaching review pending.** This lesson teaches eight primary units on Lecture 3 physical pp 38–40. Original rounded results remain visible. Added derivations, tables, examples, exercises and answers are labelled supplemental; no source or frozen prerequisite is edited. This is model education, not financial advice.

<a id="outcomes"></a>
## What you will be able to do

1. **Derive and interpret curvature:** differentiate the fixed-payment continuous-yield price a second time, obtain normalised and dollar convexity, explain the half coefficient in the local quadratic approximation, and check signs, units and positive-weight/zero-coupon boundaries.
2. **Calculate and qualify protection:** reproduce the source convexity and price comparison from all six payments, measure first-/second-order errors, then derive an asset-minus-liability sensitivity and explain precisely what matching can and cannot protect.

Read [duration derivation](lesson-l3-duration-derivation.md#exponential-bridge) and [duration application](lesson-l3-duration-application.md#schedule) first. The [exponential/log bridge](../concepts/concept-exponents-and-logs.md#powers-outcomes), [local-derivatives bridge](../concepts/concept-local-derivatives.md#derivatives-approximations), [numeric foundations](../concepts/concept-numeric-foundations.md#numeric-rates) and [rate conventions](../concepts/concept-rate-conventions.md#rates-quote) supply notation. The planned zero-factor and duration/convexity concept pages remain missing; the needed explanations are supplied here.

<a id="foundations"></a>
## 1. What changes, and what stays fixed?

A mathematical derivative measures a local rate of change; a second derivative measures how that slope changes. It is **not the square of the first derivative**. Our variable is one common annual **continuously compounded decimal yield** \(y\). Every promised receipt and payment date stays fixed at the same valuation date. This is not time passing or coupon reinvestment.

| Symbol | Definition | Units / assumptions |
|---|---|---|
| \(C_i\) | Receipt at payment date \(i\), principal included once when due | One currency; \(C_i\ge0\), at least one positive future receipt |
| \(t_i\) | Time from valuation to that receipt | Years; nonnegative, usually positive |
| \(n\) | Finite number of payment rows | Positive integer |
| \(V_i=C_i e^{-yt_i}\) | Present value of row \(i\) | Currency; exponent dimensionless |
| \(B=\sum_i V_i>0\) | Price at starting yield | Currency |
| \(B'\), \(B''\) | First and second derivatives with respect to \(y\) | Currency·years; currency·years² |
| \(w_i=V_i/B\) | Share of price represented by row \(i\) | Dimensionless; nonnegative and summing to one |
| \(D=-B'/B\) | Continuous-yield duration at the starting yield | Years |
| \(C=B''/B\) | Convexity at that same yield | Years²; **not** a cash flow \(C_i\) |
| \(h=\Delta y\) | New yield minus starting yield | Annual decimal; signed bp divided by 10000 |

The derivative variable and compounding convention matter. Semiannual **coupon payments** do not imply a semiannually compounded **yield**. A nonflat zero curve instead discounts each date at its own rate. A curve-parallel shift can be analysed separately using that curve's PV weights; it is not permission to replace those weights by a single-YTM model without justification. The main price model assumes promised payments occur, no options alter them, and no extra costs/default effects enter.

<a id="second-derivative"></a>
## 2. Differentiate again, one payment at a time

The previous lesson derived the required exponential rule from a stated fundamental exponential limit:

\[
\frac{d}{dy}e^{-yt_i}=-t_i e^{-yt_i}.
\]

The inner exponent changes at rate \(-t_i\). Because \(C_i,t_i\) are fixed, the first derivative of the price is

\[
B'(y)=-\sum_i t_i C_i e^{-yt_i}.
\]

For each term, \(-t_iC_i\) is now simply a constant multiplier. Differentiate its exponential and multiply:

\[
\frac{d}{dy}[-t_iC_i e^{-yt_i}]
=(-t_iC_i)(-t_i)e^{-yt_i}=t_i^2C_i e^{-yt_i}.
\]

Two minus signs give a plus, and the second time factor makes a square. Add the finitely many term derivatives:

\[
\boxed{B''(y)=\sum_i t_i^2C_i e^{-yt_i}.}
\]

A positive future receipt makes at least one term strictly positive, so \(B''>0\) in this model. The negative price slope becomes less negative as yield rises: the price-yield graph bends upward. This does not mean price rises with yield; \(B'<0\) still holds. A time-zero receipt contributes zero to both derivatives. Negative or zero yields keep all exponential factors positive; no division by yield is involved.

<a id="convexity"></a>
### Divide by price: normalised versus dollar curvature

The source defines

\[
\boxed{C=\frac{B''}{B}=\frac{1}{B}\sum_i t_i^2C_i e^{-yt_i}
=\sum_i t_i^2w_i.}
\]

This is a PV-weighted average **squared** payment time. Currency cancels, leaving years². In contrast \(B''=BC\) retains currency·years² and measures dollar curvature for the position size. Doubling all receipts doubles \(B,B',B''\), but leaves \(D,C\) unchanged. A quoted \(C=7.570\) is not a currency gain or a percentage gain by itself.

For positive-weight dates between \(t_{\min}\) and \(t_{\max}\), multiply \(t_{\min}^2\le t_i^2\le t_{\max}^2\) by each weight and sum. Since times are nonnegative and weights sum to one,

\[
t_{\min}^2\le C\le t_{\max}^2.
\]

For a single-payment zero-coupon bond maturing at \(T\), its weight is one: \(D=T\), \(C=T^2\). A pure positive immediate receipt has both measures zero. An all-zero price cannot be normalised, and signed asset-minus-liability cash flows need separate treatment rather than inherited positive-weight bounds.

Source: [convexity definition, L 3 p 38](../../sources/annotated/lecture-3/page-038.md#lecture-3-p038-convexity-definition). The differentiation, units and bounds above are authored explanations of that formula.

<a id="half-coefficient"></a>
## 3. Why the correction is one half times curvature

Duration gives the tangent line. To capture some bending, try a quadratic in the **change** \(h\):

\[
Q(h)=B+ah+bh^2.
\]

Here \(a,b\) are coefficients to choose, not new yields. At zero change, this already gives the correct price. Its slope at \(h=0\) is \(a\); its second derivative is \(2b\), from differentiating \(bh^2\) twice. Match the bond's starting slope and curvature: \(a=B'\), \(2b=B''\), hence \(b=B''/2\). We obtain

\[
B(y+h)\approx B+B'h+\tfrac12 B''h^2.
\]

This is the local second-order Taylor approximation for the smooth exponential price function, not an exact identity for arbitrary finite shocks. Matching value and two derivatives motivates its coefficients; it does not prove a universal numerical error bound. The local-derivatives bridge explains why it is exact for a quadratic but generally not for a nonquadratic function.

Subtract the starting \(B\), then divide by positive \(B\). Substitute \(B'/B=-D\) and \(B''/B=C\):

\[
\boxed{\frac{\Delta B}{B}\approx-Dh+\tfrac12 Ch^2.}
\]
\[
\boxed{\Delta B\approx-BDh+\tfrac12 BCh^2,\quad
B_{\mathrm{DC}}=B(1-Dh+\tfrac12 Ch^2).}
\]

Here DC labels “duration plus convexity”; \(B_{\mathrm D}=B(1-Dh)\) is the duration-only price. Both use **starting** measures. The half term is dimensionless in the relative formula: years² times inverse-years². Multiply by \(B\) for currency. For positive \(C\), the correction is positive for either sign of nonzero \(h\), because \(h^2\ge0\). It reduces the predicted loss for a yield rise and increases the predicted gain for a fall. It does not make every second-order estimate exact or guarantee its accuracy for every large move.

One bp is 0.0001 annual decimal; 100 bp gives \(h=0.01\), so \(h^2=0.0001\), not 0.01 or 1. A −100 bp move has the same square but reverses the duration term.

Source: [second-order approximation, L 3 p 38](../../sources/annotated/lecture-3/page-038.md#lecture-3-p038-convexity-approximation).

<a id="source-value"></a>
## 4. Recover the source convexity from the complete schedule

The source continues the three-year, 10% annual coupon bond with semiannual payments and 12% annual continuous yield. On its 100-face scale, coupons are \(100(0.10)/2=5\); the final receipt is 105, including principal once. USD is our explicit teaching currency label for the otherwise unlabelled source amounts. Valuation has six complete half-years remaining; no payment at time zero is added.

Compute \(V_i=C_i e^{-0.12t_i}\), then \(t_i^2V_i\). The following **authored expansion**, not an additional source table, exposes every row needed for the printed convexity. Values are rounded to twelve decimals; calculation retains full precision.

| Time, years | Receipt, USD | PV, USD | Squared-time PV, USD·years² | Contribution \(t_i^2w_i\), years² |
|---:|---:|---:|---:|---:|
| 0.5 | 5 | 4.708822667921 | 1.177205666980 | 0.012495148336 |
| 1.0 | 5 | 4.434602183586 | 4.434602183586 | 0.047069950178 |
| 1.5 | 5 | 4.176351057056 | 9.396789878377 | 0.099739821768 |
| 2.0 | 5 | 3.933139305333 | 15.732557221331 | 0.166989203071 |
| 2.5 | 5 | 3.704091103409 | 23.150569396304 | 0.245725795224 |
| 3.0 | 105 | 73.256014237458 | 659.304128137124 | 6.998014969214 |
| Total | 130 | 94.213020554763 | 713.195852483702 | 7.570034887791 |

Work the first row: \(e^{-0.12(0.5)}=e^{-0.06}\); multiply by 5 for PV 4.708822667921… USD. Square the time: \(0.5^2=0.25\); multiply by PV for 1.177205666980… USD·years². Divide by total price 94.213020554763… for 0.012495148336… years². The last row uses \(3^2=9\), not 3, so its numerator contribution is 659.304128137124….

Write \(M=\sum_i t_i^2V_i=B''\) for the currency curvature numerator and \(N=\sum_i t_iV_i=-B'\) for the earlier first-order numerator. Then

\[
B\approx94.213020554763,\quad N\approx249.948089184693,\quad
M\approx713.195852483702,
\]
\[
D=N/B\approx2.653010037391\text{ years},\quad
C=M/B\approx7.570034887791\text{ years}^2.
\]

This yields the source's **\(C=7.570\)** when rounded to three decimals. Check that it lies between \(0.5^2=0.25\) and \(3^2=9\), and that its units are years² rather than years. Do not add rounded row values to redefine the unrounded total.

Source: [example convexity value, L 3 p 38](../../sources/annotated/lecture-3/page-038.md#lecture-3-p038-convexity-example-value). The full schedule and prior price/duration working are in [duration application](lesson-l3-duration-application.md#full-weights).

<a id="source-correction"></a>
## 5. Preserve and check the source +100 bp calculation

The source sets \(h=0.01\), using its rounded \(B=94.213\), \(D=2.653\), \(C=7.570\):

\[
-Dh=-2.653(0.01)=-0.02653,
\qquad \tfrac12 Ch^2=\tfrac12(7.570)(0.01)^2=0.0003785.
\]

These are relative fractions: −2.653% from duration plus +0.03785% from curvature. Net relative estimate is −0.0261515 = −2.61515%. The source displays

\[
94.213[1-0.02653+0.0003785]=91.749.
\]

**Rounding qualification:** the left-hand arithmetic is 91.7491887305, which rounds to 91.749. The printed equals sign is not literal equality to an exact three-decimal value. It is not an error in the model derivation. Preserve the printed display, but use an approximation sign when reporting its numerical meaning.

Source: [duration-convexity example, L 3 p 39](../../sources/annotated/lecture-3/page-039.md#lecture-3-p039-duration-convexity-example).

<a id="comparison"></a>
### Compare with actual model repricing, not merely matching rounded displays

With unrounded inputs, duration alone gives 91.713539662916… USD. The dollar curvature correction is

\[
\tfrac12 Mh^2=\tfrac12(713.195852483702\ldots)(0.01)^2
\approx0.035659792624\text{ USD}.
\]

Add it to obtain \(B_{\mathrm{DC}}\approx91.749199455540\) USD. Independently reprice the six original cash flows at \(0.12+0.01=0.13\):

\[
B(0.13)=5e^{-0.13(0.5)}+5e^{-0.13(1)}+5e^{-0.13(1.5)}
+5e^{-0.13(2)}+5e^{-0.13(2.5)}+105e^{-0.13(3)}
\approx91.748854281305\text{ USD}.
\]

Define signed error as **exact model price minus estimate**. Duration-only error is +0.035314618389… USD; duration-plus-convexity error is −0.000345174235… USD. The second-order estimate is slightly **above** the exact price here; its absolute error is much smaller but not zero. Source displays are exact price approximately 91.749, corrected estimate 91.749 and duration-only 91.714. At cents, corrected and exact are both USD 91.75, versus duration-only USD 91.71.

Source: [rounded comparison and interpretation, L 3 p 39](../../sources/annotated/lecture-3/page-039.md#lecture-3-p039-duration-convexity-comparison). “Exact” means evaluating this model, not knowing a future traded price.

<a id="shock-table"></a>
### Supplemental comparison across small, larger and negative moves

The following rows extend the source's single +100 bp comparison. All use the same starting \(B,N,M\): first order \(B-Nh\), second order \(B-Nh+Mh^2/2\), exact \(\sum_i C_i e^{-(0.12+h)t_i}\). Currency is USD; shown values are rounded.

| Shock | New yield | Duration price | Duration + convexity price | Exact price | Exact minus second order |
|---|---:|---:|---:|---:|---:|
| +10 bp | 12.1% | 93.963072465578 | 93.963429063505 | 93.963428716033 | −0.000000347472 |
| +100 bp | 13.0% | 91.713539662916 | 91.749199455540 | 91.748854281305 | −0.000345174235 |
| +200 bp | 14.0% | 89.214058771069 | 89.356697941566 | 89.353956742828 | −0.002741198738 |
| −100 bp | 11.0% | 96.712501446610 | 96.748161239234 | 96.748511552979 | +0.000350313745 |

For +200 bp, the correction is 0.142639170497… USD, four times the +100 bp correction because the squared move is four times as large; the **error** need not scale exactly by four. For −100 bp, the duration gain reverses sign but the +0.035659792624… correction remains positive. These tested moves improve substantially over the tangent, but increasing accuracy for these examples is not a general guarantee for arbitrary finite shocks or another pricing model.

**Accessible visual description (authored):** plot annual continuous yield horizontally, price vertically. At 12%, the exact curve, tangent and quadratic share the price; tangent/quadratic share its slope, and the quadratic also matches its curvature. The tangent lies below the fixed-positive-payment curve. The quadratic is above the exact curve for the positive moves shown, below it for the negative move shown. A single local parabola is not the full exponential curve. The source pp 38–39 contain formulas/comparison text, not a plotted graph; the table provides numerical points for this description.

<a id="immunisation"></a>
## 6. What matching assets and liabilities can protect

The source says duration matching can reduce sensitivity to **small parallel yield-curve shifts**, and convexity improves protection against larger parallel shifts. This is a risk-reduction idea, not a guarantee that matching one number removes all risks. Here is a **supplemental derivation** that makes the necessary scale and shift assumptions explicit.

An **asset** supplies receipts; a **liability** requires payments. Let \(A(y)>0\) be the present value of asset receipts and \(L(y)>0\) the present value of liability payment magnitudes. Both are in the same currency, discounted in a common specified rate-shift model. Net value, or surplus, is \(S=A-L\). Let \(D_A,D_L\) and \(C_A,C_L\) be the two sides' normalised sensitivities under that same variable. Subtract their changes:

\[
\Delta S\approx(-AD_A+LD_L)h+\tfrac12(AC_A-LC_L)h^2.
\]

This follows from \(\Delta A\approx-AD_Ah+AC_Ah^2/2\), with the analogous liability change **subtracted**, not added. First-order cancellation requires **dollar-duration matching** \(AD_A=LD_L\). If present values are equal, \(A=L\), matching \(D_A=D_L\) achieves that cancellation. Equal durations alone do not cancel currency exposure when the amounts differ. Matching \(AC_A=LC_L\) also cancels the second-order coefficient under the same model; it still does not match all higher-order or nonparallel effects.

A parallel curve shift means adding the same continuous annual decimal \(h\) to every maturity's zero rate. For a fixed curve, each original PV becomes \(V_i e^{-ht_i}\), so the same derivative reasoning applies to those original curve PVs. Do not confuse this with giving unrelated bonds equal YTM shifts when the intended risk is a different curve movement. We do not divide by \(S\): the surplus can be zero even though both sides have positive values.

Source: [immunisation benefit, L 3 p 40](../../sources/annotated/lecture-3/page-040.md#lecture-3-p040-immunisation-benefit). Convexity adds a dimension to matching/diagnosis; it does not automatically improve every hedge merely because someone buys a “high convexity” asset.

<a id="matching-example"></a>
### Supplemental complete matching example and counterexample

At a **flat zero continuous curve**, assets pay USD 50 at year 1 and USD 50 at year 3. A liability requires USD 100 at year 2. All factors are one. The sides therefore have:

| Quantity | Assets | Liability |
|---|---:|---:|
| PV, USD | 100 | 100 |
| First time-weighted PV, USD·years | 200 | 200 |
| Duration, years | 2 | 2 |
| Squared-time PV, USD·years² | 500 | 400 |
| Convexity, years² | 5 | 4 |

For assets, 50×1 + 50×3 = 200 and 50×1² + 50×3² = 500; divide each by 100. For the single liability date, duration is 2 and convexity is 2² = 4. Starting surplus is zero and its first derivative is −200 + 200 = 0, but its second derivative is 500 − 400 = 100 USD·years². Thus

\[
\Delta S\approx\tfrac12(100)h^2=50h^2.
\]

For a parallel +100 bp move, \(h=0.01\), the second-order surplus estimate is USD 0.005. Repricing, without rounding intermediate amounts:

\[
A=50e^{-0.01}+50e^{-0.03}\approx98.024768364884,
\quad L=100e^{-0.02}\approx98.019867330676,
\]

so surplus is approximately USD 0.004901034208, not exactly zero or exactly 0.005. With a parallel −100 bp move, assets are approximately 102.025235051884, liability 102.020134002676 and surplus 0.005101049209 USD, versus the same second-order 0.005 estimate. These sub-cent differences must not be erased by rounding each large side to cents before subtraction.

**Nonparallel counterexample:** leave year-1 and year-2 zeros at zero but raise only the year-3 zero to 1% continuous. Assets become \(50+50e^{-0.03}\); liability stays 100. Surplus is approximately **−USD 1.477723322575**, despite the original equal PVs and durations. Its negative sign directly disproves “matched duration removes every rate risk.”

<a id="limitations"></a>
## 7. Source limitations, with meanings made explicit

- **Measures move:** duration/convexity change as yields move and dates approach. Payments leave the schedule as they occur. Maintaining a chosen match may require rebalancing—changing holdings—with possible costs; a one-time match does not remain exact automatically.
- **Nonparallel changes:** short and long maturities may move differently, as the counterexample demonstrates. Matching one slope and one curvature for a parallel variable does not match sensitivity at every date.
- **Credit/default risk and spreads:** promised payments may not arrive in full; an issuer-related yield component can change differently from the curve used for the hedge. Fixed promised-cash-flow calculus is not a model of every such event.
- **Liquidity:** positions may be costly or difficult to buy/sell when adjustment is needed. The formulas do not guarantee executable prices or funding.
- **Optionality:** a contractual option, such as an issuer's right to repay early, can change payment dates/amounts when rates move. Do not transfer the fixed-positive-flow convexity sign to every callable bond or option-dependent asset.
- **Model risk:** incorrect curve conventions, cash-flow assumptions or shock patterns can make a precisely calculated match irrelevant. A finite second-order truncation also leaves higher-order error, especially for large moves.

Source: [immunisation limitations, L 3 p 40](../../sources/annotated/lecture-3/page-040.md#lecture-3-p040-immunisation-limitations). The expanded definitions and counterexample are authored teaching, not additional source promises.

<a id="risk-caution"></a>
**The source's risk-management lesson:** duration and convexity describe particular dimensions of interest-rate risk; they do not make a portfolio riskless. A local derivative result is neither a complete investment recommendation nor a guarantee of realised return. [Risk-management caution, L 3 p 40](../../sources/annotated/lecture-3/page-040.md#lecture-3-p040-risk-management-caution).

<a id="practice"></a>
## 8. Progressive supplemental practice

<a id="exercise-derive"></a>
### A. Derivation and units (outcome 1)
Derive the second derivative payment by payment; distinguish \(C_i\), \(C\) and \(BC\). Derive the half coefficient by matching a quadratic's derivatives. Explain the positive-convexity assumptions and the time-zero/zero-price cases.

<a id="exercise-source"></a>
### B. Source calculation audit (outcome 2)
Rebuild all six squared-time PV rows and their total. Compute source convexity, then reproduce the +100 bp source-rounded estimate and the full-precision duration/corrected/exact comparison. Explain why two displayed 91.749 prices do not prove equality.

<a id="exercise-shocks"></a>
### C. Transfer across shocks (outcomes 1 and 2)
Recompute all four rows of the supplemental shock table with one fixed starting expansion. Explain the sign of each curvature correction and signed error. Describe the graph without claiming the quadratic is the exact curve.

<a id="exercise-zero"></a>
### D. Zero-coupon boundary (outcomes 1 and 2)
A supplemental zero pays USD 100 in two years and starts at zero continuous yield. Find price, both derivatives, duration and convexity. Estimate its price at +100 bp to first and second order, then reprice exactly and compare.

<a id="exercise-match"></a>
### E. Matching and failure (outcome 2)
Rebuild the asset/liability table and derive the surplus expansion. Check both parallel moves and the nonparallel counterexample. Would equal durations suffice if asset PV were twice liability PV but both durations stayed two years?

<a id="exercise-teachback"></a>
### F. Teach-back and limitations (outcomes 1 and 2)
Explain the source benefit without saying “all risk disappears.” Include PV scale, the chosen curve shift, squared units, finite-move error, rebalancing, nonparallel movements, credit/default/spreads, liquidity, optionality and model risk.

<a id="answers"></a>
## 9. Separate supplemental answers

<a id="answer-derive"></a>
### Answer A
The first term slope is \(-t_iC_i e^{-yt_i}\). Its fixed multiplier times the exponential derivative gives \(t_i^2C_i e^{-yt_i}\); summing gives \(B''\). Divide by positive price to obtain \(C=\sum_i t_i^2w_i\), in years²; \(C_i\) is currency receipt and \(BC=B''\) is currency·years². A quadratic's second derivative is twice its squared-term coefficient, so matching curvature forces \(B''/2\). Nonnegative fixed receipts with a positive future receipt give positive curvature; optional/signed flows cannot inherit that claim. An immediate receipt contributes zero, while zero total price forbids normalisation.

<a id="answer-source"></a>
### Answer B
Squared-time PV rows are approximately 1.177205666980, 4.434602183586, 9.396789878377, 15.732557221331, 23.150569396304 and 659.304128137124 USD·years². Their unrounded total is 713.195852483702…; divide by 94.213020554763… to get 7.570034887791… years², source display 7.570. The rounded-input correction fraction is 0.0003785 and total relative change −0.0261515; multiplying by 94.213 gives 91.7491887305. Full-precision duration price is 91.713539662916, corrected 91.749199455540 and exact 91.748854281305 USD. Signed errors are +0.035314618389 and −0.000345174235 USD. Equal three-decimal displays hide a nonzero second-order error; intermediate rounding is a separate issue.

<a id="answer-shocks"></a>
### Answer C
For +10, +100, +200 and −100 bp, decimal moves are 0.001, 0.01, 0.02 and −0.01. Curvature dollar corrections are approximately 0.000356597926, 0.035659792624, 0.142639170497 and 0.035659792624. Adding them to the duration prices gives 93.963429063505, 91.749199455540, 89.356697941566 and 96.748161239234 USD. Exact prices are 93.963428716033, 91.748854281305, 89.353956742828 and 96.748511552979. Exact-minus-corrected errors are −0.000000347472, −0.000345174235, −0.002741198738 and +0.000350313745 USD. The square keeps the correction positive for both directions; residual error need not keep the same sign. The tangent is below the fixed-positive-flow curve, but the local quadratic is not the full curve or a universal error bound.

<a id="answer-zero"></a>
### Answer D
At zero yield, price is USD 100; first derivative −200 USD·years; second derivative 400 USD·years². The sole weight is one, so duration is two years and convexity four years². At \(h=0.01\), first-order price is \(100-200(0.01)=98\) USD. The second-order correction is \(400(0.01)^2/2=0.02\), giving USD 98.02. Exact price \(100e^{-0.02}\approx98.019867330676\) is slightly below the quadratic, with signed error approximately −0.000132669324 USD; it is not exactly the second-order estimate.

<a id="answer-match"></a>
### Answer E
Asset/liability PVs are 100/100 USD, duration numerators 200/200 USD·years, durations 2/2 years, curvature numerators 500/400 USD·years² and convexities 5/4 years². Subtracting liabilities leaves zero starting surplus and zero slope, but curvature 100, so \(\Delta S\approx50h^2\). Both ±100 bp estimates are USD 0.005; exact surpluses are approximately +0.004901034208 and +0.005101049209. Raising only the three-year zero instead gives −1.477723322575 USD, so the original match does not immunise a nonparallel shift. If asset PV doubles to 200 while liability PV stays 100 and both durations remain two, surplus slope is −400+200=−200 USD·years, not zero. Match dollar sensitivity, not duration numbers alone; do not divide by the initial zero surplus.

<a id="answer-teachback"></a>
### Answer F
Duration matching at matched PV scale cancels the leading small parallel-shift exposure under the same convention. Curvature matching can cancel the next coefficient; convexity-aware analysis can improve a finite-shift approximation without eliminating all errors. Years² cancel the squared annual-decimal move, and dollar correction also needs price and one half. Measures change as time and yields move, so rebalancing may be needed and costly. Nonparallel shifts, changing credit spreads/default outcomes, illiquidity, options that change cash flows and wrong model assumptions remain. The source promises risk reduction in particular dimensions, not a riskless portfolio or guaranteed investment performance.

<a id="source-map"></a>
## Exact primary unit-to-teaching and practice map

| Unit | Teaching | Outcomes | Practice / answer |
|---|---|---|---|
| lecture-3-p038-convexity-approximation | [Half coefficient](#half-coefficient) | 1 | [A](#exercise-derive) / [answer](#answer-derive) |
| lecture-3-p038-convexity-definition | [Definition and derivative](#convexity) | 1 | [A](#exercise-derive), [D](#exercise-zero) / [A](#answer-derive), [D](#answer-zero) |
| lecture-3-p038-convexity-example-value | [All rows](#source-value) | 2 | [B](#exercise-source) / [answer](#answer-source) |
| lecture-3-p039-duration-convexity-comparison | [Comparison](#comparison) | 1, 2 | [B](#exercise-source), [C](#exercise-shocks) / [B](#answer-source), [C](#answer-shocks) |
| lecture-3-p039-duration-convexity-example | [Printed working](#source-correction) | 2 | [B](#exercise-source) / [answer](#answer-source) |
| lecture-3-p040-immunisation-benefit | [Matching derivation](#immunisation) | 1, 2 | [E](#exercise-match), [F](#exercise-teachback) / [E](#answer-match), [F](#answer-teachback) |
| lecture-3-p040-immunisation-limitations | [Limitations](#limitations) | 1, 2 | [E](#exercise-match), [F](#exercise-teachback) / [E](#answer-match), [F](#answer-teachback) |
| lecture-3-p040-risk-management-caution | [Caution](#risk-caution) | 1, 2 | [F](#exercise-teachback) / [answer](#answer-teachback) |

These are author-proposed mappings, not approved teaching coverage. Next: [rates synthesis](lesson-l3-rates-synthesis.md).
