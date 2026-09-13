import json, html
D=json.load(open('detail.json'))
E=html.escape

CHEV_L='<svg viewBox="0 0 1000 1000" aria-hidden="true"><path d="M646 125c-17 0-33 8-42 17L308 442c-12 12-16 29-16 45 0 17 4 34 16 46l296 321c13 13 25 21 42 21s33-4 46-17c12-12 21-29 21-46 0-16-5-33-21-45L438 487l254-262c8-8 16-21 16-38 0-16-4-33-16-45-17-13-29-17-46-17z"/></svg>'
CHEV_R='<svg viewBox="0 0 1000 1000" aria-hidden="true"><path d="M354 875c17 0 33-8 42-17l296-300c12-12 16-29 16-45 0-17-4-34-16-46L396 146c-13-13-25-21-42-21s-33 4-46 17c-12 12-21 29-21 46 0 16 5 33 21 45l254 280-254 262c-8 8-16 21-16 38 0 16 4 33 16 45 17 13 29 17 46 17z"/></svg>'
def carousel_nav(): return f'<button class="carousel__btn carousel__btn--prev" type="button" aria-label="Trước">{CHEV_L}</button><button class="carousel__btn carousel__btn--next" type="button" aria-label="Sau">{CHEV_R}</button>'

def band(title, mod=""):
    return f'<div class="band{(" "+mod) if mod else ""}"><h2>{title}</h2></div>'

def vcol(items, center=None):
    out=['<div class="values__col">']
    if center:
        out.append(f'<div class="vbox vbox--center"><h3>{center[0]}</h3><p>{center[1]}</p></div>')
    for i,(h,p) in enumerate(items):
        out.append(f'<div class="vbox"><h3>{h}</h3><p>{p}</p></div><div class="vdiv"></div>')
    out.append('</div>')
    return ''.join(out)

team=[("GV_004.jpg","Trần Thị Ngọc Bích","Huấn luyện viên quốc gia, (IS) FIDE"),("GV_002.jpg","Trần Đức Long","Huấn luyện viên quốc gia, (IS) FIDE"),
("GV_001.jpg","Trần Đức Hải","Huấn luyện viên quốc tế (DI), (IS) FIDE"),("GV_005.jpg","Nguyễn Tiến Dũng","Instructor School (IS) FIDE"),
("GV_006.jpg","Nguyễn Lê Hoàng Châu","Huấn luyện viên quốc gia"),("GV_007.jpg","Đặng Ngọc Hương","Giáo viên Truyền Cảm Hứng"),("GV_001-1.jpg","Nguyễn Trường Thịnh","Huấn luyện viên quốc gia")]
gal1=["DSC00073-1024x683.jpg","DSC00123-1024x683.jpg","DSC01494-1024x683.jpg","DSC01579-1024x683.jpg","DSC07502-1024x683.jpg","DSC06650-1024x683.jpg","DSC06738-1024x683.jpg","DSC05644-1024x683.jpg","DSC05699-1024x683.jpg"]
gal2=["DSC06637-1024x683.jpg","DSC06796-1024x683.jpg","DSC06655-1024x683.jpg"]
partners=["Doi-Tac-iChess_01-12.jpg","Doi-Tac-iChess_01-11.jpg","Doi-Tac-iChess_01-10.jpg","Doi-Tac-iChess_01-9.jpg","Doi-Tac-iChess_01-8.jpg","Doi-Tac-iChess_01-7.jpg","Doi-Tac-iChess_01-6.jpg","Doi-Tac-iChess_01-5.jpg","Doi-Tac-iChess_01-4.jpg","Doi-Tac-iChess_01-3.jpg","Doi-Tac-iChess_01-2.jpg","Doi-Tac-iChess_01-1.jpg","Doi-Tac-iChess_01-1.jpeg","Doi-Tac-iChess_01-13.jpg","Doi-Tac-iChess_01-14.jpg"]
news=[("Tam-Ly-Thi-Dau-Co-Vua-4-Nguyen-Tac-Giup-Ban-Choi-Hay-Hon-Va-Tang-Elo-Nhanh-Chong-Le-Quang-Lim-768x461.jpg","4 Nguyên Tắc Vàng Về Tâm Lý Thi Đấu Cờ Vua Mọi Kỳ Thủ Đều Nên Biết"),
("Loi-Cam-On-Chan-Thanh-Den-Toan-The-Ban-To-Chuc-Giai-Co-Vua-Hanh-Trinh-Truyen-Cam-Hung-2026-16-768x470.jpg","Khai Mạc Giải Cờ Vua iChess Hành Trình Truyền Cảm Hứng Lần II Năm 2026"),
("Day-Con-Tu-Duy-Cua-Nha-Vo-Dich-Vi-Sao-Co-Vua-La-Mon-Qua-Dau-Doi-Tuyet-Voi-Nhat-Co-Vua-iChess-768x432.jpg","Dạy Con Tư Duy Của Nhà Vô Địch Vì Sao Cờ Vua Là Món Quà Đầu Đời Tuyệt Vời Nhất?")]

