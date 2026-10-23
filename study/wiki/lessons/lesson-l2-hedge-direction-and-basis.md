# Long and short hedges: the effective price and the basis left behind

<a id="status"></a>

**Unreviewed teaching draft — not approved coverage or learner mastery.** This lesson teaches all 16 substantive units on Lecture 2 physical pages 10–14. Source facts and formulas have precise citations; the foundations, derivation commentary, additional examples, exercises and answers are **supplemental teaching**, not supplied official solutions. No trading recommendation is made.

<a id="motivation"></a>

## Why the futures gain is only half the story

A farmer wants a dependable selling price; a business buying material wants a dependable purchase cost. Both may use futures, but they need opposite positions. A futures loss can accompany a successful hedge if the commercial transaction improves by an offsetting amount. Conversely, a futures gain does not prove that the combined result is certain. The important question is: **after the actual purchase or sale and the futures result, what price did the business effectively pay or receive?** The difference between spot and futures prices when the hedge closes supplies the remaining uncertainty.

<a id="outcomes"></a>

## What you will be able to do

1. **Explain and diagnose:** given a future purchase or sale and explicitly quoted prices, choose the long or short hedge, calculate and interpret spot-minus-futures basis, distinguish a closing date from contract expiry, and explain strengthening, weakening and the limits of convergence. Success means correctly classifying all four source exposures with reasons, stating quote conventions, and identifying which basis change helps a buyer versus a seller without promising that all risk disappears.
2. **Derive and apply:** given opening futures and closing spot/futures prices, a matched quantity and the stated zero-cost assumptions, derive both effective-price identities from signed cash flows; calculate the source result and a new buyer/seller example; check each by closing basis. Success means showing both legs and all units, handling a futures loss correctly, distinguishing total money from price per unit, and identifying why a quantity or timing mismatch breaks the simple result. The examples use exact arithmetic; money answers must be correct to the cent.

