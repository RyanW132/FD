# Dated cash flows and types of interest rates

<a id="status"></a>
**Unreviewed author draft — not canonical teaching approval or evidence of learner mastery.** Scope: Lecture 3, physical pages 3–5, all 12 mapped substantive units. Explanations, scenarios, exercises and answers are supplemental unless identified as source descriptions. Benchmark statements below describe the supplied lecture, not independently verified present-day market practice, benchmark status, law or financial recommendations.

<a id="motivation"></a>
## Why the date belongs next to the amount

A promise to receive money tomorrow is not the same thing as receiving it now. Money available now could be used in the meantime; a promise also raises the question of whether the payer will perform. A rate helps translate between dates, but choosing a rate requires knowing what it measures. A central bank's policy rate, a government's borrowing yield and a loan's reference benchmark are not interchangeable labels for one universal number.

This builds on [forward obligations](lesson-l1-forward-contracts.md#agreement): agreeing a delivery price today does not mean paying it today. We now ask how to compare payments on different dates, without yet pricing an entire forward contract.

<a id="outcomes"></a>
## What you will be able to do

1. **Explain dated value and classify rates:** given a cash-flow timeline and descriptions of government, policy, repo and reference rates, identify the date/currency/viewpoint of each flow; explain why a rate is needed to compare dates; classify all four rate descriptions with reasons; distinguish the no-default modelling ideal from an actual rate. Success requires every classification and the risk distinction correct, not just memorised names.
2. **Apply the lecture's benchmark conventions:** given source-era descriptions and a fully specified toy accumulation, distinguish SONIA from SOFR, explain the lecture's historical LIBOR wording and generic FRA reference-rate notation, and calculate the dated amounts while stating the rate/time convention. Success requires correct currency, secured-borrowing distinction, two-period arithmetic to the penny, and an explanation of why neither a benchmark name nor a historical label supplies all contractual terms.

**Readiness check:** What does 5% of £100 mean? Why is “receive £105” missing information? If unsure, use the next foundation and [numeric foundations](../concepts/concept-numeric-foundations.md#numeric-rates). No market experience is assumed.

<a id="foundations"></a>
## 1. Foundations: amount, date, rate and risk

A **cash flow** is a payment or receipt at a specified date. From a lender/saver's viewpoint, money paid out is negative and money received is positive. **Principal** is the initial amount lent or invested. Here £ means pounds sterling (GBP); $ means US dollars (USD). We do not add unlike currencies or silently convert between them.

An **interest rate** expresses interest relative to a principal and a time convention. Percent means per hundred: 5% = 5/100 = 0.05. In a one-year, one-payment illustration, £100 × 0.05 = £5 interest, so repayment is £100 + £5 = £105. This is an assumed numerical example, not a quoted available investment. A **compounding convention** says when interest joins the balance and begins earning interest itself. An annual quote is not necessarily the return over every year or fraction of a year; the next lesson derives that distinction.

**Credit/default risk** means the payer may fail to pay as promised. **Liquidity risk**, in this introductory context, concerns difficulty obtaining cash or trading promptly without an unfavourable price. **Collateral** is an asset pledged to support an obligation if the borrower does not perform; its value and the arrangements for using it matter. These supplemental explanations unpack the risk words on p3. Collateral does not mean that every source of loss vanishes.

<a id="dated-value"></a>
## 2. Put different dates onto one comparison date

The source says dated cash flows drive discounting and affect bond prices, forward prices, swaps and options, as well as borrowing, saving, investment, exchange rates and monetary policy. A **bond** is a debt claim with promised payments. A **swap** exchanges specified payment streams. An **option** gives its holder a contractual choice; a forward obliges a future exchange. Those brief definitions locate the examples, not teach their pricing. Changing how future payments are valued can change today's contract price even when the promised amount is unchanged. [L3 physical p3, main paragraph and bullets; `lecture-3-p003-dated-cashflows`](../../sources/annotated/lecture-3/page-003.md#lecture-3-p003-dated-cashflows).

The source's central question is the present worth of a future payment. **Future value** moves an amount forward under a stated rate; **present value** reverses that growth. “Discount” here means translate backward in time, not automatically subtract a fixed percentage from the future amount. [L3 physical p3, lower question box; `lecture-3-p003-central-question`](../../sources/annotated/lecture-3/page-003.md#lecture-3-p003-central-question).

<a id="dated-example"></a>
### Worked timeline — supplemental, one year only

Assume a certain GBP repayment, one full year, a 5% annual rate with one credit of interest at the end, no fees/taxes/intermediate payments and the same specified rate for our comparison. Let **A** be principal today, **r** the annual decimal rate, and **F** the payment one year later. For this one-year convention:

    Interest = A × r
    F = A + A × r = A(1 + r)
    A = F/(1 + r), provided 1 + r > 0.

The year is fixed to exactly one; these equations are not an unqualified rule for arbitrary dates. A and F are GBP amounts; 1 + r is the dimensionless one-year factor. To reverse multiplication by 1.05, divide by 1.05, not by 0.05.

| Date | Saver's actual cash flow | Meaning |
|---|---:|---|
| Today | −£100 | Principal leaves the saver |
| One year later | +£105 | Principal plus £5 interest returns |

Forward check: 100 × 1.05 = 105. Backward check: 105/1.05 = 100. Thus the assumed £105 future payment has present value £100 under these assumptions. Subtracting 5% of £105 would give £99.75, which is not the required reversal. £5 is the nominal difference between dated receipts and payments; it is not a present-value profit calculation. We have assumed away default for this illustration, not established that a real borrower is risk-free.

<a id="rate-families"></a>
## 3. Four rate families answer different questions

The source p4 is a list of definitions, not a table of numerical market quotes. This accessible teaching table expands each row with a diagnostic question. The final column is supplemental interpretation.

| Source family | What the lecture describes | Ask this before using it |
|---|---|---|
| Government bond rate | A yield on government-issued debt; varies with currency, maturity, liquidity and sovereign credit risk | Which government's debt, which currency, and how long until payment? |
| Policy rate | A rate set or targeted by a central bank for monetary policy | Is this a policy setting/target, rather than the rate this particular borrower pays? |
| Repo rate | A secured borrowing rate with securities as collateral | What security supports the loan and what are the borrowing terms? |
| Reference rate | A transaction-based benchmark used in loans/derivatives; the lecture gives SONIA and SOFR | Which benchmark does this contract name, and how does the contract use it? |

<a id="government"></a>
**Government rates:** a **yield** summarises the return implied by the price and payments of debt under a specified convention; detailed bond-yield calculations come later. **Maturity** is the time until a payment/contract ends. **Sovereign** means government as issuer. Therefore a yield on a short-term GBP government claim does not automatically describe a long-term USD claim or remove sovereign credit risk. [L3 physical p4, upper definition row; `lecture-3-p004-government-rates`](../../sources/annotated/lecture-3/page-004.md#lecture-3-p004-government-rates).

<a id="policy"></a>
**Policy rates:** “set or targeted” identifies the central bank's policy role, not a guarantee that every savings or borrowing contract uses that rate. A policy change may influence other rates, but this source supplies no formula making all of them equal. [L3 physical p4, second definition row; `lecture-3-p004-policy-rates`](../../sources/annotated/lecture-3/page-004.md#lecture-3-p004-policy-rates).

<a id="repo"></a>
**Repo rates:** “secured” means securities provide collateral for borrowing; it does not mean the rate is fixed forever or every risk has disappeared. The source's classification concerns the transaction behind the rate. We do not need a repo settlement formula to distinguish secured borrowing from an uncollateralised promise. [L3 physical p4, third definition row; `lecture-3-p004-repo-rates`](../../sources/annotated/lecture-3/page-004.md#lecture-3-p004-repo-rates).

<a id="reference"></a>
**Reference rates:** a **benchmark** is a named reference used to determine contractual amounts. Being referenced in a contract does not make the benchmark identical to that contract's final interest rate: the contract must still specify its terms. The source describes transaction-based SONIA for sterling and SOFR for US dollars; these are source descriptions, not a claim that every historical benchmark was transaction-based. [L3 physical p4, fourth definition row; `lecture-3-p004-reference-rates`](../../sources/annotated/lecture-3/page-004.md#lecture-3-p004-reference-rates).

<a id="risk-free"></a>
### A modelling ideal is not a fifth guaranteed product

The source defines a risk-free rate as the return on an investment with **no default risk**. It describes overnight-indexed rates as often used to construct discount curves, subject to contracts and collateral arrangements. A **discount curve** is a collection of factors for translating payments at different future dates into today's value; an **overnight index** refers to overnight rate observations. This is the lecture's account of modelling practice, not independent verification of today's conventions. [L3 physical p4, lower box; `lecture-3-p004-risk-free-rate`](../../sources/annotated/lecture-3/page-004.md#lecture-3-p004-risk-free-rate).

“No default risk” is the stated ideal. It is not a claim that prices never move, purchasing power never changes, or all government debt and secured loans are interchangeable. When a problem specifies a risk-free rate, identify it as a modelling input; do not infer its numerical value from the word “government” alone.

<a id="benchmark-history"></a>
## 4. Read benchmark history as history

The supplied p5 presents LIBOR as historical and states that all its settings had permanently ceased. We preserve that as **the slide's statement**, not a fresh present-day verification or legal conclusion. Its point for this course is that older material can use a label that the lecture no longer uses for its generic market-rate input. No live benchmark values or implementation dates are supplied here. [L3 physical p5, opening paragraph; `lecture-3-p005-libor-status`](../../sources/annotated/lecture-3/page-005.md#lecture-3-p005-libor-status).

<a id="sonia"></a>
**SONIA**, expanded by the lecture as **Sterling Overnight Index Average**, reflects rates paid on eligible overnight sterling transactions. “Sterling” identifies GBP; “overnight” identifies the short underlying transaction horizon, not a one-year investment return. The word **eligible** signals a defined set of transactions; p5 does not supply its full eligibility methodology, so this lesson does not invent it. [L3 physical p5, first bullet; `lecture-3-p005-sonia`](../../sources/annotated/lecture-3/page-005.md#lecture-3-p005-sonia).

<a id="sofr"></a>
**SOFR**, expanded by the lecture as **Secured Overnight Financing Rate**, measures overnight borrowing collateralised by US Treasury securities. Here “US Treasury securities” means debt securities issued by the US Treasury; their collateral role distinguishes this description from simply quoting their own bond yield. The p4 example identifies the benchmark with USD. Do not substitute a USD description for a sterling contract just because both names include “overnight.” [L3 physical p5, second bullet; `lecture-3-p005-sofr`](../../sources/annotated/lecture-3/page-005.md#lecture-3-p005-sofr).

| Source comparison | SONIA | SOFR |
|---|---|---|
| Currency identified in pp4–5 | GBP/sterling | USD/US dollars |
| Horizon in p5 description | Overnight | Overnight |
| Transaction description supplied | Eligible sterling transactions | Borrowing collateralised by US Treasury securities |

The table records what the source actually says. In particular, the SONIA row is not expanded into an uncited exhaustive eligibility or collateral specification.

<a id="overnight"></a>
## 5. Several overnight periods can make one longer-period amount

The source says overnight rates may be **compounded over a period** to determine interest on a loan or derivative. One day's interest becomes part of the next balance; therefore the total is built from successive multiplication, not necessarily by adding annual quoted numbers. [L3 physical p5, third bullet; `lecture-3-p005-overnight-compounding`](../../sources/annotated/lecture-3/page-005.md#lecture-3-p005-overnight-compounding).

<a id="overnight-example"></a>
### Worked two-period illustration — supplemental, not a benchmark methodology

Take £1,000 and two successive toy one-day periods. **j₁ = 0.001 = 0.10%** and **j₂ = 0.002 = 0.20%** are already the returns for their respective single periods, **not annual quotes**. The subscript labels the period. Assume no cash movements except credited interest, no costs/default and retention of all interest. We do not use a day-count denominator or claim these are realistic observed rates.

1. First-period interest = £1,000 × 0.001 = £1; closing balance = £1,001.
2. Second-period interest = £1,001 × 0.002 = £2.002; closing balance = £1,003.002.
3. Combined factor = (1 + j₁)(1 + j₂) = 1.001 × 1.002 = 1.003002.
4. Total interest = £3.002; final balance rounds once, at the end, to **£1,003.00**. Keep the unrounded £1,003.002 to see the extra £0.002 earned on first-period interest.

Simply adding the period returns gives 0.003 = 0.30%, whereas compounding gives 0.003002 = 0.3002% for both periods together. The tiny difference is real even if final currency rounding hides it. Actual overnight calculations would require the contract's observation dates, annualisation/day count and other terms; the slide does not specify these, and the toy example does not supply them.

<a id="fra-notation"></a>
## 6. Read the symbol, not an obsolete label

The lecture says later **FRA** examples use a generic market reference rate **R_M**, while older textbooks may label that quantity “LIBOR.” FRA stands for **forward rate agreement**: a contract concerning an interest rate for a future period. This sentence is a vocabulary bridge, not its settlement formula. In R_M, the subscript M labels “market”; it is not multiplication by M or a compounding frequency. [L3 physical p5, lower teaching-convention box; `lecture-3-p005-fra-convention`](../../sources/annotated/lecture-3/page-005.md#lecture-3-p005-fra-convention).

A safe reading habit is to ask: “Which future interest period, currency, quote convention and contract-defined observation does R_M represent?” Seeing “LIBOR” in an old worked example does not authorise substituting any overnight observation into it unchanged. The generic symbol is a notation choice, not evidence that all benchmarks have identical economic meaning or settlement rules. Full FRA valuation is outside this lesson.

<a id="limits"></a>
## Misconceptions and boundaries

- **Different dates can be ignored because the currency matches:** matching currency is necessary, not sufficient. State a comparison date and rate convention.
- **5% discounting means remove 5% of the future payment:** reverse the accumulation factor; £105/1.05 = £100, not £99.75.
- **Government, policy and reference are synonyms:** classify by issuer/transaction/function. A benchmark may measure transactions related to a secured borrowing market; the categories describe roles, not necessarily disjoint universes.
- **A risk-free model removes every economic risk:** the source's definition concerns default; do not turn it into a promise about real investments.
- **Overnight automatically means an overnight percentage is an annual quote:** distinguish the transaction horizon from quotation/annualisation. Our j₁,j₂ were explicitly period returns.
- **A historical statement or benchmark name establishes current legal/contract terms:** it does not. No present-day benchmark verification is attempted here.

<a id="practice"></a>
## Supplemental practice — attempt before looking below

<a id="exercise-timeline-prompt"></a>
### 1. Timeline scaffold (outcome 1)
A saver pays £200 today and receives £210 one year later. Under the same 5%, one-year convention as the worked example, label the signed cash flows and find the present value of the receipt. Explain why £10 is not by itself a present-value profit. [Answer](#exercise-timeline-answer).

<a id="exercise-classify-prompt"></a>
### 2. Classify with a reason (outcome 1)
Name the family for each description: (a) a central bank's announced rate target; (b) the yield on a government's five-year debt; (c) borrowing supported by pledged securities; (d) a transaction-based named input in a loan. Does (b) prove absence of default risk? Give two characteristics that might make two government yields differ. [Answer](#exercise-classify-answer).

<a id="exercise-benchmarks-prompt"></a>
### 3. Source-era comparison (outcome 2)
Expand SONIA and SOFR; state their currencies/horizons and the collateral detail that p5 gives for SOFR. How does the slide frame LIBOR? Explain why your answer is not a current-market or legal verification. [Answer](#exercise-benchmarks-answer).

<a id="exercise-overnight-prompt"></a>
### 4. Transfer the compounding reasoning (outcome 2)
£2,000 earns already-periodic returns of 0.10% and 0.20% in two successive toy days, with all interest retained and no costs/default. Find each closing balance, final interest and total period percentage return. Keep precision until the final penny. Identify the additional convention information needed if those percentages were instead annual quotes. [Answer](#exercise-overnight-answer).

<a id="exercise-fra-prompt"></a>
### 5. Diagnose notation (outcome 2)
Someone reads R_M in a later FRA example and says, “M is the number of compounding periods; replacing an old LIBOR label by SOFR leaves every calculation unchanged.” Correct both claims. Name three contractual details to check before any numerical calculation. [Answer](#exercise-fra-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 6. Teach back dated value and rate choice (outcome 1)
Explain to a beginner why the date belongs on a payment, why rate families differ, and what “risk-free” assumes. Include the central-bank/borrower distinction and one reason collateral does not erase all risk. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 7. Teach back the benchmark boundary (outcome 2)
Using the two-day £1,000 example, explain why the second interest amount exceeds £2. Then explain the different roles of “overnight,” “annual quote,” “LIBOR in older material” and R_M. Do not claim you have verified a live benchmark specification. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## Supplemental answers — not official supplied solutions

<a id="exercise-timeline-answer"></a>
### Answer 1
Today's flow is −£200; the one-year receipt is +£210. Present value = £210/1.05 = **£200**. Reinvestment check: £200 × 1.05 = £210. The £10 nominal interest compares two dates; under the assumed discount factor, the receipt and initial principal have equal present values. If you subtracted 5% from £210, retry division by the growth factor rather than a percentage reduction.

<a id="exercise-classify-answer"></a>
### Answer 2
(a) Policy: set/targeted by a central bank. (b) Government bond: yield on government debt. (c) Repo: secured borrowing with securities collateral. (d) Reference: a benchmark input. Government issuance alone does not establish no default risk. Any two of currency, maturity, liquidity and sovereign credit risk answer the final part. If every answer was “risk-free,” retry by asking who sets the rate or what transaction it measures.

<a id="exercise-benchmarks-answer"></a>
### Answer 3
SONIA: **Sterling Overnight Index Average**, eligible overnight GBP transactions in the slide. SOFR: **Secured Overnight Financing Rate**, overnight USD borrowing collateralised by US Treasury securities. The supplied lecture calls LIBOR historical and states all settings had permanently ceased. This reports the source's wording; it is not a fresh determination of dates, regulations, eligibility or any contract's replacement provisions. If you interchanged currencies, underline “Sterling” before trying again.

<a id="exercise-overnight-answer"></a>
### Answer 4
j₁ = 0.001 and j₂ = 0.002 are already period returns. First closing balance = 2000 × 1.001 = **£2,002**. Second = 2002 × 1.002 = **£2,006.004**, rounded **£2,006.00**. Unrounded interest = £6.004, rounded £6.00. Total return = 6.004/2000 = **0.003002 = 0.3002%**. Annual quotes would require period lengths, annualisation/day-count and compounding/contract terms before obtaining j₁,j₂. If you obtained exactly £6 before rounding, you omitted interest on the first day's £2.

<a id="exercise-fra-answer"></a>
### Answer 5
M labels the market reference rate, not frequency; frequency is a separate convention. The lecture uses a generic market-rate symbol where older text might use LIBOR. Relabelling alone does not establish benchmark equivalence. Check, for example, currency, start/end dates of the interest period, quote/day-count convention, observation timing and settlement terms. Any three are acceptable, but the explanation must reject automatic substitution. If you wrote a settlement formula, pause: this lesson supplies no complete settlement specification.

<a id="exercise-explain-teachback-answer"></a>
### Answer 6 — model checklist
An adequate account says cash now can be used before a future receipt, so a stated rate and date are needed for a value comparison. A government yield measures government debt, a policy rate is set/targeted for monetary policy, repo describes secured borrowing and a reference benchmark is a contract input; these roles need not give the same number. A central bank's target is not automatically a borrower's rate. The risk-free model assumes no default, while collateral's value and contractual arrangements still matter. If the explanation lists names without reasons, retry one family using “who sets it/what does it measure?”

<a id="exercise-apply-teachback-answer"></a>
### Answer 7 — model checklist
£1,000 becomes £1,001 first, so the next 0.20% applies to £1,001 and earns £2.002, not £2. The combined factor is 1.001 × 1.002, not merely 1 + 0.001 + 0.002. “Overnight” describes a horizon; an annual quote still needs translation to its interest period. The lecture's old-LIBOR wording is historical context; R_M is its generic market reference-rate label, not a guarantee of equivalent contracts. A sufficient teach-back keeps these distinctions and avoids claiming current verification. If multiplication is unclear, retry the first day's £1 interest before adding the second day.

<a id="stop"></a>
## Stop and check understanding

Give your own answers to exercises 6–7 before proceeding. A tutor should check dates, currency, family classification and benchmark limitations separately, offer feedback, then ask for a retry on the missed distinction. Keep responses in private learner notes, not this authored file. Next: [quoted rates, compounding and present value](lesson-l3-discrete-compounding.md#outcomes). Reading the answers does not establish mastery.

<a id="evidence"></a>
## Source evidence and scope

All 12 substantive units on physical pp3–5 have exact citations above. Full normalized/raw pages and all three original images were read/displayed. Normalized pages retain extraction-era review wording; canonical source units are verified. That verification does not approve this teaching draft. No source-error correction is needed for these units; historical statements remain explicitly attributed.

| Physical page | Complete normalized text | Raw text | Original image |
|---|---|---|---|
| 3 | [Page 3](../../sources/annotated/lecture-3/page-003.md) | [Raw 3](../../sources/extracted/lecture-3/page-003.md#page-3) | [Original 3](../../sources/assets/lecture-3/page-003.png) |
| 4 | [Page 4](../../sources/annotated/lecture-3/page-004.md) | [Raw 4](../../sources/extracted/lecture-3/page-004.md#page-4) | [Original 4](../../sources/assets/lecture-3/page-004.png) |
| 5 | [Page 5](../../sources/annotated/lecture-3/page-005.md) | [Raw 5](../../sources/extracted/lecture-3/page-005.md#page-5) | [Original 5](../../sources/assets/lecture-3/page-005.png) |
