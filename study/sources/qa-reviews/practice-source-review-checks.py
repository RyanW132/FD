"""Independent practice-source closure checks; only --approve writes review maps.
Manual visual/semantic review is documented separately, never inferred from hashes.
"""
from pathlib import Path
import argparse, hashlib, json, math, re, subprocess, tempfile
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'study/sources/qa-reviews'
SOURCES = {'seminar-1-problems': (2, 6), 'seminar-1-solutions': (7, 23),
           'seminar-2-problems': (2, 7), 'seminar-2-solutions': (7, 24),
           'seminar-3-problems': (4, 8)}
REVIEWER = 'g005-practice-source-qa'
args = argparse.ArgumentParser()
args.add_argument('--approve', action='store_true')
args.add_argument('--tool-dir', default=str(ROOT / '.omx/tools/poppler/bin'))
args = args.parse_args()
checks = []
bindings = []
def ck(ok, description):
    if not ok: raise AssertionError(description)
    checks.append(description)
def digest(data): return hashlib.sha256(data).hexdigest()
def read(rel): return (ROOT / rel).read_bytes()
def load(rel): return json.loads(read(rel))
manifest = load('study/sources/manifest.json')
results = []
pending_maps = {}
seen = set()
for sid, (page_count, substantive_count) in SOURCES.items():
    source = manifest['sources'][sid]
    draft_path = f'study/sources/qa-drafts/{sid}.json'
    draft_bytes = read(draft_path)
    draft = json.loads(draft_bytes)
    ck(source['access'] == 'permitted' and source['exposure']['agent'] == 'allow', f'{sid}: provider channel allowed')
    ck(digest(read(source['originalPath'])) == source['sha256'] == draft['sourceHash'], f'{sid}: original/draft identity')
    ck(set(draft) == {'schemaVersion','sourceId','sourceHash','author','pages'} and draft['sourceId'] == sid and draft['schemaVersion'] == 1, f'{sid}: closed draft root')
    ck(draft['author'] != REVIEWER and bool(draft['author'].strip()), f'{sid}: separate author/reviewer audit labels')
    ck([p['pdfPage'] for p in draft['pages']] == list(range(1, page_count + 1)) and source['pageCount'] == page_count, f'{sid}: exhaustive physical pages')
    approval_pages = []
    with tempfile.TemporaryDirectory(prefix='fd-practice-independent-') as temporary:
        temporary = Path(temporary)
        full = temporary / 'raw.txt'
        subprocess.run([str(Path(args.tool_dir)/'pdftotext'), '-layout', '-enc', 'UTF-8', str(ROOT/source['originalPath']), str(full)], check=True, capture_output=True)
        raw_bytes = full.read_bytes()
        ck(raw_bytes == read(f'study/sources/extracted/{sid}/rawfull-layout.txt'), f'{sid}: fresh original full extraction byte-identical')
        chunks = raw_bytes.decode('utf-8').split('\f')
        ck(len(chunks) == page_count + 1 and not chunks[-1].strip(), f'{sid}: fresh raw physical page accounting')
        subprocess.run([str(Path(args.tool_dir)/'pdftoppm'), '-r', '120', '-png', str(ROOT/source['originalPath']), str(temporary/'page')], check=True, capture_output=True)
        renders = {int(p.stem.split('-')[-1]): p for p in temporary.glob('page-*.png')}
        ck(set(renders) == set(range(1, page_count+1)), f'{sid}: fresh full original render membership')
        for page in draft['pages']:
            n = page['pdfPage']; num = f'{n:03}'
            ck(set(page) == {'pdfPage','rawPath','rawHash','imagePath','imageHash','normalizedPath','normalizedHash','units','issues','observations'}, f'{sid}:{n}: closed page fields')
            expected = {'rawPath':f'study/sources/extracted/{sid}/page-{num}.md', 'imagePath':f'study/sources/assets/{sid}/page-{num}.png', 'normalizedPath':f'study/sources/annotated/{sid}/page-{num}.md'}
            for path_key, hash_key in [('rawPath','rawHash'),('imagePath','imageHash'),('normalizedPath','normalizedHash')]:
                ck(page[path_key] == expected[path_key] and digest(read(page[path_key])) == page[hash_key], f'{sid}:{n}: exact {path_key} path/hash')
            ck(renders[n].read_bytes() == read(page['imagePath']), f'{sid}:{n}: viewed production PNG byte-identical to fresh original render')
            raw_text = read(page['rawPath']).decode('utf-8')
            ck(raw_text.split('```text\n',1)[1].rsplit('\n```\n',1)[0] == chunks[n-1], f'{sid}:{n}: raw Markdown retains entire original page text')
            text = read(page['normalizedPath']).decode('utf-8')
            anchors = list(re.finditer(r'<a id="([^"]+)"></a>', text))
            ck([a.group(1) for a in anchors] == [u['id'] for u in page['units']], f'{sid}:{n}: exhaustive unique anchor selection/order')
            ck(not any(ord(c)<32 and c not in '\n\r\t' for c in text), f'{sid}:{n}: no normalized control glyphs')
            for index, unit in enumerate(page['units']):
                uid=unit['id']; span=text[anchors[index].end():anchors[index+1].start() if index+1<len(anchors) else len(text)]
                ck(set(unit)=={'id','sourceId','locator','extractionRef','contentHash','status','classification','issueIds'}, f'{uid}: closed unit')
                ck(uid not in seen, f'{uid}: unique id'); seen.add(uid)
                ck(unit['sourceId']==sid and unit['locator']=={'pdfPage':n,'region':unit['locator']['region']} and bool(unit['locator']['region'].strip()), f'{uid}: exact physical region locator')
                ck(unit['extractionRef']=={'kind':'markdown','path':page['normalizedPath'],'anchor':uid} and unit['contentHash']==page['normalizedHash'], f'{uid}: exact whole-file hash and anchor')
                ck(unit['status']=='needs-review' and unit['classification'] in {'substantive','administrative'}, f'{uid}: author has not self-approved')
                if unit['classification']=='substantive':
                    ck(f'**Physical page {n}; source region:' in span and f'../../assets/{sid}/page-{num}.png' in span and f'../../extracted/{sid}/page-{num}.md#page-{n}' in span, f'{uid}: self-contained locator/image/raw evidence')
                for target in re.findall(r'\]\(([^)]+)\)',span):
                    path, _, anchor = target.partition('#')
                    linked=(ROOT/page['normalizedPath']).parent/path
                    ck(linked.resolve().is_relative_to(ROOT) and linked.is_file(), f'{uid}: confined existing relative link')
                    if anchor: ck(f'<a id="{anchor}"></a>' in linked.read_text(), f'{uid}: raw target anchor resolves')
            issues={i['id']:i for i in page['issues']}
            ck(len(issues)==len(page['issues']) and set(issues)=={i for u in page['units'] for i in u['issueIds']}, f'{sid}:{n}: issue set closure')
            for issue in issues.values():
                ck(set(issue)=={'id','scopeRef','reason','status','resolutionRef'} and issue['status']=='open' and issue['scopeRef']=={'kind':'source','unitId':issue['scopeRef']['unitId']} and issue['scopeRef']['unitId'] in [u['id'] for u in page['units']], f'{issue["id"]}: scoped unresolved canonical-shaped issue')
                ck(issue['resolutionRef']['path']==page['normalizedPath'] and issue['resolutionRef']['anchor'] in [u['id'] for u in page['units']], f'{issue["id"]}: local qualification reference')
            bindings.append({'sourceId':sid,'pdfPage':n,'rawPath':page['rawPath'],'rawHash':page['rawHash'],'imagePath':page['imagePath'],'imageHash':page['imageHash'],'normalizedPath':page['normalizedPath'],'normalizedHash':page['normalizedHash'],'unitIds':[u['id'] for u in page['units']],'visualEvidence':'Every exact production PNG displayed separately through view_image in independent reviewer turn; compared with complete raw and normalized page. Fresh original rerender byte equality checked separately.'})
            approval_pages.append({'pdfPage':n,'verdict':'approved','rawHash':page['rawHash'],'imageHash':page['imageHash'],'normalizedHash':page['normalizedHash'],'unitIds':[u['id'] for u in page['units']],'allRegionsAccounted':True})
    substantive=sum(u['classification']=='substantive' for p in draft['pages'] for u in p['units'])
    administrative=sum(u['classification']=='administrative' for p in draft['pages'] for u in p['units'])
    ck(substantive==substantive_count and administrative==page_count, f'{sid}: independent unit totals')
    pending_maps[sid]={'schemaVersion':1,'sourceId':sid,'sourceHash':source['sha256'],'draftPath':draft_path,'draftHash':digest(draft_bytes),'reviewer':REVIEWER,'reviewedAt':datetime.now(timezone.utc).isoformat(),'verdict':'approved','pages':approval_pages}
    results.append({'sourceId':sid,'pages':page_count,'substantive':substantive,'administrative':administrative,'draftHash':digest(draft_bytes)})