**Supplemental readiness question:** if you pay $47 for material and separately lose $4 on a hedge, is your combined cost $43 or $51? Try first. The next section explains the signs, so no prior finance vocabulary is required. The previous lesson, [arbitrage and protection](lesson-l2-arbitrage-and-protection.md), supplies context but is not a substitute for these foundations. Optional references: [hedging and basis](../concepts/concept-hedging-and-basis.md#hedging-direction) and [signed amounts](../concepts/concept-numeric-foundations.md#numeric-signs).

<a id="foundations"></a>

## 1. Foundations: exposure, prices, positions and cash signs — supplemental

An **asset** is the item being bought or sold. The **underlying** of a futures contract is the asset or reference specified by that contract. An **exposure** is an outcome that changes when a price changes: a planned purchase becomes more expensive if its price rises; a planned sale produces less revenue if its price falls. A **hedge** adds a position intended to offset this exposure rather than make an unrelated price bet.

The **spot price** is the current price for an immediate transaction in the asset. A **futures price** is the current quoted price for a specified futures contract. A futures contract is a standardized exchange-traded obligation with gains and losses settled during its life. It is not an option with a freely discardable losing side. **Long** means buying futures and gaining when their quoted price rises; **short** means selling futures and gaining when that quoted price falls. These labels are not the length of time the position lasts.

To **close** an existing futures position, enter an offsetting transaction in the same contract: sell to close a long, buy to close a short. The business can then buy or sell its actual asset separately in the spot market. Closing a hedge need not involve taking delivery through the futures contract. **Expiry/delivery** is the contract's scheduled ending/settlement, not whatever date the hedger chooses to exit. Contract-specific deadlines still matter.

Pick the business's viewpoint. A positive futures gain is money received overall; a negative gain is a loss. A seller adds its futures gain to sale receipts. A buyer subtracts its gain from purchase expenditure because that gain helps pay the bill. If the gain is negative, subtracting it **adds the loss**: $47 − (−$4) = $51. Calling $47 − $4 a cost in that situation would falsely treat a loss as a subsidy.

<a id="notation"></a>

### Dates, symbols and the model used below

| Symbol | Meaning | Unit or convention |
|---|---|---|
| $0$ | Date the hedge is opened | A time label, not a price or multiplier |
| $h$ | Date of the actual spot purchase/sale and simultaneous hedge close | The hedge horizon ends here; it may precede $T$ |
| $T$ | Expiry/delivery of the selected futures contract | The contract's date; not necessarily $h$ |
| $t$ | Any observation date | A generic time label |
| $S_t$ | Spot price of the exposure asset at $t$ | Currency per specified asset unit |
| $F_t$ | Quote at $t$ for the **same selected futures contract** | Same currency and compatible quantity unit as $S_t$ |
| $F_0$ | Futures quote when opened | Known at opening |
| $S_h,F_h$ | Spot and futures quotes when closed | Unknown at opening; observed at $h$ |
| $b_t$ | Basis at $t$: $S_t-F_t$ | A price difference, not a percentage |
| $Q$ | Positive quantity of exposure units, also hedged units in the matched examples | Asset units; multiplying a per-unit price by $Q$ gives currency |

The slides use opening time $t_1$, closing time $t_2$, and $F_1,S_2,F_2,b_2$. This lesson's $0,h,F_0,S_h,F_h,b_h$ mean exactly those quantities. We reserve $T$ for expiry so closing early cannot be mistaken for delivery.

**Explicit simplifying assumptions for the identities:** one futures unit offsets each exposure unit; the same quantity $Q$ is traded in the spot market and represented by the futures position; all prices are comparable in currency and quantity units; the spot transaction and futures close occur at $h$; parties perform; fees, taxes, bid–ask costs, funding costs and interest on daily futures settlements are ignored. The cumulative futures result is then the quoted-price change times quantity. Daily settlements may occur earlier, but their financing is ignored, not assumed nonexistent. There is no rate, annualization, discounting or compounding in these examples. “Three months” describes a date interval, not a factor multiplying the price difference.

<a id="direction"></a>

## 2. Choose the hedge from the commercial need, not a forecast

**Source rule: long hedge.** A future buyer worried about a price rise buys futures. If the relevant futures quote rises with the purchase price, the futures gain helps cover the larger bill. [L2 physical p10, upper long-hedge box; `lecture-2-p010-long-hedge`](../../sources/annotated/lecture-2/page-010.md#lecture-2-p010-long-hedge).

**Source rule: short hedge.** A future seller worried about a price fall sells futures. A falling futures quote produces a short gain that offsets some or all of the lower sale receipt. [L2 physical p10, middle short-hedge box; `lecture-2-p010-short-hedge`](../../sources/annotated/lecture-2/page-010.md#lecture-2-p010-short-hedge).

These usual directions assume the futures quote moves positively with the exposure price in the relevant quotation. With a different underlying, opposite relationship or inverse currency quote, check the economic direction instead of copying the label.

**Source exposures, with supplemental explanations:** the original lower box asks for classification; the reasoning below is authored, not an official answer key. [L2 physical p10, lower classify-each-exposure box; `lecture-2-p010-hedge-direction-exposures`](../../sources/annotated/lecture-2/page-010.md#lecture-2-p010-hedge-direction-exposures).

| Exposure in the source | Adverse price move | Direction and reason |
|---|---|---|
| Airline buys fuel in three months | Fuel becomes more expensive | Long fuel or suitable positively related futures; a rise creates an offsetting gain |
| Farmer sells wheat after harvest | Wheat becomes cheaper | Short wheat futures; a fall creates a gain against the lower sale receipt |
| UK importer buys US dollars in two months | Each dollar costs more pounds | Long dollars **when the underlying is USD quoted in GBP per USD**; a higher GBP/USD quotation produces a long gain |
| Fund plans to sell part of its equity portfolio | The portfolio's sale value falls | Short a suitable positively related equity futures reference; falling reference prices help offset lost sale value |

**Currency qualification:** GBP means pounds sterling; USD means US dollars. “GBP per USD” means pounds paid for one dollar. If the available contract instead references pounds quoted in USD per GBP, a dollar's strengthening makes that reciprocal quote fall: a **short pound** position is the corresponding directional hedge. The source does not specify a currency contract; a bare “long FX” answer hides this essential choice. Portfolio and fuel cross hedges may not move perfectly with the actual exposure; direction is not proof of exact size or complete protection.

<a id="basis-definition"></a>

## 3. Define basis before deriving the effective price

The source defines basis as spot **minus** futures, measured at the same observation time:

$$b_t=S_t-F_t.$$

Plain-text fallback: **basis = spot price − futures price**. Use matching quotations; do not subtract dollars per gallon from cents per litre or mix currencies without conversion. [L2 physical p14, upper basis equation; `lecture-2-p014-basis-definition`](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-basis-definition).

A positive basis means spot is above futures; a negative basis means spot is below futures. **Strengthening** means the basis increases numerically; **weakening** means it decreases. For example, moving from −$3/unit to −$1/unit strengthens basis by $2/unit, even though it remains negative. Moving from +$2/unit to −$1/unit weakens it by $3/unit. These interpretations are supplemental explanations of the source's statement that basis can strengthen or weaken and that closing basis determines the effective price. [L2 physical p14, central first two bullets; `lecture-2-p014-closing-basis`](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-closing-basis).

Do not confuse **basis** with a “basis point,” which is a unit of rate change; no rate is being calculated here. Nor does a rising spot price alone prove strengthening: the futures quote may have risen still more. Compare the two simultaneous prices at each date.

<a id="short-setup"></a>

## 4. Derive the short hedge: sale receipts plus futures gain

**Source setup:** a hedger will sell the asset at the closing time and shorts futures at the opening time. The initial futures quote is known; closing spot and futures quotes are not. [L2 physical p11, upper notation and hedge timing; `lecture-2-p011-short-hedge-setup`](../../sources/annotated/lecture-2/page-011.md#lecture-2-p011-short-hedge-setup).

**Supplemental timeline:** at $0$, enter the short at quote $F_0$. At $h$, sell the actual asset for $S_h$ per unit and buy back the futures at $F_h$ to close. The spot sale and futures close are two separate legs; do not replace the actual sale receipt by the initial futures quote.

<a id="short-derivation"></a>

1. The spot sale receives $S_h$ per unit.
2. The short futures gain is $F_0-F_h$ per unit: selling high then closing lower makes this positive. If $F_h>F_0$, the expression is negative and reduces receipts.
3. Add the **signed** gain to the sale receipt: $S_h+(F_0-F_h)$.
4. Regroup the terms without changing their signs: $F_0+(S_h-F_h)$.
5. Recognize the closing basis, $b_h=S_h-F_h$.

Thus, under the matched-quantity/timing and zero-cost assumptions above,

$$\text{Net sale proceeds per unit}=S_h+(F_0-F_h)=F_0+b_h.$$

Plain-text fallback: **effective selling price = spot sale price + short gain = opening futures price + closing basis**. This is the slide's equation with the date labels translated. [L2 physical p11, middle effective-selling-price box; `lecture-2-p011-short-hedge-derivation`](../../sources/annotated/lecture-2/page-011.md#lecture-2-p011-short-hedge-derivation).

<a id="basis-uncertainty"></a>

### What is fixed, and what remains uncertain?

$F_0$ is known at opening; $b_h$ generally is not. If closing basis were known then, the effective selling price would be known under this model. **Basis risk** is uncertainty about that closing difference. The opening basis is observable but is not a promise about closing basis. A hedge can replace substantial outright price uncertainty with a smaller residual difference without eliminating all uncertainty. [L2 physical p11, lower interpretation box; `lecture-2-p011-basis-uncertainty`](../../sources/annotated/lecture-2/page-011.md#lecture-2-p011-basis-uncertainty).

<a id="long-setup"></a>

## 5. Derive the long hedge: purchase cost minus futures gain

**Source setup:** a hedger will buy the asset at closing and buys futures at opening. [L2 physical p12, upper hedge timing statement; `lecture-2-p012-long-hedge-setup`](../../sources/annotated/lecture-2/page-012.md#lecture-2-p012-long-hedge-setup).

At $h$, the business buys the actual asset at $S_h$ and sells the previously bought futures to close at $F_h$. Its commercial cash flow is a payment, unlike the seller's receipt.

<a id="long-derivation"></a>

1. The actual purchase costs $S_h$ per unit.
2. The long futures gain is $F_h-F_0$ per unit. It is positive when the futures quote rises.
3. Subtract that gain from the purchase bill: $S_h-(F_h-F_0)$.
4. Distribute the minus sign across the **whole** bracket: $S_h-F_h+F_0$.
5. Regroup as $F_0+(S_h-F_h)=F_0+b_h$.

$$\text{Net purchase cost per unit}=S_h-(F_h-F_0)=F_0+b_h.$$

Plain-text fallback: **effective purchase cost = spot purchase price − long gain = opening futures price + closing basis**. If the long loses, its gain is negative and its cost increases. [L2 physical p12, middle effective-purchase-price box; `lecture-2-p012-long-hedge-derivation`](../../sources/annotated/lecture-2/page-012.md#lecture-2-p012-long-hedge-derivation).

<a id="same-price"></a>

### Same expression does not mean same cash-flow direction

Both effective prices equal $F_0+b_h$, but one is **money received by a seller** and the other **money paid by a buyer**. The seller wants a larger number; the buyer wants a smaller number. The source explicitly says they protect opposite commercial exposures. [L2 physical p12, lower key-point box; `lecture-2-p012-same-effective-price`](../../sources/annotated/lecture-2/page-012.md#lecture-2-p012-same-effective-price).

For fixed opening futures price, a $1/unit higher closing basis raises both effective prices by $1/unit: it helps the seller but hurts the buyer. A $1/unit lower closing basis hurts the seller but helps the buyer. This compares alternative closing bases for an already opened hedge, not separate hedges opened at different $F_0$ values.

<a id="source-example"></a>

## 6. Work every leg of the source example

**Source inputs:** a producer shorts at $52; at hedge close, spot is $47 and futures is $48. The source does not name an asset or quantity. Interpret the quotes as dollars **per matching asset unit**, as required by its per-unit equation; no barrel, tonne or contract size is invented. [L2 physical p13, upper producer scenario; `lecture-2-p013-basis-example-inputs`](../../sources/annotated/lecture-2/page-013.md#lecture-2-p013-basis-example-inputs).

| Step | Calculation | Result and meaning |
|---|---|---|
| Spot sale | Sell one asset unit at $47/unit | $47 received for that unit |
| Short futures result | $52/unit − $48/unit | +$4/unit gain |
| Combined sale receipt | $47/unit + $4/unit | **$51/unit** effective selling price |
| Closing basis | $47/unit − $48/unit | **−$1/unit** |
| Independent algebraic check | $52/unit + (−$1/unit) | **$51/unit**, same result |

The first three rows reproduce the [p13 middle effective-selling-price calculation; `lecture-2-p013-basis-example-cashflows`](../../sources/annotated/lecture-2/page-013.md#lecture-2-p013-basis-example-cashflows). The final two reproduce the [p13 lower equivalent-basis calculation; `lecture-2-p013-basis-example-check`](../../sources/annotated/lecture-2/page-013.md#lecture-2-p013-basis-example-check). The step labels and interpretation are supplemental.

**Reasonableness check:** futures fell from $52 to $48, so the short should gain; $51 is therefore above the $47 spot receipt. It is $1 below the opening futures quote, exactly the negative closing basis. No rounding is needed. The result is a sale receipt per unit, not total production profit: production costs are not supplied.

<a id="buyer-example"></a>

### Supplemental comparison: a buyer at the same quotes

A separate buyer opens a **long** at $52/unit and closes it at $48/unit while buying the asset at $47/unit. Its long gain is $48 − $52 = **−$4/unit**. Its effective cost is $47 − (−$4) = **$51/unit**, also $52 + (−$1). It pays $47 for the asset and has lost $4 on futures; it does not receive $4. The buyer and producer are alternative examples, not a claim that the same firm simultaneously buys and sells the exposure.

<a id="quantity-example"></a>

### Supplemental transfer: scale a matched hedge and test its boundary

Suppose $Q=200$ units, with $F_0=60$, $S_h=64$ and $F_h=63$, all prices in USD per unit. The same-quantity and zero-cost assumptions still apply.

- Closing basis: $64 − $63 = **$1/unit**.
- Buyer: asset bill 200 × $64 = $12,800; long gain 200 × ($63 − $60) = $600; net purchase cost **$12,200**, or $61/unit.
- Seller: sale receipt $12,800; short gain 200 × ($60 − $63) = −$600; net sale proceeds **$12,200**, or $61/unit.
- Check: $Q(F_0+b_h)=200(60+1)=12{,}200$ USD. Units × dollars/unit = dollars. Both per-unit results are $61, not $12,200/unit.

This quantity extension multiplies the **entire** per-unit result by $Q$. It is supplemental, not an extra formula printed in the slide. At zero closing basis, both effective prices become $F_0$; in this example that would be $60/unit, or $12,000 for 200 units. Zero basis is a conditional check, not a claim that the actual $1 basis vanishes.

<a id="convergence"></a>

## 7. Convergence has conditions; it is not a promise about your closing date

The source says that **for the same underlying and delivery terms**, spot and futures converge at delivery, so $b_T=0$. [L2 physical p14, central convergence bullet; `lecture-2-p014-delivery-convergence`](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-delivery-convergence).

**Supplemental intuition:** at the contract's expiry/delivery point, a quote for the same deliverable should be tied to that deliverable's contemporaneous spot value. The comparison must match the asset, quality/grade, location and settlement terms. “Grade” means the specified quality; “location” means where delivery is made. A local purchase price for a different grade is not automatically the reference spot price used in this convergence statement. The slide is a frictionless matching-deliverable model, not a guarantee that every observed pair of market prices is exactly equal.

There are two distinct reasons your hedge can retain basis risk:

1. **Different date:** you close at $h<T$. Even a perfectly matched contract can have nonzero $b_h$. A statement about $b_T$ says nothing certain about that earlier value.
2. **Different asset or terms:** a **cross hedge** uses futures on a related but different underlying. Even at its expiry, the futures quote converges to its own referenced asset/terms, not necessarily your exposure's price. [L2 physical p14, lower cross-hedge bullet; `lecture-2-p014-cross-hedge-basis`](../../sources/annotated/lecture-2/page-014.md#lecture-2-p014-cross-hedge-basis).

For comparable units, subtracting the cross-hedge futures quote from the exposure's spot price still defines a difference, but there is no reason that difference must be zero. If units differ, convert or define a suitable comparison first. Contract selection is developed in the [next lesson](lesson-l2-cross-hedge-selection.md); that lesson is not needed to understand the present limits.

<a id="limits"></a>

## 8. Misconceptions and residual risks — supplemental diagnosis

| Tempting claim | Repair |
|---|---|
| “A future buyer shorts because it wants a low price.” | A short generally loses when the relevant quote rises, worsening the buyer's expensive purchase. Choose the offsetting gain, not the desired price direction. |
| “Both expressions equal $F_0+b_h$, so either direction works.” | The derivations use different gain signs and opposite commercial cash flows. Swapping just the futures direction destroys that cancellation. |
| “The initial futures quote is the guaranteed price.” | Only if the closing basis is known at opening under the model; zero closing basis gives $F_0$, but it is not automatic. |
| “A negative basis is always weakening.” | Negative is a level; weakening is a decrease. −$3 to −$1 is strengthening. |
| “Every loss on futures means a failed hedge.” | Judge purchase/sale and futures together. The $600 short loss above accompanies a better spot sale receipt. |
| “A hedge eliminates every risk.” | It does not fix unknown quantity, changing dates, grade/location mismatch, funding or failure to perform. |

**Quantity/timing risk:** if the actual transaction shrinks or occurs later than expected, the futures position may no longer offset it. The identity $F_0+b_h$ assumes one-for-one quantity and simultaneous closing prices; do not apply it unchanged to an arbitrary number of contracts. **Funding risk:** daily losses may require cash before the commercial receipt arrives; margin is collateral/security supporting the contract, not evidence that no funding is needed. **Default/performance risk:** a promised payment or delivery can fail; clearing arrangements do not justify assuming every commercial or intermediary risk is absent. **Costs:** spreads, fees and financing alter the combined price. These are limits of the idealized calculation, not additional risks asserted to have been measured by pages 10–14.

<a id="practice"></a>

## 9. Practice — attempt before the separate answers

All prompts and answer explanations below are supplemental, except the explicitly identified source classification task and source numerical inputs. No official answer is invented. Every calculation uses the matched-quantity, simultaneous-close and zero-cost model unless the prompt asks you to diagnose its failure.

<a id="exercise-direction-prompt"></a>

### Exercise 1 — classify with a scaffold (outcome 1)

For each of the four source exposures in section 2, write: future buyer/seller; adverse price move; long/short; why its gain offsets that move. For the importer, state the underlying currency and quotation units. Then transfer the rule: a bakery will buy wheat in three months. Does the fact that the source farmer sells wheat force the bakery to use the same direction? [Answer 1](#exercise-direction-answer).

<a id="exercise-basis-prompt"></a>

### Exercise 2 — signs, basis and who benefits (outcome 1)

All quotes are $/unit. At opening, spot is 49 and futures is 52. At closing, spot is 47 and futures is 48. Compute both bases, their change and whether basis strengthened. For the already opened hedge, compare the actual closing basis with a hypothetical closing basis of −3: who prefers the actual result, buyer or seller? Explain without treating “negative” as “weakening.” [Answer 2](#exercise-basis-answer).

<a id="exercise-timing-prompt"></a>

### Exercise 3 — transfer the convergence rule (outcome 1)

A firm buys its asset and closes futures on 20 September; the selected contract expires on 15 October. Identify $h$ and $T$. Does the source's expiry-convergence statement guarantee zero basis on 20 September? If the firm instead hedges a different grade from the futures deliverable and waits to expiry, must the price difference vanish? Name two other risks the price hedge does not remove. [Answer 3](#exercise-timing-answer).

<a id="exercise-source-prompt"></a>

### Exercise 4 — source arithmetic with missing steps (outcome 2)

Use the producer's source quotes: $F_0=52$, $S_h=47$, $F_h=48$, in $/unit. Fill in: short gain ___; spot receipt ___; effective receipt ___; closing basis ___; $F_0+b_h$ ___. Explain why the answer is neither 52 nor the futures gain alone. Derive the short identity before substituting. [Answer 4](#exercise-source-answer).

<a id="exercise-long-prompt"></a>

### Exercise 5 — a new long hedge (outcome 2)

A buyer opens at $F_0=80$, closes at $F_h=86$, and buys at $S_h=85$, all $/unit. It needs and hedges 100 units. Derive the purchase-cost identity, compute the long gain, spot bill, total net cost, closing basis and per-unit cost. Check the total a second way. If instead the long gain were negative, would you add or subtract its magnitude from the bill? [Answer 5](#exercise-long-answer).

<a id="exercise-mismatch-prompt"></a>

### Exercise 6 — test the assumptions, not just the formula (outcome 2)

Retain exercise 5's prices and a purchase of 100 units, but let the futures position represent only 50 units. Calculate the actual long gain and net cost. Compare with the erroneous use of $100(F_0+b_h)$. Explain precisely which assumption failed. [Answer 6](#exercise-mismatch-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 7 — explanation teach-back (outcome 1)

In five or six sentences, teach a beginner how to choose direction from exposure, what basis means, how a negative basis can strengthen, which party benefits from higher closing basis, and why expiry convergence does not ensure an early or cross hedge has no basis risk. Give one residual risk beyond basis. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 8 — cash-flow diagnosis and teach-back (outcome 2)

A learner uses the source $52/$47/$48 quotes and says: “The buyer's futures gain is +4, so the buyer pays 43. The seller receives 51, which is its production profit. Both are locked at 52 because the futures will eventually expire.” Correct each claim. Show the buyer and seller legs separately, recover both identities by regrouping, and state the assumptions that make them valid. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 10. Supplemental answers, diagnosis and retries

<a id="exercise-direction-answer"></a>

### Answer 1 — direction

Airline: buyer, hurt by rising fuel prices, **long** a suitable positively related futures reference. Farmer: seller, hurt by falling wheat prices, **short**. Importer: buyer of USD, hurt when **GBP per USD** rises, **long USD** in that quotation. A contract on GBP quoted USD per GBP instead calls for the reciprocal directional analysis: a short GBP position gains when that quote falls. Fund: seller, hurt by falling portfolio value, **short** a suitable positively related equity reference. The bakery is a wheat **buyer**, so it goes long rather than copying the farmer's short. Existing exposure, not the commodity name, determines direction.

**Diagnosis/retry:** if you chose a position because you “want prices to fall,” ask which position gains when the move you fear occurs. Retry: a buyer fears a rising quote; which futures side gains on a rise? Long. Then restore the commercial explanation and units.

<a id="exercise-basis-answer"></a>

### Answer 2 — basis strength and effect

Opening basis = 49 − 52 = **−$3/unit**. Closing basis = 47 − 48 = **−$1/unit**. Change = −1 − (−3) = **+$2/unit**, so basis strengthened even though it remains negative and the spot price fell. Actual effective price is 52 + (−1) = **$51/unit**; at hypothetical closing basis −3 it is 52 + (−3) = **$49/unit**. The seller prefers the $2 higher receipt; the buyer would prefer the $2 lower cost. This is a comparison at fixed $F_0=52$, not an assertion that the closing basis was predictable.

**Diagnosis/retry:** if you called this weakening, draw −3 and −1 on a number line: −1 is larger. Retry: is −1 − (−3) positive? Yes, +2. If you said both parties benefit, label “receipt” and “cost” beside the same effective price.

<a id="exercise-timing-answer"></a>

### Answer 3 — dates and matching terms

$h$ is 20 September; $T$ is 15 October. An assertion about $b_T$ does not fix $b_h$ earlier. Even at expiry, different-grade prices need not coincide: convergence applies to the **same referenced deliverable and delivery terms**, not an arbitrary exposure asset. Quantity uncertainty and the cash needed to fund daily losses are two valid additional risks; default/performance, fees or changed transaction timing are also valid with explanations.

**Diagnosis/retry:** if you set both dates equal, label “my business exits” versus “the contract ends.” If you claimed different grades must match, name the asset actually deliverable under the contract; that is the spot comparison in the source convergence condition.

<a id="exercise-source-answer"></a>

### Answer 4 — producer arithmetic and derivation

Sale receipt plus short gain is $S_h+(F_0-F_h)=F_0+(S_h-F_h)=F_0+b_h$. Numerically, short gain = 52 − 48 = **+$4/unit**; spot receipt = **$47/unit**; combined receipt = 47 + 4 = **$51/unit**. Basis = 47 − 48 = **−$1/unit**; check 52 + (−1) = **$51/unit**. The nonzero basis explains the departure from 52. The futures gain alone omits the commercial sale.

**Diagnosis/retry:** if your gain is −4, write “sell futures at 52; buy back at 48.” If your result is 52, calculate spot minus closing futures before assuming convergence. Both routes must agree in price units.

<a id="exercise-long-answer"></a>

### Answer 5 — long purchase hedge

Per-unit cost is $S_h-(F_h-F_0)=S_h-F_h+F_0=F_0+b_h$. Long gain = 86 − 80 = **$6/unit**, or 100 × 6 = **$600**. Spot bill = 100 × 85 = **$8,500**. Net cost = 8,500 − 600 = **$7,900**, or **$79/unit**. Basis = 85 − 86 = **−$1/unit**. Independent check: 100 × (80 − 1) = **$7,900**. All values are exact; no intermediate rounding is needed. A negative long gain is a loss: subtracting that negative gain adds its magnitude to the bill.

**Diagnosis/retry:** $8,500 is only the bill; $600 is only the hedge. If you added the positive gain to cost, first ask whether receiving $600 makes the bill easier or harder to fund. Easier; subtract it. Then retry the signed negative-gain case from the readiness question: 47 − (−4) = 51.

<a id="exercise-mismatch-answer"></a>

### Answer 6 — unmatched quantity

The gain per futures unit is still $6, but the position covers only 50 units: gain = 50 × 6 = **$300**. The bill remains **$8,500**, so actual net cost is **$8,200**, or **$82 per purchased unit**. The incorrect shortcut gives 100 × (80 − 1) = **$7,900**, understating cost by **$300**. It wrongly assumes 100 futures units as well as 100 purchase units. Correct arithmetic uses each actual quantity on its own leg; the simple one-for-one cancellation is unavailable.

**Diagnosis/retry:** if you got 7,900 again, annotate “50 futures units” next to the gain and “100 asset units” next to the bill before multiplying. A basis calculation alone cannot detect an incorrectly sized position.

<a id="exercise-explain-teachback-answer"></a>

### Answer 7 — explanation checklist and model

A sufficient response names both commercial directions, defines spot-minus-futures with matching quote units, distinguishes a level from a change, assigns the higher-basis benefit correctly, qualifies convergence by time and deliverable, and names a residual risk.

**Supplemental model:** “A future buyer ordinarily buys positively related futures because their gain on a price rise helps pay the higher bill; a future seller ordinarily shorts to gain when prices fall. Basis is spot minus the chosen futures quote at the same time and in matching currency and quantity units. Moving from −3 to −1 strengthens basis because the difference increases. With the opening futures price fixed, higher closing basis increases the seller's receipt but also increases the buyer's cost. Convergence concerns the same deliverable at contract expiry, not necessarily an earlier close or a different-asset hedge. Cash to fund daily settlement losses can still be needed before the commercial transaction.”

**Diagnosis/retry:** check each criterion separately; a correct direction alone is insufficient. For a missing condition, finish “zero at ___, for the same ___,” then retell the whole explanation. Keep personal answers private.

<a id="exercise-apply-teachback-answer"></a>

### Answer 8 — signed legs and honest limits

The buyer's long gain is 48 − 52 = **−$4/unit**, not +4. It buys for $47 and loses $4, so cost = 47 − (−4) = **$51/unit**, not $43. Algebra: $S_h-(F_h-F_0)=F_0+(S_h-F_h)$. The seller receives $47 and its **short** gains 52 − 48 = **+$4/unit**, so receipt is **$51/unit**; algebra: $S_h+(F_0-F_h)=F_0+(S_h-F_h)$. Both use basis −$1/unit. The seller's production costs are unknown, so $51 is not production profit. Eventual expiry does not undo an earlier closing basis, nor guarantee matching terms for a cross hedge.

Assumptions: equal exposure/futures quantity, comparable quotes, the spot trade and futures close at the same $h$, performance, and no fees, spreads, taxes, settlement financing or other costs. A positive cost and a positive receipt are not the same signed cash flow. The separate business motivations remain opposite.

**Diagnosis/retry:** if you still obtain 43, keep the parentheses and write the long gain as “negative four” before subtracting it. If you obtain 51 but promise no risk, name one condition that may fail and explain its effect before claiming the calculation is complete.

<a id="stop-check"></a>

## Stop and check understanding

Give your own answers to exercises 7 and 8 without copying the models. A tutor should check direction, quote units, signs, closing-versus-expiry dates and the limits separately; retry the missing foundation before returning to the full case. Prepared content and passing author arithmetic checks do not establish learner mastery. Personal responses belong in private learner notes, not this page.

The next bounded topic is [choosing a futures contract and recognizing a cross hedge](lesson-l2-cross-hedge-selection.md). Optimal hedge ratios, statistical fitting and real execution are not taught or assumed here.

<a id="evidence"></a>

## Evidence and accessible source presentation

All cited substantive units on physical pages 10–14 were read in full normalized and raw form, and every original full-page image was inspected. Pages 10–14 contain text boxes, equations and a numerical calculation, **not a plotted graph**: there are no hidden axes, legend or curve to infer. Page 10 has long/short definitions above four exposure questions; pages 11–12 put setup above an effective-price equation and interpretation; page 13 lists input prices and two equivalent calculation routes; page 14 lists basis and its qualifications. The tables and timelines here are explicitly authored teaching layouts, not invented source figures.

| Physical page | Exact substantive regions | Full normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|---|
| 10 | Upper long hedge; middle short hedge; lower exposure classification | [10](../../sources/annotated/lecture-2/page-010.md) | [Raw 10](../../sources/extracted/lecture-2/page-010.md#page-10) | [Image 10](../../sources/assets/lecture-2/page-010.png) |
| 11 | Upper notation/timing; middle derivation; lower basis uncertainty | [11](../../sources/annotated/lecture-2/page-011.md) | [Raw 11](../../sources/extracted/lecture-2/page-011.md#page-11) | [Image 11](../../sources/assets/lecture-2/page-011.png) |
| 12 | Upper long setup; middle cost derivation; lower same-price interpretation | [12](../../sources/annotated/lecture-2/page-012.md) | [Raw 12](../../sources/extracted/lecture-2/page-012.md#page-12) | [Image 12](../../sources/assets/lecture-2/page-012.png) |
| 13 | Upper inputs; middle cash flows; lower basis check | [13](../../sources/annotated/lecture-2/page-013.md) | [Raw 13](../../sources/extracted/lecture-2/page-013.md#page-13) | [Image 13](../../sources/assets/lecture-2/page-013.png) |
| 14 | Upper definition; central closing-basis and convergence bullets; lower cross-hedge bullet | [14](../../sources/annotated/lecture-2/page-014.md) | [Raw 14](../../sources/extracted/lecture-2/page-014.md#page-14) | [Image 14](../../sources/assets/lecture-2/page-014.png) |

The normalized files retain historical draft banners; canonical units mark the 16 selected regions verified. That approves source conversion, not this authored lesson. No source conflict is recorded for these target units. No private textbook, learner record or unverified transcript supplies evidence here.
