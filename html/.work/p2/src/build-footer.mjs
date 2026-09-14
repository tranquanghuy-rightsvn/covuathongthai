import fs from 'fs';
const MAP = {
  'Về chúng tôi':'gioi-thieu.html', 'Tuyển dụng':'tuyen-dung.html', 'Liên hệ':'lien-he.html',
  'Tin tức':'tin-tuc.html', 'Hình ảnh':'hinh-anh.html',
  'Thông tin nội bộ':'#', 'Tài khoản GV':'#',
  'Chính sách khách hàng':'chinh-sach-khach-hang.html', 'FAQs Phụ Huynh':'faqs-phu-huynh.html',
  'Điều khoản':'dieu-khoan.html'
};
let s = fs.readFileSync('src/_footer.html','utf8');
// "Khóa học" appears twice: 1st (cột Thông tin) -> khoa-hoc.html, 2nd (cột học viện) -> khoa-hoc-online.html
const KH = ['khoa-hoc.html','khoa-hoc-online.html']; let khi = 0;
s = s.replace(/<a href="#">(<svg[\s\S]*?<\/svg>)([^<]+)<\/a>/g, (m, svg, label) => {
  const t = label.trim();
  let href = MAP[t];
  if (t === 'Khóa học') href = KH[khi++] || 'khoa-hoc.html';
  if (!href) { console.log('UNMAPPED footer link:', JSON.stringify(t)); href = '#'; }
  return `<a href="${href}">${svg}${label}</a>`;
});
fs.writeFileSync('src/_footer.html', s);
console.log('remaining href="#":', (s.match(/href="#"/g)||[]).length);
