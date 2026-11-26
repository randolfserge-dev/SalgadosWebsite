document.addEventListener('DOMContentLoaded', () => {
  // Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Filtro de Categorias do Cardápio
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      menuCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Acordeão FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      if (item) {
        item.classList.toggle('open');
      }
    });
  });

  const workCarousel = document.querySelector('.work-carousel');
  if (workCarousel) {
    const slides = Array.from(workCarousel.querySelectorAll('.work-slide'));
    const viewport = workCarousel.querySelector('.work-slides');
    const previousButton = workCarousel.querySelector('[data-work-previous]');
    const nextButton = workCarousel.querySelector('[data-work-next]');
    const counter = workCarousel.querySelector('[data-work-counter]');

    if (slides.length > 0 && viewport && previousButton && nextButton && counter) {
      let activeSlide = 0;

      const showSlide = (index) => {
        activeSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          let distance = slideIndex - activeSlide;
          if (distance > slides.length / 2) {
            distance -= slides.length;
          } else if (distance < -slides.length / 2) {
            distance += slides.length;
          }

          const positionClass = distance === 0
            ? 'is-active'
            : distance === -1
              ? 'is-prev'
              : distance === 1
                ? 'is-next'
                : distance === -2
                  ? 'is-far-prev'
                  : distance === 2
                    ? 'is-far-next'
                    : distance < 0
                      ? 'is-hidden-prev'
                      : 'is-hidden-next';

          slide.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next', 'is-hidden-prev', 'is-hidden-next');
          slide.classList.add(positionClass);
          slide.setAttribute('aria-hidden', String(distance !== 0));
        });
        counter.textContent = `${activeSlide + 1} / ${slides.length}`;
      };

      showSlide(activeSlide);
      previousButton.addEventListener('click', () => showSlide(activeSlide - 1));
      nextButton.addEventListener('click', () => showSlide(activeSlide + 1));
      window.addEventListener('resize', () => showSlide(activeSlide));
    }
  }
});
