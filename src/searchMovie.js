const axios = require('axios');
import { API_KEY } from './trendMoviesCards';
import { movieCard } from './trendMoviesCards';
import { renderTrendMovies } from './trendMoviesCards';
import { loadMore } from './loadMore';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form-header');
const alert = document.querySelector('.search-alert');
let querySearch = '';
let page;

form.addEventListener('submit', onSearchMovie);

const loadMoreBtn = document.querySelector('.load-more-button');

export function onSearchMovie(e) {
  e.preventDefault();
  page = 1;
  alert.classList.add('is-hidden');
  querySearch = e.target.elements.query.value.trim();
  if (!querySearch) {
    return;
  } else {
    e.target.elements.query.value = '';
    loadMoreBtn.removeEventListener('click', loadMore);
    loadMoreBtn.addEventListener('click', () => {
      renderLoadMoreMovies(querySearch, page);
    });

    renderSearchMovies(querySearch);
  }
}

export async function fetchMovies(query, page) {
  const response = await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return response;
}

function renderSearchMovies(query) {
  fetchMovies(query, page)
    .then(({ data }) => {
      const movies = data.results;
      if (movies.length === 0) {
        alert.classList.remove('is-hidden');
        return;
      } else {
        gallery.innerHTML = '';
        page += 1;
        return gallery.insertAdjacentHTML('beforeend', movieCard(movies));
      }
    })
    .catch(error => console.log(error));
}

function renderLoadMoreMovies(query, page) {
  fetchMovies(query, page)
    .then(({ response }) => {
      const movies = response.results;
      page += 1;
      return gallery.insertAdjacentHTML('beforeend', movieCard(movies));
    })
    .catch(error => console.log(error));
}
