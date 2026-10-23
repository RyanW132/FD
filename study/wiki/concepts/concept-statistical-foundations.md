# Random changes, expectation, variance, covariance and regression

**SUPPLEMENTAL prerequisite bridge — author draft, awaiting independent review.** This is the mathematics needed for the hedge-variance/regression formulas, not a claim the lecture already teaches a statistics course. Examples, practice and answers below are supplemental. Prerequisite: [signed quantities, ratios and algebra](concept-numeric-foundations.md#numeric-outcomes).

<a id="statistics-outcomes"></a>
## Why this bridge comes before hedge ratios

A hedge is intended to change uncertain outcomes, not merely today's price. After this bridge, you should be able to:

1. Distinguish price levels, price changes, returns, observation times and possible scenarios.
2. Calculate expectation, variance, standard deviation, covariance and correlation for a finite probability model, with correct units and zero-variance restrictions.
3. Expand the variance of X − hY and explain what its cross term measures.
4. Calculate a regression slope/intercept and residuals, and distinguish a fitted relationship from a causal or guaranteed future law.

Readiness check: can you calculate 0.5 × (−2) + 0.5 × 2 = 0? If not, revisit the numeric bridge's signs and weighted average.

<a id="statistics-randomness"></a>
## 1. What is random, and what does time label?

A **random variable** assigns a number to each possible outcome before that outcome is known. For a one-day spot-price change, X might be −£2/unit or +£2/unit. A **probability** p is a nonnegative weight describing likelihood; probabilities over the listed mutually exclusive and exhaustive scenarios sum to 1. This bridge's finite models state those weights explicitly; they are not forecasts of an actual market.

A subscript t labels a time observation. S_t is a price level; ΔS_t = S_t − S_(t−1) is its change over the chosen observation interval. For example, prices £100 then £102 give change +£2 and return (102 − 100)/100 = 0.02 = 2%. A return is dimensionless; a price change retains price units. Do not regress price changes against unmatched returns or use levels where changes are required.

**Discrete time** observes at selected instants t = 0, 1, 2, … (for example daily closes); **continuous time** allows a time argument at any instant in an interval. Neither determines whether a random variable's values are discrete (a finite/countable set) or continuous (a range). A continuously valued price can be sampled once per day. Match both variables' dates and interval lengths. A one-day standard deviation is not automatically a one-year one; no square-root-of-time scaling is assumed here.

<a id="statistics-moments"></a>
## 2. Average outcome, spread and units

Let scenarios be indexed i = 1,…,n, where n is their count, x_i is the value of X in scenario i and p_i its probability. The symbol Σ means “sum the listed terms”; Σ_i p_i x_i means p_1 x_1 + … + p_n x_n. The **expectation** or model mean is

    μ_X = E[X] = Σ_i p_i x_i.

It is a probability-weighted average, not a promise that this value will occur. Deviation from the mean is x_i − μ_X. The average deviation is zero because Σ p_i(x_i − μ_X) = Σ p_i x_i − μ_X Σ p_i = μ_X − μ_X = 0. Cancellation would hide spread, so square deviations first:

    Var(X) = σ_X² = E[(X − μ_X)²] = Σ_i p_i(x_i − μ_X)².
    σ_X = sqrt(Var(X)).

A square z² means z × z; it is nonnegative even for negative z. The square root sqrt(v) is the nonnegative number whose square is v, defined here for v ≥ 0. For example sqrt(4) = 2, not −2. **Variance** has squared units; **standard deviation** σ_X restores X's original units. Zero variance means X is constant across all positive-probability scenarios. Finite means/variances are assumed; some mathematical distributions do not have them. For continuous-valued models, weighted sums become integrals (continuous accumulation of contributions); calculating those integrals is outside this bridge and is not needed for these examples.

<a id="statistics-paired-example"></a>
## 3. A fully worked paired example

Suppose X and Y are matched one-day price changes in GBP per underlying unit, in the same units, with this supplemental model:

| Scenario i | Probability p_i | X | Y | X² | Y² | XY |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 1/4 | −2 | −1 | 4 | 1 | 2 |
| 2 | 1/4 | 0 | −1 | 0 | 1 | 0 |
| 3 | 1/4 | 0 | +1 | 0 | 1 | 0 |
| 4 | 1/4 | +2 | +1 | 4 | 1 | 2 |

E[X] = (−2 + 0 + 0 + 2)/4 = 0 and E[Y] = (−1 − 1 + 1 + 1)/4 = 0, so the table already lists squared deviations. Var(X) = (4 + 0 + 0 + 4)/4 = 2 (GBP/unit)²; σ_X = sqrt(2) ≈ 1.414214 GBP/unit. Var(Y) = 4/4 = 1 (GBP/unit)²; σ_Y = 1 GBP/unit. A zero mean does **not** mean zero risk: the scenarios still differ.

**Covariance** averages paired deviations:

    Cov(X,Y) = E[(X − μ_X)(Y − μ_Y)].

When deviations tend to have the same sign their products are positive; opposite signs give negative products. Here Cov(X,Y) = (2 + 0 + 0 + 2)/4 = 1 (GBP/unit)². Its units are X units times Y units, so its size changes when either unit is rescaled. **Correlation** removes that scale:

    ρ = Cov(X,Y)/(σ_X σ_Y) = 1/(sqrt(2) × 1) ≈ 0.707107.

ρ (rho) is dimensionless and lies between −1 and +1 when defined. Values near either endpoint indicate strong linear co-movement, with direction set by the sign. Zero correlation means no linear co-movement, not necessarily independence: nonlinear dependence can remain. If **either standard deviation is zero, correlation is undefined**, not zero, because the denominator vanishes. Correlation is not causation: shared influences or chance can produce it without one change causing the other.

<a id="statistics-hedge-variance"></a>
## 4. Why the hedge variance has three terms

Let H = X − hY, where h is a fixed chosen exposure multiplier, not itself random in this calculation. With matching price units h is dimensionless; otherwise it must carry whatever units make hY comparable to X. Expectation distributes over sums and fixed multipliers because weighted sums do: E[H] = μ_X − hμ_Y.

Subtract that mean: H − E[H] = (X − μ_X) − h(Y − μ_Y). Write A = X − μ_X and B = Y − μ_Y for brevity. Multiplying out (A − hB)(A − hB) gives A² − 2hAB + h²B². Take the average of each term:

    Var(H) = Var(X) + h² Var(Y) − 2h Cov(X,Y)
           = σ_X² + h²σ_Y² − 2hρσ_Xσ_Y,

where the second line requires both standard deviations positive so that ρ is defined. The first line still works in zero-variance cases. The minus cross term describes offsetting co-movement for h > 0 and positive covariance. Merely adding two variances would ignore this dependence. The square on h is essential: doubling a random exposure multiplies its variance by four.

For the table, Var(H) = 2 + h² − 2h = 1 + (h − 1)². A square cannot be negative, so the minimum is 1 at h = 1. Check directly: H values become −1, +1, −1, +1, with mean 0 and variance (1 + 1 + 1 + 1)/4 = 1. Half the original variance remains; the hedge does not eliminate all risk. h = 0 gives original variance 2. A negative h means adding Y exposure, not the same trading direction as a positive h. General quadratic minimisation is explained in the [local-derivatives bridge](concept-local-derivatives.md#derivatives-minimum), but the completed square already proves this example without calculus.

<a id="statistics-regression"></a>
## 5. Regression: a fitted line and what it leaves out

A **regression line** predicts X from Y as α + hY. The intercept α is the prediction at Y = 0; slope h is the predicted X change for one unit increase in Y. The **residual** ε = X − α − hY is what the line misses. The expression X = α + hY + ε is therefore an accounting decomposition, not automatically a causal law.

Least squares chooses α and h to minimise the average squared residual. For any fixed h, put Z = X − hY. Expanding around its mean shows E[(Z − α)²] = Var(Z) + (E[Z] − α)²: the cross term averages to zero. Thus α = μ_X − hμ_Y is best, leaving Var(X − hY) to minimise. Put v = Var(Y) > 0 and c = Cov(X,Y). Completing the square gives

    Var(X) + vh² − 2ch = Var(X) − c²/v + v(h − c/v)².

Multiplying out the last square recovers the left side; because v > 0, its minimum occurs at h = c/v. Therefore h = Cov(X,Y)/Var(Y), or ρσ_X/σ_Y if correlation is defined. In the table, h = 1/1 = 1, α = 0 − 1 × 0 = 0; residuals are exactly −1,+1,−1,+1. Positive residual means X exceeded the line's prediction, not necessarily that X itself was positive.

For observed pairs rather than known scenario probabilities, use arithmetic sample means x̄ and ȳ (sum divided by observation count n). An intercept-inclusive ordinary least-squares slope is

    h = Σ_i (y_i − ȳ)(x_i − x̄) / Σ_i (y_i − ȳ)²,
    α = x̄ − hȳ.

Equal weighting minimises the sum of squared residuals; dividing that sum by n changes no minimiser. The numerator/denominator share the same covariance/variance normalisation, so it cancels. Common sample covariance/variance estimates divide deviation sums by n − 1 to estimate population quantities under suitable sampling assumptions; our finite model above instead divides by 4 because its four **probabilities** are exactly 1/4. Do not mix n and n − 1 between the slope's two estimates. If all observed Y values are the same, the denominator is zero: a separate slope/intercept is not identified. If Var(Y) > 0 but X is constant, slope is zero even though correlation is undefined.

A later **beta** calculation uses this same slope operation with dimensionless portfolio returns as X and benchmark returns as Y, not the price-change variables in this hedge example. The resulting beta is a return sensitivity estimate; contract sizing is a separate financial step. Historical estimates may change, and least squares does not assert normality, future stability, tradability or transaction-cost-free execution. A minimum within this model is not guaranteed elimination of actual future risk.

<a id="statistics-practice"></a>
## Supplemental graded practice

1. **Identify:** Prices move from £50 to £51 over one day. Give the price change, return and their units. Can you pair this with an unadjusted monthly futures change?
2. **Compute:** X is −2 or +2, each with probability 1/2; Y = 2X. Find both means, variances, standard deviations, covariance and correlation.
3. **Apply:** For that model, choose h to minimise Var(X − hY); verify by computing the two hedged outcomes. Find regression intercept and slope.
4. **Boundary:** Y is always 3 while X varies. What happens to Var(Y), correlation and the regression denominator? Does subtracting a fixed hY change the variance of X?
5. **Teach-back:** Explain why zero average change is not zero variance, why zero correlation does not prove independence, and why fitting price levels is not the same task as fitting price changes.

<a id="statistics-answer-identify"></a>
### Answer 1 — measurement

ΔS = 51 − 50 = +£1 per unit. Return = 1/50 = 0.02 = 2%, dimensionless. Do not pair it with an unmatched monthly interval; align dates and time spans first.

<a id="statistics-answer-moments"></a>
### Answer 2 — moments

E[X] = E[Y] = 0. X² = 4 in both cases, so Var(X) = 4 and σ_X = 2. Y is −4 or +4, giving Var(Y) = 16 and σ_Y = 4. XY is 8 in both cases, so covariance = 8. Correlation = 8/(2 × 4) = 1. If X and Y are matched GBP/unit changes, variances/covariance have (GBP/unit)² units and standard deviations GBP/unit; correlation has none.

<a id="statistics-answer-hedge"></a>
### Answer 3 — perfect linear offset in this toy model

h = 8/16 = 0.5 and α = 0. For (X,Y) = (−2,−4), H = −2 − 0.5(−4) = 0; for (+2,+4), H = 2 − 0.5(4) = 0. Thus variance is zero. Algebra: 4 + 16h² − 16h = 16(h − 0.5)². This perfect two-scenario relation is an assumption of the exercise, not a promise about markets.

<a id="statistics-answer-boundary"></a>
### Answer 4 — a constant regressor

Var(Y) = 0 and σ_Y = 0. Correlation is undefined and the regression slope denominator is zero. Cov(X,Y) = 0 because Y − E[Y] is always zero. Subtracting the constant 3h shifts the mean but leaves Var(X) unchanged. Many intercept/slope pairs give the same fitted constant, so do not report a uniquely estimated slope.

<a id="statistics-answer-teachback"></a>
### Answer 5 — diagnosis and retry

Positive/negative changes can average to zero while their squared deviations stay positive. Correlation measures linear association only; nonlinear association can remain when it is zero. Price levels and changes answer different questions and have different datasets. If your variance is negative, check squaring and parentheses. If your correlation exceeds 1 in magnitude, check matched pairs, units and consistent normalisation. If you called an estimate a causal or future guarantee, replace that claim with “fitted co-movement under these observations/assumptions.” Retry the four-row worked table without a formula sheet and explain each average.

<a id="statistics-evidence"></a>
## Evidence motivation

- Lecture 2 physical p16, middle variance equation: [hedged variance](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-hedged-variance), [original p16](../../sources/assets/lecture-2/page-016.png). The three terms and the negative cross-term sign motivate the supplemental derivation.
- Lecture 2 physical p17, lower regression box: [regression hedge](../../sources/annotated/lecture-2/page-017.md#lecture-2-p017-regression-hedge), [original p17](../../sources/assets/lecture-2/page-017.png). The original has spot **changes** on the left and futures **changes** on the right. Its central “higher correlation” wording is not a blanket statement about signed negative correlations: magnitude and hedge direction must both be considered.

No supplied official statistics exercise/answer is claimed. This bridge does not teach probability estimation, inference, stochastic calculus or all regression diagnostics. Those topics are not assumed by the finite computations here.
