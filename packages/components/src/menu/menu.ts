import { useCallback } from 'haunted';
import { css, html } from 'lit';

import { define, useHost, useStyles } from '@hui/core';

import '../button/icon-button.js';

const styles = css`
  button {
    all: unset;
    cursor: pointer;
  }

  [popovertarget] {
    --hui-icon-size: 32px;
  }

  [popover] {
    --hui-icon-size: 21px;
    --_inset-block-start: calc(var(--_header-height) - 0.8rem);

    content-visibility: hidden;
    visibility: hidden;
    padding: 0;
    border-radius: var(--hui-shape-medium);
    border: 1px solid var(--hui-palette-surface-a20);
    background: var(--hui-palette-surface-a0);
    box-shadow: var(--hui-elevation-4);
    inset: 0 1rem auto auto;
    z-index: 900;
    transform: translateY(var(--_inset-block-start));
    will-change: transform;
    transition: transform var(--hui-motion-duration-500) var(--hui-motion-standard-easing), visibility
      0s linear var(--hui-motion-duration-500);

    &:popover-open {
      content-visibility: visible;
      visibility: visible;
      transform: translateY(var(--_inset-block-start));
      transition: transform var(--hui-motion-duration-200) var(--hui-motion-standard-easing);
    }
  }
`;

type MenuProps = {
  icon: string;
};

const Menu = ({ icon }: MenuProps) => {
  useStyles(styles);

  const _this = useHost();
  const hide = useCallback(() => _this.shadowRoot.querySelector('menu').hidePopover(), []);

  return html`
    <button type="button" popovertarget="menu">
      <hui-icon-button>${icon}</hui-icon-button>
    </button>
    <menu id="menu" popover @click=${hide}>
      <slot></slot>
    </menu>
  `;
};

define('hui-menu', Menu, { observedAttributes: ['icon'] });

declare global {
  interface HTMLElementTagNameMap {
    'hui-menu': HTMLElement & MenuProps;
  }
}
