import { data } from './close-modal';

let watchedFilms = [];
let parsedWatchedFilms = [];
let dataJson = [];
const LOCALSTORAGE_KEY = 'watched-movies';

function onBtnAddToWatchedClick() {
  watchedFilms = localStorage.getItem(LOCALSTORAGE_KEY);
  parsedWatchedFilms = JSON.parse(watchedFilms);

  if (parsedWatchedFilms) {
    const hasMovie = parsedWatchedFilms.find(
      parsedWatchedFilm => parsedWatchedFilm.id === data.id
    );
    if (hasMovie) {
      return;
    }

    parsedWatchedFilms.push(data);
    dataJson = JSON.stringify(parsedWatchedFilms);
    localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
  } else {
    parsedWatchedFilms = [data];
    dataJson = JSON.stringify(parsedWatchedFilms);
    localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
  }
}

function onBtnClick(e) {
  if (e.target.className === 'btn watched') {
    onBtnAddToWatchedClick();
  }
}

document.addEventListener('click', onBtnClick);
