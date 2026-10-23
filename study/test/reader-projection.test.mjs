import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { captureProject } from '../lib/capture.mjs';
import { selectPublication } from '../lib/policy.mjs';
import { validateCapturedProject, exposureDigest } from '../lib/contracts.mjs';
import { sourceQARevision } from '../lib/source-qa.mjs';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { teachingFixture, teachingRecords, digest, markdown } from './fixtures/publication/helpers.mjs';
const json=value=>Buffer.from(JSON.stringify(value));
const pagePath='study/sources/annotated/reference-page/page-001.md';
const pageHref='../sources/annotated/reference-page/page-001.md';
const lesson=`<a id="lesson"></a>\nDetailed synthetic lesson.\n[Concept](../concepts/one.md#concept) [Whole](../concepts/one.md) [Self](#lesson)\n[Prompt](../exercises/one.md#prompt) [Bare exercise](../exercises/one.md)\n[Page](${pageHref}) [First](${pageHref}#first) [Denied](${pageHref}#middle)\n[Raw](../sources/extracted/reference-page/page-001.md) [Private](../PRIVATE/hidden.md) [Missing](missing.md)\n[Original figure](../assets/figure.png) [Unrelated figure](../assets/unrelated.png) [Unowned same bytes](../assets/alias.png)\n- **Nested [concept](../concepts/one.md#concept)**\n\n\`[fake](code-only.md)\`\n\n\`\`\`md\n[phantom](fenced-only.md)\n<a id="not-real"></a>\n\`\`\`\n`;
async function richFixture(t,{draft=false,channel='browser',deny=false}={}){
  const records=teachingRecords();
  const extraction='<a id="unit-one"></a>\nPublic definition.\n![source diagram](../assets/figure.png)\n';
  for(const unit of Object.values(records.units.units))unit.contentHash=digest(extraction);
  if(deny)for(const source of Object.values(records.manifest.sources))source.exposure.browser='deny';
  const source={...structuredClone(records.manifest.sources['lecture-one']),id:'reference-page',kind:'seminar',exposure:{browser:'deny',agent:'allow',export:'deny'}};
  records.manifest.sources[source.id]=source;
  const normalized='HEADER NOT SELECTED\n<a id="first"></a>\nIdentical visible text.\n<a id="middle"></a>\nOMITTED INTERMEDIATE\n<a id="last"></a>\nIdentical visible text.\n';
  const units=[['z-first','first'],['z-first-alias','first'],['m-denied','middle'],['a-last','last']].map(([id,anchor])=>({id,sourceId:source.id,locator:{pdfPage:1,region:anchor},extractionRef:markdown(pagePath,anchor),contentHash:digest(normalized),status:'verified',classification:'substantive',issueIds:[]}));
  for(const unit of units){records.units.units[unit.id]=unit;records.coverage.coverage[unit.id]={unitId:unit.id,lessonIds:[],outcomeIds:[],disposition:'reference-only',reason:'Synthetic page evidence',reviewId:null};}
  records.units.pages['reference-page:1']={sourceId:source.id,pdfPage:1,status:'verified',unitIds:units.map(u=>u.id),issueIds:[]};
  const rawPath='study/sources/extracted/reference-page/page-001.md',imagePath='study/sources/assets/reference-page/page-001.png',draftPath='study/sources/qa-drafts/reference-page.json';
  const raw=Buffer.from('Synthetic raw page'),raster=Buffer.from('synthetic QA raster');
  const page={pdfPage:1,rawPath,rawHash:digest(raw),imagePath,imageHash:digest(raster),normalizedPath:pagePath,normalizedHash:digest(normalized),units:units.map(u=>({...u,status:'needs-review'})),issues:[]};
  const qaDraft=json({schemaVersion:1,sourceId:source.id,sourceHash:source.sha256,author:'Synthetic author',pages:[page]});
  const qaReview=json({schemaVersion:1,sourceId:source.id,sourceHash:source.sha256,draftPath,draftHash:digest(qaDraft),reviewer:'Separate synthetic reviewer',reviewedAt:'2026-10-22T00:00:00Z',verdict:'approved',pages:[{pdfPage:1,verdict:'approved',rawHash:page.rawHash,imageHash:page.imageHash,normalizedHash:page.normalizedHash,unitIds:units.map(u=>u.id),allRegionsAccounted:true}]});
  const report=json({sourceHash:source.sha256});source.derivedRevision=sourceQARevision(source.sha256,report,qaReview);
  const extra={'study/lessons/one.md':lesson,'study/extracted/lecture-one.md':extraction,'study/assets/figure.png':Buffer.from('synthetic source diagram'),'study/assets/unrelated.png':Buffer.from('unrelated raster'),'study/assets/alias.png':Buffer.from('synthetic source diagram'),[pagePath]:normalized,[rawPath]:raw,[imagePath]:raster,[draftPath]:qaDraft,'study/sources/qa-reviews/reference-page.json':qaReview,'study/sources/extracted/reference-page/ingestion.json':report};
  const {root}=await teachingFixture(t,records,extra);
  const review=records.reviews.reviews['review-one'];review.inputHashes.push({path:'study/assets/figure.png',sha256:digest(extra['study/assets/figure.png'])});await writeFile(`${root}/study/reviews.json`,json(records.reviews));
  const exception={id:'page-selection',sourceId:source.id,unitIds:['z-first','z-first-alias','a-last'],outputRefs:[markdown(pagePath,'first'),markdown(pagePath,'last')],channels:['browser'],approvedBy:'Synthetic approver',approvedAt:'2026-10-22T00:00:00Z',rationale:'Selected synthetic spans only',inputDigest:'0'.repeat(64)};
  exception.inputDigest=await exposureDigest(root,exception,records);records.exposureExceptions.exceptions[exception.id]=exception;await writeFile(`${root}/study/exposure-exceptions.json`,json(records.exposureExceptions));
  const capture=await captureProject(root);const validation=await validateCapturedProject(capture.readBytes);assert.equal(validation.ok,true,JSON.stringify(validation.errors));
  const selected=await selectPublication(capture,{channel,draft});
  const catalog={schemaVersion:1,inputDigest:capture.digest,draft,items:selected.items.map(item=>{const node=selected.metadata.nodes.find(n=>n.id===item.id&&n.type==='unit');return node?{...item,locator:node.locator,status:node.status}:item;})};
  return {root,records,capture,selected,context:{catalog,inputDigest:capture.digest,draft,files:selected.payloads}};
}

