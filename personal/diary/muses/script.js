function f(k){
  if(Math.abs(k) > .5){
    scrollTo(
      0,
      .5*(k - Math.sign(k) + 1) *
      (document.documentElement.offsetHeight - window.innerHeight)
    )
  }
}

f(-1);

/* prevent scroll loop */
let ticking = false;

addEventListener("scroll", () => {

  if(ticking) return;

  ticking = true;

  requestAnimationFrame(() => {
    const k = +getComputedStyle(document.body)
      .getPropertyValue("--k");

    f(k);

    ticking = false;
  });

});


/* drag + swipe scrolling */

let startY = 0;
let startScroll = 0;
let dragging = false;


/* TOUCH */

document.addEventListener("touchstart", e=>{
  startY = e.touches[0].clientY;
  startScroll = window.scrollY;
  dragging = true;
},{passive:true});


document.addEventListener("touchmove", e=>{
  if(!dragging) return;

  const delta = startY - e.touches[0].clientY;

  window.scrollTo(0, startScroll + delta);
},{passive:true});


document.addEventListener("touchend", ()=>{
  dragging = false;
});


/* MOUSE */

document.addEventListener("mousedown", e=>{
  startY = e.clientY;
  startScroll = window.scrollY;
  dragging = true;

  document.body.style.userSelect = "none";
});


document.addEventListener("mousemove", e=>{
  if(!dragging) return;

  const delta = startY - e.clientY;

  window.scrollTo(0, startScroll + delta);
});


document.addEventListener("mouseup", ()=>{
  dragging = false;
  document.body.style.userSelect = "";
});


document.addEventListener("mouseleave", ()=>{
  dragging = false;
});