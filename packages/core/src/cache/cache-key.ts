export type CacheKey = `${string}|${string}`;

/**
 * Create key used to store items in cache.
 *
 * @param {string} method Method name.
 * @param {string} url API URL.
 * @returns
 */
export function createCacheKey(method: string, url: string): CacheKey {
  return `${method}|${url}`;
}
