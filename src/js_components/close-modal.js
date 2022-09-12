import * as basicLightbox from 'basiclightbox';
import { getGenres } from './helpers';

export function onModalOpen(e, movie) {
  e.preventDefault();

  const template = document.querySelector('template');
  const lightbox = basicLightbox.create(template);
  fillMovieDetails(lightbox.element(), movie);
  lightbox.show();
  
  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      lightbox.close();
      window.removeEventListener('keydown', closeModalByEsc);
    }
  }

  const btnClose = document.querySelector('.button-close');
  const backdrop = document.querySelector('.backdrop');
  btnClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  function closeModal() {
    lightbox.close();
    btnClose.removeEventListener('click', closeModal);
  }
}

function fillMovieDetails(template, movie) {
  console.log('movie', movie)
  template.querySelector(".movie-title").innerHTML = movie.title;
  template.querySelector(".about-text").innerHTML = movie.overview;
  template.querySelector(".vote").innerHTML = movie.vote_average;
  template.querySelector(".votes").innerHTML = movie.vote_count;
  template.querySelector(".popularity").innerHTML = movie.popularity;
  template.querySelector(".original-title").innerHTML = movie.title;
  template.querySelector(".movie-genres").innerHTML = getGenres(movie.genre_ids);
  template.querySelector(".modalfoto-img").src = `https://www.themoviedb.org/t/p/w780${movie.poster_path}`
}