import { emit, crumbs } from './build.mjs';
import { CATS, readPosts, readCourses, blogSidebar, postCard, readArticle, withToc } from './pages-blog.mjs';
import { local } from './assets.mjs';

const BRAND = 'Học viện cờ vua Thông Thái';
const T = t => `${t} | ${BRAND}`;
const CSS = ['css/page.css', 'css/blog.css'];

const ARTICLES = [
  { key: 'bai-tin-tuc',           file: 'bai-viet-khai-mac-giai-co-vua-2026.html', cat: CATS[0] },
  { key: 'bai-kien-thuc',         file: 'bai-viet-don-tan-cong-doi.html',          cat: CATS[1] },
  { key: 'bai-co-vua-cuoc-song',  file: 'bai-viet-tam-ly-thi-dau-co-vua.html',     cat: CATS[2] },
  { key: 'bai-cau-chuyen',        file: 'bai-viet-truyen-khi-va-ca-sau.html',      cat: CATS[3] }
];

const I = {
  user: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M224 256a128 128 0 100-256 128 128 0 000 256zm90 32h-17a174 174 0 01-146 0h-17C60 288 0 348 0 422v42c0 27 21 48 48 48h352c27 0 48-21 48-48v-42c0-74-60-134-134-134z"/></svg>',
  date: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M148 288h-40a12 12 0 01-12-12v-40c0-7 5-12 12-12h40c7 0 12 5 12 12v40c0 7-5 12-12 12zm108-12v-40c0-7-5-12-12-12h-40a12 12 0 00-12 12v40c0 7 5 12 12 12h40c7 0 12-5 12-12zm96 0v-40c0-7-5-12-12-12h-40a12 12 0 00-12 12v40c0 7 5 12 12 12h40c7 0 12-5 12-12zm-96 96v-40c0-7-5-12-12-12h-40a12 12 0 00-12 12v40c0 7 5 12 12 12h40c7 0 12-5 12-12zm-96 0v-40c0-7-5-12-12-12h-40a12 12 0 00-12 12v40c0 7 5 12 12 12h40c7 0 12-5 12-12zm192 0v-40c0-7-5-12-12-12h-40a12 12 0 00-12 12v40c0 7 5 12 12 12h40c7 0 12-5 12-12zm96-260v352c0 27-21 48-48 48H48c-27 0-48-21-48-48V112c0-27 21-48 48-48h48V12c0-7 5-12 12-12h40c7 0 12 5 12 12v52h128V12c0-7 5-12 12-12h40c7 0 12 5 12 12v52h48c27 0 48 21 48 48zm-48 346V160H48v290c0 3 3 6 6 6h340c3 0 6-3 6-6z"/></svg>',
  cmt: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126-14.4 38.7-45.6 69.9-46 70.3-6.9 7.2-8.8 17.8-4.8 27S15 480 25 480c65.2 0 116.2-32.6 141.8-52.6C196 437 225.4 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32z"/></svg>',
  tag: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M0 252V48C0 21 21 0 48 0h204c13 0 25 5 34 14l242 242c19 19 19 49 0 68L316 498c-19 19-49 19-68 0L14 286c-9-9-14-21-14-34zm112-156a48 48 0 100 96 48 48 0 000-96z"/></svg>',
  fb: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.3 482.4 504 379.8 504 256z"/></svg>',
  x: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M389 48h71L305 226l183 242H345L233 322 105 468H34l166-190L24 48h146l101 134L389 48zm-25 378h39L150 88h-42l256 338z"/></svg>',
  in: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M100 448H7V149h93v299zM53 108a54 54 0 110-108 54 54 0 010 108zm395 340h-92V302c0-35-1-79-48-79-49 0-56 37-56 76v149h-93V149h89v41h1c12-23 43-48 88-48 94 0 111 62 111 142v164z"/></svg>'
};

