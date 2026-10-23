"""Provisional author-side region descriptions; these are not independent reviews."""
from pathlib import Path
import json, hashlib
ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'study/pilot'
titles=['Title/identity','Lecture outline','Why rates matter','Rate taxonomy/risk-free model','Reference rates after LIBOR','Compounding convention examples','Discrete compounding formulas and example','Compounding-frequency table/effective annual rate','Continuous-compounding limit','Equivalent-rate conversion','Compounding check and supplied answer','Zero rates/discount factors','Bond cashflow sum','Coupon-bond pricing table/example','Yield to maturity','Price/coupon/yield comparison table','Par-yield derivation and units','Par-yield numerical example','Bootstrapping explanation','Bootstrap input table','Zero-coupon bootstrap formulas','1.5-year bootstrap','2-year bootstrap','Bootstrapped zero-curve table/interpolation','Forward-rate derivation','Forward-rate example/interpretation','Forward-rate table/exercise','FRA definition/roles/settlement','FRA notation and payoff','Receive-fixed FRA worked example','FRA side selection exercise/answers','Price-yield derivative','Duration/weights','Duration sensitivity/basis-point units','Duration numerical table','Duration approximation example','Approximation-error table','Convexity and second-order formula','Duration-convexity example','Immunisation assumptions and limits','Summary/unifying idea']
table={8,14,16,20,24,27,35,37}
math={6,7,8,9,10,11,12,13,14,15,17,18,20,21,22,23,24,25,26,27,29,30,32,33,34,35,36,37,38,39}
lecture=(OUT/'lecture-3/extracted-layout.txt').read_text().split('\f')[:-1]
records=[]
for i,(title,text) in enumerate(zip(titles,lecture),1):
    controls=sorted({f'U+{ord(c):04X}' for c in text if ord(c)<32 and c not in '\n\t\r'})
    regions=[{'id':f'lecture-3-pdfPage-{i:03d}-body','description':title,'kind':'administrative' if i in {1,2} else 'substantive','basis':'author inspection of complete extracted page; approximate whole-page region, not frozen production unit','requiresIndependentReview':True}]
    issues=[]
    if i in math: issues.append('Mathematical superscripts/subscripts/fractions flattened or reading order uncertain in plain layout text; image reconciliation needed.')
    if i in table: issues.append('Table preserved as spaced plain text plus page image, not yet a semantic accessible table.')
    if controls: issues.append('Nonprinting font-mapped math glyphs in extraction: '+', '.join(controls)+'. Retained unchanged.')
    records.append({'pageId':f'lecture-3-pdfPage-{i:03d}','provisionalRegions':regions,'contentFeatures':['prose']+(['mathematics'] if i in math else [])+(['table'] if i in table else []),'issues':issues,'independentVisualQa':'pending'})
for page,qs in [(1,[1,2,3,4]),(2,[5,6,7])]:
    records.append({'pageId':f'seminar-2-problems-pdfPage-{page:03d}','provisionalRegions':[{'id':f'seminar-2-question-{q}','description':f'Question {q}; original numbering','kind':'exercise','requiresIndependentReview':True} for q in qs],'contentFeatures':['prose','exercise']+(['table'] if page==2 else []),'issues':['Bullet glyph extracts as U+0088 rather than a standard bullet; retained unchanged.']+(['Question 7 annual-coupon instruction plus fractional maturities needs explicit cashflow convention before solving; do not silently assume lecture semiannual schedule.'] if page==2 else []),'independentVisualQa':'pending'})
(OUT/'substantive-regions.json').write_text(json.dumps({'status':'provisional author inspection, NOT independent certification; page membership is not completeness','figurePilot':'No substantive plotted diagram identified in selected source text; fullpage PNG evidence is not proof of diagram interpretation. Escalated to leader.','pages':records},indent=2)+'\n')
print(f'{len(records)} pages with provisional regions; {sum(len(p["provisionalRegions"]) for p in records)} region candidates')
