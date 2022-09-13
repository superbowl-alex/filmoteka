import { getMovieCard } from './getMovieCard';

const refs = {
  watchedBtn: document.querySelector('.js-watched-list'),
  queueBtn: document.querySelector('.js-queue-list'),
  gallery: document.querySelector('.gallery'),
};

const KEY = 'watched-movies';

const changeActiveBtn = () => {
  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.add('active');
};

const onWatchedBtnClick = e => {
  changeActiveBtn();
  refs.gallery.innerHTML = '';
  const data = JSON.parse(localStorage.getItem(KEY)) || [];
  if (data.length === 0) {
  }
  const markup = data.map(getMovieCard);
  refs.gallery.append(...markup);
};

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

onWatchedBtnClick();