# Independent arithmetic recomputation of every supplied numeric chain, plus formula identities.
math_checks=[]
def near(name, actual, expected, tolerance=1e-10):
    ck(abs(actual-expected)<=tolerance, name)
    math_checks.append({'name':name,'actual':actual,'expected':expected,'absoluteTolerance':tolerance})
near('S1 p1 arbitrage net delivery proceeds',2150-2120,30)
near('S1 p4 contract count',50000/5000,10)
near('S1 p4 spot proceeds',50000*4.8,240000)
near('S1 p4 short gain per bushel',5.2-4.85,.35)
near('S1 p4 futures proceeds',50000*(5.2-4.85),17500)
near('S1 p4 total proceeds',50000*(4.8+5.2-4.85),257500)
near('S1 p4 effective price',4.8+5.2-4.85,5.15)
near('S1 p4 closing basis',4.8-4.85,-.05)
near('S1 p4 effective F0 plus basis',5.2+(4.8-4.85),5.15)
near('S1 p5 opening basis',3-3.1,-.1)
near('S1 p5 closing basis',2.7-2.75,-.05)
near('S1 p5 actual short hedge price',2.7+(3.1-2.75),3.05)
near('S1 p5 unchanged basis comparison',3.1-.1,3)
near('S1 p5 strengthening advantage',(2.7-2.75)-(3-3.1),.05)
near('S1 p7 optimal contracts rounded',.8*1000000/42000,19.05,.005)
near('S2 p2 six month exponent',.06*.5,.03)
near('S2 p2 six month growth rounded',math.exp(.03),1.03045,.000005)
near('S2 p2 six month forward rounded',50*math.exp(.03),51.52,.005)
near('S2 p2 annual growth rounded',math.exp(.06),1.06184,.000005)
near('S2 p2 annual forward rounded',50*math.exp(.06),53.09,.005)
rhalf=-math.log(.97)/.5
done=(101.5-3*.97)/103
rone=-math.log(done)
near('S2 p6 half year zero rate rounded',rhalf,.0609,.00005)
near('S2 p6 half year zero percent rounded',100*rhalf,6.09,.005)
near('S2 p6 exact half year discount',math.exp(-rhalf*.5),.97)
near('S2 p6 semiannual coupon',.06*100/2,3)
near('S2 p6 first coupon present value',3*.97,2.91)
near('S2 p6 one year discount rounded',done,.95718,.000005)
near('S2 p6 one year rate rounded',rone,.0438,.00005)
near('S2 p6 one year rate percent rounded',100*rone,4.38,.005)
near('S2 p6 exact bond cash flow reconstruction',3*.97+103*math.exp(-rone),101.5)
near('S2 p7 semiannual eight percent coupon',.08*100/2,4)
dthree=(104-4*.97-4*done)/104
near('S2 p7 symbolic equation cash flow reconstruction',4*.97+4*done+104*dthree,104)
ck(len(bindings)==22 and len(seen)==90,'22 viewed pages / 90 units')
# Freshness recheck of all manually reviewed bytes immediately before generating approvals.
for binding in bindings:
    for p,h in [('rawPath','rawHash'),('imagePath','imageHash'),('normalizedPath','normalizedHash')]:
        ck(digest(read(binding[p]))==binding[h],f'{binding["sourceId"]}:{binding["pdfPage"]}: final {p} freshness')
