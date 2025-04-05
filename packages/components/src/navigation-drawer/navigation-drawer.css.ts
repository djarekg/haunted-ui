import { css } from 'lit';

export default css`
  :host {
    --_drawer-color: var(--hui-navigation-drawer-color, var(--hui-color-background));
    --_drawer-pinned-rotate: 90deg;
    --_drawer-inline-size: 260px;
    --_aside-position: absolute;
    --_aside-border-radius: var(--hui-shape-large);
    --_aside-box-shadow: var(--hui-elevation-3);
    --_aside-border-inline-end: none;
    /* --_navigation-item-opacity: 0;
    --_navigation-visibility: hidden; */

    display: block;
    inline-size: 100%;
    block-size: 100%;


  @starting-style {
    hui-navigation-item {
      opacity: 0;
    }
  }
  }

  aside {
    content-visibility: hidden;
    visibility: hidden;
    position: var(--_aside-position);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    inline-size: var(--_drawer-inline-size);
    block-size: 100%;
    inset-block: 0;
    inset-inline-start: 0;
    background: var(--_drawer-color);
    box-shadow: var(--_aside-box-shadow);
    border-inline-end: var(--_aside-border-inline-end);
    border-start-end-radius: var(--_aside-border-radius);
    border-end-end-radius: var(--_aside-border-radius);
    z-index: 999;
    transform: translateX(calc(var(--_drawer-inline-size) * -1));
    will-change: transform;
    transition: transform var(--hui-motion-duration-500) var(--hui-motion-standard-easing),
      visibility 0s linear var(--hui-motion-duration-500);
  }

  :host([open="true"]) {
    --_navigation-item-opacity: 1;
    --_navigation-visibility: visible;

    aside {
      content-visibility: visible;
      visibility: visible;
      transform: translateX(0);
      transition: transform var(--hui-motion-duration-200) var(--hui-motion-standard-easing);
    }
  }

  :host([pinned]) {
    --_drawer-pinned-rotate: 0deg;
    --_aside-border-radius: 0;
    --_aside-position: relative;
    --_aside-box-shadow: none;
    --_aside-border-inline-end: 1px solid var(--hui-palette-surface-a10);

    display: grid;
    grid-template-columns: var(--_drawer-inline-size) 1fr;
  }

  .scrim {
    --_scrim-opacity: 0;

    position: absolute;
    inset: 0;
    content-visibility: hidden;
    visibility: hidden;
    overscroll-behavior: contain;
    background: var(--hui-color-scrim);
    background-color: var(--hui-color-scrim);
    opacity: var(--_scrim-opacity);
    transition: opacity var(--hui-motion-duration-200) linear var(--hui-motion-duration-100);
    z-index: 899;
  }

  :host([open="true"]:not([pinned])) .scrim {
    --_scrim-opacity: 0.2;

    content-visibility: visible;
    visibility: visible;
  }


  nav {
    position: relative;
    block-size: 100%;
    padding-inline: 16px;
    padding-block: 20px;

    & h4 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline-start: 22px;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 1rem 0.5rem;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 9px;
    box-sizing: border-box;
    inline-size: 100%;
    block-size: 66px;
    padding-inline: 30px;
  }

  .pin-button,
  .close-button {
    --hui-icon-size: 16px;

    cursor: pointer;
  }

  .pin-button {
    --hui-icon-rotate: var(--_drawer-pinned-rotate);
  }

  :host([open="true"]) {
    hui-navigation-item {
      animation: fadeIn 0.5s ease-in-out forwards 0.3s;
    }
  }

  :host {
    hui-navigation-item {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
