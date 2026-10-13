/* Dữ liệu trang Giải thưởng. Mỗi học viên một mục; các con số tổng do js/awards.js tự tính.
   medal: "gold" | "silver" | "bronze" (huy chương cá nhân), "award" (đạt giải, không có huy chương), "none".
   cup: kèm Cup vô địch. team: có huy chương đồng đội. event: dùng chung khi nhiều lượt thuộc cùng một giải.
   board: G = bảng nữ, U = bảng chung.
   id: dùng cho link riêng (giai-thuong#id) — chỉ chữ thường không dấu, số và gạch ngang.
   photo: ảnh đại diện (tuỳ chọn); bỏ trống thì hiện chữ cái đầu của tên.
   img / cupImg: tên file trong images/giai-thuong/ (không kèm .jpg).
   gallery: thư viện "Khoảnh khắc đáng nhớ" chung của học viện; size: "big" | "wide" | "tall" (bỏ trống = ô thường). */
window.TT_AWARDS = {
  students: [
  {
    id: "cam",
    name: "Cam",
    photo: "",
    season: "09/10/2025 – 09/10/2026",
    asOf: "27/09/2026",
    games: { win: 122, draw: 6, loss: 40 },
    tournaments: [
      { date: "2025-10-09", name: "Giải cờ vua Trường TH Lê Quý Đôn – Nữ khối lớp 1", board: "G6 · lớp 1", result: "Nhất", score: 3, max: 3, medal: "award" },
      { date: "2025-10-18", name: "Giải cờ vua - Đại hội TDTT phường Từ Liêm lần thứ nhất – Nữ khối lớp 1", short: "TDTT phường Từ Liêm", board: "G6 · lớp 1", result: "Nhất", score: 5, max: 5, medal: "gold", team: true, img: "medal-01" },
      { date: "2025-11-11", name: "Giải cờ vua - Đại hội TDTT Thủ Đô lần thứ XI - Cờ tiêu chuẩn", short: "Đại hội TDTT Thủ Đô XI", board: "G7", result: "Nhì", score: 7, max: 9, medal: "silver", img: "medal-02" },
      { date: "2025-12-14", name: "Giải cờ vua Hoa Phượng Đỏ mở rộng lần thứ XI - Năm 2025", short: "Hoa Phượng Đỏ mở rộng XI", board: "G6", result: "Ba", score: 5, max: 7, medal: "bronze", img: "medal-03" },
      { date: "2026-01-11", name: "Giải cờ vua Tinh hoa cờ Việt tranh cup VNCA lần thứ I - Năm 2026", short: "Tinh hoa cờ Việt Cup VNCA I", board: "G7", result: "Nhất", score: 7, max: 7, medal: "gold", cup: true, img: "medal-04", cupImg: "cup-1" },
      { date: "2026-01-18", name: "Giải cờ vua Báo TNTP & NĐ năm học 2025-2026", short: "Báo TNTP & Nhi đồng", board: "G7 · PT", result: "Ba", score: 5.5, max: 7, medal: "bronze", img: "medal-05" },
      { date: "2026-03-08", name: "Giải cờ vua Sơn Tây mở rộng lần IV - Năm 2026", short: "Sơn Tây mở rộng IV", board: "G7", result: "Nhất", score: 8, max: 8, medal: "gold", cup: true, img: "medal-06", cupImg: "cup-2" },
      { date: "2026-03-15", name: "Giải vô địch cờ vua tranh cup ChessTactics lần I - Năm 2026", short: "Cup ChessTactics I", board: "G8", result: "Nhì", score: 5.5, max: 7, medal: "silver", img: "medal-07" },
      { date: "2026-03-29", name: "Giải cờ vua Kiện tướng tương lai mở rộng lần I - Năm 2026", short: "Kiện tướng tương lai I", board: "G7", result: "Ba", score: 5, max: 7, medal: "bronze", img: "medal-08" },
      { date: "2026-04-19", name: "Giải cờ vua Tài Năng Việt mở rộng lần thứ XIX - Năm 2026", short: "Tài Năng Việt mở rộng XIX", board: "G7", result: "Ba", score: 4, max: 7, medal: "bronze", img: "medal-09" },
      { date: "2026-05-09", name: "Giải cờ vua thiếu nhi tranh cúp Chiến Binh Thông Thái lần thứ XI", board: "U7", result: "hạng 7", score: 3, max: 7, medal: "none", team: true },
      { date: "2026-06-06", name: "Giải vô địch cờ vua miền Bắc lần X - Năm 2026 — cờ nhanh", board: "G7 · TT", result: "hạng 10", score: 3, max: 7, medal: "none", event: "mien-bac-x-2026" },
      { date: "2026-06-06", name: "Giải vô địch cờ vua miền Bắc lần X - Năm 2026 — cờ chớp", short: "VĐ Cờ vua Miền Bắc", board: "G7 · TT", result: "Nhất", score: 6, max: 7, medal: "gold", event: "mien-bac-x-2026", img: "medal-10" },
      { date: "2026-06-06", name: "Giải vô địch cờ vua miền Bắc lần X - Năm 2026 — cờ siêu chớp", board: "G7 · TT", result: "hạng 7", score: 4, max: 7, medal: "none", event: "mien-bac-x-2026" },
      { date: "2026-06-21", name: "Giải vô địch cờ vua PSCHOOL mở rộng tranh cup GĐCV lần thứ VI", board: "U7", result: "hạng 22", score: 3, max: 7, medal: "none" },
      { date: "2026-07-04", name: "Giải cờ vua thiếu nhi tranh cúp Chiến Binh Thông Thái lần thứ XIII", short: "Cup Chiến Binh XIII", board: "U6+G7", result: "Nhất nữ", score: 5.5, max: 7, medal: "gold", img: "medal-11" },
      { date: "2026-07-17", name: "Giải thi đấu các môn thể thao hè Thành phố Hà Nội - Năm 2026 - Môn cờ vua", short: "Thể thao hè Hà Nội", board: "G7", result: "Nhất", score: 8, max: 9, medal: "gold", cup: true, img: "medal-12", cupImg: "cup-3" },
      { date: "2026-07-27", name: "Giải cờ vua Captain Chess Hà Đông - Tháng 8 - Năm 2026", board: "Open", result: "hạng 22", score: 2, max: 7, medal: "none" },
      { date: "2026-08-09", name: "Giải cờ vua đường đến đỉnh vinh quang lần thứ 39", short: "Đường đến đỉnh vinh quang 39", board: "G7", result: "Nhì", score: 6, max: 7, medal: "silver", img: "medal-13" },
      { date: "2026-08-23", name: "Giải cờ vua Tinh hoa cờ Việt tranh cup VNCA lần thứ II - Năm 2026", short: "Tinh hoa cờ Việt Cup VNCA II", board: "U8", result: "Nhất nữ", score: 4, max: 6, medal: "gold", cup: true, img: "medal-14", cupImg: "cup-4" },
      { date: "2026-08-30", name: "Giải vô địch cờ vua xã Đông Anh mở rộng tranh cup Loa Thành", short: "Cup Loa Thành, Đông Anh", board: "G7", result: "Nhất", score: 7, max: 7, medal: "gold", cup: true, img: "medal-15", cupImg: "cup-5" },
      { date: "2026-09-06", name: "Giải cờ vua ATS x PQN Chess Championship 2026", short: "ATS x PQN Championship", board: "U7", result: "Nhất nữ", score: 5.5, max: 9, medal: "gold", img: "medal-16" },
      { date: "2026-09-09", name: "Giải cờ vua Trường TH Lê Quý Đôn – Nữ khối lớp 2 + khối lớp 3", board: "G7+G8", result: "Nhất", score: 9, max: 9, medal: "award" },
      { date: "2026-09-20", name: "Giải cờ vua vui tết trung thu 2026", board: "U7", result: "Khuyến khích", score: 3, max: 5, medal: "award" },
      { date: "2026-09-27", name: "Giải vô địch cờ vua xã Thư Lâm mở rộng lần thứ I - Năm 2026", short: "Thư Lâm mở rộng I", board: "G7", result: "Nhất", score: 6, max: 6, medal: "gold", cup: true, img: "medal-17", cupImg: "cup-6" }
    ]
  }
  ],
  gallery: [
    { src: "images/giai-thuong/gallery/g01.jpg", alt: "Các kỳ thủ thi đấu trong một giải cờ vua", size: "big" },
    { src: "images/giai-thuong/gallery/g02.jpg", alt: "Bàn tay đang đi quân cờ" },
    { src: "images/giai-thuong/gallery/g03.jpg", alt: "Hai quân mã đen trắng đối đầu", size: "tall" },
    { src: "images/giai-thuong/gallery/g04.jpg", alt: "Quân vua trắng dưới ánh đèn" },
    { src: "images/giai-thuong/gallery/g05.jpg", alt: "Thế cờ trên bàn cờ đỏ trắng", size: "wide" },
    { src: "images/giai-thuong/gallery/g06.jpg", alt: "Các quân cờ gỗ trên bàn cờ" },
    { src: "images/giai-thuong/gallery/g07.jpg", alt: "Quân tốt đen trên bàn cờ" },
    { src: "images/giai-thuong/gallery/g08.jpg", alt: "Kỳ thủ cân nhắc nước đi" },
    { src: "images/giai-thuong/gallery/g09.jpg", alt: "Toàn cảnh bàn cờ nhìn từ trên xuống", size: "wide" },
    { src: "images/giai-thuong/gallery/g10.jpg", alt: "Quân cờ gỗ cận cảnh" }
  ]
};
