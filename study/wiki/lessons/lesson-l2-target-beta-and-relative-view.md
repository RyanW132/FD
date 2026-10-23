# Target beta: change market exposure while keeping a relative view

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all ten substantive units on Lecture 2 physical pages 24–26. The supplied portfolio and contract numbers are archived teaching examples, not current specifications or advice. Added derivations, risk explanations, scenarios, exercises and solutions are **supplemental**. The source's target-0.50 question is retained and its authored answer is labelled, not passed off as an official solution.

<a id="outcomes"></a>

## Observable outcomes

1. **Explain the decision:** given an initial beta, desired beta and commercial motivation, state a signed-to-short convention, identify whether to buy or sell, and explain the relative-performance intention and remaining risks. Success requires distinguishing market exposure from all risk, notional from margin, and conditional expected returns from guaranteed realized returns.
2. **Derive, calculate and audit:** derive the target-beta count from a market-exposure balance, reproduce the source neutral hedge and answer its 0.50 extension, transfer to higher/negative targets, compare whole-contract candidates and check their implemented beta. Success requires correct units, all signs interpreted as actual trades, explicit approximation/rounding assumptions, and separate portfolio/futures cash-leg checks.

The [preceding lesson](lesson-l2-indices-and-beta.md) introduces indices, notional and return beta. The definitions needed here are repeated before use. Supporting references: [beta and sizing](../concepts/concept-hedge-ratio-and-beta.md), [numeric units](../concepts/concept-numeric-foundations.md#numeric-units), [statistical foundations](../concepts/concept-statistical-foundations.md#statistics-moments). No later interest-compounding lesson is assumed.

<a id="foundations"></a>

## 1. What exactly are we trying to change?

A **portfolio** is a collection of assets. Its **beta** is the slope relating its return to a chosen market's return, estimated under a declared model. For paired same-interval returns, the source's preceding market model is portfolio excess return = intercept + beta × market excess return + residual. “Excess” means above the risk-free reference return for the same currency and interval. The intercept is the fitted return when market excess return is zero; the residual is actual return not explained by the fitted line.

Beta is dimensionless. Beta 1.2 means that a one-percentage-point change in the market factor corresponds to a 1.2-percentage-point change in the fitted portfolio component, with other components held fixed. It is not a probability and not the proportion of total risk. Historical beta depends on the market proxy, sample, return definition and horizon; it may change.

A futures **overlay** adds futures exposure without selling the underlying share portfolio. A **long** futures position gains from a rising quote; a **short** gains from a falling quote. The aim may be to reduce market sensitivity to zero, reduce it only partway, increase it, or even reverse it. The desired sensitivity is the **target beta**. None of these choices alone determines all risk or expected profit.

<a id="notation"></a>

### Define symbols and signs before calculating

| Symbol | Meaning | Units / restrictions |
|---|---|---|
| $V_A$ | Portfolio value at the sizing date; capital base used to measure overlay return | Currency, positive and fixed for this sizing approximation |
| $\beta_P$ | Initial estimated portfolio beta to the selected market factor | Dimensionless; can be negative |
| $\beta_T$ | Desired target beta, denoted $\beta^*$ on the source slide | Dimensionless; chosen objective, not necessarily an optimum |
| $F_0$ | Selected futures quote at sizing | Index points |
| $m$ | Contract multiplier | Currency per point per contract |
| $V_F=mF_0$ | Notional exposure of one futures contract | Currency per contract, assumed positive here |
| $N^*$ | Continuous target count, **signed to short** | Positive: short that many; negative: buy its magnitude; zero: no overlay |
| $N$ | Implemented signed whole-contract count | Same sign convention, whole number |
| $\beta_{\mathrm{after}}$ | Beta of combined exposure normalized by the stated $V_A$ | Conditional model value, not a future guarantee |

**Signed-to-short means:** +6 denotes **sell six contracts short**; −6 denotes **buy six contracts long**. “Short minus six” without interpretation is not an adequate trade decision. The star on $N^*$ denotes a calculated continuous target; it does not by itself prove minimum total variance. The source uses a star on target beta too; here the subscript $T$ avoids confusing the requested beta with an estimated optimum.

Notional is **quote × multiplier**, not margin deposited, not cash invested in all the underlying shares and not the current market value of a newly initiated futures contract. Such a contract often starts with value near zero but substantial price sensitivity. We normalize the overlay by the original portfolio capital $V_A$, not by $V_A$ plus the absolute futures notional. If additional funding capital is included in the investor's return denominator, its definition and exposure must be incorporated explicitly; this simple formula does not silently do that.

<a id="assumptions"></a>

### The approximation contract — supplemental but essential

The model assumes the index futures supplies approximately one unit of the selected market return sensitivity per unit of its starting notional. Portfolio beta and values are fixed over the sizing calculation; index/futures return mismatch, changing holdings and nonlinear exposures are ignored at first. Both legs use the same currency and market factor. The intended hedge interval is declared; closing futures can precede their expiry.

For illustrative cash-leg checks below, we explicitly set the interval's risk-free return and separate dividend/income contribution to **zero**, so the hypothetical market factor move can be identified with the index/futures fractional move. This simplifies arithmetic; it is not a claim that actual interest or dividends are zero. The general beta balance concerns **sensitivity**, not an exact total-return identity. Financing, dividends and futures basis can affect realized results and intercepts even when the estimated slope is targeted correctly.

No fees, taxes, spread costs, settlement-funding costs, default or trading limits are included in the basic count. Futures daily cash settlements add to the quote-difference gain if their financing is ignored; actual cash may be needed well before the portfolio is sold. Fractional contracts are permitted only for the mathematical target; integer constraints are treated separately. These assumptions limit the result, not the arithmetic.

<a id="target-formula"></a>

## 2. Derive the target-beta formula rather than memorizing its sign

Let $u$ be a small change in the market factor over the chosen interval, with other model terms held fixed. The portfolio's market-related money change is approximately $\beta_PV_Au$. A signed-to-short overlay contributes approximately $-NV_Fu$. Thus

$$\Delta W_{\mathrm{market}}\approx(\beta_PV_A-NV_F)u.$$

The subscript “market” makes clear that this excludes residual and other components. The desired coefficient of $u$ is $\beta_TV_A$. Equate current combined and desired coefficients:

$$\beta_PV_A-N^*V_F=\beta_TV_A.$$

Subtract the target term and rearrange one step at a time:

$$N^*V_F=(\beta_P-\beta_T)V_A,\qquad
\boxed{N^*=(\beta_P-\beta_T)\frac{V_A}{V_F}}.$$

This is the source formula, with $\beta_T$ used here for the source's $\beta^*$. [L2 p24, upper target-beta statement and boxed formula; `lecture-2-p024-target-beta-formula`](../../sources/annotated/lecture-2/page-024.md#lecture-2-p024-target-beta-formula). The algebraic derivation and explicit sign convention are supplemental explanations. Units: dimensionless beta difference × currency ÷ currency/contract = contracts. A deposit or index-point level alone has the wrong exposure meaning in the denominator.

<a id="target-direction"></a>

### Why lower beta means selling and higher beta means buying

For positive $V_A$ and $V_F$, the sign comes entirely from $\beta_P-\beta_T$:

| Desired change | Difference | Signed count | Actual trade and effect |
|---|---|---|---|
| Lower beta, $\beta_P>\beta_T$ | Positive | Positive | Short futures; subtract positive market exposure |
| Raise beta, $\beta_P<\beta_T$ | Negative | Negative | Buy the magnitude; add positive market exposure |
| Leave beta unchanged | Zero | Zero | No overlay for this objective |

The source states the short/buy directions and that a zero target removes estimated market exposure, not all risk. [L2 p24, central direction and zero-target bullets; `lecture-2-p024-target-beta-direction`](../../sources/annotated/lecture-2/page-024.md#lecture-2-p024-target-beta-direction).

This is about raising or lowering **beta**, not necessarily decreasing overall risk or predicting prices. Raising a negative beta toward zero means buying; moving a positive beta below zero may require enough shorts to reverse its market sensitivity. A negative contract count is a direction under the declared convention, not a negative number of physical contracts.

<a id="beta-neutral"></a>

### Zero target is a special case, not a risk-free portfolio

Put $\beta_T=0$ in the source formula:

$$N^*=\beta_P\frac{V_A}{V_F}.$$

[L2 p24, lower special-case box; `lecture-2-p024-beta-neutral-special-case`](../../sources/annotated/lecture-2/page-024.md#lecture-2-p024-beta-neutral-special-case). Inserting the result makes the estimated market coefficient zero. It does not set the regression residual to zero, freeze beta forever, remove trading/funding risk or guarantee the risk-free return. “Market neutral” here describes the **intended single-factor sensitivity**, not neutrality to every possible market or company shock.

<a id="implemented-beta"></a>

### Always check back through the exposure equation — supplemental

For any chosen signed count $N$, divide its combined coefficient by the original $V_A$:

$$\beta_{\mathrm{after}}=\beta_P-N\frac{V_F}{V_A}.$$

A positive $N$ lowers this beta; a negative $N$ increases it. This back-check catches a reversed sign, missing multiplier and rounding mismatch. It is a current-input model calculation: subsequent price/value changes, re-estimated beta and funding can change the actual exposure. Do not describe a rounded count as implementing the exact target unless this calculation supports it.

<a id="source-inputs"></a>

## 3. Read all source inputs and calculate the contract notional

The source example supplies a **USD 5 million** portfolio with beta **1.20**, and E-mini futures quoted at **5,000 points** with multiplier **USD 50/point/contract**. [L2 p25, upper portfolio and contract notional calculation; `lecture-2-p025-beta-example-inputs`](../../sources/annotated/lecture-2/page-025.md#lecture-2-p025-beta-example-inputs).

| Supplied input | Value | Role |
|---|---:|---|
| Portfolio $V_A$ | USD 5,000,000 | Capital whose market sensitivity is changed |
| Initial beta $\beta_P$ | 1.20 | Estimated market-return sensitivity |
| Futures quote $F_0$ | 5,000 points | Quote, not a currency notional by itself |
| Multiplier $m$ | USD 50/point/contract | Converts quote moves to currency |
| Initial target $\beta_T$ | 0 | Remove estimated market sensitivity |

First compute $V_F=50\times5{,}000=\mathbf{250{,}000}$ USD/contract. Then $V_A/V_F=5{,}000{,}000/250{,}000=\mathbf{20}$ contracts per unit beta adjustment. The calculation is not $5{,}000{,}000/5{,}000$: that divides currency by points and omits the multiplier. The source gives no margin amount, observation window, realized market path or hedge closing/expiry dates. Do not invent them or infer a one-month forecast from these inputs.

<a id="source-calculation"></a>

### Target zero: reproduce and independently check the count

Substitute in the stated order:

$$N^*=(1.20-0)\frac{5{,}000{,}000}{250{,}000}=1.20\times20=24.$$

This is the source's displayed zero-beta calculation. [L2 p25, middle zero-beta hedge calculation; `lecture-2-p025-beta-example-calculation`](../../sources/annotated/lecture-2/page-025.md#lecture-2-p025-beta-example-calculation).

**Supplemental exposure check:** initial market-equivalent exposure is $1.20\times5{,}000{,}000=6{,}000{,}000$ USD. Twenty-four contracts supply $24\times250{,}000=6{,}000{,}000$ USD of opposite market notional. Remaining coefficient is zero; implemented beta is $1.20-24(250{,}000/5{,}000{,}000)=1.20-1.20=0$. The total futures notional exceeds portfolio value here because beta exceeds one; this is not a reason to replace 24 with 20.

<a id="source-decision"></a>

The source decision is **short 24 E-mini contracts**. [L2 p25, lower decision box; `lecture-2-p025-beta-example-decision`](../../sources/annotated/lecture-2/page-025.md#lecture-2-p025-beta-example-decision). The count happens to be a whole number, so no integer approximation is needed for these inputs.

**Supplemental cash-leg audit:** choose a hypothetical −2% factor move with zero interval risk-free return, no income and no residual in this check. The fitted portfolio market return is $1.2(-0.02)=-0.024$, losing **120,000 USD**. Assume the futures quote similarly falls from 5,000 to 4,900. The 24 shorts gain $24\times50\times100=\mathbf{120{,}000}$ USD. The modeled market components cancel. If a company-specific residual also lost 15,000 USD, that separate loss would remain; the numerical beta hedge does not refund it.

<a id="source-question"></a>

## 4. Preserve the source extension question: target beta 0.50

The source asks how many contracts reduce the example's beta to **0.50**. [L2 p25, bottom extension box; `lecture-2-p025-beta-extension-question`](../../sources/annotated/lecture-2/page-025.md#lecture-2-p025-beta-extension-question). Try it before reading the following **supplemental solution**; the source page does not print this answer.

Desired reduction: $1.20-0.50=0.70$. Therefore

$$N^*=0.70\times20=14\text{ contracts, short}.$$

Check: $\beta_{\mathrm{after}}=1.20-14(0.05)=1.20-0.70=\mathbf{0.50}$, since one contract changes beta by $250{,}000/5{,}000{,}000=0.05$ in this setup. Fourteen contracts offset **USD 3.5 million** of market-equivalent exposure, leaving **USD 2.5 million**, not zero. A half-beta target is not a fully neutral hedge.

For the same hypothetical −2% factor move, portfolio market loss remains **120,000 USD**; 14 shorts gain **70,000 USD**, leaving **−50,000 USD**. Dividing by USD 5 million gives **−1%**, which equals target beta 0.50 times the −2% factor move. Keeping some market exposure intentionally keeps both some downside and some upside.

<a id="direction-examples"></a>

## 5. Transfer the sign convention — supplemental examples

Keep $V_A/V_F=20$ and initial beta 1.20 unless a row says otherwise. Each result is checked using $\beta_{\mathrm{after}}=\beta_P-0.05N$.

| Initial beta | Target beta | Signed target $N^*$ | Actual trade | Back-check |
|---:|---:|---:|---|---|
| 1.20 | 1.50 | (1.20 − 1.50) × 20 = −6 | **Buy six** | 1.20 − (−6 × 0.05) = 1.50 |
| 1.20 | 1.20 | 0 | No overlay | 1.20 |
| 1.20 | −0.20 | 28 | **Short 28** | 1.20 − 1.40 = −0.20 |
| −0.40 | 0 | −8 | **Buy eight** | −0.40 + 0.40 = 0 |
| 0 | 0 | 0 | No market hedge in this model | 0 |

A negative target means negative sensitivity to the chosen market, not elimination of all risk. An initial negative beta portfolio already tends to move opposite the market component; buying positive-market futures can neutralize it. These are model transfers, not source recommendations.

**Boundary checks:** $V_A>0$ and $V_F>0$ are required for the stated interpretation. A zero multiplier or zero notional cannot be divided by to obtain a meaningful count. Zero portfolio capital makes this normalized-beta model unsuitable; do not infer a valid return by dividing by zero. If the futures has a materially different sensitivity to the chosen market factor, this one-for-one notional approximation must be revised rather than used unchanged. If beta cannot be estimated because the market sample has no variation, no reliable fitted input emerges from that regression.

<a id="rounding"></a>

## 6. Whole contracts change the implemented beta — supplemental

Consider a new hypothetical portfolio: $V_A=1{,}000{,}000$ USD, initial beta **1.17**, target **0.50**, and futures notional **100,000 USD/contract**. The continuous count is

$$N^*=(1.17-0.50)\frac{1{,}000{,}000}{100{,}000}=0.67\times10=6.7.$$

Fractional contracts are a mathematical exposure target, not a whole-contract trade. The **floor** is the largest integer no greater than the target, here six; the **ceiling** is the smallest integer no less, here seven. Compare actual results:

| Chosen shorts | Removed beta $N V_F/V_A$ | Implemented beta | Signed error from 0.50 | Absolute error |
|---:|---:|---:|---:|---:|
| 6 | 0.60 | 0.57 | +0.07 | 0.07 |
| 7 | 0.70 | 0.47 | −0.03 | 0.03 |

Seven is closer for the explicitly chosen objective **minimize absolute distance from the target beta with fixed inputs and no costs/other constraints**. It implements **0.47**, not exactly 0.50. It is not automatically the best real-world hedge or a proven minimum of every risk measure.

The error identity explains this comparison:

$$\beta_{\mathrm{after}}-\beta_T=-(N-N^*)\frac{V_F}{V_A}.$$

Because the positive factor is constant, the nearest integer to $N^*$ minimizes absolute beta error. At an exact half-integer, both neighbors tie for this objective. With negative targets/counts use signed neighboring integers, not an unexplained “round down” trade direction. Trading costs, one-sided exposure limits, uncertain beta or a different objective can change the chosen integer.

**Cash sensitivity check:** for a +1% factor move, the portfolio market component is **+11,700 USD**. Six shorts subtract **6,000 USD**, leaving **5,700 USD**, or **0.57%** of the portfolio. Seven subtract **7,000 USD**, leaving **4,700 USD**, or **0.47%**. The requested target would have left 5,000 USD, so the two errors are +700 and −300 USD on this move. These cash legs agree with the beta errors rather than hiding rounding behind the label “0.50 hedge.”

<a id="relative-view"></a>

## 7. A relative view is not a prediction that every price rises

The source motivates using index futures when an investor has a view about particular shares rather than the whole market. [L2 p26, upper motivation statement; `lecture-2-p026-relative-view`](../../sources/annotated/lecture-2/page-026.md#lecture-2-p026-relative-view).

**Relative performance** compares an investment with a benchmark: a portfolio can outperform a falling market while still losing money outright. A market overlay aims to retain the desired nonmarket component while reducing an unwanted broad-market component. It does not ensure the investor's relative view is correct. For beta different from one, the relevant comparison is a **beta-adjusted** market component, not always a simple portfolio return minus market return.

<a id="biopharma"></a>

### The source biopharma motivation, stated faithfully

The source investor expects a biopharma share portfolio to outperform the market but worries that the whole market may fall. Short index futures can reduce the broad-market exposure while retaining relative-performance exposure. [L2 p26, middle example box; `lecture-2-p026-biopharma-example`](../../sources/annotated/lecture-2/page-026.md#lecture-2-p026-biopharma-example). “Biopharma” refers to businesses developing or supplying biological/pharmaceutical therapies; the sector's company and regulatory outcomes need not track a broad index. No prices, beta estimate or realized return are supplied for this source motivation. The numbers below are deliberately **new supplemental scenarios**, not recovered source data.

<a id="relative-scenarios"></a>

### Work both legs, including when the relative view fails — supplemental

For one hypothetical holding period, suppose portfolio value is **USD 1 million**, beta **one**, and desired beta zero. A hypothetical index future has quote **2,000 points** and multiplier **USD 50/point/contract**, hence notional **USD 100,000/contract**. Short $1{,}000{,}000/100{,}000=10$ contracts. Assume zero interval risk-free return, no dividends/income, no costs or settlement funding, fixed position, and futures quote returns equal the market return. The portfolio's actual return can differ because of its residual component. These assumptions make the following arithmetic transparent; they do not forecast biopharma returns.

| Scenario | Market return | Portfolio return | Portfolio change, USD | Futures closing quote | Gain on ten shorts, USD | Combined change, USD |
|---|---:|---:|---:|---:|---:|---:|
| Relative view succeeds in a falling market | −10% | −6% | −60,000 | 1,800 | +100,000 | **+40,000** |
| Relative view fails in a falling market | −10% | −14% | −140,000 | 1,800 | +100,000 | **−40,000** |
| Shares rise, but lag a rising market | +10% | +6% | +60,000 | 2,200 | −100,000 | **−40,000** |

For the first row, the futures quote falls 200 points; $10\times50\times200=100{,}000$ USD offsets the common market loss, leaving +40,000 USD. Dividing by original capital gives +4%. That equals portfolio return −6% minus market return −10%, a **four-percentage-point outperformance** in this special beta-one, zero-baseline model.

The second row's −14% is four percentage points worse than the market, so the overlay leaves a loss. In the third row the shares gain outright, but the investor loses on the combined position because short futures lose more than the shares gain. “My shares rose” is not enough to validate a relative-performance position. With beta not equal to one, dividends, nonzero funding or futures basis, the simple return difference would need adjustment; do not generalize the table's equality beyond its assumptions.

<a id="conditional-return"></a>

### Why a zero-beta illustration is not a guaranteed risk-free return — supplemental

A **conditional expectation** is a model's average over possible outcomes given its assumptions and information; it is not the next realized outcome. In a simplified market model write

$$r_P=r_f+\alpha+\beta_P x+\varepsilon_P,\qquad x=r_M-r_f.$$

Here $r_f$ is a return already specified for the holding interval, not an annual interest quote. Suppose, as an additional idealization, the futures overlay's return on the original capital is exactly $-(\beta_P-\beta_T)x$ after consistently accounting for the baseline/financing convention. Adding gives

$$r_H=r_f+\alpha+\beta_Tx+\varepsilon_P.$$

$r_H$ is the combined return under that idealization. A zero target leaves $r_H=r_f+\alpha+\varepsilon_P$, not automatically $r_f$. Only if a further model sets $\alpha=0$ and expected residual to zero does expected hedged return equal $r_f$ under the matched-financing assumption. Even then a realized residual can be negative. A CAPM-style expected-return illustration imposes an expected pricing relation; it does not promise an observed return. The source pages here do **not** provide a numerical CAPM table or risk-free interest rate; none is attributed to them.

For a concrete supplemental one-period check, take $r_f=0.002$, $\alpha=0$, target beta zero and a realized residual $-0.01$. Then $r_H=0.002-0.01=-0.008$, or **−0.8%**, despite zero modeled beta. The supplied 0.2% is the entire period's baseline return. No annual conversion or later compounding formula is needed. Real futures cash flows may not implement the idealized excess-return leg exactly, which is an additional reason not to promise this return identity in practice.

<a id="residual-risks"></a>

## 8. Name what remains after the market coefficient is reduced

The source specifically retains sector/company-specific, basis, model and estimation risks. [L2 p26, lower what-remains box; `lecture-2-p026-beta-residual-risks`](../../sources/annotated/lecture-2/page-026.md#lecture-2-p026-beta-residual-risks).

| Risk | Meaning in this decision | Why target beta does not remove it |
|---|---|---|
| Company/sector-specific | Trial outcomes, earnings, regulation or sector shocks not captured by the broad index | A market short need not gain when those holdings underperform |
| Basis/tracking | Futures quote and market proxy or actual portfolio do not move as assumed | The exposure subtraction uses an approximate common factor |
| Model/estimation | Beta, proxy choice, frequency/window or linear relation is wrong or changes | An accurately calculated count can still use inaccurate inputs |
| Rounding/value changes — supplemental | Whole contracts and changing portfolio/contract values alter exposure | The desired fractional beta is not automatically maintained |
| Liquidity/cost — supplemental | Difficulty trading promptly at the expected price; spreads/fees | The algebra assumes frictionless entry/exit |
| Financing/cash timing — supplemental | Daily futures losses require cash before share gains are sold | A good terminal offset does not finance interim settlement needs |
| Performance/default and operational risk — supplemental | An obligation, broker process or transaction fails | A beta identity does not guarantee execution or performance |

The investor must still be right about relative performance for that part of the position to succeed. “Market-neutral intent” names a target in a chosen model; it is not a label for a safe investment. A short futures hedge can lose sharply during a rising market even while the shares rise. The lesson's zero-cost arithmetic does not size cash reserves or specify a real contract to trade.

<a id="practice"></a>

## 9. Progressive practice — separate supplemental answers follow

All added prompts and solutions are supplemental. Exercise 2 preserves the source's printed target-0.50 question. Attempt each calculation with units and an explicit trade direction.

<a id="exercise-derive-prompt"></a>

### Exercise 1 — build the balance (outcome 2)

Starting from portfolio market coefficient $\beta_PV_A$ and a signed-to-short overlay coefficient $-NV_F$, derive the source count for target $\beta_T$. Derive implemented beta and the integer-error identity. State the denominator assumptions and why notional, not margin, belongs in the count. [Answer 1](#exercise-derive-answer).

<a id="exercise-source-prompt"></a>

### Exercise 2 — source calculation and source extension (outcome 2)

Use portfolio USD 5 million, beta 1.20, futures quote 5,000 and multiplier USD 50/point/contract. Calculate notional and the zero-target hedge. Then answer the [p25 bottom question](../../sources/annotated/lecture-2/page-025.md#lecture-2-p025-beta-extension-question): how many contracts reduce beta to 0.50? State direction and back-check both betas. Check both money legs for the specified supplemental −2% factor move with no residual, zero risk-free return and no income. [Answer 2](#exercise-source-answer).

<a id="exercise-direction-prompt"></a>

### Exercise 3 — interpret negative counts (outcome 1)

With the same value/notional ratio 20, find trades to change beta 1.20 to 1.50, leave it 1.20, change it to −0.20, and change an initial beta −0.40 to zero. Explain each sign as buying/selling an actual nonnegative number of contracts. Is raising beta always reducing total risk? [Answer 3](#exercise-direction-answer).

<a id="exercise-rounding-prompt"></a>

### Exercise 4 — compare whole contracts (outcome 2)

For USD 1 million, initial beta 1.17, target 0.50 and notional USD 100,000/contract, compute continuous count, both neighbors, implemented betas and absolute target errors. Which minimizes absolute beta error under fixed zero-cost inputs? Check money sensitivities for a +1% factor move. [Answer 4](#exercise-rounding-answer).

<a id="exercise-transfer-prompt"></a>

### Exercise 5 — a negative fractional target and a tie (outcome 2)

New portfolio: USD 2 million, initial beta 0.80, desired beta 1.10, notional USD 200,000/contract. Find the signed count, actual trade and implemented beta. Separately, with the same values but desired beta 1.05, compare the neighboring signed whole counts. Explain the tie under absolute-beta-error minimization; do not silently choose a universal rounding rule. [Answer 5](#exercise-transfer-answer).

<a id="exercise-relative-prompt"></a>

### Exercise 6 — test a relative-performance claim (outcome 1)

Use the supplemental beta-one USD 1 million portfolio and ten shorts, quote 2,000, multiplier 50, and the table's zero-baseline/cost assumptions. If the market rises 10% while the portfolio rises only 6%, calculate both money legs and combined return. Explain why the portfolio rising does not imply success. What changes in interpretation if beta differs from one? [Answer 6](#exercise-relative-answer).

<a id="exercise-explain-teachback-prompt"></a>

### Exercise 7 — explain neutral intent without a guarantee (outcome 1)

Explain the source biopharma motivation to a beginner. Distinguish desired relative performance, estimated market neutrality and remaining company/sector, basis/model and cash-funding risks. In the idealized return equation, what extra assumptions make expected zero-beta return equal the period's risk-free return? Does that fix realized return? Compute the supplemental beta-zero example with period return 0.2%, zero alpha and residual −1%. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>

### Exercise 8 — diagnose an apparently correct number (outcome 2)

A learner says: “Target 0.50 needs 14 long contracts; because initial contract value is zero, exposure is zero anyway. Rounding 6.7 to seven always gives beta exactly 0.50 and eliminates all risk.” Repair every claim using the source case and the rounding case. Name two reasons a real result can differ from the modeled beta. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 10. Explicit supplemental answers, diagnosis and retries

<a id="exercise-derive-answer"></a>

### Answer 1

Set $\beta_PV_A-N^*V_F=\beta_TV_A$. Rearrangement gives $N^*V_F=(\beta_P-\beta_T)V_A$, then $N^*=(\beta_P-\beta_T)V_A/V_F$. Dividing the combined coefficient by original capital gives $\beta_{\mathrm{after}}=\beta_P-NV_F/V_A$. Subtract the target and use the defining equation for $N^*$ to get $\beta_{\mathrm{after}}-\beta_T=-(N-N^*)V_F/V_A$. Require positive portfolio value and per-contract notional in this convention, and an appropriate common-factor model. Notional determines quote sensitivity; collateral does not replace it. Units cancel to contracts.

**Retry:** if your sign is reversed, test whether shorting one positive-market contract should lower beta. If you divide by zero, stop and identify the violated definition rather than report a trade.

<a id="exercise-source-answer"></a>

### Answer 2

Notional **USD 250,000/contract**; value/notional ratio **20**. Zero target: $(1.20-0)20=\mathbf{24}$, **short 24**. Back-check $1.20-24(0.05)=0$. Target 0.50: $(1.20-0.50)20=\mathbf{14}$, **short 14**. Back-check $1.20-14(0.05)=0.50$. The latter is a supplemental solution to the printed question.

At a −2% factor move, portfolio market loss is **120,000 USD**. Quote falls 100 points. Twenty-four shorts gain **120,000 USD**, leaving **zero** market component. Fourteen shorts gain **70,000 USD**, leaving **−50,000 USD**, or **−1%** of USD 5 million. Remaining market-equivalent exposure in the second case is **USD 2.5 million**, not zero. These checks omit residuals, financing and basis by declaration.

**Retry:** if both targets produce 24, compute the beta **difference**, not just initial beta. If you claim the half-beta hedge is neutral, calculate its remaining coefficient.

<a id="exercise-direction-answer"></a>

### Answer 3

To 1.50: signed count **−6**, meaning **buy six**; beta becomes $1.20+0.30=1.50$. To 1.20: **zero** contracts. To −0.20: signed count **+28**, meaning **short 28**; beta becomes $1.20-1.40=-0.20$. From −0.40 to zero: count **−8**, meaning **buy eight**; beta becomes $-0.40+0.40=0$. Raising beta adds positive-market sensitivity in this model; whether total risk rises or falls depends on starting exposures, residuals and the risk objective. It is not automatically safer.

**Retry:** if “−6 contracts” is your final decision, state the sign convention, take the magnitude and name the trade. If you shorted a negative-beta portfolio to neutralize it, check whether that makes its beta still more negative.

<a id="exercise-rounding-answer"></a>

### Answer 4

Continuous count **6.7 shorts**. Six give beta **0.57**, error **+0.07**, absolute error **0.07**. Seven give beta **0.47**, error **−0.03**, absolute error **0.03**. **Seven shorts** are nearer for the stated absolute-error objective; actual modeled beta is **0.47**, not 0.50. At +1% factor move, portfolio component **+11,700 USD** minus futures loss **6,000 USD** gives **5,700 USD** for six; subtract **7,000 USD** gives **4,700 USD** for seven. Requested exposure would give **5,000 USD**. Errors are **+700** and **−300 USD**. Costs or asymmetric limits can change the preferred choice.

**Retry:** calculate the implemented beta after choosing the integer. Reporting only “round to seven” omits the exposure that will actually be held in the model.

<a id="exercise-transfer-answer"></a>

### Answer 5

Value/notional ratio is **10**. Target 1.10: $(0.80-1.10)10=\mathbf{-3}$, so **buy three**. Beta after is $0.80-(-3)(0.10)=\mathbf{1.10}$. A +1% isolated factor move produces portfolio component **16,000 USD** plus futures gain **6,000 USD**, total **22,000 USD** or **1.10%** of original capital; this is a supplemental back-check.

Target 1.05: count **−2.5**. Neighboring signed integers are **−3** and **−2**, meaning buy three or buy two. They implement betas **1.10** and **1.00**, with target errors **+0.05** and **−0.05**. Both have absolute error **0.05**, so they tie under the stated objective. There is no unique choice without another criterion; a constraint or cost may break the tie. Do not confuse floor −3 with buying a smaller magnitude.

**Retry:** if your neighbors are +2/+3 shorts, preserve the sign before interpreting magnitude. Check the target lies between the two implemented betas.

<a id="exercise-relative-answer"></a>

### Answer 6

The portfolio gains **60,000 USD**. Futures quote rises to **2,200**, so ten shorts lose $10\times50\times200=\mathbf{100{,}000}$ USD. Combined change is **−40,000 USD**, or **−4%** on original capital. The shares rose but underperformed the market by **four percentage points**; the short market exposure loses more than the portfolio gains. For beta not equal to one, the relevant modeled comparison is beta-adjusted market exposure, with consistent baseline/income/financing assumptions, not automatically portfolio return minus market return.

**Retry:** if you reported +6% as the combined result, include the futures leg. If you called this a source forecast, note that all table numbers are authored supplements.

<a id="exercise-explain-teachback-answer"></a>

### Answer 7 — a sufficient explanation

“The investor likes the biopharma portfolio relative to a broad market, but fears a broad fall. Shorting index futures can reduce the estimated common-market component without selling those shares. It does not make the relative view correct: company/sector losses, a changing beta, index/futures basis mismatch and trading costs can remain. Futures losses can require cash before portfolio gains are realized. Neutrality refers to the chosen estimated factor, not every risk.”

Under the additionally idealized excess-return overlay, zero beta gives $r_H=r_f+\alpha+\varepsilon_P$. To obtain expected return equal to $r_f$, the illustration additionally needs zero alpha, zero expected residual and consistent financing/baseline treatment. These are conditional expectations, not guaranteed realized returns. Given period $r_f=0.002$, alpha zero and realized residual −0.01, return is **−0.008 = −0.8%**. No annual compounding is being used.

**Retry:** if you say “earns risk-free,” distinguish a model average from the particular residual realized next period. Name both a terminal exposure risk and an interim cash need.

<a id="exercise-apply-teachback-answer"></a>

### Answer 8 — audit direction, value and rounding separately

The source target 0.50 requires **14 shorts**, not longs. Fourteen longs would correspond to signed $N=-14$, giving beta $1.20-(-14)(0.05)=\mathbf{1.90}$, the opposite change. Initial zero contract value is not zero notional: **USD 250,000 per contract** scales quote gains and losses, and 14 contracts have **USD 3.5 million** notional magnitude.

In the different rounding case, seven shorts give **0.47**, not 0.50; six give **0.57**. Seven is nearer under fixed zero-cost absolute-beta-error minimization, not always preferable under every objective. Neither a correctly signed exact count nor rounding eliminates residual/company risk, basis mismatch, beta-estimation changes, liquidity or settlement-financing risk. Explain at least two with their mechanism.

**Retry:** independently check the exposure equation after any trade. If a correct count is paired with the wrong direction, the decision is still wrong.

<a id="evidence"></a>

## Evidence, accessible presentation and stopping point

All full normalized/raw pages 24–26 and all three original PNGs were inspected. Page 24 displays the target formula, direction bullets and neutral special case. Page 25 displays numerical inputs, the zero-beta calculation, a short-24 decision and the **unanswered** 0.50 extension. Page 26 has a relative-view motivation, biopharma example and remaining-risk box. No plotted axes, hidden curve or numerical relative-return/CAPM table occurs on these source pages. The direction, rounding and realized-return tables here are labelled supplemental or accessible re-expressions; no source image data was invented.

| Page | Full normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|
| 24 | [Full 24](../../sources/annotated/lecture-2/page-024.md) | [Raw 24](../../sources/extracted/lecture-2/page-024.md#page-24) | [Image 24](../../sources/assets/lecture-2/page-024.png) |
| 25 | [Full 25](../../sources/annotated/lecture-2/page-025.md) | [Raw 25](../../sources/extracted/lecture-2/page-025.md#page-25) | [Image 25](../../sources/assets/lecture-2/page-025.png) |
| 26 | [Full 26](../../sources/annotated/lecture-2/page-026.md) | [Raw 26](../../sources/extracted/lecture-2/page-026.md#page-26) | [Image 26](../../sources/assets/lecture-2/page-026.png) |

Canonical units are verified despite older normalized draft banners; this does not approve the authored lesson. No registered source conflict affects these ten units. No restricted textbook, private learner state or unverified transcript was used. Stop after you can explain the derivation, interpret negative counts, check rounded beta and diagnose both teach-backs. Keep personal answers private. Author arithmetic/static checks are not independent teaching approval or evidence of learner mastery; later controls/synthesis is outside this draft's boundary.
