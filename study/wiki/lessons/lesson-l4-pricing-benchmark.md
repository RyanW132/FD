# Pricing assumptions and spot, forward, delivery-price and value notation

<a id="status"></a>

**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all five primary units on Lecture 4 physical pages 9–10. The source supplies six pricing assumptions, a limitation statement, notation and an inception/later distinction. Every numerical case, extended derivation, exercise and solution here is **supplemental**. No current interest rate, borrowing entitlement, contract specification, legal rule or investment recommendation is asserted.

The planned `concept-replication-and-carry` page is not yet authored. It has not been read or silently invented. This lesson supplies enough inline explanation of matching cash flows, carrying costs and value to complete its outcomes; concept integration remains pending separately.

<a id="outcomes"></a>

## Observable outcomes

1. **Specify the benchmark:** given a pricing claim or notation list, state and explain all six source assumptions and how their failure can obstruct a trading comparison. Distinguish spot, today's new forward quote, a fixed existing delivery price, remaining time, contract value and the income/storage/convenience symbols. Success requires units, dates, continuous-rate conventions, and an explanation of why known contractual cash flows do not make future spot known.
2. **Audit price versus value through dated cash flows:** distinguish fair zero-value inception from later value, construct the offsetting-forward cash-flow argument, calculate a supplied-quote existing-contract value under stated discounting, and test fee/divisibility/rate/time boundaries. Success requires independent terminal and present-value checks, correct signs and quantity scaling, no false forecasting claim, and explicit limits rather than treating every benchmark deviation as executable arbitrage.

