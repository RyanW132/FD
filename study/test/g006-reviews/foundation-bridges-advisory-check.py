"""Independent bounded reviewer checks. Writes only reviewer-owned advisory JSON."""
from pathlib import Path
from fractions import Fraction as F
import math,json,re,hashlib,subprocess
R=Path.cwd(); sha=lambda p:hashlib.sha256((R/p).read_bytes()).hexdigest()
author=json.loads((R/'.omx/drafts/g006-bridges-author-check-results.json').read_text())
results={}
def put(k,v):
 assert k not in results
 results[k]=float(v)
# Independently specified arithmetic, with rational unit conversions and centered
# population moments. Author script is never executed/imported.
values={
'n-long':3*80-3*105,'n-short':3*105-3*80,'n-percent':200*F(5,100),
'n-rate-bp':(F(425,10000)-F(4,100))*10000,'n-relative':F(425-400,400),
'n-currency-up':1000000*F(16500-15532,10000),'n-currency-down':1000000*F(14500-15532,10000),
'n-simple-half':1000+1000*F(6,100)*F(6,12),'n-algebra':F(47)+F(600,200),
'n-answer1':90-100,'n-answer2-percent':F(75,1000),'n-answer2-bp':F(35,10000),
'n-answer2-change':F(35,1000)-F(4,100),'n-answer3-fx':2000*F(120,100),
'n-answer3-interest':2000*F(8,100)*F(9,12),'n-answer4':10+F(120,40)}
for k,v in values.items():put(k,v)
def moments(xs,ys):
 n=len(xs); mx=sum(map(F,xs))/n;my=sum(map(F,ys))/n
 vx=sum((F(x)-mx)**2 for x in xs)/n;vy=sum((F(y)-my)**2 for y in ys)/n
 c=sum((F(x)-mx)*(F(y)-my) for x,y in zip(xs,ys))/n
 return mx,my,vx,vy,c
xs=[-2,0,0,2];ys=[-1,-1,1,1]
mx,my,vx,vy,c=moments(xs,ys)
for k,v in {'s-mean-x':mx,'s-mean-y':my,'s-var-x':vx,'s-var-y':vy,'s-cov':c,'s-rho':float(c)/math.sqrt(vx*vy),'s-hedge-var':moments([x-y for x,y in zip(xs,ys)],ys)[2],'s-slope':c/vy,'s-answer1-return':F(1,50),'s-answer2-varx':moments([-2,2],[-4,4])[2],'s-answer2-vary':moments([-2,2],[-4,4])[3],'s-answer2-cov':moments([-2,2],[-4,4])[4],'s-answer3-var':moments([0,0],[-4,4])[2]}.items():put(k,v)
for h in [-4,-1,0,.5,1,2,5]:put('s-variance-identity-'+str(h),moments([F(x)-F(h)*y for x,y in zip(xs,ys)],ys)[2])
for k,v in {'d-average-slope':(F(21,10)**2-4)/F(1,10),'d-minimum':4-8+7,'d-constrained':4*F(1,2)**2-8*F(1,2)+7,'d-first':4+4*F(1,10),'d-second':F(21,10)**2,'d-negative':F(19,10)**2,'d-bond-up':100-400*F(1,100)+F(1800,2)*F(1,100)**2,'d-bond-down':100+400*F(1,100)+F(1800,2)*F(1,100)**2,'d-answer1-value':1+3+2,'d-answer1-slope':2+3,'d-answer2-min':2*F(3,2)**2-6*F(3,2)+8,'d-answer3-exact':F(11,10)**2+3*F(11,10)+2,'d-answer4-first':200-200*3*F(5,1000),'d-answer4-second':200-200*3*F(5,1000)+200*6*F(5,1000)**2}.items():put(k,v)
for h in [-3,0,.2,1,1.5,4]:put('d-completed-square-'+str(h),2*F(h)**2-6*F(h)+8)
for k,v in {'p-integer':2*2*2,'p-zero':1,'p-negative':F(1,4),'p-root':math.sqrt(9),'p-fraction':math.sqrt(9)**3,'p-limit10':float(F(11,10)**10),'p-limit100':float(F(101,100)**100),'p-logsum':math.log(2),'p-discrete':1000*F(21,20)**3,'p-continuous':1000*math.exp(.03),'p-unknown-rate':math.log(1.21)/2,'p-semiannual':2*math.log1p(.05),'p-effective':F(21,20)**2-1,'p-answer-growth':500*F(51,50)**6,'p-answer-conversion':4*math.log1p(.02),'p-answer-effective':F(51,50)**4-1,'p-answer-time':math.log(2)/.05,'p-roundtrip':1000*math.exp(.03)/math.exp(.03),'p-quote-roundtrip':2*math.expm1(math.log1p(.05)),'p-conversion-reconstruct':500*math.exp(6*math.log1p(.02))}.items():put(k,v)
assert len(results)==76
expected={v['id']:v for v in author['numericChecks']}; assert set(expected)==set(results)
recomputed=[]
for k,v in results.items():
 e=expected[k]; assert math.isclose(v,e['expected'],rel_tol=0,abs_tol=e['absoluteTolerance']),(k,v,e)
 recomputed.append({'id':k,'independentValue':v,'authorExpected':e['expected'],'absoluteTolerance':e['absoluteTolerance'],'pass':True})
