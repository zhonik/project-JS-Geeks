import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Keyboard } from 'swiper/modules';

const refs = {
  prevButton: document.querySelector('.projects-btn.swiper-button-prev'),
  nextButton: document.querySelector('.projects-btn.swiper-button-next'),
  projectsBtnBox: document.querySelector('.projects-btn-box'),
};

const swiper = new Swiper('.projects-container.swiper', {
  modules: [Navigation, Keyboard],
  slidesPerView: 1,
  speed: 1000,
  loop: false,
  navigation: {
    nextEl: '.projects-btn.swiper-button-next',
    prevEl: '.projects-btn.swiper-button-prev',
  },
  spaceBetween: 32,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  on: {
    init: updateNavButtons,
    slideChange: updateNavButtons,
  },
});

// ============= Main Logic ================

refs.projectsBtnBox.addEventListener('mousedown', e => {
  if (e.target === e.currentTarget) {
    return;
  }
  setTimeout(() => e.target.closest('button').blur(), 0);
});

function updateNavButtons(swiper) {
  if (swiper.isBeginning) {
    refs.prevButton.setAttribute('disabled', 'true');
  } else {
    refs.prevButton.removeAttribute('disabled');
  }

  if (swiper.isEnd) {
    refs.nextButton.setAttribute('disabled', 'true');
  } else {
    refs.nextButton.removeAttribute('disabled');
  }
}
