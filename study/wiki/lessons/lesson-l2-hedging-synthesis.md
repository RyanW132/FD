# Connect objectives, direction, basis and hedge sizing

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This final Lecture 2 lesson teaches all six primary recap units on physical page 29. It integrates the earlier authored lessons without treating their existence as independent approval. All expanded explanations, numerical scenarios, practice and answers are **supplemental**; the source recap supplies five summary bullets and a whole-position principle, not these worked case studies. Archived lecture examples are not current contract specifications or advice.

<a id="outcomes"></a>

## Observable outcomes

1. **Explain a complete hedge decision:** distinguish trader motives, identify the commercial exposure and appropriate direction, explain uncertain closing basis and the two distinct ratio conventions, and state what the whole-position/control principle adds. Success requires all six recap ideas, explicit units/horizon/signs, and an explanation of why neither derivative profit nor beta zero proves a safe successful hedge.
2. **Solve and audit integrated cases:** compute a direct hedge's effective cost/receipt, a cross hedge's price-change ratio and feasible contract count, and an index hedge's target and implemented beta. Check both cash legs, rounding and changed-exposure cases. Success requires intermediate arithmetic, a correctly interpreted trade side, model limits and a control response when the original exposure disappears. Finite decimals are exact unless explicitly qualified.

The immediate prerequisite is [hedging controls](lesson-l2-hedging-controls.md). Optional foundations are [signed units](../concepts/concept-numeric-foundations.md#numeric-units), [statistics](../concepts/concept-statistical-foundations.md#statistics-moments), [basis](../concepts/concept-hedging-and-basis.md#hedging-basis) and [ratio versus beta](../concepts/concept-hedge-ratio-and-beta.md). Definitions needed for the cases are repeated below. No later compounding or pricing theory is required.

<a id="decision-order"></a>

## 1. Use an exposure-to-control sequence — supplemental organizing method

A useful order is: **purpose → exposure → direction → instrument/maturity → measurement/size → feasible position → complete outcome → control/reassessment**. Each step answers a different question. Jumping straight to a formula may give the right arithmetic for the wrong exposure.

- Purpose: reduce a named risk, take a market view, or exploit a genuinely matched price inconsistency?
- Exposure: which asset, quantity/value, currency, date and adverse price move?
- Direction: which futures side gains in that adverse move under the assumed relationship?
- Instrument: exact or related underlying; adequate horizon, liquidity and delivery/expiry arrangements?
- Measurement: paired price changes for a quantity hedge, or paired returns for beta? Notional or physical units?
- Feasibility: integer contracts, permitted instruments, position/funding limits and costs?
- Outcome: add the business/portfolio and derivative effects using compatible dates/currency conventions.
- Reassessment: is the exposure still present, and who independently checks the position and exceptions?

**Liquidity** means ability to trade at the needed time without an excessive price effect. A hedge closing date is when the derivative is offset; futures expiry is a contractual deadline that may be later. A related but different underlying creates a **cross hedge**, whose price co-movement is imperfect. A nearer maturity may reduce mismatch, but liquidity and delivery deadlines also matter; contract choice is not determined by a ratio alone. This sequence is a supplemental synthesis, not additional source units or a universal execution recommendation.

<a id="trader-motives"></a>

## 2. First recap: classify the purpose, not just the contract

The source distinguishes hedgers reducing risk, speculators deliberately taking risk and arbitrageurs exploiting price inconsistencies. [L2 p29, upper first bullet; `lecture-2-p029-trader-motives-summary`](../../sources/annotated/lecture-2/page-029.md#lecture-2-p029-trader-motives-summary).

**Supplemental definitions and boundaries:** an exposure is a business or portfolio outcome affected by a price. A hedge is a position intended to offset a specified part of that exposure. A speculator accepts exposure to profit from a view about future prices; a profitable trade does not retroactively become a hedge. Arbitrage in the idealized sense requires compatible offsetting transactions whose complete cash flows exploit an inconsistency without the residual market gamble being disguised as a locked-in profit. Funding, fees, delivery/quality terms and ability to execute all legs matter. A forecast that two prices will converge is not automatically riskless arbitrage.

**Classification examples:** buying futures against a verified future input purchase is a long hedge in the usual positive-co-movement case. Buying the same futures with no offsetting business exposure because the price is expected to rise is speculation. Buying an asset and simultaneously selling an enforceable matching delivery claim can be examined for arbitrage only after matching dates, quantity, rights/obligations and all carrying/transaction costs; merely selling something “expensive” and buying something “cheap” is insufficient. These are supplemental descriptions, not a claim about a current price discrepancy.

Purpose and authority are separate. A deliberately speculative position may be authorized for one trader but prohibited by a hedging-only mandate. A mistaken residual position may create speculative exposure without proving deliberate misconduct. Compare actual complete exposure and documented authority rather than infer intent from profit alone.

<a id="direction"></a>

## 3. Second recap: the adverse commercial move determines direction

The source says a long futures hedge protects a future purchase and a short hedge a future sale. [L2 p29, upper second bullet; `lecture-2-p029-hedge-direction-summary`](../../sources/annotated/lecture-2/page-029.md#lecture-2-p029-hedge-direction-summary).

A **long** futures position gains as its quote rises; a **short** gains as its quote falls. A purchaser fears a higher purchase price, so a positively related long gain can help pay the larger bill. A seller fears a lower selling price, so a positively related short gain can supplement lower receipts. This familiar rule assumes positive price co-movement and appropriate size. Negative estimated co-movement can reverse the fitted futures side, as the ratio section explains. “I prefer cheap inputs, therefore I short futures” confuses a desired commercial price with the side that offsets an unwanted price rise.

<a id="cash-conventions"></a>

### Build the two cash-flow identities — supplemental derivation

Choose one currency and compatible quantity definitions. Let $Q>0$ be exposure units, $q>0$ underlying units per futures contract, $n\geq0$ the count on the stated long/short side, $S_c$ the commercial spot price at hedge close, and $F_0,F_c$ the same selected futures contract's opening/closing quotes. All prices are currency per underlying unit. The subscript $c$ is the close date, not the later futures expiry $T$. Delta means final minus initial: $\Delta F=F_c-F_0$.

Cumulative nominal futures gains are

$$G_L=nq(F_c-F_0),\qquad G_S=nq(F_0-F_c)=-G_L.$$

The subscripts $L,S$ mean long and short gains, not asset names. The buyer's **net purchase cost** is $C=QS_c-G_L$: gains help pay the bill. The seller's **net sale proceeds** are $P=QS_c+G_S$: gains add to receipts. Negative gains are losses, so subtracting a negative buyer gain increases cost. $C$ and $P$ are opposite business roles, not the same signed cash flow or full business profit.

These sums assume the commercial transaction and hedge close together, ignore financing of daily settlements, and omit fees/taxes/default and other business income/expense unless specified. They do not say all cash arrives on the closing date. If currencies, quantities or dates do not match, convert/restate the model explicitly rather than apply these sums unchanged.

<a id="basis-risk"></a>

## 4. Third recap: uncertainty survives through the closing basis

The source says basis risk arises because closing basis is uncertain. [L2 p29, central third bullet; `lecture-2-p029-basis-risk-summary`](../../sources/annotated/lecture-2/page-029.md#lecture-2-p029-basis-risk-summary).

Define **basis** at any date $t$ as spot minus selected futures price in compatible quote units:

$$b_t=S_t-F_t.$$

A positive basis means spot exceeds futures. **Strengthening** means $b_t$ increases numerically, including becoming less negative; **weakening** means it decreases. An observed opening basis does not determine $b_c$ at hedge close. A hedge can offset much of a common price move while the difference between its two prices still changes.

For a one-unit-for-one-unit hedge, $nq=Q$. Divide the buyer cost and seller proceeds by $Q$ and rearrange:

$$\frac{C}{Q}=S_c-(F_c-F_0)=F_0+(S_c-F_c)=F_0+b_c,$$
$$\frac{P}{Q}=S_c+(F_0-F_c)=F_0+b_c.$$

The same effective **price** appears, but a larger value raises a buyer's cost and raises a seller's receipt. Thus a stronger closing basis, with opening quote fixed, hurts the buyer and helps the seller; a weaker one has the reverse effect. These identities require the explicit matching quantity/timing and zero-cost/financing assumptions above. For arbitrary $nq/Q$, the coefficient on the futures gain is not one; do not reuse $F_0+b_c$ unchanged.

Convergence to zero basis is qualified: under the model, the same referenced deliverable and delivery terms can force spot/futures convergence at **contract expiry/delivery**. A hedge closed earlier need not have zero basis. Different grade, location or underlying in a cross hedge need not converge even then. Convergence is not a promise that every business exposure becomes riskless.

<a id="basis-example"></a>

### Direct hedge worked from both viewpoints — supplemental

Use GBP throughout, **1,000 exposure units**, **100 units/contract**, opening quote **50 GBP/unit**, closing spot **54** and futures **53 GBP/unit**. Ten contracts match quantity exactly. The business date equals hedge close; expiry may be later. No fees, funding or other cash flows are included.

1. Closing basis: $54-53=\mathbf{1}$ GBP/unit.
2. Buyer: purchase bill 54,000 GBP; ten-long gain $10\times100\times(53-50)=3{,}000$ GBP. Net cost **51,000 GBP**, or **51 GBP/unit**.
3. Seller: sale receipts 54,000 GBP; ten-short gain $10\times100\times(50-53)=-3{,}000$ GBP. Net proceeds **51,000 GBP**, or **51 GBP/unit**.
4. Independent identity check: $F_0+b_c=50+1=51$ GBP/unit.

The short loses in this row, but the seller also sells at a higher price. Derivative loss alone does not reveal combined risk performance. Relative to a hypothetical zero closing basis the effective price is one GBP/unit higher, not fixed at the original futures quote 50.

Keep $F_0=50$, $F_c=53$ and quantity unchanged, but let closing spot be 55 or 52. Basis is then **2** or **−1**; effective price is **52** or **49 GBP/unit**, making total cost/proceeds **52,000** or **49,000 GBP**. Moving from basis 1 to 2 strengthens it by 1, increasing total by 1,000; moving from 1 to−1 weakens it by 2, decreasing total by 2,000. Lower cost benefits the buyer; lower proceeds hurt the seller. These are conditional comparisons, not price forecasts.

<a id="hedge-ratio"></a>

## 5. Fourth recap: minimum variance specifies a sensitivity, not a contract count

The source recap gives $h^*=\rho\sigma_S/\sigma_F$, with standard deviations of matched spot/futures **price changes** and their correlation. [L2 p29, central fourth bullet; `lecture-2-p029-hedge-ratio-summary`](../../sources/annotated/lecture-2/page-029.md#lecture-2-p029-hedge-ratio-summary).

Define the foundations before using that quotient:

- $X=\Delta S$ is the change in exposure spot price; $Y=\Delta F$ the paired change in selected futures price over the **same interval**. Each retains currency per its underlying unit. A return instead divides a change by its starting price/value and is dimensionless.
- A **mean** is the average under stated probabilities or a sample convention. A **variance**, written $\operatorname{Var}$, averages squared deviations from the mean. **Standard deviation** is its nonnegative square root, restoring the original price units; write these $\sigma_S,\sigma_F$.
- **Covariance** $\operatorname{Cov}(X,Y)$ averages products of paired deviations; positive values indicate same-direction deviations on average. **Correlation** $\rho$ divides covariance by both standard deviations; it is dimensionless between−1 and+1 when both deviations are positive. It is neither a causal explanation nor a success probability.
- $h$ is futures-underlying units per exposure unit, not exchange contracts. In a seller's positive-exposure representation, hedged change per exposure unit is $H=X-hY$; positive $h$ is implemented by a short. In a buyer's cost-change representation, the same subtraction is implemented with a long gain offsetting cost. A negative $h$ reverses the respective side.

<a id="variance-bridge"></a>

### Why this ratio minimizes the stated variance — supplemental bridge

Hold the ratio/statistical inputs fixed. Subtract the mean of $H$ and write the centered changes as $A=X-E[X]$, $B=Y-E[Y]$, where $E$ means the specified average. Then $H-E[H]=A-hB$. Multiplying the two brackets gives $A^2-2hAB+h^2B^2$. Averaging yields

$$v(h)=\operatorname{Var}(H)=\sigma_S^2+h^2\sigma_F^2-2h\rho\sigma_S\sigma_F.$$

There are **two** equal cross products, giving−2, and scaling a deviation by $h$ scales its square by $h^2$. To see the minimum without new calculus, put $a=\sigma_F^2>0$ and $k=\operatorname{Cov}(X,Y)$. Completing the square means rearranging into a nonnegative square plus a constant:

$$v(h)=a(h-k/a)^2+\sigma_S^2-k^2/a.$$

Expansion recovers $ah^2-2hk+\sigma_S^2$. Since $a$ is positive, the square is smallest at $h=k/a$. Hence

$$h^*=\frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(Y)}
=\rho\frac{\sigma_S}{\sigma_F}.$$

The covariance form requires positive futures variance; the correlation form additionally requires positive spot deviation. A constant futures change has zero variance and cannot provide a uniquely identified variance-minimizing ratio through this division. With zero covariance and positive futures variance, $h^*=0$. Negative correlation implies a negative ratio, reversing the normal hedge side. A ratio can exceed one: it is not a probability or a compulsory percentage between zero and one.

The covariance/variance must use the same paired observations, interval, currency/unit conventions and sample normalization. A regression of spot changes on futures changes with an intercept estimates this slope under least squares; the intercept is the fitted change at zero futures change and the residual is what the fitted line misses. Neither a historical fit nor variance minimization promises stable future correlation, zero residual risk, maximum profit or affordable margin funding.

<a id="quantity-rounding"></a>

### Convert ratio to quantity, then feasible contracts

Let $Q_A>0$ be actual exposure quantity and $Q_F>0$ underlying quantity represented by one futures contract. Desired futures quantity is $h^*Q_A$. Dividing by per-contract quantity gives

$$N^*=h^*\frac{Q_A}{Q_F},\qquad h_N=\frac{NQ_F}{Q_A}.$$

$N^*$ is the continuous model count; $N$ the selected whole count in the chosen side convention; $h_N$ the actually implemented quantity ratio. Units cancel: futures units/exposure unit × exposure units ÷ futures units/contract = contracts. Fractional mathematical counts are not automatically tradable. Do not put a return beta into this physical price-change formula.

**Supplemental cross-hedge case:** a buyer will purchase **1,000 units of input A in one month** and uses futures on related input B. Assume both price series use GBP per compatible underlying unit, with paired one-month change standard deviations $\sigma_S=0.20$, $\sigma_F=0.25$ and correlation $\rho=0.8$. These are supplied hypothetical interval statistics, not estimated from the one realized path below. Contract size is **100 B units**. No costs, funding or position constraints other than whole contracts are included.

1. Ratio $h^*=0.8(0.20/0.25)=\mathbf{0.64}$ B units per A unit.
2. Target quantity $0.64\times1{,}000=\mathbf{640}$ B units.
3. Target count $640/100=\mathbf{6.4}$ contracts; positive correlation and a purchase call for **longs**.
4. Six longs represent 600 B units, $h_6=0.6$; seven represent 700, $h_7=0.7$. They are 40 below or 60 above the 640-unit target, not “40 or 60 unhedged A units.”
5. The variance function is $v(h)=0.04+0.0625h^2-0.08h=0.0144+0.0625(h-0.64)^2$ in squared GBP/A-unit units. Six gives **0.0145**, seven **0.014625**, and the continuous minimum is **0.0144**.

For fixed inputs and this zero-cost quadratic, substituting $h_N=NQ_F/Q_A$ makes the extra variance a positive constant times $(N-N^*)^2$. The nearest integer therefore has the smaller variance: **six longs** here. At an exact half-integer the neighbors tie; costs/constraints/another objective can change the decision. This proof concerns a specified variance objective, not a universal rounding rule.

For a supplemental realized path, let A's spot price rise by **0.30 GBP/A unit** while B futures rises by **0.40 GBP/B unit** over the hedge interval. The unhedged purchase-cost increase is **300 GBP**. Six longs gain $6\times100\times0.40=\mathbf{240}$ GBP, leaving a combined cost increase **60 GBP**. The continuous 640-unit hedge would gain 256 and leave 44; seven would gain 280 and leave 20. Seven happens to offset this **one path** more closely, but six has lower variance under the supplied distributional model. Risk optimization before outcomes and best ex-post performance on one path are different questions.

Even the continuous minimum leaves residual variance: $0.20^2(1-0.8^2)=0.0144$. Fractional contracts would not eliminate this cross-asset mismatch. The remaining variance is 36% of 0.04, a 64% modeled variance reduction, not an 80% probability of success. These figures do not remove basis, quantity/date changes, grade/location, costs, funding or performance risks.

<a id="index-hedge"></a>

## 6. Fifth recap: index futures change systematic market exposure

The source states that index futures can change a portfolio's systematic market exposure. [L2 p29, lower fifth bullet; `lecture-2-p029-index-hedge-summary`](../../sources/annotated/lecture-2/page-029.md#lecture-2-p029-index-hedge-summary).

A **portfolio** is a collection of investments; an **index** measures a specified share portfolio's performance in index points. A point level is not a currency price for an entire futures contract. A simple return is change divided by starting value/level. **Beta** is the dimensionless fitted sensitivity of portfolio excess returns to the chosen market's excess returns, using consistent paired intervals, currency and dividend/income treatment. “Excess” subtracts the same-interval risk-free reference return. Systematic exposure is the component related to that market factor; the residual can contain company/sector-specific and omitted-factor risks. Beta is not total volatility and beta zero is not risk-free.

For clarity, let $V_A>0$ be initial portfolio currency value, $F_0>0$ the initial index-futures quote in points and $m>0$ its currency-per-point-per-contract multiplier. One contract's notional is $V_F=mF_0$, currency per contract. Notional scales price sensitivity; it is **not** margin collateral, not the current value of a newly initiated futures contract (often near zero), and not an upfront purchase of the entire index basket.

Let $\beta_P$ be initial estimated beta and $\beta_T$ desired beta. For an isolated factor change $u$, portfolio market money change is approximately $\beta_PV_Au$. Under the approximation that futures notional supplies unit market-return sensitivity, a count $N$ **signed to short** contributes $-NV_Fu$. Positive $N$ means short; negative means buy its magnitude. Set the combined coefficient equal to $\beta_TV_A$:

$$\beta_PV_A-N^*V_F=\beta_TV_A,\qquad
N^*=(\beta_P-\beta_T)\frac{V_A}{V_F}.$$

Back-check any implemented signed integer with

$$\beta_{\mathrm{after}}=\beta_P-N\frac{V_F}{V_A}.$$

Normalize by the stated original capital, not by adding futures notional to invested cash. These are **return-sensitivity/value** formulas, not the price-change/physical-quantity formulas above. Fixed beta/current values, a suitable market proxy, matched factor sensitivity and omitted costs/funding are assumptions; values and estimates can change. A target beta is not necessarily a minimum-total-risk solution.

<a id="index-example"></a>

### New portfolio case with a cash-leg and rounding audit — supplemental

Portfolio **USD 2 million**, beta **1.10**, target **0.40**. Hypothetical futures quote **4,000 points**, multiplier **USD 25/point/contract**. These supplied hypothetical terms are not a current specification. Compute:

1. $V_F=4{,}000\times25=\mathbf{100{,}000}$ USD/contract.
2. Value ratio $V_A/V_F=20$ contracts per unit beta.
3. Beta reduction $1.10-0.40=0.70$; count $0.70\times20=\mathbf{14}$, meaning **short 14**.
4. Each contract removes beta $100{,}000/2{,}000{,}000=0.05$; actual beta $1.10-14(0.05)=\mathbf{0.40}$.

**Cash-leg check:** for this hypothetical interval only, set risk-free return, separate income/dividends, intercept and residual to zero and assume futures quote return matches the market factor. At a **−2%** factor move, portfolio market return is−2.2%, losing **USD 44,000**. Futures falls 80 points to**3,920**, so 14 shorts gain $14\times25\times80=\mathbf{28{,}000}$ USD. Combined loss **USD 16,000** is−0.8% of original capital, matching $0.40(-2\%)$. It is not zero because the desired beta was not zero. Any residual return would add to this result rather than vanish.

**Different target, same portfolio:** target 1.30 gives $(1.10-1.30)20=-4$, so **buy four**, raising beta by 0.20 to 1.30. Negative count means direction, not negative physical contracts.

**Integer transfer:** target 0.43 gives $N^*=(1.10-0.43)20=13.4$. Thirteen shorts implement beta**0.45**, error+0.02;14 implement**0.40**, error−0.03. If the stated objective is minimize absolute beta-target error under fixed inputs and no costs, choose 13; do not report its beta as exactly 0.43. This is a different objective from the cross-hedge variance comparison, even though both simple cases lead to nearest-integer arithmetic.

<a id="whole-position"></a>

## 7. Sixth recap: judge the complete position, not a profitable derivative

The source's core principle evaluates how a hedge changes risk of the **complete position**, not whether the derivative alone makes money. [L2 p29, bottom core-principle box; `lecture-2-p029-whole-position-principle`](../../sources/annotated/lecture-2/page-029.md#lecture-2-p029-whole-position-principle).

A complete evaluation names the baseline and objective. For the buyer, compare net purchase-cost uncertainty with the unhedged bill; for the seller, compare sale proceeds; for the portfolio, compare the intended beta or other risk measure and remaining residual. Full business profit also needs sales revenue, operating expenses, derivative costs and consistent cash-flow timing. A cost-stabilizing hedge can give up favorable outcomes and incur fees while meeting its risk objective. It need not maximize expected profit or produce the best outcome in every realized scenario.

**Connect the cases:** the seller's short lost 3,000 GBP in the basis example while sale receipts were 54,000 and combined proceeds 51,000. The cross hedge left 60 GBP of additional cost on one path but reduced modeled variance; choosing the best path after seeing it is not the original optimization task. The index shorts gained 28,000 USD while the portfolio lost 44,000; “the hedge made 28,000” alone conceals a combined 16,000 loss intentionally consistent with target beta 0.40.

<a id="changed-exposure"></a>

### Reassessment after the exposure disappears — supplemental control case

Suppose the entire USD 2 million share portfolio is sold and the 14 shorts are mistakenly left open. Measure subsequent changes from the reassessment quote 4,000; assume the sale/quote choices make earlier gains/losses irrelevant to this new-period sensitivity calculation, not erased from records. There is now no retained share portfolio exposure in this example to offset those shorts.

If the quote subsequently rises 2% to 4,080, the shorts lose $14\times25\times80=\mathbf{28{,}000}$ USD. If it falls 2% to 3,920 they gain 28,000. Both are stand-alone derivative outcomes relative to the sold portfolio. The remaining short notional magnitude is **USD 1.4 million** at the reassessment quote. Do **not** divide by a zero remaining share value to claim a meaningful new portfolio beta: the original normalization no longer applies. Cash proceeds from the sale need their own declared treatment; they do not automatically reproduce the sold equity market exposure.

The control response is to verify sale and current holdings, reconcile actual contracts/settlements with independent records, recompute complete exposure, check the mandate and escalate for authorized reduction/closure or a separately approved purpose. A hedge-only mandate does not silently authorize a retained market short. Earlier profits do not excuse it; earlier losses do not disappear when risk is closed. This mirrors the controls lesson's canceled-purchase problem while keeping beta/value and physical-unit conventions distinct.

<a id="limits"></a>

## 8. A final boundary checklist — supplemental

- **Direction:** standard long-buyer/short-seller rules assume suitable positive co-movement. A fitted negative ratio reverses the side; an unexplained negative count is not a complete decision.
- **Basis:** specify spot minus which futures, currency/quantity units, close date and contract expiry. Do not assume cross-asset or early-close convergence.
- **Statistics:** paired price changes and return beta use different measurement conventions. Estimates may change; correlation is not causation. Zero variance forbids the relevant division.
- **Sizing:** distinguish ratio, underlying quantity, count, notional, margin and current contract value. Check integer implemented sensitivity, not just rounded count.
- **Risk objective:** minimum variance, absolute target-beta error, a cash-budget ceiling and maximum expected profit are different problems. A single favorable path does not validate the original model.
- **Whole position and time:** report business and derivative legs, costs and residual risks. A final offset does not fund interim margin. Closing a position affects future risk, not historical accounting.
- **Authority/evidence:** confirm the exposure still exists, and use actual instrument/position data with independent valuation, reporting and reconciliation. Source principles and archived examples are not current regulatory/exchange claims. Historical estimates are evidence to qualify, not future guarantees.

<a id="practice"></a>

## 9. Progressive supplemental practice — attempt before answers

<a id="exercise-motives-prompt"></a>

### Exercise 1 — classify and justify (outcome 1)

Classify buying futures for a verified future purchase, buying with no offsetting exposure to bet on a price rise, and a claimed “arbitrage” based only on hoped-for convergence of two imperfectly related prices. What additional checks would a genuine matched-price inconsistency require? Can a profit establish authorization? [Answer 1](#exercise-motives-answer).

<a id="exercise-direction-prompt"></a>

### Exercise 2 — explain side and accounting (outcome 1)

A future seller fears a falling spot price and considers positively related futures. Choose direction and derive the short gain and net sale proceeds with quantities. Contrast the buyer cost sign. Explain the qualifications for negative correlation and different hedge/expiry dates. [Answer 2](#exercise-direction-answer).

<a id="exercise-basis-prompt"></a>

### Exercise 3 — compute and interpret closing basis (outcome 2)

Use 1,000 units, ten 100-unit contracts, opening futures 50, closing futures 53 and spot 54 GBP/unit. Compute buyer cost and seller proceeds from separate legs and then $F_0+b_c$. Repeat for spot 55 and 52. State who benefits from a stronger versus weaker basis, and why the identity does not apply unchanged to six contracts. [Answer 3](#exercise-basis-answer).

<a id="exercise-cross-prompt"></a>

### Exercise 4 — size a cross hedge before observing the path (outcome 2)

Use the supplemental one-month price-change inputs 0.20,0.25, correlation 0.8, exposure 1,000 A units and 100 B units/contract. Find ratio, target quantity/count, actual ratios for six/seven and their variances. Choose under the stated objective. For realized changes+0.30 spot and+0.40 futures, compare residual purchase-cost increases for continuous, six and seven contracts. Why does the best realized offset not settle the variance choice? [Answer 4](#exercise-cross-answer).

<a id="exercise-index-prompt"></a>

### Exercise 5 — target beta and feasible size (outcome 2)

Use USD 2 million, beta 1.10, futures 4,000 and multiplier 25. Compute notional and trades for targets 0.40 and 1.30. For target 0.43 compare 13 and 14, implemented beta and errors. Check the target 0.40 cash legs at a−2% factor move under the stated zero-baseline/residual assumptions. [Answer 5](#exercise-index-answer).

<a id="exercise-boundaries-prompt"></a>

### Exercise 6 — repair convention errors (outcome 1)

A learner says: “Correlation 0.8 removes 80% of all risk. The ratio 0.64 means 0.64 contracts. Beta is the same ratio. A beta-zero portfolio must earn the risk-free return, and basis must be zero whenever I close.” Repair each statement. Include what changes if futures-change standard deviation is zero or covariance is negative. [Answer 6](#exercise-boundaries-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 7 — explain all six recap ideas (outcome 1)

Teach a beginner how trader purpose, commercial direction, closing basis, price-change hedge ratio, index beta and whole-position evaluation fit into one decision sequence. Include one limit of each sizing convention and the independent-control question when exposure changes. Do not merely recite six labels. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 8 — audit the complete position after a sale (outcome 2)

A manager sold all shares from the index example but retained 14 shorts at reassessment quote 4,000. Compute residual notional and the next-period result for quote 4,080 or 3,920. Can you compute a normalized beta using zero remaining share value? Explain the exposure/control problem, the correct evidence to obtain and why a derivative gain or earlier successful hedge does not settle it. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 10. Separate supplemental answers and diagnosis

<a id="exercise-motives-answer"></a>

### Answer 1

The verified purchase case is a **hedge** if its side/size/terms actually offset that exposure. The unoffset bet on rising prices is **speculation**. Hoped-for convergence of imperfectly related prices is not established riskless arbitrage: residual basis/price risk may remain. A proposed matched inconsistency requires complete compatible cash flows, quantity, asset/quality, dates, funding/carrying and transaction costs, plus ability to execute and perform all legs. Profit does not establish either motive or authorization; compare the actual whole position and mandate.

**Retry:** identify the pre-existing commercial exposure or genuinely matched offset before classifying. A contract name or favorable outcome is insufficient.

<a id="exercise-direction-answer"></a>

### Answer 2

A seller normally **shorts** positively related futures. Gain $G_S=nq(F_0-F_c)$ is positive when the quote falls; add it to sale receipts: $P=QS_c+G_S$. A buyer normally goes long and subtracts $G_L=nq(F_c-F_0)$ from its bill, $C=QS_c-G_L$. Negative gains are losses: the buyer subtracts a negative amount, increasing cost. Negative fitted co-movement can reverse the futures side. Hedge close is a chosen offsetting date and need not be contract expiry; early-close basis need not be zero.

**Retry:** test the adverse commercial move before inserting numbers. Explain whose cost or receipt the formula represents.

<a id="exercise-basis-answer"></a>

### Answer 3

At spot 54/futures 53, basis **1 GBP/unit**. Buyer bill **54,000**, long gain **3,000**, net cost **51,000 GBP**. Seller receipts **54,000**, short gain **−3,000**, net proceeds **51,000 GBP**. Both effective prices are **51 GBP/unit =50+1**, but one is a cost and the other a receipt.

Spot 55 gives basis**2**, totals**52,000**; spot 52 gives basis**−1**, totals**49,000 GBP**. Relative to the first row, strengthening by 1 raises totals 1,000 and helps the seller/hurts the buyer; weakening by 2 lowers totals 2,000 and helps the buyer/hurts the seller. With six contracts the futures quantity is 600, not 1,000. At the original spot 54/futures 53, long gain is 1,800 and buyer cost**52,200 GBP**, or 52.2/unit; the seller's short loss is 1,800, giving the same 52,200 proceeds. This is **not**50+1 because the quantity coefficient is 0.6 rather than 1.

**Retry:** multiply each per-unit gain by actual futures quantity, not automatically the commercial quantity. Label totals versus per-unit effective prices.

<a id="exercise-cross-answer"></a>

### Answer 4

Ratio **0.64 B/A units**; target **640 B units**; continuous count **6.4 longs**. Six implement **0.6**, seven **0.7**. Covariance is $0.8(0.20)(0.25)=0.04$; variance function $0.04+0.0625h^2-0.08h$. Its minimum is **0.0144** at 0.64; six give **0.0145**, seven **0.014625**, all in squared GBP/A-unit units. Choose **six longs** under fixed zero-cost variance minimization with whole contracts. Quantity mismatches are 40 below/60 above the modeled B-unit target.

On the specified path, unhedged cost increase is **300 GBP**. Continuous 640-unit futures gain **256**, leaving **44**; six gain **240**, leaving **60**; seven gain **280**, leaving **20 GBP**. Seven looks best on this one realized path, but variance compares dispersion over the assumed possible changes, not the path chosen after observation. Remaining continuous variance is 36% of 0.04, hence modeled variance reduction 64%, not a probability of success. Fees, changed statistics and constraints can alter the decision.

**Retry:** if you choose seven solely because 20 is smaller than 60, separate the before-outcome objective from the observed path. If you wrote 640 contracts, divide by contract quantity.

<a id="exercise-index-answer"></a>

### Answer 5

Notional **USD 100,000/contract** and value ratio**20**. Target 0.40: $(1.10-0.40)20=\mathbf{14}$, **short 14**; beta back-check 1.10−0.70=**0.40**. Target 1.30: count**−4**, **buy four**; beta 1.10+0.20=**1.30**. Target 0.43: continuous count**13.4**. Thirteen shorts give**0.45**, error**+0.02**;14 give**0.40**, error**−0.03**. Thirteen is nearer under the stated absolute-error objective, not exact 0.43.

At−2% factor move with zero baseline/income/residual assumptions, portfolio return−2.2% gives **−44,000 USD**. Futures quote falls 80 to**3,920**;14 shorts gain **28,000 USD**. Net **−16,000 USD** is**−0.8%**, equal to 0.40×−2%. Residual, basis, funding and changing beta are not eliminated. The multiplier, not deposited margin or a zero initial contract value, supplies the notional.

**Retry:** check the sign by asking whether the trade should add or subtract market sensitivity. Then recompute implemented beta from the actual integer count.

<a id="exercise-boundaries-answer"></a>

### Answer 6

Correlation 0.8 describes linear co-movement, not 80% elimination of all risk. In the specified ideal cross model, squared correlation 0.64 corresponds to 64% modeled variance reduction; remaining variance 0.0144 is 36% of the initial 0.04. Ratio 0.64 is futures units per exposure unit; with the specified quantities it gives 6.4 mathematical contracts, not 0.64 contracts. Beta fits **returns** to market returns, while that ratio fits **price changes**; use consistent value versus physical-unit sizing.

Beta zero removes only estimated market sensitivity; residual returns, model error and financing can remain, so no realized risk-free return is guaranteed. Basis convergence concerns the same deliverable at relevant expiry/delivery, not any hedge-close date or cross asset. With zero futures-change standard deviation, correlation and the quotient are undefined; a constant futures change cannot remove varying spot-change variance through that division. Negative covariance with positive futures variance gives negative $h^*$, reversing the usual seller-short/buyer-long sides. Ratios may exceed one; historical fits need not persist.

**Retry:** identify exactly what each number measures before converting it into a percentage or trade. Never replace an undefined correlation with zero merely to make a formula run.

<a id="exercise-explain-teachback-answer"></a>

### Answer 7 — sufficient connected explanation

“First identify whether the objective is offsetting a business risk, deliberately taking a view or exploiting a genuinely matched inconsistency. Name the exposure and its adverse move; with positive co-movement, buy futures for a future purchase and short for a future sale. Even matched quantities leave uncertainty in closing spot-minus-futures basis. A cross hedge's minimum-variance price-change ratio depends on matched covariance/variance; multiply it by exposure quantity and divide by contract quantity, then assess feasible integers and residual risk. A portfolio beta instead measures return sensitivity: use full index-contract notional and a declared signed target-beta formula, not the physical ratio. Evaluate business/portfolio and derivative together with costs and settlement timing. A derivative loss can be a successful offset, and a derivative gain can conceal a bigger business loss. Finally verify the exposure still exists and have independent controls compare actual positions with current evidence and authority.”

The explanation must include both sizing conventions and their limitations, not just the six recap titles. **Retry:** use one numerical case to illustrate a distinction you omitted, then explain it again without relying only on symbols.

<a id="exercise-apply-teachback-answer"></a>

### Answer 8

Remaining short notional magnitude is $14\times25\times4{,}000=\mathbf{1{,}400{,}000}$ USD. At 4,080, shorts lose **28,000 USD**; at 3,920 they gain **28,000 USD**. With no retained shares there is no corresponding equity market leg in this example. Dividing by zero remaining share value is invalid; no meaningful original-style portfolio beta follows. The sale cash needs separately defined exposure/return treatment, not assumed equity sensitivity.

Verify the sale and current holdings, obtain independent broker/settlement and internal position records, compare with the mandate/current exposure and escalate for an authorized change or separately approved purpose. The old hedge's label and profits do not authorize a new stand-alone short. Removing future exposure does not erase earlier gains/losses or cash obligations. A profitable residual position still requires truthful reporting and independent investigation.

**Retry:** write “what commercial/portfolio exposure remains now?” before discussing the derivative's profit. If the answer is none in this example, stop using the old portfolio value as though the shares were still held.

<a id="evidence"></a>

## Source presentation, evidence and endpoint

The full normalized/raw page 29 and original PNG were inspected. It has five bullet recap statements and a bottom core-principle box; the fourth bullet contains the hedge-ratio formula. There is no source numerical case, scenario table, plotted graph or axis on this page. Every worked table, number and solution here is an explicitly supplemental integration of the prior concepts, not invented original slide data.

[Full normalized 29](../../sources/annotated/lecture-2/page-029.md) · [Unchanged raw 29](../../sources/extracted/lecture-2/page-029.md#page-29) · [Original image 29](../../sources/assets/lecture-2/page-029.png).

All six primary source units are individually cited above and verified in canonical source metadata, despite older normalized draft banners; source QA does not approve this lesson. No registered issue affects these six units. No private learner material or restricted textbook was used. Finish both teach-backs and the three quantitative exercises with units, model assumptions and separate cash legs. Keep learner responses private. This is the endpoint of the Lecture 2 author slice, not a declaration of teaching approval, taught coverage or learner mastery.
