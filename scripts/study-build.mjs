import { buildPublication } from '../study/lib/publication.mjs';
const args=process.argv.slice(2),allowed=['--publish','--preview-draft','--json'];
const invalid=args.filter(x=>!allowed.includes(x));
const result=invalid.length?{ok:false,errors:[{code:'FLAG',message:'Unsupported build flag'}]}:await buildPublication(process.cwd(),{publish:args.includes('--publish'),previewDraft:args.includes('--preview-draft')});
console.log(JSON.stringify(result,null,2));process.exitCode=result.ok?0:1;
