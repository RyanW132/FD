import { buildPublication } from '../study/lib/publication.mjs';
const args=process.argv.slice(2),allowed=['--publish','--preview-draft','--json','--builder-version=3'];
const invalid=args.filter(x=>!allowed.includes(x));
// The default stays builder version 2; the browser reader bundle (v3) is an explicit opt-in.
const builderVersion=args.includes('--builder-version=3')?3:2;
const result=invalid.length?{ok:false,errors:[{code:'FLAG',message:'Unsupported build flag'}]}:await buildPublication(process.cwd(),{publish:args.includes('--publish'),previewDraft:args.includes('--preview-draft'),builderVersion});
console.log(JSON.stringify(result,null,2));process.exitCode=result.ok?0:1;
