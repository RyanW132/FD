import { constants } from 'node:fs';
import { readdir, lstat, readFile, realpath, open } from 'node:fs/promises';
import path from 'node:path';
import { isSafePath, isPrivatePath, sha256, projectFiles } from './contracts.mjs';
function freeze(value){if(value&&typeof value==='object'){Object.freeze(value);for(const v of Object.values(value))freeze(v);}return value;}
const excluded=new Set(['generated','private','pilot','test']);
async function membership(root){
  const files=[];
  async function walk(rel){
    let entries;try{if(!rel.includes('/'))await exactPath(root,rel);entries=await readdir(path.join(root,rel),{withFileTypes:true});}catch(e){if(e.code==='ENOENT')return;throw e;}
    for(const e of entries.sort((a,b)=>a.name.localeCompare(b.name))){
      const p=rel+'/'+e.name;
      if(isPrivatePath(p)||rel==='study'&&excluded.has(e.name))continue;
      if(e.isSymbolicLink())throw Error('Symlink in candidate tree');
      if(e.isDirectory())await walk(p);else if(e.isFile())files.push(p);else throw Error('Unsupported candidate entry');
    }
  }
  await walk('study');await walk('context');
  for(const p of ['AGENTS.md','CONTEXT.md','CLAUDE.md'])try{await exactPath(root,p);files.push(p);}catch(e){if(e.code!=='ENOENT')throw e;}
  return files.sort();
}
// Compare actual stored directory entries rather than approximating filesystem
// case folding. No name cache: each read and post-read check uses fresh entries.
async function exactPath(root,p){
  let current=root;
  for(const part of p.split('/')){
    const parent=current;current=path.join(parent,part);
    const s=await lstat(current);if(s.isSymbolicLink())throw Error('Symlink capture path');
    if(!(await readdir(parent)).includes(part))throw Error('Non-exact capture path (filesystem alias)');
  }
  return current;
}
export async function readConfinedBytes(root,p){
  if(!isSafePath(p))throw Error('Unsafe capture path');
  const current=await exactPath(root,p);
  const before=await lstat(current,{bigint:true});
  const fd=await open(current,constants.O_RDONLY|constants.O_NOFOLLOW);
  try{
    const opened=await fd.stat({bigint:true});
    if(!opened.isFile()||opened.dev!==before.dev||opened.ino!==before.ino)throw Error('Capture identity changed');
    const bytes=await fd.readFile();const after=await fd.stat({bigint:true}),named=await lstat(current,{bigint:true});
    if(after.dev!==opened.dev||after.ino!==opened.ino||after.size!==BigInt(bytes.length)||after.mtimeNs!==opened.mtimeNs||after.ctimeNs!==opened.ctimeNs||named.dev!==opened.dev||named.ino!==opened.ino||named.isSymbolicLink())throw Error('Capture identity changed');
    const resolved=await realpath(current);if(!resolved.startsWith(root+path.sep))throw Error('Capture escaped root');
    await exactPath(root,p);
    return bytes;
  }finally{await fd.close();}
}
export async function assertNoIngestionBatch(root){
  try{await lstat(path.join(root,'study/.ingestion-lock'));}
  catch(e){if(e.code==='ENOENT')return;throw e;}
  throw Error('Source ingestion batch is active or requires inspection');
}
export async function captureProject(root,{testHooks={},additionalInputs=[]}={}){
  root=await realpath(root);
  await assertNoIngestionBatch(root);
  if(!Array.isArray(additionalInputs)||additionalInputs.some(p=>!isSafePath(p)||isPrivatePath(p))||new Set(additionalInputs).size!==additionalInputs.length)throw Error('Unsafe additional capture inputs');
  const additional=[...additionalInputs];
  const initial=await membership(root),files=new Map();
  async function add(p){if(!files.has(p))files.set(p,await readConfinedBytes(root,p));}
  for(const p of [...initial,...additional])await add(p);
  const records={};for(const [key,p] of Object.entries(projectFiles)){await add(p);records[key]=JSON.parse(files.get(p));}
  // JSON references and review inputs close over exact input bytes, including denied originals.
  async function visit(value){
    if(!value||typeof value!=='object')return;
    if(typeof value.path==='string')await add(value.path);
    if(typeof value.originalPath==='string')await add(value.originalPath);
    for(const v of Object.values(value))if(v&&typeof v==='object')await visit(v);
  }
  await visit(records);
  const readBytes=async p=>{if(!isSafePath(p)||!files.has(p))throw Error('Path not captured');return Buffer.from(files.get(p));};
  const entries=[...files].sort(([a],[b])=>a.localeCompare(b)).map(([p,b])=>({path:p,sha256:sha256(b),byteLength:b.length}));
  const digest=sha256(JSON.stringify(entries));
  async function recheck(){
    await assertNoIngestionBatch(root);
    if(JSON.stringify(await membership(root))!==JSON.stringify(initial))throw Error('Candidate membership changed');
    for(const [p,b] of files)if(!b.equals(await readConfinedBytes(root,p)))throw Error('Candidate bytes changed');
    await assertNoIngestionBatch(root);
  }
  await testHooks.afterCapture?.();
  await recheck();
  return Object.freeze({readBytes,records:freeze(JSON.parse(JSON.stringify(records))),membership:Object.freeze(initial),digest,recheck});
}
