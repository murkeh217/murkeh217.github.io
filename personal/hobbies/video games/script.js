const sounds = {
  snap: new Audio('https://assets.codepen.io/2585/snap.mp3'),
  pop: new Audio('https://assets.codepen.io/2585/pop.m4a') };


scroller.onclick = event => {
  let target = event.target.closest('.game');

  if (target) {
    scroller.scrollTo({
      left: target.offsetLeft,
      behavior: 'smooth' });

  }
};

scroller.onscrollsnapchanging = event => {var _navigator;
  (_navigator = navigator) === null || _navigator === void 0 ? void 0 : _navigator.vibrate(50);
  sounds.pop.play();
};

scroller.onscrollsnapchange = event => {
  sounds.snap.play();
};