# Exposure, hedge direction and closing basis

**Source-grounded on-demand reference — author draft; independent review pending.** Use alongside the full hedge lessons, not instead of them. Microexample and self-check are supplemental. Prerequisite: [payoff signs and accounting](concept-payoff-and-profit.md#payoff-definition).

<a id="hedging-direction"></a>
## Start with the commercial exposure

An **exposure** is a business/portfolio outcome affected by a price change. A **hedge** adds a position intended to offset that exposure; the hedge leg's loss alone does not show the combined position failed. A future buyer is hurt by rising purchase prices, so a **long hedge** buys futures that gain when their price rises. A future seller is hurt by falling sale prices, so a **short hedge** sells futures that gain when their price falls. These usual directions assume the futures contract moves positively with the relevant exposure; a different relationship requires a fitted sign and size rather than blind reuse of the rule. [L2 p10 upper long-hedge](../../sources/annotated/lecture-2/page-010.md#lecture-2-p010-long-hedge) and [middle short-hedge](../../sources/annotated/lecture-2/page-010.md#lecture-2-p010-short-hedge) boxes.

<a id="hedging-basis"></a>
## Basis is spot minus futures

The **spot price** S_t is the price for the relevant immediate transaction at time t; F_t is the selected futures contract's quoted price at that same time. Use matching currency and quantity units. The **basis** is

    b_t = S_t − F_t.

A positive b_t means spot exceeds futures. **Strengthening** means b_t increases numerically; even a move from −£3 to −£1/unit strengthens it. **Weakening** means it decreases. The subscript t is a time label, not a multiplier. Source: [L2 p14 upper basis definition](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-basis-definition) and [closing-basis bullets](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-closing-basis).

**Basis risk** is uncertainty about the basis when the hedge closes. A known opening basis does not fix the closing basis. For the same underlying and delivery terms, the lecture's delivery-convergence model has b_T = 0 at delivery T. Closing before delivery or using a different asset need not give zero. A **cross hedge** uses a futures underlying different from the actual exposure, retaining that mismatch risk. [L2 p14 delivery convergence](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-delivery-convergence) and [cross-hedge basis](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-cross-hedge-basis).

<a id="hedging-effective-price"></a>
## Same algebraic effective price, opposite cash-flow roles

Open at t_1 and close at t_2. Let F_1 be the initial futures price, F_2 the closing futures price and S_2 the simultaneous spot transaction price; b_2 = S_2 − F_2. In this **one-unit-for-one-unit** hedge, with matching units and ignoring financing of daily settlement, fees and other costs:

| Commercial transaction | Futures result per unit | Effective price per unit |
|---|---|---|
| Sell asset for S_2; short futures | Gain F_1 − F_2 | Receipt S_2 + (F_1 − F_2) = F_1 + b_2 |
| Buy asset for S_2; long futures | Gain F_2 − F_1 | Cost S_2 − (F_2 − F_1) = F_1 + b_2 |

For the buyer, subtract the gain because it offsets expenditure; subtracting a negative gain adds the loss. These are a net sale receipt and a net purchase cost, respectively, **not the same signed cash flow**. The plus/minus signs follow the [numeric bridge](concept-numeric-foundations.md#numeric-signs). Sources: L2 p11 [short-hedge derivation](../../sources/annotated/lecture-2/page-011.md#lecture-2-p011-short-hedge-derivation), p12 [long-hedge derivation](../../sources/annotated/lecture-2/page-012.md#lecture-2-p012-long-hedge-derivation).

<a id="hedging-example"></a>
## Microexample

Take F_1 = £50/unit, F_2 = £47/unit and S_2 = £48/unit, with one exposure unit and one futures unit. Closing basis = 48 − 47 = **£1/unit**. The seller's short gains £3 and sale earns £48, giving **£51/unit**. The buyer's long loses £3, making purchase cost £48 − (−£3) = **£51/unit**. Both equal F_1 + b_2 = 50 + 1, but protect different commercial needs.

The initial futures quote £50 did not fix a £50 effective price because the closing basis was £1. A non-unit hedge ratio changes the coefficient on the futures gain; do not use F_1 + b_2 unchanged for arbitrary hedge sizes. Nor does a price hedge remove credit risk, margin funding needs, uncertainty in the exposure's quantity or every kind of business risk.

<a id="hedging-selfcheck"></a>
## Brief self-check

Keep F_1 = £50 and F_2 = £47, but let S_2 = £46/unit. Find closing basis, the seller's effective receipt and the buyer's effective cost. Who benefits from this lower closing basis?

<a id="hedging-answer"></a>
## Supplemental answer

b_2 = 46 − 47 = **−£1/unit**. Seller: 46 + (50 − 47) = **£49/unit**. Buyer: 46 − (47 − 50) = **£49/unit**. A lower basis reduces the seller's receipt but reduces the buyer's cost, benefiting the buyer. If you obtained £43 for the buyer, check that the long gain is −£3 and subtract the whole signed gain.

<a id="hedging-navigation"></a>
## Full lesson targets

[Hedge direction and basis](../lessons/lesson-l2-hedge-direction-and-basis.md) (`lesson-l2-hedge-direction-and-basis`) and [cross-hedge selection](../lessons/lesson-l2-cross-hedge-selection.md) (`lesson-l2-cross-hedge-selection`). Planned forward links may still be pending. For a related lookup rather than a prerequisite for the one-unit example, see [hedge ratio and beta](concept-hedge-ratio-and-beta.md#hedgeratio-ratio).
