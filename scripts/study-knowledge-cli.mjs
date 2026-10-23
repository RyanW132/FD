import { openKnowledge, queryKnowledge, readKnowledge, readLocalPrivate } from '../study/lib/knowledge.mjs';

export async function runKnowledgeCLI(command, args = process.argv.slice(2)) {
  const values = {}, switches = new Set();
  const valueFlags = new Set(['--id','--query','--offset','--limit','--max-bytes','--revision','--output']);
  for (let i=0; i<args.length; i++) {
    const flag=args[i];
    if (valueFlags.has(flag)) {
      if (Object.hasOwn(values,flag) || !args[i+1] || args[i+1].startsWith('--')) throw Error('Missing or duplicate flag value');
      values[flag]=args[++i];
    } else if (['--json','--full','--preview-draft','--include-private'].includes(flag)) {
      if (switches.has(flag)) throw Error('Duplicate flag');
      switches.add(flag);
    }
    else throw Error('Unsupported flag');
  }
  const allowed = command==='query' ? ['--query','--offset','--limit','--max-bytes','--revision'] : command==='read' ? ['--id','--offset','--max-bytes','--revision','--output'] : [];
  if (Object.keys(values).some(flag=>!allowed.includes(flag)) || command!=='read' && switches.has('--full')) throw Error('Unsupported command flag');
  const options={};
  for (const [flag,key] of [['--offset','offset'],['--limit','limit'],['--max-bytes','maxBytes']]) if (Object.hasOwn(values,flag)) {
    if (!/^\d+$/.test(values[flag])) throw Error('Invalid numeric flag');
    options[key]=Number(values[flag]);
  }
  if (values['--revision']) options.revision=values['--revision'];
  if (switches.has('--include-private')) {
    if(command!=='read'||switches.has('--preview-draft'))throw Error('Private mode supports source-unit read only');
    return readLocalPrivate(process.cwd(),values['--id'],{...options,full:switches.has('--full'),output:values['--output']});
  }
  if(values['--output'])throw Error('Output file requires explicit local private read');
  const knowledge=await openKnowledge(process.cwd(),{channel:'agent',previewDraft:switches.has('--preview-draft')});
  if (command==='query') return queryKnowledge(knowledge.index,values['--query'],options);
  if (command==='read') return readKnowledge(knowledge.projection,values['--id'],{...options,full:switches.has('--full')});
  if (command==='graph') return knowledge.graph;
  throw Error('Unknown command');
}
