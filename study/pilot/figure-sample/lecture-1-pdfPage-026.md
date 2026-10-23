# Lecture 1: long-forward payoff graph

<a id="lecture-1-pdfPage-026"></a>

- Source ID: `lecture-1`
- Original: `context/lecture slides/Lecture 1 Intro to Derivatives.pdf`
- Original SHA-256: `2e7ae0637756b62861377ecb0ff109aac9108ded318e40f1307751cb8e348498`
- Locator: `pdfPage:26`
- Scope: one selected diagram-bearing page, not full lecture conversion.
- Selection reason: lecture 3 has prose, equations and tables but no plotted diagram identified; this page explicitly contains a payoff graph.
- Fidelity: raw extraction and fullpage evidence; independent visual QA pending.

![Original page 26 with long-forward payoff graph; accessible reconstruction pending independent review](lecture-1-pdfPage-026.png)

## Uncorrected layout extraction

```text
                                                   Forwards



 The Long Forward Gains When ST > K


                                                                             Reading the graph
                                                                             The payoff is

                                                                                    Πlong
                                                                                     T    = ST − K .

                                                                             The line has slope +1: a £1
                                                                             increase in ST increases the
                                                                             payoff by £1 per unit.

  Prediction
  What should the short-forward payoff graph look like?



ES32079 Financial Derivatives (Lecture 1)   Introduction to financial derivatives       Aliya Kenjegalieva   26 / 38
```

## Source conflict annotation (not original source text)

- Issue: `pilot-source-conflict-l1-p26`
- Original claim: The graph vertical axis reads Profit, while title/context/formula describe the long-forward payoff ST-K.
- Correction/clarification, **not original source text**: Original graph description: vertical axis is labelled “Profit”; horizontal axis is “Price of Underlying at Maturity, S_T”. The straight line slopes upward +1, crosses the horizontal zero line at K, is negative to the left of K and positive to its right. The surrounding formula calls this payoff S_T-K. Preserve this terminology conflict. Profit equals payoff only under explicit zero-initial-value/no additional financing-cost assumptions; do not silently relabel the original axis.
- Disposition: Original axis and accompanying source language retained; conflict visible.
- This annotation is not an independent approval; see the separate verifier report.
