window.addEventListener("load", () => {
  initCarousels();
});

function initCarousels() {

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

  // -------------------------
  // CAROUSEL SETUP
  // -------------------------
  document.querySelectorAll('.carousel').forEach(carousel => {

    if (!carousel.hasAttribute('tabindex')) {
      carousel.setAttribute('tabindex', '0');
    }

    carousel.style.overscrollBehavior = 'contain';
    carousel.style.overflowY = 'auto';

    const originalItems = Array.from(carousel.children);
    const totalItems = originalItems.length;

    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));
    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));

    const firstItem = carousel.querySelector(':scope > *');

    const rawHeight = firstItem ? firstItem.offsetHeight : 0;
    const itemHeight = (rawHeight > 5 ? rawHeight : 60) + 24;

    carousel.scrollTop = 0;

    carousel.addEventListener(
      'wheel',
      e => {
        const rect = carousel.getBoundingClientRect();
        const isHover = e.clientY >= rect.top && e.clientY <= rect.bottom;

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

      if (carousel.scrollTop >= loopHeight * 2) {
        carousel.scrollTop -= loopHeight;
      }
      else if (carousel.scrollTop <= 0) {
        carousel.scrollTop += loopHeight;
      }

    });

  });

  // -------------------------
  // BUTTON CONTROLS
  // -------------------------
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
        carousel.scrollBy({
          top: -itemHeight,
          behavior: 'smooth'
        });
        carousel.focus();
      });
    }

    if (downBtn) {
      downBtn.addEventListener('click', () => {
        carousel.scrollBy({
          top: itemHeight,
          behavior: 'smooth'
        });
        carousel.focus();
      });
    }

  });

}