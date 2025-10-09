const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const volSlider = document.getElementById("vol");
const seek = document.getElementById("seek");

// Set your audio source
audio.src = "";

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// Volume control
volSlider.addEventListener("input", () => {
  audio.volume = volSlider.value;
});

// Update seek bar as audio plays
audio.addEventListener("timeupdate", () => {
  seek.value = (audio.currentTime / audio.duration) * 100;
});

// Seek audio when slider changes
seek.addEventListener("input", () => {
  audio.currentTime = (seek.value / 100) * audio.duration;
});
