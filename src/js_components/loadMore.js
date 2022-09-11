// Копіюємо це!
// import { loadMore } from './loadMore';
// import { addLoadMoreBtn } from './addLoadMoreBtn';
// ...
// const loadMoreBtn = document.querySelector('.load-more-button');
// loadMoreBtn.addEventListener('click', () => {
//     loadMore(функція, що рендерить картки)
// })

import { addLoadMoreBtn } from "./addLoadMoreBtn";

export let currentPage = 1;

// const value = null;
// const pageNumber = value / 20;
//це я продумую варіанти

export function loadMore(fetchFunction) {
    //
    // if (pageNumber < currentPage) {
    //     loadMoreBtn.removeEventListuner('click', () => {
    //         loadMore(something)
    //     })
    //     loadMoreEl.remove()
    // }
    currentPage += 1;
    fetchFunction(currentPage)
    // renderFunvtion();
}
