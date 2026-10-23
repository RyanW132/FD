import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { uiMembers, validateUIBundle } from '../lib/ui-bundle.mjs';
const html='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Study helper</title><link rel="stylesheet" href="./styles.css"></head><body><main id="app"></main><script type="module" src="./app.mjs"></script></body></html>\n';
const routes="const READER_URL = new URL('../reader.json', import.meta.url);\nconst GENERATION_ROOT = new URL('../', import.meta.url);\nexport { READER_URL, GENERATION_ROOT };\n";
async function bundle(){const files=new Map([['reader.json',Buffer.from('{}')]]);for(const member of uiMembers)files.set(member.path,member.sha256?await readFile(member.source):Buffer.from(member.path.endsWith('.html')?html:member.path.endsWith('.css')?'body { color: black; }':member.path.endsWith('routes.mjs')?routes:'const local = 1; export { local };'));return files;}
const invalidJS=[
  "import './state.mjs';", "import * as state from './state.mjs';", "import x from 'marked';", "import x from '/x.mjs';", "import x from './state.mjs?x';", "import x from './state.mjs#x';", "import x from './%73tate.mjs';", "import x from './state.mjs' with {type:'json'};", "import x from './state.mjs'", "const n = 1; import x from './state.mjs';", "export { x } from './state.mjs';", 'export const x = 1;', "import('./state.mjs');", 'const text = `template`;', 'const café = 1;', String.raw`const \u0061 = 1;`, 'const re = /x/;', 'const n = 4 / 2;', '/* unterminated', "const text = 'unterminated", 'new Worker("./state.mjs");','new SharedWorker("./state.mjs");','navigator.serviceWorker.register("./state.mjs");','new WebSocket("wss://x");','new EventSource("https://x");','new XMLHttpRequest();','ev'+'al("1");','new '+'Function("return 1");','fetch("../reader.json");','document.createElement("script");',"const u = new URL('../reader.json', import.meta.url);",
];
for(const source of invalidJS)test(`authored dialect rejects ${source}`,async()=>{const files=await bundle();files.set('ui/app.mjs',Buffer.from(source));assert.throws(()=>validateUIBundle(files),/UI/);});
for(const css of ['@import "x.css";','@font-face {src:url(x.woff2)}','a {background:url(x)}','a {background:image-set("x")}',String.raw`a { color: \72 ed; }`,'a {color:unknown(1)}','/* unfinished'])test(`resource-free CSS rejects ${css}`,async()=>{const files=await bundle();files.set('ui/styles.css',Buffer.from(css));assert.throws(()=>validateUIBundle(files),/UI/);});
for(const replacement of ['<base href="/">','<script>alert(1)</script>','<style>body{}</style>','<img src="x">'])test(`bootstrap shell rejects ${replacement}`,async()=>{const files=await bundle();files.set('ui/index.html',Buffer.from(html.replace('<main id="app"></main>',replacement)));assert.throws(()=>validateUIBundle(files),/UI/);});
test('fake imports in strings/comments stay inert; approved prelude and resource-free CSS pass',async()=>{
  const files=await bundle();files.set('ui/app.mjs',Buffer.from("/* import x from 'https://bad'; */\nimport { local as state } from './state.mjs';\nconst message = \"import x from '/bad';\"; // import('bad')\nexport { message, state };"));
  files.set('ui/styles.css',Buffer.from('@media (min-width: 30px) { body { width: calc(100% - 2px); color: rgb(1,2,3); padding: var(--space); } }'));
  assert.doesNotThrow(()=>validateUIBundle(files));
});
test('routes alone owns exact generation declarations and selected member URL construction',async()=>{
  const files=await bundle();files.set('ui/routes.mjs',Buffer.from(routes+"function documentURL(id, catalog) { const item = catalog.items.find(function(item) { return item.id === id; }); if (!item) throw new Error('Unknown selected ID'); const member = item.output; return new URL(member, GENERATION_ROOT); }\nfunction load(url) { return fetch(url); }\nexport { documentURL, load };"));assert.doesNotThrow(()=>validateUIBundle(files));
  for(const changed of [routes.replace('../reader.json','/reader.json'),routes.replace("const GENERATION_ROOT = new URL('../', import.meta.url);",''),routes+routes]){files.set('ui/routes.mjs',Buffer.from(changed));assert.throws(()=>validateUIBundle(files),/UI/);}
});


test('literal keyword strings cannot masquerade as declarations and state downloads stay separate',async()=>{
  const files=await bundle();files.set('ui/app.mjs',Buffer.from("const a = 'import'; const b = 'export'; const c = 'new URL'; export { a, b, c };"));
  files.set('ui/state.mjs',Buffer.from("function download(raw) { const blob = new Blob([raw]); const url = URL.createObjectURL(blob); URL.revokeObjectURL(url); return url; } export { download };"));assert.doesNotThrow(()=>validateUIBundle(files));
});
for(const source of [String.raw`const a = '\uQQQQ';`,String.raw`import x from './sta\te.mjs';`,'const x = "bad\nstring";',"setTimeout('code',1);",'new Image();',"const x = new URL('/status.json', import.meta.url);"] )test(`malformed or unsupported source convention rejects ${source}`,async()=>{const files=await bundle();files.set('ui/app.mjs',Buffer.from(source));assert.throws(()=>validateUIBundle(files));});

test('fixed routes URLs require actual manifested data while status is a separate control-plane exception',async()=>{
  const files=await bundle();files.set('ui/routes.mjs',Buffer.from(routes+"const CATALOG_URL = new URL('../catalog.json', import.meta.url); const STATUS_URL = new URL('/status.json', import.meta.url);"));assert.throws(()=>validateUIBundle(files));files.set('catalog.json',Buffer.from('{}'));assert.doesNotThrow(()=>validateUIBundle(files));
  files.set('ui/routes.mjs',Buffer.from(routes+"const OTHER_URL = new URL('../private.json', import.meta.url);"));assert.throws(()=>validateUIBundle(files));
});


for(const source of ["import x 'from' './state.mjs';", "import { local } from './state.mjs' ';'", "// hidden line separator\u2028import('./state.mjs');", "import { local 'as' other } from './state.mjs';"])test('declaration tokens cannot be substituted by strings or hidden line separators: '+JSON.stringify(source),async()=>{const files=await bundle();files.set('ui/app.mjs',Buffer.from(source));assert.throws(()=>validateUIBundle(files));});

for(const escape of ['\\00','\\01','\\02','\\03','\\04','\\05','\\06','\\07','\\08','\\09','\\1','\\8','\\9','\\u0030','\\x30'])test('restricted string dialect rejects numeric escape '+JSON.stringify(escape),async()=>{
  const files=await bundle();files.set('ui/app.mjs',Buffer.from("const text = '"+escape+"'; export { text };"));assert.throws(()=>validateUIBundle(files),/UI/);
});
for(const escape of ['\\0','\\0x','\\0９','\\0é','\\\\01','\\\\08','\\n','\\t','\\\\'])test('restricted string dialect preserves valid escape '+JSON.stringify(escape),async()=>{
  const files=await bundle();files.set('ui/app.mjs',Buffer.from("const text = '"+escape+"'; export { text };"));assert.doesNotThrow(()=>validateUIBundle(files));
});
