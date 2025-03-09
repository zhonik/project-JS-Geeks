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
        Object.assign(otherAnswer.style, {
          transform: 'scaleY(0)',
          height: '0',
          overflow: 'hidden',
          paddingTop: '0',
          paddingBottom: '0',
        });
        otherAnswer.classList.remove('open');
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
        const paddingTop = 26;
        const paddingBottom = 0;
        const totalHeight = answer.scrollHeight + paddingTop + paddingBottom;

        Object.assign(answer.style, {
          transform: 'scaleY(1)',
          height: `${totalHeight}px`,
          overflow: 'visible',
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        });
        answer.classList.add('open');
        icon.classList.add('rotated');
      } else {
        Object.assign(answer.style, {
          transform: 'scaleY(0)',
          height: '0',
          overflow: 'hidden',
          paddingTop: '0',
          paddingBottom: '0',
        });
        answer.classList.remove('open');
        icon.classList.remove('rotated');
      }
    });
  });
});
