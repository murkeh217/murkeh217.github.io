// ================================
// Page + Iframe Loader with Fades
// ================================

// 1️⃣ Fade out the GLOBAL page loader after the full page is ready
window.addEventListener("load", () => {
  const pageLoader = document.getElementById("page-loader");
  if (!pageLoader) return;

  // add fade-out class to trigger CSS transition
  pageLoader.classList.add("fade-out");

  // remove from layout after transition completes (match CSS duration)
  setTimeout(() => {
    pageLoader.style.display = "none";
  }, 600); // 600ms = CSS transition time
});

// 2️⃣ Fade out each IFRAME loader when the iframe finishes loading
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".iframe-container").forEach(container => {
    const iframe = container.querySelector("iframe");
    const loader = container.querySelector(".iframe-loader");

    if (iframe && loader) {
      iframe.addEventListener("load", () => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
        }, 500); // 500ms = CSS transition time
      });
    }
  });
});
