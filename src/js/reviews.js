import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { Navigation, Keyboard } from 'swiper/modules';

const refs = {
  reviewsList: document.querySelector('.reviews-card-list'),
  stubReviews: document.querySelector('.reviews-not-found'),
  reviewsSection: document.querySelector('.reviews'),
  prevButton: document.querySelector('.reviews-button.swiper-button-prev'),
  nextButton: document.querySelector('.reviews-button.swiper-button-next'),
  reviewsBtnBox: document.querySelector('.reviews-btn-box'),
};

let reviewsServerError = false;
let noReviewsError = false;

// ====================================Main Logic===================================

refs.reviewsBtnBox.addEventListener('mousedown', e => {
  if (e.target === e.currentTarget) {
    return;
  }
  setTimeout(() => e.target.closest('button').blur(), 0);
});

const swiper = new Swiper('.reviews-card-container.swiper', {
  modules: [Navigation, Keyboard],
  slidesPerView: 1,
  speed: 1000,
  navigation: {
    nextEl: '.reviews-button.swiper-button-next',
    prevEl: '.reviews-button.swiper-button-prev',
  },
  spaceBetween: 16,
  breakpoints: {
    768: { slidesPerView: 2 },
    1440: { slidesPerView: 4 },
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  on: {
    slideChange: function () {
      checkNavigationButtons(swiper);
    },
  },
});

getReviews()
  .then(reviewsData => {
    if (!reviewsData || reviewsData.length === 0) {
      showReviewsStub();
      noReviewsError = true;
    } else {
      renderReviews(reviewsData);
      swiper.update();
    }
  })
  .catch(() => {
    showReviewsStub();
    reviewsServerError = true;
  });

const observer = new IntersectionObserver(handleReviewsSection, {
  root: null,
  threshold: 0.2,
});

observer.observe(refs.reviewsSection);

// ====================================API===================================

async function getReviews() {
  axios.defaults.baseURL = 'https://portfolio-js.b.goit.study/api';
  const END_POINT = '/reviews';
  const fetchedReviews = await axios.get(END_POINT);
  return fetchedReviews.data;
}

// ====================================Functions===================================

function checkNavigationButtons(swiper) {
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

function reviewsTemplate({ author, avatar_url: avatar, _id: id, review }) {
  return `<li class="reviews-card-item swiper-slide"
                tabindex="${id - 1}"
                aria-label="review ${id}"
              >
                <img
                  class="reviews-card-image"
                  src="${avatar}"
                  alt="photo of ${author}"
                  width="48"
                  height="48"
                />
                <h3 class="reviews-card-heading">${author}</h3>
                <p class="reviews-card-text">${review}</p>`;
}

function reviewsTemplates(reviews) {
  return reviews.map(reviewsTemplate).join('');
}

function renderReviews(reviews) {
  const markup = reviewsTemplates(reviews);
  refs.reviewsList.innerHTML = markup;
}

function showReviewsStub() {
  refs.stubReviews.classList.remove('visually-hidden');
}

function handleReviewsSection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.disconnect();
      if (reviewsServerError) {
        iziToast.error({
          position: 'topRight',
          message: `Server not responding, please try later`,
        });
      }
      if (noReviewsError) {
        iziToast.info({
          position: 'topRight',
          message: `We're sorry, there are no reviews yet`,
        });
      }
    }
  });
}
