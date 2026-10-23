# Choose the futures contract: related prices, suitable dates and practical limits

<a id="status"></a>

**Unreviewed teaching draft — not approved coverage or learner mastery.** This lesson teaches both substantive units on Lecture 2 physical page 15. The source gives a selection checklist and a cross-hedge definition; detailed explanations, candidate contracts, numerical examples, practice and answers below are **supplemental** and fictional, not live market specifications or supplied official solutions. No optimal hedge-ratio formula or investment recommendation is introduced.

<a id="motivation"></a>

## A correct direction is not yet a usable hedge

Knowing that a future buyer ordinarily needs a long hedge does not tell you **which** futures to buy, **which delivery month** to use or **how much** exposure each contract represents. A related asset may move differently from the actual purchase. A contract can expire before the business needs protection. A contract that looks attractive on paper can also be expensive to enter or exit. Selection means explaining those compromises, not just finding a familiar asset name.

<a id="outcomes"></a>

## What you will be able to do

1. **Explain contract fit:** given an exposure and candidate descriptions, distinguish a direct hedge from a cross hedge; explain why related **price changes**, not a similar name or a causal claim, matter; state the source's four selection checks. Success requires a correct exposure/underlying distinction, the normally-later maturity rule with the hedge-close/expiry distinction, and an explanation of size, liquidity, spreads and residual basis risk.
2. **Apply the checklist:** given a dated exposure, explicit quote/quantity units, contract sizes, deadlines and qualitative evidence of price co-movement, justify a candidate and maturity; calculate a **conditional one-for-one quantity count** and any integer mismatch; explain why that is not an optimized cross-hedge size. Success requires all four checks, correct units and arithmetic, a reason for rejecting alternatives, and at least two remaining risks or missing inputs. The fictional examples use exact arithmetic; no intermediate rounding is needed.

**Supplemental readiness question:** if a purchase happens in September but a candidate futures contract ends in August, does a long position in that contract automatically protect the September purchase? Before answering, identify the two different dates. The foundation below covers the needed vocabulary; [hedge direction and basis](lesson-l2-hedge-direction-and-basis.md) contains the full preceding derivations, but no later statistics lesson is needed here.

<a id="foundations"></a>

## 1. Foundations — supplemental explanations before selection

An **exposure** is the business outcome affected by a price move: for example, a future material purchase costs more if that material's price rises. Its **spot price** is the price for immediate purchase at the observation date. A **futures contract** is a standardized exchange-traded obligation on a specified **underlying** (the referenced asset), with a stated quantity per contract and delivery or settlement terms. **Long** means buying futures and gaining when their price rises; **short** means selling futures and gaining when their price falls. Direction is chosen to offset the commercial exposure, assuming an appropriate positive price relationship.

A **direct hedge**, as used in this lesson, references the same underlying as the exposure. A **cross hedge** uses a different but related underlying. Even a direct hedge can retain timing, grade or location differences; matching a name alone does not prove the contract matches the commercial transaction. **Grade** is the asset quality specified; **location** is where delivery or the relevant price is measured.

**Contract size** is the underlying quantity represented by one futures contract, such as kilograms per contract. A price in dollars per kilogram is not the total contract value or the number of contracts. **Hedge close** is when the business offsets its futures position, ordinarily alongside the commercial transaction in these examples. **Maturity/expiry** is the selected contract's ending date. A **delivery month** is its scheduled delivery period, not necessarily the date the business intends to exit. Before holding a real contract, inspect the actual last-trading, notice and delivery deadlines; a month label alone may be insufficient. A notice deadline is a contract-specific point relevant to delivery obligations. All such dates in this lesson are explicitly fictional teaching inputs.

**Basis**, when quotes are in comparable units, is the exposure spot price minus the selected futures quote at the same time. **Basis risk** is uncertainty about that difference when the hedge closes. In the matched one-for-one, simultaneous-close, zero-cost model, effective purchase cost or sale receipt per unit equals the opening futures quote plus closing basis. That identity does not establish that a different-asset cross hedge has the right size or zero basis. We will not assume either.

