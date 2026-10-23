# Minimum-variance hedging: derive the size instead of assuming one-for-one

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all seven substantive units on Lecture 2 physical pages 16–17. The source equations and statements have exact citations. Mathematical foundations, proofs beyond the printed first-order condition, examples, exercises and answers are **supplemental teaching**, not official supplied solutions. No real trading decision is recommended.

<a id="motivation"></a>

## Why “buy or sell futures” is not the whole answer

A related futures price may move less or more than the asset price you want to hedge. One futures unit per exposure unit therefore need not give the most stable combined result. We will choose a multiplier that minimizes the **variance**, a measure of the spread of possible price changes around their average. The question is narrow: **within a fixed linear, cost-free model, which hedge size gives the smallest variance?** It is not “which position guarantees profit?”

The [previous contract-selection lesson](lesson-l2-cross-hedge-selection.md) chose a related underlying and suitable date but deliberately did not claim that quantity matching was optimal. This lesson supplies the missing sizing reasoning. Full supplemental references are [statistical foundations](../concepts/concept-statistical-foundations.md#statistics-outcomes), [local slopes and minima](../concepts/concept-local-derivatives.md#derivatives-outcomes) and [numeric foundations](../concepts/concept-numeric-foundations.md#numeric-outcomes). Everything used in the derivation is also introduced below before use.

<a id="outcomes"></a>

## Observable outcomes

1. **Specify and interpret the model:** given paired price observations or a finite scenario table, distinguish price changes from returns; calculate means, variances, covariance and correlation with stated units and consistent observations; explain hedge sign and regression slope/intercept/residual. Success means correctly identifying the measured interval, handling undefined correlation, and explaining why a fitted relationship is neither causation nor a guarantee of future performance.
2. **Derive and check the minimum:** starting from the hedged change, expand the variance including its cross term, obtain the optimal multiplier by a completed square and by first/second derivatives, and evaluate a new numerical case and boundary cases. Success requires correct signs, squares, denominator and units; proof of a global minimum when futures variance is positive; a clear treatment of zero variance, signed correlation and constraints; and a distinction between less variance and no risk. Exact values are given where possible; displayed approximations are explicitly rounded.

**Supplemental readiness check:** expand $(a-hb)^2$ by multiplying $(a-hb)(a-hb)$. Is the middle term $-h ab$ or $-2h ab$? Try before reading section 4. If squares, averages or slopes are new, begin with the next two sections; no later lesson is a prerequisite.

<a id="measurement"></a>

## 1. Measure the right changes over the right intervals — supplemental foundation

The **spot price** is the price for an immediate transaction in the exposure asset. The **futures price** is the quote for the selected contract. A contract's **underlying** is its referenced asset. A future seller or asset holder gains when its asset price rises; a future buyer faces a larger bill when the purchase price rises. A **long futures** position gains when its quote rises; a **short futures** position gains when it falls. A hedge combines a commercial exposure with an offsetting futures position.

Let $t$ label the end of an observation interval and $t-1$ its beginning. It is a label, not a multiplier. Define the paired **price changes**

$$\Delta S_t=S_t-S_{t-1},\qquad \Delta F_t=F_t-F_{t-1}.$$

Here $S$ is the exposure spot price and $F$ is the selected futures quote. The symbol $\Delta$ (delta) means “new minus old.” If spot moves from £50/unit to £51/unit, its change is **+£1/unit**. The corresponding simple **return** is change divided by starting price: $1/50=0.02=2\%$, a dimensionless fraction. If futures moves from £100/unit to £102/unit, its change is **+£2/unit**, also a **2% return**. Equal percentage returns do not mean equal currency changes per unit. This lesson's hedge ratio uses price changes, not those returns.

Use paired observations from **the same dates, interval lengths, currency and declared quote units**. Do not pair a daily spot change with a monthly futures change or substitute annual return volatility for price-change volatility. State the sample window, meaning the start/end dates of the observations, and any weighting method. A selected futures series must have a consistent contract/roll definition; a switch between contracts is not automatically a price change in the same contract. The toy examples below use fixed contracts and explicit intervals, not an unexplained historical series. No annualization or square-root-of-time rule is assumed.

For compact notation, write $X=\Delta S$ and $Y=\Delta F$. Before the interval ends, these changes are uncertain. A **random variable** assigns a numerical value to each possible outcome. A **finite scenario model** lists all possible outcomes with probabilities, nonnegative weights adding to one. Our scenarios are teaching assumptions, not market forecasts.

<a id="statistics"></a>

## 2. Means, spread and co-movement — supplemental foundation

Let $i$ identify a scenario, $p_i$ its probability, and $x_i,y_i$ the paired changes in that scenario. The summation sign $\sum_i$ means “add the term for every listed scenario.” The **expectation** $E$ is that probability-weighted average. Define means $\mu_X=E[X]$ and $\mu_Y=E[Y]$:

$$\mu_X=\sum_i p_i x_i,\qquad \mu_Y=\sum_i p_i y_i.$$

A deviation is an outcome minus its mean. Positive and negative deviations average to zero, so that average alone cannot measure spread. **Variance**, written $\operatorname{Var}$, averages **squared** deviations. The **standard deviation** $\sigma$ is the nonnegative square root of variance:

$$\sigma_S^2=\operatorname{Var}(X)=E[(X-\mu_X)^2],\qquad
\sigma_F^2=\operatorname{Var}(Y)=E[(Y-\mu_Y)^2].$$

A square multiplies a number by itself; even a negative deviation has a nonnegative square. Variance has squared price units; standard deviation has the original price units. For example, variance $4$ in $(\text{GBP/unit})^2$ has standard deviation $2$ GBP/unit. GBP means pounds sterling. A zero mean does not imply zero spread.

**Covariance**, written $\operatorname{Cov}$, averages the product of paired deviations:

$$c=\operatorname{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)].$$

