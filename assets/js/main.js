// ADEPTIX — shared site behaviour. No dependencies, no tracking beyond what index.html declares.
(function () {
  "use strict";

  // Sticky header shadow on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // "Xizmatlar" dropdown — hover on desktop (CSS), tap-to-open here for touch/mobile
  document.querySelectorAll(".nav-item").forEach(function (item) {
    var drop = item.querySelector(".nav-drop-toggle");
    if (!drop) return;
    drop.addEventListener("click", function (e) {
      e.preventDefault();
      var isOpen = item.classList.toggle("is-open");
      drop.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.querySelectorAll(".nav-item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var otherToggle = other.querySelector(".nav-drop-toggle");
          if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-item")) {
      document.querySelectorAll(".nav-item.is-open").forEach(function (item) {
        item.classList.remove("is-open");
        var t = item.querySelector(".nav-drop-toggle");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Close only one FAQ item open at a time (optional, keeps the list tidy)
  document.querySelectorAll(".faq-list").forEach(function (list) {
    var items = list.querySelectorAll("details.faq-item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  });
})();
