/* Trang Giải thưởng: tổng hợp học viện, bảng vàng học viên, hồ sơ từng học viên (giai-thuong#id), thư viện ảnh.
   Mọi con số tổng đều tự tính từ window.TT_AWARDS (js/data/awards.js). */
(function () {
  var root = document.querySelector("[data-awards]");
  var data = window.TT_AWARDS;
  if (!root || !data || !data.students || !data.students.length) return;

  var students = data.students;
  var IMG = "images/giai-thuong/";
  var MEDAL_LIMIT = 12;
  var ROW_LIMIT = 10;
  var MEDALS = ["gold", "silver", "bronze"];
  var MEDAL_NAME = { gold: "Huy chương vàng", silver: "Huy chương bạc", bronze: "Huy chương đồng", award: "Đạt giải, không có huy chương", none: "Không huy chương" };
  var ICON_CUP = '<svg class="aw-ico" viewBox="0 0 576 512" aria-hidden="true"><path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"/></svg>';
  var ICON_TEAM = '<svg class="aw-ico aw-ico--team" viewBox="0 0 640 512" aria-hidden="true"><path d="M96 224a64 64 0 100-128 64 64 0 000 128zm448 0a64 64 0 100-128 64 64 0 000 128zm32 32h-64c-18 0-34 7-45 19 40 22 69 62 75 109h66c18 0 32-14 32-32v-32c0-35-29-64-64-64zm-256 0a112 112 0 100-224 112 112 0 000 224zm77 32h-8c-21 10-44 16-69 16s-48-6-69-16h-8C149 288 96 341 96 406v29c0 27 21 48 48 48h352c27 0 48-21 48-48v-29c0-65-53-118-117-118zm-224-13c-11-12-27-19-45-19H64c-35 0-64 29-64 64v32c0 18 14 32 32 32h66c6-47 35-87 75-109z"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function num(n) { return String(n).replace(".", ","); }
  function pct(part, whole) { return whole ? num((part / whole * 100).toFixed(1)) : "0"; }
  function dateLong(iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  function dateShort(iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0].slice(2); }
  function boardShort(b) { return b.split(" · ")[0]; }
  function count(list, fn) { return list.filter(fn).length; }
  function isMedal(t) { return MEDALS.indexOf(t.medal) !== -1; }
  function initial(name) { var parts = name.trim().split(/\s+/); return parts[parts.length - 1].charAt(0).toUpperCase(); }

  function stats(s) {
    var t = s.tournaments;
    var events = {};
    t.forEach(function (x) { events[x.event || x.date + x.name] = true; });
    var medals = t.filter(isMedal);
    var team = count(t, function (x) { return x.team; });
    return {
      giai: Object.keys(events).length,
      played: s.games.win + s.games.draw + s.games.loss,
      gold: count(t, function (x) { return x.medal === "gold"; }),
      silver: count(t, function (x) { return x.medal === "silver"; }),
      bronze: count(t, function (x) { return x.medal === "bronze"; }),
      team: team,
      medals: medals,
      medalTotal: medals.length + team,
      cups: t.filter(function (x) { return x.cup; }),
      withMedal: count(t, function (x) { return isMedal(x) || x.team; }),
      perfect: count(t, function (x) { return x.score === x.max; }),
      score: t.reduce(function (a, x) { return a + x.score; }, 0),
      max: t.reduce(function (a, x) { return a + x.max; }, 0)
    };
  }

  function title(text, sub) {
    return '<h3 class="aw-title">' + esc(text) + (sub ? " <small>" + esc(sub) + "</small>" : "") + "</h3>";
  }

  function avatar(s, cls) {
    return s.photo
      ? '<span class="' + cls + '"><img src="' + esc(s.photo) + '" alt="" loading="lazy" width="96" height="96"></span>'
      : '<span class="' + cls + '" aria-hidden="true">' + esc(initial(s.name)) + "</span>";
  }

  function moreButton(hidden, label) {
    return hidden > 0 ? '<button type="button" class="aw-more" data-more>Xem thêm ' + hidden + " " + label + "</button>" : "";
  }

  function card(t, imgSrc, label, extra, badge) {
    return (
      '<li class="aw-card' + (extra ? " aw-extra" : "") + '">' +
        (badge || "") +
        '<div class="aw-card__img"><img src="' + esc(imgSrc) + '" alt="' + esc(t.short || t.name) + '" loading="lazy" width="600" height="500"></div>' +
        '<div class="aw-card__meta"><span>' + dateLong(t.date) + "</span><b>" + esc(boardShort(t.board)) + "</b></div>" +
        '<p class="aw-card__name">' + esc(t.short || t.name) + "</p>" +
        '<div class="aw-card__foot"><span class="aw-card__result">' + esc(label) + (t.cup ? ICON_CUP : "") + "</span><b>" + num(t.score) + "/" + t.max + "</b></div>" +
      "</li>"
    );
  }

  function overviewHtml() {
    var all = students.map(stats);
    var sum = function (fn) { return all.reduce(function (a, x) { return a + fn(x); }, 0); };
    var luot = students.reduce(function (a, s) { return a + s.tournaments.length; }, 0);
    return '<ul class="aw-overview">' +
      "<li><strong>" + students.length + "</strong><span>Học viên</span></li>" +
      "<li><strong>" + sum(function (x) { return x.medalTotal; }) + "</strong><span>Huy chương</span></li>" +
      "<li><strong>" + sum(function (x) { return x.cups.length; }) + "</strong><span>Cup vô địch</span></li>" +
      "<li><strong>" + luot + "</strong><span>Lượt thi đấu</span></li>" +
      "</ul>";
  }

  function rosterHtml() {
    return '<section class="aw-section" aria-labelledby="aw-roster-title">' +
      '<h2 class="aw-heading" id="aw-roster-title">Bảng vàng học viên</h2>' +
      '<ul class="aw-roster">' +
      students.map(function (s) {
        var st = stats(s);
        return '<li><a class="aw-student" href="#' + esc(s.id) + '" data-student="' + esc(s.id) + '">' +
          avatar(s, "aw-avatar") +
          '<span class="aw-student__body"><span class="aw-student__name">' + esc(s.name) + "</span>" +
          '<span class="aw-student__season">' + esc(s.season) + "</span>" +
          '<span class="aw-student__medals">' +
            '<span title="Huy chương vàng"><i class="aw-dot aw-dot--gold"></i>' + st.gold + "</span>" +
            '<span title="Huy chương bạc"><i class="aw-dot aw-dot--silver"></i>' + st.silver + "</span>" +
            '<span title="Huy chương đồng"><i class="aw-dot aw-dot--bronze"></i>' + st.bronze + "</span>" +
            '<span title="Cup vô địch">' + ICON_CUP + st.cups.length + "</span>" +
          "</span></span></a></li>";
      }).join("") +
      "</ul></section>";
  }

  function profileHtml(s) {
    var t = s.tournaments, st = stats(s), g = s.games;
    var id = "aw-student-" + esc(s.id);
    var html = '<section class="aw-profile" aria-labelledby="' + id + '">';

    html += '<header class="aw-profile__head">' + avatar(s, "aw-avatar aw-avatar--lg") +
      '<div class="aw-profile__who"><span class="aw-eyebrow">Hồ sơ thành tích</span>' +
      '<h2 class="aw-profile__name" id="' + id + '">Hành trình cờ vua của <span>' + esc(s.name) + "</span></h2></div>" +
      '<span class="aw-season">' + esc(s.season) + "</span></header>";

    html += '<ul class="aw-stats">' +
      '<li class="aw-stat aw-stat--red"><strong>' + st.giai + "</strong><span>Giải đấu</span></li>" +
      '<li class="aw-stat aw-stat--amber"><strong>' + t.length + "</strong><span>Lượt thi đấu</span></li>" +
      '<li class="aw-stat aw-stat--green"><strong>' + st.played + "</strong><span>Ván thực đấu</span></li>" +
      '<li class="aw-stat aw-stat--violet"><strong>' + st.medalTotal + "</strong><span>Huy chương</span></li>" +
      "</ul>";

    var pw = pct(g.win, st.played), pd = pct(g.draw, st.played), pl = pct(g.loss, st.played);
    var w = function (n) { return st.played ? n / st.played * 100 : 0; };
    html += '<div class="aw-block">' + title("Kết quả", st.played + " ván thực đấu") +
      '<div class="aw-bar" role="img" aria-label="Thắng ' + g.win + " ván (" + pw + "%), hòa " + g.draw + " ván (" + pd + "%), thua " + g.loss + " ván (" + pl + '%)">' +
        '<span class="aw-bar__win" style="width:' + w(g.win) + '%"></span>' +
        '<span class="aw-bar__draw" style="width:' + w(g.draw) + '%"></span>' +
        '<span class="aw-bar__loss" style="width:' + w(g.loss) + '%"></span>' +
      "</div>" +
      '<ul class="aw-bar-legend">' +
        '<li><i class="aw-sw aw-sw--win"></i><span>Thắng <b>' + g.win + "</b> · " + pw + "%</span></li>" +
        '<li><i class="aw-sw aw-sw--draw"></i><span>Hòa <b>' + g.draw + "</b> · " + pd + "%</span></li>" +
        '<li><i class="aw-sw aw-sw--loss"></i><span>Thua <b>' + g.loss + "</b> · " + pl + "%</span></li>" +
      "</ul></div>";

    html += '<div class="aw-block">' + title("Bộ sưu tập") + '<ul class="aw-chips">' +
      '<li class="aw-chip"><i class="aw-dot aw-dot--gold"></i><span><b>' + st.gold + "</b> Vàng</span></li>" +
      '<li class="aw-chip"><i class="aw-dot aw-dot--silver"></i><span><b>' + st.silver + "</b> Bạc</span></li>" +
      '<li class="aw-chip"><i class="aw-dot aw-dot--bronze"></i><span><b>' + st.bronze + "</b> Đồng</span></li>" +
      '<li class="aw-chip aw-chip--cup">' + ICON_CUP + "<span><b>" + st.cups.length + "</b> Cup vô địch</span></li>" +
      '<li class="aw-chip aw-chip--team">' + ICON_TEAM + "<span><b>" + st.team + "</b> Đồng đội</span></li>" +
      "</ul></div>";

    if (st.cups.length) {
      html += '<div class="aw-block">' + title("Cup vô địch", st.cups.length + " cup · theo thời gian") + '<ul class="aw-grid">' +
        st.cups.map(function (x) { return card(x, IMG + x.cupImg + ".jpg", x.result === "Nhất" ? "Vô địch" : x.result, false); }).join("") +
        "</ul></div>";
    }

    if (st.medals.length) {
      var hiddenMedals = Math.max(0, st.medals.length - MEDAL_LIMIT);
      html += '<div class="aw-block' + (hiddenMedals ? " is-collapsed" : "") + '">' +
        title("Hành trình huy chương", st.medals.length + " huy chương cá nhân · theo thời gian") + '<ul class="aw-grid">' +
        st.medals.map(function (x, i) {
          var badge = '<span class="aw-card__no aw-card__no--' + x.medal + '" title="' + MEDAL_NAME[x.medal] + '">' + (i + 1) + "</span>";
          return card(x, IMG + x.img + ".jpg", x.result, i >= MEDAL_LIMIT, badge);
        }).join("") +
        "</ul>" + moreButton(hiddenMedals, "huy chương") + "</div>";
    }

    var hiddenRows = Math.max(0, t.length - ROW_LIMIT);
    html += '<div class="aw-block' + (hiddenRows ? " is-collapsed" : "") + '">' + title("Toàn bộ chặng đường", t.length + " lượt thi đấu") +
      '<div class="aw-table-wrap"><table class="aw-table"><caption class="sr-only">Toàn bộ các lượt thi đấu của ' + esc(s.name) + "</caption>" +
      '<thead><tr><th scope="col">Ngày</th><th scope="col">Giải đấu</th><th scope="col">Bảng</th><th scope="col">Đạt giải</th><th scope="col">Điểm</th><th scope="col"><span class="sr-only">Cup / đồng đội</span></th></tr></thead><tbody>' +
      t.map(function (x, i) {
        var extra = (x.cup ? '<span title="Cup vô địch">' + ICON_CUP + '<span class="sr-only">Cup vô địch</span></span>' : "") +
          (x.team ? '<span title="Huy chương đồng đội">' + ICON_TEAM + '<span class="sr-only">Huy chương đồng đội</span></span>' : "");
        return "<tr" + (i >= ROW_LIMIT ? ' class="aw-extra"' : "") + ">" +
          '<td class="aw-table__date"><i class="aw-dot aw-dot--' + x.medal + '" title="' + MEDAL_NAME[x.medal] + '"></i><span class="sr-only">' + MEDAL_NAME[x.medal] + ", </span>" + dateShort(x.date) + "</td>" +
          '<td class="aw-table__name">' + esc(x.name) + "</td>" +
          '<td class="aw-table__board">' + esc(x.board) + "</td>" +
          '<td class="aw-table__result' + (x.medal === "none" ? " is-muted" : "") + '">' + esc(x.result) + "</td>" +
          '<td class="aw-table__score">' + num(x.score) + "/" + x.max + "</td>" +
          '<td class="aw-table__extra">' + extra + "</td>" +
          "</tr>";
      }).join("") +
      "</tbody></table></div>" + moreButton(hiddenRows, "lượt thi đấu") +
      '<ul class="aw-legend">' +
        '<li><i class="aw-dot aw-dot--gold"></i>HCV</li><li><i class="aw-dot aw-dot--silver"></i>HCB</li><li><i class="aw-dot aw-dot--bronze"></i>HCĐ</li>' +
        '<li><i class="aw-dot aw-dot--award"></i>Đạt giải — không có huy chương</li><li><i class="aw-dot aw-dot--none"></i>Không huy chương</li>' +
        "<li>" + ICON_CUP + "Cup vô địch</li><li>" + ICON_TEAM + "Huy chương đồng đội</li>" +
      "</ul>" +
      '<div class="aw-summary">' +
        "<span><b>" + st.withMedal + "/" + t.length + "</b> giải đạt huy chương</span>" +
        "<span><b>" + st.perfect + "</b> giải đạt điểm tối đa</span>" +
        "<span><b>" + num(st.score) + "/" + st.max + "</b> điểm · " + pct(st.score, st.max) + "%</span>" +
      "</div>" +
      '<p class="aw-note">“hạng N” = thứ hạng chung cuộc của bảng · G = bảng nữ, U = bảng chung · Số liệu đến ' + esc(s.asOf) + "</p>" +
      "</div>";

    return html + "</section>";
  }

  function galleryHtml() {
    if (!data.gallery || !data.gallery.length) return "";
    return '<section class="aw-section aw-section--gallery" aria-labelledby="aw-gallery-title">' +
      '<h2 class="aw-heading" id="aw-gallery-title">Khoảnh khắc đáng nhớ</h2>' +
      '<ul class="aw-bento">' +
      data.gallery.map(function (p) {
        return '<li class="aw-tile' + (p.size ? " aw-tile--" + esc(p.size) : "") + '"><a href="' + esc(p.src) + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.alt || "") + '" loading="lazy"></a></li>';
      }).join("") +
      "</ul></section>";
  }

  root.innerHTML = overviewHtml() + rosterHtml() + '<div class="aw-profile-slot" data-profile></div>' + galleryHtml();
  var slot = root.querySelector("[data-profile]");

  function findStudent(id) {
    for (var i = 0; i < students.length; i++) if (students[i].id === id) return students[i];
    return null;
  }

  function show(id, scroll) {
    var s = findStudent(id) || students[0];
    slot.innerHTML = profileHtml(s);
    root.querySelectorAll("[data-student]").forEach(function (a) {
      if (a.getAttribute("data-student") === s.id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    if (scroll) slot.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hashId() {
    try { return decodeURIComponent(location.hash.slice(1)); } catch (e) { return ""; }
  }

  show(hashId(), !!findStudent(hashId()));
  window.addEventListener("hashchange", function () {
    var id = hashId();
    if (findStudent(id)) show(id, true);
    // Link href="#" (vd. ở footer) không được làm đổi hồ sơ; chỉ quay về mặc định khi URL thật sự không còn "#".
    else if (!id && location.href.indexOf("#") === -1) show("", false);
  });

  root.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-more]");
    if (!btn) return;
    btn.closest(".aw-block").classList.remove("is-collapsed");
    btn.remove();
  });
})();
