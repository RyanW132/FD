# Clearing, margin, settlement and counterparty risk

**Source-grounded on-demand reference — author draft; independent review pending.** This is a terminology and cash-flow lookup, not the full clearing/futures lessons or current legal guidance. Microexample and self-check are supplemental. Prerequisite: [contract positions](concept-derivative-contracts.md#contracts-definition).

<a id="settlement-clearing"></a>
## Who owes whom, and when?

**Settlement** discharges a contractual payment/delivery obligation. A physically settled contract exchanges the specified asset and payment; a cash-settled contract exchanges the specified cash amount. **Counterparty credit risk** is the risk the party owing performance defaults (fails to meet its obligation). It differs from **market risk**, the risk that prices move against a position.

In a **bilateral** trade, two parties face each other directly. A **central counterparty (CCP)** stands between cleared parties, becoming buyer to the seller and seller to the buyer. **Clearing** organizes that interposition and its risk-management arrangements. The economic long/short exposures remain; margin and default procedures reorganize and manage credit risk rather than eliminate all risk. A CCP itself and its members can face stress; clearing does not make an adverse market move harmless. [L1 p16, upper bilateral default](../../sources/annotated/lecture-1/page-016.md#lecture-1-p016-bilateral-default), [middle interposition](../../sources/annotated/lecture-1/page-016.md#lecture-1-p016-ccp-interposition), [lower risk-management implication](../../sources/annotated/lecture-1/page-016.md#lecture-1-p016-ccp-risk-management).

**OTC (over-the-counter)** describes privately negotiated trading, not necessarily absence of clearing: the source explicitly says OTC contracts **may be centrally cleared**. Its post-crisis reform discussion is conditional on contract, counterparty and jurisdiction; it is course evidence, not an up-to-date statement of legal obligations. [L1 p13 OTC box](../../sources/annotated/lecture-1/page-013.md#lecture-1-p013-otc); [p15 conditional clearing discussion](../../sources/annotated/lecture-1/page-015.md#lecture-1-p015-clearing-reform).

<a id="settlement-margin"></a>
## Margin is not the purchase price of the underlying

The lecture's simplified futures account uses these terms:

| Term | Meaning and distinction |
|---|---|
| **Initial margin** | Funds deposited when opening the position: security for performance, not an option premium or payment for owning the underlying. Posting the deposit is a funding commitment, not by itself a trading loss. |
| **Variation margin** | Gains/losses transferred as the position is marked to the settlement price; the source describes daily adjustments. |
| **Maintenance margin** | The minimum permitted balance in this account illustration. |
| **Margin call** | A request to restore the balance when the stipulated threshold/rules require it. The restore-to amount must be specified; do not invent it from the threshold alone. |

Definitions: L1 p30 upper bullets for [initial](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-initial-margin), [variation](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-variation-margin), [maintenance](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-maintenance-margin) and [call](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-margin-call). Contract/account arrangements can differ; the classroom account is not a universal rulebook.

For a long position in N positive contracts, each covering q units, the daily cash gain is Nq(F_t − F_(t−1)); the short has its negative. F_t and F_(t−1) are today's and the previous day's settlement prices in currency/unit; t labels days. Multiplying units by currency/unit gives currency. This is **daily** settlement, not a single promised terminal payment. [L1 p29 lower daily-gain formula](../../sources/annotated/lecture-1/page-029.md#lecture-1-p029-daily-gain-formula). A net favorable terminal outcome does not guarantee cash is available for earlier losses: that cash-availability problem is **liquidity risk**. Financing daily payments can also matter, so simply summing them ignores timing costs.

<a id="settlement-example"></a>
## Microexample: risk can be offset yet cash is still needed

Supplemental account terms: one long contract, q = 100 units, initial deposit £2,000, maintenance threshold £1,500, and a call restores the balance to £2,000. Ignore interest, fees and additional transfers.

If the settlement price falls from £50/unit to £44/unit, the daily change is 1 × 100 × (44 − 50) = **−£600**. Balance becomes £1,400, below £1,500, so the stipulated call is **£600**, restoring £2,000. A later recovery to £50/unit produces +£600; the two trading changes sum to zero, but the trader needed £600 earlier. Opposite gains to the short do not eliminate the long's obligation to pay.

The £1,500 threshold and restore-to rule are **supplemental**, not the source's numbers. The source's separate p30 example gives £2,000 − £600 − £500 = £900 and says a call occurs if maintenance exceeds £900; it supplies no particular threshold. [L1 p30 lower answer](../../sources/annotated/lecture-1/page-030.md#lecture-1-p030-margin-balance-answer).

<a id="settlement-selfcheck"></a>
## Brief self-check

Under the supplemental terms, suppose the first price move is instead £50 to £45. What are the loss and balance? Is the balance below maintenance? Does a CCP make this loss disappear?

<a id="settlement-answer"></a>
## Supplemental answer

Loss = 100(45 − 50) = **−£500**; balance = **£1,500**. It is equal to, not below, the stated minimum, so no below-threshold call is triggered in this illustration. Actual account rules must be checked rather than inferred. The CCP does not remove the market loss: it manages how obligations are supported and settled. If you treated the initial £2,000 deposit as the asset price or as an automatic £2,000 loss, distinguish collateral funding from settlement cash flows.

<a id="settlement-navigation"></a>
## Full lesson targets

[Markets and clearing](../lessons/lesson-l1-markets-and-clearing.md) (`lesson-l1-markets-and-clearing`), [futures settlement](../lessons/lesson-l1-futures-settlement.md) (`lesson-l1-futures-settlement`), and [margin and contract size](../lessons/lesson-l1-margin-and-contract-size.md) (`lesson-l1-margin-and-contract-size`). These planned links may remain pending; this reference does not establish lesson completion or current exchange specifications.
