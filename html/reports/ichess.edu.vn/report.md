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

---

# Giai đoạn 2 — Clone toàn bộ trang còn lại + Giỏ hàng

## 12. Trang đã clone (39 trang)

Nguồn URL: `sitemap_index.xml` của site gốc + menu header + menu footer.

| Nhóm | File | URL gốc |
|---|---|---|
| Trang chủ | `index.html` | `/` |
| Giới thiệu | `gioi-thieu.html` | `/ve-chung-toi/` |
| Khóa học (trang giới thiệu) | `khoa-hoc.html` | `/khoa-hoc/` |
| 8 khóa học | `khoa-hoc-dolphin/turtle/bee/monkey/elephant.html`, `khoa-trung-cap-jaguar.html`, `khoa-hoc-co-vua-online.html`, `khoa-hoc-co-vua-tai-nha.html` | các trang `/khoa-hoc-*/` |
| Khóa học online (danh sách) | `khoa-hoc-online.html` | `/courses/` |
| 3 khóa online (chi tiết) | `khoa-hoc-online-co-ban/trung-cap/nang-cao.html` | `/courses/<slug>/` |
| 4 chuyên mục tin | `tin-tuc.html`, `kien-thuc-co-vua.html`, `co-vua-cuoc-song.html`, `cau-chuyen-cuoc-song.html` | các category tương ứng |
| 4 bài viết (mỗi chuyên mục 1 bài) | `bai-viet-khai-mac-giai-co-vua-2026.html`, `bai-viet-don-tan-cong-doi.html`, `bai-viet-tam-ly-thi-dau-co-vua.html`, `bai-viet-truyen-khi-va-ca-sau.html` | 4 bài đầu của 4 chuyên mục |
| Sự kiện & giải đấu | `su-kien-giai-dau.html` | `/giai-co-vua-truyen-cam-hung-ichess-2025/` |
| Cửa hàng | `cua-hang.html` | `/cua-hang/` |
| Giỏ hàng (tự thiết kế) | `gio-hang.html` | — |
| 5 sản phẩm | `ban-co-vua.html`, `bo-co-vua-go-cao-cap.html`, `bo-co-vua-nam-cham.html`, `dong-ho-thi-dau-co.html`, `dong-ho-thi-dau-co-leap.html` | 5 trang product |
| Liên hệ | `lien-he.html` | `/lien-he/` |
| Đăng ký học thử | `dang-ky-hoc-thu.html` | `/dang-ky-hoc-thu/` |
| Tuyển dụng | `tuyen-dung.html`, `tuyen-dung-vi-tri.html` | `/tuyen-dung/`, `/job-openings/` |
| Hình ảnh | `hinh-anh.html` | `/hinh-anh-hoat-dong-co-vua/` |
| 3 trang chính sách | `chinh-sach-khach-hang.html`, `faqs-phu-huynh.html`, `dieu-khoan.html` | 3 trang tương ứng |

**Trang cố ý không clone:** mọi trang đăng nhập/tài khoản (`/account/`, `/dang-nhap/`, `/dang-nhap-gv/`, `/my-account/`, `/instructor/*`) — thống nhất với quyết định bỏ Đăng ký/Đăng nhập ở mục 10. Link tới các trang này để `href="#"`.

## 13. Quy ước "mỗi category 1 bài viết"

Mỗi trang chuyên mục chỉ liệt kê **đúng 1 bài** — bài đã được clone của chuyên mục đó. Không liệt kê các bài chưa clone để tránh link chết.

| Chuyên mục | Bài đã clone |
|---|---|
| Tin tức | Khai Mạc Giải Cờ Vua … Lần II Năm 2026 |
| Kiến thức cờ vua | Tìm hiểu về đòn tấn công đôi trong cờ vua |
| Cờ vua & Cuộc sống | 4 Nguyên Tắc Vàng Về Tâm Lý Thi Đấu Cờ Vua … |
| Câu chuyện cuộc sống | Truyện Khỉ và cá sấu |

Sidebar "Bài viết mới" và khối "Bạn cũng có thể thích" trong trang bài viết cũng chỉ dùng 4 bài này. Trang chủ nối 2 thẻ tin đầu sang 2 bài đã clone; thẻ thứ 3 thuộc bài chưa clone nên để `href="#"`.

