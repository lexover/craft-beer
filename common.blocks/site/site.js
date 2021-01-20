import throttle from '../utils/throttle';
import {
  onWheel,
  updateScroll,
  scrollDown,
  scrollUp,
} from '../scroll/scroll';

// Adds scrolling on mouse wheel event.
const body = document.querySelector('body');
body.addEventListener('wheel', onWheel, false);

// Updates a view position when window was resized.
throttle('resize', 'optimizedResize');
window.addEventListener('optimizedResize', updateScroll);

// Append scroll on touch event
let start = 0;
function startTouch(event) {
  start = event.touches[0].clientY;
}

function endTouch(event) {
  const end = event.changedTouches[0].clientY;
  const move = start - end;
  if (move > 50) {
    scrollDown();
  } else if (move < -50) {
    scrollUp();
  }
}

const site = document.querySelector('.site');
site.addEventListener('touchstart', startTouch, false);
site.addEventListener('touchend', endTouch, false);
