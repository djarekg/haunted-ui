import { html, useEffect } from 'haunted';
import { css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { define, useHost, useStyles } from '@hui/core';

import baseStyles from './button-base.css.js';

const styles = css`
  :host {
    button {
      all: unset;
      background: var(--hui-color-secondary-hsl);
      padding: 0.3rem 1.5rem;
      border-radius: var(--hui-shape-small);
      font-size: var(--hui-typescale-label-large-size);
      font-weight: 600;
      box-shadow: var(--hui-elevation-1);

      &:hover {
        filter: brightness(0.9);
        box-shadow: var(--hui-elevation-2);
      }
    }
  }
`;

type ButtonBaseProps = {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | 'menu';
};

export const Button = ({ disabled, type = 'button' }: ButtonBaseProps) => {
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
      <slot></slot>
    </button>
  `;
};

define('hui-button', Button);

declare global {
  interface HTMLElementTagNameMap {
    'hui-button': HTMLElement & ButtonBaseProps;
  }
}