ICO={
 'pin':'<svg viewBox="0 0 384 512"><path d="M172 501C27 291 0 269 0 192 0 86 86 0 192 0s192 86 192 192c0 77-27 99-172 309-10 14-30 14-40 0zm20-229a80 80 0 100-160 80 80 0 000 160z"/></svg>',
 'phone':'<svg viewBox="0 0 448 512"><path d="M400 32H48C21 32 0 53 0 80v352c0 27 21 48 48 48h352c27 0 48-21 48-48V80c0-27-21-48-48-48zM94 416c-6 0-12-5-12-12 0-176 142-318 318-318 6 0 11 4 12 9l15 64c1 6-2 12-7 14l-70 30c-5 2-11 1-14-4l-31-38c-49 23-88 62-111 111l38 31c4 3 6 9 4 14l-30 70c-2 5-8 8-14 7l-64-15c-5-1-9-6-9-12z"/></svg>',
 'mail':'<svg viewBox="0 0 576 512"><path d="M160 448c-26 0-48-19-64-32C22 363 0 344 0 336v104c0 13 11 24 24 24h272c13 0 24-11 24-24V336c0 8-22 27-96 80-16 13-38 32-64 32zm160-256H32c-18 0-32 14-32 32v16c26 20 23 20 116 87 10 7 29 25 44 25 15 0 34-18 44-25 93-67 90-67 116-87v-16c0-18-14-32-32-32zm224-96H224c-18 0-32 14-32 32v32h128c33 0 60 26 64 57v128h160c18 0 32-14 32-32V128c0-18-14-32-32-32z"/></svg>',
 'card':'<svg viewBox="0 0 576 512"><path d="M528 32H48C21 32 0 53 0 80v352c0 27 21 48 48 48h480c27 0 48-21 48-48V80c0-27-21-48-48-48zm0 400H48V80h480v352zM208 256a64 64 0 100-128 64 64 0 000 128zm-90 128h180c12 0 22-9 22-19v-19c0-32-30-58-67-58h-5c-12 5-26 8-40 8s-28-3-40-8h-5c-37 0-67 26-67 58v19c0 10 10 19 22 19zM360 320h112c4 0 8-4 8-8v-16c0-4-4-8-8-8H360c-4 0-8 4-8 8v16c0 4 4 8 8 8zm0-64h112c4 0 8-4 8-8v-16c0-4-4-8-8-8H360c-4 0-8 4-8 8v16c0 4 4 8 8 8zm0-64h112c4 0 8-4 8-8v-16c0-4-4-8-8-8H360c-4 0-8 4-8 8v16c0 4 4 8 8 8z"/></svg>',
 'book':'<svg viewBox="0 0 576 512"><path d="M542 32c-55 3-163 14-230 55-5 3-8 8-8 13v363c0 12 13 19 24 14 69-35 169-44 218-47 17-1 30-14 30-30V62c0-17-15-31-34-30zM264 87C197 46 89 35 34 32 15 31 0 45 0 62v337c0 16 13 29 30 30 49 3 149 12 218 47 11 5 24-2 24-14V100c0-5-3-10-8-13z"/></svg>',
 'users':'<svg viewBox="0 0 640 512"><path d="M96 224a64 64 0 100-128 64 64 0 000 128zm448 0a64 64 0 100-128 64 64 0 000 128zm32 32h-64c-18 0-34 7-45 19 40 22 69 62 75 109h66c18 0 32-14 32-32v-32c0-35-29-64-64-64zm-256 0a112 112 0 100-224 112 112 0 000 224zm77 32h-8c-21 10-44 16-69 16s-48-6-69-16h-8C149 288 96 341 96 406v29c0 27 21 48 48 48h352c27 0 48-21 48-48v-29c0-65-53-118-117-118zm-224-13c-11-12-27-19-45-19H64c-35 0-64 29-64 64v32c0 18 14 32 32 32h66c6-47 35-87 75-109z"/></svg>',
 'img':'<svg viewBox="0 0 512 512"><path d="M464 448H48c-27 0-48-21-48-48V112c0-27 21-48 48-48h416c27 0 48 21 48 48v288c0 27-21 48-48 48zM112 120a56 56 0 100 112 56 56 0 000-112zM64 384h384V272l-88-88c-5-5-12-5-17 0L208 320l-56-56c-5-5-12-5-17 0l-71 72v48z"/></svg>',
 'user':'<svg viewBox="0 0 448 512"><path d="M224 256a128 128 0 100-256 128 128 0 000 256zm90 32h-17a174 174 0 01-146 0h-17C60 288 0 348 0 422v42c0 27 21 48 48 48h352c27 0 48-21 48-48v-42c0-74-60-134-134-134z"/></svg>',
}
def flist(items):
    lis=[]
    for ico,txt,href in items:
        inner=f'{ICO[ico]}{txt}'
        lis.append(f'<li><a href="{href}">{inner}</a></li>' if href is not None else f'<li><span class="t">{inner}</span></li>')
    return '<ul class="flist">'+''.join(lis)+'</ul>'