Prerequisite: [assets, short sales and settlement](lesson-l4-assets-short-sales-and-settlement.md). [Forward interest rates](lesson-l3-forward-interest-rates.md) supplies the distinction between an implied rate and a future observed rate. Optional full bridges: [rates](../concepts/concept-rate-conventions.md#rates-quote), [exponentials](../concepts/concept-exponents-and-logs.md#powers-exponential), [numeric units](../concepts/concept-numeric-foundations.md#numeric-units). The needed operations are explained again before use.

<a id="replication-bridge"></a>

## 1. A benchmark is conditional reasoning, not a forecast — supplemental foundation

A **benchmark** is a reference result under a declared model. **No arbitrage** means prices do not permit the specified kind of matched, feasible trading strategy to produce a profit without an uncompensated risk or funding requirement being hidden. A **replication** is a combination of positions that produces the same relevant payments/deliveries at the same dates under the modeled outcomes. Matching only an expected final amount is weaker than matching the actual contingent cash flows.

Suppose two otherwise-identical claims each pay exactly 100 currency units on the same date with the same performance risk. If one can buy the first for 98 and sell the second for 99 now, the initial net receipt is 1 and their future 100 payments offset. That is a supplemental idealized price inconsistency **only if both transactions and the short/performance obligation can really be executed on those terms**. It is not enough to hope that two different assets' prices will converge later. Taxes, spread costs, collateral or inability to short can remove the proposed trade's profitability or feasibility.

This reasoning explains why assumptions are part of a pricing result, not optional small print. It does not derive a general no-income or storage-cost forward price here; the current slice establishes the language and checks needed before those later pricing cases.

<a id="pricing-assumptions"></a>

## 2. State all six source assumptions exactly, then explain their role

The source basic model assumes:

1. **There are no transaction costs or taxes.**
2. **Assets can be traded in divisible quantities.**
3. **Market participants can borrow and lend at the relevant risk-free rate.**
4. **Short selling is possible when required.**
5. **Contractual cash flows and carrying costs are known.**
6. **Arbitrage opportunities are exploited.**

[L4 p9, upper assumption list; `lecture-4-p009-pricing-assumptions`](../../sources/annotated/lecture-4/page-009.md#lecture-4-p009-pricing-assumptions). These are source model assumptions, not statements that every real participant has those capabilities.

**Supplemental explanation of each assumption:**

| Assumption | What it permits in the argument | What must not be inferred |
|---|---|---|
| No transaction costs/taxes | Compare modeled receipts/payments without an extra charge erasing a small discrepancy | That real bid/ask differences, fees, taxes or financing costs are zero |
| Divisible quantities | Scale a replicating position to the exact required amount, including a fractional unit | That an exchange permits any fractional contract or physical commodity lot |
| Borrow/lend at the relevant risk-free rate | Finance and discount matched dated cash flows consistently | That borrowing and lending rates available to every investor are equal, or that one rate applies to every maturity/currency |
| Short selling when required | Reverse a comparison by selling a borrowed underlying or claim | That stock is available to borrow, proceeds are unrestricted, or recall/borrow charges can be ignored outside the model |
| Known contractual cash flows/carrying costs | Match the income, payments and holding costs used in replication | That an uncertain future spot price, all future dividends or every storage expense is already known |
| Arbitrage opportunities exploited | Feasible price discrepancies attract trades that discipline relative prices | That trading access, capital, execution or risk management is unlimited, or that every computed deviation is actionable |

A **transaction cost** includes a direct trading expense; a **tax** is a separate charge imposed under applicable rules. A **bid/ask spread** is the difference between the price at which one can sell and buy. **Carrying costs** are costs of holding an asset through time, such as financing or storage; income/use benefits may offset some of the burden. These definitions explain terms, not current tax or market guidance.

“Relevant” risk-free rate requires the modeled currency and time interval. A term structure can have different rates for different maturities; the source assumption is not a declaration of a flat curve. A model risk-free payment is treated as certain in that currency for pricing; this does not guarantee purchasing power or make all parties' performance risk disappear.

<a id="benchmark-limitations"></a>

## 3. Why observed prices may form a range around an ideal benchmark

The source says the formulas are theoretical no-arbitrage benchmarks and names **funding spreads, bid/ask spreads, collateral, taxes and short-sale constraints** as reasons real markets can have a range around the benchmark. [L4 p9, lower role-of-assumptions box; `lecture-4-p009-benchmark-limitations`](../../sources/annotated/lecture-4/page-009.md#lecture-4-p009-benchmark-limitations).

**Supplemental interpretation:** a **funding spread** is a difference between applicable financing rates or between a participant's rate and the model reference. If a proposed strategy borrows at a higher rate than it can earn, treating both legs at one convenient number overstates profit. Collateral can tie up funds and its remuneration/timing can affect costs. A short-sale restriction can prevent one direction of the comparison entirely. A range need not be symmetric, stable or numerically determined by the source list. The source supplies no current spread or universally valid width.

### Three small checks before calling a discrepancy an arbitrage — supplemental

**Costs:** return to the otherwise-identical 100-at-maturity claims priced 98 and 99. Gross initial receipt is $99-98=1$ currency unit. If each of the two trades incurs 0.60 of immediate cost, net is $1-0.60-0.60=\mathbf{-0.20}$. If each instead costs 0.20, net is **+0.60**, before any other costs/constraints. The first is not profitable simply because 99 exceeds 98. The second is only a candidate under the remaining stated conditions, not a current trade recommendation.

**Divisibility:** a desired exposure to 2.5 units of the 100-at-maturity claim pays 250 at maturity and, at a 98-per-unit price, costs 245 now. If only whole units can be held, two cost 196 and pay 200; three cost 294 and pay 300. Neither exactly replicates 250. Each differs by 50 of terminal amount, in opposite directions. Choosing a neighbor needs an objective and constraints; “rounding” does not preserve exact replication automatically.

**Continuous-rate foundation for the next check — supplemental:** let $A$ be an initial currency amount, $r$ an annual continuous rate entered as a decimal, and $\tau$ elapsed years. Its accumulated amount is $Ae^{r\tau}$. The exponential function $e^x$ is a positive growth factor with $e^0=1$; annual rate times years gives a dimensionless exponent. For example, 5% is 0.05 and one year is 1, so the exponent is 0.05. This convention differs from simple growth $A(1+r\tau)$; do not silently switch conventions. Discounting later reverses this growth.

**Funding:** as a separate one-year illustration, borrow 100 at 5% annual **continuous** and lend 100 at 3% annual **continuous**, with no other flows or costs. The initial money cancels but repayment is $100e^{0.05}\approx105.127109638$, while the asset pays $100e^{0.03}\approx103.045453395$. Net is about **−2.081656242**, or **−2.08** to cents. Using the just-defined exponential convention, the point is that unequal actual rates are not the common-rate benchmark. These rates are invented classroom inputs, not current quotes.

When inputs or feasibility are missing, the correct conclusion is “the benchmark comparison is incomplete,” not “arbitrage is guaranteed” or “all price constraints disappear.” A model remains useful as a clearly qualified reference.

<a id="dates-and-units"></a>

## 4. Fix dates, units and viewpoint before using symbols

Let **0** be the original contract date, **$t$** today's valuation date and **$T$** its delivery date, with $0\leq t\leq T$. Subscripts are labels, not multiplication. The source writes remaining time as $T-t$; call it $\tau$ when helpful. For annual rates, measure that interval in **years** under a declared time basis. A date and an elapsed interval are not the same object.

For a supplemental equal-month classroom convention, a contract delivering nine months after inception has $T=9/12=0.75$ years. Three months after inception, $t=3/12=0.25$ and remaining $\tau=T-t=0.50$ year, or six months. Do not put the number 6 into an annual-rate exponent while intending six months. Actual contracts can use different day counts; none is inferred from a slide's bare notation.

Choose a side before assigning value: throughout the worked valuation below, $f_t$ means the current value **per underlying unit of an existing long forward**. A short with otherwise identical terms has the opposite value under the symmetric benchmark. Total value for $Q>0$ underlying units is $Qf_t$. The source page 10 does not print $f_t$; this is explicitly supplemental notation to keep price and value separate.

<a id="price-notation"></a>

## 5. The first four source notation entries

[L4 p10, upper first four notation rows; `lecture-4-p010-spot-forward-delivery-notation`](../../sources/annotated/lecture-4/page-010.md#lecture-4-p010-spot-forward-delivery-notation).

| Source symbol | Meaning | Units and key distinction |
|---|---|---|
| $S_t$ | Spot price of the underlying at time $t$ | Currency per underlying unit for the immediate transaction, not the forward contract's value |
| $F_{t,T}$ | Forward price at time $t$ for delivery at $T$ | Today's delivery quote for a **new** otherwise matching contract; currency per underlying unit |
| $K$ | Delivery price written into an existing contract | Fixed currency per underlying unit under that existing agreement |
| $T-t$ | Time remaining to delivery | A nonnegative elapsed interval; paired with the rate's time units |

$F_{t,T}$ has two date labels: when the quote is observed and when delivery occurs. $S_T$ is the spot price actually observed at the future delivery date, not another name for today's $F_{t,T}$. A forward quote can be known today while future realized spot remains uncertain. A fixed $K$ need not equal the new quote at a later date.

**Supplemental label check:** a new contract may be quoted at 55 currency/unit today while an old one still requires 52 at the same delivery date. The difference 3 is a future payment advantage for the old long under matched terms, not necessarily 3 of cash paid today. The current spot price is a separate input; this lesson does not derive the quoted 55 from spot or assume a no-income asset silently.

<a id="carry-notation"></a>

## 6. Read all five carry symbols without confusing amounts and rates

[L4 p10, remaining notation rows; `lecture-4-p010-carry-notation`](../../sources/annotated/lecture-4/page-010.md#lecture-4-p010-carry-notation).

| Source symbol and definition | Supplemental meaning and units |
|---|---|
| $r$: continuously compounded risk-free rate for the remaining term | Annual decimal per year when $\tau$ is in years; a rate for this modeled currency/term, not a currency payment |
| $I$: present value of known cash income before delivery | Currency per underlying unit at the valuation date, if the asset prices are quoted per unit; discount each known payment using its date |
| $q$: continuously compounded income yield | A proportional annual rate under a continuous convention, not a known lump-sum currency income and not contract quantity |
| $u$: proportional storage-cost rate | A proportional rate describing storage cost; the source label alone does not specify every real storage fee/timing convention |
| $y$: convenience yield | A rate representation of benefits from access to physical inventory; not necessarily a cash receipt or a payment to a futures holder |

A **yield** expresses income or benefit relative to value rather than as a fixed cash amount. Distinguish $q$ here from the prior lesson's possible quantity shorthand: symbols get their meaning from the declared model. $Q$ will mean quantity here; $q$ means income yield. To combine rates in a later carry model, their time/compounding conventions must be made compatible. Page 10 explicitly says $r$ and $q$ are continuous; it does not license assuming every real quoted storage charge is already a continuous rate.

Known cash income $I$ and an income-yield representation $q$ are different descriptions. Do not count the same dividend once as known cash income and again as a yield deduction. A source notation list is not a command to add every symbol into every formula: identify the actual asset's income/cost specification. An asset with unknown future dividends does not satisfy the known-cash-income assumption merely because a symbol $I$ exists.

**Convenience bridge:** stored oil may support uninterrupted production, so physical access has value beyond a later sale receipt. That benefit can be modeled through $y$ under further assumptions, but it is not automatically a tradable coupon. Storage can cost money even when convenience benefits are valuable. The current lesson defines those distinctions; it does not claim an exact general convenience-yield pricing formula or value an unspecified operating benefit.

<a id="rate-bridge"></a>

### Continuous growth and discounting — supplemental refresher before computation

For a constant annual continuous rate $r$ over an interval $\tau$, one currency unit grows by factor $e^{r\tau}$. The exponential $e^x$ is a positive growth function; $e^0=1$ and $e^{-x}=1/e^x$. Since annual rate times years is dimensionless, the exponent has no currency or time unit. Enter 4% as 0.04, not 4.

If a known amount $A$ is due after $\tau$, its modeled present value is

$$\operatorname{PV}=Ae^{-r\tau}.$$

The negative exponent reverses growth: multiplying the unrounded PV by $e^{r\tau}$ recovers $A$. The **discount factor** $D(t,T)=e^{-r(T-t)}$ is dimensionless; it is not the annual interest rate. A more general term structure can supply an appropriate positive factor without one constant rate across all maturities. Use the rate appropriate to each payment date and currency.

At $r=0$, the factor is 1. With a negative continuous rate and positive time, the discount factor can exceed 1; it is still positive. At zero remaining time, discounting makes no time adjustment. Negative remaining time does not describe a future-delivery contract in this setup. Different compounding quotes cannot be substituted numerically unchanged: a continuous 4% is not automatically a nominal or simple 4% quote.

<a id="income-example"></a>

### Known cash income is a dated present amount — supplemental

Suppose one asset unit pays a known **2 USD** cash distribution in three months, before delivery. For this example only, use equal months and a 4% annual continuous risk-free rate appropriate to that payment date. The waiting time is 0.25 year, so

$$I=2e^{-0.04(0.25)}=2e^{-0.01}\approx1.980099667498\text{ USD per asset unit}.$$

The cash payment is 2 later; its present value is about 1.98 now, not a 2% yield. For 100 asset units, the future distribution is 200 USD and its present value is about **198.0099667498 USD**, or **198.01 USD** to cents. Accumulating the unrounded present value by $e^{0.01}$ returns 200. Do not round the per-unit 1.98 first and then claim 198.00 is the exact total; keep intermediate precision.

For multiple known payments, $I$ is the sum of their separately discounted per-unit amounts, each with its own date and applicable factor. This example has only one payment and does not infer unknown dividends, a storage rate or convenience yield.

<a id="inception-later"></a>

## 7. A fair new contract has zero value, not a zero delivery price

The source says that for a fairly priced new forward, $K=F_{0,T}$ and its value is zero. After inception, $K$ is fixed while the market forward price changes. [L4 p10, lower at-inception box; `lecture-4-p010-inception-versus-later`](../../sources/annotated/lecture-4/page-010.md#lecture-4-p010-inception-versus-later).

**Supplemental distinction:** the forward quote is chosen so neither party pays a premium for a bargain at fair inception in this benchmark. It fixes a future exchange, not a free asset. With quantity 100 and $K=52$ USD/unit, gross delivery cash is 5,200 USD, even when $f_0=0$. Collateral can still be required by actual terms; zero contract value does not mean no cash-funding needs. A contract deliberately entered at an off-market delivery price may have nonzero initial value or an offsetting upfront payment; the source claim is specifically about a **fairly priced new** contract.

Later, a long with an old low $K$ can be favorable relative to a new higher quote for the same maturity. The original $K$ does not reset each day just because the new-market quote changes. This differs from daily futures settlement, where marked gains/losses are paid through time. A quote, current contractual value, collateral balance, delivery cash and future realized payoff answer different questions.

<a id="value-derivation"></a>

### Derive a value bridge by matching two forwards — supplemental, not a source formula on these pages

We are **given** a current fair forward quote $F_{t,T}$ for the same asset, quantity, date and performance terms as the existing long with delivery price $K$. We are not deriving that quote from spot or assuming a particular income/storage pattern. Under the benchmark, a new short struck at $F_{t,T}$ has zero current value. Combine it with the old long:

| Position, per underlying unit | Asset flow at $T$ | Cash flow at $T$ |
|---|---:|---:|
| Existing long at $K$ | Receive one unit | Pay $K$ |
| New short at today's $F_{t,T}$ | Deliver one unit | Receive $F_{t,T}$ |
| Combined | Zero: the same delivered asset offsets | **Receive $F_{t,T}-K$** |

The asset flows cancel only because the terms match and both parties perform. What remains is a known signed cash payment at $T$. The new short has zero current value, so the existing long's current value equals the discounted value of that locked difference:

$$f_t=(F_{t,T}-K)D(t,T)=(F_{t,T}-K)e^{-r(T-t)}.$$

This is an **authored valuation bridge**, derived here from matching dated flows and discounting, not falsely attributed as a printed p 9–10 formula. It requires a positive discount factor, matching contracts, benchmark borrowing/lending, and no collateral/funding/transaction-cost asymmetry or default. A negative difference represents an obligation, so $f_t$ is negative; the discount factor itself is not negative. For $Q$ underlying units, total value is $Qf_t$. The symmetric short has value $-Qf_t$.

At inception $K=F_{0,T}$, so the difference and value are zero. At maturity the new immediate-delivery quote coincides with the matching spot transaction price under the ideal settlement model, giving the long's per-unit exchange value $S_T-K$. That future realized spot was not known merely from the earlier forward quote. If cash-settled, cash follows the contract's specified settlement reference; physical delivery is an asset-for-cash exchange, not both a free asset and an extra payoff payment.

<a id="value-example"></a>

### Complete worked existing-contract valuation — supplemental

Assume an old fair long was entered at date 0 with $K=F_{0,T}=52$ USD/unit, quantity $Q=100$ units and delivery nine months after inception. Today is three months after inception: $t=0.25$, $T=0.75$, remaining $\tau=0.50$ year under the equal-month convention. The **given** current matching forward quote is **55 USD/unit**; the relevant remaining-term continuous rate is **4% annually**. This is not a claim about a live quote or a spot-derived no-income price.

1. Difference in promised delivery payments: $55-52=3$ USD/unit at $T$.
2. Total locked difference for 100 units: $100\times3=300$ USD at $T$.
3. Remaining exponent: $r\tau=0.04(0.50)=0.02$.
4. Discount factor: $e^{-0.02}\approx0.980198673307$.
5. Per-unit long value: $3e^{-0.02}\approx\mathbf{2.940596019920}$ USD/unit.
6. Total long value: $300e^{-0.02}\approx\mathbf{294.0596019920}$ USD, or **294.06 USD** to cents. The symmetric short value is **−294.06 USD** to cents.
7. Reverse check: the **unrounded** total value times $e^{0.02}$ equals 300 USD at $T$, the independently matched terminal cash flow.

Gross old delivery cash is $100\times52=5{,}200$ USD; the new forward quote times quantity is $100\times55=5{,}500$ USD. Neither is the old contract's current 294.06 USD value. The quantity×quote amount describes scale/exposure; it is not an upfront purchase price for a zero-value new contract or the margin deposit. No numerical margin amount is supplied.

**A different maturity outcome:** if actual spot at $T$ turns out 57, the old long's physical exchange is 100 units worth 5,700 USD received for 5,200 USD cash, net economic payoff **+500 USD**. If spot instead 48, the asset is worth 4,800 and payoff is **−400 USD**. The quoted 55 earlier and marked 294.06 then do not force either future spot outcome; without actually adding the offsetting short, the old long remains exposed. With that matching short in place, the two asset obligations cancel and the fixed 300 difference is locked under the assumptions. Do not confuse a valuation argument using a possible offset with a claim that the owner already executed it.

<a id="boundaries"></a>

## 8. Check signs, dates and assumptions at the boundaries — supplemental

Keep $K=52$, quantity 100, remaining 0.5 year and 4% continuous unless a row changes them.

| Case | Per-unit long value | Meaning |
|---|---:|---|
| Current matching quote 55 | $3e^{-0.02}\approx2.940596019920$ | Favorable fixed delivery price for old long |
| Current quote 52 | 0 | No difference from a new fair contract under matched terms |
| Current quote 49 | $-3e^{-0.02}\approx-2.940596019920$ | Old long pays more than the new quote |
| Quote 55, rate 0 | 3 | No time-value discount; total 300 |
| Quote 55, remaining time 0 | 3 | Immediate matching payment; no discount delay |
| Quote 55, rate −2% continuous, remaining 0.5 | $3e^{0.01}\approx3.030150501253$ | Positive factor above 1, total about 303.0150501253 |

Negative rates are mathematically allowed under the stated continuous convention; negative remaining time is outside this forward-delivery setup. Total value for zero quantity is zero, but there is then no exposure to value; dividing a total by zero to infer a per-unit contract is invalid. A negative current value is a liability, not proof the discount factor should be negative or that the holder can walk away.

A new quote's equal delivery date alone is insufficient if asset grade, currency, quantity, settlement or counterparty performance terms differ. No exact cancellation follows from an approximate match. A restricted short, different funding rates or unknown costs can invalidate the simple value bridge's execution assumptions. Under such conditions report the limitation or use a properly specified different model; do not claim the benchmark is an enforceable cash profit.

<a id="practice"></a>

## 9. Progressive supplemental practice — answers have separate anchors

<a id="exercise-assumptions-prompt"></a>
### Exercise 1 — explain all six assumptions (outcome 1)

State each source assumption and explain which step it supports. For no-cost, divisible-quantity, common funding and short-sale assumptions, give a specific way failure can alter the comparison. Does “known contractual cash flows” mean future spot is known? [Answer 1](#exercise-assumptions-answer).

<a id="exercise-notation-prompt"></a>
### Exercise 2 — label quantities before calculating (outcome 1)

For a contract originally agreed at 52, a current new quote 55 and delivery nine months after inception, identify $K$, $F_{t,T}$, $S_t$, $S_T$, $f_t$ and remaining time when today is month 3. Which price is still unknown if not supplied? Which amount remains fixed? Why can $f_0=0$ coexist with a 5,200 total delivery payment for 100 units? [Answer 2](#exercise-notation-answer).

<a id="exercise-carry-prompt"></a>
### Exercise 3 — amount versus yield (outcome 1)

Explain the source meanings and units of $r,I,q,u,y$. Compute $I$ for a known 2 USD per-unit distribution in three months at 4% annual continuous, then the value for 100 units. Explain why this is not a 2% yield, why convenience yield is not automatically cash, and why the same dividend must not be counted twice through $I$ and $q$. [Answer 3](#exercise-carry-answer).

<a id="exercise-value-prompt"></a>
### Exercise 4 — derive and compute the old long's value (outcome 2)

Using the worked old-long 52/new-short 55 case, construct both terminal asset/cash legs for 100 units. Derive the discount-value bridge and compute per-unit/total value at 4% continuous with 0.5 year left. Check by accumulating the unrounded value. Separately compute unhedged maturity payoffs at spot 57 and 48 and explain why neither is the current value or a forecast. [Answer 4](#exercise-value-answer).

<a id="exercise-frictions-prompt"></a>
### Exercise 5 — audit a supposed price inconsistency (outcome 2)

Two otherwise-identical 100-at-maturity claims can be bought/sold at 98/99 under the stated model. Compute the initial net after costs 0.60 per leg, then 0.20 per leg. Check the 2.5-unit replication problem when only whole units trade. Separately compare 100 borrowed at 5% continuous with 100 lent at 3% continuous for one year. Which facts still need checking before claiming executable arbitrage? [Answer 5](#exercise-frictions-answer).

<a id="exercise-boundaries-prompt"></a>
### Exercise 6 — signs and time boundaries (outcome 2)

Recompute the old long's value for current quote 49, quote 52, zero rate, zero remaining time and a −2% continuous rate with 0.5 year left. Use quantity 100 and $K=52$, with quote 55 in the last three cases. Explain the status of negative remaining time and zero quantity. Round only final currency totals to cents. [Answer 6](#exercise-boundaries-answer).

<a id="exercise-explain-teachback-prompt"></a>
### Exercise 7 — explain benchmark versus actual market (outcome 1)

Teach a beginner why a benchmark needs all six assumptions, why a pricing range is not evidence of guaranteed profit, why current quote/fixed delivery price/current value/future spot are distinct, and why the income/carry notation does not make every rate or amount interchangeable. Identify the missing planned concept and explain why it is not assumed as an unexplained prerequisite here. [Answer 7](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### Exercise 8 — repair a valuation report (outcome 2)

A learner writes: “The new quote 55 changes the old $K$ to 55; old long value is 5,500 today. Six months means exponent $0.04\times6$. Because the old contract began at zero value, future loss is impossible; the 1 USD quote discrepancy between identical claims is profit even with 1.20 costs.” Repair the report using both current/terminal values and the relevant model limitations. [Answer 8](#exercise-apply-teachback-answer).

<a id="answers"></a>

## 10. Separate supplemental answers and diagnosis

<a id="exercise-assumptions-answer"></a>
### Answer 1

The six assumptions are **no transaction costs/taxes; divisible quantities; borrowing/lending at the relevant risk-free rate; shorting possible when required; known contractual cash flows/carrying costs; and arbitrage opportunities exploited**. They support frictionless comparison, exact scaling, matched financing/discounting, reversal of the trade, matching of dated amounts and price discipline by feasible trading. Costs can erase a small discrepancy, indivisibility prevents exact scaling, funding spreads change repayment versus receipts, and unavailable shorting blocks a leg. Known contractual amounts do **not** imply known future spot or every future dividend. Actual implementation and terms require evidence, not a blanket assumption of access.

**Retry:** for each assumption name the specific cash flow or operation it permits. A memorized list without a mechanism does not satisfy the outcome.

<a id="exercise-notation-answer"></a>
### Answer 2

$K=52$ USD/unit stays fixed; $F_{t,T}=55$ is the current quote for a new matching forward. $S_t$ is today's spot, **not supplied by these numbers**; $S_T$ is the future realized spot, not known from the quote. $f_t$ is the old long's current value per unit and requires the valuation convention. Equal-month dates give $T=0.75$, $t=0.25$, remaining**0.50 year**, not 6 years. At fair inception $f_0=0$ means no initial bargain/premium under the model, not a free asset: quantity 100 still requires **5,200 USD** at delivery in exchange for the assets. A quote, delivery payment and contract value are different amounts.

**Retry:** if you wrote $S_t=55$, check which transaction the 55 belongs to. If you reset $K$, distinguish today's new contract from the existing agreement.

<a id="exercise-carry-answer"></a>
### Answer 3

$r$ is the continuous remaining-term risk-free rate; $I$ is a present currency amount of known cash income; $q$ a continuous proportional income yield; $u$ a proportional storage-cost rate; $y$ a convenience-benefit yield. Rates need compatible time bases and relevant specifications; a currency amount is not a rate. The source explicitly calls $r,q$ continuous, not every actual storage charge.

For the supplied payment, exponent is $-0.04(0.25)=-0.01$; $I=2e^{-0.01}\approx\mathbf{1.980099667498}$ USD/unit. For 100 units, PV is about**198.0099667498 USD**, or **198.01 USD**, with future cash 200. Reaccumulation by $e^{0.01}$ recovers 200 using unrounded numbers. The 2 is USD per unit, not 2% of a specified base; convenience benefit is not necessarily a cash distribution. Counting that same dividend through both $I$ and $q$ would duplicate its effect.

**Retry:** label the cash payment/date separately from its discount factor and present value. Do not round per-unit PV before scaling when the final total is requested.

<a id="exercise-value-answer"></a>
### Answer 4

At $T$, the existing long receives 100 units and pays**5,200 USD**; the new matching short delivers 100 units and receives**5,500 USD**. Asset flows cancel and net cash is **+300 USD**. Since the new short has zero current value under the benchmark, old-long total value is $300e^{-0.04(0.5)}\approx\mathbf{294.0596019920}$ USD, or **294.06 USD**. Per unit it is approximately**2.940596019920 USD**. Accumulating the unrounded total by $e^{0.02}$ returns 300. The formula is $f_t=(F_{t,T}-K)D(t,T)$; the quantity multiplies it for a total.

Without executing the new short, the old long's maturity economic payoff at spot 57 is $100(57-52)=\mathbf{+500}$ USD and at 48 is **−400 USD**. Those possible realized outcomes are neither today's 294.06 mark nor a forecast implied by the 55 quote. Physically, the long pays for the assets; it does not receive both a free asset and an extra payoff cash payment.

**Retry:** distinguish hypothetical offsetting positions used in valuation from a hedge actually placed. Check both the terminal asset cancellation and the present-value discount.

<a id="exercise-frictions-answer"></a>
### Answer 5

Gross initial receipt **1**; with 0.60 costs on both legs, net **−0.20**; with 0.20 each, net **+0.60**, before other considerations. For 2.5 units, exact cost **245** and maturity amount **250**. Two units cost **196**, pay **200**; three cost **294**, pay **300**. Terminal mismatch is −50 or +50, so neither exactly replicates the target. No universal integer choice follows without an objective.

Separate funding example: repayment $100e^{0.05}\approx105.127109638$, receipt $100e^{0.03}\approx103.045453395$, difference about **−2.081656242**, or **−2.08**. Check matching maturity/currency/performance/asset terms, actual executable prices and amounts, short availability, collateral/proceeds restrictions, all financing/transaction/tax costs and execution of every leg before calling the positive gross difference arbitrage. The model list does not establish those real facts.

**Retry:** calculate net matched flows after costs and at their dates, not just the difference between two quoted numbers.

<a id="exercise-boundaries-answer"></a>
### Answer 6

At quote 49: per-unit value $-3e^{-0.02}\approx-2.940596019920$, total **−294.06 USD** rounded. At quote 52: **zero**. With quote 55 and rate 0, value **3 per unit**, **300 total**. With zero remaining time and quote 55, the same immediate difference is **300 total**. With rate −2% and 0.5 year, value $3e^{0.01}\approx3.030150501253$ per unit and **303.02 USD total** rounded. The discount factor remains positive, above 1 in the negative-rate case. Negative remaining time is not the future-delivery setup; zero quantity gives zero total but cannot serve as a denominator to infer a per-unit amount.

**Retry:** a negative contract value comes from the negative quote difference, not a negative discount factor. Keep annual rates paired with years.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — sufficient explanation

“A no-arbitrage benchmark compares feasible, matched cash flows under explicit cost, divisibility, financing, shorting, known-flow and trading-response assumptions. Real spreads, collateral and constraints can prevent the textbook comparison or create a range, not an automatic profit. Spot is today's underlying price, forward quote prices a new future agreement, delivery $K$ fixes an old one, and $f$ values that existing contract today. Future spot is a later observation. Income present value is a currency amount; income/storage/convenience yields are rates or modeled proportional benefits needing compatible conventions, and convenience is not necessarily cash. The planned replication-and-carry concept is still missing, so this lesson supplies the matching-flow and carry definitions inline rather than pretending that page was read.”

**Retry:** give one example where two apparent prices cannot be compared without a date, cost or instrument qualification. Avoid treating an illustrative benchmark as a current market rule.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8

Old $K$ remains **52**, not 55. The new quote times 100 is **5,500 USD** of quoted delivery scale, not old-long current value. Matched terminal cash advantage is **300 USD**; discount over **0.5 year**, exponent **0.02**, to **294.06 USD** today under the stated benchmark. The fixed old delivery cash is **5,200 USD**. Zero fair initial value does not prohibit a later loss: with maturity spot 48, the old long has **−400 USD** economic payoff. A 1 USD gross discrepancy with 1.20 total costs is **−0.20**, not profit. Current valuation and arbitrage claims still require matched terms, executable funding/shorting and complete cash flows; future spot and current quote are not the same thing.

**Retry:** label every number with its date and role before computing. A correct exponential cannot fix an incorrectly relabelled delivery price or omitted trading cost.

<a id="evidence"></a>

## Source presentation, dependencies and endpoint

All full normalized/raw pp 9–10 and both original PNGs were inspected. Page 9 has six assumptions and a limitation box. Page 10 has nine notation entries and the fair-inception statement. No numerical worked table, general carry formula or existing-contract value equation is printed on these two pages; the numerical examples and matched-forward value derivation here are explicitly supplemental and fully explained, not invented source content.

| Page | Full normalized evidence | Unchanged raw evidence | Original image |
|---|---|---|---|
| 9 | [Full 9](../../sources/annotated/lecture-4/page-009.md) | [Raw 9](../../sources/extracted/lecture-4/page-009.md#page-9) | [Image 9](../../sources/assets/lecture-4/page-009.png) |
| 10 | [Full 10](../../sources/annotated/lecture-4/page-010.md) | [Raw 10](../../sources/extracted/lecture-4/page-010.md#page-10) | [Image 10](../../sources/assets/lecture-4/page-010.png) |

Canonical source units are verified despite older normalized draft banners; that is not lesson approval. No registered source issue affects these five units. The planned replication-and-carry concept remains a missing metadata dependency, without a broken Markdown link or unexplained prerequisite. No restricted textbook/private learner material was used. Stop this slice after the two teach-backs and the dated-cash-flow checks; later asset-specific forward-pricing lessons are not authored here. Author arithmetic/syntax checks do not establish independent teaching approval, publication or learner mastery.
