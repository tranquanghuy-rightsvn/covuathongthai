import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:1000},
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
await p.goto('https://ichess.edu.vn/4-nguyen-tac-vang-ve-tam-ly-thi-dau-co-vua-moi-ky-thu-deu-nen-biet/', { waitUntil:'load' });
await p.waitForTimeout(3000);
console.log(await p.evaluate(() => {
  const d = (el, label) => { if (!el) return '  ' + label + ': (không có)';
    const c = getComputedStyle(el), r = el.getBoundingClientRect();
    return `  ${label}: x=${Math.round(r.x)} w=${Math.round(r.width)} | ${c.fontSize}/${c.lineHeight} ${c.fontStyle} w${c.fontWeight} ${c.color} bg=${c.backgroundColor} pad=${c.padding} mar=${c.margin} bdL=${c.borderLeft} radius=${c.borderRadius}`; };
  const out = [];
  const bq = document.querySelector('.thim-ekit-single-post__content blockquote');
  out.push(d(bq, 'blockquote'));
  out.push(d(bq && bq.querySelector('p'), 'p trong blockquote'));
  out.push('  breadcrumb: ' + [...document.querySelectorAll('.thim-ekit-breadcrumb a, .breadcrumbs li, [data-widget_type*=breadcrumb] a, [data-widget_type*=breadcrumb] li')].map(e=>e.textContent.trim()).filter(Boolean).join(' > '));
  const info = document.querySelector('.thim-ekit-single-post__info');
  out.push('  meta: ' + (info ? info.textContent.replace(/\s+/g,' ').trim() : ''));
  out.push('  tiêu đề TOC: ' + (document.querySelector('.ez-toc-title')||{}).textContent);
  return out.join('\n');
}));
await b.close();
