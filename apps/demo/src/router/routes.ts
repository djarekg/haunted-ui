import { type TemplateResult, html, type nothing } from 'lit';

import type { Routes } from '@hui/router';

import { routeType } from './route-type.js';

export const routes: Routes<TemplateResult | typeof nothing> = {
  [routeType.home]: {
    name: 'home',
    entry: () => {
      import('../pages/home.js');
      return html`<app-home-page></app-home-page>`;
    },
  },
  [routeType.login]: {
    name: 'login',
    entry: () => {
      import('../pages/auth/login.js');
      return html`<app-login-page></app-login-page>`;
    },
  },
};
