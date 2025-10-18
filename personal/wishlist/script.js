const carousel = document.querySelector('.carousel');
const gap = parseFloat(getComputedStyle(carousel).gap) || 0;

// --- SHUFFLE ONCE PER SESSION ---
const items = Array.from(carousel.children);
let savedOrder = sessionStorage.getItem('carouselOrder');

if (savedOrder) {
  // Restore saved order
  const order = JSON.parse(savedOrder);
  order.forEach(index => carousel.appendChild(items[index]));
} else {
  // Create random order and save it
  const order = items.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  sessionStorage.setItem('carouselOrder', JSON.stringify(order));
  order.forEach(index => carousel.appendChild(items[index]));
}

// --- SCROLL FUNCTION ---
function scrollCarousel() {
  const firstItem = carousel.firstElementChild;
  const itemHeight = firstItem.offsetHeight + gap;

  carousel.style.transition = 'transform 0.6s ease';
  carousel.style.transform = `translateY(-${itemHeight}px)`;

  carousel.addEventListener('transitionend', function reset() {
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateY(0)';
    carousel.appendChild(firstItem);
    carousel.removeEventListener('transitionend', reset);
  });
}

// --- AUTO-SCROLL EVERY 2 SECONDS ---
setInterval(scrollCarousel, 2000);