def testi_card(t):
    txt=t['html'].replace('\n<br>','<br>').replace('<br>\n','<br>').replace('\n',' ')
    return (f'<article class="tcard"><div class="tcard__head"><img src="images/{t["img"]}" alt="{E(t["name"])}" width="67" height="67" loading="lazy">'
            f'<div><span class="tcard__name">{E(t["name"])}</span><span class="stars" aria-label="5 sao">★★★★★</span><span class="tcard__title">{E(t["title"])}</span></div></div>'
            f'<div class="tcard__text">{txt}</div></article>')

# thứ tự testimonial như site gốc
testi=D['testi']

H=f'''<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Học viện cờ vua Thông Thái</title>
<link rel="preload" href="fonts/montserrat-vietnamese.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/home.css">
</head>
<body>

<header class="site-header">
  <div class="navbar">
    <a class="logo" href="index.html"><img src="images/logo.jpg" alt="Học viện cờ vua Thông Thái" width="68" height="68"></a>
    <nav aria-label="Menu chính">
      <ul class="menu">
        <li class="active"><a href="index.html">Trang chủ</a></li>
        <li><a href="#">Giới thiệu</a></li>
        <li class="has-sub"><a href="#">Khóa học</a>
          <ul class="sub-menu">
            <li><a href="#">Khóa học Dolphin</a></li><li><a href="#">Khóa học Turtle</a></li><li><a href="#">Khóa học Bee</a></li>
            <li><a href="#">Khóa học Monkey</a></li><li><a href="#">Khóa học Elephant</a></li><li><a href="#">Khóa trung cấp Jaguar</a></li>
            <li><a href="#">Học trực tuyến (Online)</a></li><li><a href="#">Học online 1 kèm 1</a></li><li><a href="#">Học online 1 kèm 2</a></li>
            <li><a href="#">Học online nhóm 3-6 học viên</a></li><li><a href="#">Học kèm tại nhà</a></li>
          </ul>
        </li>
        <li><a href="#">Khóa Học Online</a></li>
        <li class="has-sub"><a href="#">Tin tức &amp; Sự kiện</a>
          <ul class="sub-menu right">
            <li><a href="#">Tin tức</a></li><li><a href="#">Kiến thức cờ vua</a></li><li><a href="#">Cờ vua &amp; Cuộc sống</a></li>
            <li><a href="#">Câu chuyện cuộc sống</a></li><li><a href="#">Sự kiện và giải đấu</a></li>
          </ul>
        </li>
        <li><a href="#">Cửa hàng</a></li>
        <li><a href="#">Liên hệ</a></li>
      </ul>
    </nav>
    <button class="nav-toggle" type="button" aria-label="Mở menu" aria-expanded="false"><span></span></button>
  </div>
</header>

<div class="mnav" aria-label="Menu di động">
  <div class="mnav__overlay"></div>
  <div class="mnav__panel">
    <button class="mnav__close" type="button" aria-label="Đóng menu">&times;</button>
    <ul class="mnav__list">
      <li><a href="index.html">Trang chủ</a></li>
      <li><a href="#">Giới thiệu</a></li>
      <li><details><summary>Khóa học</summary>
        <a href="#">Khóa học Dolphin</a><a href="#">Khóa học Turtle</a><a href="#">Khóa học Bee</a><a href="#">Khóa học Monkey</a><a href="#">Khóa học Elephant</a><a href="#">Khóa trung cấp Jaguar</a><a href="#">Học trực tuyến (Online)</a><a href="#">Học online 1 kèm 1</a><a href="#">Học online 1 kèm 2</a><a href="#">Học online nhóm 3-6 học viên</a><a href="#">Học kèm tại nhà</a>
      </details></li>
      <li><a href="#">Khóa Học Online</a></li>
      <li><details><summary>Tin tức &amp; Sự kiện</summary>
        <a href="#">Tin tức</a><a href="#">Kiến thức cờ vua</a><a href="#">Cờ vua &amp; Cuộc sống</a><a href="#">Câu chuyện cuộc sống</a><a href="#">Sự kiện và giải đấu</a>
      </details></li>
      <li><a href="#">Cửa hàng</a></li>
      <li><a href="#">Liên hệ</a></li>
    </ul>
  </div>
</div>

<div class="header-spacer"></div>

<main>
  <section class="hero">
    <a href="https://zalo.me/3519488029034299650" target="_blank" rel="noopener">
      <picture>
        <source media="(max-width: 767px)" srcset="images/banner-mobile.png" width="500" height="793">
        <img src="images/banner-desktop.png" alt="Cùng Thông Thái học cờ vua hè 2026" width="1467" height="793" fetchpriority="high">
      </picture>
    </a>
  </section>

  {band("LỜI GIỚI THIỆU","band--sm")}
  <section class="intro">
    <div class="container">
      <div class="intro__text">
        <p>Học viện cờ vua Thông Thái là đơn vị dạy cờ vua cho trẻ em từ 4 đến 14 tuổi tại Thành Phố Hồ Chí Minh. Với phương châm: “Vui chơi – Tự tin – Bản lĩnh” mà iChess theo đuổi để tạo nên môi trường học chất lượng và dịch vụ tốt nhất khi tìm đến với bộ môn cờ vua.<br>iChess tự tin mang đến cho trẻ một nền tảng cờ vua thực sự chắc chắn được hướng dẫn bởi những người thầy tận tâm, giàu kinh nghiệm và yêu trẻ.</p>
      </div>
      <div class="intro__video">
        <div class="video-16x9"><iframe src="https://www.youtube.com/embed/V_7zs3NpJcA?controls=1&amp;rel=0" title="Giới thiệu Học viện cờ vua Thông Thái" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      </div>
    </div>
  </section>

  {band("DỊCH VỤ CỦA CHÚNG TÔI","band--sm")}
  <section class="services">
    <picture>
      <source media="(max-width: 1024px)" srcset="images/Dao-tao-trung-tam-ichess.jpg" width="2341" height="2560">
      <img src="images/ichess2-2048x939.jpg" alt="Dịch vụ: đào tạo tại trung tâm, trực tuyến, coaching 1-1, tổ chức giải đấu, hợp tác giảng dạy, cung cấp sản phẩm cờ" width="2048" height="939" loading="lazy">
    </picture>
  </section>

  <section class="photo">
    <img src="images/Giai-dau-co-vua-Giang-sinh-iChess_01-13-scaled.jpg" alt="Học viên nhận quà tại giải đấu" width="2560" height="1707" loading="lazy">
  </section>

  <section class="quote-red"><h2>"Trẻ em học cờ vua để chiến thắng trên bàn cờ và trưởng thành ngoài cuộc sống"</h2></section>

  <section class="program">
    <svg class="program__shape" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      <path opacity=".33" d="M473 67.3c-203.9 88.3-263.1-34-320.3 0C66 119.1 0 59.7 0 59.7V0h1000v59.7s-62.1 26.1-94.9 29.3c-32.8 3.3-62.8-12.3-75.8-22.1C806 49.6 745.3 8.7 694.9 4.7S492.4 59 473 67.3z"/>
      <path opacity=".66" d="M734 67.3c-45.5 0-77.2-23.2-129.1-39.1-28.6-8.7-150.3-10.1-254 39.1s-91.7-34.4-149.2 0C115.7 118.3 0 39.8 0 39.8V0h1000v36.5s-28.2-18.5-92.1-18.5c-97.7.1-132.2 49.3-173.9 49.3z"/>
      <path d="M766.1 28.9c-200-57.5-266 65.5-395.1 19.5C242 1.8 242 5.4 184.8 20.6 128 35.8 132.3 44.9 89.9 52.5 28.6 63.7 0 0 0 0h1000s-9.9 40.9-83.6 48.1-86.8-1.1-150.3-19.2z"/>
    </svg>
    <div class="container">
      <h2>GIỚI THIỆU<br>VỀ CHƯƠNG TRÌNH HỌC</h2>
      <p>Tại iChess, trẻ từ 4 đến 14 tuổi được học cờ vua theo phương pháp giảng dạy SIGP với những yếu tố tư duy qua tình huống, trực quan, tổ chức trò chơi và thực hành tập luyện giúp trẻ tiếp thu kiến thức một cách tự nhiên, hứng thú và hiệu quả.</p>
      <p>Chương trình cờ vua phát triển tư duy tại iChess được thiết kế theo cấp độ từ cơ bản đến nâng cao, đặt tên theo các loài vật giúp trẻ dễ nhớ, dễ tiếp cận và phát triển tối đa trong môi trường học tập sáng tạo, vui vẻ.</p>
    </div>
  </section>

  <section class="benefit">
    <div class="container">
      <h2>Con bạn sẽ nhận được gì khi</h2>
      <p class="benefit__sub">HỌC CỜ VUA TẠI ICHESS?</p>
      <p class="benefit__lead">Việc lựa chọn môi trường học cờ vua phù hợp đóng vai trò quan trọng trong sự phát triển của trẻ. Tại <strong>Trung tâm cờ vua Truyền Cảm Hứng</strong>, chúng tôi không chỉ giúp trẻ rèn luyện kỹ năng chơi cờ mà còn chú trọng đến sự phát triển toàn diện về tư duy, phẩm chất và niềm đam mê cờ. Dưới đây là <strong>4 giá trị</strong> mà phụ huynh có thể tin tưởng khi cho con theo học tại iChess:</p>
    </div>
  </section>

  <section class="values">
    <div class="container">
      {vcol([("ĐỘI NGŨ GIÁO VIÊN TẬN TÂM","Trẻ được hướng dẫn bởi các huấn luyện viên và giáo viên có trình độ và kinh nghiệm thi đấu giảng dạy. Phương pháp SIGP đặc biệt được sử dụng tại iChess giúp trẻ tiến bộ nhanh chóng và yêu thích cờ vua."),
             ("MÔI TRƯỜNG HỌC ĐẦY CẢM HỨNG","Không gian học tập thoải mái, an toàn và thân thiện với trẻ. Trang thiết bị, dụng cụ giảng dạy được đầu tư theo tiêu chuẩn giúp trẻ hứng thú và phát triển đam mê với cờ vua, kích thích tư duy sáng tạo.")])}
      {vcol([("LỘ TRÌNH HỌC BÀI BẢN","Chương trình được xây dựng theo lộ trình khoa học, từ cơ bản đến nâng cao, giúp trẻ phát triển toàn diện cả về trình độ chơi cờ, kỹ năng và thái độ."),
             ("CƠ HỘI THAM GIA CÁC GIẢI ĐẤU","Trẻ có cơ hội cọ xát qua các giải đấu nội bộ, giải thuộc hệ thống trung tâm và các giải đấu chuyên nghiệp giúp rèn luyện tâm lý thi đấu và phát triển năng lực cờ vua vững chắc, mở ra nhiều cơ hội trong tương lai.")])}
    </div>
  </section>

  <div class="explore"><a class="btn" href="#">Khám phá thêm</a></div>

  <section class="team">
    <div class="container">
      <h2>ĐỘI NGŨ GIÁO VIÊN CỦA CHÚNG TÔI</h2>
      <p class="team__sub">Giáo viên huấn luyện giàu kinh nghiệm đào tạo cờ Vua</p>
      <div class="carousel" data-autoplay="4000">
        <div class="carousel__viewport"><div class="carousel__track">
          {''.join(f'<div class="member"><div class="member__thumb"><img src="images/{i}" alt="{n}" width="172" height="172" loading="lazy"></div><h3>{n}</h3><p>{d}</p></div>' for i,n,d in team)}
        </div></div>
      </div>
    </div>
  </section>

  <div class="band band--lg gap-50"><h2>CỜ VUA TRONG GIÁO DỤC VÀ THỂ THAO</h2></div>
  <section class="values edu">
    <div class="container">
      {vcol([("PHÁT TRIỂN TƯ DUY","Cờ vua giúp rèn luyện tư duy logic, trí tưởng tượng và sự sáng tạo, từ đó nâng cao khả năng suy nghĩ có hệ thống và giải quyết vấn đề một cách hiệu quả."),
             ("NÂNG CAO KỸ NĂNG","Học cờ vua giúp trẻ phát triển nhiều kỹ năng quan trọng như sự tập trung, khả năng ghi nhớ, kỹ năng xử lý vấn đề, kỹ năng ra quyết định, ... giúp trẻ thích ứng linh hoạt trong mọi tình huống."),
             ("RÈN LUYỆN PHẨM CHẤT CÁ NHÂN","Cờ vua giúp trẻ xây dựng tính kiên nhẫn, kỷ luật, bản lĩnh trước thử thách và khả năng kiểm soát cảm xúc, tạo nền tảng vững chắc cho sự phát triển cá nhân."),
             ("THÚC ĐẨY THÀNH CÔNG TRONG HỌC TẬP","Những kỹ năng và phẩm chất rèn luyện từ cờ vua không chỉ giúp trẻ học tập tốt hơn mà còn giúp trẻ tạo được lợi thế, tự tin trong cuộc sống.")],
            center=("CỜ VUA TRONG GIÁO DỤC","Chìa khóa của trí tuệ"))}
      {vcol([("XÂY DỰNG Ý CHÍ THI ĐẤU","Cờ vua giúp trẻ phát triển tinh thần thi đấu, khả năng chịu áp lực và tư duy chiến thuật. Qua các giải đấu, trẻ học cách tự tin, kiên trì và biết chấp nhận thất bại để tiến bộ."),
             ("NÂNG CAO KHẢ NĂNG CẠNH TRANH","Người chơi cờ vua học cách phân tích đối thủ, xây dựng chiến lược và ra quyết định chính xác."),
             ("CƠ HỘI PHÁT TRIỂN CÁ NHÂN","Cờ vua mở ra cơ hội tham gia các giải đấu, giúp trẻ học hỏi, nâng cao sự tự tin và phát triển kỹ năng giao tiếp, thậm chí có cơ hội nhận học bổng quốc tế."),
             ("PHÁT TRIỂN TƯ DUY ĐỘC LẬP","Cờ vua khuyến khích trẻ suy nghĩ độc lập, tự nghiên cứu và rút kinh nghiệm sau mỗi ván cờ, giúp trẻ chủ động và cầu tiến hơn trong mọi lĩnh vực.")],
            center=("CỜ VUA TRONG THỂ THAO","Chìa khóa của bản lĩnh"))}
    </div>
  </section>

  {band("NHỮNG KHOẢNH KHẮC TẠI LỚP HỌC","gap-50 band--xs")}
  <section class="gallery">
    <div class="carousel" data-autoplay="5000">
      <div class="carousel__viewport"><div class="carousel__track">
        {''.join(f'<div><img src="images/{g}" alt="Khoảnh khắc tại lớp học của Học viện cờ vua Thông Thái" width="1024" height="683" loading="lazy"></div>' for g in gal1)}
      </div></div>
      {carousel_nav()}
      <div class="carousel__dots"></div>
    </div>
  </section>

  {band("PHỤ HUYNH NÓI VỀ CHÚNG TÔI","gap-50")}
  <section class="testi">
    <div class="carousel" data-autoplay="6000" data-dots="pages">
      <div class="carousel__viewport"><div class="carousel__track">
        {''.join(testi_card(t) for t in testi)}
      </div></div>
      {carousel_nav()}
      <div class="carousel__dots"></div>
    </div>
  </section>

  {band("MỘT SỐ HÌNH ẢNH Ở CÁC GIẢI ĐẤU","gap-50 band--xs")}
  <section class="gallery">
    <div class="carousel" data-autoplay="5000">
      <div class="carousel__viewport"><div class="carousel__track">
        {''.join(f'<div><img src="images/{g}" alt="Hình ảnh giải đấu của Học viện cờ vua Thông Thái" width="1024" height="683" loading="lazy"></div>' for g in gal2)}
      </div></div>
      {carousel_nav()}
      <div class="carousel__dots"></div>
    </div>
  </section>

  <section class="quote-gray"><h2>“Mỗi nước đi trong cờ vua là một bài học về sự lựa chọn và trách nhiệm”</h2></section>

  {band("TIN TỨC","gap-50 band--xl")}
  <section class="news">
    <div class="container">
      <div class="news__grid">
        {''.join(f'<article class="post"><a class="post__thumb" href="#"><img src="images/{i}" alt="{E(t)}" width="768" height="461" loading="lazy"></a><h3><a href="#">{E(t)}</a></h3><a class="post__more" href="#">Xem thêm »</a></article>' for i,t in news)}
      </div>
      <div class="news__more"><a class="btn" href="#"><svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z"/></svg>Tải xem thêm</a></div>
    </div>
  </section>

  {band("HỆ THỐNG CƠ SỞ ICHESS","gap-50")}
  <section class="map">
    <div class="container">
      <iframe src="https://www.google.com/maps/d/embed?mid=1xcK4DO0c7haK5jhK-O42gxa6uDFxHbE&amp;ehbc=2E312F&amp;noprof=1" title="Bản đồ hệ thống cơ sở iChess" loading="lazy"></iframe>
    </div>
  </section>

  <section class="partners">
    <h2>ĐỐI TÁC CỦA CHÚNG TÔI</h2>
    <div class="carousel" data-autoplay="3000" data-dots="pages">
      <div class="carousel__viewport"><div class="carousel__track">
        {''.join(f'<div><img src="images/{p}" alt="Đối tác iChess" width="768" height="768" loading="lazy"></div>' for p in partners)}
      </div></div>
      {carousel_nav()}
      <div class="carousel__dots"></div>
    </div>
  </section>
</main>

<footer>
  <div class="footer-main">
    <div class="container">
      <div class="fcol fcol--about">
        <a class="flogo" href="index.html"><img src="images/logo.jpg" alt="Học viện cờ vua Thông Thái" width="120" height="120" loading="lazy"></a>
        <p class="fabout"><strong>Học viện cờ vua Thông Thái</strong> là đơn vị dạy cờ vua cho trẻ em từ 4 đến 14 tuổi tại Thành Phố Hồ Chí Minh. Với phương châm: <strong>“Vui chơi – Tự tin – Bản lĩnh”</strong> mà iChess theo đuổi để tạo nên môi trường học chất lượng và dịch vụ tốt nhất khi tìm đến với bộ môn cờ vua.</p>
        <div class="fsocial">
          <a class="fb" href="https://www.facebook.com/covuatruyencamhung" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.3 482.4 504 379.8 504 256z"/></svg></a>
          <a class="yt" href="https://youtu.be/h-dsYDquWeo" target="_blank" rel="noopener" aria-label="Youtube"><svg viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6V175.2l142.7 81.2-142.7 81.2z"/></svg></a>
        </div>
      </div>
      <div class="fcol">
        <h4 class="fhead">Trụ sở chính</h4>
        {flist([("pin","Địa chỉ: 316 Lê Văn Sỹ, Phường Tân Sơn Hoà, TP.Hồ Chí Minh",None),("phone","Hotline: 0365.998.894",None),("mail","covuatruyencamhung@gmail.com",None)])}
        <h4 class="fhead fhead--next">Thông tin</h4>
        {flist([("card","Về chúng tôi","#"),("book","Khóa học","#"),("users","Tuyển dụng","#"),("users","Liên hệ","#")])}
      </div>
      <div class="fcol">
        <h4 class="fhead">Học viện cờ vua Thông Thái</h4>
        {flist([("card","Khóa học","#"),("book","Tin tức","#"),("img","Hình ảnh","#"),("users","Thông tin nội bộ","#"),("user","Tài khoản GV","#")])}
        <h4 class="fhead fhead--next">Hỗ trợ khách hàng</h4>
        {flist([("card","Chính sách khách hàng","#"),("book","FAQs Phụ Huynh","#"),("img","Điều khoản","#")])}
      </div>
      <div class="fcol"></div>
    </div>
  </div>
  <div class="footer-strip"></div>
  <div class="copyright"><div class="wrap">© Bản quyền thuộc về iChess 2020</div></div>
</footer>

<div class="contact-float">
  <a class="cf-btn" href="https://www.facebook.com/covuatruyencamhung" target="_blank" rel="noopener" aria-label="Fanpage Facebook"><span class="circle"><img src="images/Facebook.png" alt="" width="40" height="40"></span></a>
  <a class="cf-btn cf-btn--zalo" href="https://zalo.me/3519488029034299650" target="_blank" rel="noopener" aria-label="Chat Zalo"><span class="circle"><img src="images/zalo.png" alt="" width="28" height="27"></span></a>
</div>
<button class="back-top" type="button" aria-label="Lên đầu trang">
  <svg class="ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48"/></svg>
  <svg class="arr" viewBox="0 0 448 512" aria-hidden="true"><path d="M241 130.5l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9l-22.7 22.7c-9.4 9.4-24.5 9.4-33.9 0L224 227.5 69.3 381.4c-9.4 9.3-24.5 9.3-33.9 0l-22.7-22.7c-9.4-9.4-9.4-24.6 0-33.9L207 130.5c9.4-9.4 24.6-9.4 34 0z"/></svg>
</button>

<script src="js/main.js" defer></script>
<script src="js/slide.js" defer></script>
</body>
</html>
'''
import re
BRAND='Học viện cờ vua Thông Thái'
def _brand(m):
    return BRAND.upper() if m.group(0).isupper() else BRAND
H=H.replace('học cờ trên iChess','học cờ tại iChess')
H=re.sub(r'(?<![\w/.-])ichess(?![\w-]|\.\w)', _brand, H, flags=re.I)
open('../index.html','w').write(H)
print('index.html', len(H))
