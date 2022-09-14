import { Loading } from 'notiflix/build/notiflix-loading-aio';

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