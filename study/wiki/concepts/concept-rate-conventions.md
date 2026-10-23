# Rate quotations and equivalent accumulation

**Source-grounded on-demand reference — author draft; independent review pending.** Use this convention lookup alongside the full rate lessons. The labelled calculations/corrections below are not new official source answers. Prerequisite: [powers, exponentials and logarithms](concept-exponents-and-logs.md#powers-outcomes).

<a id="rates-quote"></a>
## A percentage alone is not a complete rate quote

An annual **decimal** quote of 0.10 means 10% per year, not 10 per year. A **compounding convention** says how interest accumulates, including whether earned interest itself earns interest. **Nominal annual** R_m compounded m times yearly means a periodic rate R_m/m; it is generally not the one-year percentage gain. **Effective annual** R_eff is the actual one-year accumulation factor minus 1 under the stated model. A **continuous** annual rate r produces growth factor e^(rT). Here e^x is the exponential function and ln is its inverse, defined for positive dimensionless inputs.

Time T is elapsed years, not a maturity date label in these formulas. The positive integer m is the number of compounding periods in one year; R_m/m is the decimal return per period and mT counts periods. Require a positive accumulation base 1 + R_m/m. Whole mT counts literal periods; fractional powers for partial periods require an explicitly stipulated convention. Months/12 is used only when that time convention is stated; actual contracts can use different day counts. [L3 p6 opening quotation warning](../../sources/annotated/lecture-3/page-006.md#lecture-3-p006-quotation-convention); [p7 future-value definition](../../sources/annotated/lecture-3/page-007.md#lecture-3-p007-future-value).

<a id="rates-formulas"></a>
## Formula lookup: pair the quote with its convention

A > 0 is initial principal/present value and FV the future amount, both in the same currency; assume no intervening cash flows, fees or default. **Discounting** reverses accumulation to find present value PV.

| Convention | Future value | Present value |
|---|---|---|
| Nominal annual R_m, m periods/year | A(1 + R_m/m)^(mT) | FV(1 + R_m/m)^(−mT) |
| Continuous annual r | A e^(rT) | FV e^(−rT) |

With rates interpreted per year and T in years, rT and the period count are dimensionless. The negative exponent reverses growth; it does not make the present value negative. A negative continuous rate is mathematically allowed and produces growth below 1 for T > 0. Sources: L3 p7 [future](../../sources/annotated/lecture-3/page-007.md#lecture-3-p007-future-value)/[present value](../../sources/annotated/lecture-3/page-007.md#lecture-3-p007-present-value); p9 [continuous values](../../sources/annotated/lecture-3/page-009.md#lecture-3-p009-continuous-values).

Equivalent quotes produce the **same accumulation**, not the same quoted number. For one year:

    e^r = (1 + R_m/m)^m,
    r = m ln(1 + R_m/m),
    R_m = m[e^(r/m) − 1],
    R_eff = (1 + R_m/m)^m − 1 = e^r − 1.

The first identity uses annual numerical rates; equivalently write a one-year time interval explicitly. The logarithm's argument and r/m are dimensionless; the frequency factor restores the annual quote. [L3 p10 upper equivalence](../../sources/annotated/lecture-3/page-010.md#lecture-3-p010-equivalent-accumulation) and [middle conversion formulas](../../sources/annotated/lecture-3/page-010.md#lecture-3-p010-conversion-formulas); [p8 effective annual definition](../../sources/annotated/lecture-3/page-008.md#lecture-3-p008-effective-annual-rate).

<a id="rates-example"></a>
## Microexample: three numbers, one growth factor

For R_2 = 0.10 nominal annually compounded semiannually, m = 2 and each half-year earns 0.10/2 = 0.05 = 5%. Over one year, £100 becomes 100 × 1.05² = **£110.25**. Equivalent continuous r = 2 ln(1.05) ≈ **0.097580328**, or **9.758033%** annually continuous. Effective annual return = 1.05² − 1 = **0.1025 = 10.25%**. Check with unrounded r: exp(r) = 1.1025, and discounting £110.25 by 1.1025 returns £100. Source motivation: [L3 p10 lower semiannual example](../../sources/annotated/lecture-3/page-010.md#lecture-3-p010-semiannual-example). Retain precision until the final displayed amount.

The source's p6 comparison holds the **number** 10% fixed while changing conventions: £100 would become £110 under annual compounding versus £110.25 semiannually (currency relabelled for this supplemental comparison). Those are not equivalent rates. [L3 p6 one-year example](../../sources/annotated/lecture-3/page-006.md#lecture-3-p006-one-year-example). Increasing frequency while holding a nominal quote fixed differs from converting quotes to preserve growth.

<a id="rates-cautions"></a>
## Preserved source errors and convention limits

**L3 physical p11 printed rates are wrong.** Its growth question is $5,000 to $5,800 in 18 months; with months/12, T = 1.5 years. The printed continuous **10.15%** and nominal semiannual **10.41%** must not be reused as correct answers. Labelled corrected calculations are:

- r = ln(5800/5000)/1.5 ≈ **0.0989466701**, or **9.894667% annually continuous**.
- R_2 = 2[exp(r/2) − 1] ≈ **0.1014351490**, or **10.143515% nominal annually, semiannual compounding**.
- The distinct effective annual return is exp(r) − 1 ≈ **0.1040074214**, or **10.400742%**.

Substitution with unrounded values gives 5000 exp(1.5r) = 5000(1 + R_2/2)³ = 5800. Preserve, rather than overwrite, the [original p11](../../sources/assets/lecture-3/page-011.png), [growth question](../../sources/annotated/lecture-3/page-011.md#lecture-3-p011-growth-questions), [printed continuous solution](../../sources/annotated/lecture-3/page-011.md#lecture-3-p011-printed-continuous-solution), and [printed semiannual solution](../../sources/annotated/lecture-3/page-011.md#lecture-3-p011-printed-semiannual-solution).

**L3 physical p16 needs matched conventions.** A bond's coupon rate determines its scheduled interest payments relative to principal; its yield is the discount-rate quote that reproduces its price from promised payments; **par** means price equals the principal/face amount. The slide's “coupon equals yield ⇒ par” rule requires matching coupon/payment and yield-compounding conventions, not merely equal printed numbers. In the surrounding source example the coupon is nominal semiannual while yield is continuous: [L3 p14 coupon data](../../sources/annotated/lecture-3/page-014.md#lecture-3-p014-coupon-data) and [p15 yield definition](../../sources/annotated/lecture-3/page-015.md#lecture-3-p015-yield-definition). This qualification does not overturn the source example's below-par conclusion. [L3 p16 upper coupon/yield table and qualification](../../sources/annotated/lecture-3/page-016.md#lecture-3-p016-printed-coupon-yield-table); [original p16](../../sources/assets/lecture-3/page-016.png). Full bond pricing is a later lesson, not assumed by this convention warning.

A rate name alone also does not determine its credit assumptions, maturity or contractual day count. This page makes no current benchmark/LIBOR-status claim; historical lecture descriptions are not live market specifications.

<a id="rates-selfcheck"></a>
## Brief self-check

A nominal 8% annual rate compounds quarterly for six months, using months/12. Starting from £1,000, state the periodic rate, period count and FV. Is the rate 8% per quarter?

<a id="rates-answer"></a>
## Supplemental answer

R_4 = 0.08, m = 4, T = 6/12 = 0.5 year. Periodic rate = 0.08/4 = **0.02 = 2%**, period count = 4 × 0.5 = **2**, and FV = 1000 × 1.02² = **£1,040.40**. It is not 8% per quarter. If you used six years or four periods, write the time-unit conversion and period count before evaluating the power.

<a id="rates-navigation"></a>
## Full lesson targets

[Discrete compounding](../lessons/lesson-l3-discrete-compounding.md) (`lesson-l3-discrete-compounding`), [continuous and equivalent rates](../lessons/lesson-l3-continuous-and-equivalent-rates.md) (`lesson-l3-continuous-and-equivalent-rates`), and [yield and par](../lessons/lesson-l3-yield-and-par.md) (`lesson-l3-yield-and-par`). Planned links may remain pending; this reference does not certify completion or learner understanding.
