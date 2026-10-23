# Signed cash flows, percentages, units, time and equations

**SUPPLEMENTAL prerequisite bridge — author draft, awaiting independent review.** These explanations, examples, exercises and answers supply mathematics needed by the lectures; they are not a claim that the slides already teach it. No prior financial knowledge is required. Prepared content does not establish learner mastery.

<a id="numeric-outcomes"></a>
## Start here: what you will be able to do

A contract formula can be short while hiding its most important choices: whose money, which currency, how many units and which date? After this bridge, you should be able to:

1. Compute a signed net cash flow and reverse it for the opposite party.
2. Convert percentages, percentage-point changes and basis points to decimals.
3. Track currency/quantity units, form ratios and convert months to years under a stated convention.
4. Rearrange a simple equation, identify forbidden division by zero and substitute the answer back.

Readiness check: explain why receiving £80 and paying £105 leaves **−£25**, not +£25. If unsure, begin with the next section; no later lesson is needed.

<a id="numeric-signs"></a>
## 1. Signs say whose side you are on

A **cash flow** is money received or paid at a stated date. Pick one person's viewpoint and keep it fixed: receipt is positive (+), payment negative (−). A negative number is below zero; adding a negative amount reduces the balance. Thus +80 + (−105) = 80 − 105 = −25. A net amount adds all flows measured in the **same currency at the same date**. Money received at different dates cannot be compared economically by simple addition without a time-value convention, taught later.

Multiplication is repeated addition: three receipts of £4 give 3 × £4 = £12. A minus sign reverses direction: −(80 − 105) = −80 + 105 = +25. A negative times a positive is negative; two negatives multiply to a positive. Parentheses specify what to do together. Compute parentheses first, then powers (repeated multiplication), then multiplication/division, then addition/subtraction. For example 2 × (8 − 3) = 10, whereas 2 × 8 − 3 = 13.

A **long forward** commits to buy an asset later at agreed price K; the **short** commits to sell it. Let T label the delivery date, S_T denote the market price at that date, and Q the positive number of underlying units. A subscript is a label, not multiplication. Both prices must have the same currency per unit. The long receives an asset worth Q S_T and pays Q K, giving a maturity **value payoff** Q(S_T − K). If physically delivered, the asset receipt is not itself a cash receipt; selling it immediately at S_T would realize that value. The short receives Q K and delivers an asset worth Q S_T, giving Q(K − S_T). These opposite payoffs sum to zero. Payoff alone is not a full profit calculation: earlier premiums, funding, fees and other positions would need separate accounting.

**Worked example (supplemental).** Q = 3 units, K = £105/unit and S_T = £80/unit. Long asset value = 3 × 80 = £240; payment = −3 × 105 = −£315; net = −£75. Short receipt = +£315; delivery value = −£240; net = +£75. Check: 3 × (80 − 105) = −75 and −75 + 75 = 0. If S_T = K, both value payoffs are zero, although delivery/payment still occur.

<a id="numeric-rates"></a>
## 2. Percent means “per hundred”

A fraction a/b means a divided by b, with b ≠ 0. For example 1/4 = 0.25. A percentage is a dimensionless fraction expressed per 100: 5% = 5/100 = 0.05. Multiply by 100 to turn a decimal into a percentage. A 5% increase in £200 is £200 × 0.05 = £10, giving £210 = £200 × (1 + 0.05). A 5% decrease gives £190 = £200 × (1 − 0.05). Percentages operate on a stated base, not on an unspecified number.

A rate moving from 4% to 5% rises by **1 percentage point**, equal to 0.01 in decimal-rate units. Its **relative increase** is (0.05 − 0.04)/0.04 = 0.25 = 25%. These are different questions. One **basis point (bp)** is 0.01 percentage point = 0.0001 decimal; 10 bp = 0.001 decimal, not 0.10 decimal. A change symbol Δ (capital delta) means “new minus old”: Δr = r_new − r_old. The slash in a ratio is division.

**Worked example (supplemental).** An annual rate rises from 4.00% to 4.25%. New decimal rate = 0.0425; old = 0.04; Δr = 0.0025 = 0.25 percentage point = 25 bp. Relative increase = 0.0025/0.04 = 0.0625 = 6.25%. A 25 bp move is not a 25% move in the rate.

<a id="numeric-units"></a>
## 3. Units are part of the calculation

Only add quantities with matching units: USD cannot be added directly to GBP, nor a price in USD/barrel to an amount in USD. Multiplication and division carry units too. With an exchange quotation of 1.25 USD/GBP, £80 × 1.25 USD/GBP = $100: GBP cancels. To convert $100 back, divide by 1.25 USD/GBP, giving £80. Reversing the quote means taking its **reciprocal**, 1/1.25 = 0.8 GBP/USD, not retaining 1.25.

**Worked currency payoff (source-motivated arithmetic).** Q = 1,000,000 GBP, K = 1.5532 USD/GBP and S_T = 1.6500 USD/GBP. First S_T − K = 0.0968 USD/GBP. Then Q(S_T − K) = 1,000,000 GBP × 0.0968 USD/GBP = +96,800 USD. The short's payoff is −96,800 USD. If S_T = 1.4500, the long instead gets 1,000,000 × (−0.1032) = −103,200 USD. The original table shows these two signs and zero at S_T = K; it is a table of maturity value payoffs, not exchange of the entire commercial exposure.

