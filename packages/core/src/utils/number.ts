/**
 * Generates a random number within a specified range [min, max].
 *
 * @param min - The minimum value of the range (inclusive).
 * @param max - The maximum value of the range (inclusive).
 * @returns A random number within the range [min, max].
 */
export const randomInRange = (min: number, max: number): number => {
  if (min > max) {
    throw new Error('Min value cannot be greater than max value.');
  }
  return Math.random() * (max - min) + min;
};
