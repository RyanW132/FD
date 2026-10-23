# Payoff, premium, profit and exercise

**Source-grounded on-demand reference — author draft; independent review pending.** A lookup aid, not the full option/forward lessons. Examples and self-check answers are supplemental. Prerequisite: [contract rights and obligations](concept-derivative-contracts.md#contracts-definition).

<a id="payoff-definition"></a>
## Three different amounts

**Payoff** here means a contract's maturity economic value from one party's viewpoint. **Premium** is the amount paid initially for an option. **Profit** additionally accounts for that initial cost and any specified financing or other costs. Never use these labels interchangeably without stating the accounting convention.

Let T denote maturity, S_T the underlying market price then, K the delivery/strike price, and Q > 0 the number of underlying units. S_T, K and option premium c_0 (call) or p_0 (put) are in the same currency **per unit**. The subscript 0 means the initial date; it is not multiplication. The function max(a,0) chooses the larger of a and zero.

| Position | Maturity payoff per unit |
|---|---|
| Long forward | S_T − K |
| Short forward | K − S_T |
| Long call (right to buy) | max(S_T − K, 0) |
| Long put (right to sell) | max(K − S_T, 0) |
| Writer of either option | Negative of that option holder's payoff |

Multiply per-unit values by Q for total currency amounts. These formulas assume the specified contract is honored and omit transaction costs. Sources: L1 p22 lower [long](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-long-payoff-formula)/[short](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-short-payoff-formula) formulas; p37 upper [call payoff](../../sources/annotated/lecture-1/page-037.md#lecture-1-p037-call-payoff); p36 lower [put payoff](../../sources/annotated/lecture-1/page-036.md#lecture-1-p036-put-payoff-formula). Writer sign reversal is the supplemental counterpart-accounting implication.

On **physical settlement**, exercising a call exchanges QK cash for Q underlying units; its positive payoff is net asset value, not necessarily a cash receipt. On cash settlement the contract specifies a cash difference. The net economic value must not be confused with the gross delivery payment. Likewise a long put with positive payoff delivers the asset and receives the strike under physical settlement.

<a id="payoff-profit"></a>
## The premium goes outside the maximum

Under the lecture's explicit convention of **ignoring interest on the initial premium**, and additionally omitting fees/taxes:

    Long-call profit per unit = max(S_T − K, 0) − c_0.

The premium is paid even if the option expires unused; max(S_T − K − c_0, 0) would incorrectly erase that loss. For c_0 > 0, break-even is S_T = K + c_0. A put's analogous profit is max(K − S_T, 0) − p_0. [L1 p37, middle profit box and lower break-even answer](../../sources/annotated/lecture-1/page-037.md#lecture-1-p037-call-profit); [source break-even](../../sources/annotated/lecture-1/page-037.md#lecture-1-p037-call-break-even-answer).

**Supplemental financing qualification:** to compare all amounts at T when premium funding matters, let G be a stated dimensionless factor converting one currency unit paid initially into its cost at T. Then replace c_0 by c_0G (and p_0 by p_0G). G = 1 recovers the source's no-interest simplification. This does not select a funding convention: G must be supplied or calculated consistently elsewhere. Buyer/writer profits negate only under matching premium, dates and cost/financing assumptions; different actual funding costs need not cancel.

<a id="payoff-exercise"></a>
## Exercise is not the same decision as making an overall profit

At expiry, absent exercise costs, a call has positive exercise value when S_T > K; a put when S_T < K. At equality the exercise value is zero. The already-paid premium does not change which expiry choice gives the larger remaining payoff. **European** exercise is allowed only at expiration; **American** exercise is allowed up to and including expiration. These names describe exercise rights, not geography, and do not imply that exercising an American option early is always desirable. Sources: L1 p34 [call decision table](../../sources/annotated/lecture-1/page-034.md#lecture-1-p034-call-exercise-table); p36 [put decision table](../../sources/annotated/lecture-1/page-036.md#lecture-1-p036-put-exercise-table); p38 [European](../../sources/annotated/lecture-1/page-038.md#lecture-1-p038-european-exercise)/[American](../../sources/annotated/lecture-1/page-038.md#lecture-1-p038-american-exercise) definitions.

<a id="payoff-example"></a>
## Microexample and source-label caution

Take one call unit, K = £100, c_0 = £8 and S_T = £105. Payoff = max(105 − 100, 0) = **£5**; profit ignoring premium interest = 5 − 8 = **−£3**. Exercising is still better than abandoning a £5 payoff. With a supplied G = 1.05 instead, premium cost at T is 8 × 1.05 = £8.40 and profit is −£3.40; financed break-even is £108.40, not the source's no-interest £108.

**Preserved source caveat:** L1 p26's long-forward graph and p27's paired graphs label the vertical axis **Profit** while displaying maturity payoff formulas. The horizontal axis is S_T; the long line rises through zero at K, and the short line falls through zero at K. There are no numerical ticks or explicit currency-axis units. Payoff equals profit here only under zero-initial-value/no-premium and no extra financing/transaction-cost assumptions. Do not silently relabel the originals. See [p26 diagram](../../sources/annotated/lecture-1/page-026.md#lecture-1-p026-long-forward-diagram), [p27 long](../../sources/annotated/lecture-1/page-027.md#lecture-1-p027-paired-long-diagram), [p27 short](../../sources/annotated/lecture-1/page-027.md#lecture-1-p027-paired-short-diagram), and original images [p26](../../sources/assets/lecture-1/page-026.png)/[p27](../../sources/assets/lecture-1/page-027.png).

<a id="payoff-selfcheck"></a>
## Brief self-check

With the same call and no premium interest, let S_T = £90. Find holder payoff/profit and writer payoff/profit. Why is the holder's nonnegative payoff not a guarantee against loss?

<a id="payoff-answer"></a>
## Supplemental answer

Holder payoff = max(90 − 100, 0) = **£0**; holder profit = **−£8**. Writer payoff = £0 and writer profit = **+£8**, under the same no-cost/no-interest convention. The premium can be lost despite the payoff floor at zero. If you put the premium inside max, separate the initial payment from the expiry exercise decision and retry.

<a id="payoff-navigation"></a>
## Full lesson targets

[Forward payoff graphs](../lessons/lesson-l1-forward-payoff-graphs.md) (`lesson-l1-forward-payoff-graphs`), [calls and puts](../lessons/lesson-l1-calls-and-puts.md) (`lesson-l1-calls-and-puts`), and [option profit and exercise](../lessons/lesson-l1-option-profit-and-exercise.md) (`lesson-l1-option-profit-and-exercise`). Planned forward links may be pending; their existence is not reviewed teaching or learner mastery.
