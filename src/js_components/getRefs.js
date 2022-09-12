export default function getRefs() {
  return {
    form: document.querySelector('.form-header'),
    input: document.querySelector('.form-header_input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more-button'),
    alert: document.querySelector('.search-alert'),
    btnWatched: document.querySelector('.watched'),
  };
}
