# Báo cáo clone — ichess.edu.vn

- URL: https://ichess.edu.vn/ (trang chủ) — 1 URL, không URL nào bị skip.
- Công nghệ gốc: WordPress 7 + Elementor/Elementor Pro + theme Eduma (Thim), Swiper, Owl Carousel, jQuery.
- Bản clone: HTML/CSS/JS thuần, không framework/thư viện, không build step.
- Công cụ: Chrome thật (Playwright Chromium) để render DOM, đọc `getComputedStyle`, chụp screenshot; `pixel-diff.mjs` để đo độ giống.

## 1. File đã tạo

| File | Dung lượng | Nội dung |
|---|---|---|
| `index.html` | 42.7 KB | Trang chủ (semantic: header/nav/main/section/article/footer) |
| `css/main.css` | 13.3 KB | @font-face, token màu, reset, header + menu mobile, band tiêu đề, carousel, footer, nút nổi |
| `css/home.css` | 9.8 KB | Style riêng các section trang chủ + responsive |
| `js/main.js` | 1.8 KB | Header sticky (ẩn khi cuộn xuống, hiện khi cuộn lên, đổi logo trắng), menu mobile, back-to-top có vòng tiến độ |
| `js/slide.js` | 4.4 KB | Carousel dùng chung: loop liền mạch, autoplay (dừng khi hover), mũi tên, dots, vuốt |
| `images/` (56 file) | 9.8 MB | Ảnh gốc tải về, giữ nguyên file |
| `fonts/` (9 file) | 342 KB | Montserrat (thường + nghiêng), Open Sans — chỉ subset latin, latin-ext, vietnamese |

Ảnh: Anh-phu-huynh-chi-huong.jpg, DSC00073-1024x683.jpg, DSC00123-1024x683.jpg, DSC01494-1024x683.jpg, DSC01579-1024x683.jpg, DSC05644-1024x683.jpg, DSC05699-1024x683.jpg, DSC06637-1024x683.jpg, DSC06650-1024x683.jpg, DSC06655-1024x683.jpg, DSC06738-1024x683.jpg, DSC06796-1024x683.jpg, DSC07502-1024x683.jpg, Danh-gia-phu-huynh-ichess.png, Dao-tao-trung-tam-ichess.jpg, Day-Con-Tu-Duy-Cua-Nha-Vo-Dich-Vi-Sao-Co-Vua-La-Mon-Qua-Dau-Doi-Tuyet-Voi-Nhat-Co-Vua-iChess-768x432.jpg, Doi-Tac-iChess_01-1.jpeg, Doi-Tac-iChess_01-1.jpg, Doi-Tac-iChess_01-10.jpg, Doi-Tac-iChess_01-11.jpg, Doi-Tac-iChess_01-12.jpg, Doi-Tac-iChess_01-13.jpg, Doi-Tac-iChess_01-14.jpg, Doi-Tac-iChess_01-2.jpg, Doi-Tac-iChess_01-3.jpg, Doi-Tac-iChess_01-4.jpg, Doi-Tac-iChess_01-5.jpg, Doi-Tac-iChess_01-6.jpg, Doi-Tac-iChess_01-7.jpg, Doi-Tac-iChess_01-8.jpg, Doi-Tac-iChess_01-9.jpg, Facebook.png, GV_001-1.jpg, GV_001.jpg, GV_002.jpg, GV_004.jpg, GV_005.jpg, GV_006.jpg, GV_007.jpg, Giai-dau-co-vua-Giang-sinh-iChess_01-13-scaled.jpg, Hoc-co-vua-iChess-mua-he-2026_banner_02-655x1024.jpg, Loi-Cam-On-Chan-Thanh-Den-Toan-The-Ban-To-Chuc-Giai-Co-Vua-Hanh-Trinh-Truyen-Cam-Hung-2026-16-768x470.jpg, Phu-huynh-Anh-Khoi.png, Phu-huynh-Yen-Ngo-Kien-Van-iChess.png, Tam-Ly-Thi-Dau-Co-Vua-4-Nguyen-Tac-Giup-Ban-Choi-Hay-Hon-Va-Tang-Elo-Nhanh-Chong-Le-Quang-Lim-768x461.jpg, Y-Kien-phu-huynh-tai-ichess.png, hinh-anh-phu-huynh-ichess.jpg, hinh-phu-huynh.jpg, hoc-co-vua-mua-he-iChess-2026_banner_01.jpg, iChess-Wh.png, ichess2-2048x939.jpg, logo-ichess-white.png, logo-ichess.png, phu-huynh-Hai-Phuong.png, phu-huynh-be-jre.jpg, zalo.png

