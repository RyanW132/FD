# Why derivatives exist and what contracts promise

<a id="status"></a>

**Unreviewed teaching draft.** This lesson teaches ten substantive units from Lecture 1, physical pages 5, 6, 11 and 12. Exact source citations distinguish course content from **supplemental** teaching, calculations and answers. It is not an investment recommendation or evidence of learner mastery. The page-5 currency conflict remains visible rather than silently corrected.

<a id="motivation"></a>

## Why this matters

**Supplemental motivation:** a business can know that it must buy something later without knowing how much that purchase will cost in its home currency. A contract can move some of that uncertainty to another party. But an obligation, a purchased choice and doing nothing are different decisions. Before calculating a derivative's price, identify what it promises, what outcome affects it, and why someone wants it.

<a id="outcomes"></a>

## Observable outcomes

1. **Explain a derivative contract:** for the three source examples and a new example, identify the underlying asset, index or event; describe the promised payment/exchange and any trigger; distinguish a future payoff from today's contract price. Name forwards, futures, swaps and options, and distinguish a mutual future obligation from an option holder's right. Success means correct underlying/terms for each example and no invented missing payoff or price.
2. **Analyse purpose and exposure:** given a dollar purchase and a pounds-per-dollar quote, calculate the sterling cost and its change, explain all four source choices without declaring a universally best one, and classify hedging, speculation and arbitrage using the existing exposure and stated assumptions. Success means correct currency units and arithmetic, all three classifications justified, and the source's £/$ conflict retained.

**Supplemental readiness check:** if each dollar costs more pounds, does a fixed dollar bill require more or fewer pounds? If unsure, use the units bridge below. Planned reference IDs are `concept-numeric-foundations` and `concept-derivative-contracts`; everything needed now is explained here without requiring an unfinished reference page.

<a id="foundations"></a>

## 1. Foundation: promises, uncertainty and currency units — supplemental

A **contract** specifies what each party promises, under what conditions and when. The other party is the **counterparty**. A **cash flow** is money paid or received on a stated date. A **payoff** is the contract's payment or net exchange value at the specified future date, as its terms define it. A **price today** is the amount paid or value assigned to the contract now. Do not substitute one for the other.

An **exposure** means that an outcome you care about changes when a market variable changes. If you will pay dollars but budget in pounds, the pound cost depends on the exchange rate. A quote of **£0.78 per $1** says how many pounds one dollar costs. It is not $0.78 per pound. Multiplication keeps the direction visible: dollars × pounds per dollar = pounds. One million means 1,000,000; £7.8 million means £7,800,000. A change is new cost minus old cost; a positive change in a bill is an increase in cost, not a trading gain.

For the following calculation only, let $D$ be the fixed dollar bill (dollars), $x$ the exchange quote (pounds per dollar), and $C$ the resulting pound cost. The **supplemental conversion rule** is

$$C=Dx.$$

Plain-text fallback: **pound cost = dollar amount × pounds per dollar**. Both quantities must refer to the exchange being considered. There is no interest rate, compounding or discounting here. “In three months” identifies the payment date; it is not a multiplication factor. We assume the dollar bill itself is fixed and ignore fees/financing solely to isolate currency exposure.

<a id="airline-exposure"></a>

## 2. The airline's problem, including the source conflict

