# Option rights and call/put payoff decisions

<a id="status"></a>

**Unreviewed teaching draft — Lecture 1, physical pages 32–36.** All nineteen mapped substantive units are taught, including the repeated call definition/question/table/formula on **each of pages 33, 34 and 35**. Exact source citations identify those repetitions. Teaching bridges, additional examples, practice and all answer explanations are **supplemental**, not official solutions. This is neither approval nor a record of learner mastery.

<a id="outcomes"></a>

## Why pay for a choice?

A futures or forward obligation can become unattractive, but the obligation remains. An option buyer instead pays for a specified choice. The key is to distinguish the favourable *exercise value* of that choice from profit after paying for it.

1. **Explain:** compare the source's obligation and purchase right, define call/put, holder/writer, strike, maturity, exercise and premium, and describe the actual exchange when each right is used. Success requires distinguishing the option buyer's choice from the writer's obligation, explaining why flexibility has value before its cost, and rejecting “positive exercise value guarantees net profit” or “exercise now is always best.”
2. **Apply:** reconstruct the separate call decision/payoff tables on p33, p34 and p35 and the put table on p36; derive and apply the maximum/piecewise rules at below/equal/above-strike prices. For a new stated quantity, compute holder and matching writer maturity payoffs with units and zero-sum checks; distinguish physical asset/cash transfers from net payoff and a premium loss. Monetary answers must be correct to the penny with the sign, choice and scope justified.

