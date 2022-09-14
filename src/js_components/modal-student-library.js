import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { scroll } from '../library';

document.querySelector('.footer-students').addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  const template = document.querySelector('template[data-students]');
  console.log(template)
  const lightbox = basicLightbox.create(template, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
      scroll.lock();
    },
    onClose: () => {
      document.body.style.overflow = 'visible';
      scroll.unlock();
    },
  });

  lightbox.show();

  window.addEventListener('keydown', closeModalByEsc);
  function closeModalByEsc(e) {
    if (e.code === 'Escape') {
      lightbox.close();
      window.removeEventListener('keydown', closeModalByEsc);
    }
  }

  const btnClose = document.querySelector('.button-close');
  btnClose.addEventListener('click', closeModal);
  function closeModal() {
    lightbox.close();
    btnClose.removeEventListener('click', closeModal);
  }
}
