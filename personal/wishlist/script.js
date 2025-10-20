document.querySelectorAll('.carousel').forEach(carousel => {
  const items = Array.from(carousel.children);
  const itemHeight = items[0].offsetHeight + 24; // item height + margin
  const totalItems = items.length;

  // Duplicate items twice for seamless loop
  items.forEach(item => carousel.appendChild(item.cloneNode(true)));
  items.forEach(item => carousel.appendChild(item.cloneNode(true)));

  // Start scroll
  carousel.scrollTop = 0;

  // Wheel scrolling
  carousel.addEventListener('wheel', e => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    carousel.scrollBy({ top: direction * itemHeight, behavior: 'smooth' });
  });

  // Infinite adjustment on scroll
  carousel.addEventListener('scroll', () => {
    const scrollHeightHalf = itemHeight * totalItems;
    if (carousel.scrollTop >= scrollHeightHalf) {
      carousel.scrollTop -= scrollHeightHalf;
    } else if (carousel.scrollTop < 0) {
      carousel.scrollTop += scrollHeightHalf;
    }
  });
});

// Scroll button behavior (1 item per click)
document.querySelectorAll('.carousel-column').forEach(column => {
  const carousel = column.querySelector('.carousel');
  const upBtn = column.querySelector('.scroll-btn.up');
  const downBtn = column.querySelector('.scroll-btn.down');

  const items = Array.from(carousel.children);
  const itemHeight = items[0].offsetHeight + 24;

  if (upBtn) {
    upBtn.addEventListener('click', () => {
      carousel.scrollBy({ top: -itemHeight, behavior: 'smooth' });
    });
  }

  if (downBtn) {
    downBtn.addEventListener('click', () => {
      carousel.scrollBy({ top: itemHeight, behavior: 'smooth' });
    });
  }
});
