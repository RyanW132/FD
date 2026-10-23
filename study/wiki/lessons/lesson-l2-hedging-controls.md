# Hedging trade-offs, mandates and independent controls

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all eight primary units on Lecture 2 physical pages 27–28. The source supplies principles and a control question, not a numerical case study or a current regulatory standard. All worked scenarios, numerical limits, expanded control procedures, practice and answers below are **supplemental teaching examples**. They are not trading advice, official source solutions or claims about a particular firm's history.

<a id="outcomes"></a>

## Observable outcomes

1. **Explain a defensible hedge and control process:** given a stated business exposure and proposed trade, connect each source benefit/cost to a mechanism; specify a mandate's objective, instruments and limits; distinguish genuinely independent valuation/reporting/reconciliation from trader self-checking. Success requires identifying missing exposure evidence and explaining why a derivative profit alone proves neither success nor authorization.
2. **Audit the combined position:** calculate business and hedge cash effects under the supplied scenarios, compare the risk objective with the profit objective, and recompute exposure after a partial or complete cancellation. Success requires correct units/signs, separate pre/post-cancellation periods, a limit check, a documented response and explicit remaining basis/funding/model risks. Exact arithmetic is possible in the exercises.

The [target-beta lesson](lesson-l2-target-beta-and-relative-view.md) shows that a hedge changes a specified exposure, not every risk. Here we use simpler commodity cash flows to make the control problem visible. [Signed amounts](../concepts/concept-numeric-foundations.md#numeric-signs) and [hedge direction](../concepts/concept-hedging-and-basis.md#hedging-direction) are optional lookups; the needed definitions follow inline.

<a id="foundations"></a>

## 1. Establish the business before evaluating the trade — supplemental foundation

A **business exposure** is an outcome affected by an uncertain market price: for example, the cost of fuel a manufacturer must buy next month. A **hedge** adds a position intended to offset a specified part of that exposure. A **derivative** is a contract whose gains/losses depend on an underlying price or other reference. **Speculation** deliberately takes exposure to seek profit from a market view; calling a trade a hedge does not make it one.

A **long futures** position gains when its quote rises; a **short** gains when it falls. In the usual positive co-movement case, a future purchaser uses a long hedge because a price rise is bad for its purchase bill but good for the long futures. A seller normally uses a short. Opposite or unstable co-movement requires a different fitted sign/size, not mechanical application of this rule.

A **cash flow** is a receipt or payment at a stated date. In this lesson, a gain is positive and a loss negative. A **cost** is reported as a positive amount paid. Subtract a futures gain from a purchase bill; subtracting a negative gain adds the futures loss. “Profit” needs the business receipts and other expenses too, not just a derivative gain. Values and cash at different dates require a financing convention; our examples explicitly ignore financing when adding nominal futures settlements to a final bill.

<a id="combined-exposure"></a>

## 2. The source's evaluation rule: combine the exposure and derivative

The source asks us to judge the combined exposure and derivative position, not the derivative alone. [L2 p27, lower bold evaluation sentence; `lecture-2-p027-combined-exposure-principle`](../../sources/annotated/lecture-2/page-027.md#lecture-2-p027-combined-exposure-principle).

**Supplemental notation for a purchaser:**

| Symbol | Meaning | Units / convention |
|---|---|---|
| $Q$ | Confirmed business purchase quantity | Positive underlying units |
| $S_c$ | Spot purchase price at closing date $c$ | GBP per underlying unit |
| $F_0,F_c$ | Futures quotes at opening and closing | Same GBP/unit convention; same selected contract |
| $q$ | Underlying quantity represented by one contract | Underlying units per contract, positive |
| $n$ | Number of long contracts | Nonnegative whole count in this example |
| $G=nq(F_c-F_0)$ | Cumulative nominal long-futures gain | GBP; negative for a loss |
| $C=QS_c-G$ | Combined purchase cost before other costs | GBP |
| $k$ | Total specified trading/monitoring cost | GBP, not a price per unit |
| $R,O$ | Business sales receipts and other business costs | GBP, under the same accounting convention |
| $\Pi=R-O-C-k$ | Simplified combined business profit | GBP; not merely derivative profit |

The subscript $c$ means **hedge close**, not necessarily futures expiry. A futures position normally closes with an offsetting trade in that contract. The cumulative price-difference gain ignores financing of daily settlement, fees unless separately included, taxes and default. Actual cash must be available on the settlement dates; final arithmetic alone is not a funding plan.

Why subtract $G$? A positive gain provides money toward the bill. A negative $G$ is another payment, so $QS_c-(-|G|)$ increases cost. The formula does not assume $nq=Q$: keeping the quantities separate is what lets us detect an oversized hedge.

<a id="business-example"></a>

### Fully worked business-plus-hedge comparison — supplemental

A hypothetical manufacturer has a confirmed purchase of **1,000 units in one month**. Sales receipts for the associated production are fixed at **GBP 80,000**; other business costs are **GBP 20,000**. Initial futures quote is **GBP 50/unit**. One contract represents **100 units**, so a one-for-one purchase hedge uses **10 long contracts**. For these two scenarios assume the purchase and hedge close together, final spot and futures quotes coincide, quantity remains certain, and no fees/funding/taxes/default apply initially. These are scenario assumptions, not a universal claim that basis is zero.

| Scenario | Spot and futures at close, GBP/unit | Purchase bill, GBP | Ten-long gain, GBP | Net purchase cost, GBP | Unhedged business profit, GBP | Hedged business profit, GBP |
|---|---:|---:|---:|---:|---:|---:|
| Prices rise | 60 | 1,000 × 60 = 60,000 | 10 × 100 × (60 − 50) = +10,000 | 60,000 − 10,000 = **50,000** | 80,000 − 20,000 − 60,000 = **0** | **10,000** |
| Prices fall | 40 | 40,000 | 10 × 100 × (40 − 50) = −10,000 | 40,000 − (−10,000) = **50,000** | **20,000** | **10,000** |

**Reasonableness check:** rising purchase prices are adverse, so the long should gain in that row. Falling prices help the unhedged business, but the long loses and gives up that favorable benefit. A derivative loss of GBP 10,000 in the second row is compatible with a successful cost-stabilization objective. A derivative gain of GBP 10,000 in the first row is not an extra GBP 10,000 profit on top of an unchanged purchase bill: the bill also rose.

Now add a fixed **GBP 200** total hedge trading/monitoring cost in either scenario. Combined cost becomes **GBP 50,200** and simplified profit **GBP 9,800** in both rows. The relevant comparison is stabilization **at a cost**, not “a hedge always adds profit.” This fee is a supplied hypothetical total, not an exchange charge or margin amount.

<a id="risk-versus-profit"></a>

### Risk minimization is not profit maximization — supplemental

**Risk** here is uncertainty in the stated business outcome. One simple description of these two scenarios is their range: unhedged profit runs from zero to GBP 20,000; hedged profit before the fixed fee is GBP 10,000 in each, a zero range within this toy model. That does not show all actual risks vanish.

If, additionally, these were the only two possible outcomes with probability one-half each, the expected profit would be the weighted average: unhedged $(0+20{,}000)/2=10{,}000$ GBP, hedged before fee 10,000 GBP, and hedged after fee 9,800 GBP. An **expectation** is a model average, not a guarantee. These equal probabilities are an explicit supplemental illustration, not a forecast inferred from two rows.

The objective “reduce uncertainty in the purchase budget” is different from “obtain the largest profit in the favorable price scenario” or “maximize expected profit.” The hedge can serve the first while sacrificing the others. Whether the stabilization is worth its costs depends on the actual business, financing needs and mandate. The source presents **potential** benefits/costs, not a universal order that every firm must hedge everything.

<a id="benefits"></a>

## 3. Explain all four potential benefits, not just their labels

The source lists more predictable cash flows, lower financial-distress risk, better investment planning and focus on core business risks. [L2 p27, left potential-benefits box; `lecture-2-p027-hedging-benefits`](../../sources/annotated/lecture-2/page-027.md#lecture-2-p027-hedging-benefits).

The following mechanisms are **supplemental explanations**:

- **More predictable cash flows:** offsetting some input-price movement can narrow the range of planned purchase costs. In the worked model, GBP 40,000–60,000 becomes GBP 50,000 before fees. Predictability concerns the combined bill, not a guarantee that daily derivative settlements are small.
- **Lower financial-distress risk:** financial distress means difficulty meeting obligations such as wages, invoices or debt payments. Stabilizing an important cost may reduce the chance that an adverse price shock leaves too little cash for those obligations. Margin calls can introduce separate liquidity pressure, so the benefit is conditional.
- **Better investment planning:** if a planned project has less variable input costs, management can make budgets and funding decisions with fewer commodity-price surprises. Hedging cannot make a poor project profitable or guarantee the demand for its output.
- **Focus on core business risks:** a manufacturer may prefer to manage production quality and customers rather than take an incidental view on raw-material prices. Removing one unwanted exposure lets it retain other deliberate business risks; those retained risks still require management.

A benefit is not established merely by writing it in a hedge memo. State which cash flow matters, what range or sensitivity is intended to change, and what evidence supports that expectation.

<a id="costs"></a>

## 4. Explain every source cost and the remaining mismatch

The source lists transaction/monitoring costs, basis/model risk, reduced favorable outcomes, and contract-size/maturity mismatch. [L2 p27, right potential-costs box; `lecture-2-p027-hedging-costs`](../../sources/annotated/lecture-2/page-027.md#lecture-2-p027-hedging-costs).

**Supplemental mechanisms and checks:**

| Source item | Meaning | Consequence for evaluation |
|---|---|---|
| Transaction and monitoring costs | Fees, bid/ask differences, staff/systems and checking costs | Include them in the combined outcome; a fixed fee lowers profit even if it does not add variability |
| Basis risk | Spot minus selected futures price, in compatible quotes, may differ unpredictably when the hedge closes | Equal quantities do not necessarily fix the net price |
| Model risk | The assumed co-movement, beta or statistical estimate is wrong or changes | Correct arithmetic can implement an inappropriate hedge |
| Reduced favorable outcomes | The derivative offsets beneficial as well as adverse moves in the targeted exposure | The price-fall row gives up some unhedged business upside |
| Contract-size mismatch | Whole contracts do not match a desired fractional exposure exactly | Check implemented quantity/sensitivity, not just the continuous target |
| Maturity mismatch | Futures expiry/delivery timetable differs from the business date | Closing/rolling can leave mismatch and costs; do not equate hedge close with expiry |

A **bid/ask difference** is the gap between prices available to sell and buy. **Rolling** means closing one contract and opening another maturity, not extending the same contract for free. These terms describe possible costs; no actual spread or rolling expense is assumed in the numerical table.

**Supplemental basis check:** keep the 1,000-unit/10-long hedge and initial quote 50, but let final spot be **61** while futures is **60** GBP/unit. Basis at close is $61-60=1$ GBP/unit. Purchase bill 61,000 minus gain 10,000 gives **GBP 51,000** before fees, or **GBP 51/unit**. The previous 50,000 result depended on zero closing basis. Adding the stated GBP 200 fee gives **GBP 51,200**, leaving profit **GBP 8,800** under the same sales/other-cost inputs.

**Supplemental funding check:** before the purchase, suppose the futures quote first falls from 50 to 45. Ten longs lose $10\times100\times(45-50)=-5{,}000$ GBP, requiring a **GBP 5,000 cumulative variation-settlement outflow** under the simplified settlement example. If the quote later ends at 60, the later gain is **GBP 15,000** and total gain still **GBP 10,000**. The final offset does not provide the earlier cash when it is needed. Initial margin and actual settlement rules are separate unspecified requirements; GBP 5,000 is not claimed as the full maximum funding need.

<a id="hedge-becomes-speculation"></a>

## 5. A correct opening hedge can become a different position

The source warns that a hedge can become speculative if its size or purpose changes. [L2 p28, upper first bullet; `lecture-2-p028-hedge-becomes-speculation`](../../sources/annotated/lecture-2/page-028.md#lecture-2-p028-hedge-becomes-speculation).

**Supplemental explanation:** the derivative need not change at all. If the underlying order is canceled, a formerly offsetting futures position can remain by itself. Its label in yesterday's trade record does not change today's economic exposure. A changed quantity, delivery date, asset, currency or business objective also requires reassessment. A forecasted purchase is not the same as a confirmed one; evidence of its continuing probability matters.

### Complete cancellation at the reassessment date

Suppose the manufacturer cancels the entire purchase while the futures quote is still **50 GBP/unit**, so there is no gain/loss to date in this simplified example. If it leaves all ten longs open, there is now **zero purchase bill** to offset future futures gains/losses. From this date onward:

- Quote rises to 60: derivative gain **+GBP 10,000**, no corresponding input-cost rise.
- Quote falls to 40: derivative loss **−GBP 10,000**, no cheaper purchase to offset it.

This is a stand-alone long price exposure relative to the canceled purchase: speculation if deliberately retained for a market view, or unmanaged unauthorized exposure if retained through error. The economic mismatch can be identified without guessing the trader's intent. Do not relabel it an authorized speculative strategy without the separate authority required by the mandate.

A control response is to verify cancellation and remaining exposures, alert the designated independent risk/management function, and apply the documented reduction/closure or exception process. This educational example is not an instruction to make an actual trade. Closing at the unchanged quote would remove future exposure with zero modeled price gain, but actual costs/execution and any other legitimate offsetting exposure must be checked. If cancellation occurred at a different quote, past gains/losses remain realized or payable: removing future risk does not erase history.

<a id="exposure-comparison"></a>

## 6. Compare the derivative with the exposure that still exists

The source says managers should compare the derivative position with its intended exposure. [L2 p28, middle-lower fourth bullet; `lecture-2-p028-exposure-comparison`](../../sources/annotated/lecture-2/page-028.md#lecture-2-p028-exposure-comparison).

**Supplemental partial-cancellation example:** at a reassessment quote of 50, the purchase falls from 1,000 to **600 units**, but ten 100-unit longs remain. Desired one-for-one quantity is now 600, or **six long contracts**. The existing 1,000-unit derivative is **400 units larger** than the new exposure. This conclusion uses this particular direct one-for-one model, not a rule that every valid minimum-variance cross hedge must equal physical quantity.

Let $d$ be the subsequent common spot/futures price change in GBP/unit from 50, with zero closing basis. Then $S_c=F_c=50+d$. The old derivative gives $G=1{,}000d$, while the new purchase bill is $600(50+d)$. Therefore

$$C=600(50+d)-1{,}000d=30{,}000-400d.$$

When $d=+10$, cost is **GBP 26,000**; when $d=-10$, cost is **GBP 34,000**. The oversized long now makes rising prices reduce net cost and falling prices increase it: the excess 400 units create a reversed residual price exposure. A gain is not proof the size is correct.

If four long contracts are offset so that six remain, the gain becomes $600d$ and cost is $600(50+d)-600d=\mathbf{30{,}000}$ GBP in either modeled scenario. Previously posted/received settlements, closure costs and funding do not vanish; the simple reassessment starts at unchanged quote 50 to isolate future sensitivity.

A comparison record needs: current exposure amount/date/asset/currency and evidence; actual long/short positions by contract and expiry; model ratio or beta and its estimation date; current notional/quantity; approved objective/limits; combined scenario results; interim cash needs; outstanding exceptions. A contract count alone does not establish compatibility. A cross hedge needs sensitivity comparison, while an index hedge needs beta-adjusted notional comparison rather than physical gallons.

<a id="mandates"></a>

## 7. A mandate tells a trader what is authorized, not what will be profitable

The source specifies permitted instruments, position limits and hedge objectives in trading mandates. [L2 p28, upper-middle second bullet; `lecture-2-p028-trading-mandates`](../../sources/annotated/lecture-2/page-028.md#lecture-2-p028-trading-mandates).

A **mandate** is documented authority with boundaries. A **position limit** constrains a quantity or risk measure; a **breach** occurs when the actual position violates that stated boundary. A profitable breach remains a breach. A limit is not evidence that everything below it is safe.

**Supplemental example mandate, not an industry/regulatory standard:** permit only the specified commodity futures for verified purchases due in the stated month; objective is reduce purchase-cost sensitivity, not profit from a forecast; direct hedge target is one-for-one quantity. Require gross long underlying quantity no greater than **110% of confirmed eligible purchase quantity**, plus separately documented cash-funding and maturity limits. Gross means counted long exposure before hiding it behind unrelated offsetting trades. Define which contracts/units are eligible, the measurement time, who approves exceptions and who receives breaches. Other organizations may choose different measures and limits.

For the original 1,000-unit purchase, the illustrative gross limit is $1.10\times1{,}000=1{,}100$ units: the 1,000-unit long is within that limit. After shrinkage to 600, the limit is **660 units**. The stale 1,000-unit long exceeds it by **340 units**; six contracts represent 600 and are within it. The excess over the **target** is 400 units, not the 340-unit excess over the **limit**: these are different comparisons. After full cancellation the eligible quantity and this particular limit are zero.

The 110% ceiling does not require a 110% hedge or authorize deliberate additional speculation. Being below a ceiling still requires a valid purpose, correct instrument, currency, maturity and funding plan. A maturity violation is not cured by passing a quantity test.

<a id="independent-controls"></a>

## 8. What makes the checks genuinely independent?

The source names independent valuation, reporting and reconciliation as ways to detect unauthorized risk-taking. [L2 p28, middle third bullet; `lecture-2-p028-independent-controls`](../../sources/annotated/lecture-2/page-028.md#lecture-2-p028-independent-controls).

The following is a **supplemental operational explanation**, not a claim that the slide supplies a full control framework:

| Control | What is checked | Independence needed | Example failure it can expose |
|---|---|---|---|
| Valuation | Recalculate gains/current values using appropriate prices and contract terms | A function not allowed to trade/mark/approve its own outcome; prices/models not accepted only because the trader supplied them | Wrong quote, omitted multiplier or favorable self-mark |
| Reporting | Show gross and net positions, combined exposures, limits, losses and cash requirements to responsible management | Independent access to complete records and an escalation route outside the risk-taker's sole control | An obsolete hedge or hidden breach omitted from the trader's summary |
| Reconciliation | Compare internal trades, positions and settlements with broker/clearing records and business-exposure records; investigate differences | Separate confirmation/record checks and evidence, not the same spreadsheet copied twice | An unrecorded contract, wrong side, missing settlement or canceled commercial order |

**Reconciliation** means finding and resolving differences between independently maintained evidence; matching two copies of one erroneous input is not corroboration. **Valuation** concerns what a position is worth or has gained/lost under its settlement convention; **authorization** concerns whether it should be held. A correct valuation cannot by itself approve the position.

A trader rerunning the same spreadsheet, a second script using the same unchecked inventory, or the author of a lesson checking their own work can be useful self-checks, but none is genuinely independent approval. Separation needs authority, data access and the ability to challenge and escalate, not merely another signature. Independent controls can still fail through bad shared data, collusion, delayed updates or ineffective escalation; “independent” is a design requirement, not an infallibility guarantee.

### A concrete control discrepancy — supplemental

At quote 60 from opening 50, the trader's record shows **six long contracts**: reported gain $6\times100\times10=6{,}000$ GBP. Independent broker records show **ten longs**, so actual modeled gain is **10,000 GBP** and the mismatch is **four contracts**, 400 underlying units and **GBP 4,000** in current cumulative gain. With the confirmed purchase only 600 units, the unrecorded excess also changes future risk. The fact that the missing position currently made money does not make it authorized. Investigate the discrepancy, verify trades/settlements/exposure and escalate; do not delete a position from the report merely to make the limit appear satisfied.

<a id="control-question"></a>

## 9. Answer the source's final control question with evidence

The source asks: **what exposure is this position hedging, and does its size match that exposure?** [L2 p28, lower final-control-question box; `lecture-2-p028-control-question`](../../sources/annotated/lecture-2/page-028.md#lecture-2-p028-control-question).

**Supplemental answer structure:** name the commercial exposure and dated supporting evidence; state the approved risk objective; identify the actual instrument, direction, quantity/notional and horizon; explain the model linking them; calculate the current combined risk and any residual; compare all relevant mandate limits; identify changes, exceptions and funding needs; route the evidence to an independent checker. “It is a hedge because the trader says so” or “it is profitable” answers neither part.

For the partial-cancellation case, an adequate answer is: “Confirmed purchase is now 600 units at the stated month-end; the broker confirms ten longs of 100 units each. Under the stipulated one-for-one positive-price model, six longs match the intended sensitivity. Ten leave 400 excess units and breach the illustrative 660-unit ceiling by 340. Reconcile the stale record, verify there are no other eligible exposures, and use the authorized escalation/reduction process. Closing costs, basis and settlement funding remain.” The numerical mandate and response example are supplements; the source supplies the question, not this case's official answer.

<a id="practice"></a>

## 10. Progressive supplemental practice

<a id="exercise-benefits-prompt"></a>

### Exercise 1 — explain a trade-off (outcome 1)

Explain each of the source's four potential benefits and four cost categories using a mechanism, not a copied label. Use the price-fall row to explain reduced favorable outcomes. Why can a fixed GBP 200 fee reduce expected profit without increasing the toy model's final profit spread? [Answer 1](#exercise-benefits-answer).

<a id="exercise-combined-prompt"></a>

### Exercise 2 — rebuild both legs (outcome 2)

For the manufacturer's original inputs, suppose spot closes at 61 and futures at 60. Compute purchase bill, long gain, basis, combined purchase cost, and business profit before/after the GBP 200 total fee. Separately give the two zero-basis table outcomes and their hypothetical equally weighted expected profits. Explain why a derivative loss alone is not failure. [Answer 2](#exercise-combined-answer).

<a id="exercise-cancel-prompt"></a>

### Exercise 3 — disappearing exposure (outcome 2)

At quote 50, the whole purchase is canceled but ten 100-unit longs remain. Give the future combined cash effect if the quote next reaches 60 or 40. What is now being hedged? What if there had already been a derivative loss before cancellation? Identify a safe control response rather than pretending the label authorizes the remaining position. [Answer 3](#exercise-cancel-answer).

<a id="exercise-mandate-prompt"></a>

### Exercise 4 — target versus limit (outcome 1)

The hypothetical mandate targets one-for-one purchase coverage and caps gross long quantity at 110% of confirmed eligible quantity. Calculate the cap for 1,000,600 and zero units. With ten 100-unit longs after shrinkage to 600, distinguish excess over target from excess over limit. Does passing that one limit prove authorization and safety? [Answer 4](#exercise-mandate-answer).

<a id="exercise-independent-prompt"></a>

### Exercise 5 — evaluate a proposed control (outcome 1)

A trader values six longs using their own spreadsheet and asks a colleague to sign the same unchecked output. Broker records show ten longs and procurement confirms 600 units. At quotes 50 to 60 and size 100, calculate the position/gain discrepancies. Design separate valuation, reporting and reconciliation steps and explain what makes them independent. [Answer 5](#exercise-independent-answer).

<a id="exercise-shrink-prompt"></a>

### Exercise 6 — transfer a partial cancellation (outcome 2)

At quote 50, purchase quantity falls to**700 units**, leaving ten 100-unit longs. Under the same common price move $d$ and zero basis, derive net purchase cost. Compute it for $d=+8$ and $d=-8$. Compare retaining ten with reducing to seven, and check the hypothetical 110% quantity cap. [Answer 6](#exercise-shrink-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 7 — teach a manager the control question (outcome 1)

Explain how you would answer the source final question with evidence. Include purpose, quantity/sensitivity, date/currency, mandate, independent checks and escalation; distinguish risk stabilization from profit maximization. Explain why historical source principles do not supply current contract specifications or legal compliance. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 8 — diagnose a profitable but unauthorized position (outcome 2)

A learner says: “The order fell to 600 units but the ten longs made 10,000 GBP, so keep them. Their gain makes combined cost 40,000 GBP. The 110% cap allows this because the original order was 1,000. One script approved by its author is independent review, and a final gain means no funding issue.” Repair every statement, using final spot/futures 60 and opening 50. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 11. Separate supplemental answers and diagnosis

<a id="exercise-benefits-answer"></a>

### Answer 1

Predictable costs support budgets; reduced adverse cash shocks can lower distress risk; more stable inputs can support investment planning; removing an incidental market exposure lets management focus on production/customers. These are conditional benefits, not guarantees. Costs include trading/monitoring resources; uncertain closing basis or an inaccurate model; giving up favorable price movements; and quantity/maturity mismatch. In the fall scenario, unhedged profit is 20,000 GBP but hedged profit 10,000 before fees: the hedge sacrifices some upside. A fixed 200 fee shifts both hedged outcomes to 9,800, leaving their difference zero. Under the explicit half/half toy probabilities it reduces expected profit from 10,000 to 9,800. Other risks are not modeled by that two-row spread.

**Retry:** if you said “hedging always increases profit,” compare the favorable row. Explain each benefit's mechanism and one condition that could weaken it.

<a id="exercise-combined-answer"></a>

### Answer 2

Bill **61,000 GBP**; long gain **10,000 GBP**; basis **1 GBP/unit**. Net purchase cost **51,000 GBP** before fee and **51,200 GBP** after fee. Profit is **9,000 GBP** before fee, **8,800 GBP** after. In the zero-basis rows, purchase bills 60,000/40,000 and gains+10,000/−10,000 both give net cost 50,000 and hedged profit 10,000 before fee,9,800 after. Unhedged profits 0/20,000 average 10,000 under the stated equal probabilities. Hedged expected profit after fee is 9,800. A losing derivative can offset a favorable movement in the business bill, stabilizing the combined outcome.

**Retry:** if you add the long gain to the purchase bill, start from “gain helps pay the bill.” If you report 51 as total GBP, multiply the per-unit cost by quantity.

<a id="exercise-cancel-answer"></a>

### Answer 3

There is no future purchase cash flow. Remaining ten longs gain **10,000 GBP** at 60 or lose **10,000 GBP** at 40. Relative to the canceled order they hedge **nothing**: they are stand-alone price exposure. Verify cancellation and any other legitimate exposure, reconcile positions and follow the authorized escalation/reduction or exception procedure; do not invent permission to speculate. Earlier realized/payable losses survive cancellation or later closure; they must be reported and funded. Closing can remove future exposure, not erase past cash effects.

**Retry:** if you include a cheaper purchase after cancellation, set the actual purchase quantity to zero first.

<a id="exercise-mandate-answer"></a>

### Answer 4

Caps are **1,100**, **660** and **0 units**, respectively. After shrinkage, desired one-for-one quantity is 600. Ten contracts represent 1,000, so excess over target is **400 units**, while breach over the 660 limit is **340 units**. Six contracts represent 600 and pass this quantity test. Passing it alone does not establish a valid instrument, objective, maturity, funding plan or independent authorization; a ceiling is not a target or a guarantee of safety.

**Retry:** label each comparison “target” or “cap” before subtracting. Use the current verified exposure, not a canceled historical order.

<a id="exercise-independent-answer"></a>

### Answer 5

Recorded six versus actual ten means **four missing contracts**, **400 units**. At a 10 GBP/unit rise, reported gain 6,000 versus modeled actual 10,000 gives a **4,000 GBP** discrepancy. Independent valuation checks terms, multiplier and price evidence outside the trader's sole control. Independent reporting includes the actual gross/net exposure, losses/gains, current 600-unit purchase, limit breach and funding needs to an authorized oversight function. Reconciliation compares broker trades/settlements with internal records and independently confirmed procurement changes, investigating unresolved differences. A colleague signing the same unchecked sheet is not sufficient independence; another copy of the same error is not corroboration.

**Retry:** explain what separate evidence each check uses and who can challenge/escalate it. A profitable discrepancy still needs investigation.

<a id="exercise-shrink-answer"></a>

### Answer 6

Retained ten represent 1,000 units. New cost is $700(50+d)-1{,}000d=35{,}000-300d$ GBP. At +8, bill 40,600 minus gain 8,000 gives **32,600 GBP**. At −8, bill 29,400 minus loss−8,000 gives **37,400 GBP**. Reducing to seven contracts gives gain 700 d and constant modeled cost **35,000 GBP**. The cap is $1.10\times700=\mathbf{770}$ units; ten breach it by **230 units**, while excess over the 700-unit target is **300 units**. Seven represent 700 and pass this particular cap. Basis, costs and funding still require separate checks.

**Retry:** if the two oversized costs match, you canceled 700 d against 1,000 d incorrectly. Retain the unmatched 300-unit coefficient.

<a id="exercise-explain-teachback-answer"></a>

### Answer 7 — adequate explanation

“Start with dated evidence of the business amount, asset, currency and transaction date. State the approved risk objective, then identify the actual derivative side, terms, maturity and quantity/notional. Explain the sensitivity model and compare the complete position with current exposure and all limits, including interim funding. Independent valuation/reporting/reconciliation must challenge the trader using appropriate separate evidence and escalation authority. A hedge may stabilize costs at a fee and give up upside; this is not guaranteed profit maximization. An old slide provides principles, not today's contract terms, organizational authorization or legal compliance.”

**Retry:** if you merely say “check the hedge,” specify the evidence, comparator, responsible independent function and response to a mismatch. No current legal rule or historical incident is asserted by this lesson.

<a id="exercise-apply-teachback-answer"></a>

### Answer 8

The current 600-unit bill is **36,000 GBP**, not 50,000. Subtract the actual long gain 10,000 to obtain **26,000 GBP** before fees, but that favorable result comes with oversized future exposure; at the opposite 10-unit price fall the cost would be 34,000. The new cap is 660 units, not 1,100, and 1,000 long units breach it by 340. Six longs would match this direct hedge target and give modeled cost 30,000 in either direction. Author self-check is not independent approval. A prior fall from 50 to 45 would require 5,000 GBP of variation-settlement cash for ten longs even if the final quote 60 produces a cumulative gain. Report evidence, correct the stale exposure/position comparison and use the authorized control process; do not treat a gain as permission.

**Retry:** recompute the business leg with today's quantity before discussing the derivative. Then test the opposite price move and an adverse interim path.

<a id="evidence"></a>

## Evidence and stopping point

All full normalized/raw pages 27–28 and both original PNGs were inspected. Page 27 has two side-by-side benefit/cost boxes and a combined-position sentence; page 28 has four control bullets and a final question box. No numerical cases, historical rogue-trader incident, plot, axis or legal standard is supplied. The tables, numerical scenarios, mandate 110% example and operational elaborations above are explicitly supplemental, not invented source data.

| Page | Full normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|
| 27 | [Full 27](../../sources/annotated/lecture-2/page-027.md) | [Raw 27](../../sources/extracted/lecture-2/page-027.md#page-27) | [Image 27](../../sources/assets/lecture-2/page-027.png) |
| 28 | [Full 28](../../sources/annotated/lecture-2/page-028.md) | [Raw 28](../../sources/extracted/lecture-2/page-028.md#page-28) | [Image 28](../../sources/assets/lecture-2/page-028.png) |

Canonical source units are verified despite older normalized draft banners; lesson approval does not follow from source QA. No registered issue affects these eight units. No restricted/private evidence was used. Answer both teach-backs before continuing to the [synthesis](lesson-l2-hedging-synthesis.md). Reading or author checks alone do not establish mastery; personal responses belong in private learner notes.
