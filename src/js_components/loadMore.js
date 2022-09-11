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

export function removeLoadMoreBtn(func) {
    const loadMoreBtn = document.querySelector('.load-more-button');
    const buttonContainer = document.querySelector('.load-more')
    if (!buttonContainer) {
        return
    }
    loadMoreBtn.removeEventListener('click', () => {
        func()
    })
    buttonContainer.remove()
}

export let currentPage = 1;

// const value = null;
// const pageNumber = value / 20;
//це я продумую варіанти

