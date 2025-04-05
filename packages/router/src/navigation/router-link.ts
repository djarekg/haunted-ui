import { navigateTo, replaceTo } from './navigation.js';

class RouterLink extends HTMLAnchorElement {
  state?: unknown;

  connectedCallback() {
    this.appendChild(document.createElement('slot'));
    this.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#handleClick);
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

  #handleClick(e: Event) {
    e.preventDefault();

    const fn = this.replace ? replaceTo : navigateTo;
    fn(this.href, this.state);
  }
}

customElements.define('hui-router-link', RouterLink, { extends: 'a' });
