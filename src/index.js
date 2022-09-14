const axios = require('axios');
import OnlyScroll from 'only-scrollbar';
import { renderTrendMovies } from './js_components/trendMoviesCards';
export const scroll = new OnlyScroll(document.scrollingElement, {
  damping: 0.8,
});

renderTrendMovies();
import './js_components/close-modal';
import './js_components/modal-student';
import './js_components/loading-spinner';
import './js_components/scroll-up';
import './js_components/addToWatched';
import './js_components/addToQueue';
import './js_components/searchMovie';
