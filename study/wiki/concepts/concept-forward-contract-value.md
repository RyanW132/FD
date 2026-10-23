# Existing forward value versus delivery price

**Source-grounded quick reference — author draft; independent semantic review pending.** Prerequisite: [replication and carry](concept-replication-and-carry.md#carry-foundations). Use [zero discount factors](concept-zero-discount-factors.md#zero-formulas) and [payoff versus profit](concept-payoff-and-profit.md#payoff-definition) for the financial/mathematical foundations. This is a lookup with supplemental practice, not a replacement lesson or a valuation recommendation.

<a id="value-purpose"></a>
## Use this reference to distinguish and calculate

1. Explain why a fixed delivery price, a new forward quote, today's contract value and eventual payoff are different dated amounts.
2. Derive and check the old long/short values by offsetting matching delivery obligations, using remaining time, correct signs and one rate convention.

<a id="value-symbols"></a>
## Fix the dates, side and units

A long forward commits to buy the asset; a short commits to sell. Let original agreement be at date 0, current valuation date be \(t\), and delivery date be \(T\), with \(0\le t\le T\). The remaining interval is \(\tau=T-t\), in years; it is not necessarily the original maturity.

| Symbol | Meaning and units |
|---|---|
| \(K\) | Delivery price fixed in the **old** contract, currency per asset unit |
| \(S_t\), \(S_T\) | Current spot and eventual delivery-date spot, currency per unit |
| \(F_{t,T}\) | Today's fair delivery quote for a **new matching** forward, currency per unit |
| \(f_t\) | Today's value of the **old long**, currency per unit today |
| \(Q>0\) | Number of underlying asset units; total long value is \(Qf_t\) |
| \(r\) | Relevant annual continuously compounded decimal rate for the remaining interval |
| \(P(t,T)=e^{-r\tau}>0\) | Dimensionless factor bringing a delivery cash payment back to today |

A subscript identifies dates, not multiplication. Annual rate times years gives a dimensionless exponent. Assume matching asset quality, currency, quantity, delivery/settlement dates and performance; no omitted transaction, tax, credit, collateral or funding asymmetry. A nonflat curve can supply the appropriate positive factor for this maturity; no arithmetic averaging of rates is required.

At fair inception, the source states \(K=F_{0,T}\) and \(f_0=0\). Later, \(K\) stays fixed while the market's new quote and the old contract's value can change. Zero entry value does not mean free future delivery, zero price or freedom from obligations. An off-market contract could instead have an initial value/payment. Sources: [L4 p19 inception equation](../../sources/annotated/lecture-4/page-019.md#lecture-4-p019-contract-inception) and [later-date distinctions](../../sources/annotated/lecture-4/page-019.md#lecture-4-p019-contract-later).

<a id="value-derivation"></a>
## Offset the asset, then discount the remaining cash

Keep the old long at \(K\). Enter a new fair **short** at \(F_{t,T}\), which has zero current value in the benchmark. The following is an **authored accessible expansion** of the source construction:

| Position, per underlying unit | Current value | Asset transfer at \(T\) | Cash at \(T\) |
|---|---:|---|---:|
| Existing long | \(f_t\), not assumed zero | Receive one unit | \(-K\) |
| New matching short | 0 | Deliver one unit | \(+F_{t,T}\) |
| Combined | \(f_t\) | Zero net units | \(F_{t,T}-K\) |

Equivalently the terminal economic payoffs cancel the uncertain spot:

\[
(S_T-K)+(F_{t,T}-S_T)=F_{t,T}-K.
\]

Do not count these economic values as extra cash on top of physical delivery. The known terminal difference has present value obtained by discounting. The new short adds zero current value, so the old long must have

\[
f_t=(F_{t,T}-K)P(t,T)=(F_{t,T}-K)e^{-r(T-t)}.
\]

Accumulating \(f_t\) by \(e^{r\tau}\) returns the locked difference, a useful independent check. The matching old short has value \(-f_t\); multiply each by \(Q\) for total currency. Sources: [p20 offsetting construction](../../sources/annotated/lecture-4/page-020.md#lecture-4-p020-offsetting-forward-portfolio), [discounted value](../../sources/annotated/lecture-4/page-020.md#lecture-4-p020-discounted-forward-value), and [p19 opposite-side statement](../../sources/annotated/lecture-4/page-019.md#lecture-4-p019-contract-value).

Because the factor is positive, the old long is valuable when today's new delivery quote exceeds its fixed price, and a liability when the new quote is lower. Adding a new zero-value short does not make the old contract free: its existing value remains in the combined position. Economic cancellation assuming performance is not a guarantee of legal netting or synchronized cash settlement.

<a id="value-spot-route"></a>
## A no-income shortcut, not an all-asset formula

If the asset has no income/storage and the carry assumptions apply, today's matching quote is \(F_{t,T}=S_te^{r\tau}\). Substitute and cancel reciprocal factors:

\[
f_t=(S_te^{r\tau}-K)e^{-r\tau}
=S_t-Ke^{-r\tau}.
\]

This is current spot minus the present value of the old delivery payment, not \(S_t-K\) before delivery. Source: [p20 no-income substitution](../../sources/annotated/lecture-4/page-020.md#lecture-4-p020-no-income-value).

For income-paying assets, the general **matching-quote difference** formula still uses the quote appropriate to those terms. Do not use the no-income spot shortcut unchanged: a spot owner receives interim income that the forward holder does not. Known cash income and proportional yield require their distinct [carry calculations](concept-replication-and-carry.md#carry-income). Only income still due after today's valuation enters a current forward quote; already-paid income belongs to historical cash-flow/profit accounting. A payment exactly at a valuation/delivery boundary needs an explicit entitlement convention.

<a id="value-example"></a>
## Supplemental mini-example: two routes, same present value

An old long has \(K=101\) USD per unit. Today \(S_t=100\) USD per unit for a no-income asset, with six equal months remaining: \(\tau=6/12=0.5\) year. The annual continuous rate is 5%, so \(r=0.05\) and \(r\tau=0.025\). The original total maturity is not needed and is not invented.

1. Today's fair quote is \(100e^{0.025}\approx102.531512052443\) USD per unit at delivery.
2. The locked delivery difference is \(102.531512052443\ldots-101\approx1.531512052443\) USD per unit.
3. The factor is \(e^{-0.025}\approx0.975309912028\). Multiplying the **unrounded** difference by it gives \(f_t\approx1.493698885138\) USD per unit today.
4. Independent spot route: \(100-101e^{-0.025}\approx1.493698885138\), the same result.

The old long is worth **+USD 1.49 per unit** to cents, the old short **−USD 1.49**. This is not the new quote USD 102.53, the old delivery payment USD 101, or a cash receipt already received. The old buyer benefits relative to current forward terms even though current spot is below the old delivery price: those two amounts are at different dates. Retain precision before scaling quantity or checking reversal.

<a id="value-limits"></a>
## Boundaries and common mistakes

- At \(K=F_{t,T}\), current value is zero; the contractual delivery payment can still be nonzero.
- At delivery, \(\tau=0\), the factor is 1 and the matching immediate quote is \(S_T\). Value becomes payoff \(S_T-K\), with opposite short payoff. No division by remaining time is needed.
- At zero rate, the supplied quote difference needs no discount adjustment. Negative continuous rates keep a positive factor (possibly above 1); they do not reverse the long/short sign rule.
- Do not reset old \(K\) to today's quote, discount for the original rather than remaining term, or turn an unfavorable forward into an option to abandon payment.
- A present mark is not automatically a realized profit or immediate executable cash exit. Counterparty performance, settlement timing, collateral and actual funding can change practical values. Daily-settled futures have different interim cash flows; this page does not silently apply their settlement convention to a forward.

<a id="value-practice"></a>
## Progressive supplemental practice

<a id="value-sign-prompt"></a>
1. For an old delivery price of USD 101, a **supplied matching** current quote of USD 98, the same half-year and 5% continuous rate, find the old long/short values per unit and for 10 units. Do not retain the mini-example's spot simultaneously: this is a separate quote scenario. [Answer](#value-sign-answer).

<a id="value-boundary-prompt"></a>
2. Explain the values at a current quote equal to 101, and at expiry if spot is 98. If the rate were zero while the supplied quote stayed 98, what would the current per-unit value be? [Answer](#value-boundary-answer).

<a id="value-teachback-prompt"></a>
3. Teach back the old-long/new-short derivation. Distinguish current quote, fixed price, value, payoff and profit; state why the offset is not free arbitrage and what matching assumptions it needs. [Answer](#value-teachback-answer).

<a id="value-sign-answer"></a>
### Separate supplemental answer 1

The delivery difference is \(98-101=-3\) USD per unit. Long value is \(-3e^{-0.025}\approx-2.925929736085\) USD per unit, or **−USD 2.93**; short value is the positive counterpart. For 10 units, unrounded total long value is approximately **−USD 29.259297360850**, displayed **−USD 29.26**; short **+USD 29.26**. Do not multiply the already rounded 2.93 and call 29.30 the exact theoretical total. Multiplying the unrounded long value by \(e^{0.025}\) recovers the −USD 3 terminal amount per unit.

<a id="value-boundary-answer"></a>
### Separate supplemental answer 2

At current quote 101, the difference is zero, hence both values are zero despite the nonzero delivery price. At expiry with spot 98, the old long's per-unit exchange payoff is **−USD 3**, the short's **+USD 3**, because discounting no longer changes the amount. With a zero rate but the supplied quote still 98, the current long is also **−USD 3 per unit**. Holding a quote fixed in that question differs from recalculating a no-income fair quote after changing its funding-rate input.

<a id="value-teachback-answer"></a>
### Separate supplemental answer 3

An old long still owes its fixed price; today's new quote measures current delivery terms, not its current worth. Add a new fair short for the identical asset/date/quantity/currency and assume both perform: receive/deliver assets cancel and leave new quote minus old price in cash at delivery. Discount that signed amount for the remaining interval. Only the new contract starts at zero; the old asset or liability is already worth the resulting present value, so the combined holding is not free. Without the actual offset, eventual payoff still depends on realized spot. Profit additionally accounts for acquisition costs, financing and other cash flows. Credit, collateral, funding and settlement mismatches are not erased by the algebra.

<a id="value-navigation"></a>
## Full teaching and source originals

Continue with the existing authored [forward-value lesson](../lessons/lesson-l4-existing-forward-value.md) or [forward/futures timing lesson](../lessons/lesson-l4-forward-futures-difference.md). They remain drafts awaiting independent teaching approval. Formula originals for this reference: [p19](../../sources/assets/lecture-4/page-019.png) and [p20](../../sources/assets/lecture-4/page-020.png). The table here expands those equations accessibly; it is not claimed to be a source table.