Planned sequence prerequisite: [margin and contract-size reasoning](lesson-l1-margin-and-contract-size.md#foundations); all option terms needed here are defined below. **Supplemental readiness check:** if an asset is worth £70, would you voluntarily pay £100 for it when you may simply decline? Under the no-extra-cost maturity comparison here, no: doing so gives net exchange value −£30, while declining gives £0 at maturity. That does not refund any earlier cost of obtaining the choice.

<a id="foundations"></a>

## 1. Foundations: rights, payments and the maximum — supplemental

An **underlying asset** is the item specified by the contract. A **holder/buyer**, also called **long the option**, owns a right. The **writer/seller**, also called **short the option**, owes the corresponding performance if the holder validly exercises under the contract. An **option to buy** is a **call**; an **option to sell** is a **put**. “Long an option” means owning the right, not necessarily wanting the underlying price to rise: a long put gains exercise value when the underlying price falls.

**Exercise** means using the contractual right to trade at the agreed **strike price**. **Expiry/maturity** is the specified end date for that right. A **premium** is the price paid to obtain it; it is not the strike payment and not a refundable futures margin deposit. **Payoff** in this lesson means the net economic value of the maturity exchange/choice, before the premium and other costs. **Profit** must also account for the premium and any other relevant cash flows on a consistent time basis.

The mathematical function **max(a, b)** chooses the larger of its two inputs. For example, max(−30, 0) = 0; max(0, 0) = 0; max(30, 0) = 30. Compute everything inside the first input before comparing it with zero. Here both inputs represent the same currency per underlying unit. A **piecewise rule** is the same calculation written as different cases: one expression when a condition holds, another when it does not.

| Symbol | Definition before use | Unit/convention |
|---|---|---|
| $T$ | Maturity/expiry date | Date; three months after agreement in the p32 motivation |
| $S_T$ | Underlying market price at maturity | GBP (£) per underlying unit in these examples |
| $K$ | Strike: price at which the right lets the holder trade | Same GBP per underlying unit; fixed for that contract |
| $C_T$ | Call holder's maturity payoff per underlying unit | GBP per unit; “C” identifies call, subscript labels maturity |
| $P_T$ | Put holder's maturity payoff per underlying unit | GBP per unit; not premium or a negative sign |
| $Q$ | Positive total number of underlying units covered | Underlying units, not automatically the number of listed option contracts |
| $c_0$ | Call premium paid initially, used only in the labelled cost bridge | GBP per underlying unit; subscript 0 means the initial date |

**Assumptions before using the formulas:** decisions are at **maturity**, the right is exercisable then, the contract is honoured, the asset and market-price units match, and there are no exercise fees, transaction costs or market frictions. Exercising is compared with declining the remaining exchange. We describe physical settlement as asset-for-cash; cash settlement would instead follow its specified cash-difference rule. A net value is not an extra cash payment on top of physical delivery. The source tables concern one underlying unit; quantity extensions are labelled. No option-price model, probabilities, annualisation or discounting is needed. We do **not** claim an early exercise decision follows from this expiry rule.

<a id="choice-obligation"></a>

## 2. Page 32: compare identical purchases with and without a choice

The source offers an asset in three months for £100 under either **an obligation to buy** or **a right, but not an obligation, to buy**. [L1 physical p32, upper two-contract box; `lecture-1-p032-choice-versus-obligation`](../../sources/annotated/lecture-1/page-032.md#lecture-1-p032-choice-versus-obligation).

**Supplemental step-by-step comparison:** keep the asset, one-unit quantity, £100 price and future date the same. At maturity, a binding purchase gives value received minus price paid: $S_T-100$. With a choice, the holder can make that exchange when it is beneficial and decline it when not. Declining leaves zero payoff from the maturity exchange, not a negative payoff. Three months is when the choice/purchase occurs; do not multiply the price difference by three.

| Maturity asset price (£/unit) | Obliged buyer's net exchange (£, one unit) | Optional buyer's best maturity choice | Optional buyer payoff (£, one unit) |
|---:|---:|---|---:|
| 70 | 70 − 100 = −30 | Decline buying for more than market value | 0 |
| 100 | 100 − 100 = 0 | Indifferent under no-cost assumptions | 0 |
| 130 | 130 − 100 = +30 | Buy at 100 for value 130 | +30 |

This is a **supplemental table**, expanding the source's comparison; it is not an additional table printed on p32. For a futures comparison, remember that gains/losses settle daily: this table isolates the purchase obligation's terminal exchange economics, not a complete futures cash-flow path.

<a id="option-distinction"></a>

The source's key distinction is: forward/futures create an obligation; an option gives its **buyer a right**, for which the buyer pays a **premium**. [L1 physical p32, middle distinction box; `lecture-1-p032-option-distinction`](../../sources/annotated/lecture-1/page-032.md#lecture-1-p032-option-distinction). **Supplemental interpretation:** the right belongs to the buyer, not to both parties. The writer cannot simply decline an unfavourable valid exercise. Buying a put is not the same as writing a call; their rights, obligations and payoffs differ.

<a id="choice-value"></a>

The source asks which contract is more valuable to its holder and why. [L1 physical p32, bottom question; `lecture-1-p032-choice-value-question`](../../sources/annotated/lecture-1/page-032.md#lecture-1-p032-choice-value-question).

**Supplemental answer with scope:** at identical underlying/strike/date terms **before accounting for acquisition cost**, the right provides at least the same maturity payoff as the obligation in every state: exercise when advantageous, decline otherwise. It is strictly better in a state where the obligation would lose. This extra flexibility explains why the holder can be willing to pay a premium. It does not calculate a fair premium, prove a strict advantage in every possible state, or prove that buying the option at any quoted premium yields a greater net profit. Current value needs information outside this lesson.

<a id="call33-definition"></a>

## 3. Page 33: build the first call decision from its definition

A **call** gives its holder the right, not the obligation, to **buy** the underlying for strike $K$. [L1 physical p33, upper call box; `lecture-1-p033-call-definition`](../../sources/annotated/lecture-1/page-033.md#lecture-1-p033-call-definition). **Supplemental physical interpretation:** exercising one call unit sends $K$ pounds in cash from holder to writer and one underlying unit from writer to holder. If not exercised, those exercise transfers do not occur; the earlier premium is a separate payment.

<a id="call33-question"></a>

The source asks whether you would exercise with **$K=100$** and **$S_T=70,100,130$**. The table shows GBP amounts, so we read the prices as £ per underlying unit. [L1 physical p33, middle exercise-decision box; `lecture-1-p033-call-exercise-question`](../../sources/annotated/lecture-1/page-033.md#lecture-1-p033-call-exercise-question). Before looking at its table, compare each prospective asset receipt with the £100 strike payment; then compare that exchange with doing nothing at maturity.

<a id="call33-table"></a>

**Complete accessible source table, p33:** columns are maturity market price, exercise decision and holder payoff; all amounts below are pounds for one unit. There are three rows, no graph axes or probabilities. [L1 physical p33, lower table; `lecture-1-p033-call-exercise-table`](../../sources/annotated/lecture-1/page-033.md#lecture-1-p033-call-exercise-table).

| $S_T$ | Exercise? | Payoff |
|---|---|---:|
| £70 | No | £0 |
| £100 | Indifferent | £0 |
| £130 | Yes | £30 |

**Supplemental reasoning for every row:**

- £70: exercising would mean receiving value £70 for £100, a −£30 exchange. Declining gives £0, so **do not exercise**. The −£30 is the rejected exchange, not the holder's option payoff.
- £100: exercising gives £100 − £100 = £0; declining also gives £0. **Indifferent** means equal economic payoff under the no-cost assumptions, not a prediction about an institution's exercise procedures.
- £130: exercise gives £130 − £100 = **£30**, better than declining for £0. The holder receives the asset and pays £100; it does not receive a free asset plus £30 extra cash.

<a id="call33-formula"></a>

The source compresses those decisions into

$$C_T=\max(S_T-K,0).$$

[L1 physical p33, bottom equation; `lecture-1-p033-call-payoff-formula`](../../sources/annotated/lecture-1/page-033.md#lecture-1-p033-call-payoff-formula).

**Supplemental derivation:** the first alternative is the exercise exchange, $S_T-K$; the second is declining, zero. Choose the larger. Thus call payoff is **0 when $S_T\le K$**, and **$S_T-K$ when $S_T>K$**; at equality both expressions give zero. Plain-language reading: take the positive part of “maturity price minus strike,” not “strike minus maturity price.” Parentheses cover the whole subtraction before comparison.

<a id="call34-definition"></a>

## 4. Page 34: repeat the promise, now separate decision from payment

This physical page repeats the call definition: a holder may **buy** at $K$ and need not do so. [L1 physical p34, upper call box; `lecture-1-p034-call-definition`](../../sources/annotated/lecture-1/page-034.md#lecture-1-p034-call-definition). **Supplemental teaching focus:** the word “right” limits the holder's exercise obligation; it does not make the exercise purchase price zero. Once exercised under physical settlement, the holder pays the strike and the writer delivers the asset. This is the same contract type as p33, not a new option or a new premium.

<a id="call34-question"></a>

Page 34 again asks about **$K=100$** at **$S_T=70,100,130$**. [L1 physical p34, middle exercise-decision box; `lecture-1-p034-call-exercise-question`](../../sources/annotated/lecture-1/page-034.md#lecture-1-p034-call-exercise-question). **Supplemental second pass:** answer without relying on a memorised “high price means yes.” Write what is received, what is paid and what declining leaves, and pay special attention to the equality row.

<a id="call34-table"></a>

**Complete accessible source table, p34** — retained independently rather than discarded as a duplicate. [L1 physical p34, lower table; `lecture-1-p034-call-exercise-table`](../../sources/annotated/lecture-1/page-034.md#lecture-1-p034-call-exercise-table).

| $S_T$ | Exercise? | Payoff |
|---|---|---:|
| £70 | No | £0 |
| £100 | Indifferent | £0 |
| £130 | Yes | £30 |

**Supplemental second-pass interpretation:** at £70, no exercise asset/cash exchange is preferable to paying £100 for value £70; payoff stays £0. At £100, a gross exchange of asset and £100 could occur but has zero net value; declining also has zero. At £130, gross legs are +£130 asset value and −£100 cash, giving £30. Thus a zero payoff does not always describe the same physical actions, and a positive payoff is not automatically a cash-difference settlement. Any operational exercise requirements come from the contract, not this classroom table.

<a id="call34-formula"></a>

The source repeats

$$C_T=\max(S_T-K,0).$$

[L1 physical p34, bottom equation; `lecture-1-p034-call-payoff-formula`](../../sources/annotated/lecture-1/page-034.md#lecture-1-p034-call-payoff-formula). **Supplemental equality check:** substitute $S_T=K$ before doing anything else: max($K-K$, 0) = max(0, 0) = **0**. Both exercise and decline are tied here; “exercise only if strictly greater” is the positive-value test, not an assertion that exercising at equality is impossible. This formula describes maturity payoff, not the premium or today's option value.

<a id="call35-definition"></a>

## 5. Page 35: repeat the call, now diagnose the sign boundary

The third physical call page again defines the holder's **right to buy** at $K$. [L1 physical p35, upper call box; `lecture-1-p035-call-definition`](../../sources/annotated/lecture-1/page-035.md#lecture-1-p035-call-definition). **Supplemental teaching focus:** the holder controls use of the right; the writer has the opposite performance obligation if it is used. “Long call” means owning this right. It does not give the holder a forward-like obligation to accept a negative exercise exchange.

<a id="call35-question"></a>

The repeated exercise question again fixes **$K=100$** and asks about **$S_T=70,100,130$**. [L1 physical p35, middle decision box; `lecture-1-p035-call-exercise-question`](../../sources/annotated/lecture-1/page-035.md#lecture-1-p035-call-exercise-question). **Supplemental third pass:** predict which rows would change if you incorrectly removed the choice and treated the call as a forward. Only the below-strike row would wrongly acquire a negative payoff; the equality/high rows alone cannot detect that mistake.

<a id="call35-table"></a>

**Complete accessible source table, p35** — the same cells are independently retained. [L1 physical p35, lower table; `lecture-1-p035-call-exercise-table`](../../sources/annotated/lecture-1/page-035.md#lecture-1-p035-call-exercise-table).

| $S_T$ | Exercise? | Payoff |
|---|---|---:|
| £70 | No | £0 |
| £100 | Indifferent | £0 |
| £130 | Yes | £30 |

**Supplemental third-pass verification:** below strike, “No / £0” preserves the choice; it is not “Yes / −£30.” At equality, “Indifferent / £0” preserves a tie, not a positive gain. Above strike, “Yes / £30” measures the difference, not the full £130 asset value. All three statements must be correct; one high-price worked example is not enough to establish the rule.

<a id="call35-formula"></a>

The source again gives

$$C_T=\max(S_T-K,0).$$

[L1 physical p35, bottom equation; `lecture-1-p035-call-payoff-formula`](../../sources/annotated/lecture-1/page-035.md#lecture-1-p035-call-payoff-formula). **Supplemental boundary/shape explanation:** when price rises from below strike toward $K$, the holder payoff remains zero; above $K$, each £1/unit rise adds £1/unit payoff. If drawn, the payoff would be flat at zero to the left of $K$, then rise from the join at $K$. That is an authored description of the piecewise formula, **not a graph printed on these three pages**. It explains why a call differs from the forward's straight line continuing below zero.

<a id="put-definition"></a>

## 6. Page 36: a put reverses the transaction, not the holder's choice

The source defines a **put** as the holder's right, but not obligation, to **sell** the underlying for $K$. [L1 physical p36, upper put box; `lecture-1-p036-put-definition`](../../sources/annotated/lecture-1/page-036.md#lecture-1-p036-put-definition).

**Supplemental intuition:** a guaranteed selling opportunity is useful when the market price is low. At maturity the holder can deliver an asset worth $S_T$ and receive $K$; the exchange value is **$K-S_T$**. For physical exercise, the holder needs to provide the asset; valuing that delivered asset at its market price is an opportunity-cost calculation, not a claim that the holder originally purchased it for that price. Alternatively, in the frictionless illustration, acquiring it at the stated maturity market price then delivering it realises that difference. We are not calculating the total profit on an earlier asset purchase.

<a id="put-question"></a>

The source's “your turn” asks for put payoff with **$K=100$** at **$S_T=70,100,130$**. [L1 physical p36, middle question; `lecture-1-p036-put-exercise-question`](../../sources/annotated/lecture-1/page-036.md#lecture-1-p036-put-exercise-question). Try the low-price case first: would selling for £100 improve on giving up an asset worth £70? Then compare with declining the put exercise.

<a id="put-table"></a>

**Complete accessible source table, p36:** the same price rows as the call tables, but opposite favourable direction. [L1 physical p36, lower exercise/payoff table; `lecture-1-p036-put-exercise-table`](../../sources/annotated/lecture-1/page-036.md#lecture-1-p036-put-exercise-table).

| $S_T$ | Exercise? | Payoff |
|---|---|---:|
| £70 | Yes | £30 |
| £100 | Indifferent | £0 |
| £130 | No | £0 |

**Supplemental reasoning for every row:**

- £70: deliver an asset worth £70 and receive £100. Value gain = £100 − £70 = **£30**, better than no put exercise; **exercise**.
- £100: receive £100 for value £100, giving **£0**, the same as declining; **indifferent** absent costs.
- £130: selling for £100 would give up value £130 for a −£30 exchange, worse than declining the put. **Do not exercise**; put payoff is **£0**, not −£30. The holder may still choose to sell an owned asset in the market, but that is not exercise of this put.

<a id="put-formula"></a>

The source gives

$$P_T=\max(K-S_T,0).$$

[L1 physical p36, bottom equation; `lecture-1-p036-put-payoff-formula`](../../sources/annotated/lecture-1/page-036.md#lecture-1-p036-put-payoff-formula).

**Supplemental piecewise derivation:** compare selling at the strike with doing no put exchange. Put payoff is **$K-S_T$ when $S_T<K$**, and **0 when $S_T\ge K$**; both agree at equality. The whole difference is **strike minus price**, not the call's price minus strike. If drawn, the per-unit put line would fall toward zero as price rises up to $K$, then stay flat at zero. This is an authored consequence of the formula, not a source plot. No universal assumption about nonnegative commodity prices is needed for either maximum rule; any bound derived from a price domain would need that domain stated separately.

<a id="quantity-writer"></a>

## 7. Quantity and the opposite party — supplemental extensions

For $Q$ underlying units, total holder payoff is **$QC_T$** for a call or **$QP_T$** for a put. Multiply by underlying units, not by an unspecified option-contract count. If a listed contract covers several units, its multiplier must be supplied before totals can be calculated.

A **matching writer** has the negative maturity payoff: **$-QC_T$** for the short call, **$-QP_T$** for the short put, before premium and other costs. The negative sign applies to the holder's entire payoff, outside the maximum. The writer cannot discard an adverse valid exercise. These are positions in the same option, not a comparison of two different options.

| Source maturity price (£/unit), $K=£100$/unit | Long call payoff (£/unit) | Short call payoff (£/unit) | Long put payoff (£/unit) | Short put payoff (£/unit) |
|---:|---:|---:|---:|---:|
| 70 | 0 | 0 | +30 | −30 |
| 100 | 0 | 0 | 0 | 0 |
| 130 | +30 | −30 | 0 | 0 |

This four-position table is **supplemental**. Each option's holder/writer pair sums to zero before premium/costs; a call and a put are not each other's counterparties. In particular, **short call is not long put**: at £70 the short call pays zero while the long put pays £30. Also, long put is not short forward: at £130 the put holder may decline rather than suffer the short forward's adverse exchange.

**Complete scaled examples:** take $Q=5$ underlying units, $K=£40$/unit, no costs.

- Call at $S_T=£46$/unit: per-unit payoff = max(46 − 40, 0) = **£6/unit**. Total = 5 × £6 = **£30**. Physical exercise receives five units worth 5 × £46 = **£230** and pays 5 × £40 = **£200**. Net £30 is not extra cash on top. The matching writer receives £200 and delivers value £230: **−£30**; sum £0.
- Put at $S_T=£35$/unit: per-unit payoff = max(40 − 35, 0) = **£5/unit**. Total = 5 × £5 = **£25**. Deliver five units worth 5 × £35 = **£175** and receive 5 × £40 = **£200**. Matching writer pays £200 and receives value £175: **−£25**; sum £0.
- At $S_T=K=£40$/unit, both holder payoffs are **£0 per unit** and **£0 total**, with an economic exercise tie under these assumptions. A change of quantity does not move that equality condition.

<a id="premium-limit"></a>

## 8. Enough premium accounting to avoid a false conclusion — supplemental bridge

The option holder's nonnegative **maturity payoff** does not imply nonnegative **profit**. The source already states that the buyer pays a premium, even though pp32–36 do not supply a premium amount. Declining exercise does not recover it. For this short bridge only, ignore interest on the initial premium and all other costs, so **call holder profit per unit = maturity payoff minus $c_0$**. This is a labelled nominal cash-flow convention, not a general rule for comparing money at different dates.

Suppose one call unit has $K=£100$, initial premium $c_0=£8$ and maturity price $S_T=£105$. Exercise gives £105 − £100 = **£5 payoff**, so it is better than declining that £5. But profit under the stated convention is £5 − £8 = **−£3**. If instead $S_T=£70$, payoff is £0 and profit is £0 − £8 = **−£8**. The premium is already paid in either maturity decision; it is not subtracted inside the maximum to erase a loss.

**“In the money”** means the exercise exchange has positive value: for a call $S_T>K$, for a put $S_T<K$. **“At the money”** means equality; **“out of the money”** means the exchange would be unfavourable. These describe exercise value, not net profit. The £105 call is in the money but has negative profit in the example. They also do not prove that early exercise before expiry is permitted or optimal: this lesson's decisions are only at maturity. Contractual exercise windows, a fuller profit treatment and pricing before expiry are outside this slice.

<a id="practice"></a>

## 9. Graded practice — supplemental; attempt before answers

Exercises 1–3 assess outcome 1; exercises 4–9 assess outcome 2. All answers are authored explanations, not official supplied solutions. The repeated call exercises are deliberately separate checks of the three source pages, not coverage inferred from a single representative page.

<a id="exercise-rights-prompt"></a>
### Exercise 1 — scaffold: who has which right?

In p32's £100 three-month comparison, distinguish obligation from choice. Define premium and explain why the choice is weakly better in maturity payoff before its cost, without claiming it guarantees a profit or supplying a fair option price. Identify the long call holder's right and the writer's obligation. [Answer 1](#exercise-rights-answer).

<a id="exercise-physical-prompt"></a>
### Exercise 2 — transfer: say the actual exchange

For one call unit with $K=£100$, $S_T=£130$, state the holder's and writer's physical deliveries and net maturity payoffs. Repeat for a put with $K=£100$, $S_T=£70$. Does the put holder receive an asset as well as £100? Does “long put” mean an obligation to buy the underlying? [Answer 2](#exercise-physical-answer).

<a id="exercise-explain-prompt"></a>
### Exercise 3 — teach back the option idea

Explain call, put, strike, holder/writer, premium, exercise and expiry to a beginner. Compare the £100 obligation with a right in the low/equal/high cases, distinguish net value from physical transfers, and explain why in-the-money does not mean total profit or “exercise immediately.” [Answer 3](#exercise-explain-answer).

<a id="exercise-call33-prompt"></a>
### Exercise 4 — page 33 scaffold: choose the larger value

Reconstruct p33's complete call table for $K=£100$ and $S_T=£70,£100,£130$. For each row write the prospective exercise exchange $S_T-K$, declining value, decision and payoff. Derive max($S_T-K$, 0) and its two price regions. [Answer 4](#exercise-call33-answer).

<a id="exercise-call34-prompt"></a>
### Exercise 5 — page 34 second pass: equality and gross transfers

Reconstruct p34's complete repeated table independently. At each row explain whether physical exercise is favoured or tied, and distinguish actual delivery/payment from the payoff. Why does “Indifferent / £0” not mean an impossible exchange or an automatic positive gain? [Answer 5](#exercise-call34-answer).

<a id="exercise-call35-prompt"></a>
### Exercise 6 — page 35 third pass: find the bad formula

Reconstruct p35's complete repeated table. A learner uses $S_T-K$ for the option and another uses max($K-S_T$, 0). Show which results each produces at £70, £100 and £130; diagnose the first as obligation without choice and the second as the wrong exercise direction. State the correct call formula and boundary. [Answer 6](#exercise-call35-answer).

<a id="exercise-put36-prompt"></a>
### Exercise 7 — page 36: reverse the exchange, retain the choice

Build the complete put table at $K=£100$, $S_T=£70,£100,£130$, including prospective $K-S_T$, decision and final payoff. Give the piecewise rule and physical legs for the positive-payoff row. Why is a long put not a short forward? [Answer 7](#exercise-put36-answer).

<a id="exercise-quantity-prompt"></a>
### Exercise 8 — transfer: new strike and quantity

Five underlying units, $K=£40$/unit, maturity prices £35, £40 and £46 per unit. Calculate call/put holder payoffs per unit and totals, then matching writer totals; check each pair sums to zero. Show both physical legs for the call at £46 and put at £35. Are a short call and long put identical? [Answer 8](#exercise-quantity-answer).

<a id="exercise-apply-prompt"></a>
### Exercise 9 — diagnose and teach back payoff versus profit

A one-unit call has $K=£100$, premium £8 paid initially, and $S_T=£105$ at expiry. Ignore premium interest and all other costs. Calculate exercise payoff and profit; compare declining exercise. Then use $S_T=£70$. Correct: “Nonnegative payoff means no loss; subtract the premium inside max; a positive payoff is extra cash plus the physical asset; in-the-money always means exercise before expiry.” [Answer 9](#exercise-apply-answer).

<a id="answers"></a>

## 10. Separate supplemental answers and focused retries

<a id="exercise-rights-answer"></a>
### Answer 1

The obliged buyer must buy at £100 even when market value is lower. The optional buyer can choose to buy at £100 or decline. The **premium** is the earlier price of obtaining that right, distinct from the exercise price. Before that acquisition cost, the right can reproduce any favourable obligation exchange and avoid an unfavourable one, so its maturity payoff is at least as good, and better in losing-obligation states. This does not price the right or guarantee net profit after its premium. A long call holder may buy the asset at $K$ under the exercise terms; the call writer must sell/deliver it when validly exercised. **Retry:** identify who controls the decision and who must perform after that decision; do not give both parties an option to refuse.

<a id="exercise-physical-answer"></a>
### Answer 2

Call: holder pays **£100** and receives one asset worth **£130**, net **+£30**. Writer receives £100 and delivers that asset, net **−£30**. Put: holder **delivers** one asset worth **£70** and receives **£100**, net **+£30**; writer pays £100 and receives the asset, net **−£30**. The put holder does not receive the asset as well as the sale proceeds: it is the seller in the exercise exchange. Long put means owning a **right to sell**, not a buying obligation. Each holder/writer pair sums to zero before premium/costs. **Retry:** draw one asset arrow and one strike-cash arrow; the payoff is their net value, not a third arrow.

<a id="exercise-explain-answer"></a>
### Answer 3

A sufficient teach-back states: a call holder may buy and a put holder may sell at a fixed strike under the contract; the writer has the corresponding obligation if exercised. The holder pays a premium for the right, while expiry is its end date and exercise is using it. For a £100 purchase obligation at market values £70/£100/£130, net exchange values are **−£30/£0/+£30**. The call holder can avoid the first, giving **£0/£0/£30**, with a tie at £100. Physical exercise exchanges asset and strike cash, not a free asset plus payoff cash. Positive exercise value does not include the premium, and our maturity rule does not determine early exercise permission or optimality. **Retry:** if you cannot define a term without another undefined term, start with “a choice to buy/sell at an agreed price” and then add the labels.

<a id="exercise-call33-answer"></a>
### Answer 4 — complete p33 reconstruction

| $S_T$ | Prospective exercise (£) | Declining (£) | Exercise? | Actual call payoff (£) |
|---|---:|---:|---|---:|
| £70 | 70 − 100 = −30 | 0 | No | 0 |
| £100 | 100 − 100 = 0 | 0 | Indifferent | 0 |
| £130 | 130 − 100 = +30 | 0 | Yes | 30 |

Compare the whole exchange difference with zero: **$C_T=\max(S_T-K,0)$**. If $S_T\le K$, choose zero; if $S_T>K$, choose $S_T-K$. Equality gives a tie. **Retry:** if the first payoff is −£30, you computed the rejected exchange rather than choosing between exercise and decline; compare −30 with 0 explicitly.

<a id="exercise-call34-answer"></a>
### Answer 5 — complete p34 reconstruction

| $S_T$ | Exercise? | Call payoff | Physical-exchange explanation |
|---|---|---:|---|
| £70 | No | £0 | Decline an exchange of £100 for value £70 |
| £100 | Indifferent | £0 | Paying £100 for value £100 ties with declining |
| £130 | Yes | £30 | Pay £100 and receive one asset worth £130 |

The table retains every repeated source row. At equality max(100−100, 0) = **0** whether one exchanges or declines under the no-cost comparison; zero net value does not mean gross delivery is impossible. At £130 there is no additional £30 transfer on top of receiving the asset. **Retry:** separate the columns “cash paid,” “asset value received” and “difference”; only the difference is payoff.

<a id="exercise-call35-answer"></a>
### Answer 6 — complete p35 reconstruction and diagnosis

| $S_T$ | Correct source exercise? | Correct call payoff (£) | Wrong no-choice $S_T-K$ (£) | Wrong-direction max($K-S_T$, 0) (£) |
|---|---|---:|---:|---:|
| £70 | No | 0 | −30 | 30 |
| £100 | Indifferent | 0 | 0 | 0 |
| £130 | Yes | 30 | 30 | 0 |

$S_T-K$ omits the holder's ability to decline a negative exchange; it is the purchase-obligation value, not the call's complete payoff rule. max($K-S_T$, 0) instead represents the **put holder's selling choice**. Correct call formula: **$C_T=\max(S_T-K,0)$**. Its boundary is $S_T=K$: payoff zero and economic indifference; above it exercise has positive value, below it decline. **Retry:** if only the equality row is correct, it cannot distinguish the formulas—test one price strictly below and one strictly above strike.

<a id="exercise-put36-answer"></a>
### Answer 7 — complete p36 reconstruction

| $S_T$ | Prospective sale exchange (£) | Exercise? | Put payoff (£) |
|---|---:|---|---:|
| £70 | 100 − 70 = +30 | Yes | 30 |
| £100 | 100 − 100 = 0 | Indifferent | 0 |
| £130 | 100 − 130 = −30 | No | 0 |

**$P_T=\max(K-S_T,0)$**: use $K-S_T$ when $S_T<K$, zero when $S_T\ge K$. At £70 the holder delivers an asset worth £70 and receives £100; net £30. At £130 the holder can decline, whereas a short forward remains obliged to make its adverse exchange. **Retry:** if the first payoff is zero, ask why a right to sell for £100 helps when market value is only £70; put strike first in the subtraction.

<a id="exercise-quantity-answer"></a>
### Answer 8 — complete transfer table

| $S_T$ (£/unit) | Call holder (£/unit) | Put holder (£/unit) | Total long call (£) | Total short call (£) | Total long put (£) | Total short put (£) |
|---:|---:|---:|---:|---:|---:|---:|
| 35 | 0 | 5 | 0 | 0 | 25 | −25 |
| 40 | 0 | 0 | 0 | 0 | 0 | 0 |
| 46 | 6 | 0 | 30 | −30 | 0 | 0 |

At £35, put difference = 40 − 35 = **£5/unit**, times five = **£25**; the call declines. At £46, call difference = 46 − 40 = **£6/unit**, times five = **£30**; the put declines. At £40 both are zero and tied. Each holder/writer pair sums to **£0** in every row. Physical call at £46: receive value **£230**, pay **£200**, net £30. Physical put at £35: deliver value **£175**, receive **£200**, net £25. Short call and long put are not identical: at £35 their totals are **£0 versus £25**, and at £46 **−£30 versus £0**. **Retry:** compute a one-unit value first, multiply by five second, then reverse the whole holder total for its matching writer—not for a different option type.

<a id="exercise-apply-answer"></a>
### Answer 9 — cost, choice and timing

At £105, call payoff = max(105−100, 0) = **£5**. Profit ignoring premium interest/costs = £5 − £8 = **−£3**. Declining leaves payoff £0 and profit **−£8**, so exercising improves the outcome by £5 even though it does not recover the full premium. At £70, payoff = max(70−100, 0) = **£0** and profit = **−£8**. The buyer can therefore lose the premium despite nonnegative payoff.

Subtracting the premium inside max would incorrectly turn the £105 result into max(105−100−8, 0) = **£0** instead of reporting the **−£3 profit**, and would hide the premium loss in the £70 case. Under physical exercise at £105, pay £100 and receive one asset worth £105; £5 is net value, not extra cash. “In the money” describes positive exercise value, not profit after cost, and does not settle any decision **before** expiry. **Retry:** write the premium on its earlier date and the two maturity alternatives on separate lines; compare exercise with decline while retaining that same already-paid premium in both.

<a id="stop"></a>

## Stop and check

Give your own teach-back for exercises 3 and 9, and reconstruct at least one call table and the put table without looking. A tutor should check right/obligation, transaction direction, max scope, equality, units, premium and physical settlement separately; retry the missed step before the whole problem. Store responses privately, not in this lesson. Reading prepared answers does not establish mastery.

Next planned lesson ID: **`lesson-l1-option-profit-and-exercise`**. It is not yet authored in this slice, so no guessed file/anchor link is used. A fuller profit/break-even and exercise-window treatment remains future work; none is needed to justify the maturity payoff tables here.

<a id="evidence"></a>

## Complete inspected evidence and repetition boundary

All nineteen substantive units on physical pages 32–36 are cited, including all twelve units on the three repeated call pages. Original pages 33–35 each show a call-definition box, an exercise-question box, the same three-row table and a bottom maximum formula; no source graph is omitted. Page 36 has the corresponding put layout. Repetition is retained rather than inferred from one representative page. No source error is registered for these assigned units; original glyphs/pages remain unchanged. Historical normalized draft headers do not override canonical source verification, and source verification does not approve this authored teaching.

| Physical page | Complete normalized span | Unchanged raw span | Original PNG |
|---|---|---|---|
| 32 | [Full p32](../../sources/annotated/lecture-1/page-032.md) | [Raw p32](../../sources/extracted/lecture-1/page-032.md#page-32) | [Original p32](../../sources/assets/lecture-1/page-032.png) |
| 33 | [Full p33](../../sources/annotated/lecture-1/page-033.md) | [Raw p33](../../sources/extracted/lecture-1/page-033.md#page-33) | [Original p33](../../sources/assets/lecture-1/page-033.png) |
| 34 | [Full p34](../../sources/annotated/lecture-1/page-034.md) | [Raw p34](../../sources/extracted/lecture-1/page-034.md#page-34) | [Original p34](../../sources/assets/lecture-1/page-034.png) |
| 35 | [Full p35](../../sources/annotated/lecture-1/page-035.md) | [Raw p35](../../sources/extracted/lecture-1/page-035.md#page-35) | [Original p35](../../sources/assets/lecture-1/page-035.png) |
| 36 | [Full p36](../../sources/annotated/lecture-1/page-036.md) | [Raw p36](../../sources/extracted/lecture-1/page-036.md#page-36) | [Original p36](../../sources/assets/lecture-1/page-036.png) |
