import { startStudyServer } from '../study/lib/server.mjs';
const args=process.argv.slice(2);
try{
  if(args.length!==0&&(args.length!==2||args[0]!=='--port'||!/^([1-9][0-9]{0,4})$/.test(args[1])||Number(args[1])>65535))throw Error('Invalid arguments');
  const server=await startStudyServer(process.cwd(),{port:args.length?Number(args[1]):4173});
  console.log(JSON.stringify({ok:true,origin:server.origin}));
  let stopping=false;
  const stop=async()=>{if(stopping)return;stopping=true;try{await server.close();}catch{process.exitCode=1;}};
  process.once('SIGINT',stop);process.once('SIGTERM',stop);
}catch{
  console.error(JSON.stringify({ok:false,error:'Unable to start study server'}));process.exitCode=1;
}