for(const draft of [false,true])test(`reader has complete deterministic selected teaching metadata (draft=${draft})`,async t=>{
  const {capture,selected,context}=await richFixture(t,{draft});const reader=selected.reader;assert.ok(reader);
  assert.deepEqual(Object.keys(reader).sort(),['schemaVersion','inputDigest','draft','documents','lessons','concepts','outcomes','exercises'].sort());assert.equal(reader.draft,draft);assert.equal(reader.inputDigest,capture.digest);
  assert.ok(reader.documents.length>4);assert.equal(reader.documents.length,selected.items.length);
  assert.deepEqual(reader.lessons,[{id:'lesson-one',order:1,outcomeIds:['outcome-one'],exerciseIds:['exercise-one']}]);
  assert.deepEqual(reader.concepts,[{id:'concept-one',order:0}]);
  assert.deepEqual(reader.outcomes,[{id:'outcome-one',action:'Calculate',conditions:'Given the synthetic inputs',successCriterion:'Give the stated answer',exerciseIds:['exercise-one']}]);
  assert.deepEqual(reader.exercises,[{id:'exercise-one',outcomeIds:['outcome-one'],promptDocumentId:'exercise-one-promptRef',answerDocumentId:'exercise-one-answerRef',origin:'source'}]);
  assert.deepEqual((await selectPublication(capture,{draft})).reader,reader);
  const {validateReader}=await import('../lib/reader.mjs');assert.equal(validateReader(reader,context),true);
});

