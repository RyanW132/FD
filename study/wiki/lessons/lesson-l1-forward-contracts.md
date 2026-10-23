# Forward contracts: agree now, exchange later

<a id="status"></a>

**Unreviewed teaching prototype.** This lesson teaches Lecture 1, physical pages 20–22. It is not a published or independently approved lesson, investment advice, or evidence of learner mastery. Source statements have exact citations below; teaching bridges, examples and answers are labelled **supplemental** rather than official solutions.

<a id="motivation"></a>

## Why agree on a price before buying?

Imagine that your business needs an asset in three months, but must set its purchasing budget now. Waiting preserves the chance of a cheaper purchase, but also leaves the budget exposed to a higher price. A **forward contract** fixes the price of a specified future exchange by agreement today. It removes that price uncertainty for the agreed purchase, not every business risk. The cost of certainty is that the agreement still binds you when the market price falls. This motivation is a **supplemental explanation** of the source scenario, not a claim that a forward is always the best choice.

<a id="outcomes"></a>

## What you will be able to do

1. **Explain the agreement:** given a dated one-unit purchase or sale, identify the asset, quantity, delivery date and price; assign the long and short parties; explain both obligations and which side benefits when the maturity market price exceeds the delivery price. Success requires all terms and directions correct, plus an explanation of why the losing party cannot simply decline to perform.
2. **Calculate and interpret the payoff:** given delivery price, maturity market price and quantity in matching units, show the asset and payment legs, calculate each party's signed maturity payoff, check that they sum to zero and explain what happens at equal prices. Distinguish payoff from cash payment and from total profit; give the assumptions needed for any equality with profit. Use exact arithmetic here, with currency results correct to the penny.

**Supplemental readiness check:** What is £80 received minus £105 paid? Does a negative answer mean nothing was received? Try before reading on. If subtraction or “long” is unfamiliar, the next section supplies the entire foundation needed here. The planned preceding lesson and shared concept pages are not yet authored; this prototype does not require opening them.

<a id="foundations"></a>

## 1. Foundation: dates, signs and units — supplemental bridge

An **asset** is the thing being bought or sold. Calling it the **underlying** means it is the asset specified by this contract. A **unit** is the contract's agreed amount of that asset; all parties must mean the same asset, quality and unit. A **spot price** is the price for an immediate exchange at the date in question. It can differ today and three months from today.

Read a cash-flow sign from one person's viewpoint: cash received is positive; cash paid is negative. For a physically delivered asset we also record its market value with a positive sign if received and a negative sign if delivered. That valuation is **not a second cash payment**. Adding the valued asset leg to the cash leg gives the net economic payoff of the exchange.

Subtract in order: £80 − £105 = −£25 because the payment exceeds the value received by £25. Reversing the order gives £105 − £80 = +£25. The signs indicate loss or gain relative to exchanging at the contemporaneous market price, not whether an exchange happened. Opposite results cancel: −£25 + £25 = £0.

| Notation | Read it as | Meaning and unit in this lesson |
|---|---|---|
| $T$ | “the delivery date” | The specified future date, three months after agreement in the source example. Also called maturity. It is not an interest rate. |
| $K$ | “delivery price” | Price fixed when the parties agree, in pounds sterling (GBP, £) per asset unit; £105 per unit in the source example. |
| $S_T$ | “spot price at T” | Market price at delivery, in £ per asset unit. The subscript identifies the date; it does not mean multiplication. Unknown when the contract is agreed. |
| $\Pi_T^{\mathrm{long}}$ | “long payoff at T” | Net maturity payoff for one underlying unit, in £ per unit. The superscript is a label, not a power. |
| $\Pi_T^{\mathrm{short}}$ | “short payoff at T” | Corresponding one-unit maturity payoff for the selling party, in £ per unit. |
| $q$ | “quantity” | A positive number of asset units, used only for the supplemental quantity extension. |

**Conventions for all calculations:** both parties perform the agreed exchange at $T$; the received and delivered asset is the same underlying and unit; prices share the same currency; no transaction, financing or other extra costs enter the payoff calculation. The basic source example uses one unit and physical delivery. We calculate terminal payoff, not the contract's value today. No annual rate, compounding, discounting or percentage conversion is used. Three months locates the exchange; it is not a multiplier in these payoff formulas. Profit needs further conditions, discussed below.

