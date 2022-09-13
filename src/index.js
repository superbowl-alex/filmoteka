const axios = require('axios');
import ApiQuery from './js_components/api_query';
import OnlyScroll from 'only-scrollbar';
import { renderTrendMovies } from './js_components/trendMoviesCards';
import { onSearchMovie } from './js_components/searchMovie';
import getRefs from './js_components/getRefs';
const refs = getRefs();
export const scroll = new OnlyScroll(document.scrollingElement, {
    damping: 0.8,
});

renderTrendMovies();
refs.form.addEventListener('submit', onSearchMovie);
import './js_components/close-modal';
import './js_components/loading-spinner';
import './js_components/scroll-up';
import './js_components/addToWatched';
import './js_components/addToQueue'
