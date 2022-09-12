import imgApiServise from './fetch_on_info_film';
import createMarkup from './markup_Info';

// const axios = require('axios');
const refs = {
  kard_info: document.querySelector('#galerry_bagdrop'),
};

const filmAPIServise = new imgApiServise();
const url =
  'https://api.themoviedb.org/3/movie/550?api_key=d2a88fddf770104947ab56d85554b479';

function loadImg() {
  filmAPIServise.fetchImg().then(data => {
    console.log(data);
    console.log(data.backdrop_path);
    console.log(data.backdrop_path);
    console.log(data.backdrop_path);
    console.log(data.backdrop_path);
    const markup = createMarkup(data);
    renderGallery(markup);

    addToLocalStorage(data);
  });
}

const renderGallery = markup => {
  refs.kard_info.insertAdjacentHTML('beforeend', markup);
};
loadImg();

export function addToLocalStorage(data) {
  console.log(data);
  return data;
}
