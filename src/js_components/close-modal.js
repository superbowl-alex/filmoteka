import * as basicLightbox from 'basiclightbox';
const container = document.querySelector('.gallery');
container.addEventListener('click', onClick);
let instance;

function onClick(e) {
  e.preventDefault();
  instance = basicLightbox.create(document.querySelector('template'));
  instance.show();
  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModalByEsc);
    }
  }
  const btnClose = document.querySelector('.button-close');
  const backdrop = document.querySelector('.backdrop');
  btnClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  function closeModal() {
    instance.close();
    btnClose.removeEventListener('click', closeModal);
  }
}
