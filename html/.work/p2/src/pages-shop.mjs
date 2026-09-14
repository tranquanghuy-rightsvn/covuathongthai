import fs from 'fs';
import { parse } from 'node-html-parser';
import { cleanRich, rebrand } from './clean.mjs';
import { local, full } from './assets.mjs';
import { localiseImages } from './pages-course.mjs';

export const SLUGS = {
  'ban-co-vua': 'ban-co-vua',
  'keychains': 'bo-co-vua-nam-cham',
  'dong-ho-thi-dau-co': 'dong-ho-thi-dau-co',
  'bo-co-vua-go-cao-cap': 'bo-co-vua-go-cao-cap',
  'dong-ho-thi-dau-co-leap': 'dong-ho-thi-dau-co-leap'
};
export const KEYS = {
  'ban-co-vua': 'sp-ban-co-vua',
  'keychains': 'sp-keychains',
  'dong-ho-thi-dau-co': 'sp-dong-ho-thi-dau-co',
  'bo-co-vua-go-cao-cap': 'sp-bo-co-vua-go',
  'dong-ho-thi-dau-co-leap': 'sp-dong-ho-leap'
};
export const fileFor = remoteSlug => SLUGS[remoteSlug] + '.html';

const num = s => parseInt(String(s).replace(/[^\d]/g, ''), 10) || 0;
const txt = n => (n ? n.text.replace(/\s+/g, ' ').trim() : '');

/** Danh sách sản phẩm đọc từ trang cửa hàng gốc. */
export function readProducts() {
  const root = parse(fs.readFileSync('raw-cua-hang.html', 'utf8'));
  return root.querySelectorAll('ul.product-grid > li.product').map(li => {
    const a = li.querySelector('a.title');
    const href = a.getAttribute('href');
    const remote = href.replace(/\/$/, '').split('/').pop();
    const img = li.querySelector('.product_thumb img');
    const prices = li.querySelectorAll('.price bdi').map(b => num(b.text));
    const del = li.querySelector('.price del');
    const btn = li.querySelector('.add_to_cart_button');
    const cats = (li.getAttribute('class').match(/product_cat-[a-z0-9-]+/g) || [])
      .map(c => c.replace('product_cat-', ''));
    return {
      id: (btn && btn.getAttribute('data-product_id')) || remote,
      remote,
      file: fileFor(remote),
      name: txt(a),
      thumb: img.getAttribute('src'),
      thumbFull: full(img.getAttribute('src')),
      price: del ? prices[prices.length - 1] : prices[0],
      regular: del ? prices[0] : null,
      desc: txt(li.querySelector('.description')),
      cats
    };
  });
}

/** Chi tiết 1 sản phẩm từ trang gốc. */
export function readProductDetail(remote) {
  const root = parse(fs.readFileSync(`raw-${KEYS[remote]}.html`, 'utf8'));
  const gallery = root.querySelectorAll('.woocommerce-product-gallery img')
    .map(i => i.getAttribute('src')).filter(Boolean);
  const short = root.querySelector('.woocommerce-product-details__short-description');
  const long = root.querySelector('#tab-description') || root.querySelector('.woocommerce-Tabs-panel--description');
  const cat = root.querySelectorAll('.posted_in a').map(a => txt(a));
  return {
    gallery,
    short: short ? rebrand(cleanRich(short.innerHTML)) : '',
    long: long ? rebrand(cleanRich(long.innerHTML)).replace(/<h2>[^<]*Mô tả[^<]*<\/h2>/i, '') : '',
    cat
  };
}

export const money = n => n.toLocaleString('vi-VN') + '&nbsp;VNĐ';

const CART_ICO = '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M528.1 301.3l47.3-208A16 16 0 0 0 559.8 74H159.2l-9.2-44.8A24 24 0 0 0 126.5 10H24A24 24 0 0 0 0 34v16a24 24 0 0 0 24 24h69.9l70.3 343.5A56 56 0 1 0 236 464a55.6 55.6 0 0 0-6.6-26h176.5a55.6 55.6 0 0 0-6.6 26 56 56 0 1 0 63.8-55.4l4.4-19.4a16 16 0 0 0-15.6-19.6H203.3l-6.5-32h309.9a24 24 0 0 0 23.4-18.9z"/></svg>';

