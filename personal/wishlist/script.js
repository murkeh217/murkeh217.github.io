const carousel = document.querySelector('.carousel');
const gap = parseFloat(getComputedStyle(carousel).gap); // dynamic gap in px

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

// scroll every 2 seconds
setInterval(scrollCarousel, 2000);
