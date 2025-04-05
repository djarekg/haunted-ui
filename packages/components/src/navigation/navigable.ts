export const NAVIGABLE_KEYS = {
  ArrowDown: 'ArrowDown',
  ArrowUp: 'ArrowUp',
  Home: 'Home',
  End: 'End',
} as const;

export type NavigableValues = (typeof NAVIGABLE_KEYS)[keyof typeof NAVIGABLE_KEYS];

export const navigableKeySet = new Set(Object.values(NAVIGABLE_KEYS));

export function isNavigableKey(key: string): key is NavigableValues {
  return navigableKeySet.has(key as NavigableValues);
}