# Additional examples omitted from the author's numeric list and algebraic
# identities/limits whose correctness cannot be established by its 76 checks alone.
extras=[]
def chk(label,a,b,tol=1e-10):
 assert math.isclose(float(a),float(b),rel_tol=0,abs_tol=tol),(label,a,b)
 extras.append({'claim':label,'actual':float(a),'expected':float(b),'pass':True})
for name,a,b in [('operation parentheses',2*(8-3),10),('operation precedence',2*8-3,13),('5 percent increase',200*F(105,100),210),('5 percent decrease',200*F(95,100),190),('FX quotation',80*F(125,100),100),('FX reverse',100/F(125,100),80),('FX reciprocal',1/F(125,100),F(8,10)),('weighted mean',F(1,4)*80+F(3,4)*120,110),('eighteen months',F(18,12),F(3,2)),('linear finite slope',(F(53,10)-5)/F(1,10),3),('small positive quadratic slope',(F(201,100)**2-4)/F(1,100),F(401,100)),('small negative quadratic slope',(F(199,100)**2-4)/F(-1,100),F(399,100)),('exercise average slope',(F(651,100)-6)/F(1,10),F(51,10)),('exercise first-order error',F(65,10)-F(651,100),F(-1,100)),('semiannual second balance',1000*F(21,20)**2,F(2205,2)),('inverse log exp',math.log(math.exp(3)),3),('inverse exp log',math.exp(math.log(.5)),.5),('ln one',math.log(1),0),('continuous double roundtrip',math.exp(.05*math.log(2)/.05),2)]:chk(name,a,b)
for a in [F(1,2),F(2),F(5)]:
 for b in [-3,0,4]:
  for h in [-2,0,F(3,2)]:
   chk('general complete square',a*h*h-2*b*h+7,a*(h-F(b)/a)**2+7-F(b*b)/a)
