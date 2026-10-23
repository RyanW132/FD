# Derivative contracts, positions and trading purposes

**Source-grounded on-demand reference — author draft; independent review pending.** Use this to look up terms, not as a replacement for the full lessons. The microexample and self-check are supplemental. Prerequisite: [signed amounts and units](concept-numeric-foundations.md#numeric-signs).

<a id="contracts-definition"></a>
## What makes a contract a derivative?

A **derivative** is a financial contract whose value depends on an **underlying** asset, rate, index or event. The underlying is the referenced quantity/outcome, not necessarily something the holder owns. A **contract** specifies enforceable rights and obligations between its **counterparties** (the parties facing each other). A **position** is a party's holding or contractual exposure; **exposure** means its outcome changes when the referenced quantity changes. The source's examples include oil delivery, an equity-index threshold and rainfall: an underlying need not be a physical asset. [Lecture 1 p11, lower definition](../../sources/annotated/lecture-1/page-011.md#lecture-1-p011-derivative-definition); [upper examples](../../sources/annotated/lecture-1/page-011.md#lecture-1-p011-contract-examples).

For the contracts below, T is the future settlement/expiration date; K is the agreed delivery or strike price, in currency per underlying unit. Quantity Q is the positive number of underlying units. A price is not a total amount: Q × K has currency units.

| Contract | Position and basic promise |
|---|---|
| **Forward** | The long commits to buy and the short commits to sell Q units at T for K per unit. Both are obliged; “long” does not mean a long holding period. |
| **Futures** | A standardized exchange-traded obligation with gains/losses settled during its life. It resembles a forward economically, but cash-flow timing and clearing differ. Final delivery or cash settlement depends on the contract specification. |
| **Option** | The buyer/holder has a right, not an obligation, to exercise. A call is a right to buy; a put a right to sell at K. The writer/seller has the corresponding obligation when exercised. The premium is the price of obtaining that right. |

Sources: L1 p20 [forward terms](../../sources/annotated/lecture-1/page-020.md#lecture-1-p020-forward-terms); p21 [long](../../sources/annotated/lecture-1/page-021.md#lecture-1-p021-long-forward) and [short](../../sources/annotated/lecture-1/page-021.md#lecture-1-p021-short-forward); p28 [forward/futures comparison](../../sources/annotated/lecture-1/page-028.md#lecture-1-p028-forward-futures-comparison); p34 [call definition](../../sources/annotated/lecture-1/page-034.md#lecture-1-p034-call-definition); p36 [put definition](../../sources/annotated/lecture-1/page-036.md#lecture-1-p036-put-definition). The source also [lists swaps](../../sources/annotated/lecture-1/page-011.md#lecture-1-p011-derivative-types); their detailed cash-flow structure is outside this lookup page.

<a id="contracts-purpose"></a>
## The instrument does not determine the motive

- **Hedging:** reducing or transferring an existing risk. A planned future purchase can create exposure even before the asset is owned.
- **Speculation:** taking risk in anticipation of a return. A trader without the offsetting commercial exposure may use the very same contract.
- **Arbitrage:** exploiting inconsistent prices. Calling something an arbitrage requires a coherent cash-flow comparison under stated costs, financing and execution assumptions; an attractive forecast alone is speculation.

These distinctions come from L1 p12's lower principal-use bullets: [hedging](../../sources/annotated/lecture-1/page-012.md#lecture-1-p012-hedging-definition), [speculation](../../sources/annotated/lecture-1/page-012.md#lecture-1-p012-speculation-definition), [arbitrage](../../sources/annotated/lecture-1/page-012.md#lecture-1-p012-arbitrage-definition). A profitable derivative leg alone does not prove the combined business position improved.

<a id="contracts-example"></a>
## Microexample: no entry premium does not mean a free asset

Suppose a firm must buy 10 units in three months. It enters a forward to pay K = £105/unit then. **Assume** a zero-initial-value/no-premium contract and ignore costs; this reference does not derive the fair delivery price. At T the market price is S_T = £110/unit, where S_T means the spot price observed at T.

On physical delivery the firm pays 10 × £105 = £1,050 and receives 10 units worth 10 × £110 = £1,100. Its economic maturity payoff is £1,100 − £1,050 = **+£50**. It does not receive a free £1,100 asset or automatically receive £50 cash: the net value could be realized by immediately selling the received asset at the stated market price. A contract specifying cash settlement instead pays the contractual difference. This accounting follows the [L1 p22 payoff table](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-forward-payoff-table) and [long payoff formula](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-long-payoff-formula).

Zero entry premium does not mean zero future obligation, zero possible loss, or no collateral/funding requirement. Nor does zero value at inception imply the contract's value remains zero later. A short forward is a commitment to sell later, not necessarily a short sale of borrowed stock today.

<a id="contracts-selfcheck"></a>
## Brief self-check

Keep Q = 10 and K = £105/unit but let S_T = £95/unit. What is the long's economic payoff, and does the firm have an option to refuse an unfavorable forward? Does “long” alone tell you whether the firm is hedging?

<a id="contracts-answer"></a>
## Supplemental answer

Payoff = 10(95 − 105) = **−£100**; physical payment remains £1,050 for an asset worth £950. The forward obligation does not disappear because it is unfavorable. Long specifies the buy side, not the motive: with a matching planned purchase it may hedge price risk; without that exposure it may be speculation. If you called the £950 asset value the payoff, subtract the delivery payment before retrying.

<a id="contracts-navigation"></a>
## Continue with the full lessons

Planned lesson targets, whose drafting/review status is separate from this reference: [purpose and contracts](../lessons/lesson-l1-purpose-and-contracts.md) (`lesson-l1-purpose-and-contracts`), [forward contracts](../lessons/lesson-l1-forward-contracts.md) (`lesson-l1-forward-contracts`), and [calls and puts](../lessons/lesson-l1-calls-and-puts.md) (`lesson-l1-calls-and-puts`). These forward links may remain pending until integration. For the arithmetic distinction, see [payoff and profit](concept-payoff-and-profit.md#payoff-definition); that related page is not a prerequisite for the definitions here.
