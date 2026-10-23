# Premiums, profit, break-even and exercise styles

<a id="status"></a>

**Unreviewed teaching draft — Lecture 1, physical pages 37–38.** This lesson authors and maps all eight assigned substantive units; it does not set canonical coverage to taught or claim independent approval. Source statements have precise citations. Explanations, additional numerical cases, practice and answer explanations are **supplemental**, except the two explicitly identified source answers. No learner mastery, current product rule or investment advice is implied.

<a id="outcomes"></a>

## Why a winning exercise can still leave a loss

Buying something worth £105 for £100 produces a £5 advantage. If you paid £8 earlier for the right to make that purchase, you have not recovered your entire outlay. This lesson separates that accounting question from two others: **when are you allowed to exercise**, and **when is exercising better than declining at expiry**?

1. **Explain:** given a long call and an exercise-style description, distinguish strike, premium, payoff, profit, break-even and exercise permission; explain premium timing and why it remains outside the maximum. Describe European/American rights and the matched-terms opportunity comparison. Success requires explaining why positive expiry exercise value can reduce a loss, why the style names are not geography, and why extra opportunities imply weakly no lower value rather than necessarily strictly higher value or mandatory early exercise.
2. **Apply:** under the stated no-interest/no-other-cost convention, calculate per-unit and total call payoff/profit, derive and check break-even, and compare exercising with declining at expiry. Reconstruct the source's 100/8/108 example and test below/equal/above boundaries. Classify permitted exercise dates and justify the otherwise-identical American/European comparison. Show signed flows, quantities and units; monetary answers must be correct to the penny with no premature rounding.

