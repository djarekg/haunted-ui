import { html, virtual } from 'haunted';
import { css } from 'lit';

import { useStyles } from '@hui/core';

import '@hui/components/button/link-icon-button.js';
import { routeType } from '@/router/route-type.js';

const styles = css`
  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    inline-size: 100%;
    border-block-start: 1px solid var(--hui-color-border);
    color: var(--hui-color-secondary);
    padding: 1rem;
  }
`;

export const Footer = virtual(() => {
  useStyles(styles);

  return html`
    <footer>
      <ui>
        <li>
          <hui-link-icon-button href=${routeType.settings}>settings</hui-link-icon-button>
        </li>
      </ui>
      <span>&copy; ${new Date().getFullYear()} djarekg. All rights reserved.</span>
    </footer>
  `;
});
