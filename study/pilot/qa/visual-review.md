# Independent exploratory pilot visual QA

## Verdict
PASS — visual preservation/extraction pilot only. All44pageimages actually viewed and compared with complete rawlayout text. No unresolved teaching-critical extraction region; **not** verified mathematical text, course conversion or complete teaching.

## Evidence
- Fresh `pdfinfo`: lecture3=41pages; seminar2problems=2pages; lecture1=38pages (onlyphysical26included).
- Fresh `pdftotext -layout -enc UTF-8` output matches both complete pilot extraction files byteforbyte.
-13originalsourceSHA256andbytes match immutablepreflight baseline; exact13source membership unchanged.
-44uniqueanchors/locators/image links and ledger hashes resolve/match. `mechanical-checks.json` records check outputs.
-Every image displayed using `tools.view_image`; perpage originalimage/Markdown hashes below in `visual-review.json` bind this actual human-visible-model review, not process success.

## Source issues and dispositions
- **PILOT-SOURCE-L3-P11** (SOURCE_ERROR_NOT_EXTRACTION_ERROR): CLOSED_FOR_EXTRACTION: preserved original, separately labelled arithmetic correction independently recomputed; printed answers prohibited as unqualified teaching.
- **PILOT-FIGURE-L1-P26** (RAW_TEXT_OMITS_GRAPH_AND_SOURCE_PAYOFF_PROFIT_LABEL_TENSION): CLOSED_FOR_EXTRACTION: full readable original plus verified axis/geometry description; original Profit label preserved; payoff equivalence assumption explicit.
- **PILOT-CONVENTION-L3-P16** (SOURCE_RATE_CONVENTION_ASSUMPTION): CLOSED_FOR_EXTRACTION: explicit matched convention annotation; future teaching must honor it.
- **PILOT-CONVENTION-S2-Q7** (SOURCE_SCHEDULE_AND_QUOTE_AMBIGUITY): CLOSED_FOR_EXTRACTION: prompt preserved, ambiguity labelled; not permission to invent a unique source answer.
- **PILOT-MATH-TEXT** (FLATTENED_EXPONENT_SUBSCRIPT_FRACTION_SUM): CLOSED_FOR_VISUAL_PRESERVATION: linked readable original images inspected perpage; raw extraction remains explicitly uncorrected and math retrieval warnings require originalimage before teaching; not text-fidelity certification.
- **PILOT-ACCESSIBILITY** (SEMANTIC_TABLE_AND_BULLET_ENCODING): G001 images/table values preserved; semantic accessible tables and U+0088bullet normalization not claimed; require frozen tooling/browser validation later.

ForL3p11the independent arithmetic is `log(5800/5000)/1.5 = 0.09894667007884882` (9.894667007884882%); equivalent nominal annual semiannual `2*expm1(r/2) = 0.10143514899716051` (10.14351489971605%). Effective annual `expm1(r)=0.10400742136017956` is a different convention. Raw source10.15%/10.41% is preserved, not endorsed.

## Perpage matrix
All rows: ACTUALLY VIEWED; unique locator/image/anchor PASS. `image` means image fidelity, **not** automatically faithful mathematical text.