A **ratio** divides one quantity by another. £30/£120 = 0.25 is dimensionless because currencies cancel. A ratio of quantities in different underlying units may retain units; do not assume every hedge ratio is unitless. A weighted average uses weights adding to 1: 0.25 × £80 + 0.75 × £120 = £110. The products are contributions; their sum lies between £80 and £120 when weights are nonnegative. The symbol Σ, introduced in later bridges, simply means adding a list of terms.

A time interval is a number **and a time basis**. Using equal months for these examples, 6 months × (1 year/12 months) = 0.5 year; 18 months = 1.5 years. An annual rate r = 0.06 per year applied over t = 0.5 year gives dimensionless r t = 0.03. The simple-interest illustration on £1,000 is £1,000 × (1 + r t) = £1,030. This example uses simple interest, not an assumption that every financial rate compounds this way. Actual-day contracts can use different day-count denominators; never silently replace their specified convention by months/12 or days/365. Discounting/compounding later uses matched rate/time bases.

<a id="numeric-algebra"></a>
## 4. Rearrange without changing the equality

An equation says two expressions have equal values. A variable is a symbol for a quantity; a constant is held fixed in the current calculation. To isolate a variable, do the **same operation to both sides**. Addition reverses subtraction; multiplication reverses division, provided the divisor is not zero. Distributing Q over parentheses gives Q(S − K) = QS − QK.

**Worked example (supplemental).** A positive quantity Q = 200 units has payoff P = −£600 at price S = £47/unit. Find delivery price K from P = Q(S − K).

1. Divide both sides by Q: P/Q = S − K. Units: £/unit on each side.
2. Add K to both sides and subtract P/Q: K = S − P/Q.
3. Substitute: K = 47 − (−600/200) = 47 − (−3) = £50/unit.
4. Check in the original equation: 200 × (47 − 50) = −£600.

The sign matters: subtracting a negative adds its magnitude. If Q = 0, division by Q is forbidden and this payoff equation cannot identify K: every K gives zero payoff. Keep intermediate precision; round money at the stated final unit (here exact pounds). An approximate equality uses ≈ rather than =.

<a id="numeric-practice"></a>
## Supplemental graded practice — attempt before the answers

1. **Signs:** From the buyer's viewpoint, value received is £90 and payment £100. Find the net and the seller's opposite net; explain why this does not by itself state total profit.
2. **Rates:** Convert 7.5% and 35 bp to decimals. A rate moves from 4% to 3.5%: give its decimal change and percentage-point change.
3. **Units/time:** Convert £2,000 at 1.20 USD/GBP. Convert 9 months to years using months/12. Find simple interest on £2,000 for this period at 8% per year.
4. **Algebra:** Solve P = Q(S − K) for S when P = £120, Q = 40 units and K = £10/unit. Explain what fails if Q = 0.
5. **Teach-back:** A friend writes “25 bp = 25%; a short always loses; 6 months means t = 6 in an annual-rate formula.” Correct each statement and identify a unit/sign check.

<a id="numeric-answer-signs"></a>
### Answer 1 — signed value

Buyer: 90 − 100 = −£10; seller: 100 − 90 = +£10. Earlier costs/receipts and dates are not included, so these are not automatically total profits. If the asset is delivered, “value received” must not be mislabeled an actual cash receipt.

<a id="numeric-answer-rates"></a>
### Answer 2 — rates

7.5/100 = 0.075; 35/10,000 = 0.0035. Change = 0.035 − 0.04 = −0.005, or −0.5 percentage point (−50 bp). The direction is down.

<a id="numeric-answer-units"></a>
### Answer 3 — units and time

2,000 GBP × 1.20 USD/GBP = 2,400 USD. Time = 9/12 = 0.75 year. Simple interest = £2,000 × 0.08/year × 0.75 year = £120; final amount = £2,120. The currency conversion and interest calculation are separate questions, not two stages of the same investment.

<a id="numeric-answer-algebra"></a>
### Answer 4 — algebra

P/Q = S − K, so S = K + P/Q = 10 + 120/40 = £13/unit. Substitution gives 40 × (13 − 10) = £120. When Q = 0, division is invalid: nonzero P is inconsistent; P = 0 would leave S unidentified.

<a id="numeric-answer-teachback"></a>
### Answer 5 — teach-back and diagnosis

25 bp = 0.0025 decimal = 0.25%, not 25%. A short forward gains when S_T < K and loses when S_T > K. Six months is 0.5 year under months/12. If you missed a sign, rewrite actual receipts/payments first. If off by 100, write “percent ÷ 100.” If off by 12, write the time-unit cancellation. Retry with one unit and one year before restoring the full quantity. A numerical answer without these conventions is not sufficient.

<a id="numeric-evidence"></a>
## Evidence motivation and scope

- Lecture 1, physical p22, lower general-result box, left equation: [long payoff unit](../../sources/annotated/lecture-1/page-022.md#lecture-1-p022-long-payoff-formula); [full original p22](../../sources/assets/lecture-1/page-022.png). The original table shows £80/£105/£130 asset values against a £105 payment, yielding −£25/£0/+£25. The opposite-side explanation also follows the right-hand short formula on this same inspected page.
- Lecture 1, physical p25, upper equation: [currency payoff unit](../../sources/annotated/lecture-1/page-025.md#lecture-1-p025-currency-payoff-formula); [full original p25](../../sources/assets/lecture-1/page-025.png). The table motivates unit cancellation and sign checks.

All other arithmetic scaffolding is explicitly supplemental, not additional claimed lecture coverage. These citations motivate the bridge; they do not certify that the sources teach percentages or equation rearrangement. No personal learner answers belong in this authored page.