Font: montserrat-italic-latin-ext.woff2, montserrat-italic-latin.woff2, montserrat-italic-vietnamese.woff2, montserrat-latin-ext.woff2, montserrat-latin.woff2, montserrat-vietnamese.woff2, opensans-latin-ext.woff2, opensans-latin.woff2, opensans-vietnamese.woff2

## 2. URL bị skip
Không có.

## 3. Độ giống theo section × breakpoint (pixel-diff)

Ảnh `original-*`, `clone-*`, `diff-*` của từng ô nằm trong thư mục này (`<section>-<breakpoint>.png`).

| Section | 1920 | 1366 | 768 | 375 |
|---|---|---|---|---|
| header | 98.43% | 96.63% | 99.74% | 99.42% |
| hero | 99.44% | 99.08% | 32.51% ⚠ | 97.60% |
| band-gioi-thieu | 100.00% | 97.01% | 100.00% | 91.23% |
| intro | 99.68% | 99.99% | 66.05% ⚠ | 100.00% |
| band-dich-vu | 100.00% | 100.00% | 100.00% | 94.85% |
| services | 100.00% | 99.56% | 85.97% ⚠ | 98.44% |
| photo | 99.24% | 98.93% | 28.34% ⚠ | 99.77% |
| quote-red | 100.00% | 100.00% | 57.50% ⚠ | 98.66% |
| program | 98.74% | 96.94% | 77.05% ⚠ | 90.96% |
| benefit | 100.00% | 100.00% | 88.78% ⚠ | 93.10% |
| values | 96.27% | 94.38% | 88.44% ⚠ | 87.18% ⚠ |
| explore | 100.00% | 100.00% | 100.00% | 100.00% |
| team | 100.00% | 97.85% | 66.58% ⚠ | 81.91% ⚠ |
| band-edu | 100.00% | 100.00% | 100.00% | 93.18% |
| edu | 96.48% | 95.12% | 86.69% ⚠ | 89.42% ⚠ |
| band-lop-hoc | 100.00% | 100.00% | 100.00% | 99.59% |
| gallery-lop-hoc | 97.89% | 97.04% | 99.03% | 99.69% |
| band-phu-huynh | 100.00% | 99.85% | 99.73% | 89.74% ⚠ |
| testimonials | 99.48% | 99.27% | 92.92% | 85.62% ⚠ |
| band-giai-dau | 100.00% | 99.79% | 99.62% | 100.00% |
| gallery-giai-dau | 98.37% | 97.71% | 97.31% | 99.51% |
| quote-gray | 100.00% | 100.00% | 100.00% | 99.39% |
| band-tin-tuc | 100.00% | 99.97% | 100.00% | 99.90% |
| news | 94.48% | 90.10% | 93.63% | 79.22% ⚠ |
| band-co-so | 100.00% | 99.89% | 100.00% | 95.40% |
| map | 100.00% | 100.00% | 100.00% | 100.00% |
| partners | 99.87% | 94.80% | 94.66% | 85.53% ⚠ |
| footer | 98.12% | 97.40% | 62.24% ⚠ | 70.52% ⚠ |
| **Trung bình** | **99.16%** | **98.26%** | **86.31%** | **93.57%** |

**PC (1920, 1366): 28/28 section đều ≥ 90%** (thấp nhất: `news` 1366 = 90.10%, do khử răng cưa trên ảnh chụp nhiều chi tiết).

Cách đo để công bằng: cả bản gốc lẫn bản clone đều tắt animation/transition và dừng carousel ở slide đầu khi chụp (carousel gốc chạy tự động, nếu không dừng thì diff chỉ phản ánh thời điểm chụp chứ không phải bố cục).

### Section dưới 90% và lý do
- **768px:** bản gốc bị lỗi ở tablet: trang rộng 819px (tràn ngang 51px), banner desktop và mobile đều bị ẩn, thay bằng một slider khối cao ~2.445px, footer 2 cột tràn khung. Bản clone **cố ý không chép lại các lỗi này**: dùng banner desktop co theo chiều rộng, không tràn ngang, footer 3 cột. Vì vậy mọi section nằm sau hero bị lệch vị trí so với bản gốc, nên `hero`, `photo`, `quote-red`, `team`, `footer`… thấp. Bố cục bên trong từng khối vẫn khớp (các band, gallery, map, news đều 93–100%).
- **375px:** chiều cao một vài khối lệch vài chục px (thẻ testimonial cao nhất, khoảng cách divider trong `values`/`edu`, thumbnail tin tức). Các khối sau đó bị đẩy lệch dọc nên `news` (79%), `footer` (71%), `team` (82%) thấp. Soát bằng mắt thì bố cục, thứ tự và style giống bản gốc, không có lỗi hiển thị.
- Theo skill, ở 768/375 ưu tiên bố cục sạch hơn con số pixel.

