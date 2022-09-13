import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { getGenres } from './helpers';
const refs = {
  gallery: document.querySelector('.gallery'),
  template: document.querySelector('template'),
};

const lightbox = basicLightbox.create(refs.template);
const renderModal = (template, movie) => {
  template.querySelector('.movie-title').innerHTML = movie.title;
  template.querySelector('.about-text').innerHTML = movie.overview;
  template.querySelector('.vote').innerHTML = movie.vote_average;
  template.querySelector('.votes').innerHTML = movie.vote_count;
  template.querySelector('.popularity').innerHTML = movie.popularity;
  template.querySelector('.original-title').innerHTML = movie.title;
  template.querySelector('.movie-genres').innerHTML = getGenres(
    movie.genre_ids
  );
  template.querySelector(
    '.modalfoto-img'
  ).src = `https://www.themoviedb.org/t/p/w780${movie.poster_path}`;
  const btnClose = document.querySelector('.modalfilm-button-close');

  btnClose.addEventListener('click', closeModal);
  function closeModal() {
    lightbox.close();
    btnClose.removeEventListener('click', closeModal);
  }
};
const onGalleryClick = e => {
  const data = JSON.parse(e.target.closest('.js-item').dataset.movie);
  lightbox.show();
  renderModal(lightbox.element(), data);
};

const onBtnAddToWatchedClick = e => {};

function onBtnClick(e) {
  // console.log(e.target.className);
  if (e.target.className === 'btn watched') {
    onBtnAddToWatchedClick();
  }
}

refs.gallery.addEventListener('click', onGalleryClick);
document.addEventListener('click', onBtnClick);
