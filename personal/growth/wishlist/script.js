document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    if (!carousel.hasAttribute('tabindex')) carousel.setAttribute('tabindex', '0');

    carousel.style.overscrollBehavior = 'contain';
    carousel.style.overflowY = 'auto';

    const originalItems = Array.from(carousel.children);
    const totalItems = originalItems.length;

    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));
    originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));

    const firstItem = carousel.querySelector(':scope > *');
    const itemHeight = (firstItem ? firstItem.offsetHeight : 0) + 24;

    carousel.scrollTop = 0;

    // ✅ Only scroll carousel when hovering, otherwise allow page scroll
    carousel.addEventListener('wheel', e => {
      const rect = carousel.getBoundingClientRect();
      const isHovering = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (isHovering) {
        e.preventDefault();
        e.stopPropagation();
        const direction = e.deltaY > 0 ? 1 : -1;
        carousel.scrollBy({ top: direction * itemHeight, behavior: 'smooth' });
      }
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

  // Scroll buttons
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
});