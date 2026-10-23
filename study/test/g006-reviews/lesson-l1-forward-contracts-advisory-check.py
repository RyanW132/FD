"""Read-only mechanical reproduction of the separately authored L1 advisory.

Does not grant approval or regenerate hashes after changed reviewed bytes.
Run from repository root. Human visual/semantic evidence remains in the report.
"""
import hashlib
import json
import re
from decimal import Decimal as D
from pathlib import Path

ROOT = Path.cwd()
LESSON = 'study/wiki/lessons/lesson-l1-forward-contracts.md'
FRAGMENT = '.omx/drafts/g006-lecture-1-fragment.md'


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def embedded(path):
    return json.loads(re.search(r'```json\s*([\s\S]*?)```', Path(path).read_text())[1])


def anchors(text):
    return re.findall(r'<a id="([^"]+)"></a>', text)


assert digest(LESSON) == '918a3efcde1a6b7db1795836e9508a873355aecfadb9a618afe8675606dd15fc'
assert digest(FRAGMENT) == 'd5854c0dd015c248df586d59bcd4635ae0c8a323f90d65c6884ec6fda139adf4'
text = Path(LESSON).read_text()
aa = anchors(text)
assert len(aa) == len(set(aa)) == 32
links = re.findall(r'(?<!!)\[[^\]]*\]\(([^)]+)\)', text)
assert len(links) == 26
for link in links:
    file, _, anchor = link.partition('#')
    target = ((Path(LESSON).parent / file) if file else Path(LESSON)).resolve()
    assert target.is_relative_to(ROOT) and target.is_file(), link
    if anchor:
        assert anchors(target.read_text()).count(anchor) == 1, link

fragment = embedded(FRAGMENT)
records = fragment['records']
lesson = records['lessons']['lesson-l1-forward-contracts']
units = json.loads(Path('study/sources/units.json').read_text())['units']
expected = {k for k, u in units.items() if u['sourceId'] == 'lecture-1'
            and u['locator'].get('pdfPage') in [20, 21, 22]
            and u['classification'] == 'substantive'}
assert len(expected) == 9
assert set(lesson['sourceUnitIds']) == expected
assert {m['unitId'] for m in fragment['unitTeachingMatrix']} == expected
plan = embedded('.omx/plans/g006-curriculum-decomposition.md')
planned = next(x for x in plan['lessons'] if x['id'] == lesson['id'])
assert set(planned['sourceUnitIds']) == expected
for m in fragment['unitTeachingMatrix']:
    u = units[m['unitId']]
    assert u['status'] == 'verified' and not u['issueIds']
    assert m['locator'] == u['locator'] and m['extractionRef'] == u['extractionRef']
    assert digest(u['extractionRef']['path']) == u['contentHash']
    assert m['teachingRef']['anchor'] in aa
    assert m['outcomeIds'] and m['exerciseIds']
    for eid in m['exerciseIds']:
        assert set(records['exercises'][eid]['outcomeIds']) & set(m['outcomeIds'])

pairs = []
for eid, e in records['exercises'].items():
    p, a = e['promptRef']['anchor'], e['answerRef']['anchor']
    assert p != a and p in aa and a in aa
    assert text.index(f'<a id="{p}">') < text.index(f'<a id="{a}">')
    for oid in e['outcomeIds']:
        assert eid in records['outcomes'][oid]['exerciseIds']
    pairs.append((p, a))
assert len(pairs) == len(set(pairs)) == 7
for oid, o in records['outcomes'].items():
    assert o['lessonIds'] == [lesson['id']]
    for eid in o['exerciseIds']:
        assert oid in records['exercises'][eid]['outcomeIds']

# Fresh calculations from signed delivery legs, not imported author answers.
numeric = []
for c in fragment['numericInventory']:
    x = c['inputs']
    q, s, k = [D(str(x[n])) for n in ['quantity', 'maturitySpot', 'deliveryPrice']]
    received, paid = q * s, -(q * k)
    short_cash, short_asset = q * k, -(q * s)
    calculated = dict(longAssetValue=received, longPayment=paid,
                      longPayoff=received + paid, shortPayoff=short_cash + short_asset,
                      sum=received + paid + short_cash + short_asset)
    assert all(D(str(c['expected'][k])) == v for k, v in calculated.items()), c['id']
    numeric.append(dict(id=c['id'], anchor=c['ref']['anchor'], inputs=x,
                        independentlyCalculated={k: str(v) for k, v in calculated.items()}))
assert len(numeric) == 15
# Test the printed source table cells directly, not only its sidecar inventory.
rows = re.findall(r'^\| £(\d+) \| ([+−]?£\d+) \| ([+−]?£\d+) \| ([+−]?£\d+) \|$', text, re.M)
assert len(rows) == 3
money = lambda s: D(s.replace('£', '').replace('−', '-'))
for spot, asset, cash, payoff in rows:
    assert money(asset) == D(spot) and money(cash) == -105
    assert money(payoff) == money(asset) + money(cash)
