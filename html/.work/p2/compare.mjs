import { chromium } from 'playwright';

const PROPS = ['fontSize','lineHeight','fontWeight','fontFamily','color','backgroundColor',
  'textTransform','borderRadius','padding','margin','gap','gridTemplateColumns'];

const MEASURE = (pairs) => {
  const out = {};
  for (const [label, sel] of pairs) {
    const el = document.querySelector(sel);
    if (!el) { out[label] = null; continue; }
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const o = { w: Math.round(r.width), h: Math.round(r.height) };
    for (const p of ['fontSize','lineHeight','fontWeight','color','backgroundColor','textTransform','borderRadius','padding','gap','gridTemplateColumns']) {
      const v = cs[p];
      if (v && v !== 'none' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)' && v !== '0px') o[p] = v;
    }
    o.font = cs.fontFamily.split(',')[0].replace(/"/g, '');
    out[label] = o;
  }
  return JSON.stringify(out);
};

const [origUrl, cloneUrl, width, pairsJson] = process.argv.slice(2);
const pairs = JSON.parse(pairsJson);
const b = await chromium.launch();

async function grab(url, sels) {
  const ctx = await b.newContext({ viewport: { width: +width, height: 1000 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(3000);
  const r = JSON.parse(await p.evaluate(MEASURE, sels));
  await ctx.close();
  return r;
}

const A = await grab(origUrl, pairs.map(x => [x[0], x[1]]));
const B = await grab(cloneUrl, pairs.map(x => [x[0], x[2]]));
await b.close();

const KEYS = ['w','h','fontSize','lineHeight','fontWeight','color','backgroundColor','textTransform','borderRadius','padding','gap','gridTemplateColumns','font'];
console.log(`\n=== ${width}px  |  ${origUrl.replace('https://ichess.edu.vn','gốc')}  ↔  ${cloneUrl.replace('http://localhost:8899','clone')}`);
for (const [label] of pairs) {
  const a = A[label], b2 = B[label];
  if (!a && !b2) { console.log(`  —  ${label}: cả hai không có`); continue; }
  if (!a) { console.log(`  ?  ${label}: gốc không có (clone có)`); continue; }
  if (!b2) { console.log(`  ✗  ${label}: CLONE THIẾU`); continue; }
  const diffs = KEYS.filter(k => (a[k] ?? '-') !== (b2[k] ?? '-')).map(k => `${k}: ${a[k] ?? '-'} → ${b2[k] ?? '-'}`);
  console.log(diffs.length ? `  ≠  ${label}: ${diffs.join('; ')}` : `  ✓  ${label}`);
}
