document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    // make sure it can be focused (so wheel events target it inside iframes)
    if (!carousel.hasAttribute('tabindex')) carousel.setAttribute('tabindex', '0');

    // stop scroll-chaining into parent frames
    carousel.style.overscrollBehavior = 'contain'; // CSS property
    carousel.style.overflowY = 'auto';

    const originalItems = Array.from(carousel.children);
    const totalItems = originalItems.length;

    // clone items twice for seamless loop
    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));
    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));

    // compute item height after clones are added
    const firstItem = carousel.querySelector(':scope > *');
    const itemHeight = (firstItem ? firstItem.offsetHeight : 0) + 24; // margin between items

    // reset scroll position
    carousel.scrollTop = 0;

    // focus carousel on hover so wheel events are directed correctly
    carousel.addEventListener('mouseenter', () => carousel.focus());

    // ✅ Wheel scrolling (non-passive so preventDefault works)
    carousel.addEventListener('wheel', e => {
      // Stop default scrolling (page scroll, iframe scrollbars)
      e.preventDefault();
      e.stopPropagation();

      const direction = e.deltaY > 0 ? 1 : -1;
      carousel.scrollBy({ top: direction * itemHeight, behavior: 'smooth' });
    }, { passive: false, capture: true });

    // Infinite loop adjustment
    carousel.addEventListener('scroll', () => {
      const scrollHeightHalf = itemHeight * totalItems;
      if (carousel.scrollTop >= scrollHeightHalf) {
        carousel.scrollTop -= scrollHeightHalf;
      } else if (carousel.scrollTop < 0) {
        carousel.scrollTop += scrollHeightHalf;
      }
    });
  });

  // ✅ Scroll buttons (1 item per click)
  document.querySelectorAll('.carousel-column').forEach(column => {
    const carousel = column.querySelector('.carousel');
    if (!carousel) return;

    const firstItem = carousel.querySelector(':scope > *');
    const itemHeight = (firstItem ? firstItem.offsetHeight : 0) + 24;

    const upBtn = column.querySelector('.scroll-btn.up');
    const downBtn = column.querySelector('.scroll-btn.down');

    if (upBtn) upBtn.addEventListener('click', () => {
      carousel.scrollBy({ top: -itemHeight, behavior: 'smooth' });
      carousel.focus();
    });

    if (downBtn) downBtn.addEventListener('click', () => {
      carousel.scrollBy({ top: itemHeight, behavior: 'smooth' });
      carousel.focus();
    });
  });

  // ✅ Prevent page/iframe-level scrolling completely
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
});
