import { html, useEffect } from 'haunted';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';

import { define, useHost, useStyles } from '@hui/core';

import type { NavigationItemEvent } from '../navigation-item/events.js';
import type { NavItem } from '../navigation-item/types.js';
import '../button/icon-button.js';
// import '../tooltip/tooltip.js';

import { createNavigationDrawerNavigateEventEvent } from './events.js';
import styles from './navigation-drawer.css.js';

type NavigationDrawerProps = {
  disabled: boolean;
  headline: string;
  items: ReadonlyArray<Readonly<NavItem>> | undefined;
  open: boolean;
  pinned: boolean;
};

/**
 * Navigation drawer component.
 *
 * @cssprop --hui-navigation-drawer-color - The color of the navigation drawer.
 * @fires close - Dispatched when the drawer is closed.
 * @fires navigate - Dispatched when a navigation item is clicked.
 */
const NavigationDrawer = ({
  disabled,
  headline = '',
  items,
  open,
  pinned,
}: NavigationDrawerProps) => {
  useStyles(styles);

  const _this = useHost();

  const classes = {
    visible: open,
  };
  const ariaExpanded = open ? 'true' : 'false';

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  // const show = () => openDrawer();
  // const close = () => closeDrawer();

  const onKeydown = (e: KeyboardEvent) => {
    if (open) {
      if (e.key.toLowerCase() === 'escape') {
        closeDrawer();
      }
    }

    if (!open) {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        openDrawer();
      }
    }
  };

  const togglePin = () => {
    pinned = !pinned;
  };

  const closeDrawer = () => {
    open = false;
    pinned = false;
    _this.dispatchEvent(new CustomEvent('close'));
  };

  const openDrawer = () => {
    open = true;
    focus();
  };

  const handleItemClicked = (e: NavigationItemEvent) => {
    _this.dispatchEvent(createNavigationDrawerNavigateEventEvent(e.detail.item));

    // we dont' want to clsoe the drawer if it's pinned
    if (!pinned) {
      closeDrawer();
    }
  };

  const handleScrimClick = (e: Event) => {
    e.stopImmediatePropagation();
    closeDrawer();
  };

  const renderNav = () => {
    return html`
      <nav>
        ${map(items, item => {
          return html`
            <hui-navigation-item
              .item=${item}
              @navigate=${handleItemClicked}>
            </hui-navigation-item>
          `;
        })}
      </nav>
    `;
  };

  const renderHeader = () => {
    return html`
      <header>
        <h4>${headline}</h4>
        <div>
          <hui-icon-button
            id="pinDrawer"
            rotatable
            class="pin-button"
            tabindex="0"
            @click=${togglePin}>
            push_pin
          </hui-icon-button>
          <!-- <hui-tooltip anchor="pinDrawer">${pinned ? 'Un-pin drawer' : 'Pin drawer'}</hui-tooltip> -->

          <hui-icon-button
            id="closeDrawer"
            class="close-button"
            tabindex="0"
            @click=${closeDrawer}>
            close
          </hui-icon-button>
          <!-- <hui-tooltip anchor="closeDrawer">Close drawer</hui-tooltip> -->
        </div>
      </header>
    `;
  };

  const renderFooter = () => {
    return html`
      <footer>
        <slot name="footer"></slot>
      </footer>
    `;
  };

  return html`
    <div class="scrim" @click=${handleScrimClick}></div>
    <aside
      role="dialog"
      aria-expanded="${ariaExpanded}"
      aria-hidden="true"
      class="${classMap(classes)}">
      ${renderHeader()}
      ${renderNav()}
      ${renderFooter()}
    </aside>
    <slot></slot>
  `;
};

define('hui-navigation-drawer', NavigationDrawer, {
  observedAttributes: ['disabled', 'headline', 'open', 'pinned'],
});

declare global {
  interface HTMLElementTagNameMap {
    'hui-navigation-drawer': HTMLElement & NavigationDrawerProps;
  }
}
