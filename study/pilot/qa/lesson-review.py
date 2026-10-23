"""Independent G001 pilot lesson checks; no source/lesson mutation."""
from pathlib import Path
from decimal import Decimal, getcontext
from hashlib import sha256
import json, re
from datetime import datetime, timezone

getcontext().prec = 50
D = Decimal
root = Path(__file__).resolve().parents[3]
lesson = root/'study/pilot/lessons/pilot-compounding-discounting.md'
metadata = lesson.with_suffix('.metadata.json')
text = lesson.read_text()
meta = json.loads(metadata.read_text())
checks = []
def check(name, condition, actual=None, expected=None):
    checks.append({'name': name, 'pass': bool(condition), 'actual': actual, 'expected': expected})
def number(name, value, expected, tolerance='1e-10'):
    expected = D(str(expected))
    check(name, abs(value-expected) <= D(tolerance), str(value), str(expected))

a, semi = D(100)*(1+D('.1')), D(100)*(1+D('.1')/2)**2
number('page6 annual balance', a, '110')
number('page6 semiannual balance', semi, '110.25')
number('page6 continuous rounded balance', (D(100)*D('.1').exp()).quantize(D('.01')), '110.52')
for m, expected in [(1,'110.00'),(2,'110.25'),(4,'110.38'),(12,'110.47'),(365,'110.52')]:
    value = D(100)*(1+D('.1')/m)**m
    number(f'page8 m={m} rounded balance', value.quantize(D('.01')), expected)
number('quarterly growth factor', (1+D('.08')/4)**8, '1.1716593810022657')
quarterly = 1000*(1+D('.08')/4)**8
number('quarterly future value', quarterly, '1171.6593810022657')
number('quarterly reverse exact', quarterly/(1+D('.08')/4)**8, '1000')
number('quarterly reverse rounded within one cent', D('1171.66')/(1+D('.08')/4)**8, '1000', '.01')
number('10% semiannual effective', (1+D('.1')/2)**2-1, '.1025')
number('continuous discount factor', D('-.1').exp(), '.9048374180359595')
number('continuous growth factor', D('.1').exp(), '1.1051709180756477')
pv = 1000*D('-.1').exp()
number('continuous example PV', pv, '904.8374180359596')
number('continuous example roundtrip', pv*D('.1').exp(), '1000')
number('annual-convention comparison PV', 1000/(1+D('.05'))**2, '907.0294784580499')
number('exercise1 annual rate', D(6)/100, '.06')
number('exercise1 per-period rate', D('.06')/2, '.03')
number('exercise1 years', D(18)/12, '1.5')
number('exercise1 periods', D(18)/12*2, '3')
factor = (1+D('.06')/2)**4
number('exercise2 growth factor', factor, '1.12550881')
number('exercise2 FV', 200*factor, '225.101762')
number('exercise2 reverse', 200*factor/factor, '200')
number('exercise3 effective annual', (1+D('.06')/2)**2-1, '.0609')
number('exercise4 discount factor', D('-.02').exp(), '.9801986733067553')
number('exercise4 PV', 500*D('-.02').exp(), '490.09933665337764')
number('exercise4 reverse', 500*D('-.02').exp()*D('.02').exp(), '500')
number('zero rate discount factor', D(0).exp(), '1')
number('zero time discount factor', (D('.05')*0).exp(), '1')
check('positive rate/time discount factor between 0 and 1', 0<D('-.1').exp()<1)
check('negative rate positive time discount factor exceeds 1', D('.1').exp()>1)
check('discrete and continuous identical numeric rate not conflated', pv < 1000/(1+D('.05'))**2)

refs = []
def walk(x):
    if isinstance(x,dict):
        if x.get('kind')=='markdown': refs.append(x)
        for v in x.values(): walk(v)
    elif isinstance(x,list):
        for v in x: walk(v)
walk(meta)
for ref in refs:
    path = root/ref['path']
    data = path.read_text() if path.exists() else ''
    anchor = f'<a id="{ref["anchor"]}"></a>'
    check('metadata ref '+ref['anchor'], path.is_file() and data.count(anchor)==1)
    if ref['anchor'].startswith(('exercise-','answer-')):
        body = data.split(anchor)[1].split('<a id=',1)[0].strip() if anchor in data else ''
        check('nonempty prompt/answer '+ref['anchor'], len(body)>50)
