import OnlyScroll from 'only-scrollbar';
import { onWatchedBtnClick } from './js_components/loadWatchedMovies';
import './js_components/loadQueueMovies';
import './js_components/openModalOnGallery';
import './js_components/scroll-up';
import './js_components/modal-student-library';
import loading from './js_components/loading-spinner';

export const scroll = new OnlyScroll(document.scrollingElement, {
    damping: 0.8,
});

onWatchedBtnClick()

loading();
