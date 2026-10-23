# Bootstrap the first discount factors and zero rates

> **Production-curriculum draft — independent teaching review pending.** This is authored teaching for Lecture 3, physical pages 19–21, not an approved canonical lesson. The source is classroom evidence, not current market advice. Source transcription QA does not approve this teaching.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain and organise a bootstrap:** given the five source instruments, distinguish price, face value and coupon, draw every promised payment at its date, and explain why zero-coupon instruments reveal factors directly while coupon bonds require earlier factors.
2. **Calculate and audit the short end:** obtain the first three discount factors and annual continuously compounded zero rates, reprice all three original zero-coupon bonds, and diagnose invalid inputs, zero time and zero/negative-rate cases. Keep exact factors for subsequent work; round money only at the end.

The prerequisite is [yield and par](lesson-l3-yield-and-par.md). If you need a slower bridge, use [numeric foundations](../concepts/concept-numeric-foundations.md), [exponents and logarithms](../concepts/concept-exponents-and-logs.md), [rate conventions](../concepts/concept-rate-conventions.md), [discrete compounding](lesson-l3-discrete-compounding.md), [continuous/equivalent rates](lesson-l3-continuous-and-equivalent-rates.md), [zero rates and discounting](lesson-l3-zero-rates-and-discounting.md), and [coupon-bond pricing](lesson-l3-coupon-bond-pricing.md). The planned standalone zero-discount-factor and bond-yield concepts are not yet available; the foundations needed here are included below.

<a id="why-bootstrap"></a>
## 1. Reverse the pricing question

Previously we knew the discount factors and calculated a bond price. Now we observe prices and ask which discount factors would reproduce them. A discount factor tells us today's model value of one currency unit paid at a specified future date. A **zero curve** records one zero rate for each maturity, with a stated quotation convention. It is not a list of coupon rates or a list of bond yields to maturity.

A zero-coupon bond has one payment, so its price equation has one unknown factor. A coupon bond has several payments. Its price alone cannot usually separate all their unknown factors: many sets of factors can produce the same total. Bootstrapping proceeds in an order that leaves just one unknown at each step: obtain short factors first, value known earlier coupons, then isolate the remaining final payment. A new factor then becomes known input for the next bond.

This dependence explains the source's name: each newly determined zero rate helps determine the next. In calculation it is often simpler to carry **discount factors** rather than repeatedly round rates and convert back. This is algebraic inference from specified prices and cash flows, not a claim that every arbitrary collection of market prices produces a coherent curve.

