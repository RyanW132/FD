import {
  readFile,readdir
} from 'node:fs/promises';
import path from 'node:path';
import {
  sha256,confinedPath
} from '../study/lib/contracts.mjs';
const args=process.argv.slice(2),errors=[];
for(const arg of args)if(!['--check','--json'].includes(arg))errors.push({
  code:'FLAG',message:`Unsupported flag ${arg}`
});
const baseline=Object.values(JSON.parse(await readFile('study/sources/manifest.json','utf8')).sources).map(s=>({
  path:s.originalPath,sha256:s.sha256,bytes:s.byteLength
}));
async function walk(dir){
  let out=[];
  for(const ent of await readdir(dir,{
    withFileTypes:true
  })){
    const p=path.posix.join(dir,ent.name);
    if(ent.name==='.DS_Store')continue;
    if(ent.isDirectory())out.push(...await walk(p));
    else if(ent.isFile())out.push(p);
    else errors.push({
      code:'MEMBERSHIP',path:p,message:'Unexpected non-file source entry'
    });
  }
  return out;
}
const actual=(await walk('context')).sort(),expected=baseline.map(s=>s.path).sort();
if(JSON.stringify(actual)!==JSON.stringify(expected))errors.push({
  code:'MEMBERSHIP',message:'Original source membership differs from immutable G1 preflight baseline',expected,actual
});
for(const source of baseline)try{
  const bytes=await readFile(await confinedPath(process.cwd(),source.path));
  if(sha256(bytes)!==source.sha256||bytes.length!==source.bytes)errors.push({
    code:'ORIGINAL_HASH',path:source.path,message:'Original bytes differ from baseline'
  });
}catch(e){
  errors.push({
    code:'ORIGINAL_HASH',path:source.path,message:e.message
  });
}
console.log(JSON.stringify({
  ok:errors.length===0,checked:baseline.length,errors
},null,2));
process.exitCode=errors.length?1:0;