# Printed transfer-table operations and results, all three rows and both sides.
transfer = re.findall(r'^\| (\d+) \| (\d+) − (\d+) = ([+−]?\d+) \| (\d+) − (\d+) = ([+−]?\d+) \| (\d+) \|$', text, re.M)
assert len(transfer) == 3
for s, a, b, r, c, d, t, z in transfer:
    assert D(a) == D(s) and D(b) == D(c) == 100 and D(d) == D(s)
    assert D(a)-D(b) == money(r) and D(c)-D(d) == money(t)
    assert money(r)+money(t) == D(z) == 0
# Additional assertions independently checked while reading every answer.
assert D(105)-D(100) == 5
assert D(60)-D(70) == -10  # qualitative exercise 2 price comparison
assert D(4)*D(92) == 368 and D(4)*D(105) == 420
assert D(92)-D(105) == -13 and D(368)-D(420) == -52
# Includes negative-price stress: no universal nonnegative-price bound inferred.
for s in map(D, ['-20', '0', '80', '105', '130']):
    for k in map(D, ['-5', '0', '105']):
        for q in map(D, ['1', '4']):
            assert q*s-q*k == q*(s-k)
            assert q*k-q*s == q*(k-s)
            assert q*(s-k)+q*(k-s) == 0
        assert ((s+1)-k)-(s-k) == 1
        assert (k-(s+1))-(k-s) == -1

manifest = json.loads(Path('study/sources/manifest.json').read_text())
source = manifest['sources']['lecture-1']
assert source['access'] == 'permitted' and source['exposure']['agent'] == 'allow'
assert digest(source['originalPath']) == source['sha256']
assert Path(source['originalPath']).stat().st_size == source['byteLength']
qa_path = 'study/sources/qa-reviews/lecture-1.json'
qa = json.loads(Path(qa_path).read_text())
assert qa['sourceHash'] == source['sha256'] and qa['verdict'] == 'approved'
assert digest(qa['draftPath']) == qa['draftHash']
ing_path = 'study/sources/extracted/lecture-1/ingestion.json'
ing = json.loads(Path(ing_path).read_text())
assert ing['sourceHash'] == source['sha256']
membership = {x['path']: x for x in ing['membership']}
bindings = []
for p in [20, 21, 22]:
    row = next(x for x in qa['pages'] if x['pdfPage'] == p)
    assert row['verdict'] == 'approved' and row['allRegionsAccounted']
    for folder, ext, key in [('assets', 'png', 'imageHash'), ('extracted', 'md', 'rawHash'), ('annotated', 'md', 'normalizedHash')]:
        path = f'study/sources/{folder}/lecture-1/page-{p:03}.{ext}'
        h = digest(path)
        assert h == row[key]
        if folder != 'annotated':
            assert h == membership[path]['sha256']
            assert Path(path).stat().st_size == membership[path]['byteLength']
        bindings.append(path)

golden_path = 'study/test/financial-golden-fixtures.json'
golden = json.loads(Path(golden_path).read_text())
selected = [c for c in golden['cases'] if c['id'] in fragment['goldenCaseIds']]
assert len(selected) == 6
for c in selected:
    x = c['inputs']
    value = D(str(x['quantity']))*(D(str(x['spot']))-D(str(x['strike'])))
    if x['side'] == 'short':
        value = -value
    assert value == D(str(c['expected']))

paths = [LESSON, FRAGMENT, '.omx/drafts/g006-l1-prototype-report.md',
         '.omx/plans/g006-curriculum-decomposition.md', 'study/sources/manifest.json',
         'study/sources/units.json', source['originalPath'], qa_path, qa['draftPath'],
         ing_path, golden_path, 'study/test/financial-golden.test.mjs', *bindings]
hashes = [{'path': p, 'sha256': digest(p), 'bytes': Path(p).stat().st_size} for p in paths]
advisory = Path('study/test/g006-reviews/lesson-l1-forward-contracts-advisory.json')
if advisory.exists():
    prior = json.loads(advisory.read_text())
    for h in prior['inputHashes']:
        assert digest(h['path']) == h['sha256'], f"Review stale: {h['path']}"
print(json.dumps({'ok': True, 'anchors': len(aa), 'localLinks': len(links),
                  'units': len(expected), 'outcomes': len(records['outcomes']),
                  'promptAnswerPairs': len(pairs), 'numericCases': numeric,
                  'sourceTableRows': len(rows), 'transferTableRows': len(transfer),
                  'goldenConstants': 6, 'inputHashes': hashes}, indent=2))
