#!/usr/bin/env python3
"""Mechanical freshness/math checks only; actual visual/semantic review is separate."""
from pathlib import Path
import hashlib,json,re,subprocess,tempfile,os
from decimal import Decimal as D, getcontext
getcontext().prec=40
ROOT=Path(__file__).resolve().parents[3]
os.chdir(ROOT)
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def load(p): return json.loads(Path(p).read_text())
views=load('study/sources/qa-reviews/lecture-12-view-bindings.json')
assert len(views['images'])==67
for v in views['images']: assert sha(v['path'])==v['sha256'], f"Changed viewed image: {v['path']}"
manifest=load('study/sources/manifest.json')['sources']
counts={'pages':0,'units':0,'substantive':0,'administrative':0,'exactRawPages':0,'mapsChecked':0}
tool=ROOT/'.omx/tools/poppler/bin/pdftotext'
expected={'lecture-1':'2e7ae0637756b62861377ecb0ff109aac9108ded318e40f1307751cb8e348498','lecture-2':'9f65aa5242d368268cb4332779005c503e0bb305d0d2f4acd22913eac0b82bd7'}
for sid,total in [('lecture-1',38),('lecture-2',29)]:
 source=manifest[sid]; assert sha(source['originalPath'])==expected[sid]
 draftpath=f'study/sources/qa-drafts/{sid}.json'; d=load(draftpath)
 assert d['sourceId']==sid and d['sourceHash']==expected[sid]
 assert len(d['pages'])==total and [p['pdfPage'] for p in d['pages']]==list(range(1,total+1))
 with tempfile.TemporaryDirectory(prefix='fd-lecture12-qa-') as tmp:
  out=Path(tmp)/'layout.txt'
  subprocess.run([str(tool),'-layout','-enc','UTF-8',source['originalPath'],str(out)],check=True)
  raw=out.read_bytes(); assert raw==Path(f'study/sources/extracted/{sid}/rawfull-layout.txt').read_bytes()
  chunks=raw.decode('utf-8').split('\f'); assert len(chunks)==total+1 and not chunks[-1].strip()
  for p,chunk in zip(d['pages'],chunks):
   page=p['pdfPage']; counts['pages']+=1
   assert sha(p['rawPath'])==p['rawHash'] and sha(p['imagePath'])==p['imageHash'] and sha(p['normalizedPath'])==p['normalizedHash']
   rt=Path(p['rawPath']).read_text(); assert rt.split('```text\n',1)[1].rsplit('\n```',1)[0]==chunk
   counts['exactRawPages']+=1
   nt=Path(p['normalizedPath']).read_text(); anchors=list(re.finditer(r'<a id="([^"]+)"></a>',nt))
   assert [a.group(1) for a in anchors]==[u['extractionRef']['anchor'] for u in p['units']]
   for i,u in enumerate(p['units']):
    counts['units']+=1; counts[u['classification']]+=1
    assert u['sourceId']==sid and u['locator']['pdfPage']==page and u['locator']['region']
    assert u['contentHash']==p['normalizedHash'] and u['extractionRef']['path']==p['normalizedPath']
    if page>1: assert u['locator']['printedPage']==f'{page} / {total}'
    else: assert 'printedPage' not in u['locator']
    span=nt[anchors[i].end():anchors[i+1].start() if i+1<len(anchors) else len(nt)]
    if u['classification']=='substantive':
     assert re.search(r'!\[[^\]]+\]\(../../assets/'+sid+r'/page-'+f'{page:03}'+r'\.png\)',span),u['id']
     assert 'Source region:' in span and f'physical page {page}' in span,u['id']
 mapfile=Path(f'study/sources/qa-reviews/{sid}.json')
 if mapfile.exists():
  m=load(mapfile); assert m['sourceHash']==expected[sid] and m['draftPath']==draftpath and m['draftHash']==sha(draftpath)
  assert m['reviewer']!=d['author'] and m['verdict']=='approved' and len(m['pages'])==total
  for p,r in zip(d['pages'],m['pages']):
   assert r=={'pdfPage':p['pdfPage'],'verdict':'approved','rawHash':p['rawHash'],'imageHash':p['imageHash'],'normalizedHash':p['normalizedHash'],'unitIds':[u['id'] for u in p['units']],'allRegionsAccounted':True}
  counts['mapsChecked']+=1
