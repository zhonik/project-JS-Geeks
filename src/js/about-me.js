import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Keyboard } from 'swiper/modules';

const refs = {
  nextSkillsButton: document.querySelector('.skills-btn-next'),
  aboutMeList: document.querySelector('.about-me-list'),
};

// ====================================Accordion===================================

document.addEventListener('DOMContentLoaded', () => {
  const aboutItems = document.querySelectorAll('.ac-about-me-item');

  aboutItems.forEach(item => {
    const header = item.querySelector('.about-me-ac-header');
    const button = item.querySelector('.about-me-ac-btn');
    const text = item.querySelector('.about-me-ac-panel');

    if (!button || !text) {
      return;
    }
    item.addEventListener('click', e => {
      if (e.target.classList.contains('about-me-ac-text')) return;
      button.classList.toggle('open');
      text.classList.toggle('open');
    });
  });
});

// ====================================Swiper===================================

const swiperAboutMe = new Swiper('.skills-swiper.swiper', {
  modules: [Navigation, Keyboard],
  loop: true,
  slidesPerView: 2,
  speed: 300,
  navigation: {
    nextEl: '.skills-btn-next.swiper-button-next',
  },
  breakpoints: {
    768: { slidesPerView: 3 },
    1440: { slidesPerView: 6 },
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});

refs.nextSkillsButton.addEventListener('mousedown', e => {
  if (e.target === e.currentTarget) {
    return;
  }
  setTimeout(() => e.target.closest('button').blur(), 0);
});

refs.aboutMeList.addEventListener('mousedown', e => {
  if (e.target.closest('button')) {
    if (e.target.closest('button').classList.contains('about-me-ac-btn')) {
      setTimeout(() => e.target.closest('button').blur(), 0);
    }
  }
});
