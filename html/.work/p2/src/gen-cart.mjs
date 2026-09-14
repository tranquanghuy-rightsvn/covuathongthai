import { emit, crumbs } from './build.mjs';

const BRAND = 'Học viện cờ vua Thông Thái';

export function buildCartPage() {
  emit({
    file: 'gio-hang.html', title: `Giỏ hàng | ${BRAND}`, active: 'cua-hang',
    css: ['css/page.css', 'css/shop.css'],
    body: crumbs([{ label: 'Trang chủ', href: 'index.html' }, { label: 'Cửa hàng', href: 'cua-hang.html' }, { label: 'Giỏ hàng' }]) + `

<main>
  <div class="page-head"><div class="wrap"><h1 class="page-title">Giỏ hàng</h1></div></div>
  <div class="wrap cart-page">

    <div class="cart-empty" data-cartpage-empty>
      <svg viewBox="0 0 576 512" aria-hidden="true"><path d="M528.1 301.3l47.3-208A16 16 0 0 0 559.8 74H159.2l-9.2-44.8A24 24 0 0 0 126.5 10H24A24 24 0 0 0 0 34v16a24 24 0 0 0 24 24h69.9l70.3 343.5A56 56 0 1 0 236 464a55.6 55.6 0 0 0-6.6-26h176.5a55.6 55.6 0 0 0-6.6 26 56 56 0 1 0 63.8-55.4l4.4-19.4a16 16 0 0 0-15.6-19.6H203.3l-6.5-32h309.9a24 24 0 0 0 23.4-18.9z"/></svg>
      <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
      <a class="cart-empty__btn" href="cua-hang.html">Quay lại cửa hàng</a>
    </div>

    <div class="cart-grid" data-cartpage-body hidden>
      <div class="cart-main">
        <div class="cart-table-wrap">
          <table class="cart-table">
            <thead>
              <tr><th scope="col">Sản phẩm</th><th scope="col">Giá</th><th scope="col">Số lượng</th><th scope="col">Tạm tính</th><th><span class="sr-only">Xóa</span></th></tr>
            </thead>
            <tbody data-cartpage-rows></tbody>
          </table>
        </div>
        <div class="cart-actions">
          <a class="cart-btn-line" href="cua-hang.html">Tiếp tục mua sắm</a>
          <button class="cart-btn-line cart-btn-line--danger" type="button" data-cart-clear>Xóa toàn bộ giỏ hàng</button>
        </div>
      </div>

      <aside class="cart-sum">
        <h2 class="cart-sum__title">Cộng giỏ hàng</h2>
        <dl class="cart-sum__list">
          <div><dt>Tạm tính</dt><dd data-cartpage-sub>0&nbsp;VNĐ</dd></div>
          <div><dt>Số lượng</dt><dd data-cartpage-qty>0 sản phẩm</dd></div>
          <div><dt>Phí giao hàng</dt><dd>Trung tâm báo sau khi xác nhận</dd></div>
          <div class="cart-sum__grand"><dt>Tổng cộng</dt><dd data-cartpage-total>0&nbsp;VNĐ</dd></div>
        </dl>
        <button class="cart-checkout" type="button" data-cart-checkout>Tiến hành đặt hàng</button>
        <p class="cart-sum__note" data-cart-note hidden>Vui lòng gọi hotline <strong>0365.998.894</strong> hoặc nhắn Zalo để Trung tâm xác nhận đơn hàng.</p>
      </aside>
    </div>

  </div>
</main>`,
    js: ['js/shop.js']
  });
  return 1;
}