test('supported published tokens resolve; code, raw, private, unknown and bare spans stay inert',async t=>{
  const {selected}=await richFixture(t);const doc=selected.reader.documents.find(d=>d.id==='lesson-one');
  assert.deepEqual(doc.anchors,['lesson']);const links=new Map(doc.links.map(link=>[link.href,link.target]));
  assert.deepEqual(links.get('../concepts/one.md#concept'),{kind:'document',documentId:'concept-one',anchor:'concept'});
  assert.deepEqual(links.get('../concepts/one.md'),{kind:'document',documentId:'concept-one',anchor:null});
  assert.deepEqual(links.get('../exercises/one.md#prompt'),{kind:'document',documentId:'exercise-one-promptRef',anchor:'prompt'});
  assert.deepEqual(links.get('#lesson'),{kind:'document',documentId:'lesson-one',anchor:'lesson'});
  for(const href of ['../exercises/one.md','../sources/extracted/reference-page/page-001.md','../PRIVATE/hidden.md','missing.md','code-only.md','fenced-only.md',`${pageHref}#middle`])assert.equal(links.has(href),false,href);
  assert.equal(doc.links.filter(link=>link.href==='../concepts/one.md#concept').length,1);
});

test('QA-bound page grouping follows source positions, preserves span aliases and omits header/middle',async t=>{
  const {selected}=await richFixture(t);const target=selected.reader.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href===pageHref).target;
  assert.deepEqual(target,{kind:'page',groups:[{documentId:'z-first',unitIds:['z-first','z-first-alias']},{documentId:'a-last',unitIds:['a-last']}]});
  for(const id of ['z-first','z-first-alias','a-last'])assert.ok(selected.reader.documents.some(d=>d.id===id));assert.equal(selected.reader.documents.some(d=>d.id==='m-denied'),false);
  for(const group of target.groups){const item=selected.items.find(i=>i.id===group.documentId);const text=selected.payloads.get(item.output).toString();assert.ok(text.includes('Identical visible text'));assert.doesNotMatch(text,/HEADER|OMITTED/);}
  assert.equal(JSON.stringify(selected.reader).includes('normalizedPath'),false);assert.equal(JSON.stringify(selected.reader).includes('offset'),false);
});

test('source-grounded raster hyperlink resolves without a lesson image; unrelated raster stays inert',async t=>{
  const {selected}=await richFixture(t);const links=selected.reader.documents.find(d=>d.id==='lesson-one').links;
  const link=links.find(l=>l.href==='../assets/figure.png');assert.equal(link.target.kind,'asset');assert.ok(selected.payloads.has(link.target.member));
  assert.equal(links.some(l=>l.href==='../assets/unrelated.png'),false);assert.equal(links.some(l=>l.href==='../assets/alias.png'),false);
  const unit=selected.reader.documents.find(d=>d.id==='unit-one');assert.ok(unit.links.some(l=>l.href==='../'+link.target.member&&l.target.member===link.target.member));
});

test('reader is browser-only and v2 generation still has no reader payload',async t=>{
  const {root,selected}=await richFixture(t,{channel:'agent'});assert.equal(selected.reader,undefined);
  const built=await buildPublication(root,{publish:true});assert.equal(built.ok,true,JSON.stringify(built.errors));
  const generation=await readGeneration(root,built.digest);await assert.rejects(generation.readBytes('reader.json'),/manifest/);
  assert.equal(JSON.parse(await readFile(`${root}/study/generated/${built.digest}/manifest.json`)).builderVersion,2);
});

