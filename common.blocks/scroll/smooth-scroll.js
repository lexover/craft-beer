// native smooth scrolling for Chrome, Firefox & Opera
// @see: https://caniuse.com/#feat=css-scroll-behavior
const nativeSmoothScrollTo = (elem) => {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: elem.getBoundingClientRect().top + window.pageYOffset,
  });
};

// polyfilled smooth scrolling for IE, Edge & Safari
const smoothScrollTo = (to, duration) => {
  const element = document.scrollingElement || document.documentElement;
  const start = element.scrollTop;
  const change = to - start;
  const startDate = +new Date();

  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t, b, c, d) => {
    let time = t / (d / 2);
    if (time < 1) return (c / 2) * (time * time) + b;
    time -= 1;
    return (-c / 2) * (time * (time - 2) - 1) + b;
  };

  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};

// detect support for the behavior property in ScrollOptions
const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

// smooth scrolling stub
const scrollToElement = (elemSelector) => {
  if (!elemSelector) {
    return;
  }

  const elem = document.querySelector(elemSelector);
  if (elem) {
    if (supportsNativeSmoothScroll) {
      nativeSmoothScrollTo(elem);
    } else {
      smoothScrollTo(elem.offsetTop, 600);
    }
  }
};

export { scrollToElement, supportsNativeSmoothScroll };
