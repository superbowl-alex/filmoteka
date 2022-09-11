const axios = require('axios');
import ApiQuery from './js_components/api_query';
import { renderTrendMovies } from './js_components/trendMoviesCards';
import { onSearchMovie } from './js_components/searchMovie';

renderTrendMovies();
const form = document.querySelector('.form-header');
form.addEventListener('submit', onSearchMovie);