test('draft cannot expose denied teaching or invent relationships',async t=>{
  const {selected}=await richFixture(t,{draft:true,deny:true});assert.deepEqual(selected.reader.lessons,[]);assert.deepEqual(selected.reader.concepts,[]);assert.deepEqual(selected.reader.outcomes,[]);assert.deepEqual(selected.reader.exercises,[]);
  assert.equal(selected.reader.documents.some(d=>d.id==='lesson-one'),false);assert.ok(selected.reader.documents.some(d=>d.id==='z-first'));
});

const mutations=[
  ['root field',r=>{r.extra=true;}],['wrong draft',r=>{r.draft=!r.draft;}],['input digest',r=>{r.inputDigest='0'.repeat(64);}],['collection type',r=>{r.lessons={};}],
  ['duplicate document',r=>r.documents.push(structuredClone(r.documents[0]))],['missing document',r=>r.documents.pop()],['unselected ID',r=>{r.documents[0].id='absent';}],
  ['duplicate anchor',r=>r.documents.find(d=>d.id==='lesson-one').anchors.push('lesson')],['invented anchor',r=>r.documents.find(d=>d.id==='lesson-one').anchors.push('invented')],
  ['invented href',r=>{r.documents.find(d=>d.id==='lesson-one').links[0].href='code-only.md';}],['link owner',r=>{r.documents.find(d=>d.id==='lesson-one').links[0].ownerId='concept-one';}],
  ['duplicate link',r=>{const d=r.documents.find(d=>d.id==='lesson-one');d.links.push(structuredClone(d.links[0]));}],['target fields',r=>{r.documents.find(d=>d.id==='lesson-one').links[0].target.extra=true;}],
  ['target discriminant',r=>{r.documents.find(d=>d.id==='lesson-one').links[0].target.kind='file';}],['missing target anchor',r=>{const l=r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href==='#lesson');l.target.anchor='absent';}],
  ['bare exercise target',r=>{const l=r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href==='#lesson');l.target={kind:'document',documentId:'exercise-one-promptRef',anchor:null};}],
  ['group representative',r=>{r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href===pageHref).target.groups[0].documentId='a-last';}],
  ['duplicate group unit',r=>{const g=r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href===pageHref).target.groups;g[1].unitIds.push('z-first');}],
  ['nonunit group',r=>{r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href===pageHref).target.groups[0]={documentId:'lesson-one',unitIds:['lesson-one']};}],
  ['mixed span aliases',r=>{r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href===pageHref).target.groups[0].unitIds.push('a-last');}],
  ['exercise reciprocal',r=>{r.outcomes[0].exerciseIds=[];}],['lesson exercise reciprocal',r=>{r.lessons[0].exerciseIds=[];}],['exercise document',r=>{r.exercises[0].answerDocumentId='concept-one';}],
  ['wrong origin',r=>{r.exercises[0].origin='official';}],['order type',r=>{r.lessons[0].order='1';}],['unsupported asset',r=>{const l=r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.target.kind==='asset');l.target.member='assets/x.svg';}],
];
for(const [name,mutate] of mutations)test(`closed reader rejects ${name}`,async t=>{
  const {selected,context}=await richFixture(t);const {validateReader}=await import('../lib/reader.mjs');const reader=structuredClone(selected.reader);mutate(reader);assert.throws(()=>validateReader(reader,context),/reader/i);
});

test('reader rejects changed/missing content and raster bytes and catalog parent/mode mismatches',async t=>{
  const {selected,context}=await richFixture(t);const {validateReader}=await import('../lib/reader.mjs');
  for(const mode of ['content','asset','missing','catalog-digest','catalog-draft']){
    const changed={...context,catalog:structuredClone(context.catalog),files:new Map(context.files)};
    if(mode==='catalog-digest')changed.catalog.inputDigest='0'.repeat(64);else if(mode==='catalog-draft')changed.catalog.draft=true;
    else{const name=[...changed.files.keys()].find(p=>p.startsWith(mode==='asset'?'assets/':'content/'));if(mode==='missing')changed.files.delete(name);else changed.files.set(name,Buffer.from('changed'));}
    assert.throws(()=>validateReader(selected.reader,changed),/reader/i,mode);
  }
});

