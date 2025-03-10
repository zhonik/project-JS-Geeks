import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import sprite from '../img/sprite.svg';

const refs = {
  form: document.querySelector('.js-form'),
  modalBackdrop: document.querySelector('.js-modal-backdrop'),
  modalWindow: document.querySelector('.js-modal-window'),
  closeModalButton: document.querySelector('.jd-modal-close-button'),
  emailInput: document.querySelector('.js-email'),
  commentInput: document.querySelector('.js-comment'),
  successMessage: document.querySelector('.js-success-message'),
  errorMessage: document.querySelector('.js-error-messasge'),
};

refs.form.addEventListener('input', handleFormInput);
refs.form.addEventListener('submit', handleFormSubmit);
refs.emailInput.addEventListener('input', handleEmailInput);
refs.commentInput.addEventListener('input', handleCommentInput);
refs.commentInput.addEventListener('blur', formatCommentForDisplay);
refs.commentInput.addEventListener('focus', showFullCommentText);

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    refs.commentInput.value = fullCommentText;
    formatCommentForDisplay();
  }, 0);
});

refs.modalWindow.addEventListener('click', e => {
  if (e.target.closest('.js-modal-close-button')) {
    closeModal();
  }
});
refs.modalBackdrop.addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  initPage();
  formatCommentForDisplay();
});

let resizeTimeout;
const minCommentLength = 2;
const FORM_STORAGE_KEY = 'form-storage-key';
let fullCommentText = loadFromLS(FORM_STORAGE_KEY)?.comment || '';

// ======== MAIN LOGIC ========

function handleFormInput(e) {
  const email = e.currentTarget.elements['user-email'].value.trim();
  const comment = e.currentTarget.elements['user-comment'].value.trim();

  const userData = { email, comment };
  saveToLS(FORM_STORAGE_KEY, userData);
}

function initPage() {
  const formData = loadFromLS(FORM_STORAGE_KEY);
  refs.form.elements['user-email'].value = formData?.email || '';
  refs.form.elements['user-comment'].value = formData?.comment || '';
  fullCommentText = formData?.comment || '';
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const email = e.target.elements['user-email'].value.trim();
  const comment = e.target.elements['user-comment'].value.trim();

  if (!email || !comment) {
    iziToast.error({
      position: 'topRight',
      message: 'Please complete the field',
    });
    return;
  }

  const userData = {
    email: email,
    comment: fullCommentText,
  };

  try {
    const data = await createMessage(userData);

    const markup = renderModalContent(data);
    refs.modalWindow.innerHTML = markup;

    if (data) {
      hideSuccessMessage();
      hideErrorMessage();

      openModal();
      e.target.reset();
      localStorage.removeItem(FORM_STORAGE_KEY);
      fullCommentText = '';
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please, try again',
    });
    console.log(error);
  }
}

function handleEmailInput() {
  const emailInput = this.value;
  const inputPattern = this.getAttribute('pattern');
  const validPattern = new RegExp(inputPattern);
  const isValid = validPattern.test(this.value);

  if (emailInput.length === 0) {
    hideSuccessMessage();
    hideErrorMessage();

    hideEmailSuccessBorder();
    hideEmailErrorBorder();
    return;
  }

  if (!isValid) {
    hideSuccessMessage();
    showErrorMessage();
  } else {
    showSuccessMessage();
    hideErrorMessage();
  }
}

function handleCommentInput() {
  fullCommentText = refs.commentInput.value.trim();

  if (fullCommentText.length === 0) {
    hideCommentSuccessBorder();
    hideCommentErrorBorder();
    return;
  }

  if (fullCommentText.length < minCommentLength) {
    showCommentErrorBorder();
  } else {
    hideCommentErrorBorder();
    showCommentSuccessBorder();
  }
}

// ======== API ========

async function createMessage({ email, comment }) {
  const url = 'https://portfolio-js.b.goit.study/api/requests';

  const params = {
    email: email,
    comment: comment,
  };

  try {
    const response = await axios.post(url, params);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// ======== LOCAL STORAGE ========

function saveToLS(key, value) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);

  try {
    const parseData = JSON.parse(data);
    return parseData;
  } catch {
    return data;
  }
}

