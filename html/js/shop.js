/* Cửa hàng: sắp xếp sản phẩm, tab mô tả/đánh giá. */
(function () {
  var grid = document.querySelector("[data-product-grid]");
  var sort = document.querySelector("[data-shop-sort]");
  if (grid && sort) {
    var original = Array.prototype.slice.call(grid.children);
    function priceOf(li) {
      var ins = li.querySelector(".price ins") || li.querySelector(".price");
      return parseInt(ins.textContent.replace(/[^\d]/g, ""), 10) || 0;
    }
    sort.addEventListener("change", function () {
      var items = original.slice();
      if (sort.value === "name") {
        items.sort(function (a, b) {
          return a.querySelector(".pcard__title").textContent
            .localeCompare(b.querySelector(".pcard__title").textContent, "vi");
        });
      } else if (sort.value === "price") {
        items.sort(function (a, b) { return priceOf(a) - priceOf(b); });
      } else if (sort.value === "price-desc") {
        items.sort(function (a, b) { return priceOf(b) - priceOf(a); });
      }
      items.forEach(function (li) { grid.appendChild(li); });
    });
  }

  document.querySelectorAll(".product-tabs").forEach(function (box) {
    box.querySelectorAll("[data-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        box.querySelectorAll("[data-tab]").forEach(function (b) {
          b.setAttribute("aria-selected", b === btn);
        });
        box.querySelectorAll("[data-panel]").forEach(function (p) {
          p.hidden = p.dataset.panel !== btn.dataset.tab;
        });
      });
    });
  });
})();
