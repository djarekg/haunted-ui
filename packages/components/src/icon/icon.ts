import { css, html } from 'lit';

import { define, useStyles } from '@hui/core';

const styles = css`
  .material-symbols-sharp {
    --_size: var(--hui-icon-size, 24px);
    --_color: var(--hui-icon-color, var(--hui-color-text));
    --_rotate: var(--hui-icon-rotate, 0deg);
    --_icon-weight: 400;
    --_box-shadow: var(--hui-icon-elevation, none);

    -webkit-transform: rotate(var(--_rotate));
    transform: rotate(var(--_rotate));
    transition: transform 100ms ease-in;

    font-family: "Material Symbols Sharp", sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: var(--_size);
    font-variation-settings: "wght" var(--_icon-weight);
    inline-size: var(--_size);
    block-size: var(--_size);
    color: var(--_color);
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: block;
    white-space: nowrap;
    word-wrap: normal;
    box-shadow: var(--_box-shadow);
    direction: ltr;
    -webkit-font-smoothing: antialiased;
  }
`;

/**
 * Icon component.
 *
 * @cssprop --hui-icon-size - The size of the icon.
 * @cssprop --hui-icon-color - The color of the icon.
 * @cssprop --hui-icon-rotate - The rotation of the icon.
 */
const Icon = () => {
  useStyles(styles);

  return html`<span class="material-symbols-sharp"><slot></slot></span>`;
};

define('hui-icon', Icon, { observedAttributes: ['rotatable'] });

declare global {
  interface HTMLElementTagNameMap {
    'hui-icon': HTMLElement;
  }
}
