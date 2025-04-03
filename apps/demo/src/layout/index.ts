import { html } from 'haunted';
import { css, nothing } from 'lit';

import { define, useStyles } from '@hui/core';
import { useRoutes } from '@hui/router';

import { routes } from '@/router/routes.js';

const styles = css`
  :host,
  main,
  article {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

const Index = () => {
  useStyles(styles);

  const route = useRoutes(routes, nothing);

  return html`
    <main>
      <article>${route.outlet}</article>
    </main>
  `;
};

define('app-layout', Index);

declare global {
  interface HTMLElementTagNameMap {
    'app-layout': HTMLElement;
  }
}
