import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
export async function rendererModule(t){const root=await mkdtemp(path.join(os.tmpdir(),'fd-renderer-module-'));t.after(()=>rm(root,{recursive:true,force:true}));await writeFile(path.join(root,'render.mjs'),await readFile(new URL('../../../app/render.mjs',import.meta.url)));for(const [name,file,out]of [['marked','lib/marked.esm.js','marked.esm.js'],['katex','dist/katex.mjs','katex.mjs'],['dompurify','dist/purify.es.mjs','purify.es.mjs']]){await mkdir(path.join(root,'vendor',name),{recursive:true});await writeFile(path.join(root,'vendor',name,out),await readFile(new URL('../../../../node_modules/'+name+'/'+file,import.meta.url)));}return import(pathToFileURL(path.join(root,'render.mjs')).href);}