Sources: [procedure, L3 p19](../../sources/annotated/lecture-3/page-019.md#lecture-3-p019-bootstrap-procedure); [name, L3 p19](../../sources/annotated/lecture-3/page-019.md#lecture-3-p019-bootstrap-name).

<a id="notation"></a>
## 2. Define the quantities before calculating

All prices and cash flows in the lecture example are in USD, per USD100 face. We assume the quoted price is the full price at the valuation date, that the listed future amounts are paid as promised, and that dates and prices are comparable. We are not adding accrued interest, settlement lags, taxes, transaction costs or default losses to the supplied classroom data. Applying the method to a different quotation requires resolving those details first.

| Symbol or term | Meaning | Unit / convention |
|---|---|---|
| Today, time 0 | Date on which the bond price is observed | Time origin |
| \(T\), or a payment date \(t_i\) | Time from today to maturity or payment number \(i\) | Years; 0.5 means six months |
| \(F\) | Face value, the principal repaid at maturity | USD; here 100 |
| \(B\) | Price paid today | USD; not necessarily 100 |
| \(a\) | Stated annual coupon **amount** in the lecture table | USD per year, not itself a decimal interest rate |
| \(q=a/F\) | Annual nominal coupon rate | Decimal per year; 8/100 is 0.08 or 8% |
| \(m\) | Regular coupon payments each year | Positive integer; here 2 for coupon bonds |
| \(K=a/m=Fq/m\) | Cash coupon at each regular date | USD; principal is separate |
| \(C_i\) | Entire payment at date \(t_i\) | USD; final payment includes coupon and face once |
| \(d(T)=P(0,T)\) | Today's value of one unit paid at \(T\) | Dimensionless discount factor |
| \(R(T)\) | Zero rate for today to \(T\) | Annual decimal, **continuously compounded** here |

The short notation \(d(T)\) and the longer \(P(0,T)\) mean the same thing. Coupon frequency and zero-rate compounding are different choices: semiannual coupons do **not** force semiannual zero-rate quotations. A 10% annual decimal rate is 0.10, not 10; multiplying it by a number of years produces a dimensionless exponent.

Recall the continuous growth model: one unit today grows to \(e^{R(T)T}\) at its maturity when that rate applies. Here \(e^x\) is the positive exponential function; it turns addition of growth exponents into multiplication of growth factors. Discounting reverses growth, so

\[
d(T)=e^{-R(T)T},\qquad \text{PV of } C \text{ at }T=C\,d(T).
\]

The **natural logarithm** \(\ln x\), defined for \(x>0\), reverses the exponential: \(\ln(e^x)=x\). It is not “divide by e.” These identities, not a memorised calculator key sequence, will let us recover the rate.

<a id="source-table"></a>
## 3. Read all five instruments, not just the prices

This reproduces the source data and explicitly unpacks its payment rule. The annual coupon column is a **cash amount**. All five faces are USD100; coupon-bearing bonds pay half that annual amount every six months.

| Maturity, years | Source annual coupon, USD | Source price, USD | Complete future payments, USD (author expansion) |
|---:|---:|---:|---|
| 0.25 | 0 | 97.50 | 100 at 0.25 |
| 0.50 | 0 | 94.90 | 100 at 0.50 |
| 1.00 | 0 | 90.00 | 100 at 1.00 |
| 1.50 | 8 | 96.00 | 4 at 0.50; 4 at 1.00; 104 at 1.50 |
| 2.00 | 12 | 101.60 | 6 at 0.50; 6 at 1.00; 6 at 1.50; 106 at 2.00 |

For the last two rows, a complete six-month coupon period is assumed, as specified by the source. USD8 annually means USD4 at each half-year, not USD8 every six months and not 8% of the **price**. The face, not the price, determines the promised coupon. The final USD104 is USD4 coupon plus USD100 principal, not USD104 plus another USD100.

**Text timeline:** today you pay the price. Moving right along time, place only the listed receipts. A bond with maturity 1.5 years has three receipts at 0.5, 1.0, 1.5; the 0.25-year zero bond has just one receipt at 0.25. We do not invent a 0.25-year coupon on the semiannual bonds. This accessible table carries the same information as a cash-flow diagram without relying on colour or arrows.

Source: [instrument table and payment conventions, L3 p20](../../sources/annotated/lecture-3/page-020.md#lecture-3-p020-bootstrap-instrument-table).

<a id="starting-point"></a>
### Why the first three rows can be solved immediately

Their coupons are zero. Each price is simply the face multiplied by its own maturity factor: \(B=F d(T)\). Divide both sides by the positive face:

\[
d(T)=\frac{B}{F}.
\]

The USD units cancel. For instance USD97.50 / USD100 = 0.975. This says that one USD due in a quarter-year has today's model value USD0.975. It does not say that the annual rate is 2.5%. The price shortfall relative to face describes a discount over that maturity, not the requested annual continuous rate.

The first three factors are therefore **exact for the supplied prices**: \(d(0.25)=0.975\), \(d(0.5)=0.949\), \(d(1)=0.900\). The later coupon bonds are deliberately left for [the extension lesson](lesson-l3-bootstrap-extension.md): their payments first require factors at the earlier coupon dates.

Source: [starting point, L3 p20](../../sources/annotated/lecture-3/page-020.md#lecture-3-p020-bootstrap-start).

<a id="inversion"></a>
## 4. Derive the annual continuous zero rate

For a positive face, positive price and strictly positive maturity,

\[
B=F e^{-R(T)T}.
\]

1. Divide by \(F\): \(B/F=e^{-R(T)T}\).
2. Take the natural logarithm: \(\ln(B/F)=-R(T)T\).
3. Divide by \(-T\): \(R(T)=-\ln(B/F)/T\).
4. Equivalently, invert the positive ratio inside the log: \(R(T)=\ln(F/B)/T\).

Thus the source's face-100 formula is

\[
R(T)=\frac{1}{T}\ln\!\left(\frac{100}{B}\right).
\]

The logarithm takes a **dimensionless ratio**, not a bare USD price. Dividing the log growth by the number of years makes the answer annual. Multiply the resulting decimal by 100 only when displaying a percent. This inversion recovers the single-payment zero rate; using the same formula on a coupon-bond price while ignoring coupons is not a bootstrap.

Source: [zero-rate inversion, L3 p21](../../sources/annotated/lecture-3/page-021.md#lecture-3-p021-zero-rate-inversion).

<a id="first-three"></a>
## 5. Work every short-end calculation and check it backwards

Start with the quarter-year bond. Its maturity growth factor is \(100/97.5\); its log growth is approximately 0.025317807984. Divide by 0.25 years (equivalently multiply by 4) to obtain 0.101271231937 per year. That is **10.1271231937%**, displayed by the source as **10.127%**.

For the half-year bond, \(\ln(100/94.9)\approx0.052346480372\). Dividing by 0.5 gives 0.104692960744, or **10.4692960744%**, displayed as **10.469%**.

For the one-year bond, \(\ln(100/90)\approx0.105360515658\). Division by one leaves 0.105360515658, or **10.5360515658%**, displayed as **10.536%**.

| Maturity, years | Exact factor from price | Log growth \(-\ln d\), rounded | Annual continuous rate, decimal (rounded) | Source display | Reverse price check using exact factor |
|---:|---:|---:|---:|---:|---:|
| 0.25 | 0.975 | 0.025317807984 | 0.101271231937 | 10.127% | 100 × 0.975 = USD97.50 |
| 0.50 | 0.949 | 0.052346480372 | 0.104692960744 | 10.469% | 100 × 0.949 = USD94.90 |
| 1.00 | 0.900 | 0.105360515658 | 0.105360515658 | 10.536% | 100 × 0.900 = USD90.00 |

The equivalent exponential checks are \(100e^{-R(T)T}=B\) when the unrounded rate is used. The source prints equality signs with rounded percentages; treat those displayed rate equalities as approximations. Do not use the three-decimal-percent displays as exact inputs to later steps. Exact discount factors avoid this rounding drift entirely.

Source: [all three rates, L3 p21](../../sources/annotated/lecture-3/page-021.md#lecture-3-p021-first-three-rates).

<a id="boundaries"></a>
## 6. Boundary checks and mistakes worth catching

- **Price equals face:** if \(B=F\) and \(T>0\), the factor is 1 and \(\ln1=0\), so the continuous zero rate is zero. That does not require dividing by the rate.
- **Price exceeds face:** a positive factor above 1 gives a negative continuous zero rate. Supplemental illustration: price USD101, face USD100, maturity one year implies \(d=1.01\) and \(R=-\ln1.01\approx-0.009950330853\), or −0.9950330853%. Repricing gives USD101.00. Do not reject a factor merely because it exceeds 1; no assumption of nonnegative rates has been imposed.
- **Price nonpositive or face nonpositive:** the positive-face single-payment model requires \(B>0\) and \(F>0\). A zero price cannot be represented by a finite real continuous rate because an exponential is strictly positive. A negative ratio has no real logarithm. Reject the model inputs rather than report a finite rate.
- **Maturity zero:** at today, the accumulation and discount factors are 1. The pricing identity requires \(B=F\). It holds for every finite rate, so the rate is unidentifiable; dividing by \(T=0\) is invalid. If \(B\ne F\), the model inputs are inconsistent.
- **Wrong quote:** \((F/B)-1\) is the holding-period growth fraction, not generally the annual continuous rate. Quarterly maturity does not mean the source rate is compounded quarterly. The rate's convention was explicitly continuous.
- **Wrong dependency:** knowing a factor at 0.25 years does not automatically give one at 0.5 or 1 year. Here separate zero-coupon prices identify those factors. Between observed dates an extra modelling rule is needed.
- **Wrong market claim:** these are the supplied classroom prices. This lesson makes no present-day claim that a particular bond is risk-free, available or attractively priced.

<a id="practice"></a>
## 7. Progressive practice

Try the prompts before using the separate answers. “Supplemental” means authored practice, not an additional question printed on the slide.

<a id="exercise-timeline"></a>
### A. Supplemental — read the data (outcome 1)

Using the five-row source table, explain the difference between face, price and annual coupon amount. Write all payments for the 1.5-year and two-year bonds. Why can the three zero-coupon rows be solved first without any coupon-rate guess?

<a id="exercise-source"></a>
### B. Supplemental — reproduce the three source rows (outcome 2)

For each of the three zero-coupon rows, calculate the factor, log growth and annual continuous zero rate. Show the inversion algebra and reprice each bond. Explain why 10.469% is not the exact half-year zero-rate input for later steps.

<a id="exercise-transfer"></a>
### C. Supplemental — change scale and price (outcome 2)

A zero-coupon promise pays USD200 after 0.5 years and costs USD189.80. Find its factor and continuous annual zero rate. Then consider a different one-year promise of USD100 costing USD101: find its factor/rate and explain the sign. State what happens if the price instead equals USD100.

<a id="exercise-boundaries"></a>
### D. Supplemental — stop before using a logarithm (outcome 2)

For face USD100, examine price zero at one year; price −USD5 at one year; and price USD100 at maturity zero. Can each case yield a finite uniquely identified continuous zero rate? What changes if the immediate-payment price is USD99?

<a id="exercise-teachback"></a>
### E. Supplemental — teach back the method (outcomes 1 and 2)

Explain to a beginner why the next 1.5-year coupon bond cannot be treated as a USD100 zero-coupon bond priced at USD96. Name the earlier factors needed, the final payment to isolate, the units of the log argument, and the calculation you would perform to audit a proposed factor.

<a id="answers"></a>
## 8. Separate supplemental answers

<a id="answer-timeline"></a>
### Answer A — timeline and starting point

Face is USD100 promised back at maturity; price is today's USD97.50, USD94.90, USD90.00, USD96.00 or USD101.60. Annual coupon amount is respectively USD0, USD0, USD0, USD8 or USD12. It is not calculated from the price. The 1.5-year bond pays USD4 at 0.5, USD4 at 1, USD104 at 1.5. The two-year bond pays USD6 at 0.5, USD6 at 1, USD6 at 1.5, USD106 at 2. Each zero-coupon row has only USD100 at its own maturity, so its single unknown factor is its price divided by 100. No earlier coupon PV is present.

<a id="answer-source"></a>
### Answer B — all three factors and rates

From \(B=100e^{-RT}\), divide by 100, take logs and divide by \(-T\). The factors are 0.975, 0.949, 0.900; their negative logs are approximately 0.025317807984, 0.052346480372, 0.105360515658. Divide respectively by 0.25, 0.5, 1 to obtain annual decimals 0.101271231937, 0.104692960744, 0.105360515658. Multiply by 100 to display 10.1271231937%, 10.4692960744%, 10.5360515658%. Multiplication of each exact factor by 100 returns USD97.50, USD94.90, USD90.00. The source's 10.469% is rounded; retain the exact 0.949 factor for extension.

<a id="answer-transfer"></a>
### Answer C — scale and rate sign

\(189.80/200=0.949\); the face has doubled and so has the price, leaving the factor unchanged. The annual continuous rate is still \(-\ln(0.949)/0.5\approx0.104692960744\), or 10.4692960744%. For the other promise, \(101/100=1.01\) gives \(-\ln(1.01)\approx-0.009950330853\), or −0.9950330853%. Its positive factor above one corresponds to a negative rate, and USD100 × 1.01 = USD101.00. A price of USD100 gives factor 1, rate zero and price USD100.00.

<a id="answer-boundaries"></a>
### Answer D — no invalid logarithms or zero-time division

A price of zero gives factor zero: no finite real exponential equals zero, and \(\ln0\) is not defined. Price −USD5 gives a negative factor and no real logarithm. At maturity zero, price USD100 matches the immediate USD100 payment and factor 1, but every finite rate gives the same factor; there is no uniquely identifiable rate. An immediate price USD99 does not satisfy the stated pricing identity. Do not divide by zero or silently substitute a rate of zero for “unidentifiable.”

<a id="answer-teachback"></a>
### Answer E — the next step in words

The USD96 price buys three receipts, not just USD100 at maturity. Use factors at 0.5 and 1 year to value the first two USD4 coupons. Subtract those PVs from USD96; the remainder pays for the final USD104, so divide by 104 to get its maturity factor. The logarithm will take that dimensionless positive factor, and dividing its negative log by 1.5 years gives the continuous annual zero rate. Audit by multiplying each payment by its own factor and adding back to USD96. The following lesson performs that entire calculation.

<a id="source-map"></a>
## Source-to-teaching and practice map

Only these six primary lecture units belong to this draft; the companion lesson owns the subsequent steps. A matrix is an authoring aid, not a canonical coverage approval.

| Exact unit ID | Teaching anchor | Outcome | Practice and separate answer |
|---|---|---|---|
| lecture-3-p019-bootstrap-name | [Why bootstrap](#why-bootstrap) | 1 | [E](#exercise-teachback) / [answer](#answer-teachback) |
| lecture-3-p019-bootstrap-procedure | [Why bootstrap](#why-bootstrap) | 1, 2 | [E](#exercise-teachback) / [answer](#answer-teachback) |
| lecture-3-p020-bootstrap-instrument-table | [Full table](#source-table) | 1 | [A](#exercise-timeline) / [answer](#answer-timeline) |
| lecture-3-p020-bootstrap-start | [Starting point](#starting-point) | 1 | [A](#exercise-timeline) / [answer](#answer-timeline) |
| lecture-3-p021-first-three-rates | [All three calculations](#first-three) | 2 | [B](#exercise-source) / [answer](#answer-source) |
| lecture-3-p021-zero-rate-inversion | [Derivation](#inversion) | 2 | [B–D](#exercise-source) / [B answer](#answer-source) |
