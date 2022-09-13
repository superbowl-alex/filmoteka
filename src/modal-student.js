//  ------------------------скрипт №1----------------------------
// const refs = {
//     openModalBtn:document.querySelector('[data-action="open-modal"]'),
//     closeModalBtn:document.querySelector('[data-action="close-modal"]'),
//     backdrop:document.querySelector('.js-backdrop')
// };

// refs.openModalBtn.addEventListener('click', onOpenModal);
// refs.closeModalBtn.addEventListener('click', onCloseModal);
// refs.backdrop.addEventListener('click', onBackdropClick);

// function onOpenModal(){
//     window.addEventListener('keydown', onOpenModal);
//     document.body.classList.add('show-modal');
// }
// function onCloseModal(){
//     window.removeEventListener('keydown', onEscKeyPress);
//     document.body.classList.remove('show-modal');
// }
// function onBackdropClick(event){
//     if(event.currentTarget ===event.target){
//         onCloseModal() ;
//     }
// }
// function onEscKeyPress(event){
//     const ESC_KEY_CODE ='Escape';

//     if(event.code === ESC_KEY_CODE){
//         onCloseModal();
//     }
// }

//  -----------------------скрипт №3-------------------
//   (() => {
//     const refs = {
//       openModalBtn: document.querySelector("[data-modal-open]"),
//       closeModalBtn: document.querySelector("[data-modal-close]"),
//       modal: document.querySelector("[data-modal]"),
//     };

//     refs.openModalBtn.addEventListener("click", toggleModal);
//     refs.closeModalBtn.addEventListener("click", toggleModal);

//     function toggleModal() {
//       refs.modal.classList.toggle("is-hidden");
//     }
//   })();

// -----------------------скрипт №4-------------------

import * as basicLightbox from 'basiclightbox';
import OnlyScroll from 'only-scrollbar';
import 'basiclightbox/dist/basicLightbox.min.css';
// import { getGenres } from './helpers';
import { scroll } from './index';

document.querySelector('.footer-students').addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  const template = document.querySelector('.students-backdrop');
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
