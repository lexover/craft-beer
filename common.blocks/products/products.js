import isAnimationSupported from '../utils/animation';
import { addListener as selectorAddListener } from '../product-selector/product-selector';

const productsTop = document.querySelector('.products').getBoundingClientRect().top - 10;
let currentProduct = 1;

function startAnimation() {
  const image = document.querySelector('.product__image');
  const content = document.querySelector('.product__content');
  if (image) {
    image.classList.add('product__image_animated_in');
  }
  if (content) {
    content.classList.add('product__content_animated_in');
  }
  // eslint-disable-next-line no-use-before-define
  window.removeEventListener('scroll', scrollCheck, false);
}

function scrollCheck() {
  if (window.scrollY >= productsTop) {
    startAnimation();
  }
}

function changeProduct(value) {
  const current = document.querySelector(`.product_id_${currentProduct}`);
  const currentImage = current.querySelector('.product__image');
  const currentContent = current.querySelector('.product__content');

  const next = document.querySelector(`.product_id_${value}`);
  const nextImage = next.querySelector('.product__image');
  const nextContent = next.querySelector('.product__content');

  currentImage.classList.remove('product__image_animated_in');
  currentImage.classList.add('product__image_animated_out');
  currentContent.classList.remove('product__content_animated_in');
  currentContent.classList.add('product__content_animated_out');

  setTimeout(() => {
    currentImage.classList.remove('product__image_animated_out');
    currentContent.classList.remove('product__content_animated_out');
    current.classList.add('product_hidden');

    next.classList.remove('product_hidden');
    nextImage.classList.add('product__image_animated_in');
    nextContent.classList.add('product__content_animated_in');
  }, 500);
  currentProduct = value;
}

if (isAnimationSupported) {
  const product = document.querySelector('.product_id_1');
  product.querySelector('.product__image').classList.add('product__image_animated');
  product.querySelector('.product__content').classList.add('product__content_animated');
}

window.addEventListener('scroll', scrollCheck, false);
selectorAddListener(changeProduct);
