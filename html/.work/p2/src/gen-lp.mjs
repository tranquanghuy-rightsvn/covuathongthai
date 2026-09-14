import fs from 'fs';
import { parse } from 'node-html-parser';
import { emit, crumbs } from './build.mjs';
import { cleanRich, rebrand } from './clean.mjs';
import { sections, txt, attr, localiseImages } from './elementor.mjs';
import { local } from './assets.mjs';
import { link } from './links.mjs';
import { readCourses, courseWidgetHtml } from './pages-blog.mjs';

const BRAND = 'Học viện cờ vua Thông Thái';
const T = t => `${t} | ${BRAND}`;
const CSS = ['css/page.css', 'css/blog.css', 'css/course.css'];

const LP = [
  { key: 'kh-online-co-ban',    file: 'khoa-hoc-online-co-ban.html' },
  { key: 'kh-online-trung-cap', file: 'khoa-hoc-online-trung-cap.html' },
  { key: 'kh-online-nang-cao',  file: 'khoa-hoc-online-nang-cao.html' }
];

const FEAT_ICON = '<svg viewBox="0 0 384 512" aria-hidden="true"><path d="M369 97L287 15a48 48 0 00-34-15H48C21 0 0 21 0 48v416c0 27 21 48 48 48h288c27 0 48-21 48-48V131c0-13-5-25-15-34zM332 128H256V52l76 76zM48 464V48h160v104c0 13 11 24 24 24h104v288H48z"/></svg>';
const LOCK = '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M400 224h-24v-72a152 152 0 00-304 0v72H48c-27 0-48 21-48 48v192c0 27 21 48 48 48h352c27 0 48-21 48-48V272c0-27-21-48-48-48zm-104 0H152v-72a72 72 0 01144 0v72z"/></svg>';

function readCourse(key) {
  const r = parse(fs.readFileSync(`raw-${key}.html`, 'utf8'));
  const left = r.querySelector('.course-info-left');
  const overview = r.querySelector('#tab-overview .course-description .elementor');
  const feats = r.querySelectorAll('.thim-course-info li').map(li => ({
    label: txt(li.querySelector('.label')), value: txt(li.querySelector('.value'))
  }));
  const curriculum = r.querySelectorAll('.course-curriculum .course-section').map(sec => ({
    title: rebrand(txt(sec.querySelector('.course-section__title'))),
    count: txt(sec.querySelector('.section-count-items')),
    items: sec.querySelectorAll('.course-item').map(it => rebrand(txt(it.querySelector('.course-item-title, .course-item__title') || it)))
  }));
  const thumb = r.querySelector('.course-thumbnail img') || r.querySelector('.wp-post-image');
  return {
    title: rebrand(txt(r.querySelector('.entry-title'))),
    excerpt: rebrand(txt(left && left.querySelector('p'))),
    instructor: rebrand(txt(r.querySelector('.instructor-display-name'))),
    category: rebrand(txt(r.querySelector('.course-categories .value'))),
    thumb: thumb ? attr(thumb, 'src') : '',
    priceOld: txt(r.querySelector('.course-price .origin-price')),
    priceNow: txt(r.querySelector('.course-price .free')) || txt(r.querySelector('.course-price .price')) || txt(r.querySelector('.course-price')),
    info: {
      sections: txt(r.querySelector('.course-count-section')),
      lessons: txt(r.querySelector('.course-count-lesson')),
      duration: txt(r.querySelector('.course-curriculum-info__left .course-duration'))
    },
    feats,
    curriculum,
    overview: overview ? rebrand(sections(overview, { key, link }, true)) : ''
  };
}