<a id="agreement"></a>

## 2. The source agreement: fixed terms, uncertain market price

**Source scenario:** a UK firm needs to buy **one unit in three months**. The asset costs **£100 today**, and its price in three months is uncertain. [L1 physical p20, upper situation box; `lecture-1-p020-forward-scenario`](../../sources/annotated/lecture-1/page-020.md#lecture-1-p020-forward-scenario).

**Source agreement:** today the firm agrees to buy that asset in three months for **£105**. [L1 physical p20, middle contract box; `lecture-1-p020-forward-agreement`](../../sources/annotated/lecture-1/page-020.md#lecture-1-p020-forward-agreement).

**Source terms:** the transaction happens on specified future date $T$; delivery price $K=105$ is fixed today; **both parties are obliged to complete the transaction**. [L1 physical p20, lower contract-term bullets; `lecture-1-p020-forward-terms`](../../sources/annotated/lecture-1/page-020.md#lecture-1-p020-forward-terms).

**Supplemental timeline and reasoning:**

- **Today:** identify the asset, agree one unit, the date three months ahead and £105 per unit. Agreeing now is not the same as paying the delivery price now.
- **At $T$:** the firm pays £105 and receives one asset unit. The other party delivers that unit and receives £105.
- **What stays fixed:** the agreed date, quantity and delivery price. **What can change:** the spot market price used to assess the exchange at $T$.

The source's £100 today and £105 delivery price answer different questions. £100 is today's immediate-purchase price; £105 is the agreed future-delivery price. Their £5 difference is **not** the long's maturity payoff. Pages 20–22 do not supply a pricing model to establish that £105 is a fair delivery price or a forecast of the future spot price. We take it as the agreed term, not a result to derive.

<a id="long-side"></a>

## 3. Two parties, opposite commitments

**Source: long forward.** The **long** party agrees to **buy** the underlying at $T$ for $K$. In this scenario, the firm is long. [L1 physical p21, left long-forward box; `lecture-1-p021-long-forward`](../../sources/annotated/lecture-1/page-021.md#lecture-1-p021-long-forward).

<a id="short-side"></a>

**Source: short forward.** The **short** party agrees to **sell** the underlying at the same $T$ for the same $K$. The firm's counterparty—the party on the other side of its contract—is short. [L1 physical p21, right short-forward box; `lecture-1-p021-short-forward`](../../sources/annotated/lecture-1/page-021.md#lecture-1-p021-short-forward).

**Supplemental distinction:** long and short identify the agreed side, not the contract's length and not whether someone ultimately gains. A long forward can lose money. “Short forward” here means a future delivery obligation, not necessarily borrowing and selling an asset today.

<a id="direction"></a>

### The slide's question: who benefits if the market price rises above K?

The source asks which party benefits if the maturity market price exceeds $K$. [L1 physical p21, lower quick-check box; `lecture-1-p021-forward-direction-question`](../../sources/annotated/lecture-1/page-021.md#lecture-1-p021-forward-direction-question).

**Supplemental answer and intuition:** the **long** benefits on this contract: it buys for less than the asset's market value at delivery. The short receives less than that same asset could fetch in the market. If the market price instead falls below $K$, the long must pay more than the market price and the short benefits on the contract. Neither result changes their identities or cancels their obligations. This compares the forward exchange with the market exchange at $T$, not either party's entire business profit.

<a id="source-table"></a>

## 4. Read every leg of the source payoff table

**Source table, accessible transcription:** $K=105$, one underlying unit. Each amount below is in pounds for that one unit. “Asset received” values the asset received by the long at the maturity spot price; “Payment” is its cash payment. The source displays these three rows in ascending $S_T$ order. [L1 physical p22, upper scenario and central cash-flow table; `lecture-1-p022-forward-payoff-table`](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-forward-payoff-table).

| Maturity market price $S_T$ | Asset received: market value | Payment | Long payoff |
|---|---:|---:|---:|
| £80 | +£80 | −£105 | −£25 |
| £105 | +£105 | −£105 | £0 |
| £130 | +£130 | −£105 | +£25 |

**Supplemental reading guide:** the payment column never changes because the contract fixes £105. Only the received asset's market value changes. At £80 the long still receives an asset—it does not receive “minus 25 assets”—but gives up £105 for something worth £80. At £105 the net payoff is zero **despite** an asset and cash still changing hands. At £130 the long receives something worth £25 more than it pays. The table reports economic payoffs, not an extra £25 cash transfer between the parties on top of physical delivery.

<a id="long-formula"></a>

## 5. Build the formulas instead of memorising the signs

**Long derivation — supplemental explanation of the source formula:**

1. Receive one unit worth $S_T$: record $+S_T$.
2. Pay the agreed delivery price: record $-K$.
3. Add those two legs: $S_T+(-K)=S_T-K$.

The source's general result is

$$\Pi_T^{\mathrm{long}}=S_T-K.$$

Plain-text fallback: **long payoff per unit = maturity market price minus delivery price**. Both prices are £ per unit, so the result is also £ per unit. [L1 physical p22, lower general-result box, left equation; `lecture-1-p022-long-payoff-formula`](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-long-payoff-formula).

<a id="short-formula"></a>

**Short derivation — supplemental explanation of the source formula:**

1. Receive the delivery price in cash: record $+K$.
2. Deliver one unit worth $S_T$: record $-S_T$.
3. Add the legs: $K+(-S_T)=K-S_T$.

The source's second general result is

$$\Pi_T^{\mathrm{short}}=K-S_T.$$

Plain-text fallback: **short payoff per unit = delivery price minus maturity market price**. [L1 physical p22, lower general-result box, right equation; `lecture-1-p022-short-payoff-formula`](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-short-payoff-formula).

<a id="checks-and-quantity"></a>

**Supplemental checks and quantity extension:** add the two payoffs and every term cancels: $(S_T-K)+(K-S_T)=0$. These are opposite sides of the same exchange before costs, so one side's payoff is the other's negative. If $S_T=K$, both are zero. If $S_T$ increases by £1 per unit while $K$ stays fixed, long payoff increases by £1 per unit and short payoff decreases by £1 per unit.

For $q$ identical units, multiply the **whole price difference**, not just one price:

$$\text{Total long payoff}=q(S_T-K),\qquad\text{Total short payoff}=q(K-S_T).$$

Plain-text fallback: **total payoff = number of units × payoff per unit**. Units check: asset units × pounds per asset unit = pounds. This is a supplemental extension of the source's one-unit formulas; it is not an additional formula printed on page 22.

<a id="worked-example"></a>

## 6. A complete worked exchange — supplemental walkthrough

Use the source contract: one unit, $K=£105$ per unit, delivery three months after agreement. Suppose $S_T=£130$ per unit, the source table's last row. Both parties perform; no extra costs are included.

1. **Identify the side:** the firm promised to buy, so it is long. Its counterparty promised to sell, so it is short.
2. **Write the actual deliveries:** the firm pays £105 and receives one asset; the counterparty receives £105 and delivers that asset.
3. **Value the long's receipt at delivery:** one unit × £130 per unit = £130. The long's net exchange value is £130 − £105 = **+£25**.
4. **Reverse the legs for the short:** receive £105, deliver an asset worth £130. Net exchange value is £105 − £130 = **−£25**.
5. **Check the arithmetic:** +£25 + (−£25) = £0. No rounding is needed. The maturity market price exceeds the fixed delivery price, so the positive sign belongs to the long, as the intuition predicted.
6. **Check the boundary and downside:** at £105 market price, £105 − £105 = £0; at £80, £80 − £105 = −£25 for the long and £105 − £80 = +£25 for the short. The long remains obligated in both cases.

**Budget interpretation — supplemental:** the firm's agreed purchase cash payment is £105 in every row. A negative forward payoff means its contracted purchase is more expensive than buying at the maturity spot price; it does not mean that the agreed payment has increased. The price certainty can therefore serve a budgeting purpose even when the contract payoff is negative.

<a id="limits"></a>

## 7. Misconceptions and limits — supplemental clarification

- **“I can walk away if the price moves against me.”** Not under the forward described here: both parties have obligations. An option, by contrast, gives its holder a choice whether to exercise its contractual right; that choice is not part of this forward. We are not using an option payoff that replaces losses with zero.
- **“A positive payoff means the short pays the long that cash in addition to delivering the asset.”** Not in this physical-delivery example. The payoff combines the asset's market value and the delivery payment. A contract that specifies cash settlement is a different settlement arrangement; do not assume it from the payoff expression alone.
- **“Payoff always equals profit.”** Payoff here measures the exchange at $T$. For the forward position alone it also equals total profit in the simplified case of **zero initial contract value/no upfront payment and no transaction, financing or other costs**. If there is an initial payment or other cash flow, total profit must include it on a consistent time basis. We have not calculated that adjustment. Zero initial value or no upfront payment does **not** mean a free asset, no risk or no possible loss: the delivery payment and both obligations remain. Neither the short's prior asset acquisition cost nor the firm's wider business revenues are in these payoff formulas.
- **“The contract is worth £25 today because it pays £25 in the example.”** The £25 is a maturity payoff under a specified future market price, not a current valuation or a forecast. A current value requires additional information outside this lesson.
- **“Long gains whenever today's price rises.”** The maturity comparison is $S_T$ against **$K$**, not against today's £100 spot price. At $S_T=£104$, the spot price is above today's £100, but the long payoff is £104 − £105 = **−£1**; short payoff is +£1.
- **“The hedge removes all risk.”** The calculation assumes performance and an exactly matching asset, quantity and date. A party might fail to perform, and a firm's actual purchase need might change. Price certainty for this agreed exchange is not a guarantee about all real-world costs or risks.

<a id="practice"></a>

## 8. Practice: attempt first, then use the separate answers

All new exercises and all answer explanations are **supplemental**. Exercise 3 repeats the source's quick-check question and adds a supplemental explanation task. Readiness questions and retries are informal scaffolding, not a record of learner performance.

<a id="exercise-terms-scaffold-prompt"></a>

### Exercise 1 — identify terms with a scaffold (outcome 1)

For the source UK firm, fill in: asset quantity ___; delivery date ___; today's spot price ___; delivery price ___; firm is long/short ___; counterparty is long/short ___. Complete: “At delivery the firm must ___ and the counterparty must ___.” Does agreeing today mean the delivery price is paid today? [Check answer 1](#exercise-terms-scaffold-answer).

<a id="exercise-terms-transfer-prompt"></a>

### Exercise 2 — transfer the roles (outcome 1)

A producer agrees today to sell one unit to a customer six months from today for £70 per unit. Identify $T$, $K$, the long party and the short party. If the maturity market price is £60, may the customer simply decline the purchase because it is now expensive? Explain from the obligations, without needing a formula. [Check answer 2](#exercise-terms-transfer-answer).

<a id="exercise-direction-prompt"></a>

### Exercise 3 — source quick check, with reasoning (outcome 1)

“If the market price at maturity rises above $K$, which party benefits?” This is the question in [L1 p21, lower quick-check box](../../sources/annotated/lecture-1/page-021.md#lecture-1-p021-forward-direction-question). Supplemental task: justify your answer by describing what the benefiting party receives and pays; say why the other party cannot discard its obligation. [Check answer 3](#exercise-direction-answer).

<a id="exercise-payoff-scaffold-prompt"></a>

### Exercise 4 — calculate the source downside row (outcome 2)

One unit, $K=£105$, $S_T=£80$, both parties perform, no extra costs. Fill in the long's asset value and cash payment, then add them. Reverse both legs for the short and calculate its payoff. Check the sum. Explain why the long's negative payoff does not mean it receives no asset. [Check answer 4](#exercise-payoff-scaffold-answer).

<a id="exercise-payoff-transfer-prompt"></a>

### Exercise 5 — build a new table and scale it (outcome 2)

A new one-unit contract has $K=£100$ per unit. For maturity prices £80, £100 and £120 per unit, calculate both signed payoffs and the sum in each row. State which row has zero payoff and whether delivery still occurs. Then consider a **separate** contract for four units with $K=£105$ and $S_T=£92$ per unit: show total asset value, total delivery payment and both total payoffs. State all units; use the same no-extra-costs/performance assumptions. [Check answer 5](#exercise-payoff-transfer-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 6 — explain to a beginner (outcome 1 teach-back)

In four to six sentences explain the source firm's problem, what it fixes today and what remains unknown, who is long/short, and why a forward is an obligation rather than an option. Finish by explaining which side benefits when $S_T>K$, without merely naming a formula. [Compare with answer 6](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 7 — diagnose and teach back (outcome 2)

A learner says: “Today the asset costs £100; the contract costs £105; therefore the long loses £5. If the market price at maturity is £130, the long receives an extra £25 cash as well as the asset, and that £25 must be total profit.” Correct all three claims. Show the actual maturity legs and both payoffs, explain the zero-sum check and give the conditions under which payoff would equal profit for the forward position. [Compare with answer 7](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 9. Supplemental answers, feedback and retries

These are authored teaching answers, not supplied official solutions. A correct number without the corresponding reasoning does not yet satisfy the outcome. Attempt a retry before reading its answer.

<a id="exercise-terms-scaffold-answer"></a>

### Answer 1 — terms scaffold

**Quantity:** one unit. **Delivery:** three months after agreement. **Today's spot:** £100 per unit. **Delivery price:** £105 per unit. **Firm:** long/buyer. **Counterparty:** short/seller. At delivery the firm must pay £105 and receive the unit; the counterparty must deliver it and receive £105. Agreement happens today; the delivery payment happens at $T$, not today. The specified exchange does not assert any additional initial cash flow.

**Feedback/retry:** if £100 was used as the delivery price, distinguish “buy now” from “agreed future purchase.” Retry: which figure is fixed in the contract for the payment at delivery? Correct target: £105 per unit.

<a id="exercise-terms-transfer-answer"></a>

### Answer 2 — terms transfer

$T$ is six months after agreement; $K$ is £70 per unit. The customer is long because it agrees to buy; the producer is short because it agrees to sell. At £60 market price the customer would prefer the cheaper market purchase, but the forward still obliges it to buy for £70. The producer still owes the asset. Long/short roles do not switch when prices change.

**Feedback/retry:** if you gave the customer a free choice, you treated the contract as an option. Retry: is “agrees to buy” a promise or a right it may freely decline? Correct target: a binding promise in this example.

<a id="exercise-direction-answer"></a>

### Answer 3 — direction

The long benefits on the forward: it receives an asset worth $S_T$ while paying only $K$, and $S_T$ is larger. The short delivers that higher-valued asset for the lower agreed payment. Both must perform; an unfavourable result does not remove the promise to deliver or pay.

**Feedback/retry:** if you chose short, start with “who gets the asset?” Retry with the source's £130 market value and £105 delivery payment: is the buyer receiving more value or less than it pays? Correct target: more, by £25.

<a id="exercise-payoff-scaffold-answer"></a>

### Answer 4 — downside row

Long: receive an asset valued at +£80; pay −£105; sum **−£25**. Short: receive +£105 cash; deliver an asset valued at −£80; sum **+£25**. Check: −£25 + £25 = £0. The long receives one asset, but it is worth £25 less than the payment it owes.

**Feedback/retry:** if you wrote zero for the long, you dropped the obligation. If you wrote +£25, you reversed its legs. Retry: mark the cash paid as negative before adding £80 + (−£105). Correct target: −£25.

<a id="exercise-payoff-transfer-answer"></a>

### Answer 5 — transfer table and quantity

| $S_T$ (£ per unit), with $K=£100$ per unit | Long payoff (£, one unit) | Short payoff (£, one unit) | Sum (£) |
|---|---:|---:|---:|
| 80 | 80 − 100 = −20 | 100 − 80 = +20 | 0 |
| 100 | 100 − 100 = 0 | 100 − 100 = 0 | 0 |
| 120 | 120 − 100 = +20 | 100 − 120 = −20 | 0 |

At $S_T=K=£100$ per unit the payoffs are zero, but the long still pays £100 and receives one unit.

For the separate four-unit contract, the long receives assets worth 4 × £92 = **£368** and pays 4 × £105 = **£420**. Its payoff is £368 − £420 = **−£52**, equivalently 4 × (£92 − £105) = 4 × (−£13) = −£52. The short receives £420 and delivers assets worth £368, giving **+£52**. Check: −£52 + £52 = £0. Prices are pounds per unit; the multiplied totals are pounds. No rounding is needed.

**Feedback/retry:** if you obtained −£13 as the total, you stopped at the per-unit result. If you multiplied only one term, you mixed units. Retry: write “four units × negative thirteen pounds per unit.” Correct target: negative fifty-two pounds.

<a id="exercise-explain-teachback-answer"></a>

### Answer 6 — explanation checklist and model

A sufficient teach-back includes the uncertain future purchase price, one-unit quantity, three-month delivery, £105 fixed delivery price, buyer/long and seller/short obligations, and why buying below the maturity market price benefits the long.

**Supplemental model:** “The firm needs one unit in three months but does not know what the market price will be then. It agrees now to pay £105 per unit on that future date; the market price then remains uncertain. The firm is long because it promises to buy, and its counterparty is short because it promises to sell. Both must complete the exchange, even if the price moves against them: the firm does not have an option to walk away. If the market price then exceeds £105, the long gets an asset worth more than its agreed payment.”

**Feedback/retry:** if any term or obligation is absent, identify the missing item rather than declaring the whole explanation mastered. Retry: in one sentence contrast “the price we agreed” with “the price the market will offer at delivery,” then retell the full example. Correct distinction: £105 is fixed now; the delivery-date market price is not.

<a id="exercise-apply-teachback-answer"></a>

### Answer 7 — diagnosis and application teach-back

1. £105 − £100 = £5 compares prices for **different transaction dates**, not the maturity payoff. Use the maturity market price, not today's spot, for that payoff.
2. At maturity the long pays £105 and receives one asset worth £130: £130 − £105 = **+£25**. The short receives £105 and delivers the asset worth £130: **−£25**. The positive £25 is net exchange value, **not** extra cash on top of receiving the asset. Check: +£25 − £25 = £0 before costs.
3. For this forward position, payoff equals total profit only under the simplified zero-initial-value/no-upfront-payment and no-additional-costs conditions. Otherwise include other cash flows with a consistent time basis; neither total business profit nor a present contract value has been calculated here.

**Feedback/retry:** if the arithmetic is right but you still call it an extra payment, list only the actual asset and cash that cross between the parties. Correct target: one asset goes to the long; £105 goes to the short. Then explain why valuing the asset at £130 produces the £25 payoff without a third transfer.

<a id="next-step"></a>

## Stop and check

**Supplemental tutoring prompt:** give your own answers to exercises 6 and 7, including the payment/asset distinction. A tutor should check terms, direction, arithmetic and interpretation separately, give focused feedback on a missing step and use that step's retry before returning to the full question. Keep your response and self-assessment in your private learner notes, not in this lesson. Reading the answers or passing an author check does not establish learning.

Next planned topic: currency quotations and forward purchases. It is not needed to complete this lesson. This prototype stops at one-unit forward obligations and maturity payoff, with a labelled quantity extension; it does not teach forward pricing, current contract valuation or option pricing.

<a id="evidence"></a>

## Original evidence and source boundaries

Only the nine cited substantive units from Lecture 1 physical pages 20–22 ground this lesson. Full normalized spans, unchanged raw pages and original production images were inspected. The normalized pages retain historical “needs independent review” headers; canonical source-unit records now mark these units verified. That source status does not approve this teaching draft. No source conflict is recorded for these nine units.

| Physical PDF page | Exact substantive regions | Complete normalized page | Unchanged raw page | Original image |
|---|---|---|---|---|
| 20 | Upper situation box; middle contract box; lower contract-term bullets | [Page 20](../../sources/annotated/lecture-1/page-020.md) | [Raw 20](../../sources/extracted/lecture-1/page-020.md#page-20) | [Original 20](../../sources/assets/lecture-1/page-020.png) |
| 21 | Left long-forward box; right short-forward box; lower quick-check box | [Page 21](../../sources/annotated/lecture-1/page-021.md) | [Raw 21](../../sources/extracted/lecture-1/page-021.md#page-21) | [Original 21](../../sources/assets/lecture-1/page-021.png) |
| 22 | Upper scenario and central cash-flow table; lower general-result box, left and right equations | [Page 22](../../sources/annotated/lecture-1/page-022.md) | [Raw 22](../../sources/extracted/lecture-1/page-022.md#page-22) | [Original 22](../../sources/assets/lecture-1/page-022.png) |
