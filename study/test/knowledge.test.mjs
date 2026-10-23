import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildKnowledge, queryKnowledge, readKnowledge, openKnowledge } from '../lib/knowledge.mjs';
import { buildPublication, readGeneration } from '../lib/publication.mjs';
import { fixture, teachingFixture, digest } from './fixtures/publication/helpers.mjs';

test('knowledge builder receives only selected projection and preserves complete UTF8 bytes',async()=>{
  const text='\uFEFF<a id="one"></a>\r\nα 😀\r\n'+'complete '.repeat(5000)+'needle';
  const bytes=Buffer.from(text);
  const projection={items:[{id:'article-one',type:'lesson',title:'One',ref:{kind:'record',path:'study/curriculum.json',id:'article-one'},output:'content/one.md',sha256:digest(bytes),draft:false}],metadata:{nodes:[],edges:[]},readAllowed:async()=>Buffer.from(bytes)};
  const first=await buildKnowledge(projection),second=await buildKnowledge(projection);
  assert.deepEqual(first,second);
  // BOM is document content too; TextDecoder must not silently normalize it.
  assert.equal(first.index.documents[0].text,text);
  assert.equal(queryKnowledge(first.index,'needle').total,1);
  const selected={...projection,revision:first.index.revision};
  assert.equal((await readKnowledge(selected,'article-one',{full:true})).text,text);
});

test('pending valid production-like records produce truthful empty knowledge rather than fake articles',async t=>{
  const {root}=await fixture(t);const k=await openKnowledge(root);
  assert.deepEqual(k.graph.nodes,[]);assert.deepEqual(k.index.documents,[]);
  assert.equal(queryKnowledge(k.index,'missing').total,0);
});

test('publication graph and full search are immutable manifested payloads',async t=>{
  const {root}=await teachingFixture(t);const built=await buildPublication(root,{publish:true});assert.equal(built.ok,true);
  const generation=await readGeneration(root);
  const graph=JSON.parse(await generation.readBytes('graph.json'));
  const search=JSON.parse(await generation.readBytes('search.json'));
  assert.equal(graph.inputDigest,search.inputDigest);
  assert.equal(search.documents.length,generation.catalog.items.length);
  for(const doc of search.documents)assert.equal(digest(Buffer.from(doc.text)),doc.sha256);
  const manifest=JSON.parse(await readFile(`${root}/study/generated/${built.digest}/manifest.json`));
  assert.ok(manifest.files.some(file=>file.path==='graph.json'));
  assert.ok(manifest.files.some(file=>file.path==='search.json'));
});

test('projection byte tampering and ambiguous IDs fail closed',async()=>{
  const item={id:'unit-one',output:'content/a.md',sha256:digest('expected')};
  await assert.rejects(buildKnowledge({items:[item],readAllowed:async()=>Buffer.from('changed')}),/hash/);
  await assert.rejects(buildKnowledge({items:[item,item],readAllowed:async()=>Buffer.from('expected')}),/Duplicate/);
});

test('legacy builder v1 immutable generations remain readable without graph/search payloads',async t=>{
  const {root}=await fixture(t);
  const {mkdir,writeFile}=await import('node:fs/promises');
  const payloads=new Map([
    ['catalog.json',Buffer.from(JSON.stringify({schemaVersion:1,draft:false,items:[]},null,2)+'\n')],
    ['report.json',Buffer.from(JSON.stringify({schemaVersion:1,draft:false,draftReasons:[],status:'incomplete',readiness:{accountingComplete:false,conversionComplete:false,teachingComplete:false},omitted:0},null,2)+'\n')],
    ['index.md',Buffer.from('# Study helper\n\nExplicit publication\n\nTeaching complete: false\n')]
  ]);
  const manifest={schemaVersion:1,builderVersion:1,channel:'browser',mode:'reviewed',inputDigest:digest('legacy captured input'),files:[...payloads].sort(([a],[b])=>a.localeCompare(b)).map(([path,bytes])=>({path,sha256:digest(bytes),byteLength:bytes.length,contentType:path.endsWith('.json')?'application/json':'text/markdown'}))};
  const raw=Buffer.from(JSON.stringify(manifest,null,2)+'\n'),generationDigest=digest(raw);
  const dir=`${root}/study/generated/${generationDigest}`;await mkdir(dir,{recursive:true});
  await writeFile(`${dir}/manifest.json`,raw);for(const [name,bytes]of payloads)await writeFile(`${dir}/${name}`,bytes);
  const old=await readGeneration(root,generationDigest);
  assert.deepEqual(old.catalog,{schemaVersion:1,draft:false,items:[]});
  assert.equal(old.report.status,'incomplete');
  await assert.rejects(old.readBytes('graph.json'),/manifest/);
  assert.equal((await buildPublication(root,{publish:true})).ok,true);
  const current=await readGeneration(root);
  assert.notEqual(current.digest,generationDigest);
  assert.deepEqual((await readGeneration(root,generationDigest)).catalog,old.catalog);
});

