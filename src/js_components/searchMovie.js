const axios = require('axios');
import { API_KEY } from './trendMoviesCards';
import { movieCard } from './trendMoviesCards';
import { renderTrendMovies } from './trendMoviesCards';
import { loadMore } from './loadMore';
import getRefs from './getRefs';

const refs = getRefs();
let querySearch = '';
let pageQuery;

refs.form.addEventListener('submit', onSearchMovie);

export function onSearchMovie(e) {
  e.preventDefault();
  pageQuery = 1;
  refs.alert.classList.add('is-hidden');
  querySearch = e.target.elements.query.value.trim();
  if (!querySearch) {
    return;
  } else {
    e.target.elements.query.value = '';
    refs.loadMoreBtn.removeEventListener('click', () => {
      loadMore(renderTrendMovies);
    });
    refs.loadMoreBtn.addEventListener('click', () => {
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
        refs.alert.classList.remove('is-hidden');
        return;
      } else {
        refs.gallery.innerHTML = '';
        pageQuery += 1;
        return refs.gallery.insertAdjacentHTML('beforeend', movieCard(movies));
      }
    })
    .catch(error => console.log(error));
}

function renderLoadMoreMovies(query, page) {
  fetchMovies(query, page)
    .then(({ data }) => {
      const movies = data.results;
      pageQuery += 1;
      return refs.gallery.insertAdjacentHTML('beforeend', movieCard(movies));
    })
    .catch(error => console.log(error));
}
