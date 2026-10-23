import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {serverFixture,repository,freePort} from '../server/helpers.mjs';
import {buildPublication} from '../../../lib/publication.mjs';
import {startStudyServer} from '../../../lib/server.mjs';
export async function learnerFixture(t){
 const {root}=await serverFixture(t,{raster:true});
 for(const name of ['state','routes'])await writeFile(`${root}/study/app/${name}.mjs`,await readFile(`${repository}/study/app/${name}.mjs`));
 await writeFile(`${root}/study/app/app.mjs`,"import { emptyState, validateState, previewImport, openLearnerState } from './state.mjs';\nimport { loadRoutes } from './routes.mjs';\nglobalThis.learnerTest = {emptyState,validateState,previewImport,openLearnerState};\nglobalThis.routeReady = loadRoutes().then(routes=>{globalThis.routesTest=routes;return true;}).catch(error=>{globalThis.routeError=error.message;return false;});\n");
 const built=await buildPublication(root,{publish:true,builderVersion:3});assert.equal(built.ok,true,JSON.stringify(built.errors));
 const server=await startStudyServer(root,{port:await freePort()});t.after(()=>server.close());
 return {root,id:built.digest,server};
}
