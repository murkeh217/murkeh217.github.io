const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Indestructible",
    name: "Disturbed",
    source:
      "",
  },
  {
    title: "Smart",
    name: "Le Sserafim",
    source:
      "",
  },
  {
    title: "She-Wolf",
    name: "Shakira",
    source:
      "",
  },
  {
    title: "Burn It Down",
    name: "Linkin Park",
    source:
      "",
  },
  {
    title: "We Made You",
    name: "Eminem",
    source:
      "",
  },
  {
    title: "Monster",
    name: "Skillet",
    source:
      "",
  },
  {
    title: "Make It Bun Dem",
    name: "Skrillex & Damian 'Jr Gong' Marley",
    source:
      "",
  },
  {
    title: "Dim Sum Paradise",
    name: "OCT",
    source:
      "",
  },
  {
    title: "What I Anticipate Is Not The Snow",
    name: "张秒格",
    source:
      "",
  },
  {
    title: "Flight Mode",
    name: "Hua Chenyu",
    source:
      "",
  },
  {
    title: "RTRT",
    name: "Mili",
    source:
      "",
  },
  {
    title: "Rush Of Life",
    name: "Tony Ann",
    source:
      "",
  },
  {
    title: "Crystallize",
    name: "Lindsey Stirling",
    source:
      "",
  },
  {
    title: "I Can't Stop Me",
    name: "TWICE",
    source:
      "",
  },
  {
    title: "",
    name: "Mozart",
    source:
      "",
  },
  {
    title: "",
    name: "Beethoven",
    source:
      "",
  },
  {
    title: "Insane",
    name: "Infected Mushroom",
    source:
      "",
  },
  {
    title: "",
    name: "Hollywood Undead",
    source:
      "",
  },
  {
    title: "Bat Country",
    name: "Avenged Sevenfold",
    source:
      "",
  },
  {
    title: "",
    name: "G-I-DLE",
    source:
      "",
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); 
  playSong(); 
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo(); 
  playPause(); 
});