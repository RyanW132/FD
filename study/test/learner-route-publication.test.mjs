import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {serverFixture} from './fixtures/server/helpers.mjs';
import {readGeneration} from '../lib/publication.mjs';
import {validateReader} from '../lib/reader.mjs';
import {selectedModel} from '../app/routes.mjs';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
async function published(t){const {root,id}=await serverFixture(t),generation=await readGeneration(root,id),bundle={},files=new Map();for(const member of generation.members)files.set(member.path,await generation.readBytes(member.path));for(const name of ['catalog','reader','report','graph','search'])bundle[name]=JSON.parse(files.get(name+'.json'));return {bundle,files};}
test('actual v3 build and whole-generation reopen feed selectedModel without conflating selector and byte hashes',async t=>{
 const {bundle}=await published(t);assert.equal(bundle.catalog.items.filter(item=>item.output!=='content/'+item.sha256+'.md').length,bundle.catalog.items.length);const model=selectedModel(bundle);for(const item of bundle.catalog.items)assert.equal(model.document(item.id).output,item.output);
});
test('core-permitted published alias coherence allows distinct selector filenames and retains separate equal-byte groups',async t=>{
 const {bundle,files}=await published(t),items=bundle.catalog.items;
 for(const id of ['unit-two','unit-three']){const item=items.find(item=>item.id===id),old=item.output;item.output='content/'+hash('equivalent selected ref '+id)+'.md';files.set(item.output,Buffer.from(files.get(old)));bundle.search.documents.find(doc=>doc.id===id).output=item.output;}
 const lesson=items.find(item=>item.id==='lesson-one'),bytes=Buffer.concat([files.get(lesson.output),Buffer.from('\n[Selected spans](selected-page.md)\n')]);files.set(lesson.output,bytes);lesson.sha256=hash(bytes);Object.assign(bundle.search.documents.find(doc=>doc.id===lesson.id),{sha256:lesson.sha256,text:bytes.toString('utf8'),byteLength:bytes.length});
 const target={kind:'page',groups:[{documentId:'unit-one',unitIds:['unit-one','unit-two']},{documentId:'unit-three',unitIds:['unit-three']}]};bundle.reader.documents.find(doc=>doc.id===lesson.id).links.push({ownerId:lesson.id,href:'selected-page.md',target});
 // Historical available-binding proof only: this does not reconstruct omitted source spans.
 const context={catalog:bundle.catalog,inputDigest:bundle.catalog.inputDigest,draft:bundle.catalog.draft,files};assert.equal(validateReader(bundle.reader,context),true);const model=selectedModel(bundle);assert.deepEqual(model.target(lesson.id,'selected-page.md'),target);assert.notEqual(model.document('unit-one').output,model.document('unit-two').output);assert.equal(model.document('unit-one').sha256,model.document('unit-three').sha256);
 for(const mutate of [b=>b.reader.documents.find(doc=>doc.id===lesson.id).links.at(-1).target.groups[0].unitIds.push('unselected'),b=>b.reader.documents.find(doc=>doc.id===lesson.id).links.at(-1).target.groups[1].unitIds.push('unit-two'),b=>{b.catalog.items.find(item=>item.id==='unit-two').sha256='a'.repeat(64);b.search.documents.find(doc=>doc.id==='unit-two').sha256='a'.repeat(64);}]){const bad=structuredClone(bundle);mutate(bad);assert.throws(()=>selectedModel(bad));}
});
