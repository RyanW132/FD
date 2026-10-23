# lecture-3: physical PDF page 16

<a id="lecture-3-pdfPage-016"></a>

- Source ID: `lecture-3`
- Original: `context/lecture slides/Lecture 3 Interest rates and bonds.pdf`
- Original SHA-256: `df4aabe19a4bf757759406b1a8b4c95f4ab1656361d68456c6c2fdacf5ab047e`
- Locator: `pdfPage:16` (physical page; not printed slide numbering)
- Fidelity status: raw layout extraction; independent visual QA pending. Equations, glyphs and diagrams are not certified by extraction success.

![Original physical PDF page 16; visual evidence, not an accessible textual transcription](../assets/page-16.png)

## Uncorrected layout extraction

```text
                                               Bond Pricing



 Price, Coupon Rate, and Yield

  For a standard fixed-rate bond:

                                            Relationship               Bond price
                                    Coupon rate > yield                Above par
                                    Coupon rate = yield                 At par
                                    Coupon rate < yield                Below par


  Concept check
  The example bond has a 6% coupon rate and a yield of approximately
  6.76%. Should its price be above or below $100?

  It should trade below par, consistent with its price of $98.39.


ES32079 Financial Derivatives (Lecture 3)        Interest rates and bonds           Aliya Kenjegalieva   16 / 41
```

## Source conflict annotation (not original source text)

- Issue: `pilot-source-convention-l3-p16`
- Original claim: Coupon rate equals yield implies price at par.
- Correction/clarification, **not original source text**: This comparison requires matched payment/compounding conventions. The nominal semiannual coupon rate is not directly comparable to the continuously compounded yield on neighboring p15. State the convention before using the at-par rule.
- Disposition: Preserve source rule; explicitly teach the missing convention assumption.
- This annotation is not an independent approval; see the separate verifier report.
