// Копіюємо це!
// import { loadMore } from './loadMore';
// ...
// const loadMoreBtn = document.querySelector('.load-more-button');
// loadMoreBtn.addEventListener('click', () => {
//     loadMore(функція, що рендерить картки)
// })

const footer = document.querySelector('footer');

export const loadMoreMarkup = '<div class="load-more"><button class="load-more-button" type="button">Load More</button></div> ';
export function addLoadMoreBtn() {
    footer.insertAdjacentHTML('beforebegin', loadMoreMarkup);
}

export function removeLoadMoreBtn() {
    const buttonContainer = !document.querySelector('.load-more')
    if (!document.querySelector('.load-more')) {
        return
    }
    buttonContainer.remove()
}

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
