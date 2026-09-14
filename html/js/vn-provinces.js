/* Thư viện địa chỉ Việt Nam (2 cấp: Tỉnh/Thành phố -> Xã/Phường/Đặc khu),
   theo cơ cấu hành chính hiện hành từ 01/07/2025 (đã bỏ cấp quận/huyện).
   Dữ liệu: js/data/vn-provinces.json + js/data/vn-wards.json (xem NOTICE.txt).
   Tự động điền vào <select data-province-select> và <select data-ward-select>
   trên trang, đồng thời liên kết 2 select với nhau (chọn tỉnh -> lọc xã/phường). */
(function () {
  var CITIES = ["Hà Nội", "Huế", "Hải Phòng", "Đà Nẵng", "Hồ Chí Minh", "Cần Thơ"];

  function stripPrefix(name) {
    return name.replace(/^Tp\.?\s+/i, "").trim();
  }

  function provinceLabel(rawName) {
    var base = stripPrefix(rawName);
    return (CITIES.indexOf(base) !== -1 ? "Thành phố " : "Tỉnh ") + base;
  }

  function fillOptions(select, items, placeholder, getValue, getLabel) {
    select.innerHTML = "";
    var ph = document.createElement("option");
    ph.value = "";
    ph.textContent = placeholder;
    select.appendChild(ph);
    items.forEach(function (item) {
      var opt = document.createElement("option");
      opt.value = getValue(item);
      opt.textContent = getLabel(item);
      select.appendChild(opt);
    });
  }

  var provinceSelects = document.querySelectorAll("[data-province-select]");
  var wardSelects = document.querySelectorAll("[data-ward-select]");
  if (!provinceSelects.length) return;

  Promise.all([
    fetch("js/data/vn-provinces.json").then(function (r) { return r.json(); }),
    fetch("js/data/vn-wards.json").then(function (r) { return r.json(); })
  ]).then(function (results) {
    var provinces = results[0];
    var wards = results[1];

    provinces.sort(function (a, b) { return stripPrefix(a.name).localeCompare(stripPrefix(b.name), "vi"); });
    var wardsByProvince = {};
    wards.forEach(function (w) {
      (wardsByProvince[w.provinceId] = wardsByProvince[w.provinceId] || []).push(w);
    });
    Object.keys(wardsByProvince).forEach(function (id) {
      wardsByProvince[id].sort(function (a, b) { return a.name.localeCompare(b.name, "vi"); });
    });

    provinceSelects.forEach(function (select) {
      fillOptions(select, provinces, "-- Chọn tỉnh/thành phố --", function (p) { return p.id; }, function (p) { return provinceLabel(p.name); });

      var wardSelect = select.form ? select.form.querySelector("[data-ward-select]") : null;
      if (!wardSelect) return;

      wardSelect.disabled = true;
      select.addEventListener("change", function () {
        var list = wardsByProvince[select.value] || [];
        if (!select.value) {
          fillOptions(wardSelect, [], "-- Chọn tỉnh/thành phố trước --", function (w) { return w.id; }, function (w) { return w.name; });
          wardSelect.disabled = true;
          return;
        }
        fillOptions(wardSelect, list, "-- Chọn xã/phường --", function (w) { return w.id; }, function (w) { return w.name; });
        wardSelect.disabled = false;
      });
    });
  }).catch(function () {
    /* Nếu không tải được dữ liệu (vd. mở file trực tiếp không qua server), giữ nguyên placeholder mặc định. */
  });
})();
