# Stock indices, futures notional and portfolio beta

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches the eight substantive units on Lecture 2 physical pages 21–23. Source examples describe the supplied lecture, **not current exchange specifications or current index methodology**. Added foundations, derivations, scenarios, exercises and solutions are labelled **supplemental**. These examples are educational, not trading advice.

<a id="outcomes"></a>

## What you should be able to do

1. **Specify the exposure:** given an index level, multiplier, portfolio and paired return data, distinguish index points, currency notional, contract value, margin and cash invested; explain beta, intercept and residual with a consistent horizon and return definition. Success requires correct units, the price-change/return distinction, and an explanation of why beta zero does not remove all risk.
2. **Calculate and check:** calculate contract notional and futures gains, derive and apply a mirror hedge, estimate an intercept-inclusive beta from a small paired sample, and check a beta-scaled hedge against a market move. Success requires correct directions, complete intermediate arithmetic, residual-risk interpretation and no inference of future certainty from a historical fit. Exact decimal answers are possible for the exercises here.

The [preceding quantity-sizing lesson](lesson-l2-contract-count-and-airline.md) uses a **price-change** hedge ratio and physical quantities. This lesson changes measurement convention: portfolio beta is a slope between **returns**, not between currency price changes. We introduce the necessary foundations below. Optional references: [numeric units](../concepts/concept-numeric-foundations.md#numeric-units), [statistical moments](../concepts/concept-statistical-foundations.md#statistics-moments), and [beta reference](../concepts/concept-hedge-ratio-and-beta.md).

<a id="index-definition"></a>

## 1. An index is a measurement, not a pile of cash

A **share** is an ownership interest in a company. A **portfolio** is a collection of investments. A **stock index** measures the performance of a specified portfolio of shares according to stated rules. An index's **level** is expressed in **index points**. A level of 5,000 does not mean that the index itself is worth USD 5,000 or that one futures contract costs USD 5,000.

The source names three weighting examples: S&P 500, float-adjusted market-capitalisation weighted; Nasdaq 100, modified market-capitalisation weighted; and Dow Jones Industrial Average, price weighted. [L2 p21, upper definition and weighting-rule list; `lecture-2-p021-stock-index-definition`](../../sources/annotated/lecture-2/page-021.md#lecture-2-p021-stock-index-definition).

**Supplemental vocabulary:** a weight describes how strongly a constituent contributes to the index's movement. Market capitalisation is share price multiplied by the relevant number of shares. “Float-adjusted” refers to using shares available for public trading rather than automatically all issued shares. “Modified” means that rules alter otherwise market-cap-based weights, for example through constraints. Price weighting gives higher-priced shares greater weight under its methodology; it is not equal-company weighting. These descriptions explain the lecture's labels, not full calculation manuals. Splits, constituent changes, divisors and rebalancing require the actual methodology; this lesson does not reconstruct them or claim the archived labels are current.

<a id="index-return"></a>

### Measure a change and a return separately — supplemental foundation

Let $I_0$ and $I_h$ be index levels at the start and hedge closing date $h$. The subscript $h$ is a date label, **not** the earlier price-change hedge ratio. Delta means final minus initial. For a price index without a separate income adjustment,

$$\Delta I=I_h-I_0,\qquad r_I=\frac{I_h-I_0}{I_0},\qquad I_0>0.$$

The change is in **points**; the simple return $r_I$ is dimensionless. Multiply a decimal return by 100 to express it as a percentage. An increase from 5,000 to 5,100 is 100 points and $100/5{,}000=0.02=2\%$, not a 100% return. A fall to 4,900 is −100 points and −2%.

A **dividend** is a distribution paid to shareholders. A price-index return and a total-return measure that includes dividends are not interchangeable. For a portfolio with initial value $V_0$, ending value $V_h$ and cash income $D$ over one interval, a simple holding-period return under a no-intermediate-flow convention is $(V_h-V_0+D)/V_0$. Reinvestment or cash flows at other dates need a declared convention. When estimating beta, define portfolio and market returns consistently; income treatment can otherwise create an artificial mismatch.

<a id="contract-multipliers"></a>

## 2. Turn index points into contract exposure

An index futures contract references an index. Its **futures quote** $F$ is in index points. It is not necessarily the contemporaneous spot index level $I$: financing, dividends and maturity can affect the difference. Do not silently set the two equal outside an explicit example.

A **multiplier** $m$ converts a one-point quote move into currency gain or loss for **one contract**. With $F_0$ the initial futures quote, the contract's notional exposure is

$$V_F=mF_0.$$

Units: **(USD / index point / contract) × index points = USD / contract**. Here $V_F$ is notional **per contract**, not the market value paid to acquire a contract. The source's archived CME examples are E-mini S&P 500, **USD 50 per index point**, and Micro E-mini S&P 500, **USD 5 per index point**. [L2 p21, middle CME futures examples box; `lecture-2-p021-index-contract-multipliers`](../../sources/annotated/lecture-2/page-021.md#lecture-2-p021-index-contract-multipliers). These supplied numbers are not a live specification check.

<a id="index-notionals"></a>

At the source example's level of **5,000 points**, the notional illustrations are:

| Supplied contract example | Multiplier, USD/point/contract | Calculation | Notional, USD/contract |
|---|---:|---:|---:|
| E-mini | 50 | 50 × 5,000 | 250,000 |
| Micro E-mini | 5 | 5 × 5,000 | 25,000 |

This table is an accessible re-expression of the source sentence, not a new exchange table. [L2 p21, lower numerical notional sentence; `lecture-2-p021-index-notionals`](../../sources/annotated/lecture-2/page-021.md#lecture-2-p021-index-notionals). For hedge calculations below, the 5,000 is explicitly the **futures quote** used to size the contract. A spot index level alone would not establish the actual futures quote.

<a id="notional-versus-value"></a>

### Four amounts that must not be confused — supplemental

| Amount | What it means | What it does **not** mean |
|---|---|---|
| Contract notional $V_F$ | Quote times multiplier, scaling exposure to quote movements | Cash paid upfront to buy all the underlying shares |
| Current value of a futures position | Value of its contractual rights/obligations under the settlement convention; a newly initiated fairly priced contract often has value near zero | Zero sensitivity or zero potential loss |
| Margin | Collateral posted to support performance, with requirements and later variation payments | The notional or the price paid for a share portfolio |
| Cash invested in the share portfolio $V_A$ | Capital used to hold the actual assets at the sizing date | Automatically increased by the notional of a futures overlay |

Daily settlement transfers gains and losses and can reset the marked value; a zero marked value does not erase exposure to the **next** quote move. A small margin relative to notional is leverage, not a reduction of the underlying market exposure. No margin amount is supplied in these lecture examples; none is invented as the denominator of a hedge count.

<a id="futures-gain"></a>

### Check the multiplier through money gains

A **long** futures position gains when its quote rises; a **short** gains when it falls. For $n$ nonnegative contracts, ignoring costs and the financing of settlement flows, cumulative nominal gains over the hedge interval are

$$G_{\mathrm{long}}=nm(F_h-F_0),\qquad G_{\mathrm{short}}=nm(F_0-F_h).$$

$F_h$ is the quote when the hedge closes. Closing means taking an offsetting trade; it need not coincide with contract expiry. Each expression has USD units. Daily gains add to this price-difference amount; interest earned or paid on those flows is omitted, not assumed to occur at expiry.

**Supplemental worked check:** from 5,000 to 5,100, one E-mini long gains $50\times100=5{,}000$ USD; one short loses 5,000 USD. One Micro long gains $5\times100=500$ USD. If both quotes fall by 100 points instead, the gains reverse signs. The E-mini notional of 250,000 is neither its gain on this move nor a required upfront purchase payment.

<a id="mirror-ratio"></a>

## 3. Derive a hedge for a portfolio that mirrors the index

The source first assumes a portfolio moving **one-for-one with the index** and gives

$$N^*=\frac{V_A}{V_F}.$$

Here $V_A>0$ is the portfolio's starting currency value, $V_F>0$ the currency notional per contract, and $N^*$ a mathematical contract count. [L2 p22, upper full-hedge formula and symbol definitions; `lecture-2-p022-index-mirror-ratio`](../../sources/annotated/lecture-2/page-022.md#lecture-2-p022-index-mirror-ratio). A positive count in this holder's hedge means **short** that number; a long share portfolio is hurt by a market fall.

**Supplemental derivation:** suppose a common fractional market move $u$ describes both the portfolio return and futures quote return over the hedge interval. The portfolio's money change is $V_Au$. Because $F_h-F_0=F_0u$, a short of $N$ contracts gains $-NmF_0u=-NV_Fu$. Combining the two gives

$$\Delta W\approx V_Au-NV_Fu=(V_A-NV_F)u.$$

$\Delta W$ means combined money change; the approximation flags the assumed matching. Setting its market coefficient to zero requires $NV_F=V_A$, hence $N^*=V_A/V_F$. Units cancel as USD divided by USD/contract, leaving contracts. Using deposited margin instead of $V_F$ cannot cancel this price sensitivity.

**What the model assumes:** fixed initial holdings and contract size, common currency, matching market exposure and horizon, approximately matching index/futures fractional moves, no unmodelled dividend/financing difference, no fees, no taxes, no default, and no funding cost on settlements. Fractional counts are allowed mathematically; real implementation may require whole contracts. Index/futures basis changes, portfolio tracking differences and cash-flow timing can spoil exact cancellation. “One-for-one” is stronger than merely a beta estimate of one.

<a id="mirror-example"></a>

### Work every step of the source example

The source portfolio is **USD 5 million**, mirrors the S&P 500, and has contract notional **USD 250,000**:

$$N^*=\frac{5{,}000{,}000}{250{,}000}=20\text{ contracts}.$$

**Short 20**, not long 20, to reduce the holder's exposure to a fall. [L2 p22, lower example box; `lecture-2-p022-index-mirror-example`](../../sources/annotated/lecture-2/page-022.md#lecture-2-p022-index-mirror-example).

**Supplemental cash-leg check:** use $F_0=5{,}000$, $m=50$ and the common-move approximation. The following is an authored scenario table, not a source forecast.

| Common move | Portfolio change, USD | Closing quote, points | Gain on 20 shorts, USD | Combined change, USD |
|---|---:|---:|---:|---:|
| +2% | +100,000 | 5,100 | 20 × 50 × (5,000 − 5,100) = −100,000 | 0 |
| −2% | −100,000 | 4,900 | 20 × 50 × (5,000 − 4,900) = +100,000 | 0 |

This zero is a **conditional market-change offset**, not a guaranteed final wealth or risk-free return. A hedge also gives up gains from the market move it offsets. Changing to the source Micro notional gives $5{,}000{,}000/25{,}000=200$ contracts for the same ideal sensitivity, not 20; ten smaller contracts match one larger contract's notional here.

<a id="return-foundations"></a>

## 4. Beta changes the question from matching quantities to matching return sensitivity

A real share portfolio may not move one-for-one with the chosen market index. Beta measures the sensitivity of its **return** to that market's return. It is not the prior lesson's price-change ratio $h^*$. A USD price change divided by another USD price change depends on price scales; a return divides each change by its own starting value. Equal symbols or a similar regression shape do not make the sizing conventions interchangeable.

Define all returns over the **same observation interval**, with consistent currency and income treatment:

| Symbol | Meaning | Unit |
|---|---|---|
| $r_P$ | Portfolio holding-period return | Dimensionless decimal |
| $r_M$ | Return on the specified market proxy, such as the chosen index | Dimensionless decimal |
| $r_f$ | Risk-free reference return for that same interval and currency | Dimensionless decimal, not an unexplained annual rate |
| $x=r_M-r_f$ | Market excess return, above the risk-free reference | Dimensionless decimal |
| $y=r_P-r_f$ | Portfolio excess return | Dimensionless decimal |
| $\alpha$ | Regression intercept: fitted portfolio excess return when market excess return is zero | Return per observation interval |
| $\beta_P$ | Slope: change in fitted portfolio excess return per unit market excess return | Dimensionless |
| $\varepsilon_P$ | Residual: actual minus fitted portfolio excess return | Return per observation interval |

“Risk-free” is a model reference for a specified currency, horizon and instrument, not a promise that every investment is safe in purchasing-power terms. In the supplemental examples below, $r_f$ is **given directly for the interval**. No annual-rate division or compounding convention is inferred. A one-month return cannot be paired with a one-day return as if both described the same observation.

<a id="market-regression"></a>

## 5. Read the entire source regression, including what is left over

The source writes the excess-return market model:

$$r_P-r_f=\alpha+\beta_P(r_M-r_f)+\varepsilon_P.$$

[L2 p23, upper explanatory sentence and excess-return regression; `lecture-2-p023-market-regression`](../../sources/annotated/lecture-2/page-023.md#lecture-2-p023-market-regression). The parentheses multiply **all** of the market excess return. The residual is added **outside** that product. Rearranging gives $r_P=r_f+\alpha+\beta_P(r_M-r_f)+\varepsilon_P$.

**Intuition:** first remove the common baseline return from portfolio and market. Fit a line linking the remaining two returns. The intercept sets the line's level, beta its slope, and the residual records the amount the line misses. A positive residual means this observation outperformed the fitted line; it is not necessarily a positive total return or guaranteed investment skill.

<a id="beta-and-residual"></a>

### Systematic exposure versus unexplained movement

The source calls beta **systematic market exposure** and identifies the residual as idiosyncratic variation not explained by the market. Beta one tends to move with the market; beta above one has greater market sensitivity. [L2 p23, central beta and residual definitions; `lecture-2-p023-beta-and-residual`](../../sources/annotated/lecture-2/page-023.md#lecture-2-p023-beta-and-residual).

**Supplemental qualifications:** systematic here means the component associated with the selected market factor. The residual may reflect company-specific news, sector effects omitted from a one-index model, measurement errors or other influences. It need not be small, independent of every risk or identical across periods. Beta is not total volatility. A low-beta portfolio can have substantial company/sector risk, and beta one does not mean that every return equals the market return.

If beta is zero, the model becomes $r_P=r_f+\alpha+\varepsilon_P$. The residual can still vary and be negative. Removing a fitted market term does not eliminate all uncertainty. Historical beta zero also does not guarantee future beta zero.

<a id="regression-estimate"></a>

## 6. Estimate beta from paired returns — supplemental bridge

A **sample** is a collection of observations. Pair each portfolio excess return $y_i$ with the market excess return $x_i$ from the same date interval; $i$ labels an observation. With $n$ pairs, let $\bar x$ and $\bar y$ be their arithmetic means, sum divided by $n$. Centering means subtracting the appropriate mean.

An intercept-inclusive least-squares fit chooses the line minimizing the sum of squared residuals. Its slope and intercept are

$$\widehat\beta=\frac{\sum_{i=1}^n(x_i-\bar x)(y_i-\bar y)}{\sum_{i=1}^n(x_i-\bar x)^2},\qquad
\widehat\alpha=\bar y-\widehat\beta\bar x.$$

A hat marks an estimate. The denominator must be positive: a sample with no market variation cannot identify a slope separately from the intercept. Covariance averages the paired centered products; variance averages squared centered market returns. Thus the same slope is $\operatorname{Cov}(x,y)/\operatorname{Var}(x)$ when **the same** normalization and sample are used in both. Dividing both sums by $n$, or both by $n-1$, gives the same ratio. Mixing denominators, intervals or samples does not.

If both standard deviations are positive, correlation is covariance divided by their product, so beta also equals correlation times portfolio-excess-return standard deviation divided by market-excess-return standard deviation. These are **return** deviations, not the previous lesson's spot/futures price-change deviations. Correlation alone does not give beta unless the relative return scales are known. It is co-movement, not proof of causation.

### A complete three-pair fit

Take three supplemental monthly observations, with risk-free return supplied as zero each month. Portfolio and market returns therefore equal their excess returns. This is a tiny teaching sample, not an estimation recommendation.

| Observation | Market $x$ | Portfolio $y$ | $x-\bar x$ | $y-\bar y$ | Centered product | Squared market deviation |
|---|---:|---:|---:|---:|---:|---:|
| A | −0.02 | −0.023 | −0.02 | −0.024 | 0.00048 | 0.0004 |
| B | 0 | 0.001 | 0 | 0 | 0 | 0 |
| C | +0.02 | +0.025 | +0.02 | +0.024 | 0.00048 | 0.0004 |

1. Means: $\bar x=0$; $\bar y=(-0.023+0.001+0.025)/3=0.001$.
2. Product sum: $0.00048+0+0.00048=0.00096$.
3. Squared-market sum: $0.0004+0+0.0004=0.0008$.
4. Beta: $0.00096/0.0008=1.2$.
5. Intercept: $0.001-1.2(0)=0.001$, or 0.1% per month.
6. Fitted returns: $(−0.023,0.001,0.025)$; all sample residuals are zero.

Using denominator $n-1=2$ gives covariance 0.00048 and market variance 0.0004, again beta 1.2. A perfect fit of three invented observations proves neither a future perfect hedge nor causation. The intercept is not cash automatically generated by futures.

<a id="return-example"></a>

### Separate market sensitivity and actual return — supplemental

For one month let $r_f=0.002$ (0.2% for that month), $r_M=-0.03$, $\alpha=0.001$, $\beta_P=1.2$, and $\varepsilon_P=-0.004$. Then:

- Market excess return: $-0.03-0.002=-0.032$.
- Fitted market component: $1.2(-0.032)=-0.0384$.
- Fitted portfolio return before residual: $0.002+0.001-0.0384=-0.0354$, or −3.54%.
- Actual model-decomposed return: $-0.0354-0.004=-0.0394$, or **−3.94%**.

The residual lowers the result by **0.4 percentage points**, not by 0.4% of the fitted return. With the same intercept, baseline and residual but beta zero, the return would be $0.002+0.001-0.004=-0.001$, or **−0.1%**. This is a concrete reason beta zero is not a risk-free realized return. These conditional decompositions are not forecasts.

<a id="beta-sizing"></a>

## 7. Convert beta sensitivity into an index-futures hedge — supplemental derivation

For small/common market changes, the portfolio's market-related money change is approximately $\beta_P V_Au$. The symbol $u$ now isolates a change in the market factor while other terms are held fixed; it is not a claim that all realized return equals that factor. Under the additional approximation that an index-futures short contributes $-NV_Fu$ of market exposure, the combined market coefficient is

$$\beta_PV_A-NV_F.$$

Set that coefficient to zero and divide by positive $V_F$:

$$N^*=\beta_P\frac{V_A}{V_F}.$$

Beta is dimensionless, so units remain contracts. This derived market-neutral sizing is not a physical-quantity formula using price-change $h^*$. It extends the source mirror case, which has beta one **and** matching movements. The source's explicit target-beta formula is taught in the [next lesson](lesson-l2-target-beta-and-relative-view.md); the derivation here makes the meaning of beta-scaled exposure visible.

**Supplemental check:** with beta 1.2, portfolio value USD 5 million and contract notional USD 250,000, market-equivalent exposure is $1.2\times5{,}000{,}000=6{,}000{,}000$ USD. Short $6{,}000{,}000/250{,}000=24$ contracts. For an isolated factor move of +2%, the modeled portfolio component is +120,000 USD and the short component −120,000 USD; for −2% they reverse. This removes that component under the approximation, not the intercept, residual or financing effects. Beta zero calls for zero contracts for this particular market-exposure objective, not proof of no other risk.

<a id="beta-limits"></a>

## 8. What the estimate and hedge cannot promise

The source warns that beta is historical and may change, and that index futures hedge systematic rather than idiosyncratic risk. [L2 p23, lower limitation box; `lecture-2-p023-beta-limits`](../../sources/annotated/lecture-2/page-023.md#lecture-2-p023-beta-limits).

**Supplemental implementation limits:** choose and disclose the market proxy, data window, observation frequency, return/income/currency definitions and intended holding horizon. A beta against one index need not describe exposure to another. A daily estimate need not transfer unchanged to a long holding period. Changes in portfolio holdings, leverage or company conditions can change beta. Using a price index for a dividend-inclusive portfolio without explaining the difference can distort the comparison.

Futures/spot **basis** is their price difference under compatible quotes; changes in it can make futures returns differ from the market proxy. Contract maturity and hedge closing date differ. Rounding and changing portfolio value alter implemented exposure. Liquidity (ability to trade without large price impact), settlement funding, fees and performance/default risks remain. None is removed by calling the historical slope “optimal” or the target “neutral.” A beta-based hedge is a specified linear market-exposure approximation, not automatically the minimum-total-variance hedge for every instrument and horizon.

<a id="practice"></a>

## 9. Progressive practice — all prompts and solutions supplemental

Attempt the problem before following its separate answer link. Keep personal responses in private notes.

<a id="exercise-index-prompt"></a>

### Exercise 1 — specify the measurement (outcome 1)

An index rises from 4,000 to 4,100. Find the point change and simple price return. Explain why the level is not USD, what weighting means, and why dividends require a consistent return convention. Is the source's archived multiplier a verified live contract specification? [Answer 1](#exercise-index-answer).

<a id="exercise-notional-prompt"></a>

### Exercise 2 — contract exposure and gains (outcome 2)

A hypothetical futures quote is 4,000 points and its supplied multiplier is USD 25/point/contract. Find notional. The quote falls to 3,960; find the gain on three shorts and on three longs. Distinguish that gain from notional, margin and the initial contract value. [Answer 2](#exercise-notional-answer).

<a id="exercise-mirror-prompt"></a>

### Exercise 3 — derive and test the mirror hedge (outcome 2)

A USD 2 million portfolio exactly tracks the hypothetical contract's fractional move in exercise 2. Derive the count and direction using the money-change coefficient. Check both legs for the 1% fall to 3,960. List two assumptions needed for the offset. [Answer 3](#exercise-mirror-answer).

<a id="exercise-regression-prompt"></a>

### Exercise 4 — fit a different sample (outcome 2)

Paired monthly excess market returns are $(−0.01,0,0.01)$ and portfolio excess returns $(−0.003,0.002,0.007)$. Calculate means, centered-product sum, squared-market sum, beta, intercept, fitted returns and residuals. State why common denominator choice cancels and why no variation in market returns would break the slope calculation. [Answer 4](#exercise-regression-answer).

<a id="exercise-return-prompt"></a>

### Exercise 5 — read a full return decomposition (outcome 1)

For one month use $r_f=0.002$, $r_M=-0.03$, $\alpha=0.001$, $\beta_P=1.2$, $\varepsilon_P=-0.004$. Calculate excess market return, fitted portfolio return, actual decomposed return and the return if beta alone were zero. Identify which component a market hedge targets and why residual loss remains. [Answer 5](#exercise-return-answer).

<a id="exercise-beta-prompt"></a>

### Exercise 6 — transfer beta sizing (outcome 2)

Use beta 0.5, USD 2 million portfolio and the USD 100,000 per-contract notional from exercise 2. Find market-equivalent exposure and the neutralizing short count. Check the money components for a +1% isolated market factor move. Why is inserting the earlier price-change ratio into this formula unjustified? [Answer 6](#exercise-beta-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 7 — teach the distinctions (outcome 1)

Explain to a beginner index points versus notional versus margin; price changes versus returns; beta versus total risk; and fitted residual versus future certainty. Include the return interval, market proxy and dividend convention. Explain why beta one need not mean an exact mirror, and beta zero need not mean risk-free. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 8 — diagnose a hedge calculation (outcome 2)

A learner says: “The 5,000-point contract costs USD 5,000, so a USD 5 million mirror portfolio needs 1,000 contracts. Buy them to protect a fall. Beta 1.2 means 120% of all risk disappears after hedging.” Repair the exposure, count, direction and interpretation using the source multiplier 50. Give the separate count for beta 1.2 and a cash-leg check. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 10. Separate supplemental answers and diagnosis

<a id="exercise-index-answer"></a>

### Answer 1

Change = **100 points**. Return = $100/4{,}000=0.025=\mathbf{2.5\%}$. Points are a scale, not a currency price of the entire portfolio. Weighting determines constituent contributions; a market-cap weight and a price weight are different rules. A price return excludes separately distributed dividends, whereas a consistent total-return convention includes income appropriately. Archived source examples are **not** a current specification/methodology verification.

**Retry:** write the unit beside each input before dividing. If your result is 100%, you confused point change with return.

<a id="exercise-notional-answer"></a>

### Answer 2

Notional = $25\times4{,}000=\mathbf{100{,}000}$ USD/contract. Quote change = **−40 points**. Three shorts gain $3\times25\times40=\mathbf{3{,}000}$ USD; three longs lose **3,000 USD**. Their combined notional magnitude is **300,000 USD**, not the gain or an upfront asset purchase. Margin is separately specified collateral. A new fairly priced contract may have zero initial value while retaining these gains/losses from future moves; no margin amount is given.

**Retry:** if you used 4,000 as USD notional, include the multiplier. If a short loses on this fall, reverse the price difference.

<a id="exercise-mirror-answer"></a>

### Answer 3

Under the common fractional-move approximation, combined change is $(V_A-NV_F)u$. Zero coefficient gives $N=2{,}000{,}000/100{,}000=\mathbf{20}$, **short**. A −1% portfolio return loses **20,000 USD**. The quote falls 40 points, so shorts gain $20\times25\times40=\mathbf{20{,}000}$ USD. Combined modeled change is **zero**. Matching returns/horizon, no funding/costs, fixed exposure and no basis/tracking mismatch are relevant assumptions; explain at least two.

**Retry:** if you bought futures, write the loss on a long when the quote falls. If you called the zero a guaranteed risk-free return, identify the omitted sources of mismatch.

<a id="exercise-regression-answer"></a>

### Answer 4

Means: $\bar x=0$, $\bar y=0.002$. Centered portfolio values are $(−0.005,0,0.005)$. Products sum to $0.00005+0+0.00005=\mathbf{0.0001}$; squared market deviations sum to $0.0001+0+0.0001=\mathbf{0.0002}$. Beta is **0.5**; intercept **0.002**, or 0.2% per month. Predictions equal $(−0.003,0.002,0.007)$ and residuals are **zero** in this invented sample. Dividing both sums by the same positive factor does not change their ratio; a constant market series instead gives zero denominator and no identified slope. Perfect sample fit does not ensure future fit.

**Retry:** if beta is 2, check that market squared deviations are the denominator. If the intercept is zero, calculate the fitted return when market excess return is zero.

<a id="exercise-return-answer"></a>

### Answer 5

Excess market return **−0.032**; market component **−0.0384**; fitted portfolio return **−0.0354 = −3.54%**; actual decomposed return **−0.0394 = −3.94%**. With beta zero and the other given components unchanged, return is **−0.001 = −0.1%**. A market hedge targets the beta-related exposure; the residual **−0.004** remains and is a 0.4-percentage-point deduction. It does not become a fraction of the fitted loss. Baseline/intercept treatment and funding must also be specified before promising a net return.

**Retry:** multiply the entire parenthesis by beta. Add the residual separately. Compare a percentage-point difference with a percentage change before interpreting it.

<a id="exercise-beta-answer"></a>

### Answer 6

Market-equivalent exposure = $0.5\times2{,}000{,}000=\mathbf{1{,}000{,}000}$ USD. Count = $1{,}000{,}000/100{,}000=\mathbf{10}$ **short** contracts. A +1% factor move produces **+10,000 USD** of portfolio market component and **−10,000 USD** of futures component, net **zero** for that factor. Beta measures return sensitivity; the earlier $h^*$ measures paired price-change sensitivity and belongs with consistent physical quantities. They cannot be substituted just because both are slopes.

**Retry:** if you chose 20, you matched full value but omitted beta. If you claim no residual risk, distinguish the market component from total return.

<a id="exercise-explain-teachback-answer"></a>

### Answer 7 — sufficient model explanation

“Index levels are points. A multiplier converts points into per-contract currency exposure; notional scales gains, while margin is collateral and a new contract's value can be zero. Returns divide changes by starting levels/values, unlike currency price changes. Beta fits paired excess returns for a declared market proxy and consistent intervals, currencies and income treatment. It measures market sensitivity, not all risk. The intercept sets the fitted line's level and the residual is what it misses. Beta one can coexist with residual variation, so it is not an exact mirror; beta zero removes only the fitted market term. Historical co-movement neither proves causation nor fixes future beta.”

**Retry:** if the explanation is only equations, describe how a zero-value futures contract can lose money tomorrow and how a beta-zero portfolio can suffer company-specific loss.

<a id="exercise-apply-teachback-answer"></a>

### Answer 8 — repair each error

Notional is $50\times5{,}000=\mathbf{250{,}000}$ USD/contract, not USD 5,000. The learner's $5{,}000{,}000/5{,}000=1{,}000$ omits units and multiplier. A mirror hedge is **20 shorts**. For a 100-point fall, portfolio loss is **100,000 USD** and futures gain is $20\times50\times100=\mathbf{100{,}000}$ USD under the matching-return assumption. For beta **1.2**, neutral market sizing is **24 shorts**; the corresponding −2% factor component is **−120,000 USD**, offset by **+120,000 USD**. Neither calculation guarantees removal of residual, basis, estimation or funding risks. Beta 1.2 is sensitivity, not a percentage of every risk eliminated.

**Retry:** check units, direction and the targeted component separately. A correct count without those explanations is not a complete answer.

<a id="evidence"></a>

## Source boundaries and stop check

All full normalized/raw pages 21–23 and their original PNGs were inspected. Page 21 has definition/weighting bullets, a contract-example box and a notional sentence. Page 22 has a formula, symbol definitions and an example. Page 23 has the regression and interpretation/limitation text. There are **no source plots or numerical scenario tables** here; all return/regression/cash-leg tables beyond the explicitly re-expressed notional sentence are supplemental, not invented source figures.

| Page | Normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|
| 21 | [Full 21](../../sources/annotated/lecture-2/page-021.md) | [Raw 21](../../sources/extracted/lecture-2/page-021.md#page-21) | [Image 21](../../sources/assets/lecture-2/page-021.png) |
| 22 | [Full 22](../../sources/annotated/lecture-2/page-022.md) | [Raw 22](../../sources/extracted/lecture-2/page-022.md#page-22) | [Image 22](../../sources/assets/lecture-2/page-022.png) |
| 23 | [Full 23](../../sources/annotated/lecture-2/page-023.md) | [Raw 23](../../sources/extracted/lecture-2/page-023.md#page-23) | [Image 23](../../sources/assets/lecture-2/page-023.png) |

Canonical source units are verified despite older draft banners on normalized pages; that does not approve this lesson. No registered source issue affects these eight units. No restricted textbook or private learner evidence was used. Attempt both teach-backs without the answers. Diagnose units, regression meaning, hedge sign and risk interpretation separately before repeating a calculation. Author checks establish neither independent teaching approval nor learner mastery.
