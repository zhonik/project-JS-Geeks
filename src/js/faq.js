document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length === 0) {
    return;
  }

  const applyMobilePadding = answer => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      answer.style.padding = '26px 0';
    } else {
      answer.style.padding = '16px 0';
    }
  };

  const applyDesktopPadding = () => {
    faqItems.forEach((item, index) => {
      if (index >= 3 && window.matchMedia('(min-width: 1440px)').matches) {
        item.style.paddingLeft = '32px';
      } else {
        item.style.paddingLeft = '';
      }
    });
  };

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const answer = item.querySelector('.faq-answer');
    const button = item.querySelector('.toggle-btn');
    const icon = button.querySelector('svg');

    if (!header || !answer || !button || !icon) {
      return;
    }

    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.opacity = '0';
    answer.style.transform = 'translateY(-20px)';

    header.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherButton = otherItem.querySelector('.toggle-btn');
        const otherIcon = otherButton.querySelector('svg');

        if (otherAnswer && otherAnswer !== answer) {
          otherAnswer.style.maxHeight = '0';
          otherAnswer.style.opacity = '0';
          otherAnswer.style.transform = 'translateY(-20px)';
          otherAnswer.style.overflow = 'hidden';
          otherAnswer.classList.remove('open');
          otherIcon.classList.remove('rotated');
        }
      });

      if (!isOpen) {
        answer.style.setProperty(
          'max-height',
          `${answer.scrollHeight}px`,
          'important'
        );
        answer.style.opacity = '1';
        answer.style.transform = 'translateY(0)';
        answer.style.overflow = 'visible';
        applyMobilePadding(answer);
        answer.classList.add('open');
        icon.classList.add('rotated');
      } else {
        answer.style.setProperty('max-height', '0', 'important');
        answer.style.opacity = '0';
        answer.style.transform = 'translateY(-20px)';
        answer.style.overflow = 'hidden';
        answer.style.padding = '0';
        answer.classList.remove('open');
        icon.classList.remove('rotated');
      }
    });
  });

  applyDesktopPadding();
  window.addEventListener('resize', () => {
    applyDesktopPadding();

    faqItems.forEach(item => {
      const answer = item.querySelector('.faq-answer');
      if (answer && answer.classList.contains('open')) {
        applyMobilePadding(answer);
      }
    });
  });
});
