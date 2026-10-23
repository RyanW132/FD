# Known proportional yield versus known cash income

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all three primary units on Lecture 4 physical page 18. The source supplies the continuous-yield formula, numerical example and cash-versus-yield comparison. The reinvestment derivation, expanded ledgers, extra cases, exercises and answers below are **supplemental**, not official solutions or current market specifications.

Prerequisite: [known cash income](lesson-l4-known-cash-income.md). [No-income replication](lesson-l4-no-income-replication.md), [rate conventions](../concepts/concept-rate-conventions.md#rates-quote) and [numeric units](../concepts/concept-numeric-foundations.md#numeric-units) support the inline foundations. The planned `concept-replication-and-carry` page remains absent; this lesson does not assume it was read.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain and derive the yield model:** distinguish a known continuous proportional income yield from a known cash payment and from the financing rate; construct the reinvested asset-quantity strategy that supplies one unit at delivery. Success requires the quantity-growth argument, all reinvestment/shorting/divisibility assumptions, both pricing directions and an explanation of why neither known yield nor a forward quote predicts the future spot price.
2. **Compute and diagnose:** reproduce the source example with full intermediate precision, compare financed prepaid cost with the compact formula, scale quantities correctly and test zero/equal/higher yield and time boundaries. Success requires explicit currency/annual-rate/year conventions, final-only rounding, correct trade signs and no duplicate cash-income/yield deduction or unexplained nominal-rate substitution.

<a id="cash-versus-yield"></a>
## 1. Two income descriptions answer different questions

The source distinguishes the known-cash-income approach from the approach for income proportional to the asset's value. [L4 p18, lower cash-income-versus-yield box; `lecture-4-p018-cash-versus-yield`](../../sources/annotated/lecture-4/page-018.md#lecture-4-p018-cash-versus-yield). Define their inputs before deciding which expression applies:

- **Known cash income:** specified currency payments at specified dates. Their present-value sum is $I$, a currency amount per asset unit. The earlier lesson discounts each payment using its own appropriate factor.
- **Known proportional income yield:** a model specifies a continuous rate $q$ of income relative to the asset's contemporaneous value. The income cash amount can change with that value even if the proportional rate is known. The model also permits that income to be reinvested in the same asset.
- **Funding rate:** $r$ describes growth of borrowed/lent money, not the asset's distribution policy. It need not equal $q$.

For example, a promised distribution of **1 USD per share at a stated date** is a cash amount, not automatically a 1% continuous yield. A declared **3.96% annual continuous proportional yield** is a rate, not a known 3.96 USD payment. Neither alone says how the share price will change.

A quoted market dividend percentage might be historical, expected, annualized with a particular payment frequency, or based on a particular reference price. It cannot simply be relabelled as a deterministic continuous $q$. Establish the underlying income model and compounding/reinvestment convention first; rate conversion by itself does not turn uncertain discrete dividends into known continuous proportional income.

<a id="notation"></a>
## 2. Units, dates and assumptions

Use a single deliverable asset and currency. Source dollars are labelled USD in the classroom example, not used to infer a jurisdiction or actual security. Receipts are positive and payments negative from the chosen trader's viewpoint.

| Symbol | Meaning |
|---|---|
| $0$ | Today, inception |
| $T\geq0$ | Years from today until delivery; equal months are used where a month conversion is supplied |
| $S_0>0$ | Current spot price, currency per asset unit |
| $S_T$ | Uncertain future spot price at delivery, same currency/unit |
| $F_{0,T}$, abbreviated $F_0$ | Today's delivery quote for a new forward, currency/unit |
| $F^*_{0,T}$ | The model's no-arbitrage benchmark quote |
| $K$ | Fixed delivery price in a signed contract; set to the offered $F_0$ when entering it |
| $r$ | Annual continuous funding rate as a decimal |
| $q\geq0$ | Annual continuous proportional income yield as a decimal, constant over this example's horizon |
| $Q>0$ | Desired number of asset units at delivery |
| $n_0$ | Initial number of asset units needed for the reinvestment strategy |
| $u$ | An intermediate elapsed time, years, between 0 and $T$ |
| $n(u)$ | Number of asset units held at time $u$ after reinvestment |

Rates multiply years, so $rT$ and $qT$ are dimensionless. The exponential function is positive, obeys $e^{a+b}=e^ae^b$, and $e^0=1$. An amount $A$ of money grows to $Ae^{rT}$ under the continuous funding convention. Dividing by that factor, or multiplying by $e^{-rT}$, discounts a delivery-date amount back to today. Subscripts label dates; they are not extra multiplications.

**Model assumptions — supplemental explicit bridge:** retain the basic no-tax/no-transaction-cost benchmark, matching borrowing/lending and contractual performance, divisible holdings, identical deliverable asset/date/currency, and no extra storage or other carrying cost. Income can be reinvested immediately in fractional units of the **same** asset at its current price, without tax, spread or delay. The proportional yield is known over the interval. A reverse replication additionally needs continuous access to asset borrowing/shorting, usable proceeds and financing of income compensation without hidden fees or collateral restrictions. Those assumptions are not current account permissions.

A new forward at a consistent fair quote has zero initial contract value in this benchmark. Its quote and quantity still specify a future payment; neither is the initial value or a margin amount. A long forward does not itself receive the asset's pre-delivery income.

<a id="quantity-growth"></a>
## 3. Why reinvestment changes the number of units — supplemental derivation

Income proportional to current value can buy more units of the asset. Over a very short interval, a holding of $n$ units has value $n$ times the current per-unit price. Its proportional income can purchase a proportional increment in units when reinvested at that same price: the price cancels from income divided by purchase price. The amount of cash depends on price, but the proportional increase in unit count does not under this ideal model.

A continuous yield convention describes the limit of increasingly frequent reinvestment. If $m$ equal reinvestment intervals over the horizon approximate a continuous rate $q$, the unit-growth factor is approximated by $(1+qT/m)^m$. Here $m$ is a positive count of intervals, not years. As intervals become finer, that factor approaches $e^{qT}$. This is the same continuous-compounding mathematics as for money, applied to **reinvested unit quantity**, not a claim that the asset's market price grows at rate $q$.

Thus the held unit count is

$$n(u)=n_0e^{qu}.$$

To receive one asset unit at delivery, require $n_0e^{qT}=1$. Dividing by the positive growth factor gives

$$n_0=e^{-qT}.$$

For $Q$ terminal units, start with $Qe^{-qT}$. A positive yield means fewer units are initially needed, because the reinvested income acquires the remainder. If the income is spent rather than reinvested, this unit-count replication no longer supplies the claimed final quantity. The same income cannot both buy extra units and remain separately available as additional free cash.

**Important distinction:** unit quantity grows predictably under the specified yield/reinvestment model; terminal asset value remains $Q S_T$ and can be uncertain. We next use a forward sale to match delivery rather than predict $S_T$.

<a id="yield-formula"></a>
## 4. Finance the smaller initial holding and derive the formula

The source gives the known-yield price

$$F^*_{0,T}=S_0e^{(r-q)T}.$$

[L4 p18, upper definition and boxed formula; `lecture-4-p018-known-yield-formula`](../../sources/annotated/lecture-4/page-018.md#lecture-4-p018-known-yield-formula). The following ledger explains the formula rather than treating it as a memorized adjustment.

For one terminal unit, define the **prepaid cost** $P=S_0e^{-qT}$, measured in today's currency. This buys the initial fraction $e^{-qT}$ of a unit. Finance $P$ to delivery and reinvest all income while holding the asset. At $T$, the holding has grown to exactly one deliverable unit.

| Long replication leg — supplemental | At 0 | During the interval | At $T$ |
|---|---|---|---|
| Cash borrowing | Receive $P$ | No modeled debt payment before delivery | Repay $Pe^{rT}$ |
| Buy reinvesting asset position | Pay $P$; hold $e^{-qT}$ units | Income purchases additional units; net external cash 0 | Hold exactly one unit |
| Short one-unit forward | No entry premium | No forward income or modeled interim settlement | Deliver the one unit; receive $F_0$ |
| Combined | Net cash **0** | Net external cash **0** | Net cash **$F_0-Pe^{rT}$**, no asset/debt left |

Using the exponential product identity,

$$Pe^{rT}=S_0e^{-qT}e^{rT}=S_0e^{(r-q)T}.$$

A quote above that amount permits the modeled buy/reinvest/short-forward direction. It implies an upper bound if those legs are feasible. For equality, the corresponding reverse comparison must also be feasible, as in the earlier no-income lesson; algebra alone does not grant shorting access.

<a id="reverse-replication"></a>
### The reverse strategy must also handle yield compensation — supplemental

It is not enough to short one unchanged share, ignore its income compensation and invest all proceeds. A mirror of the reinvesting position starts by borrowing and short-selling **$e^{-qT}$ units**. Invest sale proceeds $P$ to $T$ and enter a long forward for one terminal unit.

In this ideal reverse implementation, compensation owed on the currently borrowed units is funded by short-selling incremental units at the current price. The compensation amount divided by that same price determines the added number of units owed. The stock-borrow liability therefore grows proportionally at $q$, from $e^{-qT}$ initially to one unit at $T$. Each incremental sale's cash funds that interval's compensation: there is no free retained income or omitted external cash injection. This requires the strong continuous, fractional, unrestricted borrowing and zero-cost assumptions already stated.

| Reverse replication leg | At 0 | During the interval | At $T$ |
|---|---|---|---|
| Borrow/short initial fraction | Receive $P$ from sale; owe $e^{-qT}$ units | Additional short-sale cash pays income compensation; unit liability grows | Owe one unit |
| Cash investment | Invest $P$ | No withdrawal from delivery investment | Receive $Pe^{rT}$ |
| Long one-unit forward | Zero entry premium | No pre-delivery asset income | Pay $F_0$; receive one unit and return it |
| Combined | Net cash **0** | Net external cash **0** | **$Pe^{rT}-F_0$**, security loan discharged |

A quote below the benchmark then gives the opposite positive receipt. Both feasible directions exclude prices on both sides and establish the source equality. Inaccessible shorting, compensation funding, taxes or discrete constraints can prevent that proof from being executable. This is a model derivation, not a trading instruction or assertion that all assets support this implementation.

<a id="source-example"></a>
## 5. Reproduce every step of the source example

The source supplies $S_0=25$, $r=10\%$, $q=3.96\%$, $T=0.5$, and prints **25.77 dollars**. [L4 p18, middle example; `lecture-4-p018-known-yield-example`](../../sources/annotated/lecture-4/page-018.md#lecture-4-p018-known-yield-example). Interpret both rates as **annual continuous** as stipulated by this source model; do not silently reinterpret 3.96% as a nominal or historical cash-dividend percentage.

For one terminal asset unit:

1. Decimal rates: $r=0.10$, $q=0.0396$; time is **0.5 year**, or six equal months if expressed in months.
2. Net continuous rate: $r-q=0.0604$ per year, or **6.04% annual continuous**, not 6.04 USD.
3. Net exponent: $(r-q)T=0.0604(0.5)=0.0302$.
4. Forward benchmark: $25e^{0.0302}\approx\mathbf{25.766516136769}$ USD/unit.
5. Final cent display: **25.77 USD/unit**, matching the source.

Now verify by a separate quantity-and-funding route:

| Replication quantity/amount | Full-precision result, approximately |
|---|---:|
| Yield exponent $qT$ | 0.0198 |
| Reinvestment unit-growth factor $e^{qT}$ | 1.019997320161 |
| Initial fraction $e^{-qT}$ | 0.980394732647 asset units |
| Initial prepaid cost $25e^{-qT}$ | 24.509868316167 USD |
| Initial fraction times full unrounded growth factor | 1 terminal asset unit |
| Repayment after funding prepaid cost at 10% for 0.5 year | 25.766516136769 USD |

The no-income benchmark at the same spot/rate/time would be $25e^{0.05}\approx26.281777409401$. Yield reduces it by about **0.515261272631 USD at delivery**, not by a cash amount equal to the numerical yield 0.0396. The prepaid cost is lower than spot by about **0.490131683833 USD today**; these two differences have different dates and should not be equated without growth/discounting.

<a id="quote-transfer"></a>
## 6. Direction and quantity checks — supplemental

Keep the source model inputs but supply a hypothetical offered quote **26 USD/unit**. Borrow/buy the initial fraction and reinvest, while shorting the one-unit forward. The terminal profit is $26-25.766516136769\approx\mathbf{0.233483863231}$ USD, or **0.23**. If instead the quote is **25**, the feasible reverse strategy gives $25.766516136769-25\approx\mathbf{0.766516136769}$ USD, or **0.77**. These are conditional model profits; all compensation/funding assumptions remain necessary.

For a supplemental target of **100 terminal units**, start with approximately **98.039473264670 units**, costing **2,450.986831616743 USD** today. Reinvestment supplies 100 units; financing repayment is about **2,576.651613676931 USD**, or **2,576.65** to cents. That is the unrounded theoretical quote scaled before final rounding. If an actual hypothetical contract instead explicitly fixes **25.77 per unit**, its 100-unit delivery payment would be **2,577.00**; it is a different specified rounded quote, not an arithmetic error. Do not silently conflate a displayed per-unit approximation with the unrounded model price.

<a id="model-choice"></a>
## 7. Choose one description for the same income, not two deductions

With the notation now defined, the source comparison is $(S_0-I)e^{rT}$ for known cash amounts versus $S_0e^{(r-q)T}$ for proportional income. In the cash case, $r$ is the delivery-maturity funding rate while each payment inside $I$ uses its own appropriate factor.

| Income information actually supplied | Model operation | What not to do |
|---|---|---|
| Fixed cash amounts at known dates | Find present income $I$ at the appropriate date-specific factors, then finance $S_0-I$ to delivery | Do not subtract a cash amount from an annual rate |
| Known constant continuous proportional yield with the stated reinvestment model | Buy $e^{-qT}$ units for one terminal unit, then finance that smaller purchase | Do not treat $q$ itself as currency or as a guaranteed asset-price return |
| One income stream described twice | Select a consistent representation of that one stream | Do not subtract its PV and also apply its yield adjustment |
| A nominal/annualized market dividend percentage with uncertain future payments | Establish what income is known and which convention applies | Do not assume it is the source's deterministic continuous $q$ |

The expressions are alternatives for the **same** income, not a command to deduct every symbol that appears in a notation list. Different separately specified income streams could require a more carefully derived model, but that is not permission to double count one dividend. The current lesson does not silently combine a cash coupon with the source yield.

<a id="boundaries"></a>
## 8. Boundary checks and economic interpretation — supplemental

For positive spot and positive time, the sign of $r-q$ determines whether the model quote is above or below spot:

| Condition | Consequence | Reason |
|---|---|---|
| $q=0$ | Recover $S_0e^{rT}$ | No reinvested income reduces initial asset quantity |
| $r=q$ | Forward equals spot | Funding and yield adjustments offset in the exponent |
| $q>r$ | Forward below spot | Yield effect exceeds financing effect |
| $T=0$ | Forward equals spot | No interval for either effect; initial quantity for one unit is one |
| Higher $q$ with other inputs fixed | Lower forward quote | Smaller initial fraction is needed |

For a new **100 GBP/unit**, **one-year** example with $r=4\%$ continuous: at $q=0$, the quote is $100e^{0.04}\approx\mathbf{104.081077419239}$; at $q=4\%$, it is **100**; at $q=6\%$, it is $100e^{-0.02}\approx\mathbf{98.019867330676}$. Round final quotes to **104.08**, **100.00**, **98.02 GBP/unit**. Thus a positive funding rate alone does not force forward above spot.

Negative continuous funding rates are mathematically allowed with appropriate model assumptions. With the same 100 GBP spot and one-year horizon but $r=-1\%$, $q=2\%$, the result is $100e^{-0.03}\approx\mathbf{97.044553354851}$, or **97.04**. The factor remains positive. A negative $q$ would require a different economic interpretation, such as a proportional charge, rather than being casually described as positive income. Negative time is not a future-delivery setup. Zero total quantity gives zero total cash; dividing by it to infer a price is invalid.

None of these inequalities says whether the asset's realized spot will rise or fall. They compare today's quoted exchanges under a replication model, not a probability distribution for future prices.

<a id="practice"></a>
## 9. Progressive supplemental practice

<a id="exercise-model-prompt"></a>
### 1. Select and explain the model — outcome 1
Contrast a fixed 1-USD payment with the source 3.96% continuous proportional yield. Define $I,q,r,T$ and units. Explain why a market nominal dividend percentage cannot automatically be substituted for $q$. [Answer](#exercise-model-answer).

<a id="exercise-replication-prompt"></a>
### 2. Derive from units — outcome 1
Show how reinvestment gives one final unit from $e^{-qT}$ initial units, then derive financed cost and the two trade directions. Explain where income compensation appears in the reverse strategy. [Answer](#exercise-replication-answer).

<a id="exercise-source-prompt"></a>
### 3. Reproduce the source example — outcome 2
Compute the exponent, initial fraction, prepaid cost and forward from the source 25/10%/3.96%/0.5 inputs. Verify by financing the smaller purchase. Compare with no-income carry without confusing today's and delivery-date differences. [Answer](#exercise-source-answer).

<a id="exercise-transfer-prompt"></a>
### 4. Quotes and 100 units — outcome 2
Find modeled profits at hypothetical quotes 26 and 25. Scale the replication to 100 terminal units and distinguish the theoretical aggregate from a contract explicitly fixing a rounded 25.77 quote. [Answer](#exercise-transfer-answer).

<a id="exercise-boundaries-prompt"></a>
### 5. Change the yield — outcome 2
For 100 GBP, one year and 4% continuous funding, calculate quotes at yields 0%, 4% and 6%. Then calculate the −1% funding/2% yield case and explain zero-time/quantity limits. [Answer](#exercise-boundaries-answer).

<a id="exercise-double-count-prompt"></a>
### 6. Diagnose duplicate income — outcome 1
A learner subtracts the same dividend's cash PV from spot and then reduces the financing exponent by a yield representing that dividend again. Explain the error and the information needed to choose a consistent model. [Answer](#exercise-double-count-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Explain without the final formula — outcome 1
Teach why proportional income can make a smaller initial holding deliver one asset later, why its cash amount need not be known, and why this does not predict the asset price. State the reinvestment and shorting qualifications. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Audit a numerical report — outcome 2
A report enters $q=3.96$, multiplies by six years for a six-month period, calls 25.77 the contract's current value, and adds reinvested income as another cash profit. Correct the source computation, positions, quantities and cash interpretation. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 10. Separate supplemental answers and diagnosis

<a id="exercise-model-answer"></a>
### Answer 1
The fixed payment is currency per unit at a date; its present value contributes to $I$, also currency per unit. $q=0.0396$ is an annual continuous proportional income rate; $r$ is the annual continuous money-funding rate; $T$ is years. Unknown future asset prices can make proportional cash income uncertain despite known $q$. A nominal/historical/expected percentage lacks the stipulated deterministic continuous income/reinvestment meaning unless separately established. **Retry:** label amount versus rate and date before choosing a formula.

<a id="exercise-replication-answer"></a>
### Answer 2
Reinvested unit count grows by $e^{qT}$; initially buy $e^{-qT}$ units so their product is **one**. Cost is $P=S_0e^{-qT}$; financing to delivery costs $Pe^{rT}=S_0e^{(r-q)T}$. A high quote is tested by borrowing/buying/reinvesting and shorting a one-unit forward. A low quote is tested by the mirror short portfolio, investing initial proceeds and buying one unit forward. During the reverse strategy, incremental short-sale cash funds proportional income compensation; asset liability grows to one unit, returned at delivery. It requires continuous fractional borrowing and no hidden costs. **Retry:** do not short one unchanged unit while omitting its income obligation.

<a id="exercise-source-answer"></a>
### Answer 3
Decimal rates **0.10**, **0.0396**; time **0.5**; net rate **0.0604** and exponent **0.0302**. Yield exponent **0.0198** gives initial units about **0.980394732647** and prepaid cost **24.509868316167 USD**. Quantity times unrounded growth factor **1.019997320161…** is one; funding prepaid cost at factor $e^{0.05}$ gives **25.766516136769 USD**, displayed **25.77**. No-income quote is **26.281777409401**; terminal reduction **0.515261272631**. Today's prepaid saving is **0.490131683833**, which grows to that terminal reduction. **Retry:** keep full precision and do not subtract a rate directly from a currency price.

<a id="exercise-transfer-answer"></a>
### Answer 4
Quote 26: modeled cash-and-carry profit **0.233483863231**, or **0.23 USD**. Quote 25: feasible reverse profit **0.766516136769**, or **0.77**. For 100 final units, initial holding about **98.039473264670**, initial cost **2,450.986831616743**, terminal financed cost **2,576.651613676931**, rounded **2,576.65 USD**. A contract literally fixed at **25.77** per unit instead requires **2,577.00** for 100 units; it is a different rounded contractual price. **Retry:** distinguish model precision from actual quoted delivery terms and include reverse compensation assumptions.

<a id="exercise-boundaries-answer"></a>
### Answer 5
At zero yield: **104.081077419239**, or **104.08 GBP/unit**. Equal 4% rates: **100.00**. Yield 6% exceeds funding 4%: **98.019867330676**, or **98.02**. Funding −1% and yield 2%: **97.044553354851**, or **97.04**. Zero horizon gives spot and no reinvestment interval; zero quantity gives zero total cash but no valid per-unit division. Negative time is outside this setup. **Retry:** inspect the signed net rate and units before evaluating the exponential; a negative exponent does not produce a negative price.

<a id="exercise-double-count-answer"></a>
### Answer 6
The same income benefit has been deducted twice. Use known dated cash payments and their appropriate PV sum, **or** the specified proportional continuous-yield model with reinvestment for that stream. Establish whether amounts/dates are known, whether the yield is genuinely proportional/continuous and what rates/factors apply. Different separately specified streams require a new consistent derivation, not automatic use of every symbol. **Retry:** identify the one actual economic payment represented by each proposed deduction.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation
“Proportional income reinvested at the same asset price buys a proportional increase in units. Under the continuous model, fewer initial units grow to one final unit, lowering the purchase that must be financed. The future cash distributions can depend on uncertain prices even when the unit-growth rate is stipulated. This does not determine the future spot price; a matching forward sale fixes the delivery exchange. Taxes, delays, indivisibility, uncertain yield, costs or blocked shorting can break the simple replication or its reverse. The missing carry concept is bridged here by those actual quantity and cash operations.” **Retry:** explain why price cancels from reinvestment quantity rather than saying the asset's price necessarily grows at $q$.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8
Use **0.0396**, not 3.96, and **0.5 year**, not six years. Compute $25e^{(0.10-0.0396)0.5}\approx25.766516136769$, displayed **25.77 USD/unit**. That is a delivery quote, not current contract value; a consistent fair new forward has zero initial value while retaining future obligations. Buy about **0.980394732647 units** for **24.509868316167** and reinvest all income to obtain one unit; that income is already used to acquire the additional units, not available as another profit. Finance the initial cost and settle the matched forward at delivery. **Retry:** separate percentage conversion, elapsed years, asset units, cash spent on reinvestment and quote versus value before interpreting the result.

<a id="evidence"></a>
## Source presentation and endpoint

The full normalized/raw p18 and original PNG were inspected. The source contains one formula box, one worked numerical example and one cash-versus-yield comparison; it does not contain the supplemental quantity or reverse-compensation ledgers above. No graph or official exercise solution is invented. All three units are canonically verified with no registered issue, which is not approval of this lesson.

[Full normalized p18](../../sources/annotated/lecture-4/page-018.md) · [Unchanged raw p18](../../sources/extracted/lecture-4/page-018.md#page-18) · [Original PNG](../../sources/assets/lecture-4/page-018.png).

The missing carry concept remains pending integration. Next, [existing forward value](lesson-l4-existing-forward-value.md) distinguishes today's delivery quote from the value of a fixed older agreement. Author checks and completed reading do not certify independent teaching approval or learner mastery.