for href in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)',text):
    base, _, anchor = href.partition('#')
    path = (lesson.parent/base).resolve() if base else lesson
    exists = path.is_file()
    anchors_ok = not anchor or (exists and path.read_text().count(f'<a id="{anchor}"></a>')==1)
    check('lesson link '+href, exists and anchors_ok)

outcomes = {x['id']:x for x in meta['outcomes']}
exercises = {x['id']:x for x in meta['exercises']}
check('unique outcome ids', len(outcomes)==len(meta['outcomes'])==4)
check('unique exercise ids', len(exercises)==len(meta['exercises'])==4)
check('lesson stable id resolves', meta['lessonId']=='pilot-compounding-discounting' and text.count(f'<a id="{meta["lessonId"]}"></a>')==1)
for oid, outcome in outcomes.items():
    check('outcome present in lesson '+oid, f'`{oid}`' in text)
    check('outcome criterion/evidence '+oid, bool(outcome['successCriterion'] and outcome['evidenceRefs']))
    check('outcome reciprocal exercises '+oid, bool(outcome['exerciseIds']) and all(eid in exercises and oid in exercises[eid]['outcomeIds'] for eid in outcome['exerciseIds']))
for eid, exercise in exercises.items():
    check('exercise reciprocal outcomes '+eid, bool(exercise['outcomeIds']) and all(oid in outcomes and eid in outcomes[oid]['exerciseIds'] for oid in exercise['outcomeIds']))
    check('exercise supplement label '+eid, exercise['origin']=='supplemental-agent-authored')
check('teachback mappings exist', all(oid in outcomes for oid in meta['teachBack']['outcomeIds']))
check('correct exact physical pages', meta['sourcePhysicalPages']==[3,6,7,8,9])
check('metadata honestly provisional', meta['readiness']=='provisional-awaiting-independent-review' and meta['review']['independentReviewStatus']=='pending' and meta['review']['scores'] is None)
check('lesson honestly provisional', 'PROVISIONAL PILOT' in text and 'not coverage of all 41 lecture pages' in text)
check('does not copy known page11 error', '10.15' not in text and '9.894667' not in text)

paths = [lesson,metadata,lesson.parent/'AUTHOR-NOTES.md',root/'context/lecture slides/Lecture 3 Interest rates and bonds.pdf',root/'.omx/plans/test-spec-fd-study-helper.md',root/'.omx/ultragoal/brief.md']
for p in [3,6,7,8,9]:
    paths += [root/f'study/pilot/lecture-3/pages/lecture-3-pdfPage-{p:03}.md',root/f'study/pilot/lecture-3/assets/page-{p:02}.png']
hashes = {str(p.relative_to(root)):sha256(p.read_bytes()).hexdigest() for p in paths}
check('original source equals declared hash', hashes['context/lecture slides/Lecture 3 Interest rates and bonds.pdf']=='df4aabe19a4bf757759406b1a8b4c95f4ab1656361d68456c6c2fdacf5ab047e')
check('test-spec equals approved digest', hashes['.omx/plans/test-spec-fd-study-helper.md']=='de12b1ecf2c8df006bc73e9645e3822c39a9b4afb2e69ed763d0f9de03e5e762')
report = {'reviewer':'independent native verifier /root/g001_lesson_review','timeUtc':datetime.now(timezone.utc).isoformat(),'scope':'Only provisional compounding/discounting pilot; not production readiness, learner mastery or whole-lecture coverage.','automatedChecksVerdict':'PASS' if all(x['pass'] for x in checks) else 'BLOCKED','checkCount':len(checks),'failures':[x for x in checks if not x['pass']],'checks':checks,'hashes':hashes,'visualEvidenceInspected':[f'study/pilot/lecture-3/assets/page-{p:02}.png' for p in [3,6,7,8,9]],'method':'Independent manual source/rubric review plus Python Decimal precision 50 numerical checks, link/anchor/reference and reciprocal mapping checks. Automated checks alone are not the eight-dimension teaching review.'}
output = root/'study/pilot/qa/lesson-review.checks.json'
output.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'verdict':report['automatedChecksVerdict'],'checks':len(checks),'failures':report['failures'],'output':str(output.relative_to(root)),'numericalChecks':[x for x in checks if x['expected'] is not None],'hashes':hashes},indent=2))
raise SystemExit(0 if not report['failures'] else 1)
