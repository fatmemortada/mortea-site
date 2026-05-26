// Mortéa Phase 19 — Mobile UX Enhancements

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar, nav");
  const menuButton = document.querySelector("[data-mobile-menu]");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("mobile-open");
    });
  }

  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
