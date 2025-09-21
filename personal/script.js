var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 7,
  loop: true,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 5, spaceBetween: 50 },
  }
});

var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  loop: true,
  thumbs: { swiper: galleryThumbs }
});

// Wait for full page including iframes
window.addEventListener("load", function() {
  const loader = document.getElementById("global-loader");
  loader.classList.add("hidden");
});