checks=[]
def eq(label,a,b):
 assert a==b,(label,str(a),str(b)); checks.append({'label':label,'actual':str(a),'expected':str(b)})
# Every printed numerical result, keeping payoffs/value/profits and quantities distinct.
for s,p in [(80,-25),(105,0),(130,25)]: eq(f'L1p22 long {s}',s-105,p);eq(f'L1p22 zero-sum {s}',(s-105)+(105-s),0)
eq('L1p24 intended GBP million USD cost',D('1000000')*D('1.5532'),D('1553200'))
for s,p in [('1.4500','-103200'),('1.5532','0'),('1.6500','96800')]:eq(f'L1p25 USD long payoff {s}',D('1000000')*(D(s)-D('1.5532')),D(p))
eq('L1p29 daily long gain',100*(53-50),300);eq('L1p30 account balance',2000-600-500,900)
for s,c,p in [(70,0,30),(100,0,0),(130,30,0)]: eq(f'L1p33-35 call {s}',max(s-100,0),c);eq(f'L1p36 put {s}',max(100-s,0),p)
eq('L1p37 break-even ignoring premium interest',100+8,108)
eq('L2p4 shares',2000//20,100);eq('L2p4 call exposure shares',20*100,2000)
for s,sp,cp in [('15','-500','-2000'),('22.50','250','-2000'),('25','500','3000')]:
 eq(f'L2p6 shares {s}',100*(D(s)-20),D(sp));eq(f'L2p6 calls {s}',2000*(max(D(s)-D('22.50'),0)-1),D(cp))
eq('L2p6 call break-even',D('22.50')+1,D('23.50'))
eq('L2p7 CONDITIONAL intended GBP conversion',100*D('1.5300'),D('153'));eq('L2p7 CONDITIONAL frictionless USD gross spread',153-150,3)
eq('L2p8 put quantity',10*100,1000);eq('L2p8 premium',1000*1,1000)
for s,sv,pv,hv in [('20',20000,7500,27500),('27.50',27500,0,27500),('35',35000,0,35000)]:
 eq(f'L2p9 share value {s}',1000*D(s),D(sv));eq(f'L2p9 put payoff {s}',1000*max(D('27.50')-D(s),0),D(pv));eq(f'L2p9 terminal value NOT net profit {s}',D(sv)+D(pv),D(hv))
eq('L2p13 short future gain',52-48,4);eq('L2p13 effective sale',47+4,51);eq('L2p13 closing basis',47-48,-1);eq('L2p13 basis identity',52+(47-48),51)
h=D('.928')*D('.0263')/D('.0313'); eq('L2p20 ratio 3dp',h.quantize(D('.001')),D('.780'))
eq('L2p20 USING ROUNDED .780 contract count 2dp',(D('.780')*2000000/42000).quantize(D('.01')),D('37.14'))
eq('L2p21 E-mini notional',50*5000,250000);eq('L2p21 Micro notional',5*5000,25000)
eq('L2p22 short contracts',5000000//250000,20);eq('L2p25 zero-beta short contracts',(D('1.20')-0)*5000000/250000,D('24'))
result={'ok':True,'scope':'Mechanical exact-byte/source/span checks and independent numerical recomputation only; does not automate visual or semantic approval.',**counts,'numericalChecks':checks}
Path('study/sources/qa-reviews/lecture-12-mechanical-checks.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k!='numericalChecks'}));print('numerical checks:',len(checks))
