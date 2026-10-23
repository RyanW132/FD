# No-arbitrage replication and cost of carry

**Source-grounded quick reference — author draft; independent semantic review pending.** Prerequisites: [zero factors](concept-zero-discount-factors.md#zero-formulas) and [payoff versus profit](concept-payoff-and-profit.md#payoff-definition). Use [powers/rate conventions](concept-rate-conventions.md#rates-quote) if exponential growth is unfamiliar. This lookup does not replace the full lessons or recommend a trade.

<a id="carry-purpose"></a>
## Use this reference to do two things

1. Match dated cash and asset obligations to explain which no-arbitrage bound follows from a feasible strategy.
2. Select the appropriate carry model, calculate a quote with stated units, and distinguish an executable equality from a conditional benchmark or forecast.

<a id="carry-foundations"></a>
## Terms, units and assumptions first

**Replication** means constructing another portfolio with the same relevant payments and asset deliveries at the same dates, not predicting similar returns. **No arbitrage** rules out a feasible zero-net-investment strategy with a positive locked gain and no remaining modeled liability. Matching future payments then constrains their current costs.

Work first with one deliverable asset unit and one currency. Today is 0; delivery is \(T\) years later. Spot \(S_0>0\) is today's asset price; \(S_T\) is its uncertain price at delivery; \(F_{0,T}\) is today's quoted delivery price for a new forward. These are currency **per asset unit**, not current contract values. A long forward commits to buy at delivery; a short commits to sell. Neither is an option. An underlying **short sale** instead borrows an asset, sells it now, and must later return an equivalent asset. Borrowing cash is a separate obligation.

Let \(r\) be the annual continuously compounded **decimal** funding rate for this interval. A cash amount grows by \(e^{rT}\), where annual rate times years makes the exponent dimensionless. Assume matching asset quality, currency, quantity, dates and settlement terms; reliable performance; known carry inputs; no omitted taxes, fees or collateral costs; and feasible borrowing/lending at the stated rate. Reverse trades additionally need usable short-sale proceeds and an asset loan lasting through delivery without unmodeled recall/borrow costs. These are model conditions, not facts about every market.

<a id="carry-replication"></a>
## No income: two directions establish equality

Assume no income or storage costs before delivery. The table is an **authored accessible expansion** of the source strategies. A positive cash sign means received; physical asset transfers are separate from cash.

| Strategy | At 0: net cash zero | At delivery \(T\) | Remaining net cash |
|---|---|---|---|
| **Cash-and-carry** | Borrow \(S_0\), buy one asset, enter short forward for no premium | Deliver held asset, receive \(F_{0,T}\), repay loan \(S_0e^{rT}\) | \(F_{0,T}-S_0e^{rT}\) |
| **Reverse cash-and-carry** | Borrow/sell one asset, invest \(S_0\), enter long forward for no premium | Investment pays \(S_0e^{rT}\); pay \(F_{0,T}\), receive asset and return it to lender | \(S_0e^{rT}-F_{0,T}\) |

No second spot sale or purchase is added at delivery: the forward transfers the asset already accounted for. In the first strategy, held-asset value \(S_T\) plus short-forward exchange value \(F_{0,T}-S_T\) is \(F_{0,T}\); uncertain spot cancels. The reverse strategy cancels the asset-return liability against its forward receipt. Sources: [L4 physical p11, opening replication box](../../sources/annotated/lecture-4/page-011.md#lecture-4-p011-cash-and-carry-replication), [p13 reverse strategy](../../sources/annotated/lecture-4/page-013.md#lecture-4-p013-underpriced-arbitrage), [p13 stock-borrow cost qualification](../../sources/annotated/lecture-4/page-013.md#lecture-4-p013-underpriced-profit).

A feasible cash-and-carry excludes \(F_{0,T}>S_0e^{rT}\), giving an upper bound. A feasible reverse excludes the opposite inequality. **Both** imply the benchmark

\[
F_{0,T}^{*}=S_0e^{rT}.
\]

The star labels the model-consistent quote, not multiplication. If shorting the asset is unavailable, the lower-bound argument may fail; the upper bound survives only if its own funding/purchase/forward legs remain feasible. Existing owners may sell and replace forward if they can forgo possession, but an investor without the asset cannot pretend to own it. Sources: [p11 formula/not-forecast caution](../../sources/annotated/lecture-4/page-011.md#lecture-4-p011-no-income-price), [p14 upper bound](../../sources/annotated/lecture-4/page-014.md#lecture-4-p014-forward-upper-bound), [restriction](../../sources/annotated/lecture-4/page-014.md#lecture-4-p014-restricted-short-consequence), [owner substitution](../../sources/annotated/lecture-4/page-014.md#lecture-4-p014-existing-owner-substitution).

<a id="carry-income"></a>
## Income: a fixed cash amount is not a proportional yield

For known cash payments, let \(I_j\) be each income amount per asset unit at year \(t_j\), strictly before delivery, and \(r_j\) its matched annual continuous zero rate. Index \(j\) labels payments; the sum adds them. Their present value is \(I=\sum_j I_j e^{-r_jt_j}\), in currency per unit. Buying spot buys both the terminal asset and that interim income. Removing the income entitlement leaves prepaid terminal-asset cost \(S_0-I\); financing that cost to delivery gives

\[
F_{0,T}^{*}=(S_0-I)e^{rT}.
\]

This reasoning assumes the known payments can be financed/matched at their specified dates. Do not subtract undiscounted future cash from today's spot. Source: [p15 replication](../../sources/annotated/lecture-4/page-015.md#lecture-4-p015-known-income-replication) and [dated income-PV sum](../../sources/annotated/lecture-4/page-015.md#lecture-4-p015-income-present-value-sum).

A different model stipulates annual continuous proportional income yield \(q\): income is proportional to the asset's value, not a fixed future currency amount. Under ideal continuous reinvestment, asset units grow at \(q\). **Supplemental derivation:** start with \(e^{-qT}\) units; reinvest income so they become \(e^{-qT}e^{qT}=1\) unit at delivery. Initial cost is \(S_0e^{-qT}\); financing gives

\[
F_{0,T}^{*}=S_0e^{(r-q)T}.
\]

This is a deterministic yield assumption with executable reinvestment, not merely a historical dividend percentage. Do not deduct the same income once as \(I\) and again as \(q\). Source: [p18 proportional formula](../../sources/annotated/lecture-4/page-018.md#lecture-4-p018-known-yield-formula) and [cash-versus-yield distinction](../../sources/annotated/lecture-4/page-018.md#lecture-4-p018-cash-versus-yield).

<a id="carry-storage"></a>
## Net carry and the consumption-asset boundary

Let \(u\) be a stipulated annual continuous proportional storage/insurance cost and \(y\) a convenience-yield parameter: the **non-cash service benefit** of having inventory available. Here \(y\) is not a bond yield. With all applicable terms expressed as annual continuous decimals, the source summarises net carry \(c\) as

\[
c=r+u-q-y,\qquad F_{0,T}=S_0e^{cT}.
\]

Set genuinely inapplicable terms to zero; do not force unrelated annual/simple rate quotes into this exponent or double count a benefit. Source: [p28 upper net-carry definition](../../sources/annotated/lecture-4/page-028.md#lecture-4-p028-net-carry-definition). Positive net carry raises the model quote above spot; negative net carry lowers it. The relation is **not a prediction of future spot**. [p28 final caution](../../sources/annotated/lecture-4/page-028.md#lecture-4-p028-carry-not-future-spot).

For commodities with no separate income yield, this proportional description becomes \(S_0e^{(r+u-y)T}\). If storage is instead known **cash amounts** with present value \(U\), in currency per unit, and there is no convenience yield, the source's alternative is \((S_0+U)e^{rT}\). Add cash cost to prepaid cost; subtract cash income. Do not put currency \(U\) into a rate exponent. Sources: [p27 carry components](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-commodity-carry-components), [proportional formula](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-commodity-proportional-formula), [cash-storage formula](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-commodity-cash-storage-formula).

**Do not overclaim replication:** convenience yield is not necessarily a cash payment one can borrow against or short. A consumption-asset owner may need inventory to avoid interrupted production and cannot replace that service with later delivery. Thus reverse cash-and-carry may be unavailable. The convenience-yield expression is conditional on its modeling inputs, not a universally enforceable two-sided arbitrage equality or a uniquely observed quote inferred from spot alone. If only buy/store/sell-forward is feasible, it may support an upper bound based on executable financing/storage costs; missing reverse access does not establish equality. [p27 inventory-benefit limitation](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-consumption-inventory-benefit).

<a id="carry-example"></a>
## Supplemental mini-example: check both dates

One no-income asset costs USD 100. Delivery is one year away, at annual continuous \(r=0.05\). No fees/storage; both borrowing and required trades are stipulated feasible. Growth is \(e^{0.05}\approx1.051271096376\); the benchmark is **USD 105.127109637602 per unit**, or USD 105.13 to cents. A quoted forward of USD 108 is above that benchmark.

At 0 borrow USD 100 and spend USD 100 on the asset; enter a short forward at 108 for no premium. Net opening cash is zero. At delivery receive USD 108 for the asset, repay USD 105.127109637602… and retain **USD 2.872890362398…**, or **USD 2.87**. This is a terminal gain conditional on all modeled legs, not USD 108 received now or a forecast of the asset's later spot price.

<a id="carry-practice"></a>
## Progressive supplemental practice

<a id="carry-direction-prompt"></a>
1. With the same no-income inputs, the quote is instead USD 102. State the reverse trades, calculate the terminal gain and explain what fails if asset borrowing is impossible. [Answer](#carry-direction-answer).

<a id="carry-income-prompt"></a>
2. Compare two **alternative** models for that USD 100 asset and one-year delivery: (a) known USD 2 income in half a year, with 5% continuous zeros at both dates; (b) no fixed cash payment but a known 2% annual continuous proportional yield. Calculate each quote without mixing the income models. [Answer](#carry-income-answer).

<a id="carry-teachback-prompt"></a>
3. Teach back why equal terminal asset/cash flows matter more than a price forecast. Explain the two bounds, cash income versus yield, storage units, and why convenience yield/short-sale restrictions can prevent a claimed arbitrage. [Answer](#carry-teachback-answer).

<a id="carry-direction-answer"></a>
### Separate supplemental answer 1

Borrow/sell one asset for USD 100, invest the USD 100 and enter a long forward at 102. At delivery the investment pays USD 105.127109637602…; pay USD 102, receive and return the asset. Gain is **USD 3.127109637602…**, or **USD 3.13**, before any omitted borrow fee. Without a feasible underlying short, this investor cannot create the opening investment/offsetting asset liability; a long forward alone retains price exposure. The upper-bound strategy may still work, but this lower-bound proof does not.

<a id="carry-income-answer"></a>
### Separate supplemental answer 2

(a) Income PV is \(I=2e^{-0.05(0.5)}\approx1.950619824057\) USD per unit. Prepaid terminal cost is \(100-I\); financing it gives \((100-I)e^{0.05}\approx103.076479396554\), or **USD 103.08 per unit**. The income is discounted to 0 before subtraction.

(b) Use \(q=0.02\), so net rate \(r-q=0.03\). The quote is \(100e^{0.03}\approx103.045453395352\), or **USD 103.05 per unit**. A fixed USD 2 payment and proportional 2% yield are not identical entitlements; different answers are not a contradiction. Both are below the no-income benchmark because each specified benefit lowers the cost of obtaining the terminal asset. Retain precision until the final display.

<a id="carry-teachback-answer"></a>
### Separate supplemental answer 3

Match currency, quantity, asset quality, dates and performance. Borrow/buy/short-forward locks quote minus financed spot; short-asset/invest/long-forward locks its opposite. Feasibility of each leg determines which bound is proved. Known cash income is discounted and subtracted in currency; proportional yield enters a continuous-rate growth model. Cash storage is added in currency, while a proportional storage rate enters the exponent. Inventory service may not be tradable and owners may be unable to give it up. Funding, borrow fees, recall, default and settlement mismatch can defeat a paper spread. Neither a carry quote nor a positive modeled spread guarantees a future spot price or an executable profit.

<a id="carry-navigation"></a>
## Full teaching and next lookup

Existing authored drafts: [no-income replication](../lessons/lesson-l4-no-income-replication.md), [known cash income](../lessons/lesson-l4-known-cash-income.md), [known proportional yield](../lessons/lesson-l4-known-proportional-yield.md). These are navigation, not prerequisites that force the reader to learn later material first. Continue to [existing forward value](concept-forward-contract-value.md), which distinguishes a quote from a current asset/liability. No lesson link here certifies independent approval.

Original formula/strategy pages inspected for this reference: [p11](../../sources/assets/lecture-4/page-011.png), [p13](../../sources/assets/lecture-4/page-013.png), [p14](../../sources/assets/lecture-4/page-014.png), [p15](../../sources/assets/lecture-4/page-015.png), [p18](../../sources/assets/lecture-4/page-018.png), [p27](../../sources/assets/lecture-4/page-027.png), [p28](../../sources/assets/lecture-4/page-028.png). No source graph is reproduced; the two-direction ledger is supplemental.
