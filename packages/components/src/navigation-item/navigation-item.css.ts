import { css } from 'lit';

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    --_color: var(--hui-navigation-item-color, var(--hui-color-text));
    --_on-color: var(--hui-navigation-item-hover-color, var(--hui-color-background-hover));
    --_icon-color: var(--hui-navigation-item-icon-color, var(--hui-color-text));
    --_icon-on-color: var(--hui-navigation-item-icon-hover-color, var(--hui-color-background-hover));
    --_font-weight: 400;
    --_active-indicator-opacity: 0;
    --_active-indicator-visibility: hidden;
    --_active-indicator-color: var(--hui-navigation-item-hover-color, var(--hui-color-background-hover));
    --_active-indicator-background-color: var(--hui-navigation-item-active-indicator-background-color, transparent);
    --_active-indicator-border-radius: var(--hui-navigation-item-active-indicator-border-radius, var(--hui-shape-round));
    --_border-color: transparent;
    --hui-icon-size: 18px;
  }

  a {
    --_anchor-block-size: 40px;
    --hui-icon-color: var(--_icon-color);

    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    block-size: var(--_anchor-block-size);
    inline-size: 100%;
    padding-inline: 18px;
    font-weight: 600;
    font-weight: var(--_font-weight);
    text-decoration: none;
    color: var(--_color);
    outline: none;

    &:hover,
    &:focus {
      --_active-indicator-opacity: 1;
      --_active-indicator-visibility: visible;
      --hui-icon-color: var(--_icon-on-color);
    }
  }

  .active-indicator {
    position: absolute;
    inset: 0;
    cursor: pointer;
    content-visibility: hidden;
    visibility: var(--_active-indicator-visibility);
    opacity: var(--_active-indicator-opacity);
    border-radius: var(--_active-indicator-border-radius);
    border: 2px solid var(--_active-indicator-color);
    background: var(--_active-indicator-background-color);
    z-index: -1;
    will-transform: opacity;
    transition: opacity 350ams var(--hui-motion-acceleration-easing);
  }
`;
