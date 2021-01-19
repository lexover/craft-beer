import { scrollByElementRef } from '../scroll/scroll';

document.querySelector('.navbar__title').addEventListener('click', (event) => {
  event.preventDefault();
  scrollByElementRef(event.target);
});

document.querySelector('.navbar__slogan').addEventListener('click', (event) => {
  event.preventDefault();
  scrollByElementRef(event.target);
});