test('token extraction ignores comment/data-attribute pseudo-anchors and rendered code',async()=>{
  const {readerDocumentTokens}=await import('../lib/reader.mjs');
  const bytes=Buffer.from('<a id="real"></a>\n<!-- <a id="comment"></a> -->\n<span data-id="not-id"></span>\n`<a id="code"></a> [x](hidden.md)`\n\n- nested **[visible](visible.md#real)**\n');
  assert.deepEqual(readerDocumentTokens(bytes),{anchors:['real'],hrefs:['visible.md#real']});
});

test('reader rejects malformed relationship arrays and catalog item shape/type/ref changes',async t=>{
  const {selected,context}=await richFixture(t);const {validateReader}=await import('../lib/reader.mjs');
  for(const mutate of [r=>{r.outcomes[0].exerciseIds=null;},r=>{r.exercises[0].outcomeIds={};},r=>{r.concepts[0].extra=true;}]){
    const reader=structuredClone(selected.reader);mutate(reader);assert.throws(()=>validateReader(reader,context),/reader/i);
  }
  for(const mutate of [item=>{item.extra=true;},item=>{item.ref={kind:'file',path:'study/lessons/one.md'};},item=>{item.draft=true;}]){
    const catalog=structuredClone(context.catalog);mutate(catalog.items.find(i=>i.id==='lesson-one'));assert.throws(()=>validateReader(selected.reader,{...context,catalog}),/reader/i);
  }
});

async function refreshRecords(root,records){
  for(const [name,value] of [['sources/manifest',records.manifest],['sources/units',records.units],['sources/coverage',records.coverage],['curriculum',records.curriculum]])await writeFile(`${root}/study/${name}.json`,json(value));
  for(const input of records.reviews.reviews['review-one'].inputHashes)input.sha256=digest(await readFile(`${root}/${input.path}`));
  await writeFile(`${root}/study/reviews.json`,json(records.reviews));
}

test('unknown evidence lineage removes teaching relationships without fabricating reader metadata',async t=>{
  const {root,records}=await richFixture(t);const unknown='<a id="source"></a>\nSynthetic unowned evidence.';await writeFile(`${root}/study/unowned.md`,unknown);records.curriculum.concepts['concept-one'].evidenceRefs=[markdown('study/unowned.md','source')];records.reviews.reviews['review-one'].inputHashes.push({path:'study/unowned.md',sha256:digest(unknown)});await refreshRecords(root,records);
  const capture=await captureProject(root);assert.equal((await validateCapturedProject(capture.readBytes)).ok,true);
  for(const draft of [false,true]){const {reader}=await selectPublication(capture,{draft});assert.deepEqual(reader.lessons,[]);assert.deepEqual(reader.outcomes,[]);assert.deepEqual(reader.exercises,[]);assert.ok(reader.documents.some(d=>d.id==='unit-one'));}
});

test('denied contributor prevents shared raster laundering through a public lesson dependency',async t=>{
  const {root,records}=await richFixture(t);const source={...structuredClone(records.manifest.sources['lecture-one']),id:'denied-owner',kind:'seminar',exposure:{browser:'deny',agent:'deny',export:'deny'}};records.manifest.sources[source.id]=source;
  const text='<a id="owner"></a>\n![owned image](../assets/figure.png)\n';await writeFile(`${root}/study/extracted/denied-owner.md`,text);
  const unit={...structuredClone(records.units.units['unit-one']),id:'denied-unit',sourceId:source.id,extractionRef:markdown('study/extracted/denied-owner.md','owner'),contentHash:digest(text)};
  records.units.units[unit.id]=unit;records.units.pages['denied-owner:1']={sourceId:source.id,pdfPage:1,status:'verified',unitIds:[unit.id],issueIds:[]};records.coverage.coverage[unit.id]={unitId:unit.id,lessonIds:[],outcomeIds:[],disposition:'reference-only',reason:'Synthetic denied owner',reviewId:null};await refreshRecords(root,records);
  const capture=await captureProject(root);assert.equal((await validateCapturedProject(capture.readBytes)).ok,true);
  const selected=await selectPublication(capture);assert.equal(selected.reader.documents.some(d=>d.id==='lesson-one'),false);assert.equal([...selected.payloads.keys()].some(p=>p.startsWith('assets/')),false);
});

