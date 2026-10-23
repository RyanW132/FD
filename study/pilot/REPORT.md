# G001 technical extraction pilot — provisional

## Outcome and boundaries

All **13 original sources** are hash/byte-accounted in `inventory.json`. Full lecture 3 (41 physical pages), full seminar 2 problems (2 pages), and one expressly approved figure page (lecture 1 physical page 26) are extracted: **44 page records and 44 PNGs**. This is an exploratory artifact set, not the G2 production schema, publication output, independently verified transcription, or teaching-completeness claim. Original sources and BAYES were not modified. No textbook content or assets were extracted.

Inventory has parser-verified PDF counts: lectures 38/29/41/32, seminar PDFs 7/2/7/2/4, textbook 881; all ten PDFs unencrypted. Transcript counts are 1705/1603/1659 physical text lines. Week numbers are not asserted to identify lecture topics. Week-4 transcript, seminar-3 solutions and syllabus are recorded as missing companions, not fabricated files.

## Locations and reproducibility

Run from repository root, in order:

```sh
python3 study/pilot/build-pilot.py
python3 study/pilot/inspect-accounting.py
python3 study/pilot/build-figure-sample.py
python3 study/pilot/apply-source-annotations.py
```

- `lecture-3/extracted-layout.txt` and `seminar-2-problems/extracted-layout.txt`: complete UTF-8 `pdftotext -layout` output, form-feed page breaks retained.
- `<source>/pages/<stable-source-id>-pdfPage-NNN.md`: complete raw per-page text, physical PDF locator, original relative path/SHA-256, stable HTML anchor and linked PNG.
- `<source>/assets/page-*.png`: fullpage 120-dpi visual evidence (lecture 3 approximately 605×454; seminar approximately 1020×1320).
- `figure-sample/lecture-1-pdfPage-026.{md,png}`: one graph-bearing page, not full lecture-1 conversion; separate raw text/command log.
- `page-accounting.json`: every artifact reference and SHA-256; pending independent review explicitly recorded.
- `substantive-regions.json`: provisional content features/whole-page topic candidates and seminar question IDs. These are author-side discovery notes, not final granular coverage or independent review.
- `commands.json`, `figure-sample/commands.json`: exact extraction/render commands, tool version stderr/stdout and exit statuses. Poppler tools report version 26.01.0; all logged commands exited 0.
- `checks.json`: original-hash preservation, counts, asset existence and page-ID uniqueness.

The original source manifest is the preflight baseline. IDs use explicit course identities, not mutable titles or directory iteration order. Counts and asset paths are checked; extraction success alone never sets visual QA to passed. Re-running base scripts resets their provisional QA, so later independent reviews should be stored separately and bound to exact artifact hashes, not folded into these writer-authored records.

## Extraction findings and unresolved risks

1. Mathematical text needs visual reconciliation. Lecture-3 p7, for example, has split fraction/exponent reading order and nonprinting U+0012/U+0013 font-mapped delimiters in layout output. The original PNG clearly retains the formula. We retain raw text unchanged rather than silently reconstructing or correcting formulas. Summation signs, superscripts, subscripts, Greek symbols and limit notation on other pages also need review.
2. Tables (including lecture-3 pp8/14/16/20/24/27/35/37 and seminar-2 p2) are preserved as spaced text plus original images, not yet as accessible semantic Markdown tables. No structural table-quality claim is made.
3. Seminar bullet glyphs extract as U+0088 rather than normal bullets. Raw text retains these source-extraction artifacts; readable teaching should normalize with explicit source linkage later.
4. Seminar-2 question 7 says annual coupon payments while containing fractional maturities. Teaching/solutions must state the cashflow convention explicitly and must not silently import lecture-3 semiannual assumptions. No answers have been generated here.
5. Lecture-3 text contains no clearly identified plotted figure, so the leader approved exactly one additional graph page. Read-only text inspection selected lecture-1 p26 after lecture-4 inspection did not identify a clear plotted diagram. The image preserves axes, line, strike marker and surrounding explanation; layout text cannot encode that geometry. **The original graph's vertical axis says “Profit” while surrounding slide text/formula say payoff.** Preserve this source discrepancy and explicitly explain it in later teaching rather than silently relabel the original; independent reviewer must assess.
6. Diagram image descriptions currently identify the evidence, not a complete accessible graph interpretation. Visually preserved images are not equivalent to accurate agent-readable figure reconstruction.
7. The builder inspected sample images to diagnose extraction, but **independent visual QA remains pending for all 44 pages**. No independent completeness or lesson-quality approval is supplied by this implementation lane.

8. Independent visual QA reported a source-origin numerical error on lecture-3 p11. The stated growth gives continuous rate about 9.894667% and semiannual nominal rate about 10.143515%, not the printed 10.15% and 10.41%. `source-issues.json` and the page Markdown label this correction as **not original source text**; uncorrected extraction and image remain untouched. The issue is separate from extraction fidelity.

## Exposure policy

Course originals supplied for this local study helper are recorded as allowing local browser and external subscription-agent teaching, with export/public distribution denied by default. These metadata decisions do not implement a sandbox. The textbook remains local-access-available but extraction deferred in this pilot, with browser/agent/export denied. Actual policy enforcement and privacy inheritance await G2/G3 contracts and tooling. Do not publish this pilot directory wholesale.

## Stop condition reached

The scoped extraction experiment has complete artifact/count/hash evidence and honest provisional issues. Final G001 acceptance still depends on separate independent visual review and a separately authored/reviewed beginner lesson. G2 must freeze production contracts and revalidate this pilot before any bulk conversion.

## Final implementation-lane validation

- Complete extraction/render rebuild before annotations: **98 owned artifacts byte-identical** (`determinism-result.json`); source-issue annotations intentionally change selected Markdown and are applied by the explicit final command above.
- After annotations: all **44 Markdown and 44 image hashes** match page accounting; all **13 original SHA-256 hashes** still match preflight.
- Reapplying annotations: **46 artifact byte-idempotence checks pass** (44 Markdown pages, accounting and issue registry).
- All four provisional Python files pass syntax compilation without generating cache artifacts.
- Independent reviewer owns `qa/visual-review.json`/`.md` and final visual verdict; the issue registry links reviewer issue IDs. Implementation-lane assertions do not replace those reviews.
- Math retrieval warnings require viewing the original image before teaching/transcribing math; the figure page includes an explicit axis/geometry description, and p16/Q7 convention warnings are visible beside the raw source.
