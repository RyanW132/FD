# Minimum variance, regression and beta hedging

**Source-grounded on-demand reference — author draft; independent review pending.** This is a formula/interpretation lookup, not the derivation lessons. Examples and self-check are supplemental. Prerequisites: [statistics](concept-statistical-foundations.md#statistics-moments), [quadratic minimisation](concept-local-derivatives.md#derivatives-minimum), and [hedge direction/basis](concept-hedging-and-basis.md#hedging-direction).

<a id="hedgeratio-ratio"></a>
## A price-change hedge ratio is not a contract count

Over a specified common interval, ΔS and ΔF mean spot and futures **price changes**, not price levels or percentage returns. For a positive spot exposure, write hedged change per spot unit as ΔV_H = ΔS − hΔF. Here h is futures-underlying units per spot-underlying unit; a positive h subtracts futures exposure (a short hedge), while a negative h adds it. With identical quantity conventions h is dimensionless.

Let σ_S and σ_F be the standard deviations of those matched changes: measures of spread in their respective currency/underlying-unit quotations. **Variance** is standard deviation squared. Let ρ (rho) be their dimensionless correlation, measuring linear co-movement, with −1 ≤ ρ ≤ 1 when defined. The minimum-variance ratio is

    h* = ρ σ_S/σ_F = Cov(ΔS, ΔF)/Var(ΔF).

The star marks the model's chosen optimum; Cov means covariance, the average product of deviations from the means. The covariance/variance expression requires Var(ΔF) > 0. The correlation expression additionally requires both standard deviations positive; if either is zero, correlation is undefined. Correlation is not causation. Use matched observation intervals, currencies and unit definitions; an annual return standard deviation cannot silently replace a daily price-change standard deviation. The [statistics bridge](concept-statistical-foundations.md#statistics-hedge-variance) supplies the expansion, and the [local-derivative bridge](concept-local-derivatives.md#derivatives-minimum) explains why positive quadratic curvature gives a minimum.

Sources: L2 p16 [hedged change](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-hedged-change) and [minimum ratio](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-minimum-variance-ratio); p17 [symbols](../../sources/annotated/lecture-2/page-017.md#lecture-2-p017-hedge-ratio-symbols) and [interpretation](../../sources/annotated/lecture-2/page-017.md#lecture-2-p017-hedge-ratio-interpretation). The source's “higher correlation” language must not be treated as a universal ordering over negative correlations: magnitude affects hedge effectiveness, while sign affects direction.

In a fitted line ΔS_t = α + hΔF_t + ε_t, t labels observations, α is the intercept, and ε_t is the unexplained residual; α and ε_t have the same currency-per-spot-unit units as ΔS_t. An intercept-inclusive least-squares fit chooses the line minimizing squared residuals; its slope estimates h*. State the sample window (the start/end dates of the observations) and use the same paired observations and normalization for covariance and variance. This is a historical fit, not a guaranteed future relationship; changing that window can change the estimate. [L2 p17 lower regression box](../../sources/annotated/lecture-2/page-017.md#lecture-2-p017-regression-hedge).

If Q_A is the positive exposure quantity and Q_F the positive quantity per futures contract, then **N* = h*Q_A/Q_F**. Units check: futures units/spot unit × spot units ÷ (futures units/contract) = contracts. In the positive-spot-exposure convention above, a positive signed N* means contracts to short. A future-purchase exposure needs the opposite economic direction. Fractional model counts are not automatically tradable; feasible integer choices, basis and costs need separate assessment. [L2 p18 upper contract-number formula](../../sources/annotated/lecture-2/page-018.md#lecture-2-p018-optimal-contract-number) and [limits](../../sources/annotated/lecture-2/page-018.md#lecture-2-p018-minimum-variance-limits).

<a id="hedgeratio-beta"></a>
## Beta uses return sensitivity, not total risk

A portfolio is a collection of holdings; a market index measures a specified share portfolio's performance. [L2 p21 upper definition](../../sources/annotated/lecture-2/page-021.md#lecture-2-p021-stock-index-definition). In the source model,

    r_P − r_f = α + β_P(r_M − r_f) + ε_P.

r_P, r_M and r_f are portfolio, market and risk-free **returns over the same observation interval**, expressed as dimensionless decimals; r_P − r_f and r_M − r_f are excess returns. α is an intercept in return units; β_P (beta) is the dimensionless fitted slope; ε_P is the residual return not explained by this market relationship. β_P = 1 means unit estimated sensitivity, not identical realized returns. **Systematic market risk** is the part associated with the market factor; **idiosyncratic risk** is the unexplained portfolio-specific part. Beta is estimated and may change; it is not a measure of all portfolio risk. Sources: L2 p23 [market regression](../../sources/annotated/lecture-2/page-023.md#lecture-2-p023-market-regression), [beta/residual](../../sources/annotated/lecture-2/page-023.md#lecture-2-p023-beta-and-residual), [limits](../../sources/annotated/lecture-2/page-023.md#lecture-2-p023-beta-limits).

To move estimated beta from β_P to target β*, the lecture uses

    N* = (β_P − β*) V_A/V_F.

V_A is positive portfolio currency value; V_F is the positive currency **notional of one futures contract**, not its margin deposit. An index futures notional is its quote in index points times the contract's currency-per-point multiplier. N* is signed **to short**: positive means short; negative means buy its magnitude. This approximation assumes the chosen index futures represent the market exposure being hedged and uses current values/estimated sensitivity. It does not eliminate residual risk or promise that beta remains fixed. [L2 p21 multiplier meaning](../../sources/annotated/lecture-2/page-021.md#lecture-2-p021-index-contract-multipliers); p24 [target formula](../../sources/annotated/lecture-2/page-024.md#lecture-2-p024-target-beta-formula) and [direction](../../sources/annotated/lecture-2/page-024.md#lecture-2-p024-target-beta-direction). No source contract multiplier is asserted as a current exchange specification here.

<a id="hedgeratio-example"></a>
## Microexamples: keep ratio, count and beta distinct

For matched price-change units, take σ_S = £0.20/unit, σ_F = £0.25/unit and ρ = 0.8 over the same interval. Then h* = 0.8 × 0.20/0.25 = **0.64**. With Q_A = 10,000 units and Q_F = 1,000 units/contract, N* = 0.64 × 10,000/1,000 = **6.4 contracts** in the continuous-size model, not 0.64 contracts. This is not permission to trade a fractional contract or a proof that rounding to six always solves the actual problem.

Separately, suppose V_A = £5,000,000, V_F = £250,000/contract, β_P = 1.2 and β* = 0.5. N* = (1.2 − 0.5) × 20 = **14 contracts to short**. Check the modeled beta reduction: 14 × 250,000/5,000,000 = 0.7, leaving 1.2 − 0.7 = 0.5. This reduces estimated market sensitivity, not all uncertainty.

<a id="hedgeratio-selfcheck"></a>
## Brief self-check

Using the second example's values, change the target to β* = 1.5. What signed N* results, which trade is it, and does a target of zero mean the portfolio becomes risk-free?

<a id="hedgeratio-answer"></a>
## Supplemental answer

N* = (1.2 − 1.5) × 20 = **−6**, meaning **buy six contracts**. The modeled sensitivity increases by 6 × 250,000/5,000,000 = 0.3, reaching 1.5. A target of zero removes only estimated market exposure in this model; residual risk, changing beta, basis and financing risks remain. If you called −6 “short six,” restate the signed-to-short convention before retrying.

<a id="hedgeratio-navigation"></a>
## Full lesson targets

[Minimum-variance derivation](../lessons/lesson-l2-minimum-variance-hedge.md) (`lesson-l2-minimum-variance-hedge`), [contract count](../lessons/lesson-l2-contract-count-and-airline.md) (`lesson-l2-contract-count-and-airline`), [indices and beta](../lessons/lesson-l2-indices-and-beta.md) (`lesson-l2-indices-and-beta`), and [target beta](../lessons/lesson-l2-target-beta-and-relative-view.md) (`lesson-l2-target-beta-and-relative-view`). These planned links may be pending and do not certify independent lesson review.
