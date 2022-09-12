import { Loading } from 'notiflix/build/notiflix-loading-aio';
console.log(Loading);

/*import refs from "./getRefs";
console.log(refs);*/


const loadingMoreBtn = document.querySelector('.load-more-button');

/*loadingMoreBtn.addEventListener('click', () => {
    //loadMore(renderTrendMovies, currentPage);
    console.log('1');
});*/

console.log(loadingMoreBtn);

/*loadingMoreBtn.addEventListener('click', () => {
    //loadMore(renderTrendMovies, currentPage);
    console.log('1');
});*/

export default function loading() {

    const options = {
        svgColor: '#ff001b',
        svgSize: '120px',
    }

    Loading.dots(options);

    removeLoading();
}

function removeLoading() {
    setTimeout(Loading.remove, 500);
}

loading();