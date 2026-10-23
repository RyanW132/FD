import { runKnowledgeCLI } from './study-knowledge-cli.mjs';
try { console.log(JSON.stringify(await runKnowledgeCLI('read'))); }
catch (error) { console.log(JSON.stringify({ok:false,errors:[{code:'KNOWLEDGE',message:error.message}]})); process.exitCode=1; }
