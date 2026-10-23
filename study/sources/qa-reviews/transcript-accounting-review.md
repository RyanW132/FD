# Independent transcript accounting and mapping audit

## Verdict

**PARTIAL overall: PASS exact raw accounting; semantic conversion and exhaustive mapping NOT APPROVED.** All three permitted original transcripts were read completely, including blank lines, in nine explicit untruncated continuation batches. The 29 comparative normalized lecture pages listed in the JSON were read as complete files. No private textbook content was opened; no canonical source/status/association records were edited. This is not a lecture-image visual review or teaching review.

## Exact accounting evidence

Reproduce from repository root:

```sh
node --check study/sources/qa-reviews/verify-transcript-accounting.mjs
node study/sources/qa-reviews/verify-transcript-accounting.mjs --compare-report
```

The independent byte scanner does not import ingestion code. It proves original SHA/byte count against fixed expected identities, exact `original.txt` byte identity, every physical line and exact text in its unique sequential Markdown anchor, each canonical line locator/hash, pending coverage and absence of fabricated associations. Source-specific digests avoid unrelated lecture mutations. The JSON binds42 specific inputs (12 transcript files,29 comparative normalized pages and policy code); helper code hash is also recorded. Changed bound inputs require re-review, not automatic refresh of semantic findings.

| Source | Original bytes | Physical lines | Empty lines | CRLF / LF |
|---|---:|---:|---:|---:|
| transcript-week-1 | 71,639 | 1,705 | 852 | 1704 / 1 |
| transcript-week-2 | 64,239 | 1,603 | 801 | 1602 / 1 |
| transcript-week-3 | 69,111 | 1,659 | 829 | 1658 / 1 |

Total: **204,989 original bytes;4,967 physical lines;2,482 empty lines**. All actual originals have no UTF-8 BOM, no bare CR and no unterminated final line; each retains its terminating empty line. A separator terminates its physical line, not an invented extra record. Seven independent scanner fixtures additionally check empty input, final unterminated line, CRLF/LF/CR, trailing blank lines and BOM preservation. These fixtures are scanner checks, not proof that absent source features occur in this corpus. Raw original.txt preserves original separators byte-for-byte; Markdown normalizes presentation separators while preserving every line's text, including blanks. All 4,967 canonical line units remain `unknown` / `needs-review`; coverage remains pending and source conversion partial.

## Supported overlap, not verified mapping

Week numbers are not lecture identities. Detailed tentative ranges/page evidence are in `tentativeAssociations` in the JSON:

- **Week1:** lines1316–1438 match lecture 1 physical20/22 (£100asset,£105delivery,80/105/130payoffs). Lines1544–1698 match physical24–27 (GBP1million forward, maturitypayoff and slopes). Transcript ends in payoff diagram discussion, not completion of all38slides.
- **Week2:** lines106–242 resume lecture 1 payoffs/futures comparison (physical26–28); lines302–342 match margin example physical30; lines638–704 match physical37–38. **Line704 announces move tolecture2; line862 explicitly startslecture2.** Lines862–1178 match lecture 2 physical4/6/7/9 numerical examples; lines1320–1588 match physical13/14/16 basis/hedge ratio material. Thus week 2 crosses lecture files.
- **Week3:** line6 explicitly refers to lecture 1 and part of  lecture 2. Lines214–408 match lecture 2 physical17/20;710–738 matches physical25. **Lines1008–1016 announce completion/summary and start of third lecture, interest rates** (lecture 2 physical29 / lecture 3 physical1). Lines1160–1650 match lecture 3 physical6/8/11/12/14/15/16. No evidence here establishes coverage of lecture 3 remainder or lecture 4.

These are manually evidenced candidate overlaps, not exhaustive alignment or canonical verified associations. Repeated recap material and indistinct slide transitions prevent exact boundaries merely from page order. Canonical `transcriptAssociations` is empty, not falsely verified.

## Semantic risks requiring separate review

