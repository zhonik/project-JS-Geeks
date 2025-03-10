const coversSection = document.querySelector('#covers');
const coversWrapper = document.querySelector('.covers-wrapper');



function animateCovers(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      coversWrapper.classList.add('animated');
    } else {
      coversWrapper.classList.remove('animated');
    }
  });
}

const observer = new IntersectionObserver(animateCovers, {
  root: null,
  threshold: 0,
});

observer.observe(coversSection);

function showImage(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const image = event.target.currentSrc;

  const instance = basicLightbox.create(
    `<div class="covers-full-image-wrapper">
      <img
        src="${image}"
        alt="${event.target.alt}"
        class="covers-full-image"
      />
      <button class="covers-close-button"></button>
    </div>`,
    {
      onShow: instance => {
        window.addEventListener('keydown', closeOnEscape);

        const closeButton = instance.element().querySelector('.covers-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            instance.close();
          });
        }
      },
      onClose: instance => {
        window.removeEventListener('keydown', closeOnEscape);
      },
    }
  );

  instance.show();

  function closeOnEscape(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}

coversWrapper.addEventListener('click', showImage);