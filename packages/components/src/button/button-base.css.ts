import { css } from 'lit';

export default css`
  :host {
    button {
      all: unset;
      cursor: pointer;
      padding: .3rem 1.5rem;
      border-radius: var(--hui-shape-small);
      color: var(--hui-color-text);
      text-align: center;
      transition: background 0.3s;
      box-shadow: var(--shadow-button);
      border: 1px solid var(--hui-color-text);
    }
  }

  :host([corner='small']) button {
    border-radius: var(--hui-shape-small);
  }
  :host([corner='medium']) button {
    border-radius: var(--hui-shape-medium);
  }

  :host([corner='large']) button {
    border-radius: var(--hui-shape-large);
  }

  :host([corner='round']) button {
    border-radius: var(--hui-shape-round);
  }

  [inert] :host,
  :host[disabled] {
    pointer-events: none;
  }
`;
