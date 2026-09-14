import fs from 'fs';
import { parse } from 'node-html-parser';
import { cleanRich, rebrand } from './clean.mjs';
import { local, full } from './assets.mjs';
import { link } from './links.mjs';
import { localiseImages, txt, attr, sections, ownBox } from './elementor.mjs';

export const CATS = [
  { key: 'tin-tuc',              label: 'Tin tức',              file: 'tin-tuc.html' },
  { key: 'kien-thuc-co-vua',     label: 'Kiến thức cờ vua',     file: 'kien-thuc-co-vua.html' },
  { key: 'co-vua-cuoc-song',     label: 'Cờ vua & Cuộc sống',   file: 'co-vua-cuoc-song.html' },
  { key: 'cau-chuyen-cuoc-song', label: 'Câu chuyện cuộc sống', file: 'cau-chuyen-cuoc-song.html' }
];

const root = key => parse(fs.readFileSync(`raw-${key}.html`, 'utf8'));

/** Bài viết trong 1 trang chuyên mục */
export function readPosts(key) {
  const r = root(key);
  const w = r.querySelector('[data-widget_type="thim-ekits-archive-post.default"]');
  if (!w) return [];
  return w.querySelectorAll('.thim-ekits-post__article').map(a => {
    const t = a.querySelector('.thim-ekits-post__title a');
    const i = a.querySelector('.thim-ekits-post__thumbnail img');
    return {
      href: attr(t, 'href'),
      file: link(attr(t, 'href')),
      title: rebrand(txt(t)),
      img: i ? attr(i, 'src') : '',
      excerpt: rebrand(txt(a.querySelector('.thim-ekits-post__excerpt')))
    };
  });
}

/** 3 khóa học online ở sidebar */
export function readCourses(key = 'tin-tuc') {
  const r = root(key);
  const w = r.querySelector('[data-widget_type="thim-ekits-list-course.default"]');
  if (!w) return [];
  return w.querySelectorAll('.thim-ekits-course__item').map(c => {
    const t = c.querySelector('.thim-ekits-course__title a');
    const i = c.querySelector('.thim-ekits-course__thumbnail img');
    const origin = txt(c.querySelector('.origin-price'));
    const now = txt(c.querySelector('.free') || c.querySelector('.price'));
    return {
      href: attr(t, 'href'), file: link(attr(t, 'href')),
      title: rebrand(txt(t)), img: i ? attr(i, 'src') : '',
      origin, now,
      duration: txt(c.querySelector('.course-duration')),
      level: txt(c.querySelector('.course-level')),
      excerpt: rebrand(txt(c.querySelector('.thim-ekits-course__excerpt')))
    };
  });
}

export function courseWidgetHtml(courses) {
  return `        <ul class="cwidget">
${courses.map(c => `          <li>
            <a class="cwidget__thumb" href="${c.file}"><img src="${local(c.img)}" alt="${c.title}" width="300" height="169" loading="lazy"></a>
            <h4 class="cwidget__title"><a href="${c.file}">${c.title}</a></h4>
            <p class="cwidget__price">${c.origin ? `<del>${c.origin}</del> ` : ''}<ins>${c.now}</ins></p>
            <p class="cwidget__meta">${c.duration}${c.level ? ` &nbsp;|&nbsp; ${c.level}` : ''}</p>
            <p class="cwidget__excerpt">${c.excerpt}</p>
            <a class="cwidget__more" href="${c.file}">Xem thêm</a>
          </li>`).join('\n')}
        </ul>`;
}

const SIDEBAR_ORDER = ['cau-chuyen-cuoc-song', 'co-vua-cuoc-song', 'kien-thuc-co-vua', 'tin-tuc'];

export function blogSidebar({ courses, recent = [], activeCat = '' }) {
  const cats = SIDEBAR_ORDER.map(k => CATS.find(c => c.key === k)).map(c =>
    `          <li${c.key === activeCat ? ' class="is-active"' : ''}><a href="${c.file}">${c.label}</a></li>`).join('\n');
  const recentHtml = recent.length ? `
      <aside class="widget widget--box">
        <h4 class="widget-title">Bài viết mới</h4>
        <div class="widget__body">
          <ul class="recent-list">
${recent.map(p => `            <li><a href="${p.file}">${p.title}</a></li>`).join('\n')}
          </ul>
        </div>
      </aside>` : '';
  return `      <aside class="widget widget--box">
        <h4 class="widget-title">Danh mục</h4>
        <div class="widget__body">
          <ul class="widget__list cat-menu">
${cats}
          </ul>
        </div>
      </aside>
      <aside class="widget widget--box">
        <h4 class="widget-title">Khóa học cờ vua online</h4>
        <div class="widget__body">
${courseWidgetHtml(courses)}
        </div>
      </aside>${recentHtml}`;
}

