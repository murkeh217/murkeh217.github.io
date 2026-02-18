document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let activeTimeout = null;
  let activeCard = null;

  // === Make the middle card active by default ===
  if (cards.length > 0) {
    const middle = Math.floor(cards.length / 2);
    cards[middle].classList.add("active");
    activeCard = cards[middle];
  }

  // === Utility function to set active card ===
  const setActive = (card) => {
    clearTimeout(activeTimeout);
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    activeCard = card;
  };

  // === Mouse hover behavior (Desktop) ===
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      setActive(card);
    });

    card.addEventListener("mouseleave", () => {
      activeTimeout = setTimeout(() => {
        if (activeCard) activeCard.classList.remove("active");
      }, 1000);
    });
  });

  // === Touch behavior (Mobile) ===
  cards.forEach(card => {
    card.addEventListener("touchstart", (e) => {
      // Prevent accidental double tap zoom on mobile
      e.preventDefault();
      setActive(card);
    });
  });

  // === Optional: Click to activate (for hybrid devices) ===
  cards.forEach(card => {
    card.addEventListener("click", () => {
      setActive(card);
    });
  });
});
