import { isNotEmpty } from '../utils/string.js';

/**
 * Wrap an element with a new element.
 *
 * @param {Element} element The element to wrap.
 * @param {string} className The class name to apply to the wrapper.
 * @returns {Element} The wrapper element.
 */
export const wrap = (element: Element, className?: string) => {
  const parent = element.parentNode;
  const wrapper = document.createElement('div');

  if (isNotEmpty(className)) {
    wrapper.classList.add(className);
  }

  if (parent instanceof DocumentFragment) {
    parent.prepend(wrapper);
  } else {
    parent.insertBefore(wrapper, element);
  }

  wrapper.appendChild(element);
  return wrapper;
};
