import { renderDocument } from './render.mjs';
import { openLearnerState, previewImport } from './state.mjs';
import { loadRoutes } from './routes.mjs';

// Trusted application chrome. Untrusted lesson/source Markdown only reaches the
// page through renderDocument; everything built here uses textContent.
const root = document.getElementById('app');
const ASSESSMENTS = ['not started', 'working on it', 'I can explain this'];
const ASSESSMENT_LABELS = { 'not started': 'Not started', 'working on it': 'Working on it', 'I can explain this': 'I can explain this' };
const VIEWS = ['roadmap', 'search', 'knowledge', 'study', 'status', 'help'];
const PAGE_SIZE = 40;
let routes = null;
let session = null;
let index = null;
let learner = { schemaVersion: 1, records: [], view: { documentId: null, anchor: null, focus: null, selection: null, scrollY: 0 } };
let disposers = [];
let railDisposers = [];
let railTrigger = null;
let currentDocumentId = null;
let currentRendered = null;
let draftTimer = null;
let shell = null;

// The trusted dialect requires literal element names, so chrome may only create
// the elements listed here.
const TAGS = {
  a: () => document.createElement('a'), aside: () => document.createElement('aside'), button: () => document.createElement('button'),
  code: () => document.createElement('code'), dd: () => document.createElement('dd'), details: () => document.createElement('details'),
  div: () => document.createElement('div'), dl: () => document.createElement('dl'), dt: () => document.createElement('dt'),
  fieldset: () => document.createElement('fieldset'), form: () => document.createElement('form'), h1: () => document.createElement('h1'),
  h2: () => document.createElement('h2'), header: () => document.createElement('header'), img: () => document.createElement('img'),
  input: () => document.createElement('input'), label: () => document.createElement('label'), legend: () => document.createElement('legend'),
  li: () => document.createElement('li'), nav: () => document.createElement('nav'), ol: () => document.createElement('ol'),
  p: () => document.createElement('p'), pre: () => document.createElement('pre'), section: () => document.createElement('section'),
  span: () => document.createElement('span'), strong: () => document.createElement('strong'), summary: () => document.createElement('summary'),
  table: () => document.createElement('table'), tbody: () => document.createElement('tbody'), td: () => document.createElement('td'),
  textarea: () => document.createElement('textarea'), th: () => document.createElement('th'), thead: () => document.createElement('thead'),
  tr: () => document.createElement('tr'), ul: () => document.createElement('ul'),
};
function el(tag, props, children) {
  const make = TAGS[tag];
  if (!make) throw Error('Unsupported element');
  const node = make();
  for (const [key, value] of Object.entries(props ?? {})) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'text') node.textContent = value;
    else if (key === 'className') node.className = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else if (value === true) node.setAttribute(key, '');
    else node.setAttribute(key, String(value));
  }
  for (const child of [].concat(children ?? [])) {
    if (child === null || child === undefined || child === false) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}
function push(map, key, value) {
  const list = map.get(key) ?? [];
  if (!list.includes(value)) list.push(value);
  map.set(key, list);
}
function hashFor(params) { return '#' + new URLSearchParams(params).toString(); }
function documentHash(id, anchor) { return routes.fragmentFor(id, anchor ?? null); }

// ---------- Published selection index ----------

