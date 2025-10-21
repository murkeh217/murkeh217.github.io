document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  let activeTimeout = null;

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      clearTimeout(activeTimeout);
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });

    card.addEventListener("mouseleave", () => {
      activeTimeout = setTimeout(() => {
        card.classList.remove("active");
      }, 1000);
    });
  });
});
