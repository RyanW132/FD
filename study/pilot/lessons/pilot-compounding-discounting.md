# From today's money to future money—and back

<a id="pilot-compounding-discounting"></a>

**PROVISIONAL PILOT — awaiting independent source, mathematical and teaching review.** This is one foundation lesson, not coverage of all 41 lecture pages. Proposed stable ID: `pilot-compounding-discounting`. The metadata is exploratory; it does not freeze the production schema or record learner progress.

**Source scope:** Lecture 3, physical PDF pages [3](../lecture-3/pages/lecture-3-pdfPage-003.md#lecture-3-pdfPage-003), [6](../lecture-3/pages/lecture-3-pdfPage-006.md#lecture-3-pdfPage-006), [7](../lecture-3/pages/lecture-3-pdfPage-007.md#lecture-3-pdfPage-007), [8](../lecture-3/pages/lecture-3-pdfPage-008.md#lecture-3-pdfPage-008), and [9](../lecture-3/pages/lecture-3-pdfPage-009.md#lecture-3-pdfPage-009). Each extraction links its original page image. The author visually checked these five images; that is not independent QA. Extraction text remains provisional.

## 1. Why learn this?

Suppose someone promises you $100 next year. Is that the same as receiving $100 today? Not if money received today could earn interest before next year. We need a way to put payments on a common date before comparing them. This is the question on [page 3](../lecture-3/pages/lecture-3-pdfPage-003.md#lecture-3-pdfPage-003).

**Compounding** moves an amount forward in time. **Discounting** moves a future amount backward to its equivalent value today under a stated interest-rate model. Discounting is not a shop discount: it reverses the assumed investment growth.

This lesson teaches the constant-rate arithmetic behind [pages 6–9](../lecture-3/pages/lecture-3-pdfPage-006.md#lecture-3-pdfPage-006), not how to choose an actual market rate. All money below is in the same dollar currency; there is no currency conversion.

## 2. Before the formulas: a beginner bridge

<a id="prerequisite-bridge"></a>

**Supplemental teaching bridge:** these arithmetic explanations expand the slides; they are not additional claims about the supplied course.

You need addition, subtraction, multiplication and division. The following explains the extra notation before we use it.

- **Percent means “per hundred.”** 10% = 10/100 = 0.10; 5% = 0.05. To find 10% of $100, multiply $100 by 0.10 to obtain $10. Add it to the original $100: $100 + $10 = $110. Multiplying directly by 1.10 does the same thing; 1 represents keeping the original amount.
- **A power means repeated multiplication.** For example, \(1.05^2=1.05\times1.05=1.1025\). The little 2 is an exponent, not a multiplier: \(1.05\times2\) would be different.
- **A negative exponent means a reciprocal.** \(1.05^{-2}=1/1.05^2\). It does not mean a negative payment. A positive future receipt discounted with this positive factor remains positive.
- **Keep time units consistent.** Per annum means per year. With an annual rate use years: 18 months = 18/12 = 1.5 years; six months = 0.5 years. A frequency of two times a year gives two periods in one year and three in 18 months.
- **Undo multiplication by division.** If today's amount multiplied by a growth factor equals tomorrow's amount, divide tomorrow's amount by that same factor to recover today's amount. This is the only algebra needed for the discounting derivation below.
- **Calculator notation:** `^` commonly means a power; an `exp` key/function means the exponential function introduced in section 6, not multiplication by a letter. Use parentheses around the entire per-period factor before applying its power.

Pause: what is 6% as a decimal, and how many half-year periods are in two years? Answers: 0.06 and four. If those are unclear, repeat the examples before proceeding.

## 3. Our symbols, units and assumptions

<a id="symbols-and-assumptions"></a>

| Symbol or term | Meaning and units/convention |
|---|---|
| \(A\) | Initial amount invested today, in dollars; also the present value of this single terminal payment under the model. |
| \(PV\) | Present value, in dollars at time zero (“today”). |
| \(FV\) | Future value, in dollars at the end of the investment. |
| \(T\) | Elapsed time from today to the payment, in years; nonnegative. |
| \(m\) | Number of equal compounding periods per year: annual 1, semiannual 2, quarterly 4, monthly 12. |
| \(R_m\) | Nominal annual rate quoted with \(m\) compounding periods per year, written as a decimal. The subscript identifies the convention; it is not multiplication. |
| \(R_m/m\) | Rate per compounding period, as a decimal. |
| \(mT\) | Number of compounding periods across the investment. In our discrete examples this is a whole number. |
| \(R_{\mathrm{eff}}\) | Effective annual rate: the actual fractional increase over one year, as a decimal. |
| \(r\) | Constant continuously compounded annual rate, as a decimal per year. It is a different quotation convention from \(R_m\). |
| \(e\) | Mathematical constant approximately 2.718281828, not an interest rate. |
| \(e^z\) / \(\exp(z)\) | Two names for the exponential function with dimensionless input \(z\). Here the input is \(rT\) or \(-rT\); an annual rate times years is dimensionless. |

**Model assumptions for the calculations:** the stated rate and convention apply throughout; there are no intermediate deposits or withdrawals, fees, taxes or defaults; credited interest is reinvested. These are supplemental explicit assumptions, not promises about real accounts. All displayed cents are rounded at the end, not after every period. For discrete calculations use complete equal compounding periods and \(1+R_m/m>0\); partial-period/day-count rules are outside this pilot. Unless noted, rates are positive. We do not assume different rates for different maturities are actually equal in the market.

## 4. Discrete compounding: interest can earn interest

<a id="discrete-compounding"></a>

[Page 6](../lecture-3/pages/lecture-3-pdfPage-006.md#lecture-3-pdfPage-006) compares investing $100 for one year at a 10% nominal annual quotation:

- Annual compounding gives one application of 10%: \(100\times1.10=110\).
- Semiannual compounding gives two applications of 5%: after the first half-year, \(100\times1.05=105\); after the second, \(105\times1.05=110.25\).

Why is the second result higher? In the second half-year, 5% is earned on $105, not $100. The second interest payment is $5.25, including $0.25 interest on previously credited interest. **Compounding frequency belongs to the rate quotation.** The naked quotation “10% a year” does not tell us which result applies.

The derivation expands [page 7](../lecture-3/pages/lecture-3-pdfPage-007.md#lecture-3-pdfPage-007):

1. Divide the nominal annual rate by the number of periods per year: per-period rate = \(R_m/m\).
2. Add 1 to retain the existing balance: growth factor for one period = \(1+R_m/m\).
3. There are \(mT\) periods. Repeatedly multiply by that factor.

\[
FV=A\left(1+\frac{R_m}{m}\right)^{mT}.
\]

To reverse the operation, divide by the complete growth factor:

\[
PV=\frac{FV}{(1+R_m/m)^{mT}}
  =FV\left(1+\frac{R_m}{m}\right)^{-mT}.
\]

The minus sign changes the direction in time; it does not turn money into a loss. Growing the resulting \(PV\) forward with the same convention must recover \(FV\), apart from rounding.

### Worked source example: quarterly for two years

[Page 7](../lecture-3/pages/lecture-3-pdfPage-007.md#lecture-3-pdfPage-007) invests $1,000 at 8% nominal annual interest, compounded quarterly, for two years. Supplemental intermediate steps:

1. \(A=1000\), \(R_4=0.08\), \(m=4\), \(T=2\).
2. Per-quarter rate = \(0.08/4=0.02\), or 2%; growth factor = 1.02.
3. Number of quarters = \(4\times2=8\).
4. Total growth factor = \(1.02^8=1.1716593810022657\).
5. \(FV=1000\times1.1716593810022657=1171.6593810022657\), hence **$1,171.66**.
6. Reverse check using the unrounded value: \(1171.6593810022657/1.02^8=1000\), hence $1,000.00 today. Reversing rounded $1,171.66 differs by less than one cent.

The extra $171.66 is growth over two years, not an annual 17.166% rate quotation.

## 5. Nominal versus effective: compare the same thing

<a id="effective-annual-rate"></a>

A nominal rate is a quotation with a compounding convention; an effective annual rate reports the actual one-year increase. Apply the preceding formula for one year, divide by the initial amount and subtract 1 to remove the original amount. This gives the formula on [page 8](../lecture-3/pages/lecture-3-pdfPage-008.md#lecture-3-pdfPage-008):

\[
R_{\mathrm{eff}}=\left(1+\frac{R_m}{m}\right)^m-1.
\]

For 10% nominal compounded semiannually, \(R_2=0.10\) and \(m=2\): \(1.05^2-1=0.1025\), or **10.25% effective annually**. It is not 10.25% each half-year.

The source table on page 8 reports these one-year balances for $100. Its surrounding example uses the same 10% nominal annual quotation; the balances correspond to that convention:

| Convention | Periods per year | Final balance, rounded to cents |
|---|---:|---:|
| Annual | 1 | $110.00 |
| Semiannual | 2 | $110.25 |
| Quarterly | 4 | $110.38 |
| Monthly | 12 | $110.47 |
| Daily, using 365 periods | 365 | $110.52 |

[View the original table image](../lecture-3/assets/page-08.png). This table varies frequency while holding the **nominal** annual number fixed. It does not show that differently compounded quotations chosen to be equivalent earn different amounts. Daily and continuous values may round to the same cents without being exactly equal.

## 6. Continuous compounding: a limiting model

<a id="continuous-compounding"></a>

[Page 9](../lecture-3/pages/lecture-3-pdfPage-009.md#lecture-3-pdfPage-009) takes the limit of compounding more and more often. **Supplemental intuition:** split the year into increasingly many pieces; the interest per piece becomes smaller, but there are more pieces over which interest earns interest. The balances approach a finite value, not infinity.

The exponential function describes this limiting growth. No calculus is needed to use it here: evaluate \(e^{rT}=\exp(rT)\) on a calculator. For a fixed numerical annual rate and duration, the discrete factors approach this exponential factor as the frequency increases. This motivates, rather than formally proves, the slide's limiting result:

\[
FV=Ae^{rT}.
\]

Reverse the multiplication to discount:

\[
PV=\frac{FV}{e^{rT}}=FV e^{-rT}.
\]

The **discount factor** is the multiplier \(e^{-rT}\); it has no currency unit. For a positive rate and positive time it lies between zero and one. At zero rate or zero elapsed time it is exactly one. With a negative rate it exceeds one: “present value is smaller” is therefore not an unconditional rule. This boundary explanation is supplemental.

### Worked supplemental example: price a single future receipt

**Agent-created teaching example, not a slide's numeric example.** Receive $1,000 exactly two years from today; use a constant 5% continuously compounded annual rate. Apply the assumptions in section 3; there are no other payments.

1. \(FV=1000\), \(r=0.05\) per year, \(T=2\) years.
2. \(rT=0.05\times2=0.10\), with no unit.
3. Discount factor = \(e^{-0.10}=0.9048374180359595\).
4. \(PV=1000\times0.9048374180359595=904.8374180359596\), hence **$904.84**.
5. Why? Investing that unrounded present value for two years gives \(904.8374180359596\times e^{0.10}=1000\) within numerical precision. The forward growth factor is \(e^{0.10}=1.1051709180756477\); it is the reciprocal of the discount factor.

**Do not mix quotations:** a 5% continuously compounded rate and a 5% nominal annually compounded rate are not equivalent. In this example annual compounding would discount by \(1.05^{-2}\), producing $907.03, not $904.84. Converting rates so they describe identical growth is a later topic, on page 10; this lesson does not teach that conversion.

## 7. Mistakes to catch before continuing

<a id="misconceptions"></a>

- **“10% means enter 10.”** Enter 0.10. Entering 10 means a decimal rate of ten, or 1,000%.
- **“Semiannual means use the annual rate twice.”** Divide a nominal annual rate by two, then apply that half-year rate twice in one year.
- **“Multiply the rate by time and add it once.”** That is simple-interest arithmetic, not the compound-interest formulas taught here. It omits interest on interest.
- **“The negative exponent is a negative cash flow.”** It means a reciprocal growth factor. The direction of the cash flow and the time adjustment are different ideas.
- **“More compounding always means a better quotation.”** Only compare after fixing the rate convention and time horizon. The table holds the nominal number fixed; equivalent quotations can describe the same growth.
- **“A rate alone prices every payment.”** These examples specify one constant rate for one investment/payment. Multiple-maturity cash flows require more information; that belongs to the later zero-rate and bond lessons.

## 8. Practice before opening the answers

All exercises and teach-back prompts below are **supplemental, agent-authored practice**, not supplied seminar questions or official solutions. Use the lesson assumptions; retain unrounded intermediate values and round currency answers to cents.

<a id="exercise-rate-units"></a>

### Exercise 1 — Read the quotation

A deposit quotes 6% nominal annual interest compounded semiannually for 18 months. State the decimal annual rate, per-period rate, years and number of periods. Hint: convert months to years before multiplying by frequency.

<a id="exercise-discrete-roundtrip"></a>

### Exercise 2 — Grow and reverse

Invest $200 for two years at 6% nominal annual interest compounded semiannually. Calculate the future value, showing the per-period factor and number of periods. Then use the unrounded future value to recover the present value. Hint: the reverse operation divides by exactly the factor used to grow.

<a id="exercise-effective-rate"></a>

### Exercise 3 — Explain the difference

For Exercise 2's quotation, calculate the effective annual rate. Explain why it differs from 6% nominal and why that difference does not contradict the quotation.

<a id="exercise-continuous-discount"></a>

### Exercise 4 — Choose the direction

You receive $500 after six months. Use 4% continuously compounded annual interest. Calculate its present value and check by growing it forward. Then state the present value at a zero rate. Hint: 4% = 0.04 and six months = 0.5 years; the exponent for discounting is negative.

<a id="exercise-teachback"></a>

### Teach-back — Teach a friend without starting with a formula

Explain why $100 at “10% per year” can lead to either $110 or $110.25 after a year. Then explain how you would value $100 due one year from now at a specified positive continuously compounded rate. Name the missing convention in the first question, distinguish backward from forward movement, and explain why a negative exponent does not make the receipt negative. Compare your explanation with the separate answer below; explaining it is practice, not automatic evidence of mastery.

## 9. Observable outcomes

<a id="learning-outcomes"></a>

| Proposed outcome ID | By the end you can… | Success criterion and practice evidence |
|---|---|---|
| `pilot-rate-units` | Translate a nominal rate quotation into consistent decimal, per-period and time inputs. | Exercise 1: all four inputs correct, with units/convention; no 6-versus-0.06 mistake. |
| `pilot-discrete-roundtrip` | Compound a single amount and reverse the same operation. | Exercise 2: identify 1.03 and four periods, reach $225.10 and recover $200.00; explain reciprocal, not negative money. |
| `pilot-effective-rate` | Distinguish nominal from effective annual rates. | Exercise 3: 6.09% effective, with an interest-on-interest explanation; teach-back correctly distinguishes the two $100 balances. |
| `pilot-continuous-discount` | Discount a single receipt continuously, with correct sign and time units. | Exercise 4: $490.10, reverse-check $500.00 and zero-rate $500.00; teach-back explains the positive-rate direction and sign. |

Numeric success means within $0.01 of the unrounded calculation when expressed in currency. The explanation criteria also matter; a correct number alone is not sufficient. These are proposed assessment criteria, not a claim that any learner has met them.

---

## 10. Separate answers — stop here until you have tried

<a id="answer-rate-units"></a>

### Answer 1

Annual nominal decimal rate \(R_2=0.06\); semiannual rate \(0.06/2=0.03\), or 3%; \(T=18/12=1.5\) years; \(mT=2\times1.5=3\) half-year periods. The rate is nominal annual with semiannual compounding, not 6% each half-year.

<a id="answer-discrete-roundtrip"></a>

### Answer 2

Per-period factor = \(1+0.06/2=1.03\). Four periods = \(2\times2\). The growth factor is \(1.03^4=1.12550881\). Thus \(FV=200\times1.12550881=225.101762\), or **$225.10**. Reverse: \(225.101762/1.12550881=200\), or **$200.00**. The negative exponent is another notation for that division, not a negative balance.

<a id="answer-effective-rate"></a>

### Answer 3

\(R_{\mathrm{eff}}=(1+0.06/2)^2-1=1.0609-1=0.0609\), or **6.09%**. The first half-year earns 3% on the original balance; the second earns 3% on a larger balance including that first interest payment. The nominal quotation does not claim the effective annual growth is exactly 6%.

<a id="answer-continuous-discount"></a>

### Answer 4

\(rT=0.04\times0.5=0.02\). The discount factor is \(e^{-0.02}=0.9801986733067553\). \(PV=500\times0.9801986733067553=490.09933665337764\), or **$490.10**. The unrounded result multiplied by \(e^{0.02}\) recovers **$500.00** within numerical precision. At zero rate, \(e^0=1\), so the present value is **$500.00**. There is no discount in this specified model when the rate is zero.

<a id="answer-teachback"></a>

### Teach-back guide

The missing information is the compounding convention. A single 10% application grows $100 to $110; two 5% half-year applications grow it to $105 then $110.25. Interest in the second period includes interest on the first period's interest. With a specified positive continuous annual rate and one-year wait, multiply the future $100 receipt by \(e^{-r\times1}\) to move backward. This factor is positive but below one, so the equivalent amount today is smaller and still positive. Multiply that amount by \(e^{r\times1}\) to reverse the adjustment.

## Scope and next step

This provisional lesson supports only the cited early interest/compounding material. It does not teach or claim coverage of rate-market taxonomy, benchmark transitions, conversion between equivalent rate conventions, zero curves, bond pricing, bootstrapping, forward rates, FRAs, duration or convexity. Continue only after checking your answers; later lessons must teach the remaining prerequisites and topics explicitly. Source originals, provisional extraction, independent review and personal learning progress remain distinct.