function buildIndex(model) {
  const bundle = model.bundle;
  const items = new Map(bundle.catalog.items.map(item => [item.id, item]));
  const nodes = new Map(bundle.graph.nodes.map(node => [node.id, node]));
  const lessons = [...bundle.reader.lessons].sort((a, b) => a.order - b.order);
  const concepts = [...bundle.reader.concepts].sort((a, b) => a.order - b.order);
  const outcomes = new Map(bundle.reader.outcomes.map(outcome => [outcome.id, outcome]));
  const exercises = new Map(bundle.reader.exercises.map(exercise => [exercise.id, exercise]));
  const lectureLessons = new Map(), lectureOf = new Map(), requires = new Map(), requiredBy = new Map();
  const sourceOf = new Map(), citedBy = new Map(), conceptLessons = new Map(), lessonConcepts = new Map();
  const outcomeLessons = new Map(), lessonOfExercise = new Map();
  for (const lesson of lessons) {
    for (const id of lesson.outcomeIds) push(outcomeLessons, id, lesson.id);
    for (const id of lesson.exerciseIds) lessonOfExercise.set(id, lesson.id);
  }
  for (const edge of bundle.graph.edges) {
    const from = nodes.get(edge.from), to = items.get(edge.to);
    if (edge.type === 'contains' && from?.type === 'lecture' && to?.type === 'lesson') { push(lectureLessons, edge.from, edge.to); lectureOf.set(edge.to, edge.from); }
    if (edge.type === 'contains' && from?.type === 'source' && to?.type === 'unit') sourceOf.set(edge.to, edge.from.slice(7));
    if (edge.type === 'requires') { push(requires, edge.from, edge.to); push(requiredBy, edge.to, edge.from); }
    if ((edge.type === 'cites' || edge.type === 'covers') && items.get(edge.from)?.type === 'lesson' && to?.type === 'unit') push(citedBy, edge.to, edge.from);
    if (edge.type === 'uses') for (const lessonId of outcomeLessons.get(edge.from) ?? []) { push(conceptLessons, edge.to, lessonId); push(lessonConcepts, lessonId, edge.to); }
  }
  const lectures = [...nodes.values()].filter(node => node.type === 'lecture').map(node => ({
    id: node.id, title: node.title,
    lessonIds: lessons.filter(lesson => lectureOf.get(lesson.id) === node.id).map(lesson => lesson.id),
  })).filter(lecture => lecture.lessonIds.length).sort((a, b) => lessons.findIndex(l => l.id === a.lessonIds[0]) - lessons.findIndex(l => l.id === b.lessonIds[0]));
  const searchDocuments = bundle.search.documents.map(document => ({ id: document.id, haystack: (document.title + '\n' + document.text).toLowerCase(), text: document.text }));
  return { items, nodes, lessons, concepts, outcomes, exercises, lectures, lectureOf, requires, requiredBy, sourceOf, citedBy, conceptLessons, lessonConcepts, lessonOfExercise, searchDocuments, report: bundle.report, draft: bundle.catalog.draft };
}
function sourceName(id) {
  if (!id) return 'Source';
  return id.split('-').map((word, i) => i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(' ');
}
function unitLabel(item) {
  const locator = item.locator ?? {};
  const parts = [sourceName(index.sourceOf.get(item.id))];
  if (locator.pdfPage !== undefined) parts.push('physical page ' + locator.pdfPage);
  if (locator.region) parts.push(locator.region);
  return parts.join(' · ');
}
function exerciseLesson(id) {
  const exercise = [...index.exercises.values()].find(value => value.promptDocumentId === id || value.answerDocumentId === id);
  return exercise ? index.lessonOfExercise.get(exercise.id) ?? null : null;
}
function titleOf(id) {
  const item = index.items.get(id);
  if (!item) return id;
  if (item.type === 'unit') return unitLabel(item);
  if (item.type === 'exercise') {
    const lessonId = exerciseLesson(id);
    return item.title + (lessonId ? ' — ' + index.items.get(lessonId).title : '');
  }
  return item.title;
}
function typeLabel(type) { return { lesson: 'Lesson', concept: 'Concept', unit: 'Source evidence', exercise: 'Exercise' }[type] ?? type; }

// ---------- Learner state ----------

function recordFor(id) { return learner.records.find(record => record.id === id) ?? null; }
function assessmentOf(id) { return recordFor(id)?.assessment ?? 'not started'; }
function setField(id, field, value) {
  let record = recordFor(id);
  if (!record) { record = { id, notes: '', answer: '', teachBack: '', assessment: 'not started' }; learner.records.push(record); }
  record[field] = value;
  commitEdit();
}
function commitEdit() {
  try { session.edit(JSON.stringify(learner)); }
  catch { announce('This change is too large to keep (each note is limited to 64 KB).', true); }
  updateSaveStatus();
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => { session.checkpointDraft().catch(() => {}); }, 2000);
}
function viewState() {
  return { documentId: currentDocumentId, anchor: null, focus: null, selection: null, scrollY: Math.min(10000000, Math.max(0, Math.round(window.scrollY))) };
}
async function saveNow() {
  learner.view = viewState();
  try { session.edit(JSON.stringify(learner)); } catch { announce('Your notes could not be prepared for saving.', true); return; }
  updateSaveStatus('saving');
  const result = await session.save();
  if (result.status === 'saved') announce('Saved on this browser.');
  else if (result.status === 'conflict') announce('Another tab saved newer notes. Your version is still here: download it from My study before reloading.', true);
  else announce('Your notes are still here, but they could not be saved. Download a copy from My study before closing this tab.', true);
  updateSaveStatus();
}
function saveLabel() {
  const status = session.status();
  if (status.mode !== 'ready') return 'Not saved on this device';
  if (status.lastStatus === 'saving') return 'Saving…';
  if (status.lastStatus === 'conflict') return 'Save conflict — see My study';
  if (status.lastStatus === 'failed') return 'Save failed';
  return status.dirty ? 'Unsaved changes' : 'All notes saved';
}
function updateSaveStatus(override) {
  if (!shell) return;
  shell.saveStatus.textContent = override === 'saving' ? 'Saving…' : saveLabel();
  shell.saveButton.disabled = !session.status().dirty;
}
function announce(message, urgent) {
  shell.live.textContent = '';
  shell.live.className = urgent ? 'fd-live fd-live-error' : 'fd-live';
  requestAnimationFrame(() => { shell.live.textContent = message; });
}

// ---------- Shell ----------