export function postCard(p) {
  return `        <article class="post-card">
          ${p.img ? `<a class="post-card__thumb" href="${p.file}"><img src="${local(p.img)}" alt="${p.title}" loading="lazy"></a>` : ''}
          <div class="post-card__body">
            <h2 class="post-card__title"><a href="${p.file}">${p.title}</a></h2>
            <p class="post-card__excerpt">${p.excerpt}</p>
            <a class="post-card__more" href="${p.file}">Xem thêm »</a>
          </div>
        </article>`;
}

/** Nội dung 1 bài viết */
export function readArticle(key) {
  const r = root(key);
  const title = rebrand(txt(r.querySelector('.thim-ekit-single-post__title__content')));
  const featured = attr(r.querySelector('.thim-ekit-single-post__featured-image img'), 'src');
  const info = r.querySelectorAll('.thim-ekit-single-post__info__content').map(s => rebrand(txt(s)));
  const comments = info[2] || '';
  const content = r.querySelector('.thim-ekit-single-post__content');
  const contentEl = content ? content.querySelector('.elementor') : null;
  const infoBoxes = r.querySelectorAll('[data-widget_type="thim-ekits-post-info.default"]');
  const tagBox = infoBoxes.find(w => /Tag/i.test(txt(w)));
  const tags = tagBox ? tagBox.querySelectorAll('.thim-ekit-single-post__info__terms a').map(a => rebrand(txt(a))) : [];
  const infoBox = infoBoxes[0];
  const cats = (infoBox ? infoBox.querySelectorAll('.thim-ekit-single-post__info__terms a') : [])
    .map(a => ({ label: rebrand(txt(a)), file: link(attr(a, 'href')) }));
  const nav = {
    prev: r.querySelector('.thim-ekit-single-post__navigation__prev a'),
    next: r.querySelector('.thim-ekit-single-post__navigation__next a')
  };
  const related = r.querySelectorAll('[data-widget_type="thim-ekits-post-related.default"] .thim-ekits-post__article');
  const seen = new Set();
  return {
    title, featured,
    author: info[0] || '', date: info[1] || '', comments,
    cats,
    body: contentEl ? articleBody(contentEl) : (content ? rebrand(localiseImages(cleanRich(content.innerHTML))) : ''),
    cta: contentEl ? articleCta(contentEl) : '',
    tags,
    prev: nav.prev ? { file: link(attr(nav.prev, 'href')), title: rebrand(txt(nav.prev.querySelector('.thim-ekit-single-post__navigation__link__content--title'))) } : null,
    next: nav.next ? { file: link(attr(nav.next, 'href')), title: rebrand(txt(nav.next.querySelector('.thim-ekit-single-post__navigation__link__content--title'))) } : null,
    related: related.map(a => {
      const t = a.querySelector('.thim-ekits-post__title a');
      const i = a.querySelector('.thim-ekits-post__thumbnail img');
      const title = rebrand(txt(t));
      if (seen.has(title)) return null;
      seen.add(title);
      return { file: link(attr(t, 'href')), title, img: i ? attr(i, 'src') : '' };
    }).filter(Boolean).slice(0, 3)
  };
}

function articleBody(contentEl) {
  const parts = contentEl.querySelectorAll('[data-widget_type="text-editor.default"], [data-widget_type="image.default"]').map(w => {
    if (attr(w, 'data-widget_type').startsWith('image')) {
      const i = w.querySelector('img');
      return i ? `<figure class="es-image"><img src="${local(attr(i, 'src'))}" alt="${attr(i, 'alt')}" loading="lazy"></figure>` : '';
    }
    return cleanRich(ownBox(w).innerHTML);
  }).filter(h => h && h.replace(/<[^>]*>/g, '').trim().length + (h.match(/<img/g) || []).length > 0);
  return rebrand(localiseImages(parts.join('\n')));
}

function articleCta(contentEl) {
  const a = contentEl.querySelector('[data-widget_type="button.default"] a');
  if (!a) return '';
  const label = rebrand(txt(a.querySelector('.elementor-button-text') || a));
  return `<div class="cta-wrap"><a class="cta" href="${link(attr(a, 'href'))}">${label}</a></div>`;
}

const slug = t => t.toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

/** Gắn id cho tiêu đề và dựng hộp "Nội dung bài viết" như bản gốc. */
export function withToc(html) {
  const root = parse(html);
  const heads = root.querySelectorAll('h2, h3, h4');
  const items = [];
  const used = new Set();
  heads.forEach(h => {
    const label = txt(h);
    if (!label) return;
    const base = 'muc-' + (slug(label) || 'noi-dung');
    let id = base, n = 2;
    while (used.has(id)) id = base + '-' + n++;
    used.add(id);
    h.setAttribute('id', id);
    items.push({ id, label, level: h.tagName.toLowerCase() });
  });
  if (items.length < 2) return { body: html, toc: '' };
  const toc = `      <details class="toc">
        <summary>NỘI DUNG BÀI VIẾT</summary>
        <ol class="toc__list">
${items.map(i => `          <li class="toc__item toc__item--${i.level}"><a href="#${i.id}">${i.label}</a></li>`).join('\n')}
        </ol>
      </details>`;
  return { body: root.toString(), toc };
}
