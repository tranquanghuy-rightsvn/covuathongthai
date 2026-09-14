export const NAV = [
  { id:'home',    label:'Trang chủ',           href:'index.html' },
  { id:'gioi-thieu', label:'Giới thiệu',       href:'gioi-thieu.html' },
  { id:'khoa-hoc', label:'Khóa học',           href:'khoa-hoc.html', sub:[
      { label:'Khóa học Dolphin',        href:'khoa-hoc-dolphin.html' },
      { label:'Khóa học Turtle',         href:'khoa-hoc-turtle.html' },
      { label:'Khóa học Bee',            href:'khoa-hoc-bee.html' },
      { label:'Khóa học Monkey',         href:'khoa-hoc-monkey.html' },
      { label:'Khóa học Elephant',       href:'khoa-hoc-elephant.html' },
      { label:'Khóa trung cấp Jaguar',   href:'khoa-trung-cap-jaguar.html' },
      { label:'Học trực tuyến (Online)', href:'khoa-hoc-co-vua-online.html' },
      { label:'Học online 1 kèm 1',      href:'khoa-hoc-co-vua-online.html#hoc-online-1-kem-1' },
      { label:'Học online 1 kèm 2',      href:'khoa-hoc-co-vua-online.html#hoc-online-1-kem-2' },
      { label:'Học online nhóm 3-6 học viên', href:'khoa-hoc-co-vua-online.html#hoc-online-nhom' },
      { label:'Học kèm tại nhà',         href:'khoa-hoc-co-vua-tai-nha.html' }
  ]},
  { id:'khoa-hoc-online', label:'Khóa Học Online', href:'khoa-hoc-online.html' },
  { id:'tin-tuc', label:'Tin tức &amp; Sự kiện', href:'tin-tuc.html', right:true, sub:[
      { label:'Tin tức',              href:'tin-tuc.html' },
      { label:'Kiến thức cờ vua',     href:'kien-thuc-co-vua.html' },
      { label:'Cờ vua &amp; Cuộc sống', href:'co-vua-cuoc-song.html' },
      { label:'Câu chuyện cuộc sống', href:'cau-chuyen-cuoc-song.html' },
      { label:'Sự kiện và giải đấu',  href:'su-kien-giai-dau.html' }
  ]},
  { id:'cua-hang', label:'Cửa hàng', href:'cua-hang.html' },
  { id:'lien-he',  label:'Liên hệ',  href:'lien-he.html' }
];

const CART_ICON = '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M528.1 301.3l47.3-208A16 16 0 0 0 559.8 74H159.2l-9.2-44.8A24 24 0 0 0 126.5 10H24A24 24 0 0 0 0 34v16a24 24 0 0 0 24 24h69.9l70.3 343.5A56 56 0 1 0 236 464a55.6 55.6 0 0 0-6.6-26h176.5a55.6 55.6 0 0 0-6.6 26 56 56 0 1 0 63.8-55.4l4.4-19.4a16 16 0 0 0-15.6-19.6H203.3l-6.5-32h309.9a24 24 0 0 0 23.4-18.9z"/></svg>';

export function cartWidget() {
  return `<div class="cart-widget">
      <a class="cart-btn" href="gio-hang.html" aria-label="Giỏ hàng" aria-haspopup="true" aria-expanded="false">
        ${CART_ICON}
        <span class="cart-count" data-cart-count hidden>0</span>
      </a>
      <div class="cart-drop" data-cart-drop>
        <div class="cart-drop__head">Giỏ hàng</div>
        <ul class="cart-drop__list" data-cart-list></ul>
        <p class="cart-drop__empty" data-cart-empty>Chưa có sản phẩm nào trong giỏ hàng.</p>
        <div class="cart-drop__foot" data-cart-foot hidden>
          <div class="cart-drop__total"><span>Tổng cộng</span><strong data-cart-total>0&nbsp;VNĐ</strong></div>
          <a class="cart-drop__go" href="gio-hang.html">Xem giỏ hàng</a>
          <a class="cart-drop__more" href="cua-hang.html">Tiếp tục mua sắm</a>
        </div>
      </div>
    </div>`;
}

export function header(active) {
  const items = NAV.map(n => {
    const cls = [n.sub ? 'has-sub' : '', n.id === active ? 'active' : ''].filter(Boolean).join(' ');
    const sub = n.sub
      ? `\n          <ul class="sub-menu${n.right ? ' right' : ''}">\n            ` +
        n.sub.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join('') +
        `\n          </ul>\n        `
      : '';
    return `        <li${cls ? ` class="${cls}"` : ''}><a href="${n.href}">${n.label}</a>${sub}</li>`;
  }).join('\n');
  return `<header class="site-header">
  <div class="navbar">
    <a class="logo" href="index.html"><img src="images/logo.jpg" alt="Học viện cờ vua Thông Thái" width="68" height="68"></a>
    <nav aria-label="Menu chính">
      <ul class="menu">
${items}
      </ul>
    </nav>
    <div class="navbar__end">
      ${cartWidget()}
      <button class="nav-toggle" type="button" aria-label="Mở menu" aria-expanded="false"><span></span></button>
    </div>
  </div>
</header>`;
}

export function mnav() {
  const items = NAV.map(n => {
    if (!n.sub) return `      <li><a href="${n.href}">${n.label}</a></li>`;
    return `      <li><details><summary>${n.label}</summary>\n        ` +
      n.sub.map(s => `<a href="${s.href}">${s.label}</a>`).join('') +
      `\n      </details></li>`;
  }).join('\n');
  return `<div class="mnav" aria-label="Menu di động">
  <div class="mnav__overlay"></div>
  <div class="mnav__panel">
    <button class="mnav__close" type="button" aria-label="Đóng menu">&times;</button>
    <ul class="mnav__list">
${items}
    </ul>
  </div>
</div>`;
}
