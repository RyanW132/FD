# Value an existing forward, not a new delivery price

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all eight primary units on Lecture 4 physical pages 19–21. Source formulas and examples are cited precisely. Expanded asset/cash ledgers, the illustrative original timeline, income extensions, extra cases, exercises and generated answers are **supplemental**, not official solutions or live valuation advice.

Prerequisite: [known proportional yield](lesson-l4-known-proportional-yield.md). The [pricing benchmark](lesson-l4-pricing-benchmark.md), [no-income replication](lesson-l4-no-income-replication.md), [known cash income](lesson-l4-known-cash-income.md), [rates](../concepts/concept-rate-conventions.md#rates-formulas) and [signed amounts](../concepts/concept-numeric-foundations.md#numeric-signs) support the inline explanation. Planned `concept-replication-and-carry` and `concept-forward-contract-value` pages are absent. Neither is treated as read or used as an unexplained prerequisite.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain and derive the current value:** distinguish inception, valuation and expiry dates; fixed delivery price, current fair quote, current spot, contract value and later payoff. Derive the long/short values by matching a current fair offsetting forward, with complete dated asset/cash cancellation and explicit funding/performance assumptions. Explain why the old position is not a free zero-value asset today just because it began at zero.
2. **Calculate and audit:** reproduce both source value routes using the remaining six months, preserve printed rounding without claiming false intermediate equality, and check quantity, sign, fair-inception and expiry boundaries. Transfer the method to future-income cases while excluding already-paid income. Success requires full intermediate precision, dated cash units and a reasonableness check independent of the first computation.

<a id="dates-symbols"></a>
## 1. Three dates and five different price/value questions

A **forward** obliges one side to buy and the other to sell a specified asset quantity at a fixed future exchange price. A long is the buyer; a short is the seller. They do not have an option to ignore an unfavorable outcome. We initially work per underlying unit, then scale by a fixed positive quantity.

| Symbol | Meaning, time and units |
|---|---|
| $0$ | Original inception date, when the old contract was agreed |
| $t$ | Today's valuation date, after or at inception |
| $T$ | Contract delivery/expiry date, with $0\leq t\leq T$ |
| $\tau=T-t$ | **Remaining** time from today to delivery, measured in years for annual rates |
| $K$ | Delivery price fixed in the old agreement, currency per asset unit |
| $S_t$ | Today's spot price of the asset, currency per unit |
| $S_T$ | Spot price eventually realized at delivery, currently uncertain |
| $F_{t,T}$, abbreviated $F_t$ | Today's fair delivery quote for a **new** matching forward expiring at $T$, currency per unit |
| $F_{0,T}$ | The corresponding quote observed at original inception |
| $f_t$ | Current value per underlying unit of the **existing long** forward, in today's currency |
| $Q>0$ | Number of asset units in the old contract; total long value is $Qf_t$ |
| $r$ | Relevant annual continuous rate for today's remaining interval, decimal per year |
| $D(t,T)$ | Positive dimensionless discount factor from delivery back to today; under the stated continuous rate, $D(t,T)=e^{-r(T-t)}$ |

A subscript labels a date; it is not multiplication. The **calendar expiry date** does not change when time passes, but the remaining interval becomes shorter. To use a rate, translate that interval using an explicit time convention. In the source six-month example, use equal months: $\tau=6/12=0.5$ year. The source does **not** tell us the original total maturity, so we cannot silently substitute an invented original tenor.

**Discounting bridge:** if a known currency amount $A$ is due after $\tau$ years, the benchmark present amount is $AD(t,T)=Ae^{-r\tau}$. Continuous accumulation by $e^{r\tau}$ reverses that operation; $e^0=1$ and all exponential factors are positive. Rate times years is dimensionless. Discount factor, interest rate, price per unit and total cash amount are different objects.

A forward quote fixes the future exchange. Contract value asks what an already fixed agreement is worth **now** relative to current alternatives. Spot asks the current asset price. Future payoff depends on what spot eventually becomes. These questions need not have the same answer or date.

<a id="inception"></a>
## 2. Fair inception: zero value, nonzero obligations

The source states that a fairly priced new forward has

$$K=F_{0,T},\qquad f_0=0.$$

[L4 p19, upper inception equation; `lecture-4-p019-contract-inception`](../../sources/annotated/lecture-4/page-019.md#lecture-4-p019-contract-inception).

At a fair new delivery price, neither side starts with a bargain requiring a premium in this model. Zero initial contract value does **not** mean zero delivery price, zero underlying exposure, no future payment, or freedom from collateral/funding needs under actual terms. A deliberately off-market agreement can have a nonzero initial value or an offsetting upfront payment; the source statement is about fair inception.

For a **supplemental** contract fixed at 24 USD/unit for 100 units, gross delivery cash is **2,400 USD** even if its initial value is zero. That scale is not a payment made at inception and is not a margin deposit. A known fixed payment at delivery remains an obligation whether the market later moves favorably or unfavorably.

<a id="later"></a>
## 3. Later: keep the old price fixed and revalue against today's terms

The source says that at a later $t$, **$K$ remains fixed**, the market quote becomes $F_{t,T}$, and $f_t$ is generally no longer zero. [L4 p19, middle bullets; `lecture-4-p019-contract-later`](../../sources/annotated/lecture-4/page-019.md#lecture-4-p019-contract-later).

If the old long pays less at the same delivery date than a newly negotiated buyer would, it has an advantage under matching terms. If it must pay more, it has a disadvantage. That delivery-date difference must be valued at today's date. The original $K$ does not reset just because a new quote appears.

A favorable current value is not automatically cash already received. The holder still has a contract; realizing or offsetting its value depends on executable transactions and terms. Likewise, an unfavorable value is a liability, not a right to walk away. Daily-settled futures have different cash-flow timing; do not silently treat a forward mark as daily variation margin.

<a id="offset-portfolio"></a>
## 4. Derive value with a matching current forward

The source constructs a portfolio at $t$: keep the existing long at $K$, and enter a new short at $F_{t,T}$ with zero current value. It writes the combined delivery payoff

$$(S_T-K)+(F_{t,T}-S_T)=F_{t,T}-K.$$

[L4 p20, upper construction and combined payoff; `lecture-4-p020-offsetting-forward-portfolio`](../../sources/annotated/lecture-4/page-020.md#lecture-4-p020-offsetting-forward-portfolio).

The current fair quote is for the **same underlying asset, quality, currency, quantity, delivery date and settlement/performance terms**. A superficially similar contract does not guarantee cancellation. Both parties must perform. The old contract's value is what we are finding; the **new short alone** starts at zero value under the benchmark.

**Expanded supplemental physical-delivery ledger, per asset unit:**

| Position | Status at current date $t$ | Cash strictly between $t$ and $T$ in this model | Asset at $T$ | Cash at $T$ |
|---|---|---:|---|---:|
| Existing long, price $K$ | Already held; current value $f_t$ need not be zero | 0 | Receive one unit | $-K$ |
| New fair short, price $F_t$ | Enter with zero current value/premium | 0 | Deliver one matching unit | $+F_t$ |
| Combined | Current value $f_t+0$ | 0 | Net **zero units** | **$F_t-K$** |

Receipt and delivery refer to the same asset unit. There is no need to buy a second asset or sell the received unit separately. In economic-payoff notation, the old long is $S_T-K$ and new short $F_t-S_T$; the uncertain spot terms cancel. Those value payoffs are an explanation of the physical exchange, not extra cash to add on top of it.

The remaining cash difference is known today under the assumptions even though $S_T$ is not. If $F_t>K$, it is a receipt; if $F_t<K$, a payment. **The combined position is not free today:** the old long is already worth $f_t$ (or is a liability). Adding a zero-value new contract does not erase that existing value. This is a valuation argument, not a free-arbitrage claim based on forgetting the old position's current worth.

<a id="discounted-value"></a>
## 5. Discount the locked difference, then reverse the sign for a short

The source discounts the certain delivery payment:

$$f_t=(F_{t,T}-K)e^{-r(T-t)}.$$

[L4 p20, middle equation; `lecture-4-p020-discounted-forward-value`](../../sources/annotated/lecture-4/page-020.md#lecture-4-p020-discounted-forward-value).

Using the positive factor notation, the same relation is $f_t=(F_t-K)D(t,T)$. Why is discounting justified? Under common benchmark borrowing/lending, an amount $(F_t-K)D(t,T)$ today grows to exactly $F_t-K$ at delivery. Matching certain dated amounts gives the same present value; the new short adds zero present value, so this is the old long's value. For a negative difference, the same symmetric financing convention values the liability; the discount factor remains positive.

<a id="long-short"></a>

Page 19 gives the same long formula and states that a short forward has value **$-f_t$**. [L4 p19, lower boxed formula and opposite-side statement; `lecture-4-p019-contract-value`](../../sources/annotated/lecture-4/page-019.md#lecture-4-p019-contract-value). For $Q$ units, total long value is $Q(F_t-K)D(t,T)$ and short value is its negative. The two values sum to zero under identical symmetric terms.

**Sign/units check:** currency per unit minus currency per unit, multiplied by a dimensionless factor, remains currency per unit today. Multiply by asset units only when a total is requested. Since the factor is positive, the long's sign follows $F_t-K$, not the sign of the interest rate or a guessed future spot move.

<a id="assumptions"></a>
### Why the qualifications are part of the result — supplemental

The source's simple discounting sits within the earlier no-arbitrage benchmark. We explicitly assume matched funding/lending, no transaction/tax costs, compatible settlement timing, and performance of all obligations; collateral or credit/funding asymmetries are not separately priced in this equation. A positive discount factor must be appropriate for the modeled currency and remaining interval. A term structure can supply that factor without one flat rate across every maturity.

Two offsetting contracts can leave real operational funding or credit exposures if they involve different counterparties or settlement timings. Economic cancellation under assumed performance does not establish a legal netting right or guarantee simultaneous settlement. Collateral can require cash before delivery and can change valuation conventions. These are labelled model limitations, not current jurisdiction-specific legal rules or a claim that all OTC contracts are uncleared/unmargined. Use the actual terms before treating a theoretical value as a guaranteed cash exit price.

<a id="no-income-value"></a>
## 6. Derive the no-income special case from the current spot

For a no-income asset, the source substitutes $F_{t,T}=S_te^{r(T-t)}$ and obtains

$$f_t=S_t-Ke^{-r(T-t)}.$$

[L4 p20, lower substitution and boxed result; `lecture-4-p020-no-income-value`](../../sources/annotated/lecture-4/page-020.md#lecture-4-p020-no-income-value).

**Supplemental algebra, with the remaining interval explicit:**

1. Apply no-income carry **from today to delivery**, not from original inception: $F_t=S_te^{r\tau}$.
2. Insert that quote into the general value: $f_t=(S_te^{r\tau}-K)e^{-r\tau}$.
3. Distribute the discount factor: $f_t=S_te^{r\tau}e^{-r\tau}-Ke^{-r\tau}$.
4. The growth and discount factors cancel, leaving $f_t=S_t-KD(t,T)$.

Intuition: the old long receives an asset at delivery and owes fixed cash then. For a no-income asset, owning the asset now replicates that terminal asset without missing an intervening payment; subtract the present cost of its fixed delivery liability. The formula is not generally valid unchanged for an income-paying asset, because ownership now includes income the forward holder misses.

It is also not $S_t-K$ before delivery when nonzero time value applies. Current spot is a present amount, while $K$ is paid later; discount the latter before subtracting. At delivery itself the dates coincide and the formula reduces to the usual exchange value.

<a id="source-quote"></a>
## 7. Source example: first find today's new quote

The source old long is on a **non-dividend-paying share**, has **$K=24$ dollars/share**, **six months remaining**, current spot **25**, and annual continuous risk-free rate **10%**. It prints the current quote **26.28**. [L4 p21, upper data and forward-price calculation; `lecture-4-p021-existing-forward-price-example`](../../sources/annotated/lecture-4/page-021.md#lecture-4-p021-existing-forward-price-example).

Use USD for the classroom dollar calculations and equal months for the time conversion. Start with one share of contractual delivery quantity; this is not a stated exchange multiplier.

| Step | Calculation and meaning |
|---|---|
| Remaining time | $\tau=6/12=0.5$ year |
| Decimal annual rate | $r=0.10$ |
| Remaining growth exponent | $r\tau=0.10(0.5)=0.05$ |
| Current fair quote | $F_t=25e^{0.05}\approx26.281777409401$ USD/share |
| Source cent display | **26.28 USD/share** |
| Old delivery price | Still **24 USD/share**, not replaced by the new quote |

The new quote is neither the old contract's value nor its future realized spot. The source does not give the original total term or the current contract quantity beyond a per-share computation.

<a id="source-value"></a>
## 8. Reproduce both source value routes and their rounding

The source displays $(26.28-24)e^{-0.10(0.5)}=2.17$ and, equivalently, $25-24e^{-0.10(0.5)}=2.17$. [L4 p21, middle and lower value calculations; `lecture-4-p021-existing-forward-value-example`](../../sources/annotated/lecture-4/page-021.md#lecture-4-p021-existing-forward-value-example).

**Supplemental full-precision route using the unrounded quote:**

1. Delivery difference: $F_t-K\approx26.281777409401-24=2.281777409401$ USD/share at $T$.
2. Discount factor: $e^{-0.05}\approx0.951229424501$.
3. Long value: $(25e^{0.05}-24)e^{-0.05}\approx\mathbf{2.170493811983}$ USD/share today.
4. Final cent display: **+2.17 USD/share** for the long, **−2.17** for the symmetric short.

**Independent current-spot route:** discounted old payment is $24e^{-0.05}\approx22.829506188017$. Current spot 25 minus that liability gives **2.170493811983** again, using full precision. Accumulating the unrounded value by $e^{0.05}$ returns the locked delivery difference **2.281777409401**. This checks both algebra and date direction.

If the printed quote **26.28** is used literally, $(26.28-24)e^{-0.05}\approx\mathbf{2.168803087862}$, also rounding to **2.17**. The two routes are exactly equivalent **when the unrounded fair quote is used**. The source's intermediate cent approximation is not exactly identical to that quote; do not claim 2.168803… equals 2.170493… before rounding.

<a id="numerical-offset"></a>
### Full offsetting cash/asset table — supplemental source-input expansion

| Position, one share | Current date $t$ | At delivery: share flow | At delivery: cash flow, USD |
|---|---|---:|---:|
| Old long at 24 | Value about **+2.170493811983**; no new exercise of an option | +1 | −24 |
| New fair short at full-precision $F_t$ | Value/premium **0** | −1 | +26.281777409401 approximately |
| Combined | Value about **+2.170493811983**, not zero | **0** | **+2.281777409401** approximately |

There are no modeled intermediate forward payments. The old long's historical fair inception is not a new zero-price purchase today. Holding and offsetting it locks its already existing economic advantage under the assumptions, not an extra free profit in addition to its value.

For a **supplemental 100-share contract**, fixed old delivery cash is **2,400 USD**; current quoted delivery scale is about **2,628.177740940060**, and the locked terminal cash difference about **228.177740940060**. Present long value is approximately **217.049381198286**, or **217.05 USD**; short value is **−217.05**. Multiplying the displayed per-share value 2.17 by 100 gives 217.00, a different rounded calculation. If a traded price were explicitly fixed at that per-share rounded value, that would be its own quoted transaction price, not the exact theoretical aggregate.

<a id="timeline"></a>
## 9. A complete inception-to-later timeline — supplemental, not missing source history

The source only states **six months remain**. To illustrate original versus remaining maturity, now stipulate a separate compatible classroom history: original delivery one year after inception, current time halfway through, no dividends, and a 10% annual continuous benchmark at both relevant dates.

- Original $T=1$ year from inception; current $t=0.5$ year; remaining $T-t=0.5$ year.
- Choose original spot $S_0=24e^{-0.10}\approx\mathbf{21.716098032863}$ USD/share. This is an invented consistent starting price, **not supplied on p21**.
- Original fair quote is $S_0e^{0.10}=24$, so $K=24$ and $f_0=0$.
- At today's stipulated spot 25 with six months left, today's quote and old value are the source calculations **26.281777409401** and **2.170493811983**. The old $K$ is unchanged.

Using the **original one-year term** in today's no-income value would instead give $25-24e^{-0.10}\approx\mathbf{3.283901967137}$, which is **not** the correct six-month current value. The mistake discounts the old payment for longer than remains. Write the dated interval before using the exponent.

The source's absent original date should remain absent unless a hypothetical history is explicitly introduced. A correct formula cannot repair an invented tenor presented as source data.

<a id="payoff"></a>
## 10. Current value is not eventual payoff — supplemental

Without actually adding the new short, the old long still has uncertain maturity exchange value $S_T-K$. For $K=24$:

| Hypothetical realized spot at $T$ | Old long per-share maturity exchange value | For 100 shares |
|---|---:|---:|
| 30 USD/share | $30-24=+6$ USD | +600 USD |
| 20 USD/share | $20-24=-4$ USD | −400 USD |

These are possible scenarios, not a distribution forecast by today's 26.281777 quote. They are also not today's 2.170494 mark. Physically the old long pays 24 per share and receives the shares; the economic payoff compares their then-value with the payment. It is not receipt of both a free share and a separate extra payoff cash amount.

If the matching new short is **actually entered**, its opposite asset delivery removes that terminal spot exposure and fixes the combined difference under performance assumptions. A possible offset used to derive a valuation does not prove the holder already executed that hedge. Subsequent funding/credit/settlement effects remain outside the simple model unless explicitly added.

<a id="future-income"></a>
## 11. Value only the income remaining after today — supplemental extension

The general supplied-quote formula $f_t=(F_t-K)D(t,T)$ can be used for a matching income-paying asset if $F_t$ already reflects the relevant future income and all benchmark conditions hold. The no-income spot shortcut must be adjusted, not reused unchanged.

Define $I_t$ as the present value **at today's $t$** of known cash payments to a spot holder occurring **after $t$ and before delivery**, with their appropriate remaining-date discount factors. This is not the original inception income PV and does not include already-paid income. From the known-cash-income lesson, today's fair quote is $(S_t-I_t)/D(t,T)$. Substitution gives

$$f_t=S_t-I_t-KD(t,T).$$

Payments before $t$ belong to past cash-flow/profit accounting. They are not future benefits received by someone buying the asset today and must not be deducted again in current forward value. A payment exactly at $t$ or delivery requires an explicit entitlement/settlement convention.

**New supplemental asset scenario:** current spot 25 USD/unit, old $K=24$, remaining 0.5 year, continuous rate 10% at all relevant remaining dates. Suppose this different asset has a known **1 USD** payment **0.25 year from today**, before delivery; a separate 1 USD payment made before today is history and excluded. Then

- Remaining income PV: $I_t=e^{-0.10(0.25)}=e^{-0.025}\approx\mathbf{0.975309912028}$ USD/unit.
- Current matching quote: $(25-I_t)e^{0.05}\approx\mathbf{25.256462288876}$ USD/unit.
- Old long value: $25-I_t-24e^{-0.05}\approx\mathbf{1.195183899955}$ USD/unit, or **1.20** to cents.

The general quote-difference route gives the same unrounded value. This is **not** the source's non-dividend-paying share: the new future payment deliberately changes the instrument model.

For the distinct constant continuous-yield model with remaining yield $q$, the preceding lesson gives $F_t=S_te^{(r-q)\tau}$. Substituting yields the supplemental expression

$$f_t=S_te^{-q\tau}-Ke^{-r\tau}.$$

Here $q$ is a known annual continuous proportional yield over the **remaining** interval, not a historical nominal dividend percentage. For source-like spot 25, $K=24$, rate 10%, remaining 0.5 and a separately supplied yield 3.96%, the value is approximately **1.680362128150 USD/unit**, or **1.68**. The cash-income and yield scenarios are alternatives; no payment is deducted in both forms. No income-yield assumption is silently inserted into the source no-income value 2.17.

<a id="boundaries"></a>
## 12. Boundary checks that expose a wrong date, sign or instrument

| Check | Correct consequence under the matching benchmark |
|---|---|
| Fair inception, $K=F_{0,T}$ | Difference and value are zero, not the delivery payment |
| At any later date, $K=F_t$ | Existing long/short values are zero under the same terms |
| Current $F_t>K$ | Long positive; short negative |
| Current $F_t<K$ | Long negative; short positive |
| Zero remaining time | $D(T,T)=1$; matching immediate quote equals $S_T$, so long value is $S_T-K$ |
| Zero rate, supplied matching quote | $f_t=F_t-K$ because there is no time adjustment |
| Zero quantity | Total value is zero; dividing by quantity to infer per-unit value is invalid |
| Negative remaining time or zero discount factor | Invalid inputs for this future-delivery discounted setup |

For a **supplemental** matching current quote of 22, old $K=24$, remaining 0.5 year and 10% continuous rate, long value is $-2e^{-0.05}\approx\mathbf{-1.902458849001}$ USD/unit, short the opposite. The discount factor remains positive; the value is negative because the old long pays more than the new buyer. With zero rate instead, the value for those supplied quotes is **−2**. For the separate no-income source spot 25 and zero rate, the current fair quote would be 25 and value **+1**, because the quote itself changes with that input.

A negative rate does not reverse the sign rule: its positive discount factor may exceed one. In the source's positive-rate case, the current positive value **2.1704938…** is smaller than the matched delivery receipt **2.2817774…**, a useful date-direction check. At expiry, no discount remains; the hypothetical spot-30/spot-20 values become +6/−4 per unit. These checks require compatible instruments, not a comparison of unrelated quotes.

<a id="practice"></a>
## 13. Progressive supplemental practice

<a id="exercise-labels-prompt"></a>
### 1. Label the source quantities — outcome 1
Identify $K,S_t,F_t,f_t,S_T,t,T,\tau$ and their roles. Which source date is known, which original date is not supplied, and why can zero initial value coexist with 2,400 delivery cash for 100 shares? [Answer](#exercise-labels-answer).

<a id="exercise-offset-prompt"></a>
### 2. Derive through both assets and cash — outcome 1
Construct the old-long/new-short ledger and the source payoff cancellation. Explain why the new short has zero value but the combined position does not automatically have zero value. State matching/funding/performance assumptions and why economic offset is not a legal-netting guarantee. [Answer](#exercise-offset-answer).

<a id="exercise-source-prompt"></a>
### 3. Compute both source routes — outcome 2
Use 25 spot, 24 old delivery, 10% continuous and six months remaining. Calculate today's fair quote, discounted old payment, current long/short values, terminal difference and reversal check. Compare literal 26.28 with the unrounded quote. [Answer](#exercise-source-answer).

<a id="exercise-quantity-time-prompt"></a>
### 4. Scale and locate the date error — outcome 2
Compute the 100-share total value and delivery amounts. In the explicitly hypothetical one-year-original/half-year-current timeline, find a consistent inception spot and show why using the original one-year tenor now is wrong. [Answer](#exercise-quantity-time-answer).

<a id="exercise-boundaries-prompt"></a>
### 5. Signs, expiry and payoff — outcome 2
Evaluate the matching-quote-22 case, then zero rate with that quote. Separately give the no-income source-spot-25 zero-rate value. Explain fair inception and expiry, and compute old-long payoff at spot 30 and 20 without claiming those are forecasts. [Answer](#exercise-boundaries-answer).

<a id="exercise-income-prompt"></a>
### 6. Future versus paid income — outcome 2
Recompute the future 1-USD-payment extension and the alternative 3.96% yield extension. Explain why a prior paid coupon is excluded and why these are not the source non-dividend example or two simultaneous deductions. [Answer](#exercise-income-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Explain price versus value — outcome 1
Teach why an old fixed price can create a current asset or liability even when entry value was zero, how an offsetting forward proves its value, and why current value is not eventual payoff or necessarily immediate cash already received. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Repair a valuation report — outcome 2
A report resets old $K$ to 26.28, calls 26.28 the current contract value, discounts for the invented original one-year tenor, multiplies 2.17 by 100 as an exact theoretical total and subtracts a coupon already paid before today. Correct each step using the appropriate source or labelled supplemental model. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 14. Separate supplemental answers and diagnosis

<a id="exercise-labels-answer"></a>
### Answer 1
Old $K=24$ USD/share stays fixed; current $S_t=25$; $F_t$ is today's new matching delivery quote, about **26.281777409401**; $f_t$ is the old long's current per-share value, about **2.170493811983**. $S_T$ is the uncertain future spot. $t$ is today and $T$ expiry; only their remaining interval **0.5 year** is supplied, not original maturity. A fair initial value of zero concerns the contract's worth then, not its later obligations: 100 shares still require **2,400 USD** at delivery for the assets. **Retry:** add a date and units to every number before comparing them.

<a id="exercise-offset-answer"></a>
### Answer 2
Keep the old long at $K$ and add a current fair short at $F_t$. At delivery the old long receives one asset/pays $K$; new short delivers one/receives $F_t$. Asset net is **0**, cash is **$F_t-K$**. Equivalently $(S_T-K)+(F_t-S_T)=F_t-K$. New short value is zero, but old long has value $f_t$; their sum is $f_t$, not automatically zero. Discount the known difference with an appropriate positive factor. Assets, quantity, currency, dates, settlement and performance must match; funding, taxes/costs and collateral effects must follow the model. Economic cancellation assuming both parties perform does not establish legal netting or remove real funding/credit risk. **Retry:** distinguish an already valuable holding from a new zero-premium trade.

<a id="exercise-source-answer"></a>
### Answer 3
Remaining time **0.5 year**, rate **0.10**, exponent **0.05**. Fair quote $25e^{0.05}\approx\mathbf{26.281777409401}$. Discount factor about **0.951229424501**. Old payment PV $24e^{-0.05}\approx\mathbf{22.829506188017}$. Long value **25 − 22.829506188017 ≈ 2.170493811983 USD/share**, short the negative; final cents **+2.17/−2.17**. Terminal matched difference is **2.281777409401** and unrounded value times $e^{0.05}$ recovers it. Literal printed quote 26.28 instead gives **2.168803087862**, also 2.17 USD/share after rounding to cents, not exact intermediate equality. **Retry:** compare the two routes with full quote precision and retain the remaining, not original, interval.

<a id="exercise-quantity-time-answer"></a>
### Answer 4
For 100 shares: old delivery cash **2,400**, new quote scale about **2,628.177740940060**, terminal difference **228.177740940060**, current long value **217.049381198286**, or **217.05 USD**; short −217.05. Rounded per-share 2.17 times 100 gives 217.00, not the exact theoretical total. In the explicitly supplemental history, original spot $24e^{-0.10}\approx\mathbf{21.716098032863}$ grows to fair original delivery 24 and initial value zero. Today only half a year remains. Using one full year now gives **3.283901967137 per share**, not the correct **2.170493811983**. **Retry:** label the invented original history as supplemental and subtract elapsed time before discounting.

<a id="exercise-boundaries-answer"></a>
### Answer 5
Matching quote 22 versus fixed 24 gives long **−1.902458849001 USD/unit**, short **+1.902458849001**, at the supplied half-year/10% factor. With zero rate and those **supplied quotes**, value is **−2**. In the separate no-income case with current spot 25 and zero rate, fair quote is **25**, so long value is **+1**. Fair inception $K=F_{0,T}$ gives zero value; at expiry the matching quote equals immediate spot, and payoff is $S_T-K$. Spot 30 gives **+6/share**, **+600 for 100**; spot 20 gives **−4/share**, **−400 for 100**. Those scenarios are not forecasts or today's mark. **Retry:** distinguish holding a quote fixed from recomputing it when a pricing input changes.

<a id="exercise-income-answer"></a>
### Answer 6
Future cash-income PV $I_t=e^{-0.025}\approx\mathbf{0.975309912028}$ USD/unit. The current fair quote is about **25.256462288876** and old-long value **25 − 0.975309912028 − 22.829506188017 ≈ 1.195183899955**, or **1.20**. Only the payment after today/before delivery is included; the already-paid coupon is historical, not a future benefit purchased today. In the **alternative** remaining continuous-yield model, value $25e^{-0.0396(0.5)}-24e^{-0.10(0.5)}\approx\mathbf{1.680362128150}$, or **1.68**. Neither replaces the source's no-income assumptions without saying so, and the same income is not deducted in both forms. **Retry:** inventory future entitlement dates first, then select one consistent income model.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation
“A fair new forward fixes a delivery price with zero initial bargain value, but market terms can move while that old price stays fixed. An old favorable price becomes valuable relative to today's new quote; an unfavorable one is a liability. Keep the old contract and add the opposite fair current contract: matched asset deliveries cancel, leaving a known signed payment. Discount that remaining-date payment; only the new leg starts at zero, not the old holding. A current mark is not necessarily cash already received, and future unhedged payoff depends on actual future spot. Funding, credit, collateral and matching assumptions qualify the simple model.” **Retry:** distinguish the five questions—spot, new quote, fixed delivery price, present value and later payoff.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8
Keep old **$K=24$**. **26.28** is a rounded new delivery quote, not the current value. Use the **six months remaining**, exponent **0.05**, and preferably full quote **26.281777409401**; long value is about **2.170493811983/share**, total **217.05 for 100** after final rounding. The original one-year story is explicitly supplemental and not the correct remaining discount interval. Past-paid income is excluded from current future-income PV. Moreover the source share is non-dividend-paying; if introducing a different income-paying asset, state the new future payments/yield and recompute its matching quote/value, rather than subtracting an extra coupon from the unchanged source result. **Retry:** freeze contractual $K$, update current inputs and remaining dates, then calculate without premature rounding.

<a id="evidence"></a>
## Source presentation, dependencies and endpoint

All full raw/normalized pp19–21 and all three original PNGs were inspected. Page 19 has fair-inception equations, later-date bullets and long/short values; page 20 constructs offsetting forwards, discounts their combined payoff and substitutes no-income carry; page 21 supplies the complete numerical current-quote and two-route value example. No original chart or cash-flow table is claimed where the source instead has equations: the accessible tables above are labelled supplemental expansions. All eight units are canonically verified with no registered issue; printed cent rounding is distinguished from exact arithmetic.

| Physical page | Full normalized | Unchanged raw | Original PNG |
|---|---|---|---|
| 19 | [Full](../../sources/annotated/lecture-4/page-019.md) | [Raw](../../sources/extracted/lecture-4/page-019.md#page-19) | [Image](../../sources/assets/lecture-4/page-019.png) |
| 20 | [Full](../../sources/annotated/lecture-4/page-020.md) | [Raw](../../sources/extracted/lecture-4/page-020.md#page-20) | [Image](../../sources/assets/lecture-4/page-020.png) |
| 21 | [Full](../../sources/annotated/lecture-4/page-021.md) | [Raw](../../sources/extracted/lecture-4/page-021.md#page-21) | [Image](../../sources/assets/lecture-4/page-021.png) |

Both planned carry and forward-value concepts remain pending integration, without fabricated reads or dead links. No restricted textbook/private learner evidence was used. Stop this author slice after these two lessons; author arithmetic/syntax checks are not independent teaching approval, publication or learner mastery.
