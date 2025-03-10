document.addEventListener('DOMContentLoaded', function () {
  const scrollToTopButton = document.getElementById('scrollToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      scrollToTopButton.classList.add('show');
    } else {
      scrollToTopButton.classList.remove('show');
    }
  });

  scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
