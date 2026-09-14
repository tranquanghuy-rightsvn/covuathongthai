import { chromium } from 'playwright';
import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('urls.json','utf8'));
const JS = () => {
  const out = [];
  document.querySelectorAll('*').forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === 'none' || bg.startsWith('linear') || bg.includes('data:')) return;
    const url = (bg.match(/url\("?([^")]+)"?\)/) || [])[1];
    if (!url) return;
    let host = el, ids = [];
    while (host && ids.length < 3) {
      if (host.dataset && host.dataset.id) ids.push(host.dataset.id);
      host = host.parentElement;
    }
    const rep = (el.closest('[class*="elementor-repeater-item-"]') || {}).className || '';
    out.push({ ids, rep: (rep.match(/elementor-repeater-item-[a-z0-9]+/) || [''])[0],
      cls: (el.className || '').toString().split(' ')[0], url });
  });
  return JSON.stringify(out);
};

const b = await chromium.launch();
const all = {};
for (const [key, url] of Object.entries(urls)) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900},
    userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil:'load', timeout:90000 });
    await p.waitForTimeout(2500);
    const desktop = JSON.parse(await p.evaluate(JS));
    await p.setViewportSize({ width:390, height:844 });
    await p.waitForTimeout(1500);
    const mobile = JSON.parse(await p.evaluate(JS));
    all[key] = { desktop, mobile };
    console.log('OK', key, desktop.length, mobile.length);
  } catch (e) { console.log('FAIL', key, e.message.slice(0,80)); }
  await ctx.close();
}
await b.close();
fs.writeFileSync('bgmap.json', JSON.stringify(all));
