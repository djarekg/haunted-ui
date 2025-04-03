import { update } from '../router.js';

/**
 * Navigate to a new URL and push it to the history.
 *
 * @param {string} url The URL to navigate to.
 * @param {unknown} state The state to push.
 */
const navigateTo = (url: string, state?: unknown) => {
  window.history.pushState(state, '', url);
  update();
};

/**
 * Replace the current URL and don't update the history.
 *
 * @param {string} url The URL to replace to.
 * @param {unknown} state The state to replace.
 */
const replaceTo = (url: string, state?: unknown) => {
  window.history.replaceState(state, '', url);
  update();
};

window.addEventListener('popstate', update);

export { navigateTo, replaceTo };
