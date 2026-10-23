# Futures obligations and daily settlement

<a id="status"></a>

**Unreviewed teaching draft — Lecture 1, physical pages 28–29.** Source claims have precise citations. Definitions that unpack the slides, extended cash-flow paths, exercises and all answers are **supplemental**, not official solutions. This is not a current exchange rulebook, investment advice, canonical approval or evidence of learner mastery.

<a id="outcomes"></a>

## Why timing matters, and what you will do

Two trades can have the same sum of gains yet demand cash on different dates. A futures trader cannot ignore today's loss merely because a later recovery is possible. This lesson teaches the obligation and signed daily settlement before the next lesson's margin-account calculations.

1. **Explain:** using the five-row source comparison, distinguish forwards from futures in venue, terms, counterparty, settlement and margin; explain why both sides post margin despite opposite payoffs. Success requires preserving “usually,” “mainly” and “contract-dependent,” distinguishing an obligation from optional exercise, and separating market, credit and cash-availability risks.
2. **Apply:** given positive contract count/size and successive prices, calculate signed daily long/short cash flows, their cumulative undiscounted totals and the effect of closing a position. Show price differences, quantity scaling and units; report pounds to the penny. Compare with a same-start-price forward only under explicit cash-flow-timing assumptions, and explain why a favourable final sum does not remove an earlier funding need.

