import { musicdata } from "../data/music.js";
import { FavoriteMusics } from "./favoritelist.js";

export function saveToLocalstorage(musicname) {
  const updatedata = musicdata.map((music) =>
    music.name == musicname ? { ...music, favorite: true } : music
  );
  localStorage.setItem("musicdata", JSON.stringify(updatedata));
  FavoriteMusics();
}

export function removeToLocalstorage(musicname) {
  const updatedata = musicdata.map((music) =>
    music.name == musicname ? { ...music, favorite: false } : music
  );
  localStorage.setItem("musicdata", JSON.stringify(updatedata));
  FavoriteMusics();
}
