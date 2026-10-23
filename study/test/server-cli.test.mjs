import net from 'node:net';
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { rm } from 'node:fs/promises';
import { startStudyServer } from '../lib/server.mjs';
import { serverFixture, freePort, request, repository } from './fixtures/server/helpers.mjs';
function launch(t,root,args){
  const child=spawn(process.execPath,[`${repository}/scripts/study-serve.mjs`,...args],{cwd:root,windowsHide:true,stdio:['ignore','pipe','pipe']});let stdout='',stderr='';
  child.stdout.on('data',chunk=>{stdout+=chunk;});child.stderr.on('data',chunk=>{stderr+=chunk;});
  const exited=once(child,'exit');t.after(async()=>{if(child.exitCode===null&&child.signalCode===null)child.kill('SIGTERM');await exited;});
  return {child,exited,get stdout(){return stdout;},get stderr(){return stderr;}};
}
async function ready(process){
  const deadline=Date.now()+10000;
  while(!process.stdout.includes('\n')){if(process.child.exitCode!==null)throw Error('CLI exited: '+process.stderr);if(Date.now()>deadline)throw Error('CLI startup timeout');await new Promise(resolve=>setTimeout(resolve,20));}
  return JSON.parse(process.stdout.trim());
}
test('CLI uses selected port/cwd, reports generic readiness, serves HTTP and shuts down cleanly',async t=>{
  const {root,id}=await serverFixture(t),port=await freePort(),process=launch(t,root,['--port',String(port)]);assert.deepEqual(await ready(process),{ok:true,origin:`http://127.0.0.1:${port}`});
  assert.equal((await request(port)).headers.location,`/g/${id}/ui/index.html`);process.child.kill('SIGTERM');const [code,signal]=await process.exited;assert.equal(code,0);assert.equal(signal,null);assert.equal(process.stderr,'');
});
test('CLI cold-start and port conflict exit nonzero with no listening fallback or path disclosure',async t=>{
  const {root}=await serverFixture(t),port=await freePort(),server=await startStudyServer(root,{port});t.after(()=>server.close());
  let process=launch(t,root,['--port',String(port)]);assert.equal((await process.exited)[0],1);assert.equal(process.stdout,'');assert.deepEqual(JSON.parse(process.stderr),{ok:false,error:'Unable to start study server'});
  await rm(`${root}/study/generated/current.json`);const coldPort=await freePort();process=launch(t,root,['--port',String(coldPort)]);assert.equal((await process.exited)[0],1);assert.equal(process.stdout,'');await assert.rejects(request(coldPort));
});
test('CLI rejects unsupported, missing, duplicate and noncanonical port options without listening',async t=>{
  const {root}=await serverFixture(t);
  for(const args of [['--host','0.0.0.0'],['--port'],['--port','0'],['--port','-1'],['--port','65536'],['--port','4.2'],['--port','04173'],['--port','1e3'],['--port','4173','--port','4174'],['--publish'],['--port=4173']]){const process=launch(t,root,args);assert.equal((await process.exited)[0],1,args.join(' '));assert.equal(process.stdout,'');assert.doesNotMatch(process.stderr,/ENOENT|node_modules|study\//);}
});


for(const mode of ['upgrade','connect'])test(`CLI SIGTERM closes held rejected ${mode} transport within deadline`,async t=>{
  const {root}=await serverFixture(t),port=await freePort(),process=launch(t,root,['--port',String(port)]);await ready(process);
  const socket=net.connect({host:'127.0.0.1',port,allowHalfOpen:true});socket.on('error',()=>{});t.after(()=>socket.destroy());
  await once(socket,'connect');let response='';socket.on('data',bytes=>response+=bytes);const ended=once(socket,'end'),host=`127.0.0.1:${port}`;
  socket.write(mode==='connect'?`CONNECT ${host} HTTP/1.1\r\nHost: ${host}\r\n\r\n`:`GET / HTTP/1.1\r\nHost: ${host}\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n`);
  await ended;assert.match(response,/^HTTP\/1.1 400/);assert.match(response,/Content-Security-Policy:/i);
  process.child.kill('SIGTERM');let timer;
  const result=await Promise.race([process.exited,new Promise(resolve=>{timer=setTimeout(()=>resolve(null),1800);})]);clearTimeout(timer);
  socket.destroy();await process.exited;assert.deepEqual(result,[0,null]);assert.equal(process.stderr,'');
});
