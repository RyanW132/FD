# Provisional lesson author notes

Status: **awaiting independent review**. This directory contains one exploratory pilot lesson and proposed metadata, not the production curriculum or learner progress. No rubric score or reviewed readiness has been awarded by the author.

## Evidence and scope

- Lesson: `pilot-compounding-discounting.md`; proposed ID `pilot-compounding-discounting`.
- Evidence: Lecture 3 physical PDF pages **3, 6, 7, 8, 9**. Original source SHA-256: `df4aabe19a4bf757759406b1a8b4c95f4ab1656361d68456c6c2fdacf5ab047e`.
- The author inspected all five rendered PNGs before writing the relevant formulas/table. Author inspection is not independent source QA. The extraction's pending fidelity status was not changed.
- The quarter-compounding example, frequency-table balances and continuous formulas correspond to those original images. Arithmetic bridges, intermediate derivation steps, explicit model limitations, additional continuous-PV examples, exercises and answers are supplemental teaching and labelled in the lesson.
- The frequency table on page 8 does not repeat the rate in its heading; its surrounding 10% example and independently recomputed balances support the stated 10% nominal convention. This inference is disclosed in the lesson rather than silently attributing an absent heading to the image.
- Page 11 is **not used**. The ingestion verifier separately reported a numerical error there; this lesson neither quotes that solution nor resolves source-wide issues.

## Author checks (2026-10-21)

Python's standard-library arithmetic independently recomputed:

| Check | Unrounded expected value or displayed result |
|---|---:|
| Page 6 annual / semiannual / continuous | $110.00 / $110.25 / $110.52 |
| Page 7: 1,000 × 1.02⁸ | 1171.6593810022657 |
| Page 8: 10% nominal, frequencies 1/2/4/12/365 | $110.00 / $110.25 / $110.38 / $110.47 / $110.52 |
| Semiannual effective annual rate at 10% nominal | 0.1025 |
| Supplemental continuous PV, 1,000 exp(−0.05 × 2) | 904.8374180359596 |
| Supplemental comparison, 1,000 / 1.05² | 907.0294784580499 |
| Exercise 2, 200 × 1.03⁴ | 225.101762 |
| Exercise 3 effective annual rate | 0.0609 |
| Exercise 4, 500 exp(−0.04 × 0.5) | 490.09933665337763 |

Forward/reverse identities were checked with absolute tolerance 1e−10. Rate/time inputs for Exercise 1 were checked exactly; zero-rate and zero-time discount factors equal one. Binary floating-point representations may differ in the last displayed digit; currency answers round at the end to cents.

Local source/image links and explicit anchors were checked for resolution and uniqueness. Metadata outcome/exercise mappings are reciprocal; each exercise has a nonempty separate answer section. These are author structural/arithmetic checks, not an independent eight-dimension teaching or source-fidelity review.

## Remaining review and integration work

- Independent reviewer must assess all eight teaching-rubric dimensions, including formula/source fidelity, unit/convention precision and beginner pacing, against exact lesson/source bytes.
- Proposed IDs and metadata remain provisional until Goal 2's contracts and validators are frozen; revalidate this pilot then. No production coverage ledger, publishable snapshot or source-unit completeness claim is created here.
- This lesson motivates but does not formally prove the continuous limit. Calculus, equivalent-rate conversion, market rate selection and later lecture topics remain outside its scope.
- All supplemental answers are agent-authored practice, not official seminar solutions. No textbook content, transcript mapping or missing-source material is used.
