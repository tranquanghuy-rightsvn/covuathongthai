import { parse } from 'node-html-parser';

const KEEP_ATTR = new Set(['href','src','alt','width','height','title','colspan','rowspan','target','rel','srcset','loading',
  'viewBox','d','fill','fill-rule','clip-rule','points','cx','cy','r','x','y','x1','y1','x2','y2','stroke','stroke-width','stroke-linecap','stroke-linejoin','transform','opacity','preserveAspectRatio','aria-hidden']);

/** Convert one Elementor text-editor block to clean semantic HTML. */
export function cleanRich(html, opts = {}) {
  const root = parse(html, { blockTextElements:{ script:false, style:false } });
  // drop junk
  root.querySelectorAll('script,style,noscript,.mce_SELRES_start,.mce_SELRES_end,#ez-toc-container,.ez-toc-title-container,.ez-toc-list,.lwptoc,.elementor-screen-only,.screen-reader-text').forEach(n => n.remove());

  // album ảnh (plugin) -> lưới ảnh đơn giản (chèn lại sau khi đã dọn thuộc tính)
  const galleries = [];
  root.querySelectorAll('[data-gallery-json]').forEach(g => {
    let list = [];
    try { list = JSON.parse(g.getAttribute('data-gallery-json').replace(/&quot;/g, '"')); } catch (e) {}
    const cells = list.map(it =>
      `<a href="${it.src}" target="_blank" rel="noopener"><img src="${it.thumb || it.src}" alt="" loading="lazy"></a>`).join('');
    if (!cells) { g.replaceWith(''); return; }
    galleries.push(`<div class="gallery-grid gallery-grid--in">${cells}</div>`);
    g.replaceWith(`@@GAL${galleries.length - 1}@@`);
  });

  // emoji của facebook -> ký tự
  root.querySelectorAll('img').forEach(i => {
    const src = i.getAttribute('src') || '';
    if (/fbcdn\.net|static\.xx\.fbcdn/.test(src)) i.replaceWith(i.getAttribute('alt') || '');
  });

  // heading spans -> h2/h3/h4 by font-size
  root.querySelectorAll('span,p,h1,h2,h3,h4,h5,div').forEach(n => {
    const st = n.getAttribute('style') || '';
    const m = st.match(/font-size:\s*(\d+)px/);
    if (m && (n.tagName === 'SPAN')) n.setAttribute('data-fs', m[1]);
  });

  root.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
    const sp = h.querySelector('span[data-fs]');
    const fs = sp ? +sp.getAttribute('data-fs') : 0;
    // Theme gốc: <span font-size:28px> = 28px, 24px = 24px, thẻ trần = 21px
    const level = fs >= 28 ? 'h2' : fs >= 22 ? 'h3' : 'h4';
    const inner = h.innerHTML;
    h.replaceWith(`<${level}>${inner}</${level}>`);
  });

  // strip all attributes except whitelist; unwrap empty spans
  const strip = node => {
    if (node.nodeType !== 1) return;
    for (const a of Object.keys(node.attributes || {})) {
      if (!KEEP_ATTR.has(a)) node.removeAttribute(a);
    }
    node.childNodes.forEach(strip);
  };
  strip(root);

  for (let pass = 0; pass < 8; pass++) {
    const spans = root.querySelectorAll('span').filter(s => !s.closest('svg'));
    const divs = root.querySelectorAll('div');
    if (!spans.length && !divs.length) break;
    spans.forEach(s => s.replaceWith(s.innerHTML));
    root.querySelectorAll('div').forEach(d => d.replaceWith(d.innerHTML));
  }

  let out = root.innerHTML;
  out = out.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '');
  out = out.replace(/<(h[1-6]|li|p)>\s*<\/\1>/g, '');
  out = out.replace(/<(ul|ol|nav)>\s*<\/\1>/g, '');
  out = out.replace(/ /g, ' ');
  out = out.replace(/>\s*\n\s*</g, '>\n<');
  out = out.replace(/\n{2,}/g, '\n');
  out = out.replace(/[ \t]{2,}/g, ' ').trim();
  out = out.replace(/@@GAL(\d+)@@/g, (m, i) => '\n' + (galleries[+i] || '') + '\n');
  // bọc đoạn chữ trần thành <p> cho đúng ngữ nghĩa
  const BLOCK = /^<\/?(div|p|h[1-6]|ul|ol|li|figure|figcaption|table|thead|tbody|tr|td|th|section|nav|blockquote|hr|iframe|pre|img|svg|a)\b/i;
  out = out.split('\n').map(line => {
    const t = line.trim();
    if (!t || BLOCK.test(t)) return line;
    return `<p>${t}</p>`;
  }).join('\n').replace(/\n{2,}/g, '\n').trim();
  if (opts.rewrite) out = opts.rewrite(out);
  return out;
}

/** Đổi thương hiệu iChess -> Học viện cờ vua Thông Thái (chỉ chữ hiển thị, không đụng URL). */
function brandText(t) {
  return t
    .replace(/Trung tâm cờ vua Truyền Cảm Hứng\s*[–-]\s*iChess/gi, 'Học viện cờ vua Thông Thái')
    .replace(/Trung tâm Cờ Vua Truyền Cảm Hứng\s*[–-]\s*iChess/g, 'Học viện cờ vua Thông Thái')
    .replace(/\bICHESS\b/g, 'HỌC VIỆN CỜ VUA THÔNG THÁI')
    .replace(/\biChess\.edu\.vn\b/g, 'Học viện cờ vua Thông Thái')
    .replace(/\biChess\b/g, 'Học viện cờ vua Thông Thái')
    .replace(/\bichess\b/g, 'Thông Thái');
}

export function rebrand(html) {
  if (!html) return html;
  let out = String(html).replace(/<[^>]*>|[^<]+/g, chunk => {
    if (chunk[0] !== '<') return brandText(chunk);
    return chunk.replace(/\b(alt|title|aria-label|placeholder)="([^"]*)"/g, (m, a, v) => `${a}="${brandText(v)}"`);
  });
  // gộp "Trung tâm cờ vua Truyền Cảm Hứng – Học viện cờ vua Thông Thái" (kể cả khi bị thẻ chen ngang)
  const GLUE = '(?:<[^>]*>|&nbsp;|\\s|[–-])*';
  out = out.replace(new RegExp('Trung tâm [Cc]ờ [Vv]ua Truyền Cảm Hứng' + GLUE + 'Học viện cờ vua Thông Thái', 'g'), 'Học viện cờ vua Thông Thái');
  out = out.replace(new RegExp('Học viện cờ vua Thông Thái' + GLUE + 'Trung tâm [Cc]ờ [Vv]ua Truyền Cảm Hứng', 'g'), 'Học viện cờ vua Thông Thái');
  return out;
}

export { parse };
