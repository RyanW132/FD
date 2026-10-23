# Currency-consistent arbitrage and protective puts

<a id="status"></a>

**Unreviewed teaching draft — Lecture 2, physical pages 7–9.** This lesson preserves the original page 7 currency-label error; its displayed $3 spread is taught only under an explicit intended-GBP interpretation. New explanations, conditional alternatives, exercises and worked-answer reasoning are **supplemental**, not official corrections or official solutions. This is prepared teaching, not evidence of learner mastery or investment advice.

<a id="motivation"></a>

## Two different reasons to combine trades

A trader seeing two prices for the same share asks whether buying in one market and selling in the other locks in a gain. A share owner fearing a price fall asks whether an option can limit the damage. The first question is about **inconsistent prices**, the second about **reducing an existing exposure**. Both require keeping track of every leg, currency and initial cost. A gross price difference is not automatically net profit; a protected terminal value is not automatically profit either.

<a id="outcomes"></a>

## What you will be able to do

1. **Explain the two structures and their limitations:** given the original quotes and a share owner's proposed put hedge, identify the page 7 currency conflict, distinguish conditional arbitrage from a directional bet, name the execution assumptions, and explain how a purchased put protects a matched holding. Success requires preserving the literal and intended readings separately, identifying premium/strike and value/profit distinctions, and describing the protection without claiming a free hedge or maximum profit.
2. **Construct and calculate both positions:** given explicit quote currency, exchange rate, costs, share quantity, put strike, premium and contract size, show the arbitrage cash-flow legs in one currency and compute the put count, premium, terminal table, value floor and premium-adjusted result. Success requires correct trade directions, signs, units and intermediate steps; all currency totals to the cent; both currency interpretations and all source table rows checked; and a teach-back diagnosing an incorrect profit claim.

**Supplemental readiness check:** Which multiplication converts £100 to dollars if one pound buys $1.53? If you can sell a share for $27.50 when its market price is $20, what is the advantage per share? The next section explains these foundations before using them.

<a id="foundations"></a>

## 1. Foundations: currency, cash-flow signs and option rights

**USD** means US dollars ($); **GBP** means pounds sterling (£). A price needs a currency **and** an asset unit: “100” alone is not a comparable share price. An **exchange-rate quote** of 1.5300 USD per GBP says one pound exchanges for 1.53 dollars. The extra trailing zeros show the displayed precision; they do not change the value. It is not a percentage or interest rate.

**Supplemental units bridge:** multiply a pound amount by dollars per pound to get dollars: GBP × USD/GBP = USD. To reverse the conversion, divide a dollar amount by USD/GBP to get GBP. A share price in GBP/share multiplied by USD/GBP becomes USD/share. Multiplying a USD/share price by USD/GBP instead leaves mismatched currency units; the arithmetic number alone does not make it a valid conversion.

Cash paid is negative; cash received positive. A **gross spread** is the sale price less purchase price before costs. **Net profit** must also subtract all relevant costs. “Simultaneous” means the buy, sell and necessary currency conversion can be locked at the specified quotes, rather than waiting and hoping for a favourable later price.

A **put option** gives its buyer the right, not an obligation, to **sell** the specified underlying share at the **strike**. The **premium** is paid initially to buy that right; the strike is the future sale price if the put is exercised. A **protective put** combines ownership of a share with a purchased put on that same share. The holding already loses value when the share falls; the put's sale right becomes more valuable in that case. Buying a put without the matching share need not be hedging—it can be a bet on a fall.

The expression $\max(a,0)$ selects the larger of $a$ and zero. A put at maturity has payoff $\max(K-S_T,0)$ per covered share: if the strike exceeds the market price, selling at the strike adds $K-S_T$; otherwise the buyer need not use a disadvantageous sale right. This is **payoff**, before deducting the premium, not the entire amount received when selling a physically delivered share.

| Symbol | Meaning | Unit/convention |
|---|---|---|
| $P_L$, $P_N$ | London and New York prices for the same share | Explicit currency per share; the London currency is the source conflict |
| $X$ | Exchange rate | USD per GBP; 1.5300 in the source |
| $g$ | London-equivalent price minus New York price, before costs | USD per share; its sign indicates which market is dearer |
| $C$ | Total trading and related costs in a supplemental spread calculation | USD per share, all converted consistently |
| $q$ | Shares held and matched by puts | Shares; 1,000 in the source |
| $m$, $n$ | Shares per option contract; number of contracts | 100 shares/contract; 10 contracts in the source |
| $S_0$, $S_T$ | Share price initially and at maturity | USD/share; $28 initially, $S_T$ unknown initially |
| $T$ | Put maturity | Two months after buying the protection |
| $K$ | Put strike | USD/share; $27.50 |
| $p_0$ | Put premium initially per covered share | USD/share; $1 |
| $V_T$ | Terminal value of shares plus put payoff | USD; not profit |
| $\Pi_T$ | Supplemental profit/change-in-wealth measure relative to today's share value plus premium | USD; benchmark and omitted financing stated below |

