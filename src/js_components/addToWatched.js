const data = { a: 2, b: 3, c: 4 };
console.log(data);

let watchedFilms = [];
let parsedWatchedFilms = [];
let dataJson = [];
const LOCALSTORAGE_KEY = 'watched-movies';

function onBtnAddToWatchedClick() {
  watchedFilms = localStorage.getItem(LOCALSTORAGE_KEY);
  parsedWatchedFilms = JSON.parse(watchedFilms);

  if (parsedWatchedFilms) {
    parsedWatchedFilms.push(data);
    dataJson = JSON.stringify(parsedWatchedFilms);
    localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
  } else {
    parsedWatchedFilms = [data];
    dataJson = JSON.stringify(parsedWatchedFilms);
    localStorage.setItem(LOCALSTORAGE_KEY, dataJson);
  }
}

// const btnWatched = document.querySelector('.load-more');
// btnWatched.addEventListener('click', onBtnAddToWatchedClick);

function onBtnClick(e) {
  console.log(e.target.className);
  if (e.target.className === 'btn watched') {
    onBtnAddToWatchedClick();
  }
}
document.addEventListener('click', onBtnClick);
// window.addEventListener('click', onBtnClick);
