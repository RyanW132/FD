# Forward interest rates and FRA settlement

**Source-grounded quick reference — author draft; independent semantic review pending.** Prerequisite: [zero factors](concept-zero-discount-factors.md#zero-formulas). The [forward-rate](../lessons/lesson-l3-forward-interest-rates.md#outcomes) and [FRA](../lessons/lesson-l3-fra-mechanics.md#outcomes) lessons give the full dated-cash-flow derivations.

<a id="forward-quote"></a>
## Forward quote: match terminal money, not percentages

Let today be 0, future start \(T_1\ge0\), end \(T_2>T_1\), and interval \(\delta=T_2-T_1>0\), all times in years. Let \(P_j=P(0,T_j)>0\) be today's discount factors and \(R_j\) the annual continuous decimal zeros at these dates. A **forward rate** is a rate agreed/implied today for that future interval; the rate actually observed at its start can differ.

Buying a unit payment at each date establishes forward accumulation factor \(G=P_1/P_2\): one unit at \(T_1\) must become \(G\) units at \(T_2\) to match today's costs. With annual continuous forward \(f\), matching terminal accumulation gives

\[
e^{R_2T_2}=e^{R_1T_1}e^{f\delta},\qquad
G=\frac{P_1}{P_2}=e^{f\delta},\qquad
f=\frac{\ln(P_1/P_2)}{\delta}
=\frac{R_2T_2-R_1T_1}{T_2-T_1}.
\]

The interval **discount** factor is the reciprocal \(P_2/P_1=e^{-f\delta}\), not the growth factor. At \(T_1=0\) use \(P_1=1\); no time-zero zero rate needs to be inferred. Sources: [L3 p25 accumulation matching](../../sources/annotated/lecture-3/page-025.md#lecture-3-p025-forward-accumulation), [boxed formula](../../sources/annotated/lecture-3/page-025.md#lecture-3-p025-forward-rate-formula), [lower factor ratio](../../sources/annotated/lecture-3/page-025.md#lecture-3-p025-discount-factor-ratio).

This no-arbitrage argument assumes matched dates/currency/credit terms and the ability to trade the compared cash flows without relevant frictions. It is a consistency relation, **not a forecast** of the future observed rate. Zero-length intervals cannot identify a forward by division by zero; positive factors allow negative forwards.

<a id="forward-conversion"></a>
## Convert before using a simple FRA rate

A **simple annualised rate** \(r\) over accrual fraction \(\delta\) earns period interest fraction \(r\delta\), with no within-period interest-on-interest. For the same accumulation:

\[
1+r\delta=e^{f\delta},\qquad
r=\frac{e^{f\delta}-1}{\delta},\qquad
f=\frac{\ln(1+r\delta)}{\delta}.
\]

Require \(1+r\delta>0\). These conversions are labelled supplemental algebra, not a claim that a continuous percentage can be inserted unchanged into simple settlement. A contractual day count determines the actual accrual fraction; elapsed calendar months alone do not fix it unless that convention is stipulated.

**Supplemental mini-example:** continuous zeros are 3% at one year and 4% at two years. The one-year interval has \(f=(0.04\times2-0.03\times1)/1=0.05\), or 5% continuous. Its growth is \(e^{0.05}\approx1.051271096376\), so its simple annual interval quote is about **5.127110%**, not 5%. These are two quotes for one growth factor, not two different forecasts.

<a id="fra-settlement"></a>
## FRA cash flows: name the payer and the date

An FRA fixes an interest-rate difference on a **notional** \(L>0\) in one currency; the notional scales the calculation and is not itself exchanged in this difference settlement. Let \(R_K\) be the contracted fixed **simple annual decimal rate**, and \(R_M\) the observed simple rate set at \(T_1\) for the same interval/accrual basis. Define positive cash as received by the named party. For **receive fixed, pay floating**, terminal difference \(Q\) at \(T_2\) and equivalent start settlement \(S\) at \(T_1\) are

\[
Q=L(R_K-R_M)\delta,\qquad
S=\frac{L(R_K-R_M)\delta}{1+R_M\delta},\qquad
S(1+R_M\delta)=Q.
\]

The whole numerator is discounted using the **observed simple-period** accumulation, assumed positive. It is not divided by a continuous zero quote, and \(S\) is at the future start, not today's PV. **Receive floating, pay fixed** gets \(-Q\) or \(-S\). Avoid ambiguous long/short labels. Sources: [L3 p29 notation](../../sources/annotated/lecture-3/page-029.md#lecture-3-p029-fra-notation), [terminal difference](../../sources/annotated/lecture-3/page-029.md#lecture-3-p029-fra-terminal-difference), [start settlement/opposite side](../../sources/annotated/lecture-3/page-029.md#lecture-3-p029-fra-start-settlement).

**Separate supplemental mini-example:** \(L=1000\) USD, \(\delta=0.5\) year, \(R_K=0.04\), \(R_M=0.05\). Receive-fixed has \(Q=1000(0.04-0.05)(0.5)=-5\) USD and \(1+R_M\delta=1.025\), so \(S=-5/1.025\approx-4.878048780488\) USD. It **pays** about USD 4.88 at start. Accumulating the unrounded amount at the assumed observed rate gives the −USD 5 terminal difference. The other party receives the same magnitude; do not exchange both start and terminal settlements.

<a id="fra-exposure"></a>
## Borrower/lender interpretation and limits

A borrower exposed to floating interest cost \(LR_M\delta\) uses the **receive-floating/pay-fixed** difference to offset increases. After bringing start settlement to the same end date at the assumed rate, net interest cost is \(LR_M\delta-L(R_M-R_K)\delta=LR_K\delta\). A lender receiving floating interest uses **receive-fixed/pay-floating**; net interest receipt is \(LR_M\delta+L(R_K-R_M)\delta=LR_K\delta\). These identities match notional, dates, rates and funding/reinvestment assumptions; they exclude principal, fees, basis/default risk and unmatched borrowing spreads. They are not universal hedging recommendations.

<a id="forward-selfcheck"></a>
## Supplemental self-check

In the FRA mini-example, state the receive-floating party's start and terminal amounts. Combine each direction with the appropriate borrower's interest cost or lender's receipt. Why may neither side discount the start amount a second time and call it the terminal amount?

<a id="forward-answer"></a>
## Separate supplemental answer

Receive-floating gets **+USD 4.878048780488… at start**, equivalent to **+USD 5 at end** under growth 1.025. Floating loan/deposit interest is \(1000(0.05)(0.5)=25\) USD. The borrower subtracts its +USD 5 terminal-equivalent receipt from USD 25 cost, leaving **USD 20**. The lender adds its receive-fixed −USD 5 terminal-equivalent difference to USD 25 interest receipt, leaving **USD 20**. Both equal \(1000(0.04)(0.5)\), but represent different exposures. Moving start money to end **multiplies** by 1.025; discounting again moves in the wrong direction. Use full precision until the final currency display.

<a id="forward-navigation"></a>
## Full teaching

[Discount-factor matching](../lessons/lesson-l3-forward-interest-rates.md#factor-ratio), [rate conversion](../lessons/lesson-l3-forward-interest-rates.md#quote-bridge), [FRA settlement](../lessons/lesson-l3-fra-mechanics.md#settlement), and [combined exposure](../lessons/lesson-l3-fra-mechanics.md#borrower-lender). These existing files are authored lessons awaiting independent teaching approval.
