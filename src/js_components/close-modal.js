import * as basicLightbox from 'basiclightbox';

import 'basiclightbox/dist/basicLightbox.min.css';
import { getGenres } from './helpers';

document.querySelector('.gallery').addEventListener('click', onModalClick);

export let data;

function onModalClick(e) {
  e.preventDefault();

  const item = e.target.closest('.gallery-item');
  if (!item) return;

  data = JSON.parse(item.dataset.movie);

  const template = document.querySelector('template');
  const lightbox = basicLightbox.create(template, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
    },
    onClose: () => {
      document.body.style.overflow = 'visible';
    },
  });
  fillMovieDetails(lightbox.element(), JSON.parse(item.dataset.movie));
  lightbox.show();

  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      lightbox.close();
      window.removeEventListener('keydown', closeModalByEsc);
    }
  }

  const btnClose = document.querySelector('.button-close');
  btnClose.addEventListener('click', closeModal);
  function closeModal() {
    lightbox.close();
    btnClose.removeEventListener('click', closeModal);
  }
}

function fillMovieDetails(template, movie) {
  console.log(movie);
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

  template
    .querySelector('button[data-watched]')
    .addEventListener('click', function () {});

  template
    .querySelector('button[data-queue]')
    .addEventListener('click', function () {});
}
