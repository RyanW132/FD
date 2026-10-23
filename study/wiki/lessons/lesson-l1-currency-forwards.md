# Currency quotations and a sterling hedge

<a id="status"></a>

**Unreviewed teaching draft — Lecture 1, physical pages 23–25.** Source-based teaching is cited by exact unit below. Definitions that unpack the slides, new examples, practice and all answers are **supplemental**, not official solutions. This is educational preparation, not investment advice, approval, publication or learner mastery.

<a id="outcomes"></a>

## Why this matters and what you will do

A business can know exactly how many pounds it owes while not knowing how many dollars those pounds will cost. A currency forward can fix that future dollar budget. It cannot promise that the fixed price will beat the eventual market price.

1. **Explain:** given the source bid/offer table and a sterling payable or receivable, name the quote units, choose the customer's correct trading side and maturity, identify long/short, and explain what the hedge fixes. Success requires correct quote direction, both trading perspectives, future payment timing and the page-24 currency-label caveat.
2. **Apply:** given a GBP quantity and USD/GBP prices, calculate dollar conversion, fixed payment, both signed maturity payoffs and the combined hedged payment/receipt; explain zero and adverse outcomes. Show unit cancellation and intermediate steps; report dollars to the cent. Explain why a net economic payoff is not extra cash on physical delivery, and diagnose an incorrect hedge direction.

