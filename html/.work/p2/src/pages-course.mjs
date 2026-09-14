import fs from 'fs';
import { parse } from 'node-html-parser';
import { cleanRich, rebrand } from './clean.mjs';
import { local } from './assets.mjs';

const HAND = '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M16 224a48 48 0 0148 48v96a48 48 0 01-96 0v-96a48 48 0 0148-48zm432 32c0-17.7-14.3-32-32-32h-95l14-58c5-21 3-44-9-62-9-13-24-24-42-24-13 0-24 9-28 21l-9 29c-11 35-33 66-62 89l-18 14c-14 11-22 28-22 45v134c0 24 17 44 40 48l117 21c33 6 67 9 101 9h30c26 0 48-21 48-48 0-11-4-22-10-30 18-8 30-25 30-46 0-11-4-22-10-30 18-8 30-25 30-46 0-11-4-22-10-30 18-8 30-25 30-46z"/></svg>';

/** Đọc 1 trang khóa học đã dump -> { hero, body, cta } */
export function courseBody(key, opts = {}) {
  const raw = fs.readFileSync(`raw-${key}.html`, 'utf8');
  const dump = JSON.parse(fs.readFileSync(`dump-${key}.json`, 'utf8'));
  const root = parse(raw);

  // banner: lấy từ computed style (Elementor gán bằng CSS)
  const bg = dump.nodes
    .map(n => n.s && n.s.backgroundImage)
    .filter(v => v && v.startsWith('url('))
    .map(v => v.replace(/url\("?|"?\)/g, ''))[0];

  const blocks = root.querySelectorAll('.elementor-widget-text-editor')
    .map(b => cleanRich(b.innerHTML))
    .filter(h => h.replace(/<[^>]*>/g, '').trim().length > 40);

  const btn = root.querySelector('.elementor-button');
  const ctaText = btn ? btn.text.replace(/\s+/g, ' ').trim() : '';

  let body = rebrand(blocks.join('\n'));
  if (opts.anchors) for (const [needle, id] of opts.anchors) {
    body = body.replace(new RegExp(`<h([23])>(${needle}[^<]*)</h\\1>`), (m, lvl, txt) => `<h${lvl} id="${id}">${txt}</h${lvl}>`);
  }
  body = localiseImages(body);

  const hero = bg
    ? `  <section class="page-hero"><img src="${local(bg)}" alt="${opts.heroAlt || ''}" fetchpriority="high"></section>`
    : '';

  const cta = ctaText
    ? `\n  <div class="cta-wrap"><a class="cta" href="${opts.ctaHref || 'dang-ky-hoc-thu.html'}">${HAND}${ctaText}</a></div>`
    : '';

  return `${hero}
  <div class="section-narrow">
    <article class="rich">
${body.split('\n').map(l => '      ' + l).join('\n')}
    </article>${cta}
  </div>`;
}

export function localiseImages(html) {
  return html
    .replace(/\ssrcset="[^"]*"/g, '')
    .replace(/\ssizes="[^"]*"/g, '')
    .replace(/src="(https?:\/\/ichess\.edu\.vn\/[^"]+)"/g, (m, u) => `src="${local(u)}"`)
    .replace(/href="(https?:\/\/ichess\.edu\.vn\/wp-content\/uploads\/[^"]+)"/g, (m, u) => `href="${local(u)}"`);
}
