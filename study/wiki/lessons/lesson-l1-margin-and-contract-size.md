# Margin accounts and reading contract specifications

<a id="status"></a>

**Unreviewed teaching draft — Lecture 1, physical pages 30–31.** Exact source units are cited below. Source examples are historical classroom material, not current exchange specifications or legal requirements. New explanations, ledgers, exercises and answers are **supplemental** unless explicitly identified as the supplied source answer. No approval, publication or learner mastery is claimed.

<a id="outcomes"></a>

## Why a correct payoff is not enough

You can correctly predict a final gain yet fail to have cash for an earlier margin payment. You can also read a quoted price correctly but miscalculate the position by forgetting its contract size. This lesson connects account funding with the quantities behind a futures position.

1. **Explain:** given the source margin definitions and three position descriptions, distinguish initial margin, variation margin, maintenance margin and a margin call; identify each underlying, size, delivery month, quoted price/unit and favourable direction. Success requires separating a deposit, trading gain/loss and notional amount, preserving the source's unknown threshold/restoration rule, and explaining the strict below-threshold boundary.
2. **Apply:** update a dated margin ledger, test below/equal/above-maintenance cases, and calculate a top-up only when its restore-to rule is supplied. Scale the gold, GBP and oil examples into underlying quantities, USD notionals and signed daily changes. Show intermediate arithmetic and units; money must be correct to the cent/penny. Teach back why funds added are not recovered trading losses and why notional is not a margin deposit.

