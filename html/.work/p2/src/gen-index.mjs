import fs from 'fs';
import { emit } from './build.mjs';

/** Trang chủ: giữ nguyên nội dung đã clone, chỉ nối lại header/footer mới + gắn link nội bộ. */
export function buildIndex() {
  let body = fs.readFileSync('src/index.body.html', 'utf8');

  const wire = [
    ['<a class="btn" href="#">Khám phá thêm</a>', '<a class="btn" href="khoa-hoc.html">Khám phá thêm</a>'],
    // 3 thẻ tin tức: 2 bài đã clone, bài thứ 3 chưa có trang chi tiết
    ['<article class="post"><a class="post__thumb" href="#"><img src="images/Tam-Ly-Thi-Dau',
     '<article class="post"><a class="post__thumb" href="bai-viet-tam-ly-thi-dau-co-vua.html"><img src="images/Tam-Ly-Thi-Dau'],
    ['<h3><a href="#">4 Nguyên Tắc Vàng', '<h3><a href="bai-viet-tam-ly-thi-dau-co-vua.html">4 Nguyên Tắc Vàng'],
    ['<article class="post"><a class="post__thumb" href="#"><img src="images/Loi-Cam-On',
     '<article class="post"><a class="post__thumb" href="bai-viet-khai-mac-giai-co-vua-2026.html"><img src="images/Loi-Cam-On'],
    ['<h3><a href="#">Khai Mạc Giải Cờ Vua', '<h3><a href="bai-viet-khai-mac-giai-co-vua-2026.html">Khai Mạc Giải Cờ Vua'],
    ['<a class="btn" href="#"><svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 504c137',
     '<a class="btn" href="tin-tuc.html"><svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 504c137']
  ];
  for (const [from, to] of wire) {
    if (!body.includes(from)) throw new Error('Không thấy đoạn cần gắn link ở trang chủ: ' + from.slice(0, 60));
    body = body.replace(from, to);
  }
  // "Xem thêm »" của 2 bài đã clone
  const MORE = [
    ['bai-viet-tam-ly-thi-dau-co-vua.html', '4 Nguyên Tắc Vàng'],
    ['bai-viet-khai-mac-giai-co-vua-2026.html', 'Khai Mạc Giải Cờ Vua']
  ];
  for (const [file, marker] of MORE) {
    const i = body.indexOf(marker);
    const j = body.indexOf('<a class="post__more" href="#">', i);
    if (i < 0 || j < 0) throw new Error('Không thấy nút "Xem thêm" cho ' + marker);
    body = body.slice(0, j) + `<a class="post__more" href="${file}">` + body.slice(j + '<a class="post__more" href="#">'.length);
  }

  emit({
    file: 'index.html', title: 'Học viện cờ vua Thông Thái', active: 'home',
    css: ['css/home.css'],
    body,
    js: ['js/slide.js']
  });
  return 1;
}
