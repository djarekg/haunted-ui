/**
 * Hook to manage app cache
 */
export const useCache = () => {
  let cache = new Map<string, unknown>();

  // Initialize cache from localStorage
  const data = localStorage.getItem('cache');
  if (data) {
    const parsedData = JSON.parse(data);
    const initialCache = new Map<string, unknown>();
    for (const key in parsedData) {
      initialCache.set(key, parsedData[key]);
    }
    cache = initialCache;
  }

  // Serialize current cache and save cache to local storage
  const persistCache = () => {
    const data = JSON.stringify(Object.fromEntries(cache));
    localStorage.setItem('cache', data);
  };

  /**
   * Get value from cache
   * @returns cache item stored at key
   */
  const get = <T = unknown>(key: string): T | undefined => cache.get(key) as T;

  /**
   * Set a value to cache
   * @param key key of the value
   * @param value value to be stored
   */
  const set = (key: string, value: unknown) => {
    cache.set(key, value);
    persistCache();
  };

  /**
   * Remove a value from cache
   * @param key key of the value
   */
  const remove = (key: string) => {
    cache.set(key, undefined);
    persistCache();
  };

  /**
   * Does the cache contain a value.
   * @param {string} key key of the value.
   * @return {boolean} true if the cache contains the value.
   */
  const has = (key: string) => cache.has(key);

  return { get, set, remove, has } as const;
};
