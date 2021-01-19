import { scrollByElementRef } from '../scroll/scroll';

document
  .querySelector('.header__content')
  .querySelector('.link')
  .addEventListener('click', (event) => {
    event.preventDefault();
    scrollByElementRef(event.target);
  });
