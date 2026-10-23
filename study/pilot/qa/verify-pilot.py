"""Independent bounded pilot checks; manual visual observations are explicitly data, not inferred by this script.
Only writes verifier-owned study/pilot/qa/ artifacts. Run from repository root.
"""
from pathlib import Path
import hashlib, json, math, re, struct, subprocess
from datetime import datetime, timezone
ROOT=Path.cwd(); QA=ROOT/'study/pilot/qa'
def digest(p): return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
def load(p): return json.loads((ROOT/p).read_text())
# Every observation below was made by /root/g001_pilot_visual_qa after actual view_image displays.
observations=[
'Title, course ES32079, lecture3, lecturer and interest-rates/bonds title all present; no equation.',
'All eight outline entries and Hull chapter4 reference preserved; numbered topic list matches image.',
'Four rate-relevance bullets, dated-cashflow premise and central question present; no substantive omission.',
'Government/policy/repo/reference definitions and risk-free/collateral caveat present; description labels aligned to prose.',
'SONIA/SOFR definitions, ceased-LIBOR statement, overnight-compounding sentence and generic R_M convention preserved. R_M subscript is visually available, not faithfully encoded in raw text.',
'Annual110.00, semiannual110.25 and continuous110.52 example present. Semiannual square and exponential0.10 visually intact but raw text flattens exponent placement.',
'FV exponent mT and PV exponent minus mT apply to entire parenthesis; R_m/m fraction and quarterly example exponent8 are legible in image. Text control-glyph/fraction layout not authoritative math.',
'Five-row annual-to-daily table values and frequencies match. Effective-rate formula parenthesis power m and minus1; 1.05 squared example legible only as mathematical image, not raw 1.052.',
'Both limit expressions, powers m and mT, FV=Ae^(rT), PV=FV e^(-rT), and opposite sign-check exponents preserved in image; raw fraction/power scope flattened.',
'Equivalent-rate exponential identity and both conversion formulas visible; example2ln(1.05)=.09758 preserved. Fractions R_m/m and r/m need original image.',
'Stated5000-to5800 growth in18months and both printed answers preserved. Source itself contains numerical error:10.15% and10.41% are not the correct continuous/nominal-semiannual values. Separate labelled correction now present.',
'Zero-rate definition, discount factor e^(-R(T)T), cashflow subscript T and +/- .05*5 exponential examples preserved; exact superscript scope requires image.',
'Coupon/principal prose and complete cashflow summations i=1..n preserved visually; extraction renders summation sign as X and flattens C_i,t_i and exponential.',
'Table times.5,1,1.5,2; cashflows3,3,3,103; rates5,5.8,6.4,6.8 percent match. Four negative exponential terms and printed98.39 present; raw powers not trusted.',
'Yield-definition sum, preceding-bond equation,6.76% approximation and single-IRR warning visible. Summation/powers flattened in text.',
'All three above/at/below-par table rows and example check preserved; source assumption about matched rate conventions now separately labelled; do not compare nominal coupon to continuous yield unconverted.',
'Par-yield definition, sum discountfactor A, d=P(0,T), Ac/m+100d=100 and c=100m(1-d)/A visually intact. Dollars-on100-face versus numerical percent definition preserved.',
'Negative-exponent d and A sum, denominator3.70027, numerator100*2*(1-.87284),6.87 result/convention preserved; image verifies fraction scope.',
'All four bootstrap steps plus why-the-name explanation preserved; no formula omission.',
'Five data rows and all maturity/year, annualcoupon/dollar and price/dollar headers preserved; zeros8/12coupon distinction and half-annual-coupon instruction visible.',
'Zero-price exponential and log inverse, three maturities/prices and displayed10.127,10.469,10.536% preserved visually; fractions/log brackets flattened in text.',
'Cashflows4,4,104 and times.5,1,1.5 match; full three-term equation, discountfactor.85196 and minuslog divided1.5 preserved visually.',
'All four cashflows6,6,6,106 and exponential times preserved;10.808% answer and dependency question present. Raw superscripts not accepted as verified text.',
'Five-row maturity/continuous-zero-rate table matches all values; interpolation choices/caveat retained.',
'R1/R2 maturity order, accumulation identity, forward numerator R2T2-R1T1, denominator T2-T1 and discountfactor ratio P(0,T2)/P(0,T1) visibly intact; raw fractions not authoritative.',
'3%one-year/4%two-year example,5%forward, both terminal accumulation routes and108.33 preserved; forecast-versus-implied-rate caveat retained.',
'All five rows, year1 dash and5.0/5.8/6.2/6.5 forward rates present; year4 fraction and year3 task intact. Table columns legible.',
'Notional contract definition and all five bullets, timeT1/T2settlement and borrower/lender purpose retained; subscripts require image.',
'L,R_K,R_M,delta definitions and fixed-minus-floating sign preserved. Full settlement denominator1+R_M*delta is visually unambiguous; raw layout alone not trusted.',
'100million,4%,4.5%,.25 and negative125000 cashflow match; negative123609 settlement and denominator1+.045*.25 visible; lender-interpretation prose retained.',
'Both10millionGBP exposure questions and correct source payfixed/receivefloating versus receivefixed/payfloating answers preserved; no material omitted.',
'Price-yield sum and derivative leading minus, t_i factor and strictnegative sign visible; prediction prompt retained. Raw summation rendered X.',
'Duration1/B weighted sum, cashflow weight C_i e^(-yt_i)/B, sumweights=1 and D=sum t_i*w_i legible; both maturity comparison bullets preserved.',
'dB/dy=-BD, relative approximation minusD*deltay, basispoint conversion.01%=.0001 and10bp=+.001not.1 preserved; raw fractions flattened.',
'Six cashflow rows and totalrow match, including105principalpluscoupon, presentvalue73.256 and finalweight2.333; totalprice94.213/duration2.653years present.',
'Yieldchange+.001 and negative relative/absolute estimates retained; newprice93.963 and direct-repricing statement present. Fraction denominator B requires image.',
'Three approximation-error rows and bp headers match image; ordinary-option-free convexity and small-change limitations retained.',
'Convexity1/B second derivative and t_i squared sum preserved visually; secondorder correction has plus onehalf C(deltay)^2, not minus. Displayed7.570 present.',
'100bp=.01 convention, negative duration term plus positive convexity term, priceestimate91.749 and duration-only91.714 present; squaredyieldchange requires image.',
'Parallel-shift limitation, changingduration/convexity, nonparallelcurve exposure and remainingcredit/liquidity/optionality/modelrisks all preserved.',
'Seven summary bullets and dated-cashflow unifying principle retained; no fullcoursecoverage conclusion inferred.'
]
math_pages={5,6,7,8,9,10,11,12,13,14,15,17,18,21,22,23,25,26,27,28,29,30,32,33,34,35,36,38,39}
table_pages={8,14,16,20,24,27,35,37}
# Frozen observed-byte binding: rerunning a mechanical check cannot certify newly changed images/text.
observed=load('study/pilot/qa/view-bindings.json')
for binding in observed['pages']:
    assert digest(binding['imagePath'])==binding['imageSha256'], ('Changed image needs fresh visual review',binding['pageId'])
    assert digest(binding['markdownPath'])==binding['markdownSha256'], ('Changed page needs fresh comparison/annotation review',binding['pageId'])
