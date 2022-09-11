// Копіюємо це!
// import { loadMore } from './loadMore';
// import { addLoadMoreBtn } from './addLoadMoreBtn';
// ...
// const loadMoreBtn = document.querySelector('.load-more-button');
// loadMoreBtn.addEventListener('click', () => {
//     loadMore(функція, що рендерить картки)
// })

export let nextPage = 2;

export function loadMore(fetchFunction) {
    fetchFunction(nextPage)
    nextPage += 1;
}
