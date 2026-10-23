# Cash-and-carry and reverse arbitrage without income

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all ten primary units on Lecture 4 physical pages 11–14. The source's examples and qualifications are cited; expanded ledgers, algebra, boundary checks, exercises and generated answers are **supplemental**, not official solutions or live trading recommendations. The planned `concept-replication-and-carry` page is still absent. Required ideas are taught here rather than deferred to an unexplained dependency.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain why two executable strategies constrain a quote:** define the asset, financing and forward positions; derive both inequalities from complete dated cash flows; explain why uncertain future spot cancels and why the result is a conditional carry price, not a forecast. Then diagnose exactly which argument survives a short-sale restriction and when an existing owner's substitution is relevant.
2. **Build and audit the ledgers:** reproduce the source 40/43 and 40/39 cases, retain unrounded financing, and transfer the method to a new quantity/quote. Success requires zero net inception cash under the model, no omitted intermediate obligation, final asset cancellation, correct profit date/units, independent substitution checks, final-only rounding and explicit funding/shorting limitations.

Read the [pricing benchmark](lesson-l4-pricing-benchmark.md) first. [Short-sale mechanics](lesson-l4-assets-short-sales-and-settlement.md#short-mechanics), [rate conventions](../concepts/concept-rate-conventions.md#rates-quote) and [signed cash flows](../concepts/concept-numeric-foundations.md#numeric-signs) support the following inline foundations.

<a id="foundations"></a>
## 1. State the instrument and every symbol before calculating

An **investment asset** is held by substantial numbers of investors for investment. Here it pays **no income before delivery**, has no storage or other holding cost beyond the specified financing, and can be bought now and delivered in the required condition later. This is not automatically a valid description of inventory needed to operate a factory.

A **long forward** obliges its holder to buy at delivery; a **short forward** obliges sale. A **short sale of the asset** is different: borrow the asset, sell it now, and later obtain an equivalent asset to return. Borrowing cash creates a cash repayment obligation instead. **Replication** means matching the relevant dated cash/asset flows, not merely predicting similar future prices.

| Symbol | Meaning and units in this lesson |
|---|---|
| $0$ | Today's inception date |
| $T\geq0$ | Delivery date measured as elapsed years from inception |
| $S_0>0$ | Today's spot purchase/sale price, currency per asset unit |
| $S_T$ | Uncertain spot price at delivery, in the same currency/unit |
| $F_{0,T}$, abbreviated $F_0$ | Today's market forward delivery quote for date $T$, currency/unit |
| $K$ | Fixed delivery price in a particular signed contract; when entering at this quote, $K=F_0$ |
| $F^*_{0,T}$ | The no-arbitrage benchmark quote derived from the model; star means benchmark, not multiplication |
| $r$ | Relevant annual continuously compounded funding rate, entered as a decimal |
| $Q>0$ | Number of underlying units; calculations initially use one unit, then scale by $Q$ |

A quote is **not** current contract value. A quoted new forward is assumed executable without an upfront premium; if that quote is inconsistent with the other modeled trades, the combined prices permit the arbitrage being tested. At a fully consistent fair inception the contract's value is zero even though its delivery price and future payment are nonzero. An existing contract keeps its old $K$ when new quotes change. This lesson prices a new delivery agreement, not the later value of an arbitrary old contract.

**Continuous-rate bridge:** an initial amount $A$ in a common currency grows to $Ae^{rT}$ under the stated rate convention. The exponential $e^x$ is positive, $e^0=1$, and $e^{-x}=1/e^x$. Annual rate times years is dimensionless. Discounting reverses growth: a known payment $B$ at $T$ has present value $Be^{-rT}$. For source three-month calculations use equal months, so $T=3/12=0.25$ year and 5% means $r=0.05$, not 5. These are model conventions, not unspecified real contract day counts.

<a id="assumptions"></a>
## 2. What “self-financing” and “riskless” mean here

Use the six benchmark assumptions from the prerequisite: no transaction costs/taxes, divisible quantities, borrowing/lending at the relevant risk-free rate, short selling when required, known contractual cash flows/carry costs, and exploitation of feasible arbitrage. In this no-income application also require matching asset, currency, quantity, delivery date/terms and performance; no stock-borrow fee, recall interruption, storage cost or collateral funding asymmetry in the equality model. The reverse strategy needs usable sale proceeds and securities available through delivery. These are conditions, not assertions about anyone's actual account.

A strategy is **self-financing** here when its own receipts fund its payments at every modeled date; no extra external cash is needed after inception. **Zero upfront net cash** means the opening borrowing or sale proceeds exactly fund the purchase or investment. It does not mean no gross transaction, no debt, no collateral requirement in reality, or unlimited borrowing access.

**Arbitrage under the assumptions** means a feasible combination with zero initial net investment and a positive locked terminal receipt, with no remaining modeled exposure or liability. “Riskless” refers to this matched model: default, failed execution, financing changes, recall, costs and delivery mismatch can defeat the real trade. An expected gain from a price forecast is not this argument.

<a id="cash-carry"></a>
## 3. Build the cash-and-carry strategy, date by date

The source starts with a no-income investment asset: borrow $S_0$, buy one unit, and short a forward; at $T$, deliver for $F_0$ and repay $S_0e^{rT}$. [L4 p11, opening condition and strategy box; `lecture-4-p011-cash-and-carry-replication`](../../sources/annotated/lecture-4/page-011.md#lecture-4-p011-cash-and-carry-replication).

**Expanded supplemental ledger.** Positive cash is received, negative cash paid, always from this trader's viewpoint. Asset movements are recorded separately from money.

| Leg | Cash at 0 | Cash strictly between 0 and $T$ | Cash at $T$ | Asset accounting |
|---|---:|---:|---:|---|
| Borrow to delivery | $+S_0$ | 0 | $-S_0e^{rT}$ | A cash debt, not a share loan |
| Buy and hold one asset | $-S_0$ | 0: no income/costs | No separate sale cash in this row | Receive one unit at 0; keep it for delivery |
| Short forward at $K=F_0$ | 0 | 0 under this forward model | $+F_0$ | Deliver the held unit at $T$ |
| Combined | **0** | **0** | **$F_0-S_0e^{rT}$** | No asset left and debt discharged |

The share's future price need not be guessed: the sale price was fixed by the forward. Interest accrues on the loan, but in this stated loan it is paid at delivery, not an unexplained intermediate outflow. Do not add a separate sale at $S_T$ to the physical-delivery ledger; that would sell the same asset twice.

An equivalent **economic-value check**, not an additional trade, assigns the held asset value $S_T$ and the short forward exchange value $F_0-S_T$ at delivery. Their sum is $S_T+(F_0-S_T)=F_0$. Subtract debt repayment to recover the same terminal cash. The uncertain $S_T$ cancels algebraically because the asset and contractual delivery match.

<a id="no-income-price"></a>
## 4. Derive equality from two directions, not one slogan

If $F_0>S_0e^{rT}$, the cash-and-carry terminal receipt is positive. If all its legs are feasible, no-arbitrage therefore requires the **upper bound** $F_0\leq S_0e^{rT}$.

To exclude prices below the financed spot cost, we need a different strategy. Sell a borrowed asset now, invest the proceeds, and buy it back through a **long** forward at delivery. The forward supplies the asset needed to discharge the security loan.

| Reverse leg — supplemental ledger | Cash at 0 | Intermediate cash | Cash at $T$ | Asset accounting |
|---|---:|---:|---:|---|
| Borrow and short-sell one asset | $+S_0$ | 0 under no-income/no-fee borrow | 0 cash on return | Owe one asset; return the forward-delivered unit |
| Invest all sale proceeds to $T$ | $-S_0$ | 0 | $+S_0e^{rT}$ | Cash investment, not an asset-price forecast |
| Long forward at $K=F_0$ | 0 | 0 | $-F_0$ | Receive one unit, then return it to lender |
| Combined | **0** | **0** | **$S_0e^{rT}-F_0$** | No asset holding or security debt remains |

If $F_0<S_0e^{rT}$, that reverse receipt is positive. Feasible reverse arbitrage implies the **lower bound** $F_0\geq S_0e^{rT}$. Both inequalities together give the source result:

$$F^*_{0,T}=S_0e^{rT}.$$

[L4 p11, lower boxed formula and caution; `lecture-4-p011-no-income-price`](../../sources/annotated/lecture-4/page-011.md#lecture-4-p011-no-income-price). The source explicitly calls this a cost-of-carry result, **not a forecast of $S_T$**. One feasible direction alone gives one inequality, not automatically equality.

A supplemental economic check of the reverse strategy is investment $S_0e^{rT}$, long-forward value $S_T-F_0$, and the liability to return an asset worth $S_T$. Total $S_0e^{rT}+(S_T-F_0)-S_T=S_0e^{rT}-F_0$. The security debt is one asset, not the original sale price in cash. At the fair benchmark both strategy receipts are zero; their separate gross obligations still exist.

<a id="source-data"></a>
## 5. Recompute the source financing amount before choosing a trade

The source gives spot **40 dollars/share**, annual continuous rate **5%**, time **0.25 year**, and an offered forward quote **43 dollars/share**. Its printed benchmark is **40.50**. [L4 p12, upper example and fair-price calculation; `lecture-4-p012-overpriced-forward-data`](../../sources/annotated/lecture-4/page-012.md#lecture-4-p012-overpriced-forward-data).

We label dollars USD for these classroom ledgers; no jurisdiction or current security is inferred. The source rounds money to cents. **Supplemental full-precision calculation:**

1. Exponent: $rT=0.05(0.25)=0.0125$.
2. Growth factor: $e^{0.0125}\approx1.012578451541$.
3. Financed spot cost: $40e^{0.0125}\approx40.503138061625$ USD/share.
4. Final cent display: **40.50 USD/share**. Interest is approximately **0.503138061625 USD**, not exactly 0.50 before rounding.

The source display is appropriate as a cent-rounded illustration. Keep the unrounded value for scaled quantities or additional calculations. A simple-interest calculation $40(1+0.05\times0.25)=40.50$ happens to share the cent display here, but is a different convention and is not the exact continuous amount.

<a id="overpriced-strategy"></a>
## 6. Source quote 43: buy the asset and sell it forward

The source says to borrow 40 and buy the share, short the forward at 43, deliver the share at maturity, receive 43 and repay 40.50. [L4 p12, middle strategy; `lecture-4-p012-overpriced-arbitrage`](../../sources/annotated/lecture-4/page-012.md#lecture-4-p012-overpriced-arbitrage).

| Date — expanded source-input ledger | Receipt | Payment | Net cash and remaining position |
|---|---:|---:|---|
| 0 | Borrow 40 | Buy share 40 | 0 cash; own one share, owe cash; short one-unit forward has zero entry premium |
| Between dates | 0 | 0 | No income/cost; hold the share and both obligations |
| $T$ | Deliver share for 43 | Repay about 40.503138061625 | About **+2.496861938375 USD**, no share or loan left |

<a id="overpriced-profit"></a>

The source prints **43.00 − 40.50 = 2.50** locked at $T$. [L4 p12, lower boxed profit; `lecture-4-p012-overpriced-profit`](../../sources/annotated/lecture-4/page-012.md#lecture-4-p012-overpriced-profit). Full-precision profit is $43-40e^{0.0125}\approx2.496861938375$, also **2.50 USD** to cents. It is a delivery-date profit, not an initial 2.50 receipt. No uncertain final share price enters it.

For a **supplemental** 100-share version with the same freely scalable terms, opening borrowing/purchase is 4,000 USD, delivery receipt 4,300, debt about 4,050.313806162538 and profit **249.686193837462**, or **249.69 USD**. Multiplying the already rounded 2.50 by 100 gives 250.00, not the full-precision total. The calculation assumes a matching 100-share forward; it does not invent a real exchange contract size.

<a id="underpriced-strategy"></a>
## 7. Source quote 39: sell borrowed shares and buy forward

The source's alternative quote is **39**. Short one share for 40, invest the 40 for three months, enter a long forward at 39, receive about 40.50 from the investment, pay 39 for the share and return it. [L4 p13, opening condition and reverse strategy; `lecture-4-p013-underpriced-arbitrage`](../../sources/annotated/lecture-4/page-013.md#lecture-4-p013-underpriced-arbitrage).

| Date — expanded source-input ledger | Receipt | Payment | Net cash and remaining position |
|---|---:|---:|---|
| 0 | Borrow/sell one share: 40 cash | Invest 40 | 0 cash; cash investment plus obligation to return one share; long forward entered |
| Between dates | 0 | 0 under stated no-income/no-fee model | Security loan remains outstanding |
| $T$ | Investment about 40.503138061625 | Forward purchase 39 | About **+1.503138061625 USD**; receive share and return it, discharging security loan |

<a id="underpriced-profit"></a>

The source prints **40.50 − 39.00 = 1.50**, explicitly **before stock-borrowing costs**. [L4 p13, lower profit and qualification; `lecture-4-p013-underpriced-profit`](../../sources/annotated/lecture-4/page-013.md#lecture-4-p013-underpriced-profit). The full-precision calculation $40e^{0.0125}-39\approx1.503138061625$ also rounds to **1.50 USD**. This is not a naked prediction that the share will fall; the asset-return obligation is matched by the forward purchase.

**Supplemental cost diagnosis:** if an otherwise identical arrangement instead charges a known total fee of 2 USD per borrowed share **at $T$**, net becomes about **−0.496861938375 USD**, or **−0.50**. The source gross opportunity then fails this fee test. A fee paid earlier would require its own financing/date treatment; no current borrow rate is being inferred.

<a id="upper-bound"></a>
## 8. Restrict short selling: preserve the correct one-sided conclusion

The source states that cash-and-carry can still rule out an excessive price, giving

$$F_{0,T}\leq S_0e^{rT}$$

under the basic no-income assumptions. [L4 p14, upper paragraph and inequality; `lecture-4-p014-forward-upper-bound`](../../sources/annotated/lecture-4/page-014.md#lecture-4-p014-forward-upper-bound).

Why does this direction survive? It **buys** the asset and shorts a **forward**, not the underlying asset. If cash borrowing, spot purchase, holding and the forward sale remain feasible, a high quote can still be exploited. Restricting asset short sales alone does not remove those legs. If other constraints also block them, even this particular proof of the upper bound needs reassessment.

<a id="restricted-short"></a>

For investors who cannot short and do not already own the asset, the reverse leg may be unavailable; equality is not guaranteed by that argument alone. [L4 p14, middle consequences box; `lecture-4-p014-restricted-short-consequence`](../../sources/annotated/lecture-4/page-014.md#lecture-4-p014-restricted-short-consequence).

Thus a quote of 39 below the model's about 40.503138 is **not automatically an accessible arbitrage** for an investor unable to obtain/sell the asset. Simply buying the underpriced forward does not produce the fixed spread: it leaves exposure to the eventual asset value and the purchase obligation. An inequality is information, not a claim every lower price is observed or reasonable under every other market condition.

<a id="owner-substitution"></a>
## 9. An existing owner can sometimes substitute without borrowing stock

The source says existing owners of a widely held investment asset may sell it and buy it forward, helping enforce the relationship. [L4 p14, last paragraph; `lecture-4-p014-existing-owner-substitution`](../../sources/annotated/lecture-4/page-014.md#lecture-4-p014-existing-owner-substitution).

**Supplemental source-input comparison:** suppose an investor already owns one no-income share and wants the same share exposure at $T$. Compare two strategies from that identical starting endowment:

| Strategy | At 0 | Between dates | At $T$ |
|---|---|---|---|
| Keep existing share | No new cash trade | Hold share, no income | Own one share |
| Sell and replace forward at 39 | Sell owned share for 40; invest 40; enter long forward | Forgo possession, no modeled income lost | Investment about 40.503138; pay 39; own one share **plus about 1.503138 cash** |

The second produces the same terminal asset and extra cash under these assumptions, without a security loan. This is an **improvement relative to an existing holding**, not a claim that the owner acquired that starting share for free. An investor without the share cannot copy the sale merely by declaring themselves an owner.

Nor can every owner give up interim possession. Consumption inventory may prevent shutdowns, or an owner may face tax, mandate, transaction, collateral, liquidity or other restrictions. Even an investment-asset label does not prove every holder can trade frictionlessly. The source says owners **may** help enforce the relationship, not that this always restores equality despite all restrictions.

<a id="checks"></a>
## 10. Reasonableness and transfer checks — supplemental

For the no-income benchmark and positive $S_0$, a positive rate and positive time make $F^*_{0,T}>S_0$ because the growth factor exceeds 1. Zero rate or zero time gives equality with spot. A negative continuous rate can make the benchmark below spot without an income payment. Negative time is outside this future-delivery setup. These statements require this **no-income/no-other-carry** model; the next known-income lesson explains why positive rates alone do not generally imply forward above spot.

For a new classroom case, use **100 USD/unit**, **4% annual continuous**, **six equal months**, and **10 asset units**. Then $T=0.5$, exponent 0.02, and benchmark $100e^{0.02}\approx102.020134002676$ USD/unit. A quote of 104 permits the modeled buy/short-forward direction: borrow/buy 1,000, receive 1,040 at delivery, repay about 1,020.201340026756, leaving **19.798659973244**, or **19.80 USD**. A quote of 101 instead uses the reverse direction: invest sale proceeds 1,000, receive about 1,020.201340026756, pay 1,010, return ten assets and retain **10.201340026756**, or **10.20 USD**. Each conclusion depends on the appropriate legs being feasible.

At the original 40 spot, a supplemental −5% continuous rate for 0.25 year gives $40e^{-0.0125}\approx39.503112019755$. This below-spot quote arises from the negative funding rate, not a forecast. At zero quantity, all scaled cash flows vanish; there is no positive arbitrage profit to claim and no valid division by zero to infer a per-unit quote from a zero total.

<a id="practice"></a>
## 11. Progressive supplemental practice

Attempt before opening each answer. Source inputs are cited above; all questions and solutions here are authored supplements.

<a id="exercise-foundations-prompt"></a>
### 1. Define the comparison — outcome 1
Explain $S_0,F_0,K,S_T,r,T,Q$, their units, and why a zero-premium forward is not a free underlying asset. State the executable-trade assumptions needed for both directions. [Answer](#exercise-foundations-answer).

<a id="exercise-over-prompt"></a>
### 2. Source overpriced ledger — outcome 2
Reconstruct every opening, intermediate and terminal flow for spot 40 and quote 43. Compare full precision with source cent displays, then calculate the 100-share total without premature rounding. [Answer](#exercise-over-answer).

<a id="exercise-under-prompt"></a>
### 3. Source underpriced ledger — outcome 2
Repeat for quote 39, specifying what is borrowed, invested, purchased and returned. Include the supplied supplemental terminal borrow fee of 2 and explain its effect. [Answer](#exercise-under-answer).

<a id="exercise-cancellation-prompt"></a>
### 4. Remove the forecast — outcome 1
Show both terminal economic-value cancellations using an arbitrary $S_T$. Why would adding a spot sale to the physical forward-delivery receipt double count? Explain why a long forward alone is not the reverse arbitrage. [Answer](#exercise-cancellation-answer).

<a id="exercise-restrictions-prompt"></a>
### 5. One bound and an owner — outcome 1
An investor cannot short the asset and owns none. Which inequality can still follow if all other basic legs work? Contrast the existing owner who can sell/replace at quote 39 with an inventory owner who needs continuous possession. [Answer](#exercise-restrictions-answer).

<a id="exercise-transfer-prompt"></a>
### 6. Transfer and boundaries — outcome 2
Solve the 100-spot, 4%-continuous, six-month, ten-unit case for quotes 104 and 101. Then state the zero-rate, zero-time, negative-rate and zero-quantity limits, and why negative time is invalid here. [Answer](#exercise-transfer-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Explain without a memorized formula — outcome 1
Teach how two dated self-financing ledgers imply equality, why one surviving direction implies only a bound, and why future spot is neither assumed known nor forecast by that equality. Include the source's owner and stock-borrow qualifications. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Diagnose a report — outcome 2
A learner says: “At quote 43 I buy the forward, receive 43 now, then sell the share twice. The source profit 2.50 means exactly 250 on 100 shares. At quote 39 no asset short is needed because forward value starts at zero.” Repair the entire dated ledger. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 12. Separate supplemental answers and diagnosis

<a id="exercise-foundations-answer"></a>
### Answer 1
$S_0$ is current spot; $F_0$ today's new delivery quote; $K$ the fixed agreed delivery price; $S_T$ the later realized spot. All are currency per identical asset unit. $r$ is decimal annual continuous, $T$ elapsed years, and $Q$ underlying units. The forward exchanges assets for cash later despite zero entry premium. Both directions need compatible terms, no omitted income/carry/tax/transaction costs, matched borrowing/lending and performance, and executable spot/forward trades. Reverse arbitrage additionally needs asset borrowing, usable proceeds and no unmodeled borrow fee/recall. **Retry:** distinguish a cash loan's repayment from a security loan's return obligation.

<a id="exercise-over-answer"></a>
### Answer 2
At 0 receive 40 cash from borrowing and pay 40 for one share; enter a **short** forward at 43 for no premium. Net cash 0, asset one, loan outstanding. Intermediate net cash is 0 under the model. At $T$, deliver the share, receive 43, repay $40e^{0.0125}\approx40.503138061625$ and retain **2.496861938375 USD**, displayed **2.50**. The source's 40.50 and 2.50 are cent amounts, not exact exponential values. For 100 shares: opening +4,000/−4,000; terminal +4,300/−4,050.313806162538; profit **249.686193837462**, displayed **249.69**. **Retry:** if you got 250.00, carry more precision before scaling; if you received 43 at inception, correct the delivery date.

<a id="exercise-under-answer"></a>
### Answer 3
Borrow one share, sell it for 40 and invest 40: opening net 0. Enter a **long** forward at 39. No intervening income/fees in the basic source case. At $T$, investment pays about **40.503138061625**, forward purchase costs **39**, and the received share is returned to the lender. Profit about **1.503138061625**, or **1.50**, before stock-borrow costs. With the supplemental terminal fee 2, net is about **−0.496861938375**, or **−0.50**. **Retry:** the lender is owed a share, not another 40 cash; do not count both the returned share and an extra spot purchase.

<a id="exercise-cancellation-answer"></a>
### Answer 4
Cash-and-carry: $S_T+(F_0-S_T)-S_0e^{rT}=F_0-S_0e^{rT}$. Reverse: $S_0e^{rT}+(S_T-F_0)-S_T=S_0e^{rT}-F_0$. These are economic-value checks of the respective physical ledgers, not additional cash transactions. Delivery transfers the held share for the fixed forward cash; a second spot sale would require another share. A long forward alone leaves $S_T-F_0$ exposed; it lacks the invested short-sale proceeds and offsetting asset-return liability. **Retry:** cross out the two matching $S_T$ terms and identify the actual instrument supplying each.

<a id="exercise-restrictions-answer"></a>
### Answer 5
If cash borrowing, purchase/holding and short-forward sale remain possible, only the argument $F_0\leq S_0e^{rT}$ survives automatically. The lower-bound reverse trade may be unavailable; equality is not proved. An existing no-income owner can sell for 40, invest, buy forward for 39 and end with the same share plus about **1.503138061625 USD**, instead of only the share. This compares identical starting endowments, not free acquisition. An owner who needs inventory services may lose benefits by selling; access, taxes and mandates also matter. **Retry:** preserve the source's “may” rather than concluding all owners restore equality.

<a id="exercise-transfer-answer"></a>
### Answer 6
Six months is **0.5 year** and $0.04(0.5)=0.02$. Benchmark **102.020134002676 USD/unit**. Quote 104: buy ten units financed by 1,000 and short their forward; receipt 1,040 less repayment **1,020.201340026756** gives **19.80 USD** rounded. Quote 101: short ten assets, invest 1,000 and buy forward for 1,010; proceeds less purchase give **10.20 USD** rounded, with ten assets returned. Zero rate or zero time gives the original spot benchmark; negative rate can put it below spot (40 at −5% for 0.25 gives about **39.503112019755**). Zero quantity gives no total profit, not a valid per-unit division. Negative time is not this future-delivery problem. **Retry:** determine the trade from quote minus financed spot, not from quote minus spot alone.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation
“Buy-and-finance plus a short forward locks a future receipt minus a known loan repayment. Reverse selling of a borrowed asset, investing, and buying forward locks the opposite difference while returning the asset. Their separate feasible positive-profit tests exclude prices above and below financed spot; equality needs both directions or a valid substitute. Future spot cancels because asset obligations match, not because its value is known. Restricted borrowing can remove the reverse proof. Existing owners may substitute sale plus forward replacement if they can forgo possession and other benefits; source profits exclude stock-borrow costs.” **Retry:** name the feasible instruments at each date instead of merely repeating the equality.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8
At excessive quote 43, the arbitrage **shorts** the forward, borrowing/buying the share now with +40/−40 cash. Receipt 43 occurs at delivery in exchange for that one share, not now and not in addition to a second spot sale. Repayment is about 40.503138061625, leaving about 2.496861938375; for 100 shares the final rounded profit is **249.69**, not 250.00. At quote 39, an investor without an existing share needs a feasible security short and investment to offset the long forward's uncertain exposure. Zero entry premium does not supply the borrowed share or erase the later payment. **Retry:** audit opening cash, intermediate obligations and final cash/asset balances separately.

<a id="evidence"></a>
## Evidence and endpoint

All four full normalized/raw pages and original PNGs were inspected. Page 11 has a strategy box and formula; pages 12–13 contain the two numerical strategies/profits; page 14 contains the upper-bound/restriction/owner explanation. Expanded tables above are accessible supplemental ledgers, not falsely claimed original source tables. Original statements and source rounding are preserved; no source issue is registered for these ten units.

| Physical page | Full normalized | Unchanged raw | Original PNG |
|---|---|---|---|
| 11 | [Full](../../sources/annotated/lecture-4/page-011.md) | [Raw](../../sources/extracted/lecture-4/page-011.md#page-11) | [Image](../../sources/assets/lecture-4/page-011.png) |
| 12 | [Full](../../sources/annotated/lecture-4/page-012.md) | [Raw](../../sources/extracted/lecture-4/page-012.md#page-12) | [Image](../../sources/assets/lecture-4/page-012.png) |
| 13 | [Full](../../sources/annotated/lecture-4/page-013.md) | [Raw](../../sources/extracted/lecture-4/page-013.md#page-13) | [Image](../../sources/assets/lecture-4/page-013.png) |
| 14 | [Full](../../sources/annotated/lecture-4/page-014.md) | [Raw](../../sources/extracted/lecture-4/page-014.md#page-14) | [Image](../../sources/assets/lecture-4/page-014.png) |

The missing carry concept remains an explicit metadata dependency, not an assumed prerequisite. After both teach-backs, the [known cash-income lesson](lesson-l4-known-cash-income.md) changes the cash-flow structure; do not carry over the no-income formula unchanged. Neither author arithmetic nor source verification is independent teaching approval or learner mastery.
