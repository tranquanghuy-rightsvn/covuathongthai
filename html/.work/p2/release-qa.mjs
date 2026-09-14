import { chromium } from 'playwright';
import fs from 'fs';

const WIDTHS = [1920, 1440, 1024, 768, 390];
const PAGES = process.argv.slice(2);

const CHECK = () => {
  const vw = document.documentElement.clientWidth;
  const out = { overflowDoc: 0, wide: [], clipped: [], broken: [], tiny: [], overlap: [] };
  if (document.documentElement.scrollWidth > vw + 1) out.overflowDoc = document.documentElement.scrollWidth;

  const name = el => el.tagName.toLowerCase() +
    (el.className && el.className.toString ? '.' + el.className.toString().trim().split(/\s+/).slice(0,2).join('.') : '');

  document.querySelectorAll('body *').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    // tràn ra ngoài khung nhìn theo chiều ngang
    if ((r.right > vw + 1 || r.left < -1) && cs.overflowX !== 'auto' && cs.overflowX !== 'scroll'
        && !el.closest('[style*="overflow"], .carousel__track, .cart-table-wrap, .carousel__viewport')) {
      out.wide.push(name(el) + ' [' + Math.round(r.left) + '→' + Math.round(r.right) + ']');
    }
    // chữ bị cắt cụt theo chiều dọc
    if (el.children.length === 0 && el.textContent.trim() && !el.closest('.sr-only, .screen-reader-text') &&
        el.scrollHeight > el.clientHeight + 2 && cs.overflow === 'hidden' &&
        !/WebkitLineClamp/.test(cs.webkitLineClamp) && cs.webkitLineClamp === 'none') {
      out.clipped.push(name(el) + ' "' + el.textContent.trim().slice(0, 40) + '"');
    }
    // chữ quá nhỏ
    if (el.children.length === 0 && el.textContent.trim() && parseFloat(cs.fontSize) < 11) {
      out.tiny.push(name(el) + ' ' + cs.fontSize);
    }
  });

  [...document.images].forEach(i => { if (i.complete && i.naturalWidth === 0) out.broken.push(i.currentSrc || i.src); });
  ['wide','clipped','tiny'].forEach(k => { out[k] = [...new Set(out[k])].slice(0, 6); });
  return JSON.stringify(out);
};

const b = await chromium.launch();
const rows = [];
for (const page of PAGES) {
  for (const w of WIDTHS) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push('JS: ' + e.message.slice(0, 90)));
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 90)); });
    p.on('requestfailed', r => errs.push('REQ: ' + r.url().slice(0, 80)));
    await p.goto(`http://localhost:8899/${page}`, { waitUntil: 'load' });
    await p.evaluate(async () => { await new Promise(res => { let y = 0; const t = setInterval(() => { y += 1200; scrollTo(0, y); if (y > document.body.scrollHeight) { clearInterval(t); scrollTo(0, 0); res(); } }, 30); }); });
    await p.waitForTimeout(900);
    const r = JSON.parse(await p.evaluate(CHECK));
    r.errs = [...new Set(errs)].slice(0, 3);
    rows.push({ page, w, ...r });
    await ctx.close();
  }
}
await b.close();

let bad = 0;
for (const r of rows) {
  const issues = [];
  if (r.overflowDoc) issues.push(`tràn trang ${r.overflowDoc}px`);
  if (r.wide.length) issues.push(`tràn phần tử: ${r.wide.join(' | ')}`);
  if (r.clipped.length) issues.push(`chữ bị cắt: ${r.clipped.join(' | ')}`);
  if (r.tiny.length) issues.push(`chữ < 11px: ${r.tiny.join(' | ')}`);
  if (r.broken.length) issues.push(`ảnh vỡ: ${r.broken.slice(0,3).join(', ')}`);
  if (r.errs.length) issues.push(`lỗi: ${r.errs.join(' ;; ')}`);
  if (issues.length) { bad++; console.log(`⚠ ${r.page} @${r.w}  ${issues.join('  ||  ')}`); }
}
console.log(`\n${rows.length - bad}/${rows.length} lượt kiểm tra sạch (${PAGES.length} trang × ${WIDTHS.length} khổ)`);
