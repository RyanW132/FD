# From hedge ratio to contracts: the airline example and a feasible decision

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all nine substantive units on Lecture 2 physical pages 18–20. Source inputs, displayed calculations, decision and questions are identified precisely. Added derivations, unrounded calculations, rounding comparisons, exercises and answers are **supplemental**, not supplied official solutions or live contract specifications. No real trade is recommended.

<a id="motivation"></a>

## A ratio is not an order size

A multiplier of 0.78 means roughly 0.78 futures-underlying units for each exposure unit under the stated price-change model. It does **not** mean 0.78 exchange contracts. To turn a statistical ratio into contracts, identify how much exposure exists and how much underlying one contract represents. Then separate a mathematical fractional optimum from the whole positions that can actually be chosen. Rounding is not the only reason a cross hedge remains imperfect.

The [preceding lesson](lesson-l2-minimum-variance-hedge.md) derives the minimum-variance ratio and explains its statistical assumptions. The foundations here repeat the definitions needed to size and interpret it. Optional lookups: [hedge-ratio units](../concepts/concept-hedge-ratio-and-beta.md#hedgeratio-ratio), [statistical foundations](../concepts/concept-statistical-foundations.md#statistics-moments) and [numeric units](../concepts/concept-numeric-foundations.md#numeric-units).

<a id="outcomes"></a>

## Observable outcomes

1. **Explain quantity and direction:** given an exposure, a price-change hedge ratio and contract specifications, distinguish ratio, desired futures quantity and contract count; show unit cancellation; select direction from the commercial side and correlation sign; explain why a minimum-variance cross hedge is imperfect even before rounding. Success requires the physical-unit versus return/value distinction, an explicit sign convention, and at least two residual-risk or model limitations.
2. **Calculate and check a feasible decision:** reproduce the source airline ratio and displayed rounded-ratio count, separately calculate the unrounded route, compare the neighboring whole-contract choices using implemented ratios and the fixed variance model, and transfer the procedure to a new case. Success requires both route labels, correct quantities/units/intermediate precision, justified rounding under explicit assumptions, and a check that no number is presented as a guaranteed future outcome. Keep full precision until reporting; the tolerances stated with each exercise apply.

**Supplemental readiness question:** if a model calls for 640 underlying units and one contract represents 100 units, how many contracts is that mathematically? Is it automatically a permitted whole-contract trade? The next sections build the answer. The number alone will not tell you whether to buy or sell.

<a id="foundations"></a>

## 1. Foundations: what is being counted? — supplemental

An **exposure** is a business outcome affected by a price change. A future buyer is hurt by a rising purchase price; a future seller is hurt by a falling sale price. A **futures contract** is a standardized exchange-traded obligation referencing an underlying asset, with a stated underlying quantity per contract. A **long** position gains when the futures quote rises; a **short** gains when it falls. A **cross hedge** uses a related but different underlying from the actual exposure, so the two price changes need not match.

Let $\Delta S$ and $\Delta F$ be exposure spot-price and selected futures-price changes over the **same interval**, in a common currency but with their respective underlying quantity units. A delta means end price minus start price. **Standard deviation** measures spread of changes in their original price units; variance is its square. Write these deviations $\sigma_S$ and $\sigma_F$. **Covariance** is the average product of paired deviations from their means; **correlation** $\rho$ divides covariance by the two standard deviations and is dimensionless. It is defined only when both standard deviations are positive. These measures must come from consistent paired observations/model assumptions and a relevant horizon.

The prior lesson's minimum-variance **price-change** ratio is $h^*=\rho\sigma_S/\sigma_F$, or covariance divided by futures-change variance when the latter is positive. The star means the selected optimum in a stated unconstrained model. It means futures-underlying units per exposure-underlying unit, not contracts or a return. It minimizes variation of $\Delta S-h\Delta F$ while the chosen ratio and statistical inputs are fixed. In the normal positive-correlation case, a seller implements that subtraction by a short futures hedge; a buyer subtracts a long futures gain from the purchase bill.

**Quantity and currency conventions:** one price in currency per gallon cannot be multiplied by kilograms without conversion. Gallons of jet fuel and gallons of heating oil share a volume convention for this example but remain different commodities. A futures quantity is not a physical delivery of jet fuel. If currencies or volume standards differ, convert or remodel explicitly before using these formulas; no conversion is supplied by the source case.

<a id="notation"></a>

| Symbol | Meaning | Unit / restriction |
|---|---|---|
| $Q_A$ | Positive quantity of the actual exposure asset | Exposure units, such as gallons of jet fuel |
| $Q_F$ | Positive quantity represented by **one** futures contract | Futures-underlying units per contract |
| $h^*$ | Model-optimal price-change quantity multiplier | Futures units per exposure unit; may be signed |
| $N^*$ | Continuous-size target contract number | Contracts, possibly fractional; its sign needs the convention below |
| $N$ | A chosen feasible whole-contract number in the same convention | Contracts |
| $h_N=NQ_F/Q_A$ | Quantity multiplier actually implemented by that count | Futures units per exposure unit |
| $v(h)$ | Variance of hedged change **per exposure unit** | Squared currency per exposure unit |

All quantities refer to one planned exposure and the selected hedge interval. The hedge closes alongside the commercial transaction in the model; the futures' expiry may be later. **Closing** means offsetting the position in that same contract; it is not necessarily holding to expiry or taking delivery. No annual rate, compounding or month-to-year scaling enters the quantity division.

**Assumptions for the calculations:** positive known $Q_A,Q_F$, fixed linear exposure, correctly matched price-change statistics, fixed hedge size, no fees/spreads/taxes, no financing of daily settlements, no default, and initially no position limits. The unconstrained calculation permits fractional sizes mathematically; implementation later permits only whole contracts. Real costs/funding and changed quantity/date can alter the appropriate decision. We state rather than conceal that gap.

<a id="count-derivation"></a>

## 2. Derive the source contract-count formula from quantity

The ratio calls for $h^*$ futures-underlying units per exposure unit. Multiplying by $Q_A$ gives the **target futures-underlying quantity** $h^*Q_A$. Each contract supplies $Q_F$ such units, so divide by that quantity per contract:

$$N^*=\frac{h^*Q_A}{Q_F}=h^*\frac{Q_A}{Q_F}.$$

Plain-text fallback: **target contracts = price-change hedge ratio × exposure quantity ÷ underlying quantity per contract**. This is the source boxed formula. [L2 physical p18, upper quantity definitions and boxed ratio; `lecture-2-p018-optimal-contract-number`](../../sources/annotated/lecture-2/page-018.md#lecture-2-p018-optimal-contract-number).

The unit cancellation is essential:

**(futures units / exposure unit) × exposure units ÷ (futures units / contract) = contracts.**

Multiplying back recovers the source equivalent-quantity relationship:

$$N^*Q_F=h^*Q_A.$$

[L2 physical p18, middle equivalent-quantity equation; `lecture-2-p018-hedged-quantity`](../../sources/annotated/lecture-2/page-018.md#lecture-2-p018-hedged-quantity).

**Supplemental clarification of “equivalent”:** this is the model's futures quantity representing a chosen price exposure. With a cross hedge it is not necessarily the same physical asset and does not promise that all exposure units are delivered, covered one-for-one, or risk-free. The source uses “equivalent”; keep the distinct underlying-unit labels when applying it.

<a id="ratio-vs-count"></a>

### A complete quantity example before the airline numbers

**Supplemental case:** the price-change model has $\sigma_S=0.20$ GBP/spot unit, $\sigma_F=0.25$ GBP/futures unit, and $\rho=0.8$ over a common one-month interval. With matching quantity conventions, $h^*=0.8(0.20/0.25)=0.64$. Let exposure be **1,000 units** and contract size **100 futures units/contract**.

1. Target futures quantity: $0.64\times1{,}000=640$ futures units.
2. Continuous contract count: $640/100=6.4$ contracts.
3. Check: $6.4\times100=640$ futures units, not 1,000. The ratio intentionally differs from one.
4. Whole-contract candidates: six represent **600 units**, which is **40 below** the 640-unit target; seven represent **700**, **60 above** it. The neighboring-count variance comparison appears in section 6.

A ratio of 0.64, a target quantity of 640, and a count of 6.4 answer different questions and have different units. Do not choose 640 contracts or call 6.4 an executable whole-contract trade.

**Do not mix ratio conventions:** the source $h^*$ comes from currency **price changes** and belongs with physical quantities $Q_A/Q_F$. A regression of dimensionless **returns** estimates a different sensitivity; sizing from that convention needs a consistently value-scaled model and starting prices. It cannot simply be inserted into this physical-quantity formula or combined with a value ratio as though it were the same $h^*$. No return-based slope or value-based hedge formula is used in this lesson.

<a id="direction"></a>

## 3. Choose direction explicitly; do not infer it from a bare count

For clarity, we use the source count algebra as a **signed size relative to the commercial hedge side**:

| Price-change relationship | Ratio sign | Seller / positive asset-value exposure | Future buyer / purchase-cost exposure |
|---|---|---|---|
| Positive covariance/correlation | $h^*>0$ | Short $N^*$ contracts | Long $N^*$ contracts |
| Negative covariance/correlation | $h^*<0$ | Long the magnitude of $N^*$ | Short the magnitude of $N^*$ |
| Zero covariance with positive futures variance | $h^*=0$ | No futures position in this variance model | No futures position in this variance model |

“Magnitude” means absolute value: for example, a signed −4 denotes size four with the direction reversed, not a negative number of physical contracts. This is an explicit supplemental sign convention. In a seller's $\Delta S-h\Delta F$ representation, $N^*>0$ can be called “contracts to short.” For the buyer, $N^*>0$ means “contracts to go long,” because its cost subtracts the long gain. Never reuse a signed-to-short label for the buyer without reversing it.

**Reasoning for a negative correlation:** when purchase prices rise while the chosen futures quote tends to fall, a short futures position can gain and help the buyer pay the higher bill. The negative ratio reflects that reversal. Direction does not depend on whether one likes rising prices; it depends on which commercial outcome is being protected and how the hedge quote co-moves.

<a id="source-inputs"></a>

## 4. Read all the airline source inputs and identify what is missing

The source airline expects to purchase **2 million gallons of jet fuel in one month**. In this source scenario there is no suitable jet-fuel futures contract, so it considers heating-oil futures. This is a statement about the supplied example, not a current-market claim. [L2 physical p19, upper scenario and numerical inputs; `lecture-2-p019-airline-cross-hedge-inputs`](../../sources/annotated/lecture-2/page-019.md#lecture-2-p019-airline-cross-hedge-inputs).

| Source input | Value | Meaning / unit caveat |
|---|---:|---|
| Actual exposure $Q_A$ | 2,000,000 | Gallons of jet fuel to purchase |
| Contract size $Q_F$ | 42,000 | Gallons of heating oil per futures contract |
| Purchase horizon | One month | Timing of the commercial need, not a supplied annualization factor |
| Spot-change standard deviation $\sigma_S$ | 0.0263 | Price-change standard deviation, as defined on p17 |
| Futures-change standard deviation $\sigma_F$ | 0.0313 | Price-change standard deviation, same statistical interval/conventions required |
| Correlation $\rho$ | 0.928 | Dimensionless positive co-movement |

**Do not invent omitted units:** the slide does not specify the currency of the price-change standard deviations, the estimation interval/frequency, sample dates, futures delivery month or exact gallon standard. For the algebra, assume compatible gallon definitions and a common currency quotation per gallon, and consistently paired statistics appropriate to the intended hedge. Call that unspecified common currency unit **U**, so the standard deviations can be read conditionally as U per relevant gallon. U is a placeholder, not USD or an asserted real currency. The one-month purchase horizon does **not** prove that the supplied standard deviations were estimated from monthly observations. The numerical source calculation can be reproduced under these compatibility assumptions, but an actual variance forecast requires the missing measurement details. Do not annualize, multiply by one month or divide by twelve.

<a id="source-direction"></a>

### Before calculating: long or short?

The source asks this question explicitly. Try answering from the exposure before using a formula. [L2 physical p19, lower before-calculating box; `lecture-2-p019-airline-direction-question`](../../sources/annotated/lecture-2/page-019.md#lecture-2-p019-airline-direction-question).

**Supplemental answer:** the airline is a future **buyer**, hurt by rising fuel prices. Correlation is positive, so rising jet-fuel prices tend to accompany rising heating-oil futures prices. A **long** heating-oil futures position gains on that rise and helps offset the more expensive jet-fuel purchase. Shorting because the airline wants cheap fuel would normally worsen this exposure. The assets remain different; no perfect offset is promised.

<a id="source-ratio"></a>

## 5. Work the airline calculation, preserving both precision routes

### First: the hedge ratio

Substitute the source inputs in the correct order:

$$h^*=0.928\left(\frac{0.0263}{0.0313}\right)
=\frac{0.0244064}{0.0313}
\approx0.779757188498.$$

The equality before the approximation uses exact supplied decimals; the final value is rounded to twelve decimal places. It is about 0.77976 heating-oil gallons per jet-fuel gallon in the price-exposure model. The source rounds this ratio to **0.780**. [L2 physical p20, upper minimum-variance ratio calculation; `lecture-2-p020-airline-ratio-calculation`](../../sources/annotated/lecture-2/page-020.md#lecture-2-p020-airline-ratio-calculation).

**Check:** the spot-change standard deviation is below the futures-change standard deviation, and correlation is positive but below one. Therefore this ratio should be positive and less than one; about 0.78 is consistent. Reversing the standard-deviation fraction would not follow the source model.

<a id="source-count"></a>

### Second: distinguish the source's displayed calculation from full precision

**Route A — faithfully reproduce the slide:** use its already rounded ratio, 0.780:

$$N^*_{\mathrm{display}}=0.780\left(\frac{2{,}000{,}000}{42{,}000}\right)
=37.142857142857\ldots\approx37.14.$$

The subscript “display” labels this calculation route, not a different economic exposure. Target quantity on this route is $0.780\times2{,}000{,}000=1{,}560{,}000$ heating-oil gallons. The source uses that rounded ratio in its middle calculation. [L2 physical p20, middle optimal contract calculation; `lecture-2-p020-airline-contract-calculation`](../../sources/annotated/lecture-2/page-020.md#lecture-2-p020-airline-contract-calculation).

**Route B — supplemental full-precision audit:** retain the exact input ratio until the end:

$$N^*=\left(\frac{0.928\times0.0263}{0.0313}\right)
\frac{2{,}000{,}000}{42{,}000}
\approx37.131294690400.$$

The corresponding target futures quantity is approximately **1,559,514.376997 heating-oil gallons**, rounded to six decimal places. Multiplying the unrounded contract target by 42,000 gives that same quantity. This route rounds to **37.13** contracts at two decimal places, **not 37.14**. Both routes point to 37 as the nearest whole count, but their intermediate values are not equal. No silent correction of the source is made: Route A is its displayed rounding convention; Route B is the separate precision audit.

<a id="source-decision"></a>

### Third: interpret the source decision

The source recommends a **long position in approximately 37 heating-oil futures contracts** for its example. [L2 physical p20, lower decision box; `lecture-2-p020-airline-decision`](../../sources/annotated/lecture-2/page-020.md#lecture-2-p020-airline-decision).

Thirty-seven contracts represent $37\times42{,}000=1{,}554{,}000$ heating-oil gallons. Their **implemented ratio** is $h_{37}=1{,}554{,}000/2{,}000{,}000=0.777$, not 0.780 and not the unrounded optimum. The ratio, target count, chosen integer and implemented ratio must stay distinct. The futures position does not provide 1,554,000 gallons of jet fuel to the airline: it is a price hedge on heating oil, normally closed separately from the jet-fuel purchase.

<a id="integer-proof"></a>

## 6. Justify the neighboring whole-contract choice — supplemental extension

A **floor** is the largest whole number no greater than a number; a **ceiling** is the smallest whole number no less. The floor and ceiling of 37.131294690400… are 37 and 38. Whole contracts forbid trading the precise fractional mathematical optimum in this exercise.

The preceding lesson proved, for fixed statistical inputs and positive futures variance,

$$v(h)=v(h^*)+\sigma_F^2(h-h^*)^2.$$

Since $h_N=NQ_F/Q_A$ and $h^*=N^*Q_F/Q_A$, substitute their difference:

$$v(h_N)=v(h^*)+\sigma_F^2\left(\frac{Q_F}{Q_A}\right)^2(N-N^*)^2.$$

The coefficient on the squared distance is positive. Thus **under this fixed, unconstrained-apart-from-integers, zero-cost variance objective**, the nearest integer to $N^*$ gives the smaller variance. At an exact half-integer the two neighbors tie on this objective. This is not a universal rounding rule once costs, limits, asymmetric objectives or parameter uncertainty are added. Multiplying by $Q_A^2$ would give variance of total money change and preserves the same minimizer for fixed $Q_A$; the table below deliberately reports variance **per jet-fuel gallon**, not total currency variance.

<a id="airline-rounding"></a>

### Compare 37 and 38 using the actual implemented ratios

Use the original unrounded statistical inputs. Under the compatible-unit/horizon assumptions, $v(h)=0.0263^2+h^2(0.0313^2)-2h(0.928)(0.0263)(0.0313)$.

| Choice | Heating-oil quantity | Implemented $h$ | Difference from unrounded target quantity | Variance per jet-fuel gallon, $(\text{U/jet gallon})^2$ |
|---|---:|---:|---:|---:|
| Continuous optimum | 1,559,514.376997 approximately | 0.779757188498 approximately | 0 | 0.00009601763904 |
| 37 long contracts | 1,554,000 | 0.777 | About 5,514.376997 below | 0.00009602508673 |
| 38 long contracts | 1,596,000 | 0.798 | About 36,485.623003 above | 0.00009634368004 |

Quantities/differences in the table are **heating-oil gallons**, not a claim about unmatched physical jet fuel. Continuous quantities are displayed to six decimals, ratios to twelve; integer quantities and the shown variance values from finite-decimal inputs are exact. For the continuous row, the exact residual-variance formula gives the stated decimal without first rounding $h^*$.

**Check:** 37 is closer to the unrounded target, and its computed variance is smaller than 38's but slightly above the continuous minimum. Therefore 37 is the better integer choice for this narrowly stated objective, consistent with the source's approximate decision. It is not “exactly optimal in every real setting.”

For the earlier supplemental **6.4-contract** case, six contracts implement $h=0.6$, with variance $0.04+0.0625(0.6)^2-0.08(0.6)=\mathbf{0.0145}$; seven implement $h=0.7$, giving **0.014625**, in squared GBP/spot-unit units. The continuous minimum is 0.0144 at $h=0.64$. Six is the closer integer and has lower variance under the same assumptions. This verifies rounding by actual exposure, not by calling 6.4 contracts executable.

<a id="residual-risk"></a>

## 7. Answer the source's residual-risk question before blaming rounding

The source asks: **why is the hedge imperfect even before the number of contracts is rounded?** [L2 physical p20, bottom residual-risk box; `lecture-2-p020-airline-residual-question`](../../sources/annotated/lecture-2/page-020.md#lecture-2-p020-airline-residual-question).

**Supplemental answer:** jet fuel and heating oil are different assets. Their price changes have supplied correlation **0.928, not perfect ±1**. A linear hedge removes the best-fitting common price-change component under the model but leaves a residual. Even a hypothetical fractional 37.131294690400… contracts would not eliminate that variation. Rounding adds a smaller additional mismatch on top of it.

From the prior derivation, the continuous residual variance is $\sigma_S^2(1-\rho^2)$. For the source inputs:

1. Unhedged per-gallon variance: $0.0263^2=0.00069169$.
2. Squared correlation: $0.928^2=0.861184$.
3. Remaining variance fraction: $1-0.861184=0.138816$, or **13.8816%**.
4. Minimum residual variance: $0.00069169\times0.138816=\mathbf{0.00009601763904}$ in the conditional squared-price units.
5. Its standard deviation is approximately **0.009798859 U/jet gallon**, rounded to nine decimals. The variance reduction is **86.1184%**, not a 92.8% risk reduction and not a probability of success. The fraction of standard deviation remaining is $\sqrt{0.138816}\approx0.372580193$, about **37.2580%**; variance and standard deviation are different scales.

These numerical residuals are **conditional model quantities** in the supplied statistics' unspecified common interval; they are not independently established one-month forecasts. The slide provides no sample data to validate the estimates or future stability. That missing information is a real limitation, not a reason to silently invent a daily or monthly frequency.

<a id="limits"></a>

### Minimum variance is not a perfect hedge

The source explicitly warns that the hedge is minimum-variance rather than necessarily perfect, with rounding and basis risk leaving exposure. [L2 physical p18, lower important box; `lecture-2-p018-minimum-variance-limits`](../../sources/annotated/lecture-2/page-018.md#lecture-2-p018-minimum-variance-limits).

**Supplemental interpretation and limits:**

- **Basis/asset mismatch:** basis is exposure spot minus selected futures price in comparable quotes. Their difference can change because jet-fuel and heating-oil markets, grade or delivery location differ. Correlation summarizes co-movement, not guaranteed convergence of different commodities.
- **Timing mismatch:** the source purchase is in one month but supplies no futures expiry month. Select a contract that spans the hedge horizon and respect trading/delivery deadlines; closing a hedge and futures expiry are not identical dates. Do not infer a specific contract month from this calculation.
- **Estimation risk:** correlation and standard deviations are estimates or model inputs; their relation may change. Matching observation intervals and price-change units is necessary but not proof of future accuracy.
- **Quantity risk:** the airline may need a different number of gallons than forecast. A ratio sized for a fixed two million gallons does not automatically resize itself.
- **Funding and costs:** daily futures losses may require cash before the commercial purchase; margin is collateral supporting the position, not the notional quantity or a substitute for it. Financing, spreads and fees were omitted from the variance objective. A smaller final variance does not bound interim cash needs.
- **Performance and broader business risks:** counterparties or commercial suppliers can fail to perform. A fuel-price hedge is not a guarantee of operational performance, profit or every extreme outcome.

None of these limitations alters the source arithmetic. They limit what can honestly be claimed from it.

<a id="practice"></a>

## 8. Progressive practice — source questions retained, answers separate

New prompts, transfers and all reasoning answers are **supplemental**. Exercises 2 and 7 explicitly retain the source's directional and pre-rounding residual-risk questions. Source numerical results are cited above, not presented as an invented official solution set.

<a id="exercise-units-prompt"></a>

### Exercise 1 — quantity scaffold (outcome 1)

A price-change ratio is 0.64 futures units per exposure unit, exposure is 1,000 units and contract size is 100 futures units per contract. Fill in desired futures quantity ___, unrounded contracts ___ and represented quantity for six contracts ___. Show unit cancellation. Explain why neither 0.64 nor 640 is the contract count, and why an unrelated return-regression slope cannot be substituted without reconciling conventions. [Answer 1](#exercise-units-answer).

<a id="exercise-direction-prompt"></a>

### Exercise 2 — source direction before arithmetic (outcome 1)

An airline will buy two million gallons of jet fuel in one month and considers heating-oil futures, with positive correlation 0.928. Should it be long or short, and why? This is the [p19 lower before-calculating question](../../sources/annotated/lecture-2/page-019.md#lecture-2-p019-airline-direction-question). Supplemental tasks: distinguish the actual purchase asset from the futures underlying; identify two source inputs that are missing for a fully specified real hedge or variance forecast. [Answer 2](#exercise-direction-answer).

<a id="exercise-source-prompt"></a>

### Exercise 3 — preserve the two source calculation routes (outcome 2)

Use $\rho=0.928$, $\sigma_S=0.0263$, $\sigma_F=0.0313$, $Q_A=2{,}000{,}000$ jet-fuel gallons and $Q_F=42{,}000$ heating-oil gallons/contract. Compute the ratio without early rounding, then the contract count. Separately use the slide's ratio 0.780 to reproduce its count. Report ratios/counts to at least six decimal places and counts to two decimal places; state which route gives 37.14. Check both target futures quantities. [Answer 3](#exercise-source-answer).

<a id="exercise-rounding-prompt"></a>

### Exercise 4 — implement 37 or 38 (outcome 2)

For each whole count, calculate heating-oil quantity and implemented $h_N$. Use $v(h)=0.0263^2+h^2(0.0313^2)-2h(0.928)(0.0263)(0.0313)$ to compare variances, retaining full input precision. Report variance to fourteen decimal places. Explain why the nearest integer solves this particular fixed zero-cost variance problem, and name a condition that would require reconsidering it. [Answer 4](#exercise-rounding-answer).

<a id="exercise-transfer-prompt"></a>

### Exercise 5 — transfer to a different exposure (outcome 2)

A seller has exposure **1,000 units**, with futures size **100 units/contract**. The matched one-month price-change model has $\sigma_S=0.20$ GBP/spot unit, $\sigma_F=0.25$ GBP/futures unit and $\rho=0.8$. Derive the target quantity and count. Compare six versus seven contracts by implemented ratio and variance, state direction and explain why the quantity nearest 1,000 is not automatically best. Exact finite-decimal answers are possible. [Answer 5](#exercise-transfer-answer).

<a id="exercise-sign-prompt"></a>

### Exercise 6 — sign and denominator boundaries (outcome 1)

A price-change model gives $h^*=-0.5$ futures units per exposure unit, $Q_A=800$ exposure units and $Q_F=100$ futures units/contract. Calculate the signed count under this lesson's convention and explain the trade for a seller and for a buyer. If futures-change standard deviation were zero, could you compute the ratio by dividing? If contract size were zero, could the count formula describe a valid contract? [Answer 6](#exercise-sign-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 7 — answer and teach the residual-risk question (outcome 1)

Explain why the airline hedge is imperfect **before rounding**, as asked in the [p20 bottom residual-risk box](../../sources/annotated/lecture-2/page-020.md#lecture-2-p020-airline-residual-question). Distinguish that residual from integer mismatch, relate it to imperfect correlation, explain what quantity “37 contracts” represents, and name two additional risks or missing measurement details. Do not call 0.928 a probability of success. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 8 — audit an attractive but incorrect calculation (outcome 2)

A learner says: “The unrounded calculation is exactly 37.14, so I trade 37.14 contracts. Thirty-seven contracts implement a ratio of exactly 0.780. Correlation 0.928 removes 92.8% of every risk, and the 0.0263 standard deviation must be monthly because the airline buys next month.” Repair all claims. Give the two calculation routes, implemented ratio, conditional residual-variance fraction and limitations. Explain what the current inputs do and do not establish. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 9. Supplemental answers, diagnosis and retries

<a id="exercise-units-answer"></a>

### Answer 1 — distinguish three quantities

Target futures quantity = $0.64\times1{,}000=\mathbf{640}$ futures units. Count = $640/(100\text{ units/contract})=\mathbf{6.4}$ contracts. Six whole contracts represent **600 futures units**, 40 below the target. Units cancel from futures units/exposure unit × exposure units ÷ futures units/contract to contracts. The 0.64 is a sensitivity/quantity multiplier; 640 is underlying quantity. A return slope concerns dimensionless fractional changes, not the source's price changes, so it cannot be inserted without a consistent price/value conversion and sizing convention. The model does not permit a silent switch of units.

**Retry:** if you wrote 640 contracts, multiply it by 100 units/contract and compare with the intended 640 units. If you wrote 0.64 contracts, you omitted both exposure and contract quantities.

<a id="exercise-direction-answer"></a>

### Answer 2 — long purchase hedge

The airline is a future buyer hurt by a rising jet-fuel price. With the supplied positive relationship, heating-oil futures tend to rise too, so a **long** futures gain helps pay the increased fuel bill. Actual asset: jet fuel. Futures underlying: heating oil; this is a cross hedge, not a delivery contract for the airline's exact fuel. Missing details include the statistics' currency/observation interval/sample window and the futures delivery month/deadlines. Any two, explained, satisfy the missing-input task. Neither one-month purchase timing nor contract count supplies those facts.

**Retry:** if you chose short because the airline wants low prices, ask which side gains if the unwanted price rise occurs. If you called it a direct hedge, name the two different commodities before retrying.

<a id="exercise-source-answer"></a>

### Answer 3 — two routes, two intermediate answers

Unrounded input product is $0.928\times0.0263=0.0244064$. Ratio = $0.0244064/0.0313\approx\mathbf{0.779757188498}$; count = that unrounded ratio × $2{,}000{,}000/42{,}000\approx\mathbf{37.131294690400}$, or **37.13** at two decimals. Target futures quantity is about **1,559,514.376997 heating-oil gallons**.

The source displayed route rounds the ratio to **0.780** first. That gives quantity **1,560,000 heating-oil gallons**, then count $1{,}560{,}000/42{,}000=37.142857142857\ldots$, or **37.14** at two decimals. Both lead to nearest whole count 37, but that shared final choice does not make intermediate values equal. Reported decimal tails are approximate; the exact ratios of supplied decimals define the calculations.

**Retry:** if both route results are 37.14, check whether you reused 0.780 in the “unrounded” calculation. Keep the original product/divisor in one expression until the final report.

<a id="exercise-rounding-answer"></a>

### Answer 4 — implemented ratios and variance

Thirty-seven contracts: $37\times42{,}000=\mathbf{1{,}554{,}000}$ heating-oil gallons; $h_{37}=1{,}554{,}000/2{,}000{,}000=\mathbf{0.777}$. Substituting yields **0.00009602508673** in conditional $(\text{U/jet gallon})^2$ units.

Thirty-eight contracts: $38\times42{,}000=\mathbf{1{,}596{,}000}$ heating-oil gallons; $h_{38}=\mathbf{0.798}$. Variance is **0.00009634368004**, larger than for 37. The continuous minimum is **0.00009601763904**, so even the better integer adds some variation.

For fixed inputs the extra variance is a positive coefficient times $(N-N^*)^2$. Thirty-seven is nearer 37.131294690400… than 38, so it minimizes the integer-only quadratic. Position restrictions, trading/funding costs, a different objective, changed exposure or uncertain parameters can require reconsideration. These results do not identify an actual monthly risk forecast without the missing statistical interval information.

**Retry:** if you used 0.780 for either integer, compute represented gallons divided by actual exposure first. If you called the variance total currency squared, remember this formula is per exposure unit; total variance scales by $Q_A^2$.

<a id="exercise-transfer-answer"></a>

### Answer 5 — a feasible seller hedge

Ratio = $0.8\times0.20/0.25=\mathbf{0.64}$. Target quantity = **640 futures units**; target count = **6.4 contracts**. Positive correlation and a future seller call for a **short** hedge.

Six contracts represent 600 units and implement $h=0.6$: variance $0.04+0.0625(0.6)^2-0.08(0.6)=\mathbf{0.0145}$. Seven represent 700 and implement $h=0.7$: variance **0.014625**. Units are $(\text{GBP/spot unit})^2$. The continuous optimum has variance **0.0144**. Six is nearer the model's 640-unit target and has the smaller variance under the assumptions. Matching the full 1,000 units would use $h=1$, whose variance is **0.0225**, larger; physical one-for-one quantity matching is not automatically variance-optimal.

**Retry:** if you chose ten contracts simply to cover 1,000 units, distinguish “amount exposed” from “optimal futures quantity for that exposure.” Recompute the target before comparing feasible counts.

<a id="exercise-sign-answer"></a>

### Answer 6 — signed size and invalid denominators

Signed count $N^*=-0.5\times800/100=\mathbf{-4}$ contracts. For a seller's signed-to-short representation, negative means **long four**. For a buyer's signed-to-long cost-hedge representation, negative means **short four**. Multiplying back gives signed futures quantity −400 units, indicating reversed exposure, not a negative physical volume.

If futures-change standard deviation is zero, correlation is undefined and dividing by it is invalid; a constant futures change cannot reduce the variance of a varying spot change, so the usual quotient does not identify a unique optimum. A zero $Q_F$ is not a valid positive contract size for this formula; division by zero is not a count. With zero commercial exposure there is no exposure to hedge by this sizing task; the per-unit implemented-ratio expression also assumes $Q_A>0$.

**Retry:** if you said “short minus four” without interpretation, state the reference direction, take the magnitude and reverse the side. If you tried a zero denominator, identify the violated assumption before performing arithmetic.

<a id="exercise-explain-teachback-answer"></a>

### Answer 7 — residual risk before and after rounding

**Supplemental model answer:** “Jet fuel and heating oil are related but different assets, and the supplied correlation 0.928 is not a perfect linear relationship. Even a fractional model-optimal position leaves variation in jet-fuel changes not offset by heating-oil futures changes. Rounding to 37 adds a small quantity/sensitivity mismatch on top of that pre-existing residual. Thirty-seven contracts represent 1,554,000 heating-oil gallons of futures exposure, not a physical supply of jet fuel. The airline's actual quantity/date may change and daily settlements can require funding; moreover the slide does not state the statistics' sampling interval or a specific futures expiry. Correlation is a co-movement measure, not a probability that the hedge succeeds.”

A sufficient teach-back distinguishes imperfect-asset/statistical fit from rounding, states direction/quantity correctly, and names two justified limits. **Retry:** if your only explanation is “37 is rounded,” imagine fractional contracts were allowed: would a correlation below one become perfect? No; return to the residual component before discussing integers.

<a id="exercise-apply-teachback-answer"></a>

### Answer 8 — precision and honest risk claims

The full-input route gives approximately **37.131294690400**, not exactly 37.14. The **displayed rounded-ratio** route gives **37.142857142857…**, which reports as 37.14. Under whole-contract constraints neither fractional number is executable as stated. Thirty-seven contracts implement **0.777**, whereas 0.780 is the slide's rounded continuous ratio.

The model's continuous remaining **variance fraction** is $1-0.928^2=\mathbf{0.138816}$, or **13.8816%**. Thus the variance reduction is **86.1184%**, not 92.8% of every risk; the remaining standard-deviation fraction is the square root, approximately **0.372580193**. These statistics do not address every business, funding or extreme-outcome risk. One-month purchase timing does not specify the sampling frequency of 0.0263: compatible units/intervals must be supplied and justified. The existing inputs reproduce a conditional source sizing example; they do not fully specify an executable contract or establish a current risk forecast.

**Retry:** label each number “ratio,” “count,” “implemented ratio,” “variance fraction” or “standard-deviation fraction” before interpreting it. If a statement goes beyond the slide's supplied units/time details, explicitly mark the missing information instead of filling it in from familiarity.

<a id="stop-check"></a>

## Stop and check understanding

Give your own answers to exercises 7 and 8, including why the two calculation routes differ and what the contract quantity represents. A tutor should check unit cancellation, direction, precision, integer comparison and residual-risk reasoning separately. Keep personal responses private; an authored lesson or passing arithmetic test is not learner mastery.

This lesson stops at physical-quantity sizing and the source airline cross hedge. Later portfolio/return-based topics use their own conventions and are not assumed here.

<a id="evidence"></a>

## Source boundaries and accessible presentation

All normalized/raw pages 18–20 and all three original images were inspected. Page 18 displays quantity definitions, a boxed contract-count formula, an equivalent-quantity equation and an important limitation. Page 19 lists the airline scenario/inputs then asks direction. Page 20 stacks ratio and count calculations, a decision box, and a residual-risk question. There are **no source plots, axes, legends or candidate-variance tables**. The tables and precision/variance comparisons here are authored supplemental explanations. Both printed questions receive explicit practice and separate answers.

| Physical page / exact regions | Full normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|
| 18: upper quantities/count; middle equivalent quantity; lower limits | [18](../../sources/annotated/lecture-2/page-018.md) | [Raw 18](../../sources/extracted/lecture-2/page-018.md#page-18) | [Image 18](../../sources/assets/lecture-2/page-018.png) |
| 19: upper scenario/inputs; lower direction question | [19](../../sources/annotated/lecture-2/page-019.md) | [Raw 19](../../sources/extracted/lecture-2/page-019.md#page-19) | [Image 19](../../sources/assets/lecture-2/page-019.png) |
| 20: upper ratio; middle count; lower decision; bottom residual question | [20](../../sources/annotated/lecture-2/page-020.md) | [Raw 20](../../sources/extracted/lecture-2/page-020.md#page-20) | [Image 20](../../sources/assets/lecture-2/page-020.png) |

Canonical source units are verified despite historical draft banners on normalized pages; that does not approve this teaching draft. No registered source conflict affects these nine units. Source omissions about standard-deviation currency/frequency and contract maturity remain explicit. The preceding [variance derivation](lesson-l2-minimum-variance-hedge.md#variance-derivation) supplies the supplemental rounding proof's statistical basis. No restricted textbook, private learner state or unverified transcript is used.
