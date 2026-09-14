import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:1000} })).newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8899/bai-viet-tam-ly-thi-dau-co-vua.html', { waitUntil:'load' });
await p.waitForTimeout(500);
console.log('TOC đóng sẵn:', await p.evaluate(() => !document.querySelector('.toc').open));
await p.click('.toc summary'); await p.waitForTimeout(300);
const info = await p.evaluate(() => {
  const links = [...document.querySelectorAll('.toc__item a')];
  const ok = links.every(a => document.querySelector(a.getAttribute('href')));
  return { open: document.querySelector('.toc').open, số_mục: links.length, mọi_link_có_đích: ok };
});
console.log('TOC:', JSON.stringify(info));
// nhảy tới mục
await p.click('.toc__item:nth-child(2) a'); await p.waitForTimeout(500);
console.log('cuộn tới mục 2, scrollY =', await p.evaluate(() => Math.round(scrollY)));
console.log('số tag:', await p.evaluate(() => document.querySelectorAll('.tag-chip').length));
console.log('LỖI:', errs.length ? errs : 'không có');
await b.close();
