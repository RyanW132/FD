import test from 'node:test';
import assert from 'node:assert/strict';
import {learnerFixture} from './fixtures/learner/helpers.mjs';
import {readGeneration} from '../lib/publication.mjs';
import {readFile} from 'node:fs/promises';
test('real state/routes modules pass frozen v3 authored dialect and whole-generation verification',async t=>{
 const {root,id}=await learnerFixture(t),generation=await readGeneration(root,id);
 for(const name of ['state','routes'])assert.deepEqual(await generation.readBytes(`ui/${name}.mjs`),await readFile(new URL(`../app/${name}.mjs`,import.meta.url)));
});