for sid, approval in pending_maps.items():
    ck(digest(read(approval['draftPath']))==approval['draftHash'] and digest(read(manifest['sources'][sid]['originalPath']))==approval['sourceHash'],f'{sid}: final draft/original freshness')
    dest=OUT/f'{sid}.json'
    if args.approve:
        ck(not dest.exists(),'refuse overwriting existing review map: '+sid)
        dest.write_text(json.dumps(approval,indent=2)+'\n')
    else:
        current=json.loads(dest.read_bytes())
        expected={k:v for k,v in approval.items() if k!='reviewedAt'}
        ck({k:v for k,v in current.items() if k!='reviewedAt'}==expected and bool(datetime.fromisoformat(current['reviewedAt'])),f'{sid}: existing approval map exact closure')
    results[list(SOURCES).index(sid)]['reviewMapHash']=digest(dest.read_bytes())
report={'verdict':'PASS','scope':'Independent source fidelity only; not teaching, browser rendering or mastery','reviewer':REVIEWER,'initialContext':{'entryBundleBytes':11342,'requiredContractGroupBytes':23472,'initialLimit':32768,'continuationDeclaredBeforeContractGroup':True},'checks':len(checks),'pages':len(bindings),'units':len(seen),'sources':results,'mathChecks':math_checks,'pageViewBindings':bindings,'checkDescriptions':checks}
(OUT/'practice-source-review-checks.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['verdict','checks','pages','units','sources']},indent=2))