Link nội dung nằm **trong thân bài** trỏ sang bài chưa clone vẫn để `href="#"` (10 link ở bài "đòn tấn công đôi", 6 link ở bài "Truyện Khỉ và cá sấu") — hệ quả trực tiếp của việc mỗi chuyên mục chỉ clone 1 bài.

## 14. File mới

| File | Nội dung |
|---|---|
| `css/page.css` | Khung chung trang con: breadcrumb, tiêu đề trang, nội dung chữ (`.rich`), khối dựng từ Elementor (`.es`, `.ibox`, `.ilist`, `.sc-heading`…), form, gallery, 2 cột nội dung + sidebar |
| `css/blog.css` | Lưới bài viết, widget sidebar, trang bài viết (meta, chia sẻ, prev/next, bình luận, bài liên quan) |
| `css/shop.css` | Lưới sản phẩm, thẻ sản phẩm, sidebar cửa hàng, trang chi tiết sản phẩm |
| `css/course.css` | Danh sách + chi tiết khóa học online (LearnPress) |
| `js/cart.js` | Giỏ hàng |
| `js/shop.js` | Sắp xếp sản phẩm, tab Mô tả/Đánh giá |
| `js/form.js` | Form bản demo (chặn submit, hiện ghi chú) |

`css/main.css` được bổ sung phần giỏ hàng trên header + toast. `index.html` giữ nguyên phần `<main>` (diff chỉ 3 dòng: nối link "Khám phá thêm", 2 thẻ tin và nút "Tải xem thêm").

Ảnh: 404 file (thêm ~348 ảnh mới), font giữ nguyên 9 file. Tổng HTML 965 KB.

## 15. Giỏ hàng

- **Vị trí:** góc phải trên menu, cạnh nút mở menu di động. Chỉ icon + số lượng, đúng yêu cầu.
- **Badge:** ẩn khi giỏ rỗng; đổi viền trắng ↔ đỏ theo trạng thái header thường/sticky.
- **Thêm sản phẩm:** nút "Thêm vào giỏ hàng" ở trang cửa hàng, trang chi tiết sản phẩm (có ô số lượng +/−) và khối "Sản phẩm tương tự". Thêm lại cùng sản phẩm thì cộng dồn số lượng.
- **Toast:** hiện góc trái dưới (tránh đè menu giỏ hàng, nút Facebook/Zalo và nút lên đầu trang), tự ẩn sau 3 giây.
- **Menu giỏ hàng:** hover vào icon là hiện (desktop), bấm icon để mở/đóng (mobile). Gồm ảnh, tên, `số lượng × đơn giá`, nút xóa từng dòng, tổng cộng và nút "Tiếp tục mua sắm".
- **Lưu trữ:** `localStorage` khóa `ttc_cart`, giữ nguyên khi chuyển trang; đồng bộ giữa các tab qua sự kiện `storage`.
- **Trang giỏ hàng riêng — `gio-hang.html`:** bảng sản phẩm (ảnh, tên, giá, ô số lượng +/− và gõ tay, tạm tính từng dòng, nút xóa dòng), nút "Tiếp tục mua sắm" và "Xóa toàn bộ giỏ hàng", khối "Cộng giỏ hàng" (tạm tính, số lượng, phí giao hàng, tổng cộng) và nút "Tiến hành đặt hàng" — bấm sẽ hiện ghi chú bản demo kèm hotline. Khi giỏ rỗng hiện trạng thái rỗng với nút quay lại cửa hàng. Mọi thay đổi trên trang này đồng bộ tức thì với badge và menu giỏ hàng trên header.
- **Vào trang giỏ hàng:** bấm icon giỏ hàng (desktop), hoặc nút "Xem giỏ hàng" trong menu thả xuống. Trên màn hình ≤ 1024px (hoặc thiết bị không hover) bấm icon sẽ mở/đóng menu thả xuống thay vì điều hướng.

## 16. Kiểm tra (tự động, 39/39 trang)

| Kiểm tra | Kết quả |
|---|---|
| Không scroll ngang ở 1440px | ✅ 39/39 |
| Không scroll ngang ở 390px | ✅ 39/39 |
| Không lỗi JS / console error | ✅ 39/39 |
| Không request lỗi | ✅ 39/39 |
| Không link/ảnh nội bộ trỏ vào file không tồn tại | ✅ 0 lỗi |
| Không còn URL trỏ về `ichess.edu.vn` | ✅ 0 |
| Không còn chữ "iChess" hiển thị | ✅ 0 |