- **TR-01 — transcript-week-2 original lines332–340 / lecture-1 physical 30:** Same900threshold first yields no margin call, then yields call. Normalized slide says call if maintenance exceeds900. Do not resolve source/audio ambiguity by silent correction.
- **TR-02 — transcript-week-2 original lines902–1008 / lecture-2 physical 4,6:** Multiple damaged numbers/quantity/strike references:2.5vs22.5,200vs2000shares,300vs3000callprofit. Compare full table, not captions as checked numerical authority.
- **TR-03 — transcript-week-2 original lines1154–1198 / lecture-2 physical 9:** Caption discussion suggests losses above floor/no money lost below 26500. Slide totalvalue preserves35000 atspot 35; floor net premium is not profit netinitial 28000share cost. No unconditional no-loss claim.
- **TR-04 — transcript-week-2 original lines1294–1380 / lecture-2 physical 13,14:** Caption says basis normally/alwayspositive; same example47minus48 givesminus1. Slide convergence explicitly conditional on same underlying/delivery terms. Preserve contradiction, not universalpositivebasis.
- **TR-05 — transcript-week-3 original lines84–180 / lecture-2 physical 16,17:** Spot-change standard deviation appears0.033(line84),0.003(line168),0.03(line178); stated0.60 requires0.03 with rho 0.8 and futures 0.04. No recording supplied to resolve speech/caption origin.
- **TR-06 — transcript-week-3 original lines374–408 / lecture-2 physical 20:** Caption ratio0.728and7to8% conflicts with displayed0.928*(0.0263/0.0313)approximately0.780.37contracts alone does not validate every caption number; hedge ratio is not general percent risk eliminated.
- **TR-07 — transcript-week-3 original lines1298–1318 / lecture-3 physical 8:** Caption EAR5% for10%nominalsemiannual conflicts with1.05^2minus1=10.25%.
- **TR-08 — transcript-week-3 original lines1422–1438 / lecture-3 physical 11:** Caption10.5%/10.41% and printed10.15%/10.41% are not valid answers for5000 to 5800over 1.5 years. Distinct continuous9.894667%,nominalsemiannual10.143515%,effectiveannual10.400742%. Already-labelled source error must remain visible.
- **TR-09 — transcript-week-3 original lines1444–1488 / lecture-3 physical 12:** Caption describes deferred coupon payments and positive present-value exponent. Slide defines no intermediate payments and negative discount exponent. Raw retention cannot certify semanticaccuracy.
- **TR-10 — transcript-week-3 original lines1608–1648 / lecture-3 physical 14,15,16:** Caption price19.38/90.38 differs from98.39slide; coupon-vs-yieldparcomparison needs matched rate conventions. Preserve normalized authorqualification and source conflict.

Raw retention is faithful to the supplied captions, **not proof of faithful speech or correct mathematics**. No recording was supplied/inspected, so the audit cannot attribute conflicts to speech versus automatic transcription. Do not silently replace captions with inferred answers or use their unknown units as checked teaching evidence.

## Publication/readiness implication

Current `study/lib/policy.mjs` marks lineage unknown when a source unit is not verified **or** its classification is unknown, then rejects unknown dependencies. Together with freshly checked transcript statuses, this establishes why these4,967 units are omitted from verified defaultKB content projection; draft does not override this gate. This bounded audit did not run a new full repository end-to-end query or read private capture inputs. Accounting PASS does not mean semantic conversion PASS or teaching/mastery.

## Gaps and recommendation

No exhaustive unitmapping, semantic normalisation or independent every span promotion is supplied. Retain raw bytes and partial/unknown states. Separately track source-level open issues above; a future author may write labellednormalized spans with exactoriginal line ranges and slide evidence, then a genuinely different reviewer verifies each promoted span/association. No canonical promotion is authorized by this report. Missing companions remain missing, never invented.

**Bootstrap trial FAIL:** entry file bytes11,122 plus required contract group23,472 =34,594B before wrappers, above32,768B. Although sizes were computed first, continuation was not declared before that group was read. This violation was immediately reported and is not retrospectively relabelled or counted as passing agent bootstrap evidence. Later source continuations were explicit and complete.
