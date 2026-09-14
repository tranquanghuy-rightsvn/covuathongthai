/* Biểu mẫu: hiện lời cảm ơn sau khi gửi. */
document.querySelectorAll("[data-form]").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var note = form.querySelector("[data-form-note]");
    if (note) note.hidden = false;
  });
});
