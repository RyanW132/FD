import { ingest, applyQA } from '../study/lib/ingestion.mjs';
const args=process.argv.slice(2),options={sourceIds:[]},reviewPaths=[];
try{
  for(let i=0;i<args.length;i++){
    const a=args[i];
    if(a==='--all-approved')options.allApproved=true;
    else if(a==='--pilot')options.pilot=true;
    else if(a==='--resume-existing')options.resumeExisting=true;
    else if(a==='--dry-run')options.dryRun=true;
    else if(a==='--apply-qa'){if(!args[i+1]||args[i+1].startsWith('--'))throw Error('Missing review path');reviewPaths.push(args[++i]);}
    else if(a==='--source'||a==='--tool-dir'){if(!args[i+1]||args[i+1].startsWith('--'))throw Error('Missing flag value');if(a==='--source')options.sourceIds.push(args[++i]);else options.toolDir=args[++i];}
    else throw Error('Unsupported ingestion flag: '+a);
  }
  if(options.allApproved&&(options.pilot||options.sourceIds.length))throw Error('Conflicting source selectors');
  if(reviewPaths.length&&(options.allApproved||options.pilot||options.sourceIds.length||options.dryRun||options.resumeExisting||options.toolDir))throw Error('QA application cannot be combined with extraction flags');
  console.log(JSON.stringify(reviewPaths.length?await applyQA(process.cwd(),reviewPaths):await ingest(process.cwd(),options),null,2));
}catch(e){console.error(JSON.stringify({ok:false,error:e.message}));process.exitCode=1;}
