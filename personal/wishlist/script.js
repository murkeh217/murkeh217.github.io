document.querySelectorAll('.carousel').forEach(carousel => {
  // Shuffle items on refresh
  const items = Array.from(carousel.children);
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  items.forEach(item => carousel.appendChild(item));

  // Enable vertical mouse scroll
  let scrollPos = 0;
  const scrollStep = 200;
  carousel.addEventListener('wheel', (e) => {
    e.preventDefault();
    scrollPos += e.deltaY > 0 ? scrollStep : -scrollStep;
    scrollPos = Math.max(0, Math.min(scrollPos, carousel.scrollHeight - carousel.clientHeight));
    carousel.scrollTo({ top: scrollPos, behavior: 'smooth' });
  });
});

// Scroll button behavior
document.querySelectorAll('.carousel-column').forEach(column => {
  const carousel = column.querySelector('.carousel');
  const upBtn = column.querySelector('.scroll-btn.up');
  const downBtn = column.querySelector('.scroll-btn.down');

  const scrollAmount = 200;

  upBtn.addEventListener('click', () => {
    carousel.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
  });

  downBtn.addEventListener('click', () => {
    carousel.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  });
});
