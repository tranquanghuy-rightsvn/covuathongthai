import { chromium } from 'playwright';
const b = await chromium.launch();
const jobs = [
  ['GỐC', 'https://ichess.edu.vn/4-nguyen-tac-vang-ve-tam-ly-thi-dau-co-vua-moi-ky-thu-deu-nen-biet/'],
  ['CLONE', 'http://localhost:8899/bai-viet-tam-ly-thi-dau-co-vua.html']
];
for (const w of [1440, 390]) {
  for (const [tag, url] of jobs) {
    const p = await (await b.newContext({ viewport:{width:w,height:1000},
      userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
    await p.goto(url, { waitUntil:'load', timeout:90000 });
    await p.waitForTimeout(3000);
    console.log(`\n--- ${tag} @${w}`);
    console.log(await p.evaluate((tag) => {
      const d = (el, label) => { if (!el) return '  ' + label + ': (không có)';
        const c = getComputedStyle(el), r = el.getBoundingClientRect();
        return `  ${label}: x=${Math.round(r.x)} w=${Math.round(r.width)} h=${Math.round(r.height)} | ${c.fontSize}/${c.lineHeight} w${c.fontWeight} ${c.color} ${c.fontFamily.split(',')[0]} pad=${c.padding} mar=${c.margin} radius=${c.borderRadius}`; };
      const out = [];
      if (tag === 'GỐC') {
        const cols = [...document.querySelectorAll('.elementor-column, .e-con')].filter(c => c.getBoundingClientRect().height > 600 && c.getBoundingClientRect().width > 200);
        cols.slice(0,3).forEach((c,i)=>out.push(d(c,'cột '+i)));
        const body = document.querySelector('.thim-ekit-single-post__content');
        out.push(d(body, 'khung nội dung'));
        const ps = [...body.querySelectorAll('p')].filter(x => x.textContent.trim().length > 60);
        out.push(d(ps[0], 'đoạn văn'));
        out.push(d(body.querySelector('h2'), 'h2 trong bài'));
        out.push(d(body.querySelector('h3'), 'h3 trong bài'));
        out.push(d(document.querySelector('.thim-ekit-single-post__featured-image img'), 'ảnh đại diện'));
        out.push(d(document.querySelector('.thim-ekit-single-post__info__author'), 'tác giả'));
      } else {
        out.push(d(document.querySelector('.layout--blog .layout__main'), 'cột nội dung'));
        out.push(d(document.querySelector('.layout--blog .layout__side'), 'cột sidebar'));
        const rich = document.querySelector('article .rich');
        out.push(d(rich, 'khung nội dung'));
        const ps = [...rich.querySelectorAll('p')].filter(x => x.textContent.trim().length > 60);
        out.push(d(ps[0], 'đoạn văn'));
        out.push(d(rich.querySelector('h2'), 'h2 trong bài'));
        out.push(d(rich.querySelector('h4'), 'h4 trong bài'));
        out.push(d(document.querySelector('.article__featured img'), 'ảnh đại diện'));
        out.push(d(document.querySelector('.article__meta span'), 'tác giả'));
      }
      return out.join('\n');
    }, tag));
    await p.close();
  }
}
await b.close();
