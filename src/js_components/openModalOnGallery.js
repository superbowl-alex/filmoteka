import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { getGenres } from './helpers';
import { scroll } from '../library';

const refs = {
  gallery: document.querySelector('.gallery'),
  template: document.querySelector('template'),
};

refs.gallery.addEventListener('click', onGalleryClick);

let data;

function onGalleryClick(e) {
  const item = e.target.closest('.js-item');
  if (!item) return;
  data = JSON.parse(item.dataset.movie);

  const lightbox = basicLightbox.create(refs.template, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
      scroll.lock();
    },
    onClose: () => {
      document.body.style.overflow = 'visible';
      scroll.unlock();
    },
  });

  renderModal(lightbox.element(), data);
  lightbox.show();

  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      lightbox.close();
      window.removeEventListener('keydown', closeModalByEsc);
    }
  }

  const btnClose = document.querySelector('.modalfilm-button-close');
  btnClose.addEventListener('click', closeModal);
  function closeModal() {
    lightbox.close();
    btnClose.removeEventListener('click', closeModal);
  }
}

function renderModal(template, movie) {
  template.querySelector('.movie-title').innerHTML = movie.title;
  template.querySelector('.about-text').innerHTML = movie.overview;
  template.querySelector('.vote').innerHTML = movie.vote_average.toFixed(1);
  template.querySelector('.votes').innerHTML = movie.vote_count;
  template.querySelector('.popularity').innerHTML = movie.popularity.toFixed(1);
  template.querySelector('.original-title').innerHTML = movie.title;
  template.querySelector('.movie-genres').innerHTML = getGenres(
    movie.genre_ids
  );
  template.querySelector('.btn.watched').innerHTML = 'remove from watched'

  if (movie.poster_path) {
    const modal = template.querySelector('.modalfoto-img');
    modal.src = `https://www.themoviedb.org/t/p/w780${movie.poster_path}`;
  } else {
    const modal = template.querySelector('.modalfoto-img');
    modal.style.display = 'none';

    const placeholder = template.querySelector('.gallery-item__placeholder');
    placeholder.style.display = 'flex';
  }
}


/////////
const LOCALSTORAGE_KEY_WATCH = 'watched-movies';


function onBtnAddToWatchedClick() {
  document.querySelector('.btn.watched').innerHTML = 'remove from watched'
  watchedFilms = localStorage.getItem(LOCALSTORAGE_KEY_WATCH);
  parsedWatchedFilms = JSON.parse(watchedFilms);

  if (parsedWatchedFilms) {
    const hasMovie = parsedWatchedFilms.find(
      parsedWatchedFilm => parsedWatchedFilm.id === data.id
    );

    parsedWatchedFilms.push(data);
    dataJson = JSON.stringify(parsedWatchedFilms);
    localStorage.setItem(LOCALSTORAGE_KEY_WATCH, dataJson);
  } else {
    parsedWatchedFilms = [data];
    dataJson = JSON.stringify(parsedWatchedFilms);
    localStorage.setItem(LOCALSTORAGE_KEY_WATCH, dataJson);
  }
}

function onWatchBtnClick(e) {
  if (e.target.className === 'btn watched') {
    if (e.target.innerHTML === 'remove from watched') {
      removeFromWatched();
      return;
    }
    onBtnAddToWatchedClick()
  }
}

document.addEventListener('click', onWatchBtnClick);

function removeFromWatched() {
  const watchItem = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_WATCH));
  localStorage.setItem(
    LOCALSTORAGE_KEY_WATCH,
    JSON.stringify(watchItem.filter(item => item.id !== data.id))
  );
  document.querySelector('.btn.watched').innerHTML = 'add to watched';
}


/////////////
const LOCALSTORAGE_KEY_QUEUE = 'queue-movies';

function onBtnAddToQueueClick() {
  document.querySelector('.btn.queue').innerHTML = 'remove from queue'

  queueFilms = localStorage.getItem(LOCALSTORAGE_KEY_QUEUE);
  parsedQueueFilms = JSON.parse(queueFilms);

  if (parsedQueueFilms) {
    const hasMovie = parsedQueueFilms.find(
      parsedQueueFilm => parsedQueueFilm.id === data.id
    );

    parsedQueueFilms.push(data);
    dataJson = JSON.stringify(parsedQueueFilms);
    localStorage.setItem(LOCALSTORAGE_KEY_QUEUE, dataJson);
  } else {
    parsedQueueFilms = [data];
    dataJson = JSON.stringify(parsedQueueFilms);
    localStorage.setItem(LOCALSTORAGE_KEY_QUEUE, dataJson);
  }
}

function onQueueBtnClick(e) {
  if (e.target.className === 'btn queue') {
    if(e.target.innerHTML === 'remove from queue') {
      removeFromQueue()
      return
    }
    onBtnAddToQueueClick();
  }
}

document.addEventListener('click', onQueueBtnClick);

function removeFromQueue() {
  const queueItem = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_QUEUE))
  localStorage.setItem(LOCALSTORAGE_KEY_QUEUE, JSON.stringify(queueItem.filter(item => item.id !== data.id)))
  document.querySelector('.btn.queue').innerHTML = 'add to queue'
}
