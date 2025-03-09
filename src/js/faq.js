document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length === 0) {
    return;
  }

  const closeOtherAnswers = currentAnswer => {
    faqItems.forEach(otherItem => {
      const otherAnswer = otherItem.querySelector('.faq-answer');
      const otherIcon = otherItem.querySelector('.toggle-btn svg');

      if (otherAnswer && otherAnswer !== currentAnswer) {
        otherAnswer.classList.remove('open');
        otherAnswer.style.transform = 'scaleY(0)';
        otherAnswer.style.height = '0';
        otherAnswer.style.overflow = 'hidden';
        otherIcon.classList.remove('rotated');
      }
    });
  };

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.toggle-btn svg');

    if (!header || !answer || !icon) {
      return;
    }

    header.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      closeOtherAnswers(answer);

      if (!isOpen) {
        answer.style.transform = 'scaleY(1)';
        answer.style.height = `${answer.scrollHeight}px`;
        answer.style.overflow = 'visible';
        answer.classList.add('open');
        icon.classList.add('rotated');
      } else {
        answer.style.transform = 'scaleY(0)';
        answer.style.height = '0';
        answer.style.overflow = 'hidden';
        answer.classList.remove('open');
        icon.classList.remove('rotated');
      }
    });
  });
});