|Page|Fidelity mode|Observed source/evidence comparison|
|---|---|---|
|lecture-1-pdfPage-026|original-image-and-added-diagram-description-verified;raw-text-omits-axes|Viewed graph: verticalaxisProfit; horizontalPriceofUnderlyingatMaturity,S_T; upwardstraightline+slope1crosseszeroatK; negativeleftK,positiverightK. No numeric ticks or legend to recover. Formula longforwardpayoff S_T-K and predictionprompt preserved; separate annotation accurately describes axes/geometry and explicit payoff/profit terminology condition.|
|lecture-3-pdfPage-001|prose-and-table-values-compared|Title, course ES32079, lecture3, lecturer and interest-rates/bonds title all present; no equation.|
|lecture-3-pdfPage-002|prose-and-table-values-compared|All eight outline entries and Hull chapter4 reference preserved; numbered topic list matches image.|
|lecture-3-pdfPage-003|prose-and-table-values-compared|Four rate-relevance bullets, dated-cashflow premise and central question present; no substantive omission.|
|lecture-3-pdfPage-004|prose-and-table-values-compared|Government/policy/repo/reference definitions and risk-free/collateral caveat present; description labels aligned to prose.|
|lecture-3-pdfPage-005|original-image-verified-not-math-text|SONIA/SOFR definitions, ceased-LIBOR statement, overnight-compounding sentence and generic R_M convention preserved. R_M subscript is visually available, not faithfully encoded in raw text.|
|lecture-3-pdfPage-006|original-image-verified-not-math-text|Annual110.00, semiannual110.25 and continuous110.52 example present. Semiannual square and exponential0.10 visually intact but raw text flattens exponent placement.|
|lecture-3-pdfPage-007|original-image-verified-not-math-text|FV exponent mT and PV exponent minus mT apply to entire parenthesis; R_m/m fraction and quarterly example exponent8 are legible in image. Text control-glyph/fraction layout not authoritative math.|
|lecture-3-pdfPage-008|original-image-verified-not-math-text;table-image-and-spaced-values-verified-not-semantic-table|Five-row annual-to-daily table values and frequencies match. Effective-rate formula parenthesis power m and minus1; 1.05 squared example legible only as mathematical image, not raw 1.052.|
|lecture-3-pdfPage-009|original-image-verified-not-math-text|Both limit expressions, powers m and mT, FV=Ae^(rT), PV=FV e^(-rT), and opposite sign-check exponents preserved in image; raw fraction/power scope flattened.|
|lecture-3-pdfPage-010|original-image-verified-not-math-text|Equivalent-rate exponential identity and both conversion formulas visible; example2ln(1.05)=.09758 preserved. Fractions R_m/m and r/m need original image.|
|lecture-3-pdfPage-011|original-image-verified-not-math-text|Stated5000-to5800 growth in18months and both printed answers preserved. Source itself contains numerical error:10.15% and10.41% are not the correct continuous/nominal-semiannual values. Separate labelled correction now present.|
|lecture-3-pdfPage-012|original-image-verified-not-math-text|Zero-rate definition, discount factor e^(-R(T)T), cashflow subscript T and +/- .05*5 exponential examples preserved; exact superscript scope requires image.|
|lecture-3-pdfPage-013|original-image-verified-not-math-text|Coupon/principal prose and complete cashflow summations i=1..n preserved visually; extraction renders summation sign as X and flattens C_i,t_i and exponential.|
|lecture-3-pdfPage-014|original-image-verified-not-math-text;table-image-and-spaced-values-verified-not-semantic-table|Table times.5,1,1.5,2; cashflows3,3,3,103; rates5,5.8,6.4,6.8 percent match. Four negative exponential terms and printed98.39 present; raw powers not trusted.|
|lecture-3-pdfPage-015|original-image-verified-not-math-text|Yield-definition sum, preceding-bond equation,6.76% approximation and single-IRR warning visible. Summation/powers flattened in text.|
|lecture-3-pdfPage-016|prose-and-table-values-compared;table-image-and-spaced-values-verified-not-semantic-table|All three above/at/below-par table rows and example check preserved; source assumption about matched rate conventions now separately labelled; do not compare nominal coupon to continuous yield unconverted.|
|lecture-3-pdfPage-017|original-image-verified-not-math-text|Par-yield definition, sum discountfactor A, d=P(0,T), Ac/m+100d=100 and c=100m(1-d)/A visually intact. Dollars-on100-face versus numerical percent definition preserved.|
|lecture-3-pdfPage-018|original-image-verified-not-math-text|Negative-exponent d and A sum, denominator3.70027, numerator100*2*(1-.87284),6.87 result/convention preserved; image verifies fraction scope.|
|lecture-3-pdfPage-019|prose-and-table-values-compared|All four bootstrap steps plus why-the-name explanation preserved; no formula omission.|
|lecture-3-pdfPage-020|prose-and-table-values-compared;table-image-and-spaced-values-verified-not-semantic-table|Five data rows and all maturity/year, annualcoupon/dollar and price/dollar headers preserved; zeros8/12coupon distinction and half-annual-coupon instruction visible.|
|lecture-3-pdfPage-021|original-image-verified-not-math-text|Zero-price exponential and log inverse, three maturities/prices and displayed10.127,10.469,10.536% preserved visually; fractions/log brackets flattened in text.|
|lecture-3-pdfPage-022|original-image-verified-not-math-text|Cashflows4,4,104 and times.5,1,1.5 match; full three-term equation, discountfactor.85196 and minuslog divided1.5 preserved visually.|
|lecture-3-pdfPage-023|original-image-verified-not-math-text|All four cashflows6,6,6,106 and exponential times preserved;10.808% answer and dependency question present. Raw superscripts not accepted as verified text.|
|lecture-3-pdfPage-024|prose-and-table-values-compared;table-image-and-spaced-values-verified-not-semantic-table|Five-row maturity/continuous-zero-rate table matches all values; interpolation choices/caveat retained.|
|lecture-3-pdfPage-025|original-image-verified-not-math-text|R1/R2 maturity order, accumulation identity, forward numerator R2T2-R1T1, denominator T2-T1 and discountfactor ratio P(0,T2)/P(0,T1) visibly intact; raw fractions not authoritative.|
|lecture-3-pdfPage-026|original-image-verified-not-math-text|3%one-year/4%two-year example,5%forward, both terminal accumulation routes and108.33 preserved; forecast-versus-implied-rate caveat retained.|
|lecture-3-pdfPage-027|original-image-verified-not-math-text;table-image-and-spaced-values-verified-not-semantic-table|All five rows, year1 dash and5.0/5.8/6.2/6.5 forward rates present; year4 fraction and year3 task intact. Table columns legible.|
|lecture-3-pdfPage-028|original-image-verified-not-math-text|Notional contract definition and all five bullets, timeT1/T2settlement and borrower/lender purpose retained; subscripts require image.|
|lecture-3-pdfPage-029|original-image-verified-not-math-text|L,R_K,R_M,delta definitions and fixed-minus-floating sign preserved. Full settlement denominator1+R_M*delta is visually unambiguous; raw layout alone not trusted.|
|lecture-3-pdfPage-030|original-image-verified-not-math-text|100million,4%,4.5%,.25 and negative125000 cashflow match; negative123609 settlement and denominator1+.045*.25 visible; lender-interpretation prose retained.|
|lecture-3-pdfPage-031|prose-and-table-values-compared|Both10millionGBP exposure questions and correct source payfixed/receivefloating versus receivefixed/payfloating answers preserved; no material omitted.|
|lecture-3-pdfPage-032|original-image-verified-not-math-text|Price-yield sum and derivative leading minus, t_i factor and strictnegative sign visible; prediction prompt retained. Raw summation rendered X.|
|lecture-3-pdfPage-033|original-image-verified-not-math-text|Duration1/B weighted sum, cashflow weight C_i e^(-yt_i)/B, sumweights=1 and D=sum t_i*w_i legible; both maturity comparison bullets preserved.|
|lecture-3-pdfPage-034|original-image-verified-not-math-text|dB/dy=-BD, relative approximation minusD*deltay, basispoint conversion.01%=.0001 and10bp=+.001not.1 preserved; raw fractions flattened.|
|lecture-3-pdfPage-035|original-image-verified-not-math-text;table-image-and-spaced-values-verified-not-semantic-table|Six cashflow rows and totalrow match, including105principalpluscoupon, presentvalue73.256 and finalweight2.333; totalprice94.213/duration2.653years present.|
|lecture-3-pdfPage-036|original-image-verified-not-math-text|Yieldchange+.001 and negative relative/absolute estimates retained; newprice93.963 and direct-repricing statement present. Fraction denominator B requires image.|
|lecture-3-pdfPage-037|prose-and-table-values-compared;table-image-and-spaced-values-verified-not-semantic-table|Three approximation-error rows and bp headers match image; ordinary-option-free convexity and small-change limitations retained.|
|lecture-3-pdfPage-038|original-image-verified-not-math-text|Convexity1/B second derivative and t_i squared sum preserved visually; secondorder correction has plus onehalf C(deltay)^2, not minus. Displayed7.570 present.|
|lecture-3-pdfPage-039|original-image-verified-not-math-text|100bp=.01 convention, negative duration term plus positive convexity term, priceestimate91.749 and duration-only91.714 present; squaredyieldchange requires image.|
|lecture-3-pdfPage-040|prose-and-table-values-compared|Parallel-shift limitation, changingduration/convexity, nonparallelcurve exposure and remainingcredit/liquidity/optionality/modelrisks all preserved.|
|lecture-3-pdfPage-041|prose-and-table-values-compared|Seven summary bullets and dated-cashflow unifying principle retained; no fullcoursecoverage conclusion inferred.|
|seminar-2-problems-pdfPage-001|prose-compared;original-image-preserved|Q1fourcomparisoncategories,Q2allthreehedgingprompts,Q3$50/6%continuous/6monthsand1year,Q4forwardversusexpectedspotquestionallpresent. Bullet glyph U+0088 is an extraction defect, not missing prose.|
|seminar-2-problems-pdfPage-002|prose-compared;original-image-preserved|Q5threequalitativeprompts with101.50price,3monthsdelivery,4monthsnextcoupon,6%coupon/5%continuousrate;Q6allfourdefinitions;Q7three-rowtable0.5/0%/97,1/6%/101.50,1.5/8%/104andannualcouponinstructionallmatch. Cashflow/zero-conventionambiguity explicitly annotated, no definitive solution accepted.|

## Gaps
Semantic accessible math/table transcription and production validation are future gates. This review proves readable image preservation plus prose/table-value comparison, not text-only mathematical accessibility. Original source ambiguities remain explicitly labelled and must not be presented as definite authoritative solutions.

## Risks
Provisional wholepage regions are not a complete substantive-unit teaching taxonomy. Bulk ingestion must await frozen tooling and revalidated pilot. Lesson rubric/answers require a separate independent report. Any edit to reviewed sourcepage/image bytes invalidates the affected row until reviewed again.
