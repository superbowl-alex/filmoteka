import { getMovieCard } from './getMovieCard';

const refs = {
  watchedBtn: document.querySelector('.js-watched-list'),
  gallery: document.querySelector('.gallery'),
};

const KEY = 'watched-movies';

const onWatchedBtnClick = e => {
  refs.gallery.innerHTML = '';
  const data = JSON.parse(localStorage.getItem(KEY)) || [];
  const markup = data.map(getMovieCard);
  refs.gallery.append(...markup);
};

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