Kiểm chức năng: header sticky (icon giỏ hàng chuyển trắng), dropdown menu, menu di động, tab sản phẩm, sắp xếp sản phẩm theo giá/tên, form demo, và toàn bộ luồng giỏ hàng (thêm → cộng dồn → hover → chuyển trang → xóa → mua nhiều từ trang chi tiết → mở trên mobile) cùng trang `gio-hang.html` (trạng thái rỗng → thêm 3 sản phẩm → +/− và gõ số lượng → tạm tính/tổng cộng/badge khớp → xóa dòng → đặt hàng → xóa toàn bộ). Không có lỗi.

## 17. Ghi chú / khác bản gốc có chủ ý

- **Banner khóa học:** bản gốc dùng `background-size: cover` nên **cắt mất hai mép** banner (logo trái và chữ "ĐỘ TUỔI…" phải bị mất). Bản clone hiển thị trọn ảnh (`width:100%; height:auto`).
- **Trang `dang-ky-hoc-thu`:** giữ đúng tỉ lệ và điểm cắt của banner gốc (đo từ `getComputedStyle`), nhưng bỏ một khối bị ẩn (cao 0px) của bản gốc để không chừa khoảng trắng.
- **Tiêu đề widget cửa hàng:** bản gốc ghi nhầm "LỌC THEO GIÁ" cho widget danh mục sản phẩm; bản clone sửa thành "Danh mục sản phẩm".
- **Mục "Khóa trung cấp Jaguar" và 3 mục "Học online…"** ở trang Khóa học: bản gốc thiếu link (hiển thị như link nhưng không bấm được) — bản clone đã nối link.
- **Album ảnh trong bài viết:** bản gốc dùng plugin xếp chồng ảnh, bản clone đổi thành lưới ảnh, bấm vào mở ảnh gốc.
- **Trang chuyên mục:** bỏ nút "Tải xem thêm" vì chỉ còn 1 bài mỗi chuyên mục.
- **Bộ lọc giá, ô tìm sản phẩm, lọc danh mục** ở sidebar cửa hàng là tĩnh (giữ nguyên giao diện gốc), chỉ nút sắp xếp là hoạt động thật.
- **Biểu mẫu** (liên hệ, đăng ký học thử, bình luận): bấm Gửi hiện lời cảm ơn kèm hotline; chưa nối backend.
- **iframe còn lại:** YouTube (trang chủ), Google My Maps (trang chủ, Liên hệ, Đăng ký học thử) và 1 video Facebook nhúng ở trang Sự kiện — giữ như bản gốc.
- Widget "Facebook Page" trong footer của bản gốc đã bỏ (đã bỏ từ giai đoạn 1).

## 18. Công cụ dựng lại

`.work/p2/` chứa toàn bộ pipeline:
- `dump.mjs`, `bgmap.mjs`, `elstyle.mjs` — tải trang gốc bằng Chrome thật, lưu DOM + `getComputedStyle` + ảnh nền.
- `raw-*.html`, `dump-*.json`, `bgmap.json`, `elstyle.json` — dữ liệu đo được.
- `src/` — bộ sinh trang: `all.mjs` (chạy tất cả), `build.mjs` (khung trang), `nav.mjs` (menu + widget giỏ hàng), `elementor.mjs` (đổi widget Elementor sang HTML sạch), `clean.mjs`, `links.mjs`, `assets.mjs`, `download.mjs` và các `gen-*.mjs`.
- Dựng lại toàn bộ: `cd .work/p2 && npm i playwright node-html-parser && node src/all.mjs && node src/download.mjs`.
- Kiểm tra: `node verify.mjs` (link/ảnh), `node qa.mjs <file.html>…` (tràn ngang, lỗi JS, ảnh vỡ, chụp màn hình), `node carttest.mjs`, `node functest.mjs`.

## 19. Cách dựng — clone chứ không tải source

Không tải HTML/CSS/JS của site gốc. Quy trình từng trang:

