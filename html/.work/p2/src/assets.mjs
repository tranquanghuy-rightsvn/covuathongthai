import fs from 'fs';
import crypto from 'crypto';

const MAP = new Map();   // remote url -> local path (images/xxx)
const USED = new Set();  // local basenames

export function local(url) {
  if (!url) return '';
  if (/^data:/.test(url)) return url;
  url = url.replace(/^http:\/\//, 'https://').split('#')[0];
  if (MAP.has(url)) return MAP.get(url);
  let base = decodeURIComponent(url.split('?')[0].split('/').pop() || 'img');
  base = base.replace(/[^A-Za-z0-9._-]/g, '-').replace(/-+/g, '-');
  // bỏ hậu tố kích thước của WordPress để giữ tên gọn
  let name = base;
  if (USED.has(name)) {
    const h = crypto.createHash('md5').update(url).digest('hex').slice(0, 6);
    name = name.replace(/(\.[A-Za-z0-9]+)$/, `-${h}$1`);
  }
  USED.add(name);
  const path = 'images/' + name;
  MAP.set(url, path);
  return path;
}

/** chọn ảnh gốc (bỏ hậu tố -300x300) khi muốn bản lớn */
export function full(url) {
  return url ? url.replace(/-\d+x\d+(\.[A-Za-z0-9]+)(\?|$)/, '$1$2') : url;
}

export function saveManifest(file = 'manifest.json') {
  const obj = {};
  for (const [k, v] of MAP) obj[k] = v;
  fs.writeFileSync(file, JSON.stringify(obj, null, 1));
  return MAP.size;
}
