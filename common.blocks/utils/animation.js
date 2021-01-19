let animationSupported = NaN;

function checkAnimationSupported() {
  let animation = false;
  const domPrefixes = 'Webkit Moz O ms Khtml'.split(' ');
  const elem = document.createElement('div');

  if (elem.style.animationName !== undefined) {
    animation = true;
  }

  if (animation === false) {
    for (let i = 0; i < domPrefixes.length; i += 1) {
      if (elem.style[`${domPrefixes[i]}AnimationName`] !== undefined) {
        animation = true;
        break;
      }
    }
  }
  return animation;
}

// On the first call, it checks if the animation is supported
// by the browser and caches the given value.
// Returns the cached value for other calls.
function isAnimationSupported() {
  if (animationSupported.isNaN()) {
    animationSupported = checkAnimationSupported();
  }
  return animationSupported;
}

export default isAnimationSupported;
