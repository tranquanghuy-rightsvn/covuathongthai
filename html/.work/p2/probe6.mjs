import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:1000},
  userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36' })).newPage();
await p.goto('https://ichess.edu.vn/4-nguyen-tac-vang-ve-tam-ly-thi-dau-co-vua-moi-ky-thu-deu-nen-biet/', { waitUntil:'load' });
await p.waitForTimeout(3500);
console.log(await p.evaluate(() => {
  const d = (el, label) => { if (!el) return '  ' + label + ': (không có)';
    const c = getComputedStyle(el), r = el.getBoundingClientRect();
    return `  ${label}: x=${Math.round(r.x)} w=${Math.round(r.width)} h=${Math.round(r.height)} | ${c.fontSize}/${c.lineHeight} w${c.fontWeight} ${c.color} bg=${c.backgroundColor} pad=${c.padding} mar=${c.margin} bd=${c.border} radius=${c.borderRadius} ${c.fontFamily.split(',')[0]} ${c.textTransform}`; };
  const out = [];
  out.push(d(document.querySelector('#ez-toc-container'), 'hộp TOC'));
  out.push(d(document.querySelector('.ez-toc-title'), 'tiêu đề TOC'));
  out.push(d(document.querySelector('#ez-toc-container nav ul'), 'danh sách TOC'));
  out.push(d(document.querySelector('#ez-toc-container nav li a'), 'link TOC'));
  out.push('  số mục TOC: ' + document.querySelectorAll('#ez-toc-container nav li').length);
  const tagWrap = [...document.querySelectorAll('.thim-ekit-single-post__info')].find(e => /Tag/i.test(e.textContent));
  out.push(d(tagWrap, 'khối Tag'));
  const chip = tagWrap && tagWrap.querySelector('a');
  out.push(d(chip, 'chip tag'));
  out.push('  số tag: ' + (tagWrap ? tagWrap.querySelectorAll('a').length : 0));
  out.push('  nhãn: ' + (tagWrap ? tagWrap.textContent.replace(/\s+/g,' ').trim().slice(0,120) : ''));
  // danh mục sidebar thứ tự
  const cats = [...document.querySelectorAll('[data-widget_type*=categories] a')].map(a=>a.textContent.trim());
  out.push('  thứ tự DANH MỤC: ' + JSON.stringify(cats));
  return out.join('\n');
}));
await b.close();
