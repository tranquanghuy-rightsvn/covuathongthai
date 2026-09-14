import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [1440, 390]) {
  const p = await (await b.newContext({ viewport:{width:w,height:1000},
    userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
  await p.goto('https://ichess.edu.vn/tin-tuc/', { waitUntil:'load' });
  await p.waitForTimeout(3500);
  console.log('\n=== gốc @' + w);
  console.log(await p.evaluate(() => {
    const d = (el, label) => { if (!el) return label + ': (không có)';
      const c = getComputedStyle(el), r = el.getBoundingClientRect();
      return `${label}: x=${Math.round(r.x)} w=${Math.round(r.width)} h=${Math.round(r.height)} pad=${c.padding} gap=${c.gap} cols=${c.gridTemplateColumns} display=${c.display}`; };
    const out = [];
    const sec = document.querySelector('.elementor-section');
    out.push(d(sec, 'section'));
    out.push(d(sec && sec.querySelector('.elementor-container'), 'container'));
    const cols = [...document.querySelectorAll('.elementor-column')].filter(c => c.getBoundingClientRect().height > 400);
    cols.slice(0,2).forEach((c,i)=>out.push(d(c,'cột '+i)));
    const arts = [...document.querySelectorAll('.thim-ekits-post__article')];
    out.push('số thẻ: ' + arts.length);
    arts.slice(0,3).forEach((a,i)=>out.push(d(a,'thẻ '+i)));
    out.push(d(arts[0] && arts[0].parentElement, 'khung lưới thẻ'));
    return out.join('\n');
  }));
  await p.close();
}
await b.close();
