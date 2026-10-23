import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { teachingRecords, teachingFixture, fixture, pendingRecords, digest, markdown, sourceRef } from '../publication/helpers.mjs';

export const latePhrase='Precisely retained sentence beyond the three thousand character boundary.';
export const fourthPhrase='The fourth concept article contains separately searchable knowledge.';
export const longLesson='<a id="lesson"></a>\n'+('αβ 😀 café discrete cashflows.\n'.repeat(1800))+latePhrase+'\n';
export async function put(root,path,bytes){await mkdir(dirname(join(root,path)),{recursive:true});await writeFile(join(root,path),bytes);}
export async function refresh(root,records){
  const review=records.reviews.reviews['review-one'];
  for(const input of review.inputHashes)input.sha256=digest(await readFile(join(root,input.path)));
  await put(root,'study/reviews.json',JSON.stringify(records.reviews));
}
export async function knowledgeFixture(t,{restricted=false,extraConcepts=false}={}){
  const records=teachingRecords();
  for(const source of Object.values(records.manifest.sources))source.exposure={browser:'allow',agent:'allow',export:'allow'};
  const files={'study/lessons/one.md':longLesson};
  if(extraConcepts)for(const suffix of ['two','three','four']){
    const id='concept-'+suffix,path=`study/concepts/${suffix}.md`;
    records.curriculum.concepts[id]={...structuredClone(records.curriculum.concepts['concept-one']),id,title:`Concept ${suffix}`,path};
    records.curriculum.lessons['lesson-one'].conceptIds.push(id);
    records.curriculum.outcomes['outcome-one'].conceptIds.push(id);
    records.reviews.reviews['review-one'].subjectRefs.push(markdown(path,'concept'));
    files[path]='<a id="concept"></a>\n'+(suffix==='four'?fourthPhrase:`Distinct ${suffix} article.`)+'\n';
  }
  if(restricted){
    records.manifest.sources['lecture-four'].exposure={browser:'deny',agent:'deny',export:'deny'};
    records.curriculum.lessons['lesson-one'].title='SECRET PARAPHRASED LESSON TITLE';
    files['study/lessons/one.md']='<a id="lesson"></a>\nDenied paraphrase without source literal marker.\n';
  }
  const result=await teachingFixture(t,records,files);
  if(extraConcepts){for(const suffix of ['two','three','four'])records.reviews.reviews['review-one'].inputHashes.push({path:`study/concepts/${suffix}.md`,sha256:digest(files[`study/concepts/${suffix}.md`])});await refresh(result.root,records);}
  return result;
}
export { digest, markdown, sourceRef, fixture, pendingRecords };

export const privateText='<a id="selected"></a>\nPRIVATE_EXACT_SELECTED_PARAGRAPH 😀\n<a id="sibling"></a>\nPRIVATE_SIBLING_MUST_NOT_BE_READ\n';
export async function privateFixture(t){
  const records=pendingRecords(),source=records.manifest.sources['lecture-one'],unit=records.units.units['unit-one'];
  source.exposure={browser:'deny',agent:'deny',export:'deny'};
  Object.assign(unit,{status:'verified',classification:'substantive',extractionRef:markdown('study/private/book/extracted.md','selected'),contentHash:digest(privateText)});
  records.units.pages['lecture-one:1'].status='verified';
  const result=await fixture(t,records,{'study/private/book/extracted.md':privateText});
  return result;
}

export async function reviewedLinkFixture(t,{asset=false}={}){
  const result=await knowledgeFixture(t,{extraConcepts:true}),{root,records}=result;
  if(asset){
    const path='study/extracted/diagram.png',image=Buffer.from('synthetic diagram bytes');
    await put(root,path,image);
    const extracted=(await readFile(join(root,'study/extracted/lecture-one.md'),'utf8')).replace('A definition.','A definition.\n![Source diagram](diagram.png)');
    await put(root,'study/extracted/lecture-one.md',extracted);
    for(const unit of Object.values(records.units.units))unit.contentHash=digest(extracted);
    await put(root,'study/sources/units.json',JSON.stringify(records.units));
    records.reviews.reviews['review-one'].inputHashes.push({path,sha256:digest(image)});
  }
  records.curriculum.links.reviewed={id:'reviewed',from:'concept-one',to:'concept-two',type:'contradicts',evidenceRefs:[sourceRef('unit-one'),sourceRef('unit-two')],basis:'source',reason:'Synthetic unresolved disagreement',reviewId:'review-link'};
  await put(root,'study/curriculum.json',JSON.stringify(records.curriculum));await refresh(root,records);
  records.reviews.reviews['review-link']={...structuredClone(records.reviews.reviews['review-one']),id:'review-link',subjectRefs:[{kind:'record',path:'study/curriculum.json',id:'reviewed'}]};
  await put(root,'study/reviews.json',JSON.stringify(records.reviews));
  return result;
}

// Re-sign synthetic immutable fixtures after deliberate semantic mutation, so
// rejection tests reach the cross-output binding checks, not merely byte hashes.
export async function forgeGeneration(root,generation,mutate){
  const manifest=JSON.parse(await readFile(join(root,'study/generated',generation.digest,'manifest.json'),'utf8'));
  const payloads=new Map();for(const f of manifest.files)payloads.set(f.path,await generation.readBytes(f.path));
  await mutate({manifest,payloads});
  manifest.files=[...payloads].sort(([a],[b])=>a.localeCompare(b)).map(([path,bytes])=>({path,sha256:digest(bytes),byteLength:bytes.length,contentType:path.endsWith('.json')?'application/json':path.endsWith('.md')?'text/markdown':path.endsWith('.png')?'image/png':'image/jpeg'}));
  const raw=Buffer.from(JSON.stringify(manifest,null,2)+'\n'),id=digest(raw);
  for(const [path,bytes]of payloads)await put(root,`study/generated/${id}/${path}`,bytes);
  await put(root,`study/generated/${id}/manifest.json`,raw);return id;
}
