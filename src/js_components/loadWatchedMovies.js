import { getMovieCard } from './getMovieCard';
import { addLoadMoreBtn, removeLoadMoreBtn } from './load-more-button';
import loading from '../js_components/loading-spinner';

const refs = {
  watchedBtn: document.querySelector('.js-watched-list'),
  queueBtn: document.querySelector('.js-queue-list'),
  gallery: document.querySelector('.gallery'),
};

const KEY = 'watched-movies';
//вивів markup та data oкремо, щоб в першій перевірці менше коду писати
let markup = null;
let data = null;
//змінні, що потрібні для loadMore
let totalPages = null;
let page = 1;

const changeActiveBtn = () => {
  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.add('active');
};

const onWatchedBtnClick = e => {
  changeActiveBtn();
  refs.gallery.innerHTML = '';
  data = JSON.parse(localStorage.getItem(KEY)) || [];
  //записую загальну кількість сторінок; нічого, що число не ціле, так краще
  totalPages = data.length / 20;
  if (data.length === 0) {
  }
  markup = data.map(getMovieCard);
  removeLoadMoreBtn();
  //перша перевірка - якщо фільмів більше, ніж 20, завантажує лише перші 20 штук
  if (totalPages > 1) {
    addLoadMoreBtn();
    const loadMoreBtn = document.querySelector('.load-more-button');
    loadMoreBtn.addEventListener('click', loadMoreWatchedMovies);
    markup = data.filter((film, index) => index < 20).map(getMovieCard);
  }
  refs.gallery.append(...markup);
};

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

onWatchedBtnClick();

//На кожній сторінці і на кожному типі списку (в index це "popular" та "on search";
//в library - "watched" та "queue") я просто щоразу домальовую нову кнопку та вішаю на неї потрібну функцію.
//Оскільки на одній сторінці списки можуть чергуватися, треба перевіряти та видаляти
//кнопку, що стосувалася попереднього (наприклад, після пошуку за словом кнопка зі списку "popular" вже не треба).
//У дужки треба вписати функцію, що пропишеться в addEventListener у списку "queue".
//Якщо нічого не вказати, кнопка усеодно видалиться, але слухач подій - ні.
const loadMoreBtn = document.querySelector('.load-more-button');
// loadMoreBtn.addEventListener('click', loadMoreWatchedMovies);
function loadMoreWatchedMovies() {
  page += 1;
  //різні сторінки - різні фільми
  const markup = data.filter((film, index) => index >= (page * 20 - 20) && index <= (page * 20 - 1)).map(getMovieCard);
  loading();
  refs.gallery.append(...markup);
  if (page >= totalPages) {
    //ось - видаляємо і кнопку і слухача, коли сторінки закінчилися
    removeLoadMoreBtn(loadMoreWatchedMovies)
    return;
  }
}
//коли додасться список "queue", мені треба буде зробити те ж саме там, що і тут
