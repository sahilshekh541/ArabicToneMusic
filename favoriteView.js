import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";
import { musicdata } from "./data/music.js";

let selectedIndex;

//for format music duratiom time
var musiccurrenttime = document.querySelector(".music-time");
var totaltime = document.querySelector(".music-total-time");
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const totalseconds = Math.floor(seconds % 60);
  return `0${minutes}:${totalseconds < 10 ? "0" : ""}${totalseconds}`;
}
function loadTrack() {
  wavesurfer.load(musicdata[selectedIndex].musicsrc);
}

const wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#939393",
  progressColor: "#292929",
  barWidth: 4,
  height: 40,
  barRadius: 10,
});

function PlayMusic() {
  wavesurfer.play();
  wavesurfer.on("audioprocess", () => {
    if (wavesurfer.isPlaying()) {
      var currentTime = wavesurfer.getCurrentTime();
      var TotalTime = wavesurfer.getDuration();
      musiccurrenttime.textContent = formatTime(currentTime);
      totaltime.textContent = formatTime(TotalTime);
    }
  });
}
function displayFavorite() {
  const initdata = JSON.parse(localStorage.getItem("musicdata"));
  var clutter = "";
  const favorite = initdata.filter((music) => (music.favorite ? music : ""));
  favorite.map((music) => {
    clutter += `
            <div class="favorite-music" id="${music.id}">
          <img src="${music.img}" />
          <div class="detail">
            <p class="mName">${music.name}</p>
            <p class="mAuthor">${music.author}</p>
            <p class="remove-from-cart">
              Remove From Cart <i class="ri-dislike-fill dislike"  id='dislike-${music.id}' data-id=${music.id}></i>
            </p>
          </div>
          <div class="fIcon">
            <i class="ri-play-circle-fill play" id='play-${music.id}' data-id=${music.id}></i>
            <i class="ri-pause-circle-fill pause" id='pause-${music.id}' data-id=${music.id} ></i>
          </div>
        </div>
    `;
  });
  document.querySelector(".favorite-view").innerHTML = clutter;

  document.querySelectorAll(".favorite-music").forEach((e) => {
    e.addEventListener("click", (f) => {
      if (f.target.classList.contains("dislike")) {
        const mname = musicdata[f.target.dataset.id].name;
        const updatedata = musicdata.map((music) =>
          music.name == mname ? { ...music, favorite: false } : music
        );
        localStorage.setItem("musicdata", JSON.stringify(updatedata));
        displayFavorite();
      }
      if (f.target.classList.contains("play")) {
        selectedIndex = f.target.dataset.id;
        document.querySelector(".music-play-area").style.display = "block";
        document.querySelector(`#play-${f.target.dataset.id}`).style.display =
          "none";
        document.querySelector(`#pause-${f.target.dataset.id}`).style.display =
          "block";
        loadTrack();
        wavesurfer.on("ready", PlayMusic);
      }
      if (f.target.classList.contains("pause")) {
        document.querySelector(`#play-${f.target.dataset.id}`).style.display =
          "block";
        document.querySelector(`#pause-${f.target.dataset.id}`).style.display =
          "none";
        wavesurfer.pause();
      }
    });
  });
}

displayFavorite();