1. Mở trang bằng Chrome thật (Playwright), cuộn hết để nạp ảnh lazy-load.
2. Lưu DOM đã render + `getComputedStyle` của mọi phần tử (`dump-*.json`), ảnh nền theo `data-id` (`bgmap.json`, `elstyle.json`).
3. Đọc **nội dung** (chữ, ảnh, link, dữ liệu sản phẩm/khóa học) và **số đo** (màu, cỡ chữ, khoảng cách, tỉ lệ khung) từ dữ liệu đó.
4. Dựng lại bằng HTML ngữ nghĩa + CSS tự viết theo đúng quy ước của bản clone trang chủ ở giai đoạn 1.

Kết quả đo trên 39 file HTML xuất ra:

| | Site gốc | Bản clone |
|---|---|---|
| Class của WordPress/Elementor/WooCommerce/LearnPress/Swiper/Owl | có | **0** |
| Script/style nạp từ `wp-content`, `wp-includes`, jQuery… | 76 file (trang Cửa hàng) | **0** |
| File CSS/JS | hàng chục | 6 file tự viết |
| Dung lượng HTML trang Cửa hàng | 428 KB | 25 KB |
| Dung lượng HTML trang Giới thiệu | 313 KB | 28 KB |
| Dung lượng HTML trang Tin tức | 279 KB | 27 KB |

Ví dụ 1 thẻ sản phẩm — gốc:

```html
<li class="product type-product post-138 status-publish first instock product_cat-all
           product_cat-co-vua has-post-thumbnail shipping-taxable purchasable product-type-simple">
  <div class="content__product"><div class="product_thumb">
    <img width="300" height="300" src="https://ichess.edu.vn/wp-content/uploads/…"
         class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" decoding="async"
         srcset="… 300w, … 150w, … 420w, … 600w, … 100w, … 48w, … 659w" sizes="…">
```

bản clone:

```html
<li class="pcard">
  <div class="pcard__thumb">
    <a href="ban-co-vua.html"><img src="images/ban-co-vua-300x300.jpg" alt="bàn cờ vua"
       width="300" height="300" loading="lazy"></a>
  </div>
```

Ảnh và font là file tải về để trang chạy được offline — đó là tài nguyên, không phải mã nguồn.

---

# Giai đoạn 3 — Soát trước khi release

## 20. Bỏ ghi chú thừa

Đã gỡ toàn bộ chữ "bản demo" khỏi trang (0 kết quả khi tìm trong `*.html`, `js/*`, `css/*`):

| Chỗ | Trước | Sau |
|---|---|---|
| Nút "Tiến hành đặt hàng" | "Đây là bản demo nên chưa có bước thanh toán thật…" | "Vui lòng gọi hotline **0365.998.894** hoặc nhắn Zalo để Trung tâm xác nhận đơn hàng." |
| Form liên hệ / đăng ký học thử | "Đây là bản demo, biểu mẫu không gửi dữ liệu đi đâu cả." | "Xin cảm ơn! Vui lòng gọi hotline **0365.998.894** hoặc nhắn Zalo để được hỗ trợ nhanh nhất." |
| Form bình luận | như trên | "Xin cảm ơn! Bình luận của bạn sẽ được hiển thị sau khi Trung tâm duyệt." |
| Cuối trang chuyên mục | dòng ghi chú về bài chưa clone | đã bỏ hẳn (kèm CSS `.post-list__note`) |

## 21. Đối chiếu số đo với bản gốc

Đo `getComputedStyle` + `getBoundingClientRect` song song trên site gốc và bản clone (`compare.mjs`, `probe5.mjs`), rồi chỉnh CSS theo số đo thật.

**Trang bài viết** — sau khi chỉnh, ở cả 1440px và 390px:

| Phần tử | Gốc @1440 | Clone @1440 | Gốc @390 | Clone @390 |
|---|---|---|---|---|
| Cột nội dung | x=85 w=903 | x=85 w=903 | x=25 w=340 | x=25 w=340 |
| Ảnh đại diện | 903×542, bo 10px | 903×542, bo 10px | 340×204 | 340×204 |
| Thân bài | 17.5px/30 Open Sans | 17.5px/30 Open Sans | 17.5px/30 | 17.5px/30 |
| Tiêu đề trong bài | 21px/33.6 #ad1010 | 21px/33.6 #ad1010 | 21px/33.6 | 21px/33.6 |
| Dòng thông tin | 16px Montserrat #000 | 16px Montserrat #000 | như gốc | như gốc |
| Blockquote | viền trái 5px #eee, không nền, chữ đứng | giống | giống | giống |

