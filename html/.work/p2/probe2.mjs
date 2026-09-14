import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:1000},
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
await p.goto('https://ichess.edu.vn/tin-tuc/', { waitUntil:'load' });
await p.waitForTimeout(3500);
console.log(await p.evaluate(() => {
  const desc = (el, label) => {
    if (!el) return label + ': (không có)';
    const c = getComputedStyle(el), r = el.getBoundingClientRect();
    return `${label}: ${Math.round(r.width)}x${Math.round(r.height)} | ${c.fontSize}/${c.lineHeight} w${c.fontWeight} ${c.color} bg=${c.backgroundColor} pad=${c.padding} border=${c.border} radius=${c.borderRadius} ${c.fontFamily.split(',')[0]} ${c.textTransform}`;
  };
  const out = [];
  // cột nội dung & sidebar
  const cols = [...document.querySelectorAll('.elementor-column')].filter(c => c.getBoundingClientRect().width > 200 && c.getBoundingClientRect().height > 500);
  cols.slice(0,3).forEach((c,i) => out.push(desc(c, 'cột ' + i)));
  // widget DANH MỤC
  const h = [...document.querySelectorAll('.sc_heading .title')].find(e => /DANH MỤC/i.test(e.textContent));
  out.push(desc(h, 'title DANH MỤC'));
  out.push(desc(h && h.closest('.elementor-widget'), 'widget DANH MỤC (wrapper)'));
  out.push(desc(h && h.parentElement, 'sc_heading DANH MỤC'));
  // danh sách category
  const catWrap = document.querySelector('[data-widget_type*="categories"]');
  out.push(desc(catWrap, 'widget categories'));
  const catA = catWrap && catWrap.querySelector('a');
  out.push(desc(catA, 'link category'));
  out.push(desc(catA && catA.parentElement, 'li category'));
  // khóa học
  const ct = document.querySelector('.thim-ekits-course__title');
  out.push(desc(ct, 'title khóa học'));
  out.push(desc(ct && ct.querySelector('a'), 'link khóa học'));
  out.push(desc(document.querySelector('.thim-ekits-course__excerpt'), 'excerpt khóa học'));
  out.push(desc(document.querySelector('.thim-ekits-course__item'), 'item khóa học'));
  out.push(desc(document.querySelector('[data-widget_type*="list-course"]'), 'widget list-course'));
  // grid bài viết
  out.push(desc(document.querySelector('[data-widget_type*="archive-post"] .thim-ekits-post'), 'grid bài viết'));
  return out.join('\n');
}));
await b.close();
