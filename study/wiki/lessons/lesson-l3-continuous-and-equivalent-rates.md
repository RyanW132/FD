# Continuous compounding and equivalent rate quotations

<a id="status"></a>
**Unreviewed author draft; independent teaching review pending.** This lesson teaches the ten mapped substantive units on Lecture 3 physical pp9–11. Derivations, extra illustrations and answers are supplemental unless identified as source material. **The original p11 printed rates 10.15% and 10.41% are wrong for its stated growth.** They remain visible as source errors below, separately from recalculated answers; neither the source nor its issue status is rewritten. This is not investment advice or evidence of learner mastery.

<a id="motivation"></a>
## Why different rate numbers can describe the same growth

The [discrete-compounding lesson](lesson-l3-discrete-compounding.md#one-year-example) showed that keeping “10%” fixed while changing compounding can change the final balance. Here we ask the opposite question: **what number must change on the quotation to keep the balance the same?** Continuous compounding provides a compact way to express growth and discounting. Logarithms let us recover the rate from a starting and ending amount, and detect a wrong printed answer rather than trust its appearance.

Prerequisites: [discrete compounding](lesson-l3-discrete-compounding.md#outcomes), [powers and logarithms](../concepts/concept-exponents-and-logs.md#powers-outcomes), and [numeric foundations](../concepts/concept-numeric-foundations.md#numeric-rates). The necessary ideas are retaught below before use. No calculus or prior bond-pricing knowledge is assumed.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain continuous growth and equivalent quotes:** given a positive principal, a time in years and a stated quote convention, explain the repeated-factor limit, derive forward/backward continuous factors and both discrete/continuous conversion formulas, and distinguish nominal, periodic and effective annual rates. Success requires dimensionless exponent/log inputs, defined symbols, positive discrete base and an explanation of why equivalent quotes match accumulation rather than printed percentages.
2. **Calculate, audit and correct:** given dated positive starting/ending amounts or a rate quote, convert conventions, reconstruct the original growth and diagnose incompatible answers. In particular, reproduce both corrected p11 rates, distinguish the effective annual rate and demonstrate that both printed rates fail substitution. Success requires the correct time conversion, annual/periodic labels, results within 0.000001 percentage point when shown to six decimals, final money rounded to cents, and valid zero/negative-rate and zero-time reasoning.

**Readiness check:** What does 1.05² mean? Is 5% entered as 5 or 0.05? If unsure, answer “1.05 multiplied by itself” and “0.05” with the explanation in the next section before proceeding.

<a id="foundations"></a>
## 1. The mathematical vocabulary — supplemental bridge

A **power** abbreviates repeated multiplication: 1.05² = 1.05 × 1.05 = 1.1025. For a positive base b, b⁰ = 1 and b⁻ᵗ = 1/bᵗ. A negative exponent reverses growth; it does not make a positive balance negative. Fractional powers of positive bases extend these rules: b^(1/2) is its positive square root. We do not use fractional powers of nonpositive accumulation bases.

The positive constant **e** is approximately 2.718281828. **exp(x)** and **e^x** are two names for the exponential function. Its output is always positive; exp(0) = 1, and exp(u + v) = exp(u)exp(v). In particular exp(−x) = 1/exp(x). The input x is dimensionless. An annual decimal rate multiplied by years produces such an input.

The **natural logarithm ln(z)** asks, “Which exponent gives z when e is the base?” Its input must be a positive dimensionless number. Thus ln(exp(x)) = x, exp(ln(z)) = z, ln(1) = 0, and ln(exp(3)) = 3. The value ln(0.5) is negative but valid; ln(−0.5) and ln(0) are not real values. In finance, divide two amounts in the same currency before taking a logarithm; ln(FV/A) is meaningful, whereas ln of an amount carrying USD units is not.

For positive b, ln(b^n) = n ln(b). To see why, write b = exp(v), so b^n = exp(nv) and taking ln returns nv. There is no corresponding rule ln(a + b) = ln(a) + ln(b). For example, ln(1 + 1) = ln(2) ≈ 0.693147, whereas ln(1) + ln(1) = 0. Use the calculator's **ln**, not a base-10 log key without a justified conversion.

### Symbols, units and assumptions

| Symbol | Meaning and convention |
|---|---|
| A | Positive starting principal in the specified currency |
| FV, PV | Future value and present value, in that same currency |
| T | Elapsed time in years, T ≥ 0; not a calendar-date label here |
| r | Continuous annual decimal rate; 6% annually continuous means r = 0.06 per year |
| m | Positive integer number of discrete compounding periods per year |
| R_m | Nominal annual decimal quote with frequency m; subscript m labels the convention |
| i = R_m/m | Dimensionless return over one complete compounding period |
| n = mT | Dimensionless number of compounding periods |
| g = FV/A | Positive dimensionless growth ratio over the stated horizon |
| R_eff | Effective annual gain fraction, not the final one-year factor; ×100 expresses percent |

All models here retain interest, hold the specified rate constant for the horizon, exclude costs/default/intermediate cash flows and use one currency. $ is USD and £ is GBP; examples do not mix them. When months are supplied, we explicitly use **months/12**. Continuous formulas allow any nonnegative real T. Literal discrete multiplication requires whole n; a fractional-period interpolation is a separate stipulated convention, not an automatic property of a contract. Require **1 + R_m/m > 0** for the discrete and logarithmic formulas. Continuous r may be any finite real number.

<a id="exponential-limit"></a>
## 2. What the source's limit says

The source defines the exponential by

    exp(x) = limit as m → infinity of (1 + x/m)^m.

Here x is dimensionless and m is a positive integer index. The arrow and “infinity” mean taking larger and larger m and examining the value approached, not setting m equal to infinity in a calculator. [L3 physical p9, upper defining equation; `lecture-3-p009-exponential-limit`](../../sources/annotated/lecture-3/page-009.md#lecture-3-p009-exponential-limit).

**Supplemental accessible numerical illustration, x = 1:**

| m | Factor (1 + 1/m)^m |
|---:|---:|
| 1 | 2 |
| 2 | 2.25 |
| 10 | 2.593742460… |
| 100 | 2.704813829… |
| Limiting value | e ≈ 2.718281828… |

Each individual increase is smaller as m rises, but it happens more often. The table illustrates convergence; four rows alone are not a mathematical proof of the limit. With negative x, sufficiently large m makes 1 + x/m positive; do not assume every small m represents a permitted financial base.

<a id="accumulation-limit"></a>
## 3. From one year to T years

In the discrete factor (1 + r/m)^(mT), r is an annual numerical quote held fixed as m grows. Rewrite it as **[(1 + r/m)^m]^T**: first accumulate for one year, then raise that factor to the number of years. For a fixed T and positive bases, the one-year factor approaches exp(r), and its Tth power approaches exp(rT). This explains the source's limit:

    limit as m → infinity of (1 + r/m)^(mT) = exp(rT).

[L3 physical p9, middle equation; `lecture-3-p009-accumulation-limit`](../../sources/annotated/lecture-3/page-009.md#lecture-3-p009-accumulation-limit). The algebra explains how the one-year definition is used, not a rigorous proof of every limit theorem. In annual-number shorthand r appears alone in exp(r); with units restored, it means r multiplied by **one year**. Over T years the product rT is dimensionless.

**Important distinction:** the limiting argument holds the numerical quote r fixed and changes frequency. Converting a finite-frequency quote to an equivalent continuous quote instead changes the quoted number to preserve the same factor. These are different operations.

<a id="continuous-values"></a>
## 4. Future value and present value reverse one another

Multiply principal by the accumulation factor to move forward. To reverse, divide by that factor; exp(−rT) is its reciprocal:

    FV = A exp(rT)
    PV = FV/exp(rT) = FV exp(−rT).

These are the source's paired formulas. [L3 physical p9, lower boxed formulas; `lecture-3-p009-continuous-values`](../../sources/annotated/lecture-3/page-009.md#lecture-3-p009-continuous-values).

<a id="sign-check"></a>
The source emphasises the sign: forward uses **+rT**, backward uses **−rT**. [L3 physical p9, bottom sign-check box; `lecture-3-p009-sign-check`](../../sources/annotated/lecture-3/page-009.md#lecture-3-p009-sign-check). This is about reversing the time operation, not assuming rates are positive. For r < 0, forward accumulation is below one and discounting is above one; both factors remain positive. For r = 0 or T = 0, each factor equals one. Their product exp(rT)exp(−rT) = exp(0) = 1 is a reliable check.

<a id="continuous-example"></a>
### Worked forward/backward example — supplemental

Take 6% annually continuous for six months, using months/12. Thus r = 0.06, T = 0.5 year, and rT = 0.03.

- Starting from **£1,000 today**, FV = 1000 exp(0.03) ≈ **£1,030.4545339535**, rounded **£1,030.45**.
- For a **different** problem, a receipt of **£1,000 in six months**, PV = 1000 exp(−0.03) ≈ **£970.4455335485**, rounded **£970.45**.
- Reverse the first problem with its unrounded FV: [1000 exp(0.03)]exp(−0.03) = £1,000 exactly under the model. Do not expect exact reversal after rounding to pennies.

The two £1,000 inputs occur at different dates. Confusing which amount is today and which is future is more consequential than memorising the exponential notation.

<a id="equivalence"></a>
## 5. Equivalent means the same accumulation, not the same percentage

Choose one year as the common comparison horizon. The continuous factor is exp(r); the nominal m-times-yearly factor is (1 + R_m/m)^m. The source equates them:

    exp(r) = (1 + R_m/m)^m.

[L3 physical p10, upper equation; `lecture-3-p010-equivalent-accumulation`](../../sources/annotated/lecture-3/page-010.md#lecture-3-p010-equivalent-accumulation). They must describe the same currency, dates and assumptions. Equal one-year factors imply equal T-year factors in the same constant-rate models, subject to the stipulated treatment of any discrete partial periods. Matching numbers printed next to percent signs is not enough.

<a id="conversion"></a>
### Derive both conversion directions

**Discrete to continuous:** take ln of the positive one-year factors. The left becomes r; the logarithm of the right-hand power brings m in front:

    r = ln[(1 + R_m/m)^m] = m ln(1 + R_m/m).

**Continuous to nominal discrete:** divide by m, exponentiate to reverse ln, subtract one and multiply by m:

    r/m = ln(1 + R_m/m)
    exp(r/m) = 1 + R_m/m
    R_m = m[exp(r/m) − 1].

These are exactly the two source conversion formulas, with supplemental intermediate steps. [L3 physical p10, middle paired boxes; `lecture-3-p010-conversion-formulas`](../../sources/annotated/lecture-3/page-010.md#lecture-3-p010-conversion-formulas). The bracket exp(r/m) − 1 is the **periodic** return i. Multiplying by m annualises the nominal quote; it does not calculate the effective annual return. r/m and the logarithm's argument are dimensionless when frequency/time units are matched.

<a id="semiannual-example"></a>
### Source example: nominal 10%, semiannual

The source uses R_2 = 0.10 and m = 2. Periodic return = 0.10/2 = 0.05; one-year factor = 1.05² = 1.1025. Then

    r = 2 ln(1.05) ≈ 0.097580328338864 = 9.7580328338864% annually continuous.

The source displays **0.09758 or 9.758%**, a rounded version, not a different convention. [L3 physical p10, lower example; `lecture-3-p010-semiannual-example`](../../sources/annotated/lecture-3/page-010.md#lecture-3-p010-semiannual-example).

**Supplemental verification and distinction:** using unrounded r, exp(r) = 1.1025; reverse conversion gives 2[exp(r/2) − 1] = 0.10. The effective annual return is **R_eff = exp(r) − 1 = 0.1025 = 10.25%**. Thus 5% periodic, 10% nominal annual, about 9.758033% continuous annual and 10.25% effective annual are different descriptions of this same specified growth, not four amounts to add. Effective annual gain follows from final/initial minus one, as derived in the preceding lesson.

<a id="growth-question"></a>
## 6. Audit the source's growth question before trusting its answers

The actual p11 question is: an investment grows from **$5,000 to $5,800 in 18 months**; find the continuous annual rate and equivalent nominal annual rate with semiannual compounding. [L3 physical p11, upper exercise; `lecture-3-p011-growth-questions`](../../sources/annotated/lecture-3/page-011.md#lecture-3-p011-growth-questions).

Assume the growth contains no deposits, withdrawals, fees or default effects; use months/12. Then A = $5,000, FV = $5,800, T = 18/12 = **1.5 years**, m = 2 and n = 2 × 1.5 = **3 complete half-years**. The currency cancels in **g = 5800/5000 = 1.16**. This is a **16% total return over 18 months**, not automatically an annual rate.

<a id="printed-continuous"></a>
### Preserve the first printed error

The source prints the expression `(1/1.5) ln(5800/5000)` but equates it to **10.15%**. **That numerical equality is incorrect.** The expression is the correct setup under the stated time convention; its displayed evaluation is not. [L3 physical p11, first displayed solution; `lecture-3-p011-printed-continuous-solution`](../../sources/annotated/lecture-3/page-011.md#lecture-3-p011-printed-continuous-solution); [unchanged original image](../../sources/assets/lecture-3/page-011.png).

**Labelled authored correction:** start with FV/A = exp(rT). Take ln on both sides, then divide by T > 0:

    ln(FV/A) = rT
    r = ln(FV/A)/T = ln(1.16)/1.5
      ≈ 0.0989466700788488 per year
      = 9.89466700788488% annually continuous.

The division is by **1.5 years**, not 18, and the log input is 1.16, not 16 or 0.16. Using the unrounded rate, 5000 exp(1.5r) = **$5,800**. Using the wrong printed 10.15% gives 5000 exp(0.1015 × 1.5) ≈ **$5,822.26**, visibly not $5,800. This discrepancy is not cent rounding of the correct answer.

<a id="printed-semiannual"></a>
### Preserve the second printed error

The source next prints `R_2 = 2[exp(0.1015/2) − 1] = 10.41%`. Its input carries forward the wrong continuous rate, so **10.41% is not the equivalent rate for the stated investment growth**. [L3 physical p11, final displayed solution; `lecture-3-p011-printed-semiannual-solution`](../../sources/annotated/lecture-3/page-011.md#lecture-3-p011-printed-semiannual-solution).

**Labelled authored correction:** convert the freshly computed continuous rate, not the wrong printed one:

    R_2 = 2[exp(r/2) − 1]
        ≈ 0.1014351489971605
        = 10.14351489971605% nominal annually, semiannual compounding.

Half-year return i = R_2/2 ≈ **0.05071757449858025 = 5.071757449858025%**. Check independently with the **three periods**: (1 + i)³ = 1.16, so 5000(1 + R_2/2)³ = **$5,800**. Equivalently, solve directly for the positive cube root: 1 + i = 1.16^(1/3), then R_2 = 2[1.16^(1/3) − 1]. This avoids inheriting a rounded continuous input. Using printed 10.41% as a nominal quote instead gives 5000(1 + 0.1041/2)³ ≈ **$5,822.09**, also wrong for the stated growth.

<a id="corrected-summary"></a>
### Keep the four rate meanings separate

| Quantity for the p11 growth | Correct value (approximately) | What it measures |
|---|---:|---|
| Total growth over 18 months | 16% | 5800/5000 − 1, not annualised |
| Continuous annual r | 9.89466700788488% | Exponent coefficient per year |
| Half-year periodic i | 5.071757449858025% | One of the three equal half-year returns |
| Nominal annual R_2 | 10.14351489971605% | Twice the half-year return |
| Effective annual R_eff | 10.400742136017955% | exp(r) − 1, one year's gain fraction |

The effective annual rate is an **authored supplemental distinction**, not a third requested source answer. It also equals 1.16^(1/1.5) − 1 under the stated constant-rate model. Neither 10.15% nor 10.41% should be copied as a correct answer. The canonical source issue `source-l3-p011-printed-rate-error` remains open; this author's arithmetic does not close it or constitute independent teaching approval.

<a id="boundaries"></a>
## 7. Boundaries: valid negatives, zero rates and unidentifiable rates

- **Negative continuous rate:** r = −0.02 and T = 1 gives exp(−0.02) > 0 but below one. £1,000 today becomes approximately **£980.20**; a separate future £1,000 has PV ≈ **£1,020.20**. Equivalent semiannual nominal quote is 2[exp(−0.02/2) − 1] ≈ **−0.019900332501664**, or **−1.9900332501664%** annually; its periodic base is exp(−0.01) > 0. A negative rate is not an invalid negative log input.
- **Zero rate:** r = 0 makes exp(rT) = 1, gives R_m = 0 and R_eff = 0. No time-dependent gain occurs under the no-flow model.
- **Zero time:** T = 0 also makes accumulation one for every finite rate. If FV = A at T = 0, **the rate cannot be inferred**: every finite r fits. If FV ≠ A at T = 0, the no-flow model is inconsistent. Do not calculate ln(FV/A)/0.
- **Other inversion conditions:** A and FV must be positive for ln(FV/A); an unknown-time formula T = ln(FV/A)/r requires r ≠ 0. Its result must satisfy the problem's T ≥ 0 requirement. A zero rate with unchanged principal cannot identify a unique time.
- **Discrete domain:** m is a positive integer and 1 + R_m/m > 0. At R_2 = −2 (−200% nominal annual), the base is zero and ln(base) is undefined. A negative base is also outside the real log-based convention even if an integer power can be evaluated algebraically.
- **Partial periods:** 18 months has three half-years here. One month is not a complete quarter; matching a continuous quote does not silently authorise a fractional-quarter contract convention.

<a id="practice"></a>
## Progressive practice — supplemental unless a source question is identified

<a id="exercise-foundations-prompt"></a>
### 1. Decode the mathematics (outcome 1)
Evaluate exp(0), ln(exp(3)) and exp(ln(0.5)). Explain why ln(−0.5) is invalid, why a negative logarithm result can be valid, and why ln(FV/A) needs amounts in the same currency. [Answer](#exercise-foundations-answer).

<a id="exercise-limits-prompt"></a>
### 2. Explain the limit and signs (outcome 1)
Describe what m → infinity means in p9, why the T-year factor has exponent mT, and why reversing growth uses exp(−rT). Does a negative r produce negative money from a positive principal? [Answer](#exercise-limits-answer).

<a id="exercise-conversion-prompt"></a>
### 3. New equivalent quote (outcomes 1–2)
A nominal annual 8% quote compounds quarterly. Find its continuous annual equivalent and effective annual return. State the periodic rate, check equal one-year factors and explain why the continuous quote is not 8%. [Answer](#exercise-conversion-answer).

<a id="exercise-correction-prompt"></a>
### 4. Audit the source question (outcome 2)
Using the source $5,000 → $5,800 in 18 months and months/12, reproduce r, R_2 and the distinct R_eff. State the correct time and period count, show a substitution check and explain why the printed 10.15% and 10.41% fail. [Answer](#exercise-correction-answer).

<a id="exercise-transfer-prompt"></a>
### 5. Transfer forward/backward reasoning (outcome 2)
At 4% annually continuous for 18 months, months/12, find the FV of £800 today and, separately, the PV of £800 due then. No flows/costs/default. Show the exponent and inverse check without rounding intermediate values. [Answer](#exercise-transfer-answer).

<a id="exercise-boundaries-prompt"></a>
### 6. Decide whether inversion is valid (outcome 2)
Can you infer a unique r when (a) A = FV = £500 and T = 0; (b) A = £500, FV = £510 and T = 0; (c) A = FV = £500 and T = 2 years? Is nominal −200% semiannual convertible using ln? Explain each, without dividing by zero. [Answer](#exercise-boundaries-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach the conversion (outcome 1)
Explain exp and ln as inverses; derive both conversion formulas from equal one-year accumulation. Use the source nominal 10% semiannual example to distinguish periodic, nominal, continuous and effective annual rates. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Teach a source-error audit (outcome 2)
A friend says, “The slide gives 10.15%, so use it; 18 months means T = 18, and 10.41% must be an effective annual return.” Correct the reasoning using the actual inputs, a substitution check and the labelled corrected rates. State one limitation of what this calculation proves. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## Supplemental answers — separate from the source's incorrect printed answers

<a id="exercise-foundations-answer"></a>
### Answer 1
exp(0) = **1**, ln(exp(3)) = **3**, exp(ln(0.5)) = **0.5**. ln requires positive input, so ln(−0.5) is undefined over the reals; ln(0.5) is valid and negative because exp of a negative number lies between zero and one. FV/A cancels currency units only when the amounts use the same currency. If you confuse input sign with output sign, retry by asking which exponent produces 0.5.

<a id="exercise-limits-answer"></a>
### Answer 2
Take successively larger positive integer frequencies; the limit is approached, not a finite-frequency posting instruction. m periods/year × T years counts mT periods. The reciprocal of exp(rT) is exp(−rT), so forward then backward multiplication gives one. Negative r decreases the forward positive factor below one; it does **not** make it negative. If the explanation jumps straight to a formula, first describe two successive periods before taking the limit.

<a id="exercise-conversion-answer"></a>
### Answer 3
R_4 = 0.08, m = 4, i = **0.02**. r = 4 ln(1.02) ≈ **0.079210509184719**, or **7.9210509184719%** annually continuous. The common one-year factor is 1.02⁴ = **1.08243216** = exp(r) using unrounded r. R_eff = **0.08243216 = 8.243216%**. Reusing 8% as the continuous quote would change the factor. If you gave 2% as the annual rate, distinguish the periodic return from the annualised quote.

<a id="exercise-correction-answer"></a>
### Answer 4
T = 18/12 = **1.5 years**, m = 2, n = **3** and g = **1.16**. Correct r = ln(1.16)/1.5 ≈ **0.0989466700788488**; R_2 = 2[exp(r/2) − 1] ≈ **0.1014351489971605**; R_eff = exp(r) − 1 ≈ **0.10400742136017955**. As percentages these are **9.894667% continuous**, **10.143515% nominal annual semiannual** and **10.400742% effective annual** when rounded to six decimals. With unrounded inputs, 5000 exp(1.5r) = 5000(1 + R_2/2)³ = **5800**. Printed rates instead imply about **$5,822.26** and **$5,822.09**. If the final amount fails to reproduce $5,800, recheck time units, quote labels and whether a wrong or prematurely rounded input was used.

<a id="exercise-transfer-answer"></a>
### Answer 5
T = 18/12 = **1.5 years**, r = **0.04**, rT = **0.06**. FV = 800 exp(0.06) ≈ **£849.4692372363**, rounded **£849.47**. Separate PV = 800 exp(−0.06) ≈ **£753.4116268674**, rounded **£753.41**. The factors multiply to exp(0) = 1; using the unrounded FV and discounting at −0.06 returns £800. If both answers were above £800, you used the forward sign twice.

<a id="exercise-boundaries-answer"></a>
### Answer 6
(a) Every finite rate gives factor one at zero time, so no unique r is identifiable. (b) The stated no-flow model is inconsistent: it cannot turn £500 into £510 instantly. (c) With positive time, r = ln(1)/2 = **0** is identifiable under this constant-rate model. At −200% nominal semiannual, R_2 = −2, base = 1 − 2/2 = **0**; ln(0) is invalid, so reject that conversion. A valid negative continuous rate is a different case and must not be rejected merely for being negative.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — model checklist
ln reverses exp on positive dimensionless factors. Equal one-year factors give exp(r) = (1 + R_m/m)^m. Take ln to obtain r = m ln(1 + R_m/m), or isolate the period factor and subtract one to obtain R_m = m[exp(r/m) − 1]. In the source example, 5% per half-year gives 10% nominal annually, about 9.758033% annually continuous and 10.25% effective annual. All reproduce the same one-year factor 1.1025. The log input/periodic base must be positive; m must be positive. If the four rates seem contradictory, state what interval and quotation rule each describes.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8 — model checklist
The original is evidence to inspect, not an infallible numerical oracle. Use T = **1.5 years**, ratio **1.16** and no-flow assumptions; the correct continuous rate is about **9.894667%**, not printed 10.15%. The correct nominal semiannual quote is about **10.143515%**, while **10.400742%** is the separate effective annual rate. Printed 10.41% is labelled nominal semiannual in the source, not effective annual, and is wrong for these inputs. Substitute unrounded corrected rates to recover $5,800; the wrong rates overshoot. This validates model arithmetic, not a real investment opportunity, source-issue closure or independent lesson approval. If one number is correct but its label is wrong, the outcome is not yet satisfied.

<a id="stop"></a>
## Stop and check

Give your own derivation and source audit from exercises 7–8. A tutor should diagnose time conversion, logarithm domain, rate label and substitution separately, then offer a simpler retry on the missed step. Keep learner responses private. Next: [zero rates and maturity-specific discount factors](lesson-l3-zero-rates-and-discounting.md#outcomes). Reading a corrected answer is not proof of learning.

<a id="evidence"></a>
## Original evidence and preserved caveat

All ten mapped units are cited precisely above. Full normalized/raw pp9–11 were read and all three original PNGs displayed, checking sign, power scope and both erroneous printed rates. Canonical units are verified for source fidelity; their verification preserves the error rather than approving the printed arithmetic. Original bytes are unchanged. The issue remains open; corrections and explanations are authored teaching awaiting independent review.

| Physical page | Full normalized evidence | Raw evidence | Original image |
|---|---|---|---|
| 9 | [Page 9](../../sources/annotated/lecture-3/page-009.md) | [Raw 9](../../sources/extracted/lecture-3/page-009.md#page-9) | [Original 9](../../sources/assets/lecture-3/page-009.png) |
| 10 | [Page 10](../../sources/annotated/lecture-3/page-010.md) | [Raw 10](../../sources/extracted/lecture-3/page-010.md#page-10) | [Original 10](../../sources/assets/lecture-3/page-010.png) |
| 11 | [Page 11](../../sources/annotated/lecture-3/page-011.md) | [Raw 11](../../sources/extracted/lecture-3/page-011.md#page-11) | [Original 11](../../sources/assets/lecture-3/page-011.png) |
