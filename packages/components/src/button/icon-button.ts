import { html, useEffect } from 'haunted';
import { css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { define, useHost, useStyles } from '@hui/core';

import '../icon/icon.js';

import baseStyles from './button-base.css.js';

const styles = css`
  :host  {
    --_background-hover-color: var(--hui-icon-button-background-hover-color, var(--hui-color-background-hover));
    --_icon-hover-color: var(--hui-icon-hover-color, var(--hui-color-secondary));

    button {
      --_size: var(--hui-icon-size, 24px);
      --_color: var(--hui-icon-color, var(--hui-text-color, currentColor));

      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--_size);
      block-size: var(--_size);
      padding: 0.3rem !important;
      background: none;
      color: var(--_color);
      border: none !important;
      border-radius: 50%;
      transition: background 0.5s;

      &:hover {
        --hui-icon-color: var(--_icon-hover-color);

        background: var(--_background-hover-color);
      }
    }
  }
`;

type IconButtonBaseProps = {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | 'menu';
};

/**
 * Icon button component.
 *
 * d@cssprop --hui-icon-button-background-hover-color - The background color when the button is hovered.
 */
const IconButton = ({ disabled, type = 'button' }: IconButtonBaseProps) => {
  useStyles([baseStyles, styles]);

  useEffect(() => {
    const _this = useHost();
    _this.classList.add('hui-button');
  });

  const classes = {};

  return html`
    <button
      class="${classMap(classes)}"
      type=${type}
      ?disabled=${disabled}>
      <hui-icon>
        <slot></slot>
      </hui-icon>
    </button>
  `;
};

define('hui-icon-button', IconButton);

declare global {
  interface HTMLElementTagNameMap {
    'hui-icon-button': HTMLElement & IconButtonBaseProps;
  }
}
