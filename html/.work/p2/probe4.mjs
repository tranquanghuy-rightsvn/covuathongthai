import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:1000},
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
await p.goto('https://ichess.edu.vn/tin-tuc/', { waitUntil:'load' });
await p.waitForTimeout(3500);
console.log(await p.evaluate(() => {
  const d = (el, label) => { if (!el) return label + ': (không có)';
    const c = getComputedStyle(el), r = el.getBoundingClientRect();
    return `${label}: x=${Math.round(r.x)} w=${Math.round(r.width)} h=${Math.round(r.height)} | ${c.fontSize}/${c.lineHeight} w${c.fontWeight} ${c.color} bg=${c.backgroundColor} pad=${c.padding} mar=${c.margin} bd=${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor} radius=${c.borderRadius} ${c.fontFamily.split(',')[0]}`; };
  const out = [];
  // phần tử có viền trong sidebar
  const side = [...document.querySelectorAll('.elementor-column')].find(c => Math.round(c.getBoundingClientRect().width) === 311);
  side.querySelectorAll('*').forEach(el => {
    const c = getComputedStyle(el);
    if (c.borderTopWidth !== '0px' || c.borderBottomWidth !== '0px') {
      const r = el.getBoundingClientRect();
      if (r.width > 100) out.push(d(el, 'CÓ VIỀN ' + el.tagName.toLowerCase() + '.' + (el.className||'').toString().split(' ')[0]));
    }
  });
  out.push(d(document.querySelector('.thim-ekits-course__thumbnail img'), 'ảnh khóa học'));
  out.push(d(document.querySelector('.thim-ekits-course__price'), 'giá khóa học'));
  out.push(d(document.querySelector('.thim-ekits-course__meta'), 'meta khóa học'));
  out.push(d(document.querySelector('.thim-ekits-course__readmore, .thim-ekits-course__content a[href]:last-child'), 'nút xem thêm khóa học'));
  out.push(d(document.querySelector('.thim-ekits-post__thumbnail img'), 'ảnh thẻ bài'));
  out.push(d(document.querySelector('.thim-ekits-post__thumbnail'), 'khung ảnh thẻ bài'));
  return out.slice(0, 18).join('\n');
}));
await b.close();