export function addBtn(p, cls = 'add-cart') {
  return `<button class="${cls}" type="button" data-add-to-cart data-id="${p.id}" data-name="${p.name.replace(/"/g, '&quot;')}" data-price="${p.price}" data-img="${local(p.thumb)}" data-url="${p.file}">${CART_ICO}Thêm vào giỏ hàng</button>`;
}

export function priceHtml(p) {
  return p.regular
    ? `<span class="price"><del>${money(p.regular)}</del> <ins>${money(p.price)}</ins></span>`
    : `<span class="price">${money(p.price)}</span>`;
}

export function card(p) {
  return `        <li class="pcard">
          <div class="pcard__thumb">${p.regular ? '<span class="pcard__sale">Giảm giá!</span>' : ''}
            <a href="${p.file}"><img src="${local(p.thumb)}" alt="${p.name}" width="300" height="300" loading="lazy"></a>
          </div>
          <div class="pcard__body">
            <a class="pcard__title" href="${p.file}">${p.name}</a>
            <div class="pcard__price">${priceHtml(p)}</div>
            <p class="pcard__desc">${p.desc}</p>
            ${addBtn(p)}
          </div>
        </li>`;
}

/** Sidebar dùng chung cho cửa hàng + chi tiết sản phẩm */
export function shopSidebar(products, opts = {}) {
  const widgetList = products.slice(0, 3).map(p => `          <li>
            <a class="pmini__thumb" href="${p.file}"><img src="${local(p.thumb)}" alt="${p.name}" width="80" height="80" loading="lazy"></a>
            <div class="pmini__body"><a class="pmini__title" href="${p.file}">${p.name}</a>${priceHtml(p)}</div>
          </li>`).join('\n');
  const counts = { all: products.length };
  products.forEach(p => p.cats.forEach(c => { if (c !== 'all') counts[c] = (counts[c] || 0) + 1; }));
  const CAT_LABEL = { all: 'All', 'co-vua': 'Cờ vua', 'thiet-bi': 'Thiết bị' };
  const cats = Object.keys(counts).map(c =>
    `          <li><a href="cua-hang.html">${CAT_LABEL[c] || c}</a><span class="count">(${counts[c]})</span></li>`).join('\n');

  const priceFilter = opts.priceFilter === false ? '' : `      <aside class="widget widget--filter">
        <h4 class="widget-title">Lọc theo giá</h4>
        <div class="price-slider"><span class="price-slider__bar"></span><span class="price-slider__knob"></span><span class="price-slider__knob price-slider__knob--to"></span></div>
        <div class="price-filter__row">
          <button class="btn-filter" type="button">Lọc</button>
          <span class="price-filter__label">Giá: <span>${money(Math.min(...products.map(p => p.price)))}</span> — <span>${money(Math.max(...products.map(p => p.price)))}</span></span>
        </div>
      </aside>`;

  return `${priceFilter}
      <aside class="widget">
        <form class="product-search" role="search" onsubmit="return false">
          <label class="sr-only" for="ps">Tìm kiếm sản phẩm</label>
          <input id="ps" type="search" placeholder="Tìm sản phẩm..." autocomplete="off">
          <button type="submit" aria-label="Tìm kiếm"><svg viewBox="0 0 512 512" aria-hidden="true"><path d="M505 442L405 342a24 24 0 00-17-7h-16a208 208 0 10-36 36v16c0 6 2 12 7 17l100 100c9 9 24 9 33 0l29-29c9-9 9-24 0-33zM208 336a128 128 0 110-256 128 128 0 010 256z"/></svg></button>
        </form>
      </aside>
      <aside class="widget">
        <h4 class="widget-title">Danh mục sản phẩm</h4>
        <ul class="cat-list">
${cats}
        </ul>
      </aside>
      <aside class="widget">
        <h4 class="widget-title">Sản phẩm</h4>
        <ul class="pmini-list">
${widgetList}
        </ul>
      </aside>`;
}

export { localiseImages };
