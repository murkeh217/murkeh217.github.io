document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("global-loader");
  const percentage = loader?.querySelector(".loader-percentage");

  const images = Array.from(document.images);
  const iframes = Array.from(document.querySelectorAll("iframe"));
  const totalMedia = images.length + iframes.length;

  let loadedMedia = 0;
  let swipersInitialized = false;
  let finished = false;

  const galleryTop = document.querySelector(".gallery-top");
  const galleryThumbs = document.querySelector(".gallery-thumbs");

  if (galleryTop) galleryTop.style.visibility = "hidden";
  if (galleryThumbs) galleryThumbs.style.visibility = "hidden";

  // 🔀 Shuffle slides slightly after page starts rendering
  requestAnimationFrame(() => shuffleSlidesTogether());

  // Track loaded media
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

  images.forEach(img => {
    if (img.complete && img.naturalHeight !== 0) loadedMedia++;
    else {
      img.addEventListener("load", () => { loadedMedia++; updateProgress(); });
      img.addEventListener("error", () => { loadedMedia++; updateProgress(); });
    }
    updateProgress();
  });

  iframes.forEach(frame => {
    const handle = () => { loadedMedia++; updateProgress(); };
    if (frame.contentDocument?.readyState === "complete") handle();
    else {
      frame.addEventListener("load", handle, { once: true });
      frame.addEventListener("error", handle, { once: true });
    }
  });

  // 🔀 Shuffle thumbs and top slides together
  function shuffleSlidesTogether() {
    const thumbWrapper = document.querySelector(".gallery-thumbs .swiper-wrapper");
    const mainWrapper = document.querySelector(".gallery-top .swiper-wrapper");
    if (!thumbWrapper || !mainWrapper) return;

    const thumbSlides = Array.from(thumbWrapper.children);
    const mainSlides = Array.from(mainWrapper.children);
    if (thumbSlides.length !== mainSlides.length) return;

    const paired = thumbSlides.map((slide, i) => ({ thumb: slide, main: mainSlides[i] }));

    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }

    paired.forEach(p => {
      thumbWrapper.appendChild(p.thumb);
      mainWrapper.appendChild(p.main);
    });
  }

  function initSwipers() {
    // 👍 Thumbs: looped, centered, clicked slide goes to top gallery
    const galleryThumbsSwiper = new Swiper(".gallery-thumbs", {
      spaceBetween: 10,
      slidesPerView: 10,
      loop: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      speed: 600,
      breakpoints: {
        640: { slidesPerView: 3, spaceBetween: 10 },
        768: { slidesPerView: 5, spaceBetween: 15 },
        1024: { slidesPerView: 7, spaceBetween: 20 },
      },
    });

    // Top gallery: fade effect synced with thumbs
    const galleryTopSwiper = new Swiper(".gallery-top", {
      spaceBetween: 10,
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: false, // optional
      thumbs: { swiper: galleryThumbsSwiper },
    });

    // Reveal galleries
    galleryTop.style.visibility = "visible";
    galleryThumbs.style.visibility = "visible";

    // 🔹 Center first active thumb on load
    setTimeout(() => {
      const activeIndex = galleryTopSwiper.activeIndex;
      galleryThumbsSwiper.slideToLoop(activeIndex, 0, false); // loop-safe centering
      galleryThumbsSwiper.slides.forEach(slide => slide.classList.remove('swiper-slide-thumb-active'));
      galleryThumbsSwiper.slides[galleryThumbsSwiper.realIndex].classList.add('swiper-slide-thumb-active');
    }, 50);

    // Sync top slide with thumb click
    galleryTopSwiper.on("slideChange", () => {
      const activeIndex = galleryTopSwiper.activeIndex;
      galleryThumbsSwiper.slideToLoop(activeIndex, 500, true);
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

  // ⏱️ Fallback
  setTimeout(() => {
    if (!finished) {
      finishLoading();
      if (galleryTop) galleryTop.style.visibility = "visible";
      if (galleryThumbs) galleryThumbs.style.visibility = "visible";
    }
  }, 15000);
});
