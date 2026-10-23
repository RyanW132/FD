# Connect discounting, yields, forwards and sensitivity

> **Production-curriculum draft — independent teaching review pending.** All eight recap units on Lecture 3 physical p 41 are taught here, not merely linked backward. The integrated dataset, calculations, exercises and answers are **supplemental authored teaching**, not additional source questions or observed market quotations. Historical source mistakes remain labelled; no canonical coverage is promoted.

<a id="outcomes"></a>
## What you will be able to do

1. **Choose and connect the right rate object:** explain all eight recap relationships by identifying dated cash flows, matching compounding/time conventions, and distinguishing zero rates, coupon rates, a single YTM, par coupon rates, implied forwards, future observed reference rates and local sensitivities.
2. **Complete and audit an integrated valuation:** bootstrap a small curve from explicit instruments, convert equivalent quotes, price/check a bond and par coupon, infer a forward, calculate a direction-specific FRA and combined borrowing exposure, then compare sensitivity approximations with repricing. Show intermediate factors and substitutions, preserve source-error cautions and reject invalid domain/model assumptions.

Prerequisite: [convexity and immunisation](lesson-l3-convexity-and-immunisation.md). The [numeric](../concepts/concept-numeric-foundations.md#numeric-outcomes), [exponents/logs](../concepts/concept-exponents-and-logs.md#powers-outcomes), [local-derivatives](../concepts/concept-local-derivatives.md#derivatives-approximations) and [rate-convention](../concepts/concept-rate-conventions.md#rates-quote) bridges support the working. Planned standalone zero-factor, forward/FRA and duration/convexity concepts remain missing; this lesson supplies sufficient inline foundations. No future lecture is required.

<a id="dated-cashflows"></a>
## 1. Start with the unifying idea: amounts, signs and dates

A cash flow is an amount received or paid **at a specified date**. Use positive for receipts and negative for payments from the chosen person's viewpoint. Do not subtract cash flows at different dates as though they were simultaneous. A discount factor converts a dated amount to a common valuation date; multiplying by a growth factor moves it forward under a stated convention.

The source's unifying instruction is to represent instruments as dated cash flows, discount consistently, then ask how value changes when rates change. It is a reasoning order, not a suggestion to apply the same percentage indiscriminately to everything. Ask:

1. Whose side, which currency, which dates and which complete cash amounts?
2. What rate object and compounding/day-count convention belong to this question?
3. Which quantities are given and which are unknown? What stays fixed?
4. Do factors have valid positive domains, and do units cancel?
5. Can the answer reproduce the original price/cash flows by substitution?

Source: [unifying dated-cash-flow idea, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-unifying).

<a id="dataset"></a>
### Supplemental integrated classroom dataset

Today is time 0; times 1 and 2 mean exactly one and two years from today. All amounts are USD. Prices below are exact synthetic inputs, given as fractions so displayed decimals are not silently treated as exact. Assume fixed promised receipts, no default/options/fees/taxes, matched currency/time basis and consistent borrowing/lending conventions for the replication arguments. These simplifications are not claims about live markets.

| Instrument | Today's price, USD | Receipt at year 1, USD | Receipt at year 2, USD |
|---|---:|---:|---:|
| Z: one-year zero, face 100 | \(2500/26\approx96.153846153846\) | 100 | 0 |
| B: two-year annual-coupon bond, face 100, coupon 5% annually | \(68875/676\approx101.886094674556\) | 5 | 105 |

A **zero-coupon** instrument has only the stated maturity receipt. A **coupon** is periodic interest: annual 5% on face 100 means USD 5 each year; the final 105 includes that year's coupon plus principal once. Face is the contractual principal, not the market price. Annual payment frequency here is one; no fractional coupon/stub dates are invented.

Notation used throughout:

| Symbol | Meaning and units |
|---|---|
| \(P_1,P_2\) | Today's discount factors for years 1 and 2, dimensionless and positive |
| \(R_1,R_2\) | Annual continuous zero rates for those maturities, decimal per year |
| \(B\) | Today's price of the coupon bond, USD |
| \(q\) | Nominal annual coupon rate, decimal; one annual coupon here |
| \(y\) | Single annual continuous bond yield, decimal per year |
| \(r\), \(R_m\) | Continuous annual rate and equivalent nominal annual rate compounded \(m\) times yearly |
| \(m\) | Positive integer frequency, periods per year; period rate \(R_m/m\) |
| \(T,t_i\) | Elapsed years; \(t_i\) labels each fixed payment time |
| \(f\) | Implied continuous annual forward rate for years 1 to 2 |
| \(\alpha\) | FRA accrual fraction in years, here exactly 1 |
| \(L,K,M\) | FRA notional in USD, fixed annual simple rate and future observed annual simple reference rate |
| \(h=\Delta y\) | Signed continuous-yield shock, annual decimal; bp/10000 |
| \(D,C\) | Starting duration in years and convexity in years² |

Context disambiguates \(R_2\) as the **two-year zero** in curve work versus a nominal semiannual quote written explicitly \(R_{m=2}\) in conversions below. This notation warning prevents a maturity subscript from becoming a compounding-frequency subscript by accident.

<a id="compounding"></a>
## 2. Recap compounding: same number is not necessarily same growth

Let FV mean future value and PV present value in the same currency, with constant rates and no intervening cash flows in the growth calculation. For principal \(A>0\), a nominal annual decimal quote \(R_m\) gives periodic return \(R_m/m\). Repeated multiplication over \(mT\) complete periods gives

\[
FV=A(1+R_m/m)^{mT},\qquad PV=FV(1+R_m/m)^{-mT}.
\]

Require \(1+R_m/m>0\). Whole \(mT\) counts actual periods; fractional powers require a specifically chosen partial-period convention. Continuous annual rate \(r\) instead gives

\[
FV=Ae^{rT},\qquad PV=FVe^{-rT}.
\]

The exponent is rate times years, dimensionless; the negative sign reverses the growth. For one year, equate factors and take the natural logarithm, which reverses the exponential on positive inputs:

\[
e^r=(1+R_m/m)^m,quad r=m\ln(1+R_m/m),\quad
R_m=m(e^{r/m}-1).
\]

Effective annual gain is the one-year factor **minus one**, \(e^r-1\), not generally the nominal quote. Equal quotes in different conventions need not be equivalent; equal accumulation factors are the test.

**Integrated case, to be verified by the bootstrap below:** the resulting one-year growth factor is 1.04. Its effective annual rate is 4%, equal to the annual discrete quote when frequency is one. The continuous rate is

\[
r=\ln(1.04)\approx0.039220713153=3.922071315328\%\text{ annually continuous}.
\]

An equivalent nominal semiannual quote is

\[
R_{m=2}=2(e^{r/2}-1)\approx0.039607805437
=3.960780543711\%.
\]

The half-year return is approximately 0.019803902719. Two factors of \(1+R_{m=2}/2\) multiply to 1.04, and four multiply to \(1.04^2=1.0816\). Therefore USD 100 over two years becomes USD 108.16 under either equivalent convention. Reusing 4% as the continuous quote would be a different factor, not a harmless relabelling.

Source: [quotation conventions recap, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-compounding).

<a id="source-error"></a>
### Keep the earlier printed error visible

The earlier source p 11 growth problem is USD 5,000 to USD 5,800 in 18 months. The original printed **10.15% continuous** and **10.41% nominal semiannual** are wrong for those inputs. They must not be revived as correct merely because this is a recap. Using months/12 gives \(T=1.5\) years and positive ratio 1.16. The labelled authored correction is

\[
r=\ln(1.16)/1.5\approx0.098946670079,
\quad R_{m=2}=2(e^{r/2}-1)\approx0.101435148997,
\]

with distinct effective annual rate \(e^r-1\approx0.104007421360\). These mean approximately **9.894667% continuous**, **10.143515% nominal semiannual** and **10.400742% effective annual**. Check with unrounded rates: \(5000e^{1.5r}=5000(1+R_{m=2}/2)^3=5800\). Three half-years, not eighteen years, are involved.

The full original-error evidence and separate correction are preserved in [the earlier rate lesson](lesson-l3-continuous-and-equivalent-rates.md#printed-continuous) and [rate-convention cautions](../concepts/concept-rate-conventions.md#rates-cautions); their canonical issues remain open. This recap does not edit the source or close its review issue.

<a id="zeros"></a>
## 3. Recap zero rates: one maturity, one factor

A zero rate describes accumulation to one maturity under a stated convention. With continuous annual \(R_T\) and \(T>0\), discount factor is \(P_T=e^{-R_TT}\); hence

\[
PV=FV\,P_T,\qquad R_T=-\frac{\ln(P_T)}{T}.
\]

This inversion comes from taking ln of the positive factor. A zero **rate** is not a zero **factor**: at rate zero, the factor is one. A negative rate can give a factor above one, which is mathematically valid. Nonpositive factors cannot enter this real logarithm, and time zero cannot identify a unique rate by division. At time zero the accumulation factor is simply one.

For instrument Z, \(100P_1=2500/26\), so

\[
P_1=25/26\approx0.961538461538,
\quad R_1=-\ln(P_1)\approx0.039220713153.
\]

Once bootstrapped below, \(P_2=625/676\approx0.924556213018\), so \(R_2=-\ln(P_2)/2=\ln(1.04)\). This example was constructed to give a **flat** curve; in general the maturity-specific rates differ. Do not infer flatness from the definition of a zero rate.

Source: [zero-rate discounting recap, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-zero).

<a id="bootstrap"></a>
## 4. Recap bootstrapping: remove the known earlier PV first

A coupon-bond price is the sum of all dated PVs. Here

\[
B=5P_1+105P_2.
\]

The first factor is known from Z. Subtract the early coupon PV from price, then divide by the **entire final receipt**, including final coupon and principal:

\[
P_2=\frac{B-5P_1}{105}.
\]

Numerically, \(5P_1\approx4.807692307692\) USD. Remaining price is \(101.886094674556\ldots-4.807692307692\ldots\approx97.078402366864\) USD. Divide by 105 to obtain 0.924556213018…, exactly 625/676. Substitute back: \(5(25/26)+105(625/676)=68875/676\), the given price. This is a sequential equation solution, not an average of rate percentages.

The general step has known earlier receipts \(a_j\), known factors \(P_j\), price \(V\) and positive final receipt \(a_n\):

\[
P_n=\frac{V-\sum_{j<n}a_jP_j}{a_n}.
\]

Require a nonzero positive final receipt and positive remaining PV to obtain a positive factor in this fixed-positive-payment setup. A negative remainder is not repaired by taking a logarithm of its absolute value. Missing earlier factors, mixed credit/liquidity assumptions or unspecified coupon/stub schedules mean the next equation is not automatically determined. Interpolation between quoted dates requires a stated model; these two prices alone do not uniquely determine every intermediate maturity. Negative rates permit factors above one; do not impose monotonic factor bounds without appropriate assumptions.

Source: [bootstrap recap, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-bootstrap). This synthetic annual schedule has no ambiguity; the previously discussed seminar annual-versus-semiannual conflict must not be silently imported as if resolved for every bond.

<a id="yields"></a>
## 5. Recap coupon, YTM and par: three different questions

**Coupon rate** determines the promised cash amounts: this bond has \(q=0.05\), so pays USD 5 each year. **Yield to maturity (YTM)** is one quoted discount rate that reproduces the bond's given price from those promised payments. Under the continuous convention it solves

\[
5e^{-y}+105e^{-2y}=B.
\]

Our flat factors reveal a candidate \(y=\ln(1.04)\). Substituting gives exactly \(5/1.04+105/(1.04)^2=B\). The price function is strictly decreasing because its derivative is \(-5e^{-y}-210e^{-2y}<0\), so this candidate is unique. As a numerical bracket check, at \(y=0.03\) price is approximately 103.737503694089, above the target; at \(y=0.04\) it is 101.731163566358, below. In a less convenient case, repeatedly bisect such a bracket and retain the side containing the target; stop only at a stated residual/price tolerance. Do not guess the YTM by averaging zero rates. The flat-curve equality here is a property of this constructed example, not the general definition of YTM.

**Par** means price equals face, here USD 100. **Par yield/coupon rate** means the coupon rate that would make this schedule worth face at the given discount factors. Call that annual coupon rate \(q_{\rm par}\). Because annual coupons are \(100q_{\rm par}\), the par equation is

\[
100=100q_{\rm par}(P_1+P_2)+100P_2.
\]

Divide by 100, subtract \(P_2\), then divide by the positive sum of factors:

\[
q_{\rm par}=\frac{1-P_2}{P_1+P_2}=0.04=4\%.
\]

It is a weighted-discount-factor result, not an arithmetic average. The actual coupon is 5%, above this matched annual par coupon, so actual price 101.886094674556… is above face. With one annual payment, 4% annual-discrete yield corresponds to continuous \(\ln(1.04)\), not 4% continuous. The earlier p 16 “coupon equals yield ⇒ par” statement requires matched payment/compounding conventions. For regular \(m\) payments yearly and a flat continuous yield \(y\), the matched nominal coupon is \(m(e^{y/m}-1)\): this is just converting the yield into the payment-period convention before comparison, not treating equal printed numbers as equivalent. Our annual case has \(m=1\), so \(e^y-1=0.04\).

YTM is an internal model rate on promised payments, not an automatic realised return. Actual payment/default, holding horizon, reinvestment and sale-price assumptions matter; a single number does not eliminate them.

Source: [bond-yield/par distinction recap, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-yields). The preserved earlier convention caution is in [rate conventions](../concepts/concept-rate-conventions.md#rates-cautions).

<a id="forwards"></a>
## 6. Recap forwards: a dated ratio, not a forecast

To lock growth between future dates 1 and 2, compare today's costs of unit receipts at those dates. A receipt of one unit at year 1 costs \(P_1\); a receipt of \(G\) units at year 2 costs \(GP_2\). Matching costs for a locked exchange gives \(P_1=GP_2\), hence growth factor \(G=P_1/P_2\). The reverse discount factor is \(P_2/P_1\), not the same ratio.

For elapsed interval \(\delta=T_2-T_1>0\), define a continuous annual forward \(f\) by \(e^{f\delta}=G\). Then

\[
f=\frac{\ln(P_1/P_2)}{\delta}
=\frac{R_2T_2-R_1T_1}{T_2-T_1}.
\]

The second form substitutes \(P_i=e^{-R_iT_i}\); it is not simply \(R_2-R_1\). Positive factors and ordered dates are required. Equal dates give no interval rate to identify.

In our case, \(\delta=1\), \(G=(25/26)/(625/676)=1.04\), and \(f=\ln(1.04)\approx0.039220713153\). The annual simple forward for accrual fraction \(\alpha=1\) is \(K=(G-1)/\alpha=0.04\). A continuous quote and a simple period quote differ numerically while describing the same specified growth.

**Check terminal cash flows:** USD 100 invested for two years accumulates to \(100/P_2=108.16\). Alternatively USD 100 becomes \(100/P_1=104\) at year 1, then a locked 1.04 factor makes 108.16 at year 2. That is the no-arbitrage consistency argument under the stated replication assumptions. If the second stage is not locked and the future simple reference rate is instead 5%, the result would be \(104(1.05)=109.20\); it is a different unhedged strategy. Today's implied forward is **not a guaranteed forecast** of that future observed rate.

Source: [forward-rate recap, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-forward).

<a id="fra"></a>
## 7. Recap FRA: fix a future period's simple reference exposure

A forward rate agreement (FRA) settles an interest difference on a **notional** amount, rather than exchanging the loan principal itself. Specify direction directly: our hypothetical borrower **pays fixed and receives floating**. This is the opposite side of a receive-fixed/pay-floating FRA; ambiguous “long” wording is unnecessary.

Take \(L=1000\) USD, period from year 1 to year 2, \(\alpha=1\) year, fixed annual simple \(K=0.04\), and future observed annual simple reference \(M=0.05\). No rate observation is being forecast: 5% is a supplemental realised-scenario input. Both simple rates use the same contractual accrual basis. End-period interest amounts are \(LK\alpha=40\) and \(LM\alpha=50\) USD. Receive floating minus pay fixed gives the terminal-equivalent gain

\[
Q=L(M-K)\alpha=1000(0.05-0.04)(1)=10\text{ USD}.
\]

If the contract settles at the **start of the underlying period**, year 1, discount the **whole difference** using that period's specified simple growth denominator:

\[
S=\frac{L(M-K)\alpha}{1+M\alpha}=\frac{10}{1.05}
\approx9.523809523810\text{ USD}.
\]

Require \(1+M\alpha>0\). This is not discounting to today, not dividing only one interest leg, and not an exponential denominator merely because the zero curve was quoted continuously. The receive-fixed counterparty gets the exact opposite signs. Only one settlement is actually paid according to the contract; the terminal and start numbers are equivalent descriptions at different dates.

**Combined borrower timeline:** separately borrow USD 1000 at year 1 and owe USD 1050 at year 2 under the floating reference scenario. Invest/fund the received year-1 FRA settlement at that same matched simple rate: \(S(1.05)=10\) at year 2. Net outflow is \(1050-10=1040\), so interest cost is USD 40, the fixed 4% of notional for one year. Algebraically,

\[
LM\alpha-S(1+M\alpha)=LK\alpha.
\]

This effective fixing requires matched notional, currency, index/accrual, timing and settlement financing. Changing borrower spreads, default, fees or basis mismatches are not hedged by the bare identity. A lender wanting fixed receipts instead receives fixed/pays floating. Zero rate differences give zero settlement; negative simple rates can be valid while the denominator remains positive; zero denominator is invalid. A zero-length period has no interest difference and cannot supply an identifiable interval forward quote.

Source: [FRA recap, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-fra).

<a id="sensitivity"></a>
## 8. Recap sensitivity: a controlled same-date rate experiment

Now return to the coupon bond, holding its two receipts and dates fixed. Change its common annual continuous yield by \(h\); do not change its coupon or advance time. From the exponential derivative, each slope is \(-t_iC_i e^{-yt_i}\), and differentiating again gives \(t_i^2C_i e^{-yt_i}\). Therefore

\[
D=\frac{\sum_i t_iV_i}{B},\quad C=\frac{\sum_i t_i^2V_i}{B},\quad
\frac{\Delta B}{B}\approx-Dh+\tfrac12 Ch^2.
\]

The first term is the tangent; the second adds curvature. The half is required because a quadratic's second derivative is twice its squared-term coefficient. Multiply the relative change by starting price for currency, and distinguish it from a complete repricing.

Our case gives the following **supplemental full table** at \(y=\ln(1.04)\):

| Time, years | Receipt, USD | PV, USD | \(t_iV_i\), USD·years | \(t_i^2V_i\), USD·years² |
|---:|---:|---:|---:|---:|
| 1 | 5 | 4.807692307692 | 4.807692307692 | 4.807692307692 |
| 2 | 105 | 97.078402366864 | 194.156804733728 | 388.313609467456 |
| Total | 110 | 101.886094674556 | 198.964497041420 | 393.121301775148 |

Dividing the last two totals by price gives \(D\approx1.952813067151\) years and \(C\approx3.858439201452\) years². The PV weights are approximately 0.047186932849 and 0.952813067151, summing to one before rounding. Duration lies between 1 and 2, convexity between 1 and 4, as positive-weight reasoning predicts.

For a +10 bp continuous-yield move, \(h=0.001\). First-order currency change is approximately −0.198964497041 USD; curvature correction is approximately +0.000196560651 USD. Thus

| Method | New price, USD (approximately) |
|---|---:|
| Duration only: \(B-BDh\) | 101.687130177515 |
| Duration + convexity: \(B-BDh+BCh^2/2\) | 101.687326738166 |
| Exact model: \(5e^{-(y+0.001)}+105e^{-2(y+0.001)}\) | 101.687326607991 |

Exact-minus-first error is about +0.000196430477 USD; exact-minus-second error about −0.000000130174 USD. All round to USD 101.69 at cents, which does **not** establish exact equality. The second-order relative estimate is approximately −0.001950883848, or −0.195088384755%. The calculation is at one valuation date, not a guaranteed holding return. Here the constructed curve is flat, so shifting every continuous zero by the same amount is consistent with this common-yield experiment. A nonparallel curve move or yield-dependent cash flows needs another analysis; positive convexity is not universal for option-dependent/signed positions.

Source: [duration/convexity recap, L 3 p 41](../../sources/annotated/lecture-3/page-041.md#lecture-3-p041-summary-sensitivity).

<a id="audit"></a>
## 9. Close the loop rather than memorise a formula list

The same two dated instruments supplied factors, which supplied zeros and a forward. Those factors priced each coupon/principal payment; a single yield reproduced the total price, and a par coupon answered a different question. The forward factor required conversion before entering a **simple** FRA settlement formula. Finally, holding the cash-flow schedule fixed allowed local differentiation and exact-shock comparison. This is the p 41 unifying idea applied, with every rate meaning kept attached to its dates and convention.

Boundary checklist: positive log inputs and discrete bases; no division by zero time/final cash flow/price; zero and negative rates are not automatically invalid; partial schedules require actual assumptions; no arithmetic averaging of rates as a substitute for equations; no forecast inferred from a replication identity; no universal riskless claim inferred from duration/convexity. The source-error corrections validate classroom arithmetic, not source-issue closure or independent teaching approval.

<a id="practice"></a>
## 10. Progressive supplemental practice

<a id="exercise-conventions"></a>
### A. Convention and error audit (outcome 1)
Explain all rate/time labels in the dataset. Reproduce the equivalent annual-effective, continuous and nominal semiannual quotes for growth factor 1.04, and the two-year USD 100 growth check. State the p 11 wrong printed rates and the corrected continuous/nominal/effective answers with their 18-month time basis.

<a id="exercise-bootstrap"></a>
### B. Factors and sequential pricing (outcomes 1 and 2)
Starting only from the two exact input prices, obtain both factors and continuous zeros. Show the known coupon PV, remaining PV, final denominator and substitution. Explain what fails with zero final receipt, nonpositive remainder, an unspecified stub schedule or a missing intermediate factor.

<a id="exercise-yields"></a>
### C. Three rates, three questions (outcomes 1 and 2)
State the coupon, solve/check the continuous YTM without averaging rates, and derive the par annual coupon. Explain the numerical bracket, above-par result and p 16 convention qualification. Is YTM a guaranteed realised return?

<a id="exercise-forward"></a>
### D. Dated replication (outcomes 1 and 2)
Derive growth/discount ratios, compute the year-1-to-2 continuous and simple forwards, and reproduce both locked terminal paths. Contrast the unhedged 5% scenario. Why is the implied forward not a forecast?

<a id="exercise-fra"></a>
### E. Contract direction and combined exposure (outcomes 1 and 2)
For the borrower, derive the terminal-equivalent and actual start-settlement amounts with signs, dates and denominator. Reverse the side for a lender seeking fixed receipts. Show the borrower's full net repayment and assumptions; explain why continuous discounting is not substituted into the source simple-settlement convention.

<a id="exercise-sensitivity"></a>
### F. Sensitivity audit (outcome 2)
Recompute every sensitivity-table cell, both measures, the +10 bp first-/second-order estimates and exact repricing. State signed errors and cents rounding. What stays fixed, and why do equal cents not prove an exact approximation?

<a id="exercise-teachback"></a>
### G. Eight-link teach-back (outcomes 1 and 2)
Use the integrated case to explain all eight recap units without merely naming earlier lessons. Include dated cash flows, compounding, zeros, coupon/YTM/par, bootstrap assumptions, forwards versus forecasts, FRA convention/direction and sensitivity limits. Give at least two invalid-input/model examples and explain how you would diagnose them.

<a id="answers"></a>
## 11. Separate supplemental answers

<a id="answer-conventions"></a>
### Answer A
The common one-year factor 1.04 gives 4% effective annual (and annual discrete), continuous \(\ln(1.04)\approx3.922071315328\%\), and nominal semiannual \(2(\sqrt{1.04}-1)\approx3.960780543711\%\). The half-year periodic rate is approximately 1.980390271856%; four half-year factors or two annual factors give 1.0816, so USD 100 becomes USD 108.16 after two years. Equal percentages are not the equivalence test. For p 11, T=18/12=1.5 years, ratio 1.16 and three half-years; printed 10.15% continuous/10.41% nominal are wrong. Correct approximately 9.894667%,10.143515% and 10.400742% denote continuous, nominal semiannual and effective annual rates respectively. Substitute unrounded corrected quotes to recover 5800 from 5000; preserve the original mistake separately.

<a id="answer-bootstrap"></a>
### Answer B
Divide the one-year zero price by 100: \(P_1=25/26\approx0.961538461538\). The earlier coupon PV is 4.807692307692… USD; subtract it from 101.886094674556… to leave 97.078402366864…, then divide by 105 to get \(P_2=625/676\approx0.924556213018\). Both continuous zeros are \(\ln(1.04)\approx0.039220713153\) per year because \(-\ln(P_2)/2\) divides by two years. Substitution reproduces the exact input fraction 68875/676. Zero final receipt prevents division; nonpositive remaining PV fails this positive-factor model; missing schedule/factor assumptions prevent a uniquely determined next step. Negative rates alone are not such a failure.

<a id="answer-yields"></a>
### Answer C
Coupon is 5% annual, determining 5 and 105 USD receipts. Continuous YTM is \(y=\ln(1.04)\approx3.922071315328\%\), verified by \(5e^{-y}+105e^{-2y}=B\); strictly negative slope makes this solution unique. At 3% and 4% continuous, prices 103.737503694089 and 101.731163566358 bracket the target. Par annual coupon is \((1-P_2)/(P_1+P_2)=4\%\), not the actual 5% coupon. Its matched continuous yield is about 3.922071%, not 4%; hence p 16's comparison needs compatible annualisation/compounding conventions. The higher actual coupon explains the above-face price under this matched schedule. No arithmetic average defines a general YTM, and promised-payment YTM does not guarantee realised return.

<a id="answer-forward"></a>
### Answer D
Equal present costs give \(P_1=GP_2\), hence \(G=P_1/P_2=1.04\); inverse discount ratio is \(P_2/P_1=1/1.04\). Over one year, \(f=\ln(G)\approx0.039220713153\), while the annual simple quote is \((G-1)/1=0.04\). Direct USD 100 grows to 108.16 in two years; locked staging gives 104 at year 1 then 108.16 at year 2. An unlocked 5% second-year reference instead gives 109.20, a different risk-bearing strategy. Replication matches dated terminal cash flows under stated assumptions; it does not determine the future observed rate.

<a id="answer-fra"></a>
### Answer E
The borrower pays fixed/receives floating, so terminal-equivalent gain is \(1000(0.05-0.04)(1)=+10\) USD at year 2. Actual start settlement is \(10/1.05\approx+9.523809523810\) USD at year 1, or USD 9.52 at cents. Its unrounded value grows to 10 under the same simple period rate. The separate floating loan repays 1050; offsetting the 10 gain leaves 1040, fixed interest 40. A lender receives fixed/pays floating, with FRA signs reversed in this scenario; lending interest 50 plus terminal FRA−10 also gives 40. The denominator is specified simple growth over the underlying period, not an exponential or today's discount factor. Match notional, dates, currency, reference/accrual and settlement funding; spreads/default/fees can leave residual exposure.

<a id="answer-sensitivity"></a>
### Answer F
PVs are 4.807692307692 and 97.078402366864 USD. First time-weighted PVs are 4.807692307692 and 194.156804733728; squared-time PVs 4.807692307692 and 388.313609467456. Totals are 101.886094674556 USD,198.964497041420 USD·years and 393.121301775148 USD·years². Thus duration is 1.952813067151 years and convexity 3.858439201452 years². For h=0.001, first price 101.687130177515, corrected 101.687326738166 and exact 101.687326607991 USD. Signed exact-minus-estimate errors are+0.000196430477 and−0.000000130174 USD. All round to 101.69, but rounding hides nonzero errors. Fixed cash flows/dates and continuous convention are essential; this is not time passing or a realised-return calculation.

<a id="answer-teachback"></a>
### Answer G
Start with dated receipts 100 at year 1 for Z and 5/105 at years 1/2 for B, with explicit USD prices today. Match growth before converting compounding quotes; keep the earlier printed-rate error labelled. Divide the zero price by its maturity receipt, then strip the known coupon PV to bootstrap the second factor. Those maturity-specific factors price each receipt. A single continuous YTM reproduces their total; a par coupon solves the separate face-price equation. Their factor ratio implies a locked forward, not a forecast. Convert that period growth to the FRA's simple rate and choose pay-fixed/receive-floating for the borrower; discount the full settlement difference to the period start. Finally hold amounts/dates fixed, differentiate and compare local estimates with repricing. Invalid examples include a nonpositive log input, dividing by zero maturity or final receipt, unspecified stubs, and treating nonparallel/option-dependent shocks as the same one-variable model. Check dates, conventions and substitution before trusting a plausible percentage.

<a id="source-map"></a>
## Exact primary recap-to-teaching and practice map

| Unit | Teaching | Outcomes | Practice / answer |
|---|---|---|---|
| lecture-3-p041-summary-bootstrap | [Sequential stripping](#bootstrap) | 1, 2 | [B](#exercise-bootstrap) / [answer](#answer-bootstrap) |
| lecture-3-p041-summary-compounding | [Conventions and error](#compounding), [caution](#source-error) | 1 | [A](#exercise-conventions) / [answer](#answer-conventions) |
| lecture-3-p041-summary-forward | [Replication](#forwards) | 1, 2 | [D](#exercise-forward) / [answer](#answer-forward) |
| lecture-3-p041-summary-fra | [FRA and borrower](#fra) | 1, 2 | [E](#exercise-fra) / [answer](#answer-fra) |
| lecture-3-p041-summary-sensitivity | [Sensitivity](#sensitivity) | 2 | [F](#exercise-sensitivity) / [answer](#answer-sensitivity) |
| lecture-3-p041-summary-unifying | [Dated cash flows](#dated-cashflows), [close the loop](#audit) | 1, 2 | [G](#exercise-teachback) / [answer](#answer-teachback) |
| lecture-3-p041-summary-yields | [Three rate objects](#yields) | 1, 2 | [C](#exercise-yields) / [answer](#answer-yields) |
| lecture-3-p041-summary-zero | [Individual factors](#zeros) | 1, 2 | [B](#exercise-bootstrap) / [answer](#answer-bootstrap) |

These are staging mappings only. Fourteen authored L 3 lesson drafts do not by themselves establish independent approval, canonical integration, taught coverage or learner mastery.
