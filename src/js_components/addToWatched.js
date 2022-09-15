import Notiflix from 'notiflix';
import { data } from './close-modal';

let watchedFilms = [];
let parsedWatchedFilms = [];
let dataJson = [];
const LOCALSTORAGE_KEY = 'watched-movies';

function onBtnAddToWatchedClick() {
  document.querySelector('.btn.watched').innerHTML = 'remove from watched'
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

function onBtnClick(e) {
  if (e.target.className === 'btn watched') {
    if(e.target.innerHTML === 'remove from watched') {
      removeFromWatched()
      return
    }
    onBtnAddToWatchedClick();
  }
}

document.addEventListener('click', onBtnClick);

function removeFromWatched() {
  const watchItem = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(watchItem.filter(item => item.id !== data.id)))
  document.querySelector('.btn.watched').innerHTML = 'add to watched'
}

