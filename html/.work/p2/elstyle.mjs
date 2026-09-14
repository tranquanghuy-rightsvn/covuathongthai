import { chromium } from 'playwright';
import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('urls.json','utf8'));
const KEYS = process.argv.slice(2);
const JS = () => {
  const P = ['backgroundColor','backgroundImage','backgroundSize','backgroundPosition','color','textAlign',
    'minHeight','padding','margin','borderRadius','fontSize','fontWeight','lineHeight','fontFamily','display','gridTemplateColumns','gap','maxWidth','width','justifyContent','alignItems','boxShadow','border'];
  const out = {};
  document.querySelectorAll('[data-id]').forEach(el => {
    const c = getComputedStyle(el), o = {};
    P.forEach(p => { const v = c[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') o[p] = v; });
    const r = el.getBoundingClientRect();
    o._box = [Math.round(r.width), Math.round(r.height)];
    o._type = el.getAttribute('data-widget_type') || el.getAttribute('data-element_type') || '';
    out[el.dataset.id] = o;
  });
  return JSON.stringify(out);
};

const b = await chromium.launch();
const all = fs.existsSync('elstyle.json') ? JSON.parse(fs.readFileSync('elstyle.json','utf8')) : {};
for (const key of KEYS) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900},
    userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  try {
    await p.goto(urls[key], { waitUntil:'load', timeout:90000 });
    await p.waitForTimeout(2800);
    all[key] = JSON.parse(await p.evaluate(JS));
    console.log('OK', key, Object.keys(all[key]).length);
  } catch (e) { console.log('FAIL', key, e.message.slice(0,80)); }
  await ctx.close();
}
await b.close();
fs.writeFileSync('elstyle.json', JSON.stringify(all));