test('reader uses captured bytes after live teaching changes and does not invent page groups for unbound pages',async t=>{
  const {root,capture,selected}=await richFixture(t);await writeFile(`${root}/study/lessons/one.md`,'Live changed bytes');
  assert.deepEqual((await selectPublication(capture)).reader,selected.reader);
  const links=selected.reader.documents.find(d=>d.id==='lesson-one').links;
  assert.equal(links.some(l=>l.href==='../sources/extracted/reference-page/page-001.md'),false);
  const groups=links.find(l=>l.href===pageHref).target.groups;assert.equal(groups.flatMap(g=>g.unitIds).some(id=>id.startsWith('unit-')),false,'Other physical source page unit IDs must not enter the bound normalized-page group');
});

test('historical validator rejects available locator conflicts without claiming omitted page provenance',async t=>{
  const {selected,context}=await richFixture(t);const {validateReader}=await import('../lib/reader.mjs');
  const catalog=structuredClone(context.catalog);catalog.items.find(i=>i.id==='a-last').locator.pdfPage=2;
  assert.throws(()=>validateReader(selected.reader,{...context,catalog}),/reader/i);
});

for(const [name,mutate] of [
  ['fragment-target mismatch',r=>{const link=r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href==='../concepts/one.md#concept');link.target={kind:'document',documentId:'lesson-one',anchor:'lesson'};}],
  ['fragment invented for bare link',r=>{const link=r.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href==='../concepts/one.md');link.target.anchor='concept';}],
])test(`reader rejects ${name}`,async t=>{const {selected,context}=await richFixture(t);const {validateReader}=await import('../lib/reader.mjs');const reader=structuredClone(selected.reader);mutate(reader);assert.throws(()=>validateReader(reader,context),/reader/i);});

test('historical validator rejects splitting known same-selector aliases into duplicate span groups',async t=>{
  const {selected,context}=await richFixture(t);const {validateReader}=await import('../lib/reader.mjs');const reader=structuredClone(selected.reader);
  const target=reader.documents.find(d=>d.id==='lesson-one').links.find(l=>l.href===pageHref).target;
  target.groups=[{documentId:'z-first',unitIds:['z-first']},{documentId:'z-first-alias',unitIds:['z-first-alias']},target.groups[1]];
  assert.throws(()=>validateReader(reader,context),/reader/i);
});

test('href matching uses the same token values passed to the approved Marked renderer',async()=>{
  const {Marked}=await import('marked');const {readerDocumentTokens}=await import('../lib/reader.mjs');
  const text='- **[nested](../target\\(1\\).md#part)**\n\n![image](../assets/one.png)\n\n`[code](ignored.md)`\n\n```md\n[code](ignored-too.md)\n```\n';
  const rendered=[];new Marked({renderer:{link(token){rendered.push(token.href);return '';},image(token){rendered.push(token.href);return '';}}}).parse(text);
  assert.deepEqual(readerDocumentTokens(Buffer.from(text)).hrefs,[...new Set(rendered)]);
});

test('existing unbound policy adapters retain selection without inventing a reader parent digest',async t=>{
  const {capture,selected}=await richFixture(t);const {digest:unused,...unbound}=capture;
  const result=await selectPublication(unbound);assert.equal(result.reader,undefined);assert.deepEqual(result.items,selected.items);assert.deepEqual(result.payloads,selected.payloads);
});

