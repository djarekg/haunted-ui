import { html, useState } from 'haunted';
import { css, nothing } from 'lit';

import '@hui/components/navigation-drawer/index.js';
import { define, useStyles } from '@hui/core';
import { useRoutes } from '@hui/router';

import navItems from '@/router/nav-items.js';
import { routes } from '@/router/routes.js';

import './header.js';
import { Footer } from './footer.js';

const styles = css`
  :host,
  main,
  article {
    display: block;
    height: 100%;
    width: 100%;
  }

  :host {
    --hui-navigation-item-icon-color: var(--hui-palette-surface-tonal-a40);
    --hui-navigation-item-icon-hover-color: var(--hui-color-secondary);
  }
`;

const Layout = () => {
  useStyles(styles);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const route = useRoutes(routes, nothing);

  return html`
    <hui-navigation-drawer
      open=${drawerOpen}
      .items=${navItems}
      @close=${() => setDrawerOpen(false)}>
      <main role="main">
        <app-header @menu-clicked=${() => setDrawerOpen(true)}></app-header>
        <article>${route.outlet}</article>
        ${Footer()}
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
