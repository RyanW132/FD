import net from 'node:net';
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn, execFile } from 'node:child_process';
import { once } from 'node:events';
import { promisify } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { uiMembers, validateUIBundle, bootstrapHTML } from '../lib/ui-bundle.mjs';
import { readGeneration, readCurrentDigest } from '../lib/publication.mjs';
import { startStudyServer } from '../lib/server.mjs';
import { openLearnerState, emptyState } from '../app/state.mjs';
import { serverFixture, freePort, request, repository } from './fixtures/server/helpers.mjs';

test('the repository reader app passes the trusted v3 dialect with the exact bootstrap shell', async () => {
  const files = new Map();
  for (const member of uiMembers) files.set(member.path, await readFile(`${repository}/${member.source}`));
  for (const name of ['reader.json', 'catalog.json', 'report.json', 'graph.json', 'search.json']) files.set(name, Buffer.from('{}'));
  assert.equal(files.get('ui/index.html').toString(), bootstrapHTML);
  assert.doesNotThrow(() => validateUIBundle(files));
});

test('state download exports only this tab’s learner-owned schema1 JSON', async () => {
  const session = await openLearnerState({ indexedDB: null, tabId: 'tab-download' });
  const state = emptyState();
  state.records = [{ id: 'lesson-one', notes: 'exact α\n', answer: '', teachBack: 'mine', assessment: 'working on it' }];
  session.edit(JSON.stringify(state));
  const link = session.downloadState();
  try {
    const blob = await (await fetch(link.href)).blob();
    assert.equal(blob.type, 'application/json');
    assert.equal(await blob.text(), session.exportRaw());
    assert.deepEqual(JSON.parse(await blob.text()), state);
  } finally { link.revoke(); }
});

test('current pointer helper reads only a valid pointer digest', async t => {
  const { root, id } = await serverFixture(t);
  assert.equal(await readCurrentDigest(root), id);
  await writeFile(`${root}/study/generated/current.json`, JSON.stringify({ schemaVersion: 1, digest: 'not-a-digest' }));
  await assert.rejects(readCurrentDigest(root), /digest/);
  await writeFile(`${root}/study/generated/current.json`, JSON.stringify({ schemaVersion: 1, digest: id, extra: true }));
  await assert.rejects(readCurrentDigest(root), /pointer/);
});

test('server reuses the verified current snapshot, answers the browser icon request and closes idle preconnections silently', async t => {
  const { root, id } = await serverFixture(t), port = await freePort(), server = await startStudyServer(root, { port });
  t.after(() => server.close());
  const before = await request(port, `/g/${id}/ui/index.html`);
  // Bytes on disk are never re-read for an unchanged pointer: the admitted snapshot stays current and is what is served.
  await writeFile(`${root}/study/generated/${id}/ui/index.html`, 'changed after admission');
  const status = JSON.parse((await request(port, '/status.json')).body);
  assert.deepEqual([status.digest, status.currentError], [id, false]);
  assert.deepEqual((await request(port, `/g/${id}/ui/index.html`)).body, before.body);
  await assert.rejects(readGeneration(root, id));
  const icon = await request(port, '/favicon.ico');
  assert.equal(icon.status, 204); assert.equal(icon.body.length, 0); assert.match(icon.headers['content-security-policy'], /default-src 'none'/);
  const idle = await new Promise(resolve => {
    const socket = net.connect({ host: '127.0.0.1', port }); let data = '';
    socket.on('data', bytes => { data += bytes; }); socket.on('error', () => {}); socket.on('close', () => resolve(data));
  });
  assert.equal(idle, '', 'an idle socket that sent nothing receives no racy 400 response');
});

function launchStart(t, root, args) {
  const child = spawn(process.execPath, [`${repository}/scripts/study-start.mjs`, ...args], { cwd: root, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  let stdout = '', stderr = '';
  child.stdout.on('data', chunk => { stdout += chunk; }); child.stderr.on('data', chunk => { stderr += chunk; });
  const exited = once(child, 'exit');
  t.after(async () => { if (child.exitCode === null && child.signalCode === null) child.kill('SIGTERM'); await exited; });
  return { child, exited, get stdout() { return stdout; }, get stderr() { return stderr; } };
}

test('npm start publishes a v3 draft preview of the current files, serves it on the chosen port and stops cleanly', async t => {
  const { root } = await serverFixture(t), port = await freePort();
  const started = launchStart(t, root, ['--no-open', '--port', String(port)]);
  const deadline = Date.now() + 60000;
  while (!started.stdout.includes('Reader ready')) {
    if (started.child.exitCode !== null) throw Error('start exited: ' + started.stdout + started.stderr);
    if (Date.now() > deadline) throw Error('start timeout: ' + started.stdout);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  const current = await readGeneration(root);
  assert.equal(current.builderVersion, 3); assert.equal(current.catalog.draft, true);
  assert.match(started.stdout, new RegExp(`Reader ready at http://127\\.0\\.0\\.1:${port}/`));
  assert.equal((await request(port)).headers.location, `/g/${current.digest}/ui/index.html`);
  started.child.kill('SIGTERM');
  assert.deepEqual(await started.exited, [0, null]);
});

test('npm start rejects unknown options without building or listening', async t => {
  const { root } = await serverFixture(t);
  const before = await readCurrentDigest(root);
  const started = launchStart(t, root, ['--bogus']);
  assert.equal((await started.exited)[0], 2);
  assert.match(started.stderr, /Usage/);
  assert.equal(await readCurrentDigest(root), before);
});

test('build CLI publishes v3 only on explicit request; validate rejects a stray draft flag', async t => {
  const { root } = await serverFixture(t);
  const run = args => promisify(execFile)(process.execPath, [`${repository}/scripts/study-build.mjs`, ...args], { cwd: root }).then(({ stdout }) => JSON.parse(stdout), error => JSON.parse(error.stdout));
  const v3 = await run(['--publish', '--builder-version=3', '--json']);
  assert.equal(v3.ok, true, JSON.stringify(v3.errors));
  assert.equal((await readGeneration(root, v3.digest)).builderVersion, 3);
  const v2 = await run(['--publish', '--json']);
  assert.equal((await readGeneration(root, v2.digest)).builderVersion, 2);
  assert.equal((await run(['--builder-version=4'])).errors[0].code, 'FLAG');
  const validate = await promisify(execFile)(process.execPath, [`${repository}/scripts/study-validate.mjs`, '--curriculum', '--preview-draft'], { cwd: root }).then(({ stdout }) => JSON.parse(stdout), error => JSON.parse(error.stdout));
  assert.equal(validate.ok, false); assert.equal(validate.errors.at(-1).code, 'FLAG');
});
