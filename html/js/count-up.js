/* Hiệu ứng đếm số tăng dần cho các khối thống kê khi cuộn tới. */
(function () {
  var targets = document.querySelectorAll(
    ".stat-card h3, .org-card__percent, .achieve-grid .num"
  );
  if (!targets.length) return;

  function animate(el) {
    var raw = el.textContent.trim();
    var match = raw.match(/\d[\d.,]*/);
    if (!match) return;

    var target = parseInt(match[0].replace(/[.,]/g, ""), 10);
    if (isNaN(target)) return;

    var prefix = raw.slice(0, match.index);
    var suffix = raw.slice(match.index + match[0].length);
    var duration = 1200;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach(animate);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();
