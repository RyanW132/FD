import path from 'node:path';
import { Marked } from 'marked';
import { decodeUtf8 } from './assets.mjs';
import { sha256, isSafePath } from './contracts.mjs';

// An isolated parser instance: application/global Marked extensions cannot change
// which published links/anchors the projection and its validator recognize.
const markdown = new Marked();
const idPattern = /^[a-z][a-z0-9]*(?:[-:][a-z0-9]+)*$/;
const contentIdPattern = /^[a-z][a-z0-9]*(?:[-:][a-z0-9]+)*(?:-(?:promptRef|answerRef))?$/;
const hashPattern = /^[a-f0-9]{64}$/;
const fail = () => { throw Error('Invalid reader projection'); };
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
function keys(value, names) {
  if (!object(value) || Object.keys(value).sort().join(',') !== names.split(',').sort().join(',')) fail();
}
function uniqueStrings(values, pattern) {
  if (!Array.isArray(values) || values.some(value => typeof value !== 'string' || !value || pattern && !pattern.test(value)) || new Set(values).size !== values.length) fail();
  return values;
}
function records(values, fields) {
  if (!Array.isArray(values)) fail();
  const result = new Map();
  for (const value of values) {
    keys(value, fields);
    if (typeof value.id !== 'string' || !idPattern.test(value.id) || result.has(value.id)) fail();
    result.set(value.id, value);
  }
  return result;
}
const sameSet = (a, b) => a.length === b.length && a.every(value => b.includes(value));

