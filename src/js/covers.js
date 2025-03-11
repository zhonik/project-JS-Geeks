const refs = {
  coversSection: document.querySelector('#covers'),
  coversImage: document.querySelectorAll('.covers-image'),
};

function animateCovers(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.coversImage.forEach(item => {
        item.classList.add('animated');
      });
    } else {
      refs.coversImage.forEach(item => {
        item.classList.remove('animated');
      });
    }
  });
}

const observer = new IntersectionObserver(animateCovers, {
  root: null,
  threshold: 0,
});

observer.observe(refs.coversSection);
