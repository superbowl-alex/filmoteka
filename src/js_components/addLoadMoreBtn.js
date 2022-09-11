const footer = document.querySelector('footer');

export const loadMoreMarkup = '<div class="load-more"><button class="load-more-button" type="button">Load More</button></div> ';

export function addLoadMoreBtn() {
    footer.insertAdjacentHTML('beforebegin', loadMoreMarkup);
}

addLoadMoreBtn();