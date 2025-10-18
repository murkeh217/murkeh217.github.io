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
    video: "./disturbed.mp4",
  },
  {
    title: "Smart",
    name: "Le Sserafim",
    source:
      "./smart.mp3",
    video: "./lesserafim.mp4",
  },
  {
    title: "She-Wolf",
    name: "Shakira",
    source:
      "./shewolf.mp3",
    video: "./shakira.webm",  
  },
  {
    title: "Burn It Down",
    name: "Linkin Park",
    source:
      "./burnitdown.mp3",
    video: "./lp.mp4",
  },
  {
    title: "We Made You",
    name: "Eminem",
    source:
      "./wemadeyou.mp3",
    video: "./eminem.mp4",
  },
  {
    title: "Monster",
    name: "Skillet",
    source:
      "./monster.mp3",
    video: "./skillet.mp4",
  },
  {
    title: "Make It Bun Dem",
    name: "Skrillex & Damian 'Jr Gong' Marley",
    source:
      "./makeitbundem.mp3",
    video: "./skrillex.mp4",
  },
  {
    title: "Dim Sum Paradise",
    name: "OCT",
    source:
      "./dimsumparadise.mp3",
    video: "./oct.mp4",
  },
  {
    title: "What I Anticipate Is Not Snow",
    name: "张秒格 Zhang Miaige",
    source:
      "./notsnow.mp3",
    video: "./snow.mp4",
  },
  {
    title: "Flight Mode",
    name: "Hua Chenyu",
    source:
      "./flightmode.mp3",
    video: "./hua.mp4",
  },
  {
    title: "RTRT",
    name: "Mili",
    source:
      "./rtrt.mp3",
    video: "./mili.mp4",
  },
  {
    title: "Rush Of Life",
    name: "Tony Ann",
    source:
      "./rush.mp3",
    video: "./tony.mp4",
  },
  {
    title: "Crystallize",
    name: "Lindsey Stirling",
    source:
      "./crystallize.mp3",
    video: "./lindsey.mp4",
  },
  {
    title: "I Can't Stop Me",
    name: "TWICE",
    source:
      "./cantstop.mp3",
    video: "./twice.mp4",
  },
  {
    title: "Assassin's Creed: Chase Theme",
    name: "Jesper Kyd",
    source:
      "chase.mp3",
    video: "./jesper.mp3",
  },
  {
    title: "Interstellar: No Time For Caution",
    name: "Hans Zimmer",
    source:
      "notime.mp3",
    video: "./hans.mp3",
  },
  {
    title: "Becoming Insane",
    name: "Infected Mushroom",
    source:
      "./insane.mp3",
    video: "./mushroom.mp4",
  },
  {
    title: "Undead",
    name: "Hollywood Undead",
    source:
      "./undead.mp3",
    video: "./hu.mp4",
  },
  {
    title: "Bat Country",
    name: "Avenged Sevenfold",
    source:
      "./batcountry.mp3",
    video: "./a7x.mp4",
  },
  {
    title: "Nxde",
    name: "G-I-DLE",
    source:
      "./nxde.mp3",
    video: "./gidle.mp4",
  },
  {
    title: "Summertime Sadness",
    name: "Lana Del Ray",
    source:
      "./summertime.mp3",
    video: "./lana.mp4",
  },
  {
    title: "Drunken Master II Theme",
    name: "Jackie Chan",
    source:
      "./jc.mp3",
    video: "./jc.mp4",
  },
  {
    title: "Won Fei Hong",
    name: "George Lam",
    source:
      "./wonfeihong.mp3",
    video: "./",
  },
  {
    title: "Likhe Jo Khat Tujhe",
    name: "Mohammed Rafi",
    source:
      "./khat.mp3",
    video: "./rafi.mp4",
  },
  {
    title: "O Mere Dil Ke Chain",
    name: "R.D. Burman, Kishore Kumar",
    source:
      "./chain.mp3",
    video: "./rdkishore.mp4",
  },
  {
    title: "295",
    name: "Siddhu Moosewala",
    source:
      "./295.mp3",
    video: "./moosewala.mp4",
  },
  {
    title: "Aayi Nai",
    name: "Stree 2",
    source:
      "./aayinai.mp3",
    video: "./stree.mp4",
  },
  {
    title: "Teri Deewani",
    name: "Kailash Kher",
    source:
      "./terideewani.mp3",
    video: "./kailash.mp4",
  },
  {
    title: "Tu Hi Meri Shab Hai",
    name: "K.K.",
    source:
      "./kk.mp3",
    video: "./kk.mp4",
  },
  {
    title: "Ya Ali",
    name: "Zubeen Garg",
    source:
      "./yaali.mp3",
    video: "./zubeen.mp4",
  },
  {
    title: "Lift Karadey",
    name: "Adnan Sami",
    source:
      "./lift.mp3",
    video: "./sami.mp4",
  },
];

// Fisher–Yates shuffle
function shuffleSongsAndSlides() {
  const slides = Array.from(document.querySelectorAll(".swiper-slide"));
  const wrapper = document.querySelector(".swiper-wrapper");

  // Create array of indices to shuffle
  const indices = songs.map((_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Reorder songs and slides using shuffled indices
  const shuffledSongs = indices.map(i => songs[i]);
  const shuffledSlides = indices.map(i => slides[i]);

  // Clear wrapper and re-append shuffled slides
  wrapper.innerHTML = "";
  shuffledSlides.forEach(slide => wrapper.appendChild(slide));

  // Replace songs array with shuffled version
  songs.length = 0;
  songs.push(...shuffledSongs);
}

// Shuffle once on page load
shuffleSongsAndSlides();

// Start with first song in shuffled list
let currentSongIndex = 15;

function updateSongInfo() {
  const current = songs[currentSongIndex];
  songName.textContent = current.title || "Unknown Title";
  artistName.textContent = current.name || "Unknown Artist";
  song.src = current.source || "";

  const bgVideo = document.querySelector(".bg-video");

  if (current.video) {
    bgVideo.style.opacity = 0;
    setTimeout(() => {
      bgVideo.src = current.video;
      bgVideo.load();
      bgVideo.play().catch(() => {}); // avoid autoplay errors
      bgVideo.style.opacity = 1;
    }, 300);
  }
}

const bgVideo = document.querySelector(".bg-video");

song.addEventListener("play", () => {
  bgVideo.style.filter = "blur(3px) brightness(0.8)";
});

song.addEventListener("pause", () => {
  bgVideo.style.filter = "blur(5px) brightness(0.5)";
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
  initialSlide: 15,
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
