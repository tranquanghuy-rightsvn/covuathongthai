import { emit, crumbs } from './build.mjs';
import { readProducts, readProductDetail, card, shopSidebar, addBtn, priceHtml, localiseImages } from './pages-shop.mjs';
import { local, full } from './assets.mjs';

const BRAND = 'Học viện cờ vua Thông Thái';
const T = t => `${t} | ${BRAND}`;
const CSS = ['css/page.css', 'css/shop.css'];

export function buildShop() {
  const products = readProducts();

  // --- trang Cửa hàng ---
  emit({
    file: 'cua-hang.html', title: T('Cửa hàng'), active: 'cua-hang', css: CSS,
    body: crumbs([{ label: 'Trang chủ', href: 'index.html' }, { label: 'Cửa hàng' }]) + `

<main>
  <div class="page-head"><div class="wrap"><h1 class="page-title">Cửa hàng</h1></div></div>
  <div class="wrap layout">
    <div class="layout__main">
      <div class="shop-bar">
        <p class="shop-count">Hiển thị tất cả ${products.length} kết quả</p>
        <label class="sr-only" for="sort">Sắp xếp</label>
        <select class="shop-sort" id="sort" data-shop-sort>
          <option value="default">Sắp xếp mặc định</option>
          <option value="name">Sắp xếp theo tên</option>
          <option value="price">Sắp xếp theo giá: thấp đến cao</option>
          <option value="price-desc">Sắp xếp theo giá: cao đến thấp</option>
        </select>
      </div>
      <ul class="product-grid" data-product-grid>
${products.map(card).join('\n')}
      </ul>
    </div>
    <div class="layout__side">
${shopSidebar(products)}
    </div>
  </div>
</main>`,
    js: ['js/shop.js']
  });

  // --- 5 trang chi tiết sản phẩm ---
  for (const p of products) {
    const d = readProductDetail(p.remote);
    const imgs = d.gallery.length ? d.gallery : [p.thumbFull];
    const related = products.filter(x => x.remote !== p.remote).slice(0, 3);
    const gallery = `      <div class="product-gallery">
        <div class="product-gallery__main"><img src="${local(imgs[0])}" alt="${p.name}" width="600" height="600" fetchpriority="high"></div>${imgs.length > 1 ? `
        <div class="product-gallery__thumbs">${imgs.map(u => `<img src="${local(u)}" alt="${p.name}" width="80" height="80" loading="lazy">`).join('')}</div>` : ''}
      </div>`;

    emit({
      file: p.file, title: T(p.name), active: 'cua-hang', css: CSS,
      body: crumbs([{ label: 'Trang chủ', href: 'index.html' }, { label: 'Cửa hàng', href: 'cua-hang.html' }, { label: p.name }]) + `

<main>
  <div class="wrap layout">
    <div class="layout__main">
      <div class="product-single">
${gallery}
        <div class="product-summary">
          <h1>${p.name}</h1>
          <div>${priceHtml(p)}</div>
          <div class="product-short">${localiseImages(d.short)}</div>
          <div class="product-buy">
            <div class="qty">
              <button type="button" data-qty-step="-1" aria-label="Giảm số lượng">−</button>
              <label class="sr-only" for="qty">Số lượng</label>
              <input id="qty" type="number" value="1" min="1" step="1" data-qty-input aria-label="Số lượng sản phẩm">
              <button type="button" data-qty-step="1" aria-label="Tăng số lượng">+</button>
            </div>
            ${addBtn(p)}
          </div>
          <p class="product-meta">Danh mục: ${d.cat.map(c => `<a href="cua-hang.html">${c}</a>`).join(', ')}</p>
        </div>
      </div>

      <div class="product-tabs">
        <div class="product-tabs__head" role="tablist">
          <button type="button" role="tab" id="tab-mota" aria-selected="true" aria-controls="panel-mota" data-tab="mota">Mô tả</button>
          <button type="button" role="tab" id="tab-danhgia" aria-selected="false" aria-controls="panel-danhgia" data-tab="danhgia">Đánh giá (0)</button>
        </div>
        <div class="product-tabs__panel rich" role="tabpanel" id="panel-mota" aria-labelledby="tab-mota" data-panel="mota">
${localiseImages(d.long || d.short).split('\n').map(l => '          ' + l).join('\n')}
        </div>
        <div class="product-tabs__panel rich" role="tabpanel" id="panel-danhgia" aria-labelledby="tab-danhgia" data-panel="danhgia" hidden>
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        </div>
      </div>

      <h2 class="related-title">Sản phẩm tương tự</h2>
      <ul class="product-grid">
${related.map(card).join('\n')}
      </ul>
    </div>
    <div class="layout__side">
${shopSidebar(products, { priceFilter: false })}
    </div>
  </div>
</main>`,
      js: ['js/shop.js']
    });
  }
  return products.length + 1;
}
