import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { createElementFromHTML, getGenres } from './helpers';
import { addLoadMoreBtn, removeLoadMoreBtn } from './load-more-button';
import { loadMoreMovies } from './searchMovie'

let currentPage = 1;
let totalPages = null;

const gallery = document.querySelector('.gallery');
export const API_KEY = '6308d1a98819d8ffdd4916cbcea5cd95';

export async function fetchTrendingMovies(page = 1) {
  const response = await axios(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  return await response.data;
}

export async function renderTrendMovies(page) {
  try {
    const response = await fetchTrendingMovies(page);
    const movies = await response.results;
    totalPages = await response.total_pages;

    const elements = getMovieElements(movies);
    elements.forEach(element => gallery.insertAdjacentElement('beforeend', element));

    if (totalPages === page) {
      return Notiflix.Notify.failure(`This is the last page`, {
        width: '400px',
        position: 'right-top',
        svgSize: '120px',
        fontSize: '18px',
        timeout: 2000,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

removeLoadMoreBtn(loadMoreMovies);
addLoadMoreBtn();
const loadMoreBtn = document.querySelector('.load-more-button');

export function loadMore() {
  currentPage += 1;
  renderTrendMovies(currentPage);
  if (currentPage >= totalPages) {
    removeLoadMoreBtn(loadMore);
    return;
  }
}

loadMoreBtn.addEventListener('click', () => {
  loadMore(renderTrendMovies, currentPage);
});

export function getMovieElements(movies) {
  return movies
    .map((movie) => {
      const { original_title, release_date, id, poster_path, genre_ids } = movie
      let movieGenres = getGenres(genre_ids, true);
      const movieRelease = new Date(release_date).getFullYear();

      const image = poster_path
        ? `<div class="gallery-item__image-wrap">
              <picture>
                <source srcset="https://www.themoviedb.org/t/p/w780${poster_path} 1x, https://www.themoviedb.org/t/p/w780${poster_path} 2x" media="(min-width: 768px)" type="image/jpeg">
                <source srcset="https://www.themoviedb.org/t/p/w300${poster_path} 1x, https://www.themoviedb.org/t/p/w780${poster_path} 2x" media="(min-width: 320px)" type="image/jpeg">                           
                <img class="gallery-item__image" src="https://www.themoviedb.org/t/p/w300${poster_path}" loading="lazy" alt="${original_title}" data-id="${id}"/>/>
              </picture>
            </div>`
        : `<div class="gallery-item__placeholder" data-id="${id}">
                <svg class="gallery-item__placeholder-image" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <title>image</title>
                    <g id="icomoon-ignore">
                    </g>
                    <path d="M479.942 64c0.020 0.017 0.041 0.038 0.058 0.058v383.885c-0.017 0.020-0.038 0.041-0.058 0.058h-447.885c-0.020-0.017-0.041-0.038-0.057-0.058v-383.886c0.017-0.020 0.038-0.041 0.057-0.057h447.885zM480 32h-448c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h448c17.6 0 32-14.4 32-32v-384c0-17.6-14.4-32-32-32v0z"></path>
                    <path d="M416 144c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z"></path>
                    <path d="M448 416h-384v-64l112-192 128 160h32l112-96z"></path>
                </svg>     
           </div>`;

      const element = createElementFromHTML(`
        <li class='gallery-item'>
            ${image}
            <p class="gallery-item__title">${`${original_title.toUpperCase()}`}</p>
            <p class="gallery-item__info">${`${movieGenres} | ${movieRelease}`}</p>
        </li>
      `);

      element.dataset.movie = JSON.stringify(movie);

      return element;
    });
}
