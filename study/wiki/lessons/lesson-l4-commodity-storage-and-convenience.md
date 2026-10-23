# Commodity carry: storage timing and convenience yield

<a id="status"></a>
**Unreviewed teaching draft — not approved teaching coverage or learner mastery.** This lesson teaches all ten primary units on Lecture4 physical pp27–29. Source formulas, the complete carry table and the storage example are cited precisely. Expanded cash ledgers, model interpretations, inference examples, exercises and answers are **supplemental**, not official solutions, current storage quotations or investment advice.

Immediate prerequisite: [currency parity](lesson-l4-currency-parity.md). [Known cash income](lesson-l4-known-cash-income.md), [no-income replication](lesson-l4-no-income-replication.md), [asset/short-sale distinctions](lesson-l4-assets-short-sales-and-settlement.md#asset-distinction), [rate conventions](../concepts/concept-rate-conventions.md#rates-formulas) and [exponents/logarithms](../concepts/concept-exponents-and-logs.md#powers-logarithms) support the inline foundations. Planned carry and forward-value concept pages were absent at the reading checkpoint; they are not assumed prerequisites. Separate reference authoring/integration may later supply them.

<a id="outcomes"></a>
## Observable outcomes

1. **Explain and qualify:** classify financing, dated cash storage, proportional storage, cash income and non-cash convenience benefits; reconstruct the source carry table; distinguish a replicating equality, a feasible upper bound and an implied convenience-yield parameter. Success requires dates/units and execution assumptions, explicit lost inventory services in the reverse direction, and no claim that carry predicts future spot.
2. **Calculate and audit:** reproduce the source storage PV/forward and a complete cash-and-carry ledger, change payment timing, and apply/invert the proportional model with domain/sign checks. Success requires full precision, appropriate discount dates, no duplicate storage deduction/charge, separate physical units and money, and correct qualified interpretation of a low forward.

<a id="carry-components"></a>
## 1. Physical inventory has costs and services

The source lists **financing cost $r$**, **storage and insurance costs $u$**, and **convenience yield $y$**, the non-cash benefit of holding inventory. [L4 p27, upper list; `lecture-4-p027-commodity-carry-components`](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-commodity-carry-components).

A **commodity** is a traded physical good, such as an industrial material or agricultural product. A promised delivery and an inventory already available for use need not be economically equivalent before delivery. **Carry** covers the costs and benefits of owning/holding an asset through that interval:

- Financing ties up or borrows money to buy it. Interest belongs to the cash financing leg.
- Storage pays for keeping the good available in the specified condition/location. Insurance can be part of carrying cost. A fixed invoice is money at a date; a proportional storage parameter is a rate. They are not the same type of input.
- Convenience benefit can arise because inventory is immediately available for operations, avoids interruptions or supplies flexibility. It is a **service of possession**, not necessarily money deposited in a bank account.

A good is an **investment asset** in the lecture's sense when substantial holdings are principally for investment. A **consumption asset** is held mainly for use. A particular owner may value its physical availability. Labels alone do not prove a specific trader can borrow, store, deliver or forgo it; these capabilities determine which pricing comparison can be executed.

<a id="notation"></a>
## 2. Two storage conventions need different symbols

| Symbol | Definition and unit |
|---|---|
| $0,T$ | Today and delivery; $T\geq0$ in exponential expressions is elapsed years |
| $S_0>0$ | Spot price of one specified deliverable commodity unit, currency/unit |
| $S_T$ | Uncertain terminal spot price, same grade/location/unit convention |
| $F_0$ | Today's matching forward quote, currency/unit, not current contract value |
| $B_0$ | Cost-only funded holding benchmark, currency/unit at delivery; notation chosen to distinguish a cost ceiling from an automatically enforced quote |
| $Q>0$ | Number of physical units; multiply per-unit cash amounts by $Q$ for totals |
| $r$ | Annual continuous funding rate as a decimal, matched to currency and time |
| $C_j$ | Known positive cash storage payment per physical unit at date $t_j$ |
| $D(0,t_j)>0$ | Discount factor from that payment date to today; under a flat continuous rate, $e^{-rt_j}$ |
| $U$ | Sum of storage-payment PVs today, currency/unit; **not a rate** |
| $u$ | Annual continuous proportional storage/insurance charge in the stated proportional model; **not a fixed cash invoice** |
| $q$ | Annual continuous proportional cash-income yield, if any, using the earlier reinvestment convention |
| $y$ | Annualized proportional convenience-yield parameter representing non-cash inventory benefits in the model |
| $c$ | Net annual continuous carry parameter after applicable costs and benefits |

A decimal rate7% is0.07 per year. A same-currency amount $A$ grows by $Ae^{rT}$ under continuous compounding and discounts by $Ae^{-rT}$. Positive exponential factors keep positive cash amounts positive. Rates times years form dimensionless exponents. A capital $U$ and lowercase $u$ are different inputs; adding a two-dollar invoice to a5% rate is meaningless.

**Matching assumptions:** specify identical deliverable grade, quantity, condition, location and date, actual ability to buy/store/deliver, known applicable costs, compatible funding/performance, and absence of omitted fees/taxes/spreads in the benchmark. Storage capacity, deterioration, transport, insurance terms, collateral/funding and borrowing restrictions may matter. No current physical-market rule or storage price is inferred from the source's classroom asset.

<a id="cash-storage"></a>
## 3. Known cash storage: reserve each payment at its own date

The source gives, for known cash storage PV $U$ and no convenience yield,

$$F_{0,T}=(S_0+U)e^{rT}.$$

[L4 p27, second condition and boxed equation; `lecture-4-p027-commodity-cash-storage-formula`](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-commodity-cash-storage-formula).

First derive the **cost of supplying the future unit**. For dated cash payments define

$$U=\sum_j C_jD(0,t_j).$$

The summation sign means add each listed payment's present cost. Appropriate factors can differ by payment date; the flat-rate version is $U=\sum_j C_je^{-rt_j}$. With delivery discount factor $D(0,T)$, the fully financed cost-only benchmark is

$$B_0=\frac{S_0+U}{D(0,T)}.$$

Under the source's flat continuous financing convention this is $(S_0+U)e^{rT}$. Storage costs are **added**, because owning the deliverable requires paying them; known cash income is subtracted in the earlier income lesson because the holder receives it. Do not add the same invoice again through a proportional $u$.

<a id="cash-ledger"></a>
### Full reserve-and-finance construction — supplemental

Borrow $S_0+U$ today until delivery. Spend $S_0$ buying the commodity and allocate each $C_jD(0,t_j)$ to a deposit that matures as the needed storage payment $C_j$. The reserves fund the bills on time; none is free extra income. Enter a short forward for one deliverable unit at offered quote $F_0$.

| Leg | Today | Each storage date $t_j$ | At delivery $T$ |
|---|---|---|---|
| Delivery-maturity borrowing | Receive $S_0+U$ | No early debt repayment under these terms | Repay $B_0$ |
| Buy physical unit | Pay $S_0$; hold one unit | Keep the specified deliverable in storage | Supply one unit for forward delivery |
| Set aside storage reserves | Invest the PV amounts, total $U$ | Each reserve releases $C_j$ and pays that bill; net0 | No reserve remains after last matched bill |
| Short forward | Zero benchmark entry premium | No commodity income from the contract | Deliver one unit, receive $F_0$ |
| Combined | **0 external cash** | **0 external cash** | **$F_0-B_0$**, asset and debt obligations discharged |

If a bill falls at delivery, its reserve payment and debt repayment are separate ledger items. The debt already includes financing the reserve; do not pay the same bill a second time out of the claimed profit without accounting for the matching reserve receipt. An equivalent route can borrow only the purchase cost and pay a delivery-date bill directly from terminal proceeds, as the source example will show.

If buying, storing, financing and selling forward are feasible, a quote above $B_0$ permits this modeled cash-and-carry direction. It therefore supports an **upper bound** $F_0\leq B_0$ in a frictionless no-arbitrage comparison. The bound itself needs those feasible legs; unavailable storage/capacity or unpriced costs can block it.

<a id="reverse-limits"></a>
## 4. Why the reverse comparison can fail

The source says convenience yield can make physical inventory more valuable than holding only a forward, so **reverse cash-and-carry may be unavailable**. [L4 p27, lower consumption-assets box; `lecture-4-p027-consumption-inventory-benefit`](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-consumption-inventory-benefit).

The usual reverse idea is to sell/short physical inventory, invest the proceeds and buy it forward to restore the unit at maturity. But does that reproduce **everything** the owner needed?

- Borrowing the exact deliverable may be impossible or costly; usable sale proceeds, return timing and lender compensation may be restricted.
- Selling an owner's stockpile removes access before delivery. A forward replacing the unit at $T$ does not supply it during a production interruption today.
- Storage savings are not automatically cash paid to any short seller. A trader who never paid the owner's storage bill cannot simply book its avoidance as a cash receipt. The borrowing agreement and whose costs are avoided must be specified.

For a genuinely investment-only owner who can forgo possession, sell freely and avoid the relevant storage bills, a **same-endowment substitution** can enforce the other side. Compare two strategies starting with the **same existing unit plus a storage reserve $U$**:

| Owner's alternative — supplemental | Today | During holding | Delivery outcome |
|---|---|---|---|
| Keep the unit | Retain unit and reserves | Reserves pay storage bills | Own one unit; no unused storage reserve |
| Sell and replace forward | Sell unit for $S_0$; invest $S_0+U$ to delivery; agree to buy one forward | No physical unit held, hence no assumed storage bill | Receive $B_0$, pay $F_0$, regain one unit; extra cash $B_0-F_0$ |

If the unit supplies no lost service and all terms are feasible, a lower forward makes the second alternative financially better. The initial unit and reserve are **not free wealth**; this compares the same endowed owner, not a fabricated zero-cost short with an omitted storage charge. An enforceable two-sided equality requires a suitable reversible market/owner comparison. With consumption benefits or shorting restrictions, do **not** assert the cost ceiling is a guaranteed equality or every below-ceiling quote is arbitrage.

<a id="proportional"></a>
## 5. Proportional storage and convenience: a different model

The source's proportional relation is

$$F_{0,T}=S_0e^{(r+u-y)T}.$$

[L4 p27, first boxed equation; `lecture-4-p027-commodity-proportional-formula`](../../sources/annotated/lecture-4/page-027.md#lecture-4-p027-commodity-proportional-formula).

The funding rate and storage rate enter positively: the carrying arrangement is more expensive. Convenience yield enters negatively because physical possession offers something the deferred contract does not. The symbols describe annual continuous proportional adjustments. They do not convert a known two-dollar invoice into a2% rate, nor convert non-cash usefulness into a bankable cash coupon.

**Supplemental interpretation of the cost-only exponential:** the benchmark without convenience is $B_0=S_0e^{(r+u)T}$. One precise idealized way to understand a continuous proportional storage charge is a service paid continuously **in units of the commodity** at fraction $u$ of stored units per year. Remaining quantity shrinks by $e^{-uT}$, so begin with $e^{uT}$ units to end with one. Their initial cost $S_0e^{uT}$, financed at $r$, gives $S_0e^{(r+u)T}$. This is a labelled mathematical interpretation under fractional, known, costless service/execution assumptions—not an assertion that the source or a real warehouse uses in-kind fees. Arbitrary uncertain cash invoices proportional to future spot require their actual cash-flow model; they cannot silently be treated as this deterministic prepaid quantity cost.

Including convenience yields $F_0=B_0e^{-yT}$ as a valuation relation. **There is no cash ledger entry “receive $y$” to finance the warehouse bill.** Convenience represents the value of possession; it is often inferred as the adjustment consistent with observed quotes under an assumed model. The equality with a given $y$ is not automatically a reversible cash arbitrage proof for a consumption asset.

If $y\geq0$ in this interpretation and the cost-only upper-bound trade is feasible, the relation is consistent with $F_0\leq B_0$. It can put the forward below spot when convenience exceeds funding plus storage. This does not promise a future spot decline.

<a id="convenience-example"></a>
### Apply and infer the parameter — supplemental, not source market data

Use a hypothetical spot **100 USD/unit**, annual continuous funding **5%**, proportional storage **2%**, convenience parameter **8%**, and **one year**. Net carry is $0.05+0.02-0.08=-0.01$. Therefore

$$F_0=100e^{-0.01}\approx\mathbf{99.004983374917}\text{ USD/unit},$$

displayed **99.00**. The cost-only benchmark is $100e^{0.07}\approx\mathbf{107.250818125422}$, or **107.25**. A below-spot forward is compatible with the stipulated inventory benefit; selling required inventory to exploit the apparent gap may sacrifice that benefit. No cash income of8 USD is promised by the symbol8%.

To **infer** $y$ from a positive forward and spot, with the funding/storage inputs and horizon supplied, use the natural logarithm. Require **$S_0>0,F_0>0,T>0$**; $r,u$ are known model inputs. The function $\ln$ finds the exponent: $\ln(e^x)=x$, and its argument must be a positive dimensionless ratio.

Divide by spot, take logs, divide by time and rearrange:

$$\ln(F_0/S_0)=(r+u-y)T,\qquad
 y=r+u-\frac{\ln(F_0/S_0)}{T}.$$

For the full-precision hypothetical quote $100e^{-0.01}$, the ratio's log is **−0.01**, giving $y=0.05+0.02-(-0.01)=\mathbf{0.08}$, or8% annually in this model. Use the **unrounded** generated quote for this exact recovery; the displayed99.00 is not algebraically identical to it.

As a boundary, if the hypothetical forward equals spot100 with the same costs and horizon, $\ln(1)=0$ and inferred $y=\mathbf{0.07}$ exactly offsets funding/storage. An inferred negative parameter would not automatically prove “negative physical usefulness”: it could signal a violated upper-bound assumption, omitted costs, mismatched units/dates, a bad quote or a model that does not fit. Inference identifies a **model residual parameter**, not a directly received cash stream or independent measurement of an owner's operational benefit.

<a id="net-carry"></a>
## 6. Reconstruct the general net-carry definition

The source combines applicable proportional terms as

$$c=r+u-q-y,\qquad F_{0,T}=S_0e^{cT},$$

setting terms that do not apply to zero. [L4 p28, upper definition and formulas; `lecture-4-p028-net-carry-definition`](../../sources/annotated/lecture-4/page-028.md#lecture-4-p028-net-carry-definition).

Here $q$ is an actual proportional income-yield model, while $y$ is non-cash convenience. They are not two names for the same benefit. The general expression is useful bookkeeping **only after the asset's applicable carry model is justified**. A fixed-dollar storage PV $U$ does not belong as an annual rate inside $c$, and a known cash-income PV is not automatically a $q$. Do not double count the same warehouse bill through both $U$ and $u$, or the same dividend through both cash income and $q$.

For positive spot/time, $c>0$ puts the modeled quote above spot, $c=0$ at spot and $c<0$ below spot. This is a comparison of today's prices under the model, not a sign forecast for future realized returns. For the hypothetical commodity above, $q=0$ and $c=-0.01$.

<a id="carry-table"></a>
### Complete accessible source table

[L4 p28, middle table; `lecture-4-p028-carry-table`](../../sources/annotated/lecture-4/page-028.md#lecture-4-p028-carry-table).

| Underlying — source row | Net cost of carry — source entry |
|---|---|
| Non-dividend-paying investment asset | $r$ |
| Stock index | $r-q$ |
| Foreign currency | $r_d-r_f$ |
| Commodity | $r+u-y$ |

**Supplemental interpretation of every row:**

- Non-income investment asset: only financing is included in that simplified row; no storage/income has been supplied.
- Stock index: income yield reduces the purchase that must be financed; use income during the actual contract life and the specified price/total-return definition.
- Foreign currency: with domestic currency per foreign unit, domestic funding is offset by foreign deposit growth. Here $r_d,r_f$ are the domestic/foreign continuous rates, not two extra costs to add again to $r$.
- Commodity: storage increases carrying cost and convenience reflects physical-service value. The equality and reverse-trade limitations just discussed remain part of interpreting this row.

The table unifies notation; it does not erase cash-flow dates, currencies, contract units, rate conventions, investment versus consumption distinctions or the forward/futures settlement qualification from the earlier lesson.

<a id="not-forecast"></a>
## 7. Carry is not a promise about future spot

The source explicitly says carry explains the spot-forward relationship but does **not** imply future spot must equal today's forward. [L4 p28, lower interpret-carefully box; `lecture-4-p028-carry-not-future-spot`](../../sources/annotated/lecture-4/page-028.md#lecture-4-p028-carry-not-future-spot).

A forward locks a contractual exchange; it does not lock the later spot market. A hedged cash-and-carry strategy removes dependence on terminal spot by matching physical delivery with the forward. That cancellation explains a price relation without forecasting spot. An unhedged owner or consumption business can still face price, demand, production and operational risk. The convenience parameter is not an expected price increase to add to a forward payoff.

<a id="source-pv"></a>
## 8. Source known-storage example: the bill is due at the end

The source specifies an **investment asset**, current price **450 dollars/unit**, **7% annual continuous funding**, **one year**, and a **2-dollar/unit storage payment at the end of the year**. It displays $U=2e^{-0.07}=1.865$. [L4 p29, upper example data and PV equation; `lecture-4-p029-storage-payment-present-value`](../../sources/annotated/lecture-4/page-029.md#lecture-4-p029-storage-payment-present-value).

We label classroom dollars USD, without inferring an actual commodity or jurisdiction. The specified unit is one deliverable asset unit; no barrel/ounce size is invented. The no-convenience cash-storage setting is used; no additional proportional storage, income or operational benefit is silently added.

1. Rate decimal $r=0.07$; delivery time and payment time are both1 year.
2. Discount factor $e^{-0.07}\approx0.932393819906$.
3. Required reserve $U=2e^{-0.07}\approx\mathbf{1.864787639812}$ USD/unit today, displayed **1.865** by the source.
4. That full-precision reserve grows to exactly **2 USD** at the bill's due date. It is not a2-USD upfront charge or a2% storage yield.

<a id="source-forward"></a>
## 9. Reproduce the source forward by two dated routes

The source writes $(450+1.865)e^{0.07}=484.63$. [L4 p29, middle forward calculation; `lecture-4-p029-storage-forward-example`](../../sources/annotated/lecture-4/page-029.md#lecture-4-p029-storage-forward-example).

**Full-precision reserve route:** total initial financing is $450+2e^{-0.07}\approx451.864787639812$ USD/unit. Grow that amount to delivery:

$$B_0=(450+2e^{-0.07})e^{0.07}
=450e^{0.07}+2\approx\mathbf{484.628681564397}\text{ USD/unit}.$$

**Direct terminal-cost check:** financed purchase $450e^{0.07}\approx\mathbf{482.628681564397}$ plus the bill **2**, already due at delivery, produces the same total. There is no additional year of funding on a bill first paid at delivery. Final cents **484.63**, matching the source.

The source's literal rounded-PV route gives $(450+1.865)e^{0.07}\approx\mathbf{484.628909322437}$, also484.63. These intermediate values are not identical. Using $(450+2)e^{0.07}\approx\mathbf{484.773697926906}$ instead would price a **2-USD upfront payment**; it is not the source end-of-year timing and rounds to484.77.

<a id="source-overpricing"></a>
## 10. Explain the source arbitrage statement with an executable ledger

The source says that a quoted forward above **484.63** permits cash-and-carry arbitrage under the model assumptions. [L4 p29, last paragraph; `lecture-4-p029-storage-overpricing-arbitrage`](../../sources/annotated/lecture-4/page-029.md#lecture-4-p029-storage-overpricing-arbitrage). The printed number is a rounded threshold; exact theoretical comparisons use **484.628681564397…** and actual costs/access must still be checked.

**Supplemental offered quote490 USD/unit:** buy one unit and short its forward delivery. The following simpler route finances only the450 purchase and pays the2 storage bill directly at maturity:

| Leg | Today USD | At delivery USD | Physical units |
|---|---:|---:|---|
| Borrow purchase money | +450 | −482.628681564397… | None |
| Buy and store | −450 | −2 storage bill | Hold one until delivery |
| Short forward at490 | 0 | +490 | Deliver the one unit |
| Net | **0** | **+5.371318435603…** | None left; debt discharged |

Profit is **5.37 USD** to cents. The alternative reserve route borrows451.864787639812…, spends450 on the asset and1.864787639812… on a reserve; at maturity the reserve+2 pays the bill−2, while forward490 repays borrowing484.628681564397…, leaving the same profit. Both routes account for storage exactly once.

For a **supplemental ten-unit trade**, purchase borrowing **4,500 USD**, financed purchase **4,826.286815643974…**, storage **20**, forward receipts **4,900**, profit **53.713184356026…**, or **53.71 USD**. Multiplying the rounded one-unit5.37 by ten gives53.70; final-only rounding preserves the exact modeled aggregate.

This does not establish a symmetric automatic arbitrage for every lower quote. If inventory services or shorting constraints matter, the discussion in section4 applies. Even the upper-bound trade can fail if buying, financing, safe storage or compatible delivery is unavailable. The source's investment-asset/no-convenience setting does not authorize ignoring a real asset's needs.

<a id="timing"></a>
## 11. Move the storage date and check the change — supplemental

Keep spot450, funding7%, delivery at one year and a single2-USD bill, but deliberately change its payment date:

| Bill date | Today's storage PV | Terminal total cost |
|---|---|---|
| Today | $2$ | $(450+2)e^{0.07}\approx\mathbf{484.773697926906}$ |
| Half-year | $2e^{-0.035}$ | $450e^{0.07}+2e^{0.035}\approx\mathbf{484.699920981997}$ |
| Delivery, one year — source timing | $2e^{-0.07}$ | $450e^{0.07}+2\approx\mathbf{484.628681564397}$ |

The bill adds more delivery-date cost when paid earlier under a positive funding rate. In the half-year case, $r t_j=0.07(0.5)=0.035$; only the **remaining half-year** after payment is financed to delivery. Known payment timing determines the factor; “storage costs2” alone is insufficient.

As a second supplemental example, bills of **1 USD at half-year and1 USD at delivery** have

$$U=e^{-0.035}+e^{-0.07},\qquad
 B_0=450e^{0.07}+e^{0.035}+1
\approx\mathbf{484.664301273197}\text{ USD/unit},$$

or **484.66**. This lies between paying the whole2 at half-year and paying it all at delivery, a useful check. Under a non-flat curve use each payment's own appropriate discount factor and the delivery funding factor, not an invented future reinvestment rate.

<a id="boundaries"></a>
## 12. Boundaries and model diagnosis

- With no storage and no income/convenience, recover $S_0e^{rT}$; with zero funding and the source2 cash bill, cost is **452 USD/unit** regardless of the within-horizon payment date under zero factors.
- With positive cash costs, adding a further real bill increases the funded cost benchmark. Whether a given forward must equal that cost still depends on the reversible comparison.
- At zero horizon, there is no future storage interval. A bill already due now must be treated as an explicit immediate transaction cost/obligation, not presumed to vanish or silently counted as a future year's storage. Do not evaluate convenience inference by dividing by zero time.
- In the proportional model, $y=0$ gives cost-only carry, $y=r+u$ gives spot, and $y>r+u$ puts forward below spot. Increasing $u$ or reducing $y$ increases the modeled quote, holding other inputs fixed.
- Logarithm inference requires positive spot and forward and positive time. A negative log of a **positive ratio below one** is valid; a log of a negative input is not. Negative funding rates do not make exponential factors negative, but can reverse an earlier/later cash-cost ordering.
- Current fair forward value at inception may be zero while its quoted delivery price and physical obligations are large. Margin is not automatically a purchase price or storage budget. Futures daily cash timing requires its own funding analysis, not silent substitution into a terminal-forward ledger.
- Calendar dates, deliverable quality/location, storage capacity, spoilage, transport, financing, shorting and performance are model inputs or limitations, not details an algebraic formula can waive.

<a id="practice"></a>
## 13. Progressive supplemental practice

<a id="exercise-classify-prompt"></a>
### 1. Classify the carry components — outcome1
Explain $r,u,U,q,y,c$ and their units. Reconstruct all four source carry-table rows. Why are the two-dollar storage invoice and convenience benefit neither interchangeable annual rates nor free bank cash? [Answer](#exercise-classify-answer).

<a id="exercise-source-prompt"></a>
### 2. Source PV and quote — outcome2
Compute the exact source storage PV and forward by reserve and direct-terminal routes. Compare literal rounded-PV and incorrectly upfront2 routes without claiming identical intermediates. [Answer](#exercise-source-answer).

<a id="exercise-ledger-prompt"></a>
### 3. Source overpricing mechanism, supplemental quote — outcome2
At offered490, rebuild both complete financing/storage ledgers and show that each pays storage once. Scale to ten units and explain final-only rounding. State when this enforces an upper bound rather than guaranteed equality. [Answer](#exercise-ledger-answer).

<a id="exercise-timing-prompt"></a>
### 4. Change the timing — outcome2
Calculate terminal cost for2 paid today, at half-year or at delivery, and for1 at each of the last two dates. Explain the positive-rate ordering and zero-rate452 check. [Answer](#exercise-timing-answer).

<a id="exercise-convenience-prompt"></a>
### 5. Apply and invert the proportional model — outcome2
For spot100,r5%,u2%,y8%,T1, compute cost-only benchmark and convenience-adjusted quote. Recover y from the full-precision quote using the logarithm formula, then infer y if forward instead equals spot. Explain domain and non-cash limitations. [Answer](#exercise-convenience-answer).

<a id="exercise-restrictions-prompt"></a>
### 6. Diagnose a false reverse arbitrage — outcome1
A factory needs inventory before expiry. A trader proposes selling it, buying forward for later replacement and treating avoided storage as a cash receipt available to any short seller. Explain the lost service, borrowing/cost issue and proper same-endowment owner comparison. Does below-cost carry force arbitrage? [Answer](#exercise-restrictions-answer).

<a id="exercise-explain-teachback-prompt"></a>
### 7. Teach carry without predicting spot — outcome1
Explain the costs/benefits, two cash-cost models, source carry table, upper-bound/equality distinction and convenience inference. State why none guarantees future spot or actual execution. [Answer](#exercise-explain-teachback-answer).

<a id="exercise-apply-teachback-prompt"></a>
### 8. Repair the calculation — outcome2
A report puts the source2 dollars into u as2%, finances it for another year after delivery, deducts8 dollars as guaranteed convenience cash and claims any quote below484.63 is riskless arbitrage. Correct the source arithmetic and separate it from the hypothetical100-unit-price proportional scenario. [Answer](#exercise-apply-teachback-answer).

<a id="answers"></a>
## 14. Separate supplemental answers

<a id="exercise-classify-answer"></a>
### Answer1
$r$ funds cash; $u$ is a proportional annual storage rate; $U$ is present currency/unit for dated cash bills; $q$ is proportional income yield; $y$ is a non-cash convenience parameter; $c=r+u-q-y$ combines applicable proportional terms. Source rows: non-income investment asset **r**, index **r−q**, foreign currency **domestic rate−foreign rate under domestic/foreign quotation**, commodity **r+u−y**. A2-dollar invoice needs its amount and date, not a percent relabel. Convenience is possession value, not cash deposited to pay that bill. **Retry:** identify amount versus rate, and actual cash versus service, before choosing a formula.

<a id="exercise-source-answer"></a>
### Answer2
Source payment/date: **2 USD at one year**, rate **.07**. Factor **.932393819906…**; $U=2e^{-.07}\approx\mathbf{1.864787639812}$, displayed1.865. Finance initial **451.864787639812…** to get **484.628681564397…**, or **484.63 USD/unit**. Independent route is purchase financing **482.628681564397…** plus terminal2. Literal source-rounded U gives **484.628909322437…**, same final cents but not exact equality. Treating2 as upfront gives **484.773697926906…**, or484.77, a different payment schedule. **Retry:** discount to today before adding present amounts, or accumulate each real cost only from its own due date.

<a id="exercise-ledger-answer"></a>
### Answer3
Purchase-only route: today borrow450/pay450, net0. At maturity receive490, repay **482.628681564397…**, pay storage2, leave **5.371318435603…**, or5.37. Reserve route: borrow **451.864787639812…**, buy450 and deposit **1.864787639812…**; reserve grows to2/pays2, forward490 repays **484.628681564397…**, same residual. Ten units: debt purchase4,500 grows to **4826.286815643974…**, bill20, receipt4900, profit **53.713184356026…**, or **53.71**, not53.70 from prematurely rounded5.37. Feasible buy/store/fund/deliver supports an upper bound; equality additionally needs a feasible reverse/owner substitution without lost benefits. **Retry:** never count the reserve's2 receipt without its bill or charge the same bill twice.

<a id="exercise-timing-answer"></a>
### Answer4
At positive7% funding:2 upfront gives **484.773697926906…** (484.77);2 at half-year gives **484.699920981997…** (484.70);2 at delivery gives **484.628681564397…** (484.63). Splitting1 at half-year/1 at delivery gives **484.664301273197…** (484.66), between the latter two. Earlier payment carries longer financing. Zero funding reduces all schedules to450+2=**452**, under the same cost obligations. **Retry:** the delivery-date bill gets no additional year of interest; for a half-year bill, only half a year remains.

<a id="exercise-convenience-answer"></a>
### Answer5
Cost-only net rate **.05+.02=.07**, benchmark **107.250818125422…**, or107.25. With convenience8%, net rate **−.01**, quote **99.004983374917…**, or99.00. For the unrounded quote, $\ln(F/S)=-.01$, so inferred $y=.05+.02-(-.01)=\mathbf{.08}$; if F=S=100, log ratio0 gives **.07**. Rates are annual continuous, time1year and ratio dimensionless. Require positive S/F and positive T; rounded99.00 does not reproduce exactly the same y. The inferred benefit is not8 dollars of bankable cash, and a consumption-asset price below a cost-only bound does not by itself prove available reverse arbitrage. **Retry:** distinguish model parameter inference from a traded cash flow.

<a id="exercise-restrictions-answer"></a>
### Answer6
The factory loses access before expiry; a future replacement does not supply today's operational service. Shorting/return terms may be unavailable or costly. Avoided storage is a saving only for the party whose real bill disappears, not a universal receipt to a short seller. A proper investment-only owner comparison starts with the same unit plus storage reserve: keeping pays costs and ends with one unit; selling/investing the same wealth and buying forward can end with the same unit plus B−F **only if** no service or constraint is lost. For consumption inventory those equivalences can fail. Below-cost carry therefore need not be arbitrage. **Retry:** list all delivered services, not only the final physical unit.

<a id="exercise-explain-teachback-answer"></a>
### Answer7 — sufficient explanation
“Carry finances the purchase, pays storage and recognizes genuine income or possession benefits. Known cash bills are discounted by their dates and added to spot; proportional charges use a separately justified rate model. The source table summarizes financing alone, index income, foreign interest and commodity storage/convenience, but does not erase each model's assumptions. Buying and storing for forward delivery can enforce a cost ceiling if executable. A reverse trade may fail because inventory is useful or borrowing impossible, so equality is not automatic. Convenience inferred from a quote is a non-cash model adjustment, not a coupon. None of these relations predicts future spot, and a classroom residual still requires real funding, delivery and performance.” **Retry:** explain both what the formula computes and which trade could actually enforce it.

<a id="exercise-apply-teachback-answer"></a>
### Answer8
The source2 is **USD/unit due at delivery**, not u=.02. Its PV is **1.864787639812…**, and delivery cost is **450e^.07+2=484.628681564397…**, displayed484.63. No further year of interest is due on that terminal bill. The source has no convenience input. The separate hypothetical spot100/r5%/u2%/y8% gives99.004983374917… as a proportional valuation illustration; y8% is not an8-dollar guaranteed receipt. Below484.63 alone does not prove arbitrage, especially with inventory services/shorting constraints; even the exact threshold and feasible trade/costs must be checked. **Retry:** freeze the source's amount, date and asset assumptions before introducing a different model.

<a id="evidence"></a>
## Source presentation and endpoint

All six full normalized/raw files pp27–29 and all three original PNGs were inspected. Page27 has cost/benefit definitions, two boxed formulas and a consumption-assets qualification. Page28 has the general net-carry equation, the four-row table faithfully reproduced above, and the no-forecast warning. Page29 specifies the complete cash-storage timing/PV/forward example and upper-quote arbitrage statement. Other tables/scenarios/answers are labelled supplemental; no original graph is invented. Ten source units are verified with no registered issue; that does not approve this lesson.

| Page | Normalized | Raw | Original |
|---|---|---|---|
|27|[Full](../../sources/annotated/lecture-4/page-027.md)|[Raw](../../sources/extracted/lecture-4/page-027.md#page-27)|[PNG](../../sources/assets/lecture-4/page-027.png)|
|28|[Full](../../sources/annotated/lecture-4/page-028.md)|[Raw](../../sources/extracted/lecture-4/page-028.md#page-28)|[PNG](../../sources/assets/lecture-4/page-028.png)|
|29|[Full](../../sources/annotated/lecture-4/page-029.md)|[Raw](../../sources/extracted/lecture-4/page-029.md#page-29)|[PNG](../../sources/assets/lecture-4/page-029.png)|

The two assigned lessons end here. Carry/forward-value reference integration and independent teaching review are separate tasks. No restricted textbook, private learner material or current market specification was used; author checks are not publication or taught coverage.