assert digest('study/pilot/source-issues.json')==observed['sourceIssueRegistrySha256'], 'Changed issue registry needs explicit rereview'
account=load('study/pilot/page-accounting.json')['pages']
assert len(account)==44 and len({p['id'] for p in account})==44
byid={p['id']:p for p in account}
expected={f'lecture-3-pdfPage-{i:03d}' for i in range(1,42)}|{f'seminar-2-problems-pdfPage-{i:03d}' for i in (1,2)}|{'lecture-1-pdfPage-026'}
assert set(byid)==expected
baseline=load('.omx/artifacts/source-preflight/inventory.json')['sources']
inventory=load('study/pilot/inventory.json')['sources']
assert len(inventory)==13
baselineby={p['path']:p for p in baseline}
originals=[]
for s in inventory:
    actual=digest(s['originalPath']); original=baselineby[s['originalPath']]
    assert actual==s['sha256']==original['sha256']
    assert (ROOT/s['originalPath']).stat().st_size==s['bytes']==original['bytes']
    originals.append({'sourceId':s['id'],'path':s['originalPath'],'sha256':actual,'unchanged':True})
source_paths={s['originalPath'] for s in inventory}
assert {str(p.relative_to(ROOT)) for p in (ROOT/'context').rglob('*') if p.is_file() and p.name!='.DS_Store'}==source_paths
pdfcounts={}
for sid,path,want in [('lecture-3','context/lecture slides/Lecture 3 Interest rates and bonds.pdf',41),('seminar-2-problems','context/seminars/ES32079 Seminar 2.pdf',2),('lecture-1','context/lecture slides/Lecture 1 Intro to Derivatives.pdf',38)]:
    proc=subprocess.run(['.omx/tools/poppler/bin/pdfinfo',path],capture_output=True,text=True,check=True)
    count=int(re.search(r'^Pages:\s+(\d+)',proc.stdout,re.M)[1]); assert count==want
    pdfcounts[sid]=count
