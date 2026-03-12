const scroller = document.getElementById("scroller");
const content = scroller.querySelector(".scroll--content");

/* --- SOUNDS --- */
const sounds = {
  snap: new Audio("https://assets.codepen.io/2585/snap.mp3"),
  pop: new Audio("https://assets.codepen.io/2585/pop.m4a")
};

/* --- RANDOMIZE GAME TILES --- */
const items = Array.from(content.children);

for (let i = items.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [items[i], items[j]] = [items[j], items[i]];
}

items.forEach(item => content.appendChild(item));

/* --- CLICK SCROLL --- */
scroller.onclick = (event) => {
  const target = event.target.closest(".game");

  if (target) {
    scroller.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth"
    });
  }
};

/* --- SNAP EVENTS --- */
scroller.onscrollsnapchanging = () => {
  navigator?.vibrate?.(50);
  sounds.pop.currentTime = 0;
  sounds.pop.play();
};

scroller.onscrollsnapchange = () => {
  sounds.snap.currentTime = 0;
  sounds.snap.play();
};