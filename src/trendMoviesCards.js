import axios from 'axios';
import { genres } from './Genres/genres.json';

const gallery = document.querySelector('.gallery');
const API_KEY = '6308d1a98819d8ffdd4916cbcea5cd95';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

async function fetchTrendingMovies() {
  const response = await axios(`/trending/movie/day?api_key=${API_KEY}`);
  return await response.data;
}

export async function renderTrendMovies() {
  try {
    const response = await fetchTrendingMovies();
    const movies = await response.results;
    return gallery.insertAdjacentHTML('beforeend', movieCard(movies));
  } catch (error) {
    console.log(error);
  }
}

export function movieCard(movies) {
  return movies
    .map(({ original_title, release_date, id, poster_path, genre_ids }) => {
      const genresArray = [];
      const movieGenres = '';
      const movieRelease = new Date(release_date).getFullYear();
      genre_ids.map(id => {
        return genres.find(el => {
          if (el.id === id) return genresArray.push(el.name);
        });
      });
      if (genresArray.length > 2) {
        movieGenres = `${genresArray[0]}, ${genresArray[1]}, Other`;
      } else {
        movieGenres = `${genresArray.join(', ')}`;
      }
      const image = poster_path
        ? `<div class="gallery-item__image-wrap">
              <img class="gallery-item__image"
                    src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}"
                    loading="lazy"
                    alt="${original_title}"
                    data-id="${id}"/>
            </div>`
        : `<div class="gallery-item__placeholder" data-id="${id}">
                <svg class="gallery-item__placeholder-image" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <title>image</title>
                    <g id="icomoon-ignore">
                    </g>
                    <path d="M479.942 64c0.020 0.017 0.041 0.038 0.058 0.058v383.885c-0.017 0.020-0.038 0.041-0.058 0.058h-447.885c-0.020-0.017-0.041-0.038-0.057-0.058v-383.886c0.017-0.020 0.038-0.041 0.057-0.057h447.885zM480 32h-448c-17.6 0-32 14.4-32 32v384c0 17.6 14.4 32 32 32h448c17.6 0 32-14.4 32-32v-384c0-17.6-14.4-32-32-32v0z"></path>
                    <path d="M416 144c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48z"></path>
                    <path d="M448 416h-384v-64l112-192 128 160h32l112-96z"></path>
                </svg>     
           </div>`;

      return `
        <li class='gallery-item'>
            ${image}
            <p class="gallery-item__title">${`${original_title.toUpperCase()}`}</p>
            <p class="gallery-item__info">${`${movieGenres} | ${movieRelease}`}</p>
        </li>
          `;
    })
    .join('');
}
