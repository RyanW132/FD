# Trading motives, option leverage and break-even

<a id="status"></a>

**Unreviewed teaching draft — Lecture 2, physical pages 3–6.** Source claims and supplied results have precise citations. Explanations, new examples, practice extensions and answer reasoning are **supplemental**, not official solutions. This draft does not certify publication readiness or learner mastery.

<a id="motivation"></a>

## Why compare two ways of backing the same prediction?

An investor expects a share price to rise. Buying shares and buying rights to buy shares can both benefit from a sufficiently large rise, but they do not produce the same losses, gains or break-even price. With a fixed budget, the cheaper option rights cover more shares. That makes the upside striking—and makes losing the entire budget possible even when the share price rises. The objective is to explain that trade-off, not recommend a trade.

<a id="outcomes"></a>

## What you will be able to do

1. **Explain the motive and exposure:** given a trader's existing position and intended trades, distinguish hedging, speculation and arbitrage by objective rather than instrument; explain what owning shares and buying calls each provide, why equal budgets buy different quantities, and why leverage is not guaranteed profit. Success requires a reason for each classification, correct contract/share units, and a two-sided account of leverage.
2. **Calculate and interpret the comparison:** given a budget, share price, strike, premium per share, contract size and maturity price, build both profit calculations, convert profit to a nonannualised percentage return, solve the call break-even and interpret below/at/above-strike cases. Success requires all cash amounts correct to the cent, correct units and signs, a check against the source table, and a teach-back distinguishing payoff, profit, exercise and break-even.

**Supplemental readiness check:** If you receive $15 after paying $20, is your profit +$5 or −$5? Does “100 shares per contract” mean that 20 contracts cover 20 or 2,000 shares? The following bridge supplies the needed foundations; no future lesson or missing concept page is required.

<a id="foundations"></a>

## 1. Foundation: quantities, signs, dates and option rights

A **share** is one unit of ownership in a company. A **position** is a holding or contractual commitment. A **derivative** is a contract whose value depends on an underlying item, here the share. **Exposure** means that changes in a price can affect the value of your position. Being **long** here means owning the share or buying the option right, not how long you wait.

A **call option** gives its buyer the right, not an obligation, to buy the specified share at an agreed **strike price**. **Exercise** means using that right. The **premium** is the price paid for the option right; it is not the share purchase price. At **maturity**, the option's expiry date, paying the strike is useful only if the share received is worth more. We evaluate exercise at expiry; the source does not specify an early-exercise style and this lesson does not infer one.

**Supplemental arithmetic bridge:** receipts are positive and outlays negative. Profit = terminal proceeds − initial outlay under the simplified convention used here. Thus $15 − $20 = −$5. Multiply a per-share difference by the number of shares to obtain dollars for the whole position. A contract covering 100 shares is one contract, but has 100 per-share option rights. Twenty contracts × 100 shares per contract = 2,000 covered shares.

The function $\max(a,0)$ means “choose the larger of the number $a$ and zero.” For example, $\max(-5,0)=0$ and $\max(2.50,0)=2.50$. It prevents a **bought option's exercise payoff** from being negative because the buyer can decline an unfavourable exercise. It does not erase the premium already paid.

| Symbol | Meaning | Unit/convention |
|---|---|---|
| $B$ | Budget available initially | US dollars (USD, $); $2,000 in the source |
| $S_0$ | Share price today; subscript zero marks the initial date | USD per share; $20 |
| $T$ | Maturity date | Two months after purchase in the source |
| $S_T$ | Share price at maturity; subscript marks the date, not multiplication | USD per share; initially unknown |
| $K$ | Strike paid per share if a call is exercised | USD per share; $22.50 |
| $c_0$ | Call premium per covered share, paid initially | USD per share; $1.00; not per contract |
| $m$ | Contract size | Shares per contract; 100 |
| $n$ | Number of contracts bought | Contracts; 20 in the source call strategy |
| $q_s$, $q_c$ | Shares held outright; shares covered by calls | Shares; 100 and 2,000 respectively |
| $\Pi_T^{\mathrm{shares}}$, $\Pi_T^{\mathrm{calls}}$ | Total share-strategy or call-strategy profit | USD; superscript is a label, not a power |
| $R$ | Profit divided by initial expenditure | Dimensionless decimal return; multiply by 100 to express percent |

