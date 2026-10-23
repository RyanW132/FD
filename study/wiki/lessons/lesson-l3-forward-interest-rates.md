# Derive forward rates from spot discount factors

> **Production-curriculum draft — independent teaching review pending.** This lesson teaches Lecture 3 physical pages 25–27. Source QA is not lesson approval. All examples are classroom calculations, not present-day quotes, forecasts or financial recommendations.

<a id="outcomes"></a>
## What you will be able to do

1. **Derive and interpret an interval forward:** label today, start and end dates; match the dated cash flows of direct and locked two-stage investments; derive both the discount-factor ratio and continuous-rate expression; explain why that relation does not forecast an observed future rate.
2. **Calculate and audit forwards:** reproduce the source example and every row of its annual-forward table, solve third/fourth-year questions, and handle a fractional-year interval, quote conversion and zero/negative-rate boundaries. Verify both terminal values, not just a memorised rate formula.

Prerequisite: [bootstrap extension](lesson-l3-bootstrap-extension.md), with [short-end bootstrap](lesson-l3-bootstrap-short-end.md), [zero-rate discounting](lesson-l3-zero-rates-and-discounting.md), [continuous/equivalent rates](lesson-l3-continuous-and-equivalent-rates.md), [discrete compounding](lesson-l3-discrete-compounding.md), [rate conventions](../concepts/concept-rate-conventions.md), [numeric foundations](../concepts/concept-numeric-foundations.md) and [exponents/logs](../concepts/concept-exponents-and-logs.md) available as bridges. Planned zero-discount-factor and forward-rates/FRA concept pages remain missing; the required definitions are taught inline here.

<a id="definition"></a>
## 1. “Future period” and “future observed rate” are different ideas

A **zero (spot) rate** quoted today describes growth from today to one specified maturity. A **forward interest rate** inferred today describes growth over a specified interval that starts later. It links two dates, not just one maturity. For example, “the one-year forward beginning one year from today” concerns the interval from year 1 to year 2, not today to year 1 or today to year 2.

The source calls a forward rate the future interest rate implied today by current zero rates. “Implied” is crucial: it means the rate consistent with today's prices under the specified model. A rate that will actually be observed when that future interval starts is a different quantity and is not known merely because we have calculated a forward.

