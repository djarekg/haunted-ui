import type { NavItem } from './types.js';

export interface NavigationItemEventDetail {
  item: NavItem;
}

export type NavigationItemEvent = CustomEvent<NavigationItemEventDetail>;

export const createNavigationItemClickedEvent = (item: NavItem) => {
  return new CustomEvent<NavigationItemEventDetail>('navigate', {
    detail: { item },
    bubbles: true,
    composed: true,
  });
};
