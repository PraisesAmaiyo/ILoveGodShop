const btnNavEl = document.querySelector('.btn-mobile-nav');
const allLinks = document.querySelectorAll('a:link');
const headerEl = document.querySelector('.navigation-header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');

    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
      e.preventDefault();
    }

    if (link.classList.contains('main-nav-link'))
      headerEl.classList.toggle('nav-open');
  });
});

// Sticky Navigation
const navigationHeader = document.querySelector('.navigation-header');
const initialNavigation = document.querySelector('.initial-navigation');
const stickyNavigation = document.querySelector('.sticky-nav');
const sectionHero = document.querySelector('.section-hero');

document.addEventListener('DOMContentLoaded', function () {
  let lastScrollTop = 0;

  function handleScroll() {
    const scrollTop = window.scrollY;

    if (scrollTop > 40 && scrollTop > lastScrollTop) {
      navigationHeader.classList.add('sticky-nav');
      navigationHeader.classList.remove('initial-navigation');
    } else if (scrollTop <= 40 && scrollTop < lastScrollTop) {
      navigationHeader.classList.remove('sticky-nav');
      navigationHeader.classList.add('initial-navigation');
    }

    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', handleScroll);
});

const main = document.querySelector('.home-container');
const closeModalButton = document.querySelectorAll('.closeModal');
const cancelButton = document.querySelector('.cancel-cta');
const UnsubscribeButton = document.querySelector('.Unsubscribe-cta');

//Cancel Suscription Modal
const confirmationBtn = document.querySelector('.confirmationBtn');
const confirmationModal = document.querySelector('.confirmation');

if (confirmationBtn) {
  confirmationBtn.addEventListener('click', openconfirmationModal);

  function openconfirmationModal(event) {
    event.stopPropagation();
    confirmationModal.classList.toggle('openModal');

    if (confirmationModal.classList.contains('openModal')) {
      main.classList.add('blur');
      main.classList.add('no-scroll');
    } else {
      main.classList.remove('blur');
      main.classList.remove('no-scroll');
    }
  }
}

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener('click', function () {
    closeModal();
  });
});

if (cancelButton) {
  cancelButton.addEventListener('click', function () {
    closeModal();
  });
}

if (UnsubscribeButton) {
  UnsubscribeButton.addEventListener('click', function () {
    closeModal();
  });
}

function closeModal() {
  confirmationModal.classList.remove('openModal');

  main.classList.remove('blur');
  main.classList.remove('no-scroll');
}
