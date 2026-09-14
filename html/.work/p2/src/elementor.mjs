import fs from 'fs';
import { parse } from 'node-html-parser';
import { cleanRich, rebrand } from './clean.mjs';
import { local, full } from './assets.mjs';
import { link as mapLink } from './links.mjs';

const BG = fs.existsSync('bgmap.json') ? JSON.parse(fs.readFileSync('bgmap.json', 'utf8')) : {};
const ELS = fs.existsSync('elstyle.json') ? JSON.parse(fs.readFileSync('elstyle.json', 'utf8')) : {};
const styleOf = (key, id) => (ELS[key] || {})[id] || {};
const txt = n => (n ? n.text.replace(/\s+/g, ' ').trim() : '');
/** con trực tiếp có class cho trước (tránh bắt nhầm widget lồng bên trong) */
function ownBox(w) {
  let box = w;
  for (const c of w.childNodes) {
    if (c.nodeType === 1 && (c.getAttribute('class') || '').includes('elementor-widget-container')) { box = c; break; }
  }
  // HTML gốc có chỗ thiếu thẻ đóng khiến widget khác bị lồng vào đây -> bỏ đi
  box.querySelectorAll('[data-widget_type]').forEach(n => { if (n !== w) n.remove(); });
  return box;
}
const attr = (n, a) => (n ? n.getAttribute(a) : null) || '';

const ICONS = {
  'tk-open-book3': '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M542 32c-55 3-163 14-230 55-5 3-8 8-8 13v363c0 12 13 19 24 14 69-35 169-44 218-47 17-1 30-14 30-30V62c0-17-15-31-34-30zM264 87C197 46 89 35 34 32 15 31 0 45 0 62v337c0 16 13 29 30 30 49 3 149 12 218 47 11 5 24-2 24-14V100c0-5-3-10-8-13z"/></svg>',
  'tk-audio-book1': '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M542 32c-55 3-163 14-230 55-5 3-8 8-8 13v363c0 12 13 19 24 14 69-35 169-44 218-47 17-1 30-14 30-30V62c0-17-15-31-34-30zM264 87C197 46 89 35 34 32 15 31 0 45 0 62v337c0 16 13 29 30 30 49 3 149 12 218 47 11 5 24-2 24-14V100c0-5-3-10-8-13z"/></svg>',
  'tk-homework': '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M542 32c-55 3-163 14-230 55-5 3-8 8-8 13v363c0 12 13 19 24 14 69-35 169-44 218-47 17-1 30-14 30-30V62c0-17-15-31-34-30zM264 87C197 46 89 35 34 32 15 31 0 45 0 62v337c0 16 13 29 30 30 49 3 149 12 218 47 11 5 24-2 24-14V100c0-5-3-10-8-13z"/></svg>',
  'tk-map-marker': '<svg viewBox="0 0 384 512" aria-hidden="true"><path d="M172 501C27 291 0 269 0 192 0 86 86 0 192 0s192 86 192 192c0 77-27 99-172 309-10 14-30 14-40 0zm20-229a80 80 0 100-160 80 80 0 000 160z"/></svg>',
  'tk-phone-volume': '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M400 32H48C21 32 0 53 0 80v352c0 27 21 48 48 48h352c27 0 48-21 48-48V80c0-27-21-48-48-48zM94 416c-6 0-12-5-12-12 0-176 142-318 318-318 6 0 11 4 12 9l15 64c1 6-2 12-7 14l-70 30c-5 2-11 1-14-4l-31-38c-49 23-88 62-111 111l38 31c4 3 6 9 4 14l-30 70c-2 5-8 8-14 7l-64-15c-5-1-9-6-9-12z"/></svg>',
  'tk-envelope': '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M502 191c4-3 10 0 10 5v220c0 26-21 48-48 48H48c-27 0-48-22-48-48V196c0-5 6-8 10-5 22 18 52 40 153 114 21 15 57 48 93 47 36 1 73-32 93-47 101-74 131-96 153-114zM256 320c24 1 57-29 74-42 135-98 145-106 176-131 6-4 9-12 9-19v-20c0-27-21-48-48-48H48C21 60 0 81 0 108v20c0 7 3 15 9 19 31 25 41 33 176 131 17 13 50 43 71 42z"/></svg>',
  'tk-mail-bulk': '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M160 448c-26 0-48-19-64-32C22 363 0 344 0 336v104c0 13 11 24 24 24h272c13 0 24-11 24-24V336c0 8-22 27-96 80-16 13-38 32-64 32zm160-256H32c-18 0-32 14-32 32v16c26 20 23 20 116 87 10 7 29 25 44 25 15 0 34-18 44-25 93-67 90-67 116-87v-16c0-18-14-32-32-32zm224-96H224c-18 0-32 14-32 32v32h128c33 0 60 26 64 57v128h160c18 0 32-14 32-32V128c0-18-14-32-32-32z"/></svg>'
};
const ARROWS = `      <button class="carousel__btn carousel__btn--prev" type="button" aria-label="Trước"><svg viewBox="0 0 1000 1000" aria-hidden="true"><path d="M646 125c-17 0-33 8-42 17L308 442c-12 12-16 29-16 45 0 17 4 34 16 46l296 321c13 13 25 21 42 21s33-4 46-17c12-12 21-29 21-46 0-16-5-33-21-45L438 487l254-262c8-8 16-21 16-38 0-16-4-33-16-45-17-13-29-17-46-17z"/></svg></button><button class="carousel__btn carousel__btn--next" type="button" aria-label="Sau"><svg viewBox="0 0 1000 1000" aria-hidden="true"><path d="M354 875c17 0 33-8 42-17l296-300c12-12 16-29 16-45 0-17-4-34-16-46L396 146c-13-13-25-21-42-21s-33 4-46 17c-12 12-21 29-21 46 0 16 5 33 21 45l254 280-254 262c-8 8-16 21-16 38 0 16 4 33 16 45 17 13 29 17 46 17z"/></svg></button>
      <div class="carousel__dots"></div>`;

