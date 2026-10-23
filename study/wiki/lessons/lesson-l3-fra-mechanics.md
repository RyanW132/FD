# FRA cash flows, settlement and borrowing exposure

> **Production-curriculum draft — independent teaching review pending.** Primary source: Lecture 3 physical pages 28–31. The contract conventions below describe the supplied classroom model, not a universal current-market or legal rule. Source QA and author calculations do not approve this lesson.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain the contract and its direction:** identify notional, dates, accrual fraction and matched rate conventions; distinguish receive-fixed/pay-floating from pay-fixed/receive-floating; derive the terminal interest difference and its start-settlement equivalent without confusing them or exchanging principal.
2. **Calculate and interpret the combined exposure:** reproduce the source's terminal and start-settlement amounts, select the direction that offsets a stated borrower/lender exposure, and verify the combined dated loan-plus-FRA cash flows under explicit financing assumptions. Check signs, units, rate conversion, rounding and denominator boundaries.

Prerequisite: [forward interest rates](lesson-l3-forward-interest-rates.md). Supporting bridges: [zero-rate discounting](lesson-l3-zero-rates-and-discounting.md), [continuous/equivalent rates](lesson-l3-continuous-and-equivalent-rates.md), [discrete compounding](lesson-l3-discrete-compounding.md), [bootstrap extension](lesson-l3-bootstrap-extension.md), [rate conventions](../concepts/concept-rate-conventions.md), [numeric foundations](../concepts/concept-numeric-foundations.md) and [exponents/logs](../concepts/concept-exponents-and-logs.md). Planned zero-discount-factor and forward-rates/FRA concept pages are still absent; needed foundations are supplied inline, not assumed to have been read elsewhere.

<a id="contract"></a>
## 1. A future loan is an exposure; an FRA is a separate contract

A **forward rate agreement (FRA)** is described by the source as an over-the-counter agreement fixing an interest rate for a future period. Here “over-the-counter” means negotiated between counterparties rather than defined in this lesson as an exchange-traded contract. The rate is applied to a **notional principal**: an amount used to calculate interest differences. In the source's FRA, that notional principal is normally **not exchanged**. A separate actual loan or deposit may exchange principal, but the FRA is not itself that loan.

The parties agree opposite sides of an interest-rate difference:

| Explicit contractual side | Fixed-rate leg | Future market/reference-rate leg | Benefits within the FRA when the observed reference rate… |
|---|---|---|---|
| Receive fixed, pay floating | Receives fixed-rate interest | Pays reference-rate interest | Falls below the fixed rate |
| Pay fixed, receive floating | Pays fixed-rate interest | Receives reference-rate interest | Rises above the fixed rate |

“Floating” here means the future reference rate used in the settlement calculation. The source assumes that this rate is observed at the start of the underlying period. We will use the explicit payer/receiver descriptions, not infer direction from an ambiguous “long FRA” or “short FRA” label. A positive number is a receipt **to the side named in the calculation**; the opposite side has the negative amount.

The source says settlement normally occurs at the period start, so the end-period interest difference is discounted back to that start. We adopt that specified convention for the worked example; a contract with different settlement terms would require a different dated cash-flow analysis. A start-settled FRA is not paid twice: its start payment replaces the equivalent terminal interest difference.

