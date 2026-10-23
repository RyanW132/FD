import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile, stat, utimes, symlink, mkdtemp, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fixture } from './fixtures/publication/helpers.mjs';
import { captureProject } from '../lib/capture.mjs';

test('explicit additional inputs are captured before digest, omitted node_modules stays uncaptured',async t=>{
  const {root}=await fixture(t);await mkdir(`${root}/node_modules/vendor`,{recursive:true});await writeFile(`${root}/node_modules/vendor/a.js`,'first');await writeFile(`${root}/node_modules/vendor/unused.js`,'unused');
  const baseline=await captureProject(root),capture=await captureProject(root,{additionalInputs:['node_modules/vendor/a.js']});
  assert.notEqual(capture.digest,baseline.digest);assert.equal((await capture.readBytes('node_modules/vendor/a.js')).toString(),'first');
  await assert.rejects(capture.readBytes('node_modules/vendor/unused.js'),/not captured/);
  await writeFile(`${root}/node_modules/vendor/unused.js`,'changed');await capture.recheck();
  const before=await stat(`${root}/node_modules/vendor/a.js`);await writeFile(`${root}/node_modules/vendor/a.js`,'other');await utimes(`${root}/node_modules/vendor/a.js`,before.atime,before.mtime);
  await assert.rejects(capture.recheck(),/bytes changed/);
});

test('additional input freshness applies inside afterCapture and does not admit symlink aliases',async t=>{
  const {root}=await fixture(t);await writeFile(`${root}/package.json`,'{}');
  await assert.rejects(captureProject(root,{additionalInputs:['package.json'],testHooks:{afterCapture:()=>writeFile(`${root}/package.json`,'[]')}}),/bytes changed/);
  await symlink('package.json',`${root}/alias.json`);await assert.rejects(captureProject(root,{additionalInputs:['alias.json']}),/Symlink/);
  await assert.rejects(captureProject(root,{additionalInputs:['../outside']}),/Unsafe/);
});


test('additional inputs preserve exact stored spelling on a case-alias-capable host',async t=>{
  const {root:source}=await fixture(t);
  const parent=await mkdtemp(path.join(process.env.FD_CASE_ALIAS_TEST_PARENT??tmpdir(),'fd-additional-case-'));
  t.after(()=>rm(parent,{recursive:true,force:true}));const root=path.join(parent,'fixture');await cp(source,root,{recursive:true});
  await writeFile(`${root}/ExactPackage.json`,'{}');
  try{await stat(`${root}/exactpackage.json`);}catch(e){if(e.code==='ENOENT'){t.skip('Host has distinct case-sensitive spellings');return;}throw e;}
  const exact=await captureProject(root,{additionalInputs:['ExactPackage.json']});assert.equal((await exact.readBytes('ExactPackage.json')).toString(),'{}');
  await assert.rejects(captureProject(root,{additionalInputs:['exactpackage.json']}),/Non-exact capture path/);
});
