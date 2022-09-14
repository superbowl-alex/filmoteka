import { getMovieCard } from './getMovieCard';
import { Notify } from 'notiflix';
import { addLoadMoreBtn, removeLoadMoreBtn } from './load-more-button';
import loading from '../js_components/loading-spinner';
import { loadMoreQueueMovies } from './loadQueueMovies';

const refs = {
  watchedBtn: document.querySelector('.js-watched-list'),
  queueBtn: document.querySelector('.js-queue-list'),
  gallery: document.querySelector('.gallery'),
};

const KEY = 'watched-movies';
let markup = null;
let data = null;
let totalPages = null;
let page = null;

const changeActiveBtn = () => {
  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.add('active');
};

const onWatchedBtnClick = e => {
  changeActiveBtn();
  refs.gallery.innerHTML = '';
  data = JSON.parse(localStorage.getItem(KEY)) || [];
  totalPages = data.length / 20;
  page = 1;
  if (data.length === 0) {
    Notify.info('There are no movies in your watched yet');
  }
  markup = data.map(getMovieCard);
  removeLoadMoreBtn(loadMoreQueueMovies);
  if (totalPages > 1) {
    addLoadMoreBtn();
    const loadMoreBtn = document.querySelector('.load-more-button');
    loadMoreBtn.addEventListener('click', loadMoreWatchedMovies);
    markup = data.filter((film, index) => index < 20).map(getMovieCard);
  }
  refs.gallery.append(...markup);
};

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

onWatchedBtnClick();

export function loadMoreWatchedMovies() {
  page += 1;
  const markup = data.filter((film, index) => index >= (page * 20 - 20) && index <= (page * 20 - 1)).map(getMovieCard);
  loading();
  refs.gallery.append(...markup);
  if (page >= totalPages) {
    removeLoadMoreBtn(loadMoreWatchedMovies)
    return;
  }
}