Prerequisite: [forward obligations and payoff](lesson-l1-forward-contracts.md#foundations). **Supplemental readiness check:** if one pound costs two dollars, does buying ten pounds cost twenty dollars or five dollars? If unsure, begin with the units bridge below; the answer is twenty dollars because you multiply pounds by dollars per pound.

<a id="foundations"></a>

## 1. Units and promises before formulas — supplemental foundation

**GBP** means pounds sterling (£); **USD** means US dollars ($). **Foreign exchange (FX)** is exchanging currencies. A quote of **1.5532 USD/GBP** means one GBP costs 1.5532 USD. The slash means “per,” not a multiplication instruction. Thus GBP × USD/GBP leaves USD: pounds cancel. To convert dollars to pounds using the same quote, divide dollars by USD/GBP. Do not add amounts in different currencies.

Reversing the quote requires its **reciprocal** (one divided by the quote). For a simple supplemental no-spread quote, 1.25 USD/GBP is 1/1.25 = 0.80 GBP/USD. Then £80 × 1.25 USD/GBP = $100 and $100 × 0.80 GBP/USD = £80. It is not 1.25 GBP/USD. A real two-sided quote also reverses which reciprocal is bid versus offer; we will keep the source's USD/GBP direction throughout rather than invert its spread.

A **payable** is money the firm owes; a **receivable** is money it expects to receive. A **hedge** offsets an existing exposure, meaning sensitivity of a business outcome to a changing price. **Appreciation of sterling** here means more USD per GBP; **depreciation** means fewer. A firm needing to buy pounds dislikes appreciation. A firm receiving pounds to sell for dollars dislikes depreciation. A **long GBP forward** commits to buy GBP for USD; a **short GBP forward** commits to sell GBP for USD. Those directions describe pounds, not both currencies at once.

| Symbol | Meaning in this lesson | Unit/convention |
|---|---|---|
| $Q$ | Positive contract quantity of sterling | GBP; £1,000,000 in the source |
| $T$ | Future exchange date, also called maturity | Six months after agreement in the source |
| $K$ | USD paid/received per GBP under the forward | USD/GBP, fixed today for exchange at $T$ |
| $S_T$ | Spot rate at maturity: price for exchange then | USD/GBP; not known at agreement |
| $\Pi_T^{\mathrm{long}}$, $\Pi_T^{\mathrm{short}}$ | Net economic maturity payoff of the GBP buyer/seller | USD; subscripts label time, superscripts label side, not powers |

**Calculation assumptions:** matching GBP quantity and date, both parties perform, no extra transaction or financing costs; source quoted rates are available for the indicated customer side. The full physical currency exchange is assumed when describing deliveries. For the supplemental net-value comparison, use one stated $S_T$ without a maturity bid/offer spread. Six months locates payment; it is not a multiplier, interest rate or compounding period in the payoff formula. We do not derive a fair forward rate or value the contract before maturity. Payoff equals forward-position profit only if it also has zero initial value/no premium and no additional costs; business profit remains a different quantity.

<a id="quotation-table"></a>

## 2. Read the whole quotation table, from the dealer's perspective

**Source table, accessible transcription.** The rows identify spot exchange and three future delivery maturities; columns give bid and offer. All cells are **USD per GBP**, not percentages or total dollar amounts. These are historical classroom quotes, not current prices. [L1 physical p23, upper embedded table and bottom convention; `lecture-1-p023-fx-quotation-table`](../../sources/annotated/lecture-1/page-023.md#lecture-1-p023-fx-quotation-table).

| Maturity | Dealer bid (USD/GBP) | Dealer offer (USD/GBP) |
|---|---:|---:|
| Spot | 1.5541 | 1.5545 |
| 1-month forward | 1.5538 | 1.5543 |
| 3-month forward | 1.5533 | 1.5538 |
| 6-month forward | 1.5526 | 1.5532 |

**Supplemental interpretation:** the dealer **bids to buy GBP** and **offers to sell GBP**. A customer selling pounds receives the bid; a customer buying pounds pays the offer. The difference between offer and bid is the **spread**, not a guaranteed customer profit. First identify the currency being bought/sold, then choose maturity, then read the correct column. Here each longer maturity has lower quotes, but this particular table does not prove all forward rates always fall with maturity or forecast a falling future spot rate.

<a id="quotation-questions"></a>

The source asks: what is the spot rate, what six-month rate can be fixed today, and why prefer fixing to waiting? [L1 physical p23, lower question box; `lecture-1-p023-quotation-questions`](../../sources/annotated/lecture-1/page-023.md#lecture-1-p023-quotation-questions).

**Supplemental worked responses:** there is a spot **pair**, 1.5541 bid / 1.5545 offer, not one executable rate for every trade. Buying GBP now uses 1.5545; buying GBP in six months uses the six-month offer 1.5532. Selling GBP in six months uses 1.5526. The forward fixes a future exchange rate for budgeting rather than leaving it uncertain. “Fixed today” describes agreement, not payment today. The source gives quotes, not the model that produces them.

<a id="sterling-exposure"></a>

## 3. Start with the commercial payment, then choose the hedge

**Source situation:** a US firm owes a UK supplier **£1 million in six months**. Sterling appreciation raises the dollar cost of obtaining those pounds. [L1 physical p24, upper exposure box; `lecture-1-p024-sterling-exposure`](../../sources/annotated/lecture-1/page-024.md#lecture-1-p024-sterling-exposure).

**Supplemental reasoning:** without a hedge the firm waits until $T$, buys $Q$ GBP at $S_T$, and pays the supplier. Dollar cost is $Q S_T$. This product rises when $S_T$ rises. To remove this matched purchase-price uncertainty it needs a promise to **receive GBP**, so it buys GBP forward: it is long GBP, not short merely because the original supplier payment is an outflow.

<a id="sterling-hedge"></a>

The source takes a long forward for £1,000,000 at $K=1.5532$ USD/GBP, the six-month **offer**. [L1 physical p24, middle hedge box; `lecture-1-p024-sterling-forward-hedge`](../../sources/annotated/lecture-1/page-024.md#lecture-1-p024-sterling-forward-hedge).

**Preserved source error:** the original multiplication actually prints **$1,000,000 × 1.5532 = $1,553,200**, despite specifying a sterling exposure. The dimensionally consistent teaching interpretation is **£1,000,000 × 1.5532 USD/GBP = $1,553,200**. The original is unchanged; the dollar prefix on its multiplier is not silently endorsed.

**Supplemental timeline and worked calculation:**

1. Today: agree to receive £1,000,000 and pay dollars in six months. The delivery amount is fixed now, not paid now.
2. Compute the dollar payment: 1,000,000 GBP × 1.5532 USD/GBP = **1,553,200 USD**; no rounding is necessary.
3. At $T$: pay **$1,553,200** to the forward counterparty and receive **£1,000,000**.
4. Pay that **£1,000,000** to the supplier. Do not purchase an additional £1,000,000 in the spot market in this physical-delivery route.

<a id="hedge-objective"></a>

The source asks whether the treasurer guaranteed a profit or the future dollar cost. [L1 physical p24, bottom question; `lecture-1-p024-hedge-objective-question`](../../sources/annotated/lecture-1/page-024.md#lecture-1-p024-hedge-objective-question).

**Supplemental answer:** the matched future dollar cost is fixed, conditional on performance; a positive forward payoff is not guaranteed. If sterling becomes cheaper, waiting would have cost less, but the agreed dollar budget remains unchanged. Mismatched timing/quantity, a changed supplier bill or counterparty failure can leave risk. A hedge is not a guarantee of the firm's total commercial profit.

<a id="payoff-formula"></a>

## 4. Derive the currency payoff from the two legs

At $T$ the long receives sterling worth $Q S_T$ USD and pays $QK$ USD. Subtract cost from value received:

$$\Pi_T^{\mathrm{long}}=Q(S_T-K)=QS_T-QK.$$

For the source, $Q=1{,}000{,}000$ GBP and $K=1.5532$ USD/GBP. [L1 physical p25, upper equation; `lecture-1-p025-currency-payoff-formula`](../../sources/annotated/lecture-1/page-025.md#lecture-1-p025-currency-payoff-formula). Plain-language reading: pounds contracted × (market dollars per pound minus contracted dollars per pound) = dollar payoff.

**Supplemental counterpart:** the short receives dollars and delivers pounds, giving $\Pi_T^{\mathrm{short}}=Q(K-S_T)=-\Pi_T^{\mathrm{long}}$. The market value of delivered currency is not extra cash received; on physical exchange there are only the agreed pounds and dollars. A cash-settled contract instead specifies its difference payment; the payoff formula alone does not establish settlement terms.

<a id="payoff-table"></a>

## 5. Check all three source outcomes

**Source table:** [L1 physical p25, central three-row table; `lecture-1-p025-currency-payoff-table`](../../sources/annotated/lecture-1/page-025.md#lecture-1-p025-currency-payoff-table).

| $S_T$ (USD/GBP) | Long forward payoff (USD) | Source interpretation |
|---:|---:|---|
| 1.4500 | −$103,200 | Sterling depreciated |
| 1.5532 | $0 | Break-even |
| 1.6500 | +$96,800 | Sterling appreciated |

**Supplemental step-by-step verification:**

- At 1.4500: difference = 1.4500 − 1.5532 = **−0.1032 USD/GBP**. Multiply by £1,000,000 to get **−$103,200**. The sterling received is worth $1,450,000; the payment stays $1,553,200. The short payoff is +$103,200.
- At 1.5532: difference = **0**; both payoffs are **$0**. Currency delivery and the supplier payment still occur.
- At 1.6500: difference = 1.6500 − 1.5532 = **+0.0968 USD/GBP**. Multiply by £1,000,000 to get **+$96,800**. Sterling received is worth $1,650,000 against $1,553,200 paid. The short payoff is −$96,800.

Each row's long and short sum to zero before costs. The source's appreciation/depreciation labels describe higher/lower sterling rates in the scenario; the payoff test itself is against the fixed **$K$**, not against today's spot quote.

<a id="payoff-direction"></a>

The source states that long gains if $S_T>K$, loses if $S_T<K$. [L1 physical p25, lower result box; `lecture-1-p025-currency-payoff-direction`](../../sources/annotated/lecture-1/page-025.md#lecture-1-p025-currency-payoff-direction). The equality case is zero. This follows directly because $Q$ is positive: multiplication by $Q$ preserves the sign of $S_T-K$.

**Supplemental combined-cost check:** compare an unhedged spot purchase with the forward's value advantage. Effective hedged cost is

$$QS_T-\Pi_T^{\mathrm{long}}=QS_T-Q(S_T-K)=QK.$$

At 1.6500: $1,650,000 − $96,800 = **$1,553,200**. At 1.4500: $1,450,000 − (−$103,200) = **$1,553,200**. This is an economic comparison, **not** a second spot purchase plus an extra payoff cash receipt on top of physical delivery. The actual physical route is the timeline above.

**Supplemental opposite exposure:** if a US firm will instead receive GBP and wants dollar certainty, it sells those pounds forward (short GBP) at the **bid**, not the offer. Unhedged dollar receipts $QS_T$ plus short payoff $Q(K-S_T)$ equal fixed receipts $QK$. Do not confuse a payable with a receivable or promise that both customers trade at the same table column.

<a id="practice"></a>

## 6. Graded practice — supplemental; attempt before answers

All exercises adapt or extend the source; all answers below are authored, not supplied official solutions. Exercises 1–3 assess outcome 1; 4–6 assess outcome 2.

<a id="exercise-quotes-prompt"></a>
### Exercise 1 — scaffold: select a quote

For a customer buying GBP now, buying it in three months, and selling it in six months, state the relevant table row, bid/offer column and numerical rate with units. Explain why “the spot rate is 1.5541” is incomplete. [Answer 1](#exercise-quotes-answer).

<a id="exercise-hedge-prompt"></a>
### Exercise 2 — transfer: choose a hedge

Firm A owes £1,000,000 in six months; Firm B expects to receive £1,000,000 then. Both want dollar certainty. Name the adverse FX move for each, the GBP forward side and the six-month quote each uses. Explain which currency each receives at forward delivery. [Answer 2](#exercise-hedge-answer).

<a id="exercise-explain-prompt"></a>
### Exercise 3 — teach back and correct labels

Explain to a beginner the three questions on p23 and the profit-versus-cost question on p24. Include dealer/customer perspectives, USD/GBP versus GBP/USD, what “fixed today” means, and why the printed $1 million multiplier must be labelled rather than copied into your unit calculation. [Answer 3](#exercise-explain-answer).

<a id="exercise-source-payoff-prompt"></a>
### Exercise 4 — scaffold: reconstruct the source table

For £1,000,000 long at 1.5532 USD/GBP, calculate the long and short payoffs at 1.4500, 1.5532 and 1.6500. Show value received minus payment for one nonzero row, the zero-sum check and the combined fixed supplier cost at the low and high rates. Identify actual physical transfers. [Answer 4](#exercise-source-payoff-answer).

<a id="exercise-receivable-prompt"></a>
### Exercise 5 — transfer: hedge a smaller receivable

A firm will receive £200,000 in six months and sells it forward using the source six-month bid. At maturity $S_T=1.6000$ USD/GBP. Calculate fixed USD receipts, unhedged USD receipts, short-forward payoff and the combined economic receipt. Assume the stated no-cost, matching-date/performance conventions. Why can the derivative lose while the hedge does its job? [Answer 5](#exercise-receivable-answer).

<a id="exercise-apply-prompt"></a>
### Exercise 6 — diagnose and teach back

A learner says: “At 1.6500 the payable firm gets £1 million, plus $96,800 extra from the forward, and only pays $1,553,200; so the hedge guarantees a profit. To hedge a receivable I should also buy GBP.” Correct both claims with the actual transfers, sign reasoning and a combined-position equation. Explain the zero-payoff boundary and one reason a real hedge can remain imperfect. [Answer 6](#exercise-apply-answer).

<a id="answers"></a>

## 7. Separate supplemental answers and targeted retries

<a id="exercise-quotes-answer"></a>
### Answer 1

Buying now: **spot offer 1.5545 USD/GBP**. Buying in three months: **3-month offer 1.5538 USD/GBP**. Selling in six months: **6-month bid 1.5526 USD/GBP**. The dealer buys GBP at the bid and sells at the offer; the customer does the opposite. Spot has bid 1.5541 and offer 1.5545, so the appropriate rate depends on direction. **Retry if reversed:** say “I buy pounds; the dealer sells pounds,” then choose offer before selecting the maturity.

<a id="exercise-hedge-answer"></a>
### Answer 2

A fears sterling appreciation: its USD purchase cost rises. It is **long GBP**, buying at **1.5532 USD/GBP**; it receives GBP and pays USD. B fears sterling depreciation: its GBP converts into fewer USD. It is **short GBP**, selling at **1.5526 USD/GBP**; it delivers the GBP receivable and receives USD. Both still have binding obligations if the rate moves favourably. **Retry if you chose the same side:** draw a GBP arrow for the business exposure; the hedge must supply what is missing or dispose of what is received, not add the same exposure.

<a id="exercise-explain-answer"></a>
### Answer 3

A sufficient teach-back states: spot is a two-sided 1.5541/1.5545 USD/GBP quote; the dealer buys at bid and sells at offer. Six-month GBP buyers fix 1.5532, sellers fix 1.5526, for future exchange. A firm may prefer budget certainty to an unknown later spot rate, sacrificing a potentially better rate. USD/GBP means dollars for one pound; GBP/USD is its inverse direction, not the same numerical quote (for example 1.25 USD/GBP = 0.80 GBP/USD without a spread). “Fixed today” is agreement today for payment later. The exposure is £1 million, so £1,000,000 × USD/GBP yields USD; the original's $ multiplier is a preserved currency-label error. The hedge fixes cost, not guaranteed profit. **Retry:** if any item is missing, explain just one pound's conversion and the date money changes hands, then retell the whole scenario.

<a id="exercise-source-payoff-answer"></a>
### Answer 4

Long payoffs are **−$103,200, $0, +$96,800**; short payoffs are **+$103,200, $0, −$96,800**. For the low row: receive £1 million worth $1,450,000, pay $1,553,200; difference −$103,200. For the high row the received sterling is worth $1,650,000, so difference +$96,800. Each long/short pair sums to $0. Combined-cost comparisons: $1,450,000 − (−$103,200) = **$1,553,200** and $1,650,000 − $96,800 = **$1,553,200**. Actual physical route: pay that fixed USD amount, receive £1 million, pass it to the supplier. At equality the same gross exchange still occurs. **Retry:** if the low-state combined cost fell, check that subtracting a negative payoff adds its magnitude; if you counted extra cash, list only the two currencies actually exchanged.

<a id="exercise-receivable-answer"></a>
### Answer 5

Use $K=1.5526$ USD/GBP and $Q=200,000$ GBP. Fixed receipts = 200,000 × 1.5526 = **$310,520**. Unhedged receipts = 200,000 × 1.6000 = **$320,000**. Short payoff = 200,000 × (1.5526 − 1.6000) = 200,000 × (−0.0474) = **−$9,480**. Combined economic receipt = $320,000 − $9,480 = **$310,520**, agreeing with physical delivery of £200,000 for the fixed dollars. The receivable gained USD value while the hedge lost the same incremental amount. Certainty, not the best eventual rate, was the objective. **Retry:** if the payoff is positive, begin with “short receives $310,520 and delivers pounds worth $320,000” before subtracting.

<a id="exercise-apply-answer"></a>
### Answer 6

The payable firm physically receives **£1 million** for **$1,553,200**, then pays its supplier. The **$96,800** is the excess market value of those pounds over the contracted dollar payment, not another cash receipt. Algebraically $QS_T-Q(S_T-K)=QK$: the fixed cost persists when the forward payoff is negative too, so a profit is not guaranteed. A receivable requires selling GBP forward: $QS_T+Q(K-S_T)=QK$. Buying GBP instead adds exposure to sterling rather than offsetting its USD value. At $S_T=K$ the derivative payoff is zero but delivery remains due. A timing/quantity mismatch or failure to perform can undermine exact hedging. **Retry:** separate the commercial exposure and derivative on two lines, identify their opposite sensitivities, then state which cash and currencies actually move.

<a id="stop"></a>

## Stop and check

Give your own teach-backs for exercises 3 and 6. A tutor should diagnose quote direction, date, arithmetic and physical-versus-value interpretation separately; retry the first missed step, then return to the full problem. Store learner responses privately. A prepared answer is not evidence that you have learned it. Next: [forward payoff graphs](lesson-l1-forward-payoff-graphs.md#outcomes); fair FX pricing is outside this lesson.

<a id="evidence"></a>

## Complete inspected evidence

All eight mapped substantive units are cited above. Normalized headers retain historical draft wording; canonical source units are verified, which does not approve this teaching. No private sources were used.

| Physical page | Complete normalized span | Unchanged raw span | Original PNG |
|---|---|---|---|
| 23 | [Full p23](../../sources/annotated/lecture-1/page-023.md) | [Raw p23](../../sources/extracted/lecture-1/page-023.md#page-23) | [Original p23](../../sources/assets/lecture-1/page-023.png) |
| 24 | [Full p24](../../sources/annotated/lecture-1/page-024.md) | [Raw p24](../../sources/extracted/lecture-1/page-024.md#page-24) | [Original p24](../../sources/assets/lecture-1/page-024.png) |
| 25 | [Full p25](../../sources/annotated/lecture-1/page-025.md) | [Raw p25](../../sources/extracted/lecture-1/page-025.md#page-25) | [Original p25](../../sources/assets/lecture-1/page-025.png) |
