import type { NavItem } from '../navigation-item/types.js';

export interface NavigationDrawerNavigateEventDetail {
  item: NavItem;
}

export type NavigationDrawerNavigateEvent = CustomEvent<NavigationDrawerNavigateEventDetail>;

export const createNavigationDrawerNavigateEventEvent = (item: NavItem) => {
  return new CustomEvent<NavigationDrawerNavigateEventDetail>('navigate', {
    detail: { item },
    bubbles: true,
    composed: true,
  });
};

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface NavigationDrawerCloseEventDetail {}

export type NavigationDrawerCloseEvent = CustomEvent<NavigationDrawerCloseEventDetail>;

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface NavigationDrawerOpenEventDetail {}

export type NavigationDrawerOpenEvent = CustomEvent<NavigationDrawerOpenEventDetail>;

export const createClosingEvent = () => {
  return new CustomEvent<NavigationDrawerCloseEventDetail>('closing', {
    detail: {},
    bubbles: true,
    composed: true,
  });
};

export const createClosedEvent = () => {
  return new CustomEvent<NavigationDrawerCloseEventDetail>('closed', {
    detail: {},
    bubbles: true,
    composed: true,
  });
};

export const openingEvent = new CustomEvent<NavigationDrawerOpenEventDetail>('opening', {
  detail: {},
  bubbles: true,
  composed: true,
});

export const openedEvent = new CustomEvent<NavigationDrawerOpenEventDetail>('opened', {
  detail: {},
  bubbles: true,
  composed: true,
});