# Fresh extraction of two approved sources compared byte-for-byte, never textbook processing.
rawchecks={}
for sid,path in [('lecture-3','context/lecture slides/Lecture 3 Interest rates and bonds.pdf'),('seminar-2-problems','context/seminars/ES32079 Seminar 2.pdf')]:
    actual=subprocess.run(['.omx/tools/poppler/bin/pdftotext','-layout','-enc','UTF-8',path,'-'],capture_output=True,check=True).stdout
    recorded=(ROOT/f'study/pilot/{sid}/extracted-layout.txt').read_bytes(); assert actual==recorded
    rawchecks[sid]={'freshExtractionMatches':True,'sha256':hashlib.sha256(actual).hexdigest(),'physicalPageSeparators':actual.count(b'\x0c')}
rows=[]
for pid in sorted(expected):
    p=byid[pid]; md=(ROOT/p['markdownPath']).read_text(); img=(ROOT/p['imagePath']).read_bytes()
    assert md.count(f'<a id="{pid}"></a>')==1
    assert f'pdfPage:{p["pdfPage"]}' in md
    links=re.findall(r'!\[[^\]]*\]\(([^)]+)\)',md); assert len(links)==1
    assert ((ROOT/p['markdownPath']).parent/links[0]).resolve()==(ROOT/p['imagePath']).resolve()
    assert digest(p['markdownPath'])==p['markdownSha256']
    assert digest(p['imagePath'])==p['imageSha256']
    assert img[:8]==b'\x89PNG\r\n\x1a\n'; width,height=struct.unpack('>II',img[16:24])
    sid=p['sourceId']; n=p['pdfPage']
    if sid=='lecture-3':
        note=observations[n-1]; mode='original-image-verified-not-math-text' if n in math_pages else 'prose-and-table-values-compared'
        if n in table_pages: mode+=';table-image-and-spaced-values-verified-not-semantic-table'
    elif sid=='seminar-2-problems':
        mode='prose-compared;original-image-preserved'
        note=('Q1fourcomparisoncategories,Q2allthreehedgingprompts,Q3$50/6%continuous/6monthsand1year,Q4forwardversusexpectedspotquestionallpresent. Bullet glyph U+0088 is an extraction defect, not missing prose.' if n==1 else 'Q5threequalitativeprompts with101.50price,3monthsdelivery,4monthsnextcoupon,6%coupon/5%continuousrate;Q6allfourdefinitions;Q7three-rowtable0.5/0%/97,1/6%/101.50,1.5/8%/104andannualcouponinstructionallmatch. Cashflow/zero-conventionambiguity explicitly annotated, no definitive solution accepted.')
    else:
        mode='original-image-and-added-diagram-description-verified;raw-text-omits-axes'
        note='Viewed graph: verticalaxisProfit; horizontalPriceofUnderlyingatMaturity,S_T; upwardstraightline+slope1crosseszeroatK; negativeleftK,positiverightK. No numeric ticks or legend to recover. Formula longforwardpayoff S_T-K and predictionprompt preserved; separate annotation accurately describes axes/geometry and explicit payoff/profit terminology condition.'
    rows.append({'pageId':pid,'visualReview':'ACTUALLY_VIEWED','visualTool':'tools.view_image','visualDisplayBatches':'L3:1-6,7-12,13-18,19-24,25-30,31-36,37-41; seminar1-2 and L1p26 individually displayed in final batch','markdownPath':p['markdownPath'],'markdownSha256':digest(p['markdownPath']),'imagePath':p['imagePath'],'imageSha256':digest(p['imagePath']),'imageDimensions':[width,height],'anchorAndLinkCheck':'PASS','fidelityMode':mode,'observation':note,'omittedTeachingCriticalVisualRegion':False})
