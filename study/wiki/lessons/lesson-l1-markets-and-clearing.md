# Exchanges, OTC markets and central clearing

<a id="status"></a>

**Unreviewed teaching draft.** This lesson teaches thirteen substantive units from Lecture 1, physical pages 13–16. It describes the supplied course's market structure and historical reform account, **not a current jurisdiction-specific legal or compliance guide**. Source propositions have exact citations; added definitions, examples and answers are labelled supplemental. No teaching approval or learner mastery is claimed.

<a id="motivation"></a>

## Why the route through the market matters

**Supplemental motivation:** knowing what a contract promises is not enough. You also need to know whether its terms fit your need, whether you can trade it at observable prices, and who must perform if another institution fails. A useful custom contract can be hard to trade out of; a centrally cleared contract can still carry price risk. This lesson separates **how a trade is arranged** from **how its counterparty obligations are managed**.

<a id="outcomes"></a>

## Observable outcomes

1. **Compare trading arrangements and explain a risk network:** given an ordinary or unusual exposure, compare all four source features of exchange trading with all four OTC features, justify a likely market choice and a possible trade-off, and explain how private bilateral obligations can transmit a default through institutions. Success requires retaining “usually/may,” distinguishing liquidity, price transparency and counterparty risk, and not equating OTC with uncleared.
2. **Trace clearing and match reforms to problems:** given Bank A's sale and Bank B's purchase, identify the CCP's opposite role with each bank, trace a simple promised payment, and match reporting, clearing, uncleared-margin/risk-management and platform measures to their purposes. Success requires preserving the source's contract/counterparty/jurisdiction qualifier, exact cash arithmetic in a stated toy example, and explaining why risk is reorganised rather than eliminated.

**Supplemental readiness check:** if two parties promise equal payments through an intermediary, does the intermediary's zero scheduled net payment prove it cannot be hurt by nonpayment? Keep that question in mind. The preceding [contract-purpose lesson](lesson-l1-purpose-and-contracts.md) helps, but all new market/clearing terms are defined here. Planned references: `concept-derivative-contracts`, `concept-settlement-and-counterparty-risk`.

<a id="foundations"></a>

## 1. Foundations: trading is not the same as clearing — supplemental

- A **derivative contract** makes its value depend on an underlying asset, rate, index or event. A **position** is a party's holding or contractual commitment. An **exposure** is sensitivity to an adverse outcome.
- A **trading venue/arrangement** is how buyers and sellers find terms and agree trades. An **exchange** provides an organised marketplace with contract standards. **OTC** means **over-the-counter**: the parties negotiate a contract rather than simply using an exchange's standard contract.
- **Liquidity** means the ability to trade a desired amount promptly without greatly moving its price. “Usually liquid” is not “every size can always be traded instantly at the last price.” **Price transparency** means prices are observable; it is different from liquidity.
- **Bilateral** means between two parties. A **counterparty** is the party that owes you performance. **Default** means failing to meet a contractual obligation. **Counterparty risk** is the risk of loss from that failure; **market risk** is the risk of an adverse price/rate move even when everybody performs.
- **Clearing** arranges/manages the obligations following a trade. **Settlement** is performing the due exchange/payment. A **CCP**, or **central counterparty**, becomes the counterparty between the original parties for a cleared trade. A clearinghouse performs clearing functions; in this lesson the CCP is the central-clearing arrangement discussed by the source.
- **Margin** is cash or other collateral required as security against exposure; it is not automatically a fee or the full purchase price. **Default procedures** are the processes/resources used when a member fails to perform. Margin and those procedures manage risk; they do not guarantee every conceivable loss is impossible.

For any cash arithmetic below, all amounts are pounds sterling and due at the same stated settlement time. Positive means received, negative means paid. There are no rates, annualisation, compounding or discounting. These are supplemental payment-flow examples, not derivative-pricing models.

<a id="exchange"></a>

## 2. Exchange-traded and OTC: compare features, not slogans