/** Ảnh nền của 1 phần tử Elementor, tra theo data-id (desktop + mobile). */
function bgFor(pageKey, id, viewport = 'desktop') {
  const rows = (BG[pageKey] || {})[viewport] || [];
  const hit = rows.find(r => r.ids[0] === id);
  return hit ? hit.url : '';
}
function bgForRepeater(pageKey, repClass, viewport = 'desktop') {
  const rows = (BG[pageKey] || {})[viewport] || [];
  const hit = rows.find(r => r.rep === repClass);
  return hit ? hit.url : '';
}

function img(node, { cls = '', lazy = true, size } = {}) {
  let src = attr(node, 'src');
  if (!src) return '';
  if (size === 'full') src = full(src);
  const w = attr(node, 'width'), h = attr(node, 'height');
  return `<img src="${local(src)}" alt="${attr(node, 'alt')}"${w ? ` width="${w}"` : ''}${h ? ` height="${h}"` : ''}${cls ? ` class="${cls}"` : ''}${lazy ? ' loading="lazy"' : ''}>`;
}

/** tra cứu style thật của một đoạn chữ trong bản dump (khớp theo nội dung) */
const DUMP_CACHE = {};
function dumpIndex(key) {
  if (DUMP_CACHE[key]) return DUMP_CACHE[key];
  const file = `dump-${key}.json`;
  const idx = new Map();
  if (fs.existsSync(file)) {
    for (const n of JSON.parse(fs.readFileSync(file, 'utf8')).nodes) {
      if (!n.text || !n.s) continue;
      const k = n.text.replace(/\s+/g, ' ').trim().toLowerCase();
      if (!idx.has(k)) idx.set(k, n.s);
    }
  }
  DUMP_CACHE[key] = idx;
  return idx;
}

/** màu/cỡ chữ thật của tiêu đề, để không mất chữ trên nền tối */
function headStyle(key, id, el) {
  const st = dumpIndex(key).get(txt(el).toLowerCase());
  if (!st) return '';
  const out = [];
  if (st.color && st.color !== 'rgb(0, 0, 0)' && st.color !== 'rgb(172, 0, 0)') out.push(`color:${st.color}`);
  if (st.textAlign === 'left' || st.textAlign === 'start') out.push('text-align:left');
  const fs2 = parseFloat(st.fontSize);
  if (fs2 && Math.abs(fs2 - 36) > 4) out.push(`font-size:${st.fontSize}`);
  return out.length ? ` style="${out.join(';')}"` : '';
}

function iconOf(holder) {
  if (!holder) return '';
  const svg = holder.querySelector('svg');
  if (svg) return cleanRich(svg.outerHTML);
  const i = holder.querySelector('i');
  if (i) {
    const key = (attr(i, 'class').match(/tk-[a-z0-9-]+/) || [])[0];
    return ICONS[key] || '';
  }
  return '';
}

