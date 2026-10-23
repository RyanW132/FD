# Lectures 1–2 normalized-source author report

## Scope and result

- Created 67 normalized physical-page Markdown files under `study/sources/annotated/lecture-1/` (38) and `lecture-2/` (29).
- Created `lecture-1.json` and `lecture-2.json` in this directory: 262 exact-schema SourceUnits, comprising 184 substantive and 78 administrative units. Every unit remains **needs-review**; no independent approval, production conversion completion, teaching coverage or learner mastery is claimed.
- Definitions, formulas, derivation steps, worked-example inputs/calculations, tables, figures and source questions/answers have separately locatable anchors where their content requires it. Repeated physical call-option pages 33–35 are retained, not deduplicated away. Page titles/footers and genuinely administrative pages are explicit.
- Authored normalized typography/notation and labelled clarifications are distinct from unchanged raw text and original images. This is source preparation, not G006 tutorial authoring.

## Inspection and provenance

The author visually inspected every original physical page: lecture 1 pages 1–38, lecture 2 pages 1–29, using full-page Poppler 26.01.0 renders scaled to 1,200 pixels wide. These temporary inspection renders are not claimed byte- or pixel-identical to production 120-dpi PNGs. The sidecars separately bind the actual production full-page PNG, raw-page Markdown, normalized-page Markdown and original PDF hashes. Independent reviewers must inspect the bound production images and all semantic regions; where small labels need enlargement, consult the same hash-bound original at greater resolution.

No original, frozen pilot, canonical JSON, runtime, dependency, independent-review record or another author's production tree was edited by this lane. Restricted textbook content was not read or derived.

## Restored raster content and source caveats

- Lecture 1 page 17: both Graph A1 panels, historical turnover units, distinct FX left/right scales, tick labels, red/blue series/legend, survey-date interpolation and source footnotes are described. Visual endpoint descriptions are explicitly approximate, not invented data.
- Lecture 1 page 23: all bid/offer quotation cells are transcribed from the image; raw extraction omits them.
- Five issues remain **open**, awaiting independent disposition. Their resolution references point to transparent author caveats, not self-approved corrections: lecture 1 page 5's £ title versus $ scenario; page 24's printed dollar-prefixed multiplier versus sterling exposure; page 26 and both page-27 diagrams' Profit axes versus payoff text; lecture 2 page 7's actually printed London dollar quote versus USD/GBP conversion.
- Lecture 2 page 7's small source footnote visibly ends at “settlement”; no missing continuation or official answer is fabricated. Ratio denominator/sign scope and the source's intermediate rounding are preserved. Unspecified volatility sampling/currency units are not invented.

## Verification actually run

- In-memory integration of both draft maps into current canonical records passed `validateRecords`: zero structural errors. Readiness stayed false for accounting, conversion and teaching. The canonical files were not changed by this test.
- `resolveReference` resolved all **262** normalized explicit unit anchors.
- Fresh mechanical checks passed: **67** exhaustive page numbers; **262** unique anchors and exact-schema needs-review records; **201** raw/image/normalized SHA-256 bindings; **2** unchanged original PDF hashes; every normalized Markdown evidence link resolves to an existing file.
- Independent semantic review is the next gate. These mechanical checks do not prove faithful mathematics, source completeness or teaching readiness by themselves.

## Pre-QA anchored-span packaging revision

The initial handoff is superseded by the current normalized-file hashes in both draft maps. Every one of the 184 substantive units now contains the original full-page inline Markdown image **inside its own anchor span**, before the next explicit anchor. Publication/retrieval of an individual span therefore retains its visual evidence instead of depending on the page-level header. The same physical PNG is reused, not copied into new evidence files.

All substantive spans on the five caveat-bearing pages retain an explicit authored caveat/conditional interpretation within that span, including adjacent source questions that now show the same original image. No authored correction became a new original-source obligation. All 262 unit content hashes and affected page-map hashes were refreshed; all statuses remain needs-review. Original PDFs, raw extraction and production images were not changed.

## Independent-review correction pass: six bounded findings

The six request-changes findings in `../qa-reviews/lecture-12-findings.json` are addressed in four author-owned normalized pages: lecture 1 physical pages 27 and 37, and lecture 2 physical pages 7 and 24. Before editing, each page matched the independent finding's exact reviewed SHA-256. This pass read every affected normalized page and unchanged raw page, and visually inspected all four bound production PNGs.

- The call break-even question itself now retains the source convention of ignoring premium interest.
- The long-forward diagram span explicitly states zero initial value/no premium and no additional financing or transaction costs for payoff/profit equality.
- The isolated arbitrage-trade span retains every printed footnote idealisation, including the visible ending at “settlement”; $3 is a conditional gross difference, not net profit after costs.
- The target-beta formula and beta-neutral special-case spans independently retain the positive-short/negative-buy-magnitude convention. The latter explicitly distinguishes estimated systematic market exposure from all portfolio risk.
- The London-dollar caveat now concerns only the displayed GBP conversion, $3 spread and buy-New-York conclusion. It does not deny possible opposite-direction gross arbitrage under literal-USD/frictionless assumptions, and does not invent a corrected official solution.

Only the four normalized pages and their corresponding full-page/unit hashes in the two author drafts changed. All 262 draft units remain needs-review. No independent approval map or canonical record was changed. Unchanged raw text/images retain the printed source errors.

Mechanical verification passed for all 67 pages, 262 unique locatable unit anchors, 201 raw/image/normalized hash bindings, 184 substantive spans containing original image evidence, 385 resolvable Markdown evidence links, both original PDF hashes and all six isolated-span assertions. Exact new page/draft hashes and these counts are in `lecture-12-correction-checks.json`. These author checks do not substitute for independent semantic re-review.

The initial entry/findings evidence was 14,113 UTF-8 bytes. Before reading the required 23,472-byte privacy/source/editing/curriculum contract group, this pass explicitly declared continuation. Affected page/raw/image evidence was then retrieved in identified continuation batches. No restricted textbook content was opened.
