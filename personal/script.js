document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("global-loader");
  const percentage = loader.querySelector(".loader-percentage");

  const images = Array.from(document.images);
  const iframes = Array.from(document.querySelectorAll("iframe"));
  const totalMedia = images.length + iframes.length;

  let loadedMedia = 0;

  function updateProgress() {
    const progress = Math.round((loadedMedia / totalMedia) * 100);
    percentage.textContent = `${progress}%`;
    if (progress >= 100) initSwipers();
  }

  // Track images
  images.forEach(img => {
    if (img.complete) { loadedMedia++; updateProgress(); }
    else {
      img.addEventListener("load", () => { loadedMedia++; updateProgress(); });
      img.addEventListener("error", () => { loadedMedia++; updateProgress(); });
    }
  });

  // Track iframes
  iframes.forEach(frame => {
    if (frame.contentWindow?.document.readyState === "complete") {
      loadedMedia++; updateProgress();
    } else {
      frame.addEventListener("load", () => { loadedMedia++; updateProgress(); });
      frame.addEventListener("error", () => { loadedMedia++; updateProgress(); });
    }
  });

  // Initialize Swipers after all media loaded
  function initSwipers() {
    const galleryThumbs = new Swiper('.gallery-thumbs', {
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
      },
      on: {
        imagesReady: () => { finishLoading(); }, // ensures all thumbs images are ready
      }
    });

    new Swiper('.gallery-top', {
      spaceBetween: 10,
      loop: true,
      thumbs: { swiper: galleryThumbs },
      on: {
        init: () => {
          if (loadedMedia >= totalMedia) finishLoading(); // double-check
        }
      }
    });
  }

  function finishLoading() {
    loader.style.transition = "opacity 0.5s ease";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.add("loaded");
    }, 500);
  }
});
