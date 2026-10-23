from pathlib import Path
import json,hashlib,re,math
ROOT=Path.cwd();DATA={}
def add(s,p,*sections):DATA[(s,p)]=sections
# Each tuple is (stable region slug, heading, normalized source content).
P1='seminar-1-problems';S1='seminar-1-solutions';P2='seminar-2-problems';S2='seminar-2-solutions';P3='seminar-3-problems'
add(P1,1,('q1','Question 1',r'''Give an example of a hedger, a speculator, and an arbitrageur in derivatives markets.

Why might a hedger sometimes be accused of “speculating”? What controls should firms have in place?'''),('q2','Question 2',r'''Which of the following instruments are OTC vs exchange-traded?

- Futures on crude oil
- A customized forward contract on jet fuel
- An S&P 500 index option
- A 5-year interest rate swap

What are the advantages and disadvantages of OTC vs exchange? Why do most FX and interest rate derivatives trade OTC instead of on exchanges?'''),('q3','Question 3',r'''A farmer expects to harvest 50,000 bushels of wheat in 3 months. Wheat futures (contract size 5,000 bushels) for delivery in 3 months trade at $5.20 per bushel.

1. What hedge should the farmer take today?
2. How many contracts are required?
3. If the spot price turns out to be $4.80 at harvest and the futures settle at $4.85, what is the effective price the farmer receives?

Why is the hedge not perfect?'''))
add(P1,2,('q4','Question 4',r'''Define the basis and explain why it matters in a hedge.

Spot price of corn today = $3.00, futures price (3 months) = $3.10. In 3 months, spot = $2.70, futures = $2.75.

- What was the basis at hedge initiation and at hedge close?
- How did the basis risk affect the hedge outcome?

Why does the basis tend to converge to zero at maturity?'''),('q5','Question 5',r'''An airline wants to hedge jet fuel costs, but there are no jet fuel futures. It considers using crude oil futures.

What are the risks in this strategy? What factors determine whether cross-hedging is effective?'''),('q6','Question 6',r'''Historical regression of $\Delta S$ on $\Delta F$ gives slope $h^*=0.8$. If the airline’s fuel exposure is 1,000,000 gallons and each futures contract = 42,000 gallons, how many contracts should it use?

Why might $h^*$ be less than 1? Can over-hedging ever make sense?'''))
# Supplied solutions retain repeated questions as distinct evidence, not invented answers.
add(S1,1,('q1','Question 1',DATA[(P1,1)][0][2]),('q1-hedger','Supplied solution: hedger',r'''A wheat farmer expects to sell wheat in three months and is concerned that its price may fall. The farmer shorts wheat futures. If wheat prices fall, the gain on the futures position offsets some or all of the lower cash-market revenue. The hedge stabilises the selling price, although basis risk may remain.'''),('q1-speculator','Supplied solution: speculator',r'''A trader expects crude-oil prices to rise and buys oil futures without having an existing oil exposure. The trader profits if the futures price rises and loses if it falls. The objective is to take risk in anticipation of a return.'''),('q1-arbitrageur','Supplied solution: arbitrageur',r'''Suppose gold is priced at $2,000 per ounce and carrying costs imply a fair one-year futures price of $2,120, but the market futures price is $2,150. The arbitrageur can buy gold, finance and carry it for one year, and short the futures contract. At maturity, the gold is delivered for $2,150, generating an arbitrage profit of

$$2150-2120=30$$

 dollars per ounce, before transaction costs.'''),('q1-mismatch-start','Supplied solution: when a hedge becomes speculative (continues on physical page 2)',r'''A hedge may become speculative if the derivative position does not match the underlying exposure. This can occur when the firm hedges more than its actual exposure. The source list continues on physical page 2.'''))
