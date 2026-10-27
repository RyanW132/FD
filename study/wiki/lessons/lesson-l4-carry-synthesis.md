# Unify replication, value and applications

<a id="status"></a>
**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all eight primary units on Lecture4 physical p32: the seven summary statements and the unifying principle. Each statement is cited precisely and linked to the earlier source pages and lessons where it was derived. Recap tables, the replication recipe, the new-asset application, the later valuation, the consumption-commodity contrast, exercises and answers are **supplemental**. They are not official solutions, current market data or trading advice.

Immediate prerequisite: [contango, backwardation and formula selection](lesson-l4-curve-shape-and-formula-selection.md). The [replication and carry reference](../concepts/concept-replication-and-carry.md#carry-replication) and the [existing forward value reference](../concepts/concept-forward-contract-value.md#value-derivation) are compact lookups for the two ideas this lesson joins together. Every section names the full lesson to revisit if a step feels unfamiliar.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain and connect:** reconstruct each of the seven source summary statements and the unifying principle with its formula or strategy, its conditions and its main limitation, and say where it was derived. Success requires keeping apart: quote and value; cash amounts and proportional rates; investment and consumption assets; forward and futures settlement; quotation direction; and model arbitrage versus a guaranteed profit.
2. **Apply to a new asset:** build a replication for an asset with stated features, compute its benchmark, choose the arbitrage direction or explain why only a bound holds, value an existing contract later, and diagnose a price that differs from the replication cost. Success requires dated legs, full precision until the final display, remaining income and time measured from the valuation date, and every assumption stated.

<a id="roadmap"></a>
## 1. How the summary fits together

The final slide lists seven statements and then a unifying principle. Read them as one idea seen from several sides: **a forward promises delivery later; you can build that delivery today from spot-market trades; the cost of building it is the benchmark.**

| Summary statement | Section | Where it was derived |
|---|---|---|
| Forward prices follow from spot and net carry | 3 | [Pricing benchmark](lesson-l4-pricing-benchmark.md#carry-notation), [commodity carry table](lesson-l4-commodity-storage-and-convenience.md#carry-table) |
| Cash-and-carry and reverse cash-and-carry | 4 | [No-income replication](lesson-l4-no-income-replication.md#no-income-price), [short sales](lesson-l4-assets-short-sales-and-settlement.md#short-mechanics) |
| Cash income and yields need different formulas | 5 | [Known cash income](lesson-l4-known-cash-income.md#income-replication), [proportional yield](lesson-l4-known-proportional-yield.md#model-choice) |
| Value of an existing forward is not its price | 6 | [Existing forward value](lesson-l4-existing-forward-value.md#offset-portfolio) |
| Daily settlement and uncertain rates | 7 | [Forward/futures difference](lesson-l4-forward-futures-difference.md#uncertain-rates) |
| Currency follows covered interest parity | 8 | [Currency parity](lesson-l4-currency-parity.md#parity) |
| Commodities: storage and convenience | 9 | [Commodity carry](lesson-l4-commodity-storage-and-convenience.md#proportional) |
| Unifying principle | 10 | All of the above |

<a id="notation"></a>
## 2. One notation for the whole lecture

| Symbol | Meaning and unit |
|---|---|
| $t$, $T$ | A later valuation date and delivery, in years after inception (date zero); $0\leq t\leq T$ |
| $S_0,S_t,S_T$ | Spot price today, at $t$ and at delivery, currency per unit |
| $F_{0,T},F_{t,T}$ | Fair forward quote set at 0 or at $t$ for delivery at $T$ |
| $K$ | Delivery price fixed in an **existing** contract |
| $f_t$ | Value at $t$ of an existing **long** forward, currency per unit today |
| $r$ | Annual continuous funding rate for the relevant period, decimal |
| $I$ / $I_t$ | Present value at 0 / at $t$ of known cash income paid before delivery |
| $U$ | Present value of known cash storage payments |
| $q,u,y$ | Proportional income yield, storage cost and convenience yield, annual continuous |
| $c=r+u-q-y$ | Net cost of carry, applicable terms only |
| $r_d,r_f$ | Domestic and foreign rates for a quote in domestic currency per foreign unit |

A **quote** ($F$, $K$) is an exchange price for future delivery; a **value** ($f_t$) is what a contract is worth now. Rates are decimals per year, and amounts are money per unit.

<a id="carry"></a>
## 3. Forward prices come from spot and the net cost of carry

The source summary states that forward prices follow from spot prices and the net cost of carry. [L4 p32, first bullet; `lecture-4-p032-summary-carry`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-carry).

**What it means.** Holding the asset from today until delivery costs financing and sometimes storage, and may bring income or usefulness. The forward price is spot adjusted for exactly those dated costs and benefits. For proportional terms the source's general relation is $F_{0,T}=S_0e^{cT}$ with $c=r+u-q-y$ ([L4 p28](../../sources/annotated/lecture-4/page-028.md#lecture-4-p028-net-carry-definition)). Known cash amounts enter as money: subtract income PV $I$, add storage PV $U$.

**Why it is not a forecast.** The expected future spot is absent from every formula. The forward is the cost of carrying the asset, as the curve-shape lesson showed. A positive carry gives contango and a large enough benefit gives backwardation, whatever anyone expects.

<a id="arbitrage"></a>
## 4. Cash-and-carry for a high forward, reverse cash-and-carry for a low one

The source summary states that cash-and-carry addresses an overpriced forward, and reverse cash-and-carry addresses an underpriced forward when short selling is possible. [L4 p32, second bullet; `lecture-4-p032-summary-arbitrage`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-arbitrage).

| Strategy | Use when | Today, net zero cash | At delivery |
|---|---|---|---|
| **Cash-and-carry** | Quote above replication cost | Borrow, buy the asset, short the forward | Deliver the asset, receive the quote, repay the loan |
| **Reverse cash-and-carry** | Quote below replication cost | Short-sell the asset, invest the proceeds, go long the forward | Collect the investment, pay the quote, return the asset |

**Source numbers recomputed.** Spot 40, 5% continuous, three months: replication cost $40e^{0.0125}\approx\mathbf{40.503138061625}$. At quote 43, cash-and-carry locks $43-40.503138061625\approx2.496861938375$, the source's **2.50** ([L4 p12](../../sources/annotated/lecture-4/page-012.md#lecture-4-p012-overpriced-profit)). At quote 39, reverse cash-and-carry locks $40.503138061625-39\approx1.503138061625$, the source's **1.50 before stock-borrowing costs** ([L4 p13](../../sources/annotated/lecture-4/page-013.md#lecture-4-p013-underpriced-profit)).

**The condition matters.** Only the reverse trade needs a short sale. If short selling is impossible and you do not own the asset, a low quote is **not** an accessible arbitrage. The source keeps only the upper bound $F_{0,T}\leq S_0e^{rT}$ from cash-and-carry ([L4 p14](../../sources/annotated/lecture-4/page-014.md#lecture-4-p014-restricted-short-consequence)). Existing owners can sometimes enforce the lower side by selling and buying forward; consumption-asset owners often cannot.

<a id="income"></a>
## 5. Known cash income and proportional yields need different formulas

The source summary states that known cash income and proportional yields require different formulas. [L4 p32, third bullet; `lecture-4-p032-summary-income`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-income).

| Income description | Formula | Source example, recomputed |
|---|---|---|
| Known **cash amounts** with PV $I=\sum_j I_je^{-r_jt_j}$ | $(S_0-I)e^{rT}$ | Bond 900, coupon 40 in four months at 3%, nine months at 4%: $I\approx39.601993349967$, forward **886.601026957095** (886.60) |
| **Proportional** yield $q$ | $S_0e^{(r-q)T}$ | Spot 25, $r=10\%$, $q=3.96\%$, half a year: $25e^{0.0302}\approx$**25.766516136769** (25.77) |

**Why two formulas.** A fixed coupon is money at a date, so you discount it and subtract it from spot. A yield is a percentage of the asset's value, so you hold fewer units today and let reinvested income grow them, $e^{-qT}$ units growing to one. Choose **one** description for a given income stream; deducting a dividend once as $I$ and again as $q$ double counts it. The source's bond arbitrage uses the same benchmark: quote 910 gives $910-886.601026957095\approx23.398973042905$ (23.40), and quote 870 gives $886.601026957095-870\approx16.601026957095$ (16.60) ([L4 p17](../../sources/annotated/lecture-4/page-017.md#lecture-4-p017-income-overpriced-strategy)). The reverse version needs the bond to be borrowable and the short seller to pay the coupon to the lender.

<a id="value"></a>
## 6. An existing forward's value is not its current forward price

The source summary states that the value of an existing forward is not the same as its current forward price. [L4 p32, fourth bullet; `lecture-4-p032-summary-value`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-value).

An existing long has a **fixed** delivery price $K$. Today's fair quote for a new matching contract is $F_{t,T}$. Offset the old long with a new fair short, and the asset deliveries cancel. What is left is a certain cash difference $F_{t,T}-K$ at delivery. Its value today is

$$f_t=(F_{t,T}-K)e^{-r(T-t)},$$

and a short is worth $-f_t$ ([L4 p20](../../sources/annotated/lecture-4/page-020.md#lecture-4-p020-discounted-forward-value)). At fair inception $K=F_{0,T}$ and the value is zero, although the delivery obligation is not zero.

**Source example recomputed** ([L4 p21](../../sources/annotated/lecture-4/page-021.md#lecture-4-p021-existing-forward-value-example)): $K=24$, spot 25, 10%, six months remaining. Today's quote is $25e^{0.05}\approx26.281777409401$ (26.28), and the value is $25-24e^{-0.05}\approx$**2.170493811983** (2.17). The two numbers answer different questions. 26.28 is what a new contract would ask; 2.17 is what the old contract is worth.

<a id="settlement"></a>
## 7. Daily settlement can separate futures and forward prices

The source summary states that daily settlement can create a difference between futures and forward prices when interest rates are uncertain. [L4 p32, fifth bullet; `lecture-4-p032-summary-settlement`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-settlement).

A forward settles once, at delivery. A futures contract settles **gains and losses every day** through variation margin, and those cash flows are reinvested or financed until delivery. When rates are **deterministic**, meaning known in advance, the futures and forward prices are equal for the same asset and date ([L4 p22](../../sources/annotated/lecture-4/page-022.md#lecture-4-p022-deterministic-rates)). When rates are uncertain, the timing matters:

| If a long futures position's gains tend to arrive when… | Gains are reinvested at… | Tendency |
|---|---|---|
| rates are high | favourable rates | futures price above the forward price |
| rates are low | unfavourable rates | futures price below the forward price |

The difference comes from the timing and reinvestment of daily cash flows, not from a different terminal payoff ([L4 p22](../../sources/annotated/lecture-4/page-022.md#lecture-4-p022-variation-margin-mechanism)). The source gives **tendencies**, not a size. A small observed futures–forward gap is therefore not proof of arbitrage when rates are uncertain. The carry formulas in this lecture price **forwards**; applying them to futures quotes uses the deterministic-rate qualification.

<a id="currency"></a>
## 8. Currency pricing follows covered interest parity

The source summary states that currency pricing follows covered interest parity. [L4 p32, sixth bullet; `lecture-4-p032-summary-currency`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-currency).

With $S_0$ in domestic currency per foreign unit, $F_{0,T}=S_0e^{(r_d-r_f)T}$ ([L4 p24](../../sources/annotated/lecture-4/page-024.md#lecture-4-p024-covered-interest-parity)). The replication buys $e^{-r_fT}$ foreign units today, deposits them to reach one unit at $T$ and finances the domestic cost. A foreign deposit behaves like an asset paying the yield $r_f$. **Covered** means the future exchange is locked by the forward, so no forecast of $S_T$ is needed. Source example: 0.9800 USD per AUD, 1% and 3%, two years gives $0.9800e^{-0.04}\approx$**0.941573650369** (0.9416). The source's low-quote arbitrage at 0.9300 locks **12.289324939036** USD, displayed 12.29 ([L4 p26](../../sources/annotated/lecture-4/page-026.md#lecture-4-p026-currency-arbitrage-profit)). Inverting the quote swaps the rates in the formula.

<a id="commodity"></a>
## 9. Commodity pricing may include storage and convenience yield

The source summary states that commodity pricing may include storage costs and convenience yield. [L4 p32, seventh bullet; `lecture-4-p032-summary-commodity`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-commodity).

Storage is a cost of holding the physical good, so it **raises** the forward. With a known cash bill of PV $U$ the source uses $(S_0+U)e^{rT}$. The source example of 450 spot, 7% and 2 due at year end gives **484.628681564397** (484.63) ([L4 p29](../../sources/annotated/lecture-4/page-029.md#lecture-4-p029-storage-forward-example)). With proportional terms it uses $S_0e^{(r+u-y)T}$. Convenience yield is the **non-cash** benefit of having inventory available, so it **lowers** the forward. A consumption-asset owner may not give up that benefit, which is why reverse cash-and-carry may be unavailable ([L4 p27](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-consumption-inventory-benefit)). Buying and storing can still cap the forward from above when it is feasible.

<a id="unifying-principle"></a>
## 10. The unifying principle

The source's closing box: replicate future delivery using spot-market borrowing, lending, ownership and income. If the derivative price differs from the replication cost, investigate the arbitrage and the assumptions it requires. [L4 p32, lower unifying-principle box; `lecture-4-p032-summary-replication`](../../sources/annotated/lecture-4/page-032.md#lecture-4-p032-summary-replication).

**A five-step replication recipe — supplemental, summarizing the whole lecture:**

1. **Specify the delivery.** Which asset, how many units, which date, which quote units? For currencies, which currency is domestic?
2. **List what owning provides or costs until delivery.** Nothing; fixed cash income; proportional yield; foreign interest; cash or proportional storage; convenience.
3. **Build a prepaid position that delivers exactly one unit at $T$.** Buy one unit; or one unit minus the income PV; or $e^{-qT}$ units with income reinvested; or deposit $e^{-r_fT}$ foreign units; or one unit plus a storage reserve.
4. **Finance it to delivery.** The repayment is the replication cost, the benchmark forward.
5. **Compare with the quoted price.** Above the benchmark: cash-and-carry. Below: reverse cash-and-carry, **if** the short side exists. Then check the assumptions before calling the difference an arbitrage.

**“Investigate the assumptions” — a checklist.** Are units, quotation direction and dates matched? Are rates continuous and for the right maturity? Is income cash or a yield, and is any of it double counted? Can you borrow and lend at the rate used? Can the asset be short sold or borrowed, at what fee, and with what recall risk? Is it a consumption asset whose holders need inventory? Is the quote a futures price under uncertain rates? Are there transaction costs, taxes, margin or counterparty risk? A price difference that survives all these checks is a model arbitrage. One that does not is information about which assumption fails.

<a id="new-asset"></a>
## 11. Apply the recipe to a new asset — supplemental scenario

**Asset:** a share at spot **60 USD** that will pay a known cash dividend of **1.50 USD in two months**. Consider a **five-month** forward. The funding rate is a flat **6% annual continuous**: the same rate discounts the two-month dividend and finances the five-month delivery. All inputs are hypothetical.

1. **Delivery:** one share in $T=5/12$ year, quoted in USD per share.
2. **What owning provides:** one fixed cash dividend before delivery. The cash-income model applies, not a proportional yield.
3. **Prepaid position:** dividend PV $I=1.5e^{-0.06(2/12)}=1.5e^{-0.01}\approx\mathbf{1.485074750624}$. The terminal share costs $60-I\approx58.514925249376$ today.
4. **Finance to delivery:** $F^{*}=(60-I)e^{0.06(5/12)}=(60-I)e^{0.025}\approx\mathbf{59.996237634542}$, displayed **60.00**.
5. **Shape check:** $F^{*}<60$, a slight **backwardation**. The dividend PV 1.485 just exceeds the financing break-even $60(1-e^{-0.025})\approx1.481405278300$. That is a carry result, not a forecast.

**Quoted forward 61.20, above the benchmark: cash-and-carry.**

| Leg | Today | Two months | Five months |
|---|---:|---:|---:|
| Borrow for two months | +1.485074750624 | −1.500000000000 | 0 |
| Borrow for five months | +58.514925249376 | 0 | −59.996237634542 |
| Buy one share | −60 | +1.50 dividend | Deliver the share |
| Short forward at 61.20 | 0 | 0 | +61.20 |
| **Net** | **0** | **0** | **+1.203762365458** |

The dividend exactly repays the two-month loan. The locked gain is **1.20 USD per share**, conditional on borrowing at 6% and reliable performance.

**Quoted forward 59.00, below the benchmark: reverse cash-and-carry, only if short selling is possible.** Short-sell one share for 60. Deposit 1.485074750624 for two months; it grows to 1.50, which pays the lender the dividend the lender would have received. Invest 58.514925249376 for five months to receive 59.996237634542. Go long the forward at 59.00, take delivery and return the share. The locked gain is **0.996237634542**, or about **1.00 USD**, before stock-borrowing fees. **If short sales are banned** and you do not own the share, this trade does not exist. Only the upper bound $F_{0,T}\leq59.996237634542$ is proved, although existing owners might sell and buy forward instead.

**If 61.20 were a futures quote**, the comparison also needs the deterministic-rate qualification of section7.

<a id="new-asset-value"></a>
## 12. Value the contract one month later — supplemental continuation

Suppose a long forward on this share was agreed with fixed delivery price **$K=60.00$**. One month later, $t=1/12$, the spot is **63**, the dividend is still due in one month and four months remain: $T-t=4/12$.

1. Remaining income PV at $t$: $I_t=1.5e^{-0.06(1/12)}=1.5e^{-0.005}\approx1.492518718789$. It is measured from the valuation date, not from inception.
2. Today's fair quote for a new contract: $F_{t,T}=(63-I_t)e^{0.06(4/12)}=(63-I_t)e^{0.02}\approx\mathbf{62.750014824762}$.
3. Value of the old long: $f_t=(F_{t,T}-60)e^{-0.02}\approx\mathbf{2.695560882806}$, or **2.70 USD per share**.
4. Independent route: $f_t=S_t-I_t-Ke^{-0.02}=63-1.492518718789-58.811920398405\approx2.695560882806$. The two routes agree.

The current forward price is 62.75; the contract's **value** is 2.70. The short side is worth −2.70. If the valuation happened after the dividend date, that dividend would be history and excluded from $I_t$ ([future-income valuation](lesson-l4-existing-forward-value.md#future-income)).

<a id="consumption-contrast"></a>
## 13. Contrast: the same recipe for a consumption commodity — supplemental

A processor's raw material has spot **200 USD/unit**, a known cash storage bill of **4 USD/unit due at delivery**, funding **5% continuous** and a **half-year** forward. The cost-only benchmark is

$$B_0=200e^{0.025}+4\approx205.063024104886+4=\mathbf{209.063024104886},$$

displayed 209.06. The storage bill's PV today is $4e^{-0.025}\approx3.901239648113$.

- **Quote 212, above the benchmark:** buy, store and sell forward. The locked gain is $212-209.063024104886\approx\mathbf{2.936975895114}$, or 2.94 USD per unit, **if** storage capacity and delivery are actually available.
- **Quote 198, below the benchmark:** the reverse trade needs someone to give up inventory. Processors who need the material for production will not sell it to buy it back later; the convenience they lose is not cash. The recipe stops at step5 with an **upper bound only**, and a quote below it is consistent with convenience yield, not an arbitrage.

Steps 1–4 were identical for the share and the commodity. Step5 differs because the **assumptions** differ, which is exactly what the unifying principle tells you to check.

<a id="boundaries"></a>
## 14. Boundaries across the whole lecture

- At delivery, $T-t=0$: the forward equals spot and an old contract's value equals its payoff $S_T-K$.
- Zero net carry gives $F=S$ for every maturity. Zero rate with no income gives no financing adjustment.
- Use **remaining** time and **remaining** income after a valuation date; past cash flows belong to profit accounting.
- A quote is not a value, a value is not a payoff, and a payoff is not a profit until costs and financing are included.
- Model arbitrage assumes executable borrowing, lending, short sales or storage, and performance. Fees, recall risk, margin calls and counterparty risk can remove it.
- Futures under uncertain rates, consumption commodities and restricted short sales are the three places where the clean two-sided equality most often weakens to a bound or a tendency.

<a id="practice"></a>
## 15. Progressive supplemental practice

<a id="exercise-recap-map-prompt"></a>
### 1. Map the summary — outcome1
For each of the seven summary statements and the unifying principle, write one formula or strategy, one condition it needs and one mistake it prevents. [Answer](#exercise-recap-map-answer).

<a id="exercise-direction-prompt"></a>
### 2. Choose the direction — outcome2
(a) No-income share: spot 40, 5% continuous, three months, quote 41.50. (b) The source USD/AUD market with a two-year forward quoted at **0.9500** USD per AUD. (c) A stock index quoted above its $S_0e^{(r-q)T}$ benchmark. (d) A consumption commodity quoted below its storage-cost benchmark. For each, state the strategy and what must be borrowed or sold short; compute the gains in (a) and (b), using 1,000 AUD for (b). [Answer](#exercise-direction-answer).

<a id="exercise-income-value-prompt"></a>
### 3. Income and value — outcome2
For the section11 share, the long forward has $K=60.00$. (i) One month after inception the spot is **58**; find today's fair quote and the long and short values. (ii) Three months after inception, after the dividend has been paid, the spot is **61**; find the long value. [Answer](#exercise-income-value-answer).

<a id="exercise-settlement-prompt"></a>
### 4. Futures versus forwards — outcome1
Explain when futures and forward prices are equal, what creates a difference, and which way the tendency goes in each of the source's two cases. Why does a small gap not prove arbitrage? [Answer](#exercise-settlement-answer).

<a id="exercise-new-asset-prompt"></a>
### 5. Run the recipe on a commodity — outcome2
For the section13 commodity, compute the benchmark and the gain at quote 212. Explain the result at quote 198. Then recompute the benchmark if the 4 USD storage bill were paid **today** instead of at delivery, and explain the difference. [Answer](#exercise-new-asset-answer).

<a id="exercise-diagnose-prompt"></a>
### 6. Investigate a price difference — outcome1
A share forward is quoted 0.30 USD below the replication cost you computed. Using the unifying principle, list at least six assumptions to check before calling it arbitrage, and say which one alone would make the reverse trade impossible. [Answer](#exercise-diagnose-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach the whole lecture — outcome1
Explain Lecture4 to a classmate in one connected argument: replication, carry, both arbitrage directions, the two income models, value versus price, settlement, currency and commodities. Finish with the unifying principle. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Repair a synthesis report — outcome2
About the section11 share, a report says: (1) the fair forward is $(60-1.50)e^{0.025}=59.98$; (2) the curve is in contango, so investors expect the share to rise; (3) short sales are banned, so a quote of 59.00 is a guaranteed arbitrage; (4) one month later the long forward is worth 62.75, today's forward price; (5) futures quotes always equal forward quotes. Correct each claim. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 16. Separate supplemental answers

<a id="exercise-recap-map-answer"></a>
### Answer1
Carry: $F=S_0e^{cT}$, applicable terms only; prevents reading the forward as a forecast. Arbitrage: borrow/buy/short-forward or short-sell/invest/long-forward; the reverse needs a feasible short sale; prevents claiming equality without both directions. Income: $(S_0-I)e^{rT}$ for cash, $S_0e^{(r-q)T}$ for yield; needs dated PVs or a contract-life yield; prevents double counting. Value: $f_t=(F_{t,T}-K)e^{-r(T-t)}$; needs remaining time; prevents confusing a quote with a value. Settlement: equal under deterministic rates; prevents treating a futures gap as arbitrage. Currency: $S_0e^{(r_d-r_f)T}$; needs domestic-per-foreign quotes; prevents wrong-sign rate differences. Commodity: $(S_0+U)e^{rT}$ or $S_0e^{(r+u-y)T}$; consumption limits the reverse trade; prevents treating convenience as cash. Principle: build delivery from spot trades and check every assumption. **Retry:** give each statement its own formula and condition.

<a id="exercise-direction-answer"></a>
### Answer2
(a) Benchmark $40e^{0.0125}\approx40.503138061625$. The quote is higher, so use **cash-and-carry**: borrow 40, buy the share, short the forward. The gain is $41.50-40.503138061625\approx$**0.996861938375**, or 1.00. Nothing needs short selling. (b) Benchmark 0.941573650369; quote 0.9500 is higher, so the foreign currency is expensive forward. Borrow **980 USD**, convert to 1,000 AUD and deposit it. Sell the full maturity amount $1000e^{0.06}\approx1061.836546545360$ AUD forward for **1008.744719218092** USD, and repay $980e^{0.02}\approx999.797313226221$ USD. The gain is **8.947405991871**, or 8.95 USD. (c) Buy the index basket financed by borrowing, reinvest dividends as the yield model assumes, and short the forward; no short sale is needed. (d) Only reverse cash-and-carry would exploit a low quote. It requires holders to give up inventory, which consumption users may refuse, so no arbitrage is established. **Retry:** decide high or low first, then which side needs a short.

<a id="exercise-income-value-answer"></a>
### Answer3
(i) $I_t=1.5e^{-0.005}\approx1.492518718789$. Today's quote is $(58-I_t)e^{0.02}\approx$**57.649008124628**. The long is worth $(57.649008124628-60)e^{-0.02}\approx$**−2.304439117194**, or −2.30, and the short +2.30. The check $58-I_t-60e^{-0.02}$ gives the same value. (ii) The dividend has been paid, so no income remains and two months are left. The quote is $61e^{0.01}\approx61.613060192134$, and the long is worth $61-60e^{-0.01}\approx$**1.597009975050**, or 1.60. Deducting the paid dividend again would be wrong. **Retry:** always measure income and time from the valuation date.

<a id="exercise-settlement-answer"></a>
### Answer4
With deterministic rates, futures and forward prices are equal for the same asset and delivery date. With uncertain rates, daily settlement makes the timing of cash matter. If a long's gains tend to come when rates are high, they are reinvested favourably and the futures price tends to exceed the forward. If they tend to come when rates are low, the futures price tends to be lower. The source gives a direction, not a size. A small gap can reflect this timing effect, margin funding or contract differences, so it is not by itself arbitrage. **Retry:** the cause is cash-flow timing, not a different final payoff.

<a id="exercise-new-asset-answer"></a>
### Answer5
Benchmark $200e^{0.025}+4\approx$**209.063024104886**. At 212, buy, store and sell forward for **2.936975895114**, or 2.94 per unit, if storage and delivery are feasible. At 198 the reverse trade requires processors to give up inventory they need; convenience is not a cash receipt, so only the upper bound holds and no arbitrage is shown. Paying storage today gives $(200+4)e^{0.025}\approx$**209.164284586983**, or 209.16. That is higher by about 0.10, because a bill paid earlier must be financed for the whole half-year. **Retry:** carry each cost from its own payment date.

<a id="exercise-diagnose-answer"></a>
### Answer6
Check: matched asset, quantity and date; the quote's units; continuous rates for the right maturity; whether all dividends before delivery were included once, at their own dates; whether you can borrow and lend at that rate; whether the share can be borrowed, at what fee and with what recall risk; transaction costs and taxes; margin and counterparty terms; and whether the quote is a daily-settled futures price. **A short-sale ban alone** makes the reverse trade impossible for a non-owner, leaving only an upper bound. A 0.30 gap may also simply be smaller than the borrowing fee. **Retry:** treat a price difference as a question about assumptions before treating it as profit.

<a id="exercise-explain-teachback-answer"></a>
### Answer7 — sufficient explanation
“A forward delivers an asset later, and I can build that delivery today by buying the asset and financing it. Its cost is the benchmark, which is spot adjusted for net carry: financing and storage add, income and convenience subtract. If a forward is quoted higher I borrow, buy and sell forward; if lower, I short, invest and buy forward, but only if shorting is possible. Fixed cash income is discounted and subtracted; a yield goes in the exponent. An old contract's value is the discounted difference between today's quote and its fixed price, not today's quote. Futures can differ from forwards when rates are uncertain, because daily cash is reinvested at uncertain rates. Currency forwards follow covered parity, treating the foreign deposit as a yield. Commodities add storage and convenience, and consumption users may block the reverse trade. Whenever a price differs from the replication cost, I check the assumptions before calling it arbitrage.” **Retry:** keep quote, value and profit as three different words.

<a id="exercise-apply-teachback-answer"></a>
### Answer8
(1) The dividend must be discounted first: $I=1.5e^{-0.01}\approx1.485074750624$, so $F^{*}\approx$**59.996237634542** (60.00), not 59.980934550679. (2) $F^{*}$ is below spot 60, so the curve shows a slight backwardation, caused by the dividend; either way the label reflects carry, not expectations. (3) A ban removes the reverse trade for non-owners. A quote of 59.00 is then not a guaranteed arbitrage; only $F\leq59.996237634542$ is proved. (4) 62.75 is today's new forward price; the old long is worth about **2.695560882806**, or 2.70. (5) Futures equal forwards under deterministic rates; with uncertain rates daily settlement can separate them. **Retry:** run the five-step recipe, then the assumptions checklist, before writing conclusions.

<a id="evidence"></a>
## Source presentation and endpoint

The full normalized and raw files for p32 and its original PNG were inspected. Page32 is a bulleted summary of seven statements followed by a boxed unifying principle, with no chart or table. Every source number recalled here was taken from the earlier source pages linked in each section and recomputed. Eight source units are verified with no registered issue; that does not approve this lesson.

| Page | Normalized | Raw | Original |
|---|---|---|---|
|32|[Full](../../sources/annotated/lecture-4/page-032.md)|[Raw](../../sources/extracted/lecture-4/page-032.md#page-32)|[PNG](../../sources/assets/lecture-4/page-032.png)|

This is the last Lecture4 lesson. Independent teaching review, concept integration and canonical promotion are separate later tasks. No restricted textbook, private learner material or live market quotation was used.
