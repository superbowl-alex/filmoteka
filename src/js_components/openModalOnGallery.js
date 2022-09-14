import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import { getGenres } from './helpers';
import { scroll } from '../library';

const refs = {
  gallery: document.querySelector('.gallery'),
  template: document.querySelector('template'),
};

refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(e) {
  const item = e.target.closest('.js-item');
  if (!item) return;
  const data = JSON.parse(item.dataset.movie);

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
};

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
  template.querySelector("div.btn-l").style.display = 'none'

  if (movie.poster_path) {
    const modal = template.querySelector('.modalfoto-img');
    modal.src = `https://www.themoviedb.org/t/p/w780${movie.poster_path}`;
  } else {
    const modal = template.querySelector('.modalfoto-img');
    modal.style.display = 'none';

    const placeholder = template.querySelector('.gallery-item__placeholder');
    placeholder.style.display = 'flex';
  }
};