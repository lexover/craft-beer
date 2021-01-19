import isAnimationSupported from '../utils/animation';

const aboutTop = document.querySelector('.about').getBoundingClientRect().top - 5;

function startAnimation() {
  const figure = document.querySelector('.about__figure');
  const content = document.querySelector('.about__content');
  if (figure) {
    figure.classList.add('about__figure_animated_in');
  }
  if (content) {
    content.classList.add('about__content_animated_in');
  }
  // eslint-disable-next-line no-use-before-define
  window.removeEventListener('scroll', scrollCheck, false);
}

function scrollCheck() {
  if (window.scrollY >= aboutTop) {
    startAnimation();
  }
}

if (isAnimationSupported) {
  document
    .querySelector('.about__figure')
    .classList.add('about__figure_animated');
  document
    .querySelector('.about__content')
    .classList.add('about__content_animated');
}
window.addEventListener('scroll', scrollCheck, false);
