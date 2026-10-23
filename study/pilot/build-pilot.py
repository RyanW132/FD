"""Provisional G001 extraction experiment, not the production ingestion contract."""
from pathlib import Path
import subprocess, json, hashlib, re, shlex
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'study/pilot'
TOOLS=ROOT/'.omx/tools/poppler/bin'
pre=json.loads((ROOT/'.omx/artifacts/source-preflight/inventory.json').read_text())['sources']
log=[]
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def run(args):
    p=subprocess.run([str(x) for x in args],capture_output=True)
    log.append({'command':shlex.join([str(x.relative_to(ROOT)) if isinstance(x,Path) and x.is_relative_to(ROOT) else str(x) for x in args]),'exitStatus':p.returncode,'stdout':p.stdout.decode('utf-8',errors='replace'),'stderr':p.stderr.decode('utf-8',errors='replace')})
    if p.returncode: raise RuntimeError(log[-1])
    return p.stdout
for name in ['pdfinfo','pdftotext','pdftoppm']: run([TOOLS/name,'-v'])
records=[]
for s in pre:
    path=s['path']; p=ROOT/path
    assert sha(p)==s['sha256'] and p.stat().st_size==s['bytes'],path
    filename=p.name
    if '/lecture slides/' in path: sid='lecture-'+re.search(r'Lecture (\d+)',filename)[1]; kind='lecture'
    elif '/lecture_transcripts/' in path: sid='transcript-week-'+re.search(r'week(\d+)',filename)[1]; kind='transcript'
    elif '/seminars/' in path:
        sid='seminar-'+re.search(r'Seminar (\d+)',filename)[1]+('-solutions' if 'Solutions' in filename else '-problems'); kind='seminar-solutions' if 'Solutions' in filename else 'seminar-problems'
    else: sid='textbook-hull-11'; kind='textbook'
    restricted=kind=='textbook'
    record={'id':sid,'originalPath':path,'sha256':s['sha256'],'bytes':s['bytes'],'kind':kind,'mediaType':'application/pdf' if p.suffix=='.pdf' else 'text/plain','access':{'localRead':'available','localExtraction':'not-authorized-in-pilot' if restricted else 'allowed-user-provided-course-material','channels':{'browser':'deny' if restricted else 'allow','agent':'deny' if restricted else 'allow','export':'deny'},'rationale':'Textbook restricted by default; access is not exposure permission.' if restricted else 'User-provided course sources for local study/browser and external subscription-agent teaching. No public or default export permission.','publicDistribution':'deny'},'conversionStatus':'not-started'}
    if 'pdfinfo' in s:
        record['pdfPageCount']=int(re.search(r'^Pages:\s+(\d+)',s['pdfinfo'],re.M)[1]); record['encrypted']=False
    else:
        record['originalLineCount']=len(p.read_bytes().splitlines()); assert record['originalLineCount']==s['lineCount']
        record['lectureMapping']='unverified: filename week number does not establish lecture mapping'
    records.append(record)
assert len(records)==13 and len({s['id'] for s in records})==13
(OUT/'inventory.json').write_text(json.dumps({'status':'provisional; not frozen production schema','sources':records,'missingCompanions':[{'id':'gap-transcript-week-4','status':'not-supplied'},{'id':'gap-seminar-3-solutions','status':'not-supplied'},{'id':'gap-syllabus','status':'not-supplied'}]},indent=2)+'\n')
account=[]
for sid in ['lecture-3','seminar-2-problems']:
    s=next(x for x in records if x['id']==sid); src=ROOT/s['originalPath']; dest=OUT/sid
    (dest/'pages').mkdir(parents=True,exist_ok=True); (dest/'assets').mkdir(exist_ok=True)
    full=run([TOOLS/'pdftotext','-layout','-enc','UTF-8',src,'-'])
    (dest/'extracted-layout.txt').write_bytes(full)
    pages=full.decode('utf-8').split('\f')
    assert pages[-1].strip()=='',sid
    pages=pages[:-1]; assert len(pages)==s['pdfPageCount'],(sid,len(pages))
    run([TOOLS/'pdftoppm','-r','120','-png',src,dest/'assets/page'])
    images=sorted((dest/'assets').glob('page-*.png')); assert len(images)==len(pages)
    for n,txt in enumerate(pages,1):
        pid=f'{sid}-pdfPage-{n:03d}'; image=next(x for x in images if int(x.stem.split('-')[-1])==n)
        md=dest/'pages'/f'{pid}.md'
        # Longer fence preserves source backticks if ever present; body remains full verbatim layout text.
        fence='`'*max(3,max((len(m[0])+1 for m in re.finditer(r'`+',txt)),default=0))
        md.write_text(f'# {sid}: physical PDF page {n}\n\n<a id="{pid}"></a>\n\n- Source ID: `{sid}`\n- Original: `{s["originalPath"]}`\n- Original SHA-256: `{s["sha256"]}`\n- Locator: `pdfPage:{n}` (physical page; not printed slide numbering)\n- Fidelity status: raw layout extraction; independent visual QA pending. Equations, glyphs and diagrams are not certified by extraction success.\n\n![Original physical PDF page {n}; visual evidence, not an accessible textual transcription](../assets/{image.name})\n\n## Uncorrected layout extraction\n\n{fence}text\n{txt}{fence}\n',encoding='utf-8')
        account.append({'id':pid,'sourceId':sid,'pdfPage':n,'markdownPath':str(md.relative_to(ROOT)),'imagePath':str(image.relative_to(ROOT)),'extractedCharacterCount':len(txt),'extractedTextSha256':hashlib.sha256(txt.encode()).hexdigest(),'markdownSha256':sha(md),'imageSha256':sha(image),'disposition':'extracted-with-visual-evidence','visualQa':'pending-independent-review','substantiveUnitAccounting':'pending-content-inspection','issues':['Layout text may flatten mathematical notation or omit graphical information; use original page image.']})
    s['conversionStatus']='pilot-extracted-not-independently-verified'
(OUT/'page-accounting.json').write_text(json.dumps({'status':'provisional; page count is not teaching completeness','pages':account},indent=2)+'\n')
(OUT/'inventory.json').write_text(json.dumps({'status':'provisional; not frozen production schema','sources':records,'missingCompanions':[{'id':'gap-transcript-week-4','status':'not-supplied'},{'id':'gap-seminar-3-solutions','status':'not-supplied'},{'id':'gap-syllabus','status':'not-supplied'}]},indent=2)+'\n')
checks={'originalsUnchanged':all(sha(ROOT/s['path'])==s['sha256'] for s in pre),'sourceCount':len(records),'extractedPages':len(account),'allAssetsExist':all((ROOT/p['imagePath']).is_file() and (ROOT/p['markdownPath']).is_file() for p in account),'uniquePageIds':len({p['id'] for p in account})==len(account),'independentVisualQa':'pending'}
assert checks['originalsUnchanged'] and checks['allAssetsExist'] and checks['uniquePageIds'] and checks['extractedPages']==43
(OUT/'checks.json').write_text(json.dumps(checks,indent=2)+'\n')
(OUT/'commands.json').write_text(json.dumps(log,indent=2)+'\n')
print(json.dumps(checks,indent=2))
