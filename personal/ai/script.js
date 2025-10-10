const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const volSlider = document.getElementById("vol");
const seek = document.getElementById("seek");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

// Set your audio source
audio.src = "./mk-poem.mp3";

// Play / Pause toggle
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
  updateVolumeBar();
});

// When metadata loads (so we know the duration)
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
  updateSeekBar();
  updateVolumeBar();
});

// Update seek as audio plays
audio.addEventListener("timeupdate", () => {
  seek.value = (audio.currentTime / audio.duration) * 100;
  current.textContent = formatTime(audio.currentTime);
  updateSeekBar();
});

// Seek when slider is moved
seek.addEventListener("input", () => {
  audio.currentTime = (seek.value / 100) * audio.duration;
  updateSeekBar();
});

// Helper: format seconds → mm:ss
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Helper: update green progress fill
function updateSeekBar() {
  const percent = seek.value;
  seek.style.background = `linear-gradient(to right, var(--accent) ${percent}%, rgba(255,255,255,0.2) ${percent}%)`;
}

// Helper: update green volume fill
function updateVolumeBar() {
  const percent = volSlider.value * 100;
  // the gradient runs along the element's local horizontal axis,
  // which after rotate(-90deg) appears vertical to the user.
  volSlider.style.background = `linear-gradient(to right, var(--accent) ${percent}%, rgba(255,255,255,0.18) ${percent}%)`;
}
