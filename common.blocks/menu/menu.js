import {
  updateReferences,
  scrollByElementRef,
} from '../scroll/scroll';

// eslint-disable-next-line import/no-mutable-exports
let isShown = false;

function showMenu() {
  const element = document.querySelector('.menu');
  element.style.transform = 'translateX(0)';
  isShown = true;
}

function hideMenu() {
  const element = document.querySelector('.menu');
  const style = getComputedStyle(element);
  element.style.transform = `translateX(-${style.width})`;
  isShown = false;
}

function toggleMenu() {
  if (isShown) {
    hideMenu();
  } else {
    showMenu();
  }
}

function menuAction(event) {
  event.preventDefault();
  scrollByElementRef(event.target);
  hideMenu();
}

// Get menu_items and set it's references to scrolling list.
const items = document.getElementsByClassName('menu__item');
for (let i = 0; i < items.length; i += 1) {
  items[i].addEventListener('click', menuAction, false);
}
updateReferences(items);

export {
  isShown, toggleMenu, showMenu, hideMenu,
};
