import throttle from '../utils/throttle';
import { onWheel, updateScroll } from '../scroll/scroll';

// Adds scrolling on mouse wheel event.
const body = document.querySelector('body');
body.addEventListener('wheel', onWheel, false);

// Updates a view position when window was resized.
throttle('resize', 'optimizedResize');
window.addEventListener('optimizedResize', updateScroll);
