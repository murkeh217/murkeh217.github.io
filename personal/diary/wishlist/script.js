document.addEventListener('DOMContentLoaded', () => {
  // Wait for layout to finish so offsetHeight is accurate
  requestAnimationFrame(() => {
    initCarousels();
  });
});

function initCarousels() {

  // --- Detect if parent iframe/page is scrollable ---
  function iframeIsScrollable() {
    try {
      const html = document.documentElement;

      const cssScrollable =
        getComputedStyle(html).overflowY !== 'hidden' &&
        getComputedStyle(html).overflow !== 'hidden';

      const contentScrollable =
        html.scrollHeight > html.clientHeight;

      return cssScrollable && contentScrollable;
    } catch {
      return true;
    }
  }

  const parentScrollable = iframeIsScrollable();

  // --- Setup all carousels ---
  document.querySelectorAll('.carousel').forEach(carousel => {

    if (!carousel.hasAttribute('tabindex')) {
      carousel.setAttribute('tabindex', '0');
    }

    carousel.style.overscrollBehavior = 'contain';
    carousel.style.overflowY = 'auto';

    const originalItems = Array.from(carousel.children);
    const totalItems = originalItems.length;

    // Clone twice for infinite loop
    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));
    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));

    const firstItem = carousel.querySelector(':scope > *');

    // Safe item height
    const rawHeight = firstItem ? firstItem.offsetHeight : 0;
    const itemHeight = (rawHeight > 5 ? rawHeight : 60) + 24;

    // Start at top
    carousel.scrollTop = 0;

    // ---- WHEEL SCROLL HANDLER ----
    carousel.addEventListener(
      'wheel',
      e => {
        const rect = carousel.getBoundingClientRect();
        const isHover = e.clientY >= rect.top && e.clientY <= rect.bottom;

        // If iframe cannot scroll → don't trap the wheel
        if (!parentScrollable) return;

        if (isHover) {
          e.preventDefault();
          e.stopPropagation();

          const direction = e.deltaY > 0 ? 1 : -1;

          carousel.scrollBy({
            top: direction * itemHeight,
            behavior: 'smooth'
          });
        }
      },
      { passive: false, capture: true }
    );

  carousel.addEventListener('scroll', () => {
    const loopHeight = itemHeight * totalItems;

    // User scrolled below 2nd block → wrap to middle block smoothly
    if (carousel.scrollTop >= loopHeight * 2) {
      carousel.scrollTop -= loopHeight;
    }

    // User scrolled above 1st block → wrap to middle block smoothly
    else if (carousel.scrollTop <= 0) {
      carousel.scrollTop += loopHeight;
    }
  });


  // ---- SCROLL BUTTONS ----
  document.querySelectorAll('.carousel-column').forEach(column => {
    const carousel = column.querySelector('.carousel');
    if (!carousel) return;

    const firstItem = carousel.querySelector(':scope > *');
    const rawHeight = firstItem ? firstItem.offsetHeight : 0;
    const itemHeight = (rawHeight > 5 ? rawHeight : 60) + 24;

    const upBtn = column.querySelector('.scroll-btn.up');
    const downBtn = column.querySelector('.scroll-btn.down');

    if (upBtn) {
      upBtn.addEventListener('click', () => {
        carousel.scrollBy({ top: -itemHeight, behavior: 'smooth' });
        carousel.focus();
      });
    }

    if (downBtn) {
      downBtn.addEventListener('click', () => {
        carousel.scrollBy({ top: itemHeight, behavior: 'smooth' });
        carousel.focus();
      });
    }
  });

}
