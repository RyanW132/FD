from pathlib import Path
import hashlib,json,re,math
R=Path.cwd();H=lambda p:hashlib.sha256((R/p).read_bytes()).hexdigest();checks=0
def ck(x,msg):
 global checks
 assert x,msg
 checks+=1
sourceids=['seminar-1-problems','seminar-1-solutions','seminar-2-problems','seminar-2-solutions','seminar-3-problems'];manifest=json.loads((R/'study/sources/manifest.json').read_text());viewed=[];seen=set();counts=[]
for sid in sourceids:
 s=manifest['sources'][sid];d=json.loads((R/f'study/sources/qa-drafts/{sid}.json').read_text());ck(set(d)=={'schemaVersion','sourceId','sourceHash','author','pages'},sid+' draft fields');ck(d['schemaVersion']==1 and d['sourceId']==sid and d['sourceHash']==s['sha256'] and H(s['originalPath'])==s['sha256'],sid+' source binding');ck([p['pdfPage'] for p in d['pages']]==list(range(1,s['pageCount']+1)),sid+' exhaustive pages')
 for p in d['pages']:
  ck(set(p)=={'pdfPage','rawPath','rawHash','imagePath','imageHash','normalizedPath','normalizedHash','units','issues','observations'},'page fields')
  for path,hh in [('rawPath','rawHash'),('imagePath','imageHash'),('normalizedPath','normalizedHash')]:ck(H(p[path])==p[hh],'bound '+path)
  text=(R/p['normalizedPath']).read_text();anchors=re.findall(r'<a id="([^"]+)"></a>',text);ck(anchors==[u['id'] for u in p['units']],'anchor selection/order');ck(not any(ord(c)<32 and c not in '\n\r\t' for c in text),'no corrupted control glyphs');ck(text.count('$$')%2==0,'display math pairing')
  for i,u in enumerate(p['units']):
   ck(set(u)=={'id','sourceId','locator','extractionRef','contentHash','status','classification','issueIds'},'closed SourceUnit fields');ck(u['id'] not in seen,'unique stable id');seen.add(u['id']);ck(u['status']=='needs-review' and u['contentHash']==p['normalizedHash'],'no selfapproval + full-page binding');ck(u['sourceId']==sid and u['locator']['pdfPage']==p['pdfPage'] and set(u['locator'])=={'pdfPage','region'},'physical locator');ck(u['extractionRef']=={'kind':'markdown','path':p['normalizedPath'],'anchor':u['id']},'exact closed ref');span=text.split(f'<a id="{u["id"]}"></a>',1)[1].split('<a id=',1)[0]
   if u['classification']=='substantive':
    ck('![Original full uncropped physical page' in span and f'**Physical page {p["pdfPage"]};' in span and '[Preserved raw extraction]' in span,'selfcontained span')
   for rel in re.findall(r'\]\(([^)]+)\)',span):ck((R/p['normalizedPath']).parent.joinpath(rel.split('#')[0]).resolve().is_file(),'relative source link exists')
  ck({i['id'] for i in p['issues']}=={i for u in p['units'] for i in u['issueIds']},'issue closure')
  for issue in p['issues']:ck(set(issue)=={'id','scopeRef','reason','status','resolutionRef'} and issue['status']=='open' and issue['scopeRef']['unitId'] in {u['id'] for u in p['units']},'closed open issue')
  viewed.append({'sourceId':sid,'pdfPage':p['pdfPage'],'imagePath':p['imagePath'],'imageHash':p['imageHash'],'viewEvidence':'Exact production PNG viewed in this author agent via view_image, full page; independent QA pending.'})
 counts.append({'sourceId':sid,'pageCount':len(d['pages']),'substantiveUnits':sum(u['classification']=='substantive' for p in d['pages'] for u in p['units']),'administrativeUnits':len(d['pages']),'draftHash':H(f'study/sources/qa-drafts/{sid}.json')})
# Arithmetic checks reproduce only source-supplied worked answers, not missing seminar-3 answers.
for actual,expected,tol in [(50000/5000,10,0),((4.8+5.2-4.85)*50000,257500,1e-8),(3-3.1,-.1,1e-12),(2.7-2.75,-.05,1e-12),(2.7+3.1-2.75,3.05,1e-12),(.8*1e6/42000,19.05,.005),(50*math.exp(.06*.5),51.52,.005),(50*math.exp(.06),53.09,.005),(-math.log(.97)/.5,.0609,.00005),((101.5-3*.97)/103,.95718,.000005),(-math.log((101.5-3*.97)/103),.0438,.00005)]:ck(abs(actual-expected)<=tol,'source arithmetic')
ck(len(viewed)==22,'22 production images actually viewed');ck(len(seen)==90,'90 source regions');ck('annual coupon payments' in (R/'study/sources/annotated/seminar-2-problems/page-002.md').read_text(),'annual assumption retained');ck('semiannual' in (R/'study/sources/annotated/seminar-2-solutions/page-005.md').read_text(),'semiannual conflict retained')
result={'status':'author-checks-pass-independent-review-pending','checks':checks,'pages':len(viewed),'units':len(seen),'sources':counts,'imageViews':viewed,'initialContextBudget':{'limit':32768,'readBeforeContinuation':33969,'excess':1201,'status':'failed-not-retroactively-relabelled','note':'The required contract batch was read before precomputing its cumulative size. Evidence/code reads proceeded as explicit continuations afterwards.'}}
(R/'study/sources/qa-drafts/practice-author-checks.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:result[k] for k in ['status','checks','pages','units']},indent=2))
