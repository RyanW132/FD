# Quoted rates, compounding and present value

<a id="status"></a>
**Unreviewed author draft — not canonical teaching approval or evidence of learner mastery.** Scope: Lecture 3 physical pp6–8, all eight mapped substantive units. Source formulas and figures are identified precisely. Derivations, extra examples, exercises and answers are supplemental teaching, not official supplied solutions. The p6 continuous comparison is included because it is part of the owned source example; full continuous-rate conversion is a later topic. No p11 printed-rate answer is imported here.

<a id="motivation"></a>
## A percentage is only part of the instructions

Two accounts can both say “10% per annum” yet end the year with different balances. The missing instruction is how often interest is added and starts earning further interest. **Per annum** means per year. We will first build a repeated-growth calculation one period at a time, then learn how to reverse it and compare different quotation conventions.

Prerequisites: [dated cash flows and rate types](lesson-l3-rates-and-benchmarks.md#outcomes), [percentages and units](../concepts/concept-numeric-foundations.md#numeric-rates). The necessary powers are explained below before use; [powers and logarithms](../concepts/concept-exponents-and-logs.md#powers-rules) offers a fuller optional bridge. No logarithms are needed for the discrete calculations in this lesson.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain and derive the convention:** given a nominal annual quote and frequency, identify periodic rate and period count; explain interest on interest; derive future value, reverse it to present value, and derive effective annual return from one-year growth. Reproduce the source's annual/semiannual comparison and describe the continuous comparison as a distinct convention. Success requires correct symbols, positive-base domain, units and reasoning, including why a negative exponent is a reciprocal rather than a negative amount.
2. **Calculate and check dated values:** given a principal or future payment, annual decimal quote, frequency and complete-period horizon, compute FV, PV and effective annual return with intermediate steps; reconstruct all five source table rows; check zero/negative-rate cases and reject an invalid base or unspecified partial-period convention. Money must be correct to the penny after final-only rounding, and requested percentage rates within 0.000001 percentage point when six decimals are shown.

**Readiness check:** 10% = what decimal? How many half-years are in one year? If you answered 0.10 and two, you can start. Otherwise use the foundation immediately below rather than guessing a calculator expression.

<a id="foundations"></a>
## 1. Foundations before formulas — supplemental bridge

### Percent, period and power

10% means 10/100 = **0.10**, not 10. The **principal** is the starting balance. Earning 5% on $100 adds $5 and multiplies the balance by 1.05. Interest retained in the balance earns interest next time: $105 × 1.05 = $110.25. This is **compounding**. If the second interest payment were instead calculated only on the original $100, the process would be simple interest, not the compounding model used here.

A **power** abbreviates repeated multiplication. 1.05² means 1.05 × 1.05 = 1.1025, not 1.05 × 2. With positive base b and whole-number count n, bⁿ means n factors of b. The plain-text notation `b^n` means the same thing. b⁰ = 1 corresponds to no elapsed periods. b⁻ⁿ = 1/bⁿ reverses those multiplications; the minus sign belongs to the exponent, not the resulting money amount. For example 1.05⁻² = 1/1.1025, a positive number below one. We require b > 0 throughout this financial accumulation model.

### Symbols and conventions used throughout

| Symbol | Meaning | Unit/convention |
|---|---|---|
| A | Principal invested today, also present value when reversing growth | Positive amount in one specified currency |
| FV | Future value at the end of the horizon | Same currency as A |
| PV | Present value of a stated future amount | Same currency as FV |
| T | Elapsed time from today to payment | Years, not a calendar-date label |
| m | Compounding frequency | Positive integer periods per year; 1 annual, 2 semiannual, 4 quarterly, 12 monthly, 365 daily in the source table |
| R_m | Nominal annual decimal quote for frequency m | For example R_4 = 0.08 means 8% nominal annually, quarterly compounding |
| i = R_m/m | Decimal interest return for one complete period | Dimensionless per-period fraction |
| n = mT | Number of compounding periods | Dimensionless count; a whole number for the literal repeated-period examples |
| b = 1 + i | One-period accumulation factor | Dimensionless and strictly positive |
| R_eff | Effective annual return | Dimensionless one-year gain divided by initial principal; multiply by 100 for percent |

The subscript m labels the quotation convention: R_4 is not R multiplied by four. When handling units explicitly, nominal R_m is per year and m is periods/year, so their ratio supplies the return for one period; multiplying m by years counts periods. In conventional shorthand we write numerical annual rates and the number of periods in one year in the formulas.

Assume a constant specified quote throughout the horizon, all interest retained, no added/withdrawn money, no fees/taxes/default and a common currency. $ amounts below are USD; exercises explicitly labelled £ use GBP separately, with no exchange conversion. T ≥ 0. Use equal months/12 only when stated. R_m may be negative if **1 + R_m/m > 0**. A rate name alone never supplies this convention.

<a id="quote-warning"></a>
## 2. Read the complete quote

The source warns that the quoted rate alone cannot determine terminal value: compounding convention must be stated. **Nominal annual** describes an annualised quotation divided across the stated periods; it is not necessarily the actual one-year percentage increase. [L3 physical p6, opening and closing paragraphs; `lecture-3-p006-quotation-convention`](../../sources/annotated/lecture-3/page-006.md#lecture-3-p006-quotation-convention).

A useful input checklist is **principal/currency → nominal or effective quote → compounding frequency → time basis/horizon → other cash flows**. If frequency is missing, do not quietly assume annual compounding. If a rate is already effective annual, do not treat it as nominal quarterly merely because payments are quarterly.

<a id="one-year-example"></a>
### Source one-year investment: $100 at a quoted 10%

The source compares three conventions for one year. Here is the accessible comparison, with supplemental steps. [L3 physical p6, one-year investment box; `lecture-3-p006-one-year-example`](../../sources/annotated/lecture-3/page-006.md#lecture-3-p006-one-year-example).

| Convention for the numerical 10% annual quote | How the year accumulates | End-of-year value |
|---|---|---:|
| Annual | One multiplication by 1 + 0.10 | $110.00 |
| Semiannual | Two multiplications by 1 + 0.10/2 = 1.05 | $110.25 |
| Continuous | Continuous factor exp(0.10), explained next | $110.52, rounded |

**Annual:** one year's interest is 100 × 0.10 = $10; add the $100 principal to obtain $110. This one-year result is also the simple-interest result for that one year; it does not mean simple interest and compounding agree for arbitrary longer horizons.

**Semiannual:** m = 2 means two six-month periods. Each period's rate is 0.10/2 = 0.05 = 5%, not 10%. After six months the balance is $105. The second period earns 0.05 × $105 = $5.25, so the year ends at $110.25. Of the extra $0.25 compared with annual compounding, all is interest on the first $5 interest. Multiplying 100 × 1.05 × 1.05 verifies the source's square.

<a id="continuous-comparison"></a>
### Bounded continuous comparison — explain the source's third row

The symbol **e** is a mathematical constant approximately 2.718281828. **exp(x)** and **e^x** name the same exponential function. For a fixed dimensionless annual numerical rate x over one year, exp(x) is the limiting factor approached by (1 + x/m)^m as the positive integer frequency m increases without bound. “Limit” means the approached value, not a literal instruction to type infinity into a calculator or a claim that a bank physically posts infinitely many payments.

Thus for the **continuous annual decimal quote** r = 0.10 and exactly one year, exp(0.10) ≈ 1.105170918. Multiplying $100 gives $110.5170918…, rounded **$110.52**. A calculator's exp key evaluates this function; it does not mean multiply 2.718… by 0.10. The exponential definition is a supplemental bridge supporting the p6 displayed formula, not a full proof of the limit or a derivation of later rate-conversion identities.

The three rows hold the **printed number 10%** fixed, not the economic growth. They are therefore not three equivalent rate quotes. Also, daily compounding can round to the same cents as continuous compounding without being exactly equal. We return to that distinction in the table. Detailed continuous compounding is the planned next lesson, not an unexplained prerequisite for the discrete formulas.

<a id="future-value"></a>
## 3. Derive discrete future value from repeated periods

At the end of one period, balance = A(1 + i). The next period applies the same factor to that whole balance, giving A(1 + i)(1 + i) = A(1 + i)². After n periods there are n copies of the factor. Substitute i = R_m/m and n = mT:

    FV = A(1 + R_m/m)^(mT).

The source prints this formula with exponent **mT**, covering the whole parenthesised base. [L3 physical p7, upper definition and boxed formula; `lecture-3-p007-future-value`](../../sources/annotated/lecture-3/page-007.md#lecture-3-p007-future-value).

**Plain-language reading:** future money = today's money × one-period factor raised to the number of periods. Divide the nominal annual rate by m to get a periodic rate; multiply time in years by m to count periods. Those two different operations are both necessary. For annual compounding m = 1, write the annual decimal rate as R_1; this reduces to **FV = A(1 + R_1)^T**, with complete years for the literal repeated-period derivation.

The formula is linear in principal under these assumptions: twice the principal doubles the balance because the accumulation factor is unchanged. Positive rates and positive time produce growth above principal; zero time gives the starting balance.

<a id="quarterly-example"></a>
### Fully worked source example: quarterly for two years

The source invests **$1,000 at 8% nominal annually, compounded quarterly, for two years**. [L3 physical p7, lower example; `lecture-3-p007-quarterly-example`](../../sources/annotated/lecture-3/page-007.md#lecture-3-p007-quarterly-example).

1. A = $1,000; R_4 = 0.08; m = 4 periods/year; T = 2 years.
2. Period rate i = 0.08/4 = **0.02 = 2% per quarter**.
3. Number of quarters n = 4 × 2 = **8**, not two or four.
4. Factor = 1.02⁸ = **1.1716593810022656**.
5. FV = 1000 × 1.1716593810022656 = **$1,171.6593810022656**, rounded only at the end to **$1,171.66**, matching the original.

Supplemental period ledger (retain the full values, even when more than two decimals occur):

| Completed quarters | Balance (USD, unrounded) |
|---:|---:|
| 0 | 1000 |
| 1 | 1020 |
| 2 | 1040.4 |
| 3 | 1061.208 |
| 4 | 1082.43216 |
| 5 | 1104.0808032 |
| 6 | 1126.162419264 |
| 7 | 1148.68566764928 |
| 8 | 1171.6593810022656 |

Each row equals the previous one multiplied by 1.02. A simple-interest comparison, explicitly a **different** convention, would give 1000(1 + 0.08 × 2) = $1,160. The compounded value is higher because earlier interest also grows. This comparison is a reasonableness check, not permission to replace the stated compounding model.

<a id="present-value"></a>
## 4. Reverse growth to obtain present value

Suppose the future amount is known and we need today's equivalent. Starting from FV = A bⁿ, divide both sides by the positive factor bⁿ:

    PV = A = FV/b^n = FV × b^(−n)
       = FV(1 + R_m/m)^(−mT).

This is the source's present-value formula. [L3 physical p7, middle boxed formula; `lecture-3-p007-present-value`](../../sources/annotated/lecture-3/page-007.md#lecture-3-p007-present-value). A negative exponent means division by accumulated growth, not negative present value. Under a positive rate and positive time, the factor bⁿ exceeds one, so PV is less than FV. Multiplying the unrounded PV by the same factor must recover the future amount.

<a id="pv-example"></a>
### Worked reversal — supplemental

Find the present value of a certain **$1,000 received two years from today**, at the same nominal 8% quarterly convention, no other flows/costs. Keep the future amount distinct from the prior example's initial $1,000.

- R_4 = 0.08, m = 4, T = 2, so b = 1.02 and n = 8.
- PV = 1000/1.02⁸ ≈ **$853.4903711901115**, or **$853.49** rounded.
- Check with the unrounded amount: (1000/1.02⁸) × 1.02⁸ = $1,000.
- Discounting the source example's **unrounded** $1,171.6593810022656 instead returns exactly $1,000. Discounting its printed rounded $1,171.66 returns about $1,000.0005283, not exactly $1,000; the tiny difference is rounding, not a failure of the inverse.

Do not round to cents after every quarter unless a contract explicitly requires that separate rounding convention. Do not claim exact inverse equality after replacing an input by its rounded display.

<a id="effective-rate"></a>
## 5. Effective annual return: compare one year's actual growth

A return fraction is **gain divided by starting principal**, not the final balance divided by principal. Over exactly one year, set T = 1 in the future-value formula and divide by A > 0. The one-year factor is (1 + R_m/m)^m. Subtract the original principal's share, 1:

    R_eff = (FV − A)/A = FV/A − 1
          = (1 + R_m/m)^m − 1.

The last expression is the source formula. [L3 physical p8, lower definition and equation; `lecture-3-p008-effective-annual-rate`](../../sources/annotated/lecture-3/page-008.md#lecture-3-p008-effective-annual-rate). R_eff is dimensionless; multiplying it by 100 expresses a percentage. It states one year's realised model growth at the assumed fixed rate, not an additional payment on top of nominal interest.

<a id="effective-example"></a>
### Source example: nominal 10%, semiannual

R_2 = 0.10, m = 2. Each half-year earns 5%. One-year factor = 1.05² = 1.1025; subtract 1 to get **0.1025**, or **10.25% effective annual**. For $100, gain is $10.25 and 10.25/100 = 0.1025 checks the rate. [L3 physical p8, last sentence; `lecture-3-p008-effective-example`](../../sources/annotated/lecture-3/page-008.md#lecture-3-p008-effective-example).

The difference between 10.25% effective and the nominal 10% is **0.25 percentage point**, not a 0.25% relative change in the quoted rate. Do not insert 10.25 into a decimal formula: its decimal is 0.1025. An annual single-period quote of 10.25% would reproduce the same one-year factor, but merely keeping “10%” unchanged under another convention would not.

<a id="frequency-table"></a>
## 6. Reconstruct every row of the source frequency table

The original table has columns compounding, m and value of $100 after one year; all five rows retain the p6 **10% nominal annual** example. The last three columns below are supplemental calculation aids, not extra printed source columns. Keep the same principal, annual nominal quote, one-year horizon and no-cost assumptions throughout. [L3 physical p8, upper table; `lecture-3-p008-frequency-table`](../../sources/annotated/lecture-3/page-008.md#lecture-3-p008-frequency-table).

| Compounding | m (periods/year) | Source final USD | Period decimal i = 0.10/m | One-year factor (approx.) | Effective annual return (approx.) |
|---|---:|---:|---:|---:|---:|
| Annual | 1 | $110.00 | 0.10 | 1.100000000 | 10.000000% |
| Semiannual | 2 | $110.25 | 0.05 | 1.102500000 | 10.250000% |
| Quarterly | 4 | $110.38 | 0.025 | 1.103812891 | 10.381289% |
| Monthly | 12 | $110.47 | 0.008333333… | 1.104713067 | 10.471307% |
| Daily | 365 | $110.52 | 0.000273972603… | 1.105155782 | 10.515578% |

For example, quarterly i = 0.025 = 2.5% per quarter; n = 4 × 1 = 4. Then 100 × 1.025⁴ = **$110.3812890625**, which rounds to $110.38. Monthly means 12 smaller periods, not 12 years: use the unrounded 0.10/12 in (1 + 0.10/12)¹², yielding **$110.4713067441…**. Daily uses the source's 365 equally modelled periods: 100(1 + 0.10/365)³⁶⁵ ≈ **$110.5155781616**. This is a table convention, not a universal actual-day or leap-year rule.

The balance rises across these rows when the positive **nominal quote is held fixed**, because interest is added sooner. It does not rise by a fixed amount each row. The continuous p6 value is about $110.5170918076, so it exceeds the daily value by about **$0.0015136459**; both round to $110.52. Equal rounded output does not prove equal conventions. If instead equivalent quotes were chosen to hold the one-year factor fixed, changing frequency would not change that factor.

<a id="boundaries"></a>
## 7. Zero, negative and invalid rates; incomplete periods

These are supplemental domain checks, not additional source examples.

- **Zero quote:** R_m = 0 gives b = 1, so FV = A and PV = FV for every allowed T; effective annual return is zero. Interest frequency alone creates no return.
- **Zero time:** T = 0 gives n = 0 and b⁰ = 1, so today's amount equals today's value for any permitted base.
- **Negative quote with positive base:** take A = £1,000, R_2 = −0.02 nominal annually, m = 2 and T = 1 year. The period return is −0.01, b = 0.99, and FV = 1000 × 0.99² = **£980.10**. Effective annual return = 0.9801 − 1 = **−0.0199 = −1.99%**. The model shrinks a positive balance; it does not produce a negative balance. A future £1,000 would have PV = 1000/0.9801 ≈ **£1,020.3040506071**, rounded **£1,020.30**. Thus “PV is always below FV” is false; it depends on rate sign and time.
- **Invalid accumulation base:** R_2 = −2.00 means −200% nominal annually, not −2%. With m = 2, b = 0. The inverse requires division by zero, so our positive-base model rejects it. R_2 below −2 produces a negative base and is also outside this lesson's financial convention, even when an integer power happens to be algebraically computable.
- **Partial periods:** with months/12, 18 months = 1.5 years; semiannual n = 2 × 1.5 = 3 complete periods. By contrast, one month at quarterly frequency gives n = 4 × (1/12) = 1/3 period, not a complete quarter. A fractional power could be used only if an interpolation convention is explicitly stipulated; real contracts can handle partial periods differently. Do not silently choose it from the displayed formula.

<a id="misconceptions"></a>
## Common mistakes and how to detect them

| Mistake | Check that catches it |
|---|---|
| Entering 8 instead of 0.08 | Write 8/100 before substituting |
| Using 8% each quarter for a nominal annual 8% | Divide by four; period rate must be 2% |
| Using exponent T rather than mT | Count periods on a timeline: two years has eight quarters |
| Using simple-interest addition for repeated growth | Compute the second interest payment on the updated balance |
| Negating FV to discount | Negative exponent is reciprocal; positive cash value stays positive with positive base |
| Reporting factor 1.1025 as 1.1025% | Subtract one first, then multiply by 100: 10.25% |
| Claiming daily equals continuous exactly | Compare unrounded factors, not cents |
| Mixing currencies or dates | Label the amount, its currency and its date on every line |

<a id="practice"></a>
## Progressive supplemental practice

All questions and answers here are authored supplements using the cited source formulas. Try the prompts before opening their separate answers. State assumptions and conventions, not just numbers.

<a id="exercise-periods-prompt"></a>
### 1. Decode a quote (outcome 1)
A nominal annual rate of 12% compounds monthly for six months, using months/12. State decimal annual quote, m, T, period return and period count. Explain why the exponent is neither 6 years nor 12 periods. [Answer](#exercise-periods-answer).

<a id="exercise-compare-prompt"></a>
### 2. Explain the source comparison (outcome 1)
Rebuild $100 at 10% for one year with annual and semiannual compounding by listing the balances. Explain the extra $0.25. What does exp(0.10) mean in the continuous row, and does its $110.52 rounded result make the three quotes equivalent? [Answer](#exercise-compare-answer).

<a id="exercise-fv-prompt"></a>
### 3. Transfer the growth calculation (outcome 2)
£500 grows for 18 months, using months/12, at 8% nominal annually compounded quarterly, no cash movements/costs/default. Compute the number of periods, unrounded FV and rounded FV. Compare with £500 under simple interest at 8% annually for the same time, explicitly a separate model. [Answer](#exercise-fv-answer).

<a id="exercise-pv-prompt"></a>
### 4. Reverse a future payment (outcome 2)
A certain £1,500 is due 18 months from today. Use 10% nominal annually compounded semiannually, months/12 and no costs/intermediate flows. Find PV to pennies and verify by forward accumulation with the unrounded PV. [Answer](#exercise-pv-answer).

<a id="exercise-frequency-prompt"></a>
### 5. Reconstruct the table and effective returns (outcomes 1–2)
For $100 over one year at nominal 10%, calculate final value for m = 1, 2, 4, 12, 365 and effective annual return for every row. Use cents for values and six decimal places for percentages. Show how factor, decimal return and percentage differ. Explain why equal rounded daily/continuous money does not establish equality. [Answer](#exercise-frequency-answer).

<a id="exercise-domain-prompt"></a>
### 6. Boundary challenge (outcome 2)
Find FV of £200 for one year at nominal −4% with semiannual compounding, then its effective annual return. What is FV at zero rate for two years, and at zero time with the negative rate? Reject or accept the base for −200% nominal semiannual. Finally, does one month under a quarterly quote give a complete period? [Answer](#exercise-domain-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach the derivation (outcome 1)
Explain to a beginner why the rate is divided by m but time is multiplied by m. Derive FV by repeated multiplication, PV by reversing it, and R_eff by measuring one-year gain. Include one sign/domain caution and the meaning of a negative exponent. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Diagnose and verify (outcome 2)
A learner writes “$1,000 at nominal 8% quarterly for two years gives 1000(1 + 8)^2; present value is always smaller than future value; daily and continuous 10% are identical because both give $110.52.” Correct all three claims. Show the correct source FV to cents and use the lesson's negative-rate example to challenge “always.” [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## Supplemental answers and feedback

<a id="exercise-periods-answer"></a>
### Answer 1
R_12 = **0.12**, m = **12 periods/year**, T = 6/12 = **0.5 year**. i = 0.12/12 = **0.01 = 1% per month**; n = 12 × 0.5 = **6 monthly periods**. Six months is not six years; twelve is the annual frequency, not the period count for this half-year. Retry by writing the cancellation “periods/year × years” if these quantities were confused.

<a id="exercise-compare-answer"></a>
### Answer 2
Annual: $100 → $110 after one 10% period. Semiannual: $100 → $105 → $110.25, with 5% each half-year. The second $5.25 interest includes $0.25 earned on the first $5. exp(0.10) is the continuous one-year factor ≈ 1.105170918, not 0.10 × e. Its $110.5170918… rounds to $110.52. The three fixed numerical 10% quotes give different growth, so they are not equivalent. If you used 10% every half-year, retry the nominal-to-period division before multiplying balances.

<a id="exercise-fv-answer"></a>
### Answer 3
T = 18/12 = **1.5 years**, m = 4, R_4 = 0.08, i = **0.02**, n = **6 quarters**. FV = 500 × 1.02⁶ = **£563.081209632**, rounded **£563.08**. Separate simple-interest value = 500(1 + 0.08 × 1.5) = **£560**. The unrounded difference is £3.081209632, from interest on interest. The larger compound amount is plausible for this positive rate and retained interest. If you got eight quarters, distinguish this 18-month exercise from the source's two-year example.

<a id="exercise-pv-answer"></a>
### Answer 4
T = 18/12 = **1.5 years**, m = 2, R_2 = 0.10. i = **0.05**, n = **3**, factor = 1.05³ = **1.157625**. PV = 1500/1.157625 ≈ **£1,295.7563977972**, rounded **£1,295.76**. Check with unrounded PV: (1500/1.05³) × 1.05³ = £1,500. Positive growth over positive time makes PV smaller. Using the rounded PV in the check introduces a rounding difference; do not label it exact. If PV exceeded £1,500 here, you probably multiplied instead of divided.

<a id="exercise-frequency-answer"></a>
### Answer 5
For each m, compute f = (1 + 0.10/m)^m, then final value = 100f and R_eff = f − 1. Here f is a supplemental name for the dimensionless one-year factor.

| m | Rounded final USD | Decimal effective return (approx.) | Effective percent, six decimals |
|---:|---:|---:|---:|
| 1 | $110.00 | 0.100000000 | 10.000000% |
| 2 | $110.25 | 0.102500000 | 10.250000% |
| 4 | $110.38 | 0.103812891 | 10.381289% |
| 12 | $110.47 | 0.104713067 | 10.471307% |
| 365 | $110.52 | 0.105155782 | 10.515578% |

For the semiannual row, factor 1.1025 includes the original 1; gain fraction is 0.1025; percentage is 10.25%. Daily factor ≈ 1.105155782 is below continuous factor ≈ 1.105170918. Their rounded cents hide the difference. If your percent exceeds 100% here, check whether you forgot to subtract the original principal's share.

<a id="exercise-domain-answer"></a>
### Answer 6
R_2 = −0.04, m = 2, T = 1; i = −0.02, b = 0.98 > 0, n = 2. FV = 200 × 0.98² = **£192.08**. R_eff = 0.9604 − 1 = **−0.0396 = −3.96%**. At zero rate for two years FV = **£200**; at zero time with the valid negative rate FV is also **£200**. At −200% nominal semiannual, R_2 = −2, so b = 1 − 2/2 = 0: reject the base because the model requires strictly positive accumulation and inverse discounting would divide by zero. One month at quarterly frequency, using months/12, gives n = 1/3: not a complete quarter; a partial-period convention is missing. A negative rate alone is not a reason to reject a positive base.

<a id="exercise-explain-teachback-answer"></a>
### Answer 7 — derivation checklist
A nominal annual quote allocates R_m/m to each of m periods per year. Over T years there are mT periods, so start with A and multiply by the same factor 1 + R_m/m that many times. This produces FV = A(1 + R_m/m)^(mT). Divide FV by that factor power to get PV; a negative exponent means its reciprocal, not a negative currency amount. For a single year divide final by initial principal and subtract one to obtain R_eff = (1 + R_m/m)^m − 1. Require positive base and an appropriate time/period convention. If you can recite the formulas but not explain the second period's starting balance, retry the $100 → $105 → $110.25 example.

<a id="exercise-apply-teachback-answer"></a>
### Answer 8 — diagnosis checklist
Convert 8% to 0.08, divide by four and count eight quarters: **1000(1 + 0.08/4)^8 = $1,171.6593810022656 → $1,171.66**. PV < FV is conditional on positive rate and positive time; at nominal −2% semiannual, one-year future £1,000 has PV ≈ **£1,020.30**, and at zero rate the amounts are equal. Daily and continuous 10% factors differ before rounding: about 1.105155782 versus 1.105170918. These corrections address decimal scale, periodic rate, period count, sign boundary and precision separately. If one was missed, retry that single step rather than declaring the whole topic mastered.

<a id="stop"></a>
## Stop and check understanding

Give a tutor your own derivation and diagnosis from exercises 7–8. The tutor should check convention, period count, arithmetic and boundary reasoning separately, then ask you to retry a simpler step before repeating the full task. Keep learner work private. The [rate-conventions reference](../concepts/concept-rate-conventions.md#rates-quote) is a lookup, not a substitute for this practice. Next planned lesson: [continuous and equivalent rates](lesson-l3-continuous-and-equivalent-rates.md); that link may remain pending until its separate draft is authored. No approval or mastery follows from author checks.

<a id="evidence"></a>
## Evidence and source boundaries

All eight mapped substantive units have precise citations above. Full raw and normalized pp6–8 and all three original PNGs were read/displayed; original exponent signs, denominator scope and all five frequency-table entries were checked. Canonical units are verified, although extraction pages retain historical “needs review” labels. No source change or silent correction was made. The separate p11 incorrect printed rates and p16 bond convention caveat are outside this slice and are not used as examples.

| Physical page | Complete normalized text | Raw text | Original image |
|---|---|---|---|
| 6 | [Page 6](../../sources/annotated/lecture-3/page-006.md) | [Raw 6](../../sources/extracted/lecture-3/page-006.md#page-6) | [Original 6](../../sources/assets/lecture-3/page-006.png) |
| 7 | [Page 7](../../sources/annotated/lecture-3/page-007.md) | [Raw 7](../../sources/extracted/lecture-3/page-007.md#page-7) | [Original 7](../../sources/assets/lecture-3/page-007.png) |
| 8 | [Page 8](../../sources/annotated/lecture-3/page-008.md) | [Raw 8](../../sources/extracted/lecture-3/page-008.md#page-8) | [Original 8](../../sources/assets/lecture-3/page-008.png) |
