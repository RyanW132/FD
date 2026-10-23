# Lecture 2 — physical page 16: Deriving the Minimum-Variance Hedge Ratio

**Authored normalized source transcription — needs independent review.** Typography, line breaks, table structure and mathematical notation are normalized; this is not a word-for-word facsimile or a tutorial lesson. Source-label caveats and notation/assumption clarifications are explicitly labelled. The linked original image and unchanged raw extraction remain the evidence.

[Raw page extraction](../../extracted/lecture-2/page-016.md) · [Original full-page image](../../assets/lecture-2/page-016.png)

![Original lecture 2, physical page 16, full uncropped source page](../../assets/lecture-2/page-016.png)

<a id="lecture-2-p016-hedged-change"></a>

## Hedged change

**Source region:** upper value-change equation. **Classification:** substantive.

For a hedged exposure, write the change in value per unit as

$$\Delta V_H=\Delta S-h\Delta F.$$

$\Delta S$ is the spot-price change, $\Delta F$ the futures-price change, and $h$ the hedge ratio. The minus sign corresponds to subtracting the futures-price exposure in this representation.

![Original full-page evidence for lecture-2-p016-hedged-change; physical page 16](../../assets/lecture-2/page-016.png)

<a id="lecture-2-p016-hedged-variance"></a>

## Hedged variance

**Source region:** middle variance equation. **Classification:** substantive.

$$\operatorname{Var}(\Delta V_H)=\sigma_S^2+h^2\sigma_F^2-2h\rho\sigma_S\sigma_F.$$

The squares apply to $\sigma_S$, $h$, and $\sigma_F$ as displayed: the second term is $h^2\sigma_F^2$, and the covariance term has coefficient **−2h**. $\sigma_S,\sigma_F$ denote standard deviations of spot/futures **price changes** and $\rho$ their correlation (defined on physical page 17).

![Original full-page evidence for lecture-2-p016-hedged-variance; physical page 16](../../assets/lecture-2/page-016.png)

<a id="lecture-2-p016-variance-first-order-condition"></a>

## Variance first order condition

**Source region:** middle-lower partial-derivative equation. **Classification:** substantive.

Minimising with respect to $h$:

$$\frac{\partial\operatorname{Var}(\Delta V_H)}{\partial h}=2h\sigma_F^2-2\rho\sigma_S\sigma_F=0.$$

The derivative is of the **entire variance** with respect to $h$; the denominator is $\partial h$.

![Original full-page evidence for lecture-2-p016-variance-first-order-condition; physical page 16](../../assets/lecture-2/page-016.png)

<a id="lecture-2-p016-minimum-variance-ratio"></a>

## Minimum variance ratio

**Source region:** bottom boxed hedge-ratio result. **Classification:** substantive.

Therefore,

$$h^*=\rho\frac{\sigma_S}{\sigma_F}.$$

The full denominator is $\sigma_F$, not $\sigma_F^2$. **Notation/assumption clarification (author annotation):** this ratio requires nonzero futures-change standard deviation; the printed slide does not separately state that nondegeneracy condition. No extra second-derivative proof is invented as source content.

![Original full-page evidence for lecture-2-p016-minimum-variance-ratio; physical page 16](../../assets/lecture-2/page-016.png)

<a id="lecture-2-p016-page-frame"></a>

## Page frame

**Source region:** title/header/footer frame. **Classification:** administrative.

Page title: “Deriving the Minimum-Variance Hedge Ratio”. Printed footer: ES32079 Financial Derivatives (Lecture 2); Types of Traders and Hedging; Aliya Kenjegalieva; **16 / 29**. Physical PDF page 16 and printed counter agree. The footer is administrative source metadata, not a separate technical claim.