test('Markdown source-evidence references derive cites to actual admitted source units',async t=>{
  const {root,records}=await teachingFixture(t);
  const {writeFile}=await import('node:fs/promises');
  records.curriculum.concepts['concept-one'].evidenceRefs=[{kind:'markdown',path:'study/extracted/lecture-one.md',anchor:'unit-one'}];
  await writeFile(`${root}/study/curriculum.json`,JSON.stringify(records.curriculum));
  for(const input of records.reviews.reviews['review-one'].inputHashes)input.sha256=digest(await readFile(`${root}/${input.path}`));
  await writeFile(`${root}/study/reviews.json`,JSON.stringify(records.reviews));
  const k=await openKnowledge(root,{channel:'browser'});
  assert.ok(k.graph.edges.some(edge=>edge.type==='cites'&&edge.from==='concept-one'&&edge.to==='unit-one'));
  for(const edge of k.graph.edges.filter(edge=>edge.type==='cites'&&edge.from==='concept-one'))assert.equal(edge.evidenceRefs[0].kind,'source');
});

test('query snippet start preserves an astral Unicode glyph at its boundary',()=>{
  const text='😀'+'a'.repeat(99)+'needle';
  const result=queryKnowledge({revision:digest(text),documents:[{id:'unicode',type:'concept',title:'Unicode',text,output:'content/u.md',ref:{kind:'source',unitId:'unit-one'},sha256:digest(text)}]},'needle');
  assert.ok(result.hits[0].snippet.startsWith('😀'));
  assert.equal(Buffer.from(result.hits[0].snippet).toString('utf8'),result.hits[0].snippet);
});

test('nonderived link approval binds endpoint and source-evidence closure even without teaching review reuse',async t=>{
  const {root,records}=await teachingFixture(t);const {writeFile}=await import('node:fs/promises');
  records.curriculum.links['related-one']={id:'related-one',from:'lesson-one',to:'concept-one',type:'related',evidenceRefs:[{kind:'source',unitId:'unit-one'}],basis:'source',reason:'Synthetic test relation',reviewId:'link-review'};
  await writeFile(`${root}/study/curriculum.json`,JSON.stringify(records.curriculum));
  for(const input of records.reviews.reviews['review-one'].inputHashes)input.sha256=digest(await readFile(`${root}/${input.path}`));
  records.reviews.reviews['link-review']={...structuredClone(records.reviews.reviews['review-one']),id:'link-review',subjectRefs:[{kind:'record',path:'study/curriculum.json',id:'related-one'}],inputHashes:[{path:'study/curriculum.json',sha256:digest(await readFile(`${root}/study/curriculum.json`))}]};
  await writeFile(`${root}/study/reviews.json`,JSON.stringify(records.reviews));
  for(const previewDraft of [false,true])await assert.rejects(openKnowledge(root,{channel:'browser',previewDraft}),/Invalid captured/);
  records.reviews.reviews['link-review'].inputHashes=structuredClone(records.reviews.reviews['review-one'].inputHashes);
  await writeFile(`${root}/study/reviews.json`,JSON.stringify(records.reviews));
  const knowledge=await openKnowledge(root,{channel:'browser'});
  assert.ok(knowledge.graph.edges.some(edge=>edge.type==='related'&&edge.reviewId==='link-review'));
});
