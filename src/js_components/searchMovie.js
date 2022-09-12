// Import required packages, entities and modules
const axios = require('axios');
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { loadMore, API_KEY, getMovieElements } from './trendMoviesCards';
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
      totalPages = data.total_pages;
      if (movies.length === 0) {
        refs.alert.classList.remove('is-hidden');
        return;
      } else {
        refs.gallery.innerHTML = '';
        const elements = getMovieElements(movies);
        elements.forEach(element =>
          refs.gallery.insertAdjacentElement('beforeend', element)
        );
        if (totalPages === pageQuery) {
          warningEndCollection();
          removeLoadMoreBtn(loadMoreMovies);
        }
        pageQuery += 1;
      }
    })
    .catch(error => console.log(error));
}

// Function that render markup when more movies need to be loaded
function renderLoadMoreMovies(query, page) {
  fetchMovies(query, page)
    .then(({ data }) => {
      const movies = data.results;
      const elements = getMovieElements(movies);
      elements.forEach(element =>
        refs.gallery.insertAdjacentElement('beforeend', element)
      );
      if (totalPages === pageQuery) {
        warningEndCollection();
        removeLoadMoreBtn(loadMoreMovies);
      }
      pageQuery += 1;
    })
    .catch(error => console.log(error));
}

// Function that is executed when the loadMoreBtn is clicked
export function loadMoreMovies() {
  renderLoadMoreMovies(querySearch, pageQuery);
}

// Function that warns that we have reached the end of the collection
function warningEndCollection() {
  return Notiflix.Notify.failure(`This is the last page`, {
    width: '400px',
    svgSize: '120px',
    fontSize: '18px',
    timeout: 2000,
  });
}