add(S1,2,('q1-controls','Supplied solution: speculative mismatch and controls (continued)',r'''Continuation of Question 1. The remaining circumstances are:

- trades without an underlying exposure;
- changes the hedge according to market forecasts; or
- uses instruments that introduce additional risks.

Firms should therefore have:

- a written hedging policy;
- documentation linking each derivative to an underlying exposure;
- position limits and appropriate authorisation;
- independent risk monitoring and valuation; and
- regular reporting and reconciliation.

A hedge should be evaluated by how effectively it reduces the risk of the combined position, not by whether the derivative makes a profit.'''),('q2','Question 2',DATA[(P1,1)][1][2]),('q2-market-table','Supplied solution: instrument and typical market table',r'''| Instrument | Typical market |
|---|---|
| Crude-oil futures | Exchange-traded |
| Customised jet-fuel forward | OTC |
| Standard S&P 500 index option | Exchange-traded |
| Five-year interest-rate swap | OTC |'''),('q2-exchange-start','Supplied solution: exchange-traded terms and advantages (continues)',r'''Exchange-traded derivatives have standardised contract sizes, maturities, and terms. Their main advantages include transparent market prices. The advantage list continues on physical page 3.'''))
add(S1,3,('q2-market-tradeoffs','Supplied solution: exchange/OTC tradeoffs (continued)',r'''The remaining exchange-traded advantages are generally high liquidity; central clearing and daily margining; and reduced and actively managed counterparty risk.

Their main disadvantage is limited flexibility: available contracts may not match the amount, maturity, or underlying exposure that a firm needs to hedge.

OTC derivatives are negotiated between counterparties. Their main advantage is customisation: the parties can choose the notional amount, maturity, underlying asset, and payment terms.

Their disadvantages may include:

- lower liquidity for customised contracts;
- less public price transparency;
- more complex documentation and valuation; and
- counterparty risk, particularly for uncleared contracts.

Many FX and interest-rate derivatives trade OTC because firms and financial institutions often need contracts that match precise currencies, amounts, dates, interest-rate conventions, and cash flows. OTC dealer markets can provide this flexibility and can also be highly liquid for commonly traded products.

Some standardised OTC derivatives are centrally cleared, while uncleared contracts may be subject to collateral, margin, and reporting requirements.'''),('q3','Question 3',DATA[(P1,1)][2][2]))
add(S1,4,('q3-direction-size','Supplied solution: hedge direction and contract count',r'''Because the farmer will sell wheat in three months and is concerned that its price may fall, the farmer should take a short futures hedge.

$$N=\frac{\text{quantity hedged}}{\text{contract size}}=\frac{50{,}000}{5{,}000}=10\text{ short contracts}.$$'''),('q3-proceeds','Supplied solution: spot revenue, futures gain and effective price',r'''At harvest, the farmer sells the physical wheat in the spot market:

$$\text{Spot revenue}=50{,}000(4.80)=240{,}000\text{ dollars}.$$

The short futures position gains $5.20-4.85=0.35$ dollars per bushel. Therefore,

$$\text{Futures gain}=50{,}000(0.35)=17{,}500\text{ dollars}.$$

Total proceeds are $240{,}000+17{,}500=257{,}500$ dollars. Hence,

$$\text{Effective price}=\frac{257{,}500}{50{,}000}=5.15\text{ dollars per bushel}.$$

Equivalently,

$$\text{Effective price}=S_T+(F_0-F_T)=4.80+(5.20-4.85)=5.15.$$'''),('q3-basis-risk','Supplied solution: imperfect hedge and closing basis',r'''The hedge is imperfect because of basis risk. The closing basis is

$$b_T=S_T-F_T=4.80-4.85=-0.05\text{ dollars}.$$

Thus,

$$\text{Effective price}=F_0+b_T=5.20-0.05=5.15\text{ dollars}.$$

The effective price differs from the initial futures price because spot and futures prices do not move perfectly together. Differences in quality, location, timing, transaction costs, and the quantity actually harvested may also reduce hedge effectiveness.'''))
add(S1,5,('q4','Question 4',DATA[(P1,2)][0][2]),('q4-basis','Supplied solution: basis definition and changes',r'''The basis is defined as $b_t=S_t-F_t$, where $S_t$ is the spot price and $F_t$ is the futures price.

$$b_0=S_0-F_0=3.00-3.10=-0.10\text{ dollars},$$
$$b_T=S_T-F_T=2.70-2.75=-0.05\text{ dollars}.$$

The basis has strengthened because it increased from $-0.10$ to $-0.05$ dollars.'''),('q4-hedge-outcome','Supplied solution: effect on short and long hedgers',r'''For a short hedger, such as a corn farmer,

$$\text{Effective selling price}=S_T+(F_0-F_T).$$

Therefore,

$$2.70+(3.10-2.75)=3.05\text{ dollars}.$$

Equivalently, $F_0+b_T=3.10-0.05=3.05$ dollars. If the basis had remained at $-0.10$, the effective price would have been $3.10-0.10=3.00$ dollars.

Thus the strengthening basis improves the short hedger’s effective selling price by $0.05 per bushel. For a long hedger, the same basis strengthening increases the effective purchase price and is unfavourable.

Uncertainty about the closing basis is called basis risk. A futures hedge does not normally guarantee the exact initial futures price.'''))
add(S1,6,('q4-convergence','Supplied solution: convergence (continued)',r'''At the delivery date, the futures price and spot price for the same deliverable asset, location, and delivery terms must converge:

$$F_T\to S_T\quad\Rightarrow\quad b_T=S_T-F_T\to0.$$

Otherwise, traders could buy in the cheaper market and sell in the more expensive market, creating an arbitrage opportunity.'''),('q5','Question 5',DATA[(P1,2)][1][2]),('q5-cross-hedge','Supplied solution: cross-hedge and residual risks',r'''Because the airline will buy fuel in the future and is concerned that prices may rise, it should take a long position in crude-oil futures.

This is a cross-hedge because the asset being hedged, jet fuel, differs from the futures underlying, crude oil.

The main risks are:

- **Imperfect correlation:** jet-fuel and crude-oil prices may not move together.
- **Refining-spread risk:** changes in refining costs and margins can cause jet-fuel prices to move differently from crude-oil prices.
- **Timing mismatch:** futures maturity may not coincide with the airline’s fuel-purchase date.
- **Location and benchmark mismatch:** the crude-oil contract may refer to a different region or pricing benchmark.
- **Margin risk:** daily futures losses may create cash-flow requirements even if the physical hedge is economically effective.

The cross-hedge is more effective when changes in jet-fuel prices are strongly and consistently related to changes in crude-oil futures prices. High and stable correlation, appropriate contract maturity, similar pricing locations, and good futures-market liquidity generally improve effectiveness. Because the commodities are not identical, some basis risk remains.'''))
add(S1,7,('q6','Question 6',DATA[(P1,2)][2][2]),('q6-contract-count','Supplied solution: optimal contracts',r'''The optimal number is

$$N^*=h^*\frac{Q_A}{Q_F},$$

where $Q_A$ is the exposure size and $Q_F$ is the quantity covered by one futures contract.

$$N^*=0.8\left(\frac{1{,}000{,}000}{42{,}000}\right)=19.05.$$

Contracts must be whole numbers, so the airline should use approximately **19 long crude-oil futures contracts**. The position is long because it will buy fuel and fears price increases.'''),('q6-ratio-overhedging','Supplied solution: minimum variance versus speculation',r'''The minimum-variance hedge ratio is

$$h^*=\rho\frac{\sigma_S}{\sigma_F}.$$

Here $h^*=0.8$, so substantially more than 19 contracts moves away from the estimated minimum-variance hedge.

A hedge ratio greater than one can nevertheless be appropriate in another case: if the spot exposure is more volatile than the futures price and correlation is sufficiently high,

$$\rho\frac{\sigma_S}{\sigma_F}>1.$$

A futures position larger than the physical quantity can then minimise the variance of the hedged position and is not necessarily speculative. But taking a position larger than the estimated minimum-variance hedge because of a market forecast introduces additional risk and is speculation rather than pure hedging.'''))
add(P2,1,('q1','Question 1',r'''Differentiate between forward, futures, and options contracts in terms of:

- Standardization
- Settlement
- Credit risk
- Typical market participants'''),('q2','Question 2',r'''A manufacturing company uses large quantities of copper in its production process and is concerned about rising copper prices over the next six months.

- What derivative instrument could the company use to hedge this price risk?
- Would it take a long or short position?
- Identify one potential risk that remains even after hedging.'''),('q3','Question 3',r'''A non-dividend-paying stock is currently priced at $50. The risk-free rate is 6% per annum, with continuous compounding.

- Calculate the 6-month forward price for the stock.
- If the time to maturity were instead 1 year, what would the forward price be?'''),('q4','Question 4',r'''Explain briefly why the forward price may differ from the expected future spot price. Which forces ensure that the forward price is not arbitrageable?'''))
add(P2,2,('q5','Question 5',r'''The current futures price for a Treasury bond deliverable in 3 months is 101.50. The bond’s coupon is 6% per annum, with semiannual payments, and the next coupon is due in 4 months. The risk-free rate is 5% (continuous compounding).

- Explain qualitatively what factors might cause the current futures price (101.50) to be higher or lower than the current spot price of the bond.
- How might the timing of the next coupon payment affect the relationship between the spot price and the futures price?
- If the bond were zero-coupon, would you expect the futures price to be higher or lower than the spot price? Briefly explain.'''),('q6','Question 6',r'''Define clearly: spot rate; forward rate; par yield; zero-coupon rate.

Briefly describe how these rates differ from one another in interpretation or use.'''),('q7','Question 7: Treasury table and bootstrapping',r'''You observe the following Treasury bond data:

| Maturity (years) | Coupon rate (annual) | Price per 100 par |
|---|---|---|
| 0.5 | 0% | 97.00 |
| 1.0 | 6% | 101.50 |
| 1.5 | 8% | 104.00 |

**Source assumption: “Assume annual coupon payments.”**

- Compute the 0.5-year zero rate.
- Using that, estimate the 1-year zero rate.
- Briefly explain the next step to extend the zero curve to longer maturities.

**Source conflict, not a transcription correction:** the supplied solution’s physical page 5 changes the assumption to semiannual coupon payments and explicitly assumes continuously compounded zero rates. The problem itself does not specify the zero-rate quote convention or the annual-coupon schedule for fractional maturities. Preserve both versions; do not present the supplied semiannual answer as uniquely following from this annual-coupon question.'''))
add(S2,1,('q1','Question 1',DATA[(P2,1)][0][2]),('q1-standardization','Supplied solution: standardization',r'''Forwards are private, customizable agreements between two parties. Futures are standardized contracts traded on organized exchanges. Options are standardized when exchange-traded but can be customized in OTC markets.'''),('q1-settlement','Supplied solution: settlement',r'''Forwards are typically settled at maturity by physical delivery or cash settlement. Futures are marked to market daily, with gains and losses settled each day through a clearing house. For exchange-traded options, the clearinghouse substantially reduces counterparty risk. For OTC options, the buyer may suffer a loss if the option writer defaults. The buyer’s maximum loss from movements in the underlying price is normally the premium paid.'''),('q1-credit-risk','Supplied solution: credit risk — conflicting source wording retained',r'''The source states:

“Forwards carry significant counterparty risk because they are private contracts without an intermediary. Futures have minimal credit risk since the exchange clearing house guarantees performance. Option buyers face no default risk beyond the premium paid, while writers have potential exposure unless collateralized.”

**Source qualification:** the option-buyer default statement conflicts with the Settlement paragraph on this same page, which correctly acknowledges loss when an OTC option writer defaults. Premium-limited market loss is not immunity from counterparty default; preserve the contradiction rather than teach the quoted assertion as a general rule. Clearing/collateral reduces and manages counterparty risk, not every possible default or operational risk.'''),('q1-participants','Supplied solution: typical market participants',r'''Forwards are used mainly by corporations and financial institutions for tailored hedging needs. Futures attract hedgers and speculators requiring liquidity and transparency. Options are widely used by hedgers, speculators, and portfolio managers seeking asymmetric payoff structures.'''))
add(S2,2,('q2','Question 2',DATA[(P2,1)][1][2]),('q2-solution','Supplied solution: copper hedge',r'''The company could use a futures contract (or forward contract) on copper to hedge rising prices. It should take a long position in copper futures, locking in the purchase price for future delivery and protecting against potential increases.

The hedge may not be perfect because of basis risk: futures and actual purchase prices may not move identically. Other residual risks include maturity, quantity, or quality differences relative to actual copper needs.'''),('q3','Question 3',DATA[(P2,1)][2][2]),('q3-solution','Supplied solution: continuous-compounding forward prices',r'''For a non-dividend-paying asset under continuous compounding,

$$F_0=S_0e^{rT},$$

where $S_0=50$, $r=0.06$, and maturity $T$ is in years.

- Six months ($T=0.5$): $F_0=50e^{0.06\times0.5}=50e^{0.03}=50\times1.03045=51.52$.
- One year ($T=1$): $F_0=50e^{0.06\times1}=50e^{0.06}=50\times1.06184=53.09$.

The supplied rounded forward prices are approximately $51.52 and $53.09 respectively.'''))
add(S2,3,('q4','Question 4',DATA[(P2,1)][3][2]),('q4-solution','Supplied solution: forward price, expectations and arbitrage',r'''Forward price and expected future spot price are different concepts. Forward price is determined by current spot price and cost of carrying the asset until maturity. For a non-dividend-paying investment asset,

$$F_0=S_0e^{rT},$$

where $S_0$ is current spot, $r$ the continuously compounded risk-free rate, and $T$ maturity. The forward price is determined by the no-arbitrage relationship; expected future spot reflects expectations and risk premia.

$E[S_T]$ is the future spot price expected on average by market participants. It depends on expectations of future market conditions and may include a risk premium. In general,

$$F_0\ne E[S_T].$$

Arbitrage keeps the forward price close to theoretical value. If $F_0\ne S_0e^{rT}$, an opportunity may exist:

- Above no-arbitrage value: arbitrageurs tend to sell forward and take an offsetting underlying position.
- Below no-arbitrage value: arbitrageurs tend to buy forward and take an offsetting underlying position.

This activity helps move the price back towards its no-arbitrage value.'''),('q5-start','Question 5 (begins; continues on physical page 4)',r'''The current futures price for a Treasury bond deliverable in 3 months is 101.50. The bond’s coupon is 6% per annum, with semiannual payments, and the next coupon is due in 4 months. The risk-free rate is 5% (continuous compounding).

- Explain qualitatively what factors might cause the current futures price (101.50) to be higher or lower than the current spot price of the bond.

The remaining two prompts continue on physical page 4.'''))
add(S2,4,('q5-prompts-continued','Question 5 (continued)',r'''- How might the timing of the next coupon payment affect the relationship between spot and futures prices?
- If the bond were zero-coupon, would you expect futures to be higher or lower than spot? Briefly explain.'''),('q5-solution','Supplied solution: bond financing and coupon timing',r'''The spot/futures relationship depends mainly on carrying costs and coupon income received before futures expiry.

- If financing costs exceed coupon income during the contract period, futures tend to be higher than spot.
- If coupon income exceeds financing costs, futures may be lower than spot.

Here expiry is in three months but the next coupon is paid in four months. No coupon is received during the contract’s life. With a positive interest rate, financing cost is positive, so futures would normally be higher than current spot.

For a zero-coupon bond there is also no coupon income. Under the simplified no-arbitrage model,

$$F_0=S_0e^{rT}.$$

Since $r>0$, $F_0>S_0$. Thus zero-coupon bond futures would normally be higher than spot when rates are positive.

**Model scope:** this is the supplied simplified comparison, not a full Treasury-futures conversion-factor, accrued-interest, delivery-option or stochastic-rate valuation.'''),('q6','Question 6',DATA[(P2,2)][1][2]))
add(S2,5,('q6-spot','Supplied solution: spot rate',r'''The interest rate agreed today for a zero-coupon investment that starts today and matures at a specified future date. It is the annualized return on a risk-free bond paying a single amount at maturity, also called the zero rate or zero-coupon rate for that maturity.'''),('q6-forward','Supplied solution: forward rate',r'''The implied future interest rate between two future dates, derived from spot rates. It is implied by today’s zero curve under no-arbitrage, not necessarily a prediction of the future market rate.'''),('q6-par','Supplied solution: par yield — source qualification',r'''The source defines par yield as the coupon rate at which a bond trades exactly at par value (price = face value), and states: “It represents an average of spot rates weighted by the bond’s cash flows.”

**Qualification:** preserve that description as source wording, not a generally exact arithmetic-average formula. Par yield is obtained by equating the discounted coupon and principal cash flows to par with the specified payment schedule and rate conventions.'''),('q6-zero-and-comparison','Supplied solution: zero-coupon rate and interpretation',r'''Zero-coupon rate is the return on a zero-coupon (discount) bond paying a single lump sum at maturity; it is synonymous with the spot rate for that maturity.

Spot (zero) rates apply from today to a given maturity; forward rates to periods between future dates; par yields are coupon rates consistent with current spot rates for a bond priced at par.'''),('q7','Question 7: supplied solution version',r'''Treasury data:

| Maturity (years) | Coupon rate (annual) | Price per 100 par |
|---|---|---|
| 0.5 | 0% | 97.00 |
| 1.0 | 6% | 101.50 |
| 1.5 | 8% | 104.00 |

The source prints “Assume semiannually coupon payments.” Compute the 0.5-year zero rate; use that to estimate the 1-year zero rate; explain the next step to extend the curve.

**Source conflict:** the problem PDF physical page 2 instead says annual coupon payments. The solution below adopts semiannual coupons and continuously compounded zero rates; it is conditional on those conventions, not a unique solution of the annual-coupon wording.'''),('q7-discount-factor','Supplied solution: discount-factor convention',r'''Assume coupons are paid semiannually and zero rates are continuously compounded. Let $P(0,T)$ denote the discount factor to maturity $T$:

$$P(0,T)=e^{-R(T)T}.$$

**Source conflict:** these are the solution’s explicit conventions; the separate problem says annual coupon payments.'''))
add(S2,6,('q7-half-year','Supplied solution: 0.5-year zero rate',r'''Under the solution’s continuously compounded zero-rate convention, the zero-coupon bond pays $100 at maturity and costs $97:

$$97=100e^{-R(0.5)\times0.5}.$$

Therefore,

$$R(0.5)=-\frac{\ln(97/100)}{0.5}=0.0609\approx6.09\%.$$

The displayed decimal is rounded. The separate problem specifies annual coupons, while this supplied solution uses semiannual coupons for the coupon bonds.'''),('q7-one-year','Supplied solution: one-year zero rate',r'''Under the supplied solution’s **semiannual-coupon** assumption, the 6% bond pays $\frac{6\%}{2}\times100=3$ dollars each half-year. Cash flows are $3 after 0.5 years and $103 after one year:

$$101.50=3e^{-0.0609\times0.5}+103e^{-R(1)\times1}.$$

The source writes $e^{-0.0609\times0.5}=0.97$ (using a rounded exponent), hence

$$101.50=3\times0.97+103e^{-R(1)},$$
$$e^{-R(1)}=\frac{101.50-2.91}{103}=0.95718,$$
$$R(1)=-\ln(0.95718)=0.0438\approx4.38\%.$$

**Rounding qualification:** the printed equalities use rounded rates/discount factors; use the exact $0.97$ half-year discount factor for numerical checks. **Source conflict:** this answer is conditional on semiannual coupons, whereas the separate problem says annual coupons.'''))
add(S2,7,('q7-extension','Supplied solution: extending the zero curve',r'''To find the 1.5-year zero rate, use the 1.5-year bond and the already calculated 0.5- and 1-year rates. The 8% bond pays $4 every six months: $4 at 0.5 years, $4 at 1 year, and $104 at 1.5 years.

$$104=4e^{-R(0.5)\times0.5}+4e^{-R(1)\times1}+104e^{-R(1.5)\times1.5}.$$

The first two zero rates are known, so solve for the 1.5-year zero rate. This step-by-step process is called **bootstrapping**.

**Source conflict:** these cash flows use the supplied solution’s semiannual coupons and continuously compounded zero rates, not the separate problem’s annual-coupon assumption. No numerical 1.5-year result is printed in this supplied solution.'''))
add(P3,1,('q1','Question 1: LIBOR and SONIA',r'''LIBOR has been replaced in sterling markets by SONIA.

a) Explain briefly why LIBOR was phased out.

b) Explain how SONIA differs from LIBOR in terms of the maturity of the underlying borrowing; the data used to calculate the rate; and the amount of bank credit risk included in the rate.

c) Why might replacing LIBOR with SONIA change the value of an existing interest-rate derivative?

**Provenance:** this is the supplied historical question, not a current-market update. No official seminar-3 solution was supplied.'''),('q2','Question 2: compounding conventions',r'''A bank quotes an annual interest rate of 10% with semiannual compounding.

a) What is the interest rate for each six-month period?

b) Calculate the effective annual rate.

c) Calculate the equivalent continuously compounded annual rate using

$$r=m\ln\left(1+\frac{R_m}{m}\right).$$

d) Explain why quoted, effective annual and continuously compounded rates differ numerically even though they represent the same investment return.

No official seminar-3 solution was supplied.'''))
add(P3,2,('q3','Question 3: cash-flow table and bond pricing',r'''A two-year bond has face value $100 and a 6% annual coupon paid semiannually. Each coupon is $3. Continuously compounded zero rates are:

| Time $t_i$ | Cash flow $C_i$ | Zero rate $R(t_i)$ |
|---|---|---|
| 0.5 | $3 | 5.0% |
| 1.0 | $3 | 5.8% |
| 1.5 | $3 | 6.4% |
| 2.0 | $103 | 6.8% |

a) Explain why the final cash flow is $103.

b) Calculate each present value using $PV(C_i)=C_i e^{-R(t_i)t_i}$.

c) Calculate the bond price.

d) Explain why a different zero rate is used for each cash flow.

No official seminar-3 solution was supplied.'''),('q4','Question 4: forward rate and equivalent strategies',r'''Continuously compounded zero rates are 3% for one year and 4% for two years.

a) Calculate the one-year forward rate between Year 1 and Year 2 using

$$R_F(1,2)=\frac{R(2)\times2-R(1)\times1}{2-1}.$$

b) Show that two strategies produce the same value at the end of Year 2:

(i) investing for two years at the two-year zero rate;

(ii) investing for one year at the one-year zero rate and then another year at the forward rate.

c) Is the forward rate necessarily the one-year market rate observed in one year’s time? Explain briefly.

No official seminar-3 solution was supplied.'''))
add(P3,3,('q5','Question 5: FRA settlement',r'''A forward rate agreement covers a six-month interest period beginning in one year. Notional principal is $1,000,000 and the agreed FRA fixed rate is 5%. At the beginning of the period the market reference rate is 6%. Assume year fraction $\delta=0.5$. Consider the party that **receives fixed and pays floating**.

a) Calculate the end-of-period FRA cash flow using $L(R_K-R_M)\delta$.

b) State whether this party makes or receives payment.

c) If settlement is at the beginning of the period, calculate the amount actually paid using

$$\frac{L(R_K-R_M)\delta}{1+R_M\delta}.$$

d) Explain why beginning-of-period settlement is smaller in absolute value.

No official seminar-3 solution was supplied.'''),('q6','Question 6: duration and convexity',r'''A bond has price $100, duration 4.2 and convexity 22. Its yield increases by 10 basis points.

a) Express the change in yield, $\Delta y$, in decimal form.

b) Estimate the percentage bond-price change using duration:

$$\frac{\Delta B}{B}\approx-D\Delta y.$$

c) Improve the estimate with duration and convexity:

$$\frac{\Delta B}{B}\approx-D\Delta y+\frac12 C(\Delta y)^2.$$

d) Explain why a yield increase causes price to fall.

e) Explain briefly why matching asset and liability duration does not eliminate every type of risk.

No official seminar-3 solution was supplied.'''))
add(P3,4,('q7','Question 7: daily futures settlement',r'''Enter a long index-futures position at initial futures price 5,000, with multiplier GBP 10 per index point.

| Day | Futures price |
|---|---|
| 0 | 5,000 |
| 1 | 5,050 |
| 2 | 4,980 |

a) Calculate Day 1 gain or loss.

b) Calculate Day 2 gain or loss.

c) Calculate cumulative profit or loss at the end of Day 2.

d) Explain how daily settlement changes cash-flow timing relative to a forward contract.

No official seminar-3 solution was supplied.'''),('q8','Question 8: forward price and arbitrage',r'''A non-dividend-paying share is currently GBP 100. The continuously compounded risk-free rate is 5% per annum and a forward matures in nine months.

a) Calculate the theoretical forward price using $F_0=S_0e^{rT}$.

b) If the market forward price is GBP 106, compare it with the theoretical price.

c) Does an arbitrage opportunity exist? If so, should the arbitrageur buy or sell the forward?

d) Describe the other transactions required and calculate arbitrage profit at maturity.

No official seminar-3 solution was supplied.'''))

