import { navigateTo, replaceTo } from './navigation.js';

class RouterRedirect extends HTMLElement {
  connectedCallback() {
    if (this.url) {
      const fn = this.replace ? replaceTo : navigateTo;
      fn(this.url);
    }
  }

  get url() {
    return this.getAttribute('url') || '';
  }

  set url(value: string) {
    this.setAttribute('url', value);
  }

  get replace() {
    return this.hasAttribute('replace');
  }

  set replace(value: boolean) {
    if (value) {
      this.setAttribute('replace', '');
    } else {
      this.removeAttribute('replace');
    }
  }
}

customElements.define('hui-router-redirect', RouterRedirect);
