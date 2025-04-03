import { html } from 'haunted';
import { css } from 'lit';

import { define, useStyles } from '@hui/core';

const styles = css`
  :host {
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
  }

  img {
    block-size: 300px;
    inline-size: 300px;
    transition: transform 700ms;

    &:hover {
      transform: scale(2);
      transition: transform 200ms;
    }
  }
`;

const Index = () => {
  useStyles(styles);

  return html`
    <img src="./public/hui.svg" alt="logo" />
  `;
};

define('app-home-page', Index);

declare global {
  interface HTMLElementTagNameMap {
    'app-home-page': HTMLElement;
  }
}
