const axios = require('axios');
import ApiQuery from './js_components/api_query';

import { renderTrendMovies } from './js_components/trendMoviesCards';
import { onSearchMovie } from './searchMovie';

renderTrendMovies();
const form = document.querySelector('.form-header');
form.addEventListener('submit', onSearchMovie);
import './js_components/close-modal';
