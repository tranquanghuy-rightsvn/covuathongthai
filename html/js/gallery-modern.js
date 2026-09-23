/* Kho tư liệu hình ảnh: lọc theo danh mục + xem ảnh phóng to */
(function () {
  var tabs = document.querySelectorAll(".gm__tab");
  var cards = document.querySelectorAll(".gm__card");
  if (!cards.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");

      var filter = tab.getAttribute("data-filter");
      cards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  var lightbox = document.querySelector("[data-gm-lightbox]");
  if (!lightbox) return;
  var imgEl = lightbox.querySelector("[data-gm-image]");
  var captionEl = lightbox.querySelector("[data-gm-caption]");
  var current = 0;

  function visibleCards() {
    return Array.prototype.filter.call(cards, function (card) {
      return !card.classList.contains("is-hidden");
    });
  }

  function show(index) {
    var list = visibleCards();
    if (!list.length) return;
    current = (index + list.length) % list.length;
    var card = list[current];
    var img = card.querySelector("img");
    var caption = card.querySelector("figcaption");
    imgEl.src = img.src;
    imgEl.alt = img.alt || "";
    captionEl.textContent = caption ? caption.textContent : "";
  }

  function open(card) {
    var list = visibleCards();
    var index = list.indexOf(card);
    show(index === -1 ? 0 : index);
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add("is-open"); });
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { lightbox.hidden = true; }, 250);
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () { open(card); });
  });

  lightbox.querySelector("[data-gm-close]").addEventListener("click", close);
  lightbox.querySelector("[data-gm-prev]").addEventListener("click", function () { show(current - 1); });
  lightbox.querySelector("[data-gm-next]").addEventListener("click", function () { show(current + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();
