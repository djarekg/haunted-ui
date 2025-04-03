import { define } from '@hui/core';
import { html } from 'haunted';

const Login = () => {
  return html``;
};

define('app-login-page', Login);

declare global {
  interface HTMLElementTagNameMap {
    'app-login-page': HTMLElement;
  }
}
