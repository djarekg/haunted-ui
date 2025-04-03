/**
 * Find the first element with a shadow root.
 *
 * @param {Element} element The element to search.
 * @returns {Element | null} The element with a shadow root or null if not found.
 */
export const findElementWithShadowRoot = (element: Element): Element | null => {
  const stack = [element];

  while (stack.length) {
    const current = stack.pop();

    if (current?.shadowRoot) {
      return current;
    }

    if (current?.children) {
      for (let i = 0; i < current.children.length; i++) {
        stack.push(current.children[i]);
      }
    }
  }

  return null;
};
