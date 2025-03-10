import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

import Swiper, { Navigation, Keyboard } from 'swiper';
import 'swiper/css';


 document.addEventListener("DOMContentLoaded", function () {
  const accordion = new Accordion(".accordion-container", {
    duration: 400,
    showMultiple: false, 
    openOnInit: [0],
  });

  document.querySelectorAll(".ac-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector(".icon-arrow-down");

      document.querySelectorAll(".icon-arrow-down").forEach((i) => i.classList.remove("rotated"));

      if (!this.closest(".ac").classList.contains("is-active")) {
        icon.classList.add("rotated");
      }
    });
  });
});

// ================================

window.addEventListener('load', () => {
  const swiper = new Swiper('.skills-swiper', {
    modules: [Navigation, Keyboard],
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      768: { slidesPerView: 3 },
      1440: { slidesPerView: 6 },
    },
  });
});