## 4. Checklist "không vỡ giao diện" (đã soát)

Kiểm bằng script (đo mọi phần tử so với viewport) và nhìn ảnh chụp.

| Kiểm tra | 1920 | 1366 | 768 | 375 |
|---|---|---|---|---|
| Không scroll ngang (scrollWidth = viewport) | ✅ | ✅ | ✅ | ✅ |
| Không phần tử tràn/chồng đè, chữ không bị cắt | ✅ | ✅ | ✅ | ✅ |
| Không ảnh vỡ (0 ảnh naturalWidth = 0), không méo (object-fit cover/tỉ lệ gốc) | ✅ | ✅ | ✅ | ✅ |
| Khoảng cách giữa các khối hợp lý | ✅ | ✅ | ✅ | ✅ |
| Component hoạt động | ✅ | ✅ | ✅ | ✅ |

- Đã kiểm thêm các breakpoint lấy từ CSS gốc: 1600, 1440, 1200, 1024, 991, 600, 480, 320. Tất cả đều không scroll ngang, không phần tử tràn.
- Kiểm chức năng (tự động):
  - dropdown menu hiện khi hover;
  - menu mobile mở, đóng, bung submenu (`<details>`);
  - carousel next/prev đúng, loop 10 lần về đúng dot;
  - autoplay chạy;
  - header chuyển sticky khi cuộn và về trạng thái thường khi lên đầu trang;
  - back-to-top xuất hiện khi cuộn.
- Console: 0 lỗi.

## 5. Không phụ thuộc site gốc
- Không còn URL nào trỏ về `ichess.edu.vn` trong HTML/CSS/JS. Toàn bộ ảnh và font là file local.
- Đã bỏ toàn bộ script của site gốc: jQuery, Elementor, Swiper, Owl, WooCommerce, Jetpack stats (`pixel.wp.com`), Facebook Customer Chat, popup đăng nhập.
- Request ra ngoài khi mở trang chỉ đến từ 2 iframe:
  - YouTube (video giới thiệu) — ngoại lệ được skill cho phép.
  - **Google My Maps** (bản đồ "Hệ thống cơ sở") — **giả định/ngoại lệ**: đây là nội dung chính của section và không có bản thay thế tĩnh tương đương, nên em giữ iframe. Nếu đại ca muốn tuyệt đối không có iframe ngoài YouTube, có thể thay bằng ảnh chụp bản đồ + link.
- Link mạng xã hội/Zalo (facebook.com, youtu.be, zalo.me) giữ nguyên dạng liên kết thường, không tải gì khi mở trang.

## 6. Internal links
Chỉ trang chủ được clone. Logo và "Trang chủ" trỏ về `index.html`; mọi link nội bộ khác (Giới thiệu, Khóa học, Tin tức, bài viết, Đăng ký/Đăng nhập…) để `href="#"`.

## 7. Ghi chú UX / giả định
- **Carousel** (giáo viên, 2 gallery, testimonial, đối tác):
  - dùng chung 1 script, số slide hiển thị khai báo bằng CSS (`--pv`, `--gap`) theo breakpoint;
  - autoplay 3–6 giây, dừng khi hover, có vuốt;
  - timing/easing là ước lượng hợp lý, không đo từ bản gốc.
- **Header:** giống bản gốc — cuộn quá header thì nền đỏ `#ad1111`, chữ trắng, logo trắng; cuộn xuống thì header ẩn, cuộn lên thì hiện lại. Dropdown dùng CSS thuần (`:hover`/`:focus-within`).
- **Tablet (768–1024):**
  - bản gốc dùng slider HTML riêng bị lỗi → clone dùng banner desktop;
  - ảnh "Dịch vụ" dùng bản mobile 2 cột như gốc.
- **Laptop (1025–1366):** như bản gốc, ẩn video ở phần "Lời giới thiệu" và text chiếm toàn bộ chiều rộng.
- **Không clone:** hiệu ứng Ken Burns của ảnh lớn và animation zoom-in khi vào viewport (không đo được, không thuộc tiêu chí). Nút nổi Facebook/Zalo có hiệu ứng rung/nhịp bằng CSS keyframes.
- **SEO/meta:** bỏ qua theo yêu cầu (chỉ giữ `<title>` tối thiểu).
- **Ảnh:** giữ nguyên file gốc theo yêu cầu (không nén). Ảnh nặng nhất là `Giai-dau-co-vua-Giang-sinh-iChess_01-13-scaled.jpg` (2560px) — có thể tối ưu sau nếu cần tốc độ. Ảnh dưới fold đều có `loading="lazy"`.