For the protective-put calculations, assume identical shares, fully matched quantity, matching two-month expiry, honoured option obligations and ability to realise terminal share value. We ignore dividends, fees, taxes and interest/financing adjustments, making the source's simple arithmetic explicit. There is no annual rate or percentage calculation here. Two months locates maturity and is not multiplied into a payoff. We consider expiry only; no early-exercise style or option pricing model is inferred.

<a id="quote-conflict"></a>

## 2. Read the original currency error before calculating

The original image's upper list says prices are observed simultaneously and prints **London share price: $100**, **New York share price: $150**, and **1.5300 USD per GBP**. The dollar glyph on London is present in the original, not just damaged text extraction. [L2 physical p7, upper simultaneous-price list; `lecture-2-p007-cross-market-quotes`](../../sources/annotated/lecture-2/page-007.md#lecture-2-p007-cross-market-quotes).

The middle box prints **$100 × 1.5300 = $153** and says the share is $3 cheaper in New York. [L2 physical p7, middle compare-prices box; `lecture-2-p007-currency-conversion`](../../sources/annotated/lecture-2/page-007.md#lecture-2-p007-currency-conversion).

Those statements cannot all be used literally as a USD/GBP conversion. We retain the source error and make the alternatives explicit:

| Reading | London price in USD/share | New York price in USD/share | London minus New York | Conditional cheaper market |
|---|---:|---:|---:|---|
| **Intended-GBP interpretation:** assume London was meant to be £100 | 100 GBP/share × 1.53 USD/GBP = 153 | 150 | +3 USD/share | New York |
| **Literal-dollar interpretation:** assume both printed dollar labels mean USD | 100, already USD/share | 150 | −50 USD/share | London |

The first row is a **conditional interpretation**, not a silently corrected quotation or official correction. The second is a **supplemental conditional alternative**. It does **not** prove there is no possible arbitrage: with genuinely identical, transferable shares and frictionless executable trades, the literal USD100 versus USD150 case could support a **reverse-direction gross spread of USD50**, buying London and selling New York. What fails under the literal reading is the slide's particular $3/buy-New-York conclusion. If the dollar labels' currency cannot be established, first resolve it rather than assume an executable trade.

<a id="currency-arbitrage"></a>

## 3. Work the intended-GBP case leg by leg

The source's lower strategy says buy in New York for $150 and simultaneously sell in London for the equivalent of $153, giving $153 − $150 = **$3 per share**. This conclusion is conditional on London meaning **£100**. [L2 physical p7, lower arbitrage-strategy box; `lecture-2-p007-arbitrage-trade`](../../sources/annotated/lecture-2/page-007.md#lecture-2-p007-arbitrage-trade).

**Supplemental complete walkthrough of that conditional source case:**

1. **Specify comparability:** one economically identical share can satisfy the London sale after being acquired in New York; both quotes and the currency rate are executable for that quantity at the same time.
2. **Buy the cheaper share in New York:** cash outflow **−USD150**; receive one share.
3. **Sell the matching share in London:** deliver one share; cash inflow **+GBP100**.
4. **Lock the currency conversion:** GBP100 × 1.5300 USD/GBP = **USD153** received. Exchanging GBP100 means no residual pound exposure remains in this idealised transaction.
5. **Net the dollar legs:** +USD153 − USD150 = **+USD3 gross per share**. The share bought and share delivered offset, so the argument does not depend on predicting its later price.
6. **Check units and direction:** GBP/share × USD/GBP = USD/share; $153 exceeds $150, so buy New York/sell London is the correct direction under this interpretation. At equal converted prices the gross spread would be zero. No rounding is required.

**Supplemental scale check:** for 100 shares, the New York purchase is USD15,000; the London sale yields GBP10,000, converted to USD15,300. Gross proceeds less purchase cost = **USD300**. Scaling does not remove execution limits or funding needs.

A textbook-style “locked spread” is not a claim that the trader needs no operational funds. If payment must precede sale receipts, temporary funding is needed. If the sale is executed before owned shares are deliverable, permission and ability to borrow/sell shares short may be needed. **Short selling** means selling borrowed shares with an obligation to return matching shares; the purchased shares would cover that obligation. These are supplemental implementation assumptions, not extra facts supplied by the slide.

<a id="arbitrage-limits"></a>

## 4. Preserve the complete source caveat

The original small line reads: **“Ignoring transaction costs, taxes, bid–ask spreads, trading restrictions, and settlement”**. It visibly ends at **settlement**; this lesson does not invent a missing continuation. [L2 physical p7, small line immediately above footer; `lecture-2-p007-arbitrage-assumptions`](../../sources/annotated/lecture-2/page-007.md#lecture-2-p007-arbitrage-assumptions).

**Supplemental explanation of why each item matters:**

- **Transaction costs:** fees for arranging or executing the share and currency trades reduce the gross spread.
- **Taxes:** relevant tax payments can reduce net receipts; none are calculated in the slide.
- **Bid–ask spreads:** the bid is the price at which you can sell; the ask is the price at which you can buy. A quoted midpoint or last trade need not be executable on either side. Use the buy-side ask and sell-side bid, including the executable currency conversion.
- **Trading restrictions:** the right to trade, move, borrow or short the same share cannot be assumed from a screen price.
- **Settlement:** the actual exchange of cash and shares may happen at different times or fail. We retain the exact truncated source wording while explaining that timing separately, not pretending the source supplied more text.

**Additional supplemental assumptions:** sufficient liquidity (the ability to transact the required quantity at the quoted prices), permitted and available short borrowing when needed, affordable funding between payments and receipts, and reliable counterparties (no failure to pay or deliver). A discrepancy on a screen is not a riskless executable profit unless the relevant legs and obligations really match. Credit/default risk means a party may not perform. These qualifications do not turn a speculative hope into arbitrage; they specify what a genuine locked-spread argument must establish.

For the intended-GBP direction, write $g=P_LX-P_N$, with $P_L$ in GBP/share. A simplified supplemental net calculation is **net per share = $g-C$**, provided $C$ captures all applicable costs on the same basis. For example, a $3 gross spread less $1.20 all-in cost gives **$1.80** net per share; less $3.50 gives **−$0.50**. Costs can erase the opportunity. Under the literal-USD reading, do not multiply London by $X$; the buy-London/sell-New-York gross spread is $150 − $100 = $50 before its own costs.

<a id="put-inputs"></a>

## 5. Protect the position you already own

**Source scenario:** an investor owns **1,000 shares worth $28 each**. A **two-month put** has strike **$27.50** and costs **$1 per share**. [L2 physical p8, upper scenario; `lecture-2-p008-protective-put-inputs`](../../sources/annotated/lecture-2/page-008.md#lecture-2-p008-protective-put-inputs).

**Supplemental motivation:** the initial holding is worth 1,000 × $28 = **$28,000**. The owner is already exposed to a fall. Buying a matching sale right limits the terminal value lost if the price falls below $27.50 while retaining ownership's upside. It does not promise that the share will remain worth $28 or that the insurance is free.

<a id="put-sizing"></a>

**Source hedge:** buy **10 put contracts**, each covering **100 shares**, so 10 × 100 = **1,000 protected shares**. The total premium is 1,000 × $1 = **$1,000** initially. [L2 physical p8, middle hedge box, contract count and premium; `lecture-2-p008-protective-put-contracts`](../../sources/annotated/lecture-2/page-008.md#lecture-2-p008-protective-put-contracts).

**Supplemental sizing derivation:** required contracts $n=q/m=1,000/100=10$. Units cancel as shares ÷ shares/contract = contracts. A single contract's premium is 100 × $1 = $100; 10 contracts × $100 = $1,000. The whole share holding and every covered right match. Fractional contract needs would require a separate rounding/coverage decision; these source inputs divide exactly.

<a id="put-value"></a>

## 6. Derive the combined terminal value

At maturity, first value the shares, then add the put's **incremental payoff**:

1. The shares have market value $qS_T$.
2. Each put-covered share adds $\max(K-S_T,0)$ above the market-value basis. Multiply by the matching $q$ shares.
3. Add both components. For the source inputs the result is

$$V_T=1{,}000S_T+1{,}000\max(27.50-S_T,0).$$

Plain text: **combined terminal value = share market value + put exercise payoff**. This is the source's formula, with supplemental derivation. [L2 physical p9, upper maturity-value formula; `lecture-2-p009-protective-put-value`](../../sources/annotated/lecture-2/page-009.md#lecture-2-p009-protective-put-value).

Why is the put term not the entire strike payment? If you physically exercise, you deliver the shares and receive the strike amount. The formula instead begins by counting the shares' market value, then adds only the improvement obtained from selling above market. Counting both the shares and the full strike receipt while forgetting delivery would double-count the asset. Whether value is realised through physical exercise or an equivalent permitted settlement, use one consistent set of legs.

<a id="worked-put"></a>

## 7. Answer the source's downside question completely

The source asks what happens to the combined position if the price falls to **$20**. [L2 physical p8, lower question box; `lecture-2-p008-protective-put-question`](../../sources/annotated/lecture-2/page-008.md#lecture-2-p008-protective-put-question).

**Supplemental worked explanation, matching the source's next-page results:**

1. Share value becomes 1,000 × $20 = **$20,000**.
2. The right to sell at $27.50 instead of $20 adds $27.50 − $20 = **$7.50 per share**.
3. Total put payoff is 1,000 × $7.50 = **$7,500**.
4. Combined terminal value is $20,000 + $7,500 = **$27,500**.
5. Physical-exercise check: deliver all 1,000 shares for 1,000 × $27.50 = **$27,500 cash**. You do **not** also retain the delivered shares. This agrees with the value-plus-increment method.
6. Initial premium was **$1,000**. The $27,500 terminal value does not already subtract it. It is also not a $27,500 profit; the investor already owned a valuable holding.

No rounding is required. The price falls below the strike, so a positive put payoff and a terminal floor are consistent with the intended protection.

<a id="source-table"></a>

### Every row of the source table

Accessible transcription; prices are USD/share and remaining columns are total USD for 1,000 shares. [L2 physical p9, central share-put-combined-value table; `lecture-2-p009-protective-put-table`](../../sources/annotated/lecture-2/page-009.md#lecture-2-p009-protective-put-table).

| $S_T$ | Share value | Put payoff | Combined hedged value |
|---|---:|---:|---:|
| $20.00 | $20,000 | $7,500 | $27,500 |
| $27.50 | $27,500 | $0 | $27,500 |
| $35.00 | $35,000 | $0 | $35,000 |

**Supplemental reading guide:** below the strike the put exactly offsets further share-price falls in this matched model. At the strike the put has no incremental payoff, but the shares already meet the floor. Above the strike the put need not be exercised; the investor retains the higher share value. The hedge limits downside rather than replacing every outcome with a fixed $27,500.

<a id="floor"></a>

## 8. Prove the floor, then distinguish value from profit

The source states a **minimum terminal value of $27,500**, with protection costing **$1,000 initially**. [L2 physical p9, lower interpretation box; `lecture-2-p009-protective-put-floor`](../../sources/annotated/lecture-2/page-009.md#lecture-2-p009-protective-put-floor).

**Supplemental two-case derivation:**

- When $S_T<K$, put payoff per share is $K-S_T$. Combined value is $qS_T+q(K-S_T)=qK$: the negative and positive $qS_T$ terms cancel.
- When $S_T\ge K$, put payoff is zero. Combined value is $qS_T$, which is at least $qK$.

Thus, for a perfectly matched share-plus-put position, **$V_T=q\max(S_T,K)$**, and its floor is **$qK$**. For 1,000 shares × $27.50/share, that is $27,500. A price of zero would give share value zero plus put payoff $27,500; at $35, the higher $35,000 remains available. The floor assumes performance and the matching terms already stated, not every real-world risk disappearing.

**Supplemental premium/profit distinction:** subtracting just the original $1,000 premium from $V_T$ gives a **premium-adjusted terminal amount** with minimum **$26,500**, under the no-interest convention. That is still not total profit, because the initial shares had value too.

The source says the investor already owns shares worth $28 each; it does **not** give their historical acquisition cost. We therefore cannot infer lifetime profit on that holding. To assess the change from **today's** wealth, use today's $28,000 share value plus the $1,000 premium as a stated benchmark:

$$\Pi_T=V_T-qS_0-qp_0=V_T-29{,}000.$$

Plain text: **change from today's share value, including hedge cost = terminal value − today's share value − initial premium**. This supplemental arithmetic ignores interest, dividends and other costs; it is not a source-supplied historical-profit figure. If shares were newly purchased today for $28 each, the same $29,000 would be their purchase-plus-premium expenditure.

| Source maturity price | Terminal value | Less premium only | Change relative to $28,000 shares plus $1,000 premium |
|---|---:|---:|---:|
| $20.00 | $27,500 | $26,500 | **−$1,500** |
| $27.50 | $27,500 | $26,500 | **−$1,500** |
| $35.00 | $35,000 | $34,000 | **+$6,000** |

This is a **supplemental** interpretation table, not a relabelled source table. At $20 the unhedged holding's change from today's $28,000 would be $20,000 − $28,000 = **−$8,000**. The hedge improves that result to −$1,500 after its premium, but does not prevent every loss. At $35 the unhedged gain would be $7,000, while the hedged gain is $6,000: the protection cost money even when unused. Hedging limits an identified risk; it does not guarantee maximum profit.

**Supplemental graph description:** horizontal axis is maturity share price in USD/share; vertical axis is combined terminal value in USD. The unhedged 1,000-share line rises from zero by $1,000 per $1 price increase. The protected line is flat at $27,500 up to $27.50/share, then follows the share-value line above that price. Deducting the fixed $1,000 premium shifts the entire protected curve down $1,000; deducting today's shares as well shifts it to the supplemental profit/change-in-wealth basis. Do not label the value curve “profit.” The source shows the table and formula, not this graph; the description is an authored aid.

<a id="limits"></a>

## 9. Misconceptions and limits

- **“The London quote is really £100, so there is no issue.”** The image prints a dollar sign. Preserve it and state the conditional intended-GBP reading rather than rewrite evidence.
- **“Literal dollars mean no arbitrage could exist.”** Literal USD100 versus USD150 could support the opposite-direction gross trade if the same-share and execution assumptions hold; it does not yield the slide's $3 trade.
- **“The $3 spread is riskless net profit in any market.”** It is a gross difference under idealisations. Costs, executable bid/ask quotes, funding, short access, liquidity and settlement can change the conclusion.
- **“One put contract protects one share.”** Use the specified multiplier: 100 shares here, not a universal rule for all contracts.
- **“The protected value is $27,500 profit.”** It is terminal value before the premium and before any initial-share benchmark. The source does not state historical purchase cost.
- **“The hedge fixes all outcomes at the floor.”** It fixes a minimum in the matched expiry model, not a maximum. Upside remains, reduced by the premium when assessing the net result.
- **“Option payoff includes the premium.”** The nonnegative put payoff excludes the premium. A purchased put can expire worthless; the premium is then lost on the option alone, even if the share holding gains.
- **“Protection works for any quantity, date or share.”** An unmatched hedge may leave exposure. Default, settlement and changed holdings can also defeat the idealisation. We have not priced an option or calculated its value before expiry.

<a id="practice"></a>

## 10. Practice — progress from units to diagnosis

Exercises 1–3 and 5–8 are supplemental. Exercise 4 repeats the supplied downside question; the worked reasoning is supplemental and the numerical combined value appears in the supplied p9 table. All answers are separately anchored below.

<a id="exercise-explain-scaffold-prompt"></a>

### Exercise 1 — identify the two structures (outcome 1)

Name the conflict between the upper London quote and the page 7 conversion. State which interpretation supports buy New York/sell London and which supports the reverse gross trade. Then explain why owning 1,000 shares and buying puts on those same shares is a hedge, whereas simply buying a put without that holding need not be. Distinguish the premium from the strike. [Answer 1](#exercise-explain-scaffold-answer).

<a id="exercise-arbitrage-scaffold-prompt"></a>

### Exercise 2 — source quotes with explicit units (outcome 2)

Assume London means £100/share, New York USD150/share, and 1.5300 USD/GBP. Show all cash and share legs for one share, then 100 shares. Calculate net per share if all costs total USD1.20/share. Repeat the **direction and gross spread only** when both printed share prices literally mean USD. Do not silently convert a dollar quote as pounds. [Answer 2](#exercise-arbitrage-scaffold-answer).

<a id="exercise-arbitrage-transfer-prompt"></a>

### Exercise 3 — reverse and test costs (outcome 2)

Supplemental executable quotes for identical transferable shares: London **£80/share**, New York **USD105/share**, exchange rate **1.25 USD/GBP**. Assume simultaneous locked execution, reliable settlement, funding and any required short access. Which direction has a gross spread? Show dollar-normalised legs for 10 shares. If all costs total USD6/share, is it a positive net opportunity? Explain why buying the expensive market and hoping for a later rise is a different argument. [Answer 3](#exercise-arbitrage-transfer-answer).

<a id="exercise-source-put-prompt"></a>

### Exercise 4 — source downside question (outcome 2)

For the source owner of 1,000 shares and matching $27.50-strike puts, what happens to the combined position if the share price falls to $20? Show share value, put payoff and combined value. The supplied question is [L2 p8, lower question box](../../sources/annotated/lecture-2/page-008.md#lecture-2-p008-protective-put-question). [Answer 4](#exercise-source-put-answer).

<a id="exercise-put-transfer-prompt"></a>

### Exercise 5 — size and apply a new hedge (outcome 2)

Supplemental case: own 300 shares currently worth $40 each. Matching two-month puts have strike $38 and premium $1.50 per share, with 100 shares per contract. How many contracts and how much premium? For maturity prices $30, $38 and $45, calculate share value, put payoff, combined value and change relative to today's shares plus premium. State the terminal-value floor and the premium-adjusted amount floor separately. Use no-interest/no-extra-cost assumptions and no fractional contracts. [Answer 5](#exercise-put-transfer-answer).

<a id="exercise-limit-teachback-prompt"></a>

### Exercise 6 — teach the limitations (outcome 1)

Explain to a beginner why the printed $3 trade is conditional rather than an unconditional executable profit. Include the exact London-label problem, both possible directions, every item in the source footnote, and the additional short/funding/liquidity/credit assumptions. Then explain why the protective put can be useful even though it does not guarantee the best profit or protect against every risk. [Answer 6](#exercise-limit-teachback-answer).

<a id="exercise-value-diagnosis-prompt"></a>

### Exercise 7 — diagnose value versus profit (outcome 2 teach-back)

A learner says: “At $20, the source owner keeps $20,000 of shares and exercises for another $27,500; therefore the hedge is worth $47,500. The put was free because we only count maturity cash flows. Its $27,500 floor is guaranteed profit.” Correct each claim, show the physical-delivery and incremental-payoff calculations, and distinguish the $27,500, $26,500 and −$1,500 figures with explicit assumptions. [Answer 7](#exercise-value-diagnosis-answer).

<a id="exercise-source-boundaries-prompt"></a>

### Exercise 8 — check every source boundary (outcome 2)

For the source 1,000-share hedge, calculate the missing table rows at $27.50 and $35, including both components. Under the today's-wealth benchmark, find the corresponding premium-inclusive changes. Describe the terminal-value curve and explain why it is flat only below the strike, not above. [Answer 8](#exercise-source-boundaries-answer).

<a id="answers"></a>

## 11. Separate supplemental answers and retries

<a id="exercise-explain-scaffold-answer"></a>

### Answer 1 — preserve the two readings

The original London label is **$100**, while multiplying by USD/GBP only makes the intended conversion if that number is **£100**. Under intended GBP, London equals USD153/share, above New York USD150: buy New York/sell London, gross USD3/share. Under literal USD on both quotes, London USD100 is cheaper: buy London/sell New York, gross USD50/share, conditional on matching executable trades. The slide's $3 does not follow from those literal labels.

The shareholder already suffers from price falls; puts on the matching shares increase their payoff when the share price drops below the strike, reducing that exposure. A put alone can instead introduce a bet on a fall. Premium buys the right initially; strike is the sale price on exercise. In the source they are $1 and $27.50 **per share**, respectively.

**Diagnosis/retry:** if you replaced the dollar glyph silently, restate what the image prints before your assumption. If every put was called a hedge, retry: what existing loss exposure is it offsetting? Without an identified exposure, “hedge” is not established.

<a id="exercise-arbitrage-scaffold-answer"></a>

### Answer 2 — normalise before subtracting

One share: pay **USD150** in New York, receive a share; deliver it in London, receive **GBP100**; convert GBP100 × 1.53 = **USD153**. Net matched share quantity is zero; dollar cash spread is 153 − 150 = **USD3 gross**. For 100 shares, pay **USD15,000**, receive **GBP10,000**, convert to **USD15,300**, leaving **USD300 gross**. With cost USD1.20/share, net is 3 − 1.20 = **USD1.80/share**, or **USD180** for 100 shares under that all-in-cost assumption.

Literal USD quotes: buy London at **USD100**, sell New York at **USD150**; no GBP conversion is required by those two share prices. Gross spread is **USD50/share** (or USD5,000 for 100 shares if the same conditions scale). The London-minus-New-York signed difference is **−USD50**, so reversing the buy/sell direction is essential. No rounding is required.

**Diagnosis/retry:** if $100 × 1.53 was used in the literal case, write the currency units first: USD/share × USD/GBP is not USD/share. Retry with prices already in the same currency: **150 − 100 = 50** for the reverse trade.

<a id="exercise-arbitrage-transfer-answer"></a>

### Answer 3 — a gross spread can fail after costs

London costs £80 × 1.25 USD/GBP = **USD100/share**. New York is **USD105/share**, so buy London and sell New York. For 10 shares, pay **GBP800**, requiring **USD1,000** at the locked exchange rate; receive 10 shares and deliver them for **USD1,050** in New York. Gross is **USD50**, or **USD5/share**. Costs are 10 × USD6 = **USD60**, leaving **−USD10 total**, or **−USD1/share**. Thus this specified direction is not a positive net opportunity after those costs. At equal converted prices its gross spread would be zero even before costs.

Buying at the expensive price and hoping for a later rise leaves future price exposure; it is speculation, not locking this simultaneous discrepancy. A positive quoted gap alone cannot establish executable net arbitrage.

**Diagnosis/retry:** if you chose New York as the purchase market because “105 is larger,” first mark the cheaper purchase side. Correct retry: London is USD100 equivalent, so it is the cheaper buy.

<a id="exercise-source-put-answer"></a>

### Answer 4 — source downside, not free profit

Share value = 1,000 × $20 = **$20,000**. Put payoff per share = max($27.50 − $20, 0) = **$7.50**; total payoff = **$7,500**. Combined value = $20,000 + $7,500 = **$27,500**, agreeing with the supplied p9 table. Physical exercise instead delivers the 1,000 shares for $27,500; the two methods describe the same economic value, not two separate holdings to add again. The **$1,000 initial premium** remains a cost outside this terminal-value formula.

**Diagnosis/retry:** if you added the full strike receipt to shares still held, account for what is delivered on exercise. Correct retry: selling the shares means you do **not** keep them as well.

<a id="exercise-put-transfer-answer"></a>

### Answer 5 — a new matched protective put

Contracts = 300 shares ÷ 100 shares/contract = **3 contracts**. Premium per contract = 100 × $1.50 = **$150**; total premium = **$450**. Today's share value = 300 × $40 = **$12,000**; benchmark including premium = **$12,450**.

| $S_T$ (USD/share) | Share value (USD) | Put payoff (USD) | Combined value (USD) | Change from $12,450 benchmark (USD) |
|---|---:|---:|---:|---:|
| 30 | 300 × 30 = 9,000 | 300 × (38 − 30) = 2,400 | **11,400** | **−1,050** |
| 38 | 300 × 38 = 11,400 | 0 | **11,400** | **−1,050** |
| 45 | 300 × 45 = 13,500 | 0 | **13,500** | **+1,050** |

The terminal-value floor is 300 × $38 = **$11,400**. Subtracting the original premium alone gives a premium-adjusted amount floor **$10,950**, not profit. Under the stated today's-wealth benchmark, the minimum change is $11,400 − $12,450 = **−$1,050**. No rounding is needed. Below the strike the put offsets further share-price losses; above it the put can expire and the higher share value remains.

**Diagnosis/retry:** if you wrote 300 contracts, divide by the contract multiplier. If you called $10,950 profit, retry by asking whether the original $12,000 share value has yet been subtracted. It has not.

<a id="exercise-limit-teachback-answer"></a>

### Answer 6 — limitations checklist and model

A complete response preserves the **printed London dollar sign**, states the intended-GBP assumption for the $3 buy-New-York trade, and acknowledges that literal USD labels could support the reverse $50 gross trade under matching conditions. It names all five source items: transaction costs, taxes, bid–ask spreads, trading restrictions and settlement. The visible source line ends at “settlement”; no invented continuation should be quoted. Additional implementation assumptions are sufficient liquidity at executable quotes, short borrowing/permission where needed, funding between payment and receipt, and counterparties performing their obligations.

**Supplemental model:** “The $3 is a gross spread if London is £100, not what the original dollar label literally says. Under literal USD100 London versus USD150 New York, a matching gross trade would run the other way. In either case I must be able to buy, sell, convert currency if needed and settle reliably at the quotes, after relevant costs; a displayed discrepancy alone is not net profit. A protective put serves a different purpose: it limits the expiry downside of shares already owned. Its premium costs money, its terms must match the holding, and default or settlement failures are not removed, so it neither guarantees the best profit nor eliminates every risk.”

**Diagnosis/retry:** if your explanation only says “ignore fees,” list the other four printed categories, then the additional execution assumptions. If you call the hedge unsuccessful merely because a rising market made the put unnecessary, retry with the purpose: **protection against a possible fall**, not certainty that the put itself makes money.

<a id="exercise-value-diagnosis-answer"></a>

### Answer 7 — do not count the same shares twice

The physical-exercise calculation delivers 1,000 shares and receives **$27,500**. The investor cannot simultaneously keep the delivered $20,000 of shares. Alternatively, begin with their $20,000 market value and add only the put's improvement, 1,000 × ($27.50 − $20) = **$7,500**, reaching the same **$27,500**. The claimed $47,500 double-counts the share ownership.

Protection was not free: the investor paid **$1,000** initially. Under no financing/interest adjustments:

- **$27,500:** minimum combined terminal **value**, before premium subtraction.
- **$26,500:** that value less the **$1,000 premium only**, not total profit.
- **−$1,500:** $27,500 − $28,000 today's share-value benchmark − $1,000 premium, the minimum **change from today's wealth including hedge cost** in this matched model.

The source gives current value, not historical acquisition cost, so lifetime profit is unknown. These distinctions also explain why a hedge can limit damage while still leaving a loss. The guarantee is conditional on the stated contract matching and performance assumptions.

**Diagnosis/retry:** if the figures are correct but all are still called “profit,” label each subtraction: first remove the premium, then remove the share-value benchmark. Retell why the starting wealth cannot be ignored.

<a id="exercise-source-boundaries-answer"></a>

### Answer 8 — strike and upside checks

At **$27.50/share**, shares are worth 1,000 × $27.50 = **$27,500**; put payoff is 1,000 × max(27.50 − 27.50, 0) = **$0**; combined value is **$27,500**. Change from today's $29,000 shares-plus-premium benchmark is **−$1,500**.

At **$35/share**, shares are worth **$35,000**; put payoff is 1,000 × max(27.50 − 35, 0) = **$0**; combined value is **$35,000**. Change from that same benchmark is **+$6,000**. These terminal values match both remaining rows of the source table.

The graph has maturity price in USD/share horizontally and total terminal value in USD vertically. Below the $27.50 strike, the put's added payoff exactly offsets the falling share value, giving a flat **$27,500** floor. Above it, the put contributes zero and the line rises by **$1,000 per $1/share** increase. There is no ceiling imposed by this put hedge.

**Diagnosis/retry:** if you subtracted a negative put payoff above the strike, retry the maximum: max(−7.50, 0) is **0**, not −7.50. The holder can decline that unfavourable exercise.

<a id="stop"></a>

## Stop and check

Explain exercises 6 and 7 in your own words and show your unit-labelled arithmetic for exercises 3 and 5. A tutor should check the currency interpretation, trade direction, option sizing, premium treatment and benchmark separately, using the corresponding retry for a missed step. Keep your responses and self-assessment private; reading this lesson does not record mastery. This slice stops at simultaneous cross-market comparisons and matched protective puts at expiry. It does not price options, infer historical investment profit or teach the later futures-hedging lessons.

<a id="evidence"></a>

## Full source evidence and boundaries

All ten mapped substantive units were read in full normalized and raw spans and all three original production PNGs displayed, including the original p7 currency glyph and complete visible footnote. Historical extraction-page warnings remain unchanged; verified source status does not approve this teaching draft. The canonical source issue is `lecture-2-p007-london-currency`. No unknown transcript, textbook or private learner evidence is used.

| Physical PDF page | Source regions taught | Full normalized page | Raw page | Original image |
|---|---|---|---|---|
| 7 | Upper simultaneous quotes; middle conversion; lower trade; small footnote immediately above footer | [Normalized 7](../../sources/annotated/lecture-2/page-007.md) | [Raw 7](../../sources/extracted/lecture-2/page-007.md#page-7) | [Original 7](../../sources/assets/lecture-2/page-007.png) |
| 8 | Upper holding/put inputs; middle count/premium; lower downside question | [Normalized 8](../../sources/annotated/lecture-2/page-008.md) | [Raw 8](../../sources/extracted/lecture-2/page-008.md#page-8) | [Original 8](../../sources/assets/lecture-2/page-008.png) |
| 9 | Upper value formula; central three-row table; lower floor/premium interpretation | [Normalized 9](../../sources/annotated/lecture-2/page-009.md) | [Raw 9](../../sources/extracted/lecture-2/page-009.md#page-9) | [Original 9](../../sources/assets/lecture-2/page-009.png) |
