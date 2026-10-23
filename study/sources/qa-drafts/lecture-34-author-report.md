# Lecture 3–4 annotation author handoff

## Result and boundary

- Authored all **73 physical pages**: lecture 3 (41) and lecture 4 (32).
- Added **276 granular SourceUnit drafts**: 155 for lecture 3; 121 for lecture 4. Definitions, equations/derivations, worked examples, tables, questions, supplied answers and substantive conclusions have separately named anchors. Title/outline pages and recurring page furniture are explicitly administrative, not invented learning content.
- Every unit remains **`needs-review`**. These are faithful normalized-source drafts, not independently approved conversions or G006 tutorial lessons. No teaching coverage or mastery is claimed.
- Source prose, all displayed mathematical expressions and all tables are transcribed semantically. Normalized typography is labelled. Every page links its separate unchanged raw extraction and original full-page production image. Each of the 201 substantive anchored unit spans also contains its own inline original-page image, raw-extraction link and physical-page/region locator, so selecting only that span retains its evidence. No axes-based figure or cash-flow timeline occurs in these two lecture PDFs; mathematical display boxes and tables are retained as text/math rather than described as imaginary charts.

## Original-image inspection and byte bindings

The author actually displayed every original page image using `view_image` in explicit complete-page batches: lecture 3 physical pages 1–11, 12–23, 24–33, 34–41; lecture 4 physical pages 1–11, 12–22, 23–32. Lecture 3 inspection used existing frozen renders without modifying them. Lecture 4 inspection used temporary renders from the same hash-checked original PDF. The QA draft observations identify each viewed render and its SHA-256; this is **author inspection**, not an independent review.

The two `lecture-N.json` QA draft maps bind the actual production 120-dpi full-page image, production raw Markdown, normalized Markdown and original PDF hashes. Every SourceUnit's `contentHash` binds its **whole normalized page file**, while its `extractionRef` selects its unique unit anchor. Physical PDF page, printed page/slide label and region are distinct locator fields. The unnumbered title pages do not receive invented printed labels.

## Source issues preserved

- **Lecture 3 physical page 11:** original printed 10.15% continuous and 10.41% semiannual rates remain explicitly marked as printed source errors. A separate labelled correction computes continuous **9.894667007884882%**, nominal annual semiannual **10.14351489971605%**, and the distinct effective annual **10.400742136017955%**. The canonical-shaped issue remains open for independent mathematical review.
- **Lecture 3 physical page 16:** the original coupon/yield table and supplied below-par conclusion remain intact. A separate qualification explains that the par equality needs matched compounding/payment conventions. Its issue also remains open.
- The two purely authored correction/qualification anchors are issue-resolution Markdown references, **not additional original SourceUnits**. Essential labelled corrections are additionally repeated inside all three original page-11 substantive spans, and the compounding qualification inside both original page-16 substantive spans, before their next anchor; an isolated unit cannot lose its caution by omitting a sibling span. They therefore cannot inflate original-source teaching obligations.
- Source benchmark-policy statements on lecture 3 page 5 are preserved as the slide's dated statements, not newly verified policy facts. No external benchmark claim or market advice is added.
- The source's FRA year fraction and simple settlement denominator, zero-rate maturity matching, semiannual coupon timing, foreign-exchange quotation direction, no-income/income/yield distinctions and storage/convenience assumptions are explicitly retained. Questions without a printed answer receive no invented official solution.

## Author verification

[Author checks](lecture-34-author-checks.json) passed for all 73 pages: exact original/raw/image/normalized hashes; complete physical-page coverage; unique anchors; existing raw/image links; closed SourceUnit keys; correct physical locators; all states `needs-review`; resolvable open-issue correction anchors; per-span inline image/raw/locator retention in all 201 substantive units; and essential labelled page-11/page-16 caution retention inside each affected original unit. The page-11 correction was directly recomputed with Python's logarithm/exponential functions. The lecture-3 duration example's bond price, duration, convexity and 10/100/200-basis-point repricings were also recalculated and agree with the printed rounding.

These checks do not prove independent source fidelity, full-project validity, publication readiness or comprehensive teaching. The next gate is a **different verifier** viewing all 73 original pages and checking every bound semantic region/formula/table before approval and canonical import.

## Ownership

Only `study/sources/annotated/lecture-{3,4}/page-NNN.md` and the lecture-3/4 draft maps plus this author report/check result were written. Originals, frozen pilot files, raw production extraction/assets, canonical manifests/units/coverage, code/packages, independent QA review files, private sources and OMX/native goal state were not edited by this lane.

## Revised packaging handoff

This revision supersedes the initial author handoff. Root identified that publication selects individual anchored spans rather than the preceding page header. Evidence and essential source cautions now live within each affected served span as described above. Unit IDs/counts and all `needs-review` states are unchanged. Whole-page normalized hashes, all unit hashes and both QA draft maps were refreshed after the packaging fix; use only the latest bound bytes for independent review.