export function buildBlog() {
  const courses = readCourses('tin-tuc');
  let n = 0;

  // danh sách 4 bài đã clone (dùng cho sidebar + bài liên quan)
  const clonedPosts = ARTICLES.map(a => {
    const post = readPosts(a.cat.key).find(p => p.file === a.file);
    return { ...post, cat: a.cat };
  });

  // --- 4 trang chuyên mục: chỉ liệt kê 1 bài đã clone ---
  for (const cat of CATS) {
    const cloned = ARTICLES.find(a => a.cat.key === cat.key);
    const posts = readPosts(cat.key).filter(p => p.file === cloned.file);
    emit({
      file: cat.file, title: T(cat.label), active: 'tin-tuc', css: CSS,
      body: `<main>
  <h1 class="sr-only">${cat.label}</h1>
  <div class="wrap wrap--blog layout layout--blog">
    <div class="layout__main">
      <div class="post-list">
${posts.map(postCard).join('\n')}
      </div>
    </div>
    <div class="layout__side">
${blogSidebar({ courses, activeCat: cat.key })}
    </div>
  </div>
</main>`
    });
    n++;
  }

  // --- 4 bài viết ---
  for (const a of ARTICLES) {
    const art = readArticle(a.key);
    const { body: artBody, toc } = withToc(art.body);
    const recent = clonedPosts;
    const related = clonedPosts.filter(p => p.file !== a.file);
    const navItem = (p, kind) => p
      ? `        <div class="post-nav__item post-nav__item--${kind}">
          <span class="post-nav__label">${kind === 'prev' ? 'Bài trước' : 'Bài sau'}</span>
          ${p.file === '#' ? `<span class="post-nav__title">${p.title}</span>` : `<a class="post-nav__title" href="${p.file}">${p.title}</a>`}
        </div>`
      : '        <div class="post-nav__item"></div>';

    emit({
      file: a.file, title: T(art.title), active: 'tin-tuc', css: CSS,
      body: crumbs([{ label: 'Trang chủ', href: 'index.html' }, { label: a.cat.label }]) + `

<main>
  <div class="wrap wrap--post layout layout--post">
    <div class="layout__main">
      <article>
        ${art.featured ? `<figure class="article__featured"><img src="${local(art.featured)}" alt="${art.title}" fetchpriority="high"></figure>` : ''}
        <h1 class="article__title">${art.title}</h1>
        <div class="article__meta">
          <span>${I.user}${art.author}</span>
          <span>${I.date}${art.date}</span>
          ${art.comments ? `<span>${I.cmt}${art.comments}</span>` : ''}
          <span>${I.tag}${art.cats.map(c => c.file === '#' ? c.label : `<a href="${c.file}">${c.label}</a>`).join(', ')}</span>
        </div>
${toc}
        <div class="rich rich--post">
${artBody.split('\n').map(l => '          ' + l).join('\n')}
        </div>
      </article>
      ${art.tags.length ? `<div class="post-tags"><span class="post-tags__label">Tag:</span>${art.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}</div>` : ''}
      ${art.cta}
      <div class="share"><span>Chia sẻ:</span>
        <a href="https://www.facebook.com/covuatruyencamhung" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a>
        <a href="https://www.facebook.com/covuatruyencamhung" target="_blank" rel="noopener" aria-label="X">${I.x}</a>
        <a href="https://www.facebook.com/covuatruyencamhung" target="_blank" rel="noopener" aria-label="LinkedIn">${I.in}</a>
      </div>
      <nav class="post-nav" aria-label="Bài trước / bài sau">
${navItem(art.prev, 'prev')}
${navItem(art.next, 'next')}
      </nav>

      <form class="comment-form" data-form>
        <h3>Để lại lời nhắn</h3>
        <p class="comment-form__note">Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *</p>
        <div class="form-row"><label for="cmt">Bình luận *</label><textarea id="cmt" name="cmt" rows="5"></textarea></div>
        <div class="comment-form__grid">
          <div class="form-row"><label for="cname">Tên *</label><input id="cname" name="cname" type="text"></div>
          <div class="form-row"><label for="cmail">Email *</label><input id="cmail" name="cmail" type="email"></div>
          <div class="form-row"><label for="cweb">Trang web</label><input id="cweb" name="cweb" type="url"></div>
        </div>
        <label class="check-row"><input type="checkbox" name="notify-replies"> Thông báo cho tôi bằng email khi có bình luận mới cho mục này</label>
        <label class="check-row"><input type="checkbox" name="notify-posts"> Thông báo cho tôi bằng email khi có bài đăng mới</label>
        <button class="form-submit" type="submit">Đăng bình luận</button>
        <p class="form-note" data-form-note hidden role="status">Xin cảm ơn! Bình luận của bạn sẽ được hiển thị sau khi Trung tâm duyệt.</p>
      </form>

      <section class="related">
        <div class="related__head"><h3>Bạn cũng có thể thích</h3><a class="related__more" href="${a.cat.file}">Xem thêm »</a></div>
        <div class="related-grid">
${related.map(r => `          <article class="related-card">
            <a href="${r.file}"><img src="${local(r.img)}" alt="${r.title}" loading="lazy"></a>
            <a class="rtitle" href="${r.file}">${r.title}</a>
          </article>`).join('\n')}
        </div>
      </section>
    </div>
    <div class="layout__side">
${blogSidebar({ courses, recent, activeCat: a.cat.key })}
    </div>
  </div>
</main>`
    });
    n++;
  }
  return n;
}
