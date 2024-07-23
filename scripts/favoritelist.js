import WaveSurfer from "https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js";
import { musicdata } from "../data/music.js";
import { musciChange } from "../index.js";

let selectedIndex;
const wavesurfer = WaveSurfer.create({
  container: "#waveform2",
  waveColor: "#939393",
  progressColor: "#292929",
  barWidth: 4,
  height: 40,
  barRadius: 10,
});

function loadTrack() {
  document.querySelector("#waveform2").style.display = "block";
  document.querySelector("#waveform").style.display = "none";
  wavesurfer.load(musicdata[selectedIndex].musicsrc);
  musciChange();
}
export function FavoriteMusics() {
  const initialdata = JSON.parse(localStorage.getItem("musicdata"));
  var clutter = "";
  const favoritelist = initialdata.filter((music) =>
    music.favorite ? music : ""
  );

  favoritelist.map((music) => {
    clutter += `<div class="favorite-music" id=${music.id}>
            <img src="${music.img}" />
            <div class="desc">
              <p class="fmName">${music.name}</p>
              <p class="fmAuthor">${music.author}</p>
            </div>
            <div class="fIcon">
              <i class="ri-play-circle-fill favplay" id='play-${music.id}' data-id=${music.id}></i>
              <i class="ri-pause-circle-fill favpause" id='pause-${music.id}' data-id=${music.id}></i>
            </div>
          </div>`;
  });
  document.querySelector(".favorite-playlist-lists").innerHTML = clutter;
  document.querySelectorAll(".favorite-music").forEach((f) => {
    f.addEventListener("click", (e) => {
      if (e.target.classList.contains("favplay")) {
        document.querySelector(`#play-${e.target.dataset.id}`).style.display =
          "none";

        document.querySelector(`#pause-${e.target.dataset.id}`).style.display =
          "block";
        selectedIndex = e.target.dataset.id;
        loadTrack();
        wavesurfer.play();
      }
      if (e.target.classList.contains("favpause")) {
        document.querySelector(`#play-${e.target.dataset.id}`).style.display =
          "block";
        document.querySelector(`#pause-${e.target.dataset.id}`).style.display =
          "none";
        wavesurfer.pause();
      }
    });
  });
}

const favLength = document.querySelector("#fav-length");
let fl = 0;
export function Flength() {
  musicdata.map((music) => {
    if (music.favorite == true) {
      fl++;
    }
  });
  favLength.textContent = `(${fl})`;
}

export function addFavorite() {
  fl += 1;
  favLength.textContent = `(${fl})`;
}

export function removeFavorite() {
  fl -= 1;
  favLength.textContent = `(${fl})`;
}
