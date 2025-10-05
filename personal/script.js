document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("global-loader");
  const percentage = loader.querySelector(".loader-percentage");

  // Grab all images and iframes
  const images = Array.from(document.images);
  const iframes = Array.from(document.querySelectorAll("iframe"));
  const total = images.length + iframes.length;

  if (total === 0) {
    finishLoading();
    return;
  }

  let loaded = 0;

  function updateProgress() {
    const progress = Math.round((loaded / total) * 100);
    percentage.textContent = `${progress}%`;
    if (progress >= 100) finishLoading();
  }

  function finishLoading() {
    percentage.textContent = "100%";
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.add("loaded"); // reveal gallery

      // Initialize Swipers only after loader is hidden
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 10,
        loop: true,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.thumbs-next',
          prevEl: '.thumbs-prev',
        },
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
    }, 500);
  }

  // Track images
  images.forEach(img => {
    if (img.complete) {
      loaded++;
      updateProgress();
    } else {
      img.addEventListener("load", () => { loaded++; updateProgress(); });
      img.addEventListener("error", () => { loaded++; updateProgress(); });
    }
  });

  // Track iframes
  iframes.forEach(frame => {
    frame.addEventListener("load", () => { loaded++; updateProgress(); });
    frame.addEventListener("error", () => { loaded++; updateProgress(); });
    if (frame.complete) {
      loaded++;
      updateProgress();
    }
  });
});