// ======== MODAL ========

function openModal() {
  refs.modalBackdrop.classList.add('is-open');
  document.addEventListener('keydown', onEscapePress);
  disableScroll();

  hideEmailSuccessBorder();
  hideCommentSuccessBorder();
}

function closeModal() {
  refs.modalBackdrop.classList.remove('is-open');
  document.removeEventListener('keydown', onEscapePress);
  enableScroll();
}

function onEscapePress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function disableScroll() {
  const windowWidth = window.innerWidth;
  const scrollWidth = document.documentElement.clientWidth;

  const scrollBarWidth = windowWidth - scrollWidth;

  document.body.style.paddingRight = `${scrollBarWidth}px`;
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
}

// ======== VALID INPUT MESSAGES ========

function showSuccessMessage() {
  refs.successMessage.classList.remove('fade-out');
  refs.successMessage.classList.add('fade-in');
  showEmailSuccessBorder();
}

function hideSuccessMessage() {
  refs.successMessage.classList.remove('fade-in');
  refs.successMessage.classList.add('fade-out');
  hideEmailSuccessBorder();
}

function showErrorMessage() {
  refs.errorMessage.classList.remove('fade-out');
  refs.errorMessage.classList.add('fade-in');
  showEmailErrorBorder();
}

function hideErrorMessage() {
  refs.errorMessage.classList.remove('fade-in');
  refs.errorMessage.classList.add('fade-out');
  hideEmailErrorBorder();
  showEmailSuccessBorder();
}

// ======== VALID INPUT BORDERS ========

// ----- Email input -----

function showEmailSuccessBorder() {
  refs.emailInput.style.borderColor = '#3cbc81';
}

function hideEmailSuccessBorder() {
  refs.emailInput.style.borderColor = '';
}

function showEmailErrorBorder() {
  refs.emailInput.style.borderColor = '#e74a3b';
}

function hideEmailErrorBorder() {
  refs.emailInput.style.borderColor = '';
}

// ----- Comment input -----

function showCommentSuccessBorder() {
  refs.commentInput.style.borderColor = '#3cbc81';
}

function hideCommentSuccessBorder() {
  refs.commentInput.style.borderColor = '';
}

function showCommentErrorBorder() {
  refs.commentInput.style.borderColor = '#e74a3b';
}

function hideCommentErrorBorder() {
  refs.commentInput.style.borderColor = '';
}

// ======== VALID COMMENT LENGTH ========

function getTextWidth(text, font) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(text).width;
}

function formatCommentForDisplay() {
  const commentInput = refs.commentInput;

  if (!commentInput) return;
  if (commentInput.offsetWidth === 0) return;

  const inputWidth = commentInput.getBoundingClientRect().width;
  const computedStyle = window.getComputedStyle(commentInput);

  const fontWeight = computedStyle.fontWeight;
  const fontSize = computedStyle.fontSize;
  const fontFamily = computedStyle.fontFamily;

  const font = `${fontWeight} ${fontSize} ${fontFamily}`;
  let textWidth = getTextWidth(commentInput.value.trim(), font);

  const inputPadding = 12;

  if (textWidth > inputWidth - inputPadding) {
    let truncatedText = refs.commentInput.value.trim();

    while (
      getTextWidth(truncatedText + '...', font) > inputWidth - inputPadding &&
      truncatedText.length > 0
    ) {
      truncatedText = truncatedText.slice(0, -1);
    }

    refs.commentInput.value = truncatedText + '...';
  } else {
    refs.commentInput.value = fullCommentText;
  }
}

function showFullCommentText() {
  if (!refs.commentInput.value) return;
  refs.commentInput.value = fullCommentText;
}

// ======== RENDER ========

function renderModalContent({ title, message }) {
  return `<button class="modal-close-button js-modal-close-button" type="submit">
            <svg class="icon-modal-close" width="24" height="24">
                 <use xlink:href="${sprite}#x"></use>
            </svg>
        </button>
        <h2 class="modal-title">${title}</h2>
        <p class="modal-text">${message}</p>`;
}
