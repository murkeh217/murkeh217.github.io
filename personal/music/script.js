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
      "./indestructible.mp3",
  },
  {
    title: "Smart",
    name: "Le Sserafim",
    source:
      "./smart.mp3",
  },
  {
    title: "She-Wolf",
    name: "Shakira",
    source:
      "./shewolf.mp3",
  },
  {
    title: "Burn It Down",
    name: "Linkin Park",
    source:
      "./burnitdown.mp3",
  },
  {
    title: "We Made You",
    name: "Eminem",
    source:
      "./wemadeyou.mp3",
  },
  {
    title: "Monster",
    name: "Skillet",
    source:
      "./monster.mp3",
  },
  {
    title: "Make It Bun Dem",
    name: "Skrillex & Damian 'Jr Gong' Marley",
    source:
      "./makeitbundem.mp3",
  },
  {
    title: "Dim Sum Paradise",
    name: "OCT",
    source:
      "./dimsumparadise.mp3",
  },
  {
    title: "What I Anticipate Is Not Snow",
    name: "张秒格",
    source:
      "./notsnow.mp3",
  },
  {
    title: "Flight Mode",
    name: "Hua Chenyu",
    source:
      "./flightmode.mp3",
  },
  {
    title: "RTRT",
    name: "Mili",
    source:
      "./rtrt.mp3",
  },
  {
    title: "Rush Of Life",
    name: "Tony Ann",
    source:
      "./rush.mp3",
  },
  {
    title: "Crystallize",
    name: "Lindsey Stirling",
    source:
      "./crystallize.mp3",
  },
  {
    title: "I Can't Stop Me",
    name: "TWICE",
    source:
      "./cantstop.mp3",
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
    title: "Becoming Insane",
    name: "Infected Mushroom",
    source:
      "./insane.mp3",
  },
  {
    title: "Undead",
    name: "Hollywood Undead",
    source:
      "./undead.mp3",
  },
  {
    title: "Bat Country",
    name: "Avenged Sevenfold",
    source:
      "./batcountry.mp3",
  },
  {
    title: "Nxde",
    name: "G-I-DLE",
    source:
      "./nxde.mp3",
  },
];

let currentSongIndex = 9;

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
  initialSlide: 9,
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