issues=[
{'id':'PILOT-SOURCE-L3-P11','sourceIssueId':'pilot-source-conflict-l3-p11','pageId':'lecture-3-pdfPage-011','severity':'teaching-critical-if-unlabelled','kind':'SOURCE_ERROR_NOT_EXTRACTION_ERROR','disposition':'CLOSED_FOR_EXTRACTION: preserved original, separately labelled arithmetic correction independently recomputed; printed answers prohibited as unqualified teaching','r':math.log(5800/5000)/1.5,'R2':2*math.expm1(math.log(5800/5000)/3),'effectiveAnnualDistinct':math.expm1(math.log(5800/5000)/1.5)},
{'id':'PILOT-FIGURE-L1-P26','sourceIssueId':'pilot-source-conflict-l1-p26','pageId':'lecture-1-pdfPage-026','severity':'teaching-critical-if-omitted','kind':'RAW_TEXT_OMITS_GRAPH_AND_SOURCE_PAYOFF_PROFIT_LABEL_TENSION','disposition':'CLOSED_FOR_EXTRACTION: full readable original plus verified axis/geometry description; original Profit label preserved; payoff equivalence assumption explicit'},
{'id':'PILOT-CONVENTION-L3-P16','sourceIssueId':'pilot-source-convention-l3-p16','pageId':'lecture-3-pdfPage-016','severity':'teaching-caveat','kind':'SOURCE_RATE_CONVENTION_ASSUMPTION','disposition':'CLOSED_FOR_EXTRACTION: explicit matched convention annotation; future teaching must honor it'},
{'id':'PILOT-CONVENTION-S2-Q7','sourceIssueId':'pilot-source-convention-seminar2-q7','pageId':'seminar-2-problems-pdfPage-002','severity':'blocks-definitive-Q7-solution-not-extraction','kind':'SOURCE_SCHEDULE_AND_QUOTE_AMBIGUITY','disposition':'CLOSED_FOR_EXTRACTION: prompt preserved, ambiguity labelled; not permission to invent a unique source answer'},
{'id':'PILOT-MATH-TEXT','severity':'not-ready-for-text-only-mathematics','kind':'FLATTENED_EXPONENT_SUBSCRIPT_FRACTION_SUM','disposition':'CLOSED_FOR_VISUAL_PRESERVATION: linked readable original images inspected perpage; raw extraction remains explicitly uncorrected and math retrieval warnings require originalimage before teaching; not text-fidelity certification'},
{'id':'PILOT-ACCESSIBILITY','severity':'future-reader-gate','kind':'SEMANTIC_TABLE_AND_BULLET_ENCODING','disposition':'G001 images/table values preserved; semantic accessible tables and U+0088bullet normalization not claimed; require frozen tooling/browser validation later'}
]
# Confirm source fixes are actually present at the reviewed paths, not only in implementer summaries.
required={'lecture-3-pdfPage-011':['Source conflict annotation','9.894667','10.143515','not original source text'], 'lecture-3-pdfPage-016':['matched payment/compounding','not original source text'],'seminar-2-problems-pdfPage-002':['Cashflow schedule','not original source text'],'lecture-1-pdfPage-026':['vertical axis','horizontal axis','negative to the left','zero-initial-value','not original source text']}
for pid,phrases in required.items():
    text=(ROOT/byid[pid]['markdownPath']).read_text()
    for phrase in phrases: assert phrase in text,(pid,phrase)
for n in sorted(math_pages-{5,28}):
    if n in {35}: continue # numeric table contains no formula requiring repair
    assert 'Math retrieval warning' in (ROOT/byid[f'lecture-3-pdfPage-{n:03d}']['markdownPath']).read_text(),n
