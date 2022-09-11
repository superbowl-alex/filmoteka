const axios = require('axios');
import { API_KEY } from './js_components/trendMoviesCards';
import { movieCard } from './js_components/trendMoviesCards';
import { loadMore } from './js_components/trendMoviesCards';
import { addLoadMoreBtn, removeLoadMoreBtn } from './js_components/loadMore';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form-header');
const alert = document.querySelector('.search-alert');
let querySearch = '';
let pageQuery;

form.addEventListener('submit', onSearchMovie);

removeLoadMoreBtn(loadMore);
addLoadMoreBtn();
const loadMoreBtn = document.querySelector('.load-more-button');

export function onSearchMovie(e) {
  e.preventDefault();
  pageQuery = 1;
  alert.classList.add('is-hidden');
  querySearch = e.target.elements.query.value.trim();
  if (!querySearch) {
    return;
  } else {
    e.target.elements.query.value = '';
    loadMoreBtn.addEventListener('click', () => {
      renderLoadMoreMovies(querySearch, pageQuery);
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
  fetchMovies(query, pageQuery)
    .then(({ data }) => {
      let movies = data.results;
      if (movies.length === 0) {
        alert.classList.remove('is-hidden');
        return;
      } else {
        gallery.innerHTML = '';
        pageQuery += 1;
        return gallery.insertAdjacentHTML('beforeend', movieCard(movies));
      }
    })
    .catch(error => console.log(error));
}

function renderLoadMoreMovies(query, page) {
  fetchMovies(query, page)
    .then(({ data }) => {
      const movies = data.results;
      pageQuery += 1;
      return gallery.insertAdjacentHTML('beforeend', movieCard(movies));
    })
    .catch(error => console.log(error));
}
