import type { RouterHook } from './router.js';

/**
 * Setup a proxy for the pushState method to intercept new history entries
 * and update the document title.
 *
 * @param {RouterHook} router The router instance to use for matching.
 */
export const proxyPushState = (router: RouterHook) => {
  globalThis.history.pushState = new Proxy(globalThis.history.pushState, {
    apply: (
      target,
      thisArg,
      argArray: [data: unknown, unused: string, url?: string | URL | null | undefined],
    ) => {
      const [_data, _unused, url] = argArray;
      const { name } = router.matches(url.toString());
      document.title = name || document.title;

      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('router:pushstate', {
            detail: { name, url },
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      return target.apply(thisArg, argArray);
    },
  });
};