Prerequisite: [opposite payoff lines](lesson-l1-forward-payoff-graphs.md#zero-sum). **Supplemental readiness check:** does a long position gain or lose when price rises £3 per unit? It gains; with 100 units the change is 100 × £3 = £300. If unsure, the foundations below reconstruct the sign and units.

<a id="foundations"></a>

## 1. Foundation: promises, settlement and dates — supplemental

An **underlying** is the asset referenced by a contract. A **long** position is the buying side; **short** is the selling side. A **position** is the contractual exposure held, not necessarily ownership of the physical asset. A **contract size** specifies underlying units per contract; a trader may hold several contracts. **Maturity/expiry** is the contract's specified future end date; neither the word “futures” nor a quoted price tells you the actual date or delivery arrangement.

**Settlement** is meeting payment/delivery obligations. **Marking to market** measures the position using the designated current settlement price. In the source's simplified futures arrangement, the resulting gains/losses are settled daily: a long's gain is credited and its loss debited, with the short opposite. “Credited” means added to the account; “debited” means deducted. A credit need not mean cash is immediately available for unrestricted withdrawal; account rules are separate. These are daily flows, not unrealised amounts that may simply be ignored until expiry.

A **counterparty** owes the other side's performance. A **clearinghouse** stands between cleared sides and manages their obligations. **Margin** is collateral/account funding supporting performance, not the full purchase price of the underlying or a payment buying a right to refuse the trade. **Market risk** is adverse price movement; **counterparty credit risk** is failure to pay/perform; **liquidity risk** here means not having the cash when a payment is due. Clearing and margin manage performance risk; they do not make market losses or all default risk disappear.

| Symbol | Meaning | Unit/convention |
|---|---|---|
| $N$ | Positive number of contracts held on the stated side | Contracts; use an explicit sign reversal for shorts, not negative $N$ as well |
| $q$ | Underlying quantity per contract | Underlying units/contract |
| $Nq$ | Total underlying quantity represented | Underlying units |
| $t$ | Current settlement day label | An integer label, not an annual rate or a year fraction |
| $F_t$ | Current day's futures settlement price for the same contract | GBP (£) per underlying unit in this lesson |
| $F_{t-1}$ | Previous settlement price, or entry price for the first illustrated interval | GBP per underlying unit; “t−1” labels the previous day |
| $\Delta V_t$ | Signed daily value change, settled in the source illustration | GBP; delta (Δ) means change, not multiplication |

**Local conventions:** fixed contract count/size and same specified contract across a price path; both sides perform; no fees, interest, taxes or extra financing costs. Entries occur at the stated initial price and illustrative closes at the stated final price. Daily results are exact GBP unless a rounding rule is given. We calculate signed trading flows, not account balances: an opening margin deposit, withdrawals and any required top-ups would need separate information. No annualisation or compounding enters a daily price difference.

<a id="obligation"></a>

## 2. What remains a promise?

The source states that a futures contract creates an **obligation to buy or sell an underlying asset at a specified price and future date**. [L1 physical p28, upper “what remains the same” box; `lecture-1-p028-futures-obligation`](../../sources/annotated/lecture-1/page-028.md#lecture-1-p028-futures-obligation).

**Supplemental unpacking:** like a forward, the long and short are not allowed simply to discard an unfavourable obligation. Unlike an option holder's exercise right—a choice whether to use a contractual right—the futures position must be dealt with under its settlement/close-out rules. Contract terms specify whether any final obligation involves physical delivery or cash settlement; these two pages do not give a particular product's expiry calendar or final delivery procedure. Daily settlement also means that the original quoted futures price is not an unpaid, isolated terminal payoff waiting untouched until maturity.

<a id="comparison"></a>

## 3. Read every row of the source comparison

**Accessible table transcription:** columns compare Forward and Futures; rows describe five distinct features, not five payoff formulas. [L1 physical p28, central comparison table; `lecture-1-p028-forward-futures-comparison`](../../sources/annotated/lecture-1/page-028.md#lecture-1-p028-forward-futures-comparison).

| Feature | Forward — source wording | Futures — source wording |
|---|---|---|
| Trading venue | Usually OTC | Exchange-traded |
| Contract terms | Customised | Standardised |
| Counterparty | Other party | Clearinghouse |
| Settlement | Mainly at maturity | Daily gains and losses |
| Margin | Contract-dependent | Margin account required |

**Supplemental row-by-row explanation:**

1. **Venue:** OTC (“over the counter”) describes privately negotiated trading; exchange-traded contracts use an organised market. “Usually” is not “every forward must always be bilateral and uncleared.” This is the source's comparison, not a universal legal rule.
2. **Terms:** customised means parties can negotiate terms to fit a need; standardised means the listed contract specifies common terms. Contract size and expiry therefore need to be read from the actual specification, not chosen freely or inferred from the word futures. We use only the 100-unit source example below, not an invented live exchange specification.
3. **Counterparty:** the simplified forward faces the other contracting party; clearing interposes the clearinghouse for the futures arrangement. That structure manages who owes whom, not who profits from a price rise. It does not guarantee that every possible failure is impossible.
4. **Settlement:** the source's forward settles mainly at maturity; futures gains and losses are settled along the way. “Mainly” allows arrangements with other cash/collateral flows: this table does not prove all forwards have no interim funding requirements.
5. **Margin:** futures require margin-account funding in the source comparison; forward collateral depends on contract terms. Margin is not automatically a trading expense or the entire underlying's price. Exact account thresholds and restoration rules are not provided on these pages and are not invented here.

<a id="both-margin"></a>

## 4. Why both sides need margin when payoffs cancel

The source asks this question explicitly. [L1 physical p28, lower key-question box; `lecture-1-p028-both-sides-margin-question`](../../sources/annotated/lecture-1/page-028.md#lecture-1-p028-both-sides-margin-question).

**Supplemental answer in steps:**

- A rise makes the long gain and the short owe money; a fall makes the short gain and the long owe money. Either side can become the payer.
- “The sum is zero” is an accounting statement if both parties pay. It does not put cash into the losing party's account or guarantee its ability to pay.
- Margin supports performance by providing resources against obligations. Daily settlement limits the accumulation of unpaid price changes, but neither mechanism removes market risk or every possible credit/liquidity problem.

For example, the source's rising-price day gives the long +£300 and short −£300. Someone must supply the £300 debit even though the two figures sum to £0. A later fall can reverse who must supply funds. An eventual recovery does not fund an earlier deadline automatically.

<a id="daily-example"></a>

## 5. Work the whole source day

**Source setup:** one **long** futures contract, **100 underlying units per contract**, with futures price rising from **£50 to £53 per unit during the day**. [L1 physical p29, upper example box; `lecture-1-p029-daily-futures-example`](../../sources/annotated/lecture-1/page-029.md#lecture-1-p029-daily-futures-example). No product name, specific expiry or margin deposit amount is given; none is needed to calculate this price-change flow.

<a id="daily-calculation"></a>

The source calculates daily gain as size × price change: $100(53-50)=300$. [L1 physical p29, middle daily-gain box; `lecture-1-p029-daily-gain-calculation`](../../sources/annotated/lecture-1/page-029.md#lecture-1-p029-daily-gain-calculation).

**Supplemental complete walkthrough:**

1. Total size = 1 contract × 100 units/contract = **100 units**.
2. Price change = £53/unit − £50/unit = **+£3/unit**. Subtract previous from current, not the reverse.
3. Long daily flow = 100 units × £3/unit = **+£300**. Units cancel to GBP.
4. Short daily flow for the opposite position = **−£300**. Check +£300 − £300 = £0.
5. The long's account is credited by £300 and the short's debited. This does not mean the long bought the physical asset for £300 or received 100 physical units that day. £300 is the trading gain, not the original margin deposit or the total underlying value.
6. Boundary check: unchanged price gives £0; reversing the move from £53 to £50 would give the long −£300, so the sign agrees with the economic direction. No rounding is needed.

<a id="daily-formula"></a>

## 6. Derive the general signed rule

The source gives the long rule and says the short reverses its sign. [L1 physical p29, lower general-result box; `lecture-1-p029-daily-gain-formula`](../../sources/annotated/lecture-1/page-029.md#lecture-1-p029-daily-gain-formula).

$$\Delta V_t^{\mathrm{long}}=Nq(F_t-F_{t-1}),\qquad
\Delta V_t^{\mathrm{short}}=Nq(F_{t-1}-F_t).$$

The source writes $\Delta V_t$ for the long; the explicit long/short superscripts here are **supplemental side labels**. Plain-language reading: number of contracts × units per contract × current-minus-previous futures price; reverse the price difference for the short.

**Why every factor belongs:** one underlying unit gains the price change; each contract contains $q$ such units; $N$ contracts contain $Nq$ units. The whole price difference is multiplied by the whole quantity. $NqF_t-F_{t-1}$ would incorrectly scale only one price and mix total currency with currency per unit. Do not reverse the difference and also insert a negative $N$ for shorts: that would reverse twice and restore the long sign.

<a id="path-timing"></a>

## 7. Extend to a path, but keep the dates — supplemental

Take one long contract of 100 units, entry price **£50/unit**, followed by settlement prices **£53**, **£51**, then **£54** per unit. The first day matches the source; the following days are invented teaching inputs, not additional slide data. Keep the same contract and quantity and ignore interest/fees.

| Date label | Price (£/unit) | Change since previous (£/unit) | Long daily flow (£) | Short daily flow (£) | Long cumulative undiscounted flow (£) |
|---|---:|---:|---:|---:|---:|
| Entry, 0 | 50 | — | — | — | 0 |
| Day 1 | 53 | +3 | +300 | −300 | +300 |
| Day 2 | 51 | −2 | −200 | +200 | +100 |
| Day 3 | 54 | +3 | +300 | −300 | +400 |

Day 2 uses **51 − 53**, not 51 − 50. Otherwise you would count part of day 1's move again. Add cash flows for an **undiscounted** total: £300 − £200 + £300 = **£400** for the long and −£400 for the short. “Undiscounted” means we add nominal amounts without adjusting for the different dates or the interest/funding costs between them.

**Supplemental cancellation derivation:** with $F_0$ entry price and $F_1,F_2,F_3$ the three settlements,

$$Nq[(F_1-F_0)+(F_2-F_1)+(F_3-F_2)]=Nq(F_3-F_0).$$

The intermediate $+F_1$ cancels $-F_1$, and $+F_2$ cancels $-F_2$. For this path, 1 × 100 × (54 − 50) = **£400**, agreeing with the daily sum. This identity is arithmetic, not proof of economic equivalence at different payment times.

**A precise forward comparison:** suppose a separate matched forward had delivery price $K=£50$/unit and, at its maturity, spot price $S_T=£54$/unit. Its maturity payoff would be 100 × (54 − 50) = **£400**, paid/realised at that terminal date. The futures path has the same **nominal sum** only because we supplied the same starting price and final comparison price. Its flows occur earlier on three dates. Financing losses and investing gains can change their terminal economic value; discounting means adjusting different-dated amounts onto one common date. We have explicitly ignored those effects, and have not asserted that actual forward and futures prices must always coincide or derived a pricing model. £400 here is not an extra terminal payment in addition to the already settled daily £400 sum.

<a id="closing"></a>

## 8. Opening, holding and closing — supplemental clarification

**Opening** creates a position. **Holding** keeps its exposure through subsequent price changes. **Closing by an offsetting trade** means taking the opposite side in the same specified contract and quantity under the clearing system so the open exposure is extinguished. It is not “exercising” a futures option and does not erase previous settlement flows. A merely similar contract or a different expiry may not offset exactly.

Under the simplified path above, closing the one long contract by a matching sale at **£51/unit on day 2** leaves cumulative trading gain **£300 − £200 = £100**. After that matched close there is no open exposure to day 3's move to £54; do not add the later £300. These closing assumptions are a supplemental explanation, not a rule or price supplied by pages 28–29. Actual eligibility for close-out, final cash settlement/delivery and account release follows the actual contract/account rules; neither a final physical asset exchange nor its absence is inferred from the daily formula alone.

<a id="practice"></a>

## 9. Graded practice — supplemental; attempt first

Exercises 1–3 assess outcome 1; 4–6 assess outcome 2. All answers are authored, not official solutions. The margin-account thresholds and larger contract-size examples of the next lesson are deliberately outside this slice.

<a id="exercise-compare-prompt"></a>
### Exercise 1 — scaffold: reconstruct the comparison

Rebuild all five forward/futures rows from p28. Define OTC, standardised, clearinghouse, settlement and margin in your own words. Which qualifiers stop this classroom table becoming a universal statement that every forward is uncleared, uncollateralised and has no interim flows? [Answer 1](#exercise-compare-answer).

<a id="exercise-margin-prompt"></a>
### Exercise 2 — transfer: the zero-sum objection

Someone says, “The exchange need only take margin from the short, because long plus short is zero and the long has paid to buy a right.” Explain three errors. Use a rising and a falling price move to identify the possible payer; distinguish credit risk, market risk and liquidity risk. [Answer 2](#exercise-margin-answer).

<a id="exercise-explain-prompt"></a>
### Exercise 3 — teach back the life of a position

Explain opening, holding and closing a futures position to a beginner. Include the obligation, daily settlement, margin versus purchase price, clearing's limits, why a matching opposite trade is not optional exercise, and which contract-specific details these two source pages do not provide. [Answer 3](#exercise-explain-answer).

<a id="exercise-source-day-prompt"></a>
### Exercise 4 — scaffold: reconstruct and scale the source day

One contract, 100 units, £50 to £53 per unit: calculate both daily flows with units and a zero-sum check. Then make it two **short** contracts with the same size and move; calculate that trader's flow. What is the flow if price is unchanged? Is any answer the initial margin or the cost of the underlying? [Answer 4](#exercise-source-day-answer).

<a id="exercise-path-prompt"></a>
### Exercise 5 — transfer: cash required before recovery

Two long contracts, 100 units each, enter at £50/unit. Consecutive settlements are £48, £51 and £49 per unit. Ignore interest/fees; hold through all three days. Calculate daily long/short flows and cumulative long totals. Verify the cancellation identity. How much trading loss is due on day 1, and does a later recovery remove that deadline? Separately, what total trading flow remains if the position closes by a matching opposite trade at day 2's £51 price? [Answer 5](#exercise-path-answer).

<a id="exercise-apply-prompt"></a>
### Exercise 6 — diagnose and teach back timing

A learner uses the worked 50→53→51→54 path and says: “Day 2 gains £100 because 51−50 is positive. At the end receive another £400. Futures and forwards are economically identical because both produce £400. Closing on day 2 means exercising and abandoning earlier gains/losses.” Correct each assertion with the actual dated flows, the cancellation calculation and explicit assumptions for the forward comparison. [Answer 6](#exercise-apply-answer).

<a id="answers"></a>

## 10. Separate supplemental answers and retries

<a id="exercise-compare-answer"></a>
### Answer 1

Forward/futures: **usually OTC / exchange-traded; customised / standardised; other party / clearinghouse; mainly at maturity / daily gains and losses; contract-dependent margin / margin account required**. OTC is private negotiation; standardised terms are specified for the listed contract; the clearinghouse interposes and manages obligations; settlement meets payment/delivery obligations; margin supports performance rather than purchasing the underlying. Preserve **usually**, **mainly** and **contract-dependent**: these descriptions do not rule out forward clearing, collateral or interim flows. **Retry:** if you used “never” for a forward feature, return to that row's exact qualifier before explaining it.

<a id="exercise-margin-answer"></a>
### Answer 2

Either side can owe: the source move £50→£53 gives one 100-unit long **+£300** and short **−£300**; reversing £53→£50 gives long **−£300**, short **+£300**. Therefore margin is not needed only from shorts. Zero-sum does not ensure that the losing party can pay. The long has an obligation, not a purchased right to walk away, and margin is performance support rather than an option premium. Credit risk is the payer failing; market risk is the adverse move; liquidity risk is lacking cash at the due date. **Retry:** first identify the losing party in a price fall, then ask how zero-sum supplies that party with cash—it does not.

<a id="exercise-explain-answer"></a>
### Answer 3

A sufficient teach-back says that opening creates a long/buy or short/sell obligation in a specified contract. While held, daily settlement transfers gains/losses based on successive settlement prices. Margin funds performance support, not full physical ownership or an option right. Clearing manages obligations but does not eliminate market losses, default possibilities or the need for timely cash. A matching opposite trade closes exposure under clearing rules without undoing past flows; it is not exercise of a discretionary right. Pages 28–29 give a 100-unit example but no actual product's expiry calendar, margin thresholds or final delivery procedure. **Retry:** distinguish “I remove future exposure by an offset” from “I refuse to pay a loss already due,” then retell the sequence.

<a id="exercise-source-day-answer"></a>
### Answer 4

Price change = 53 − 50 = **+£3/unit**. Quantity = 1 × 100 = **100 units**. Long = 100 × 3 = **+£300**, short = **−£300**; sum £0. Two shorts represent 2 × 100 = **200 units**, so flow = 200 × (50 − 53) = **−£600**. At unchanged price, the difference and flow are **£0** for either side. These are trading flows, not margin deposits or the underlying's purchase price. **Retry:** if your two-short result is +£600, reverse the price difference once, not twice; if it is −£6, restore the 100 units per contract.

<a id="exercise-path-answer"></a>
### Answer 5

Total quantity = 2 × 100 = **200 units**.

| Day | Price change (£/unit) | Long daily flow (£) | Short daily flow (£) | Cumulative long (£) |
|---|---:|---:|---:|---:|
| 1 | 48 − 50 = −2 | −400 | +400 | −400 |
| 2 | 51 − 48 = +3 | +600 | −600 | +200 |
| 3 | 49 − 51 = −2 | −400 | +400 | −200 |

Check long total: −400 + 600 − 400 = **−£200**; cancellation: 200 × (49 − 50) = **−£200**. Short total is **+£200**. Day 1 requires meeting a **£400 trading debit** at that date; it is not necessarily a £400 margin top-up because no account balance/rules were supplied. Day 2's recovery does not retroactively pay day 1's deadline. Closing at £51 on day 2 leaves **−£400 + £600 = +£200**, equivalently 200 × (51 − 50), with no subsequent day-3 exposure. **Retry:** if day 2 is based on 51−50, replace the reference by the immediately preceding settlement 48; if you call £400 a margin call, ask what account information is missing.

<a id="exercise-apply-answer"></a>
### Answer 6

For one 100-unit long, dated flows are **+£300, −£200, +£300**. Day 2 uses 51−53, giving −£200; **£100** is the cumulative result after days 1 and 2, not day 2's gain. Total = £300 − £200 + £300 = **£400** = 100 × (54−50); do not add £400 again at the end. A separate forward with $K=£50$/unit and terminal $S_T=£54$/unit has the same nominal £400 terminal payoff, but different payment dates. We have assumed matching starting/final comparison prices and ignored interest, financing and costs; without those conditions the equality does not establish equal economic values or universally equal forward/futures prices. Closing at £51 on day 2 is an offsetting trade, not exercise; it leaves **£100** cumulative trading gain and no day-3 exposure, without erasing the earlier +£300 and −£200. **Retry:** draw one box for each payment date and label “daily” versus “cumulative” before attempting the comparison again.

<a id="stop"></a>

## Stop and check

Attempt teach-backs 3 and 6 and explain day 1's funding issue in exercise 5. A tutor should check direction, adjacent-day subtraction, quantity units, timing and risk distinctions separately; retry the missing step before the full scenario. Keep learner responses private. Prepared answers and passing arithmetic checks do not demonstrate mastery. The next planned topic, margin accounts and contract size, is not required to finish this lesson and is not authored in this slice.

<a id="evidence"></a>

## Complete inspected evidence

All six substantive units from physical pages 28–29 are cited. Both normalized/raw spans and both original PNGs were inspected. The normalized pages' historical draft headers do not override current verified source-unit metadata, nor does source verification approve this teaching.

| Physical page | Full normalized span | Unchanged raw span | Original PNG |
|---|---|---|---|
| 28 | [Full p28](../../sources/annotated/lecture-1/page-028.md) | [Raw p28](../../sources/extracted/lecture-1/page-028.md#page-28) | [Original p28](../../sources/assets/lecture-1/page-028.png) |
| 29 | [Full p29](../../sources/annotated/lecture-1/page-029.md) | [Raw p29](../../sources/extracted/lecture-1/page-029.md#page-29) | [Original p29](../../sources/assets/lecture-1/page-029.png) |
