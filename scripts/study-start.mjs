import { spawn } from 'node:child_process';
import { buildPublication, readGeneration } from '../study/lib/publication.mjs';
import { startStudyServer } from '../study/lib/server.mjs';

// `npm run start`: publish an explicit draft preview of the current files with the
// browser reader bundle, then serve it on the fixed loopback origin. A failed build
// keeps the last good reader generation; nothing is published automatically later.
const args=process.argv.slice(2);
const usage='Usage: npm run start [-- --no-build] [--no-open] [--port N]';
let build=true,open=true,port=4173;
for(let i=0;i<args.length;i++){
  if(args[i]==='--no-build')build=false;
  else if(args[i]==='--no-open')open=false;
  else if(args[i]==='--port'&&/^[1-9][0-9]{0,4}$/.test(args[i+1]??'')&&Number(args[i+1])<=65535)port=Number(args[++i]);
  else{console.error(usage);process.exit(2);}
}
const root=process.cwd();
const log=message=>console.log('[study] '+message);

if(build){
  log('Building a draft preview of the current lessons and sources (this takes a few seconds)…');
  const started=Date.now();
  const result=await buildPublication(root,{publish:true,previewDraft:true,builderVersion:3});
  if(result.ok)log(`Published draft preview ${result.digest.slice(0,12)} in ${((Date.now()-started)/1000).toFixed(1)}s — ${result.report.status}.`);
  else{
    log('The current files could not be published:');
    for(const error of result.errors.slice(0,10))console.log(`  ${error.code}: ${error.message}`);
    if(result.errors.length>10)console.log(`  …and ${result.errors.length-10} more (run node scripts/study-validate.mjs --sources --coverage --curriculum --graph --preview-draft).`);
  }
}
let current;
try{current=await readGeneration(root);}catch{current=null;}
if(!current||current.builderVersion!==3){
  log('No browser reader publication is available yet, so the reader cannot start.');
  process.exit(1);
}
if(build)log(`Serving publication ${current.digest.slice(0,12)}${current.catalog.draft?' (draft preview)':''}.`);

let server;
try{server=await startStudyServer(root,{port});}
catch{
  log(`Could not listen on 127.0.0.1:${port}. Is the reader already running? Stop it first (Ctrl+C in its terminal) or pass --port N; a different port has separate saved notes.`);
  process.exit(1);
}
const address=server.origin+'/';
log(`Reader ready at ${address}  (Ctrl+C to stop)`);
log('Your notes are saved in this browser for this exact address.');
if(open){
  const command=process.platform==='darwin'?['open',[address]]:process.platform==='win32'?['cmd',['/c','start','',address]]:['xdg-open',[address]];
  try{const child=spawn(command[0],command[1],{stdio:'ignore',detached:true});child.on('error',()=>{});child.unref();}catch{}
}
let stopping=false;
const stop=async()=>{if(stopping)return;stopping=true;log('Stopping…');try{await server.close();}catch{process.exitCode=1;}};
process.once('SIGINT',stop);process.once('SIGTERM',stop);