export function buildLearnPress() {
  const courses = readCourses('tin-tuc');

  // --- trang danh sách /courses/ ---
  emit({
    file: 'khoa-hoc-online.html', title: T('Khóa học cờ vua online'), active: 'khoa-hoc-online', css: CSS,
    body: crumbs([{ label: 'Trang chủ', href: 'index.html' }, { label: 'Khóa học cờ vua online' }]) + `

<main>
  <div class="page-head"><div class="wrap"><h1 class="page-title">Khóa học cờ vua online</h1></div></div>
  <div class="wrap">
    <div class="lp-grid">
${courses.map(c => `      <article class="lp-card">
        <a class="lp-card__thumb" href="${c.file}"><img src="${local(c.img)}" alt="${c.title}" loading="lazy"></a>
        <h2 class="lp-card__title"><a href="${c.file}">${c.title}</a></h2>
        <p class="lp-card__price">${c.origin ? `<del>${c.origin}</del> ` : ''}<ins>${c.now}</ins></p>
        <p class="lp-card__meta">${c.duration}${c.level ? ` &nbsp;|&nbsp; ${c.level}` : ''}</p>
        <p class="lp-card__excerpt">${c.excerpt}</p>
        <a class="lp-card__more" href="${c.file}">Read More</a>
      </article>`).join('\n')}
    </div>
  </div>
</main>`
  });

  // --- 3 trang chi tiết khóa học ---
  for (const { key, file } of LP) {
    const c = readCourse(key);
    emit({
      file, title: T(c.title), active: 'khoa-hoc-online', css: CSS,
      body: crumbs([{ label: 'Trang chủ', href: 'index.html' }, { label: 'Khóa học cờ vua online', href: 'khoa-hoc-online.html' }, { label: c.title }]) + `

<main>
  <section class="lp-head">
    <div class="wrap">
      <h1>${c.title}</h1>
      <p class="lp-head__excerpt">${c.excerpt}</p>
      <div class="lp-head__meta">
        <div><span class="lp-head__label">Người hướng dẫn</span><strong>${c.instructor}</strong></div>
        <div><span class="lp-head__label">Thể loại</span><strong>${c.category}</strong></div>
      </div>
    </div>
  </section>
  <div class="wrap lp-body">
    <div class="lp-body__main">
      <section class="lp-panel">
        <h2 class="lp-panel__title">Tổng quan</h2>
        <div class="rich">
${c.overview.split('\n').map(l => '          ' + l).join('\n')}
        </div>
      </section>
      <section class="lp-panel">
        <h2 class="lp-panel__title">Chương trình giáo dục</h2>
        <p class="lp-curri__info">${[c.info.sections, c.info.lessons, c.info.duration].filter(Boolean).join(' &nbsp;•&nbsp; ')}</p>
${c.curriculum.map(s => `        <details class="lp-section" open>
          <summary><span>${s.title}</span><em>${s.count}</em></summary>
          <ul class="lp-lessons">
${s.items.map(i => `            <li>${FEAT_ICON}<span>${i}</span>${LOCK}</li>`).join('\n')}
          </ul>
        </details>`).join('\n')}
      </section>
      <section class="lp-panel">
        <h2 class="lp-panel__title">Giảng viên</h2>
        <p class="lp-teacher"><strong>${c.instructor}</strong></p>
      </section>
    </div>
    <aside class="lp-body__side">
      <div class="lp-buy">
        ${c.thumb ? `<img class="lp-buy__thumb" src="${local(c.thumb)}" alt="${c.title}" loading="lazy">` : ''}
        <div class="lp-buy__inner">
          <p class="lp-buy__price">${c.priceOld ? `<del>${c.priceOld}</del> ` : ''}<ins>${c.priceNow}</ins></p>
          <a class="lp-buy__btn" href="dang-ky-hoc-thu.html">Đăng ký học</a>
          <h3 class="lp-buy__head">Tính năng của khóa học</h3>
          <ul class="lp-feats">
${c.feats.map(f => `            <li>${FEAT_ICON}<span>${f.label}</span><em>${f.value}</em></li>`).join('\n')}
          </ul>
        </div>
      </div>
      <aside class="widget widget--box">
        <h4 class="widget-title">Khóa học khác</h4>
        <div class="widget__body">
${courseWidgetHtml(courses.filter(x => x.file !== file))}
        </div>
      </aside>
    </aside>
  </div>
</main>`
    });
  }
  return LP.length + 1;
}
