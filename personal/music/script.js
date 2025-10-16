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
    background: "./",
  },
  {
    title: "Smart",
    name: "Le Sserafim",
    source:
      "./smart.mp3",
    background: "./",
  },
  {
    title: "She-Wolf",
    name: "Shakira",
    source:
      "./shewolf.mp3",
    background: "./shakira.gif",
  },
  {
    title: "Burn It Down",
    name: "Linkin Park",
    source:
      "./burnitdown.mp3",
    background: "./",
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
    background: "./",
  },
  {
    title: "Make It Bun Dem",
    name: "Skrillex & Damian 'Jr Gong' Marley",
    source:
      "./makeitbundem.mp3",
    background: "./",
  },
  {
    title: "Dim Sum Paradise",
    name: "OCT",
    source:
      "./dimsumparadise.mp3",
    background: "./",
  },
  {
    title: "What I Anticipate Is Not Snow",
    name: "张秒格",
    source:
      "./notsnow.mp3",
    background: "./",
  },
  {
    title: "Flight Mode",
    name: "Hua Chenyu",
    source:
      "./flightmode.mp3",
    background: "./",
  },
  {
    title: "RTRT",
    name: "Mili",
    source:
      "./rtrt.mp3",
    background: "./",
  },
  {
    title: "Rush Of Life",
    name: "Tony Ann",
    source:
      "./rush.mp3",
    background: "./",
  },
  {
    title: "Crystallize",
    name: "Lindsey Stirling",
    source:
      "./crystallize.mp3",
    background: "./",
  },
  {
    title: "I Can't Stop Me",
    name: "TWICE",
    source:
      "./cantstop.mp3",
    background: "./",
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
    background: "./",
  },
  {
    title: "Undead",
    name: "Hollywood Undead",
    source:
      "./undead.mp3",
    background: "./",
  },
  {
    title: "Bat Country",
    name: "Avenged Sevenfold",
    source:
      "./batcountry.mp3",
    background: "./",
  },
  {
    title: "Nxde",
    name: "G-I-DLE",
    source:
      "./nxde.mp3",
    background: "./",
  },
  {
    title: "Summertime Sadness",
    name: "Lana Del Ray",
    source:
      "./summertime.mp3",
    background: "./",
  },
  {
    title: "Drunken Master II Theme",
    name: "Jackie Chan",
    source:
      "./jc.mp3",
    background: "./",
  },
  {
    title: "Won Fei Hong",
    name: "George Lam",
    source:
      "./wonfeihong.mp3",
    background: "./",
  },
  {
    title: "Likhe Jo Khat Tujhe",
    name: "Mohammed Rafi",
    source:
      "./khat.mp3",
    background: "./",
  },
  {
    title: "O Mere Dil Ke Chain",
    name: "R.D. Burman, Kishore Kumar",
    source:
      "./chain.mp3",
    background: "./",
  },
  {
    title: "295",
    name: "Siddhu Moosewala",
    source:
      "./295.mp3",
    background: "./",
  },
  {
    title: "Aayi Nai",
    name: "Stree 2",
    source:
      "./aayinai.mp3",
  }

];

let currentSongIndex = 12;

function updateSongInfo() {
  const current = songs[currentSongIndex];
  songName.textContent = current.title;
  artistName.textContent = current.name;
  song.src = current.source;

  // Smooth fade between GIFs
  const bg = document.querySelector(".bg");
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.style.backgroundImage = `url(${current.background})`;
    bg.style.opacity = 1;
  }, 300);

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("play", () => {
  document.querySelector(".bg").style.filter = "blur(8px) brightness(0.9)";
});

song.addEventListener("pause", () => {
  document.querySelector(".bg").style.filter = "blur(10px) brightness(0.5)";
});


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
  initialSlide: 12,
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

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
    updateProgressColor();
  }
});

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
  updateProgressColor();
});

function updateProgressColor() {
  const value = (progress.value / progress.max) * 100;
  progress.style.background = `linear-gradient(to right, lightgreen ${value}%, #ccc ${value}%)`;
}
