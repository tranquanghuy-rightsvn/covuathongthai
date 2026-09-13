/* Header sticky, mobile menu, back-to-top */
(function () {
  var header = document.querySelector(".site-header");
  var backTop = document.querySelector(".back-top");
  var ring = backTop && backTop.querySelector("circle");
  var LEN = 2 * Math.PI * 48;
  if (ring) { ring.style.strokeDasharray = LEN; ring.style.strokeDashoffset = LEN; }

  var ticking = false;
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-sticky", y > 120);
    // cuộn xuống: ẩn header, cuộn lên: hiện lại
    header.classList.toggle("is-hidden", y > 300 && y > lastY && !document.querySelector(".mnav.open"));
    lastY = y;
    if (backTop) {
      backTop.classList.toggle("show", y > 400);
      if (ring) ring.style.strokeDashoffset = LEN - (max > 0 ? y / max : 0) * LEN;
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (backTop) backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  var mnav = document.querySelector(".mnav");
  var toggle = document.querySelector(".nav-toggle");
  function setMenu(open) {
    mnav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () { setMenu(true); });
  mnav.addEventListener("click", function (e) {
    if (e.target.closest(".mnav__overlay, .mnav__close")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
})();
