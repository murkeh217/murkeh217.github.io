document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("global-loader");
  const percentage = loader?.querySelector(".loader-percentage");

  const images = Array.from(document.images);
  const iframes = Array.from(document.querySelectorAll("iframe"));
  const totalMedia = images.length + iframes.length;

  let loadedMedia = 0;
  let swipersInitialized = false;
  let finished = false;

  // Hide galleries until shuffle completes
  const galleryTop = document.querySelector(".gallery-top");
  const galleryThumbs = document.querySelector(".gallery-thumbs");
  if (galleryTop) galleryTop.style.visibility = "hidden";
  if (galleryThumbs) galleryThumbs.style.visibility = "hidden";

  // 🔀 Defer shuffle slightly so loader renders first
  requestAnimationFrame(() => {
    shuffleSlidesTogether();
  });

  // Update progress visually
  function updateProgress() {
    const progress = totalMedia === 0
      ? 100
      : Math.min(Math.round((loadedMedia / totalMedia) * 100), 100);

    if (percentage) percentage.textContent = `${progress}%`;

    if (loadedMedia >= totalMedia && !swipersInitialized) {
      swipersInitialized = true;
      initSwipers();
    }
  }

  // Track all images
  images.forEach(img => {
    if (img.complete && img.naturalHeight !== 0) {
      loadedMedia++;
      updateProgress();
    } else {
      img.addEventListener("load", () => { loadedMedia++; updateProgress(); });
      img.addEventListener("error", () => { loadedMedia++; updateProgress(); });
    }
  });

  // Track all iframes
  iframes.forEach(frame => {
    const handleFrameLoaded = () => { loadedMedia++; updateProgress(); };
    if (frame.contentDocument?.readyState === "complete") handleFrameLoaded();
    else {
      frame.addEventListener("load", handleFrameLoaded, { once: true });
      frame.addEventListener("error", handleFrameLoaded, { once: true });
    }
  });

  // 🔀 Shuffle both thumb + main slides in the SAME order
  function shuffleSlidesTogether() {
    const thumbWrapper = document.querySelector(".gallery-thumbs .swiper-wrapper");
    const mainWrapper = document.querySelector(".gallery-top .swiper-wrapper");
    if (!thumbWrapper || !mainWrapper) return;

    const thumbSlides = Array.from(thumbWrapper.children);
    const mainSlides = Array.from(mainWrapper.children);
    if (thumbSlides.length !== mainSlides.length) {
      console.warn("Slide count mismatch between thumbs and main gallery!");
      return;
    }

    const paired = thumbSlides.map((slide, i) => ({
      thumb: slide,
      main: mainSlides[i]
    }));

    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }

    paired.forEach(p => {
      thumbWrapper.appendChild(p.thumb);
      mainWrapper.appendChild(p.main);
    });
  }

  // 🚀 Initialize Swipers
  function initSwipers() {
    const galleryThumbsSwiper = new Swiper(".gallery-thumbs", {
      spaceBetween: 10,
      slidesPerView: 8,
      centeredSlides: true,
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      speed: 800,

      // 🚫 No loop duplication
      loop: false,

      // 🧲 Smooth snap scrolling (sticky)
      freeMode: {
        enabled: true,
        sticky: true,
        momentum: true,
      },

      // 🌀 Infinite feel — autoplay slowly scrolls through slides
      autoplay: {
        delay: 0, // continuous
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      // Smooth continuous movement
      speed: 6000,

      breakpoints: {
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 5, spaceBetween: 15 },
        1024: { slidesPerView: 7, spaceBetween: 20 },
      },
    });

    const galleryTopSwiper = new Swiper(".gallery-top", {
      spaceBetween: 10,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 600,
      loop: false, // prevent jumps
      thumbs: { swiper: galleryThumbsSwiper },
    });

    // Reveal after init
    galleryTop.style.visibility = "visible";
    galleryThumbs.style.visibility = "visible";

    // Keep thumbs synced with top
    galleryTopSwiper.on("slideChange", () => {
      const realIndex = galleryTopSwiper.activeIndex;
      galleryThumbsSwiper.slideTo(realIndex, 500, true);
    });

    galleryThumbsSwiper.on("click", (swiper) => {
      const clickedIndex = swiper.clickedIndex;
      if (typeof clickedIndex !== "undefined") {
        galleryTopSwiper.slideTo(clickedIndex, 500, true);
      }
    });
  }

  // ✨ Hide loader once everything is ready
  function finishLoading() {
    if (finished) return;
    finished = true;

    loader.style.transition = "opacity 0.6s ease";
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.add("loaded");
    }, 600);
  }

  // ⏱️ Timeout fallback
  setTimeout(() => {
    if (!finished) {
      console.warn("Timeout reached, forcing finish...");
      finishLoading();
      if (galleryTop) galleryTop.style.visibility = "visible";
      if (galleryThumbs) galleryThumbs.style.visibility = "visible";
    }
  }, 15000);
});