**Source exchange-traded features:** standardised contracts; transparent market prices; clearinghouse involvement; usually high liquidity. [L1 physical p13, left exchange-traded box; `lecture-1-p013-exchange-traded`](../../sources/annotated/lecture-1/page-013.md#lecture-1-p013-exchange-traded).

**Supplemental explanation:** standardisation fixes common terms such as contract size or delivery dates, making contracts easier to compare and trade with different participants. Observable prices help comparison. But a standard contract may not exactly match a company's unusual amount, date or underlying. The source's “usually” does not promise liquidity in every product or stressed market.

<a id="otc"></a>

**Source OTC features:** privately negotiated; can be customised; often used by institutions; **may be centrally cleared**. [L1 physical p13, right over-the-counter box; `lecture-1-p013-otc`](../../sources/annotated/lecture-1/page-013.md#lecture-1-p013-otc).

**Supplemental explanation:** an institution is an organisation such as a bank, company or investment firm. A negotiated contract can fit a particular date, quantity or exposure. That tailoring may make comparison and subsequent transfer more difficult. Private negotiation does not prove that a trade will remain bilateral for clearing: a suitable OTC contract can be submitted to central clearing. Conversely, do not assume a bespoke contract is eligible for a CCP merely because clearing would be useful.

| Question | Source exchange description | Source OTC description | Supplemental takeaway |
|---|---|---|---|
| How fixed are terms? | Standardised | Can be customised | Fit and tradeability can pull in different directions. |
| How are prices/trades arranged? | Transparent market prices | Privately negotiated | A private quote need not be as broadly observable/comparable. |
| Who participates? | No exclusive participant group stated | Often institutions | Do not invent an “institutions only” restriction. |
| How are obligations handled? | Clearinghouse involvement | May be centrally cleared | Trading arrangement and clearing arrangement are separate questions. |
| How easy is trading? | Usually high liquidity | No universal liquidity guarantee stated | Tailoring may reduce ease of offsetting/transferring a contract; this is a trade-off, not an absolute law. |

<a id="market-choice"></a>

### The source's unusual-exposure question

A company needs a contract tailored to an unusual exposure: which market is more likely to meet its needs, and what might it give up? [L1 physical p13, lower quick decision box; `lecture-1-p013-market-choice-question`](../../sources/annotated/lecture-1/page-013.md#lecture-1-p013-market-choice-question).

**Supplemental reasoning:** OTC is the more likely starting point because its terms can be customised. The company may sacrifice some transparent price comparison, liquidity/ease of exit or access to central clearing if the design is ineligible. That is not a blanket claim that all OTC contracts have all those disadvantages. First identify the unusual term; then ask whether an existing standard contract already fits; finally compare actual prices, trading and clearing arrangements. “OTC is always riskier” is not a reasoned answer.

<a id="bilateral-network"></a>

## 3. The historical bilateral network: useful flexibility, hard-to-see exposure

The source describes **before 2008**: many OTC derivatives were privately negotiated between banks and other institutions; contracts could be tailored; banks commonly acted as dealers and market makers; counterparty exposures accumulated; reporting and price transparency were limited; many contracts were not centrally cleared. [L1 physical p14, upper bilateral promises box and central bullets; `lecture-1-p014-bilateral-market-structure`](../../sources/annotated/lecture-1/page-014.md#lecture-1-p014-bilateral-market-structure).

**Supplemental glossary and mechanism:** a **dealer** trades as a principal, taking a side of a transaction; a **market maker** offers buying and selling prices to facilitate trading. One bank can therefore face many counterparties and have both money due in and money due out. Individually sensible trades can create a complex network. Without adequate reporting, participants or regulators may not see where obligations concentrate. **Regulators** are public authorities supervising relevant market activity; the term does not mean they guarantee payment.

<a id="systemic-risk"></a>

**Source systemic-risk statement:** if a major counterparty failed, losses could spread through a network of contracts whose total exposure was difficult for participants and regulators to observe. [L1 physical p14, lower systemic-risk box; `lecture-1-p014-systemic-risk`](../../sources/annotated/lecture-1/page-014.md#lecture-1-p014-systemic-risk).

**Supplemental chain of reasoning:** suppose Bank B expects a payment from A and also owes C. A's failure can leave B short of expected funds; B may then struggle to meet its own obligation to C. That is a possible propagation channel, not a claim that every failure forces every connected bank to fail: B may have reserves or other resources. **Systemic risk** concerns disruption spreading across the system rather than remaining one isolated contract loss. Limited visibility makes it harder to assess that network, even when each separate contract is lawful and useful.

<a id="reform-scope"></a>

## 4. Reforms: identify the problem each tool addresses

**Source qualifier for the whole reform box:** **depending on the contract, counterparty and jurisdiction**. A jurisdiction is the relevant legal/regulatory territory. The statements below reproduce the course's qualified historical account, not an exhaustive statement of today's law. Do not strip the qualifier from any row.

<a id="clearing-reform"></a>

**Source clearing measure:** eligible standardised OTC derivatives **may have to** be cleared through a central counterparty. [L1 physical p15, upper reform box, conditional lead-in and clearing bullet; `lecture-1-p015-clearing-reform`](../../sources/annotated/lecture-1/page-015.md#lecture-1-p015-clearing-reform).

**Supplemental purpose:** eligible means meeting the applicable requirements for clearing. Interposing a CCP changes how default exposures are managed; it does not abolish the economic trade or make every bespoke contract eligible.

<a id="reporting-reform"></a>

**Source reporting measure:** derivative transactions are reported to **trade repositories**, subject to the box's qualifier. [L1 physical p15, upper reform box, reporting bullet; `lecture-1-p015-reporting-reform`](../../sources/annotated/lecture-1/page-015.md#lecture-1-p015-reporting-reform).

**Supplemental purpose:** a trade repository collects transaction records. Reporting helps authorities observe accumulated exposures. Recording a promise is not the same as guaranteeing that it will be paid, and repository reporting does not automatically mean every detailed trade is public.

<a id="uncleared-reform"></a>

**Source uncleared-contract measure:** uncleared contracts **may** face margin and risk-management rules, with the same qualifier. [L1 physical p15, upper reform box, uncleared-contract bullet; `lecture-1-p015-uncleared-margin-reform`](../../sources/annotated/lecture-1/page-015.md#lecture-1-p015-uncleared-margin-reform).

**Supplemental purpose:** a contract that cannot be centrally cleared can still have collateral and bilateral controls. “Not cleared” does not mean “nothing can be done about default risk.” The amount, timing and eligibility of collateral matter; this lesson invents no legal margin schedule.

<a id="platform-reform"></a>

**Source platform measure:** **some** standardised contracts trade on organised platforms, with the same qualifier. [L1 physical p15, upper reform box, trading-platform bullet; `lecture-1-p015-platform-reform`](../../sources/annotated/lecture-1/page-015.md#lecture-1-p015-platform-reform).

**Supplemental purpose:** an organised trading platform structures how participants find quotes and execute trades, which can improve price discovery/visibility. It is a trading arrangement, not itself a substitute for a CCP or a trade repository. Keep trading, clearing and reporting distinct.

<a id="reform-matching"></a>

### The source matching questions

Which reform primarily addresses: (1) regulators cannot observe accumulated exposures; (2) a counterparty may fail before paying; (3) a customised contract cannot be centrally cleared? [L1 physical p15, lower quick-check box; `lecture-1-p015-reform-matching`](../../sources/annotated/lecture-1/page-015.md#lecture-1-p015-reform-matching).

**Supplemental method:** distinguish an **information** problem, a **default-management** problem and an **uncleared-contract** case. More than one measure can help; “primarily” asks for the clearest match, not an exclusive cure. Exercise 4 supplies a separate authored answer rather than claiming the slide included one.

<a id="bilateral-default"></a>

## 5. What changes when a CCP stands between A and B?

**Source without central clearing:** Bank A and Bank B are directly exposed to each other's default. [L1 physical p16, upper without-central-clearing box; `lecture-1-p016-bilateral-default`](../../sources/annotated/lecture-1/page-016.md#lecture-1-p016-bilateral-default).

**Supplemental reading:** if A sells and B buys directly, B depends on A for delivery and A depends on B for payment. The precise risk at a given time depends on the contract and what has already been exchanged, not just its headline amount.

<a id="ccp-interposition"></a>

**Source with central clearing:** the CCP becomes **the buyer to Bank A's sale** and **the seller to Bank B's purchase**. [L1 physical p16, middle with-central-clearing box; `lecture-1-p016-ccp-interposition`](../../sources/annotated/lecture-1/page-016.md#lecture-1-p016-ccp-interposition).

**Supplemental accessible flow:** instead of one A–B relationship, there are A–CCP and CCP–B relationships. A remains the economic seller and B the economic buyer. The CCP takes the opposite contractual side of each; it has not turned both banks into buyers or removed the purchase/sale.

<a id="ccp-risk"></a>

**Source key implication:** the original trade remains economically matched, while counterparty exposure is managed through the CCP's margin and default procedures. The source asks whether clearing eliminates risk or reorganises and manages it. [L1 physical p16, lower key implication box and question; `lecture-1-p016-ccp-risk-management`](../../sources/annotated/lecture-1/page-016.md#lecture-1-p016-ccp-risk-management).

**Supplemental answer:** it **reorganises and manages** risk. Matching promised obligations is not matching actual cash when somebody fails. Price risk remains for the relevant position, and the CCP needs robust resources and procedures. Concentrating management at the CCP makes its own resilience important; it does not prove it is incapable of failure.

<a id="worked-clearing"></a>

## 6. Worked payment example — supplemental, deliberately simplified

This example illustrates one payment obligation, not a complete clearing rulebook. Suppose a contract produces a **£12 cash payment from A to B** at a specified settlement time. There are no other payments, costs or timing differences. Under clearing, that same matched obligation becomes £12 from A to the CCP and £12 from the CCP to B. These invented numbers are not source observations.

1. **Bilateral, both perform:** A pays £12; B receives £12. Signed total: −£12 + £12 = **£0** across the parties.
2. **Cleared, both perform:** A pays the CCP £12; the CCP pays B £12. CCP net cash is +£12 − £12 = **£0**. A still pays and B still receives the same £12.
3. **Default stress:** suppose A pays nothing at that time. Assume exactly **£8 of A's collateral is immediately available** for this £12 obligation, with no other recovery considered yet. Cash resources identified so far are £8, leaving **£12 − £8 = £4** to be met from other resources/procedures.
4. **Interpretation:** £4 is the **uncovered amount in this simplified resource comparison**, not a predicted final CCP loss or a statement that B must lose £4. Other resources, recovery and actual rules could change the result; they are outside the example.
5. **Checks:** £8 available + £4 uncovered = £12 due. If available collateral were £12 instead, the amount uncovered on this obligation would be **£0**. Both calculations are exact pounds with no rounding. Zero scheduled CCP net cash in step 2 did not make the step-3 funding/default problem impossible.

This shows why “the two sides cancel” must refer to scheduled economic obligations, not a guarantee of simultaneous performance. Margin's usefulness depends on its amount and availability; clearing is not magic cancellation of debt.

<a id="limits"></a>

## Misconceptions and limits — supplemental

- **OTC means uncleared:** false; the source explicitly says OTC may be centrally cleared.
- **Standardised means suitable for every exposure:** false; dates, quantities and underlyings may not match.
- **Usually high liquidity means no cost to exit:** false; liquidity varies and prices can move.
- **Reporting prevents default:** it improves information, not by itself payment capacity.
- **Every derivative must be cleared or traded on a platform:** the course says eligible/may/some and qualifies contract, counterparty and jurisdiction. No universal rule follows.
- **Margin is the purchase price or a guaranteed cap on loss:** it is security; the simplified example shows a possible shortfall, not a legally specified margin amount.
- **Clearing eliminates market risk or all counterparty risk:** it changes the counterparty structure and manages exposure; it does not repeal adverse market moves or the need for default resources.

<a id="practice"></a>

## Practice — six prompts, separate answers

All added scenarios and answer explanations are supplemental. The market-choice, reform-matching and risk questions retain their exact source citations above.

<a id="exercise-1-prompt"></a>

### 1. Compare features (outcome 1, scaffolded)

List the source's four exchange-traded features and four OTC features. Define liquidity separately from price transparency. Which word prevents “exchange-traded” from promising liquidity in every situation? Which OTC feature disproves “OTC always means uncleared”? [Answer 1](#exercise-1-answer).

<a id="exercise-2-prompt"></a>

### 2. Choose and trace (outcome 1, transfer)

A company needs an unusual delivery date and exact quantity not offered by an exchange's standard contract. Which arrangement is more likely to fit, and name two things to check or potentially give up? Next, explain how A's failure to pay B could affect C when B owes C, and why contagion is possible rather than automatic. Include one reason the historical private network was hard to assess. [Answer 2](#exercise-2-answer).

<a id="exercise-3-prompt"></a>

### 3. Explain market structure (outcome 1, teach-back)

Explain to a beginner why a contract may be OTC **and** centrally cleared, why custom terms can have trade-offs, and how one institution's default can affect others. Use liquidity, transparency and counterparty risk correctly rather than calling them the same thing. [Answer 3](#exercise-3-answer).

<a id="exercise-4-prompt"></a>

### 4. Match the reforms (outcome 2, scaffolded)

Answer all three source reform questions: unobservable accumulated exposure; counterparty nonpayment; a customised contract that cannot be cleared. Then identify the fourth source reform concerning where some standardised contracts trade. State the qualifier applying to all four reforms and explain why reporting is not the same as clearing. [Answer 4](#exercise-4-answer).

<a id="exercise-5-prompt"></a>

### 5. Trace the CCP and stress it (outcome 2, transfer)

A sells and B buys. State the CCP's role facing each. In a separate toy payment case, A owes B **£15** at one settlement time. Under clearing, trace A–CCP–B if all perform, and calculate CCP net scheduled cash. If A instead pays nothing and **£9** of collateral is immediately available, calculate the uncovered amount before other resources/recovery. Check the sum and explain what the result does **not** prove. Assume no other flows, costs or timing differences. [Answer 5](#exercise-5-answer).

<a id="exercise-6-prompt"></a>

### 6. Correct a false guarantee (outcome 2, teach-back)

A colleague says, “A CCP makes every risk disappear because its two trades cancel. Reporting and margin are therefore unnecessary, and all OTC contracts must be cleared.” Correct the claims using both the source's role description and its conditional reform language. Use the worked payment example to explain the distinction between promised and actual cash. [Answer 6](#exercise-6-answer).

<a id="answers"></a>

## Supplemental answers, feedback and retries

<a id="exercise-1-answer"></a>

### Answer 1

Exchange: **standardised contracts, transparent market prices, clearinghouse involvement, usually high liquidity**. OTC: **privately negotiated, can be customised, often used by institutions, may be centrally cleared**. Liquidity concerns the ability to execute trades without greatly moving the price; transparency concerns observing prices. **Usually** is the liquidity qualifier. **May be centrally cleared** directly contradicts “OTC always means uncleared.”

**Feedback/retry:** if you merged liquidity with transparency, imagine a clearly displayed quote for only a tiny available quantity. Retry: does knowing the price guarantee a large trade can occur there? Correct target: no; visibility and executable depth are different.

<a id="exercise-2-answer"></a>

### Answer 2

OTC is more likely to match the unusual terms because they can be negotiated. Check actual price comparability, ease/cost of exit, collateral terms and clearing eligibility; customisation may sacrifice some standard-market liquidity/transparency or eligibility. These are possibilities, not inevitable features of all OTC trades.

If A's expected payment is missing, B may have fewer funds for its obligation to C. B may nevertheless have other resources, so A's default need not force B to default. The source's limited reporting and price transparency made accumulated network exposures hard to observe; many trades were not centrally cleared.

**Feedback/retry:** if “A fails” became “everyone must fail,” name one buffer B might have. Correct target: cash reserves or other usable resources. Then describe the propagation as a risk, not a certainty.

<a id="exercise-3-answer"></a>

### Answer 3 — model and checklist

“OTC describes privately negotiating a contract, while clearing describes managing the resulting counterparty obligations, so an eligible OTC contract may be centrally cleared. Custom terms can match an unusual need but may be harder to compare or trade out of. Liquidity is ease of trading; transparency is visibility of prices; counterparty risk is possible loss from nonperformance. A bank can owe one institution while expecting payment from another, so a missed payment can spread stress through a network, especially when total exposures are hard to see. That propagation is possible, not guaranteed, because institutions may have other resources.”

Check that the explanation separates trading from clearing, includes one customisation trade-off, defines three different risks/features and explains a conditional network effect. **Feedback/retry:** if “OTC” alone determined clearing, ask two separate questions: how were terms agreed, and who now stands between the parties? Answer them separately before retelling.

<a id="exercise-4-answer"></a>

### Answer 4

1. **Reporting to trade repositories** primarily addresses visibility of accumulated exposures.
2. **Central clearing with CCP margin/default procedures**, where eligible/applicable, addresses how counterparty default exposure is managed; it does not eliminate default possibility.
3. **Margin and risk-management rules for uncleared contracts** address the customised-contract case when clearing is unavailable.
4. **Organised trading platforms for some standardised contracts** concern where trading occurs and can support price discovery/visibility.

All are qualified by **contract, counterparty and jurisdiction**. Reporting records transactions; clearing changes/manages obligations and counterparty structure. Neither is automatically a substitute for the other. This is a supplemental answer to the source questions, not a claim that the slide provided an official answer key.

**Feedback/retry:** if you chose reporting as a payment guarantee, ask what a repository holds: records or a promise to pay every trade? Correct target: records. Rematch information and default-management problems.

<a id="exercise-5-answer"></a>

### Answer 5

The CCP buys from seller A and sells to buyer B. In the separate £15 obligation example, A pays **£15 to the CCP**, and the CCP pays **£15 to B**. CCP scheduled net cash: +£15 − £15 = **£0**. If A pays nothing and £9 collateral is available, the uncovered amount before other resources is £15 − £9 = **£6**. Check: £9 + £6 = £15. No rounding is needed.

That £6 is not automatically the CCP's final loss or B's loss. Other resources/recovery and actual procedures have not been modelled. A zero scheduled net flow assumes matched performance; it does not guarantee that incoming cash arrives when needed.

**Feedback/retry:** if you answered “zero risk” from the zero net flow, replace the incoming £15 with zero and identify the remaining promised outgoing payment. Correct target: the CCP still has a £15 obligation in the example; £9 collateral alone leaves £6 unidentified.

<a id="exercise-6-answer"></a>

### Answer 6

The CCP takes opposite sides of A's sale and B's purchase, preserving the matched economic trade, but it manages rather than removes default exposure. In the worked example £12 received and £12 paid would net to zero **if both occur**; if A pays nothing, the outgoing obligation does not disappear. Reporting helps reveal accumulated exposures; margin provides security and default procedures manage failures. They address different problems. The source does not say all OTC contracts must clear: eligible standardised contracts **may have to**, depending on contract, counterparty and jurisdiction; uncleared contracts can face their own controls. Market risk and the need for robust CCP resources remain.

**Feedback/retry:** if you retained a universal “must,” restate the source condition before the conclusion. Correct target: conditional applicability, not a blanket rule. Then retell why economic matching does not guarantee performance.

<a id="stop"></a>

## Stop and check

**Supplemental tutoring prompt:** give your own answers to exercises 3 and 6. A tutor should check market comparison, network mechanism, CCP roles, arithmetic and conditional language separately, using the relevant retry for gaps. Store personal responses privately. Neither a correct subtraction nor reading the answer proves full understanding.

Next: [read market-size charts and classify positions](lesson-l1-market-charts-and-positions.md). This lesson stops at market structure, the source's qualified reform account and the logic of clearing; it does not prescribe a current legal obligation or model a CCP's complete default resources.

<a id="evidence"></a>

## Complete source evidence

All four normalized/raw pages and original production images were read/viewed. Canonical source status is verified; historical extraction headers remain unchanged. No source conflict is recorded for these thirteen units. Teaching review remains pending.

| Physical page | Normalized source | Unchanged raw | Original image |
|---|---|---|---|
| 13 | [Trading arrangements](../../sources/annotated/lecture-1/page-013.md) | [Raw 13](../../sources/extracted/lecture-1/page-013.md#page-13) | [Image 13](../../sources/assets/lecture-1/page-013.png) |
| 14 | [Bilateral network](../../sources/annotated/lecture-1/page-014.md) | [Raw 14](../../sources/extracted/lecture-1/page-014.md#page-14) | [Image 14](../../sources/assets/lecture-1/page-014.png) |
| 15 | [Reforms/questions](../../sources/annotated/lecture-1/page-015.md) | [Raw 15](../../sources/extracted/lecture-1/page-015.md#page-15) | [Image 15](../../sources/assets/lecture-1/page-015.png) |
| 16 | [CCP roles/risk](../../sources/annotated/lecture-1/page-016.md) | [Raw 16](../../sources/extracted/lecture-1/page-016.md#page-16) | [Image 16](../../sources/assets/lecture-1/page-016.png) |
