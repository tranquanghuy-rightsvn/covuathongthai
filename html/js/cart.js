/* Giỏ hàng: lưu localStorage, badge số lượng, toast, menu thả xuống khi hover. */
(function () {
  var KEY = "ttc_cart";

  function read() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(raw) ? raw.filter(function (i) { return i && i.id && i.name; }) : [];
    } catch (e) { return []; }
  }
  function write(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }
  function money(n) {
    return n.toLocaleString("vi-VN") + " VNĐ";
  }

  var CHECK = '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M504 256a248 248 0 11-496 0 248 248 0 01496 0zM227 387l184-184c7-7 7-18 0-25l-25-25c-7-7-18-7-25 0L215 300l-68-69c-7-7-18-7-25 0l-25 25c-7 7-7 18 0 25l106 106c7 7 18 7 24 0z"/></svg>';

  function toast(msg) {
    var box = document.querySelector(".toasts");
    if (!box) {
      box = document.createElement("div");
      box.className = "toasts";
      document.body.appendChild(box);
    }
    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.innerHTML = CHECK + "<span></span>";
    el.lastChild.textContent = msg;
    box.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 350);
    }, 3000);
  }

  function render() {
    var items = read();
    var count = items.reduce(function (s, i) { return s + i.qty; }, 0);
    var total = items.reduce(function (s, i) { return s + i.qty * i.price; }, 0);

    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
    document.querySelectorAll("[data-cart-empty]").forEach(function (el) { el.hidden = count > 0; });
    document.querySelectorAll("[data-cart-foot]").forEach(function (el) { el.hidden = count === 0; });
    document.querySelectorAll("[data-cart-total]").forEach(function (el) { el.innerHTML = money(total); });

    renderPage();

    document.querySelectorAll("[data-cart-list]").forEach(function (list) {
      list.innerHTML = "";
      items.forEach(function (it) {
        var li = document.createElement("li");
        var img = it.img ? '<img src="' + it.img + '" alt="" width="56" height="56" loading="lazy">' : "";
        li.innerHTML = img +
          '<div class="cart-drop__info">' +
            '<a class="cart-drop__name" href="' + (it.url || "#") + '"></a>' +
            '<span class="cart-drop__meta">' + it.qty + " × " + money(it.price) + "</span>" +
          "</div>" +
          '<button class="cart-drop__rm" type="button" aria-label="Xóa sản phẩm">&times;</button>';
        li.querySelector(".cart-drop__name").textContent = it.name;
        li.querySelector(".cart-drop__rm").addEventListener("click", function () { remove(it.id); });
        list.appendChild(li);
      });
    });
  }

  function renderPage() {
    var body = document.querySelector("[data-cartpage-body]");
    if (!body) return;
    var items = read();
    var rows = document.querySelector("[data-cartpage-rows]");
    var count = items.reduce(function (s, i) { return s + i.qty; }, 0);
    var total = items.reduce(function (s, i) { return s + i.qty * i.price; }, 0);

    document.querySelector("[data-cartpage-empty]").hidden = items.length > 0;
    body.hidden = items.length === 0;
    rows.innerHTML = "";

    items.forEach(function (it) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td><div class="cart-row__prod">' +
          (it.img ? '<img src="' + it.img + '" alt="" width="70" height="70" loading="lazy">' : "") +
          '<a class="cart-row__name" href="' + (it.url || "#") + '"></a>' +
        "</div></td>" +
        '<td class="cart-row__price">' + money(it.price) + "</td>" +
        '<td><div class="qty">' +
          '<button type="button" data-row-step="-1" aria-label="Giảm số lượng">−</button>' +
          '<input type="number" min="1" step="1" value="' + it.qty + '" aria-label="Số lượng">' +
          '<button type="button" data-row-step="1" aria-label="Tăng số lượng">+</button>' +
        "</div></td>" +
        '<td class="cart-row__sub">' + money(it.qty * it.price) + "</td>" +
        '<td><button class="cart-row__rm" type="button" aria-label="Xóa sản phẩm">&times;</button></td>';
      tr.querySelector(".cart-row__name").textContent = it.name;
      tr.querySelector(".cart-row__rm").addEventListener("click", function () { remove(it.id); });
      tr.querySelectorAll("[data-row-step]").forEach(function (b) {
        b.addEventListener("click", function () { setQty(it.id, it.qty + parseInt(b.dataset.rowStep, 10)); });
      });
      tr.querySelector("input").addEventListener("change", function (e) {
        setQty(it.id, parseInt(e.target.value, 10));
      });
      rows.appendChild(tr);
    });

    document.querySelectorAll("[data-cartpage-sub]").forEach(function (el) { el.innerHTML = money(total); });
    document.querySelectorAll("[data-cartpage-total]").forEach(function (el) { el.innerHTML = money(total); });
    document.querySelectorAll("[data-cartpage-qty]").forEach(function (el) { el.textContent = count + " sản phẩm"; });
  }

  function setQty(id, qty) {
    var items = read();
    for (var i = 0; i < items.length; i++) if (items[i].id === id) items[i].qty = Math.max(1, qty || 1);
    write(items);
    render();
  }

  function clear() {
    write([]);
    render();
  }

  function add(p) {
    var items = read();
    var found = null;
    for (var i = 0; i < items.length; i++) if (items[i].id === p.id) found = items[i];
    if (found) found.qty += p.qty;
    else items.push(p);
    write(items);
    render();
    toast("Đã thêm “" + p.name + "” vào giỏ hàng.");
  }

  function remove(id) {
    write(read().filter(function (i) { return i.id !== id; }));
    render();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-add-to-cart]");
    if (btn) {
      e.preventDefault();
      add({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price, 10) || 0,
        img: btn.dataset.img || "",
        url: btn.dataset.url || "#",
        qty: Math.max(1, parseInt(btn.dataset.qty || document.querySelector("[data-qty-input]") && document.querySelector("[data-qty-input]").value || "1", 10))
      });
      return;
    }
    if (e.target.closest("[data-cart-clear]")) {
      e.preventDefault();
      clear();
      return;
    }
    var pay = e.target.closest("[data-cart-checkout]");
    if (pay) {
      e.preventDefault();
      var note = document.querySelector("[data-cart-note]");
      if (note) note.hidden = false;
      return;
    }
    // mobile: bấm icon để mở/đóng danh sách; desktop vẫn mở trang giỏ hàng
    var cartBtn = e.target.closest(".cart-btn");
    var widget = document.querySelector(".cart-widget");
    if (cartBtn && widget) {
      if (window.matchMedia("(hover: none), (max-width: 1024px)").matches) {
        e.preventDefault();
        widget.classList.toggle("open");
        cartBtn.setAttribute("aria-expanded", widget.classList.contains("open"));
      }
    } else if (widget && !e.target.closest(".cart-drop")) {
      widget.classList.remove("open");
      var b = widget.querySelector(".cart-btn");
      if (b) b.setAttribute("aria-expanded", "false");
    }
  });

  // số lượng trên trang chi tiết sản phẩm
  document.addEventListener("click", function (e) {
    var step = e.target.closest("[data-qty-step]");
    if (!step) return;
    var input = step.parentNode.querySelector("[data-qty-input]");
    if (!input) return;
    var v = (parseInt(input.value, 10) || 1) + parseInt(step.dataset.qtyStep, 10);
    input.value = Math.max(1, v);
  });

  window.addEventListener("storage", function (e) { if (e.key === KEY) render(); });
  render();
})();
