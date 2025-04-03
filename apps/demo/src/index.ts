import { html } from 'haunted';
import { unsafeCSS } from 'lit';

import '@hui/components/theme/theme.css';
import { define, useStyles } from '@hui/core';

import '@/layout/index.js';

import css from './index.css?inline';
import stylesCss from './styles/styles.css?inline';

const Index = () => {
  useStyles([unsafeCSS(stylesCss), unsafeCSS(css)]);

  return html`<app-layout></app-layout>`;
};

define('app-index', Index);

declare global {
  interface HTMLElementTagNameMap {
    'app-index': HTMLElement;
  }
}