**Trang chuyên mục:** container 1352, cột nội dung tự co, sidebar 311; lưới thẻ 2 cột × 499, gap 35/20; thẻ nền `#f1f1f1` bo 10px padding 5px; tiêu đề 19px/30.4 #ad1010; tóm tắt 16px/27. Sidebar: thanh đỏ 21px/33.6 Open Sans đậm padding 20/12, hộp dưới nền `#fafafa` viền `#dbdbdb` bo góc dưới 10px; danh mục 17px/27 đậm `#a80000`; khóa học 19px/30.4 + tóm tắt 16px/22.4 `#666`. Thứ tự danh mục ở sidebar xếp lại đúng bản gốc (Câu chuyện cuộc sống → Cờ vua & Cuộc sống → Kiến thức cờ vua → Tin tức).

## 22. Khối bản gốc có mà trước đó thiếu — đã bổ sung

- **Hộp "NỘI DUNG BÀI VIẾT"**: nền `#f9f9f9`, viền `#aaa`, bo 4px, padding `10px 20px 10px 10px`, tiêu đề 20.4px/29.58 — mặc định đóng như bản gốc. Mục lục dựng từ chính các tiêu đề trong bài, mọi link đều có đích (đã kiểm), bấm vào cuộn tới đúng mục và không bị header cố định che.
- **Dãy thẻ Tag cuối bài** (17 thẻ): viền 1px `#ad1010`, bo 4px, padding `2px 10px`, chữ 14px.
- **Số bình luận** trong dòng thông tin ("Không có bình luận").
- **2 ô đánh dấu** trong form bình luận.

## 23. Breadcrumb & tiêu đề trang — xếp lại đúng bản gốc

Trước đó bản clone gắn breadcrumb cho mọi trang. Đã dò lại bản gốc: chỉ 5 nhóm trang có breadcrumb.

| Có breadcrumb (giống gốc) | Không có breadcrumb (giống gốc) |
|---|---|
| Cửa hàng, 5 sản phẩm, Khóa học online (danh sách + 3 chi tiết), 4 bài viết | Trang chủ, Giới thiệu, 8 khóa học, 4 chuyên mục, Sự kiện, Liên hệ, Tuyển dụng (+vị trí), Hình ảnh, Đăng ký học thử, 3 trang chính sách |

Breadcrumb bài viết rút còn 2 cấp (`Trang chủ › <chuyên mục>`) như bản gốc. Tiêu đề trang kiểu thanh đỏ chỉ còn ở Cửa hàng, Khóa học online và Giỏ hàng — đúng như bản gốc. Các trang bỏ tiêu đề hiển thị vẫn giữ `<h1>` ẩn cho SEO/trình đọc màn hình.

## 24. Kết quả soát (39 trang × 5 khổ màn hình = 195 lượt)

Khổ đo: **1920, 1440, 1024, 768, 390**. Mỗi lượt kiểm: tràn trang ngang, phần tử tràn khỏi khung nhìn, chữ bị cắt cụt, chữ dưới 11px, ảnh vỡ, lỗi JS/console, request lỗi.

```
195/195 lượt kiểm tra sạch (39 trang × 5 khổ)
```

Kiểm link/ảnh nội bộ: **0 lỗi** trên 39 trang; 0 URL còn trỏ `ichess.edu.vn`; 0 chữ "iChess" hiển thị.

Kiểm chức năng lại sau khi sửa: giỏ hàng (thêm → cộng dồn → toast → hover → trang giỏ hàng → +/− và gõ số lượng → xóa dòng → đặt hàng → xóa toàn bộ → mobile), header sticky, dropdown, menu di động, tab sản phẩm, sắp xếp sản phẩm, biểu mẫu, mục lục bài viết. Không lỗi JS.

Đã sửa thêm trong lượt soát:
- Mô tả sản phẩm chuyển sang cắt 3 dòng có dấu `…` thay vì cắt cứng giữa chữ.
- `id` của tiêu đề trong bài thêm tiền tố `muc-` để không bắt đầu bằng số (tránh lỗi khi dùng làm CSS selector).
