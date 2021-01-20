import { scrollToElement } from './smooth-scroll';

const references = [];
let currentReference = -1;

// Get an item which inside an anchor tag and return the href value from an anchor
function getReference(item) {
  let reference = NaN;
  const anchor = item.closest('a');
  if (anchor) {
    const ref = anchor.getAttribute('href').match(/(?:#)(\w+)/);
    if (ref && ref.length > 1) {
      // eslint-disable-next-line prefer-destructuring
      reference = ref[1];
    }
  }
  return reference;
}

// Get references from specified items.
function updateReferences(items) {
  for (let i = 0; i < items.length; i += 1) {
    references.push(getReference(items[i]));
  }
}

// Scroll to element by href of outside anchor.
function scrollByElementRef(element) {
  const ref = getReference(element);
  if (ref) {
    scrollToElement(`.${ref}`);
    currentReference = references.indexOf(ref);
  }
}

function scrollDown() {
  if (currentReference < references.length - 1) {
    currentReference += 1;
    scrollToElement(`.${references[currentReference]}`);
  }
}

function scrollUp() {
  if (currentReference > 0) {
    currentReference -= 1;
    scrollToElement(`.${references[currentReference]}`);
  }
}

// Scroll by mouse wheel
function onWheel(event) {
  const e = event || window.event;
  if (e.deltaY >= 0) {
    scrollDown();
  } else if (e.deltaY <= 0) {
    scrollUp();
  }
}

// Update last scroll position.
function updateScroll() {
  scrollToElement(`.${references[currentReference]}`);
}

export {
  updateReferences, scrollByElementRef, onWheel, updateScroll, scrollDown, scrollUp,
};