mechanical={'reviewer':'/root/g001_pilot_visual_qa','checkedAt':datetime.now(timezone.utc).isoformat(),'originalFiles':originals,'all13OriginalHashesUnchanged':True,'exact13SourceMembership':True,'freshPdfinfoPhysicalCounts':pdfcounts,'freshRawExtraction':rawchecks,'reviewedPilotPages':44,'uniqueLocators':44,'allImageLinksAndAnchorsResolve':True,'allLedgerMdAndImageHashesMatch':True,'scope':'two complete pilot sources plus one selected graph page; no textbook extraction, no fullcourse claim'}
report={'reviewer':'/root/g001_pilot_visual_qa','role':'independent verifier; did not author source extraction/images/lesson','reviewedAt':datetime.now(timezone.utc).isoformat(),'claim':'Exploratory G001 extraction pilot visually preserves all44specified pages with precise locators and explicit source issues','verdict':'PASS','notClaimed':['verified mathematical rawtext','complete lecture3teaching','allfourlectureconversion','production frozen-contract acceptance','textbookconversion','unique source answer to ambiguous seminarQ7'],'visualReviewMethod':'Every one of44page images actually displayed using view_image and compared with its full rawlayout Markdown; later annotations read and exactbytes bound. Script checks links/hashes/counts only; it does not perform visual review.','unresolvedTeachingCriticalExtractionRegions':0,'sourceIssueRegistrySha256':digest('study/pilot/source-issues.json'),'issues':issues,'pages':rows,'nextGate':'Pilot artifacts remain provisional; frozen schema/validation revalidation required before bulk; lesson independent rubric is separate.'}
(QA/'mechanical-checks.json').write_text(json.dumps(mechanical,indent=2)+'\n')
(QA/'visual-review.json').write_text(json.dumps(report,indent=2)+'\n')
md=['# Independent exploratory pilot visual QA','', '## Verdict','PASS — visual preservation/extraction pilot only. All44pageimages actually viewed and compared with complete rawlayout text. No unresolved teaching-critical extraction region; **not** verified mathematical text, course conversion or complete teaching.','', '## Evidence','- Fresh `pdfinfo`: lecture3=41pages; seminar2problems=2pages; lecture1=38pages (onlyphysical26included).','- Fresh `pdftotext -layout -enc UTF-8` output matches both complete pilot extraction files byteforbyte.','-13originalsourceSHA256andbytes match immutablepreflight baseline; exact13source membership unchanged.','-44uniqueanchors/locators/image links and ledger hashes resolve/match. `mechanical-checks.json` records check outputs.','-Every image displayed using `tools.view_image`; perpage originalimage/Markdown hashes below in `visual-review.json` bind this actual human-visible-model review, not process success.','', '## Source issues and dispositions']
for i in issues: md.append(f'- **{i["id"]}** ({i["kind"]}): {i["disposition"]}.')
md+=['','ForL3p11the independent arithmetic is `log(5800/5000)/1.5 = 0.09894667007884882` (9.894667007884882%); equivalent nominal annual semiannual `2*expm1(r/2) = 0.10143514899716051` (10.14351489971605%). Effective annual `expm1(r)=0.10400742136017956` is a different convention. Raw source10.15%/10.41% is preserved, not endorsed.','','## Perpage matrix','All rows: ACTUALLY VIEWED; unique locator/image/anchor PASS. `image` means image fidelity, **not** automatically faithful mathematical text.','','|Page|Fidelity mode|Observed source/evidence comparison|','|---|---|---|']
for row in rows: md.append(f'|{row["pageId"]}|{row["fidelityMode"]}|{row["observation"]}|')
md+=['','## Gaps','Semantic accessible math/table transcription and production validation are future gates. This review proves readable image preservation plus prose/table-value comparison, not text-only mathematical accessibility. Original source ambiguities remain explicitly labelled and must not be presented as definite authoritative solutions.','','## Risks','Provisional wholepage regions are not a complete substantive-unit teaching taxonomy. Bulk ingestion must await frozen tooling and revalidated pilot. Lesson rubric/answers require a separate independent report. Any edit to reviewed sourcepage/image bytes invalidates the affected row until reviewed again.']
(QA/'visual-review.md').write_text('\n'.join(md)+'\n')
print(json.dumps({'verdict':'PASS','pagesActuallyViewed':len(rows),'originalHashesVerified':len(originals),'unresolvedCriticalExtractionRegions':0,'reports':['study/pilot/qa/visual-review.json','study/pilot/qa/visual-review.md','study/pilot/qa/mechanical-checks.json']}))