// Link href is exactly the Marked token's renderer-facing href. Code and raw
// HTML links are not Markdown link tokens. Only explicit supported HTML IDs
// become anchors; heading text never invents an anchor.
export function readerDocumentTokens(bytes) {
  const anchors = [], hrefs = [];
  markdown.walkTokens(markdown.lexer(decodeUtf8(bytes)), token => {
    if (token.type === 'link' || token.type === 'image') hrefs.push(token.href);
    if (token.type === 'html') {
      const html = token.text.replace(/<!--[\s\S]*?(?:-->|$)/g, '');
      if (!/^\s*<(?:a|span|h[1-6])(?:\s|>)/i.test(html) || /<(?:pre|script|style|textarea|xmp|iframe)\b/i.test(html)) return;
      // Parse attributes only on supported explicit-anchor tags recognized by
      // Marked as HTML, never data-id or an id-looking string inside an attribute.
      for (const tag of html.matchAll(/<([a-z][a-z0-9]*)((?:\s+[^\s"'<>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*\/?>/gi)) {
        if (!/^(?:a|span|h[1-6])$/i.test(tag[1])) continue;
        const ids = [];
        for (const attribute of tag[2].matchAll(/\s+([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
          if (attribute[1].toLowerCase() === 'id') ids.push(attribute[2] ?? attribute[3]);
        }
        if (ids.length > 1) fail();
        if (ids.length && ids[0] !== undefined) anchors.push(ids[0]);
      }
    }
  });
  uniqueStrings(anchors);
  return { anchors, hrefs: [...new Set(hrefs)] };
}

// Pure published-coherence validation. Callers supply only a selected catalog,
// captured parent binding and already selected/manifest-verified member bytes.
// This cannot reconstruct original page positions or authenticate provenance.
export function validateReader(reader, context) {
  try { return validate(reader, context); } catch { fail(); }
}
function validate(reader, { catalog, inputDigest, draft, files }) {
  keys(reader, 'schemaVersion,inputDigest,draft,documents,lessons,concepts,outcomes,exercises');
  keys(catalog, 'schemaVersion,inputDigest,draft,items');
  if (reader.schemaVersion !== 1 || catalog.schemaVersion !== 1 || typeof inputDigest !== 'string' || !hashPattern.test(inputDigest) || typeof draft !== 'boolean' || reader.inputDigest !== inputDigest || catalog.inputDigest !== inputDigest || reader.draft !== draft || catalog.draft !== draft || !(files instanceof Map) || !Array.isArray(catalog.items)) fail();
  const items = new Map(), tokens = new Map();
  for (const item of catalog.items) {
    if (!object(item) || typeof item.id !== 'string' || !contentIdPattern.test(item.id) || items.has(item.id) || !['unit','lesson','concept','exercise'].includes(item.type) || item.draft !== draft || !/^content\/[a-f0-9]{64}\.md$/.test(item.output) || !hashPattern.test(item.sha256) || !Buffer.isBuffer(files.get(item.output)) || sha256(files.get(item.output)) !== item.sha256) fail();
    const enriched = item.type === 'unit' && ('locator' in item || 'status' in item);
    keys(item, 'id,type,title,ref,output,sha256,draft'+(enriched?',locator,status':''));
    if (typeof item.title !== 'string') fail();
    if (item.type === 'unit') {
      keys(item.ref,'kind,unitId');
      if (item.ref.kind !== 'source' || item.ref.unitId !== item.id || !idPattern.test(item.id)) fail();
      if (enriched && (!object(item.locator) || !['pending','verified','needs-review','blocked'].includes(item.status))) fail();
    } else if (item.type === 'exercise') {
      keys(item.ref,'kind,path,anchor');
      if (item.ref.kind !== 'markdown' || !isSafePath(item.ref.path) || typeof item.ref.anchor !== 'string' || !item.ref.anchor || !/-(?:promptRef|answerRef)$/.test(item.id)) fail();
    } else {
      keys(item.ref,'kind,path,id');
      if (item.ref.kind !== 'record' || item.ref.path !== 'study/curriculum.json' || item.ref.id !== item.id || !idPattern.test(item.id)) fail();
    }
    items.set(item.id, item);tokens.set(item.id, readerDocumentTokens(files.get(item.output)));
    if (item.type === 'exercise' && !tokens.get(item.id).anchors.includes(item.ref.anchor)) fail();
  }
  if (!Array.isArray(reader.documents) || reader.documents.length !== items.size) fail();
  const documents = new Map();
  for (const document of reader.documents) {
    keys(document, 'id,anchors,links');
    if (!items.has(document.id) || documents.has(document.id) || !Array.isArray(document.links)) fail();
    uniqueStrings(document.anchors);
    if (JSON.stringify(document.anchors) !== JSON.stringify(tokens.get(document.id).anchors)) fail();
    documents.set(document.id, document);
  }
  for (const document of reader.documents) {
    const hrefs = new Set();
    for (const link of document.links) {
      keys(link, 'ownerId,href,target');
      if (link.ownerId !== document.id || typeof link.href !== 'string' || !link.href || hrefs.has(link.href) || !tokens.get(document.id).hrefs.includes(link.href)) fail();
      if (/[\\\0%?:]/.test(link.href) || link.href.startsWith('/') || link.href.split('#').length > 2) fail();
      const fragment = link.href.includes('#') ? link.href.split('#')[1] : null;
      if (fragment === '') fail();
      hrefs.add(link.href);
      const target = link.target;
      if (!object(target)) fail();
      if (target.kind === 'document') {
        keys(target, 'kind,documentId,anchor');
        if (!documents.has(target.documentId) || target.anchor !== fragment) fail();
        if (target.anchor === null) {
          if (!['lesson','concept'].includes(items.get(target.documentId).type) || link.href.includes('#')) fail();
        } else if (typeof target.anchor !== 'string' || !documents.get(target.documentId).anchors.includes(target.anchor)) fail();
        // Check original paths where both published selectors provide them.
        // Unit/record refs do not supply document paths; never infer those from IDs.
        const ownerRef = items.get(document.id).ref, targetRef = items.get(target.documentId).ref;
        if (ownerRef.kind === 'markdown' && targetRef.kind === 'markdown') {
          const file = link.href.split('#')[0];
          const resolved = file ? path.posix.normalize(path.posix.join(path.posix.dirname(ownerRef.path), file)) : ownerRef.path;
          if (resolved !== targetRef.path) fail();
        }
      } else if (target.kind === 'asset') {
        keys(target, 'kind,member');
        const match = typeof target.member === 'string' && /^assets\/([a-f0-9]{64})\.(?:png|jpe?g|webp)$/.exec(target.member);
        if (!match || fragment !== null || !Buffer.isBuffer(files.get(target.member)) || sha256(files.get(target.member)) !== match[1]) fail();
        if (/^\.\.\/assets\/[a-f0-9]{64}\.(?:png|jpe?g|webp)$/.test(link.href) && link.href.slice(3) !== target.member) fail();
      } else if (target.kind === 'page') {
        keys(target, 'kind,groups');
        if (!Array.isArray(target.groups) || !target.groups.length || link.href.includes('#')) fail();
        const units = new Set(), spans = new Set();let pdfPage;
        for (const group of target.groups) {
          keys(group, 'documentId,unitIds');uniqueStrings(group.unitIds, idPattern);
          if (!group.unitIds.length || !group.unitIds.includes(group.documentId)) fail();
          const representative = items.get(group.documentId);
          if (!representative || representative.type !== 'unit' || spans.has(representative.output)) fail();
          const groupOutputs = new Set();
          for (const id of group.unitIds) {
            const item = items.get(id);
            if (!item || item.type !== 'unit' || units.has(id) || spans.has(item.output) || !files.get(item.output).equals(files.get(representative.output))) fail();
            units.add(id);groupOutputs.add(item.output);
            if (item.locator?.pdfPage !== undefined) {
              if (pdfPage !== undefined && pdfPage !== item.locator.pdfPage) fail();
              pdfPage = item.locator.pdfPage;
            }
          }
          for (const output of groupOutputs) spans.add(output);
        }
      } else fail();
    }
  }
  const lessons = records(reader.lessons, 'id,order,outcomeIds,exerciseIds');
  const concepts = records(reader.concepts, 'id,order');
  const outcomes = records(reader.outcomes, 'id,action,conditions,successCriterion,exerciseIds');
  const exercises = records(reader.exercises, 'id,outcomeIds,promptDocumentId,answerDocumentId,origin');
  for (const [collection, type] of [[lessons,'lesson'],[concepts,'concept']]) {
    for (const item of collection.values()) if (items.get(item.id)?.type !== type || !Number.isFinite(item.order)) fail();
    if ([...items.values()].some(item => item.type === type && !collection.has(item.id))) fail();
  }
  const linkedOutcomes = new Set();
  for (const lesson of lessons.values()) {
    uniqueStrings(lesson.outcomeIds,idPattern);uniqueStrings(lesson.exerciseIds,idPattern);
    const expected = new Set();
    for (const id of lesson.outcomeIds) {
      if (!outcomes.has(id)) fail();linkedOutcomes.add(id);
      for (const exercise of outcomes.get(id).exerciseIds) expected.add(exercise);
    }
    if (!sameSet(lesson.exerciseIds,[...expected])) fail();
  }
  for (const outcome of outcomes.values()) {
    if (!linkedOutcomes.has(outcome.id) || ['action','conditions','successCriterion'].some(key => typeof outcome[key] !== 'string' || !outcome[key].trim())) fail();
    uniqueStrings(outcome.exerciseIds,idPattern);
    for (const id of outcome.exerciseIds) if (!exercises.has(id) || !exercises.get(id).outcomeIds.includes(outcome.id)) fail();
  }
  const exerciseDocuments = new Set();
  for (const exercise of exercises.values()) {
    uniqueStrings(exercise.outcomeIds,idPattern);
    if (!exercise.outcomeIds.length || !['source','supplemental'].includes(exercise.origin)) fail();
    for (const id of exercise.outcomeIds) if (!outcomes.has(id) || !outcomes.get(id).exerciseIds.includes(exercise.id)) fail();
    for (const [field,suffix] of [['promptDocumentId','promptRef'],['answerDocumentId','answerRef']]) {
      const id = exercise[field];
      if (id !== exercise.id+'-'+suffix || items.get(id)?.type !== 'exercise' || exerciseDocuments.has(id)) fail();
      exerciseDocuments.add(id);
    }
  }
  return true;
}