function buildShell() {
  const nav = el('nav', { 'aria-label': 'Main' }, VIEWS.map(view => el('a', { href: view === 'roadmap' ? '#' : hashFor({ view }), 'data-view': view, text: { roadmap: 'Roadmap', search: 'Search', knowledge: 'Knowledge', study: 'My study', status: 'Status', help: 'Instructions' }[view] })));
  const saveStatus = el('span', { className: 'fd-save-status', role: 'status' });
  const saveButton = el('button', { type: 'button', className: 'fd-button', onclick: () => saveNow() }, 'Save notes');
  const skip = el('button', { type: 'button', className: 'fd-skip', onclick: () => focusMain() }, 'Skip to content');
  const header = el('header', { className: 'fd-header' }, [
    el('a', { href: '#', className: 'fd-brand' }, [el('span', { className: 'fd-brand-mark', 'aria-hidden': 'true', text: 'FD' }), el('span', { text: 'Fieldnotes' })]),
    nav,
    el('div', { className: 'fd-save' }, [saveStatus, saveButton]),
  ]);
  const banner = el('div', { className: 'fd-banner', role: 'note' }, index.draft
    ? [el('strong', { text: 'Draft preview' }), ' — teaching has not passed independent review. Check important points against the cited source evidence.']
    : [el('strong', { text: 'Published study content' }), ' — readiness details are on the Status page.']);
  const storage = el('div', { className: 'fd-banner fd-banner-error', role: 'alert', hidden: session.status().mode === 'ready' },
    'Notes are not being saved on this device. They stay in this tab until you close it; use My study to download a copy.');
  const updateButton = el('button', { type: 'button', className: 'fd-button', onclick: () => refreshGeneration() }, 'Load new content');
  const update = el('div', { className: 'fd-banner fd-banner-update', hidden: true }, ['New study content has been published. ', updateButton]);
  const live = el('div', { className: 'fd-live', 'aria-live': 'polite' });
  const rail = el('aside', { className: 'fd-rail', id: 'fd-rail', 'aria-label': 'Source evidence', hidden: true });
  const layout = el('div', { className: 'fd-layout' });
  document.body.insertBefore(skip, root);
  document.body.insertBefore(header, root);
  document.body.insertBefore(banner, root);
  document.body.insertBefore(storage, root);
  document.body.insertBefore(update, root);
  document.body.insertBefore(layout, root);
  layout.append(root, rail);
  document.body.append(live);
  root.tabIndex = -1;
  root.className = 'fd-main';
  shell = { nav, saveStatus, saveButton, update, live, rail, layout, storage };
  updateSaveStatus();
  window.addEventListener('beforeunload', event => { if (session.status().dirty) { event.preventDefault(); event.returnValue = ''; } });
}
function focusMain() {
  const heading = root.querySelector('h1');
  (heading ?? root).focus();
}
function setActiveNav(view) {
  for (const link of shell.nav.querySelectorAll('a')) {
    if (link.getAttribute('data-view') === view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}
function clearMain() {
  for (const dispose of disposers) dispose();
  disposers = [];
  root.replaceChildren();
}
function heading(text) { return el('h1', { tabindex: '-1', text }); }

// ---------- Routing ----------

function parseHash() {
  const hash = location.hash;
  if (!hash || hash === '#') return { view: 'roadmap' };
  if (hash.startsWith('#document=')) {
    try { const target = routes.parseFragment(hash); return { view: 'document', documentId: target.documentId, anchor: target.anchor }; }
    catch { return { view: 'missing' }; }
  }
  const params = new URLSearchParams(hash.slice(1));
  const view = params.get('view');
  if (VIEWS.includes(view)) return { view, query: params.get('q') ?? '', page: Number(params.get('page') ?? '1') };
  return { view: 'missing' };
}
async function route() {
  const target = parseHash();
  clearMain();
  currentDocumentId = null;
  currentRendered = null;
  setActiveNav(target.view === 'document' ? (index.items.get(target.documentId)?.type === 'concept' ? 'knowledge' : 'roadmap') : target.view);
  try {
    if (target.view === 'document') await showDocument(target.documentId, target.anchor);
    else if (target.view === 'search') showSearch(target.query, target.page);
    else if (target.view === 'knowledge') showKnowledge();
    else if (target.view === 'study') showStudy();
    else if (target.view === 'status') showStatus();
    else if (target.view === 'help') showHelp();
    else if (target.view === 'missing') showMissing();
    else showRoadmap();
  } catch {
    clearMain();
    root.append(heading('This page could not be shown'), el('p', { text: 'The published content for this page could not be loaded or verified. Your notes are unaffected.' }), el('p', {}, el('a', { href: '#', text: 'Back to the roadmap' })));
  }
  if (target.view !== 'document' || !target.anchor) { window.scrollTo(0, 0); focusMain(); }
}
function navigate(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}
function onNavigate(target, trigger) {
  if (target.kind === 'document') {
    const type = index.items.get(target.documentId)?.type;
    if (type === 'unit') { openRail({ kind: 'units', ids: [target.documentId] }, trigger); return; }
    if (target.documentId === currentDocumentId && target.anchor && trigger.closest('.fd-main')) {
      history.pushState(null, '', documentHash(target.documentId, target.anchor));
      scrollToAnchor(target.anchor);
      return;
    }
    navigate(documentHash(target.documentId, target.anchor));
    return;
  }
  if (target.kind === 'page') { openRail({ kind: 'units', ids: target.groups.map(group => group.documentId) }, trigger); return; }
  if (target.kind === 'asset') openRail({ kind: 'image', src: trigger.getAttribute('href'), label: trigger.textContent }, trigger);
}

// ---------- Roadmap ----------

function showRoadmap() {
  const resumeId = learner.view?.documentId;
  const resume = resumeId && index.items.has(resumeId)
    ? el('p', { className: 'fd-resume' }, ['Resume where you saved: ', el('a', { href: documentHash(resumeId, null), text: titleOf(resumeId) })])
    : null;
  root.append(
    heading('Financial derivatives study roadmap'),
    el('p', { className: 'fd-lede', text: 'Work through the lectures in order. Each lesson lists what it builds on, explains every step, links to the exact source slide and ends with practice, separate answers and a teach-back. Your self-assessment is your own choice; reading a lesson never marks it as learned.' }),
  );
  if (resume) root.append(resume);
  if (!index.lessons.length) {
    root.append(el('p', { className: 'fd-empty', text: 'Sources are available, but no teaching has been published yet. Search still covers the verified source evidence.' }));
    return;
  }
  for (const lecture of index.lectures) {
    const done = lecture.lessonIds.filter(id => assessmentOf(id) === 'I can explain this').length;
    root.append(el('section', { className: 'fd-lecture', 'aria-labelledby': 'lec-' + lecture.id }, [
      el('h2', { id: 'lec-' + lecture.id, text: lecture.title }),
      el('p', { className: 'fd-muted', text: lecture.lessonIds.length + ' lessons · you marked ' + done + ' as “I can explain this”' }),
      el('ol', { className: 'fd-lesson-list' }, lecture.lessonIds.map(id => lessonRow(id))),
    ]));
  }
  root.append(el('section', { className: 'fd-lecture' }, [
    el('h2', { text: 'Concept references' }),
    el('p', { className: 'fd-muted', text: 'Short look-up pages for shared mathematical and financial ideas. Lessons link to them where they are needed.' }),
    el('ul', { className: 'fd-chip-list' }, index.concepts.map(concept => el('li', {}, el('a', { href: documentHash(concept.id, null), text: index.items.get(concept.id).title })))),
  ]));
}
function lessonRow(id) {
  const assessment = assessmentOf(id);
  return el('li', { className: 'fd-lesson-row' }, [
    el('a', { href: documentHash(id, null), text: index.items.get(id).title }),
    el('span', { className: 'fd-pill fd-pill-' + ASSESSMENTS.indexOf(assessment), text: ASSESSMENT_LABELS[assessment] }),
  ]);
}

// ---------- Documents ----------

async function showDocument(id, anchor) {
  const item = index.items.get(id);
  if (!item) { showMissing(); return; }
  if (item.type === 'exercise') {
    const lessonId = exerciseLesson(id);
    if (lessonId && item.ref.anchor) { navigate(documentHash(lessonId, item.ref.anchor)); return; }
  }
  currentDocumentId = id;
  const loaded = await routes.readDocument(id);
  const rendered = await renderDocument({ text: loaded.text, documentId: id, routes, onNavigate });
  disposers.push(() => rendered.dispose());
  const article = rendered.element;
  root.append(breadcrumb(item), article);
  let title = article.querySelector('h1');
  if (title) title.tabIndex = -1;
  else { title = heading(titleOf(id)); article.prepend(title); }
  const context = item.type === 'lesson' ? lessonContext(id) : item.type === 'concept' ? conceptContext(id) : unitContext(item);
  title.after(draftNote(item), context);
  if (item.type === 'lesson') {
    enhanceExercises(id, rendered);
    root.append(workspace(id), lessonPager(id));
  }
  if (item.type === 'concept') root.append(workspace(id));
  currentRendered = rendered;
  if (anchor && !scrollToAnchor(anchor)) { window.scrollTo(0, 0); focusMain(); }
}
function scrollToAnchor(anchor) {
  const target = currentRendered?.anchorElement(anchor);
  if (!target) return false;
  openAncestors(target);
  const block = blockOf(target, currentRendered.element);
  const focusable = block?.nextElementSibling ?? block;
  requestAnimationFrame(() => { target.scrollIntoView(); if (focusable) { focusable.tabIndex = -1; focusable.focus({ preventScroll: true }); } });
  return true;
}
function breadcrumb(item) {
  const parts = [el('a', { href: '#', text: 'Roadmap' })];
  if (item.type === 'lesson') {
    const lecture = index.nodes.get(index.lectureOf.get(item.id));
    if (lecture) parts.push(el('span', { text: lecture.title }));
  }
  if (item.type === 'concept') parts.push(el('a', { href: hashFor({ view: 'knowledge' }), text: 'Concept references' }));
  if (item.type === 'unit') parts.push(el('span', { text: 'Source evidence' }));
  return el('nav', { className: 'fd-breadcrumb', 'aria-label': 'Breadcrumb' }, parts);
}
function draftNote(item) {
  if (item.type === 'unit') return el('p', { className: 'fd-note', text: 'Normalized source transcription with its original slide image. This is evidence from the course material, not an explanation.' });
  return el('p', { className: 'fd-note' }, [el('strong', { text: index.draft ? 'Unreviewed draft. ' : '' }), 'Content readiness is separate from your own progress, which only you set below.']);
}
function linkList(ids) {
  return el('ul', { className: 'fd-chip-list' }, ids.filter(id => index.items.has(id)).map(id => el('li', {}, el('a', { href: documentHash(id, null), text: index.items.get(id).title }))));
}
function lessonContext(id) {
  const before = index.requires.get(id) ?? [];
  const after = (index.requiredBy.get(id) ?? []).filter(other => index.items.get(other)?.type === 'lesson');
  const concepts = index.lessonConcepts.get(id) ?? [];
  return el('div', { className: 'fd-context' }, [
    before.length ? el('div', {}, [el('h2', { className: 'fd-context-title', text: 'Builds on' }), linkList(before)]) : null,
    concepts.length ? el('div', {}, [el('h2', { className: 'fd-context-title', text: 'Concept references' }), linkList(concepts)]) : null,
    after.length ? el('div', {}, [el('h2', { className: 'fd-context-title', text: 'Leads to' }), linkList(after)]) : null,
  ]);
}
function conceptContext(id) {
  const lessons = index.conceptLessons.get(id) ?? [];
  const before = index.requires.get(id) ?? [];
  return el('div', { className: 'fd-context' }, [
    before.length ? el('div', {}, [el('h2', { className: 'fd-context-title', text: 'Builds on' }), linkList(before)]) : null,
    lessons.length ? el('div', {}, [el('h2', { className: 'fd-context-title', text: 'Used in lessons' }), linkList(lessons)]) : null,
  ]);
}
function unitContext(item) {
  const lessons = index.citedBy.get(item.id) ?? [];
  return el('div', { className: 'fd-context' }, [
    el('p', {}, [el('strong', { text: unitLabel(item) }), item.status ? ' · source QA: ' + item.status : '']),
    lessons.length ? el('div', {}, [el('h2', { className: 'fd-context-title', text: 'Taught in' }), linkList(lessons)]) : null,
  ]);
}
function lessonPager(id) {
  const position = index.lessons.findIndex(lesson => lesson.id === id);
  const previous = index.lessons[position - 1], next = index.lessons[position + 1];
  return el('nav', { className: 'fd-pager', 'aria-label': 'Lesson order' }, [
    previous ? el('a', { href: documentHash(previous.id, null) }, ['← ', index.items.get(previous.id).title]) : el('span'),
    next ? el('a', { href: documentHash(next.id, null) }, [index.items.get(next.id).title, ' →']) : el('span'),
  ]);
}
// Explicit anchors render as inline markers; their top-level block is the unit
// that sections of a lesson are built from.
function blockOf(node, article) {
  let current = node;
  while (current && current.parentElement !== article) current = current.parentElement;
  return current ?? null;
}
function openAncestors(node) {
  for (let current = node; current; current = current.parentElement) if (current.tagName === 'DETAILS') current.open = true;
}

// Answers are folded behind a disclosure and every prompt gets an attempt box.
// Opening an answer never changes progress.
function enhanceExercises(lessonId, rendered) {
  const lesson = index.lessons.find(value => value.id === lessonId);
  const article = rendered.element;
  const anchors = routes.model.bundle.reader.documents.find(document => document.id === lessonId).anchors;
  const markerFor = anchor => blockOf(rendered.anchorElement(anchor), article);
  const nextMarker = anchor => {
    for (let i = anchors.indexOf(anchor) + 1; i < anchors.length; i++) { const node = markerFor(anchors[i]); if (node) return node; }
    return null;
  };
  const exercises = lesson.exerciseIds.map(id => index.exercises.get(id)).filter(Boolean);
  exercises.sort((a, b) => anchors.indexOf(index.items.get(a.promptDocumentId).ref.anchor) - anchors.indexOf(index.items.get(b.promptDocumentId).ref.anchor));
  exercises.forEach((exercise, position) => {
    const answerAnchor = index.items.get(exercise.answerDocumentId).ref.anchor;
    const start = markerFor(answerAnchor);
    if (!start) return;
    const end = nextMarker(answerAnchor);
    const details = el('details', { className: 'fd-answer' }, el('summary', { text: 'Show answer ' + (position + 1) + (exercise.origin === 'source' ? ' (source question)' : '') }));
    start.before(details);
    while (details.nextSibling && details.nextSibling !== end) details.append(details.nextSibling);
  });
  exercises.forEach((exercise, position) => {
    const promptAnchor = index.items.get(exercise.promptDocumentId).ref.anchor;
    const start = markerFor(promptAnchor);
    if (!start) return;
    const end = nextMarker(promptAnchor);
    const field = el('textarea', { className: 'fd-textarea', rows: '4', id: 'attempt-' + exercise.id, oninput: event => setField(exercise.id, 'answer', event.target.value) });
    field.value = recordFor(exercise.id)?.answer ?? '';
    const box = el('div', { className: 'fd-attempt' }, [el('label', { for: 'attempt-' + exercise.id, text: 'Your attempt at exercise ' + (position + 1) + ' (kept on this browser)' }), field]);
    if (end) end.before(box); else article.append(box);
  });
}
function workspace(id) {
  const record = recordFor(id);
  const notes = el('textarea', { className: 'fd-textarea', rows: '5', id: 'notes-' + id, oninput: event => setField(id, 'notes', event.target.value) });
  notes.value = record?.notes ?? '';
  const teach = el('textarea', { className: 'fd-textarea', rows: '6', id: 'teach-' + id, oninput: event => setField(id, 'teachBack', event.target.value) });
  teach.value = record?.teachBack ?? '';
  const choices = ASSESSMENTS.map(value => {
    const input = el('input', { type: 'radio', name: 'assessment-' + id, value, id: 'assess-' + id + '-' + ASSESSMENTS.indexOf(value), onchange: () => { setField(id, 'assessment', value); } });
    input.checked = (record?.assessment ?? 'not started') === value;
    return el('label', { className: 'fd-choice', for: input.id }, [input, ' ' + ASSESSMENT_LABELS[value]]);
  });
  return el('section', { className: 'fd-workspace', 'aria-labelledby': 'ws-' + id }, [
    el('h2', { id: 'ws-' + id, text: 'My notes and self-assessment' }),
    el('p', { className: 'fd-muted', text: 'Private to this browser. Nothing here is graded, and reading or revealing answers never changes it.' }),
    el('label', { for: notes.id, text: 'Notes' }), notes,
    el('label', { for: teach.id, text: 'Teach it back in your own words' }), teach,
    el('fieldset', { className: 'fd-fieldset' }, [el('legend', { text: 'How well can you explain this?' }), ...choices]),
    el('p', {}, el('button', { type: 'button', className: 'fd-button', onclick: () => saveNow() }, 'Save notes')),
  ]);
}

// ---------- Evidence rail ----------

async function openRail(request, trigger) {
  for (const dispose of railDisposers) dispose();
  railDisposers = [];
  railTrigger = trigger;
  const rail = shell.rail;
  const title = el('h2', { tabindex: '-1', id: 'fd-rail-title', text: request.kind === 'image' ? 'Original slide image' : 'Source evidence' });
  const body = el('div', { className: 'fd-rail-body' }, el('p', { className: 'fd-muted', text: 'Loading source…' }));
  rail.replaceChildren(el('div', { className: 'fd-rail-head' }, [
    title,
    el('div', { className: 'fd-rail-actions' }, [
      el('button', { type: 'button', className: 'fd-button-quiet', onclick: () => closeRail(true) }, 'Back to explanation'),
      el('button', { type: 'button', className: 'fd-button-quiet', 'aria-label': 'Close source evidence', onclick: () => closeRail(true) }, 'Close'),
    ]),
  ]), body);
  rail.hidden = false;
  shell.layout.classList.add('fd-layout-rail');
  title.focus();
  if (window.innerWidth < 1040) rail.scrollIntoView();
  try {
    if (request.kind === 'image') {
      body.replaceChildren(el('p', { text: request.label }), el('img', { src: request.src, alt: 'Original slide page: ' + request.label }));
      return;
    }
    const parts = [];
    for (const id of request.ids) {
      const loaded = await routes.readDocument(id);
      const rendered = await renderDocument({ text: loaded.text, documentId: id, routes, onNavigate: (target, node) => onNavigate(target, node) });
      railDisposers.push(() => rendered.dispose());
      parts.push(el('section', { className: 'fd-rail-unit' }, [
        el('p', { className: 'fd-locator' }, [el('a', { href: documentHash(id, null), text: unitLabel(index.items.get(id)) })]),
        rendered.element,
      ]));
    }
    body.replaceChildren(...parts);
  } catch {
    body.replaceChildren(el('p', { className: 'fd-error', text: 'This source evidence is not available in the current publication.' }));
  }
}
function closeRail(returnFocus) {
  for (const dispose of railDisposers) dispose();
  railDisposers = [];
  shell.rail.hidden = true;
  shell.rail.replaceChildren();
  shell.layout.classList.remove('fd-layout-rail');
  if (returnFocus && railTrigger && railTrigger.isConnected) railTrigger.focus();
  railTrigger = null;
}

// ---------- Search ----------

function showSearch(query, page) {
  const input = el('input', { type: 'search', id: 'fd-q', name: 'q', autocomplete: 'off' });
  input.value = query;
  const form = el('form', { className: 'fd-search', role: 'search', onsubmit: event => { event.preventDefault(); navigate(hashFor({ view: 'search', q: input.value.trim() })); } }, [
    el('label', { for: 'fd-q', text: 'Search all published lessons, concepts, exercises and source evidence' }),
    el('div', { className: 'fd-search-row' }, [input, el('button', { type: 'submit', className: 'fd-button' }, 'Search')]),
  ]);
  root.append(heading('Search'), form);
  const terms = query.toLowerCase().split(' ').filter(Boolean);
  if (!terms.length) { root.append(el('p', { className: 'fd-muted', text: 'Every word must appear. Results open the complete document, not just the snippet.' })); return; }
  const results = [];
  for (const document of index.searchDocuments) {
    let score = 0, first = -1, ok = true;
    for (const term of terms) {
      const at = document.haystack.indexOf(term);
      if (at < 0) { ok = false; break; }
      if (first < 0 || at < first) first = at;
      score += document.haystack.split(term).length - 1;
    }
    if (ok) results.push({ id: document.id, score: score + (index.items.get(document.id).type === 'lesson' ? 5 : 0), first, text: document.text, haystack: document.haystack });
  }
  results.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const shown = Math.max(1, page) * PAGE_SIZE;
  root.append(el('p', { role: 'status', text: results.length ? results.length + ' matching documents in this publication' : 'No matches in this publication.' }));
  root.append(el('ol', { className: 'fd-results' }, results.slice(0, shown).map(result => {
    const item = index.items.get(result.id);
    const lessonId = item.type === 'exercise' ? exerciseLesson(item.id) : null;
    const offset = Math.max(0, result.haystack.indexOf(terms[0]) - 90);
    const snippet = (offset ? '…' : '') + result.text.slice(offset, offset + 240).split('\n').join(' ') + '…';
    return el('li', { className: 'fd-result' }, [
      el('span', { className: 'fd-pill', text: typeLabel(item.type) }),
      ' ',
      el('a', { href: lessonId && item.ref.anchor ? documentHash(lessonId, item.ref.anchor) : documentHash(item.id, null), text: titleOf(item.id) }),
      el('p', { className: 'fd-snippet', text: snippet }),
    ]);
  })));
  if (results.length > shown) root.append(el('p', {}, el('a', { href: hashFor({ view: 'search', q: query, page: String(Math.max(1, page) + 1) }), text: 'Show ' + Math.min(PAGE_SIZE, results.length - shown) + ' more results' })));
}

// ---------- Knowledge list ----------

function showKnowledge() {
  root.append(heading('Knowledge map (list view)'), el('p', { className: 'fd-lede', text: 'How lessons and concepts depend on each other. “Builds on” is the prerequisite order; other relationships are for navigation only.' }));
  root.append(el('h2', { text: 'Concepts' }));
  root.append(el('dl', { className: 'fd-map' }, index.concepts.flatMap(concept => [
    el('dt', {}, el('a', { href: documentHash(concept.id, null), text: index.items.get(concept.id).title })),
    el('dd', {}, [
      relation('Builds on', index.requires.get(concept.id) ?? []),
      relation('Used in', index.conceptLessons.get(concept.id) ?? []),
    ]),
  ])));
  for (const lecture of index.lectures) {
    root.append(el('h2', { text: lecture.title }));
    root.append(el('dl', { className: 'fd-map' }, lecture.lessonIds.flatMap(id => [
      el('dt', {}, el('a', { href: documentHash(id, null), text: index.items.get(id).title })),
      el('dd', {}, [relation('Builds on', index.requires.get(id) ?? []), relation('Concepts', index.lessonConcepts.get(id) ?? [])]),
    ])));
  }
}
function relation(label, ids) {
  const known = ids.filter(id => index.items.has(id));
  if (!known.length) return el('p', { className: 'fd-muted', text: label + ': none' });
  const parts = [label + ': '];
  known.forEach((id, i) => { if (i) parts.push(', '); parts.push(el('a', { href: documentHash(id, null), text: index.items.get(id).title })); });
  return el('p', {}, parts);
}

// ---------- My study ----------

function showStudy() {
  root.append(heading('My study'), el('p', { className: 'fd-lede', text: 'Your notes, attempts and self-assessments are stored only in this browser (on this exact address). Clearing browser data removes them, so download a copy now and then.' }));
  const rows = learner.records.filter(record => record.notes || record.answer || record.teachBack || record.assessment !== 'not started');
  if (!rows.length) root.append(el('p', { className: 'fd-empty', text: 'Nothing saved yet. Open a lesson to write notes or attempt an exercise.' }));
  else root.append(el('table', { className: 'fd-table' }, [
    el('thead', {}, el('tr', {}, [el('th', { scope: 'col', text: 'Item' }), el('th', { scope: 'col', text: 'Your assessment' }), el('th', { scope: 'col', text: 'Saved text' })])),
    el('tbody', {}, rows.map(record => {
      const lessonId = index.exercises.has(record.id) ? index.lessonOfExercise.get(record.id) : null;
      const available = index.items.has(record.id) || lessonId;
      const label = index.items.has(record.id) ? titleOf(record.id) : lessonId ? 'Exercise in ' + index.items.get(lessonId).title : record.id + ' (no longer published — kept as an orphan note)';
      const size = [record.notes, record.answer, record.teachBack].filter(Boolean).map(text => text.length).reduce((a, b) => a + b, 0);
      return el('tr', {}, [
        el('td', {}, available ? el('a', { href: lessonId ? documentHash(lessonId, null) : documentHash(record.id, null), text: label }) : label),
        el('td', { text: ASSESSMENT_LABELS[record.assessment] }),
        el('td', { text: size ? size + ' characters' : '—' }),
      ]);
    })),
  ]));
  const download = (factory, name) => {
    const link = factory();
    const anchor = el('a', { href: link.href, download: name });
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => link.revoke(), 10000);
  };
  const file = el('input', { type: 'file', accept: 'application/json,.json', id: 'fd-import' });
  const importStatus = el('p', { role: 'status' });
  const importButton = el('button', { type: 'button', className: 'fd-button', onclick: () => importState(file, importStatus) }, 'Import');
  root.append(el('section', { className: 'fd-workspace' }, [
    el('h2', { text: 'Back up and restore' }),
    el('p', {}, [el('button', { type: 'button', className: 'fd-button', onclick: () => download(() => session.downloadState(), 'fd-notes.json') }, 'Download my notes'), ' ', el('button', { type: 'button', className: 'fd-button-quiet', onclick: () => download(() => session.downloadRecovery(), 'fd-recovery.json') }, 'Download recovery data')]),
    el('p', { className: 'fd-muted', text: 'Downloads contain only your own notes and progress, never course content. Recovery data also includes saved backups and drafts from other tabs.' }),
    el('label', { for: 'fd-import', text: 'Restore from a downloaded notes file' }),
    el('div', { className: 'fd-search-row' }, [file, importButton]),
    importStatus,
  ]));
}
async function importState(file, status) {
  if (session.status().dirty) { status.textContent = 'Save your current notes first; importing replaces them (a backup is kept).'; return; }
  const chosen = file.files?.[0];
  if (!chosen) { status.textContent = 'Choose a file first.'; return; }
  let preview;
  try { preview = previewImport(await chosen.text()); } catch { status.textContent = 'That file is not a valid FD notes export. Nothing was changed.'; return; }
  const previous = JSON.stringify(learner);
  const result = await session.applyImport(preview);
  if (result.status === 'saved') {
    learner = JSON.parse(session.exportRaw());
    status.textContent = 'Imported ' + preview.recordCount + ' records. Your previous notes were kept as a backup.';
    updateSaveStatus();
    return;
  }
  try { session.edit(previous); } catch { }
  learner = JSON.parse(previous);
  status.textContent = 'Import could not be saved, so your previous notes are back in this tab. Use Save notes to keep them.';
  updateSaveStatus();
}

// ---------- Status and instructions ----------

function showStatus() {
  const report = index.report;
  const flag = value => value ? 'Yes' : 'Not yet';
  root.append(heading('Publication status'), el('table', { className: 'fd-table' }, el('tbody', {}, [
    ['Publication', routes.generationDigest.slice(0, 12)],
    ['Mode', index.draft ? 'Draft preview (unreviewed teaching)' : 'Reviewed publication'],
    ['Status', report.status],
    ['Every source page and line accounted for', flag(report.readiness.accountingComplete)],
    ['All supplied material converted and verified', flag(report.readiness.conversionComplete)],
    ['Teaching complete and independently reviewed', flag(report.readiness.teachingComplete)],
    ['Lessons / concepts in this publication', index.lessons.length + ' / ' + index.concepts.length],
    ['Source items withheld (unverified or restricted)', String(report.omitted)],
  ].map(([label, value]) => el('tr', {}, [el('th', { scope: 'row', text: label }), el('td', { text: value })])))));
  root.append(el('p', { className: 'fd-muted', text: 'Readiness describes the content, not your learning. Withheld items are counted but never named here.' }));
}
function showHelp() {
  const code = text => el('pre', { className: 'fd-code' }, el('code', { text }));
  root.append(
    heading('Instructions'),
    el('h2', { text: 'Start the reader' }),
    code('npm run start'),
    el('p', { text: 'This rebuilds a draft preview from the current files, then serves it at http://127.0.0.1:4173/ . Keep using the same address so your notes stay available.' }),
    el('h2', { text: 'Improve lessons with an external agent' }),
    el('p', { text: 'Ask your repository agent to read AGENTS.md, CONTEXT.md and study/contracts/AGENTS.md first. It edits lesson Markdown and records as files; this reader never runs commands or sends anything anywhere. A subscription agent may send what it reads to its provider.' }),
    el('h2', { text: 'Check, then publish' }),
    code('node scripts/study-validate.mjs --sources --coverage --curriculum --context-budget --graph --preview-draft\nnode scripts/study-build.mjs --publish --preview-draft --builder-version=3 --json'),
    el('p', { text: 'A new publication appears here as “New study content has been published”. Choose Load new content; your saved notes and progress carry over.' }),
  );
}
function showMissing() {
  root.append(heading('Not available'), el('p', { text: 'This link does not match anything in the current publication. If it is an old bookmark, the content may have moved; your notes are kept under My study.' }), el('p', {}, el('a', { href: '#', text: 'Back to the roadmap' })));
}

// ---------- Updates ----------

async function pollUpdates() {
  try {
    const status = await routes.pollStatus();
    shell.update.hidden = !status.updateAvailable;
  } catch { }
}
async function refreshGeneration() {
  const result = await routes.refresh(session, viewState());
  if (result.status === 'navigating') return;
  if (result.status === 'unavailable') { shell.update.hidden = true; return; }
  announce('Your notes could not be saved, so the new content was not loaded. Your current page and notes are unchanged.', true);
  updateSaveStatus();
}

async function start() {
  root.replaceChildren(el('p', { className: 'fd-loading', text: 'Loading published study content…' }));
  try { routes = await loadRoutes(); }
  catch {
    root.replaceChildren(el('h1', { text: 'Study content unavailable' }), el('p', { text: 'The published study content could not be loaded or verified. Check that npm run start is still running, then try again.' }), el('button', { type: 'button', onclick: () => location.reload() }, 'Try again'));
    return;
  }
  index = buildIndex(routes.model);
  session = await openLearnerState();
  try { learner = JSON.parse(session.exportRaw()); } catch { }
  root.replaceChildren();
  buildShell();
  window.addEventListener('hashchange', () => { closeRail(false); route(); });
  await route();
  setInterval(pollUpdates, 30000);
}
start();
