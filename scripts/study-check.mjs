import {
  spawnSync
} from 'node:child_process';
import {
  readdir,readFile
} from 'node:fs/promises';
const args=process.argv.slice(2),results=[],errors=[];
const allowed=['--syntax','--static','--publication-boundary','--original-hashes','--json'];
for(const a of args)if(!allowed.includes(a))errors.push({
  code:'FLAG',message:`Unsupported check ${a}`
});
async function walk(dir){
  let files=[];
  for(const ent of await readdir(dir,{
    withFileTypes:true
  })){
    if(['pilot','private','generated','node_modules'].includes(ent.name))continue;
    const p=`${dir}/${ent.name}`;
    if(ent.isDirectory())files.push(...await walk(p));
    else if(p.endsWith('.mjs'))files.push(p);
  }
  return files;
}
const files=[...await walk('scripts'),...await walk('study')];
if(args.includes('--syntax')){
  for(const file of files){
    const r=spawnSync(process.execPath,['--check',file],{
      encoding:'utf8',windowsHide:true
    });
    if(r.status!==0)errors.push({
      code:'SYNTAX',path:file,message:r.stderr
    });
  }results.push({
    check:'node --check',files:files.length
  });
}
if(args.includes('--static')){
  for(const file of files){
    const text=await readFile(file,'utf8');
    if(/\beval\s*\(|\bnew\s+Function\s*\(/.test(text))errors.push({
      code:'STATIC',path:file,message:'Dynamic code evaluation prohibited'
    });
  }results.push({
    check:'bounded-static',rules:['no eval/new Function'],note:'Not ESLint or a typechecker',files:files.length
  });
}
if(args.includes('--original-hashes')){
  const r=spawnSync(process.execPath,['scripts/study-inventory.mjs','--check'],{
    encoding:'utf8',windowsHide:true
  });
  try{
    results.push({
      check:'original-hashes',...JSON.parse(r.stdout)
    });
  }catch{
    errors.push({
      code:'INVENTORY',message:r.stderr||r.stdout
    });
  }
  if(r.status!==0)errors.push({
    code:'INVENTORY',message:'Original inventory failed'
  });
}
if(args.includes('--publication-boundary')){
  try{
    const {readGeneration}=await import('../study/lib/publication.mjs');
    const generation=await readGeneration(process.cwd());
    results.push({check:'immutable-generation-integrity',digest:generation.digest,ok:true,note:'Verifies manifest membership and captured payload hashes; does not certify lesson pedagogy or future browser rendering'});
  }catch(error){errors.push({code:'PUBLICATION_BOUNDARY',message:error.message});}
}
if(!args.some(a=>allowed.includes(a)&&a!=='--json'))errors.push({
  code:'CHECK_SELECTION',message:'Select an implemented check explicitly'
});
console.log(JSON.stringify({
  ok:errors.length===0,results,errors
},null,2));
process.exitCode=errors.length?1:0;
