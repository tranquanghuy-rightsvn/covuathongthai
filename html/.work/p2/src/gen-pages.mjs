import { emit, crumbs } from './build.mjs';
import { contentRoot, sections } from './elementor.mjs';
import { link, LABEL_MAP } from './links.mjs';

const BRAND = 'Học viện cờ vua Thông Thái';
const T = t => `${t} | ${BRAND}`;

const PAGES = [
  { key: 'gioi-thieu',            file: 'gioi-thieu.html',            title: 'Giới thiệu',            active: 'gioi-thieu', crumb: 'Giới thiệu' },
  { key: 'khoa-hoc',              file: 'khoa-hoc.html',              title: 'Khóa học',              active: 'khoa-hoc',   crumb: 'Khóa học' },
  { key: 'lien-he',               file: 'lien-he.html',               title: 'Liên hệ',               active: 'lien-he',    crumb: 'Liên hệ' },
  { key: 'su-kien-giai-dau',      file: 'su-kien-giai-dau.html',      title: 'Sự kiện và giải đấu',   active: 'tin-tuc',    crumb: 'Sự kiện và giải đấu' },
  { key: 'tuyen-dung',            file: 'tuyen-dung.html',            title: 'Tuyển dụng',            active: '',           crumb: 'Tuyển dụng' },
  { key: 'hinh-anh',              file: 'hinh-anh.html',              title: 'Hình ảnh hoạt động cờ vua', active: '',       crumb: 'Hình ảnh' },
  { key: 'chinh-sach-khach-hang', file: 'chinh-sach-khach-hang.html', title: 'Chính sách khách hàng', active: '',           crumb: 'Chính sách khách hàng' },
  { key: 'faqs-phu-huynh',        file: 'faqs-phu-huynh.html',        title: 'FAQs Phụ Huynh',        active: '',           crumb: 'FAQs Phụ Huynh' },
  { key: 'dieu-khoan',            file: 'dieu-khoan.html',            title: 'Điều khoản',            active: '',           crumb: 'Điều khoản' },
  { key: 'dang-ky-hoc-thu',       file: 'dang-ky-hoc-thu.html',       title: 'Đăng ký học thử',       active: 'khoa-hoc',   crumb: 'Đăng ký học thử' },
  { key: 'job-openings',          file: 'tuyen-dung-vi-tri.html',     title: 'Các vị trí tuyển dụng', active: '',           crumb: 'Các vị trí tuyển dụng' }
];

export function buildPages() {
  let n = 0;
  for (const p of PAGES) {
    const root = contentRoot(p.key);
    if (!root) { console.log('BỎ QUA (không thấy nội dung):', p.key); continue; }
    const body = sections(root, {
      key: p.key,
      link,
      labelLink: label => LABEL_MAP[label] || '',
      heroAlt: p.title
    });
    emit({
      file: p.file, title: T(p.title), active: p.active, css: ['css/page.css', 'css/blog.css'],
      body: `<main>\n<h1 class="sr-only">${p.title}</h1>\n${body}\n</main>`,
      js: ['js/slide.js', 'js/form.js']
    });
    n++;
  }
  return n;
}
