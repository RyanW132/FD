import {
  validateProject
} from '../study/lib/contracts.mjs';
const args=process.argv.slice(2);
const allowed=['--sources','--coverage','--curriculum','--context-budget','--graph','--json'];
const unknown=args.filter(a=>!allowed.includes(a));
if(unknown.length){
  console.log(JSON.stringify({
    ok:false,errors:unknown.map(flag=>({
      code:'UNIMPLEMENTED_FLAG',message:`Unsupported check: ${flag}`
    }))
  }));
  process.exitCode=1;
}
else{
  const selected=args.some(a=>['--sources','--coverage','--curriculum','--context-budget'].includes(a));
  const options=Object.fromEntries(['sources','coverage','curriculum','contextBudget'].map((key,i)=>[key,!selected||args.includes(['--sources','--coverage','--curriculum','--context-budget'][i])]));
  const result=await validateProject(process.cwd(),options);
  if(args.includes('--graph')&&result.ok){
    try {const {openKnowledge}=await import('../study/lib/knowledge.mjs');const {graph}=await openKnowledge(process.cwd());result.graph={nodes:graph.nodes.length,edges:graph.edges.length,inputDigest:graph.inputDigest};}
    catch(error){result.ok=false;result.errors.push({code:'GRAPH',message:error.message});}
  }
  console.log(JSON.stringify(result,null,2));
  process.exitCode=result.ok?0:1;
}
