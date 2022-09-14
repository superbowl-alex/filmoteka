import Notiflix from 'notiflix';
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
      Notiflix.Notify.init({
        fontSize: '16px',
        distance: '20px',
      });

      Notiflix.Notify.info('The movie is already added to watched');
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

export function onBtnRemoveFromWatchedClick(event) {
  if (event.target.className != 'btn watched') {
    return;
  }
  watchedFilms = localStorage.getItem(LOCALSTORAGE_KEY);
  parsedWatchedFilms = JSON.parse(watchedFilms);

  parsedWatchedFilms.map((film, index) => {
    if (film.id === data.id) {
      parsedWatchedFilms.splice(index, 1)
    }
  });
  dataJson = JSON.stringify(parsedWatchedFilms);
  localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
  event.target.textContent = 'add to watched'
  this.removeEventListener('click', onBtnRemoveFromWatchedClick);
  document.addEventListener('click', onBtnClick)
}


export function onBtnClick(e) {
  if (e.target.className === 'btn watched') {
    onBtnAddToWatchedClick();
    e.target.textContent = 'remove form watched'
    this.removeEventListener('click', onBtnClick);
    document.addEventListener('click', onBtnRemoveFromWatchedClick)
  }
}

document.addEventListener('click', onBtnClick);