## 8. Dọn dẹp
- Đã xoá asset tải về nhưng không dùng: `images/Banner-ichess_02.jpg` (slider tablet bị bỏ) và 3 file font Quicksand.
- `.work/` cũ ≥ 3 ngày ở Pre-flight: không có thư mục nào cần dọn.
- `.work/` của lần clone này (DOM dump, manifest, screenshot thô, script đo) **vẫn giữ lại** để có thể chỉnh sửa tiếp.

## 9. Đổi thương hiệu (theo yêu cầu sau khi clone)
- Logo: header, header sticky và footer đều dùng `images/logo.jpg` (logo vuông Thông Thái Chess Academy). Header 68×68px (mobile 50×50px), footer 120×120px, bo góc nhẹ. Đã xoá 3 logo cũ không còn dùng: `logo-ichess.png`, `logo-ichess-white.png`, `iChess-Wh.png`.
- Tên: mọi chữ "iChess"/"ICHESS" trong nội dung, alt, title, `<title>` và copyright đổi thành "Học viện cờ vua Thông Thái" (viết hoa ở các tiêu đề in hoa). Tên file ảnh giữ nguyên.
- Gộp câu để không lặp tên:
  - "Trung tâm cờ vua Truyền Cảm Hứng, viết tắt iChess là đơn vị…" → "Học viện cờ vua Thông Thái là đơn vị…" (phần giới thiệu và footer).
  - Cột footer "Cờ vua iChess" → "Học viện cờ vua Thông Thái".
- Band tiêu đề đổi từ chiều cao cố định sang `min-height`, để tên dài xuống dòng trên mobile mà không tràn.
- Bảng pixel-diff ở mục 3 được đo **trước** khi đổi thương hiệu. Các section có logo/tên mới sẽ khác bản gốc là chủ ý.
- Còn giữ nguyên, chưa đổi:
  - Chữ "Trung tâm cờ vua Truyền Cảm Hứng" ở đoạn "Con bạn sẽ nhận được gì…" và trong 2 lời phụ huynh; chức danh "Giáo viên Truyền Cảm Hứng".
  - Chữ/logo iChess nằm **trong nội dung ảnh**: banner hè 2026, ảnh dịch vụ, watermark trên ảnh lớp học và giải đấu, ảnh bài viết.

## 10. Bỏ Đăng ký / Đăng nhập
- Đã xoá thanh đỏ trên cùng (chỉ chứa 2 link "Đăng ký | Đăng nhập") cùng CSS `.toolbar`.
- Header giờ chỉ còn thanh logo + menu: cao 78px ở desktop, 68px ở ≤1024px, 60px ở ≤767px. Khoảng đệm đầu trang (`--header-h`) đã chỉnh theo, nên banner nằm ngay dưới header, không bị che hay hở.
- Kiểm lại: không scroll ngang (1920/1366/768/375), menu mobile và header sticky vẫn chạy, không ảnh vỡ. Console chỉ còn 1 cảnh báo đến từ iframe YouTube, không phải code của trang.

## 11. Banner hero mới
- Nguồn: `images/banner.png` (1983×793), gồm 2 khung ngăn bởi dải trắng ở cột 1468–1480px.
- Cắt bỏ cả dải trắng lẫn 1–2px viền nhạt hai bên, kiểm lại 4 cạnh mỗi ảnh đều 0% pixel trắng:
  - `images/banner-desktop.png`: 1467×793, dùng cho màn hình ≥ 768px.
  - `images/banner-mobile.png`: 500×793, dùng cho màn hình ≤ 767px.
  - Chuyển ảnh bằng `<picture>`.
- Đã xoá 2 banner cũ: `hoc-co-vua-mua-he-iChess-2026_banner_01.jpg`, `Hoc-co-vua-iChess-mua-he-2026_banner_02-655x1024.jpg`.
- Banner desktop mới có tỉ lệ 1.85:1, cao hơn banner cũ (2.5:1). Ảnh hiển thị đầy đủ, không cắt xén: cao 1038px ở 1920, 738px ở 1366, 415px ở 768.
- Ở mobile, banner cao 595px. Em bỏ phần band "Lời giới thiệu" đè 30px lên đáy banner, để bàn cờ trong ảnh không bị che.
- `banner.png` (ảnh nguồn, không được trang tham chiếu) vẫn giữ trong `images/`.
