import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900} });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });

await p.goto('http://localhost:8899/cua-hang.html', { waitUntil:'load' });
await p.waitForTimeout(400);

// header sticky + màu icon giỏ hàng
await p.evaluate(() => scrollTo(0, 400));
await p.waitForTimeout(500);
console.log('sticky:', await p.evaluate(() => ({
  cls: document.querySelector('.site-header').className,
  cartColor: getComputedStyle(document.querySelector('.cart-btn')).color
})));
await p.screenshot({ path:'qa-sticky-cart.png', clip:{x:900,y:0,width:540,height:90} });

// dropdown menu con
await p.evaluate(() => scrollTo(0,0)); await p.waitForTimeout(400);
await p.hover('.menu > li.has-sub > a');
await p.waitForTimeout(400);
console.log('submenu:', await p.evaluate(() => getComputedStyle(document.querySelector('.menu .sub-menu')).visibility));

// tab sản phẩm
await p.goto('http://localhost:8899/ban-co-vua.html', { waitUntil:'load' });
await p.click('[data-tab="danhgia"]');
await p.waitForTimeout(200);
console.log('tab đánh giá:', await p.evaluate(() => ({
  mota: document.querySelector('[data-panel="mota"]').hidden,
  danhgia: document.querySelector('[data-panel="danhgia"]').hidden
})));

// sắp xếp cửa hàng
await p.goto('http://localhost:8899/cua-hang.html', { waitUntil:'load' });
await p.selectOption('[data-shop-sort]', 'price-desc');
await p.waitForTimeout(200);
console.log('sắp xếp giá giảm:', await p.evaluate(() =>
  [...document.querySelectorAll('.pcard__title')].map(e => e.textContent.trim())));

// biểu mẫu demo
await p.goto('http://localhost:8899/lien-he.html', { waitUntil:'load' });
await p.click('.form-submit');
await p.waitForTimeout(200);
console.log('form demo:', await p.evaluate(() => !document.querySelector('[data-form-note]').hidden));

// menu mobile
await p.setViewportSize({width:390,height:844});
await p.goto('http://localhost:8899/index.html', { waitUntil:'load' });
await p.waitForTimeout(300);
await p.click('.nav-toggle');
await p.waitForTimeout(500);
console.log('menu mobile:', await p.evaluate(() => document.querySelector('.mnav').classList.contains('open')));
await p.screenshot({ path:'qa-mnav.png', clip:{x:0,y:0,width:390,height:700} });

console.log('LỖI:', errs.length ? errs : 'không có');
await b.close();