test('HTML attribute strings and unsupported raw blocks cannot invent reader anchors',async()=>{
  const {readerDocumentTokens}=await import('../lib/reader.mjs');
  for(const text of ['<div title=\'<a id="fake"></a>\'></div>','<script>"<a id=\'fake\'></a>"</script>','<pre><a id="fake"></a></pre>'])assert.deepEqual(readerDocumentTokens(Buffer.from(text)).anchors,[]);
  assert.deepEqual(readerDocumentTokens(Buffer.from('<a class="anchor" title=\'id="fake"\' id="real"></a>')).anchors,['real']);
});

test('historical aliases bind equal published bytes without assuming selector serialization identity',async t=>{
  const {selected,context}=await richFixture(t);const {validateReader}=await import('../lib/reader.mjs');const catalog=structuredClone(context.catalog),files=new Map(context.files);
  const alias=catalog.items.find(item=>item.id==='z-first-alias');const output=`content/${digest('equivalent selector with different object key order')}.md`;files.set(output,Buffer.from(files.get(alias.output)));alias.output=output;
  assert.equal(validateReader(selected.reader,{...context,catalog,files}),true);
});

async function fragmentFixture(t,{ambiguous=false,denied=false}={}){
  const records=teachingRecords();
  const raw='<a id="unit-one"></a>\n[Sibling](#unit-two) [Explicit](lecture-one.md#unit-two) [Self](#unit-one) [Missing](#missing) [Foreign](#answer)\n`[code](#code-only)`\n\n```md\n[fence](#fence-only)\n```\n<a id="unit-two"></a>\nSelected sibling.\n'+(ambiguous?'<a id="unit-two"></a>\nDuplicate unselected occurrence.\n':'');
  for(const unit of Object.values(records.units.units))unit.contentHash=digest(raw);
  records.units.units['unit-two'].extractionRef.anchor='unit-two';
  if(denied)records.manifest.sources['lecture-two'].exposure.browser='deny';
  const {root}=await teachingFixture(t,records,{
    'study/extracted/lecture-one.md':raw,
    'study/lessons/one.md':'<a id="lesson"></a>\n[Internal](#detail)\n<a id="detail"></a>\nWhole-file detail.\n',
    'study/exercises/one.md':'<a id="prompt"></a>\n[Answer](#answer) [Explicit](one.md#answer) [Bare](one.md)\n<a id="answer"></a>\n[Prompt](#prompt)\n',
  });
  const capture=await captureProject(root);const validation=await validateCapturedProject(capture.readBytes);assert.equal(validation.ok,!ambiguous,JSON.stringify(validation.errors));
  if(ambiguous){
    assert.ok(validation.errors.some(error=>error.message==='Anchor must exist exactly once'));
    await assert.rejects(selectPublication(capture),/Invalid output selector/);
    return {selected:{reader:undefined}};
  }
  const selected=await selectPublication(capture);
  return {selected,context:{catalog:{schemaVersion:1,inputDigest:capture.digest,draft:false,items:selected.items},inputDigest:capture.digest,draft:false,files:selected.payloads}};
}

test('fragment siblings resolve like explicit same-file links while self aliases retain their own ID',async t=>{
  const {selected,context}=await fragmentFixture(t);const {validateReader}=await import('../lib/reader.mjs');
  for(const id of ['unit-one','unit-three','unit-four']){
    const links=selected.reader.documents.find(d=>d.id===id).links;
    assert.deepEqual(links.find(l=>l.href==='#unit-two')?.target,{kind:'document',documentId:'unit-two',anchor:'unit-two'});
    assert.deepEqual(links.find(l=>l.href==='#unit-two').target,links.find(l=>l.href==='lecture-one.md#unit-two').target);
    assert.equal(links.find(l=>l.href==='#unit-one').target.documentId,id);
    for(const href of ['#missing','#answer','#code-only','#fence-only'])assert.equal(links.some(l=>l.href===href),false);
  }
  assert.equal(validateReader(selected.reader,context),true);
});