**Assumptions used in all calculations unless an exercise explicitly changes them:** same underlying share and maturity; all purchased rights remain held to expiry; share value can be realised at $S_T$; option obligations are honoured; no dividends, fees, taxes or financing/interest adjustments. These are supplemental model assumptions making the source's arithmetic-profit convention explicit. Both strategies spend the full $2,000 initially. Two months identifies the horizon; it is not a factor multiplying the profit. Returns below are over those two months, **not annual rates**; no compounding or annualisation is used. Physical call exercise requires strike-payment funding or an equivalent way to realise the payoff; the initial premium budget does not itself fund the share purchase.

<a id="motives"></a>

## 2. Classify the purpose, not the product

The source distinguishes:

- **Hedging:** reducing an existing exposure to risk. [L2 physical p3, upper motives box, hedging bullet; `lecture-2-p003-hedging-definition`](../../sources/annotated/lecture-2/page-003.md#lecture-2-p003-hedging-definition).
- **Speculation:** taking risk in anticipation of a price movement. [L2 physical p3, upper motives box, speculation bullet; `lecture-2-p003-speculation-definition`](../../sources/annotated/lecture-2/page-003.md#lecture-2-p003-speculation-definition).
- **Arbitrage:** exploiting inconsistent prices in different markets. [L2 physical p3, upper motives box, arbitrage bullet; `lecture-2-p003-arbitrage-definition`](../../sources/annotated/lecture-2/page-003.md#lecture-2-p003-arbitrage-definition).

The source's important distinction is that these are **objectives**, not instrument names: the same derivative may serve any of them. [L2 physical p3, lower important-distinction box; `lecture-2-p003-objective-versus-instrument`](../../sources/annotated/lecture-2/page-003.md#lecture-2-p003-objective-versus-instrument).

**Supplemental decision guide:** first ask what exposure existed before the trade, then what the combined trades accomplish. A business needing a future purchase might buy a call to limit the damage from rising prices: a hedge. Someone with no such purchase need might buy that same call solely because they predict a rise: speculation. Simultaneous offsetting trades exploiting inconsistent prices can be an arbitrage under assumptions that remove an uncovered price bet; buying today and merely hoping to sell higher later is not that argument. The word “option” alone cannot classify the objective. Nor does a profitable outcome prove arbitrage: a speculation can succeed.

<a id="source-inputs"></a>

## 3. Equal initial budgets, different positions

**Accessible source input table:** an investor has $2,000 and expects the share price to rise over the next two months. [L2 physical p4, upper scenario and input table; `lecture-2-p004-speculation-inputs`](../../sources/annotated/lecture-2/page-004.md#lecture-2-p004-speculation-inputs).

| Input | Source amount |
|---|---:|
| Current share price | $20.00 per share |
| Two-month call strike | $22.50 per share |
| Call premium | $1.00 per covered share |

<a id="share-strategy"></a>

**Strategy A — source:** buy $2,000 ÷ $20 = **100 shares**. [L2 physical p4, lower strategies box, item 1; `lecture-2-p004-share-strategy`](../../sources/annotated/lecture-2/page-004.md#lecture-2-p004-share-strategy). Supplemental units check: dollars divided by dollars per share gives shares. You pay for the shares now and own them outright in this model.

<a id="call-strategy"></a>

**Strategy B — source:** buy **20 call contracts**, each covering **100 shares**: 2,000 covered shares costing 2,000 × $1 = **$2,000**. [L2 physical p4, lower strategies box, item 2; `lecture-2-p004-call-strategy`](../../sources/annotated/lecture-2/page-004.md#lecture-2-p004-call-strategy).

**Supplemental derivation:** one contract's premium is 100 × $1 = $100; $2,000 ÷ $100 per contract = 20 contracts; 20 × 100 = 2,000 covered shares. The covered quantity is twenty times the 100 shares bought outright. But rights to buy 2,000 shares are **not ownership of 2,000 shares**, nor do they produce the same response at every price. If all calls are physically exercised, their separate strike payment would be 2,000 × $22.50 = **$45,000**. The option's economic payoff nets that payment against the received share value; it is not a promise of free shares.

<a id="share-profit"></a>

## 4. Derive both profit formulas

**Shares — supplemental derivation of the source formula:**

1. Buy 100 shares at $20 each: initial outlay $2,000.
2. At maturity they are worth $100S_T$ in dollars, meaning 100 times the numerical price in USD per share.
3. Subtract the initial expenditure: $100S_T-2,000=100(S_T-20)$.

The source writes

$$\Pi_T^{\mathrm{shares}}=100(S_T-20).$$

Plain text: **share profit = shares owned × (maturity price − initial price)**. [L2 physical p5, middle profit-from-shares box; `lecture-2-p005-share-profit`](../../sources/annotated/lecture-2/page-005.md#lecture-2-p005-share-profit).

<a id="call-profit"></a>

**Calls — supplemental derivation of the source formula:**

1. At expiry, if $S_T>K$, the right lets you obtain a share worth $S_T$ by paying $K$. The exercise payoff is $S_T-K$ per covered share.
2. If $S_T\le K$, exercising gives no positive advantage; the right's terminal payoff is zero. Both cases are $\max(S_T-K,0)$.
3. Subtract the $1 premium **after** deciding the exercise payoff. This leaves $\max(S_T-22.50,0)-1$ profit per covered share.
4. Multiply the whole expression by 2,000, because the premium and payoff both apply to every covered share.

The source writes

$$\Pi_T^{\mathrm{calls}}=2{,}000[\max(S_T-22.50,0)-1].$$

Plain text: **call profit = covered shares × (nonnegative exercise payoff per share − premium per share)**. [L2 physical p5, middle profit-from-calls box; `lecture-2-p005-call-profit`](../../sources/annotated/lecture-2/page-005.md#lecture-2-p005-call-profit).

The source asks for both profits at $S_T=$15, $22.50 and $25. [L2 physical p5, lower calculate box; `lecture-2-p005-strategy-profit-question`](../../sources/annotated/lecture-2/page-005.md#lecture-2-p005-strategy-profit-question). Try the calculations before consulting the table below; [exercise 3](#exercise-source-table-prompt) preserves this question separately.

<a id="worked-example"></a>

## 5. Work the rising-price case completely

**Supplemental walkthrough using source parameters:** suppose the maturity share price is $25.

1. **Shares:** 100 × $25 = $2,500 terminal value; subtract $2,000 initial cost → **+$500 profit**.
2. **Call payoff per share:** $25 − $22.50 = $2.50, which is above zero.
3. **Whole call payoff:** 2,000 × $2.50 = $5,000.
4. **Call profit:** $5,000 − $2,000 premium = **+$3,000**. Equivalently 2,000 × ($2.50 − $1) = $3,000.
5. **Physical-exercise check:** received shares would be worth 2,000 × $25 = $50,000; strike payments total $45,000. Their difference is $5,000, not $50,000 of free profit; subtracting the earlier premium leaves $3,000.
6. **Reasonableness check:** a price above the strike gives a positive exercise payoff. It exceeds the premium here, so call profit is positive. No rounding is required.

<a id="source-results"></a>

### The complete source results table

This is an accessible transcription of all three source rows, with total profits in dollars. [L2 physical p6, upper share-versus-call profit table; `lecture-2-p006-strategy-results-table`](../../sources/annotated/lecture-2/page-006.md#lecture-2-p006-strategy-results-table).

| Maturity share price | Profit: 100 shares | Profit: calls on 2,000 shares |
|---|---:|---:|
| $15.00 | −$500 | −$2,000 |
| $22.50 | +$250 | −$2,000 |
| $25.00 | +$500 | +$3,000 |

**Supplemental reading guide:** at $15 the shares retain $1,500 of value, while the calls expire with no payoff. At $22.50 the shares have risen from $20, earning $250; the calls only reach their strike and still have zero exercise payoff. At $25 the calls' larger covered quantity produces the larger profit. “The share price rose” is therefore insufficient to predict a profitable call strategy.

<a id="leverage"></a>

## 6. Make “larger percentage gain” precise

The source says options provide **leverage**: they can generate a larger percentage gain, but the buyer can lose the entire premium. [L2 physical p6, lower interpretation text; `lecture-2-p006-option-leverage`](../../sources/annotated/lecture-2/page-006.md#lecture-2-p006-option-leverage).

**Supplemental percentage bridge:** a return compares profit with the initial money spent. For each source strategy that amount is $2,000. The dollar units cancel in $R=\text{profit}/\text{initial expenditure}$. A decimal of 0.25 means 25 per 100, written 25%; a decimal of 1.50 means 150%. Negative values indicate loss. Return measures **profit**, not terminal proceeds divided by expenditure.

| Terminal share price | Share return over two months | Call return over two months |
|---|---:|---:|
| $15.00 | −500 ÷ 2,000 = −0.25 = −25% | −2,000 ÷ 2,000 = −1 = −100% |
| $22.50 | 250 ÷ 2,000 = 0.125 = 12.5% | −1 = −100% |
| $25.00 | 500 ÷ 2,000 = 0.25 = 25% | 3,000 ÷ 2,000 = 1.50 = 150% |

This **supplemental** table quantifies the source's statement; it is not a second source table. Leverage here is the increased exposure achievable through option rights with the same initial expenditure. It is not a constant “twenty times the return” rule: below the strike the call payoff stays zero; above it an extra $1 per share increases total call profit by $2,000, versus $100 for the shares. A purchased call can lose its full premium without the share becoming worthless. Shares can also lose their full purchase cost if the share price reaches zero; neither strategy is risk-free.

<a id="break-even"></a>

## 7. Exercise threshold is not profit break-even

At the strike $22.50, the call's exercise payoff is zero, but the $1 premium is already spent. To break even, the exercise payoff must recover that premium:

1. Require zero total profit: $2,000[\max(S_T-K,0)-c_0]=0$.
2. Divide by the positive covered quantity: $\max(S_T-K,0)=c_0$.
3. Here $c_0=$1 is positive, so break-even must be above the strike. Use $S_T-K=c_0$.
4. Add $K$ to both sides: $S_T=K+c_0=$22.50 + $1.00 = **$23.50** per share.

The final equation is the source's break-even result; the steps are supplemental explanation. [L2 physical p6, lower break-even equation; `lecture-2-p006-call-break-even`](../../sources/annotated/lecture-2/page-006.md#lecture-2-p006-call-break-even). Plain text: **call break-even price = strike + premium per share**, under this no-financing-adjustment convention.

**Supplemental checks:** at $23.50, payoff per share is $1 and profit is 2,000 × ($1 − $1) = $0. At $23 the option is worth exercising for $0.50 per share, yet total profit is 2,000 × ($0.50 − $1) = **−$1,000**. Exercising can reduce a loss without making the overall purchase profitable. The share strategy breaks even at its purchase price $20, not at the call's $23.50.

**Supplemental graph description, without relying on a picture:** take horizontal axis $S_T$ in USD per share and vertical axis total profit in USD. The share-profit line rises by $100 for each $1 horizontal increase, crosses zero at $20, and passes through the three source table points. The call-profit line is flat at −$2,000 for prices at or below $22.50; it then rises by $2,000 for each $1 increase, crossing zero at $23.50. These are **profit**, not payoff, curves. The source pages contain tables and formula boxes, not a graph; this description is an authored aid.

<a id="limits"></a>

## 8. Misconceptions and limits

- **“Twenty contracts means twenty shares.”** Apply the specified 100-share contract size. Do not assume this size for every product.
- **“The $1 premium is the $22.50 strike.”** The premium buys the right initially; the strike is a separate per-share exercise payment.
- **“Put the premium inside the maximum.”** That incorrectly erases a paid cost when the option expires without payoff. Profit can be negative although a long call's exercise payoff cannot.
- **“Leverage guarantees the larger return.”** It magnifies the consequences of the selected exposure, including the possibility of losing the entire premium. The source's $22.50 row is a direct counterexample to “any rise makes calls profitable.”
- **“No premium or zero initial value means no risk.”** Not true for other derivatives such as a forward: an agreement can start with no payment yet create future payment/delivery obligations. This lesson's calls do charge a premium. A margin deposit, where required for other positions, is collateral securing obligations, not the same thing as an option purchase price and not necessarily the maximum possible loss. No margin calculation is used here.
- **“The 150% is an annual return.”** It is the source strategy's two-month scenario return; the future price is assumed, not forecast with certainty.
- **“A hedge must make the most profit.”** Hedging concerns reducing an existing risk. It can give up favourable outcomes or cost money. Classification requires the original exposure and objective, not the winning result.

<a id="practice"></a>

## 9. Practice — attempt before opening each answer

Exercises 1, 2, 4, 5 and 6 are supplemental. Exercise 3 repeats the supplied question; its worked answer reasoning is supplemental and agrees with the separately supplied p6 results. The practice progresses from identifying units through application to explanation.

<a id="exercise-motives-prompt"></a>

### Exercise 1 — motive scaffold (outcome 1)

Classify and justify: (a) a firm with a future share-purchase obligation buys calls to limit the effect of rising prices; (b) a trader with no existing purchase need buys the same calls solely expecting a rise; (c) a trader locks simultaneous purchases and offsetting sales of the same asset at inconsistent prices under frictionless, reliable settlement assumptions. Why does the word “call” not settle (a) versus (b)? [Answer 1](#exercise-motives-answer).

<a id="exercise-quantities-prompt"></a>

### Exercise 2 — identify units, then transfer (outcome 1)

For the source budget, fill in the share count, premium per 100-share call contract, contract count and covered-share count. Explain why the last count is not shares already owned. Then use a supplemental $1,200 budget, $30 share price, $2 call premium per covered share and the same 100-share contract size: calculate those four quantities. No strike is needed for this sizing task. [Answer 2](#exercise-quantities-answer).

<a id="exercise-source-table-prompt"></a>

### Exercise 3 — source profit question (outcome 2)

Using the source's $2,000 strategies, calculate both total profits at maturity prices $15, $22.50 and $25. Show the maximum, premium subtraction and quantity for calls rather than copying the table. The supplied question is [L2 p5, lower calculate box](../../sources/annotated/lecture-2/page-005.md#lecture-2-p005-strategy-profit-question). [Answer 3](#exercise-source-table-answer).

<a id="exercise-transfer-prompt"></a>

### Exercise 4 — transfer the whole calculation (outcome 2)

Use a supplemental $1,200 budget, $30 share price, call strike $32, premium $2 per share and 100 shares per contract. Hold to the same two-month horizon; use all the stated no-extra-cost assumptions. At maturity prices $28, $33 and $36, calculate share profit, call payoff, call profit and each strategy's percentage return on $1,200. Derive the call break-even. At $33, would exercising be useful even if the call purchase lost money? [Answer 4](#exercise-transfer-answer).

<a id="exercise-motive-teachback-prompt"></a>

### Exercise 5 — explain the exposure (outcome 1 teach-back)

Explain to a beginner why a purchased call can be a hedge for one person and speculation for another, why the source's equal budgets cover different quantities, and why “twenty times as many covered shares” is not “twenty times the return at every price.” Include one source downside row as evidence. [Answer 5](#exercise-motive-teachback-answer).

<a id="exercise-profit-diagnosis-prompt"></a>

### Exercise 6 — diagnose the sign and threshold (outcome 2 teach-back)

A learner says: “At $23 the source call has a positive payoff, so profit is positive. I calculate 2,000 × max(23 − 22.50 − 1, 0), which is zero, and the stock rose so the call must be safer.” Correct the formula and calculate payoff, profit and return. State the actual break-even, explain the risk claim and describe the two profit curves' axes and shape. [Answer 6](#exercise-profit-diagnosis-answer).

<a id="answers"></a>

## 10. Separate supplemental answers and targeted retries

<a id="exercise-motives-answer"></a>

### Answer 1 — classify the purpose

(a) **Hedging:** the obligation already exposes the firm to a higher purchase price; the call reduces that risk. (b) **Speculation:** the trader takes new price risk to benefit from a prediction. (c) **Arbitrage:** matched simultaneous trades exploit an inconsistent price under the stated execution assumptions, rather than waiting for a favourable future movement. The identical call instrument does not reveal the objective; the prior exposure and reason for trading do.

**Diagnosis/retry:** if both call purchases were called speculation, ask which trader already needed the asset. Correct retry: (a) has the pre-existing exposure; (b) does not. A hedge may still have residual risk and need not maximise profit.

<a id="exercise-quantities-answer"></a>

### Answer 2 — count in the right units

Source: $2,000 ÷ $20 per share = **100 shares**. One call contract costs 100 × $1 = **$100**. $2,000 ÷ $100 = **20 contracts**, covering 20 × 100 = **2,000 shares**. The investor owns rights, not those underlying shares; exercise requires paying the strike.

Transfer: $1,200 ÷ $30 = **40 shares**. A call contract costs 100 × $2 = **$200**. $1,200 ÷ $200 = **6 contracts**, covering **600 shares**. No rounding is needed in either example.

**Diagnosis/retry:** if the answer was 1,200 contracts, you divided by a per-share premium rather than a per-contract premium. Retry: how much do 100 rights at $2 each cost? **$200 per contract**.

<a id="exercise-source-table-answer"></a>

### Answer 3 — source cases, independently worked

| $S_T$ (USD/share) | Share calculation (USD) | Call payoff per share (USD/share) | Call profit calculation (USD) |
|---|---:|---:|---:|
| 15 | 100(15 − 20) = **−500** | max(15 − 22.50, 0) = 0 | 2,000(0 − 1) = **−2,000** |
| 22.50 | 100(22.50 − 20) = **250** | max(0, 0) = 0 | 2,000(0 − 1) = **−2,000** |
| 25 | 100(25 − 20) = **500** | max(2.50, 0) = 2.50 | 2,000(2.50 − 1) = **3,000** |

These results match the supplied p6 table. The premium remains a cost in all rows. At $22.50 the share investment gains even though the call investment loses its full initial outlay.

**Diagnosis/retry:** if you wrote zero call profit in the first two rows, you computed payoff instead. Retry: after a zero payoff, what happened to the $2,000 paid initially? It was lost, so profit is **−$2,000**.

<a id="exercise-transfer-answer"></a>

### Answer 4 — new parameters

From answer 2, own 40 shares or buy calls covering 600 shares. Share profit is $40(S_T-30)$; call payoff is $600\max(S_T-32,0)$; call profit is that payoff minus $1,200. Numbers below are USD totals; prices are USD/share.

| $S_T$ | Share profit | Call payoff | Call profit | Share return | Call return |
|---|---:|---:|---:|---:|---:|
| 28 | 40(−2) = −80 | 600(0) = 0 | −1,200 | −6.67% | −100% |
| 33 | 40(3) = 120 | 600(1) = 600 | −600 | 10% | −50% |
| 36 | 40(6) = 240 | 600(4) = 2,400 | 1,200 | 20% | 100% |

Each return is profit ÷ $1,200 × 100%; only −80 ÷ 1,200 × 100% needs rounding, to **−6.67%** (two decimal percentage points). Call break-even requires $S_T-32=2$, so **$34 per share**; check: 600 × (34 − 32) = $1,200 payoff, exactly covering the premium. At $33 exercising gives $600 rather than zero, but cannot recover the whole $1,200 premium. Thus exercise is useful despite a $600 loss.

**Diagnosis/retry:** if a positive exercise payoff was labelled positive profit, subtract the premium explicitly. If $32 was called break-even, retry at that price: payoff zero, profit **−$1,200**.

<a id="exercise-motive-teachback-answer"></a>

### Answer 5 — explanation checklist and model

A sufficient explanation names the prior exposure, objective, purchased right, premium/strike distinction, contract multiplier and downside as well as upside. **Model:** “A firm already needing a future purchase can use calls to limit the harm from a price rise, whereas a trader without that need may buy the same calls to bet on a rise. The source budget buys 100 shares at $20 or rights on 2,000 shares at a $1 premium each. The rights are cheaper than shares, but they require a separate $22.50 strike payment if exercised. The call response depends on whether the maturity price exceeds that strike. At $22.50, shares gain $250 while the calls lose all $2,000 of premium, so twenty times the covered quantity is not a constant return multiple.”

**Diagnosis/retry:** an explanation mentioning only the $3,000 gain omits leverage's downside. Retry with the $15 source row: **−25% on shares versus −100% on calls**. Then give both sides of the trade-off.

<a id="exercise-profit-diagnosis-answer"></a>

### Answer 6 — distinguish four different questions

Correct formula: $2,000[\max(23-22.50,0)-1]$. Exercise payoff per share is $0.50; total payoff is **$1,000**. Profit is $1,000 − $2,000 = **−$1,000** and return is −1,000 ÷ 2,000 = **−50%** over two months. Moving the premium inside the maximum falsely discards its cost. The call is useful to exercise, but break-even is **$23.50**, not $22.50 or $23. A stock-price rise does not make the call safe: here it rises from $20 and the call still loses half its premium.

Graph explanation: horizontal axis is maturity share price in USD/share; vertical axis is total USD profit. The share line rises by $100 per $1 price increase and crosses zero at $20. The call line is flat at −$2,000 up to $22.50, then rises by $2,000 per $1 increase and crosses zero at $23.50. These shapes encode the exercise threshold and the separate premium recovery threshold.

**Diagnosis/retry:** if “positive payoff” still means “positive profit” in the explanation, write two lines: **receive $1,000 of exercise value; paid $2,000 premium**. Add the signed values, then retry the full explanation.

<a id="stop"></a>

## Stop and check

Give your own responses to exercises 5 and 6 before treating the lesson as understood. A tutor should assess classification, units, arithmetic and explanation separately; retry the specific missing step rather than declare mastery from a correct copied number. Keep learner responses in private learner notes, not this authored lesson. Next comes currency-consistent arbitrage and protective puts; neither option pricing nor investment recommendations are covered here.

<a id="evidence"></a>

## Full source evidence and boundaries

All 13 mapped substantive units were read in full normalized and raw spans, and all four original production PNGs displayed. Historical extraction-page warnings remain unchanged; canonical units are verified, but this lesson is not independently approved. No textbook or transcript evidence is used.

| Physical PDF page | Source regions taught | Full normalized page | Raw page | Original image |
|---|---|---|---|---|
| 3 | Three upper motive bullets; lower objective/instrument distinction | [Normalized 3](../../sources/annotated/lecture-2/page-003.md) | [Raw 3](../../sources/extracted/lecture-2/page-003.md#page-3) | [Original 3](../../sources/assets/lecture-2/page-003.png) |
| 4 | Upper scenario/input table; lower share and call strategies | [Normalized 4](../../sources/annotated/lecture-2/page-004.md) | [Raw 4](../../sources/extracted/lecture-2/page-004.md#page-4) | [Original 4](../../sources/assets/lecture-2/page-004.png) |
| 5 | Middle profit formulas; lower calculation question | [Normalized 5](../../sources/annotated/lecture-2/page-005.md) | [Raw 5](../../sources/extracted/lecture-2/page-005.md#page-5) | [Original 5](../../sources/assets/lecture-2/page-005.png) |
| 6 | Upper results table; lower leverage statement and break-even equation | [Normalized 6](../../sources/annotated/lecture-2/page-006.md) | [Raw 6](../../sources/extracted/lecture-2/page-006.md#page-6) | [Original 6](../../sources/assets/lecture-2/page-006.png) |
