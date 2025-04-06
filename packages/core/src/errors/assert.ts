import { isEmpty } from '../utils/string.js';

/**
 * Assertion utilities.
 */
export const assert = {
  /**
   * Check is value is empty and run falseAction if it is not.
   *
   * @param {unknown} value The value to test.
   * @param falseAction The action to run if the value is not empty.
   */
  isEmpty: (value: unknown, falseAction: () => void) => {
    if (!isEmpty(value)) {
      falseAction();
    }
  },
  /**
   * Check is value is not empty and run falseAction if it is.
   *
   * @param {unknown} value The value to test.
   * @param falseAction The action to run if the value is empty.
   */
  notEmpty: (value: unknown, falseAction: () => void) => {
    if (isEmpty(value)) {
      falseAction();
    }
  },
};
