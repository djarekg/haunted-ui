import { html, useState } from 'haunted';
import { css, nothing } from 'lit';

import '@hui/components/navigation-drawer/index.js';
import { define, useStyles } from '@hui/core';
import { useRoutes } from '@hui/router';

import { routes } from '@/router/routes.js';

import './header.js';

const styles = css`
  :host,
  main,
  article {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

const Layout = () => {
  useStyles(styles);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const route = useRoutes(routes, nothing);

  return html`
    <hui-navigation-drawer open=${drawerOpen} @close=${() => setDrawerOpen(false)}>
      <main role="main">
        <app-header @menu-clicked=${() => setDrawerOpen(true)}></app-header>
        <article>${route.outlet}</article>
      </main>
    </hui-navigation-drawer>
  `;
};

define('app-layout', Layout);

declare global {
  interface HTMLElementTagNameMap {
    'app-layout': HTMLElement;
  }
}
