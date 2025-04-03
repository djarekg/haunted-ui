import { useMemo } from 'haunted';

/**
 * Get the search params from the current URL and return them as an object.
 *
 * @returns {Record<string, string>} Search params.
 */
export const useSearchParams = () =>
  useMemo<{ [key: string]: string }>(() => {
    const searchParams = new URLSearchParams(window.location.search);

    return [...searchParams].reduce(
      (obj, [key, value]) => ({
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        ...obj,
        [key]: value,
      }),
      {},
    );
  }, [window.location.search]);
