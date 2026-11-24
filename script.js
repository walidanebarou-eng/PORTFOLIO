/* Walid Anebarou — E-Portfolio : menu mobile, retour en haut, agrandissement d'images. */
(function () {
  "use strict";
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    if (!btn || !menu) return;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    menu.classList.toggle("open", open);
  }
  if (btn && menu) {
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setMenu(false); btn.focus(); }
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) setMenu(false); });
  }

  var top = document.querySelector(".to-top");
  if (top) {
    var toggle = function () { top.hidden = window.scrollY < 500; };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    top.addEventListener("click", function () { window.scrollTo({ top: 0 }); document.getElementById("contenu").focus({ preventScroll: true }); });
  }

  /* Agrandissement des images : sans JavaScript, le lien ouvre l'image seule. */
  var links = document.querySelectorAll("[data-lightbox]");
  if (links.length && typeof HTMLDialogElement === "function") {
    var dlg = null, img = null;
    var build = function () {
      dlg = document.createElement("dialog");
      dlg.className = "lb";
      dlg.setAttribute("aria-label", "Image agrandie");
      dlg.innerHTML = '<img alt=""><button type="button" aria-label="Fermer l’image">&times;</button>';
      document.body.appendChild(dlg);
      img = dlg.querySelector("img");
      dlg.querySelector("button").addEventListener("click", function () { dlg.close(); });
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    };
    links.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        if (!dlg) build();
        img.src = a.getAttribute("href");
        img.alt = a.getAttribute("data-lightbox");
        dlg.showModal();
      });
    });
  }
})();
