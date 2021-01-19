const items = document
  .querySelector('.product-selector')
  .getElementsByTagName('input');

let callback = NaN;

function changeProduct(event) {
  if (callback) {
    callback(event.target.getAttribute('value'));
  }
}

for (let i = 0; i < items.length; i += 1) {
  items[i].addEventListener('change', changeProduct);
}

function addListener(listener) {
  callback = listener;
}

// eslint-disable-next-line import/prefer-default-export
export { addListener };
