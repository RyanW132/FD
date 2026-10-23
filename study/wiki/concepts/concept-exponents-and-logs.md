# Powers, exponential growth and logarithms

**SUPPLEMENTAL prerequisite bridge — author draft, awaiting independent review.** This supplies the mathematics needed before compounding and equivalent-rate calculations. It is not a claim that the slides already teach elementary powers/logarithms. Examples, exercises and answers are supplemental unless explicitly identified as source motivation. Prerequisite: [numeric foundations](concept-numeric-foundations.md#numeric-outcomes).

<a id="powers-outcomes"></a>
## Why this bridge matters

Repeated growth multiplies; finding an unknown growth time reverses that multiplication. After this bridge, you should be able to:

1. Evaluate integer, zero, negative and fractional powers of positive bases and explain their domains.
2. Use exponent/logarithm inverse identities and distinguish ln(a + b) from ln(a) + ln(b).
3. Calculate discrete and continuous accumulation/discounting with decimal rates and matched time units.
4. Rearrange a growth equation and convert rate conventions by matching accumulation, with a substitution check.

Readiness check: 10% means 0.10, so multiplying £100 by 1.10 gives £110. If this is unclear, revisit percentages before continuing.

<a id="powers-rules"></a>
## 1. A power counts multiplication, not addition

For a positive base a and positive whole-number exponent n, a^n means a multiplied by itself n times: 2³ = 2 × 2 × 2 = 8. Thus 1.10² = 1.10 × 1.10 = 1.21, not 1.20. A second 10% growth is calculated on the new amount, including the first period's growth. Here ^ is plain-text exponent notation; superscripts mean the same thing.

For positive a, these rules extend multiplication consistently:

- a^u a^v = a^(u+v): combine the two lists of repeated factors. Example 2² × 2³ = 2⁵ = 32.
- a^u/a^v = a^(u−v): cancel common factors. In particular a⁰ = 1 because a^n/a^n = 1.
- a^(−u) = 1/a^u: negative exponent means reciprocal, not negative value. For example 2^(−3) = 1/8 = 0.125.
- (a^u)^v = a^(uv): repeat a repeated multiplication. Example (2²)³ = 2⁶ = 64.
- a^(1/n) is the **positive nth root**, the positive number whose nth power is a. Thus 9^(1/2) = 3 and 8^(1/3) = 2; a^(k/n) = (a^(1/n))^k for integer k and positive integer n. For example 9^(3/2) = 3³ = 27.

These identities hold for positive bases and real exponents, not only whole numbers. Real exponents (including non-fractions such as sqrt(2)) are defined by a continuous extension, or equivalently a^x = exp(x ln a) after the functions below are introduced. We restrict fractional/general real powers to positive bases to avoid sign/multivalued or complex-number issues. Division by zero is forbidden; 0⁰ and negative powers of zero are not used. Taking a square root to solve x² = 9 yields **two real solutions** x = ±3, but the root function sqrt(9) itself means the nonnegative one. Positive financial accumulation factors select the positive root.

<a id="powers-exponential"></a>
## 2. The exponential function and its limit

The special positive constant e is approximately 2.718281828. exp(x) and e^x mean the same function. For every real x, e^x is positive; e⁰ = 1 and e^(−x) = 1/e^x. It rises as x rises. A useful definition, displayed in the lecture, is

    e^x = limit as m → ∞ of (1 + x/m)^m.

The symbol ∞ means “without bound”; the limit is the value approached as positive integer m grows, not a calculator input of infinity. For x = 1, m = 1 gives 2, m = 2 gives 2.25, m = 10 gives approximately 2.593742, m = 100 gives approximately 2.704814, approaching e. For negative x, sufficiently large m makes the base positive, as needed by the limit; do not assume every small m is a valid financial accumulation convention. Numerical convergence illustrates the definition but is not a proof of its existence for every real x.

In finance the limit interprets increasingly frequent proportional growth, not an assertion that money is actually transferred infinitely often. The exponent **must be dimensionless**. If r is a continuous annual rate (per year) and t is years, rt is dimensionless and e^(rt) is a growth factor. Enter 6% as r = 0.06, not 6. Rates quoted per another period require time in that same period, or an explicit equivalent-rate conversion.

<a id="powers-logarithms"></a>
## 3. Logarithm means “find the exponent”

An **inverse function** reverses a function on its domain. The natural logarithm ln(z) is the unique real x such that e^x = z. Its domain is **z > 0**, and its input must be dimensionless. Thus ln(e^x) = x for every real x, and e^(ln z) = z for z > 0. In particular ln(1) = 0, ln(e) = 1, and ln(z) is negative for 0 < z < 1. There is no real ln(0) or ln(negative number). A negative logarithm is perfectly valid; a negative logarithm **input** is not.

Why logarithm rules work: write positive a = e^u and b = e^v. Then ab = e^(u+v), so ln(ab) = u + v = ln(a) + ln(b). Similarly division subtracts exponents, giving ln(a/b) = ln(a) − ln(b). Raising a to power k gives e^(ku), so ln(a^k) = k ln(a). These require positive a,b for the real logarithms used here. There is **no** rule ln(a + b) = ln(a) + ln(b): with a = b = 1, the left is ln(2) ≈ 0.693147 while the right is 0.

Do not take ln of “£1,100” as a physical quantity. Take the dimensionless ratio £1,100/£1,000 = 1.10; its currency units cancel. Calculators may have both ln and log keys; ln means base e here. Some “log” keys mean base 10, so using them without conversion gives the wrong continuous rate. To evaluate powers with a calculator, keep parentheses around the full base and exponent, and retain intermediate precision.

<a id="powers-compounding"></a>
## 4. Repeated growth and reversing it

Let A > 0 be today's principal in a stated currency, t ≥ 0 elapsed time in years, m > 0 the compounding frequency in periods/year, and R_m the **nominal annual decimal rate compounded m times per year**. Each period's rate is R_m/m, a dimensionless decimal; the period count is mt, also dimensionless. For complete periods under this convention,

    FV = A(1 + R_m/m)^(mt),
    A = FV(1 + R_m/m)^(−mt).

FV is the future value, in the same currency. Require 1 + R_m/m > 0. Integer mt literally counts compounding periods. Noninteger mt uses a fractional-power interpolation **only if that convention is stipulated**; actual contracts may treat partial periods differently. Discrete compounding is not simple interest A(1 + rt), except special matching cases such as one period.

**Worked example (supplemental).** A = £1,000, R_2 = 0.10/year, m = 2/year and t = 1.5 years. Period rate = 0.10/2 = 0.05; period count = 2 × 1.5 = 3. Amounts after each half-year: £1,050, £1,102.50, £1,157.625. Final FV = 1,000 × 1.05³ = £1,157.625, or £1,157.63 rounded to pennies **only at the end**. Reverse with the unrounded amount: 1,157.625/1.05³ = £1,000. Do not claim exact reversal after rounding the future amount to pennies.

Continuous compounding uses a possibly different annual decimal rate r:

    FV = A e^(rt),    A = FV e^(−rt).

The negative sign reverses time growth because e^(rt)e^(−rt) = e⁰ = 1. For A = £1,000, r = 0.06/year, t = 0.5 year: rt = 0.03, growth factor e^0.03 ≈ 1.030454534; FV ≈ £1,030.454534, or £1,030.45. Dividing the unrounded FV by e^0.03 recovers £1,000. With r = 0 the factor is 1. With a negative r and positive t the factor lies between 0 and 1: the mathematics permits decreasing balances. These examples exclude additional deposits/withdrawals, fees, default and taxes.

<a id="powers-solving"></a>
## 5. Solve an unknown rate or time

Suppose FV = A e^(rt), with A and FV positive and t > 0. Divide by A before applying ln:

    FV/A = e^(rt)
    ln(FV/A) = rt
    r = ln(FV/A)/t.

The ratio is dimensionless and r has inverse-time units. For unknown time instead, t = ln(FV/A)/r requires r ≠ 0. A resulting negative time may be mathematically consistent but inconsistent with a question requiring a future date. If r = 0, FV = A for every time, so time cannot be identified this way; FV ≠ A is impossible under that zero-rate, no-cash-flow model.

**Worked example (supplemental).** £1,000 becomes £1,210 in 2 years with continuous compounding and no intervening flows. Ratio = 1.21; ln(1.21) ≈ 0.190620360; r = 0.190620360/2 ≈ 0.095310180/year = 9.531018% annually continuous. Substitute: 1,000 × exp(2 × ln(1.21)/2) = 1,000 × 1.21 = £1,210. A 10% annual **discrete** rate produces the same two-year amount because 1.10² = 1.21; a different number on the quote can describe the same growth under a different convention.

<a id="powers-conversion"></a>
## 6. Equivalent rate quotes: match accumulation first

Two quotes are equivalent when they give the same growth over the same horizon under their stated conventions. Over one year, the continuous factor is e^r and the m-times-yearly factor is (1 + R_m/m)^m, where annual numerical rates and yearly period count are used in this shorthand. Set them equal and take ln:

    e^r = (1 + R_m/m)^m
    r = m ln(1 + R_m/m).

Conversely, divide the second equation by m, exponentiate, subtract 1 and multiply by m:

    r/m = ln(1 + R_m/m)
    e^(r/m) = 1 + R_m/m
    R_m = m[e^(r/m) − 1].

With units explicit, r/m and R_m/m are dimensionless, and multiplying by m restores a per-year quoted rate. The bracket is the **periodic** effective rate; R_m is the nominal annual quote, not the effective annual return. The effective annual return is the one-year factor minus 1: e^r − 1 = (1 + R_m/m)^m − 1.

**Worked source-motivated example.** R_2 = 0.10/year and m = 2/year give r = 2 ln(1.05) ≈ 0.097580328/year = 9.758033% annually continuous. One-year factor = 1.05² = 1.1025, so the effective annual return is 10.25%, different from both quote numbers. Check reverse: 2[exp(0.097580328…/2) − 1] = 0.10. The lecture rounds r to 0.09758 (9.758%); retain fuller precision for checks. Never silently carry a rate from one convention into another formula unchanged.

<a id="powers-practice"></a>
## Supplemental graded practice

1. **Powers:** Evaluate 4⁰, 4^(−1), 9^(1/2), 9^(3/2). Explain why 4^(−1) is not −4.
2. **Logs/domain:** Evaluate ln(e³), exp(ln 0.5), and ln(1). Is ln(−2) valid here? Why use ln(FV/A) rather than ln(FV with currency units)?
3. **Growth:** £500 grows at nominal 8% annually compounded quarterly for 1.5 years. State period rate/count and compute FV, rounding only at the end.
4. **Conversion:** Convert that nominal quote to annual continuous r, calculate its effective annual return, and check that continuous accumulation over 1.5 years matches question 3.
5. **Solve/teach-back:** A positive balance doubles under r = 0.05/year continuous growth. Find the time. Explain why negative rates, zero rates and a negative log input are three different issues.

<a id="powers-answer-powers"></a>
### Answer 1 — powers

4⁰ = 1; 4^(−1) = 1/4 = 0.25; 9^(1/2) = 3; 9^(3/2) = 3³ = 27. The negative exponent reverses multiplication by 4; it does not negate the value.

<a id="powers-answer-logs"></a>
### Answer 2 — inverse and domain

ln(e³) = 3, exp(ln 0.5) = 0.5, ln(1) = 0. The real ln(−2) is undefined. FV/A has cancelling currency units and is positive when both amounts are positive; taking the logarithm of a dimensionful currency amount has no meaning in these equations.

<a id="powers-answer-growth"></a>
### Answer 3 — repeated periods

R_4 = 0.08/year, m = 4/year, t = 1.5 years. Period rate = 0.08/4 = 0.02 and count = 4 × 1.5 = 6. FV = 500 × 1.02⁶ = £563.081209632, rounded £563.08. There are six quarterly periods, not 1.5 periods and not six years.

<a id="powers-answer-conversion"></a>
### Answer 4 — same growth, different quotations

r = 4 ln(1.02) ≈ 0.079210509/year = 7.921051% annually continuous. Effective annual return = 1.02⁴ − 1 = 0.08243216 = 8.243216%. Using unrounded r: 500 exp(1.5 × 4 ln(1.02)) = 500 exp(6 ln(1.02)) = 500 × 1.02⁶ = £563.081209632. The conversion is verified by accumulation, not by equality of quoted rate numbers.

<a id="powers-answer-teachback"></a>
### Answer 5 — time, diagnosis and retry

FV/A = 2, so t = ln(2)/0.05 ≈ 13.862943611 years. Check exp(0.05t) = 2 using unrounded t. A negative continuous rate gives decreasing positive accumulation, not a negative factor. At zero rate no positive time doubles a no-flow balance. A negative logarithm input is outside the real domain, whereas ln(0.5) < 0 is valid. If results explode, check that 5% was entered as 0.05. If growth fails to reverse, check the sign and whether you rounded too early. If equivalent quotes differ in growth, write the period rate and count before redoing the conversion. Teach back “log finds the exponent” using ln(e³), then the full time problem.

<a id="powers-evidence"></a>
## Evidence motivation and scope

- Lecture 3 physical p9, upper defining equation: [exponential limit](../../sources/annotated/lecture-3/page-009.md#lecture-3-p009-exponential-limit), [original p9](../../sources/assets/lecture-3/page-009.png). The inspected page also shows continuous accumulation, reverse discounting and their opposite exponent signs.
- Lecture 3 physical p10, middle paired boxed formulas: [conversion formulas](../../sources/annotated/lecture-3/page-010.md#lecture-3-p010-conversion-formulas), [original p10](../../sources/assets/lecture-3/page-010.png). Its lower example uses nominal 10% semiannual and r = 2 ln(1.05).

This bridge supplies elementary mathematics, not a claim about market investment returns or the applicability of a particular contractual rate. It does not import the separate printed-rate error on lecture 3 p11 as a correct example. Contract-specific partial periods and rate/day-count ambiguities require explicit conventions in the later financial lesson.
