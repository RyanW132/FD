import { Marked } from './vendor/marked/marked.esm.js';
import katex from './vendor/katex/katex.mjs';
import DOMPurify from './vendor/dompurify/purify.es.mjs';

const RENDER_LIMITS=Object.freeze({texBytes:8192,expressions:256,maxExpand:1000,maxSize:20,braceDepth:64});
function escaped(text,index){let count=0;while(index>0&&text[--index]==='\\')count++;return count%2===1;}
function mathToken(source,displayOnly=false){
  let open='',close='',display=false;
  if(source.startsWith('$$')){open='$$';close='$$';display=true;}
  else if(source.startsWith('\\[')){open='\\[';close='\\]';display=true;}
  else if(!displayOnly&&source.startsWith('\\(')){open='\\(';close='\\)';}
  else if(!displayOnly&&source[0]==='$'&&source.length>1&&!new RegExp('[\\s$]').test(source[1])){open='$';close='$';}
  if(!open||displayOnly&&!display)return;
  let end=open.length;
  for(;;){end=source.indexOf(close,end);if(end<0)break;if(!escaped(source,end))break;end+=close.length;}
  if(open==='$'&&(end<0||source.slice(1,end).includes('\n')||new RegExp('\\s').test(source[end-1])))return;
  if(open==='$'&&new RegExp('^[0-9]').test(source.slice(1))&&!new RegExp('[\\\\=^_{}<>+*]').test(source.slice(1,end)))return;
  const raw=end<0?source:source.slice(0,end+close.length);
  return {type:'fdMath',raw,tex:end<0?source.slice(open.length):source.slice(open.length,end),display,unclosed:end<0};
}
function mathStart(source){for(let i=0;i<source.length;i++)if(!escaped(source,i)&&mathToken(source.slice(i)))return i;}
function parser(renderMath){return new Marked({gfm:true,extensions:[
  {name:'fdMath',level:'block',tokenizer(source){return mathToken(source,true);},renderer:renderMath},
  {name:'fdMath',level:'inline',start:mathStart,tokenizer(source){return mathToken(source);},renderer:renderMath}
]});}
function tokenizeDocument(text){if(typeof text!=='string')throw Error('Expected full document text');return parser(token=>escapeHTML(token.raw)).lexer(text);}
function escapeHTML(text){return String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');}
function mathMarkup(token,index){
  let depth=0,maximum=0;for(let i=0;i<token.tex.length;i++){if(escaped(token.tex,i))continue;if(token.tex[i]==='{')maximum=Math.max(maximum,++depth);else if(token.tex[i]==='}')depth--;}
  if(token.unclosed||index>=RENDER_LIMITS.expressions||new TextEncoder().encode(token.tex).length>RENDER_LIMITS.texBytes||maximum>RENDER_LIMITS.braceDepth)return {html:escapeHTML(token.raw),fallback:true};
  try{return {html:katex.renderToString(token.tex,{output:'mathml',displayMode:token.display,trust:false,throwOnError:true,strict:'error',macros:{},maxExpand:RENDER_LIMITS.maxExpand,maxSize:RENDER_LIMITS.maxSize}),fallback:false};}
  catch{return {html:escapeHTML(token.raw),fallback:true};}
}
const tags='article section div span p br hr h1 h2 h3 h4 h5 h6 blockquote pre code strong em del ul ol li table thead tbody tr th td a img button math semantics annotation mrow mi mn mo mtext mspace mfrac msqrt mroot mstyle merror mpadded mphantom mfenced menclose msub msup msubsup munder mover munderover mmultiscripts mprescripts none mtable mtr mtd'.split(' ');
const attributes='id class href src alt title role tabindex aria-label aria-hidden hidden type scope start reversed colspan rowspan display xmlns mathvariant mathsize mathcolor mathbackground stretchy symmetric largeop movablelimits fence separator accent accentunder lspace rspace width height depth voffset rowspacing columnspacing columnalign rowalign columnlines rowlines frame framespacing equalrows equalcolumns linethickness bevelled notation encoding scriptlevel displaystyle minsize maxsize'.split(' ');
async function renderDocument({text,documentId,routes,onNavigate}){
  if(typeof text!=='string'||!routes.model.document(documentId))throw Error('Unselected document');
  const selected=routes.model.bundle.reader.documents.find(item=>item.id===documentId);
  if(!selected)throw Error('Unselected document');
  const namespace='fd-content-'+crypto.randomUUID()+'-',anchors=new Map(),listeners=[],actions=[],rasters=new Map();
  let serial=0,mathCount=0;const next=()=>namespace+(serial++),purifier=DOMPurify(window);
  const tokens=tokenizeDocument(text),markdown=parser(token=>{
    const result=mathMarkup(token,mathCount++),id=next(),sourceId=next();
    actions.push({id,sourceId});
    const tag=token.display?'div':'span';
    return '<'+tag+' class="'+(token.display?'fd-display-math ':'')+'fd-math"><span class="fd-scroll fd-math-scroll" role="region" tabindex="0" aria-label="'+(result.fallback?'Formula source (rendering unavailable)':'Mathematical formula')+'">'+result.html+'</span><button type="button" id="'+id+'" aria-label="Show original TeX">TeX</button><code class="fd-tex" id="'+sourceId+'" hidden>'+escapeHTML(token.raw)+'</code></'+tag+'>';
  });
  const pending=[];markdown.walkTokens(tokens,token=>{if(token.type==='link'||token.type==='image'){const target=routes.model.target(documentId,token.href);if(target?.kind==='asset'&&!rasters.has(token.href)){rasters.set(token.href,null);pending.push(routes.rasterURL(documentId,token.href).then(value=>rasters.set(token.href,value)).catch(()=>{}));}}});await Promise.all(pending);
  markdown.use({renderer:{
    html(token){
      const fragment=purifier.sanitize(token.text,{RETURN_DOM_FRAGMENT:true,ALLOWED_TAGS:['a','span','h1','h2','h3','h4','h5','h6'],ALLOWED_ATTR:['id'],ALLOW_DATA_ATTR:false,ALLOW_ARIA_ATTR:false,SANITIZE_DOM:false});
      let markers='';for(const node of fragment.querySelectorAll('[id]')){const anchor=node.getAttribute('id');if(selected.anchors.includes(anchor)&&!anchors.has(anchor)){const id=next();anchors.set(anchor,id);markers+='<span id="'+id+'"></span>';}}
      const emptyAnchor=new RegExp('^\\s*<(a|span)\\s+id=(?:"[^"]*"|\'[^\']*\')\\s*>(?:\\s*</\\1>)?\\s*$','i');
      return markers+(markers&&emptyAnchor.test(token.text)||new RegExp('^\\s*</(?:a|span)>\\s*$','i').test(token.text)?'':escapeHTML(token.text));
    },
    link(token){const label=this.parser.parseInline(token.tokens),target=routes.model.target(documentId,token.href);if(!target)return '<span class="fd-unavailable">'+label+' (unavailable)</span>';const id=next();actions.push({id,target});if(target.kind==='page')return '<button type="button" id="'+id+'">'+label+'</button>';const href=target.kind==='document'?routes.fragmentFor(target.documentId,target.anchor):rasters.get(token.href);if(!href)return '<span class="fd-unavailable">'+label+' (unavailable)</span>';return '<a id="'+id+'" href="'+escapeHTML(href)+'">'+label+'</a>';},
    image(token){const href=rasters.get(token.href);return href?'<img src="'+escapeHTML(href)+'" alt="'+escapeHTML(token.text)+'">':'<span class="fd-unavailable">'+escapeHTML(token.text)+' (image unavailable)</span>';},
    table(token){const cell=(value,heading)=>'<'+(heading?'th scope="col"':'td')+'>'+this.parser.parseInline(value.tokens)+'</'+(heading?'th':'td')+'>';return '<div class="fd-scroll" role="region" aria-label="Data table" tabindex="0"><table><thead><tr>'+token.header.map(value=>cell(value,true)).join('')+'</tr></thead><tbody>'+token.rows.map(row=>'<tr>'+row.map(value=>cell(value,false)).join('')+'</tr>').join('')+'</tbody></table></div>';},
    code(token){return '<pre class="fd-scroll" role="region" aria-label="Code example" tabindex="0"><code>'+escapeHTML(token.text)+'</code></pre>';}
  }});
  const element=document.createElement('article');element.className='fd-reader';
  let html;try{html=markdown.parser(tokens);}catch{html='<pre>'+escapeHTML(text)+'</pre>';}
  element.append(purifier.sanitize(html,{RETURN_DOM_FRAGMENT:true,ALLOWED_TAGS:tags,ALLOWED_ATTR:attributes,ALLOW_DATA_ATTR:false,ALLOW_ARIA_ATTR:false,ALLOW_UNKNOWN_PROTOCOLS:false,SANITIZE_DOM:true,SAFE_FOR_XML:true}));
  const find=id=>element.querySelector('[id="'+id+'"]');
  for(const action of actions){const node=find(action.id);if(!node)continue;const listener=event=>{if(action.sourceId){const source=find(action.sourceId);if(source){source.hidden=!source.hidden;node.setAttribute('aria-label',source.hidden?'Show original TeX':'Hide original TeX');}return;}if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;if(typeof onNavigate==='function'){event.preventDefault();onNavigate(action.target,node);}};node.addEventListener('click',listener);listeners.push([node,listener]);}
  return {element,anchorElement(anchor){const id=anchors.get(anchor);return id?find(id):null;},dispose(){for(const [node,listener]of listeners)node.removeEventListener('click',listener);listeners.length=0;}};
}
export { RENDER_LIMITS, tokenizeDocument, mathMarkup, renderDocument };
