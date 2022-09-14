import Notiflix from 'notiflix';
import { data } from './close-modal';

let queueFilms = [];
let parsedQueueFilms = [];
let dataJson = [];
const LOCALSTORAGE_KEY = 'queue-movies';

function onBtnAddToQueueClick() {
  queueFilms = localStorage.getItem(LOCALSTORAGE_KEY);
  parsedQueueFilms = JSON.parse(queueFilms);

  if (parsedQueueFilms) {
    const hasMovie = parsedQueueFilms.find(
      parsedQueueFilm => parsedQueueFilm.id === data.id
    );
    if (hasMovie) {
      Notiflix.Notify.init({
        fontSize: '16px',
        distance: '20px',
      });

      Notiflix.Notify.info('The movie is already added to your queue');
      return;
    }

    parsedQueueFilms.push(data);
    dataJson = JSON.stringify(parsedQueueFilms);
    localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
  } else {
    parsedQueueFilms = [data];
    dataJson = JSON.stringify(parsedQueueFilms);
    localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
  }
}

export function onBtnRemoveFromQueueClick(event) {
  if (event.target.className != 'btn queue') {
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
  event.target.textContent = 'add to queue'
  this.removeEventListener('click', onBtnRemoveFromQueueClick);
  document.addEventListener('click', onButtonClick)

}

export function onButtonClick(e) {
  if (e.target.className === 'btn queue') {
    onBtnAddToQueueClick();
    e.target.textContent = 'remove form queue'
    this.removeEventListener('click', onButtonClick);
    document.addEventListener('click', onBtnRemoveFromQueueClick)
  }
}

document.addEventListener('click', onButtonClick);
