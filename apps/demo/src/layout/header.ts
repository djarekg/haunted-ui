import { html, useCallback } from 'haunted';
import { css } from 'lit';

import { define, useHost, useStyles } from '@hui/core';

const styles = css`
  header {
    --hui-icon-hover-color: var(--hui-color-secondary);

    position: fixed;
    display: grid;
    grid-template-columns: 60px 1fr 60px;
    grid-template-rows: 3rem;
    inline-size: 100%;
    padding-block: 0.5rem;
    background: var(--hui-color-barkground);

    > section {
      display: grid;
      place-items: center;
    }
  }

  .page-title {
    display: grid;
    place-items: center;
    font-size: 2.4rem;
    color: var(--hui-color-secondary);
  }
`;

/**
 * Layout header component.
 *
 * @fires menu-click Fired when the menu button is clicked.
 */
export const Header = () => {
  useStyles(styles);

  const _this = useHost();

  const handleMenuClick = useCallback(() => {
    _this.dispatchEvent(
      new CustomEvent('menu-clicked', {
        bubbles: true,
        composed: true,
      }),
    );
  }, []);

  return html`
    <header>
      <section>
        <hui-icon-button @click=${handleMenuClick}>menu</hui-icon-button>
      </section>
      <span class="page-title">hui</span>
      <section>
        <hui-icon-button>account_circle</hui-icon-button>
      </section>
    </header>
  `;
};

define('app-header', Header);

declare global {
  interface HTMLElementTagNameMap {
    'app-header': HTMLElement;
  }
}
