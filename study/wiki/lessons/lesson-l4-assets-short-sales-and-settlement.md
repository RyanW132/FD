# Assets, short sales and futures cash flows

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all sixteen primary units on Lecture 4 physical pages 3–8. Source statements, tables and numbers are identified precisely. Additional explanations, scenarios, exercises and solutions are **supplemental**, not official answers or current market/regulatory specifications. The planned replication-and-carry concept is not yet authored; the needed bridges are taught inline rather than assumed or linked to a nonexistent page.

<a id="outcomes"></a>

## Observable outcomes

1. **Explain the positions and distinctions:** classify the source asset examples by their principal holding purpose; explain risk transfer and why a futures quote is not necessarily a forecast; describe a complete borrowed-share short sale; compare forward/futures obligations, trading and settlement with the source's qualifications. Success requires distinguishing a security loan from a cash loan, an obligation from an option, delivery price from current quote/value, and margin from notional or a loss limit.
2. **Reconstruct and audit cash flows:** reproduce every entry of the source 500-share long/short table and the two-contract daily loss; transfer the calculation to new prices/dividends and a fully specified margin path. Success requires the correct party's signs, per-unit versus total amounts, all intermediate cash flows, separate collateral deposits and trading gains, and an explanation of what costs/timing/risk the simplified answers omit. Exact cents are possible; do not round intermediate values unnecessarily.

