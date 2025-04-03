/**
 * Checksums a string.
 *
 * @param {string} value The string to checksum.
 * @returns {number} The checksum of the string value passed.
 */
export const checksum = (value: string) => {
  let hash = 5381;
  let i = value.length;
  while (i) {
    hash = (hash * 33) ^ value.charCodeAt(--i);
  }

  return (hash & 0x7fffffff) >>> 0;
};
