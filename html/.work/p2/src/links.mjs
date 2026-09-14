export const PAGE_MAP = {
  '': 'index.html',
  've-chung-toi': 'gioi-thieu.html',
  'khoa-hoc': 'khoa-hoc.html',
  'khoa-hoc-dolphin': 'khoa-hoc-dolphin.html',
  'khoa-hoc-turtle': 'khoa-hoc-turtle.html',
  'khoa-hoc-bee': 'khoa-hoc-bee.html',
  'khoa-hoc-monkey': 'khoa-hoc-monkey.html',
  'khoa-hoc-elephant': 'khoa-hoc-elephant.html',
  'khoa-trung-cap-jaguar': 'khoa-trung-cap-jaguar.html',
  'khoa-hoc-co-vua-online': 'khoa-hoc-co-vua-online.html',
  'khoa-hoc-co-vua-tai-nha': 'khoa-hoc-co-vua-tai-nha.html',
  'courses': 'khoa-hoc-online.html',
  'courses/khoa-hoc-co-vua-danh-cho-nguoi-moi-bat-dau': 'khoa-hoc-online-co-ban.html',
  'courses/khoa-hoc-co-vua-trung-cap-nang-cao-tu-duy-chien-thuat': 'khoa-hoc-online-trung-cap.html',
  'courses/khoa-hoc-co-vua-nang-cao-lam-chu-chien-luoc-tinh-gon': 'khoa-hoc-online-nang-cao.html',
  'tin-tuc': 'tin-tuc.html',
  'kien-thuc-co-vua': 'kien-thuc-co-vua.html',
  'co-vua-cuoc-song': 'co-vua-cuoc-song.html',
  'cau-chuyen-cuoc-song': 'cau-chuyen-cuoc-song.html',
  'giai-co-vua-truyen-cam-hung-ichess-2025': 'su-kien-giai-dau.html',
  'cua-hang': 'cua-hang.html',
  'all': 'cua-hang.html',
  'co-vua': 'cua-hang.html',
  'thiet-bi': 'cua-hang.html',
  'ban-co-vua': 'ban-co-vua.html',
  'keychains': 'bo-co-vua-nam-cham.html',
  'dong-ho-thi-dau-co': 'dong-ho-thi-dau-co.html',
  'bo-co-vua-go-cao-cap': 'bo-co-vua-go-cao-cap.html',
  'dong-ho-thi-dau-co-leap': 'dong-ho-thi-dau-co-leap.html',
  'lien-he': 'lien-he.html',
  'tuyen-dung': 'tuyen-dung.html',
  'hinh-anh-hoat-dong-co-vua': 'hinh-anh.html',
  'chinh-sach-khach-hang': 'chinh-sach-khach-hang.html',
  'faqs-phu-huynh': 'faqs-phu-huynh.html',
  'dieu-khoan': 'dieu-khoan.html',
  'dang-ky-hoc-thu': 'dang-ky-hoc-thu.html',
  'job-openings': 'tuyen-dung-vi-tri.html',
  'course-category/khoa-hoc-online': 'khoa-hoc-online.html',
  'blog': 'tin-tuc.html',
  // 4 bài viết đã clone (mỗi chuyên mục 1 bài)
  'khai-mac-giai-co-vua-ichess-hanh-trinh-truyen-cam-hung-lan-ii-nam-2026': 'bai-viet-khai-mac-giai-co-vua-2026.html',
  'don-tan-cong-doi-trong-co-vua': 'bai-viet-don-tan-cong-doi.html',
  '4-nguyen-tac-vang-ve-tam-ly-thi-dau-co-vua-moi-ky-thu-deu-nen-biet': 'bai-viet-tam-ly-thi-dau-co-vua.html',
  'truyen-khi-va-ca-sau': 'bai-viet-truyen-khi-va-ca-sau.html'
};

/** Nhãn -> trang, dùng khi mục gốc thiếu link. */
export const LABEL_MAP = {
  'Khóa trung cấp Jaguar': 'khoa-trung-cap-jaguar.html',
  'Học online 1 kèm 1': 'khoa-hoc-co-vua-online.html#hoc-online-1-kem-1',
  'Học online 1 kèm 2': 'khoa-hoc-co-vua-online.html#hoc-online-1-kem-2',
  'Học online nhóm 3-6 học viên': 'khoa-hoc-co-vua-online.html#hoc-online-nhom',
  'Khóa học tại nhà': 'khoa-hoc-co-vua-tai-nha.html'
};

/** Đổi link gốc sang file tĩnh trong bản clone. Link ngoài giữ nguyên. */
export function link(href) {
  if (!href) return '#';
  if (/^(#|mailto:|tel:|javascript:)/.test(href)) return href;
  if (!/ichess\.edu\.vn/.test(href)) return href;
  if (/\/wp-content\/uploads\//.test(href)) return href; // ảnh -> xử lý riêng
  const u = href.replace(/^https?:\/\/ichess\.edu\.vn\/?/, '');
  const [path, hash] = u.split('#');
  const slug = path.replace(/\/$/, '').split('?')[0];
  const file = PAGE_MAP[slug];
  if (!file) return '#';
  return hash ? `${file}#${hash}` : file;
}

export function isMapped(href) {
  if (!href || !/ichess\.edu\.vn/.test(href)) return true;
  const slug = href.replace(/^https?:\/\/ichess\.edu\.vn\/?/, '').split('#')[0].replace(/\/$/, '').split('?')[0];
  return slug in PAGE_MAP;
}
