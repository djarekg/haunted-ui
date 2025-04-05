import { html, useEffect } from 'haunted';
import { css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { define, useHost, useStyles } from '@hui/core';

import baseStyles from './button-base.css.js';

const styles = css`
  :host {
    button {
      background: none;
    }
  }
`;

type FlatButtonBaseProps = {
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | 'menu';
};

export const FlatButton = ({ disabled, type = 'button' }: FlatButtonBaseProps) => {
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

define('hui-flat-button', FlatButton);

declare global {
  interface HTMLElementTagNameMap {
    'hui-flat-button': HTMLElement & FlatButtonBaseProps;
  }
}
