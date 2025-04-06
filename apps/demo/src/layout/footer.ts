import { useStyles } from '@hui/core';
import { html, virtual } from 'haunted';
import { css } from 'lit';

const styles = css`
  footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    inline-size: 100%;
    border-block-start: 1px solid var(--hui-color-border);
    color: var(--hui-color-secondary);
  }
`;

export const Footer = virtual((element: HTMLElement) => {
  useStyles(styles, element);

  return html`
    <footer>
      <span>&copy; ${new Date().getFullYear()} djarekg. All rights reserved.</span>
    </footer>
  `;
});