test('whole-file internal and selected exercise sibling fragments resolve without bare span access',async t=>{
  const {selected,context}=await fragmentFixture(t);const {validateReader}=await import('../lib/reader.mjs');
  const links=id=>selected.reader.documents.find(d=>d.id===id).links;
  assert.deepEqual(links('lesson-one').find(l=>l.href==='#detail').target,{kind:'document',documentId:'lesson-one',anchor:'detail'});
  assert.deepEqual(links('exercise-one-promptRef').find(l=>l.href==='#answer')?.target,{kind:'document',documentId:'exercise-one-answerRef',anchor:'answer'});
  assert.equal(links('exercise-one-answerRef').find(l=>l.href==='#prompt').target.documentId,'exercise-one-promptRef');
  assert.equal(links('exercise-one-promptRef').some(l=>l.href==='one.md'),false);
  assert.equal(validateReader(selected.reader,context),true);
  const changed=structuredClone(selected.reader);changed.documents.find(d=>d.id==='unit-one').links.find(l=>l.href==='#unit-two').target.documentId='unit-one';
  assert.throws(()=>validateReader(changed,context),/Invalid reader/);
});

test('denied sibling fragments and explicit equivalents remain inert',async t=>{
  const {selected}=await fragmentFixture(t,{denied:true});
  assert.equal(selected.reader.documents.some(d=>d.id==='unit-two'),false);
  const doc=selected.reader.documents.find(d=>d.id==='unit-one');assert.ok(doc);
  for(const href of ['#unit-two','lecture-one.md#unit-two'])assert.equal(doc.links.some(l=>l.href===href),false);
});

test('ambiguous original duplicate fragment invalidates capture metadata and emits no reader',async t=>{
  const {selected}=await fragmentFixture(t,{ambiguous:true});
  assert.equal(selected.reader,undefined);
});

async function selectorFixture(t){
  const records=teachingRecords();
  records.curriculum.exercises['exercise-one'].answerRef=markdown('study/exercises/two.md','prompt');
  const answer='<a id="prompt"></a>\nDifferent selected answer file.\n';
  const {root}=await teachingFixture(t,records,{
    'study/exercises/one.md':'<a id="prompt"></a>\n[Self](#prompt) [Explicit self](./one.md#prompt) [Other](two.md#prompt) [Normalized other](../exercises/two.md#prompt)\n',
    'study/exercises/two.md':answer,
  });
  records.reviews.reviews['review-one'].inputHashes.push({path:'study/exercises/two.md',sha256:digest(answer)});
  await writeFile(`${root}/study/reviews.json`,json(records.reviews));
  const capture=await captureProject(root);const validation=await validateCapturedProject(capture.readBytes);assert.equal(validation.ok,true,JSON.stringify(validation.errors));
  const selected=await selectPublication(capture);
  return {selected,context:{catalog:{schemaVersion:1,inputDigest:capture.digest,draft:false,items:selected.items},inputDigest:capture.digest,draft:false,files:selected.payloads}};
}

for(const href of ['#prompt','./one.md#prompt','two.md#prompt','../exercises/two.md#prompt'])test(`available Markdown selectors reject contradictory target for ${href}`,async t=>{
  const {selected,context}=await selectorFixture(t);const {validateReader}=await import('../lib/reader.mjs');
  assert.equal(validateReader(selected.reader,context),true);
  const changed=structuredClone(selected.reader),link=changed.documents.find(d=>d.id==='exercise-one-promptRef').links.find(l=>l.href===href);
  assert.ok(link);const expected=href.includes('two.md')?'exercise-one-answerRef':'exercise-one-promptRef';assert.equal(link.target.documentId,expected);
  link.target.documentId=expected==='exercise-one-promptRef'?'exercise-one-answerRef':'exercise-one-promptRef';
  assert.throws(()=>validateReader(changed,context),/Invalid reader/);
});