MANIFEST=json.loads((ROOT/'study/sources/manifest.json').read_text())
def sha(p):return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
ISSUES={
(P2,2,'q7'):('annual-semiannual-conflict','Problem Q7 explicitly says annual coupon payments, while the supplied solution uses semiannual coupons and continuously compounded zero rates. Fractional-maturity annual coupon scheduling and zero-rate quotation are unspecified in the question.'),
(S2,1,'q1-credit-risk'):('option-default-contradiction','The same page acknowledges OTC option-writer default in Settlement but says option buyers face no default risk beyond premium in Credit risk. Preserve both and distinguish underlying-market loss from counterparty default.'),
(S2,5,'q6-par'):('par-yield-average-qualification','The printed description of par yield as an average of spot rates weighted by cash flows is not a generally exact simple arithmetic-average rule; par yield is defined by the full discount-factor pricing equation.'),
(S2,5,'q7'):('coupon-conflict','The solution changes the question annual-coupon assumption to semiannual and explicitly chooses continuous zero rates. Treat its numerical answers as conditional, not uniquely implied by the question.'),
(S2,6,'q7-one-year'):('rounding-equalities','The source displays equalities involving rounded 0.0609 and 0.95718. They are approximations; use exact half-year discount factor 0.97 for verification.'),
}
allids=set();report=[]
for s in [P1,S1,P2,S2,P3]:
 source=MANIFEST['sources'][s];assert source['exposure']['agent']=='allow';assert sha(source['originalPath'])==source['sha256']
 draft={'schemaVersion':1,'sourceId':s,'sourceHash':source['sha256'],'author':'g005-practice-source-author','pages':[]}
 for p in range(1,source['pageCount']+1):
  num=f'{p:03}';np=f'study/sources/annotated/{s}/page-{num}.md';rp=f'study/sources/extracted/{s}/page-{num}.md';ip=f'study/sources/assets/{s}/page-{num}.png'
  pieces=[f'# {s}: physical page {p}\n\nNormalized source transcription, **needs independent review**. Supplied questions and supplied solutions remain distinct from authored teaching. Physical and printed page numbers coincide here.\n']
  units=[];issues=[]
  titleid=f'{s}-p{num}-page-label'
  pieces.append(f'<a id="{titleid}"></a>\n\n## Source page label\n\nES32079 Financial Derivatives; Problem Set {s.split("-")[1]}'+(' Solutions' if 'solutions' in s else '')+f'; printed page {p}.\n')
  units.append({'id':titleid,'sourceId':s,'locator':{'pdfPage':p,'region':'page title, printed page label and layout furniture'},'extractionRef':{'kind':'markdown','path':np,'anchor':titleid},'contentHash':None,'status':'needs-review','classification':'administrative','issueIds':[]})
  for slug,title,content in DATA[(s,p)]:
   uid=f'{s}-p{num}-{slug}';assert uid not in allids;allids.add(uid)
   ids=[]
   if (s,p,slug) in ISSUES:
    suffix,reason=ISSUES[(s,p,slug)];iid=f'{s}-p{num}-{suffix}';ids=[iid];issues.append({'id':iid,'scopeRef':{'kind':'source','unitId':uid},'reason':reason,'status':'open','resolutionRef':{'kind':'markdown','path':np,'anchor':uid}})
   pieces.append(f'<a id="{uid}"></a>\n\n## {title}\n\n**Physical page {p}; source region: {title}.**\n\n![Original full uncropped physical page {p}](../../assets/{s}/page-{num}.png)\n\n[Preserved raw extraction](../../extracted/{s}/page-{num}.md#page-{p})\n\n{content.strip()}\n')
   units.append({'id':uid,'sourceId':s,'locator':{'pdfPage':p,'region':title},'extractionRef':{'kind':'markdown','path':np,'anchor':uid},'contentHash':None,'status':'needs-review','classification':'substantive','issueIds':ids})
  out=ROOT/np;out.parent.mkdir(parents=True,exist_ok=True);out.write_text('\n'.join(pieces),encoding='utf-8');nh=sha(np)
  for u in units:u['contentHash']=nh
  draft['pages'].append({'pdfPage':p,'rawPath':rp,'rawHash':sha(rp),'imagePath':ip,'imageHash':sha(ip),'normalizedPath':np,'normalizedHash':nh,'units':units,'issues':issues,'observations':['Author viewed this exact production full-page PNG through view_image, all physical pages, not sampled contact sheets. Image bytes are SHA-256 bound below.','Full raw layout extraction and original page image are retained separately. Normalized prose removes line-wrap hyphenation and typography artifacts; meaningful formulas, table cells and prompts are transcribed from images. No source answers are fabricated.','Every substantive anchored span contains its own image, physical locator and raw link. Source caveats remain inside affected spans. All units stay needs-review; author identity is audit evidence, not reviewer authentication.']})
 out=ROOT/f'study/sources/qa-drafts/{s}.json';out.write_text(json.dumps(draft,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
 report.append({'sourceId':s,'pages':source['pageCount'],'units':sum(len(p['units']) for p in draft['pages']),'substantive':sum(u['classification']=='substantive' for p in draft['pages'] for u in p['units']),'draftHash':sha(str(out.relative_to(ROOT)))})
(ROOT/'study/sources/qa-drafts/practice-author-counts.json').write_text(json.dumps({'sources':report,'pages':sum(r['pages'] for r in report),'units':sum(r['units'] for r in report)},indent=2)+'\n')
print(json.dumps(report,indent=2))
