/* Trang Giải thưởng: dựng hồ sơ thành tích từ window.TT_AWARDS, tự tính các số tổng. */
(function () {
  var root = document.querySelector("[data-awards]");
  if (!root || !window.TT_AWARDS) return;

  var IMG = "images/giai-thuong/";
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
  function pct(part, whole) { return num((part / whole * 100).toFixed(1)); }
  function dateLong(iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  function dateShort(iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0].slice(2); }
  function boardShort(b) { return b.split(" · ")[0]; }
  function count(list, fn) { return list.filter(fn).length; }
  function isMedal(t) { return MEDALS.indexOf(t.medal) !== -1; }

  function title(text, sub) {
    return '<h3 class="aw-title">' + esc(text) + (sub ? " <small>" + esc(sub) + "</small>" : "") + "</h3>";
  }

  function card(t, imgSrc, oval, label, badge) {
    return (
      '<li class="aw-card">' +
        (badge || "") +
        '<div class="aw-card__img' + (oval ? " aw-card__img--oval" : "") + '"><img src="' + esc(imgSrc) + '" alt="' + esc(t.short || t.name) + '" loading="lazy" width="120" height="156"></div>' +
        '<div class="aw-card__meta"><span>' + dateLong(t.date) + "</span><b>" + esc(boardShort(t.board)) + "</b></div>" +
        '<p class="aw-card__name">' + esc(t.short || t.name) + "</p>" +
        '<div class="aw-card__foot"><span class="aw-card__result">' + esc(label) + (t.cup ? ICON_CUP : "") + "</span><b>" + num(t.score) + "/" + t.max + "</b></div>" +
      "</li>"
    );
  }

  function render(s, idx) {
    var t = s.tournaments;
    var events = {};
    t.forEach(function (x) { events[x.event || x.date + x.name] = true; });
    var giai = Object.keys(events).length;
    var g = s.games;
    var played = g.win + g.draw + g.loss;
    var gold = count(t, function (x) { return x.medal === "gold"; });
    var silver = count(t, function (x) { return x.medal === "silver"; });
    var bronze = count(t, function (x) { return x.medal === "bronze"; });
    var team = count(t, function (x) { return x.team; });
    var cups = t.filter(function (x) { return x.cup; });
    var medals = t.filter(isMedal);
    var withMedal = count(t, function (x) { return isMedal(x) || x.team; });
    var perfect = count(t, function (x) { return x.score === x.max; });
    var score = t.reduce(function (a, x) { return a + x.score; }, 0);
    var max = t.reduce(function (a, x) { return a + x.max; }, 0);
    var id = "aw-student-" + idx;

    var html = '<section class="aw-profile" aria-labelledby="' + id + '">';

    html += '<header class="aw-profile__head"><div><span class="aw-eyebrow">Học viên tiêu biểu</span>' +
      '<h2 class="aw-profile__name" id="' + id + '">Một năm cờ vua của <span>' + esc(s.name) + "</span></h2></div>" +
      '<span class="aw-season">' + esc(s.season) + "</span></header>";

    html += '<ul class="aw-stats">' +
      '<li class="aw-stat aw-stat--red"><strong>' + giai + "</strong><span>Giải đấu</span></li>" +
      '<li class="aw-stat aw-stat--amber"><strong>' + t.length + "</strong><span>Lượt thi đấu</span></li>" +
      '<li class="aw-stat aw-stat--green"><strong>' + played + "</strong><span>Ván thực đấu</span></li>" +
      '<li class="aw-stat aw-stat--violet"><strong>' + (medals.length + team) + "</strong><span>Huy chương</span></li>" +
      "</ul>";

    var pw = pct(g.win, played), pd = pct(g.draw, played), pl = pct(g.loss, played);
    html += '<div class="aw-block">' + title("Kết quả", played + " ván thực đấu") +
      '<div class="aw-bar" role="img" aria-label="Thắng ' + g.win + " ván (" + pw + "%), hòa " + g.draw + " ván (" + pd + "%), thua " + g.loss + " ván (" + pl + '%)">' +
        '<span class="aw-bar__win" style="width:' + (g.win / played * 100) + '%"></span>' +
        '<span class="aw-bar__draw" style="width:' + (g.draw / played * 100) + '%"></span>' +
        '<span class="aw-bar__loss" style="width:' + (g.loss / played * 100) + '%"></span>' +
      "</div>" +
      '<ul class="aw-bar-legend">' +
        '<li><i class="aw-sw aw-sw--win"></i><span>Thắng <b>' + g.win + "</b> · " + pw + "%</span></li>" +
        '<li><i class="aw-sw aw-sw--draw"></i><span>Hòa <b>' + g.draw + "</b> · " + pd + "%</span></li>" +
        '<li><i class="aw-sw aw-sw--loss"></i><span>Thua <b>' + g.loss + "</b> · " + pl + "%</span></li>" +
      "</ul></div>";

    html += '<div class="aw-block">' + title("Bộ sưu tập") + '<ul class="aw-chips">' +
      '<li class="aw-chip"><i class="aw-dot aw-dot--gold"></i><span><b>' + gold + "</b> Vàng</span></li>" +
      '<li class="aw-chip"><i class="aw-dot aw-dot--silver"></i><span><b>' + silver + "</b> Bạc</span></li>" +
      '<li class="aw-chip"><i class="aw-dot aw-dot--bronze"></i><span><b>' + bronze + "</b> Đồng</span></li>" +
      '<li class="aw-chip aw-chip--cup">' + ICON_CUP + "<span><b>" + cups.length + "</b> Cup vô địch</span></li>" +
      '<li class="aw-chip aw-chip--team">' + ICON_TEAM + "<span><b>" + team + "</b> Đồng đội</span></li>" +
      "</ul></div>";

    if (cups.length) {
      html += '<div class="aw-block">' + title("Cup vô địch", cups.length + " cup · theo thời gian") + '<ul class="aw-grid">' +
        cups.map(function (x) { return card(x, IMG + x.cupImg + ".jpg", true, x.result === "Nhất" ? "Vô địch" : x.result); }).join("") +
        "</ul></div>";
    }

    if (medals.length) {
      html += '<div class="aw-block">' + title("Hành trình huy chương", medals.length + " huy chương cá nhân · theo thời gian") + '<ul class="aw-grid">' +
        medals.map(function (x, i) {
          var badge = '<span class="aw-card__no aw-card__no--' + x.medal + '" title="' + MEDAL_NAME[x.medal] + '">' + (i + 1) + "</span>";
          return card(x, IMG + x.img + ".jpg", false, x.result, badge);
        }).join("") +
        "</ul></div>";
    }

    html += '<div class="aw-block">' + title("Toàn bộ chặng đường", t.length + " lượt thi đấu") +
      '<div class="aw-table-wrap"><table class="aw-table"><caption class="sr-only">Toàn bộ các lượt thi đấu của ' + esc(s.name) + "</caption>" +
      '<thead><tr><th scope="col">Ngày</th><th scope="col">Giải đấu</th><th scope="col">Bảng</th><th scope="col">Đạt giải</th><th scope="col">Điểm</th><th scope="col"><span class="sr-only">Cup / đồng đội</span></th></tr></thead><tbody>' +
      t.map(function (x) {
        var placed = x.medal !== "none";
        var extra = (x.cup ? '<span title="Cup vô địch">' + ICON_CUP + '<span class="sr-only">Cup vô địch</span></span>' : "") +
          (x.team ? '<span title="Huy chương đồng đội">' + ICON_TEAM + '<span class="sr-only">Huy chương đồng đội</span></span>' : "");
        return "<tr>" +
          '<td class="aw-table__date"><i class="aw-dot aw-dot--' + x.medal + '" title="' + MEDAL_NAME[x.medal] + '"></i><span class="sr-only">' + MEDAL_NAME[x.medal] + ", </span>" + dateShort(x.date) + "</td>" +
          '<td class="aw-table__name">' + esc(x.name) + "</td>" +
          '<td class="aw-table__board">' + esc(x.board) + "</td>" +
          '<td class="aw-table__result' + (placed ? "" : " is-muted") + '">' + esc(x.result) + "</td>" +
          '<td class="aw-table__score">' + num(x.score) + "/" + x.max + "</td>" +
          '<td class="aw-table__extra">' + extra + "</td>" +
          "</tr>";
      }).join("") +
      "</tbody></table></div>" +
      '<ul class="aw-legend">' +
        '<li><i class="aw-dot aw-dot--gold"></i>HCV</li><li><i class="aw-dot aw-dot--silver"></i>HCB</li><li><i class="aw-dot aw-dot--bronze"></i>HCĐ</li>' +
        '<li><i class="aw-dot aw-dot--award"></i>Đạt giải — không có huy chương</li><li><i class="aw-dot aw-dot--none"></i>Không huy chương</li>' +
        "<li>" + ICON_CUP + "Cup vô địch</li><li>" + ICON_TEAM + "Huy chương đồng đội</li>" +
      "</ul>" +
      '<div class="aw-summary">' +
        "<span><b>" + withMedal + "/" + t.length + "</b> giải đạt huy chương</span>" +
        "<span><b>" + perfect + "</b> giải đạt điểm tối đa</span>" +
        "<span><b>" + num(score) + "/" + max + "</b> điểm · " + pct(score, max) + "%</span>" +
      "</div>" +
      '<p class="aw-note">“hạng N” = thứ hạng chung cuộc của bảng · G = bảng nữ, U = bảng chung · Số liệu đến ' + esc(s.asOf) + "</p>" +
      "</div>";

    if (s.moments) {
      html += '<div class="aw-block">' + title("Khoảnh khắc đáng nhớ") +
        '<a class="aw-moments" href="' + esc(s.moments.src) + '" target="_blank" rel="noopener"><img src="' + esc(s.moments.src) + '" alt="Khoảnh khắc đáng nhớ của ' + esc(s.name) + '" loading="lazy" width="640" height="960"><span class="aw-moments__hint">Bấm để xem ảnh lớn</span></a>' +
        '<p class="aw-note">' + esc(s.moments.caption) + " " + esc(s.moments.credit) + "</p>" +
        "</div>";
    }

    return html + "</section>";
  }

  root.innerHTML = window.TT_AWARDS.map(render).join("");
})();
