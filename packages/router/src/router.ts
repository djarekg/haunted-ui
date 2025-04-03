import type { Hook } from 'haunted';

const hookPath = new Map<RouterHook, string | undefined>();
// TODO: should this be scoped to the methods it's used in?
let farthestPath = window.location.pathname;

export interface RouterHook extends Hook {
  matches(pathname: string): { match: string; name: string } | undefined;
}

/**
 * Add the current router hook to the hook path.
 *
 * @param {RouterHook} hook Hook to add.
 */
export const addCurrent = (hook: RouterHook) => {
  if (hookPath.has(hook)) {
    return;
  }

  const { match } = hook.matches(farthestPath);

  hookPath.set(hook, match);

  if (match) {
    farthestPath = farthestPath.slice(match.length);
  }
};

/**
 * Remove the current router hook from the hook path.
 *
 * @param {RouterHook} hook Hook to remove.
 */
export const removeCurrent = (hook: RouterHook) => {
  hookPath.delete(hook);
};

/**
 * Update the router hook path.
 */
export const update = () => {
  farthestPath = window.location.pathname;

  for (const [hook, oldHook] of hookPath.entries()) {
    const { match, name } = hook.matches(farthestPath);

    if (oldHook !== match) {
      hook.state.update();

      if (match === undefined) {
        hookPath.set(hook, match);
      }
    }

    if (match) {
      farthestPath = farthestPath.slice(match.length);
    }

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('router:update', {
          detail: { name },
          bubbles: true,
          cancelable: true,
        }),
      );
    });
  }

  // Update the last item of hook path anyways 😉
  const lastHook = [...hookPath.keys()].pop();
  if (lastHook) {
    lastHook.state.update();
  }
};
