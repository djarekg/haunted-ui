import { html, useEffect } from 'haunted';
import { css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { define, useHost, useStyles } from '@hui/core';

import baseStyles from './button-base.css.js';

const styles = css`
  :host  {
    --_color: var(--hui-link-button-color, var(--hui-color-secondary));
    --_hover-color: var(--hui-link-button-hover-color, var(--hui-color-background-hover));
    --_font-size: var(--hui-link-button-font-size, 1rem);
    --_font-weight: var(--hui-link-button-font-weight, 500);
    --_align-items: var(--hui-link-button-align-items, center);

    display: flex;
    align-items: center;

    button {
      all: unset;
      display: inline-flex;
      align-items: var(--_align-items);
      justify-content: center;
      background: none;
      color: var(--_color);

      &:hover {
        background: var(--_background-hover-color);
      }
    }

    a {
      color: inherit;
      text-decoration: none;
      font-size: var(--_font-size);
      font-weight: var(--_font-weight);
      line-height: var(--_font-size);

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

type LinkButtonBaseProps = {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | 'menu';
  href: string;
};

/**
 * Link button component.
 *
 * @cssprop --hui-link-button-color - The color of the button.
 * @cssprop --hui-link-button-hover-color - The color when the button is hovered.
 * @cssprop --hui-link-button-font-size - The font size of the button.
 * @cssprop --hui-link-button-font-weight - The font weight of the button.
 * @cssprop --hui-link-button-align-items - The alignment of the button.
 */
const LinkButton = ({ disabled, type = 'button', href = '#' }: LinkButtonBaseProps) => {
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
        <slot></slot>
      </a>
    </button>
  `;
};

define('hui-link-button', LinkButton);

declare global {
  interface HTMLElementTagNameMap {
    'hui-link-button': HTMLElement & LinkButtonBaseProps;
  }
}
