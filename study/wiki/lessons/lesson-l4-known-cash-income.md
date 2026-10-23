# Forward prices with dated known cash income

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all nine primary units on Lecture 4 physical pages 15–17, including the positive-rates question and the short-sale qualification. Source amounts and table statements are reproduced with their rounding. Expanded derivations/ledgers, new scenarios, exercises and generated answers are **supplemental**, not official solutions, current rates or investment advice.

Prerequisite: [no-income replication](lesson-l4-no-income-replication.md). Also read the [pricing benchmark](lesson-l4-pricing-benchmark.md), [short-sale mechanics](lesson-l4-assets-short-sales-and-settlement.md#short-mechanics), [rate conventions](../concepts/concept-rate-conventions.md#rates-formulas) and [numeric units](../concepts/concept-numeric-foundations.md#numeric-units). The planned `concept-replication-and-carry` reference is absent; all needed concepts are introduced inline below rather than assumed.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain the income adjustment and its limits:** identify who receives each known payment at each date, distinguish a cash amount from a proportional yield, derive the prepaid terminal-asset cost and explain why positive rates alone do not imply forward above spot. Success requires date-specific discount factors, no duplicated income, faithful source rounding, and the practical short-sale/compensation qualification.
2. **Construct and verify the complete income ledgers:** reproduce the bond's coupon PV, fair forward and both source arbitrages using separate dated financing legs; transfer the method to several known payments. Success requires zero net opening/intermediate cash, correct coupon compensation and terminal asset return, no assumed future reinvestment rate, independently checked terminal cash, full-precision quantity scaling and final-only rounding.

<a id="foundations"></a>
## 1. Buying an asset now and receiving it later are different packages

A bond is a debt claim; a **coupon** is a contractual cash payment to its entitled holder. This lesson does not need an assumed face amount or coupon-rate percentage: the example supplies a cash coupon directly. **Known cash income** means specified currency amounts at specified dates in the benchmark, not a prediction of an uncertain dividend. A **proportional yield** instead describes income relative to asset value. It is a different model, taught later; a coupon of 40 dollars is not automatically a 40% or 4% yield.

The spot purchaser receives the asset now and, under the specified ownership terms, its income before delivery. A forward purchaser does not own the asset during that interval and does not receive those payments merely by holding a long forward. The forward delivers the asset with the rights still attached at delivery, not retrospectively the cash already paid to its former holder.

**Ownership convention used throughout:** count only known payments to the spot holder **strictly before** the forward's delivery date. Each is received once. A short seller compensates the security lender for the corresponding payment. If a payment occurs on the delivery date, determine whether delivery is before or after its entitlement/payment before including it; the source does not provide a universal same-day convention. After-delivery cash flows belong to the delivered asset's remaining rights, not this pre-delivery subtraction. In the bond example, the bond remains deliverable after its four-month coupon; no redemption before delivery is supplied.

<a id="notation"></a>
## 2. Define dates, currency and discount factors before summing

Use one underlying asset unit and one currency. For the bond example a unit is **one bond**, and we label the source dollars USD for classroom arithmetic, not a jurisdiction claim. Treat the supplied spot price as the complete modeled cash cost per bond; do not silently add an unspecified clean/dirty-price or accrued-interest adjustment.

| Symbol | Meaning and units |
|---|---|
| $0$ | Today, the inception/valuation date |
| $T>0$ | Delivery time in years from today |
| $S_0$ | Today's spot cash price, currency per asset unit |
| $F_{0,T}$, or $F_0$ | New forward's quoted delivery price, currency per unit |
| $F^*_{0,T}$, abbreviated $F^*$ | Conditional no-arbitrage benchmark delivery quote |
| $K$ | Fixed price of a signed forward; equals the offered $F_0$ when entered at that quote |
| $I_j$ | Known cash income for payment number $j$, currency per asset unit |
| $t_j$ | Its payment time, years from today, with $0<t_j<T$ |
| $r_j$ | Annual continuous zero rate from today to $t_j$, in decimal form |
| $r_T$ | Annual continuous zero rate from today to delivery $T$; subscript identifies maturity |
| $D(0,t_j)$ and $D(0,T)$ | Positive dimensionless discount factors for the respective dated cash amounts |
| $I$ | Sum of the present values of pre-delivery income, currency per unit |
| $Q$ | Positive number of asset units; total cash equals per-unit amount times $Q$ |

A **zero rate** for a maturity is the rate for a single dated payment over the interval from today to that maturity. A **term structure** can assign different rates to different maturities. It is not necessary to assume that the four-month and nine-month rates are equal.

**Continuous foundation:** a currency amount $A$ invested over $t$ years at annual continuous rate $r$ grows to $Ae^{rt}$. The exponential is positive and $e^0=1$. Discounting reverses growth, so $D(0,t)=e^{-rt}$ and a payment $A$ then costs $AD(0,t)$ today. The exponent pairs decimal annual rate with years. Under the example's equal-month convention, four months is $4/12$ year and nine months $9/12$ year. A negative exponent does not make a positive PV negative.

The benchmark retains no taxes/transaction costs, divisible quantities, matched borrowing/lending rates, known payments and feasible offsetting trades/performance. Reverse arbitrage additionally requires available asset borrowing, usable proceeds and compensation funding. Any storage, uncertain income, fee, collateral asymmetry or default omitted from this model must be assessed separately, not hidden in $I$.

<a id="income-pv"></a>
## 3. Discount each payment at its own date, then add

The source states

$$I=\sum_j I_j e^{-r_jt_j},$$

using the appropriate zero rate for each payment date. [L4 p15, lower equation and convention; `lecture-4-p015-income-present-value-sum`](../../sources/annotated/lecture-4/page-015.md#lecture-4-p015-income-present-value-sum).

The summation symbol means add one term for each payment: first compute each present amount $I_jD(0,t_j)$, then add those **same-date, same-currency** values. Do not add a coupon paid in four months directly to a price today as though their dates were identical. Do not discount every payment at the delivery rate merely because all belong to the same forward.

For two payments the formula means $I=I_1D(0,t_1)+I_2D(0,t_2)$. This is an addition, not a product of incomes or a single payment discounted over the sum of their waiting times. If a genuinely flat continuously compounded curve is stipulated, all the relevant zero rates equal the same $r$ and the formula simplifies accordingly. A flat curve is an extra input, not implied by the existence of one displayed $r$.

<a id="income-replication"></a>
## 4. Strip out income to replicate the terminal asset

The source explains that owning the asset gives both the terminal asset and the interim income, so the **prepaid cost** of the terminal asset is $S_0-I$. It gives

$$F_{0,T}=(S_0-I)e^{rT}.$$

[L4 p15, upper paragraph and boxed equation; `lecture-4-p015-known-income-replication`](../../sources/annotated/lecture-4/page-015.md#lecture-4-p015-known-income-replication).

**Supplemental derivation:** “prepaid” means pay now for the later asset receipt. Buy the asset for $S_0$ and offset its known income with borrowing whose repayments exactly match those income payments. Borrow $I_jD(0,t_j)$ today against a repayment $I_j$ at its date. Summed borrowing supplies $I$ today; each actual income receipt later pays its own loan. What remains is the asset at $T$ with no net intervening cash, bought for net $S_0-I$ today.

To convert that prepaid amount into a payment made at delivery, finance $S_0-I$ to $T$. Define $P=S_0-I$ as the prepaid terminal-asset cost, in currency/unit. A loan of $P$ today requires $P/D(0,T)$ at delivery. Thus the date-specific version is

$$F^*_{0,T}=\frac{S_0-I}{D(0,T)}=(S_0-I)e^{r_TT}.$$

In the source compact formula, $r$ is the relevant delivery-maturity rate. The income terms still use their own appropriate zero rates. Multiplying annual rate by elapsed years gives a dimensionless factor; subtracting $I$ from $S_0$ is valid because both are today-valued currency per unit.

<a id="income-interpretation"></a>

The source interpretation is that known income reduces forward price because the forward holder does not receive pre-delivery income. [L4 p15, middle interpretation box; `lecture-4-p015-known-income-interpretation`](../../sources/annotated/lecture-4/page-015.md#lecture-4-p015-known-income-interpretation).

At fixed spot and delivery discount factor, the reduction relative to no-income carry is $I/D(0,T)$, not merely the undiscounted sum of coupons and not necessarily $I$ itself. The reduction is expressed at delivery. Subtract income **once**: either finance the net prepaid cost using separate dated loans, or use a full-spot loan with a matched terminal income offset. Do not subtract $I$ and then deduct those same coupons again from an already adjusted terminal repayment.

The examples use $0\leq I<S_0$, so prepaid cost is positive. Zero income recovers the preceding lesson. If inputs suggest income PV exceeds the price of an otherwise nonnegative terminal asset, question consistency, omitted obligations or constraints rather than treating a negative prepaid cost as an unquestioned real-market prediction.

<a id="general-ledgers"></a>
## 5. Both arbitrage directions, including every intermediate payment

A new forward is assumed executable at its quoted $F_0$ with no initial premium. Its agreed $K$ then stays fixed. No-arbitrage tests the consistency of that quote with the complete spot/income/funding package; zero upfront derivative value is not proof the package is consistent.

**Overpriced forward, $F_0>F^*_{0,T}$ — supplemental full ledger.** Finance the purchase in separate maturity-matched pieces rather than silently choosing an unknown future reinvestment rate.

| Position | Cash at 0 | Cash at each income date $t_j$ | Cash at delivery $T$ | Asset obligation |
|---|---:|---:|---:|---|
| Income-matched loans | $+I$ in total | $-I_j$ on loan $j$ | 0: already paid | None |
| Delivery-matched loan | $+P$ | 0 | $-P/D(0,T)$ | None |
| Buy and hold one asset | $-S_0$ | $+I_j$ | No separate spot sale cash | Hold one unit for forward delivery |
| Short forward at $F_0$ | 0 | 0 | $+F_0$ | Deliver that unit |
| Combined | **$I+P-S_0=0$** | **0 at every date** | **$F_0-F^*_{0,T}$** | No asset/debt left |

The coupon does not create an extra free profit: it services its matching loan. The strategy locks a positive terminal amount under the model if the quote is above the benchmark.

**Underpriced forward, $F_0<F^*_{0,T}$ — supplemental full ledger.** Sell a borrowed asset and separate investments for compensation and delivery.

| Position | Cash at 0 | Cash at each $t_j$ | Cash at $T$ | Asset obligation |
|---|---:|---:|---:|---|
| Borrow and short-sell asset | $+S_0$ | $-I_j$ compensation | 0 cash when returning asset | Owe one equivalent unit until returned |
| Income-date investments | $-I$ in total | $+I_j$ from investment $j$ | 0: already paid | None |
| Delivery-date investment | $-P$ | 0 | $+P/D(0,T)$ | None |
| Long forward at $F_0$ | 0 | 0 | $-F_0$ | Receive unit; return it to security lender |
| Combined | **$S_0-I-P=0$** | **0 at every date** | **$F^*_{0,T}-F_0$** | Security loan discharged |

Notice the short seller **pays** compensation; the lender does not lose the income entitlement merely because the borrowed asset was sold. Investing all sale proceeds to $T$ would leave intermediate compensation unfunded unless another explicit financing leg were supplied.

Let $S_T$ denote the terminal spot price in the same currency per asset unit. Both directions remove this uncertain terminal asset price: in an economic-value check, the held asset's $S_T$ offsets the short forward's $F_0-S_T$, or the long forward's $S_T-F_0$ offsets the owed asset's $-S_T$. These values explain cancellation, not extra cash to add to the physical ledgers. Both executable positive-profit tests imply equality. If reverse shorting is unavailable, the lower-side proof can fail, as the previous lesson explains.

<a id="bond-data"></a>
## 6. Source bond: one coupon, two different zero rates

The source gives a bond price of **900 dollars**, a **40-dollar coupon in four months**, and a **nine-month forward**. The four-month zero rate is **3%** and nine-month rate **4%**, both annually continuously compounded. [L4 p16, opening data and coupon calculation; `lecture-4-p016-bond-income-data-pv`](../../sources/annotated/lecture-4/page-016.md#lecture-4-p016-bond-income-data-pv).

There is one supplied pre-delivery coupon, not a coupon-rate percentage. Use one bond and the complete modeled spot cash price 900 USD. The time line is: today buy/finance; month 4 coupon/compensation; month 9 deliver. No unsupplied additional coupon or principal repayment is inserted before month 9.

| Step — supplemental detailed calculation | Result and units |
|---|---|
| Coupon time | $t_1=4/12=1/3$ year |
| Delivery time | $T=9/12=0.75$ year |
| Coupon discount exponent | $0.03(4/12)=0.01$ |
| Coupon factor | $D(0,t_1)=e^{-0.01}\approx0.990049833749$ |
| Coupon present value | $I=40e^{-0.01}\approx39.601993349967$ USD/bond |
| Prepaid terminal-bond cost | $P=900-I\approx860.398006650033$ USD/bond |
| Delivery growth exponent | $0.04(9/12)=0.03$ |
| Delivery discount factor | $D(0,T)=e^{-0.03}\approx0.970445533549$ |

The source prints **39.60** for coupon PV. That is a cent-rounded amount. Discounting the coupon at 4% instead would use the wrong supplied maturity rate; using time 4 with an annual rate would use four years rather than four months.

<a id="bond-forward"></a>
## 7. Compute the forward and preserve the source rounding honestly

The source prints $(900-39.60)e^{0.04(9/12)}=886.60$. [L4 p16, middle calculation; `lecture-4-p016-bond-income-forward`](../../sources/annotated/lecture-4/page-016.md#lecture-4-p016-bond-income-forward).

With full precision the calculation is

$$F^*_{0,T}=(900-40e^{-0.01})e^{0.03}\approx886.601026957095\text{ USD/bond}.$$

Thus the final cent quote is **886.60 USD/bond**. If instead one uses the displayed intermediate $I=39.60$ literally, the calculation is approximately **886.603081013606**, also rounding to **886.60**. Those two intermediate results are **not equal**. The source's cent display can be reproduced without falsely claiming an exact exponential equality or propagating rounded amounts into later quantity totals.

A useful independent rearrangement distributes the growth factor:

$$F^*_{0,T}=900e^{0.03}-40e^{0.03-0.01}.$$

The no-income financed spot would be approximately **927.409080558165** at month 9. The coupon's matched month-9 amount is approximately **40.808053601070**. Subtracting gives **886.601026957095** again.

**Why the coupon's factor is $e^{0.02}$:** the factor locked from month 4 to month 9 by the given zero-curve prices is $D(0,t_1)/D(0,T)=e^{-0.01}/e^{-0.03}=e^{0.02}$. It can be implemented with today's dated financing positions. It is not a forecast of a reinvestment rate observed in month 4, nor permission to assume 4% applies unchanged over the intervening five months. Under an explicitly flat curve the corresponding factor would simplify to $e^{r(T-t_1)}$. The separate-loan ledgers avoid needing an uncontracted future reinvestment assumption at all.

<a id="positive-rates"></a>
## 8. Answer the source question: why below spot with positive rates?

The source asks why forward is below spot despite positive interest rates. [L4 p16, lower check box; `lecture-4-p016-positive-rates-question`](../../sources/annotated/lecture-4/page-016.md#lecture-4-p016-positive-rates-question). **The explanation and algebra here are supplemental answers, not a claimed official solution.**

Positive rates increase the financing component, but owning the bond also provides a coupon the forward holder misses. At month 9, the no-income financing increase above 900 is about **27.409080558165**, while the matched coupon amount is about **40.808053601070**. The latter is larger, leaving the adjusted forward about **13.398973042905 below 900**. Both comparison amounts are expressed at the same date.

For a general positive delivery discount factor, start from $F^*=(S_0-I)/D(0,T)$ and compare it with $S_0$. Multiplying an inequality by a positive factor does not reverse its direction:

$$F^*<S_0\quad\Longleftrightarrow\quad S_0-I<S_0D(0,T)
\quad\Longleftrightarrow\quad I>S_0[1-D(0,T)].$$

The right side is the present-date threshold for income to outweigh financing. For the source bond it is $900(1-e^{-0.03})\approx26.599019806343$ USD, below income PV about **39.601993349967**. If income equals the threshold, forward equals spot; if less, forward is above spot under positive rates. Hence **positive $r$ alone is insufficient once income matters**. Do not compare a present coupon PV with a future financing amount without converting dates.

<a id="source-table"></a>
## 9. Reproduce the complete source arbitrage comparison

Page 17 states fair price **886.60** and presents these two columns. The wording below preserves every strategy step and cent-rounded profit in an accessible table.

| Source: if quoted at 910 | Source: if quoted at 870 |
|---|---|
| Borrow to buy the bond and short the forward. | Short the bond and invest the proceeds after setting aside the present value of coupon compensation. |
| Use the coupon to service the corresponding borrowing. | Go long the forward at 870. |
| At maturity, deliver the bond for 910 and repay 886.60. | At maturity, the investment provides 886.60. |
| Profit: **23.40**. | Profit: **16.60**. |

[L4 p17, left column; `lecture-4-p017-income-overpriced-strategy`](../../sources/annotated/lecture-4/page-017.md#lecture-4-p017-income-overpriced-strategy); [right column; `lecture-4-p017-income-underpriced-strategy`](../../sources/annotated/lecture-4/page-017.md#lecture-4-p017-income-underpriced-strategy). The source lower box requires available bond borrowing and compensation to the lender; that qualification is retained below, not dropped because the table shows a profit.

<a id="bond-over"></a>
### Expand the 910 column into an auditable ledger — supplemental

| Date | Cash receipt | Cash payment | Net and position |
|---|---:|---:|---|
| 0 | Coupon-matched loan about 39.601993349967 plus delivery loan about 860.398006650033 | Buy bond 900 | Net 0; own bond, two cash loans, short forward at 910 |
| Month 4 | Bond coupon 40 | Repay coupon-matched loan 40 | Net 0; coupon not counted as extra profit |
| Month 9 | Deliver bond for 910 | Repay delivery loan about 886.601026957095 | About **23.398973042905 USD**; no bond or loan left |

The two opening loans sum to 900 using unrounded amounts. The coupon loan grows by $e^{0.01}$ to exactly 40 under the model; the remaining loan grows by $e^{0.03}$ to the computed forward benchmark. Profit rounds to the source **23.40 USD**.

For **100 bonds**, a supplemental freely scalable version borrows/buys 90,000 initially, receives/pays 4,000 at month 4, then receives 91,000 and repays about **88,660.102695709494** at month 9. Profit is approximately **2,339.897304290506**, or **2,339.90 USD**. Scaling the rounded 23.40 would give 2,340.00, not the full-precision total. No exchange lot size or actual lending capacity is asserted.

<a id="bond-under"></a>
### Expand the 870 column and compensation — supplemental

| Date | Cash receipt | Cash payment | Net and position |
|---|---:|---:|---|
| 0 | Sell borrowed bond for 900 | Invest about 39.601993349967 to month 4 and 860.398006650033 to month 9 | Net 0; owe one bond; long forward at 870 |
| Month 4 | First investment pays 40 | Pay lender coupon compensation 40 | Net 0; second investment remains untouched |
| Month 9 | Second investment about 886.601026957095 | Pay 870 on long forward | About **16.601026957095 USD**; receive bond and return it to lender |

The source **16.60** is the final cent-rounded profit. The bond return is an asset movement, not a second 870 cash expense. Neither 900 of initial short-sale proceeds nor the 40 compensation reserve is free profit. Leaving all 900 invested to month 9 without funding the month-4 compensation would omit a real obligation.

<a id="short-qualification"></a>
## 10. Preserve the practical short qualification

The source says the reverse strategy requires the bond to be available for borrowing and the short seller to compensate the lender for the coupon. [L4 p17, lower practical-qualification box; `lecture-4-p017-income-short-qualification`](../../sources/annotated/lecture-4/page-017.md#lecture-4-p017-income-short-qualification).

Availability and compensation are **necessary, not automatically sufficient** real-world conditions. Borrow fees, recalls, collateral/proceeds restrictions, bid/ask costs, taxes, performance differences and funding spreads can alter feasibility/profit. They are supplemental qualifications, not newly asserted live market rules. If the bond cannot be borrowed, writing the reverse formula does not make that trade executable. Existing owners might substitute selling/replacing if they can surrender interim rights and fund the desired compensation-equivalent income stream, but not every owner can forgo possession or other benefits.

A quote versus value distinction still matters. A new forward entered at an offered 910 or 870 has that fixed delivery price; the 886.60 benchmark compares modeled alternative trades. Neither quote is cash paid upfront, nor does either predict the uncertain bond price in nine months. These ledgers concern forwards with the stated dated cash flows, not an automatically identical daily-settled futures cash path.

<a id="multiple-example"></a>
## 11. Transfer to several payments without inventing a flat curve — supplemental

Consider a different fictional asset costing **100 GBP/unit**, paying **2 GBP** in a quarter-year and **3 GBP** in a half-year, with delivery at **one year**. Supply discount factors **0.99**, **0.97** and **0.94** for those three dates respectively; these are given price factors, not percentage interest rates. Assume compatible default-free financing can lock each dated payment and all other benchmark conditions hold.

1. First income PV: $2(0.99)=1.98$ GBP/unit.
2. Second income PV: $3(0.97)=2.91$ GBP/unit.
3. Total $I=1.98+2.91=4.89$ GBP/unit.
4. Prepaid terminal asset $P=100-4.89=95.11$ GBP/unit.
5. Benchmark $F^*=95.11/0.94\approx101.180851063830$ GBP/unit, or **101.18**.

For a quoted **103**, borrow 1.98 to repay 2 at the first date, 2.91 to repay 3 at the second, and 95.11 to repay about 101.180851063830 at delivery. Total borrowing 100 buys the asset. Its two incomes each service their own loan; short-forward delivery receipt 103 leaves about **1.819148936170**, or **1.82 GBP**.

For a quoted **100**, short-sell the asset for 100 and invest the same three present amounts. The first two investments fund compensation 2 and 3; the last provides about 101.180851063830. Pay 100 through the long forward, return the received asset, and retain about **1.180851063830**, or **1.18 GBP**. Both strategies have zero net cash at inception and each intermediate date under the assumptions.

This example has positive financing costs and a forward **above** spot, unlike the source bond. Its threshold income PV is $100(1-0.94)=6$, greater than actual 4.89. Income lowers the no-income benchmark $100/0.94\approx106.382978723404$, but does not lower it all the way below 100. The same threshold rule explains both examples.

<a id="boundaries"></a>
## 12. Boundary and misconception checks — supplemental

- If no pre-delivery income exists, $I=0$ and $F^*=S_0/D(0,T)$: recover no-income carry. Do not manufacture an income deduction for an asset whose payments occur only after delivery.
- With zero rates at every relevant date, discount factors are 1, so $I$ is the sum of the known cash amounts and $F^*=S_0-I$. For the source 900/40 amounts under this **changed zero-rate scenario**, the benchmark is **860**, not the source's positive-rate answer.
- A delivery horizon of zero contains no strictly future pre-delivery payment. Under matching immediate terms, $D(0,0)=1$, $I=0$ and the quote equals spot. One cannot keep the source's four-month coupon “before” zero-time delivery.
- Positive discount factors are required; dividing by a zero discount factor is invalid. Negative time or an income date outside the stipulated pre-delivery set requires correcting the setup, not blind substitution.
- Negative rates do not make PV negative; positive cash times a positive factor remains positive. The discount-factor form works with compatible negative rates, though the economic assumptions still need checking.
- Uncertain dividends, different currencies or proportional yields are not known same-currency cash income. Do not substitute a yield number for $I$ or deduct one coupon both as $I$ and again as a yield adjustment.
- There is no new forecast distribution for $S_T$ here. The mathematical cancellation works only with matched asset rights and contractual performance; it is not insurance against every operational risk.

<a id="practice"></a>
## 13. Progressive supplemental practice

<a id="exercise-ownership-prompt"></a>
### 1. Whose income, which date? — outcome 1
Distinguish $I_j$, $I$, a zero rate, a discount factor and a proportional yield. Explain why the long forward misses pre-delivery coupon income, what the short seller owes, and how a payment exactly at delivery must be handled. [Answer](#exercise-ownership-answer).

<a id="exercise-bond-prompt"></a>
### 2. Recompute the source bond — outcome 2
Find the coupon PV, prepaid bond cost and forward using both maturity-specific zero rates. Compare full-precision and printed-39.60 routes without asserting equality. Independently verify the distributed-growth calculation. [Answer](#exercise-bond-answer).

<a id="exercise-question-prompt"></a>
### 3. Answer the source positive-rates question — outcome 1
Why is the source forward below 900 even though both zero rates are positive? Derive the income-PV threshold and use it for the source bond and the multiple-payment example. [Answer](#exercise-question-answer).

<a id="exercise-over-prompt"></a>
### 4. Overpriced source ledger — outcome 2
Reconstruct all three dates at quote 910, showing the two loans, coupon repayment and asset delivery. Calculate one-bond and 100-bond final profit with final-only rounding. [Answer](#exercise-over-answer).

<a id="exercise-under-prompt"></a>
### 5. Underpriced source ledger — outcome 2
Reconstruct all three dates at quote 870. Explain why the coupon reserve is necessary, why returning the bond is not another cash purchase, and which source qualification can block the trade. [Answer](#exercise-under-answer).

<a id="exercise-multiple-prompt"></a>
### 6. New dated-income transfer — outcome 2
Solve the 100-GBP, 2/3-income, 0.99/0.97/0.94-factor example, including both arbitrage directions at quotes 103 and 100. Then explain zero-income, all-zero-rate and immediate-delivery boundaries. [Answer](#exercise-multiple-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Derive, do not recite — outcome 1
Teach a beginner why prepaid cost is spot minus income PV, why each payment uses its own factor, and why both income and terminal asset obligations must cancel in an arbitrage ledger. Include the absent carry reference and the inline foundation that replaces an unexplained prerequisite. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Repair an incomplete reverse trade — outcome 2
A report invests all 900 to month 9, ignores the month-4 coupon compensation, subtracts 40 only at month 9, treats the quote as an upfront payment and claims positive rates force forward above 900. Repair the dates, positions and source values. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 14. Separate supplemental answers and diagnosis

<a id="exercise-ownership-answer"></a>
### Answer 1
$I_j$ is one cash payment per asset at its date; $I$ adds their **present** amounts. A zero rate is a maturity-specific compounding quote; a discount factor is the positive price today of one currency unit at that date. A yield is proportional, not the supplied fixed cash amount. The spot holder has the pre-delivery entitlement; the long forward does not yet own the asset. A short seller compensates the lender, funded here by a date-matched investment. At-delivery payments require explicit entitlement/settlement ordering; do not automatically include or exclude them without terms. **Retry:** label each amount with recipient, currency, unit and date before adding it.

<a id="exercise-bond-answer"></a>
### Answer 2
$t_1=4/12=1/3$, $T=9/12=0.75$ years. Exponents are **0.01** and **0.03**. Coupon PV $40e^{-0.01}\approx\mathbf{39.601993349967}$ USD; prepaid cost about **860.398006650033**. Forward $P e^{0.03}\approx\mathbf{886.601026957095}$, or **886.60 USD/bond**. Literal intermediate 39.60 instead yields about **886.603081013606**, also cent-rounded 886.60, not the same unrounded number. Independent check: **927.409080558165 − 40.808053601070 = 886.601026957095** to displayed precision. The coupon terminal factor is locked ratio $e^{0.03-0.01}$, not an assumed later observed rate. **Retry:** discount coupon at its four-month rate and finance prepaid cost at the nine-month rate; retain precision.

<a id="exercise-question-answer"></a>
### Answer 3
The source coupon's matched terminal amount about **40.808053601070** exceeds financing interest about **27.409080558165**, making forward about **13.398973042905 below spot**. Equivalently $F^*<S_0$ exactly when $I>S_0[1-D(0,T)]$ for positive $D$. Source threshold is about **26.599019806343**, below coupon PV **39.601993349967**. In the new GBP example, threshold is **6**, above actual income PV **4.89**, so forward **101.180851063830** is above spot 100. Equal threshold gives equality. **Retry:** positive rates describe only the financing force; compare the income force at a matching date.

<a id="exercise-over-answer"></a>
### Answer 4
At 0 borrow about **39.601993349967** to month 4 and **860.398006650033** to month 9; their unrounded sum 900 buys the bond. Short the forward at 910 with no premium. Month 4 coupon **+40** pays matching debt **−40**. Month 9 deliver the bond for **910**, repay about **886.601026957095**, retain **23.398973042905**, or **23.40 USD**. For 100 bonds: opening borrowing/purchase 90,000, month-4 receipt/repayment 4,000, terminal receipt 91,000 less debt about **88,660.102695709494** gives **2,339.897304290506**, or **2,339.90**, not 2,340.00 from premature rounding. **Retry:** no coupon remains to subtract again after its own borrowing is repaid.

<a id="exercise-under-answer"></a>
### Answer 5
At 0 sell one borrowed bond for 900; place about **39.601993349967** into the coupon-date investment and **860.398006650033** into the delivery-date investment; enter long forward at 870. Month 4 receive **40** from the first investment and pay **40** lender compensation. Month 9 receive about **886.601026957095**, pay **870**, obtain the bond and return it; terminal profit **16.601026957095**, or **16.60 USD**. Returning the received bond discharges the securities debt without a second purchase. The source requires available bond borrowing and coupon compensation; fees, recall and proceeds restrictions also need checking. **Retry:** a month-9 balance does not itself fund a missing month-4 payment.

<a id="exercise-multiple-answer"></a>
### Answer 6
PV terms **1.98** and **2.91** sum to **4.89 GBP/unit**; prepaid cost **95.11**; fair quote **95.11/0.94 = 101.180851063830** approximately. At quote 103, loans **1.98, 2.91, 95.11** buy the 100 asset; income **2, 3** repays the first two; terminal receipt 103 less about 101.180851063830 gives **1.82 GBP** rounded. At quote 100, reverse these spot/funding positions; the first two investments pay compensation **2, 3**, final investment pays about 101.180851063830, forward purchase costs 100, and the received asset is returned; profit **1.18 GBP** rounded. Each intermediate net is zero. With no income, use $S_0/D(0,T)$; with all rates zero, use spot minus the un-discounted income sum (source amounts would give **860**); with immediate delivery no strictly pre-delivery future income remains and quote equals spot. **Retry:** zero horizon cannot coexist with a four-month coupon claimed before delivery.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation
“Buying now buys interim income as well as the later asset. Borrowing against each known coupon removes that income using a loan repaid on its exact date; the net prepaid asset costs spot minus coupon PV. Financing that remainder to delivery gives the forward benchmark. Each coupon has its own zero-rate factor, so a nonflat curve cannot be replaced by one guessed rate. The high-quote strategy owns the asset and pays coupon-matched debts; the low-quote strategy owes the asset and funds lender compensation. Both need matching terminal delivery and feasible financing/shorting. The carry concept page is missing, so these dated matching operations are explained here, not assumed from an unread reference.” **Retry:** describe actual receipts/payments at an intermediate coupon date, not only the final formula.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8
The short seller owes **40 at month 4**, not merely a nominal 40 deduction at month 9. Reserve PV about **39.601993349967** in a month-4 investment; invest only about **860.398006650033** to month 9. The reserve pays compensation exactly; the delivery investment pays about **886.601026957095**. Enter the long forward at 870 for no upfront premium, pay 870 **at delivery**, receive/return the bond and keep about **16.601026957095**, or **16.60**. Alternatively, any full-proceeds investment must include explicit date-matched compensation financing with the correct locked factors; simply subtracting 40 later is not equivalent. Positive rates do not force above-spot pricing: the coupon's contribution outweighs financing in this example. Borrowing availability remains required. **Retry:** distinguish quote, current contract value, inception investment and delivery payment before evaluating profit.

<a id="evidence"></a>
## Evidence, presentation and endpoint

All three full raw/normalized pages and original PNGs were inspected. Page 15 has the income formula, interpretation and date-specific sum; page 16 has the full bond data/calculations and positive-rates question; page 17 has the two-column arbitrage comparison and practical qualification. The table in section 9 preserves that comparison; all expanded ledgers/new scenarios/answers are labelled supplements. No source error is registered for these nine units; printed cent rounding is explicitly distinguished from exact computation.

| Physical page | Full normalized | Unchanged raw | Original PNG |
|---|---|---|---|
| 15 | [Full](../../sources/annotated/lecture-4/page-015.md) | [Raw](../../sources/extracted/lecture-4/page-015.md#page-15) | [Image](../../sources/assets/lecture-4/page-015.png) |
| 16 | [Full](../../sources/annotated/lecture-4/page-016.md) | [Raw](../../sources/extracted/lecture-4/page-016.md#page-16) | [Image](../../sources/assets/lecture-4/page-016.png) |
| 17 | [Full](../../sources/annotated/lecture-4/page-017.md) | [Raw](../../sources/extracted/lecture-4/page-017.md#page-17) | [Image](../../sources/assets/lecture-4/page-017.png) |

The missing carry concept remains pending metadata integration, not a fabricated read or dead link. No restricted textbook/private learner evidence was used. Stop this author slice after these two lessons; later proportional-yield cases are not introduced through unexplained formulas. Author checks do not establish independent teaching approval, publication or learner mastery.
