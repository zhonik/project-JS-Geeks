document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const toggleButton = item.querySelector('.toggle-btn');
    const answer = item.querySelector('.faq-answer');

    toggleButton.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
        openAnswer.classList.remove('open');
        openAnswer.style.maxHeight = null;

        const otherToggleButton = openAnswer
          .closest('.faq-item')
          .querySelector('.toggle-btn');
        otherToggleButton.classList.remove('open');
      });

      if (!isOpen) {
        answer.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        toggleButton.classList.add('open');
      } else {
        answer.classList.remove('open');
        answer.style.maxHeight = null;
        toggleButton.classList.remove('open');
      }
    });
  });
});
