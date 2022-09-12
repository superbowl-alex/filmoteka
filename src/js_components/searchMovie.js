// Import required packages, entities and modules
const axios = require('axios');
import { loadMore, API_KEY, movieCard } from './trendMoviesCards';
import { addLoadMoreBtn, removeLoadMoreBtn } from './load-more-button';
import getRefs from './getRefs';


// Initializing references to DOM elements
const refs = getRefs();

// Variable declaration
let querySearch = '';
let pageQuery;
let totalPages = null;

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
  pageQuery = 1;
  refs.alert.classList.add('is-hidden');
  querySearch = e.target.elements.query.value.trim();
  if (!querySearch) {
    return;
  } else {
    e.target.elements.query.value = '';
    renderSearchMovies(querySearch);
    removeLoadMoreBtn(loadMore);
    addLoadMoreBtn();
    const loadMoreBtn = document.querySelector('.load-more-button');
    loadMoreBtn.addEventListener('click', () => {
      loadMoreMovies();
    });
  }
}

// A function that render markup when form submit
function renderSearchMovies(query) {
  fetchMovies(query, pageQuery)
    .then(({ data }) => {
      let movies = data.results;
      totalPages = data.total_pages
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
export function loadMoreMovies() {
  renderLoadMoreMovies(querySearch, pageQuery);
  if (pageQuery >= totalPages) {
    removeLoadMoreBtn(loadMoreMovies);
    return;
  }
}
