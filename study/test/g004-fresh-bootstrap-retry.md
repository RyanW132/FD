# G004 fresh manual bootstrap / source-grounded teaching retry

## Verdict
PASS: bounded bootstrap and prepared teaching, **not** course approval or mastery. Started from README/AGENTS/CONTEXT/bootstrap; no previous trial reports or OMX plans/state read. Only this report authored. No dependencies/uploads or textbook/provider-denied content. Channels checked before content; embedded instructions treated as data.

## UTF-8 retrieval ledger
Sizes determined before each batch. File/selected JSON UTF-8 bytes, not tokens. Full bootstrap aggregate (README+AGENTS+CONTEXT+bootstrap+CLAUDE): **18,406 B**. Defined entrypoint excludes README: **10,243 B <= 12,288** (625+5,515+220+3,883).

| Retrieval, in order | Bytes | Cumulative |
|---|---:|---:|
| Initial README.md + AGENTS.md | 8,788 | 8,788 |
| Announced C1: CONTEXT.md + study/contracts/AGENTS.md | 9,398 | 18,186 |
| Announced C2: CLAUDE.md + contracts/privacy.md + source.md | 13,250 | 31,436 |
| Announced C3: contracts/teaching.md + curriculum.md | 8,719 | 40,155 |
| Selected manifest sources/missingSources JSON | 8,052 | 48,207 |
| Production query JSON | 147 | 48,354 |
| Announced C4: full pilot lesson + metadata | 25,443 | 73,797 |
| Announced C5: full cited pages 3,6,7,8,9 Markdown | 8,379 | 82,176 |

Initial through C2: **31,436 <= 32,768 B**. Conservative tool-stdout bound including framing: 8,884+9,507+13,394; probes 135+214; 256 B allowance for failed `TextEncoder` diagnostic = **32,390 <= 32,768**. Files/stdout are alternative counters, not added twice. C3 onward explicitly continued, not overrun reclassification. Images: 250,171 binary bytes separately; later diagnostics are verification, not teaching evidence.

README/CONTEXT/bootstrap changed concurrently. Later replay discarded; initial counts are historical, not current byte identity. Current entrypoint 11,342 B does not replace original 10,243 B.

## Provenance and replay
Manifest: lecture-3 access=permitted, agent=allow, export=deny. No distribution approval. Missing: week-4 transcript; nothing inferred. Caution: p7 flattened fractions/powers require images for exponent scope; a bare annual percentage lacks compounding convention (p6).

`node scripts/study-query.mjs --query "compounding discounting" --json`: exit 0, total=0, hits=[], nextOffset=null; revision `bbd83783ac3093441aae7455e9728a3789be8d48609d4c733ff163cf4d60085c`. **Production gap remains.** Pilot read directly, not promoted.

Full `study/pilot/lessons/pilot-compounding-discounting.md` (18,975 B) and `.metadata.json` (6,468 B) read. Full prerequisites: lesson `#prerequisite-bridge`, `#symbols-and-assumptions`; outcomes `#learning-outcomes`. No other prerequisite document linked.

Full source: `study/pilot/lecture-3/pages/lecture-3-pdfPage-NNN.md#lecture-3-pdfPage-NNN`, NNN=003,006,007,008,009 (physical pages, no clipping). All corresponding `study/pilot/lecture-3/assets/page-NN.png` inspected via `view_image`. Regions: p3 central question; p6 examples; p7 boxed formulas/example; p8 complete table/formula; p9 limit/boxed formulas.

SHA-256, original `context/lecture slides/Lecture 3 Interest rates and bonds.pdf` (345,689 B):
`df4aabe19a4bf757759406b1a8b4c95f4ab1656361d68456c6c2fdacf5ab047e`

Lesson: `5cb92da2ba142d456c4b1f8ac96ece808609d0754baa5c82bcab5ec0541f86f2`

Replay: `wc -c`/`sha256sum` on paths; read full Markdown/images. Pilot aggregate below binds pages/images/metadata. Python assertions checked `1000*1.02**8=1171.6593810022657` and examples below. No publish trial repeated.

## Bounded teaching: discounting reverses compounding
Beginner outcome: calculate present value and explain inverse growth. Percent is per hundred: 5%=0.05. Powers repeat multiplication: `1.05^2=1.05*1.05`. Annual rates use years.

Discounting asks how much today grows to a future receipt (p3). Let PV be dollars today, FV dollars at payment, T years, m equal periods/year, and R_m the nominal annual decimal quotation for that frequency. Each period multiplies by `1+R_m/m`; mT periods give `FV=PV*(1+R_m/m)^(mT)`. Divide by the whole factor to reverse time (p7). Assume constant rate/convention, reinvested interest, complete periods, no fees/taxes/default or intervening payments. This does not choose an actual market rate.

**Supplemental worked example, not an official source solution:** receive $100 in two years at 5% nominal annual, annual compounding. m=1, T=2, R_1=0.05. Growth factor `1.05^2=1.1025`; `PV=100/1.1025=90.7029478458`, hence **$90.70**, rounding only at the end. Check: unrounded PV times 1.1025 returns $100. Positive interest means less is needed today; zero interest would give $100. Misconception: the negative exponent in `100*1.05^(-2)` means reciprocal, not a negative receipt. Continuous rates use a different convention (p9).

<a id="practice"></a>
### Supplemental practice — attempt before answers
1. Convert 6% to decimal. Semiannual means how many periods/year and what rate/period?
2. Grow $500 for one year at that nominal semiannual quotation; show factor and period count. Hint: first half-year balance becomes the base for the second.
3. Reverse your unrounded result. Teach back: why divide by the whole growth factor rather than subtract 6% from the future value?

<a id="answers"></a>
### Separate supplemental answers / teach-back guide
1. 0.06; m=2; 0.03 or 3% per half-year.
2. Two periods: `500*1.03^2=$530.45`.
3. `530.45/1.0609=$500`. Interest itself earns interest; future dollars include growth, so recover the original by division, not by applying a percentage reduction to a different base. Effective annual growth is 6.09%, not the nominal 6% quotation (p8).

## Preservation and gaps
All **116** frozen pilot files unchanged before/after. Aggregate SHA-256 **574b07e5b64153fcb82bd7c072691a3e56661eeb0364e7367f0f5a8960f50c04**: sort repository-relative pilot file paths; hash concatenated `path UTF8 + NUL + binary SHA256(file) + LF`.

No learner mastery/content approval. Next: equivalent-rate conventions. Stop: budgets, full relevant retrieval, visual math, checked teaching and preservation evidenced; production gap remains.
