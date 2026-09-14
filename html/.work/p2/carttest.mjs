import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:1000} });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });

await p.goto('http://localhost:8899/cua-hang.html', { waitUntil:'load' });
await p.waitForTimeout(500);

const step = async (label, fn) => { const r = await fn(); console.log(label, '->', JSON.stringify(r)); };

// 1. thêm sản phẩm đầu tiên
await p.click('.pcard:nth-child(1) [data-add-to-cart]');
await p.waitForTimeout(300);
await step('sau khi thêm SP1', () => p.evaluate(() => ({
  badge: document.querySelector('[data-cart-count]').textContent,
  badgeHidden: document.querySelector('[data-cart-count]').hidden,
  toast: document.querySelector('.toast')?.textContent,
  toastShown: document.querySelector('.toast')?.classList.contains('show'),
  ls: localStorage.getItem('ttc_cart')
})));
await p.screenshot({ path:'qa-cart-toast.png', clip:{x:740,y:0,width:700,height:420} });

// 2. thêm lại chính sản phẩm đó -> cộng dồn
await p.click('.pcard:nth-child(1) [data-add-to-cart]');
await p.click('.pcard:nth-child(3) [data-add-to-cart]');
await p.waitForTimeout(400);
await step('sau khi thêm nữa', () => p.evaluate(() => ({
  badge: document.querySelector('[data-cart-count]').textContent,
  items: JSON.parse(localStorage.getItem('ttc_cart')).map(i => i.name + ' x' + i.qty),
  total: document.querySelector('[data-cart-total]').textContent
})));

// 3. hover -> hiện menu
await p.hover('.cart-btn');
await p.waitForTimeout(500);
await step('hover giỏ hàng', () => p.evaluate(() => {
  const d = document.querySelector('.cart-drop');
  const cs = getComputedStyle(d);
  return { visibility: cs.visibility, opacity: cs.opacity, rows: d.querySelectorAll('.cart-drop__list li').length };
}));
await p.screenshot({ path:'qa-cart-drop.png', clip:{x:940,y:0,width:500,height:460} });

// 4. giữ giỏ hàng qua trang khác
await p.goto('http://localhost:8899/index.html', { waitUntil:'load' });
await p.waitForTimeout(400);
await step('sang trang chủ', () => p.evaluate(() => ({
  badge: document.querySelector('[data-cart-count]').textContent,
  rows: document.querySelectorAll('.cart-drop__list li').length
})));

// 5. xoá 1 dòng
await p.hover('.cart-btn'); await p.waitForTimeout(300);
await p.click('.cart-drop__list li:first-child .cart-drop__rm');
await p.waitForTimeout(300);
await step('sau khi xoá', () => p.evaluate(() => ({
  badge: document.querySelector('[data-cart-count]').textContent,
  ls: localStorage.getItem('ttc_cart')
})));

// 6. trang chi tiết sản phẩm: số lượng
await p.goto('http://localhost:8899/ban-co-vua.html', { waitUntil:'load' });
await p.waitForTimeout(300);
await p.click('[data-qty-step="1"]'); await p.click('[data-qty-step="1"]');
await p.click('.product-buy [data-add-to-cart]');
await p.waitForTimeout(300);
await step('mua 3 cái ở trang chi tiết', () => p.evaluate(() => ({
  qty: document.querySelector('[data-qty-input]').value,
  badge: document.querySelector('[data-cart-count]').textContent,
  ls: JSON.parse(localStorage.getItem('ttc_cart')).map(i => i.name+' x'+i.qty)
})));

// 7. mobile: bấm icon mở menu
await p.setViewportSize({ width:390, height:844 });
await p.waitForTimeout(300);
await p.click('.cart-btn');
await p.waitForTimeout(400);
await step('mobile bấm icon', () => p.evaluate(() => ({
  open: document.querySelector('.cart-widget').classList.contains('open'),
  vis: getComputedStyle(document.querySelector('.cart-drop')).visibility
})));
await p.screenshot({ path:'qa-cart-mobile.png', clip:{x:0,y:0,width:390,height:500} });

console.log('LỖI JS:', errs.length ? errs : 'không có');
await b.close();
