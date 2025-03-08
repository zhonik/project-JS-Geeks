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

refs.form.addEventListener('submit', handleFormSubmit);
refs.emailInput.addEventListener('input', handleEmailInput);
refs.commentInput.addEventListener('blur', handleCommentInput);
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

let fullCommentText = '';

// ======== LOGIC ========

async function handleFormSubmit(e) {
  e.preventDefault();

  const email = e.target.elements['user-email'].value.trim();
  const comment = e.target.elements['user-comment'].value.trim();

  if (!email || !comment) {
    iziToast.info({
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
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please, try again',
    });
    console.log(error);
  }
}

function handleEmailInput() {
  const emailInput = this.value;
  const pattern = new RegExp(this.getAttribute('pattern'));
  const isValid = pattern.test(this.value);

  if (emailInput.length === 0) {
    hideSuccessMessage();
    hideErrorMessage();
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
  fullCommentText = refs.commentInput.value;
  const maxLength = refs.commentInput.getAttribute('data-maxlength');
  const numberMaxLength = parseInt(maxLength);

  if (maxLength && fullCommentText.length > maxLength) {
    refs.commentInput.value = formatMessage(fullCommentText, numberMaxLength);
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

// ======== MODAL ========

function openModal() {
  refs.modalBackdrop.classList.add('is-open');
  document.addEventListener('keydown', onEscapePress);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  refs.modalBackdrop.classList.remove('is-open');
  document.removeEventListener('keydown', onEscapePress);
  document.body.style.overflow = 'auto';
}

function onEscapePress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

// ======== VALID INPUT MESSAGES ========

function showSuccessMessage() {
  refs.successMessage.classList.remove('fade-out');
  refs.successMessage.classList.add('fade-in');
}

function hideSuccessMessage() {
  refs.successMessage.classList.remove('fade-in');
  refs.successMessage.classList.add('fade-out');
}

function showErrorMessage() {
  refs.errorMessage.classList.remove('fade-out');
  refs.errorMessage.classList.add('fade-in');
}

function hideErrorMessage() {
  refs.errorMessage.classList.remove('fade-in');
  refs.errorMessage.classList.add('fade-out');
}

// ======== VALID COMMENT LENGTH ========

function formatMessage(message, maxLength) {
  if (message.length > maxLength) {
    const visibleLength = maxLength - 3;
    return message.slice(0, visibleLength) + '...';
  }
  return message;
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
