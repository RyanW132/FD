# Index dividends and forward prices over the actual contract life

<a id="status"></a>
**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all three primary units on Lecture 4 physical p23. The source supplies an index carry formula, a three-month example and a contract-period dividend qualification. Expanded replication, period-weighting examples, monetary conversions, exercises and answers are **supplemental**, not official solutions, current index methodologies or exchange specifications.

Prerequisites: [forward versus futures](lesson-l4-forward-futures-difference.md), [known proportional yield](lesson-l4-known-proportional-yield.md), [L2 index/beta foundations](lesson-l2-indices-and-beta.md), [rate conventions](../concepts/concept-rate-conventions.md#rates-quote) and [numeric units](../concepts/concept-numeric-foundations.md#numeric-units). The planned `concept-replication-and-carry` remains absent; the needed basket and financing reasoning is taught inline.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain and derive:** connect an index point level to a replicating share basket, distinguish price-index income from total-return reinvestment, and derive the carry benchmark using compatible financing and contract-life dividend assumptions. Success requires units, dates, fractional reinvestment, two-direction feasibility, the forward/futures qualification, and an explanation of why benchmark pricing is neither a spot forecast nor a cure for portfolio residual risk.
2. **Compute and audit:** reproduce every source example step, verify it through prepaid basket cost, convert points to monetary exposure only with a supplied multiplier, and select/annualize the dividend input over the actual contract period. Success requires final-only rounding, duration-weighted continuous yields when appropriate, an explicit rejection of irrelevant calendar yields and boundary/risk checks.

<a id="basket"></a>
## 1. An index measures a basket; it is not itself a pile of money

A stock index is a rule-based measure of a collection of shares. Its **level** is quoted in **points**, using a scale set by its methodology. Shares in the component companies are assets; an index level is a measurement of them. A **replicating basket** holds the constituents in quantities that track the relevant index exposure, accounting for the stipulated weights and adjustments. It is not enough to hold unrelated companies and call them the index.

In an idealized construction, choose a currency-per-point scale so that one basket unit's market value equals that scale times the index level. This is a normalization for a model, not an assertion that a real investor can buy “one index point” directly. Replication in practice can require trading many securities, adjusting holdings and meeting costs. No current constituent list, divisor or methodology is asserted here.

A **dividend** is income distributed to shareholders. A **price index** tracks prices without automatically adding all distributed cash back into its level. A **total-return index** includes income under its reinvestment rules. Applying a separate dividend-yield deduction to a total-return exposure without checking its definition can double count income. The source's dividend-yield model treats the indexed investment asset as paying separate income. It does not authorize using every index type identically.

<a id="notation"></a>
## 2. Define rates, time, points and currency before calculating

| Symbol | Meaning |
|---|---|
| $0$ and $T$ | Today and expiry; in exponential expressions $T\geq0$ is elapsed years to expiry |
| $S_0>0$ | Current index level, in points, not USD |
| $S_T$ | Uncertain terminal index level, points |
| $F_{0,T}$ or $F_0$ | Current fair forward delivery quote for expiry $T$, points |
| $r$ | Relevant annual continuous risk-free funding rate, decimal per year, for this currency/horizon benchmark |
| $q$ | Annual continuous proportional dividend yield used over the actual contract life, decimal per year |
| $b_0$ | Fraction of a normalized basket unit initially required to obtain one unit at expiry through reinvestment |
| $P_0$ | Prepaid cost expressed in index-point-equivalent units before choosing a monetary scale |
| $M>0$ | A separately supplied multiplier, currency per index point per contract |
| $N\geq0$ | Number of contracts when converting exposure or gains into total currency |
| $K$ | Fixed quote in a particular existing forward, points; distinct from today's fair new quote |

A **continuous annual rate** $r$ makes a money amount grow by $e^{rT}$ over $T$ years. The exponential function obeys $e^{a+b}=e^ae^b$ and $e^0=1$; all its values are positive. Discounting reverses growth by multiplying by $e^{-rT}$. Annual rate times years is dimensionless. Under the source example's equal-month convention, three months is $3/12=0.25$ year, not three years.

The **risk-free** rate is a model financing/discount benchmark for specified currency and dates. It does not mean the equity basket is risk-free, or that all actual investors can borrow at that rate. A term-structure model could use appropriate date-specific factors; the source example stipulates one annual continuous rate for its horizon. We do not import an unstated later compounding rule.

The **known continuous yield** model specifies proportional income and costless immediate reinvestment in the same basket. It is not the same thing as a fixed dollar dividend. A forward holder does not own the basket before delivery and therefore does not collect its pre-delivery dividends. A quoted expected or historical market dividend percentage is not automatically a guaranteed deterministic continuous $q$.

<a id="pricing"></a>
## 3. Derive the index carry benchmark

The source treats a stock index as an investment asset paying dividend yield $q$ and gives, under standard assumptions,

$$F_{0,T}=S_0e^{(r-q)T}.$$

[L4 p23, upper definition and formula; `lecture-4-p023-index-pricing`](../../sources/annotated/lecture-4/page-023.md#lecture-4-p023-index-pricing).

**Supplemental basket derivation:** when income is proportional to the basket's current value and reinvested at that same value, the amount of extra basket units bought is proportional to units already held. The uncertain price cancels in “income cash divided by current price.” In the continuous model, unit count grows by $e^{qT}$; this is not a prediction that index prices grow at $q$.

To have one normalized basket unit at expiry, buy the smaller fraction

$$b_0=e^{-qT}.$$

Reinvesting its income gives $b_0e^{qT}=1$ unit at expiry. The initial purchase cost in point-equivalent units is $P_0=S_0e^{-qT}$. Finance that cost to expiry:

$$P_0e^{rT}=S_0e^{-qT}e^{rT}=S_0e^{(r-q)T}.$$

To make the cash interpretation explicit, multiply every point-equivalent amount by the **same** chosen currency-per-point scale. A positive scale multiplies both sides and cancels when solving for the point quote; it does not change the benchmark number of points.

| Replication leg — supplemental | Today | During contract life | Expiry |
|---|---|---|---|
| Buy reinvesting basket fraction | Pay the currency equivalent of $P_0$ | All dividend income buys more of the same basket | Own one basket unit |
| Matched cash borrowing | Receive that purchase cost | No extra external flow under the model | Repay its currency equivalent grown by $e^{rT}$ |
| Short matching forward | Zero fair entry premium in the benchmark | No asset dividend entitlement | Deliver the basket or match its contractually compatible settlement value; receive the currency equivalent of $F_0$ |
| Combined | Net cash zero | Net external income zero, since reinvested | Quote less funded cost; matched terminal basket exposure cancels |

If an executable offered quote is above funded basket cost, that buy/reinvest/short-forward direction has a positive modeled residual. The reverse direction requires borrowing/shorting the basket, investing usable proceeds and taking a long forward, including dividend compensation. As explained in the yield prerequisite, a mirror reinvestment strategy can require incremental fractional short sales to finance that compensation and grow the borrowed-basket obligation to the final required unit. Ignoring compensation does not prove the lower bound.

**Conditions matter:** exact matching basket and settlement reference, divisible/rebalanceable holdings, known modeled yield, costless immediate reinvestment, no taxes/transaction costs, symmetric available financing, compatible timing, and performance/shorting access are assumed. Constraints can obstruct a two-sided equality. Cash-settled index contracts require matched index-value exposure at the settlement reference, not literal delivery of a nonexistent physical “index.” Replication error, differing settlement reference times and trading costs can matter.

The source page is titled **Stock-Index Futures**. The formula is the forward carry benchmark; it also gives the futures quote when the preceding lesson's deterministic-rate/matching-terms assumptions justify forward/futures equality, or as an expressly stated approximation. With uncertain rate/settlement effects, the equality is not automatic. Calling the index formula a forecast of future spot would be a different, unsupported claim.

<a id="source-example"></a>
## 4. Reproduce the complete source three-month example

The source gives **1,300 points**, **5% funding**, **1% dividend yield**, and **three months**, using $T=0.25$. Its displayed quote is **1,313.07**. [L4 p23, middle example; `lecture-4-p023-index-example`](../../sources/annotated/lecture-4/page-023.md#lecture-4-p023-index-example).

Interpret both rates as annual continuous under this formula, and retain the stipulated contract-period yield model. For the futures interpretation, use the deterministic benchmark just stated. No multiplier or currency contract value is supplied on this source page.

| Step | Calculation | Meaning and unit |
|---|---|---|
| Convert time | $3/12=0.25$ | Years |
| Convert percentages | $r=0.05$, $q=0.01$ | Annual continuous decimal rates |
| Net carrying rate | $r-q=0.04$ | 4% annual continuous, not four points |
| Funding exponent | $rT=0.0125$ | Dimensionless |
| Yield exponent | $qT=0.0025$ | Dimensionless |
| Net exponent | $(r-q)T=0.0100$ | Dimensionless, not 1% guaranteed index return |
| Growth factor | $e^{0.01}\approx1.010050167084$ | Positive dimensionless factor |
| Fair quote | $1300e^{0.01}\approx\mathbf{1313.065217209418}$ | Index points |
| Final display | **1,313.07** | Points, rounded to two decimals as in the source |

**Independent prepaid-basket check — supplemental expanded calculation:**

1. Initial basket fraction $e^{-0.0025}\approx\mathbf{0.997503122397}$.
2. Point-equivalent purchase cost $1300e^{-0.0025}\approx\mathbf{1296.754059116698}$.
3. Reinvested basket-growth factor $e^{0.0025}\approx\mathbf{1.002503127606}$; full-precision fraction times that factor is exactly one in the model.
4. Finance the purchase by $e^{0.0125}\approx\mathbf{1.012578451541}$; the result is again **1313.065217209418 points** using full intermediates.

Without dividend income, the same funding/time inputs give $1300e^{0.0125}\approx\mathbf{1316.351987002825}$ points. The yield lowers that terminal quote by approximately **3.286769793406 points**. Today's prepaid purchase is lower than the current index by approximately **3.245940883302 point-equivalent units**. These two savings have different dates; funding the present saving produces the terminal saving.

The source quote exceeds 1,300 because **5% funding exceeds 1% yield over this positive interval**, not because the index is certain to rise. Dividend yield lowers carry relative to the no-dividend comparison, but does not necessarily put the quote below spot.

<a id="money"></a>
## 5. Convert points only after supplying a multiplier — supplemental

Introduce a hypothetical multiplier **20 USD/point/contract** and **three contracts**. These are new classroom inputs, **not p23 data or an asserted current exchange specification**.

- One contract's quoted notional using the unrounded model quote is $20F_0\approx\mathbf{26261.304344188369}$ USD, displayed **26,261.30**.
- Three-contract notional is $3(20)F_0\approx\mathbf{78783.913032565108}$ USD, displayed **78,783.91**.
- If an actual hypothetical quote is explicitly fixed at the displayed **1,313.07 points**, notional is instead **26,261.40 per contract** or **78,784.20 for three**. That is a different rounded quote, not an exact equality with the theoretical unrounded value.

Notional is not the current value of a fair new contract or a margin deposit. The source does not give initial/maintenance margin or a current contract acquisition price, so none is inferred from these amounts.

For a separate hypothetical **daily** futures quote move from **1,313.07 to 1,320.07 points**, change is **+7 points**. Three longs receive $3(20)(7)=\mathbf{420}$ USD in variation margin; three shorts pay **420 USD**. This is a money gain on a price change, not the notional itself. A reverse seven-point move reverses the signs. Reinvestment/funding of these transfers needs the preceding lesson's timing treatment; the daily cash amount alone is not a complete financed profit.

<a id="dividend-period"></a>
## 6. Use the dividend input for the life of this contract

The source says the yield should correspond to dividends **expected during the life of the contract**. [L4 p23, last paragraph; `lecture-4-p023-index-dividend-period`](../../sources/annotated/lecture-4/page-023.md#lecture-4-p023-index-dividend-period).

There are two levels of claim:

1. **Exact model replication** assumes the relevant proportional yield path is known with the stated reinvestment convention.
2. **Applied estimation** may insert expected dividends or an estimated yield. That is a conditional benchmark based on assumptions, not a guarantee that distributions occur as expected or that the replication is riskless in reality.

Preserve both: the source's practical word “expected” does not convert uncertain dividends into known future cash. It also does not tell us that the quoted 1% is a yield for the whole calendar year independent of contract dates. It is the annualized continuous input relevant to this three-month life.

The annual continuous input **1%** is multiplied by **0.25 year once**, giving yield exponent **0.0025**. It is not a 1% total yield during the quarter. The model's reinvested unit growth over that quarter is $e^{0.0025}-1\approx0.002503127606$, or **0.250312760580%**; 0.25% is the continuous exponent expressed as a percentage, not exactly that effective growth. Do not divide the annual rate by four and then also multiply by a quarter-year as though the new rate were still annual.

<a id="weighted-period"></a>
### A changing continuous yield: weight only the relevant durations — supplemental

Suppose a different three-month contract has a known annual continuous yield of **0% for its first month** and **3% for its remaining two months**. Keep spot1,300 and funding5%. These are not source values.

Define $q_j$ as the annual continuous yield in segment $j$, and $\Delta t_j$ as that segment's length in years. The subscript labels a segment, not a power. Define $Y$ as the total continuous yield exponent during the contract and $\bar q$ as its equivalent annual continuous average over positive life $T$:

$$Y=\sum_j q_j\Delta t_j,\qquad \bar q=\frac{Y}{T},\qquad T=\sum_j\Delta t_j>0.$$

Why weight this way? Reinvestment factors multiply across segments: $e^{q_1\Delta t_1}e^{q_2\Delta t_2}=e^{q_1\Delta t_1+q_2\Delta t_2}$. Thus the continuous exponents add. An equivalent constant annual yield must satisfy $\bar qT=Y$. This derivation applies to the **specified continuous proportional model**, not a mechanical arithmetic average of arbitrary discrete dividend yields.

For the stipulated segments:

| Segment | Duration in years | Annual continuous yield | Contribution to $Y$ |
|---|---:|---:|---:|
| First month | $1/12$ | 0 | 0 |
| Next two months | $2/12$ | 0.03 | 0.005 |
| Total | $3/12=0.25$ | Equivalent $\bar q=0.005/0.25=0.02$ | **0.005** |

The equivalent annual yield is **2%**, not the unweighted mean of the two quoted numbers, 1.5%. The second rate applies for twice as long. The quote is

$$F_0=1300e^{rT-Y}=1300e^{0.0125-0.005}=1300e^{0.0075}
\approx\mathbf{1309.786654077894}\text{ points}.$$

Final display **1,309.79 points**. Computing with the weighted annual yield, $1300e^{(0.05-0.02)0.25}$, gives the same full-precision result. Using the incorrect unweighted 1.5% gives exponent **0.00875** and quote **1311.424911092811**, displayed **1,311.42**: a different model/input, not a harmless rounding choice.

<a id="calendar-trap"></a>
### Why even a correctly computed calendar average can be wrong here

In a deliberately separate supplemental comparison, suppose those three relevant months have equivalent yield2%, while the **other nine months outside the contract** have annual continuous yield8%. The duration-weighted twelve-month average is $0.25(0.02)+0.75(0.08)=0.065$, or **6.5%**. It is a valid average for that invented full-year path, but it is the **wrong interval** for this three-month contract.

Inserting6.5% into the quarter-year formula gives exponent $(0.05-0.065)0.25=-0.00375$ and quote **1295.134129209922**, displayed **1,295.13**. That even reverses the above/below-spot conclusion relative to the correctly matched **1,309.79**. The error is not in averaging arithmetic; it is in including income outside the contract life. Payment-date entitlement at the exact start/end also needs the contract and index convention; do not include an already-paid dividend or invent delivery-date ownership rules.

For known **fixed cash dividends**, use their appropriate dated present values in the cash-income model instead of casually inferring a continuous proportional yield. Describing the same dividend in both models is not permission to subtract it twice.

<a id="risk-boundaries"></a>
## 7. Pricing the index is different from eliminating equity or portfolio risk

- **Market risk:** the future index level can change. The carry formula relates today's spot and delivery quote under assumptions; it supplies neither a guaranteed future spot nor a probability distribution.
- **Dividend/model risk:** estimated dividends, constituent weights, reinvestment, funding and execution may differ from assumptions. A known model parameter and a real-world forecast are not interchangeable.
- **Tracking and basis risk:** an actual basket or hedge may not match the quoted index and settlement reference. Here basis means a spot-versus-derivative quote difference in compatible point units; its changes can affect a hedge closed before expiry.
- **Portfolio residual risk:** a different equity portfolio need not be the index basket. Its **beta** is an estimated sensitivity of consistently measured portfolio returns to a specified market/index return. It is not the dividend yield or the index's carrying rate. **Residual** means the movement not explained by that market relationship. Reducing the beta-related component does not remove company/sector, estimation or funding risks, and beta zero does not make the portfolio risk-free.

The L2 hedge-sizing question asks how much index exposure can offset a portfolio's market sensitivity. This lesson's carry question asks what delivery quote is consistent with a matched index basket and financing/income. A correct carry quote does not certify an exact hedge for an unrelated portfolio. No new beta-sizing formula is needed to understand that distinction.

**Supplemental boundary checks:** with the source spot1,300 and T0.25, zero yield recovers **1,316.351987002825** points. If yield equals funding5%, the quote is **1,300**. If yield instead is **7%** at the same funding5%, the exponent is **−0.005**, quote $1300e^{-0.005}\approx\mathbf{1293.516222950487}$, displayed **1,293.52**. Thus positive funding alone does not guarantee above-spot carry. At zero time, the quote equals spot and no future dividend interval remains; do not divide by zero time to form $\bar q$. Positive time and increasing yield lower the benchmark. Zero contract count gives zero total notional/gain, but no meaningful division by that count. Negative time or an omitted multiplier is not repaired by guessing.

<a id="practice"></a>
## 8. Progressive supplemental practice

<a id="exercise-basket-prompt"></a>
### 1. Explain the object and model — outcome 1
Explain points, replicating basket, price versus total-return exposure, proportional yield and funding rate. Derive the smaller initial holding and why the income cannot also be counted as extra free cash. State what is needed for the source's futures interpretation. [Answer](#exercise-basket-answer).

<a id="exercise-source-prompt"></a>
### 2. Reproduce p23 — outcome 2
Compute every source input conversion, exponent, factor and quote. Check through the prepaid fraction/cost and compare no-income carry, retaining dates and full precision. [Answer](#exercise-source-answer).

<a id="exercise-money-prompt"></a>
### 3. Convert the quote, not the concept — outcome 2
Using the supplemental multiplier20 and three contracts, calculate unrounded-model notionals and notionals for an explicitly fixed1,313.07 quote. Find daily cash for a seven-point increase for longs/shorts. Identify what the source does not supply. [Answer](#exercise-money-answer).

<a id="exercise-period-prompt"></a>
### 4. Choose and annualize the contract-period yield — outcome 2
Compute $Y,\bar q$ and the quote for the supplemental first-month0%/next-two-months3% continuous-yield contract. Explain why using1.5% is wrong and show its different result. [Answer](#exercise-period-answer).

<a id="exercise-calendar-prompt"></a>
### 5. Diagnose the outside-period average — outcome 2
Add the stipulated nine outside months at8%. Calculate the twelve-month average and the incorrect quarter-year quote from it. Explain why the correctly weighted annual average still cannot replace the contract-life input. Interpret the source1% annual yield over a quarter without dividing time twice. [Answer](#exercise-calendar-answer).

<a id="exercise-boundaries-prompt"></a>
### 6. Test model and risk limits — outcome 2
At source spot/time/funding, calculate zero/equal5%/higher7% yield quotes and zero-time result. Does the above-spot source quote predict the index's realized return or remove a different portfolio's residual risk? [Answer](#exercise-boundaries-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach an analyst what must be specified — outcome 1
Explain contract dates, index exposure definition, income/reinvestment convention, currency/continuous funding, shorting/settlement assumptions and a multiplier only when currency is requested. Distinguish known model yield from expected dividends, and carry pricing from beta hedging. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Repair a pricing note — outcome 2
A note uses T=3 years for the source three months, calls1,313.07 dollars the current value of the contract, deducts its dividends twice, and substitutes a calendar6.5% for the supplied contract-period1%. Correct the source computation and explain which supplemental example, if any, actually uses6.5%. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 9. Separate supplemental answers and diagnosis

<a id="exercise-basket-answer"></a>
### Answer 1
An index level is points; a normalized basket is a model holding of constituents tracking that exposure. A price index and a total-return reinvestment measure require different income treatment. Under known continuous proportional yield, initially hold $e^{-qT}$ basket units, reinvest to obtain one at expiry, and finance cost $S_0e^{-qT}$ to get $S_0e^{(r-q)T}$ points. Income spent acquiring extra units cannot also be retained as free cash. Currency scaling must be consistent; multiplier is supplied separately. The futures equality additionally needs the deterministic-rate/matching-terms benchmark or an explicitly stated approximation. **Retry:** distinguish quantity growth, index-price growth, dividends and funding.

<a id="exercise-source-answer"></a>
### Answer 2
Time **3/12=.25 year**; rates **.05/.01**; net rate **.04**, funding exponent **.0125**, yield exponent **.0025**, net exponent **.01**. Factor **1.010050167084…** gives quote **1313.065217209418…**, displayed **1,313.07 points**. Initial fraction **.997503122397…**, prepaid point-equivalent cost **1296.754059116698…**; reinvestment factor **1.002503127606…** restores one basket, funding factor **1.012578451541…** restores the same quote. No-income quote **1316.351987002825…** exceeds it by **3.286769793406…** at expiry; today's purchase saving is **3.245940883302…**, which must be funded before comparison. **Retry:** preserve full precision, annual rate units and the date of each saving.

<a id="exercise-money-answer"></a>
### Answer 3
At the full-precision model quote, per-contract notional **26,261.304344188369… USD**, final **26,261.30**; three-contract total **78,783.913032565108…**, final **78,783.91**. At the actual hypothetical rounded quote1,313.07, amounts are **26,261.40** and **78,784.20**. Daily +7 points gives **+420 USD** for three longs, **−420** for three shorts. The multiplier/count are supplements; p23 supplies no margin amount, currency contract value, actual exchange lot or guaranteed future spot. **Retry:** notional, daily gain and current contract value are distinct.

<a id="exercise-period-answer"></a>
### Answer 4
First contribution **0×1/12=0**; second **.03×2/12=.005**. Total **T=.25**, so equivalent annual continuous yield **.005/.25=.02=2%**. Net exponent **.0125−.005=.0075** gives **1309.786654077894…**, or **1,309.79 points**. Unweighted1.5% ignores the two-to-one durations; it gives exponent **.00875** and **1311.424911092811…**, or **1,311.42**. These are different inputs, not roundoff. **Retry:** add segment exponents, then divide by the total relevant years only if an annual equivalent is needed.

<a id="exercise-calendar-answer"></a>
### Answer 5
Full-year average **.25(.02)+.75(.08)=.065=6.5%**. It includes nine months outside delivery life. Wrong quarter exponent **(.05−.065).25=−.00375**, wrong quote **1295.134129209922…**, or **1,295.13**, instead of the matched **1,309.79** for the changing-yield example. The source1% over a quarter gives exponent **.01×.25=.0025** and effective reinvested unit growth **.002503127606…=0.250312760580…%**, not a full1% quarter gain or exactly0.25% effective growth. **Retry:** pick the actual interval first; annualizing does not make an irrelevant interval relevant.

<a id="exercise-boundaries-answer"></a>
### Answer 6
Zero yield: **1316.351987002825…**, or **1,316.35**. Yield equals funding5%: **1,300**. Yield7% gives exponent **−.005**, quote **1293.516222950487…**, or **1,293.52**. Zero time gives **1,300**, with no future dividend interval; $\bar q=Y/T$ is not evaluated at T0. The source above-spot quote is a carry relation, not a guaranteed index rise. An unrelated portfolio can retain company/sector residual, basis, estimation and funding risk even after reducing beta exposure. **Retry:** separate benchmark pricing, realized market movement and hedge fit.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation
“State the start/expiry and year fraction, the exact indexed exposure, and whether income is separate or already reinvested in the measure. A known annual continuous proportional yield over that life supports a fractional-basket reinvestment derivation; expected market dividends make the answer conditional. Use matching continuous funding and state trading, short-compensation, settlement and performance assumptions. Quote the result in points; add a supplied currency multiplier only for money exposure/gains, not to reinterpret notional as value. A calendar average can be the wrong period. Carry prices a matching index claim, while beta hedging approximates a different portfolio's market sensitivity and leaves residual risk.” **Retry:** name the assumption that would fail before labelling a deviation guaranteed arbitrage.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8
Use **.25 year**, **r=.05**, **q=.01**, so exponent **.01** and quote **1313.065217209418…≈1,313.07 points**. The source does not supply a dollar multiplier or initial margin; a fair new contract's value is zero in the model, not1,313.07. Do not deduct the same income as cash PV and yield, or apply a separate dividend deduction to an already income-reinvesting index without checking exposure. The **6.5%** belongs only to the supplemental twelve-month path and is deliberately shown as an inappropriate substitute for its three-month life; it is not the source yield. **Retry:** fix dates, object/units and income model before interpreting the formula.

<a id="evidence"></a>
## Evidence and stopping point

All full normalized/raw p23 and its original PNG were inspected. The source has an index-pricing formula, a boxed three-month result and a last-period qualification; it has no currency multiplier, seasonal table or official exercise answers. The three source units are canonically verified with no registered issue; that does not approve this draft. All extra tables, period examples, conversions and answers are labelled supplemental.

[Full normalized p23](../../sources/annotated/lecture-4/page-023.md) · [Unchanged raw p23](../../sources/extracted/lecture-4/page-023.md#page-23) · [Original PNG](../../sources/assets/lecture-4/page-023.png).

Carry-concept integration and independent teaching review remain pending. No current market-methodology assertion, restricted textbook or private learner material was used. This completes the assigned two-lesson author slice, not publication or taught coverage.