Prerequisite: [futures obligations and daily cash flows](lesson-l1-futures-settlement.md#daily-formula). **Supplemental readiness check:** if an account contains £2,000 and loses £600, what remains? £1,400, not £2,600. The loss is a negative account change; the deposit itself is not the loss.

<a id="foundations"></a>

## 1. Foundations: distinguish the account from the trade — supplemental

A **futures position** is a contractual buying or selling exposure to an **underlying** asset, not necessarily ownership of that asset. **Long futures** benefits when its futures price rises; **short futures** benefits when it falls. Both sides can incur losses. A **margin account** holds resources supporting performance. A **balance** is the amount recorded in it at a specified time. A **ledger** lists dated changes so the balance can be reconstructed.

From the account's perspective, a gain or cash top-up is positive; a loss or withdrawal is negative. From the trader's external bank account, a margin deposit is cash leaving that bank account. These viewpoints are different: moving your money into collateral is a funding commitment, not by itself a trading loss. **Counterparty risk** means the party owing money fails to pay; **liquidity risk** here means lacking cash when due. Margin supports payment, but does not remove adverse market moves or guarantee that all defaults are impossible.

| Notation | Meaning before use | Unit |
|---|---|---|
| $B$ | Account balance at the stated stage | GBP (£) in the margin examples |
| $I$ | Initial margin deposited when the position opens | GBP |
| $M$ | Maintenance threshold, when supplied | GBP |
| $R$ | Specified restore-to balance after a call, when supplied | GBP; not automatically $M$ or $I$ |
| $V$ | Signed daily trading change added to the account | GBP for this account |
| $A$, $W$ | Additional cash deposited, cash withdrawn | Nonnegative GBP amounts, separate from $V$ |
| $N$ | Positive number of contracts on the named side | Contracts |
| $q$ | Underlying size per classroom contract | Ounces/contract, GBP/contract or barrels/contract |
| $Q=Nq$ | Total underlying amount represented | Ounces, GBP or barrels |
| $F_{\mathrm{old}}$, $F_{\mathrm{new}}$ | Previous/current futures prices for the same contract | Currency per underlying unit |

A strict inequality **$B<M$** means balance is *less than* maintenance; equality **$B=M$** is not less than. A price multiplier carries units: ounces × USD/ounce = USD; GBP × USD/GBP = USD; barrels × USD/barrel = USD. **USD** is US dollars ($); **GBP** is pounds sterling (£). Never add the source's GBP margin balance to a USD trading amount without an explicit conversion arrangement.

**Conventions:** the classroom ledgers assume both parties perform, no interest/fees/taxes and no unmentioned transfers. Daily losses are already total currency amounts unless a price-change/size calculation is explicitly requested. We use days/month names as dates, not interest multipliers; there is no compounding or annualisation. Supplemental call examples stipulate both a strict below-maintenance test and a restore-to amount; actual account rules must be read, not inferred from this teaching.

<a id="initial-margin"></a>

## 2. Four terms, four different jobs

**Initial margin:** the source calls it funds deposited when the position opens. [L1 physical p30, upper initial-margin bullet; `lecture-1-p030-initial-margin`](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-initial-margin). **Supplemental explanation:** “initial” identifies the opening deposit, not a purchase of the entire underlying. If £2,000 is deposited, the account starts with £2,000; it has not automatically lost £2,000.

<a id="variation-margin"></a>

**Variation margin:** the source describes daily gains or losses added to the account. [L1 physical p30, upper variation-margin bullet; `lecture-1-p030-variation-margin`](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-variation-margin). **Supplemental explanation:** “added” includes adding negative numbers. A loss of £600 is a −£600 change. A gain of £600 is +£600. This daily settlement changes the balance even if no new external cash is deposited. Do not treat every daily variation amount as a separate top-up: it first changes the balance; a top-up follows the stipulated account rule.

<a id="maintenance-margin"></a>

**Maintenance margin:** the source calls it the minimum permitted account balance. [L1 physical p30, upper maintenance-margin bullet; `lecture-1-p030-maintenance-margin`](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-maintenance-margin). **Supplemental explanation:** this is a threshold for comparing the balance, not a new debit subtracted from it each day. An account at £1,400 with maintenance £1,000 still has £1,400, not £400. Whether a call is triggered depends on the comparison and actual rules.

<a id="margin-call"></a>

**Margin call:** the source defines a request to restore the account balance. [L1 physical p30, upper margin-call bullet; `lecture-1-p030-margin-call`](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-margin-call). **Supplemental explanation:** determine separately (a) whether a call is triggered and (b) the balance to which it must be restored. A supplied maintenance threshold alone does not determine the top-up. The request, payment deadline and actual payment are distinct events; our worked ledgers assume the requested top-up is paid when stated.

<a id="source-question"></a>

## 3. Reconstruct the supplied two-day example

**Source question:** a trader deposits £2,000, loses £600 on Day 1 and £500 on Day 2. What is the balance after Day 2? [L1 physical p30, middle calculation box; `lecture-1-p030-margin-balance-question`](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-margin-balance-question).

**Supplemental walkthrough:** adopt the source calculation's no-intervening-top-up/withdrawal convention. Start at £2,000. After Day 1, £2,000 − £600 = **£1,400**. Carry that actual balance forward. After Day 2, £1,400 − £500 = **£900**. The cumulative trading loss is £600 + £500 = **£1,100**, different from the £900 remaining balance.

| Stage | Opening balance (£) | Trading change (£) | Additional deposit (£) | Closing balance (£) |
|---|---:|---:|---:|---:|
| Opening deposit made | 0 | 0 | +2,000 | 2,000 |
| Day 1 | 2,000 | −600 | 0 | 1,400 |
| Day 2 | 1,400 | −500 | 0 | 900 |

This accessible ledger is an authored expansion, not an extra table printed on the slide. The source page has four definition bullets, a question box and an answer box, with no graph/axes or quoted threshold.

<a id="source-answer"></a>

**Supplied source answer:** $2{,}000-600-500=900$. The slide adds: **if maintenance margin exceeds £900, the trader receives a margin call**. It does not specify a numerical threshold or restore-to rule. [L1 physical p30, lower answer box; `lecture-1-p030-margin-balance-answer`](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-margin-balance-answer).

**Supplemental boundary reading:** “maintenance exceeds £900” means $M>900$, equivalently $B<M$ at this £900 balance. If $M=£900$, the balance equals maintenance and this strict condition is false. If $M=£800$, the balance is above it; if $M=£1,000$, below it. The source does **not** let us conclude that the top-up is £100, £900 or £1,100 without a restore-to rule. Also, inserting an earlier top-up into this path would change its Day-2 balance; do not silently combine such a path with the source's £900 result.

<a id="ledger-rule"></a>

## 4. A reusable ledger and a complete call — supplemental

At each step, in one currency:

$$B_{\mathrm{after}}=B_{\mathrm{before}}+V+A-W.$$

The subscripts label stages. First compute the **pre-top-up** balance using the trading change. Then test the threshold. Under our explicitly stipulated rule, if that balance $B$ is below $M$ and the target is $R$, the required top-up is **$A=R-B$** (with a target at least as high as the required threshold). Otherwise this rule requests no top-up. Do not subtract the maintenance threshold from the account as if it were a trading loss.

**Source-path extension with new assumptions:** set maintenance **£1,000**, restore-to **£2,000**, and require a top-up only when balance is strictly below maintenance. Day 1's £1,400 is above £1,000, so no call. Day 2's £900 is below £1,000, so deposit £2,000 − £900 = **£1,100**, bringing the balance to £2,000. The gap to maintenance, £1,000 − £900 = **£100**, is not the required top-up under this restore-to rule. The £1,100 of extra cash replenishes resources; it does not undo the £1,100 trading loss.

<a id="boundary-ledger"></a>

### A separate equality-boundary example

New supplemental account: $I=£2,000$, $M=£1,500$, $R=£2,000$, strict below-threshold trigger. The following changes are supplied as **total trading flows**, not per-unit prices: Day 1 −£500, Day 2 −£100, Day 3 +£250. There are no withdrawals or other changes; pay calls immediately.

| Day | Start (£) | Trading flow (£) | Pre-top-up (£) | Is balance below £1,500? | Top-up (£) | End (£) |
|---|---:|---:|---:|---|---:|---:|
| 1 | 2,000 | −500 | 1,500 | No: equal | 0 | 1,500 |
| 2 | 1,500 | −100 | 1,400 | Yes | 600 | 2,000 |
| 3 | 2,000 | +250 | 2,250 | No: above | 0 | 2,250 |

Day 2's required cash is £2,000 − £1,400 = **£600**, not the £100 trading loss that day or the £100 gap to maintenance. The account ends above the original deposit, but total money deposited is £2,000 + £600 = **£2,600**. Trading result = −£500 − £100 + £250 = **−£350**, agreeing with £2,250 − £2,600. If the position is then closed and the whole remaining balance is released under these supplemental assumptions, bank cash flows are −£2,000, −£600 and +£2,250: net **−£350**. Do not declare a £250 profit just because the final balance exceeds the initial deposit. Actual release restrictions are account-specific, not provided by p30.

<a id="position-task"></a>

## 5. Read five fields before calculating a position

Page 31 asks for **underlying, contract size, delivery month, agreed futures price, and favourable price direction** for each of three positions. [L1 physical p31, lower five-part task; `lecture-1-p031-position-reading-task`](../../sources/annotated/lecture-1/page-031.md#lecture-1-p031-position-reading-task).

**Supplemental reading method:** underline the asset and quantity, circle the month, keep the currency-per-unit price together, then decide long/short. The source presents numbered text, not a price chart: there are no axes or hidden time series to infer. It gives delivery **months**, not exact dates, years, current exchange rules or a complete product specification. For the classroom scaling exercises below, treat each listed size as one contract; that assumption is not a claim that every exchange's gold/oil/GBP product has that size.

**Notional amount** here means total underlying quantity multiplied by the stated futures price. It expresses the currency scale represented at that price; it is not the margin deposited, the current value of the futures contract, the realised trading gain, or a promise that all that cash changes hands on entry.

<a id="gold-position"></a>

### Gold: long 100 ounces for December at US$1,400 per ounce

This is source item 1. [L1 physical p31, upper numbered item 1; `lecture-1-p031-gold-position`](../../sources/annotated/lecture-1/page-031.md#lecture-1-p031-gold-position).

**Supplemental worked reading:** underlying **gold**; listed size **100 oz.** (ounces, the source's unit); delivery **December**; price **1,400 USD/oz.**; **long**, so a price rise benefits the position. We retain “oz.” without inventing a conversion or refining a specification the slide does not supply. Notional = 100 oz. × 1,400 USD/oz. = **$140,000**. This does not say the trader deposits $140,000.

For a supplemental single daily settlement move **1,400→1,412 USD/oz.**, price change = **+12 USD/oz.**. One listed long gains 100 oz. × 12 USD/oz. = **+$1,200**. If the move were reversed for the same quantity, it would lose $1,200. These are daily trading flows, not extra payment on top of the same already settled gain.

<a id="sterling-position"></a>

### Sterling: short £62,500 for March at 1.5500 USD per GBP

This is source item 2. [L1 physical p31, upper numbered item 2; `lecture-1-p031-sterling-position`](../../sources/annotated/lecture-1/page-031.md#lecture-1-p031-sterling-position).

**Supplemental worked reading:** underlying **GBP/sterling**; listed size **62,500 GBP**; delivery **March**; price **1.5500 USD/GBP**; **short GBP**, so a fall in USD per GBP benefits the position. This means selling sterling exposure, not shorting dollars merely because USD is the payoff currency. Notional = 62,500 GBP × 1.5500 USD/GBP = **$96,875**. The GBP cancels, leaving USD, not £96,875.

For a supplemental single daily move **1.5500→1.5300 USD/GBP**, the long difference would be −0.0200 USD/GBP. The **short** reverses it: 62,500 × (1.5500 − 1.5300) = 62,500 × 0.0200 = **+$1,250**. The quote is not 1.5500 GBP/USD and not a 1.55% interest rate. A rise instead would hurt the short.

<a id="oil-position"></a>

### Oil: short 1,000 barrels for April at US$90 per barrel

This is source item 3. [L1 physical p31, upper numbered item 3; `lecture-1-p031-oil-position`](../../sources/annotated/lecture-1/page-031.md#lecture-1-p031-oil-position).

**Supplemental worked reading:** underlying **oil**; listed size **1,000 barrels**; delivery **April**; price **90 USD/barrel**; **short**, so a price fall benefits it. Notional = 1,000 barrels × 90 USD/barrel = **$90,000**. The description does not specify oil grade, exchange, year or full delivery procedures; do not supply these from an assumed live product.

For a supplemental single daily move **90→92 USD/barrel**, the short loses: 1,000 × (90 − 92) = 1,000 × (−2) = **−$2,000**. If the price stays 90, the change is zero and the daily gain is **$0**, not the $90,000 notional. Short does not mean guaranteed gain or absence of margin funding.

<a id="position-summary"></a>

### Accessible complete answer to the five-field task — supplemental

| Underlying | Listed classroom size | Delivery month | Source futures price | Side | Favourable move in that quoted price | Notional at source price (USD) |
|---|---:|---|---|---|---|---:|
| Gold | 100 oz. | December | $1,400/oz. | Long | Rise | $140,000 |
| Sterling (GBP) | £62,500 | March | 1.5500 USD/GBP | Short GBP | Fall | $96,875 |
| Oil | 1,000 barrels | April | $90/barrel | Short | Fall | $90,000 |

The source specifies positions and asks the five questions; this table's answers and notionals are authored derivations, not an official supplied answer table.

<a id="scaling"></a>

## 6. Scale quantities, not just quoted prices — supplemental

For $N$ contracts, each of size $q$, first compute $Q=Nq$. Then:

$$\text{Notional}=QF_{\mathrm{old}},\qquad
V_{\mathrm{long}}=Q(F_{\mathrm{new}}-F_{\mathrm{old}}),\qquad
V_{\mathrm{short}}=Q(F_{\mathrm{old}}-F_{\mathrm{new}}).$$

Here $V$ is a trading change in the **quote currency**, USD for all three position examples, and the prices refer to adjacent settlement observations in each illustrative move. The same no-fee/performance assumptions as the prerequisite apply. Do not use a contract's entire original-to-current move as a new day's flow after prior days have already settled.

**Worked scaling:** two listed gold contracts represent 2 × 100 = **200 oz.** At $1,400/oz., notional is 200 × 1,400 = **$280,000**. For the same 1,400→1,412 daily move, a long gains 200 × 12 = **+$2,400**, twice the one-contract gain. A margin requirement would need separate account terms; it cannot be read off either $280,000 or $2,400. There is no universal rule in these pages that futures losses cannot exceed the initial deposit.

<a id="practice"></a>

## 7. Graded practice — attempt before the separate answers

All tasks/answer explanations below are **supplemental adaptations**, not official solutions. Exercises 1–3 assess outcome 1; 4–7 assess outcome 2.

<a id="exercise-terms-prompt"></a>
### Exercise 1 — scaffold: name the four roles

Match these to initial margin, variation margin, maintenance margin and margin call: opening funds; daily signed trading changes; minimum balance; request to restore balance. Explain why the last two do not themselves specify a top-up amount, and why a deposit is not automatically a trading loss. [Answer 1](#exercise-terms-answer).

<a id="exercise-read-positions-prompt"></a>
### Exercise 2 — transfer: read all three source positions

Without calculating a payoff, give all five requested fields for gold, sterling and oil. Include quote units, the object of “short” in the GBP example, and whether a rise/fall is favourable. Identify three important specification details p31 does not provide. [Answer 2](#exercise-read-positions-answer).

<a id="exercise-explain-prompt"></a>
### Exercise 3 — teach back the distinction

Explain to a beginner why initial margin, maintenance margin, variation margin, a top-up, notional and trading loss are not interchangeable. Include what p30's £900 tells you, what it leaves unknown, what equality to maintenance means under the strict rule, and why margin reduces non-payment risk without eliminating market/liquidity risk. [Answer 3](#exercise-explain-answer).

<a id="exercise-source-ledger-prompt"></a>
### Exercise 4 — scaffold: source balance and a specified call

Starting with £2,000 and losses £600 then £500, show both day-end balances with no other flows. At the final balance, test maintenance £800, £900 and £1,000 separately. For the £1,000 case only, assume restore-to £2,000 and immediate payment of any call: calculate the required top-up, post-top-up balance and cumulative trading loss. Explain why the source alone did not fix the top-up. [Answer 4](#exercise-source-ledger-answer).

<a id="exercise-boundary-prompt"></a>
### Exercise 5 — transfer: equality before a call

Use $I=£2,000$, $M=£1,500$, $R=£2,000$, strict below-maintenance calls, no interest/fees/withdrawals. Daily total trading changes are −£500, −£100, +£250. Fill a ledger with pre-top-up balance, call amount and final balance each day. Compare the final balance with **all** deposits and reconcile the trading result. Does a £100 day-2 loss imply a £100 top-up? [Answer 5](#exercise-boundary-answer).

<a id="exercise-multipliers-prompt"></a>
### Exercise 6 — transfer: three multipliers

Treat the source-listed sizes as one classroom contract each. (a) Two long gold contracts: price 1,400→1,412 USD/oz. (b) Three short GBP contracts: 1.5500→1.5300 USD/GBP. (c) Two short oil contracts: 90→92 USD/barrel. For each, give total underlying quantity, notional at the starting price and signed daily flow. Can you calculate a margin deposit from these data alone? [Answer 6](#exercise-multipliers-answer).

<a id="exercise-apply-prompt"></a>
### Exercise 7 — diagnose and teach back

Correct: “£900 is the margin call; at exactly maintenance a call must occur; after depositing money the trading loss has vanished; the source short GBP position deposits $96,875; all futures losses are capped by the opening deposit.” Use the source balance and one source position as numerical evidence, distinguishing source facts from additional assumptions. [Answer 7](#exercise-apply-answer).

<a id="answers"></a>

## 8. Supplemental answers and focused retries

<a id="exercise-terms-answer"></a>
### Answer 1

Opening funds = **initial margin**; daily signed changes = **variation margin**; minimum balance = **maintenance margin**; restoration request = **margin call**. A threshold says when the account is deficient, not necessarily the target balance. A request needs a specified restoration rule to determine its amount. Depositing moves resources into the account; gains/losses arise from trading changes. **Retry:** label one movement “my bank to my margin account” and another “daily trading loss”; explain which changes trading profit and which changes funding location.

<a id="exercise-read-positions-answer"></a>
### Answer 2

Gold: **gold, 100 oz., December, 1,400 USD/oz., long benefits from a rise**. Sterling: **GBP, £62,500, March, 1.5500 USD/GBP, short GBP benefits from a fall in USD per GBP**. Oil: **oil, 1,000 barrels, April, 90 USD/barrel, short benefits from a fall**. Missing details include an exact delivery date/year, exchange/product specifications (such as grades), and margin/account rules. These examples do not establish current universal contract sizes. **Retry:** if a price lacks “per ounce,” “per GBP” or “per barrel,” restore that denominator before reasoning about direction.

<a id="exercise-explain-answer"></a>
### Answer 3

A sufficient teach-back says: initial margin opens the funded account; variation is signed daily trading change; maintenance is a comparison threshold; a call requests restoration and its actual top-up depends on the target rule. Notional measures underlying quantity × price, not collateral. Loss changes trading wealth; new deposits do not reverse it. The source's £900 is the remaining balance after £1,100 of losses without other flows, not a specified call amount. Its threshold and restore-to amount are unspecified; at equality the stated strict below-threshold trigger is false. Supporting payments reduces non-payment risk but neither prevents prices moving adversely nor ensures the trader has cash on time. **Retry:** if the explanation merges two amounts, write their definitions and dates separately before retelling it.

<a id="exercise-source-ledger-answer"></a>
### Answer 4

Day 1: £2,000 − £600 = **£1,400**. Day 2: £1,400 − £500 = **£900**. Relative to £800, £900 is above: **no call under the strict rule**. Relative to £900, equal: **no strict-below call**. Relative to £1,000, below: **call triggered**. Under the additional £2,000 restore-to rule, top-up = £2,000 − £900 = **£1,100**, final balance **£2,000**. Cumulative trading loss stays **£1,100**; the £100 gap to maintenance is not this rule's top-up. The source gives neither a particular maintenance threshold nor a restoration target. **Retry:** if you answered £900 for the call, label £900 “current balance” and solve current balance + required deposit = stated target.

<a id="exercise-boundary-answer"></a>
### Answer 5

| Day | Pre-top-up (£) | Call top-up (£) | End balance (£) |
|---|---:|---:|---:|
| 1 | 2,000 − 500 = 1,500 | 0: equal to maintenance | 1,500 |
| 2 | 1,500 − 100 = 1,400 | 2,000 − 1,400 = 600 | 2,000 |
| 3 | 2,000 + 250 = 2,250 | 0: above maintenance | 2,250 |

Total deposits = £2,000 + £600 = **£2,600**. Result = £2,250 − £2,600 = **−£350**, matching −£500 − £100 + £250. The £100 day-2 trading loss lowers an already reduced balance; the required restoration is **£600**, not £100. Equality on day 1 does not satisfy “below.” **Retry:** if you claimed +£250 profit, include the additional £600 cash you supplied; if you called on day 1, check the difference between `<` and `=` in words.

<a id="exercise-multipliers-answer"></a>
### Answer 6

(a) Gold: 2 × 100 = **200 oz.**; notional 200 × 1,400 = **$280,000**; long flow 200 × (1,412 − 1,400) = 200 × 12 = **+$2,400**.

(b) GBP: 3 × 62,500 = **187,500 GBP**; notional 187,500 × 1.5500 = **$290,625**; short flow 187,500 × (1.5500 − 1.5300) = 187,500 × 0.0200 = **+$3,750**. USD/GBP times GBP leaves USD.

(c) Oil: 2 × 1,000 = **2,000 barrels**; notional 2,000 × 90 = **$180,000**; short flow 2,000 × (90 − 92) = 2,000 × (−2) = **−$4,000**.

All currency results are USD and exact to cents. No margin deposit can be inferred without margin/account terms. **Retry:** if off by 100, 1,000 or three, write contracts × units/contract first. If the short sign is wrong, subtract new price from old exactly once.

<a id="exercise-apply-answer"></a>
### Answer 7

£900 is the **remaining account balance**, from £2,000 − £600 − £500; the source only states a call if maintenance is greater than £900. Equality is not below, and the top-up needs a separate target. Adding money restores funding, not lost trading wealth: in the specified £1,000-maintenance/£2,000-target extension, £1,100 is added but the £1,100 loss remains. The GBP position's **$96,875 = £62,500 × 1.5500 USD/GBP** is notional, not its deposit. No rule on these pages caps futures losses at initial margin; further cash can be required. **Retry:** identify which statements mistake a stock of money for a change, and which invent an absent rule; then explain the full corrected example.

<a id="stop"></a>

## Stop and check

Give your own answers to exercises 3 and 7, and explain one ledger boundary before reading its answer again. A tutor should diagnose definition, sign, units, threshold and funding mistakes separately, then retry the missed step. Keep learner responses private. Prepared answers do not establish mastery. Next: [calls and puts](lesson-l1-calls-and-puts.md#outcomes), where the buyer obtains a right rather than a futures obligation.

<a id="evidence"></a>

## Complete inspected evidence and limits

All ten substantive units are cited above. Full normalized/raw spans and both original PNGs were inspected; canonical source units are verified despite historical normalized-page draft headers. Source verification is not approval of this lesson. No exact exchange specifications, price forecasts, current legal rules or additional source thresholds were invented.

| Physical page | Complete normalized page | Unchanged raw extraction | Original PNG |
|---|---|---|---|
| 30 | [Full p30](../../sources/annotated/lecture-1/page-030.md) | [Raw p30](../../sources/extracted/lecture-1/page-030.md#page-30) | [Original p30](../../sources/assets/lecture-1/page-030.png) |
| 31 | [Full p31](../../sources/annotated/lecture-1/page-031.md) | [Raw p31](../../sources/extracted/lecture-1/page-031.md#page-31) | [Original p31](../../sources/assets/lecture-1/page-031.png) |
