import { html, useEffect } from 'haunted';
import { css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { define, useHost, useStyles } from '@hui/core';

import '../icon/icon.js';

import baseStyles from './button-base.css.js';

const styles = css`
  :host  {
    --_background-hover-color: var(--hui-link-icon-button-background-hover-color, var(--hui-color-background-hover));
    --_icon-hover-color: var(--hui-link-icon-hover-color, var(--hui-color-secondary));

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

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }
`;

type LinkIconButtonBaseProps = {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | 'menu';
  href: string;
};

/**
 * Link button component.
 *
 * @cssprop --hui-link-icon-button-color - The color of the button.
 * @cssprop --hui-link-icon-button-hover-color - The color when the button is hovered.
 * @cssprop --hui-link-icon-button-font-size - The font size of the button.
 * @cssprop --hui-link-icon-button-font-weight - The font weight of the button.
 * @cssprop --hui-link-icon-button-align-items - The alignment of the button.
 */
const LinkIconButton = ({ disabled, type = 'button', href = '#' }: LinkIconButtonBaseProps) => {
  useStyles([baseStyles, styles]);

  const _this = useHost();

  useEffect(() => {
    _this.classList.add('hui-button');
  });

  const classes = {};

  return html`
    <button
      class="${classMap(classes)}"
      type=${type}
      ?disabled=${disabled}>
      <a href=${href}>
        <hui-icon>
          <slot></slot>
        </hui-icon>
      </a>
    </button>
  `;
};

define('hui-link-icon-button', LinkIconButton);

declare global {
  interface HTMLElementTagNameMap {
    'hui-link-icon-button': HTMLElement & LinkIconButtonBaseProps;
  }
}
