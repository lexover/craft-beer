function throttle(type, name, obj = NaN) {
  const object = obj || window;
  let running = false;
  function func() {
    if (running) {
      return;
    }
    running = true;
    requestAnimationFrame(() => {
      object.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  }
  object.addEventListener(type, func);
}

export default throttle;
