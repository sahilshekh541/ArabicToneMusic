import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";
import { musicdata } from "./data/music.js";
import {
  addFavorite,
  FavoriteMusics,
  Flength,
  removeFavorite,
} from "./scripts/favoritelist.js";
import {
  removeToLocalstorage,
  saveToLocalstorage,
} from "./scripts/SavetoLocalStorage.js";

export var musicListdata = musicdata;
export let selectedIndex = 0;
let selectedtype = "view all";
let filtermusics = [];

const addTofavorite = document.querySelector("#add-to-favorite");
const favorite = document.querySelector("#favorited");

var musicList = document.querySelector(".musics-horizontal");
var musicname = document.querySelector(".music-name");
var musictype = document.querySelector(".music-type");

var musiccurrenttime = document.querySelector(".music-time");
var musictotalduration = document.querySelector(".music-total-time");

var playicon = document.querySelector("#play");
var pauseicon = document.querySelector("#pause");

var prevmusic = document.getElementById("backward");
var nextmusic = document.getElementById("forward");

//for format music duratiom time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const totalseconds = Math.floor(seconds % 60);
  return `0${minutes}:${totalseconds < 10 ? "0" : ""}${totalseconds}`;
}
//wave surfer
function loadTrack() {
  wavesurfer.load(musicdata[selectedIndex].musicsrc);
  musciChange();
  document.querySelector("#waveform2").style.display = "none";
  document.querySelector("#waveform").style.display = "block";
}

const wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#939393",
  progressColor: "#292929",
  barWidth: 4,
  height: 40,
  barRadius: 10,
});

wavesurfer.on("interaction", () => {
  wavesurfer.play();
  PlayMusic();
  playicon.style.display = "none";
  pauseicon.style.display = "block";
});
wavesurfer.on("finish", () => {
  playicon.style.display = "block";
  pauseicon.style.display = "none";
});
function PlayMusic() {
  wavesurfer.play();
  wavesurfer.on("audioprocess", () => {
    if (wavesurfer.isPlaying()) {
      var currentTime = wavesurfer.getCurrentTime();
      musiccurrenttime.textContent = formatTime(currentTime);
    }
  });
}

function DisplayMusicContainer(type = selectedtype) {
  var clutter = "";
  selectedtype == "view all"
    ? musicListdata.map((music) => {
        clutter += `<div class="music-container" id=${music.id}>
          <img src="${music.img}" />
          <p class="mName">${music.name}</p>
          <p class="mAuthor">${music.author}</p>
        </div>`;
      })
    : filtermusics.map((music) => {
        clutter += `<div class="music-container" id=${music.id}>
            <img src="${music.img}" />
            <p class="mName">${music.name}</p>
            <p class="mAuthor">${music.author}</p>
          </div>`;
      });
  musicList.innerHTML = clutter;
}

var viewall = document.querySelector("#view-all");
viewall.addEventListener("click", (e) => {
  category.forEach((cat) => {
    cat.classList.remove("active");
  });
  selectedtype = e.target.textContent.toLowerCase();
  DisplayMusicContainer();
});

var category = document.querySelectorAll(".category");
category.forEach((cat) => {
  cat.classList.remove("active");
  cat.addEventListener("click", (e) => {
    category.forEach((c) => {
      c.classList.remove("active");
    });
    e.target.classList.add("active");
    selectedtype = e.target.textContent.toLowerCase();
    filtermusics = musicListdata.filter((music) =>
      music.type == selectedtype ? music : ""
    );
    DisplayMusicContainer(selectedtype);
  });
});

export function musciChange() {
  const currentMusic = musicListdata[selectedIndex];
  musicname.innerHTML = musicListdata[selectedIndex].name;
  musictype.innerHTML = musicListdata[selectedIndex].type;
  musictotalduration.innerHTML = musicListdata[selectedIndex].time;
  if (selectedIndex == 0) {
    prevmusic.style.opacity = "0.2";
    prevmusic.style.cursor = "none";
  } else {
    prevmusic.style.opacity = "1";
    prevmusic.style.cursor = "pointer";
  }
  if (currentMusic.favorite) {
    favorite.style.display = "block";
    addTofavorite.style.display = "none";
  } else {
    addTofavorite.style.display = "block";
    favorite.style.display = "none";
  }
}

musicList.addEventListener("click", (e) => {
  if (e.target.classList.contains("music-container")) {
    selectedIndex = Number(e.target.id);
    loadTrack();
    wavesurfer.on("ready", PlayMusic);
    playicon.style.display = "none";
    pauseicon.style.display = "block";
  }
});

playicon.addEventListener("click", () => {
  playicon.style.display = "none";
  pauseicon.style.display = "block";
  document.querySelector("#waveform2").style.display = "none";
  document.querySelector("#waveform").style.display = "block";
  PlayMusic();
  wavesurfer.play();
});
pauseicon.addEventListener("click", () => {
  pauseicon.style.display = "none";
  playicon.style.display = "block";
  document.querySelector("#waveform2").style.display = "none";
  document.querySelector("#waveform").style.display = "block";
  PlayMusic();
  wavesurfer.pause();
});

prevmusic.addEventListener("click", () => {
  if (selectedIndex > 0) {
    selectedIndex--;
    playicon.style.display = "none";
    pauseicon.style.display = "block";
    loadTrack();
    wavesurfer.on("ready", PlayMusic);
  }
  if (selectedIndex == 0) {
    prevmusic.style.opacity = "0.2";
    prevmusic.style.cursor = "none";
  }
});
nextmusic.addEventListener("click", () => {
  if (selectedIndex < musicListdata.length - 1) {
    selectedIndex++;
    playicon.style.display = "none";
    pauseicon.style.display = "block";
    loadTrack();
    wavesurfer.on("ready", PlayMusic);
  }
  if (selectedIndex == musicListdata.length - 1) {
    nextmusic.style.opacity = "0.2";
    nextmusic.style.cursor = "none";
  }
});

document.querySelector(".row-icon").addEventListener("click", (e) => {
  const mname = document.querySelector(".music-name").textContent;
  if (e.target.id == "add-to-favorite") {
    addTofavorite.style.display = "none";
    favorite.style.display = "block";
    saveToLocalstorage(mname);
    addFavorite();
  }
  if (e.target.id == "favorited") {
    addTofavorite.style.display = "block";
    favorite.style.display = "none";
    removeToLocalstorage(mname);
    removeFavorite();
  }
});

const mobileMenu = document.querySelector(".mobile-menu");
const mobileNav = document.querySelector(".mobile-nav");
let isExpanded = false;

mobileMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("mobile-menu")) {
    if (!isExpanded) {
      console.log("ok");
      console.log(mobileNav.style.height);
      mobileNav.style.height = "100vh";
    } else {
      mobileNav.style.height = "30px";
    }
    isExpanded = !isExpanded;
  } else {
    mobileNav.style.height = "30px";
  }
});

loadTrack();
DisplayMusicContainer();
musciChange();

// favorite music list
FavoriteMusics();
Flength();
