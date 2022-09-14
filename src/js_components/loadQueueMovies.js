import { getMovieCard } from './getMovieCard';
import { Notify } from 'notiflix';
import { addLoadMoreBtn, removeLoadMoreBtn } from './load-more-button';
import loading from '../js_components/loading-spinner';

const refs = {
  watchedBtn: document.querySelector('.js-watched-list'),
  queueBtn: document.querySelector('.js-queue-list'),
  gallery: document.querySelector('.gallery'),
};

const KEY = 'queue-movies';
let markup = null;
let data = null;
let totalPages = null;
let page = 1;

const changeActiveBtn = () => {
  refs.watchedBtn.classList.remove('active');
  refs.queueBtn.classList.add('active');
};

const onQueueBtnClick = e => {
  changeActiveBtn();
  refs.gallery.innerHTML = '';
  data = JSON.parse(localStorage.getItem(KEY)) || [];
  totalPages = data.length / 20;
  if (data.length === 0) {
    Notify.info('There are no movies in your queue yet');
  }
  markup = data.map(getMovieCard);
  removeLoadMoreBtn();
  if (totalPages > 1) {
    addLoadMoreBtn();
    const loadMoreBtn = document.querySelector('.load-more-button');
    loadMoreBtn.addEventListener('click', loadMoreQueueMovies);
    markup = data.filter((film, index) => index < 20).map(getMovieCard);
  }
  refs.gallery.append(...markup);
};

refs.queueBtn.addEventListener('click', onQueueBtnClick);

onQueueBtnClick();

function loadMoreQueueMovies() {
  page += 1;
  const markup = data.filter((film, index) => index >= (page * 20 - 20) && index <= (page * 20 - 1)).map(getMovieCard);
  loading();
  refs.gallery.append(...markup);
  if (page >= totalPages) {
    removeLoadMoreBtn(loadMoreQueueMovies)
    return;
  }
}