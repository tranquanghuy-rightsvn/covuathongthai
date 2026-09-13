/* Carousel dùng chung: loop, autoplay, arrows, dots, swipe.
   Số slide/khung (--pv) và khoảng cách (--gap) khai báo trong CSS theo breakpoint. */
(function () {
  function Carousel(root) {
    this.root = root;
    this.viewport = root.querySelector(".carousel__viewport");
    this.track = root.querySelector(".carousel__track");
    this.slides = Array.prototype.slice.call(this.track.children);
    this.n = this.slides.length;
    this.index = 0;
    this.delay = parseInt(root.dataset.autoplay || "0", 10);
    this.dotMode = root.dataset.dots || "slides";
    this.dotsEl = root.querySelector(".carousel__dots");

    // clone đầu danh sách để lướt vòng liền mạch
    var frag = document.createDocumentFragment();
    for (var i = 0; i < Math.min(this.n, 10); i++) {
      var c = this.slides[i].cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      c.querySelectorAll("a").forEach(function (a) { a.tabIndex = -1; });
      frag.appendChild(c);
    }
    this.track.appendChild(frag);

    var self = this;
    var prev = root.querySelector(".carousel__btn--prev");
    var next = root.querySelector(".carousel__btn--next");
    if (prev) prev.addEventListener("click", function () { self.go(self.index - 1); self.restart(); });
    if (next) next.addEventListener("click", function () { self.go(self.index + 1); self.restart(); });
    this.track.addEventListener("transitionend", function () { self.normalize(); });
    window.addEventListener("resize", function () { self.buildDots(); self.render(false); });
    root.addEventListener("mouseenter", function () { self.stop(); });
    root.addEventListener("mouseleave", function () { self.start(); });
    this.bindSwipe();
    this.buildDots();
    this.render(false);
    this.start();
  }

  Carousel.prototype.pv = function () {
    return parseFloat(getComputedStyle(this.root).getPropertyValue("--pv")) || 1;
  };
  Carousel.prototype.go = function (i) {
    if (this.n <= this.pv()) i = 0;
    if (i < 0) { this.index = this.n; this.render(false); this.track.offsetWidth; i = this.n - 1; }
    this.index = i;
    this.render(true);
  };
  Carousel.prototype.normalize = function () {
    if (this.index >= this.n) { this.index -= this.n; this.render(false); }
  };
  Carousel.prototype.render = function (animate) {
    this.track.style.transition = animate ? "" : "none";
    this.track.style.transform =
      "translateX(calc(" + (-this.index) + " * (100% + var(--gap)) / var(--pv)))";
    this.updateDots();
  };
  Carousel.prototype.buildDots = function () {
    if (!this.dotsEl) return;
    var count = this.dotMode === "pages" ? Math.ceil(this.n / this.pv()) : this.n;
    if (this.n <= this.pv()) count = 0;
    if (this.dotsEl.children.length === count) return;
    this.dotsEl.innerHTML = "";
    var self = this;
    for (var i = 0; i < count; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Slide " + (i + 1));
      (function (k) {
        b.addEventListener("click", function () {
          self.go(self.dotMode === "pages" ? k * Math.floor(self.pv()) : k);
          self.restart();
        });
      })(i);
      this.dotsEl.appendChild(b);
    }
  };
  Carousel.prototype.updateDots = function () {
    if (!this.dotsEl) return;
    var cur = this.index % this.n;
    if (this.dotMode === "pages") cur = Math.floor(cur / Math.floor(this.pv()));
    Array.prototype.forEach.call(this.dotsEl.children, function (d, i) {
      d.classList.toggle("active", i === cur);
    });
  };
  Carousel.prototype.start = function () {
    var self = this;
    if (!this.delay || this.timer || this.n <= this.pv()) return;
    this.timer = setInterval(function () { self.go(self.index + 1); }, this.delay);
  };
  Carousel.prototype.stop = function () { clearInterval(this.timer); this.timer = null; };
  Carousel.prototype.restart = function () { this.stop(); this.start(); };
  Carousel.prototype.bindSwipe = function () {
    var self = this, x0 = null;
    this.viewport.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    window.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { self.go(self.index + (dx < 0 ? 1 : -1)); self.restart(); }
    });
    this.viewport.addEventListener("dragstart", function (e) { e.preventDefault(); });
  };

  document.querySelectorAll(".carousel").forEach(function (el) { new Carousel(el); });
})();
