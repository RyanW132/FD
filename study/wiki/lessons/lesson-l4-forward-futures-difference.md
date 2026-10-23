# Why daily settlement and interest-rate uncertainty matter

<a id="status"></a>
**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches the three primary units on Lecture 4 physical p22. The source gives a deterministic-rate equality, uncertain-rate tendencies and their variation-margin mechanism. The derivations, numerical paths, exercises and generated answers here are **supplemental**, not source examples, official solutions or current exchange rules.

Prerequisites: [existing forward value](lesson-l4-existing-forward-value.md), [assets and settlement](lesson-l4-assets-short-sales-and-settlement.md#daily-formula), [settlement terminology](../concepts/concept-settlement-and-counterparty-risk.md#settlement-margin), [rates](../concepts/concept-rate-conventions.md#rates-formulas) and [signed cash flows](../concepts/concept-numeric-foundations.md#numeric-signs). The planned `concept-replication-and-carry` remains absent; the needed reasoning is supplied inline, not assumed.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain and derive the distinction:** identify the dates and signs of variation margin, distinguish current quotes from existing value/notional, and explain why deterministic rates permit a matched funded replication whereas uncertain rates can couple gains/losses with favorable/unfavorable funding. Success requires all three source statements, matching assumptions and the difference between equal fair quotes and identical fixed-position cash flows.
2. **Calculate and diagnose:** reconstruct the dated two-settlement illustrations for both sides, convert every cash flow to the same terminal date, test deterministic funding and identify what a finite path cannot prove. Success requires correct multipliers, receipt/payment signs, funding factors, intermediate steps and a qualified interpretation rather than an asserted general spread or arbitrage.

<a id="objects"></a>
## 1. Separate the instrument, its quote and its cash

A **forward** fixes a future exchange price between buyer and seller. Its old delivery price stays fixed; its economic value can change as new market terms change. In the simplified comparison here, no trading gain is settled until delivery. A **futures** contract transfers gains/losses at successive settlement dates. **Long** means the buying side: it gains when the futures quote rises. **Short** is the opposite side. Both have obligations, unlike an option holder's exercise choice.

A **settlement quote** is the reference used to calculate a settlement transfer. **Variation margin** is that gain/loss transfer; it is not the initial collateral deposit. Initial margin supports performance and can require funding but is not an underlying purchase price or a complete loss limit. We omit separate initial-margin interest/costs in the pricing benchmark, rather than claiming they vanish in practice.

Use the following notation consistently. We deliberately use $H$ for futures quotes to avoid confusing them with forward quotes.

| Symbol | Definition and units |
|---|---|
| $0,t_1,\ldots,t_n=T$ | Inception, successive settlement dates, and common expiry; $i$ is a date index and $n$ the number of intervals |
| $H_i$ | Futures settlement quote at $t_i$, in quoted price units such as index points |
| $H_0$ | Initial futures quote |
| $F_0$ | Fair quote for a new matching forward at inception, same quote units and expiry |
| $K$ | Fixed delivery quote in an existing forward, same quote units |
| $S_T$ | Underlying's terminal settlement level, same quote units; matching convergence means $H_n=S_T$ at expiry in this model |
| $M>0$ | Cash multiplier per quote unit per contract, for example USD/point/contract |
| $N\geq0$ | Number of contracts in a fixed long position; short uses the opposite cash sign |
| $C_i$ | Long's variation-margin cash at $t_i$, in the chosen currency |
| $A_i>0$ | Accumulation factor from $t_i$ to $T$: one currency unit received/borrowed at $t_i$ becomes $A_i$ units at $T$ |
| $D_i=1/A_i$ | Corresponding positive discount factor; $A_n=D_n=1$ because the final date is already $T$ |

A factor is dimensionless; it is **not itself an annual rate**. If a constant annual continuous rate $r_i$ applies for a remaining interval $T-t_i$ measured in years, then $A_i=e^{r_i(T-t_i)}$. The exponential is positive. A factor 1.02 means 2% growth over its specified interval, not automatically 2% per year. For simplicity, borrowing and lending use the same factor in the examples: a negative cash flow financed at $t_i$ becomes a negative repayment of its magnitude times $A_i$ at $T$.

**Notional** is quote times multiplier times contract count, scaling exposure. A new fair contract can have zero initial value while its notional and future cash obligations are nonzero. An old forward's current value is a different object: under the earlier matching discount benchmark, its quote advantage relative to current market terms is discounted over the remaining interval. It does not become variation-margin cash merely because its value is calculated.

<a id="variation-margin"></a>
## 2. Why the timing changes the economic result

The source says the forward/futures difference comes from the **timing and reinvestment of daily variation-margin cash flows**, not from inventing a different terminal payoff formula. [L4 p22, lower key-mechanism box; `lecture-4-p022-variation-margin-mechanism`](../../sources/annotated/lecture-4/page-022.md#lecture-4-p022-variation-margin-mechanism).

For a fixed long position, each daily cash flow is

$$C_i=NM(H_i-H_{i-1}).$$

First calculate the new-minus-previous quote change, then multiply by contracts and currency per quote unit per contract. A rise means a positive receipt to the long and payment by the short; a fall reverses those signs. A loss must be funded **when due**, even if a later price recovery is expected. Actual daily or intraday arrangements depend on terms; this is the lecture's daily-settlement model.

The nominal sum telescopes: intermediate quotes cancel when adjacent differences are added. Thus

$$\sum_{i=1}^{n} C_i=NM(H_n-H_0).$$

The symbol $\sum$ means add the listed terms from $i=1$ to $n$. This equality adds money transferred on different dates **without time adjustment**. It is useful bookkeeping, but not yet terminal wealth. If all receipts are invested and all payments financed to the same expiry date under the supplied factors, the terminal accumulated cash is

$$W_T=\sum_{i=1}^{n}C_iA_i.$$

Here $W_T$ denotes this strategy's accumulated settlement cash, not a new contract's quote or its entire investor wealth. The short has $-W_T$ only under the same symmetric factors and omitted-cost assumptions. Separate investor funding rates, fees or collateral remuneration can break that symmetry.

A matching terminal-settled forward fixed at $K$ has economic maturity payoff $NM(S_T-K)$. Physical settlement exchanges the asset and fixed cash; the payoff is their net value, not a second extra cash receipt. If $K=H_0$ and $H_n=S_T$, the fixed futures position has the same **unfinanced nominal sum** as that forward. It need not have the same funded terminal result. This is precisely why the dates matter.

<a id="deterministic"></a>
## 3. What deterministic-rate equality actually says

The source states that forward and futures prices are equal when interest rates are deterministic and the contracts otherwise have the same underlying and delivery date. [L4 p22, opening paragraph; `lecture-4-p022-deterministic-rates`](../../sources/annotated/lecture-4/page-022.md#lecture-4-p022-deterministic-rates).

**Deterministic** means the relevant future funding/discount factors are known rather than random within the model. Rates may vary across future dates in a known way; they need not be one constant number. **Uncertain**, or stochastic, rates are not known at inception and can evolve with market conditions. A currently quoted term structure alone does not say that all future short-term reinvestment rates are certain.

The equality compares **fair new quotes**, $F_0=H_0$, under the usual no-arbitrage benchmark. Here that includes compatible asset/quality, expiry and settlement reference, no fees/taxes or differential collateral costs, common available borrowing/lending, reliable performance, and the ability to trade/rebalance the required quantities. It is not a statement that a one-contract futures cash ledger is literally identical to a one-contract forward ledger at every date.

<a id="deterministic-replication"></a>
### A dated replication explains why — supplemental

To understand equality without stochastic calculus, allow fractional contract positions and frictionless rebalancing. Target the payoff of **one** forward with multiplier $M$. Before each settlement interval $t_{i-1}$ to $t_i$, hold $D_i$ long futures contracts. These quantities can be fixed in advance when all the relevant factors are deterministic.

1. At $t_i$, the futures holding pays $MD_i(H_i-H_{i-1})$.
2. Invest a positive receipt, or borrow to finance a negative payment, until $T$.
3. Its terminal amount is $MD_i(H_i-H_{i-1})A_i=M(H_i-H_{i-1})$, since $D_iA_i=1$.
4. After settlement, adjust the number of futures for the next interval. In this ideal model, adding/reducing a fairly reset futures position needs no premium; transaction and margin funding costs are excluded. It does not erase cash already settled.
5. Add the terminal amounts: $M(H_n-H_0)=M(S_T-H_0)$.

The funded, quantity-adjusted futures strategy starts with zero net contract premium and reproduces a forward payoff with delivery quote $H_0$. A fair matching forward also starts at zero and pays $M(S_T-F_0)$. If the quotes differed, long one matched payoff and short the other would cancel the uncertain terminal index/asset level, leaving a known nonzero signed amount $M(F_0-H_0)$ at $T$ from zero initial net premium. Reversing sides would select the positive difference, under all the stated executable assumptions. Hence no-arbitrage requires equal quotes.

This proof is about an **adjusted** futures position plus its funding account, not an assertion that the fixed $N=1$ cash path itself matches. When rates are uncertain, the realized accumulation from a future settlement date to expiry is not generally known when the earlier interval's position must be chosen. Substituting a future-realized factor into a past trading decision would use unavailable information; the simple advance-sizing proof no longer establishes equality. That failure permits a difference, not a claim that every uncertain-rate market must show a large spread.

<a id="uncertain-rates"></a>
## 4. Trace the source's two co-movement tendencies

The source says that futures gains occurring when interest rates are high can be reinvested favorably, tending to put futures above forwards; gains occurring when rates are low produce the opposite tendency. [L4 p22, middle uncertain-rates paragraph and bullets; `lecture-4-p022-uncertain-rate-effects`](../../sources/annotated/lecture-4/page-022.md#lecture-4-p022-uncertain-rate-effects).

Read this from the **long's** viewpoint, with compatible quote movements and the relevant funding intervals:

| Association in the model | Long's early gains | Long's early losses | Source pricing tendency, other benchmark conditions held |
|---|---|---|---|
| Gains tend to accompany higher rates; losses lower rates | Receipts can earn more before expiry | Payments tend to be financed at lower cost | Daily-settled long exposure is relatively attractive; futures quote tends above matching forward quote |
| Gains tend to accompany lower rates; losses higher rates | Receipts earn less before expiry | Payments tend to require more expensive financing | Daily-settled long exposure is relatively unattractive; futures quote tends below matching forward quote |

A higher entry futures quote reduces a long's later nominal price gain for a fixed terminal quote, so it can offset a timing advantage. The short has opposite transfers and therefore the opposite timing advantage/disadvantage under symmetric terms. This is intuition for a pricing adjustment, not an independent calculation of its amount.

**Co-movement** means observations tend to occur together. It is not causation, nor a promise that every up day has a high rate. A correlation measured over unrelated dates, rates, currencies or instruments does not identify the relevant timing advantage. A complete pricing model needs the joint evolution of prices and discount/funding factors and the actual contract terms. Merely observing “rates are uncertain” or one historical positive correlation does not prove a universal strict inequality in all markets. No universal quantitative spread is supplied by p22.

<a id="finite-paths"></a>
## 5. A finite-path illustration isolates timing — supplemental, not a price proof

Use one long hypothetical contract, multiplier **1 USD/point/contract**, initial quote **100 points**. There are two successive settlement dates $t_1$ and $t_2=T$; they stand for two settlement steps, not a new annual-rate convention. Final quote is stipulated as **100** in each displayed path. For comparison only, fix a terminal forward at **100**, so its payoff is zero in these paths.

At $t_1$ the quote is either 110 or 90. The **following interval** has a specified accumulation factor 1.10 or 1.02, respectively. These exaggerated factors mean **10% or 2% for that interval**, not annual quotes or realistic current daily rates. Gains can be invested and losses borrowed at the same path-specific factor; no fees, initial-margin interest, default or funding constraint is added. The factor for a cash flow arriving at $T$ is one.

### Case A: early long gains accompany higher funding rates

| Path | $H_0,H_1,H_2$, points | Cash at $t_1$, USD | Factor $A_1$ to $T$ | First cash accumulated to $T$, USD | Final cash at $T$, USD | Total $W_T$, USD |
|---|---|---:|---:|---:|---:|---:|
| Rise then return | 100, 110, 100 | +10 | 1.10 | +11 | −10 | **+1.00** |
| Fall then return | 100, 90, 100 | −10 | 1.02 | −10.20 | +10 | **−0.20** |

For the first path, the early receipt earns 1 before the final loss. For the second, financing the early loss costs 0.20 before recovery. Nominal variation-margin sums are zero in both paths, yet terminal funded amounts are not. A short's corresponding terminal amounts are **−1.00** and **+0.20** with symmetric funding. There is a loss path; this is not a guaranteed profit strategy.

<a id="reverse-paths"></a>
### Case B: reverse the rate association without changing price paths

Keep the same quotes but assign factor **1.02 after the rise**, **1.10 after the fall**:

| Path | First cash, USD | Factor | First cash at $T$, USD | Final cash, USD | Total long $W_T$, USD |
|---|---:|---:|---:|---:|---:|
| Rise then return | +10 | 1.02 | +10.20 | −10 | **+0.20** |
| Fall then return | −10 | 1.10 | −11 | +10 | **−1.00** |

Early gains now earn less, early losses cost more. Relative to Case A, each long path's funded result is **0.80 USD worse**; the short's change is the opposite. That comparison illustrates the source mechanism while keeping the price paths unchanged.

**What has not been established:** these invented paths and factors are not asserted to be a jointly arbitrage-free market model, and no probabilities, market risk prices or equilibrium quotes were supplied. Giving the forward and futures an initial 100 only isolates cash timing. Neither table proves that 100 is a fair price, that the price spread is 0.80, or that arithmetic averaging the outcomes would produce a fair quote. A numerical cash-flow mechanism is not a general pricing theorem.

<a id="deterministic-example"></a>
## 6. Known funding factors do not make fixed-position timing disappear

Now a separate supplemental case has the same two price paths but **known factor 1.02 in both** for $t_1$ to $T$.

- One unchanged long contract: rise path gives $10(1.02)-10=+0.20$; fall path gives $-10(1.02)+10=-0.20$.
- Thus deterministic funding still affects a **fixed** futures position's realized terminal cash. Equal fair quotes do not contradict those amounts.
- To implement the earlier one-forward replication, hold $D_1=1/1.02\approx0.980392156863$ contracts during the first interval, then $D_2=1$ during the last interval.
- Rise path: first receipt is $10/1.02\approx9.803921568627$ USD; investing it produces exactly **10** at $T$, which offsets the final **−10**. Total **0**.
- Fall path: first payment is $-10/1.02\approx-9.803921568627$; financing requires **−10** at $T$, offset by final **+10**. Total **0**.

The scaled results match the stipulated one-forward payoff in those two paths, using full precision before display rounding. Fractional sizing and costless reset/rebalancing are model assumptions, not retail contract-lot promises. If the factor instead becomes known only at $t_1$, choosing the first interval's quantity using that future outcome would not be a feasible advance strategy.

<a id="limits"></a>
## 7. Boundary checks and remaining risks

- If every $A_i=1$, no growth/discount adjustment is needed: terminal accumulated cash equals the nominal sum for a fixed position. An early zero cash flow also has no interest effect by itself.
- A negative interest rate can give a positive factor below one. For the separate rise path with supplied factor **0.99**, funded cash is $10(0.99)-10=\mathbf{-0.10}$ USD: a positive early receipt can shrink before a later payment. Positive factor does not mean positive interest.
- Cash arriving at expiry has factor one, not another full horizon of interest. Use remaining time after **each** transfer.
- Zero contracts give zero trading transfers, but dividing by zero contracts to infer a price is invalid. A nonpositive accumulation factor is outside this ordinary borrowing/lending setup.
- Different borrowing and lending costs, collateral interest, fees, taxes, restricted withdrawals, integer contracts, default or nonmatching settlement terms can invalidate the simple equal-quote replication or the symmetric long/short terminal numbers.
- A party can have a profitable eventual economic hedge but lack cash for interim margin. Clearing manages counterparty performance; it does not remove price losses or guarantee funding. OTC venue does not imply all forwards are uncleared or uncollateralized. Actual contractual cash rules, not the instrument's name alone, determine the comparison.

A hedge should therefore be assessed with its underlying business position and cash timetable, not solely its terminal price difference. This lesson does not verify present exchange rules, funding availability or a trade recommendation.

<a id="practice"></a>
## 8. Progressive supplemental practice

<a id="exercise-cash-prompt"></a>
### 1. Identify the objects — outcome 1
Explain quote, old forward delivery price/value, futures notional, initial margin and variation-margin cash. In the one-contract 100-point/1-USD-multiplier example, calculate initial notional and the two daily transfers for 100→110→100. [Answer](#exercise-cash-answer).

<a id="exercise-equality-prompt"></a>
### 2. Explain deterministic equality — outcome 1
Reconstruct the funded $D_i$-quantity replication and explain why known rates need not be constant. Why does equal fair quote not imply equal funded payoff for one fixed contract on each side? [Answer](#exercise-equality-answer).

<a id="exercise-positive-prompt"></a>
### 3. Compute Case A — outcome 2
Rebuild both Case A rows, their nominal sums, terminal long/short amounts and the forward comparison. Identify the loan in the loss-first path. [Answer](#exercise-positive-answer).

<a id="exercise-negative-prompt"></a>
### 4. Reverse the co-movement — outcome 2
Rebuild Case B and compare each long outcome with Case A. Explain the source pricing tendency without treating the path difference as a fair-price spread. [Answer](#exercise-negative-answer).

<a id="exercise-deterministic-prompt"></a>
### 5. Test the known-factor strategy — outcome 2
With factor 1.02 in both paths, compute fixed-one-contract amounts and the adjusted quantities/cash amounts reproducing the forward. Also test factor one and the separate factor-0.99 rise path. [Answer](#exercise-deterministic-answer).

<a id="exercise-transfer-prompt"></a>
### 6. Transfer units and direction — outcome 2
A supplemental **two-contract** position has multiplier **5 USD/point/contract**, quotes **100→96→103**, and supplied first-cash accumulation factor **1.05**. Compute each long cash flow, nominal sum, terminal accumulated long/short cash and the matching terminal forward payoff at K=100. This is another cash-path illustration, not a fair-price proof. [Answer](#exercise-transfer-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach the mechanism and limits — outcome 1
Explain why receiving gains before high rates can help a long, why losses must also be financed, and what the three source statements do and do not establish. Include matching terms and credit/collateral/funding qualifications. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Diagnose a purported arbitrage — outcome 2
A report says both Case A paths earn +1, 1.10 is an annual 10% rate, all futures equal forwards whenever rates are known today, and the 0.80 path difference is a guaranteed quote spread. Repair it with dated numbers and distinguish a finite illustration from the deterministic replication proof. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 9. Separate supplemental answers

<a id="exercise-cash-answer"></a>
### Answer 1
Initial notional is **100 USD**, not an underlying purchase or a 100-USD current contract value. Variation-margin receipts/payments are **+10 at $t_1$ and −10 at $T$**. They sum nominally to zero, but dates differ. Initial margin is separate collateral; no amount is supplied. Old forward $K$ remains contractual, its value is a current mark relative to new terms, and a quote is not cash already received. **Retry:** put a date, unit and object label beside each number.

<a id="exercise-equality-answer"></a>
### Answer 2
With known positive factors, choose $D_i=1/A_i$ futures contracts before each interval. Cash $MD_i(H_i-H_{i-1})$ accumulates to $M(H_i-H_{i-1})$ at expiry. Adding gives $M(S_T-H_0)$, the one-forward payoff at delivery quote $H_0$. Under executable zero-cost symmetric funding/performance assumptions, a different fair forward quote creates a known signed payoff difference from zero entry premium, so quotes coincide. Deterministic means known, not necessarily constant. The proof adjusts quantities; an unchanged one-contract futures path can still accrue interest on interim cash. **Retry:** do not replace a funded rebalanced strategy by a fixed holding.

<a id="exercise-positive-answer"></a>
### Answer 3
Rise: **+10** invested at factor **1.10** becomes **+11**, then **−10**, total **+1 USD**. Fall: borrow **10** to meet **−10** at the first date; repay **10.20** at expiry, offset by **+10**, total **−0.20**. Nominal sums and the K=100 terminal-forward payoff are **0** in each path. Shorts give **−1/+0.20** under symmetric funding. No loss-free strategy was established. **Retry:** a recovery does not refund the financing cost of an earlier loss.

<a id="exercise-negative-answer"></a>
### Answer 4
Rise at factor1.02: **+10.20−10=+0.20**. Fall at factor1.10: **−11+10=−1.00**. Relative to Case A, long changes are **0.20−1=−0.80** and **−1−(−0.20)=−0.80 USD**. Long gains earn less and losses cost more; this supports the source's opposite pricing tendency within its model, not a measured 0.80 quote spread. No probabilities or complete market-pricing model were supplied. **Retry:** separate cash-path comparison from valuation.

<a id="exercise-deterministic-answer"></a>
### Answer 5
Fixed quantity one gives **+0.20/−0.20**. Choose first-interval quantity **1/1.02≈0.980392156863**, last quantity **1**. First cash is **±9.803921568627**, accumulating to **±10**, and final cash **∓10** cancels it. Total **0** on both paths, matching the stipulated forward. Factor one gives zero timing difference for the fixed position. Separate factor0.99 rise gives **9.90−10=−0.10**. **Retry:** factors must be known before the relevant quantity decision; round only final displays.

<a id="exercise-transfer-answer"></a>
### Answer 6
Multiplier times count is **10 USD/point**. First quote change **−4 points** produces **−40 USD**; last change **+7 points** produces **+70 USD**. Nominal sum **+30** equals $2(5)(103-100)$. Finance the first payment: **−40×1.05=−42** at expiry; add70 for terminal long **+28 USD**, short **−28**. The terminal forward at K100 has payoff **+30**, with no interim cash in this comparison. The **−2 USD** difference is funding cost on this path, not proof of a two-point or two-dollar fair-quote spread. **Retry:** the last cash already occurs at expiry and is not multiplied by1.05.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation
“Futures move trading cash earlier than the simplified forward. A long's rise creates a receipt that can earn interest; a fall creates a payment that may need borrowing. When gains align with higher reinvestment rates and losses with lower funding rates, daily settlement is relatively attractive to the long, explaining the source tendency toward a higher futures quote. Reversing the association reverses that tendency. With deterministic factors, a funded quantity-adjusted strategy can replicate the forward and establish equal fair quotes under matching no-arbitrage assumptions. A fixed-position cash path is not that proof. Credit, collateral, funding availability and differing terms can change the comparison; no historical correlation alone supplies a universal spread.” **Retry:** include both the investment of gains and financing of losses.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8
Case A yields **+1/−0.20**, not two gains of1. Factor1.10 is the supplied **interval** factor, not an annual quote. Today's observed rates do not guarantee deterministic future funding rates. The **0.80** change is between illustrative terminal cash amounts when the association changes, not a guaranteed price difference. Fair-quote equality follows only from the stated deterministic, matched, executable funding/rebalancing benchmark; finite paths alone do not establish fair quotes or arbitrage. **Retry:** identify what was known at each trading date before using a future factor.

<a id="evidence"></a>
## Evidence and endpoint

All full raw/normalized p22 and its original PNG were inspected. The source contains a paragraph, two uncertain-rate bullets and a mechanism box, not numerical scenarios or plots. All tables and numeric solutions here are labelled supplemental. The three source units are canonically verified with no registered issue; that source QA is not approval of this lesson.

[Full normalized p22](../../sources/annotated/lecture-4/page-022.md) · [Unchanged raw p22](../../sources/extracted/lecture-4/page-022.md#page-22) · [Original PNG](../../sources/assets/lecture-4/page-022.png).

Next is [index forward pricing](lesson-l4-index-forward-pricing.md). Missing carry-concept integration and independent teaching review remain pending. No restricted textbook/private learner material or current market-rule claims were used.
