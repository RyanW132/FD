# Foreign currency as an investment asset: covered interest parity

<a id="status"></a>
**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all seven primary units on Lecture4 physical pp24–26. Source quotations, question and strategy are cited precisely. Expanded derivations, ledgers, reverse scenario, checks, exercises and generated answers are **supplemental**, not official solutions, current rate quotations or trading advice.

Immediate prerequisite: [index forward pricing](lesson-l4-index-forward-pricing.md). The [yield model](lesson-l4-known-proportional-yield.md), [no-income replication](lesson-l4-no-income-replication.md), [rate conventions](../concepts/concept-rate-conventions.md#rates-formulas) and [currency units](../concepts/concept-numeric-foundations.md#numeric-units) support the inline bridges. Planned carry and forward-value concept references were absent at this slice's reading checkpoint; neither is presumed read or used as an unexplained prerequisite. Separate concept authoring/integration may subsequently supply them.

<a id="outcomes"></a>
## Observable outcomes

1. **Specify and derive:** label domestic/foreign currencies from the actual quotation, derive covered parity through both currencies' dated deposits/loans, and explain the signs after quote inversion. Success requires matched currencies, rates, time and terminal foreign quantity; complete cancellation rather than a forecast; and explicit funding, performance and conversion assumptions.
2. **Compute and diagnose:** reproduce the source forward rate, borrowing decision, all five strategy steps and profit with full precision; check rounding, quantities and the reverse direction. Success requires separate currency columns, correctly covered interest on the foreign loan, final-only rounding and recognition that model arbitrage is conditional on executable terms.

<a id="quote-investment"></a>
## 1. Domestic and foreign describe a quotation, not the reader's nationality

The source defines spot as the **domestic-currency price of one unit of foreign currency**, and explains that invested foreign currency earns its foreign rate while domestic funds earn the domestic rate. [L4 p24, opening paragraph; `lecture-4-p024-currency-quote-investment`](../../sources/annotated/lecture-4/page-024.md#lecture-4-p024-currency-quote-investment).

An exchange quote has a numerator and denominator. **0.9800 USD per AUD** says that one Australian dollar costs0.9800 US dollars. For this calculation, USD is domestic and AUD foreign, regardless of where the trader lives. To buy a number of AUD at that spot quote, multiply AUD by USD/AUD; AUD units cancel, leaving USD. To find AUD purchasable with USD, divide USD by USD/AUD. Do not add USD and AUD cash amounts as though they were the same unit.

Holding a foreign-currency **deposit** can earn interest in foreign units. Merely holding non-interest-bearing banknotes does not automatically earn a deposit rate. The modeled investable foreign account is analogous to an asset with an income yield, except that its income naturally accumulates in its own currency. An interest rate is not an exchange rate: USD/AUD is a price, whereas an annual decimal rate is proportional growth per year.

<a id="notation"></a>
## 2. Fix the units, dates and assumptions

| Symbol | Definition |
|---|---|
| $0,T$ | Today and common maturity; $T\geq0$ in formulas is elapsed years |
| $S_0>0$ | Spot domestic currency per foreign currency unit |
| $F_0$ | Fair new forward quote, same domestic/foreign units and maturity |
| $F^{\mathrm{mkt}}$ | Offered market quote being compared with the model benchmark |
| $K$ | Delivery quote fixed in a particular forward; entering at the offered quote sets $K=F^{\mathrm{mkt}}$ |
| $r_d,r_f$ | Domestic and foreign annual **continuous** rates, decimal per year, for matched maturity funding/investment |
| $Q_T>0$ | Foreign-currency amount required or delivered at maturity |
| $B>0$ | Foreign principal borrowed or invested **today**, not automatically the maturity amount |
| $S_T$ | Future spot quote at maturity, uncertain today, same quotation direction |

A continuous rate $r$ grows a same-currency amount $A$ to $Ae^{rT}$. Discounting reverses it: $Ae^{-rT}$ today grows to $A$ at maturity. The exponential is positive and $e^{a+b}=e^ae^b$. Rate times years must be dimensionless. The source rates below are interpreted as annual continuous, not nominal annual rates silently placed in an exponential formula.

**Benchmark assumptions — supplemental explicit statement:** both currencies can be borrowed/lent at their stipulated same-currency rates, with known locked maturity amounts; currency conversion and matched forward contracts are executable; no bid/ask spread, tax, fees, differential collateral costs or capital/transfer restrictions; settlement dates and amounts align; all parties perform. Sufficient divisibility permits the exact terminal foreign amount. In practice funding, credit, collateral, settlement and access constraints can obstruct these ideal trades. A theoretical mismatch is not automatically an available riskless profit.

**Covered** means the foreign-currency exchange needed at maturity is fixed by a forward, so the strategy does not rely on guessing $S_T$. It does not mean every credit or operational risk is literally eliminated. A fair new forward has zero initial contract value in this model; its exchange quote, foreign notional and future domestic payment are not zero. This lesson compares **forward quotes**, not daily-settled futures cash paths or the current value of an old contract.

<a id="parity"></a>
## 3. Derive parity by buying the foreign amount in advance

The source's no-arbitrage relation is

$$F_0=S_0e^{(r_d-r_f)T}.$$

[L4 p24, middle boxed formula; `lecture-4-p024-covered-interest-parity`](../../sources/annotated/lecture-4/page-024.md#lecture-4-p024-covered-interest-parity). The minus sign on the foreign rate is a consequence of the following quantities, not a mnemonic about which country has higher rates.

To have **one foreign unit at maturity**, deposit $e^{-r_fT}$ foreign units today. The deposit grows to one. Buying it costs $S_0e^{-r_fT}$ domestic units today. Borrow that domestic amount until maturity; repayment is

$$S_0e^{-r_fT}e^{r_dT}=S_0e^{(r_d-r_f)T}.$$

A forward buying one foreign unit should therefore exchange it for this same domestic amount under the benchmark. For $Q_T$ terminal foreign units, multiply both the initial deposit and future domestic amount by $Q_T$.

### Complete overpriced-forward direction — supplemental ledger

If the offered forward is **above** the benchmark, sell foreign currency forward. Here “short foreign forward” means **deliver foreign, receive domestic**.

| Leg, target one terminal foreign unit | Today: domestic | Today: foreign | At $T$: domestic | At $T$: foreign |
|---|---:|---:|---:|---:|
| Borrow domestic funding | $+S_0e^{-r_fT}$ | 0 | $-S_0e^{(r_d-r_f)T}$ | 0 |
| Convert and deposit foreign | $-S_0e^{-r_fT}$ | Receive then deposit $e^{-r_fT}$; net cash0 | 0 | Deposit releases +1 |
| Short foreign forward | 0 | 0 | $+F^{\mathrm{mkt}}$ | −1 delivered |
| Combined | **0** | **0 external cash** | **$F^{\mathrm{mkt}}-F_0$** | **0** |

No modeled intermediate payment is required: both accounts accumulate to the matched maturity. The deposit is an asset and the cash loan a liability, not an unexplained free foreign balance. Terminal exchange-rate uncertainty cancels because the forward receives a fixed domestic amount for the exact foreign deposit proceeds.

<a id="reverse"></a>
## 4. Derive the opposite direction rather than guessing the currency to borrow

If the foreign forward is **below** the benchmark, buy foreign cheaply for maturity and finance the reverse position. Borrow $e^{-r_fT}$ foreign units today, so the foreign debt at maturity is exactly one. Convert the proceeds to domestic and invest them. Enter a **long foreign forward**: pay domestic, receive foreign at $T$.

| Leg, one terminal foreign unit owed | Today: domestic | Today: foreign | At $T$: domestic | At $T$: foreign |
|---|---:|---:|---:|---:|
| Borrow foreign | 0 | $+e^{-r_fT}$ | 0 | −1 debt repayment |
| Convert and invest domestic | Receive/deposit $S_0e^{-r_fT}$; net cash0 | $-e^{-r_fT}$ converted | $+F_0$ from investment | 0 |
| Long foreign forward | 0 | 0 | $-F^{\mathrm{mkt}}$ | +1 received |
| Combined | **0 external cash** | **0** | **$F_0-F^{\mathrm{mkt}}$** | **0** |

Both executable directions exclude a quote above or below the same benchmark. Thus they establish parity under the assumptions. If a direction cannot be executed at the quoted funding/conversion terms, the algebra does not itself restore equality.

For any initial foreign principal $B$, the future loan or deposit is $Be^{r_fT}$ foreign units. In the low-forward direction the domestic proceeds are $BS_0$, becoming $BS_0e^{r_dT}$. The locked terminal domestic profit is

$$\Pi_{\mathrm{low}}=BS_0e^{r_dT}-Be^{r_fT}F^{\mathrm{mkt}}
=Be^{r_fT}(F_0-F^{\mathrm{mkt}}).$$

Here $\Pi$ is terminal domestic currency, not a percentage return on an unspecified equity investment. The high-forward direction reverses the funded legs and gives $\Pi_{\mathrm{high}}=Be^{r_fT}F^{\mathrm{mkt}}-BS_0e^{r_dT}$. These expressions compare like-dated domestic cash, with foreign debt/delivery separately discharged.

<a id="quotation-sign"></a>
## 5. Forward discount depends on the quotation direction

The source stresses domestic currency per foreign unit and says that if $r_d<r_f$, the foreign currency is at a forward discount under that quotation. [L4 p24, lower quotation-matters box and last sentence; `lecture-4-p024-currency-sign-quotation`](../../sources/annotated/lecture-4/page-024.md#lecture-4-p024-currency-sign-quotation).

For positive $T$, a negative rate difference gives an exponential below one, so $F_0<S_0$. **Forward discount** here means the quoted domestic price of foreign currency is lower for forward delivery than for spot. It is not a guaranteed fall in future spot, a negative exchange rate or a fee deducted from the foreign deposit.

If the quote is inverted, define $\widetilde S_0=1/S_0$ and $\widetilde F_0=1/F_0$, now foreign currency per domestic unit. The domestic/foreign roles also swap:

$$\widetilde F_0=\widetilde S_0e^{(r_f-r_d)T}.$$

The reciprocal of a smaller positive quote is larger, and the rate difference changes sign. Do not invert the number but retain the old rate labels. A “discount” description without saying **which currency and which quotation** is incomplete.

<a id="source-rate"></a>
## 6. Reproduce the source USD/AUD forward example

The source inputs are spot **0.9800 USD/AUD**, USD rate **1%**, AUD rate **3%**, and **two years**. [L4 p25, upper data and calculation; `lecture-4-p025-usd-aud-forward-example`](../../sources/annotated/lecture-4/page-025.md#lecture-4-p025-usd-aud-forward-example).

| Step | Result |
|---|---|
| Identify domestic/foreign from USD/AUD | Domestic USD; foreign AUD |
| Decimal annual continuous rates | $r_d=0.01$, $r_f=0.03$ |
| Rate difference | $0.01-0.03=-0.02$ per year |
| Exponent for two years | $(-0.02)(2)=-0.04$ |
| Forward benchmark | $0.9800e^{-0.04}\approx\mathbf{0.941573650369}$ USD/AUD |
| Source four-decimal quote | **0.9416 USD/AUD** |

**Supplemental independent one-terminal-AUD check:** deposit $e^{-0.06}\approx0.941764533584$ AUD today. It costs approximately **0.922929242913 USD** at spot; financing that USD cost at1% for two years produces **0.941573650369 USD**, the same unrounded forward cost of one terminal AUD.

The foreign rate is higher, so the USD/AUD forward is below0.9800. That forward discount offsets the higher foreign deposit growth in a covered comparison; it does not say an uncovered AUD investment is guaranteed to outperform USD or that actual future spot must fall.

For the **supplemental inverse quote**, spot is approximately **1.020408163265 AUD/USD**, and forward **1.062051810400 AUD/USD** using the unrounded reciprocal. This now prices USD in AUD and uses AUD's3% minus USD's1%. Reciprocating the printed0.9416 instead is a rounded-input calculation, not exact equality with the full-precision inverse.

<a id="borrow-question"></a>
## 7. Answer the source prediction before reading the strategy

The source asks: if the market two-year forward is only **0.9300 USD/AUD**, which currency should the arbitrageur borrow? [L4 p25, lower prediction box; `lecture-4-p025-currency-borrow-question`](../../sources/annotated/lecture-4/page-025.md#lecture-4-p025-currency-borrow-question).

**Generated reasoning answer:** 0.9300 is below the benchmark0.941573650369…, so terminal AUD is comparatively cheap in the offered forward. **Borrow AUD now**, convert it to USD and invest USD; buy the exact future AUD debt amount forward at0.9300. The higher AUD borrowing rate is not a reason to reject that conclusion: the quoted forward price and terminal repayment amount must be considered together. Choosing the lower interest-rate currency to borrow without a complete ledger can give the wrong trade.

<a id="source-strategy"></a>
## 8. Work every source step, with both currencies kept separate

The source supplies the following five steps at the low forward quote. [L4 p26, opening condition and entire numbered strategy; `lecture-4-p026-currency-arbitrage-steps`](../../sources/annotated/lecture-4/page-026.md#lecture-4-p026-currency-arbitrage-steps).

| Source step | Source displayed amount | Supplemental full-precision explanation |
|---|---|---|
| Borrow1,000 AUD and convert to USD | 1,000 AUD →980 USD | $1000(0.9800)=980$ USD; foreign liability remains |
| Invest USD for two years at1% | **999.80 USD** | $980e^{0.02}\approx999.797313226221$ USD |
| AUD debt grows for two years at3% | **1,061.84 AUD** | $1000e^{0.06}\approx1061.836546545360$ AUD |
| Buy the debt amount forward at0.9300 | **987.51 USD** payment | Full debt times0.9300 is approximately **987.507988287184 USD** |
| Use forward-delivered AUD to repay | AUD debt discharged | Receive and repay the same unrounded AUD amount; terminal AUD net0 |

The forward is agreed at inception to **buy the maturity debt**, not purchased after discovering an unknown future spot. Its offered rate is fixed and both loan growth amounts are known under the model. No interim exchange-rate forecast is required.

### Expanded dated currency ledger — supplemental

| Event | Today USD | Today AUD | At two-year maturity USD | At two-year maturity AUD |
|---|---:|---:|---:|---:|
| Borrow AUD | 0 | +1,000 | 0 | −1,061.836546545360… |
| Spot conversion | +980 | −1,000 | 0 | 0 |
| USD investment | −980 | 0 | +999.797313226221… | 0 |
| Long AUD forward, zero entry premium | 0 | 0 | −987.507988287184… | +1,061.836546545360… |
| Net | **0** | **0** | **+12.289324939036…** | **0** |

There are no modeled intermediate withdrawals/payments. The final USD residual is already measured at the same date as both USD legs. The AUD interest is included in the amount covered; forwarding only1,000 AUD would leave the interest portion uncovered.

<a id="source-profit"></a>
## 9. Source profit, rounding and scaling

The source displays **999.80−987.51=12.29 USD**, calling it a riskless maturity profit. [L4 p26, lower boxed profit; `lecture-4-p026-currency-arbitrage-profit`](../../sources/annotated/lecture-4/page-026.md#lecture-4-p026-currency-arbitrage-profit). Retain its model meaning: exchange-rate risk is covered **if** all stated loans, investments, conversions, forward delivery and funding assumptions work; credit, collateral, settlement or access problems are not magically absent in actual trading.

Full-precision subtraction gives

$$999.797313226221\ldots-987.507988287184\ldots
=12.289324939036\ldots\text{ USD at maturity},$$

rounding to the same **12.29**. The printed foreign debt1,061.84 multiplied literally by0.9300 gives **987.5112 USD**, which also rounds to987.51. It is not exactly the same intermediate amount as multiplying the unrounded debt. Actual foreign-lot/currency settlement rounding requires a specified convention; the ideal ledger uses exact compatible amounts rather than silently leaving a residual foreign balance.

For a **supplemental tenfold principal of10,000 AUD**, all full-precision cash flows scale by ten: domestic starting proceeds **9,800 USD**, maturity foreign debt **10,618.365465453596… AUD**, domestic investment **9,997.973132262207… USD**, forward cost **9,875.079882871844… USD**, and profit **122.893249390362… USD**, or **122.89**. Multiplying the source's already rounded12.29 by ten gives122.90; that is premature rounding, not the exact theoretical aggregate.

<a id="high-example"></a>
## 10. Reverse the quote and verify the other direction — supplemental

Keep spot/rates/time, but suppose the offered forward is **0.9600 USD/AUD**, above the benchmark. Borrow **980 USD**, convert to **1,000 AUD**, invest AUD, and **sell its full maturity proceeds forward**.

| Date/leg | USD | AUD |
|---|---:|---:|
| Today domestic borrowing | +980 | 0 |
| Today spot conversion | −980 | +1,000 |
| Today foreign investment | 0 | −1,000 |
| Maturity foreign investment | 0 | +1,061.836546545360… |
| Maturity short AUD forward at0.9600 | +1,019.363084683545… | −1,061.836546545360… |
| Maturity domestic debt repayment | −999.797313226221… | 0 |
| Net today / net maturity | **0 / +19.565771457325…** | **0 / 0** |

Profit is **19.57 USD** after final rounding. This is a new offered quote, not a source claim. Direction changed because foreign delivery is now expensive relative to carrying AUD. All foreign exposure is matched; no unknown $S_T$ appears. Fees or borrowing spreads would need their own dated cash-flow entries before calling this executable arbitrage.

<a id="boundaries"></a>
## 11. Checks and limits that expose common mistakes

- Equal domestic/foreign rates give $F_0=S_0$; zero time also gives spot. Neither requires rates individually to be zero.
- If $r_d<r_f$ and time is positive, $F_0<S_0$; reversing the inequality reverses that result. Even with negative rates, the **difference** and quote direction determine the comparison, and exponential factors stay positive.
- At an offered quote equal to the full benchmark, both ideal arbitrage profits are zero. Their sign expressions are opposites at the same principal/quote, not two simultaneous positive profits.
- Foreign loan principal $B$ and terminal debt $Be^{r_fT}$ are different quantities. The source's two years means both full years, not two months. The quoted rate0.9300 is USD/AUD, not AUD/USD or a9.3% interest rate.
- A hedge covers a specified currency amount/date. Covering the wrong currency, a different maturity or only principal leaves risk. Zero principal gives zero total cash; dividing by it to infer a quote is invalid.
- Reciprocal quotations must be positive for this model; zero spot cannot be inverted. Negative elapsed time is not this future-delivery setup.
- A cash-settled or collateralized currency instrument can have different funding/performance details. This archived model makes no universal claim about OTC clearing, present legal rules, actual capital controls or current obtainable rates.

Covered parity is a **matched-price relationship**, not an uncovered interest-return strategy or a statement about expected future exchange rates. Borrowing the “cheap-rate” currency and investing the “high-rate” currency without covering the exchange is a different risky position.

<a id="practice"></a>
## 12. Progressive supplemental practice

<a id="exercise-quote-prompt"></a>
### 1. Units and quotation — outcome1
Explain domestic/foreign for USD/AUD, convert the source1,000 AUD to USD, derive the inverse quote direction and say why the labels are not nationality. Distinguish forward discount from a forecast. [Answer](#exercise-quote-answer).

<a id="exercise-derive-prompt"></a>
### 2. Derive both ledgers — outcome1
Start with a target of one terminal AUD. Derive the prepaid foreign deposit, its domestic financed cost and both offered-quote trade directions. Identify all assumptions and show terminal foreign cancellation. [Answer](#exercise-derive-answer).

<a id="exercise-source-prompt"></a>
### 3. Source quote and prediction — outcome2
Compute the source forward and independently check it by prepaying one terminal AUD. Answer which currency to borrow at0.9300 and explain why comparing interest rates alone is insufficient. [Answer](#exercise-source-answer).

<a id="exercise-ledger-prompt"></a>
### 4. Reconstruct the full source strategy — outcome2
Reproduce all five source steps and the complete two-currency dated ledger for1,000 AUD initial borrowing. Calculate exact-route and displayed profit; explain why the forward must cover interest as well as principal. [Answer](#exercise-ledger-answer).

<a id="exercise-transfer-prompt"></a>
### 5. Scale and reverse — outcome2
Find the full-precision10,000-AUD-source-direction profit and explain122.89 versus122.90. Then calculate the supplemental0.9600 high-forward direction and its closing obligations. [Answer](#exercise-transfer-answer).

<a id="exercise-limits-prompt"></a>
### 6. Diagnose boundaries — outcome1
Explain equal-rate/zero-time results, quote inversion, negative-rate differences and zero-principal limitations. Does an attractive theoretical residual guarantee available borrowing or counterparty performance? [Answer](#exercise-limits-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach parity without a mnemonic — outcome1
Explain how two currency accounts and a forward eliminate future spot from the comparison. Distinguish quote, value, foreign notional and domestic cash. State why source “riskless” is conditional. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Repair an arbitrage report — outcome2
A report uses AUD rate minus USD rate with the USD/AUD quote, borrows USD at the source low forward, covers only1,000 AUD and calls the980 USD conversion proceeds profit. Correct each claim using the source numbers and dated obligations. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 13. Separate supplemental answers

<a id="exercise-quote-answer"></a>
### Answer1
USD is domestic and AUD foreign because the price is **USD per AUD**. **1,000×0.9800=980 USD**. Inverting gives spot **1.020408163265… AUD/USD** and fair forward **1.062051810400… AUD/USD**; the rate difference becomes AUD3% minus USD1%. “AUD at a forward discount” describes the original USD/AUD quote below spot, not guaranteed future depreciation. **Retry:** write the currency units before multiplying or taking a reciprocal.

<a id="exercise-derive-answer"></a>
### Answer2
For one terminal AUD, deposit **$e^{-r_fT}$ AUD** today. Domestic cost is $S_0e^{-r_fT}$, financed to $S_0e^{(r_d-r_f)T}$. High forward: borrow domestic, buy/invest foreign, sell terminal foreign forward; profit offered quote minus benchmark. Low forward: borrow the prepaid foreign amount, convert/invest domestic, buy one terminal foreign unit forward and repay; profit benchmark minus offered quote. Each direction starts with net external cash0 and ends with foreign net0, leaving only its signed domestic residual. Symmetric accessible funding, identical dates/units, executable conversion/forward, no omitted costs and performance are required. **Retry:** do not confuse a foreign deposit/loan with an uninvested currency note or a domestic cash loan.

<a id="exercise-source-answer"></a>
### Answer3
Rate difference **.01−.03=−.02**, exponent **−.04**. Fair quote **0.941573650369… USD/AUD**, displayed **0.9416**. One-terminal-AUD deposit is **.941764533584… AUD**, costing **.922929242913… USD**, financed to the same forward quote. At offered **.9300**, borrow **AUD**, invest converted USD and buy exact maturity AUD debt forward. The forward is sufficiently cheap relative to the whole funded comparison; the nominal borrowing-rate ranking alone does not determine direction. **Retry:** compare offered quote against the convention-correct benchmark first.

<a id="exercise-ledger-answer"></a>
### Answer4
Today borrow **1,000 AUD**, convert for **980 USD**, invest that USD; net cash0 in both currencies. At two years: USD investment **999.797313226221…**; AUD debt **1061.836546545360…**. Buy that exact debt forward at.9300 for **987.507988287184… USD**, receive AUD and repay. Foreign net0; domestic profit **12.289324939036…**, or **12.29 USD**. Printed **999.80−987.51=12.29** agrees in cents. Literal rounded AUD1061.84 times.9300 gives **987.5112**, not the exact-route987.507988…; both display987.51. Covering only1,000 leaves the interest debt unhedged. **Retry:** write each currency in its own column and match full maturity amounts.

<a id="exercise-transfer-answer"></a>
### Answer5
Tenfold initial AUD borrowing gives USD starting9,800; maturity AUD debt **10,618.365465453596…**; USD investment **9,997.973132262207…**; forward purchase **9,875.079882871844…**; profit **122.893249390362…**, final **122.89**, not122.90 from scaling a rounded per-example profit. At the separate high quote.9600, borrow **980 USD**, invest **1,000 AUD**; maturity AUD1061.836546545360… is sold forward for **1019.363084683545… USD**, repay USD999.797313226221…, leave **19.565771457325…**, or **19.57 USD**. **Retry:** direction and loan currency reverse when the offered quote crosses the benchmark; do not silently reuse a low-quote trade.

<a id="exercise-limits-answer"></a>
### Answer6
Equal rates or zero time make the exponent zero and forward equal spot. Positive time and the signed domestic-minus-foreign difference determine premium/discount even if both rates are negative. Inverting swaps both quotation and rate roles. Zero borrowing gives zero residual but cannot identify a per-unit quote by division. Model cash matching does not grant actual borrowing, netting, collateral or default protection. **Retry:** separate a mathematical equality from execution/performance assumptions.

<a id="exercise-explain-teachback-answer"></a>
### Answer7 — sufficient explanation
“The forward fixes how much domestic cash is exchanged for a specified foreign amount at maturity. Prepay that foreign amount with a foreign deposit, translate its present cost at spot and finance the domestic purchase. Reversing the loan/deposit/conversion legs tests the other price bound. The matching forward closes the future exchange, so uncertain future spot is not needed. Its quote is not its current value; its foreign notional and domestic payments remain even if fair entry value is zero. Costs, funding restrictions, mismatched dates, collateral or default can break executable parity. The source's riskless profit is therefore within its matched zero-cost model, not a current trading guarantee.” **Retry:** include both currencies and both dates in the explanation.

<a id="exercise-apply-teachback-answer"></a>
### Answer8
For USD/AUD use **USD1%−AUD3%**, producing **.941573650369…**, not a positive-rate-difference quote. At source offered.9300, borrow **AUD**, not USD. The1,000 principal grows to **1061.836546545360… AUD**; cover that entire debt. The980 USD conversion proceeds must be invested against obligations and are not profit. Only after the USD investment **999.797313226221…** pays the forward cost **987.507988287184…** and AUD debt is discharged does the model leave **12.289324939036… USD**, displayed **12.29**. **Retry:** label principal, maturity debt, gross proceeds and residual separately.

<a id="evidence"></a>
## Evidence and dependencies

All six full raw/normalized files for pp24–26 and all three original PNGs were inspected. Page24 supplies the quote convention/parity/sign warning; p25 the complete example and borrowing question; p26 the numbered strategy and boxed profit. The tables here are accessible supplemental expansions of that evidence, not invented original figures. Seven primary units are verified with no registered issue; source QA is not draft approval.

| Page | Normalized | Raw | Original |
|---|---|---|---|
|24|[Full](../../sources/annotated/lecture-4/page-024.md)|[Raw](../../sources/extracted/lecture-4/page-024.md#page-24)|[PNG](../../sources/assets/lecture-4/page-024.png)|
|25|[Full](../../sources/annotated/lecture-4/page-025.md)|[Raw](../../sources/extracted/lecture-4/page-025.md#page-25)|[PNG](../../sources/assets/lecture-4/page-025.png)|
|26|[Full](../../sources/annotated/lecture-4/page-026.md)|[Raw](../../sources/extracted/lecture-4/page-026.md#page-26)|[PNG](../../sources/assets/lecture-4/page-026.png)|

Next is [commodity storage and convenience yield](lesson-l4-commodity-storage-and-convenience.md). Carry/forward-value concept integration and independent teaching review remain separate tasks. No restricted textbook/private learner evidence or live market quotations were used.
