let isDragging = false;
let startX = 0;

// --- MOUSE ---
document.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  startX = e.clientX;

  // simulate vertical scroll
  window.dispatchEvent(new WheelEvent("wheel", {
    deltaY: -dx * 2
  }));
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// --- TOUCH ---
document.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const dx = e.touches[0].clientX - startX;
  startX = e.touches[0].clientX;

  window.dispatchEvent(new WheelEvent("wheel", {
    deltaY: -dx * 2
  }));
});

document.addEventListener("touchend", () => {
  isDragging = false;
});