Prerequisite: [call/put rights and maturity payoffs](lesson-l1-calls-and-puts.md#foundations). The necessary foundations are recapped below; no option-pricing model is required. **Supplemental readiness check:** is £5 received in net value after an earlier £8 cost a £5 profit, a £3 profit or a £3 loss? Under the no-interest convention it is a **£3 loss**. If uncertain, keep the two dates on separate lines before adding them.

<a id="foundations"></a>

## 1. Foundations: who pays, what is received and when — supplemental recap

A **call** gives its **holder/buyer**, also called the **long call**, the right to buy an underlying asset at a fixed **strike price**. An **underlying** is the specified asset, and a **unit** is the quantity used to quote its price. **Exercise** means using the right to make the contractual exchange. The **writer/seller** has the corresponding obligation when the holder validly exercises; this lesson calculates the buyer's result, not the writer's margin or business profit. A **put** instead gives a right to sell; call versus put describes the transaction, whereas exercise style describes the permitted timing.

**Premium** is the amount paid to obtain the option. It is different from the strike payment made if the call is physically exercised. **Expiry**, also called expiration or maturity here, is the right's specified end date. **Payoff** is net economic value from the exercise/decline choice at maturity, before accounting for the earlier premium. **Profit** includes the premium and any costs under the stated accounting convention. **Break-even** means profit equals zero, not that no cash or asset changes hands.

A positive sign means receipt or value received by the holder; a negative sign means payment or loss. The function **max(a, 0)** selects whichever is larger: the complete expression a or zero. For a call the potential exercise value is market value received minus strike paid. Declining an unfavourable exercise leaves zero maturity payoff, but does not refund the earlier premium. “In the money” means positive exercise value; it does not by itself mean positive profit after that premium.

| Symbol | Definition | Unit/time convention |
|---|---|---|
| $0$ | Initial date when the option is bought | A date label, not a maturity price |
| $T$ | Expiration date | Same date for the source comparison |
| $S_T$ | Market price of the underlying at expiration | Currency per underlying unit |
| $K$ | Call strike fixed by the contract | Same currency per unit |
| $c_0$ | Initial premium per underlying unit | Same currency per unit; subscript 0 labels the earlier payment date |
| $C_T$ | Holder's maturity call payoff per unit, used as shorthand below | Currency per unit; subscript T labels maturity |
| $G_T$ | Holder's profit per unit under the no-interest convention, shorthand below | Currency per unit, not a return percentage |
| $Q$ | Positive total underlying quantity covered | Underlying units |
| $N$, $q$ | Positive contract count and underlying units per contract, when supplied | Contracts and units/contract; $Q=Nq$ |

**Currency clarification:** p37 prints 100, 8 and 108 without currency symbols. We use **GBP (£) per underlying unit** in the worked teaching examples, consistent with the preceding call examples. This is an explicit teaching convention, not a claim that the p37 original contains printed pound signs. No live contract multiplier is inferred; any $N$ and $q$ below are invented classroom quantities.

**Source convention and local assumptions:** follow p37 by **ignoring interest on the initial premium**. Also assume no exercise fees, transaction costs, taxes, other cash flows or failure to perform. Thus we neither finance/compound the premium to $T$ nor discount the maturity payoff to date 0; we calculate the source's simple nominal profit. The premium is still paid earlier—ignoring interest does not move its actual payment date. The option is exercisable at expiry for the maturity calculations. Values use the same underlying/currency units, with no market spread. We compare exercise against declining then, not against an unspecified sale of the option earlier. Physical-delivery descriptions value the asset received; that value is not an additional cash receipt. Additional funding/cost conventions would need new inputs and could change profit and break-even; none is silently introduced here.

<a id="call-payoff"></a>

## 2. The source payoff: choose an exchange or decline it

Page 37's upper box gives

$$\mathrm{Payoff}_T=\max(S_T-K,0).$$

[L1 physical p37, upper long-call payoff box; `lecture-1-p037-call-payoff`](../../sources/annotated/lecture-1/page-037.md#lecture-1-p037-call-payoff). We write this same per-unit payoff as $C_T$ in our teaching notation.

**Supplemental derivation:** if exercised, one unit received has value $S_T$ and the holder pays $K$, so the exchange contributes $S_T-K$. If declined, there is no exercise exchange and maturity payoff is zero. Choose the larger. When $S_T<K$, the exchange would be negative, so the holder can avoid it; at $S_T=K$, exchange and decline both give zero; above $K$, the exchange has positive value. This reasoning explains a nonnegative **holder payoff**, not a guarantee that buying the option was profitable.

<a id="call-profit"></a>

## 3. The source profit: account for the premium after the choice

The middle source box explicitly says to ignore interest on the initial premium and gives

$$\mathrm{Profit}_T=\max(S_T-K,0)-c_0.$$

[L1 physical p37, middle long-call profit box; `lecture-1-p037-call-profit`](../../sources/annotated/lecture-1/page-037.md#lecture-1-p037-call-profit). In our shorthand, **$G_T=C_T-c_0$**.

**Supplemental step-by-step reasoning:**

1. At date 0 the holder pays the premium, a negative amount $-c_0$ per unit. This happens whether or not the option is eventually exercised.
2. At expiry, choose exercise or decline to determine $C_T$.
3. Under the stated no-interest/no-other-cost convention, add the earlier signed cost to that payoff: $C_T+(-c_0)$.
4. The **maximum belongs to the maturity choice; the premium sits outside it**. Placing the premium inside max would incorrectly allow the holder to erase an already-paid cost by declining exercise.

The corresponding piecewise profit is **$-c_0$ when $S_T\le K$**, and **$S_T-K-c_0$ when $S_T>K$**. For a positive premium, all below/equal-strike cases lose that premium; some above-strike cases also lose money until the exercise value has recovered it. Under precisely these simplified assumptions, this long call's profit cannot be less than $-c_0$ per unit. That bound is about the option held to the stated expiry decision, not an unrelated position in the asset after exercise or a guarantee that actual fees/funding costs vanish.

<a id="worked-payoff-profit"></a>

### A complete two-date example — supplemental, using the source strike/premium

Use one underlying unit, $K=£100$, $c_0=£8$, and suppose $S_T=£105$.

- **Date 0:** pay **£8** for the option.
- **At expiry, if exercised physically:** pay **£100** and receive one asset worth **£105**. The exchange payoff is £105 − £100 = **£5**.
- **Profit under the source convention:** £5 − £8 = **−£3**. Equivalently, valued flows are −£8 − £100 + £105 = −£3. No rounding is required.
- **If instead declined:** no strike payment or asset receipt; maturity payoff is £0 and profit is £0 − £8 = **−£8**.
- **Decision check:** exercise improves the result by **£5**: −£3 is better than −£8, even though both are losses. Positive exercise value does not promise net profit.

The £5 is not a second cash payment on top of receiving the £105 asset. One could realise its market value by selling the received asset under the stated frictionless assumption, but that would be a separately identified sale, not a third payment owed by the option writer.

<a id="break-even-question"></a>

## 4. The source break-even question: what price recovers the premium?

The source asks for the buyer's break-even underlying price when **$K=100$ and $c_0=8$**. [L1 physical p37, lower break-even question box; `lecture-1-p037-call-break-even-question`](../../sources/annotated/lecture-1/page-037.md#lecture-1-p037-call-break-even-question).

**Supplemental derivation before the source answer:**

1. Break-even means $G_T=0$, so max($S_T-K$, 0) must equal $c_0$.
2. Here $c_0=8>0$. The zero-payoff branch cannot recover a positive premium. Therefore the break-even price must lie in the positive-payoff branch, $S_T>K$.
3. In that branch solve $S_T-K-c_0=0$. Add $K+c_0$ to both sides: **$S_T=K+c_0$**.
4. Substitute the source numbers: 100 + 8 = **108**, in the same currency per underlying unit as the strike/premium.
5. Check in the original expression: max(108 − 100, 0) − 8 = 8 − 8 = **0**. The branch condition holds because 108 is above 100.

<a id="break-even-answer"></a>

**Supplied source answer:** $S_T=K+c_0=108$. [L1 physical p37, bottom break-even equation; `lecture-1-p037-call-break-even-answer`](../../sources/annotated/lecture-1/page-037.md#lecture-1-p037-call-break-even-answer). In our GBP/unit teaching convention, that is **£108 per unit**. It is a break-even price under the source's no-premium-interest convention and our no-other-cost assumptions—not the call's strike, an initial option price or a prediction of the market.

**Supplemental zero-premium boundary:** the source has a positive premium. If one instead stipulated $c_0=0$, profit would equal payoff; every permitted $S_T\le K$ would give zero profit, and $K$ would mark where positive profit begins rather than a unique zero-profit price. Do not divide by or assume a positive premium in an algebraic argument without stating it. This hypothetical boundary is not a claim that an actual valuable option can be acquired free.

<a id="profit-table"></a>

## 5. Read the exercise and profit boundaries separately — supplemental table

Retain **$K=£100$ per unit and $c_0=£8$ per unit**, one unit, the source accounting convention and no additional costs. These additional maturity scenarios are authored, not a table printed on p37.

| $S_T$ (£/unit) | Exercise exchange $S_T-K$ (£/unit) | Best expiry choice | Holder payoff (£/unit) | Holder profit (£/unit) |
|---:|---:|---|---:|---:|
| 70 | −30 | Decline | 0 | −8 |
| 100 | 0 | Indifferent absent costs | 0 | −8 |
| 105 | +5 | Exercise | 5 | −3 |
| 108 | +8 | Exercise | 8 | 0 |
| 130 | +30 | Exercise | 30 | +22 |

Every row subtracts the same £8 **after** computing payoff. At £70/£100, £0 − £8 = −£8. At £105, £5 − £8 = −£3. At £108, £8 − £8 = £0. At £130, £30 − £8 = +£22. In the last row, the £30 payoff is not the £22 profit.

**Accessible shape description, supplemental rather than an original figure:** on a horizontal axis of maturity price in £/unit and vertical axis of profit in £/unit, profit is flat at **−8** through prices at/below **100**, then rises with slope **+1**, crossing zero at **108**. Payoff instead has its flat segment at **0** and begins rising at **100**. The profit curve is the payoff curve shifted down by £8 per unit. There is no source graph or hidden numeric axis on p37; its original uses equation/question boxes.

**Penny boundary check:** at £107.99, payoff = £7.99 and profit = **−£0.01**; at £108.00, profit = **£0.00**; at £108.01, payoff = £8.01 and profit = **+£0.01**. All three call exercises have positive exchange value, although one loses, one breaks even and one profits after the premium. Keep the input precision until the final monetary amount; here the penny results are exact, not rounded prices forced into a break-even classification.

<a id="exercise-test"></a>

## 6. Why the paid premium cancels from the expiry exercise test — supplemental

Compare the two actions using the same earlier cost:

- Exercise profit per unit would be $S_T-K-c_0$.
- Decline profit per unit would be $-c_0$.
- Their difference is $(S_T-K-c_0)-(-c_0)=S_T-K$.

The premium appears in **both** alternatives and cancels. It is already paid and cannot be recovered merely by declining exercise. Under the stated no-exercise-cost expiry conditions, exercise has positive incremental value when **$S_T>K$**; at equality it is an economic tie. The separate condition **$S_T>K+c_0$** means positive overall profit, not the minimum condition for worthwhile expiry exercise. Confusing these thresholds would throw away positive exercise value, such as the £5 in the £105 example.

This is a decision **at expiry**, with no further option life to preserve. Before expiry an American holder may have a continuing right worth retaining; the maturity comparison alone does not identify whether early exercise is best. Neither a positive exercise value nor an already-paid premium settles that earlier decision.

<a id="quantity"></a>

## 7. Contract count and per-unit premium — supplemental worked extension

For positive quantity $Q=Nq$, total payoff is **$QC_T$**, total premium paid is **$Qc_0$**, and total profit under the same convention is

$$Q[\max(S_T-K,0)-c_0].$$

Both payoff and premium must be scaled; multiplying one but not the other mixes total currency with currency per unit. With $Q>0$, multiplying the profit equation by $Q$ does not change the underlying break-even price $K+c_0$.

**Hypothetical classroom specifications:** two contracts, each covering ten underlying units; $K=£100$/unit, $c_0=£8$/unit, $S_T=£105$/unit. These are not asserted live market specifications.

1. Quantity = 2 contracts × 10 units/contract = **20 units**.
2. Initial total premium = 20 × £8 = **£160** paid at date 0.
3. At physical exercise, total strike cash = 20 × £100 = **£2,000**; asset value received = 20 × £105 = **£2,100**.
4. Total payoff = £2,100 − £2,000 = **£100**, also 20 × £5.
5. Total profit = £100 − £160 = **−£60**, also 20 × (−£3). Declining would leave **−£160**, so exercise improves the result by £100.
6. At **£108/unit**, total payoff = 20 × £8 = **£160**, exactly recovering total premium; profit = **£0**. The break-even price is £108/unit, not £160 or 20 × £108 as a price per unit.

<a id="european"></a>

## 8. European exercise: permission only at expiration

The source defines a **European option** as exercisable **only on its expiration date**. [L1 physical p38, upper European-option box; `lecture-1-p038-european-exercise`](../../sources/annotated/lecture-1/page-038.md#lecture-1-p038-european-exercise).

**Supplemental explanation:** the style restricts when the contractual right may be used. A European call has a buying right at expiry; a European put has a selling right at expiry. “European” does not mean the asset, buyer or exchange must be located in Europe. A right may be valuable before exercise is permitted; the timing definition is not a current option-pricing formula. It also does not by itself specify whether/how the option could be sold or closed before expiry; that is distinct from exercising it.

<a id="american"></a>

## 9. American exercise: more permitted dates, not a command

The source defines an **American option** as exercisable **at any time up to and including its expiration date**. [L1 physical p38, middle American-option box; `lecture-1-p038-american-exercise`](../../sources/annotated/lecture-1/page-038.md#lecture-1-p038-american-exercise).

**Supplemental explanation:** while the right is live, the holder can choose an earlier permitted time or wait until expiry. “American” does not describe geography. **May** is permission, not **must**, and it does not say that early exercise is always beneficial. Using a particular option's exercise right is not permission to repeat that same one-time exchange every day. Actual contract procedures are outside these source definitions; no current exchange deadlines or automatic-exercise rule is assumed here.

**Supplemental accessible timing table:** assume the option is still held and unexercised, and “before expiry” is within its live contractual period.

| Time considered | European: exercise permitted by the definition? | American: exercise permitted by the definition? |
|---|---|---|
| Before expiration, while the right is live | No | Yes |
| On expiration | Yes | Yes |
| After the unexercised right has expired | No | No |

This table is authored from the two definitions, not printed on p38. “Yes” says an opportunity exists, not that exercising is profitable or best. At expiry both styles face the same maturity exercise comparison **when the other contract terms match**.

<a id="opportunity-question"></a>

## 10. The source concept check: can extra opportunity reduce value?

The source asks whether an American option **otherwise identical** to a European option should ever be worth less. [L1 physical p38, lower concept-check box; `lecture-1-p038-exercise-opportunity-question`](../../sources/annotated/lecture-1/page-038.md#lecture-1-p038-exercise-opportunity-question).

**Supplemental reasoning in steps:**

1. Match the underlying, call/put type, quantity, strike, expiration, settlement/performance terms and other relevant costs/conditions. The intended comparison changes only the exercise opportunities.
2. A European holder can use the right at expiry or decline it. An American holder can follow exactly those same choices by voluntarily waiting.
3. The American holder additionally has earlier exercise opportunities. An optional extra action does not force the holder to abandon the original alternatives.
4. Therefore, under this otherwise-identical opportunity comparison, the American right should have **at least** the European right's value. The extra opportunities may be worth something, but could add no value if waiting is already best.

<a id="opportunity-answer"></a>

**Supplied source answer:** no; it provides at least the same exercise opportunities and possibly more. [L1 physical p38, bottom answer; `lecture-1-p038-exercise-opportunity-answer`](../../sources/annotated/lecture-1/page-038.md#lecture-1-p038-exercise-opportunity-answer).

**Supplemental precise reading:** “at least” is a **weak** comparison: equal or greater, not necessarily strictly greater. It compares the value of matched rights, not guaranteed realised profit after arbitrary different purchase prices. If strike, expiry, quantity, costs or other terms differ, the simple opportunity argument no longer ranks the two contracts. If early exercise does not improve the holder's best choices, equality is consistent with the source. No price model is provided, so we do not compute an American premium or identify a specific early-exercise boundary.

Page 38's original has separate European/American definition boxes, a concept-check box and a bottom answer; it contains no price chart, numerical valuation example or source timeline. The teaching table above makes its dates explicit without inventing those missing items.

<a id="misconceptions"></a>

## 11. Keep the questions separate — supplemental diagnosis

- **“No negative holder payoff means no loss.”** A positive premium is a real earlier cost. At/under strike, the source-convention profit is −$c_0$, not zero.
- **“Only exercise if the price exceeds strike plus premium.”** That is a positive-profit threshold, not the no-cost expiry exercise test. Between $K$ and $K+c_0$, exercising can reduce the premium loss.
- **“The premium is paid again at exercise.”** It was paid at date 0. Strike cash at exercise is a separate payment; do not charge the premium twice or omit it entirely.
- **“The source has discounted everything to maturity.”** It explicitly ignores premium interest. Keeping the original cash-flow dates visible does not justify silently introducing a financing adjustment.
- **“More dates must mean strictly more value.”** Extra opportunities can be unused; a weak comparison allows equality. It requires otherwise matched terms and costs.
- **“European/American means where the option trades.”** The names specify exercise timing. Neither label alone specifies a venue, contract multiplier, or a recommendation to trade.
- **“An American option in the money should immediately be exercised.”** Permission and optimal choice are different. The expiry formula alone cannot resolve an earlier decision.

<a id="practice"></a>

## 12. Graded practice — supplemental; attempt before answers

Exercises 1–3 assess outcome 1; exercises 4–8 assess outcome 2. All answer explanations below are supplemental, not additional official solutions. The source's own 108 and opportunity answers are separately labelled above.

<a id="exercise-labels-prompt"></a>
### Exercise 1 — scaffold: label the amounts and dates

For the source one-unit call, strike is 100 and premium 8. In the GBP/unit teaching convention, identify what is paid initially and what is paid only on physical exercise. Define payoff, profit and break-even; explain why premium is outside max. What assumptions let us subtract the earlier £8 without a financing adjustment? [Answer 1](#exercise-labels-answer).

<a id="exercise-styles-prompt"></a>
### Exercise 2 — transfer: permission, type and location

A call may be exercised only at expiration. A put may be exercised at any time during its live period through expiration. Name each exercise style and transaction right. Would changing the holder's country change the style? Does the second option's permission instruct its holder to exercise early whenever exercise value is positive? [Answer 2](#exercise-styles-answer).

<a id="exercise-explain-prompt"></a>
### Exercise 3 — teach back both distinctions

In your own words explain: (a) why a call buyer can choose positive exercise value yet still lose money, and (b) why an otherwise-identical American right is weakly no less valuable than a European one but not necessarily strictly more valuable. Include payment dates, premium treatment, matched terms/costs and the difference between permission and an optimal decision. [Answer 3](#exercise-explain-answer).

<a id="exercise-source-profit-prompt"></a>
### Exercise 4 — scaffold: derive and verify the source answer

For $K=100$ and $c_0=8$, ignore premium interest and all other costs. Derive break-even without first assuming the positive-payoff branch, then check it by substitution. Build a per-unit payoff/profit table at £70, £100, £105, £108 and £130. State the best expiry action in each row and why £105 is not break-even. [Answer 4](#exercise-source-profit-answer).

<a id="exercise-boundaries-prompt"></a>
### Exercise 5 — transfer: two boundaries, one penny apart from profit zero

Retain the source contract. At £107.99, £108.00 and £108.01, compute payoff/profit exactly to the penny and state whether exercise has positive value. Separately describe $S_T=K$ and the hypothetical zero-premium case. Why is the source's positive £8 premium important to claiming a unique zero-profit price? [Answer 5](#exercise-boundaries-answer).

<a id="exercise-quantity-prompt"></a>
### Exercise 6 — transfer: new strike, premium and multiplier

Three hypothetical contracts each cover five underlying units. Strike £40/unit, initial premium £2.50/unit. Under the same no-interest/no-fee convention, find total premium, total payoff/profit at maturity prices £41.50 and £43.00 per unit, and the underlying break-even price. Show physical asset/strike values for the £41.50 exercise, and compare exercise with decline there. No live product multiplier is assumed. [Answer 6](#exercise-quantity-answer).

<a id="exercise-opportunities-prompt"></a>
### Exercise 7 — apply the opportunity comparison

Two live options have the same underlying, call/put type, strike, expiry, quantity, performance/settlement terms and other relevant costs. One is European, one American. State exercise permission before expiry, at expiry and after expiry; explain why the American right cannot be ranked lower merely because it has extra opportunities. Must it be strictly more valuable? Could you reuse the argument if the strike or costs changed? [Answer 7](#exercise-opportunities-answer).

<a id="exercise-apply-prompt"></a>
### Exercise 8 — diagnose and teach back

Correct this claim using the £100-strike/£8-premium call at £105: “Profit is max(105−100−8, 0), so it is zero; exercising would be pointless because the price is below 108. The buyer receives a free asset plus £5. If the call is American, early exercise is always optimal and its value must be strictly higher than any European call.” Show the relevant flows and equations, then state exactly what can and cannot be inferred about exercise timing/value. [Answer 8](#exercise-apply-answer).

<a id="answers"></a>

## 13. Separate supplemental answers, feedback and retries

<a id="exercise-labels-answer"></a>
### Answer 1

Initially pay **£8 per unit** for the right. On physical exercise pay **£100 per unit** and receive the underlying unit. Payoff is the maturity choice's net exchange value; profit also accounts for the initial premium under the chosen convention; break-even means profit zero. The premium goes outside max because it was paid under both exercise/decline alternatives and is not refunded by declining. We explicitly ignore premium interest/funding/opportunity cost and other fees/cash flows; we do not pretend the original payment occurs at maturity. **Retry:** put “−8” on date 0 and the possible exercise/decline legs on date T before combining them.

<a id="exercise-styles-answer"></a>
### Answer 2

The expiry-only call is **European**, giving a right to buy at the strike on expiration. The put with exercise allowed during its live period through expiry is **American**, giving a right to sell. Holder geography does not define style. The American put holder has an earlier opportunity, not a command to use it; a positive exercise value does not by itself prove early exercise is best. **Retry:** answer “what transaction?” with call/put, “when permitted?” with European/American, and keep these two classifications separate.

<a id="exercise-explain-answer"></a>
### Answer 3

A sufficient teach-back explains that premium is paid initially and not refunded if exercise is declined. At maturity a call can have an advantageous asset-for-strike exchange but a payoff smaller than the premium, leaving negative source-convention profit; choosing that exchange still improves on abandoning the available value. This uses no premium interest and no other costs, not a silently financed return calculation. For exercise styles, otherwise matched European and American rights share the expiry opportunity; the American holder may wait and imitate the European choices, so extra voluntary choices cannot reduce the value in that comparison. They may add nothing, allowing equality. Different strikes, expiries or costs break the comparison, and early permission does not prove early exercise optimal. **Retry:** if you said “always profits” or “always worth more,” identify which missing cost or equality case invalidates that stronger claim.

<a id="exercise-source-profit-answer"></a>
### Answer 4

Set max($S_T-100$, 0) − 8 = 0. A zero payoff would leave −8, so break-even requires the positive branch. Then $S_T-100-8=0$, giving **$S_T=108$**. Check: max(108−100, 0) − 8 = 8−8 = **0**.

| $S_T$ (£/unit) | Payoff (£/unit) | Profit (£/unit) | Expiry choice absent costs |
|---:|---:|---:|---|
| 70 | 0 | −8 | Decline |
| 100 | 0 | −8 | Indifferent |
| 105 | 5 | −3 | Exercise |
| 108 | 8 | 0 | Exercise |
| 130 | 30 | +22 | Exercise |

At £105 the £5 payoff falls £3 short of the £8 premium; exercise reduces the loss but does not break even. **Retry:** if you wrote break-even £100, you solved payoff zero rather than profit zero; subtract the premium and substitute your answer back.

<a id="exercise-boundaries-answer"></a>
### Answer 5

| $S_T$ (£/unit) | Payoff (£/unit) | Profit (£/unit) | Positive exercise value? |
|---:|---:|---:|---|
| 107.99 | 7.99 | −0.01 | Yes |
| 108.00 | 8.00 | 0.00 | Yes |
| 108.01 | 8.01 | +0.01 | Yes |

All are above the £100 strike, so exercise has positive value even when profit is negative. At **$S_T=K=£100$**, payoff is £0, profit **−£8**, and exercise/decline are tied absent costs. With a hypothetical **zero premium**, every allowed below/equal-strike price gives zero payoff **and** zero profit, so $K$ is not a unique zero-profit point. The source's **positive** premium forces break-even onto the strictly above-strike branch. **Retry:** keep “positive exercise” and “positive profit” in separate columns; rounding £107.99 up to £108 before calculation would hide the penny loss.

<a id="exercise-quantity-answer"></a>
### Answer 6

Quantity = 3 contracts × 5 units/contract = **15 units**. Initial premium = 15 × £2.50 = **£37.50**.

At **£41.50/unit**, payoff per unit = 41.50−40 = **£1.50**; profit per unit = 1.50−2.50 = **−£1.00**. Total payoff = 15 × 1.50 = **£22.50**; total profit = 22.50−37.50 = **−£15.00**. Physical exercise pays 15 × £40 = **£600.00** and receives assets worth 15 × £41.50 = **£622.50**, net £22.50. Declining would leave **−£37.50**, so exercise improves the outcome by £22.50 despite a loss.

At **£43.00/unit**, payoff per unit = 43−40 = **£3.00**; total payoff = 15 × 3 = **£45.00**; total profit = 45−37.50 = **+£7.50**, or 15 × £0.50 profit per unit. Break-even price = £40+£2.50 = **£42.50/unit**. There, total payoff = 15 × £2.50 = £37.50, recovering the entire premium. **Retry:** if you subtracted £2.50 from the total payoff, you mixed per-unit and total amounts; scale the premium by the same fifteen units.

<a id="exercise-opportunities-answer"></a>
### Answer 7

Before expiry within the live period: **European no, American yes**. At expiry: **both yes**. After the unexercised right expires: **both no**. Under otherwise matched terms/costs, the American holder can wait and follow every expiry choice available to the European holder, with optional earlier choices added. It therefore has weakly no lower value in this comparison. Strict superiority is not necessary: if earlier exercise adds no useful advantage, equality is possible. Changing strike, expiry, quantity, performance terms or costs can change value for other reasons; the exercise-opportunity argument alone then cannot rank the contracts. It does not recommend early exercise or calculate a premium. **Retry:** describe one European strategy the American holder can imitate—waiting until the common expiration—before making any value comparison.

<a id="exercise-apply-answer"></a>
### Answer 8

Correct source-convention profit is **max(105−100, 0) − 8 = 5−8 = −£3**, not max(105−100−8, 0) = £0. The incorrect maximum erases a real premium loss. Declining gives **−£8** profit, so exercising improves it by **£5**; the expiry exercise threshold is $S_T>K$, whereas £108 is the overall break-even price for this positive premium.

Physical exercise pays **£100** for one asset worth **£105**, after the earlier **£8** premium. The £5 is net exchange value, not extra cash plus a free asset. An American label permits earlier exercise; it does not establish an optimal earlier action from the expiry formula. Relative to an **otherwise identical** European option with the same relevant costs/terms, its opportunities imply value **equal or higher**, not necessarily strictly higher and not a ranking against every European call regardless of strike/expiry. **Retry:** correct the accounting first, then independently answer permission and value questions; a correct £5 payoff cannot substitute for those explanations.

<a id="stop"></a>

## Stop and check

Attempt exercises 3 and 8 in your own words, then recompute an exercise-versus-profit boundary without the answer. A tutor should check date/cost treatment, max scope, units, break-even algebra, exercise permission and the weak opportunity comparison separately. Retry the first missing step before returning to the full explanation. Keep the learner's responses and self-assessment private; prepared lessons or passed author checks do not prove mastery.

This completes the **author-draft sequence** planned for Lecture 1, not independent teaching approval or canonical taught coverage. Later topics may price options or analyse optimal early exercise; neither has been silently assumed here. No missing next-lesson link is required to finish this capstone.

<a id="evidence"></a>

## Complete inspected evidence

All eight substantive units from physical pp37–38 are cited above. Both complete normalized/raw spans and both full original PNGs were inspected. No source conflict is registered for these assigned units. The normalized pages retain historical draft headers; canonical source units are verified, but that does not approve the authored lesson. All numerical tables/timing tables/shape descriptions here are labelled supplemental rather than attributed as original figures.

| Physical page | Complete normalized page | Unchanged raw extraction | Original PNG |
|---|---|---|---|
| 37 | [Full p37](../../sources/annotated/lecture-1/page-037.md) | [Raw p37](../../sources/extracted/lecture-1/page-037.md#page-37) | [Original p37](../../sources/assets/lecture-1/page-037.png) |
| 38 | [Full p38](../../sources/annotated/lecture-1/page-038.md) | [Raw p38](../../sources/extracted/lecture-1/page-038.md#page-38) | [Original p38](../../sources/assets/lecture-1/page-038.png) |
