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


/* -------------------- */
/* DRAG + SWIPE CONTROL */
/* -------------------- */

let startY = 0;
let startScroll = 0;
let dragging = false;

let swipeStart = 0;


/* TOUCH (mobile swipe) */

document.addEventListener("touchstart", e=>{

  startY = e.touches[0].clientY;
  swipeStart = startY;

  startScroll = window.scrollY;
  dragging = true;

},{passive:true});


document.addEventListener("touchmove", e=>{

  if(!dragging) return;

  const y = e.touches[0].clientY;
  const delta = startY - y;

  window.scrollTo(0, startScroll + delta);

},{passive:true});


document.addEventListener("touchend", e=>{

  dragging = false;

  const endY = e.changedTouches[0].clientY;
  const diff = swipeStart - endY;

  const threshold = 80;

  if(Math.abs(diff) > threshold){

    const page = window.innerHeight;

    if(diff > 0){
      /* swipe up */
      window.scrollBy({
        top: page,
        behavior: "smooth"
      });
    }else{
      /* swipe down */
      window.scrollBy({
        top: -page,
        behavior: "smooth"
      });
    }

  }

});


/* MOUSE DRAG */

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