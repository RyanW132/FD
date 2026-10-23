# seminar-1-solutions: physical page 7

Normalized source transcription, **needs independent review**. Supplied questions and supplied solutions remain distinct from authored teaching. Physical and printed page numbers coincide here.

<a id="seminar-1-solutions-p007-page-label"></a>

## Source page label

ES32079 Financial Derivatives; Problem Set 1 Solutions; printed page 7.

<a id="seminar-1-solutions-p007-q6"></a>

## Question 6

**Physical page 7; source region: Question 6.**

![Original full uncropped physical page 7](../../assets/seminar-1-solutions/page-007.png)

[Preserved raw extraction](../../extracted/seminar-1-solutions/page-007.md#page-7)

Historical regression of $\Delta S$ on $\Delta F$ gives slope $h^*=0.8$. If the airline’s fuel exposure is 1,000,000 gallons and each futures contract = 42,000 gallons, how many contracts should it use?

Why might $h^*$ be less than 1? Can over-hedging ever make sense?

<a id="seminar-1-solutions-p007-q6-contract-count"></a>

## Supplied solution: optimal contracts

**Physical page 7; source region: Supplied solution: optimal contracts.**

![Original full uncropped physical page 7](../../assets/seminar-1-solutions/page-007.png)

[Preserved raw extraction](../../extracted/seminar-1-solutions/page-007.md#page-7)

The optimal number is

$$N^*=h^*\frac{Q_A}{Q_F},$$

where $Q_A$ is the exposure size and $Q_F$ is the quantity covered by one futures contract.

$$N^*=0.8\left(\frac{1{,}000{,}000}{42{,}000}\right)=19.05.$$

Contracts must be whole numbers, so the airline should use approximately **19 long crude-oil futures contracts**. The position is long because it will buy fuel and fears price increases.

<a id="seminar-1-solutions-p007-q6-ratio-overhedging"></a>

## Supplied solution: minimum variance versus speculation

**Physical page 7; source region: Supplied solution: minimum variance versus speculation.**

![Original full uncropped physical page 7](../../assets/seminar-1-solutions/page-007.png)

[Preserved raw extraction](../../extracted/seminar-1-solutions/page-007.md#page-7)

The minimum-variance hedge ratio is

$$h^*=\rho\frac{\sigma_S}{\sigma_F}.$$

Here $h^*=0.8$, so substantially more than 19 contracts moves away from the estimated minimum-variance hedge.

A hedge ratio greater than one can nevertheless be appropriate in another case: if the spot exposure is more volatile than the futures price and correlation is sufficiently high,

$$\rho\frac{\sigma_S}{\sigma_F}>1.$$

A futures position larger than the physical quantity can then minimise the variance of the hedged position and is not necessarily speculative. But taking a position larger than the estimated minimum-variance hedge because of a market forecast introduces additional risk and is speculation rather than pure hedging.
