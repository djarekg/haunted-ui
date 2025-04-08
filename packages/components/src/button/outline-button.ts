import { html, useEffect } from 'haunted';
import { css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { define, useHost, useStyles } from '@hui/core';

import baseStyles from './button-base.css';

const styles = css`
  :host {
    button {
      background: none;
      border: 1px solid var(--hui-color-text);

      &:hover {
        transition: box-shadow 0.3s ease, background 0.3s ease;
        background: rgba(0, 0, 0, 0.3);
        box-shadow: var(--hui-elevation-1);
      }
    }
  }
  `;

type OutlineButtonBaseProps = {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | 'menu';
  corner?: 'small' | 'medium' | 'large' | 'round';
};

const OutlineButton = ({ disabled, type = 'button' }: OutlineButtonBaseProps) => {
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
      <slot></slot>
    </button>
  `;
};

define('hui-outline-button', OutlineButton, { observedAttributes: ['disabled', 'type', 'corner'] });

declare global {
  interface HTMLElementTagNameMap {
    'hui-outline-button': HTMLElement & OutlineButtonBaseProps;
  }
}