# nonzero-mean least squares and sample/population normalization cancellation
x=[1,4,6];y=[2,3,5];mx,my,vx,vy,c=moments(x,y);h=c/vy;alpha=mx-h*my
chk('residual mean zero',sum(F(a)-alpha-h*b for a,b in zip(x,y))/3,0)
chk('sample versus population slope',(c*F(3,2))/(vy*F(3,2)),h)
chk('constant response slope',moments([5,5,5],y)[4]/vy,0)
chk('constant regressor variance',moments(x,[3,3,3])[3],0)
chk('constant regressor covariance',moments(x,[3,3,3])[4],0)
fragment='.omx/drafts/g006-shared-bridges-fragment.md'
blocks=re.findall(r'```json\n(.*?)\n```',(R/fragment).read_text(),re.S)
concepts=json.loads(blocks[0])['concepts'];inv=json.loads(blocks[1]);u=json.loads((R/'study/sources/units.json').read_text())['units'];s=json.loads((R/'study/sources/manifest.json').read_text())['sources']
plan=json.loads(re.search(r'```json\n(.*?)\n```',(R/'.omx/plans/g006-curriculum-decomposition.md').read_text(),re.S)[1]);pb={b['id']:b for b in plan['bridges']}
bindings={};inventory={};links=0
for cid,c in concepts.items():
 assert set(c)==set('id title path evidenceRefs prerequisiteIds order reviewId'.split())
 assert c['id']==cid;assert c['prerequisiteIds']==pb[cid]['prerequisiteIds'];assert c['order']==pb[cid]['order'];assert c['reviewId']==pb[cid]['reviewId']
 for dep in c['prerequisiteIds']:assert concepts[dep]['order']<c['order']
 text=(R/c['path']).read_text();anchors=re.findall(r'<a id="([^"]+)"></a>',text)
 assert len(anchors)==len(set(anchors));assert inv[cid]['sha256']==sha(c['path'])
 sections={m[1]:m[2] for m in re.finditer(r'<a id="([^"]+)"></a>(.*?)(?=<a id=|\Z)',text,re.S)}
 assert set(inv[cid]['teachingAnchors']+inv[cid]['answerAnchors'])==set(anchors)
 for k,v in sections.items():assert len(v.strip())>100
 assert len(inv[cid]['answerAnchors'])==5
 inventory[cid]={'path':c['path'],'sha256':sha(c['path']),'order':c['order'],'prerequisiteIds':c['prerequisiteIds'],'teachingAnchors':inv[cid]['teachingAnchors'],'answerAnchors':inv[cid]['answerAnchors'],'sectionBytes':{k:len(v.encode()) for k,v in sections.items()},'evidenceUnitIds':[x['unitId'] for x in c['evidenceRefs']]}
 bindings[c['path']]=sha(c['path'])
 for _,target in re.findall(r'\[([^\]]+)\]\(([^)]+)\)',text):
  file,sep,anchor=target.partition('#');p=((R/c['path']).parent/file).resolve();assert p.is_file()
  if sep:assert f'<a id="{anchor}"></a>' in p.read_text()
  links+=1
 for ref in c['evidenceRefs']:
  unit=u[ref['unitId']];source=s[unit['sourceId']];assert unit['status']=='verified' and unit['classification']=='substantive';assert source['access']=='permitted' and source['exposure']['agent']=='allow'
  p=unit['extractionRef']['path'];assert sha(p)==unit['contentHash'];assert f'<a id="{unit["extractionRef"]["anchor"]}"></a>' in (R/p).read_text();assert sha(source['originalPath'])==source['sha256']
  for ep in [p,p.replace('/annotated/','/extracted/'),p.replace('/annotated/','/assets/').replace('.md','.png'),source['originalPath']]:bindings[ep]=sha(ep)
for p in [fragment,'.omx/plans/g006-curriculum-decomposition.md','study/sources/manifest.json','study/sources/units.json','.omx/drafts/g006-bridges-author-check.py','.omx/drafts/g006-bridges-author-check-results.json','.omx/drafts/g006-bridges-author-report.md','study/test/financial-golden-fixtures.json','study/test/financial-golden.test.mjs','study/lib/contracts.mjs','AGENTS.md','CONTEXT.md',*[f'study/contracts/{c}.md' for c in ['AGENTS','privacy','source','editing','curriculum','teaching']]]:bindings[p]=sha(p)
allrecords={r['id']:r for r in plan['lessons']+plan['bridges']}
for cid in concepts:
 def visit(k,stack):
  assert k not in stack
  for dep in allrecords[k]['prerequisiteIds']:
   if dep in allrecords:assert allrecords[dep]['order']<allrecords[k]['order'];visit(dep,stack+[k])
 visit(cid,[])
dur=allrecords['lesson-l3-duration-derivation'];assert all(x in dur['prerequisiteIds'] for x in ['concept-local-derivatives','concept-exponents-and-logs']);assert dur['order']>concepts['concept-exponents-and-logs']['order']
cmd=['node','--test','--test-name-pattern=minimum-variance-ratio:|semiannual-to-continuous:|months-to-years:|basis-points:|forward and option buyer/writer|minimum variance ratio is not|discount/accumulation invert|rate equivalence and months conversion','study/test/financial-golden.test.mjs']
p=subprocess.run(cmd,capture_output=True,text=True);assert p.returncode==0,p.stdout+p.stderr
report={'kind':'noncanonical-independent-advisory','reviewer':'g006_foundation_bridges_advisory','status':'calculations-and-structure-pass-pedagogical-verdict-in-md','inputHashes':bindings,'teachingInventory':inventory,'recomputedAuthorChecks':recomputed,'additionalChecks':extras,'counts':{'authorChecks':len(recomputed),'additionalChecks':len(extras),'separateAnswers':20,'anchors':sum(len(v['sectionBytes']) for v in inventory.values()),'localLinks':links,'originalImagesActuallyViewed':8},'goldenSelection':{'command':cmd,'exitCode':p.returncode,'stdout':p.stdout,'stderr':p.stderr},'boundaries':['No canonical Review object or approval created.','No coverage, canonical records, source, original, pilot, private, runtime or goal writes.','All four bridges and all 20 answers read, not sampled.','Global metadata may change; formal hash-closure review and browser gates remain.']}
(R/'study/test/g006-reviews/foundation-bridges-advisory.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report['counts']));print(p.stdout)