Source: [definition and mechanics, L3 p28](../../sources/annotated/lecture-3/page-028.md#lecture-3-p028-fra-definition-mechanics).

<a id="purpose"></a>
### Why a borrower and a lender choose opposite directions

A future borrower is hurt when its borrowing rate rises. A pay-fixed/receive-floating FRA gains when the matched reference rate rises, offsetting that cost in the ideal matched model. A future lender is hurt when its investment rate falls. A receive-fixed/pay-floating FRA gains when the matched reference rate falls, offsetting that lost interest income.

This is a statement about **combined exposure**, not a promise that an FRA makes money in all scenarios. If the underlying loan improves, the hedge may lose. To claim an offset, match notional, currency, dates, accrual basis and reference rate, and account for settlement funding. If a borrower's actual loan rate has an extra changing spread or uses another index, that difference is not automatically eliminated by the FRA.

Source: [borrower/lender purpose, L3 p28](../../sources/annotated/lecture-3/page-028.md#lecture-3-p028-fra-purpose).

<a id="notation"></a>
## 2. Define the clock and rate convention first

| Symbol | Meaning | Units / classroom assumption |
|---|---|---|
| 0 | Today, when FRA terms are agreed | Valuation origin, not the settlement date |
| \(T_1\) | Future period start; reference rate observed and FRA settled here | Years from today in this source |
| \(T_2\) | Future period end; underlying loan interest is compared here | Later than \(T_1\) |
| \(\delta\) | Contractual accrual year fraction | Source uses \(\delta=T_2-T_1>0\) |
| \(L\) | Notional principal | Currency amount, e.g. USD 100 million; not exchanged by the FRA |
| \(R_K\) | Fixed annual rate agreed in the FRA | Decimal simple-period quotation for the stated accrual basis |
| \(R_M\) | Market reference rate observed at \(T_1\) for this period | Annual decimal on the same simple/accrual basis as \(R_K\) |
| \(Q\) | Receive-fixed party's equivalent terminal interest difference | Currency at \(T_2\) |
| \(S\) | Receive-fixed party's actual start-settlement amount | Currency at \(T_1\) |
| \(g=1+R_M\delta\) | Simple growth multiplier over this period at the observed reference rate | Dimensionless; must be positive for the model here |

The symbols \(Q,S,g\) are author additions to make timing clear; the source uses the same amounts without these labels. A rate of 4.5% is decimal **0.045**. Multiplying an annual simple rate by the accrual year fraction produces a period interest fraction, so interest on notional is \(L\times\text{rate}\times\delta\), in the same currency as \(L\).

The source's ideal three-month period has \(\delta=0.25\). In an actual dated contract, a stated accrual/day-count rule determines the fraction; merely saying “starts in six months” does not determine the **length** of the loan period. For a hypothetical contract explicitly defining its fraction as 90/360, that fraction would be 0.25; this is a supplied-rule illustration, not a declaration that all FRAs use that rule. If the zero curve and contract use different time bases, distinguish the zero-curve elapsed years from the contractual accrual fraction rather than silently equating them.

**Convention change from the preceding lesson:** the source zero/forward curves were continuously compounded. The FRA formula on p29 instead uses the simple-period accumulation \(1+R_M\delta\). It is the growth convention implicit in that settlement formula. The same numerical rate cannot in general be substituted interchangeably into continuous and simple formulas.

Source: [notation, L3 p29](../../sources/annotated/lecture-3/page-029.md#lecture-3-p029-fra-notation).

<a id="terminal"></a>
## 3. Derive the terminal interest difference and its sign

First imagine settling at \(T_2\), the end of the underlying period. For the **receive-fixed/pay-floating** side:

- Fixed interest received would be \(LR_K\delta\).
- Floating/reference interest paid would be \(LR_M\delta\).
- Subtract payments from receipts:

\[
\boxed{Q=LR_K\delta-LR_M\delta=L(R_K-R_M)\delta.}
\]

The notional is not added to this expression because the FRA exchanges an interest difference, not principal. Its units are currency × annual rate × years = currency. With \(L>0\) and \(\delta>0\), the sign comes from \(R_K-R_M\): positive if the reference rate is below the fixed rate, zero if equal, negative if above.

For the **pay-fixed/receive-floating** side, the terminal difference is the negative:

\[
-Q=L(R_M-R_K)\delta.
\]

Switching counterparties reverses every FRA receipt/payment; it does not change which rate is observed or the period length. These are alternative sides, not two extra payments to add to one side's payoff.

Source: [receive-fixed terminal difference, L3 p29](../../sources/annotated/lecture-3/page-029.md#lecture-3-p029-fra-terminal-difference).

<a id="settlement"></a>
## 4. Start settlement: discount the entire difference, over the right interval

The source contract instead settles at \(T_1\). A currency unit at \(T_1\) grows to \(g=1+R_M\delta\) units at \(T_2\) under its simple-period convention. To find a start amount \(S\) equivalent to terminal amount \(Q\), require

\[
S(1+R_M\delta)=Q.
\]

Divide by the positive multiplier:

\[
\boxed{S=\frac{L(R_K-R_M)\delta}{1+R_M\delta}.}
\]

The denominator discounts the **entire numerator**. It is not just a discount applied to the floating leg; it is not \(1+R_K\delta\); and it does not use the number of years from **today** until \(T_1\). This payment is at \(T_1\), not a value today. A separate present valuation before \(T_1\) would require additional pricing inputs and is not what this formula claims.

The opposite party receives \(-S\). A negative \(S\) means the named receive-fixed party pays its absolute amount at the start; the economic terminal equivalent is also negative when \(g>0\). With a positive observed rate, \(g>1\), so the start amount's magnitude is smaller than the terminal difference's magnitude. With an allowed negative observed rate and \(0<g<1\), its magnitude can be larger.

**Text timeline:** agree fixed rate/notional today → observe \(R_M\) and exchange \(S\) at \(T_1\) → underlying loan ends at \(T_2\). Under start settlement, there is **no second FRA payment \(Q\) at \(T_2\)**. The quantity \(Q=Sg\) is the terminal equivalent used for comparing exposures.

Source: [start-settlement fraction and opposite side, L3 p29](../../sources/annotated/lecture-3/page-029.md#lecture-3-p029-fra-start-settlement). The simple-period convention is also explicitly clarified in the normalized transcription; the original fraction is preserved.

<a id="source-terminal"></a>
## 5. Work the source's lending-protection example

The company receives fixed 4% on notional **USD 100,000,000**, for a three-month period beginning **three years from today**. Thus \(T_1=3\), \(T_2=3.25\), \(\delta=0.25\), \(R_K=0.04\). At \(T_1\) the observed reference rate is **4.5%**, so \(R_M=0.045\). Those two percentages use the simple-period convention implicit in the FRA formula, not the continuous zero-rate convention from the earlier forward example.

The rate difference is \(0.04-0.045=-0.005\): minus half a percentage point, not minus 0.5 as a decimal. Multiplying by the quarter-year fraction gives \(-0.005(0.25)=-0.00125\). Multiplying by USD 100 million gives

\[
Q=100{,}000{,}000(0.04-0.045)(0.25)=-125{,}000.
\]

The receive-fixed side therefore has a **negative terminal equivalent of USD 125,000**. It loses within the FRA because it receives the lower fixed rate and pays the higher floating rate. The pay-fixed side has the equal positive terminal equivalent.

Source: [data and terminal result, L3 p30](../../sources/annotated/lecture-3/page-030.md#lecture-3-p030-fra-example-terminal).

<a id="source-start"></a>
### Convert that difference to the source's start payment

1. Observed period interest fraction: \(R_M\delta=0.045(0.25)=0.01125\).
2. Growth denominator: \(g=1+0.01125=1.01125\).
3. Discount the complete negative difference:

\[
S=\frac{-125{,}000}{1.01125}\approx-123{,}609.394313968.
\]

The company **pays USD 123,609.39 at year 3**, when displayed to cents. The source displays **−USD 123,609**, rounded to a whole dollar; its equality sign is a rounded display, not an exact quotient. With the unrounded amount, multiplying back by 1.01125 gives exactly −USD 125,000 in terminal-equivalent terms. Neither USD 100 million principal nor a second USD 125,000 FRA payment is exchanged at year 3.25 under this start-settled contract.

Source: [settlement calculation, L3 p30](../../sources/annotated/lecture-3/page-030.md#lecture-3-p030-fra-example-settlement).

<a id="source-combined"></a>
## 6. Why an FRA loss can be consistent with a successful hedge

The source says the loss offsets the benefit of being able to lend at a higher market rate; together the loan and FRA lock approximately 4%. To explain that statement rather than just repeat it, compare payments at **the same date**.

Suppose, as an explicit matched-model assumption, the company actually lends the same USD 100 million for that quarter-year at the same 4.5% simple reference rate. Its floating loan interest is

\[
LR_M\delta=100{,}000{,}000(0.045)(0.25)=1{,}125{,}000\text{ USD}.
\]

The fixed target interest is \(100{,}000{,}000(0.04)(0.25)=1{,}000{,}000\) USD. The extra USD 125,000 loan interest is offset by the FRA's **terminal equivalent** of −USD 125,000. Net terminal interest is USD 1,000,000, the 4% simple annual rate applied for a quarter-year.

Because the FRA actually settles at the start, the calculation needs a settlement funding assumption. If the company borrows the USD 123,609.394313968… start payment at that same 4.5% simple period rate, its terminal funding repayment is USD 125,000. If settlement were a receipt, it would instead invest that receipt on the same terms. This separate funding/investment account neutralises the start-settlement cash flow so the underlying USD 100 million lending principal stays unchanged. At the end, combine the loan interest with the account's terminal equivalent \(Sg=Q\), **not** with the unadjusted start payment.

| Event in source case plus explicit matching/funding assumption | Receive-fixed lender's signed cash flow, USD |
|---|---:|
| Start: underlying loan principal advanced | −100,000,000 |
| Start: FRA settlement | −123,609.394313968… |
| Start: settlement financing borrowed | +123,609.394313968… |
| End: underlying loan principal and floating interest received | +101,125,000 |
| End: settlement financing repaid | −125,000 |
| Net start / net end | −100,000,000 / +101,000,000 |

Algebraically, the lender's interest plus terminal-equivalent FRA is

\[
LR_M\delta+L(R_K-R_M)\delta=LR_K\delta.
\]

Under exactly matched assumptions and unrounded arithmetic this identity is exact. The source's “approximately 4%” remains an appropriately qualified description when settlement rounding and imperfect real exposure/funding matches are possible. We do not claim all lending rates, funding rates, spreads, taxes or credit outcomes are fixed by any FRA.

Source: [lending interpretation, L3 p30](../../sources/annotated/lecture-3/page-030.md#lecture-3-p030-fra-example-interpretation). The full financing timeline is an authored explanatory supplement, not an extra source transaction.

<a id="borrower-lender"></a>
### Derive the borrower's corresponding combined exposure

A matched borrower owes floating interest \(LR_M\delta\). Its pay-fixed/receive-floating FRA has terminal-equivalent receipt \(L(R_M-R_K)\delta\). Cost is the loan interest **minus** that receipt:

\[
LR_M\delta-L(R_M-R_K)\delta=LR_K\delta.
\]

A negative FRA receipt means an additional payment; subtracting it increases the cost. With settlement reinvested or financed at the same \(R_M\), the borrower can keep its net start borrowing at \(L\) and its terminal net repayment at \(L(1+R_K\delta)\). For the source numerical data, floating interest USD 1,125,000 less FRA terminal-equivalent gain USD 125,000 leaves USD 1,000,000. This is the opposite FRA side from the source lender, not a sign change to the actual reference rate.

**Supplemental scenario table using the same USD 100 million notional, fixed 4% and quarter-year:** only the observed reference rate changes. Start settlements below are for the receive-fixed lender and rounded to cents; combined interest uses unrounded settlement carried to the end.

| Observed simple annual reference | Loan interest, USD | Receive-fixed terminal equivalent, USD | Receive-fixed start settlement, USD | Combined terminal interest, USD |
|---:|---:|---:|---:|---:|
| 3.5% | 875,000 | +125,000 | +123,915.74 | 1,000,000 |
| 4.0% | 1,000,000 | 0 | 0 | 1,000,000 |
| 4.5% (source case) | 1,125,000 | −125,000 | −123,609.39 | 1,000,000 |

For the first row, \(g=1+0.035(0.25)=1.00875\), so \(S=125{,}000/1.00875\approx123{,}915.737298637\) USD. The fixed-equals-floating row gives zero difference before any discounting. A matched pay-fixed borrower has the opposite FRA amounts, with net terminal interest cost USD 1,000,000 in each row. This table illustrates an ideal offset, not a recommendation to enter a contract.

<a id="source-direction-questions"></a>
## 7. Preserve the source's two exposure questions

<a id="exercise-direction"></a>
### A. Source questions — choose the stated contractual side (outcomes 1 and 2)

For each exposure, decide whether the firm should pay fixed or receive fixed:

1. A company will borrow **GBP10 million in six months** and fears that rates will rise.
2. An investor will lend **GBP10 million in six months** and fears that rates will fall.

Source: [two exposure questions, L3 p31](../../sources/annotated/lecture-3/page-031.md#lecture-3-p031-fra-exposure-questions). The source does **not** give the underlying period's end date, fixed/reference rates or accrual fraction for these questions. Six months identifies the **start delay**, not necessarily a six-month accrual period. Select direction qualitatively; do not invent a numerical settlement.

<a id="source-direction-explanation"></a>
### Reason from the exposure before consulting the answer

Ask what movement hurts the underlying loan, then identify which FRA side gains from that movement. The borrower pays an interest bill, so a higher observed rate raises its cost; the compensating side must receive floating and pay fixed. The lender earns interest, so a lower observed rate reduces income; the compensating side must receive fixed and pay floating. Source supplied answers are preserved with a fuller sign explanation in [the separate answer](#answer-direction).

<a id="conversion"></a>
## 8. Bridge continuous forward quotations to simple settlement rates

**Author supplement, not a new pricing claim:** suppose a continuous rate \(r\) describes growth over elapsed zero-curve years \(\Delta\), while the simple-rate contract specifies accrual fraction \(\delta>0\). To match the **same** growth, solve

\[
1+R_{\mathrm{simple}}\delta=e^{r\Delta},\qquad
R_{\mathrm{simple}}=\frac{e^{r\Delta}-1}{\delta}.
\]

The exponential's input is dimensionless. If both year bases coincide, \(\Delta=\delta\). For an explicitly hypothetical continuous 4.5% quote over a quarter-year, the matching simple annual quote is \((e^{0.045(0.25)}-1)/0.25\approx0.0452540768944\), or **4.52540768944%**. That is not 4.5% simple. This conversion illustration does **not** change the source's simple 4.5% FRA example: it is a different input convention. Nor does a forward implied today automatically equal the later observed reference rate \(R_M\). A contractual fixed quote and its valuation require their own stated conventions.

Using a continuous exponential denominator with the unchanged simple rate silently changes the settlement model. Use the contractual convention, and convert quotations when needed rather than swapping formulas because both contain a rate.

<a id="boundaries"></a>
## 9. Limits and diagnostic checks

- **Equal rates:** \(R_K=R_M\) makes terminal and start differences zero, provided the denominator is valid. This does not mean the actual loan pays zero interest.
- **Zero market rate:** \(R_M=0\) makes the denominator 1, so start and terminal differences are numerically equal. No division by the rate is needed.
- **Negative rates:** allowed when the simple growth base remains positive. Supplemental example: \(L=1000\) USD, \(R_K=0.02\), \(R_M=-0.01\), \(\delta=0.5\). Then \(Q=1000(0.03)(0.5)=15\) USD, \(g=0.995\), and \(S=15/0.995\approx15.075376884422\) USD, or **USD 15.08**. Start magnitude exceeds terminal magnitude here; the denominator is still positive.
- **Zero/nonpositive denominator:** require \(1+R_M\delta>0\) for this accumulation/discounting model. At \(\delta=0.25\), \(R_M=-4\) (−400% annual decimal quotation) gives zero denominator; \(R_M=-5\) gives a negative base. Reject these as invalid for this model rather than divide, flip the economic meaning or substitute an exponential. The fixed-rate loan comparison also presumes a meaningful positive fixed growth base \(1+R_K\delta\).
- **Zero accrual:** finite rates with \(\delta=0\) give zero terminal difference and denominator 1, but there is no positive-length interest period. This is a boundary identity, not an ordinary FRA or a way to identify a forward annual rate by division by zero. A zero notional also gives zero difference but no substantive exposure.
- **Missing/mismatched inputs:** the period start delay, accrual length, currency, notional, fixed/reference quote basis and contractual side must all be known. A spread/index/currency mismatch can leave risk; an FRA is not a guarantee that every component of an actual loan's all-in rate is fixed.
- **Dates first:** never add a start receipt directly to an end interest payment. Convert both to the same date using the specified financing or discounting convention. In the source example the settlement date is year 3, not today, and the relevant denominator covers 0.25 years, not 3 years.

<a id="practice"></a>
## 10. Further progressive practice

These prompts are supplemental; the two original exposure questions remain separately identified above.

<a id="exercise-derive"></a>
### B. Derive rather than remember (outcome 1)

Define every symbol in the receive-fixed terminal and start-settlement formulas, including their currencies/dates. Derive the terminal difference by subtracting interest legs, derive start settlement by matching terminal values, and reverse the sign for the other side. Explain why notional principal is not added and why neither today nor a three-year denominator belongs in the source settlement.

<a id="exercise-source"></a>
### C. Audit all source amounts (outcome 2)

For the USD 100 million, fixed 4%, observed 4.5%, three-month period beginning in three years, calculate the rate difference, period difference, terminal amount, denominator and start payment. State the side, date and rounding of each. Multiply the unrounded start payment back to the terminal date.

<a id="exercise-combined"></a>
### D. Explain the hedge, not only the FRA (outcomes 1 and 2)

Using the source data, produce the receive-fixed lender's full loan/FRA/settlement-financing timeline. Derive the matched borrower's interest cost using the opposite side. Then check every row of the supplemental 3.5%/4%/4.5% scenario table. Which matching assumptions support the fixed result?

<a id="exercise-convention"></a>
### E. Audit a quote substitution (outcome 2)

Someone reads “4.5% continuous” and plugs 0.045 unchanged into a quarter-year simple FRA settlement formula. Explain the mismatch and compute the matching simple quote, assuming both year bases coincide. Why does this not authorise changing the source example, whose 4.5% is already interpreted on the simple basis implied by its formula?

<a id="exercise-boundaries"></a>
### F. Check the domain and signs (outcome 2)

Work the USD 1000 negative-market-rate example. Then describe equal rates, zero market rate, zero accrual, zero notional, and zero/negative settlement denominators. Explain why a positive FRA receipt alone is not enough to infer a lower combined borrowing cost than the fixed target.

<a id="exercise-teachback"></a>
### G. Teach back the entire timeline (outcomes 1 and 2)

A beginner says: “The lender loses USD 125,000, so its hedge failed; it also pays USD 100 million principal through the FRA; and I can add the start settlement directly to end interest.” Correct each statement using the source example, explicit contractual side, matching dates and a combined-interest identity. Explain what remains unhedged if the actual loan rate differs from the reference.

<a id="answers"></a>
## 11. Separate supplied and supplemental answers

<a id="answer-direction"></a>
### Answer A — source supplied directions, with authored explanation

1. **Borrower: pay fixed and receive floating.** A rising matched reference rate increases borrowing interest but gives the FRA terminal-equivalent receipt \(L(R_M-R_K)\delta\), offsetting that increase under the matched assumptions.
2. **Lender: receive fixed and pay floating.** A falling matched reference rate reduces loan interest but gives the FRA terminal-equivalent receipt \(L(R_K-R_M)\delta\), offsetting the reduction.

These are the directions printed by the source. The notional is GBP10 million and the exposure starts in six months; those facts alone do not supply the accrual length or rates, so no numerical settlement is determined. No ambiguous long/short terminology is required.

Source: [supplied exposure answers, L3 p31](../../sources/annotated/lecture-3/page-031.md#lecture-3-p031-fra-exposure-answers).

<a id="answer-derive"></a>
### Answer B — supplemental derivation and timing

\(L\) is currency notional, \(R_K,R_M\) are matched annual simple decimal rates, and \(\delta\) is the accrual year fraction. Fixed interest minus floating interest gives receive-fixed terminal currency \(Q=L(R_K-R_M)\delta\) at \(T_2\). Start currency \(S\) must satisfy \(S(1+R_M\delta)=Q\), so divide the entire difference by that positive growth base. The pay-fixed side receives \(-Q\) or \(-S\), according to settlement date. Principal is not exchanged through this FRA. The source start settlement is at \(T_1=3\); its denominator covers the following 0.25-year period, not the preceding 3-year delay and not discounting back to today.

<a id="answer-source"></a>
### Answer C — supplemental full source calculation

The receive-fixed rate difference is −0.005 annual decimal; multiplying by 0.25 gives −0.00125 over the period. Multiplying by USD 100,000,000 gives terminal equivalent −USD 125,000 at year 3.25. The denominator is 1.01125; dividing gives approximately −USD 123,609.394313968 at year 3. The actual receive-fixed payment is USD 123,609.39 to cents, or USD 123,609 to the whole-dollar precision printed on the slide. The opposite side receives the positive amount. Unrounded settlement times 1.01125 returns −USD 125,000. These are equivalent amounts at different dates, not two actual FRA payments.

<a id="answer-combined"></a>
### Answer D — supplemental combined exposure and all scenario rows

In the source scenario the lender advances USD 100 million at the start, pays the FRA settlement, and borrows that settlement amount separately so net start cash remains −USD 100 million. At the end the loan pays USD 101,125,000 and settlement funding costs USD 125,000, leaving USD 101,000,000. Net interest is USD 1,000,000, equal to 4% × 0.25 × USD 100 million. A matched borrower owes USD 1,125,000 floating interest and receives a USD 125,000 terminal-equivalent pay-fixed FRA gain, leaving the same USD 1,000,000 interest cost.

At observed 3.5%, lender interest is USD 875,000 and receive-fixed terminal equivalent is +USD 125,000; denominator 1.00875 gives start receipt USD 123,915.737298637… (USD 123,915.74). At 4%, both FRA amounts are zero and loan interest is USD 1,000,000. At 4.5%, lender interest is USD 1,125,000 and FRA equivalent is −USD 125,000, with start payment USD 123,609.39. Each combined terminal interest is USD 1,000,000 using unrounded funding. The identities require matched notional, currency, dates, reference/accrual convention and settlement funding at the specified reference rate, with no added changing spread, credit loss, fees or other unmatched cash flows.

<a id="answer-convention"></a>
### Answer E — supplemental quote conversion, not a source correction

Match growth, not quoted percentages: \(1+R_{\mathrm{simple}}(0.25)=e^{0.045(0.25)}\). Hence \(R_{\mathrm{simple}}=(e^{0.01125}-1)/0.25\approx0.0452540768944\), or 4.52540768944% simple annual. The unchanged 0.045 simple quote instead gives growth 1.01125, a different factor. The source's formula already uses that simple basis; the continuous 4.5% hypothetical is a different input and cannot silently replace the source example. An implied forward today is also not necessarily the future observed reference rate.

<a id="answer-boundaries"></a>
### Answer F — supplemental signs and domain

With USD 1000, fixed 2%, observed −1% and 0.5 years, receive-fixed terminal equivalent is USD 15; the positive denominator is 0.995; start receipt is USD 15.075376884422… or USD 15.08. Equal fixed/reference rates give zero difference. A zero reference rate gives denominator 1; start and terminal differences are then numerically equal. Zero accrual or zero notional gives zero difference for finite rates but no substantive positive-length exposure. A zero denominator cannot be divided by; a negative growth base is outside this model. A borrower may receive a positive pay-fixed FRA amount because its underlying floating interest has risen: compare the combined cost, not the isolated receipt.

<a id="answer-teachback"></a>
### Answer G — supplemental explanation of the hedge

The source lender's receive-fixed FRA loses when observed rates rise, precisely when its matched lending interest improves. The FRA notional only scales the interest difference; the separate loan, not the FRA, exchanges the USD 100 million principal. The source's start payment is approximately USD 123,609.39; financing the unrounded payment at the matched period rate produces a USD 125,000 end cost. Subtract that from USD 1,125,000 loan interest to leave USD 1,000,000. Algebraically \(LR_M\delta+L(R_K-R_M)\delta=LR_K\delta\). Do not add unequal-date amounts directly or count a second FRA payment at the end. If the actual loan has a different or changing spread/index, its unmatched component remains exposed; the simple identity no longer fixes every part of its realised all-in return or cost.

<a id="source-map"></a>
## Exact primary source-to-teaching and practice map

| Unit ID | Teaching anchor | Outcomes | Practice / answer |
|---|---|---|---|
| lecture-3-p028-fra-definition-mechanics | [Contract](#contract) | 1 | [B](#exercise-derive) / [answer](#answer-derive) |
| lecture-3-p028-fra-purpose | [Purpose](#purpose) | 1, 2 | [G](#exercise-teachback) / [answer](#answer-teachback) |
| lecture-3-p029-fra-notation | [Notation](#notation) | 1 | [B](#exercise-derive) / [answer](#answer-derive) |
| lecture-3-p029-fra-start-settlement | [Start settlement](#settlement) | 1, 2 | [B](#exercise-derive), [C](#exercise-source) / [B answer](#answer-derive), [C answer](#answer-source) |
| lecture-3-p029-fra-terminal-difference | [Terminal difference](#terminal) | 1, 2 | [B](#exercise-derive), [C](#exercise-source) / [B answer](#answer-derive), [C answer](#answer-source) |
| lecture-3-p030-fra-example-interpretation | [Combined source case](#source-combined) | 1, 2 | [D](#exercise-combined) / [answer](#answer-combined) |
| lecture-3-p030-fra-example-settlement | [Source start amount](#source-start) | 2 | [C](#exercise-source) / [answer](#answer-source) |
| lecture-3-p030-fra-example-terminal | [Source terminal amount](#source-terminal) | 2 | [C](#exercise-source) / [answer](#answer-source) |
| lecture-3-p031-fra-exposure-answers | [Supplied answer](#answer-direction) | 1, 2 | [A](#exercise-direction) / [answer](#answer-direction) |
| lecture-3-p031-fra-exposure-questions | [Original questions](#exercise-direction) | 1, 2 | [A](#exercise-direction) / [answer](#answer-direction) |

These are proposed authoring links, not canonical taught coverage or Review records. Independent teaching review and concept integration remain pending.
