# seminar-2-solutions: physical page 5

Normalized source transcription, **needs independent review**. Supplied questions and supplied solutions remain distinct from authored teaching. Physical and printed page numbers coincide here.

<a id="seminar-2-solutions-p005-page-label"></a>

## Source page label

ES32079 Financial Derivatives; Problem Set 2 Solutions; printed page 5.

<a id="seminar-2-solutions-p005-q6-spot"></a>

## Supplied solution: spot rate

**Physical page 5; source region: Supplied solution: spot rate.**

![Original full uncropped physical page 5](../../assets/seminar-2-solutions/page-005.png)

[Preserved raw extraction](../../extracted/seminar-2-solutions/page-005.md#page-5)

The interest rate agreed today for a zero-coupon investment that starts today and matures at a specified future date. It is the annualized return on a risk-free bond paying a single amount at maturity, also called the zero rate or zero-coupon rate for that maturity.

<a id="seminar-2-solutions-p005-q6-forward"></a>

## Supplied solution: forward rate

**Physical page 5; source region: Supplied solution: forward rate.**

![Original full uncropped physical page 5](../../assets/seminar-2-solutions/page-005.png)

[Preserved raw extraction](../../extracted/seminar-2-solutions/page-005.md#page-5)

The implied future interest rate between two future dates, derived from spot rates. It is implied by today’s zero curve under no-arbitrage, not necessarily a prediction of the future market rate.

<a id="seminar-2-solutions-p005-q6-par"></a>

## Supplied solution: par yield — source qualification

**Physical page 5; source region: Supplied solution: par yield — source qualification.**

![Original full uncropped physical page 5](../../assets/seminar-2-solutions/page-005.png)

[Preserved raw extraction](../../extracted/seminar-2-solutions/page-005.md#page-5)

The source defines par yield as the coupon rate at which a bond trades exactly at par value (price = face value), and states: “It represents an average of spot rates weighted by the bond’s cash flows.”

**Qualification:** preserve that description as source wording, not a generally exact arithmetic-average formula. Par yield is obtained by equating the discounted coupon and principal cash flows to par with the specified payment schedule and rate conventions.

<a id="seminar-2-solutions-p005-q6-zero-and-comparison"></a>

## Supplied solution: zero-coupon rate and interpretation

**Physical page 5; source region: Supplied solution: zero-coupon rate and interpretation.**

![Original full uncropped physical page 5](../../assets/seminar-2-solutions/page-005.png)

[Preserved raw extraction](../../extracted/seminar-2-solutions/page-005.md#page-5)

Zero-coupon rate is the return on a zero-coupon (discount) bond paying a single lump sum at maturity; it is synonymous with the spot rate for that maturity.

Spot (zero) rates apply from today to a given maturity; forward rates to periods between future dates; par yields are coupon rates consistent with current spot rates for a bond priced at par.

<a id="seminar-2-solutions-p005-q7"></a>

## Question 7: supplied solution version

**Physical page 5; source region: Question 7: supplied solution version.**

![Original full uncropped physical page 5](../../assets/seminar-2-solutions/page-005.png)

[Preserved raw extraction](../../extracted/seminar-2-solutions/page-005.md#page-5)

Treasury data:

| Maturity (years) | Coupon rate (annual) | Price per 100 par |
|---|---|---|
| 0.5 | 0% | 97.00 |
| 1.0 | 6% | 101.50 |
| 1.5 | 8% | 104.00 |

The source prints “Assume semiannually coupon payments.” Compute the 0.5-year zero rate; use that to estimate the 1-year zero rate; explain the next step to extend the curve.

**Source conflict:** the problem PDF physical page 2 instead says annual coupon payments. The solution below adopts semiannual coupons and continuously compounded zero rates; it is conditional on those conventions, not a unique solution of the annual-coupon wording.

<a id="seminar-2-solutions-p005-q7-discount-factor"></a>

## Supplied solution: discount-factor convention

**Physical page 5; source region: Supplied solution: discount-factor convention.**

![Original full uncropped physical page 5](../../assets/seminar-2-solutions/page-005.png)

[Preserved raw extraction](../../extracted/seminar-2-solutions/page-005.md#page-5)

Assume coupons are paid semiannually and zero rates are continuously compounded. Let $P(0,T)$ denote the discount factor to maturity $T$:

$$P(0,T)=e^{-R(T)T}.$$

**Source conflict:** these are the solution’s explicit conventions; the separate problem says annual coupon payments.
