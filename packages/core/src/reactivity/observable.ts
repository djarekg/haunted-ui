import { useEffect, useState } from 'haunted';

type Listener<T> = (data: T) => void;

/**
 * Create an observable.
 *
 * @param {T} inputs initial value.
 * @returns {Array} [subscribe, next, current] tuple.
 */
export const useObservable = <T extends Readonly<unknown>>(inputs?: T) => {
  let listeners: Listener<T>[] = [];

  const [current, setCurrent] = useState<T | null>(null);

  useEffect(() => {
    setCurrent(inputs);
  }, [current]);

  /**
   * Subscribe to the observable.
   *
   * @param {Listener<T>} listener funciton to be called when the observable emits a new value.
   * @returns {Function} unsubscribe function.
   */
  const subscribe = (listener: Listener<T>) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  /**
   *
   *
   * @param data {T} data to emit to all subscribers.
   */
  const next = (data: T) => {
    setCurrent(data);

    // biome-ignore lint/complexity/noForEach: <explanation>
    listeners.forEach(listener => listener(data));
  };

  return [subscribe, next, current] as const;
};