Immediate prerequisites are [option profit and exercise](lesson-l1-option-profit-and-exercise.md) and [forward interest rates](lesson-l3-forward-interest-rates.md). The contrast is important: an option buyer has a right; a forward/futures position has obligations. An interest forward inferred today and an asset forward quoted today both differ from a future observed market outcome. Optional references: [contract definitions](../concepts/concept-derivative-contracts.md#contracts-definition), [settlement and clearing](../concepts/concept-settlement-and-counterparty-risk.md#settlement-clearing), and [signed amounts](../concepts/concept-numeric-foundations.md#numeric-signs).

<a id="foundations"></a>

## 1. Foundations: an asset, a contract and a position are different things

An **asset** is something held for its economic value or use. A **share** is an ownership interest in a company; a **bond** is a debt claim promising specified payments. A **derivative contract** creates rights/obligations whose value depends on an underlying asset, price, rate or index. Owning a derivative does not automatically mean owning the underlying asset.

A **position** is the holding or contractual exposure of one party. **Long** and **short** name sides, not the length of the holding period. A long share position owns shares. A short sale of shares borrows and sells shares now, then must obtain equivalent shares to return. A short forward instead commits to a future sale at a fixed price; it is not automatically a short sale of stock today.

A **spot price** is the current price for the relevant immediate asset transaction. A **forward quote** specifies a delivery price for a new future transaction. A **futures quote** is the quoted reference price for the standardized contract with its settlement arrangements. A quoted price in currency per unit is not the contract's total current market value. We introduce each formula's quantity, currency and date labels before using it.

<a id="investment-assets"></a>

## 2. Investment assets: how a substantial group holds them matters

The source defines investment assets as assets held by significant numbers of investors primarily for investment, giving **shares, bonds, gold and silver**. [L4 p3, upper definition box; `lecture-4-p003-investment-assets`](../../sources/annotated/lecture-4/page-003.md#lecture-4-p003-investment-assets).

**Supplemental explanation:** investors may hold an asset for income, capital value or a portfolio purpose rather than immediately consume it. Gold or silver can have industrial uses while still meeting this lecture's investment-asset description because substantial investment holdings exist. The categories are not determined merely by whether the object is physical or by whether its price can rise. Classification supports a pricing argument; it is not a recommendation to own the asset.

<a id="consumption-assets"></a>

## 3. Consumption assets: inventory can do a job

The source defines consumption assets as assets held mainly for use or consumption, giving **oil, copper, wheat and cocoa**. [L4 p3, middle definition box; `lecture-4-p003-consumption-assets`](../../sources/annotated/lecture-4/page-003.md#lecture-4-p003-consumption-assets).

**Supplemental explanation:** a factory may need copper to continue production or a food producer may need wheat for orders. Such inventory supplies services beyond a future sale price. A speculator can trade a contract on oil without changing why much physical oil is held. Likewise, an investment asset can have consumption uses. Avoid the false rule “anything that can be speculated on is an investment asset under this definition.”

<a id="asset-distinction"></a>

## 4. Why the distinction changes a pricing argument

The source says cash-and-carry arbitrage often enforces a precise spot/forward relationship for an investment asset, whereas consumption inventory can provide operational benefits, represented by a **convenience yield**, so the same strategy need not enforce the same relationship. [L4 p3, lower why-the-distinction-matters box; `lecture-4-p003-asset-distinction`](../../sources/annotated/lecture-4/page-003.md#lecture-4-p003-asset-distinction).

**Supplemental inline bridge:** **carry** means the costs and benefits of holding an asset through time: financing its purchase, storing it if necessary, and receiving income or use benefits. **Cash-and-carry** combines buying the asset now, financing/holding it, and arranging a future sale, so the relevant future asset delivery can be matched rather than guessed. **Arbitrage** is a price inconsistency exploitable with compatible offsetting cash flows under explicit financing, cost and execution assumptions; an attractive prediction alone is not a locked-in profit.

A **replication** is another set of positions producing the same relevant dated cash flows or delivery obligations. If two strategies really replicate each other and can be bought/sold as assumed, their prices cannot differ freely without an opportunity to trade the difference. This reasoning requires implementable legs, not just an algebraic equality. The next lesson makes the benchmark assumptions explicit; no general carry-price formula is needed here.

A **convenience yield** describes the value of access to physical inventory, such as avoiding a production interruption. It is not necessarily a cash dividend deposited in an account or an income stream that any futures holder receives. An owner may not willingly give up needed inventory merely because a financial comparison looks attractive. Shorting/obtaining the physical commodity may also be constrained. Thus “investment versus consumption” helps identify which replication can actually be implemented; it does not mean that consumption-asset markets have no economic price constraints at all.

<a id="risk-transfer"></a>

## 5. What forwards and futures let participants do

The source describes transferring price risk across time and lists four uses. [L4 p4, opening paragraph and four bullets; `lecture-4-p004-risk-transfer-uses`](../../sources/annotated/lecture-4/page-004.md#lecture-4-p004-risk-transfer-uses).

| Source use | Supplemental explanation and limitation |
|---|---|
| A hedger can lock a future purchase or sale price | An existing or planned business exposure can be offset by the opposite contract sensitivity. An exact price lock needs matching asset, quantity, date and performance; basis mismatch, costs and daily funding can remain. |
| A speculator can take a price view without initially purchasing the underlying | No immediate physical purchase is needed, but obligations, collateral and potential losses remain. Low initial contract value is not zero risk. |
| An arbitrageur can exploit inconsistent spot/derivative prices | Compare complete matching legs, including financing, income, delivery and transaction costs. A forecasted gain is not enough. |
| Observable futures prices contribute to price discovery | Trading aggregates information and willingness to buy/sell into observable quotes. Observability does not make the future spot outcome certain. |

The same long futures trade can hedge a purchaser or speculate for someone without that exposure. A derivative gain can be offset by an adverse business cash flow; judge the complete position. Risk is reallocated between positions and across cash-flow dates, not abolished by the contract's existence.

<a id="not-forecast"></a>

### Today's quote is not necessarily an unbiased forecast

The source calls a futures price today's market-clearing price for future delivery and says it is **not necessarily an unbiased forecast of future spot**. [L4 p4, lower important-distinction box; `lecture-4-p004-futures-not-forecast`](../../sources/annotated/lecture-4/page-004.md#lecture-4-p004-futures-not-forecast).

**Supplemental definitions:** “market-clearing” here means the price at which buyers' and sellers' orders can be matched; it does not mean the separate institution called a clearinghouse. A **forecast** is a prediction about an uncertain future observation. An **unbiased forecast**, under a specified statistical model, would have no systematic prediction error in its conditional average. The source does not grant that property merely because a futures quote is observable.

Quotes reflect today's trading terms, holding costs/benefits and willingness to bear risk, among other influences. Information and market conditions may change before delivery. For an illustrative one-unit contract quoted at 52 currency units today, future spot of 48 or 57 is possible under a hypothetical scenario set; those are not promises or probabilities supplied by the quote. A zero-value new contract with quote 52 does not say that the expected spot is 52 or that its owner cannot lose. No distribution or expected future spot has been supplied, so none can honestly be calculated from this sentence alone.

<a id="short-mechanics"></a>

## 6. A short sale borrows securities, not their original cash value

The source describes borrowing shares, selling them, later repurchasing and returning them, and compensating the lender for dividends/other distributions. [L4 p5, upper paragraph and first three bullets; `lecture-4-p005-short-sale-mechanics`](../../sources/annotated/lecture-4/page-005.md#lecture-4-p005-short-sale-mechanics).

**Supplemental step-by-step account:**

1. Arrange to borrow a stated number of the required shares under an agreed securities-lending arrangement. This creates an obligation to return equivalent securities of that quantity/type, subject to the agreement; it is not ordinarily a debt fixed at the opening share price.
2. Sell those borrowed shares to a market buyer. The sale produces cash proceeds but also leaves the return obligation outstanding. Proceeds are not a free profit and may be restricted or held with collateral.
3. While the borrow is outstanding, compensate the lender for relevant dividends/distributions under the arrangement. The actual shares have been sold onward; the short seller cannot keep the economic benefit while ignoring the lender's entitlement.
4. To close, buy the needed shares at the then-prevailing price and return them to discharge the securities obligation. **Covering** means this repurchase; a higher repurchase price hurts the short seller, a lower one helps before costs.
5. Account separately for borrow fees, collateral funding, other charges and the timing of all cash flows. Those contractual details are not supplied by simply knowing the opening share price.

A **cash loan** instead provides money and requires repayment of money with the stated interest terms. A securities loan provides shares and requires return of shares plus agreed compensation/charges. Borrowing 500 shares at a price of 120 does not mean the lender is automatically repaid exactly 60,000 in cash regardless of the later share price. Buying shares with borrowed cash is a leveraged **long** position, not a share short sale.

<a id="short-risks"></a>

### Risks named by the source, with their mechanisms

The source explicitly names borrowing fees, collateral requirements, recall risk and unbounded loss if price rises without bound. [L4 p5, next two bullets; `lecture-4-p005-short-sale-risks`](../../sources/annotated/lecture-4/page-005.md#lecture-4-p005-short-sale-risks).

- **Borrowing fee:** a charge for access to the securities, separate from the later repurchase price. A favorable price move need not cover it.
- **Collateral:** security provided to support performance. Posting collateral can tie up cash/assets; it is not automatically a trading expense equal to the deposit, nor a cap on possible loss.
- **Recall risk:** the lender may require return according to the agreement earlier than the trader planned. The short seller may need replacement borrowing or repurchase on unfavorable terms. No universal recall deadline or present-day market rule is claimed here.
- **Price risk:** repurchase becomes more expensive as price rises. For a simple uncovered share short, the price can rise without a fixed upper bound, so the price-loss potential is not capped at the original sale proceeds. Practical controls or liquidation do not create a guaranteed contractual loss cap.

The source's short-sale description is not permission to short every asset in every account. These are mechanism explanations, not current legal eligibility, fee quotations or broker rules.

<a id="short-pricing"></a>

### Why borrowing availability matters for no-arbitrage

The source says some no-arbitrage arguments require shorting the underlying; if that is restricted, only one side of a pricing relationship may be enforceable. [L4 p5, lower pricing-relevance box; `lecture-4-p005-short-sale-pricing`](../../sources/annotated/lecture-4/page-005.md#lecture-4-p005-short-sale-pricing).

**Supplemental reasoning:** buying a deliverable asset now and arranging its future sale is different from reversing the trade by selling a borrowed asset now and arranging a future purchase to return it. The reverse direction requires actual access to the borrowed security and permissible use/funding of proceeds. If one direction cannot be implemented, an argument based on freely trading both directions does not establish an exact two-sided equality. Do not label every deviation from an ideal formula an available arbitrage without checking the required legs.

<a id="short-table"></a>

## 7. Reproduce every entry of the source share cash-flow table

The source investor trades **500 shares**, opening price **120 dollars/share**, a **1 dollar/share dividend**, and closing price **100 dollars/share**. We label dollars **USD** for the classroom calculations; the dollar symbol alone does not establish a jurisdiction or a current instrument. The source does not give calendar dates or a financing rate. [L4 p6, example data and entire table; `lecture-4-p006-short-sale-cashflow-table`](../../sources/annotated/lecture-4/page-006.md#lecture-4-p006-short-sale-cashflow-table).

Choose the investor's viewpoint: receipt is positive, payment negative. “Buy shares” below means buy and later sell an owned holding; “short shares” means borrow/sell and later repurchase/return. The two columns are alternative positions, not two trades secretly combined in one account.

| Source cash-flow row | Buy shares, USD | Short shares, USD |
|---|---:|---:|
| Initial share transaction | −60,000 | +60,000 |
| Dividend | +500 | −500 |
| Closing share transaction | +50,000 | −50,000 |
| Net profit | **−9,500** | **+9,500** |

This is an accessible reproduction of the original table, preserving every sign and entry. **Supplemental arithmetic explanation:**

1. Opening gross amount: $500\text{ shares}\times120\text{ USD/share}=60{,}000$ USD. The owner pays it; the short seller receives sale proceeds while owing shares.
2. Dividend amount: $500\times1=500$ USD. The owner receives the dividend; the short seller pays the compensating amount.
3. Closing amount: $500\times100=50{,}000$ USD. The owner receives it on sale; the short seller pays it to obtain shares to return.
4. Owner's sum: $-60{,}000+500+50{,}000=-9{,}500$ USD.
5. Short seller's sum: $60{,}000-500-50{,}000=+9{,}500$ USD.
6. Check: the two simplified totals add to zero. The dividend reduces the short's price-only gain of $500(120-100)=10{,}000$ by 500.

The borrowed-share delivery and return are securities movements, not an additional 60,000 or 50,000 cash gain. Counting both the sale cash and the share return as a second profit would double count the transaction.

<a id="short-assumptions"></a>

### What lets the source call these sums opposite profits?

The source explicitly ignores **financing and stock-borrowing costs**. Under that convention, the long and short profits are equal in magnitude and opposite in sign. [L4 p6, lower interpretation box; `lecture-4-p006-short-sale-example-assumptions`](../../sources/annotated/lecture-4/page-006.md#lecture-4-p006-short-sale-example-assumptions).

**Supplemental accounting qualifications:** the table also supplies no separate tax, spread, transaction fee, collateral interest or other distribution; these are omitted from its displayed arithmetic rather than asserted to vanish in practice. The amounts occur at different dates. Adding them nominally follows the source's no-financing convention; it is not a discounted-value calculation and does not assume the short can freely spend all sale proceeds. Actual long/short investors can face different costs, so their final realized profits need not negate one another.

Let $n$ be shares, $S_0$ opening share price, $S_c$ closing price, and $d$ total dividend per share during the holding interval. Here $c$ is a closing-date label. Write $\Pi_L$ for the owned-long profit and $\Pi_S$ for the borrowed-share short profit. The simplified general profits, in a common currency, are

$$\Pi_L=n(S_c-S_0+d),\qquad \Pi_S=n(S_0-S_c-d).$$

The subscripts mean owned-long and borrowed-share short, not futures sides. With a separately supplied total stock-borrowing cost $B$ and no other financing, the short becomes $\Pi_S=n(S_0-S_c-d)-B$. This is an explicit supplemental extension, not a fee hidden in the source 9,500.

<a id="short-transfer"></a>

### Boundary and fee checks — supplemental

Keep the source 500 shares, opening 120 and dividend 1. At closing 150, the short pays 75,000 to repurchase and 500 compensation, so profit is $60{,}000-75{,}000-500=\mathbf{-15{,}500}$ USD. This demonstrates why receiving 60,000 initially was not earning 60,000. As the closing price grows without bound, the negative repurchase term has no fixed lower bound.

Under the stipulated nonnegative share-price, fixed-dividend and no-cost model, closing price 0 gives short profit $60{,}000-500=\mathbf{59{,}500}$ USD. This is a model boundary, not a forecast or an executable promise; distributions, borrow charges or operational problems can change the result. Break-even solves $120-S_c-1=0$, hence **119 USD/share**, not 120. At the source closing 100, an additional supplied total borrow fee 300 would reduce 9,500 to **9,200 USD**. No current fee is being estimated.

<a id="obligations"></a>

## 8. Forwards and futures both impose obligations

The source states that both create an obligation to transact at a specified future date. [L4 p7, opening statement; `lecture-4-p007-forward-futures-obligation`](../../sources/annotated/lecture-4/page-007.md#lecture-4-p007-forward-futures-obligation).

**Supplemental distinction from options:** a forward long agrees to buy and the short to sell the specified quantity at the contractual delivery price; an unfavorable future price does not give the long a unilateral option to decline. Futures also create obligations, with standardized settlement arrangements and daily cash effects. Final physical delivery or cash settlement depends on the contract, and an offsetting closing trade can end exposure before expiry. The ability to close at the market price is not a free right to erase a loss. An option buyer, by contrast, has a contractual exercise choice and ordinarily pays a premium for that right.

<a id="forward-futures-table"></a>

### Reproduce the source comparison, then qualify it

[L4 p7, central comparison table; `lecture-4-p007-forward-futures-table`](../../sources/annotated/lecture-4/page-007.md#lecture-4-p007-forward-futures-table).

| Feature | Forward — source wording | Futures — source wording |
|---|---|---|
| Venue | Usually OTC | Exchange traded |
| Terms | Customised | Standardised |
| Counterparty risk | Managed bilaterally | Managed through a clearinghouse |
| Settlement | Usually at maturity | Marked to market daily |
| Margin | Contract dependent | Required by clearing rules |

**Supplemental explanation of all five rows:** **OTC**, over-the-counter, means privately negotiated trading rather than a standardized exchange venue. **Customised** terms can specify the parties' chosen quantity/date; **standardised** terms use the contract's published specifications. **Counterparty risk** is failure of a party to meet obligations. **Bilateral** management means the parties face and manage each other directly. A **clearinghouse/central counterparty** interposes within cleared trading and manages obligations using collateral and other arrangements. **Marking to market** updates the position to a reference settlement price and determines settlement gains/losses. **Margin** supports performance; its meaning is developed below.

This is the source's stylized comparison, **not an exhaustive current legal classification**. Preserve “usually” and “contract dependent.” OTC describes venue, not an invariant absence of clearing: some OTC contracts can be centrally cleared, as the prerequisite clearing reference explains. Likewise an OTC contract can have collateral and interim settlements according to its terms. Clearing manages credit exposure; it does not eliminate market losses, funding pressure or all default risk. Do not turn the bilateral row into “every forward is uncleared” or the maturity row into “no forward can require cash before maturity.” This lesson does not verify today's rules for any exchange, jurisdiction or account.

<a id="delivery-price"></a>

### Fixed delivery price versus a new contract's quote

The source defines **delivery price $K$** as the price fixed in an existing contract, and **forward price** as the delivery price that would make a new contract worth zero today. [L4 p7, lower terminology box; `lecture-4-p007-delivery-forward-price`](../../sources/annotated/lecture-4/page-007.md#lecture-4-p007-delivery-forward-price).

**Supplemental notation:** let date $0$ be inception, $t$ today's valuation date and $T$ the later delivery date. Write $F_{t,T}$ for today's quoted forward delivery price for that maturity; $K$ remains the old agreed price. Both are currency per underlying unit. Write $f_t$ for the current value **per underlying unit of the existing long contract**. At fair inception with no upfront premium, $K=F_{0,T}$ and $f_0=0$. Later the market quote can change while $K$ stays fixed, so the old contract may have positive or negative value. Zero **value** does not mean $K=0$, zero notional or no future payment.

For an illustrative one-unit forward initially fixed at 52, a later new quote 55 does not rewrite the old 52 obligation. At maturity with spot 57, the old long's net exchange value is $57-52=5$ currency units; with spot 48 it is $48-52=-4$. Those are separate supplemental realized scenarios, not forecasts. Before maturity, a quote difference is not automatically the cash value today: the remaining payment dates/funding/performance terms must be valued. The [pricing-benchmark lesson](lesson-l4-pricing-benchmark.md) makes that distinction explicit rather than treating quote, fixed price and current value as synonyms.

<a id="daily-formula"></a>

## 9. Daily settlement converts quote changes into cash gains and losses

For this section only, $F_t$ is the **futures settlement quote** on day $t$, not the forward notation $F_{t,T}$ above. A settlement quote is the contract's reference price used for daily marking/settlement; it need not be the price of a physical asset purchased that day. Let $N\geq0$ be the number of long contracts and $Q>0$ units represented by each contract. Write $\Delta V_t$ for the day's monetary gain and $t-1$ for the previous settlement date. With quotes in currency/unit, the source gives

$$\Delta V_t=NQ(F_t-F_{t-1}).$$

[L4 p8, upper definition and equation; `lecture-4-p008-daily-gain-formula`](../../sources/annotated/lecture-4/page-008.md#lecture-4-p008-daily-gain-formula). Here $\Delta V_t$ denotes that day's gain, not the entire current value/notional of all contracts. $t-1$ is the previous settlement date. A short position of the same size has the negative daily gain.

**Units and multiplier:** contracts × underlying units/contract × currency/underlying unit = currency. The quantity $Q$ acts as the gain multiplier for a one-unit move in this price quote. For an index future, a separately stated currency-per-index-point multiplier would perform the conversion; do not substitute an index level or a margin deposit for the multiplier. Always use the actual quote convention and contract size supplied.

For a fixed position over successive settlement dates, the nominal daily differences add to $NQ(F_{\mathrm{last}}-F_{\mathrm{first}})$ because intermediate prices cancel. That sum ignores financing, withdrawals/additions and costs. Equal cumulative nominal gain does not mean the cash-flow dates are economically irrelevant.

<a id="daily-source-example"></a>

### Reproduce the source loss, including its sign and units

The source uses **two long contracts**, **100 units per contract**, and a quote falling from **52 to 50.50 dollars/unit**. [L4 p8, lower example; `lecture-4-p008-daily-loss-example`](../../sources/annotated/lecture-4/page-008.md#lecture-4-p008-daily-loss-example).

1. Quantity represented: $2\times100=200$ units.
2. Quote change: $50.50-52=-1.50$ USD/unit in our stated classroom dollar convention.
3. Daily gain: $200(-1.50)=\mathbf{-300}$ USD: a loss and settlement outflow for the long.
4. Supplemental opposite-side check: two shorts gain **+300 USD** on that move.
5. Supplemental notional check: starting quoted exposure is $2\times100\times52=\mathbf{10{,}400}$ USD; at 50.50 it is **10,100 USD**. These are not initial purchase payments for the underlying or the current fair value of a newly entered futures contract.

A fairly priced new futures position can have near-zero initial contract value while its quote times quantity describes substantial exposure. Marking and settling can reset accumulated contractual value; the next quote move still generates gains/losses. Cash already settled is not erased by a zero marked value, and the quote is not a guarantee of final spot.

<a id="margin-mechanics"></a>

## 10. Margin is collateral and settlement funding, not an asset purchase price

The source states that initial margin is deposited at opening; daily gains/losses enter the margin account through variation margin; falling below maintenance may trigger a call requiring replenishment. [L4 p8, middle bullets; `lecture-4-p008-margin-mechanics`](../../sources/annotated/lecture-4/page-008.md#lecture-4-p008-margin-mechanics).

**Supplemental definitions:** **initial margin** is the opening performance-support deposit; **variation margin** transfers marked gains/losses; **maintenance margin** is the stipulated minimum balance in the simplified account model; a **margin call** requests funds according to its terms. A restore-to amount is separate from the threshold and must be supplied. The source gives **no numerical initial/maintenance amount or restore-to rule** on p 8; none can be inferred from the 300 loss.

Posting collateral is a cash commitment but not automatically a trading loss. Returned collateral is not automatically profit. Margin is neither an option premium nor payment to own the 10,400 notional underlying. It is also **not the complete loss limit**: a sufficiently adverse price move can generate losses larger than the original deposit, and account rules may require earlier action. Precise live rules and timings are outside this archived example.

<a id="margin-example"></a>

### A fully specified account path — supplemental, not source margin data

Keep the source two 100-unit long contracts, starting quote 52. Supply a **total account initial deposit 2,000 USD**, maintenance threshold **1,500 USD**, and a rule: if the end-of-settlement balance is **strictly below**1,500, add enough cash to restore it to 2,000. No interest, fees, withdrawals or other positions; a final closing withdrawal is shown after all trading cash flows. These are hypothetical account terms, not an exchange rule.

| Step | Settlement quote, USD/unit | Daily long gain, USD | Balance after gain before any call, USD | New cash deposited, USD | Balance after deposit, USD |
|---|---:|---:|---:|---:|---:|
| Open | 52.00 | 0 | 0 | 2,000 initial | 2,000 |
| Day 1 — source price move | 50.50 | −300 | 1,700 | 0 | 1,700 |
| Day 2 | 49.50 | −200 | 1,500 | 0 | 1,500 |
| Day 3 | 49.00 | −100 | 1,400 | 600 | 2,000 |
| Day 4, close | 52.00 | +600 | 2,600 | 0 | 2,600 |

Work the threshold decisions, not just the balances. Day 2 equals 1,500, so it does not meet this example's **below** condition. Day 3 is 100 below maintenance, but the required addition is **600**, because the rule restores to 2,000, not merely to 1,500. Day 4 gains $200(52-49)=600$ USD. Total trading gain is $-300-200-100+600=0$, matching unchanged first/last quote.

At closure, withdrawing the 2,600 balance returns the initial 2,000 plus the later 600 contribution. Net investor cash across deposits/withdrawal is $-2{,}000-600+2{,}600=0$ before financing. It is not a 600 trading profit. The trader still had to supply 600 before the recovery, which illustrates **liquidity/funding risk**: cash may be needed at an inconvenient time even if the eventual net trading outcome is zero.

As a separate supplemental stress calculation, a two-contract quote fall from 52 to 40 gives $200(40-52)=-2{,}400$ USD, larger than the hypothetical 2,000 initial deposit. This shows exposure is not capped by that deposit; it does not assert that an actual broker would permit the account to remain open until that price or that 2,400 is the maximum possible loss.

<a id="practice"></a>

## 11. Progressive supplemental practice — separate answers follow

<a id="exercise-classify-prompt"></a>
### Exercise 1 — assets and use (outcome 1)

Classify the source's shares, gold, copper and wheat examples and explain the economic criterion. Why does industrial use of gold not automatically disqualify it from the lecture's investment category? Explain carry, replication and convenience yield in words; distinguish a use benefit from a cash dividend. [Answer 1](#exercise-classify-answer).

<a id="exercise-source-table-prompt"></a>
### Exercise 2 — reproduce the complete source table (outcome 2)

For 500 shares, opening 120, dividend 1 and closing 100 dollars/share, reconstruct all three cash-flow rows and both profits. Explain what security is borrowed/returned, why the short pays dividend compensation and why sale proceeds are not profit. State the source's cost assumptions. [Answer 2](#exercise-source-table-answer).

<a id="exercise-short-transfer-prompt"></a>
### Exercise 3 — new short-sale case and boundaries (outcome 2)

A hypothetical short borrows 200 shares, sells at 40 USD/share, pays 0.50 USD/share dividend compensation, and covers at 35. A separate total borrow fee is 60 USD; ignore other financing/costs. Compute all cash flows and net profit. Find the fee-adjusted break-even repurchase price and profit if covering at 50 instead. Explain why collateral does not cap this loss. [Answer 3](#exercise-short-transfer-answer).

<a id="exercise-contracts-prompt"></a>
### Exercise 4 — compare without overgeneralizing (outcome 1)

Reconstruct the five forward/futures comparison rows. Explain why “usually OTC” does not mean “never cleared,” why the long cannot decline an unfavorable forward as an option holder could, and why fixed $K$, a new quote and current contract value differ. Is a borrowed-share short sale the same as a short forward? [Answer 4](#exercise-contracts-answer).

<a id="exercise-settlement-prompt"></a>
### Exercise 5 — source loss and supplemental margin path (outcome 2)

Compute the source two 100-unit long loss for 52 to 50.50 and the opposite short gain. Rebuild all balances/calls in the supplemental 2,000/1,500 account through 50.50,49.50,49,52. Distinguish total trading gain from deposits and final withdrawal. Test the separate 52-to 40 stress loss against initial deposit. [Answer 5](#exercise-settlement-answer).

<a id="exercise-forecast-prompt"></a>
### Exercise 6 — price discovery is not certainty (outcome 1)

A learner sees a quote 52 and says future spot must equal 52, the contract is a free asset because initial value is zero, and any positive derivative gain means the business hedge succeeded. Repair the claims using the four source trading uses and the supplemental spot 48/57 possibilities. [Answer 6](#exercise-forecast-answer).

<a id="exercise-explain-teachback-prompt"></a>
### Exercise 7 — explain obligations and constraints (outcome 1)

Teach a beginner the difference between borrowing cash and borrowing shares, an existing delivery price and a current quote/value, bilateral/cleared arrangements and trading venue, and initial/variation/maintenance margin. Include recall/dividend obligations and why an ideal two-sided arbitrage argument can fail when shorting is unavailable. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### Exercise 8 — diagnose three incorrect profit calculations (outcome 2)

A learner reports the source short profit as 10,000, the daily two-contract loss as 1.50, and the supplemental recovered margin-account profit as 600. Correct all three with full quantities/signs and dates. Explain which assumptions permit nominal addition and name a remaining financing/performance risk. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 12. Separate supplemental answers and diagnosis

<a id="exercise-classify-answer"></a>
### Answer 1

Shares and gold are the source's **investment-asset** examples; copper and wheat its **consumption-asset** examples. The criterion is principal holding purpose for significant investor holdings versus mainly use/consumption, not physical versus financial or the possibility of speculation. Gold can have industrial uses and substantial investment holdings simultaneously. Carry covers holding costs/benefits; replication matches relevant dated obligations/cash flows; convenience yield is access/use value of inventory and need not be a cash payment. Such inventory benefits or short-sale constraints can obstruct a simple reversible financial strategy.

**Retry:** explain whose holding/use matters and what benefit would be lost by giving up the inventory; do not classify only from whether prices can rise.

<a id="exercise-source-table-answer"></a>
### Answer 2

Opening amount $500\times120=60{,}000$ USD; dividend $500\times1=500$; closing amount $500\times100=50{,}000$. Buy column: **−60,000,+500,+50,000**, total **−9,500 USD**. Short column: **+60,000,−500,−50,000**, total **+9,500 USD**. The short owes equivalent 500 shares, not simply the opening 60,000 cash; buying them back discharges that security obligation. Dividend compensation prevents the short from ignoring the lender's distribution entitlement. Proceeds still face repurchase and other obligations. The source ignores financing and stock-borrowing costs; additional omitted charges/terms could change actual results and opposite-profit symmetry.

**Retry:** if you obtained 10,000, include the dividend compensation. If both columns receive dividends, identify which party sold the borrowed shares onward.

<a id="exercise-short-transfer-answer"></a>
### Answer 3

Sale receipt **8,000 USD**; compensation **−100 USD**; repurchase at 35 **−7,000 USD**; borrow fee **−60 USD**. Net **840 USD**. Per-share allocated fee is $60/200=0.30$ USD/share, so break-even solves $40-S_c-0.50-0.30=0$, giving **39.20 USD/share**. At closing 50, repurchase costs 10,000 and net is $8{,}000-100-10{,}000-60=\mathbf{-2{,}160}$ USD. Securities must still be returned; collateral supports performance but does not fix a maximum repurchase price or loss. Fee 60 is supplied, not inferred from a current securities-lending rate.

**Retry:** scale the dividend by 200 shares, but do not multiply the already-total fee 60 again. Check break-even by substituting 39.20: repurchase 7,840 and net zero.

<a id="exercise-contracts-answer"></a>
### Answer 4

Source rows: forward usually OTC/futures exchange traded; customised/standardised; bilateral risk management/clearinghouse; usually maturity settlement/daily marking; contract-dependent margin/clearing-rule margin. These are stylized source comparisons, not universal legal rules. Some OTC contracts can be cleared or collateralized; venue does not determine clearing. Both forward/futures sides have obligations, unlike an option buyer's exercise choice. $K$ remains fixed in an existing forward; the current forward quote applies to a new zero-value contract; current value $f_t$ measures the old contract's worth at today's date. A short forward is a future sale commitment, while a borrowed-share short sells borrowed securities now and must later return them.

**Retry:** retain “usually” and “contract dependent.” If you said “no initial payment means no obligation,” write the delivery exchange and its possible adverse value.

<a id="exercise-settlement-answer"></a>
### Answer 5

Total underlying 200 units; quote change**−1.50 USD/unit**; long gain **−300 USD**, short gain **+300 USD**. Account after source loss: **1,700**. Next quote 49.50 loses**200**, balance**1,500**, no call under the strictly-below rule. At 49, loss**100**, balance**1,400**; add**600** to restore**2,000**. At 52, gain**600**, ending**2,600**. Trading sum is **0**, not 600. Deposits 2,000+600 equal the 2,600 final withdrawal; nominal net cash is zero, but 600 was needed before recovery. Separate 52-to 40 stress loss is **−2,400 USD**, exceeding initial 2,000 by 400; actual intervention rules are unspecified.

**Retry:** do not count a top-up as trading revenue or refunded collateral as profit. The source supplies the 300 loss; the 2,000/1,500/restore-to account terms are explicitly supplemental.

<a id="exercise-forecast-answer"></a>
### Answer 6

Quote 52 is a current transaction reference, not guaranteed or necessarily unbiased future spot. The hypothetical 48/57 outcomes would give a one-unit long fixed at 52 maturity exchange values **−4/+5**, respectively; no probabilities or forecast mean are supplied. Zero fair entry value is not a free underlying asset: future obligations and possible collateral/funding remain. Hedgers transfer an exposure, speculators deliberately accept risk, arbitrageurs compare matched inconsistent prices, and observable quotes support price discovery. A derivative gain alone can coexist with an adverse business outcome, so evaluate the complete exposure and costs. “Market-clearing price” here is supply/demand matching, not a statement that a clearinghouse guarantees a forecast.

**Retry:** separate today's quote, contractual delivery price, contract value and the spot outcome observed later before interpreting any number.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation

“A cash loan owes money plus its agreed interest; a security loan owes equivalent securities plus required compensation/charges. A share short sells borrowed stock now, later repurchases it and faces price, dividend, fee, collateral and recall risks. An existing forward fixes its delivery price but its value and new-market quote can change. OTC is a venue description, not a rule that nothing is cleared; clearing manages performance risk without removing price losses. Initial margin is security, variation margin transfers gains/losses, and maintenance is a threshold whose call rule must be specified. Shorting restrictions can block a reverse replication, so a two-sided ideal pricing equality cannot simply be enforced by an unavailable trade.”

**Retry:** if you rely on “always,” identify whether the source actually says “usually,” “may” or “contract dependent.” Separate institutional description from a current rule that would require separate verification.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8

The source short price-only gain 10,000 loses 500 of dividend compensation, leaving **9,500 USD** before the source-omitted financing/borrow costs. The daily quote change −1.50 is **per unit**; two contracts×100 units/contract gives **−300 USD**. The recovered margin balance 2,600 includes 2,000 initial and 600 later deposits; daily trading gains sum to **zero**. Withdrawing collateral is not a new 600 profit. Nominal addition assumes financing/interest and stated other costs are ignored; actual daily outflows can require funding before gains arrive, and performance/default or recall constraints can affect execution.

**Retry:** label each entry as price per unit, total trading cash, collateral transfer or business/asset value. Then retain the dates before adding the compatible amounts.

<a id="evidence"></a>

## Evidence, accessible presentation and stopping point

All full raw/normalized pages 3–8 and six original PNGs were inspected. Page 3 has asset definition/distinction boxes; page 4 has a use list and forecast warning; page 5 lists short-sale mechanics/risks and pricing relevance; page 6 has the four-row two-position cash-flow table; page 7 has the five-row comparison table and terminology; page 8 has a daily formula, margin bullets and loss example. These source tables are reproduced faithfully above. No additional source graph or margin path is invented; all new tables/scenarios are labelled supplemental.

| Page | Full normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|
| 3 | [Full 3](../../sources/annotated/lecture-4/page-003.md) | [Raw 3](../../sources/extracted/lecture-4/page-003.md#page-3) | [Image 3](../../sources/assets/lecture-4/page-003.png) |
| 4 | [Full 4](../../sources/annotated/lecture-4/page-004.md) | [Raw 4](../../sources/extracted/lecture-4/page-004.md#page-4) | [Image 4](../../sources/assets/lecture-4/page-004.png) |
| 5 | [Full 5](../../sources/annotated/lecture-4/page-005.md) | [Raw 5](../../sources/extracted/lecture-4/page-005.md#page-5) | [Image 5](../../sources/assets/lecture-4/page-005.png) |
| 6 | [Full 6](../../sources/annotated/lecture-4/page-006.md) | [Raw 6](../../sources/extracted/lecture-4/page-006.md#page-6) | [Image 6](../../sources/assets/lecture-4/page-006.png) |
| 7 | [Full 7](../../sources/annotated/lecture-4/page-007.md) | [Raw 7](../../sources/extracted/lecture-4/page-007.md#page-7) | [Image 7](../../sources/assets/lecture-4/page-007.png) |
| 8 | [Full 8](../../sources/annotated/lecture-4/page-008.md) | [Raw 8](../../sources/extracted/lecture-4/page-008.md#page-8) | [Image 8](../../sources/assets/lecture-4/page-008.png) |

Canonical source units are verified despite historical normalized draft banners; that does not approve this lesson. No registered source issue affects these sixteen units. No restricted textbook or private learner evidence was used. The missing planned replication-and-carry concept remains a metadata dependency, not a fabricated read or a circular prerequisite for these inline explanations. Attempt both teach-backs and cash-flow exercises before continuing; author checks are not learner mastery or independent teaching approval.
