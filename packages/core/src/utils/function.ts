/**
 * Extend a function and return a new one with extended behavior.
 *
 * @param {() => void} fn The function to extend.
 * @returns {() => void} The extended function.
 */
export const extend = (fn: () => void): (() => void) => {
  return () => {
    fn();
  };
};
