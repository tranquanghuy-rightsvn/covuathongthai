/* Modal đặt hàng: chọn phương thức thanh toán (chuyển khoản / tiền mặt / liên hệ điện thoại). */
(function () {
  var modal = document.querySelector("[data-checkout-modal]");
  if (!modal || !window.TTCCart) return;

  // TODO: cập nhật thông tin ngân hàng thật trước khi vận hành chính thức.
  var CONFIG = {
    hotline: "0365.998.894",
    hotlineTel: "tel:0365998894",
    zaloUrl: "https://zalo.me/3519488029034299650",
    bank: {
      name: "(Chưa cập nhật)",
      account: "(Chưa cập nhật)",
      holder: "(Chưa cập nhật)"
    }
  };

  var form = modal.querySelector("[data-checkout-form]");
  var stepForm = modal.querySelector('[data-checkout-step="form"]');
  var stepResult = modal.querySelector('[data-checkout-step="result"]');

  function genOrderCode() {
    return "DH" + Date.now().toString(36).toUpperCase();
  }

  function fillSummary() {
    var items = TTCCart.read();
    var total = items.reduce(function (s, i) { return s + i.qty * i.price; }, 0);
    var list = modal.querySelector("[data-checkout-items]");
    list.innerHTML = "";
    items.forEach(function (it) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="n"></span><span class="q"></span><span class="p"></span>';
      li.querySelector(".n").textContent = it.name;
      li.querySelector(".q").textContent = "x" + it.qty;
      li.querySelector(".p").textContent = TTCCart.money(it.qty * it.price);
      list.appendChild(li);
    });
    modal.querySelector("[data-checkout-total]").innerHTML = TTCCart.money(total);
  }

  function open() {
    fillSummary();
    form.reset();
    stepForm.hidden = false;
    stepResult.hidden = true;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  function callBtnsHtml() {
    return (
      '<div class="checkout-actions">' +
        '<a class="checkout-btn checkout-btn--call" href="' + CONFIG.hotlineTel + '">Gọi ' + CONFIG.hotline + "</a>" +
        '<a class="checkout-btn checkout-btn--zalo" href="' + CONFIG.zaloUrl + '" target="_blank" rel="noopener">Nhắn Zalo</a>' +
      "</div>"
    );
  }

  function resultHtml(method, code, total) {
    if (method === "bank") {
      return (
        "<p>Vui lòng chuyển khoản theo thông tin bên dưới, sau đó gọi hotline hoặc nhắn Zalo để Trung tâm xác nhận đơn hàng.</p>" +
        '<dl class="checkout-bank">' +
          "<div><dt>Ngân hàng</dt><dd>" + CONFIG.bank.name + "</dd></div>" +
          "<div><dt>Số tài khoản</dt><dd>" + CONFIG.bank.account + "</dd></div>" +
          "<div><dt>Chủ tài khoản</dt><dd>" + CONFIG.bank.holder + "</dd></div>" +
          "<div><dt>Số tiền</dt><dd>" + TTCCart.money(total) + "</dd></div>" +
          "<div><dt>Nội dung CK</dt><dd>" + code + "</dd></div>" +
        "</dl>" + callBtnsHtml()
      );
    }
    if (method === "cash") {
      return (
        "<p>Bạn sẽ thanh toán tiền mặt khi nhận hàng hoặc tại Trung tâm. Vui lòng gọi hotline hoặc nhắn Zalo để xác nhận đơn hàng.</p>" +
        callBtnsHtml()
      );
    }
    return (
      "<p>Vui lòng gọi hotline hoặc nhắn Zalo ngay để tư vấn viên xác nhận đơn hàng cho bạn.</p>" +
      callBtnsHtml()
    );
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-cart-checkout]")) {
      e.preventDefault();
      open();
      return;
    }
    if (e.target.closest("[data-checkout-close]") && !modal.hidden) {
      close();
      return;
    }
    if (e.target.closest("[data-checkout-done]")) {
      TTCCart.clear();
      close();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var items = TTCCart.read();
    var total = items.reduce(function (s, i) { return s + i.qty * i.price; }, 0);
    var method = form.method.value;
    var code = genOrderCode();

    modal.querySelector("[data-checkout-code]").textContent = code;
    modal.querySelector("[data-checkout-result-body]").innerHTML = resultHtml(method, code, total);

    stepForm.hidden = true;
    stepResult.hidden = false;
  });
})();
