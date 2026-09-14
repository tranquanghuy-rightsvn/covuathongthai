import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:1000} })).newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
const step = async (l, fn) => console.log(l, '->', JSON.stringify(await fn()));

// giỏ rỗng
await p.goto('http://localhost:8899/gio-hang.html', { waitUntil:'load' });
await p.waitForTimeout(400);
await step('giỏ rỗng', () => p.evaluate(() => ({
  empty: !document.querySelector('[data-cartpage-empty]').hidden,
  body: document.querySelector('[data-cartpage-body]').hidden
})));
await p.screenshot({ path:'qa-cartpage-empty.png', fullPage:true });

// thêm 2 sản phẩm rồi vào trang giỏ hàng
await p.goto('http://localhost:8899/cua-hang.html', { waitUntil:'load' });
await p.click('.pcard:nth-child(1) [data-add-to-cart]');
await p.click('.pcard:nth-child(2) [data-add-to-cart]');
await p.click('.pcard:nth-child(4) [data-add-to-cart]');
await p.waitForTimeout(400);
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(600);
// bấm icon giỏ hàng trên desktop -> sang trang giỏ hàng
await p.click('.cart-btn');
await p.waitForTimeout(700);
await step('bấm icon (desktop)', () => p.evaluate(() => ({ url: location.pathname })));
await step('trang giỏ hàng', () => p.evaluate(() => ({
  rows: document.querySelectorAll('[data-cartpage-rows] tr').length,
  sub: document.querySelector('[data-cartpage-sub]').textContent,
  qty: document.querySelector('[data-cartpage-qty]').textContent,
  total: document.querySelector('[data-cartpage-total]').textContent,
  badge: document.querySelector('[data-cart-count]').textContent
})));

// tăng số lượng dòng 1
await p.click('[data-cartpage-rows] tr:first-child [data-row-step="1"]');
await p.waitForTimeout(300);
await step('tăng SL dòng 1', () => p.evaluate(() => ({
  qtyInput: document.querySelector('[data-cartpage-rows] tr:first-child input').value,
  rowSub: document.querySelector('[data-cartpage-rows] tr:first-child .cart-row__sub').textContent,
  total: document.querySelector('[data-cartpage-total]').textContent,
  badge: document.querySelector('[data-cart-count]').textContent
})));

// gõ số lượng trực tiếp
await p.fill('[data-cartpage-rows] tr:first-child input', '5');
await p.dispatchEvent('[data-cartpage-rows] tr:first-child input', 'change');
await p.waitForTimeout(300);
await step('gõ SL = 5', () => p.evaluate(() => ({
  total: document.querySelector('[data-cartpage-total]').textContent,
  badge: document.querySelector('[data-cart-count]').textContent
})));
await p.screenshot({ path:'qa-cartpage.png', fullPage:true });

// xóa 1 dòng
await p.click('[data-cartpage-rows] tr:first-child .cart-row__rm');
await p.waitForTimeout(300);
await step('xóa dòng 1', () => p.evaluate(() => ({
  rows: document.querySelectorAll('[data-cartpage-rows] tr').length,
  badge: document.querySelector('[data-cart-count]').textContent
})));

// nút đặt hàng
await p.click('[data-cart-checkout]');
await p.waitForTimeout(200);
await step('bấm đặt hàng', () => p.evaluate(() => !document.querySelector('[data-cart-note]').hidden));

// xóa toàn bộ
await p.click('[data-cart-clear]');
await p.waitForTimeout(300);
await step('xóa toàn bộ', () => p.evaluate(() => ({
  empty: !document.querySelector('[data-cartpage-empty]').hidden,
  ls: localStorage.getItem('ttc_cart'),
  badgeHidden: document.querySelector('[data-cart-count]').hidden
})));

// mobile: bấm icon mở dropdown thay vì điều hướng
await p.setViewportSize({ width:390, height:844 });
await p.goto('http://localhost:8899/cua-hang.html', { waitUntil:'load' });
await p.click('.pcard:nth-child(1) [data-add-to-cart]');
await p.evaluate(() => scrollTo(0, 0));
await p.waitForTimeout(600);
await p.click('.cart-btn');
await p.waitForTimeout(400);
await step('mobile bấm icon', () => p.evaluate(() => ({
  url: location.pathname, open: document.querySelector('.cart-widget').classList.contains('open')
})));

console.log('LỖI:', errs.length ? errs : 'không có');
await b.close();
