// Import required packages, entities and modules
const axios = require('axios');
import { API_KEY } from './trendMoviesCards';
import { movieCard } from './trendMoviesCards';
import { loadingMore } from './trendMoviesCards';
import getRefs from './getRefs';

// Initializing references to DOM elements
const refs = getRefs();

// Variable declaration
let querySearch = '';
let pageQuery;

// Add eventListener to the form
refs.form.addEventListener('submit', onSearchMovie);

//Function for requesting and receiving data from the server
export async function fetchMovies(query, page) {
  const response = await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return response;
}

// Function that run on the form submit
export function onSearchMovie(e) {
  e.preventDefault();
  refs.loadMoreBtn.removeEventListener('click', loadMoreMovies);
  pageQuery = 1;
  refs.alert.classList.add('is-hidden');
  querySearch = e.target.elements.query.value.trim();
  if (!querySearch) {
    return;
  } else {
    e.target.elements.query.value = '';
    refs.loadMoreBtn.removeEventListener('click', loadingMore);
    refs.loadMoreBtn.addEventListener('click', loadMoreMovies);
    renderSearchMovies(querySearch);
  }
}

// A function that render markup when form submit
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

// Function that render markup when more movies need to be loaded
function renderLoadMoreMovies(query, page) {
  fetchMovies(query, page)
    .then(({ data }) => {
      const movies = data.results;
      pageQuery += 1;
      return refs.gallery.insertAdjacentHTML('beforeend', movieCard(movies));
    })
    .catch(error => console.log(error));
}

// Function that is executed when the loadMoreBtn is clicked
function loadMoreMovies() {
  return renderLoadMoreMovies(querySearch, pageQuery);
}
