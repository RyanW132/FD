import path from 'node:path';
import { TextDecoder } from 'node:util';
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });
export const decodeUtf8 = bytes => decoder.decode(bytes);
// Deliberately bounded syntax: inline Markdown raster images only. No HTML,
// reference-style images, titles, escaped URLs, remote URLs, query strings or SVG.
export function markdownAssets(bytes,ownerPath){
  const text=decodeUtf8(bytes);
  if(/<\s*(?:img|video|audio|iframe|object|embed|script|link|svg|source|picture|track|input|style|meta|base|form|image|use)\b|<[^>]+\b(?:src|srcset|poster|style|data)\s*=|^\s*\[[^\]]+\]:/im.test(text))throw Error('Unsupported asset syntax');
  const images=[...text.matchAll(/!\[[^\]\n]*\]\(([^\s()]+)\)/g)];
  if((text.match(/!\[/g)??[]).length!==images.length)throw Error('Unsupported image syntax');
  return images.map(match=>{
    const url=match[1];if(/[\\\0%?#:]|^\//.test(url))throw Error('Unsafe asset path');
    const target=path.posix.normalize(path.posix.join(path.posix.dirname(ownerPath),url));
    if(!target.startsWith('study/')||/^study\/(?:generated|pilot|test|lib|contracts)\//.test(target))throw Error('Asset outside evidence asset trees');
    if(!/\.(png|jpg|jpeg|webp)$/i.test(target))throw Error('Unsupported asset type');
    return {target,token:match[0],url};
  });
}
