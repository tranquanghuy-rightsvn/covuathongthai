/* Trang thanh toán: chọn phương thức (chuyển khoản / tiền mặt), gửi đơn hàng local. */
(function () {
  var body = document.querySelector("[data-checkout-body]");
  if (!body || !window.TTCCart) return;

  // TODO: cập nhật thông tin ngân hàng thật trước khi vận hành chính thức. QR hiện là ảnh minh hoạ (demo), chưa liên kết tài khoản thật.
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

  var empty = document.querySelector("[data-checkout-empty]");
  var thanks = document.querySelector("[data-checkout-thanks]");
  var form = document.querySelector("[data-checkout-form]");

  function genOrderCode() {
    return "DH" + Date.now().toString(36).toUpperCase();
  }

  var bankNameEl = document.querySelector("[data-bank-name]");
  var bankAccountEl = document.querySelector("[data-bank-account]");
  var bankHolderEl = document.querySelector("[data-bank-holder]");
  if (bankNameEl) bankNameEl.textContent = CONFIG.bank.name;
  if (bankAccountEl) bankAccountEl.textContent = CONFIG.bank.account;
  if (bankHolderEl) bankHolderEl.textContent = CONFIG.bank.holder;

  var items = TTCCart.read();
  if (items.length === 0) {
    empty.hidden = false;
    return;
  }
  body.hidden = false;

  var total = items.reduce(function (s, i) { return s + i.qty * i.price; }, 0);
  var list = document.querySelector("[data-checkout-items]");
  items.forEach(function (it) {
    var li = document.createElement("li");
    li.innerHTML = '<span class="n"></span><span class="q"></span><span class="p"></span>';
    li.querySelector(".n").textContent = it.name;
    li.querySelector(".q").textContent = "x" + it.qty;
    li.querySelector(".p").textContent = TTCCart.money(it.qty * it.price);
    list.appendChild(li);
  });
  document.querySelector("[data-checkout-total]").innerHTML = TTCCart.money(total);

  form.addEventListener("change", function (e) {
    if (e.target.name !== "method") return;
    document.querySelectorAll("[data-checkout-method]").forEach(function (box) {
      box.classList.toggle("is-open", box.dataset.checkoutMethod === e.target.value);
    });
  });

  function callBtnsHtml() {
    return (
      '<div class="checkout-actions">' +
        '<a class="checkout-btn checkout-btn--call" href="' + CONFIG.hotlineTel + '">Gọi ' + CONFIG.hotline + "</a>" +
        '<a class="checkout-btn checkout-btn--zalo" href="' + CONFIG.zaloUrl + '" target="_blank" rel="noopener">Nhắn Zalo</a>' +
      "</div>"
    );
  }

  function thanksBodyHtml(method, code) {
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
    return (
      "<p>Bạn sẽ thanh toán tiền mặt khi nhận hàng hoặc tại Trung tâm. Vui lòng gọi hotline hoặc nhắn Zalo để xác nhận đơn hàng.</p>" +
      callBtnsHtml()
    );
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var method = form.method.value;
    var code = genOrderCode();

    document.querySelector("[data-checkout-code]").textContent = code;
    document.querySelector("[data-checkout-thanks-body]").innerHTML = thanksBodyHtml(method, code);

    body.hidden = true;
    thanks.hidden = false;
    TTCCart.clear();
  });
})();
