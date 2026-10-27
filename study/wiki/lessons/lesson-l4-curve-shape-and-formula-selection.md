# Contango, backwardation and selecting carry formulas

<a id="status"></a>
**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all six primary units on Lecture4 physical pp30–31. It cites precisely the source definitions, the general carry relation and its curve-shape explanation, the do-not-infer warning, the five-situation matching question and its numbered formula table. Classification tables built from earlier source examples, the maturity table, belief illustrations, new scenarios, exercises and answers are **supplemental**. They are not official solutions, current market quotations, forecasts or trading advice.

Immediate prerequisite: [commodity carry, storage timing and convenience yield](lesson-l4-commodity-storage-and-convenience.md). The [replication and carry reference](../concepts/concept-replication-and-carry.md#carry-storage) collects the formulas used here. Each model was derived in its own lesson: [no income](lesson-l4-no-income-replication.md#no-income-price), [known cash income](lesson-l4-known-cash-income.md#income-replication), [proportional yield](lesson-l4-known-proportional-yield.md#yield-formula), [index](lesson-l4-index-forward-pricing.md#pricing) and [currency parity](lesson-l4-currency-parity.md#parity). The sign test below uses [exponents and logarithms](../concepts/concept-exponents-and-logs.md#powers-logarithms), and [rate conventions](../concepts/concept-rate-conventions.md#rates-formulas) apply before any rate enters an exponent.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain and classify:** define contango and backwardation as comparisons of today's forward quote with today's spot, derive from the net-carry relation why positive carry gives contango and sufficiently large income or convenience gives backwardation, and explain why neither label is a market forecast. Success requires a stated quotation direction and positive time. It also requires the threshold at which benefits offset costs, a separate amount comparison for cash-income cases, and the distinct roles of carry and risk premia.
2. **Select and apply:** match each of the five source situations to its formula with the assumption that justifies it, then select, compute and classify for new assets. Success requires identifying what holding the asset provides or costs, choosing a cash-amount or proportional-rate model, and matching rate conventions and quote direction. It also requires full precision until the final display and an explicit qualification for consumption assets or restricted short sales.

<a id="foundations"></a>
## 1. Two prices for the same delivery, at two dates

Throughout Lecture4, the **spot price** $S_0$ is today's price for immediate delivery. A **forward price** $F_{0,T}$ is a price agreed today for delivery at a later date $T$. Both are quoted in the same units, for example USD per unit of a commodity or domestic currency per unit of foreign currency. They are prices of **different dated packages**: buying today gives you the asset now, together with any income, storage bill or usefulness it brings before delivery; a forward gives you the asset only at $T$.

Many markets quote forwards for several delivery dates at once. The collection of today's forward quotes plotted against delivery date is often called a **forward curve**. This vocabulary is a supplemental bridge; the source's two definitions compare a forward with **today's spot**. Read every label in this lesson as a statement about today's prices for one stated quotation, not about tomorrow's prices.

<a id="notation"></a>
## 2. Symbols, units and conventions

| Symbol | Meaning and unit |
|---|---|
| $T$ | Delivery date, measured in years from today; $T\geq0$ |
| $S_0>0$ | Today's spot price, currency per unit of the underlying |
| $F_{0,T}>0$ | Today's forward quote for delivery at $T$, same units as $S_0$; not the value of an existing contract |
| $r$ | Annual continuously compounded funding rate for the period, decimal |
| $I$ | Present value today of known **cash** income paid before delivery, currency per unit |
| $U$ | Present value today of known **cash** storage payments, currency per unit |
| $q$ | Annual continuous **proportional** income yield |
| $u$ | Annual continuous **proportional** storage/insurance cost |
| $y$ | Convenience yield: the non-cash benefit of holding inventory, as an annual continuous parameter |
| $c=r+u-q-y$ | Net cost of carry, applicable terms only |
| $r_d,r_f$ | Domestic and foreign annual continuous rates when $S_0$ is domestic currency per foreign unit |

Rates are decimals: 4% is 0.04 per year. A rate multiplied by years gives a dimensionless exponent. Amounts such as $I$ and $U$ are money, while $q,u,y$ are rates; one quantity cannot be relabelled as the other. Assume, as in the earlier lessons, matching asset quality, quantity, location and date, reliable performance and no omitted fees, taxes or collateral costs, unless a section says otherwise.

<a id="contango"></a>
## 3. Contango: forward above spot

The source defines **contango** as the situation in which the forward price exceeds the spot price. [L4 p30, upper first definition; `lecture-4-p030-contango-definition`](../../sources/annotated/lecture-4/page-030.md#lecture-4-p030-contango-definition).

In symbols, for a stated maturity $T>0$:

$$F_{0,T}>S_0.$$

Example from an earlier source page: a no-income share at spot 40 with 5% continuous funding and three months to delivery has fair forward about **40.503138061625**, displayed 40.50 by the source. That is contango. Holding the share for three months ties up money, and the forward price compensates for that financing.

<a id="backwardation"></a>
## 4. Backwardation: forward below spot

The source defines **backwardation** as the situation in which the forward price is below the spot price. [L4 p30, upper second definition; `lecture-4-p030-backwardation-definition`](../../sources/annotated/lecture-4/page-030.md#lecture-4-p030-backwardation-definition).

$$F_{0,T}<S_0.$$

Example from an earlier source page: the USD/AUD forward is about **0.941573650369 USD per AUD** against spot 0.9800. The AUD deposit rate is higher than the USD rate, so in **this quotation** the forward is in backwardation.

If $F_{0,T}=S_0$, the forward is neither above nor below spot. We call that **flat**, a supplemental label. It happens at $T=0$, or for positive $T$ when the costs and benefits of holding exactly offset. A label needs both a maturity and a quotation direction: inverting a currency quote turns backwardation into contango, as section 6 shows.

<a id="net-carry-shape"></a>
## 5. Net carry decides the sign

The source states that from

$$F_{0,T}=S_0e^{(r+u-q-y)T},$$

contango is associated with positive net carry, while a sufficiently large income or convenience yield can produce backwardation. [L4 p30, middle formula and explanation; `lecture-4-p030-net-carry-curve-shape`](../../sources/annotated/lecture-4/page-030.md#lecture-4-p030-net-carry-curve-shape).

**Why the sign follows — supplemental derivation.** Divide by spot to get the ratio of the two prices:

$$\frac{F_{0,T}}{S_0}=e^{cT},\qquad c=r+u-q-y.$$

The exponential $e^x$ is greater than 1 exactly when $x>0$, equals 1 at $x=0$ and is below 1 when $x<0$. For positive $T$, the sign of $cT$ is the sign of $c$. Therefore, in this model:

| Net carry | Comparison | Label |
|---|---|---|
| $c>0$, costs $r+u$ exceed benefits $q+y$ | $F_{0,T}>S_0$ | Contango |
| $c=0$, costs equal benefits | $F_{0,T}=S_0$ | Flat |
| $c<0$, benefits $q+y$ exceed costs $r+u$ | $F_{0,T}<S_0$ | Backwardation |

“Sufficiently large” therefore has a precise meaning: **income plus convenience must exceed funding plus storage.** The break-even convenience yield is $y^{*}=r+u-q$, which is simply $r+u$ for a commodity with no income yield. Any larger $y$ gives backwardation. Taking logarithms of a positive ratio gives the same test: $\ln(F_{0,T}/S_0)=cT$. So $\ln(F_{0,T}/S_0)/T$ recovers the net carry implied by two observed prices, which needs $S_0,F_{0,T}>0$ and $T>0$.

**Known cash amounts do not sit in the exponent.** With known cash income $I$ and no other terms, the source formula is $F_{0,T}=(S_0-I)e^{rT}$. Compare it with spot directly:

$$(S_0-I)e^{rT}<S_0\iff I>S_0\left(1-e^{-rT}\right).$$

The right side is the amount of income needed to cancel the cost of financing the purchase. Known cash storage $U>0$ with $r\geq0$ always gives $(S_0+U)e^{rT}>S_0$: contango in that model.

**The source's own bond question explained.** On p16 the source asks why the nine-month bond forward is below spot although rates are positive. Spot is 900; coupon PV is $I=40e^{-0.03(4/12)}\approx39.601993349967$. Financing 900 for nine months at 4% would require income of only $900(1-e^{-0.03})\approx26.599019806343$ to break even, and the coupon exceeds that, so the result is backwardation. Measured at delivery, financing costs $900(e^{0.03}-1)\approx27.409080558165$. The coupon carried to delivery is worth $Ie^{0.03}\approx40.808053601070$. The difference, $-13.398973042905$, is exactly $F_{0,T}-S_0$, giving **886.601026957095**, displayed 886.60. The forward holder misses the coupon, so it pays less than spot. [Source bond example, L4 p16](../../sources/annotated/lecture-4/page-016.md#lecture-4-p016-bond-income-forward); full treatment in [the cash-income lesson](lesson-l4-known-cash-income.md#positive-rates).

<a id="classification-table"></a>
### Every earlier source example, classified — supplemental table

| Example | Spot | Full-precision forward (source display) | Label | What decided it |
|---|---:|---:|---|---|
| p12 no-income share, $T=0.25$ | 40 | 40.503138061625 (40.50) | Contango | $c=r=0.05>0$ |
| p16 bond with coupon before delivery, $T=0.75$ | 900 | 886.601026957095 (886.60) | Backwardation | coupon PV 39.60 exceeds break-even 26.60 |
| p18 known yield, $T=0.5$ | 25 | 25.766516136769 (25.77) | Contango | $c=0.10-0.0396=0.0604$ |
| p23 stock index, $T=0.25$ | 1,300 | 1,313.065217209418 (1,313.07) | Contango | $c=0.05-0.01=0.04$ |
| p25 USD per AUD, $T=2$ | 0.9800 | 0.941573650369 (0.9416) | Backwardation in USD/AUD | $r_d-r_f=-0.02$ |
| p29 asset with 2 USD storage at delivery, $T=1$ | 450 | 484.628681564397 (484.63) | Contango | financing plus storage, no benefit |
| Commodity-lesson hypothetical, **not source data** | 100 | 99.004983374917 | Backwardation | $y=0.08>r+u=0.07$ |

The same reasoning classifies all seven: identify what holding costs and provides, then compare. The **label** is the result of carry, not an extra input.

<a id="maturity-table"></a>
### How a constant carry rate shapes several maturities — supplemental figure as a table

With spot 100 and a constant net carry rate, each maturity's forward is $100e^{cT}$:

| Delivery in years | $c=+0.04$ (index-like) | $c=-0.02$ (currency-like) |
|---:|---:|---:|
| 0 | 100.0000 | 100.0000 |
| 0.25 | 101.0050 | 99.5012 |
| 0.5 | 102.0201 | 99.0050 |
| 1 | 104.0811 | 98.0199 |
| 2 | 108.3287 | 96.0789 |

*Description for a plotted version:* the horizontal axis is delivery time in years and the vertical axis is the forward quote in currency per unit. Both lines start at spot 100 at $T=0$. The positive-carry line rises steadily and the negative-carry line falls steadily. With **constant** carry the gap grows with maturity and the label is the same at every maturity. If funding, yield or convenience rates differ by maturity, apply the sign test maturity by maturity. A curve can then show contango at some delivery dates and backwardation at others. This is a mathematical consequence of the formula, not a claim about any real market.

<a id="not-expectation"></a>
## 6. The shape is not a forecast

The source warns: contango does not by itself mean that the market expects the spot price to rise, and backwardation does not by itself mean that the market expects it to fall. Carry and risk premia also matter. [L4 p30, lower do-not-infer-too-much box; `lecture-4-p030-curve-not-expectation`](../../sources/annotated/lecture-4/page-030.md#lecture-4-p030-curve-not-expectation).

**Why — supplemental explanation.** Where two-way replication is feasible, the forward is fixed by **today's** spot and the cost of carrying it: $F_{0,T}=S_0e^{cT}$. The cash-and-carry strategy delivers an asset bought today, so it never needs to know the future spot $S_T$. Beliefs about the future affect today's spot price, but they do not enter $F_{0,T}/S_0$ as a separate input. That ratio contains carry only.

An **expected value** is a probability-weighted average of possible outcomes. Write $\mathbb{E}[S_T]$ for the expected future spot under some stated beliefs. It can be split with a simple identity:

$$\mathbb{E}[S_T]-S_0=\bigl(F_{0,T}-S_0\bigr)+\bigl(\mathbb{E}[S_T]-F_{0,T}\bigr).$$

The first bracket is fixed by **carry**. The second bracket reflects what investors require for bearing price risk, a **risk premium**, and is not determined by the carry formula. The source does not develop a risk-premium model; this lesson only shows that the curve shape cannot reveal it.

**Belief illustration — stipulated numbers, not a model of how prices form.** Take a no-income asset at spot 100, funding 5% continuous and one year. Its forward is $100e^{0.05}\approx\mathbf{105.127109637602}$, which is contango. Compare two hypothetical sets of beliefs, each with two equally likely outcomes, while spot and carry stay as given:

| Beliefs | Outcomes for $S_T$ | Expected $S_T$ | Expected minus forward |
|---|---|---:|---:|
| A | 125 or 90 | 107.5 | +2.372890362398 |
| B | 115 or 85 | 100 | −5.127109637602 |

The forward is identical in both cases. Under B nobody expects any rise, yet the curve is in contango. The label summarizes carry; it does not tell you which set of beliefs the market holds.

**Terminology caution — supplemental.** Some other materials use terms such as “normal backwardation” to compare a futures price with an **expected** future spot price. That is a different comparison from this lecture's definitions, which compare a forward with **today's** spot. Check which comparison a statement makes before drawing a conclusion. In this lecture, a consumption commodity in backwardation is consistent with a large convenience yield. It is not by itself an arbitrage signal or a promise of falling prices.

<a id="matching-question"></a>
## 7. Source question: choose the correct pricing formula

The source asks you to match each situation to its pricing formula. [L4 p31, upper instruction and five situations; `lecture-4-p031-formula-matching-question`](../../sources/annotated/lecture-4/page-031.md#lecture-4-p031-formula-matching-question).

1. A non-dividend-paying share
2. A bond paying a known coupon before delivery
3. A stock index with dividend yield $q$
4. A foreign currency
5. A commodity with storage cost and convenience yield

**Try it before reading section 8.** For each situation ask: *what does someone who holds the asset from today until delivery pay or receive that a forward holder does not?* Then decide whether that flow is a known cash amount or a proportional rate. Practice exercise 3 records your attempt.

<a id="matching-answers"></a>
## 8. The source's numbered formulas, with the reasons

The source prints a numbered formula table beneath the question. [L4 p31, lower numbered formula table; `lecture-4-p031-formula-matching-answers`](../../sources/annotated/lecture-4/page-031.md#lecture-4-p031-formula-matching-answers).

| Number | Source formula |
|---:|---|
| 1 | $S_0e^{rT}$ |
| 2 | $(S_0-I)e^{rT}$ |
| 3 | $S_0e^{(r-q)T}$ |
| 4 | $S_0e^{(r_d-r_f)T}$ |
| 5 | $S_0e^{(r+u-y)T}$ |

The formulas are numbered in the same order as the situations, so the intended matching is situation $n$ to formula $n$. The table gives no reasons; the justifications below are **authored**.

| Situation | What holding provides or costs before delivery | Formula | Assumption that justifies it, and what to check |
|---|---|---|---|
| 1 Non-dividend share | Financing only | $S_0e^{rT}$ | Investment asset with no income. Equality needs the reverse trade: short sales or existing owners willing to sell and buy forward. Otherwise only the upper bound $F_{0,T}\leq S_0e^{rT}$ is proved. |
| 2 Bond with known coupon | A fixed cash coupon the forward holder does not receive | $(S_0-I)e^{rT}$ | $I$ is the present value of coupons paid **before delivery**, each discounted at its own date's zero rate. Coupons after delivery are excluded. $S_0$ must be the cash price actually paid for the bond. The reverse trade must compensate the bond lender for the coupon. |
| 3 Index with yield $q$ | Dividends proportional to the basket's value | $S_0e^{(r-q)T}$ | $q$ is an annual continuous yield for dividends expected during the **contract's life**, not a calendar-year average. Index points become money only with a contract multiplier. |
| 4 Foreign currency | Interest at $r_f$ on a foreign deposit | $S_0e^{(r_d-r_f)T}$ | $S_0$ is **domestic currency per foreign unit**. Inverting the quote swaps the rate roles. Both deposits/loans and the conversion must be executable. |
| 5 Commodity with storage and convenience | Proportional storage cost $u$; non-cash convenience $y$ | $S_0e^{(r+u-y)T}$ | Proportional cost model. For a consumption asset the reverse trade may be unavailable, so the relation is not automatically a two-sided arbitrage equality. If storage is a known **cash** bill, use $(S_0+U)e^{rT}$ instead. |

**One relation, several special cases.** Formulas 1, 3, 4 and 5 are the p30 relation $S_0e^{cT}$ with the inapplicable terms set to zero. Formula 1 has $c=r$. Formula 3 has $u=y=0$. Formula 5 has $q=0$, because the commodity row has no income yield. Formula 4 takes the domestic rate as $r$ and treats the foreign deposit rate like a yield $q=r_f$. Formula 2 is different: a known cash amount enters as money subtracted from spot, never as a rate inside the exponent.

<a id="selection-procedure"></a>
### A procedure for any new asset — supplemental

1. **Fix the deliverable and the quote.** State quantity, quality, location, delivery date and price units. For currencies, state which currency is domestic.
2. **List every flow a spot holder gets or pays before delivery** that a forward holder does not: nothing, fixed cash income, proportional income, foreign interest, cash storage, proportional storage or convenience.
3. **Choose one representation per flow.** A known amount is discounted from its own date and subtracted (income) or added (storage). A proportional rate enters the exponent. Never include the same flow both ways.
4. **Convert conventions.** Exponents need annual continuous decimal rates for the matching period. An annually compounded rate $R$ becomes $r=\ln(1+R)$. Use each payment's own date and zero rate for present values.
5. **Decide what is enforceable.** If the reverse trade (short sale, asset loan or giving up inventory) is unavailable, state an upper bound rather than an equality.
6. **Compute, then classify.** Compare $F_{0,T}$ with $S_0$ for the label, and do not read the label as a forecast.

<a id="new-assets"></a>
## 9. Select, compute and classify five new assets — supplemental scenarios

All inputs are hypothetical and continuous unless stated. Currency codes are labels for a classroom calculation, not current rates.

| Asset and inputs | Formula chosen | Forward, full precision → display | Label |
|---|---|---|---|
| (a) Non-dividend share: $S_0=50$ USD, $r=0.04$, $T=0.5$ | $S_0e^{rT}$ | $50e^{0.02}\approx51.010067001338$ → 51.01 | Contango |
| (b) Bond: $S_0=950$ USD; coupon 30 USD in 0.25 year; zero rates 4% (0.25 year), 4.5% (0.5 year); $T=0.5$ | $(S_0-I)e^{rT}$, $I=30e^{-0.01}\approx29.701495012475$ | $(950-I)e^{0.0225}\approx941.239928910005$ → 941.24 | Backwardation |
| (c) Index: $S_0=4{,}000$ points, $r=0.05$, $q=0.02$, $T=0.25$ | $S_0e^{(r-q)T}$ | $4000e^{0.0075}\approx4030.112781778136$ → 4,030.11 points | Contango |
| (d) Currency: $S_0=1.2500$ USD per EUR, $r_{\mathrm{USD}}=0.02$, $r_{\mathrm{EUR}}=0.03$, $T=1$ | $S_0e^{(r_d-r_f)T}$ | $1.25e^{-0.01}\approx1.237562292186$ → 1.2376 USD/EUR | Backwardation in USD/EUR |
| (e) Consumption commodity: $S_0=80$ USD/unit, $r=0.05$, $u=0.01$, $y=0.09$, $T=0.5$ | $S_0e^{(r+u-y)T}$ | $80e^{-0.015}\approx78.808955168245$ → 78.81 | Backwardation |

Checks on each row:

- (b) The coupon PV 29.70 exceeds the break-even $950(1-e^{-0.0225})\approx21.136324666330$, which confirms the backwardation label. The coupon is discounted at the **0.25-year** rate; the purchase is financed at the **0.5-year** rate.
- (c) The answer is in index points. A money amount needs a contract multiplier, which is not supplied here.
- (d) Inverting gives spot 0.8000 EUR per USD and forward $0.8e^{0.01}\approx0.808040133667$ EUR per USD. In that quotation the same market is in **contango**.
- (e) Convenience exceeds funding plus storage, $0.09>0.06$, so the forward is below spot. Inventory holders who need the commodity would not sell it to “buy it back cheaply” forward. The relation describes the quote under the model; it is not a reverse-arbitrage guarantee.

<a id="boundaries"></a>
## 10. Boundaries and common mistakes

- **Zero time:** at $T=0$ every formula gives $F_{0,0}=S_0$. There is no carry interval and no label.
- **Zero net carry:** if $r+u=q+y$, the forward equals spot at every maturity, for example equal domestic and foreign rates for a currency.
- **Negative rates:** with $r<0$ and no other terms, $S_0e^{rT}<S_0$. Backwardation can then occur without any income, because exponentials stay positive while the sign of $c$ changes.
- **Cash income does not always mean backwardation.** It needs $I>S_0(1-e^{-rT})$. A small coupon over a long financing period can leave the forward above spot.
- **Quotation direction matters for currencies.** Domestic-per-foreign backwardation is foreign-per-domestic contango.
- **Forwards versus futures:** these labels compare forward quotes with spot. A daily-settled futures quote equals the forward only under the [deterministic-rate qualification](lesson-l4-forward-futures-difference.md#deterministic).
- **A label is not a contract value.** The value of an existing forward depends on its fixed delivery price $K$, not on whether today's curve is in contango ([forward value](../concepts/concept-forward-contract-value.md#value-derivation)).
- **Do not double count** a dividend as both $I$ and $q$, or a storage bill as both $U$ and $u$.
- **Consumption assets:** cash-and-carry may still enforce an upper bound. A quote below that bound is consistent with convenience yield and is not proof of an available arbitrage.

<a id="practice"></a>
## 11. Progressive supplemental practice

<a id="exercise-classify-prompt"></a>
### 1. Classify and justify — outcome1
Classify each pair and state the sign of the implied net carry: (a) spot 50, half-year forward 51.010067; (b) spot 0.9800 USD per AUD, two-year forward 0.941573650369 USD per AUD; (c) the same market quoted in AUD per USD; (d) spot and one-year forward both 70; (e) delivery today. Why does each label describe today's prices only? [Answer](#exercise-classify-answer).

<a id="exercise-carry-sign-prompt"></a>
### 2. Compute the carry and the label — outcome2
(i) Index: spot 200, $r=3\%$, $q=1\%$, two years. (ii) Commodity: spot 60, $r=4\%$, $u=1\%$, $y=7\%$, one year; also find the convenience yield at which the forward equals spot. (iii) Currency: spot 0.75 domestic per foreign with both rates 2.5%. (iv) Bond: spot 500, coupon 5 in 0.25 year, delivery in 0.5 year, all zero rates 4%. Use the amount comparison for (iv). [Answer](#exercise-carry-sign-answer).

<a id="exercise-source-match-prompt"></a>
### 3. Source question: match the formulas — outcome2
Answer the source's p31 question from section 7. Match each of the five situations to one of the five numbered formulas. For each match, name the flow that holding the asset provides or costs and one assumption you must check. [Answer](#exercise-source-match-answer).

<a id="exercise-select-prompt"></a>
### 4. Select, compute, classify — outcome2
(A) Non-dividend share: spot 30, $r=6\%$, $T=0.25$. (B) Index: 5,000 points, $r=4\%$, $q=4.5\%$, $T=0.5$. (C) Currency: 0.6500 domestic per foreign, $r_d=5\%$, $r_f=2\%$, $T=0.5$. (D) Commodity: spot 70, $r=4\%$, $u=3\%$, $y=2\%$, $T=1$. (E) Bond: spot 1,000, coupon 25 in 0.5 year at a 3% zero rate, delivery in 0.75 year at a 3.5% zero rate. Choose each formula, compute and classify. [Answer](#exercise-select-answer).

<a id="exercise-expectation-prompt"></a>
### 5. Beliefs versus the curve — outcome1
For asset (a) of section9, the half-year forward is 51.010067. Investor group X thinks $S_T$ will be 60 or 44 with equal probability; group Y thinks 54 or 46. Compute each expected spot and its difference from the forward. Does the curve shape reveal which group is right? Explain using carry and risk premia. [Answer](#exercise-expectation-answer).

<a id="exercise-quotation-prompt"></a>
### 6. Same market, two labels — outcome1
Classify the source USD/AUD example in both quotation directions. Then invert asset (C) of exercise4 and compute its forward in foreign-per-domestic units. Explain what changes and what does not. [Answer](#exercise-quotation-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach curve shape and formula choice — outcome1
In your own words, explain contango and backwardation, why net carry decides the sign, how a cash-income case is checked, and why neither label is a forecast. Then explain how you would choose among the five source formulas for an unfamiliar asset. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Repair a market note — outcome2
A note about commodity (e) uses spot 80, storage 1%, convenience 9% and half a year, but the funding rate is a **5% annually compounded** rate. It claims: (1) the forward is $80e^{(0.05+0.01-0.09)0.5}=78.81$; (2) equivalently $80e^{(0.05-0.09)0.5}=78.42$, treating convenience as a dividend yield; (3) backwardation means the market forecasts about a 1.5% price fall; (4) selling inventory and buying forward is riskless arbitrage. Correct every claim. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 12. Separate supplemental answers

<a id="exercise-classify-answer"></a>
### Answer1
(a) Forward above spot: **contango**. Implied net carry $\ln(51.010067/50)/0.5\approx0.04$, positive. (b) Forward below spot: **backwardation** in USD per AUD, net carry $r_d-r_f=-0.02$. (c) Inverted, spot is 1.020408163265 and forward 1.062051810400 AUD per USD: **contango**, net carry $+0.02$. It is the same market described in the other direction. (d) Equal: **flat**, net carry zero. (e) $T=0$: forward equals spot and no label applies. Each label compares two prices quoted today; none says what spot will be later. **Retry:** write the quote units and the maturity before choosing a label.

<a id="exercise-carry-sign-answer"></a>
### Answer2
(i) $c=0.03-0.01=0.02$, exponent 0.04, forward **208.162154838478**, or 208.16: contango. (ii) $c=0.04+0.01-0.07=-0.02$, forward $60e^{-0.02}\approx$**58.811920398405**, or 58.81: backwardation. The break-even convenience yield is $y^{*}=r+u=0.05$. (iii) $c=0$, so the forward is 0.75 at every maturity: flat. (iv) $I=5e^{-0.01}\approx4.950249168746$. Break-even income is $500(1-e^{-0.02})\approx9.900663346622$. The coupon is smaller, so the forward $(500-I)e^{0.02}\approx$**505.050419177957**, or 505.05, is **above** spot: contango despite the cash income. **Retry:** put rates in the exponent and money amounts outside it.

<a id="exercise-source-match-answer"></a>
### Answer3 — source numbered formulas, with authored justification
The source table pairs situation $n$ with formula $n$. 1→$S_0e^{rT}$: only financing; check short sales or owner substitution before claiming equality. 2→$(S_0-I)e^{rT}$: a known coupon the forward holder misses; $I$ uses coupons **before delivery** at their own zero rates. 3→$S_0e^{(r-q)T}$: proportional dividends; $q$ for the contract's life. 4→$S_0e^{(r_d-r_f)T}$: foreign deposit interest; spot must be domestic per foreign. 5→$S_0e^{(r+u-y)T}$: proportional storage plus non-cash convenience; for a consumption asset the reverse trade may fail, and a cash storage bill needs $(S_0+U)e^{rT}$. **Retry:** if you matched 2 with 3, ask whether the income is a fixed amount or a percentage of value.

<a id="exercise-select-answer"></a>
### Answer4
(A) $30e^{0.015}\approx$**30.453391938472**, or 30.45: contango. (B) $5000e^{-0.0025}\approx$**4987.515611987301**, or 4,987.52 points: backwardation, because the yield exceeds funding. (C) $0.65e^{0.015}\approx$**0.659823492000**, or 0.6598 domestic per foreign: contango, so the foreign currency is at a forward premium. (D) $70e^{0.05}\approx$**73.588976746322**, or 73.59: contango, because storage plus funding exceed convenience. (E) $I=25e^{-0.015}\approx24.627798490077$ and break-even is $1000(1-e^{-0.02625})\approx25.908463718218$. The coupon is just below break-even, so $(1000-I)e^{0.02625}\approx$**1001.314727805798**, or 1,001.31: contango. **Retry:** in (E) discount the coupon at its own 0.5-year rate and finance to 0.75 year at the delivery rate.

<a id="exercise-expectation-answer"></a>
### Answer5
Group X expects $0.5(60)+0.5(44)=52$, which is **0.989932998662** above the forward. Group Y expects $0.5(54)+0.5(46)=50$, which is **1.010067001338** below it. The forward is 51.010067001338 in both cases, because it depends only on spot 50 and 4% carry for half a year. Contango cannot tell X from Y. The difference between expected spot and forward reflects the risk premium investors demand, which the carry formula does not determine. **Retry:** separate “what replication costs” from “what people expect”.

<a id="exercise-quotation-answer"></a>
### Answer6
USD per AUD: spot 0.9800, forward 0.941573650369, **backwardation**. AUD per USD: spot 1.020408163265, forward 1.062051810400, **contango**. For (C), inverted spot is $1/0.65\approx1.538461538462$ foreign per domestic. Its forward is $1.538461538462e^{-0.015}\approx$**1.515556830159**, which is **backwardation**; the rate difference flips to $r_f-r_d=-0.03$. The underlying exchange agreement and its cash amounts do not change. Only the way the price is written changes. **Retry:** never invert a quote and keep the old rate labels.

<a id="exercise-explain-teachback-answer"></a>
### Answer7 — sufficient explanation
“Contango means today's forward is above today's spot for a stated maturity; backwardation means it is below. Dividing the carry formula by spot gives $e^{cT}$, so for positive time the sign of net carry decides the label. Funding and storage push the forward up; income and convenience push it down, and backwardation needs benefits larger than costs. For known cash income I compare the coupon's present value with the financing break-even $S_0(1-e^{-rT})$. Neither label is a forecast: replication fixes the forward from today's spot and carry, while expectations differ from the forward by a risk premium. To choose a formula I list what holding the asset pays or costs before delivery, choose amount or rate, convert to continuous rates, check the quote direction and say whether the reverse trade exists.” **Retry:** include one formula, one threshold and one limitation.

<a id="exercise-apply-teachback-answer"></a>
### Answer8
(1) The exponent needs a continuous rate: $r=\ln(1.05)\approx0.048790164169$. Then $c\approx0.048790164169+0.01-0.09=-0.031209835831$ and the forward is $80e^{c(0.5)}\approx$**78.761296635582**, or 78.76, not 78.81. (2) Not equivalent. Convenience is a non-cash benefit and storage cannot be dropped, so $80e^{(0.05-0.09)0.5}\approx78.415893864540$ prices a different asset. (3) Backwardation reflects convenience exceeding funding plus storage. It is not a forecast, and expected spot also involves a risk premium. (4) For a consumption commodity the reverse trade gives up inventory services and may be unavailable, so a below-cost forward is not riskless arbitrage. **Retry:** check the rate convention, the model and the enforceable direction before interpreting the label.

<a id="evidence"></a>
## Source presentation and endpoint

The full normalized and raw files for pp30–31 and both original PNGs were inspected. Page30 has the two definitions, the boxed net-carry relation with its explanation, and the do-not-infer-too-much box. Page31 has the instruction, five numbered situations and a five-row numbered formula table. Neither page has a chart; the maturity table here is a labelled supplemental figure. Six source units are verified with no registered issue; that does not approve this lesson. Earlier source pages are cited only for previously taught examples.

| Page | Normalized | Raw | Original |
|---|---|---|---|
|30|[Full](../../sources/annotated/lecture-4/page-030.md)|[Raw](../../sources/extracted/lecture-4/page-030.md#page-30)|[PNG](../../sources/assets/lecture-4/page-030.png)|
|31|[Full](../../sources/annotated/lecture-4/page-031.md)|[Raw](../../sources/extracted/lecture-4/page-031.md#page-31)|[PNG](../../sources/assets/lecture-4/page-031.png)|

Next is the [lecture synthesis](lesson-l4-carry-synthesis.md). Independent teaching review remains a separate task. No restricted textbook, private learner material or live market quotation was used.