/** Chuyển 1 widget Elementor -> HTML sạch. Trả về '' nếu bỏ qua. */
function widget(w, ctx) {
  const type = attr(w, 'data-widget_type').replace('.default', '').replace('.cards', '');
  const id = attr(w, 'data-id');
  const R = s => rebrand(s);

  switch (type) {
    case 'text-editor': {
      const html = cleanRich(ownBox(w).innerHTML);
      if (!html.replace(/<[^>]*>/g, '').trim() && !/<(img|iframe|video)\b/.test(html)) return '';
      // lấy typography thật của widget (Elementor đặt trên thẻ bọc)
      const ws = styleOf(ctx.key, id), inline = [];
      if (ws.fontSize && parseFloat(ws.fontSize) >= 20) inline.push(`font-size:${ws.fontSize}`);
      if (ws.textAlign === 'center' || ws.textAlign === 'right') inline.push(`text-align:${ws.textAlign}`);
      if (ws.fontWeight && +ws.fontWeight >= 600) inline.push(`font-weight:${ws.fontWeight}`);
      if (ws.color && ws.color !== 'rgb(0, 0, 0)') inline.push(`color:${ws.color}`);
      if (ws.lineHeight && parseFloat(ws.lineHeight) >= 28 && inline.length) inline.push(`line-height:${ws.lineHeight}`);
      const st2 = inline.length ? ` style="${inline.join(';')}"` : '';
      return `<div class="rich"${st2}>${R(localiseImages(html))}</div>`;
    }
    case 'heading': {
      const h = w.querySelector('h1,h2,h3,h4,h5,h6');
      if (!h) return '';
      return `<h2 class="es-heading"${headStyle(ctx.key, id, h)}>${R(txt(h))}</h2>`;
    }
    case 'thim-heading': {
      const h = w.querySelector('.title');
      const sub = w.querySelector('.sub-heading');
      if (!h) return '';
      return `<div class="sc-heading"><h2${headStyle(ctx.key, id, h)}>${R(txt(h))}</h2>${sub && txt(sub) ? `<p class="sc-heading__sub">${R(txt(sub))}</p>` : ''}</div>`;
    }
    case 'image': {
      const i = w.querySelector('img');
      if (!i) return '';
      return `<figure class="es-image">${img(i)}</figure>`;
    }
    case 'icon':
    case 'image-box':
    case 'thim-icon-box': {
      const i = w.querySelector('img');
      const ic = w.querySelector('.elementor-icon, .boxes-icon, .icon');
      const h = w.querySelector('.elementor-image-box-title, .title, h3, h4');
      const p = w.querySelector('.elementor-image-box-description, .desc, p');
      const media = i ? img(i) : iconOf(ic) || iconOf(w);
      const parts = [
        media ? `<div class="ibox__img">${media}</div>` : '',
        h && txt(h) ? `<h3 class="ibox__title">${R(txt(h))}</h3>` : '',
        p && txt(p) ? `<div class="ibox__desc rich">${R(cleanRich(p.innerHTML))}</div>` : ''
      ].filter(Boolean);
      return parts.length ? `<div class="ibox">${parts.join('')}</div>` : '';
    }
    case 'icon-list': {
      const items = w.querySelectorAll('.elementor-icon-list-item').map(li => {
        const a = li.querySelector('a');
        const label = R(txt(li.querySelector('.elementor-icon-list-text')));
        const ico = iconOf(li.querySelector('.elementor-icon-list-icon'));
        const href = a ? ctx.link(attr(a, 'href')) : (ctx.labelLink ? ctx.labelLink(label) : '');
        return href
          ? `<li>${ico}<a href="${href}">${label}</a></li>`
          : `<li>${ico}<span>${label}</span></li>`;
      });
      if (!items.length) return '';
      return `<ul class="ilist">${items.join('')}</ul>`;
    }
    case 'button':
    case 'thim-button': {
      const a = w.querySelector('a');
      if (!a) return '';
      const label = R(txt(a.querySelector('.elementor-button-text') || a));
      const ico = iconOf(a.querySelector('.elementor-button-icon'));
      return `<div class="cta-wrap"><a class="cta" href="${ctx.link(attr(a, 'href'))}">${ico}${label}</a></div>`;
    }
    case 'gallery': {
      const items = w.querySelectorAll('.e-gallery-item').map(a => {
        const src = attr(a, 'href') || attr(a.querySelector('img'), 'src');
        const title = attr(a, 'data-elementor-lightbox-title');
        return `<a href="${local(src)}" target="_blank" rel="noopener"><img src="${local(src)}" alt="${title}" loading="lazy"></a>`;
      });
      return items.length ? `<div class="gallery-grid">${items.join('')}</div>` : '';
    }
    case 'thim-gallery-images':
    case 'media-carousel': {
      const seen = new Set();
      const slides = [];
      w.querySelectorAll('img').forEach(i => {
        const src = attr(i, 'src');
        if (!src || seen.has(src)) return;
        seen.add(src);
        slides.push(`<div>${img(i)}</div>`);
      });
      if (!slides.length) {
        // carousel ảnh nền: URL nằm ở href của link lightbox
        w.querySelectorAll('a[href]').forEach(a => {
          const href = attr(a, 'href');
          if (!/\.(jpe?g|png|webp|gif)$/i.test(href) || seen.has(href)) return;
          seen.add(href);
          const alt = attr(a, 'data-elementor-lightbox-title');
          slides.push(`<div><img src="${local(href)}" alt="${R(alt)}" loading="lazy"></div>`);
        });
      }
      if (!slides.length) return '';
      const kind = type === 'thim-gallery-images' ? 'carousel--logo' : 'carousel--gal';
      return `<div class="carousel ${kind}" data-autoplay="4000" data-dots="pages">
      <div class="carousel__viewport"><div class="carousel__track">${slides.join('')}</div></div>
${ARROWS}
    </div>`;
    }
    case 'thim-ekits-team': {
      const seen = new Set();
      const slides = w.querySelectorAll('.thim-ekit-team__article').map(a => {
        const i = a.querySelector('img');
        const name = R(txt(a.querySelector('.thim-ekit-team__member-name, .thim-ekit-team__title, h3, h4, .name')));
        const role = R(txt(a.querySelector('.thim-ekit-team__member-description, .thim-ekit-team__position, .position, .job')));
        const k = name + attr(i, 'src');
        if (seen.has(k)) return '';
        seen.add(k);
        return `<div class="tmember">${i ? img(i) : ''}<h3>${name}</h3>${role ? `<p>${role}</p>` : ''}</div>`;
      }).filter(Boolean);
      if (!slides.length) return '';
      return `<div class="carousel carousel--team" data-autoplay="5000" data-dots="pages">
      <div class="carousel__viewport"><div class="carousel__track">${slides.join('')}</div></div>
${ARROWS}
    </div>`;
    }
    case 'slides': {
      const out = w.querySelectorAll('.swiper-slide').map(s => {
        const rep = (attr(s, 'class').match(/elementor-repeater-item-[a-z0-9]+/) || [''])[0];
        const d = bgForRepeater(ctx.key, rep, 'desktop');
        const m = bgForRepeater(ctx.key, rep, 'mobile');
        const url = d || m;
        if (!url) return '';
        const head = R(txt(s.querySelector('.elementor-slide-heading')));
        const desc = R(txt(s.querySelector('.elementor-slide-description')));
        const cap = head || desc
          ? `<div class="page-hero__cap">${head ? `<h2>${head}</h2>` : ''}${desc ? `<p>${desc}</p>` : ''}</div>` : '';
        return `<section class="page-hero"><img src="${local(url)}" alt="${head || ctx.heroAlt || ''}" fetchpriority="high">${cap}</section>`;
      }).filter(Boolean);
      return out.join('\n');
    }
    case 'social-icons': {
      const links = w.querySelectorAll('a').map(a => {
        const href = attr(a, 'href');
        const kind = /facebook/.test(attr(a, 'class')) ? 'fb' : /youtube/.test(attr(a, 'class')) ? 'yt' : '';
        const svg = kind === 'fb'
          ? '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.3 482.4 504 379.8 504 256z"/></svg>'
          : '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6V175.2l142.7 81.2-142.7 81.2z"/></svg>';
        return `<a class="${kind}" href="${href}" target="_blank" rel="noopener" aria-label="${kind === 'fb' ? 'Facebook' : 'Youtube'}">${svg}</a>`;
      });
      return links.length ? `<div class="contact-social">${links.join('')}</div>` : '';
    }
    case 'thim-ekits-header-info': {
      const items = w.querySelectorAll('li').map(li => {
        const ico = iconOf(li);
        return `<li>${ico}<span>${R(txt(li))}</span></li>`;
      });
      return items.length ? `<ul class="contact-list">${items.join('')}</ul>` : '';
    }
    case 'form': {
      const rows = w.querySelectorAll('.elementor-field-group').map(g => {
        const lab = txt(g.querySelector('.elementor-field-label'));
        // nhóm radio / checkbox
        const sub = g.querySelector('.elementor-field-subgroup');
        if (sub) {
          const gname = (attr(sub.querySelector('input'), 'name') || 'g').replace(/[^A-Za-z0-9_-]/g, '_');
          const opts = sub.querySelectorAll('.elementor-field-option').map((o, i) => {
            const inp2 = o.querySelector('input');
            const id2 = `${gname}_${i}`;
            return `<label class="opt"><input type="${attr(inp2, 'type') || 'radio'}" name="${gname}" id="${id2}" value="${attr(inp2, 'value')}">${R(txt(o))}</label>`;
          }).join('');
          return `          <div class="form-row"><span class="form-row__label">${lab}</span><div class="form-opts">${opts}</div></div>`;
        }
        const inp = g.querySelector('input,select,textarea');
        if (!inp) return '';
        const name = (attr(inp, 'name') || 'f').replace(/[^A-Za-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'f';
        const ph = attr(inp, 'placeholder');
        const tag = inp.tagName.toLowerCase();
        let field;
        if (tag === 'select') {
          field = `<select id="${name}" name="${name}">${inp.querySelectorAll('option').map(o => `<option>${txt(o)}</option>`).join('')}</select>`;
        } else if (tag === 'textarea') {
          field = `<textarea id="${name}" name="${name}" rows="4" placeholder="${ph}"></textarea>`;
        } else {
          field = `<input id="${name}" name="${name}" type="${attr(inp, 'type') || 'text'}" placeholder="${ph}">`;
        }
        return `          <div class="form-row"><label for="${name}">${lab}</label>${field}</div>`;
      }).filter(Boolean);
      const btn = txt(w.querySelector('.elementor-button-text')) || 'Gửi';
      return `<form class="es-form" data-form>
${rows.join('\n')}
          <button class="form-submit" type="submit">${btn}</button>
          <p class="form-note" data-form-note hidden role="status">Xin cảm ơn! Vui lòng gọi hotline <strong>0365.998.894</strong> hoặc nhắn Zalo để được hỗ trợ nhanh nhất.</p>
        </form>`;
    }
    case 'shortcode': {
      const nested = w.querySelector('.elementor');
      return nested ? sections(nested, ctx) : '';
    }
    case 'facebook-page':
    case 'thim-ekits-breadcrumb':
      return '';
    default:
      return ctx.custom ? ctx.custom(type, w, ctx) : '';
  }
}

/** Các cột trực tiếp của 1 section */
function columnsOf(sec) {
  const cols = sec.querySelectorAll(':scope > .elementor-container > .elementor-column, :scope > .elementor-column, :scope > .e-con-inner > .e-con, :scope > .e-con');
  return cols.length ? cols : [sec];
}

/** Widget trực thuộc 1 cột (không lấy widget của section lồng bên trong) */
function widgetsOf(col, ctx) {
  const out = [];
  const walk = node => {
    for (const c of node.childNodes) {
      if (c.nodeType !== 1) continue;
      const cls = attr(c, 'class');
      if (c.getAttribute('data-widget_type')) { out.push(widget(c, ctx)); continue; }
      if (/elementor-(top-)?section|e-con\b/.test(cls) && c.getAttribute('data-element_type') === 'section') { out.push(sections(c, ctx, true)); continue; }
      walk(c);
    }
  };
  walk(col);
  return out.filter(Boolean);
}

/** Dựng toàn bộ section của 1 gốc .elementor */
export function sections(root, ctx, inner = false) {
  const secs = root.querySelectorAll(':scope > .elementor-section, :scope > .e-con, :scope > section');
  const list = secs.length ? secs : [root];
  return list.map(sec => {
    const cols = columnsOf(sec);
    const parts = cols.map(c => widgetsOf(c, ctx));
    const nonEmpty = parts.filter(p => p.length);
    if (!nonEmpty.length) return '';

    const flat = nonEmpty.flat();
    // 1 khối duy nhất đã là section (hero, hoặc shortcode lồng) -> trả thẳng
    if (flat.length === 1 && /^\s*<section /.test(flat[0])) return flat[0];

    const colStyle = col => {
      const cs = styleOf(ctx.key, attr(col, 'data-id'));
      const out = [];
      if (cs.backgroundColor && !/rgba\([^)]*,\s*0\)/.test(cs.backgroundColor) && cs.backgroundColor !== 'rgb(255, 255, 255)') {
        out.push(`background-color:${cs.backgroundColor}`);
        if (cs.padding && cs.padding !== '0px') out.push(`padding:${cs.padding}`);
        if (cs.borderRadius && cs.borderRadius !== '0px') out.push(`border-radius:${cs.borderRadius}`);
        if (cs.maxWidth && cs.maxWidth !== 'none') out.push(`max-width:${cs.maxWidth};margin-inline:auto`);
      }
      return out.length ? ` style="${out.join(';')}"` : '';
    };
    const kept = cols.map((c, i) => ({ col: c, part: parts[i] })).filter(x => x.part.length);
    const body = kept.length > 1
      ? `<div class="es-cols es-cols--${kept.length}">${kept.map(k => `<div class="es-col"${colStyle(k.col)}>${k.part.join('\n        ')}</div>`).join('')}</div>`
      : (colStyle(kept[0].col)
          ? `<div class="es-col"${colStyle(kept[0].col)}>${kept[0].part.join('\n      ')}</div>`
          : kept[0].part.join('\n      '));

    if (inner) return `<div class="es-inner">${body}</div>`;

    // nền / màu chữ của section lấy từ style thật
    const id = attr(sec, 'data-id');
    const st = styleOf(ctx.key, id);
    const bgUrl = bgFor(ctx.key, id);
    const dark = !!(st.backgroundColor && /^rgb\((1[0-9][0-9]|[2-9][0-9]), ?([0-9]{1,2}), ?([0-9]{1,2})\)$/.test(st.backgroundColor));
    const styles = [];
    if (bgUrl) styles.push(`background-image:url(${local(bgUrl)})`);
    const opaque = st.backgroundColor && !/rgba\([^)]*,\s*0\)/.test(st.backgroundColor) && st.backgroundColor !== 'rgb(255, 255, 255)';
    if (opaque) styles.push(`background-color:${st.backgroundColor}`);
    if (bgUrl) {
      if (st.backgroundPosition) styles.push(`background-position:${st.backgroundPosition}`);
      const box = st._box || [];
      if (box[0] > 0 && box[1] > 0) styles.push(`min-height:calc(100vw * ${(box[1] / box[0]).toFixed(4)})`);
    }
    // khối bị ẩn trên bản gốc (cao 0) thì bỏ luôn, tránh chừa khoảng trắng
    if (st._box && st._box[0] === 0 && st._box[1] === 0) return '';
    const cls = ['es', bgUrl ? 'es--bg' : '', dark ? 'es--dark' : ''].filter(Boolean).join(' ');
    const styleAttr = styles.length ? ` style="${styles.join(';')}"` : '';
    return `  <section class="${cls}"${styleAttr}>\n    <div class="wrap">\n      ${body}\n    </div>\n  </section>`;
  }).filter(Boolean).join('\n');
}

/** Gốc nội dung (bỏ footer) của 1 trang đã tải về */
export function contentRoot(key) {
  const root = parse(fs.readFileSync(`raw-${key}.html`, 'utf8'));
  const all = root.querySelectorAll('.elementor');
  return all.find(e => {
    let p = e.parentNode;
    while (p && p.tagName) {
      const c = attr(p, 'class');
      if (c.includes('footer-bottom-above') || p.tagName === 'FOOTER') return false;
      p = p.parentNode;
    }
    return true;
  }) || null;
}

export function localiseImages(html) {
  return html
    .replace(/\ssrcset="[^"]*"/g, '')
    .replace(/\ssizes="[^"]*"/g, '')
    .replace(/src="(https?:\/\/ichess\.edu\.vn\/[^"]+)"/g, (m, u) => `src="${local(u)}"`)
    .replace(/href="(https?:\/\/ichess\.edu\.vn\/wp-content\/uploads\/[^"]+)"/g, (m, u) => `href="${local(u)}"`)
    .replace(/href="(https?:\/\/(?:www\.)?ichess\.edu\.vn\/[^"]*)"/g, (m, u) => `href="${mapLink(u)}"`);
}

export { txt, attr, img, bgFor, bgForRepeater, ownBox };
