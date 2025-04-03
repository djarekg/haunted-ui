/**
 * Generates a hash from the given CSS text using the Web Crypto API.
 *
 * @param value The string to hash.
 * @returns {string} A hash of the string value passed.
 */
export const hash = (value: string) => {
  let hash = 0;

  for (let i = 0, len = value.length; i < len; i++) {
    const chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  // Make sure the hash is positive.
  return hash + 2147483647 + 1;
};