The temporary symbol $c$ denotes covariance, not a premium or cost. When paired deviations tend to share a sign, their products are positive; opposite signs contribute negative products. Covariance has “spot-price units × futures-price units.” **Correlation** $\rho$ (rho) divides out those scales:

$$\rho=\frac{c}{\sigma_S\sigma_F},\qquad c=\rho\sigma_S\sigma_F.$$

This correlation formula requires **both standard deviations positive**. When defined, $-1\leq\rho\leq1$; it is dimensionless. Its sign describes direction and its magnitude describes strength of linear co-movement. Zero correlation means no linear co-movement, not necessarily independence. If either standard deviation is zero, correlation is **undefined**, not zero. We assume finite means and variances throughout.

The source defines $\sigma_S,\sigma_F$ specifically as standard deviations of **price changes**, and $\rho$ as their correlation; the longer probability explanation above is supplemental. [L2 physical p17, upper formula and symbol definitions; `lecture-2-p017-hedge-ratio-symbols`](../../sources/annotated/lecture-2/page-017.md#lecture-2-p017-hedge-ratio-symbols).

<a id="paired-example"></a>

### Work a complete finite model before using a general formula

**Supplemental example:** four equally likely scenarios for one-day paired changes, both in GBP per matching underlying unit. Each probability is $1/4$. This is a complete fictional model, not four observed days used to claim a reliable real-market estimate.

| Scenario | Probability | $X$ (GBP/unit) | $Y$ (GBP/unit) | $X^2$ | $Y^2$ | $XY$ |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 1/4 | −2 | −1 | 4 | 1 | 2 |
| 2 | 1/4 | 0 | −1 | 0 | 1 | 0 |
| 3 | 1/4 | 0 | +1 | 0 | 1 | 0 |
| 4 | 1/4 | +2 | +1 | 4 | 1 | 2 |

The last three columns have squared price units here. Means are $(−2+0+0+2)/4=0$ and $(−1−1+1+1)/4=0$, so these squares/products are already squares/products of deviations. Spot variance is $(4+0+0+4)/4=2$; futures variance is $4/4=1$; covariance is $(2+0+0+2)/4=1$. Thus $\sigma_S=\sqrt{2}\approx1.414214$ GBP/unit, $\sigma_F=1$ GBP/unit, and $\rho=1/\sqrt{2}\approx0.707107$. The approximations are rounded to six decimal places; keep exact roots for algebra. Check: the positive covariance matches the broadly aligned signs, while the middle rows show that the price changes are not perfectly linked.

<a id="hedged-change"></a>

## 3. State the hedged quantity and its sign before optimizing

The source writes the hedged change **per exposure unit** as

$$\Delta V_H=\Delta S-h\Delta F=X-hY.$$

$\Delta V_H$ labels the hedged value change and $h$ is the fixed chosen **hedge ratio**. The subscript $H$ means hedged; it is not multiplication. The ratio is chosen before the change is observed and held fixed in this calculation. [L2 physical p16, upper value-change equation; `lecture-2-p016-hedged-change`](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-hedged-change).

**Units and direction — supplemental clarification:** $h$ is futures-underlying units per exposure-underlying unit. Multiplying it by a futures price change (currency per futures unit) produces currency per exposure unit, so subtraction from $X$ is meaningful. With matching quantity conventions, the numerical ratio can be described as dimensionless; keep the asset-unit labels when they differ. It is not a count of exchange contracts or a percentage return.

For a **positive asset-value/seller exposure**, positive $h$ means a **short** futures position: its gain is $-h\Delta F$, offsetting the commercial $\Delta S$. Negative $h$ means adding futures exposure, a long position in this convention. For a **future buyer**, the change in purchase cost after a long hedge is also $\Delta S-h\Delta F$: subtract the long gain from the bill. Thus the same variance optimization applies, but positive $h$ means a **long** hedge for that buyer, not a short. Seller receipt and buyer cost are different economic quantities. Always state the commercial side rather than turning a sign into a trade without context.

**Model assumptions:** linear price exposure over a common horizon; fixed known exposure quantity; a fixed hedge ratio; finite second moments; executable fractional positions during the mathematical optimization; no position constraints, transaction costs, taxes or default; and no financing effect from daily futures settlements. These are simplifying assumptions, not a claim that real trades have no funding needs. No price forecast, premium, interest rate or compounding calculation is supplied. We minimize variance, not expected loss, total business profit, cash needed tomorrow or every tail risk. Tail risk means the possibility of unusually extreme outcomes; a variance number alone does not fully describe them.

<a id="variance-derivation"></a>

## 4. Derive the cross term rather than memorizing it

Let $H=X-hY$ abbreviate the hedged change. Because weighted averages distribute across sums and fixed multipliers, $E[H]=\mu_X-h\mu_Y$. Subtract that mean:

$$H-E[H]=(X-\mu_X)-h(Y-\mu_Y).$$

For this expansion only, name $A=X-\mu_X$ and $B=Y-\mu_Y$. Multiply the two identical brackets:

$$ (A-hB)^2=(A-hB)(A-hB)=A^2-hAB-hAB+h^2B^2
=A^2-2hAB+h^2B^2.$$

The two cross-products explain the **2**. The two factors of $h$ in the last product explain **$h^2$**. Take the average of each term, identifying variance and covariance from section 2:

$$v(h)=\operatorname{Var}(H)=\sigma_S^2+h^2\sigma_F^2-2hc
=\sigma_S^2+h^2\sigma_F^2-2h\rho\sigma_S\sigma_F.$$

The function name $v(h)$ means “the variance at chosen multiplier $h$.” It is not variance multiplied by $h$. The last equality requires defined correlation; the covariance form still works when a variance is zero. Every term has squared currency-per-exposure-unit dimensions. This is the source variance equation, with a supplemental derivation. [L2 physical p16, middle variance equation; `lecture-2-p016-hedged-variance`](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-hedged-variance).

**Intuition:** the first term is the original exposure's variance. A larger futures position introduces its own squared-size variance, the second term. The negative cross term credits the offsetting co-movement when $h$ and covariance have the same sign. Omitting it wrongly treats the legs as unrelated; omitting the square on $h$ gives the wrong scaling. A good size balances the extra futures variation against the offset it supplies.

For the four-scenario model, $v(h)=2+h^2-2h$. At $h=1$, the four hedged changes are $-1,+1,-1,+1$ GBP/unit. Their mean is zero and variance is $1$: a direct scenario calculation confirms the formula. Risk is reduced from variance $2$ to $1$, not eliminated.

<a id="square-proof"></a>

## 5. Prove the global minimum without calculus first — supplemental

Let $a=\sigma_F^2>0$ be futures-change variance and keep $c$ as covariance. Then $v(h)=\sigma_S^2+ah^2-2ch$. **Completing the square** rewrites it as a nonnegative square plus a constant:

$$v(h)=a\left(h-\frac{c}{a}\right)^2+\sigma_S^2-\frac{c^2}{a}.$$

To check, expand the square: $ah^2-2ch+c^2/a$, then add the last two terms; the two $c^2/a$ terms cancel. Since $a>0$ and a square cannot be negative, the smallest value occurs when its bracket is zero. Therefore

$$h^*=\frac{c}{a}=\frac{\operatorname{Cov}(\Delta S,\Delta F)}{\operatorname{Var}(\Delta F)}.$$

The star marks the model's optimal chosen value, not multiplication. This is a **global minimum over all real $h$** for this quadratic: no other value can make the positive square negative. It is unique when $a>0$. It is not a claim about every feasible trading strategy or a constrained market.

<a id="optimal-ratio"></a>

Using $c=\rho\sigma_S\sigma_F$ when both standard deviations are positive, cancel one factor of $\sigma_F$:

$$h^*=\frac{\rho\sigma_S\sigma_F}{\sigma_F^2}
=\rho\frac{\sigma_S}{\sigma_F}.$$

Plain-text fallback: **optimal price-change hedge ratio = correlation × spot-change standard deviation ÷ futures-change standard deviation**. The final denominator is $\sigma_F$, not its square. This is the source's boxed result; the nonzero-denominator condition and complete-square proof are explicit supplemental clarifications. [L2 physical p16, bottom boxed hedge-ratio result; `lecture-2-p016-minimum-variance-ratio`](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-minimum-variance-ratio).

<a id="calculus-bridge"></a>

## 6. Understand the source's derivative step before using it — supplemental bridge

A mathematical **derivative** is a local slope, not a financial derivative contract. For a function $q(h)$ and a nonzero small increment $\delta$, the average slope is $[q(h+\delta)-q(h)]/\delta$. The derivative is the value approached as $\delta$ tends to zero, not division by zero.

For $q(h)=h^2$, expand $(h+\delta)^2=h^2+2h\delta+\delta^2$. The average slope becomes $2h+\delta$, which approaches $2h$. Therefore the derivative of $h^2$ is $2h$. A constant has zero derivative, a linear term $bh$ has derivative $b$ for fixed coefficient $b$, and multiplying/adding functions multiplies/adds slopes. These follow by taking the corresponding differences. Thus the derivative of $ah^2-2ch+\sigma_S^2$ is $2ah-2c$ when $a,c,\sigma_S$ are held fixed.

The notation $v'(h)$ or $dv/dh$ means that first derivative. A **partial derivative**, $\partial v/\partial h$, emphasizes that only $h$ varies while the estimated statistical inputs remain fixed. Differentiating the slope again gives the **second derivative** $v''(h)$; it is not the square of the first derivative.

<a id="derivative-proof"></a>

### Follow every step of the printed first-order condition

The source sets the variance's derivative with respect to $h$ to zero:

$$\frac{\partial v}{\partial h}=2h\sigma_F^2-2\rho\sigma_S\sigma_F=0.$$

[L2 physical p16, middle-lower partial-derivative equation; `lecture-2-p016-variance-first-order-condition`](../../sources/annotated/lecture-2/page-016.md#lecture-2-p016-variance-first-order-condition).

1. Differentiate the constant $\sigma_S^2$: zero.
2. Differentiate $h^2\sigma_F^2$: $2h\sigma_F^2$.
3. Differentiate $-2h\rho\sigma_S\sigma_F$: $-2\rho\sigma_S\sigma_F$.
4. Set their sum to zero and move the covariance term to the other side: $2h\sigma_F^2=2\rho\sigma_S\sigma_F$.
5. Divide by $2\sigma_F^2$, valid only when $\sigma_F>0$, obtaining the same $h^*$.

**Supplemental minimum check:** $v''(h)=2\sigma_F^2>0$. The slope increases through zero, so the curve bends upward. Zero slope alone is not a general proof of a minimum; here positive curvature and the completed-square identity establish it. If the actual allowed sizes exclude $h^*$, solve the constrained problem separately; do not declare an infeasible stationary point tradable.

<a id="worked-example"></a>

## 7. A complete numerical hedge-size example — supplemental

Assume a one-month horizon with spot-change standard deviation **£0.20 per spot unit**, futures-change standard deviation **£0.25 per futures unit**, and correlation **0.8**. The two quantity conventions match; the ratio is numerically dimensionless but means futures units per spot unit. These are supplied model inputs, not estimates derived from real data. Costs, financing and constraints are omitted.

1. Covariance: $c=0.8\times0.20\times0.25=0.04$ in the product of the two price units.
2. Futures variance: $a=0.25^2=0.0625$ in squared futures-price units; spot variance is $0.20^2=0.04$.
3. Ratio: $h^*=0.04/0.0625=0.64$, equivalently $0.8(0.20/0.25)=0.64$.
4. Variance function: $v(h)=0.04+0.0625h^2-0.08h$ in $(\text{GBP/spot unit})^2$.
5. Completed square: $v(h)=0.0144+0.0625(h-0.64)^2$. It cannot be below **0.0144**.
6. Derivative check: $v'(h)=0.125h-0.08$, which is zero at 0.64; $v''=0.125>0$.
7. Standard deviation at the optimum: $\sqrt{0.0144}=0.12$ GBP/spot unit. Compare unhedged standard deviation 0.20.

| Chosen $h$ | Interpretation for a positive asset-value exposure | Variance $v(h)$, $(\text{GBP/spot unit})^2$ | Standard deviation, GBP/spot unit |
|---:|---|---:|---:|
| 0 | No futures hedge | 0.0400 | 0.20 |
| 0.64 | Model-optimal short quantity multiplier | 0.0144 | 0.12 |
| 1 | One-for-one short quantity multiplier | 0.0225 | 0.15 |

**Checks:** the optimal variance is below both alternatives. Variance reduction is $(0.04-0.0144)/0.04=0.64=64\%$; standard-deviation reduction is $(0.20-0.12)/0.20=40\%$. Do not call the 64% figure a probability of success, a percentage of every risk removed, or a 64% reduction in standard deviation. A future buyer uses the corresponding long quantity under the positive relationship; the variance arithmetic remains the same for net purchase-cost changes.

<a id="interpretation"></a>

## 8. What the optimum says, including boundary cases

The source says that higher correlation generally improves hedge effectiveness, $h^*$ need not equal one, and minimizing variance need not eliminate risk. [L2 physical p17, central three interpretation bullets; `lecture-2-p017-hedge-ratio-interpretation`](../../sources/annotated/lecture-2/page-017.md#lecture-2-p017-hedge-ratio-interpretation).

**Supplemental signed-correlation clarification:** substituting the optimum gives

$$v(h^*)=\sigma_S^2-\frac{c^2}{\sigma_F^2}
=\sigma_S^2(1-\rho^2).$$

The second equality requires defined correlation. For a freely signed hedge and fixed variances, effectiveness depends on **correlation magnitude**, while its sign determines the trade direction. Raising a negative correlation from −0.9 to −0.2 weakens its magnitude; it does not improve the best freely signed hedge. The source's “higher correlation” phrasing describes the usual positive-correlation setting, not a universal ordering across negative correlations.

| Condition | Correct conclusion in this model |
|---|---|
| $\rho=0$, both standard deviations positive | $h^*=0$; adding an unrelated linear futures component cannot lower variance. Nonlinear dependence may still exist. |
| $\rho<0$ | $h^*<0$: reverse the usual positive-correlation futures direction. For an asset holder/seller, negative $h$ means long; for a future buyer's cost hedge it means short. |
| $\rho=+1$ or $-1$, positive standard deviations | Perfect linear co-movement allows zero residual **variance** at $h^*=\pm\sigma_S/\sigma_F$ in the ideal model. The residual mean need not be zero and real costs/constraints can remain. |
| $\sigma_F=0$ | Futures changes are constant; covariance with $X$ is zero. Subtracting $hY$ shifts a mean but cannot change variance. The quotient is undefined; no unique variance-minimizing $h$ is identified. |
| $\sigma_S=0$, $\sigma_F>0$ | The exposure change is constant, covariance is zero, and the covariance/variance formula gives $h^*=0$. Correlation is undefined; do not insert an invented zero correlation into its formula. |
| Both standard deviations zero | All such linear combinations have zero variance; there is no uniquely identified variance optimum and correlation is undefined. |

The ratio need not lie between zero and one. For example, $\rho=0.8$, $\sigma_S=0.50$ and $\sigma_F=0.20$ in matched price units give $h^*=2$: a less-variable futures unit needs a larger quantity multiplier. With the earlier 0.20/0.25 deviations but $\rho=-0.8$, $h^*=-0.64$. For correlations +1 and −1 with those deviations the ratios are +0.8 and −0.8, respectively, with zero ideal residual variance. These are supplemental boundary calculations, not source market scenarios.

If only nonnegative $h$ is allowed in a seller's convention and covariance is negative, the unconstrained negative optimum is forbidden; among $h\geq0$, zero is the minimum because the variance rises as positive $h$ is added. Constraints change the problem. Likewise, stable historical covariance is an assumption, not an execution guarantee.

<a id="regression"></a>

## 9. Why an intercept-inclusive regression slope estimates the same ratio

The source gives

$$\Delta S_t=\alpha+h\Delta F_t+\varepsilon_t,$$

and identifies the estimated slope with the minimum-variance hedge ratio. [L2 physical p17, lower regression-interpretation box; `lecture-2-p017-regression-hedge`](../../sources/annotated/lecture-2/page-017.md#lecture-2-p017-regression-hedge).

**Supplemental definitions:** a regression fits a line predicting spot **change** from futures **change**. The intercept $\alpha$ is the fitted prediction when futures change is zero; it has spot-price-change units. The slope $h$ is predicted spot change per unit of futures change, with the same units as the hedge ratio. The residual $\varepsilon_t=\Delta S_t-\alpha-h\Delta F_t$ is the part missed by that line, also in spot-price-change units. It can be positive or negative. These are not automatically causes, profit components or future guarantees.

**Why an intercept matters:** least squares chooses the line to minimize average squared residuals. For fixed $h$, put $Z=X-hY$. Its residual relative to an intercept is $Z-\alpha$. Write it as $(Z-E[Z])+(E[Z]-\alpha)$. Squaring and averaging eliminates the cross term because $E[Z-E[Z]]=0$, leaving

$$E[(Z-\alpha)^2]=\operatorname{Var}(Z)+(E[Z]-\alpha)^2.$$

The best intercept is therefore $\alpha=E[Z]=\mu_X-h\mu_Y$. What remains to minimize is exactly $\operatorname{Var}(X-hY)$, the hedge objective already solved. Forcing the intercept to zero without justification minimizes a different objective and can change the estimated slope.

<a id="regression-example"></a>

### Worked regression with a nonzero intercept — supplemental

Take four equally weighted paired one-day observations in GBP per matching unit: futures changes $Y=(4,4,6,6)$ and spot changes $X=(9,11,11,13)$. Their means are $\bar y=5$ and $\bar x=11$; a bar denotes a sample arithmetic average, sum divided by count. Subtracting means gives the same deviations as the earlier scenario table: $Y-\bar y=(-1,-1,1,1)$ and $X-\bar x=(-2,0,0,2)$.

For $n$ observed pairs, the intercept-inclusive least-squares slope and intercept are

$$\widehat h=\frac{\sum_{i=1}^n(y_i-\bar y)(x_i-\bar x)}{\sum_{i=1}^n(y_i-\bar y)^2},\qquad
\widehat\alpha=\bar x-\widehat h\bar y.$$

A hat marks an estimate from the specified sample; $n$ is its observation count. Here the numerator is $4$, the denominator $4$, so $\widehat h=1$ and $\widehat\alpha=11-1\times5=6$ GBP/unit. The fitted spot changes are $(10,10,12,12)$; residuals are $(-1,+1,-1,+1)$ GBP/unit. A residual of +1 means actual spot change exceeded the prediction by one; it does not mean the total hedge profit is +1.

**Check against hedge variation:** $X-\widehat hY=(5,7,5,7)$, with mean 6 and mean squared deviation 1. Subtracting the intercept yields the zero-mean residuals without changing that variation. The intercept is a constant fitted level, not something a futures position automatically pays you or removes.

**Sample consistency:** dividing both deviation-product sum and squared-futures-deviation sum by $n=4$ gives covariance 1 and futures variance 1; their ratio is 1. The common sample estimates dividing by $n-1=3$ instead give $4/3$ and $4/3$, also ratio 1. Do not mix denominators or different observations. For the finite scenario model earlier, division by 4 followed from its exact probabilities; it was not a claim about an unbiased sample estimator. If every observed futures change is identical, the denominator vanishes and a separate intercept/slope cannot be identified.

A fit is evidence of in-sample co-movement under the chosen window and definition. A small sample, changing prices/relationships, contract rolls, liquidity or costs can make an estimated ratio perform differently later. Correlation is not causation; least squares does not assert that futures changes create spot changes or that the future will repeat the fitted line.

<a id="practice"></a>

## 10. Progressive practice — attempt before separate answers

All new scenarios and answer explanations are **supplemental**. Source formulas are identified above; there is no supplied official problem/solution set on these two pages.

<a id="exercise-measure-prompt"></a>

### Exercise 1 — measurement scaffold (outcome 1)

Spot moves from £50 to £51 per unit while the selected futures moves from £100 to £102 per unit over the same day. Calculate both price changes and returns; state units. Explain why equal returns do not justify a one-for-one quantity hedge. Can a monthly futures change replace the daily one unchanged? Define what a positive $h$ means for a seller and a buyer. [Answer 1](#exercise-measure-answer).

<a id="exercise-moments-prompt"></a>

### Exercise 2 — moments from scenarios (outcome 1)

In two equally likely one-day scenarios, $(X,Y)$ equals $(-2,-4)$ or $(2,4)$, both in GBP/unit with matching quantity conventions. Calculate means, variances, standard deviations, covariance and correlation. Show products and units, not just the correlation. Explain why zero average change is not zero risk. [Answer 2](#exercise-moments-answer).

<a id="exercise-regression-prompt"></a>

### Exercise 3 — regression transfer (outcome 1)

For three equally weighted paired one-day observations in GBP/unit, $Y=(-1,0,1)$ and $X=(1,3,5)$. Find both means, the centered-product sum, squared-futures-deviation sum, slope, intercept, predictions and residuals. Does a perfect fit prove causation or future stability? If you used sample covariance/variance with denominator $n-1$, would the slope change? [Answer 3](#exercise-regression-answer).

<a id="exercise-derive-prompt"></a>

### Exercise 4 — expansion and proof scaffold (outcome 2)

Starting from $H=X-hY$, subtract its mean and expand the square. Identify all three expectation terms. Then, with $a=\sigma_F^2>0$ and $c=\operatorname{Cov}(X,Y)$, complete the square, find $h^*$, and show the first and second derivatives. State why zero slope alone is not a general minimum proof. [Answer 4](#exercise-derive-answer).

<a id="exercise-numeric-prompt"></a>

### Exercise 5 — new numerical minimum (outcome 2)

Over the same one-month interval let $\sigma_S=0.30$ GBP/spot unit, $\sigma_F=0.20$ GBP/futures unit and $\rho=0.6$, with matching quantity conventions and the stated unconstrained zero-cost model. Compute covariance, $h^*$, variance function, its completed square, minimum variance and standard deviation. Compare $h=0$ and $h=1$. Give the variance reduction percentage; do not call it a probability of success. [Answer 5](#exercise-numeric-answer).

<a id="exercise-boundary-prompt"></a>

### Exercise 6 — signs and boundaries (outcome 2)

Use $\sigma_S=0.20$, $\sigma_F=0.25$ in matched GBP/unit change units. Find $h^*$ and minimum variance for $\rho=0,-0.8,+1,-1$. For the negative case, state futures direction for seller and buyer. What if the futures change is always 3 while spot change varies? What if spot change is constant but futures change varies? State why $h$ need not be restricted to zero through one. [Answer 6](#exercise-boundary-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 7 — teach the specification (outcome 1)

Explain to a beginner why data must be paired price changes with a common horizon, what variance/covariance/correlation each measure, what an estimated slope and intercept mean, and why the residual does not disappear because the fit is called “optimal.” Include a zero-variance qualification and a noncausation/future-stability warning. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 8 — diagnose a derivation (outcome 2)

A learner writes: “Variance is $\sigma_S^2+h\sigma_F^2-hc$. Setting its slope to zero always proves a minimum. The ratio is a percentage between zero and one; with correlation 0.8 every kind of risk falls by 80%.” Repair the expansion and minimum proof; use the worked 0.20/0.25/0.8 case to distinguish $h$, variance reduction and standard-deviation reduction. Name two limitations of the mathematical optimum. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 11. Supplemental answers, diagnosis and retries

<a id="exercise-measure-answer"></a>

### Answer 1 — measurement and direction

Spot change is **+£1/unit**; futures change **+£2/unit**. Returns are $1/50=0.02=2\%$ and $2/100=0.02=2\%$, dimensionless. A one-unit futures position changes by twice the money per unit in this observed move; equal returns do not make the price-change sensitivities equal. One paired move is not enough to estimate a reliable hedge ratio. A monthly interval cannot replace a daily interval without a justified consistent transformation. Positive $h$ subtracts futures-price exposure: seller/asset holder uses a short; buyer subtracts a long futures gain from purchase cost.

**Retry:** if you wrote 2% as a currency change, first write “new minus old” and its GBP/unit label, then divide by the old price only for the separate return calculation.

<a id="exercise-moments-answer"></a>

### Answer 2 — complete moment calculation

Means are zero. Spot squared deviations are 4 and 4, so variance is **4** and standard deviation **2**. Futures squared deviations are 16 and 16, giving variance **16** and standard deviation **4**. Paired products are 8 and 8, so covariance is **8**. Correlation is $8/(2\times4)=1$. Variances/covariance have squared price units here; standard deviations are GBP/unit; correlation is dimensionless. Both changes vary across scenarios despite zero means.

**Retry:** if you averaged signed deviations and obtained zero variance, square each deviation first. If your correlation is 8, you stopped at covariance; divide by both standard deviations.

<a id="exercise-regression-answer"></a>

### Answer 3 — slope and intercept

Means: $\bar y=0$, $\bar x=3$. Centered $Y=(-1,0,1)$ and centered $X=(-2,0,2)$. Product sum is $2+0+2=4$; squared-$Y$ sum is $1+0+1=2$. Slope **2 futures-units/spot-unit in compatible quantity notation**, or equivalently 2 units of spot-price change per futures-price-change unit; intercept **3 GBP/spot unit**. Predictions are $(1,3,5)$ and all residuals are **0**. Using denominator $n-1=2$ gives covariance 2 and futures variance 1, still slope 2. Using denominator $n=3$ gives $4/3$ and $2/3$, again 2. Neither a three-point exact fit nor zero in-sample residual proves causation or a stable future relation.

**Retry:** if your intercept is zero, predict $X$ when $Y=0$: the observed middle value is 3. If your slope changes between denominator conventions, you did not use the same convention in numerator and denominator.

<a id="exercise-derive-answer"></a>

### Answer 4 — derivation and proof

$E[H]=\mu_X-h\mu_Y$. Centering gives $A-hB$, where $A=X-\mu_X$ and $B=Y-\mu_Y$. Squaring yields $A^2-2hAB+h^2B^2$. Averaging gives $\sigma_S^2-2hc+h^2\sigma_F^2$. With $a=\sigma_F^2>0$,

$$v(h)=a(h-c/a)^2+\sigma_S^2-c^2/a.$$

The square is nonnegative and minimized at **$h^*=c/a$**. First derivative is $2ah-2c$; second derivative is $2a>0$. The zero first derivative agrees with the complete-square global minimum. For other functions zero slope can mark a maximum or neither; positivity/constraints must be checked. If correlation is defined, $c/a=\rho\sigma_S/\sigma_F$.

**Retry:** if the cross coefficient is −1 instead of −2, multiply the two brackets into four products and identify both identical middle products. If you divided by zero, check $a$ before solving.

<a id="exercise-numeric-answer"></a>

### Answer 5 — numerical transfer

Covariance = $0.6\times0.30\times0.20=0.036$; futures variance $0.04$; $h^*=0.036/0.04=\mathbf{0.9}$. The variance function is

$$v(h)=0.09+0.04h^2-0.072h=0.0576+0.04(h-0.9)^2.$$

Minimum variance is **0.0576** $(\text{GBP/spot unit})^2$; standard deviation is **0.24 GBP/spot unit**. The derivative is $0.08h-0.072$, zero at 0.9; second derivative is 0.08, positive. At zero hedge, variance is **0.09**; at one-for-one, **0.058**. The optimum is lower than both. Variance reduction is $(0.09-0.0576)/0.09=0.36=\mathbf{36\%}$. It describes the modeled variance objective, not a probability of profit or removal of all risk.

**Retry:** if you got 0.036 as the ratio, you stopped at covariance. Divide by futures variance 0.04, then substitute the result into the original three-term variance formula to verify the minimum independently.

<a id="exercise-boundary-answer"></a>

### Answer 6 — boundary table

| Correlation | Ratio $h^*$ | Minimum variance, $(\text{GBP/spot unit})^2$ |
|---:|---:|---:|
| 0 | 0 | 0.04 |
| −0.8 | −0.64 | 0.0144 |
| +1 | +0.8 | 0 |
| −1 | −0.8 | 0 |

Negative correlation calls for **long futures for a seller/asset holder** and **short futures for a buyer's cost hedge**, reversing the usual positive-correlation directions. Constant futures change 3 means zero futures variance and covariance: subtracting $3h$ changes only the mean; correlation is undefined and no unique variance-minimizing ratio is identified. Constant spot change with positive futures variance has covariance zero and a unique optimum $h=0$ by the covariance/variance formula; correlation is again undefined. The ratio is not bounded like a probability: $0.8\times0.50/0.20=2$ is a valid unconstrained example.

**Retry:** if you set undefined correlation to zero, return to its denominator. If you treated negative $h$ as the same trade direction, write $X-(-0.64)Y=X+0.64Y$ before choosing the side.

<a id="exercise-explain-teachback-answer"></a>

### Answer 7 — model checklist

A sufficient teach-back states: price changes keep currency/unit dimensions whereas returns do not; paired dates/intervals and a consistent sample window are necessary; variance measures squared deviations from a mean, covariance averages paired deviation products, and correlation normalizes covariance when both standard deviations are positive. The fitted slope estimates the linear hedge multiplier; the intercept represents mean adjustment and the residual is the deviation from the line. An optimum can leave a nonzero residual and estimates can change. Correlation neither proves causation nor guarantees future stability; a constant variable makes correlation undefined.

**Supplemental model closing sentence:** “We fit the size that minimizes a specified sample/model variance, not a promise that the next price move or our entire business outcome will be safe.”

**Retry:** if you only recited symbols, explain the four-row table's positive covariance and nonzero residual in words. If you called zero average change no risk, contrast its zero mean with variance 2.

<a id="exercise-apply-teachback-answer"></a>

### Answer 8 — repair the derivation and interpretation

The correct variance is $\sigma_S^2+h^2\sigma_F^2-2hc$: scaling squared deviations produces $h^2$, and two cross-products produce −2. With positive futures variance, completing the square proves a global minimum; the derivative zero is supported by the second derivative $2\sigma_F^2>0$. That proof is conditional on this unconstrained quadratic, not every function.

In the worked case, **$h=0.64$** is a futures-units/exposure-unit multiplier. Variance falls from **0.04 to 0.0144**, a **64% reduction**; standard deviation falls from **0.20 to 0.12**, a **40% reduction**. Correlation **0.8** is neither of those percentages and is not a probability of success. Ratios can be negative or exceed one. Estimation changes, integer/position constraints, basis mismatch, transaction costs, funding and default can remain; the calculation optimizes neither expected business profit nor every extreme outcome.

**Retry:** show the original variance at $h=0$ and at the proposed ratio, then name exactly which units are squared. A correct numerical ratio without its exposure convention or limits does not satisfy the outcome.

<a id="stop-check"></a>

## Stop and teach back

Attempt exercises 7 and 8 in your own words. A tutor should check measurement, algebra, minimum proof, economic sign and interpretation separately; repair a missing step before repeating the complete derivation. Keep responses in private learner notes. Reading this page or an author test passing does not establish mastery.

The [next lesson](lesson-l2-contract-count-and-airline.md) converts this price-change ratio into a quantity of futures and a feasible whole-contract decision. That is not required to complete the present mathematical outcomes.

<a id="evidence"></a>

## Exact evidence and accessible presentation

All normalized/raw text and both original page images were read. Page 16 displays four vertically ordered equations: hedged change, three-term variance, first-order condition, then a boxed ratio. Page 17 repeats the ratio and symbol definitions, lists three interpretation bullets, and ends with a regression equation. There is **no plotted graph or numerical table** on these source pages; no axes, legend or unseen curve is assumed. The scenario and comparison tables here are authored supplements. A hypothetical variance graph would have $h$ horizontally and variance vertically, bending upward with its minimum at $h^*$; that description explains the algebra, not an original source figure.

| Physical page and regions | Full normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|
| 16: upper change; middle variance; middle-lower derivative; bottom boxed ratio | [16](../../sources/annotated/lecture-2/page-016.md) | [Raw 16](../../sources/extracted/lecture-2/page-016.md#page-16) | [Image 16](../../sources/assets/lecture-2/page-016.png) |
| 17: upper symbols; central interpretation; lower regression | [17](../../sources/annotated/lecture-2/page-017.md) | [Raw 17](../../sources/extracted/lecture-2/page-017.md#page-17) | [Image 17](../../sources/assets/lecture-2/page-017.png) |

Canonical units mark these seven regions verified despite historical normalized draft banners. That source status does not approve this lesson. No source conflict is registered for these units; the correlation-sign and nonzero-variance qualifications are explicit supplements rather than silent source changes. No restricted textbook, private learner evidence or unverified transcript was used.
