import { chromium } from 'playwright';
import fs from 'fs';

const PAGES = process.argv.slice(2);
const b = await chromium.launch();
const report = [];
for (const p of PAGES) {
  const ctx = await b.newContext({ viewport:{width:1440,height:1000} });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0,140)); });
  page.on('pageerror', e => errs.push('JS: ' + e.message.slice(0,140)));
  page.on('requestfailed', r => errs.push('REQ: ' + r.url().slice(0,120)));
  await page.goto(`http://localhost:8899/${p}`, { waitUntil:'load' });
  await page.waitForTimeout(900);
  await page.evaluate(async () => { await new Promise(res => { let y=0; const t=setInterval(()=>{y+=1000;scrollTo(0,y);if(y>document.body.scrollHeight){clearInterval(t);scrollTo(0,0);res();}},40); }); });
  await page.waitForTimeout(700);
  const info = await page.evaluate(() => ({
    ow: document.documentElement.scrollWidth, vw: window.innerWidth,
    broken: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src).slice(0,5),
    h: document.body.scrollHeight
  }));
  await page.screenshot({ path:`qa-${p.replace('.html','')}-1440.png`, fullPage:true });
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => ({ ow: document.documentElement.scrollWidth, vw: window.innerWidth }));
  await page.screenshot({ path:`qa-${p.replace('.html','')}-390.png`, fullPage:true });
  report.push({ p, overflow1440: info.ow > info.vw ? info.ow : 0, overflow390: m.ow > m.vw ? m.ow : 0, broken: info.broken, errs: [...new Set(errs)].slice(0,4), h: info.h });
  await ctx.close();
}
await b.close();
report.forEach(r => console.log(
  (r.overflow1440||r.overflow390||r.broken.length||r.errs.length ? '⚠ ' : '✓ ') + r.p,
  '| h=' + r.h,
  r.overflow1440 ? '| tràn ngang 1440: ' + r.overflow1440 : '',
  r.overflow390 ? '| tràn ngang 390: ' + r.overflow390 : '',
  r.broken.length ? '| ảnh lỗi: ' + r.broken.join(',') : '',
  r.errs.length ? '| lỗi: ' + r.errs.join(' ;; ') : ''));
