import { constants } from 'node:fs';
import { mkdir, open, lstat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { TextDecoder } from 'node:util';
import { captureProject } from './capture.mjs';
import { sha256, validateCapturedProject, validateRecords } from './contracts.mjs';
import { anchoredBytes, selectPublication, isDraftFreshnessError } from './policy.mjs';

const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
const idPattern = /^[a-z][a-z0-9]*(?:[-:][a-z0-9]+)*$/;
// Policy-derived exercise documents retain their existing case-sensitive IDs.
const exerciseContentIdPattern = /^[a-z][a-z0-9]*(?:[-:][a-z0-9]+)*-(?:promptRef|answerRef)$/;
const encode = value => Buffer.from(JSON.stringify(value));
const budget = 32 * 1024;
const draftWarning = 'DRAFT — UNREVIEWED preview; not reviewed teaching or evidence of mastery.';
const draftState = draft => ({ draft: Boolean(draft), warning: draft ? draftWarning : null });
function integer(value, name, minimum = 0) {
  if (!Number.isSafeInteger(value) || value < minimum) throw Error(`Invalid ${name}`);
}
function revisionMatches(actual, expected) {
  if (expected !== undefined && expected !== actual) throw Error('Revision changed; restart retrieval');
}
function decode(bytes) { return decoder.decode(bytes); }

// Deliberately accepts no root path, capture, or canonical records. All content and
// metadata must already have passed the channel-specific publication policy.
export async function buildKnowledge(projection) {
  const documents = [];
  const ids=new Set();
  for (const item of [...projection.items].sort((a,b) => a.id.localeCompare(b.id))) {
    if(ids.has(item.id))throw Error('Duplicate projected content ID');ids.add(item.id);
    const bytes = await projection.readAllowed(item.output);
    if (sha256(bytes) !== item.sha256) throw Error('Projected content hash changed');
    const unit=projection.metadata?.nodes.find(node=>node.id===item.id&&node.type==='unit');
    documents.push({ ...item, ...(unit?{locator:unit.locator,status:unit.status}:{}), text: decode(bytes), byteLength: bytes.length });
  }
  const nodes = (projection.metadata?.nodes ?? []).map(({locator,status,...node}) => node);
  const edges = projection.metadata?.edges ?? [];
  const revision = sha256(encode({ nodes, edges, documents }));
  const inputDigest = projection.inputDigest ?? revision;
  if(!/^[a-f0-9]{64}$/.test(inputDigest))throw Error('Invalid projected input digest');
  const graph = { schemaVersion: 1, inputDigest, generatedAt: null, nodes, edges };
  const index = { schemaVersion: 1, inputDigest, revision, ...draftState(projection.draft || documents.some(document => document.draft)), documents };
  return { graph, index };
}

export async function openKnowledge(root, { channel = 'agent', previewDraft = false } = {}) {
  const capture = await captureProject(root);
  const validation = await validateCapturedProject(capture.readBytes);
  if (validation.errors.some(e => !(previewDraft && isDraftFreshnessError(e)))) throw Error('Invalid captured project');
  const lessons = Object.values(capture.records.curriculum.lessons);
  const concepts = Object.values(capture.records.curriculum.concepts);
  if (!previewDraft && [...lessons, ...concepts].some(item => !item.reviewId)) throw Error('Unreviewed teaching requires explicit draft preview');
  const selected = await selectPublication(capture, { channel, draft: previewDraft });
  const knowledge = await buildKnowledge(selected);
  const graphValidation=validateRecords({...capture.records,graph:knowledge.graph});
  if(!graphValidation.ok)throw Error('Invalid derived graph: '+graphValidation.errors.map(e=>e.code).join(','));
  await capture.recheck();
  const projection = { ...selected, revision: knowledge.index.revision };
  return { ...knowledge, projection };
}

export function queryKnowledge(index, query, { offset = 0, limit = 20, maxBytes = budget, revision } = {}) {
  if (typeof query !== 'string' || !query.trim() || Buffer.byteLength(query) > budget || query.includes('\0')) throw Error('Invalid query');
  integer(offset, 'offset'); integer(limit, 'limit', 1); integer(maxBytes, 'maxBytes', 1024);
  if (limit > 100 || maxBytes > budget) throw Error('Initial evidence budget exceeded');
  revisionMatches(index.revision, revision);
  const terms = query.toLocaleLowerCase('en').trim().split(/\s+/u);
  const ranked = [];
  for (const doc of index.documents) {
    const haystack = (doc.title + '\n' + doc.text).toLocaleLowerCase('en');
    if (!terms.every(term => haystack.includes(term))) continue;
    const body = doc.text.toLocaleLowerCase('en');
    const position = Math.max(0, ...terms.map(term => body.indexOf(term)));
    // Slice code points, not bytes: snippets cannot introduce invalid UTF-8.
    let start=Math.max(0,position-100);
    if(start>0&&/[\uDC00-\uDFFF]/.test(doc.text[start])&&/[\uD800-\uDBFF]/.test(doc.text[start-1]))start--;
    const snippet = Array.from(doc.text.slice(start)).slice(0, 360).join('');
    const score = terms.reduce((sum,term) => sum + (doc.title.toLocaleLowerCase('en').includes(term) ? 10 : 1),0);
    ranked.push({ ...draftState(index.draft || doc.draft), id:doc.id, type:doc.type, title:doc.title, ref:doc.ref, path:doc.output, ...(doc.locator?{locator:doc.locator,status:doc.status}:{}), snippet, revision:index.revision, sha256:doc.sha256, score });
  }
  ranked.sort((a,b) => b.score-a.score || a.id.localeCompare(b.id));
  if (offset > ranked.length) throw Error('Offset exceeds results');
  const result = { ...draftState(index.draft), hits: [], total:ranked.length, nextOffset:null, revision:index.revision };
  for (const hit of ranked.slice(offset, offset+limit)) {
    const candidate = { ...result, hits:[...result.hits,hit], nextOffset:offset+result.hits.length+1 < ranked.length ? offset+result.hits.length+1 : null };
    if (encode(candidate).length > maxBytes) break;
    result.hits.push(hit);
  }
  result.nextOffset = offset+result.hits.length < ranked.length ? offset+result.hits.length : null;
  if (result.nextOffset === offset && offset < ranked.length) throw Error('Budget too small for one hit');
  return result;
}

export async function readKnowledge(projection, id, { full = false, offset = 0, maxBytes = budget, revision } = {}) {
  if (typeof id !== 'string' || !idPattern.test(id) && !exerciseContentIdPattern.test(id)) throw Error('Invalid content ID');
  integer(offset, 'offset'); integer(maxBytes, 'maxBytes', 4);
  if (!full && maxBytes > budget) throw Error('Initial evidence budget exceeded');
  revisionMatches(projection.revision, revision);
  const item = projection.items.find(item => item.id === id);
  if (!item) throw Error('Unknown or unavailable content ID');
  const bytes = await projection.readAllowed(item.output);
  if (sha256(bytes) !== item.sha256) throw Error('Projected content hash changed');
  decode(bytes); // Reject malformed documents rather than silently replace bytes.
  if (offset > bytes.length || offset < bytes.length && (bytes[offset] & 0xc0) === 0x80) throw Error('Invalid UTF-8 byte offset');
  let end = full ? bytes.length : Math.min(bytes.length, offset+maxBytes);
  while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
  const unit=projection.metadata?.nodes.find(node=>node.id===id&&node.type==='unit');
  const response = () => ({ ...draftState(projection.draft || item.draft), id, ref:item.ref, ...(unit?{locator:unit.locator,status:unit.status}:{}), text:decode(bytes.subarray(offset,end)), offset, nextOffset:end < bytes.length ? end : null,
    totalBytes:bytes.length, sha256:item.sha256, revision:projection.revision, complete:end === bytes.length && offset === 0 });
  // JSON escaping and continuation metadata are part of the initial evidence budget.
  if (!full && encode(response()).length > budget) {
    let low=offset, high=end;
    while (low<high) {
      const middle=Math.ceil((low+high)/2); let boundary=middle;
      while (boundary>offset && boundary<bytes.length && (bytes[boundary]&0xc0)===0x80) boundary--;
      end=boundary;
      if (encode(response()).length<=budget) low=middle; else high=middle-1;
    }
    end=low; while(end>offset && end<bytes.length && (bytes[end]&0xc0)===0x80)end--;
  }
  if (end===offset && offset<bytes.length) throw Error('Budget too small for one character');
  return response();
}

// Explicit local-only evidence read. This is not a new exposure channel and its
// bytes are never returned to stdout, the publication selector, or graph/search.
export async function readLocalPrivate(root, id, { output, ...options } = {}) {
  if (typeof id!=='string' || !idPattern.test(id)) throw Error('Invalid source-unit ID');
  if (typeof output!=='string' || !/^study\/private\/retrieval\/[a-zA-Z0-9][a-zA-Z0-9_-]*\.json$/.test(output)) throw Error('Private output must be a safe JSON file under study/private/retrieval');
  const capture=await captureProject(root);
  const validation=await validateCapturedProject(capture.readBytes);
  if (!validation.ok) throw Error('Invalid captured project');
  const unit=capture.records.units.units[id];
  const source=capture.records.manifest.sources[unit?.sourceId];
  if (!unit || !source || source.access!=='permitted' || !unit.extractionRef) throw Error('Source unit unavailable for local read');
  const original=await capture.readBytes(unit.extractionRef.path);
  const bytes=anchoredBytes(original,unit.extractionRef.anchor);
  const projection={ revision:capture.digest, items:[{id,ref:{kind:'source',unitId:id},output:'local',sha256:sha256(bytes)}], readAllowed:async name=>{if(name!=='local')throw Error('Unknown local selection');return Buffer.from(bytes);} };
  const warning='Local private evidence only. This does not authorize browser, export, agent, or provider transfer.';
  let evidence=await readKnowledge(projection,id,options);
  const envelope=()=>({...evidence,sourceId:unit.sourceId,locator:unit.locator,status:unit.status,classification:unit.classification,
    qaWarning:unit.status==='verified'?null:'Unverified extraction: inspect the original before relying on it.',warning});
  if (!options.full && encode(envelope()).length>budget) evidence=await readKnowledge(projection,id,{...options,maxBytes:Math.max(4,Buffer.byteLength(evidence.text)-encode(envelope()).length+budget-1024)});
  const payload=encode(envelope());
  await capture.recheck();
  // Pin the output parent before creating the file. Descriptor-relative output
  // prevents a concurrent rename/symlink substitution from redirecting bytes.
  root=await realpath(root);
  for (const relative of ['study','study/private','study/private/retrieval']) {
    const target=path.join(root,relative);
    try {await mkdir(target);} catch(error) {if(error.code!=='EEXIST')throw error;}
    const stat=await lstat(target);
    if (!stat.isDirectory() || stat.isSymbolicLink() || await realpath(target)!==target) throw Error('Unsafe private output directory');
  }
  const parentPath=path.join(root,'study/private/retrieval');
  const parent=await open(parentPath,constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);
  let fd;
  try {
    const pinned=await parent.stat({bigint:true}), named=await lstat(parentPath,{bigint:true});
    if(pinned.dev!==named.dev || pinned.ino!==named.ino)throw Error('Private output directory changed');
    // Node has no portable openat. Fail closed outside the supported Linux/WSL
    // descriptor filesystem rather than silently weakening confined writes.
    if(process.platform!=='linux')throw Error('Confined private output requires Linux/WSL descriptor filesystem');
    fd=await open(`/proc/self/fd/${parent.fd}/${path.basename(output)}`,constants.O_WRONLY|constants.O_CREAT|constants.O_EXCL|constants.O_NOFOLLOW,0o600);
    await fd.writeFile(payload);await fd.sync();await parent.sync();
  } finally {if(fd)await fd.close();await parent.close();}
  return {ok:true,output,warning};
}