**Liquidity** means being able to trade the required amount reasonably promptly without moving the price excessively. The **bid** is the quoted price at which you can sell; the **ask** is the quoted price at which you can buy. Their difference, **ask minus bid**, is the bid–ask spread, in the same price units. A wider spread is generally a larger execution cost, other things equal. A quoted spread for a small amount does not promise execution of your entire position at that price. **Market depth** means how much can be traded at available quoted prices. These terms explain the source checklist; they are not measurements of any live market.

<a id="cross-definition"></a>

## 2. Cross hedging: related price changes, not identical assets

**Source definition:** when no futures contract exists on the asset being hedged, use a contract on a related asset whose price changes are strongly correlated with the exposure. [L2 physical p15, lower cross-hedge box; `lecture-2-p015-cross-hedge-definition`](../../sources/annotated/lecture-2/page-015.md#lecture-2-p015-cross-hedge-definition).

**Correlation, explained without a formula:** it describes how observations vary together. For the usual buyer-long/seller-short direction, we seek a strong **positive** relationship: increases and decreases in the exposure's price tend to accompany increases and decreases in the candidate futures quote. We compare changes over corresponding intervals and compatible units, rather than merely observing that both price levels are large. Correlation does not mean changes are equal in size; it also does not mean that changing the futures price **causes** the exposure's price to move. Both may respond to shared conditions, and a historical relationship can change.

**Supplemental illustration:** suppose local-grade copper is the material actually purchased, but only a standardized copper-grade futures contract is available. The underlying is related, yet it is not the exact local product. A change in the local processing charge, transport cost or grade premium can move the purchase price without the same move in the futures quote. The hedge can offset a common price component while leaving this difference. The prices may be strongly correlated without either perfectly predicting the other.

A futures contract with a familiar industry label but weak or unstable co-movement is not automatically a better hedge than a less familiar, well-related candidate. Conversely, a tiny table of matching changes is not enough to establish a stable statistical relationship. We take qualitative relationship evidence as **given inputs** in the practice cases rather than pretending to estimate correlation from a few observations. If the relationship is negative or unverified, do not blindly apply the ordinary positive-relationship direction; more analysis is needed.

<a id="checklist"></a>

## 3. The source's four-step selection checklist

The original page lists all four steps below. The “why” and diagnostic questions are supplemental teaching explanations, not extra source rules. [L2 physical p15, upper four-step list; `lecture-2-p015-contract-choice`](../../sources/annotated/lecture-2/page-015.md#lecture-2-p015-contract-choice).

| Source selection step | What to inspect and why |
|---|---|
| 1. Choose an underlying whose price is closely related to the exposure | Name the actual exposure asset, its unit and currency, and the contract's underlying. Ask what evidence supports co-movement of corresponding price changes; identify grade/location differences. |
| 2. Choose a delivery month close to, but normally **later than**, the end of the hedge | Keep protection available until the planned commercial transaction and exit. Avoid confusing the nearest calendar month with a contract that survives the horizon. Inspect actual trading/delivery deadlines. |
| 3. Check contract size and calculate the required number | Translate exposure units into contracts under an explicit sizing assumption. Check whole-contract constraints and remaining quantity mismatch. A size calculation is not proof that the assumption is optimal. |
| 4. Consider liquidity, bid–ask spreads and basis risk | A good historical relationship is not enough if you cannot enter/exit the amount economically. Compare realistic executable prices and the uncertainty left between exposure and contract. |

<a id="maturity"></a>

### Why “close to, but normally later” is a qualified rule

Suppose the purchase and hedge close are planned for 20 September. A contract that ends on 15 September ends **before** the need is met. A 15 October ending date covers the horizon and is nearer than 15 December. Under otherwise comparable conditions, the October contract fits the source guideline.

**Supplemental reasoning:** the later date lets the hedger close around the commercial transaction without deliberately holding through the contract's ending or delivery process. Choosing the closest suitable later contract avoids an unnecessary extra maturity mismatch, but it does not make closing basis zero. The hedge still ends before that contract expires. A delivery deadline may arrive before the headline expiry date; check it separately. If the nearby candidate is illiquid, a more distant liquid contract may be considered, accepting a different basis/timing tradeoff. The source says “normally,” not “always.” This is a reasoned comparison, not a universal ranking of months.

Using an earlier contract and then replacing it with a later one is called **rolling** the hedge. It requires an additional close-and-open trade, with its own prices, spreads and uncertainty. It is not the same as one contract quietly lasting beyond its expiry. Rolling strategy is outside this lesson, so an earlier candidate is rejected in the worked case unless that separate plan is explicitly supplied.

<a id="size"></a>

### A quantity calculation with honest limits

Define $Q$ as the exposure quantity in the chosen asset units, $C$ as units represented by one futures contract, and $N$ as the number of contracts. For a **stated one-for-one quantity comparison**, and only after compatible units are established,

$$N=\frac{Q}{C}.$$

Plain-text fallback: **contract count = exposure units ÷ units per contract**. This is a supplemental arithmetic bridge to source step 3, not an optimal cross-hedge formula. Units divide as units ÷ (units/contract) = contracts. The **quantity represented** by a chosen count is $N C$; subtract that from $Q$ to identify the unmatched amount. Exact matching requires a whole-number $N$ if only whole contracts can be traded.

For different assets, equal quantities do not necessarily have equal price sensitivity. **Sensitivity** means how much one price changes in relation to another or to a common condition. A strongly related futures price may move by a different amount from the exposure price. We therefore label one-for-one cross-hedge counts **provisional quantity comparisons**, not optimal recommendations. Determining the risk-minimizing size needs additional measurements and assumptions beyond page 15 and this lesson; no unexplained formula is required to complete the present selection exercise.

<a id="spread-example"></a>

### Read a spread before calling a contract cheap

**Supplemental microexample:** a hypothetical quote is bid $4.99/kg, ask $5.01/kg, where USD is US dollars and kg means kilograms. Spread = $5.01 − $4.99 = **$0.02/kg**. A buyer enters at the ask, not the bid. If it immediately sells at the unchanged bid, it loses $0.02/kg before fees; for 1,000 kg that is **$20**. This is an unchanged-quote round-trip illustration, not a forecast of the later hedge result, and not two full spreads charged on one immediate round trip. Prices may move and a larger order may receive worse execution.

<a id="worked-example"></a>

## 4. Complete worked selection — supplemental fictional case

A manufacturer must buy **10,000 kg of local-grade copper on 20 September**. Its purchase price is in **USD/kg**. It wants to reduce exposure to rising cost and will close futures when it buys. No contract exists on its exact grade/location. Assume the following supplied candidate facts; these are not verified exchange specifications or current market claims.

| Candidate | Referenced asset and relationship to the purchase | Contract expiry | Latest exit to avoid the stated delivery process | Size | Liquidity / spread in this fictional case |
|---|---|---|---|---|---|
| A | Standard copper grade; supplied evidence says strong positive price-change relationship | 15 September | 10 September | 1,000 kg/contract | Adequate depth; $0.02/kg spread |
| B | Same standard copper grade and relationship | 15 October | 10 October | 1,000 kg/contract | Adequate depth; $0.02/kg spread |
| C | Same standard copper grade and relationship | 15 December | 10 December | 1,000 kg/contract | Adequate depth; $0.06/kg spread |
| D | Aluminium; supplied evidence says weak/unstable relationship | 15 October | 10 October | 1,000 kg/contract | Adequate depth; $0.01/kg spread |

“Latest exit” is a stipulated deadline for this exercise, not a claim that real futures all follow the same notice rules. The exercise assumes the position can be closed on 20 September and that the listed depth is enough for the stated order.

1. **Exposure and direction:** the manufacturer is a future buyer hurt by a price rise. Under the given positive relationship, use a **long** copper futures position. The name “copper” alone is not the reasoning; co-movement and the offsetting gain are.
2. **Underlying:** B references standard grade, not the exact local grade/location. This is a **cross hedge** in the stated case. A local premium may move independently, leaving basis risk.
3. **Dates:** A ends before the 20 September purchase and its stated safe exit is even earlier, so it does not span the horizon without a separate roll. B is the closest later expiry with an exit deadline after the planned close. C also spans the horizon but is unnecessarily distant given the otherwise similar facts.
4. **Conditional quantity comparison:** with an explicit one-for-one kilogram assumption, $Q=10{,}000$ kg and $C=1{,}000$ kg/contract, so $N=10{,}000/1{,}000=10$ contracts. Check $10\times1{,}000=10{,}000$ kg. This matches nominal quantity, **not necessarily price sensitivity**. Ten is not presented as a statistically optimized cross-hedge size.
5. **Execution:** B's supplied depth is adequate. Its $0.02/kg spread is narrower than C's $0.06/kg. D's $0.01/kg spread is cheaper in isolation, but does not repair its weak/unstable relationship. The cheapest spread is not the only criterion.
6. **Decision and check:** among these stipulated candidates, **B is the justified contract/month choice**, with a provisional ten-contract quantity comparison, not an implementation recommendation. On 20 September, close the long by selling the same October contract and purchase the actual material separately. Do not assume delivery through the futures. Confirm actual dates, exposure amount, execution conditions and an appropriate risk-based size before treating any real hedge as specified.

**Boundary check:** if B's exit deadline were instead before 20 September, the month label “October” would not save this selection. Reconsider the contract or explicitly analyze a different exit/roll plan. If no candidate has a reliable relationship, “pick the cheapest one” is not a defensible substitute for missing evidence.

<a id="integer-example"></a>

### Supplemental quantity mismatch: why rounding is a decision

Suppose the purchase is instead **10,500 kg**, with 1,000 kg contracts and the same provisional one-for-one comparison. The mathematical count is **10.5 contracts**, but the exercise permits only whole contracts.

- Ten contracts represent 10,000 kg, leaving **500 kg unmatched** on a simple quantity basis.
- Eleven contracts represent 11,000 kg, exceeding the purchase by **500 kg** on that basis.

Neither choice exactly matches 10,500 kg. Equal-sized quantity differences do not prove equal risk when a cross hedge's price sensitivities differ. Record the mismatch and obtain a sizing criterion rather than silently rounding and declaring complete protection. There is no “correct optimized integer” supplied by page 15.

<a id="limits"></a>

## 5. Misconceptions and limits — supplemental

- **“Correlation proves causation or locks in equal price changes.”** It describes co-movement, not a causal mechanism, identical magnitudes or a permanent law. A related futures contract can still leave a changing grade/location premium.
- **“Any contract in the same industry is a suitable cross hedge.”** Ask for evidence of corresponding price changes; labels and price levels alone are insufficient.
- **“The nearest expiry is always best.”** It may be before the hedge horizon; the source normally prefers a close **later** delivery month. Actual deadlines and liquidity can change the choice.
- **“A later expiry means zero basis at my earlier exit.”** Convergence concerns the same deliverable at that contract's expiry. Earlier closing or a different asset can retain basis risk.
- **“Ten contracts is optimal because 10,000 divided by 1,000 equals ten.”** That is an exact quantity calculation under an assumption, not evidence about cross-asset sensitivity or the best risk tradeoff.
- **“The smallest spread wins.”** A narrow spread with poor co-movement may leave large risk; quoted prices may also lack depth for the intended amount.
- **“A sound selection removes all uncertainty.”** The purchase quantity/date can change; delivery-grade/location differences can move; daily futures losses can need funding before the commercial transaction; fees and performance/default risk remain. These are not all measured by a correlation assessment.

**Funding reminder:** futures gains/losses are settled during the contract's life. Even if the eventual combined exposure is hedged, cash may be needed for a loss before the offsetting business benefit is realized. **Default/performance** means failure by a relevant party to deliver or pay as promised; the source checklist does not certify that every commercial or intermediary obligation is risk-free.

<a id="practice"></a>

## 6. Progressive practice — supplemental; attempt first

<a id="exercise-fit-prompt"></a>

### Exercise 1 — explain the asset relationship (outcome 1)

A buyer needs local-grade copper, with no exact futures contract available. Candidate X references standard copper with supplied evidence of strong positive price-change co-movement; candidate Y references a different metal with uncertain co-movement. Identify the exposure and each underlying. Which is the better-supported cross-hedge candidate on relationship evidence alone? Explain why “both prices often rise” does not prove identical changes, causation or future reliability. [Answer 1](#exercise-fit-answer).

<a id="exercise-date-prompt"></a>

### Exercise 2 — transfer the timing and execution checks (outcome 1)

A hedge is needed through 20 September. One contract expires 15 September; another expires 15 October, with a supplied safe exit deadline of 10 October. Assuming otherwise equal candidates and no roll plan, which fits the source guideline? Explain why a very illiquid October contract might require reconsideration. Define liquidity and spread, and say whether a lower spread alone removes basis risk. [Answer 2](#exercise-date-answer).

<a id="exercise-selection-prompt"></a>

### Exercise 3 — apply all four steps to a seller (outcome 2)

A producer will sell **7,500 kg of a local product on 10 June**, quoted in USD/kg. No exact futures exists. Candidate J references a related standard grade with supplied strong positive co-movement, expires 15 May, and has a safe exit deadline of 10 May. Candidate K references the same standard grade, expires 15 July, and has a safe exit deadline of 10 July. Candidate L references that grade, expires 15 September, and has a safe exit deadline of 10 September. All represent **500 kg/contract**; assume only whole contracts and adequate depth. K has a $0.02/kg spread, L $0.05/kg; J has a $0.01/kg spread. All other relevant supplied conditions are equal. Choose direction, candidate/month and a **conditional one-for-one quantity count**. Explain every rejection, verify represented quantity and name two residual risks. Does your count establish an optimal cross hedge? [Answer 3](#exercise-selection-answer).

<a id="exercise-size-prompt"></a>

### Exercise 4 — quantity and spread checks (outcome 2)

In a separate fictional case, the exposure is 7,700 kg and each contract represents 500 kg. Calculate the unrounded one-for-one count. If only whole contracts can trade, compare 15 and 16 contracts, including the unmatched or excess kilograms. Separately, a bid is $2.48/kg and an ask $2.51/kg. Find the spread and the cost of an immediate buy-at-ask/sell-at-unchanged-bid round trip for one 500 kg contract, ignoring fees. State why this is not a prediction of the future hedge's overall result. [Answer 4](#exercise-size-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 5 — explain the checklist to a beginner (outcome 1)

In five or six sentences, distinguish exposure and futures underlying, explain cross hedging and correlation without claiming causation, state the normally-later maturity rule, and explain contract size, liquidity/spreads and residual basis risk. Include why “same industry, nearest month, cheapest quote” is not a sufficient selection procedure. [Answer 5](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 6 — audit a proposed selection (outcome 2)

Using the manufacturer's 10,000 kg September case, a colleague proposes: “Take D because its spread is lowest. If we use copper instead, A is closest in date. Ten contracts must be optimal, and October's eventual expiry guarantees our September basis is zero.” Correct all four claims. Present a defensible conditional choice, its quantity arithmetic, planned close, and what still needs checking before a real hedge could be implemented. [Answer 6](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 7. Separate supplemental answers, diagnosis and retries

<a id="exercise-fit-answer"></a>

### Answer 1 — relationship evidence

The exposure is the purchase cost of **local-grade copper**. X references **standard copper**; Y references the other metal. X is better supported on the stated relationship evidence and is a cross hedge because its underlying is not the exact exposure asset/terms. Positive co-movement means changes tend to share direction; it does not say they have equal magnitude, that one causes the other, or that a historical pattern cannot break. Actual selection still needs dates, size and execution checks.

**Diagnosis/retry:** if you called X an exact hedge because both names include copper, name the grade/location difference first. If you inferred causation, replace “makes the other rise” with “tends to change alongside it.” Then explain why a changing local premium can leave risk.

<a id="exercise-date-answer"></a>

### Answer 2 — dates and trading conditions

The October contract spans the 20 September horizon and its stipulated 10 October exit deadline is later than the planned close. The September contract expires too early without a separate roll. October is therefore the better timing fit under the stated equal conditions. If it is very illiquid, entering/exiting the required amount may be difficult or expensive; a more distant liquid candidate may deserve comparison, with its different timing/basis risk explicitly retained. Liquidity is the ability to transact the amount promptly without excessive price impact; spread is ask minus bid. A narrow spread does not fix the exposure-versus-futures price difference or guarantee co-movement.

**Diagnosis/retry:** if you chose September merely because the business month is September, compare the **dates**, not labels: 15 September precedes 20 September. If you equated a quoted low spread with liquidity, ask whether enough quantity can actually trade at those quotes.

<a id="exercise-selection-answer"></a>

### Answer 3 — seller's selection and size

The producer is a **future seller**, hurt by falling prices, so a **short** in the positively related reference is the ordinary directional hedge. K is a **cross hedge** on the related standard grade. J ends before 10 June and cannot span the horizon without a roll despite its smaller spread. K's 15 July expiry is the closest later one supplied and its 10 July safe exit deadline permits the intended 10 June close. L is further away and has a wider $0.05/kg spread than K's $0.02/kg, with no compensating supplied benefit. Adequate depth is stipulated, not assumed from the spread alone.

Under the explicit one-for-one quantity assumption, count = 7,500 kg ÷ (500 kg/contract) = **15 contracts**. Check: 15 × 500 = **7,500 kg**. Close the short by buying the same contract on 10 June alongside the sale. This nominal quantity match is not an optimal cross-hedge estimate: different-grade prices can have different sensitivities. Grade/location basis risk and changed sale quantity/date are two residual risks; settlement funding or performance risk are also valid when explained.

**Diagnosis/retry:** if you chose long, first state what happens to the producer's receipt when prices fall and which futures side gains on that fall. If you called 15 optimal, separate “kilograms represented” from “amount of price risk offset.” The exercise supplies the former, not the measurements needed for the latter.

<a id="exercise-size-answer"></a>

### Answer 4 — whole contracts and spread

Unrounded comparison: 7,700 ÷ 500 = **15.4 contracts**. Fifteen contracts represent **7,500 kg**, leaving **200 kg unmatched**. Sixteen represent **8,000 kg**, exceeding the exposure by **300 kg**. Neither exactly matches 7,700 kg; the arithmetic alone does not choose the risk-minimizing alternative.

Spread = 2.51 − 2.48 = **$0.03/kg**. One contract's immediate buy costs 500 × 2.51 = **$1,255**; immediate sale receives 500 × 2.48 = **$1,240**. Net round-trip cost is **$15**, also 500 × 0.03. This assumes unchanged executable quotes and no fees. It is not a forecast of later futures gains/losses, changes in the exposure price or total business results.

**Diagnosis/retry:** if you rounded 15.4 and erased the remainder, multiply the chosen whole number back by 500 kg and compare with 7,700. If you found $30 spread cost, you charged two full spreads for the stated immediate round trip; write the single buy and single sale amounts before subtracting.

<a id="exercise-explain-teachback-answer"></a>

### Answer 5 — explanation model and criteria

**Supplemental model:** “The exposure is the actual purchase or sale affected by price changes; the futures underlying is the asset specified by the hedge contract. A cross hedge uses a related but different asset, with evidence of price-change co-movement, not proof of causation or equal changes. Choose a close but normally later delivery month so the contract and its deadlines can span the planned hedge close. Check quantity units and contract size, stating the sizing assumption and any whole-contract mismatch. Check liquidity, executable spreads and the price difference left at exit, because a cheap quote does not remove basis risk. Same-industry names, the nearest month or the lowest spread alone do not satisfy those checks.”

A sufficient explanation covers all four source steps and the cross-hedge limitation. **Diagnosis/retry:** if one is absent, give a one-line question for it—“Does this contract still trade when I need to exit?” for timing, for example—then repeat the whole checklist without looking. Correct vocabulary alone is not a justified selection.

<a id="exercise-apply-teachback-answer"></a>

### Answer 6 — conditional choice, not a risk-free recommendation

1. D's $0.01/kg spread is cheapest, but the supplied price relationship is weak/unstable. It does not beat strong fit merely by being cheaper to trade.
2. A expires on 15 September, before the 20 September purchase, and its stated delivery-exit deadline is 10 September. Being close in calendar date does not cover the horizon.
3. B is the closest later copper contract with the stipulated safe exit after the planned close and adequate depth; its spread is narrower than C's. The conditional one-for-one comparison gives 10,000 ÷ 1,000 = **10 contracts**, representing 10,000 kg, but different assets can have unequal sensitivities. No optimal count has been established.
4. October expiry does not set September closing basis to zero; even at expiry the exposure's different grade/location need not equal the referenced deliverable's price.

The conditional plan is **long B**, close by selling it on **20 September**, and buy the actual material separately. Still verify the current exposure/date, actual contract specifications and deadlines, robust relationship evidence and appropriate risk-based sizing, execution depth/spreads/fees, funding capacity and remaining grade/location/performance risks. These checks are missing for a real trade; fictional case inputs are not permission or evidence to execute one.

**Diagnosis/retry:** if you selected B but repeated the zero-risk claim, state exactly what spot asset the futures converges to and on which date. If you treated ten as optimized, state only what the division proved: the nominal quantity represented under a one-for-one assumption. Then explain the remaining uncertainty in your own words.

<a id="stop-check"></a>

## Stop and check understanding

Give a private teach-back for exercises 5 and 6. A tutor should separately check source fidelity, asset/quote units, the date comparison, arithmetic and the honest limits; retry the missing step rather than infer mastery from a correct candidate letter. Reading this draft or its answers does not establish learning.

This lesson stops after **contract selection and conditional quantity arithmetic**. The later optimal-hedge-ratio material will supply additional statistical assumptions and measurements; it is not needed to complete these outcomes and is not silently imported here.

<a id="evidence"></a>

## Precise evidence and accessible page description

Both substantive regions on Lecture 2 physical page 15 were read in full normalized and raw form; the original full-page image was inspected. The source has an **upper numbered four-step list** followed by a **lower “Cross hedge” definition box**. There is no plotted curve, axis, legend, numerical candidate table or market data on the page. The candidate tables, dates, quotes and examples in this lesson are authored fictional teaching supplements, not source figures.

| Physical page / region | Exact normalized source | Unchanged raw page | Original image |
|---|---|---|---|
| 15, upper four-step list | [Contract choice](../../sources/annotated/lecture-2/page-015.md#lecture-2-p015-contract-choice) | [Raw 15](../../sources/extracted/lecture-2/page-015.md#page-15) | [Image 15](../../sources/assets/lecture-2/page-015.png) |
| 15, lower definition box | [Cross-hedge definition](../../sources/annotated/lecture-2/page-015.md#lecture-2-p015-cross-hedge-definition) | [Raw 15](../../sources/extracted/lecture-2/page-015.md#page-15) | [Image 15](../../sources/assets/lecture-2/page-015.png) |

The normalized file's historical draft banner is distinct from the canonical verified source-unit status. Source conversion approval does not approve this teaching draft. No conflict is recorded for these two units; no private textbook, learner record or unverified transcript is used. Foundational definitions are supplied inline as supplements, with the earlier [basis lesson](lesson-l2-hedge-direction-and-basis.md#basis-definition) available for a complete derivation rather than a circular prerequisite.