**Source:** a UK airline must buy **$10 million of fuel in three months**. Today **$1 = £0.78**. What happens if the dollar becomes more expensive? [L1 physical p5, upper situation box; `lecture-1-p005-airline-exposure`](../../sources/annotated/lecture-1/page-005.md#lecture-1-p005-airline-exposure).

**Source-label conflict:** the page title says **“A £10 Million Problem”**, while the scenario says **$10 million**. We preserve both. The following calculation is **conditional on using the scenario's explicit $10 million bill**, not an assertion that the title originally said dollars. If £10 million were instead the intended exposure, the same calculation could not be reused without clarification. Canonical issue: `lecture-1-p005-currency-title`.

<a id="worked-currency"></a>

### Worked example — supplemental calculation, not a supplied solution

Assume the airline's fuel bill remains exactly $10,000,000 and it obtains all dollars at the stated quote. This isolates currency risk; it does not forecast fuel prices or exchange rates.

1. At today's quote, multiply $10,000,000 × £0.78/$ = **£7,800,000**. This is today's exchange-cost comparison, not a guaranteed future payment.
2. Suppose, illustratively, that in three months one dollar costs **£0.82**. The unchanged dollar bill then costs $10,000,000 × £0.82/$ = **£8,200,000**.
3. The cost increase is £8,200,000 − £7,800,000 = **£400,000**.
4. Check another way: the quote increased by £0.82 − £0.78 = **£0.04 per dollar**; 10,000,000 dollars × £0.04/$ = **£400,000**. The units and sign agree.
5. Boundary check: if the quote remains £0.78/$, the exchange cost remains £7,800,000 and the change is £0. If it falls to **£0.74/$**, the bill costs **£7,400,000**, a **£400,000 decrease**. All amounts are exact under these assumptions; no rounding is needed.

A more expensive dollar means **more pounds per dollar**, so it hurts this dollar buyer. That statement describes its exposure before adding a protective contract. The three future quotes are scenarios, not predictions or official slide observations.

<a id="airline-choices"></a>

## 3. Four source choices, four different commitments

The source offers four alternatives and does **not** select one. [L1 physical p5, lower numbered alternatives; `lecture-1-p005-airline-choices`](../../sources/annotated/lecture-1/page-005.md#lecture-1-p005-airline-choices).

| Source alternative | Supplemental explanation | Supplemental limitation to ask about |
|---|---|---|
| 1. Buy the dollars today. | Exchange pounds now and hold dollars for the bill. This is an immediate currency purchase, not automatically a derivative. | Needs money now; funding/holding costs and any change in the bill matter. Today's £7.8 million comparison alone does not measure its full cost. |
| 2. Agree today on a future exchange rate. | A forward-style agreement fixes the rate for an agreed future exchange; both parties undertake obligations. | An unfavourable later market rate does not give the buyer a free right to walk away. No forward quote is supplied here, so do not assume £0.78/$ is available for future delivery. |
| 3. Buy the right, but not the obligation, to exchange later. | An option-style contract gives its holder a choice under specified terms. The seller accepts the corresponding obligation if that right is exercised. | The right can require an upfront price, called a premium; the source gives neither premium nor exercise rate. Flexibility is not automatically free. |
| 4. Do nothing. | Leave the future dollar purchase unprotected against this currency movement. | Retains both the possible cheaper bill and the possible more expensive bill. It does not remove the underlying payment obligation. |

**Supplemental decision principle:** identify the objective, timing, amount, ability to fund an early purchase and actual contract terms before choosing. A fixed future rate exchanges flexibility for certainty; a right can preserve choice at a cost. These pages do not supply enough prices or preferences to rank the alternatives universally. A currency agreement alone also does not guarantee a fixed fuel quantity or dollar fuel price.

<a id="contract-examples"></a>

## 4. What determines the contract's outcome?

The source presents three contracts and asks what determines their value. [L1 physical p11, upper three-contract box and question; `lecture-1-p011-contract-examples`](../../sources/annotated/lecture-1/page-011.md#lecture-1-p011-contract-examples).

| Source contract | Supplemental identification of the underlying | What is and is not specified |
|---|---|---|
| Fix the price of oil delivered in three months. | Oil, the asset to be exchanged; its market price affects whether the agreed exchange is favourable. | Delivery timing is stated. Quantity, quality and fixed price would need contract terms; do not invent them as source facts. |
| Pay £100 if the FTSE 100 exceeds a specified level. | The FTSE 100, a stock-market index: a numerical measure of a group of share prices. Its level is measured in index points, not pounds. | £100 is a conditional payment, not necessarily today's contract price. The threshold and observation date must be specified to apply it. |
| Pay a farmer if rainfall falls below a threshold. | A rainfall outcome/event, not necessarily a traded financial asset. | Location, measurement period, threshold and payment rule are needed. The source does not supply a payment amount or formula. |

**Supplemental trigger example:** suppose the index contract additionally specifies observation at the end of a particular day, threshold **8,000 points**, £100 payment if the index is **strictly above** that threshold, and £0 otherwise. At **8,100 points**, it pays **£100**; at **8,000 points** or **7,900 points**, it pays **£0**. Equality does not satisfy “exceeds.” These invented terms illustrate reading a trigger, not an official numerical source example. They still do not tell us today's fair price.

<a id="derivative-definition"></a>

## 5. The common idea: a derivative depends on something else

**Source definition:** a derivative is a financial contract whose value depends on the value or outcome of an underlying **asset, rate, index or event**. [L1 physical p11, lower key idea box; `lecture-1-p011-derivative-definition`](../../sources/annotated/lecture-1/page-011.md#lecture-1-p011-derivative-definition).

**Supplemental intuition:** “underlying” names what the contract refers to. Oil supplies an asset price; an interest rate supplies a borrowing/earning rate; an index supplies a measured level; rainfall supplies an event or measured outcome. Buying the derivative is not the same as buying the underlying asset. The contract terms connect the underlying to a promised exchange or payment, and those terms matter alongside the underlying itself.

<a id="derivative-types"></a>

The source lists **forwards, futures, swaps and options**. [L1 physical p11, bottom examples line; `lecture-1-p011-derivative-types`](../../sources/annotated/lecture-1/page-011.md#lecture-1-p011-derivative-types).

**Supplemental orientation, not a full treatment:**

- A **forward** is an agreement now for an exchange on specified future terms; the agreed parties have obligations.
- A **futures** contract is a standardised contract traded on an exchange with clearing and periodic settlement of gains/losses. “Standardised” means key terms are set consistently for that contract rather than individually tailored. Its detailed settlement mechanics are not needed to identify its underlying or purpose here.
- A **swap** exchanges cash flows under agreed rules, commonly across several dates; for example, one payment rule can depend on a fixed rate and another on a changing rate. A **rate** expresses an amount relative to a base over a stated time period; no rate calculation is required here.
- An **option** gives its holder a right, not an obligation, to take the specified action under its terms. The holder's choice does not erase the seller's corresponding obligation.

<a id="pricing-question"></a>

## 6. Why uncertain payoff and today's price are different questions

The source's central question is: **how can we place a price today on a payoff that depends on an uncertain future?** [L1 physical p6, lower central question box; `lecture-1-p006-central-pricing-question`](../../sources/annotated/lecture-1/page-006.md#lecture-1-p006-central-pricing-question).

**Supplemental step-by-step distinction:** first specify the future payoff rule, then examine outcomes to which it applies, and only then ask about today's contract value. In the index example we can compute the payment once the end-of-day index is given. Before that observation we know the rule but not which outcome will occur. A possible £100 future payment does not mean the contract is worth £100 today, or zero simply because the outcome is uncertain. A pricing method would need further information and assumptions, including timing and the relevant market opportunities; these pages do not supply a complete numerical valuation. Identifying that missing information is the correct result, not a failed arithmetic exercise.

<a id="hedging"></a>

## 7. Purpose: look at the risk that existed before the trade

**Source: hedging** means reducing or transferring an existing risk. [L1 physical p12, lower principal uses, hedging bullet; `lecture-1-p012-hedging-definition`](../../sources/annotated/lecture-1/page-012.md#lecture-1-p012-hedging-definition).

**Supplemental explanation:** the airline already faces a future purchase bill. A contract that offsets an adverse movement in that bill can be a hedge. Evaluate the combined bill and contract, not just whether the derivative earns money on its own. “Reduce” does not mean every cost or business risk vanishes.

<a id="speculation"></a>

**Source: speculation** means taking risk in anticipation of a return. [L1 physical p12, lower principal uses, speculation bullet; `lecture-1-p012-speculation-definition`](../../sources/annotated/lecture-1/page-012.md#lecture-1-p012-speculation-definition).

**Supplemental explanation:** a trader may take a position because she expects favourable changes, rather than to offset an existing bill. The source's option example concerns expected **volatility**, meaning the size/variability of price movements rather than simply their direction. Predicting higher volatility is a view that may be wrong; it is not a guaranteed gain or an automatic statement about every option strategy.

<a id="arbitrage"></a>

**Source: arbitrage** means exploiting inconsistent prices. [L1 physical p12, lower principal uses, arbitrage bullet; `lecture-1-p012-arbitrage-definition`](../../sources/annotated/lecture-1/page-012.md#lecture-1-p012-arbitrage-definition).

**Supplemental precision:** the textbook-style idea is to combine feasible trades so a price inconsistency locks in a gain without depending on a favourable uncertain price move. You must check equivalence of what is bought/sold, simultaneous execution, costs, funding and delivery obligations. A cheap-looking asset that might rise later is a speculative opportunity, not by that fact an arbitrage. An apparent price difference is not proof of an executable riskless trade.

<a id="purpose-matching"></a>

### The source matching exercise

The source asks you to match: (1) an airline fixing the future fuel price; (2) a trader using an option to profit from an expected volatility rise; (3) a dealer exploiting inconsistent prices in two markets. Categories are hedging, speculation and arbitrage. [L1 physical p12, upper three decisions and matching prompt; `lecture-1-p012-purpose-matching`](../../sources/annotated/lecture-1/page-012.md#lecture-1-p012-purpose-matching).

**Supplemental reasoning guide:** ask, in order: is an existing risk being offset? Is new risk taken for an expected return? Or are matched trades exploiting inconsistent prices? Apply those questions in exercise 5 before consulting its answer. The derivative's name alone does not determine its purpose.

<a id="limits"></a>

## Misconceptions and limits — supplemental

A derivative is not necessarily a bet on a traded share: rainfall can underlie one. A hedge can have a negative derivative payoff while reducing total uncertainty. A right and an obligation are not interchangeable. A conditional future payment is not a present price. Neither a profit forecast nor a raw price difference proves arbitrage. Finally, the source currency conflict cannot be resolved by silently changing the airline's bill. Every calculation here using $10 million is conditional on the scenario text.

<a id="practice"></a>

## Practice — attempt before the answers

<a id="exercise-1-prompt"></a>

### 1. Recognise contracts (outcome 1, scaffolded)

For each source example—oil delivery, conditional £100 FTSE payment, rainfall payment—name the underlying and one term needed to determine the future payment/exchange. Which underlying is measured in index points? Which can be an event rather than a traded asset? Explain why the £100 is not automatically today's contract price. [Answer 1](#exercise-1-answer).

<a id="exercise-2-prompt"></a>

### 2. Read a new promise precisely (outcome 1, transfer)

Use the supplemental index terms above: £100 if the observed level strictly exceeds 8,000 points, otherwise £0. Determine the payments at 8,100, 8,000 and 7,900 points. Does this determine today's price? Then name the four source derivative families and explain the difference between agreeing to buy later and buying a right to buy later. [Answer 2](#exercise-2-answer).

<a id="exercise-3-prompt"></a>

### 3. Explain a derivative to a beginner (outcome 1, teach-back)

In four to six sentences define derivative and underlying, use one asset example and one event/index example, distinguish a future payoff from today's price, and explain why knowing a possible payoff is not enough to price it. Include the obligation/right distinction. [Answer 3](#exercise-3-answer).

<a id="exercise-4-prompt"></a>

### 4. Calculate the airline exposure (outcome 2, scaffolded)

State the original title/scenario currency conflict first. Conditional on the scenario's fixed $10 million bill, calculate the pound cost at £0.78/$ and at a hypothetical £0.80/$ in three months. Show units and the increase; check it using the change in quote. Name all four source alternatives and one reason the source does not identify a universally best one. Ignore fees/financing for the calculation only. [Answer 4](#exercise-4-answer).

<a id="exercise-5-prompt"></a>

### 5. Classify purposes (outcome 2, scaffold then transfer)

First match the three source decisions in the purpose-matching section to hedging/speculation/arbitrage, giving a reason for each. Then classify: (a) a bakery with a known future wheat purchase fixes its purchase price; (b) someone with no wheat need buys a wheat contract solely expecting its price to rise; (c) a dealer simultaneously buys and sells equivalent claims at different prices. What additional checks are needed before calling (c) an actual arbitrage? [Answer 5](#exercise-5-answer).

<a id="exercise-6-prompt"></a>

### 6. Explain the choice without selling certainty (outcome 2, teach-back)

A colleague says, “The airline should always buy the right to exchange later; that must be free protection, and doing nothing removes its obligation.” Correct both claims. Explain its pre-existing exposure, the forward-style alternative's commitment and one missing input needed to choose. Retain the conditional currency interpretation. [Answer 6](#exercise-6-answer).

<a id="answers"></a>

## Supplemental answers, feedback and retries

These are authored answers, not supplied official solutions. Source questions are identified above; added tasks and all numerical scenarios are supplemental. Correct terminology without the reason is not enough.

<a id="exercise-1-answer"></a>

### Answer 1

Oil is the asset underlying the delivery agreement; its quantity and agreed price are among the needed terms. The FTSE 100 is an index measured in **index points**; the threshold and observation date are needed. Rainfall is the underlying event/measurement; its location, period, threshold and payment rule are needed. The index contract's £100 is a **conditional future payment**. Its price today is a separate question about that promise under uncertainty and timing, not a restatement of its possible payment.

**Feedback/retry:** if you named “£100” as the underlying, separate what triggers payment from what is paid. Retry: what must exceed a threshold? Correct target: the index level, not the pounds paid.

<a id="exercise-2-answer"></a>

### Answer 2

8,100 points exceeds 8,000, so payment is **£100**. At 8,000, equality is not “exceeds”: **£0**. At 7,900 it is below: **£0**. These future scenario payments do not determine today's price. The source families are forwards, futures, swaps and options. An agreement to buy later creates an obligation on the agreed terms; an option gives its holder a right it may choose to exercise under its terms, with a corresponding obligation for its seller.

**Feedback/retry:** if you paid £100 at equality, underline “strictly exceeds.” Retry with exactly the threshold: is it greater than itself? Correct target: no; £0 under these supplemental terms.

<a id="exercise-3-answer"></a>

### Answer 3 — model and checklist

“A derivative is a financial contract whose value depends on an underlying asset, rate, index or event. An oil-delivery agreement depends on oil, while a rainfall contract can depend on a weather outcome. The contract tells us what is exchanged or paid and when; its future payoff is not the same as today's contract price. A possible £100 payment does not establish its present price because the trigger is uncertain and pricing needs further information and assumptions. A promise to buy later is an obligation, whereas an option holder has a specified right rather than an obligation to exercise.”

Check for a definition, two unlike underlying examples, a payoff/price distinction and a right/obligation distinction. **Feedback/retry:** if you jumped directly from £100 payoff to £100 price, say what remains unknown before the trigger date, then retell the explanation. Correct target: whether the trigger will occur, along with further pricing information not given here.

<a id="exercise-4-answer"></a>

### Answer 4

The title says **£10 million**, but the scenario states **$10 million**. Conditional on the latter, $10,000,000 × £0.78/$ = **£7,800,000**; $10,000,000 × £0.80/$ = **£8,000,000**. Increase: **£200,000**. Check: quote increase £0.02/$ × $10,000,000 = **£200,000**. No rounding is needed.

The alternatives are buy dollars now, agree a future rate now, buy a right to exchange later, or do nothing. Actual forward/option terms, any premium/funding cost, the firm's objective and its ability to pay early affect the choice. The slide does not supply those inputs or a selected answer.

**Feedback/retry:** if you divided by 0.80, write the units before calculating. Retry: dollars multiplied by pounds per dollar yields what? Correct target: pounds; at the higher quote more pounds are needed.

<a id="exercise-5-answer"></a>

### Answer 5

Source decisions: (1) **hedging**, because the airline offsets an existing fuel-purchase risk; (2) **speculation**, because the trader takes risk on a volatility view for expected return; (3) **arbitrage**, because the dealer seeks to exploit inconsistent prices, as the source describes it.

New cases: (a) hedging for an existing wheat bill; (b) speculation because there is no bill being offset and the trade relies on a favourable move; (c) a proposed arbitrage pattern. For (c), verify equivalent claims and timing, feasible simultaneous trades, ability to fund/settle, and whether fees or other costs remove the price advantage. Without those checks the quoted difference alone is insufficient.

**Feedback/retry:** if every derivative purchase was called speculation, ask what risk existed beforehand. Retry for the bakery: does a wheat-price rise already threaten its business cost? Correct target: yes; the stated price-fixing trade offsets that exposure.

<a id="exercise-6-answer"></a>

### Answer 6

Conditional on the scenario's **$10 million** bill, the airline is exposed to dollars costing more pounds. Buying a right can preserve the choice to exchange under its terms, but may require a premium; neither its price nor its exercise rate is supplied, so “free protection” and “always best” do not follow. A forward-style alternative commits both parties to the agreed future exchange and need not use today's spot rate. Doing nothing leaves the fuel/dollar obligation and currency exposure in place. The decision needs actual terms/costs and the airline's objective or funding constraints; the £/$ title conflict must not be hidden.

**Feedback/retry:** if “do nothing” became “pay nothing,” distinguish the original fuel purchase from a new protective contract. Retry: which obligation existed before choosing a derivative? Correct target: paying for the fuel in three months.

<a id="stop"></a>

## Stop and check

**Supplemental tutoring prompt:** give your own answers to exercises 3 and 6. A tutor should separately check underlying, promise, timing, price/payoff, currency units and trading purpose, then use the focused retry for any missing step. Keep responses in private learner notes. Prepared content and correct author arithmetic are not learner mastery.

Next lesson: [where derivatives trade and how clearing changes counterparty exposure](lesson-l1-markets-and-clearing.md). This lesson stops before pricing forwards or options; it teaches the contract questions needed before pricing, rather than pretending missing prices have been supplied.

<a id="evidence"></a>

## Evidence access

All four complete normalized/raw pages and original PNGs were read/viewed. Canonical units are verified; historical “needs review” extraction headers are unchanged. This teaching draft is not independently approved.

| Physical page | Normalized evidence | Unchanged raw | Original image |
|---|---|---|---|
| 5 | [Exposure/choices](../../sources/annotated/lecture-1/page-005.md) | [Raw 5](../../sources/extracted/lecture-1/page-005.md#page-5) | [Image 5](../../sources/assets/lecture-1/page-005.png) |
| 6 | [Pricing question](../../sources/annotated/lecture-1/page-006.md) | [Raw 6](../../sources/extracted/lecture-1/page-006.md#page-6) | [Image 6](../../sources/assets/lecture-1/page-006.png) |
| 11 | [Contracts/definition/types](../../sources/annotated/lecture-1/page-011.md) | [Raw 11](../../sources/extracted/lecture-1/page-011.md#page-11) | [Image 11](../../sources/assets/lecture-1/page-011.png) |
| 12 | [Purpose/matching](../../sources/annotated/lecture-1/page-012.md) | [Raw 12](../../sources/extracted/lecture-1/page-012.md#page-12) | [Image 12](../../sources/assets/lecture-1/page-012.png) |