Source: [definition, L3 p25](../../sources/annotated/lecture-3/page-025.md#lecture-3-p025-forward-rate-definition).

<a id="notation"></a>
## 2. Dates, growth and units before algebra

| Symbol | Meaning | Units and conditions |
|---|---|---|
| 0 | Today, when the curve is observed and the forward terms can be fixed | Time origin |
| \(T_1\) | Start of the future investment/borrowing interval | Years from today; \(T_1\ge0\) |
| \(T_2\) | End of that interval | Years from today; \(T_2>T_1\) |
| \(\Delta=T_2-T_1\) | Length of the interval | Positive number of years, using the zero curve's time basis |
| \(R_1,R_2\) | Today's zero rates for maturities \(T_1,T_2\) | Annual decimals, continuously compounded in this source |
| \(P_1=P(0,T_1),P_2=P(0,T_2)\) | Today's prices of one unit paid at the two dates | Positive dimensionless discount factors |
| \(R_F=R_F(T_1,T_2)\) | Forward rate for that interval | Annual decimal, continuous convention here |
| \(G\) | Growth multiplier over the future interval | Dimensionless, positive |
| \(A\) | Amount invested today | Currency, e.g. USD100 |
| \(L\) | Amount lent at \(T_1\) in the replication below | Currency; not necessarily the same as \(A\) |

Percent is a display: 3% means decimal 0.03. An annual rate times years gives a dimensionless exponent. The exponential \(e^x\) is a positive growth factor and satisfies \(e^{x+y}=e^xe^y\). The natural logarithm reverses it: \(\ln(e^x)=x\), with positive input required for a real logarithm.

For a continuously compounded zero rate, one unit today grows to \(e^{R_iT_i}=1/P_i\). Conversely \(P_i=e^{-R_iT_i}\) is the value today of one unit due at maturity. We will compare strategies in the **same currency**, with the same dated, certain payments. The classroom no-arbitrage argument assumes comparable credit/settlement terms, the ability to borrow and lend or buy/sell the replicating claims at the stated prices, and no fees, taxes, bid/ask differences or constraints that break the replication. These are model assumptions, not assertions about actual trading access.

<a id="accumulation"></a>
## 3. Match terminal money, not percentages

Consider two uses of the same amount \(A\) at time 0:

| Strategy | Today | At \(T_1\) | At \(T_2\) |
|---|---|---|---|
| Direct investment | Pay \(A\) | No intermediate payment | Receive \(Ae^{R_2T_2}\) |
| Locked two-stage investment | Pay \(A\) | First investment pays \(Ae^{R_1T_1}\); place that whole amount into the forward investment fixed today | Receive \(Ae^{R_1T_1}e^{R_F\Delta}\) |

The second strategy **locks its second-stage terms today**. It is not a plan to wait until \(T_1\) and accept whichever unknown rate happens to be available. Its amount at \(T_1\) is known from today's first-stage contract, so its forward notional can be matched to that amount.

If both strategies cost the same now and generate identical-risk payments at the same terminal date, consistent no-arbitrage pricing requires equal terminal amounts. Otherwise, under the stated borrowing/lending assumptions, one could fund the more productive locked strategy by borrowing through the less productive route, leaving a positive terminal difference without a net initial outlay. Dividing the equality by positive \(A\) gives the source's equation:

\[
e^{R_2T_2}=e^{R_1T_1}e^{R_F(T_2-T_1)}.
\]

The terminal equality is the reason for the formula. Adding the annual rates directly would ignore how long each rate applies and the fact that the second rate acts on the first stage's accumulated money.

Source: [forward accumulation identity, L3 p25](../../sources/annotated/lecture-3/page-025.md#lecture-3-p025-forward-accumulation).

<a id="formula"></a>
### Take logarithms and isolate the interval rate

Use the exponential multiplication identity to rewrite the right side as \(e^{R_1T_1+R_F\Delta}\). Taking natural logs of both positive sides gives \(R_2T_2=R_1T_1+R_F\Delta\). Subtract the first stage's cumulative log growth, then divide by the **interval length**, not by the final maturity:

\[
\boxed{R_F(T_1,T_2)=\frac{R_2T_2-R_1T_1}{T_2-T_1}.}
\]

The numerator is a difference of dimensionless cumulative log-growth amounts. Division by years produces an annual decimal. It is neither \(R_2-R_1\) alone nor the average of the two annual zero rates. For adjacent whole years the denominator happens to equal 1, but it must be retained in a general formula.

Source: [boxed continuous-forward formula, L3 p25](../../sources/annotated/lecture-3/page-025.md#lecture-3-p025-forward-rate-formula).

<a id="factor-ratio"></a>
## 4. Derive the factor ratio from actual dated claims

Discount factors make the same relation visible without first converting to rate quotations. Construct a forward loan of \(L\) currency units with these two claims:

- Sell a claim requiring you to pay \(L\) at \(T_1\). In the model you receive \(LP_1\) today.
- Buy a claim paying \(LG\) at \(T_2\). It costs \(LGP_2\) today.

For zero net cost today, require \(LP_1-LGP_2=0\). Divide by positive \(LP_2\), giving \(G=P_1/P_2\). The complete net timeline is now **0 today; pay \(L\) at \(T_1\); receive \(L(P_1/P_2)\) at \(T_2\)**. Thus the growth factor over the interval is \(P_1/P_2\), while the reciprocal, the forward **discount** factor, is \(P_2/P_1\):

\[
G=e^{R_F\Delta}=\frac{P_1}{P_2},\qquad
\boxed{e^{-R_F\Delta}=\frac{P(0,T_2)}{P(0,T_1)}}.
\]

Do not reverse these two ratios. A discount factor used to price a later payment is the reciprocal of the corresponding growth multiplier. Taking logs also yields

\[
R_F=\frac{\ln(P_1/P_2)}{\Delta}=-\frac{\ln(P_2/P_1)}{\Delta}.
\]

Substituting \(P_i=e^{-R_iT_i}\) recovers the previous formula. This forward discount factor is **implied today**; it is not a promise about what the future observed discount curve at \(T_1\) will be.

Source: [discount-factor ratio, L3 p25](../../sources/annotated/lecture-3/page-025.md#lecture-3-p025-discount-factor-ratio). The two-claim cash-flow construction is an authored explanatory derivation of that identity.

<a id="source-rate-example"></a>
## 5. Source example: one year to two years

The one-year zero is 3% continuous and the two-year zero is 4% continuous. Thus \(T_1=1\), \(T_2=2\), \(\Delta=1\), \(R_1=0.03\), \(R_2=0.04\).

1. Two-year cumulative log growth: \(0.04(2)=0.08\).
2. One-year cumulative log growth: \(0.03(1)=0.03\).
3. Difference: \(0.08-0.03=0.05\).
4. Divide by one year: \(R_F(1,2)=0.05/1=0.05\), or **5% annual continuous**.

For an independent factor check, \(P_1=e^{-0.03}\approx0.970445533549\) and \(P_2=e^{-0.08}\approx0.923116346387\). Their discount ratio is approximately **0.951229424501**, equal to \(e^{-0.05}\). Its reciprocal growth factor is approximately **1.051271096376**. These are factors, not annual percentage quotations.

Source: [one/two-year calculation, L3 p26](../../sources/annotated/lecture-3/page-026.md#lecture-3-p026-one-two-forward-example).

<a id="source-terminal-check"></a>
### Reproduce both terminal values, keeping unrounded inputs

Start with USD100 today. The first-year investment produces \(100e^{0.03}\approx103.045453395352\) USD. Reinvesting that entire amount at the **locked** 5% continuous forward for one year gives

\[
100e^{0.03}e^{0.05}=100e^{0.08}\approx108.328706767496.
\]

Direct investment at the two-year zero gives \(100e^{0.04(2)}\), the same unrounded amount. Both display **USD108.33**, as on the slide. The equality to USD108.33 is a cents-rounded display, not the exact exponential value. Rounding the intermediate USD103.045453… to cents before reinvesting would introduce unnecessary drift.

Source: [equal terminal values, L3 p26](../../sources/annotated/lecture-3/page-026.md#lecture-3-p026-strategy-terminal-values).

<a id="not-forecast"></a>
### Why the 5% result does not predict next year's observed rate

Today's prices determine this relative-price identity under the model. They do not reveal all information that will arrive before next year. An investor who **does not lock** the second stage faces the market rate then observed, which can differ from 5% without contradicting today's calculation.

Supplemental contrast: if that investor instead finds a 2% continuous one-year rate at \(T_1\), the two-stage amount would be \(100e^{0.03}e^{0.02}=100e^{0.05}\approx105.127109637602\) USD, or **USD105.13**. That is a different, initially uncertain strategy, not a violation of the locked USD108.33 equality. “No arbitrage” compares appropriately matched tradable cash flows at a valuation date; it does not turn an implied forward into a guaranteed forecast or a guaranteed realised return for an unhedged strategy.

Source: [forward is not a forecast, L3 p26](../../sources/annotated/lecture-3/page-026.md#lecture-3-p026-forward-not-forecast). The 2% scenario is an author supplement.

<a id="annual-table"></a>
## 6. Reproduce every row of the annual-forward table

The source table uses continuous annual rates. “Year \(n\)” means the interval from \(n-1\) to \(n\) years, not an investment from today for \(n\) years. Let \(R_n\) denote the \(n\)-year zero rate. For \(n\ge2\), the interval is one year, so the formula becomes \(R_F(n-1,n)=nR_n-(n-1)R_{n-1}\).

| Year \(n\) | Source \(n\)-year zero rate | Source forward for year \(n\) | Author expansion: cumulative-log subtraction |
|---:|---:|---:|---|
| 1 | 3.0% | — | Source leaves this entry blank; do not replace the dash in the reproduced data |
| 2 | 4.0% | 5.0% | \(0.04(2)-0.03(1)=0.08-0.03=0.050\) |
| 3 | 4.6% | 5.8% | \(0.046(3)-0.04(2)=0.138-0.080=0.058\) |
| 4 | 5.0% | 6.2% | \(0.05(4)-0.046(3)=0.200-0.138=0.062\) |
| 5 | 5.3% | 6.5% | \(0.053(5)-0.05(4)=0.265-0.200=0.065\) |

The source dash is not a zero rate. **Supplemental interpretation:** the interval from today to year 1 is already represented by the one-year zero, 3%; use \(P(0,0)=1\), not a fabricated zero-maturity annual rate. The table's forward intervals after year 1 are the future-starting intervals the source highlights.

A useful full-table check is cumulative addition: \(0.03+0.05+0.058+0.062+0.065=0.265\), exactly the five-year zero's \(0.053(5)\). Multiplying the corresponding growth factors gives \(e^{0.265}\) because exponents add. This is a check on timing and decimal conversion, not an instruction to average the zero rates.

Source: [full annual-forward table, L3 p27](../../sources/annotated/lecture-3/page-027.md#lecture-3-p027-annual-forward-table).

<a id="fourth-year"></a>
### The printed fourth-year calculation

The fourth year starts at 3 and ends at 4. The relevant zero rates are therefore the **three-year 4.6%** and **four-year 5.0%**, not the one-year and four-year rates. The source explicitly computes

\[
R_F(3,4)=\frac{0.05(4)-0.046(3)}{4-3}=\frac{0.200-0.138}{1}=0.062=6.2\%.
\]

Check terminal growth from today: \(e^{0.046(3)}e^{0.062(1)}=e^{0.138+0.062}=e^{0.200}\), the direct four-year zero growth. Both sides apply to the same final date.

Source: [fourth-year calculation, L3 p27](../../sources/annotated/lecture-3/page-027.md#lecture-3-p027-fourth-year-calculation).

<a id="quote-bridge"></a>
## 7. A forward growth factor can have different rate quotations

This is an **author supplement** preparing for the [FRA lesson](lesson-l3-fra-mechanics.md). A continuous rate and a simple-period rate can describe the same growth factor without being the same quoted number. Let \(f\) be an annual decimal **simple** rate for a contractual accrual fraction \(\delta>0\). Its period growth factor is \(1+f\delta\). Matching it to the continuous forward gives

\[
1+f\delta=G=e^{R_F\Delta},\qquad f=\frac{e^{R_F\Delta}-1}{\delta}.
\]

In the simple classroom case \(\delta=\Delta\). If a contract uses a different explicitly specified accrual convention, retain its \(\delta\) rather than assume that equality. In the one-year 5% continuous example, matching \(\delta=\Delta=1\) gives \(f=e^{0.05}-1\approx0.051271096376\), or **5.1271096376% simple annual** for that one-year period. Plugging the number 0.05 unchanged into \(1+f\delta\) would yield growth 1.05, not 1.051271096376.

**Fractional-year worked supplement:** take \(T_1=0.5\), \(T_2=1.25\), continuous zero rates 3% and 4.2%. Then \(\Delta=0.75\) years, cumulative logs are 0.015 and 0.0525, and

\[
R_F=\frac{0.0525-0.015}{0.75}=0.05.
\]

The period growth factor is \(e^{0.05(0.75)}\approx1.038211997082\); its reciprocal discount factor is approximately 0.963194417721. USD1000 placed at the future start grows to approximately USD1038.211997081825, displayed **USD1038.21**. With \(\delta=0.75\), the equivalent simple annual rate is approximately **0.0509493294424**, or **5.09493294424%**. The annual continuous 5% is the same as the source example's quote, but a shorter interval means a different period growth factor and equivalent simple quote.

<a id="boundaries"></a>
## 8. Boundaries and misconceptions

- Both discount factors must be positive. A zero denominator or a nonpositive log argument invalidates the ratio/log route; a negative discount factor is not repaired by taking its absolute value.
- Require \(T_2>T_1\). If both dates coincide, the interval has no positive length: its matched growth is 1, but no unique annual rate can be recovered by dividing by zero. Reversed dates are not the future interval defined here.
- At \(T_1=0\), use \(P(0,0)=1\); the interval rate is the ordinary zero rate to \(T_2\). No \(R(0)\) needs to be inferred. A flat continuous zero curve gives the same forward rate as the flat zero rate; a zero curve of all zeros gives growth 1.
- Forward rates can be negative. Supplemental example: one-year zero 4%, two-year zero 1% gives \((0.01(2)-0.04(1))/1=-0.02\), or **−2% continuous**. Its growth factor is \(e^{-0.02}\approx0.980198673307\), still positive; its discount factor is \(e^{0.02}\approx1.020201340027\), above 1. Negative rates are not automatically an algebraic failure.
- Do not infer that forwards always exceed zeros from the source's rising-rate table. Nor does an interpolated zero curve uniquely follow from observed instruments: an interval using interpolated endpoints inherits the interpolation assumption.
- The rate observed at \(T_1\), the rate implied today, and a contractual fixed rate are different labels. Converting one quote convention into another changes its numerical quotation, not its terminal growth when conversion is matched correctly.

<a id="practice"></a>
## 9. Progressive practice — answers are separate

<a id="exercise-derive"></a>
### A. Supplemental derivation (outcome 1)

Draw the three-date timeline for the two-claim replication: sell a claim paying \(L\) at \(T_1\), buy a claim paying \(LG\) at \(T_2\). Show why zero cost today determines \(G\), then derive the continuous-forward formula. Explain which ratio is growth and which is discount.

<a id="exercise-source"></a>
### B. Supplemental audit of the source example (outcome 2)

For the one-year 3% and two-year 4% continuous zero rates, calculate the interval forward, both discount factors, their ratio and both terminal values for USD100 today. Would waiting to accept a future observed 2% rate be the same locked strategy? Show the alternative terminal amount.

<a id="exercise-third-year"></a>
### C. Source question — third year (outcome 2)

Use the zero rates to verify the **5.8% forward rate for year three**.

Source: [third-year question, L3 p27](../../sources/annotated/lecture-3/page-027.md#lecture-3-p027-third-year-question).

<a id="exercise-table"></a>
### D. Supplemental table and timing check (outcomes 1 and 2)

Reconstruct every nonblank forward in the source table. Explain the year-1 dash without treating it as zero, work the fourth-year formula explicitly, and verify the cumulative five-year log-growth identity.

<a id="exercise-transfer"></a>
### E. Supplemental convention and boundary check (outcome 2)

Use the fractional-year example (0.5 to 1.25 years, zeros 3% and 4.2%) to calculate the continuous forward, period growth and the simple annual quote with accrual fraction 0.75. Then test the negative-forward example, identical start/end dates and a zero discount-factor input. Which cases remain valid and why?

<a id="exercise-teachback"></a>
### F. Supplemental teach-back (outcomes 1 and 2)

Teach a beginner why \(R_2-R_1\) is not generally the forward rate. Explain the source's 5% using cumulative log growth and a terminal-price check. Distinguish that quote from both a future observed market rate and an equivalent simple annual quote.

<a id="answers"></a>
## 10. Separate answers

<a id="answer-derive"></a>
### Answer A — supplemental replication and derivation

Today's proceeds from the short first claim are \(LP_1\); today's cost of the long second claim is \(LGP_2\). Zero cost means \(LP_1=LGP_2\), giving growth \(G=P_1/P_2\). Net dated payments are 0 now, \(-L\) at \(T_1\), \(+LG\) at \(T_2\). The reciprocal discount ratio is \(P_2/P_1=e^{-R_F\Delta}\). Taking logs gives \(R_F=\ln(P_1/P_2)/\Delta\). Substituting positive zero factors \(P_i=e^{-R_iT_i}\) gives \((R_2T_2-R_1T_1)/(T_2-T_1)\). All log arguments are dimensionless; \(\Delta>0\) is required.

<a id="answer-source"></a>
### Answer B — supplemental source-example audit

\((0.08-0.03)/1=0.05\), or 5% continuous. Factors are approximately 0.970445533549 and 0.923116346387; their forward discount ratio is 0.951229424501. USD100 first grows to USD103.045453395352, then to USD108.328706767496 at the locked forward. Direct two-year investment gives the same USD108.33 rounded. If the second-stage rate is instead a later observed 2%, the amount is USD105.127109637602, or USD105.13. That unhedged strategy was not locked today, so its different result does not contradict the no-arbitrage comparison.

<a id="answer-third-year"></a>
### Answer C — authored answer to the source's third-year question

Year three is the interval from 2 to 3. Compute \((0.046(3)-0.04(2))/(3-2)=(0.138-0.080)/1=0.058\), or **5.8% continuous annual**. Check: the first two years' cumulative log growth 0.080 plus third-year 0.058 equals 0.138, the three-year zero's cumulative amount. This uses the two-year and three-year zeros, not the one-year zero.

<a id="answer-table"></a>
### Answer D — supplemental full-table check

The source dash for year 1 is preserved; it is not 0%. As an interpretation, today-to-year1 growth is already described by the 3% one-year zero. Subsequent annual forwards are 5.0%, 5.8%, 6.2%, 6.5%. For year four, \((0.05(4)-0.046(3))/(4-3)=0.062\). For year five, \(0.053(5)-0.05(4)=0.065\). The cumulative check is \(0.03+0.05+0.058+0.062+0.065=0.265=0.053(5)\); multiplying growth factors gives the same five-year terminal growth.

<a id="answer-transfer"></a>
### Answer E — supplemental interval, quote and domain checks

The interval is 0.75 years; cumulative-log difference is 0.0375; dividing gives continuous annual 0.05. Growth is approximately 1.038211997082 and the simple annual quote is \((1.038211997081825\ldots-1)/0.75\approx0.0509493294424\), or 5.09493294424%. USD1000 at the start therefore becomes USD1038.21 at the end. The other example yields −2% continuous, positive growth 0.980198673307 and discount 1.020201340027, so its negative rate is valid. Equal dates make division by interval zero and leave the annual rate unidentifiable. A zero factor cannot support the required positive ratio/log model; do not calculate a finite rate from it.

<a id="answer-teachback"></a>
### Answer F — supplemental explanation

Annual zeros summarise different-length investments. First compute their cumulative log growths, subtract to isolate the future interval, then divide by that interval's years. Here 4% for two years means 0.08 cumulative log growth; subtract one year's 0.03 to leave 0.05 over one year. USD100 grows to USD108.33 by either direct or locked two-stage investment. This 5% is implied today, not a forecast of the rate later observed. Its equivalent simple annual quote for the one-year period is 5.1271096376%, because it must produce the same growth 1.051271096376 rather than 1.05.

<a id="source-map"></a>
## Exact primary source-to-teaching and practice map

| Unit ID | Teaching anchor | Outcomes | Practice / answer |
|---|---|---|---|
| lecture-3-p025-discount-factor-ratio | [Factor ratio](#factor-ratio) | 1 | [A](#exercise-derive) / [answer](#answer-derive) |
| lecture-3-p025-forward-accumulation | [Terminal matching](#accumulation) | 1 | [A](#exercise-derive) / [answer](#answer-derive) |
| lecture-3-p025-forward-rate-definition | [Meaning](#definition) | 1 | [F](#exercise-teachback) / [answer](#answer-teachback) |
| lecture-3-p025-forward-rate-formula | [Derivation](#formula) | 1, 2 | [A](#exercise-derive), [E](#exercise-transfer) / [A answer](#answer-derive), [E answer](#answer-transfer) |
| lecture-3-p026-forward-not-forecast | [Not a forecast](#not-forecast) | 1, 2 | [F](#exercise-teachback) / [answer](#answer-teachback) |
| lecture-3-p026-one-two-forward-example | [Source rate](#source-rate-example) | 2 | [B](#exercise-source) / [answer](#answer-source) |
| lecture-3-p026-strategy-terminal-values | [Both terminals](#source-terminal-check) | 2 | [B](#exercise-source) / [answer](#answer-source) |
| lecture-3-p027-annual-forward-table | [All rows](#annual-table) | 1, 2 | [D](#exercise-table) / [answer](#answer-table) |
| lecture-3-p027-fourth-year-calculation | [Fourth year](#fourth-year) | 2 | [D](#exercise-table) / [answer](#answer-table) |
| lecture-3-p027-third-year-question | [Source question](#exercise-third-year) | 2 | [C](#exercise-third-year) / [answer](#answer-third-year) |

These are staging mappings, not canonical taught-coverage records. Independent teaching review and concept integration remain pending.
