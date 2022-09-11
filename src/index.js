const axios = require('axios');
import ApiQuery from './js_components/api_query';
import headerHeight from './js-components/header-height';
import { renderTrendMovies } from './trendMoviesCards';
import { onSearchMovie } from './searchMovie';

renderTrendMovies();
const form = document.querySelector('.form-header');
form.addEventListener('submit', onSearchMovie);
