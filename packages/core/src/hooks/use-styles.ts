import { useCallback, useLayoutEffect } from 'haunted';
import { type CSSResult, type LitElement, supportsAdoptingStyleSheets } from 'lit-element';
import { compile, serialize, stringify } from 'stylis';

import { hash } from '../crypto/hash.js';
import { wrap } from '../dom/wrap.js';

import { useHost } from './use-host.js';

/**
 * Applies styling to the element shadowRoot.
 *
 * @param {UseStylesOptions} options The options to use when applying styles.
 */
export function useStyles(styles: CSSResult | CSSResult[]) {
  const element = useHost();

  const adoptStyles = useCallback(
    (el: Element) => {
      // biome-ignore lint/style/noParameterAssign: We need to reassign the styles array is it is not an array.
      styles = Array.isArray(styles) ? styles : [styles];

      if (styles.length === 0) {
        return;
      }

      if (el.shadowRoot && supportsAdoptingStyleSheets) {
        el.shadowRoot.adoptedStyleSheets = styles.map(style =>
          style instanceof CSSStyleSheet ? style : style.styleSheet,
        );
      } else {
        for (const style of styles) {
          const newStyle = document.createElement('style');

          if (el.shadowRoot) {
            newStyle.textContent = style.cssText;
            el.shadowRoot.appendChild(newStyle);
          } else {
            /**
             * If the element does not have a shadowRoot, it is not a custom element.
             * In this case, we add the styles to the document head. But, we first check
             * if the style is already in the document to avoid adding duplicate styles.
             * We do this by hashing the style content and using the hash as the style id.
             */
            const id = `hui${hash(style.cssText).toString()}`;

            // If the style is not already in the document, add it.
            if (!el.parentNode.querySelector(`#${id}`)) {
              const serializedCss = serialize(compile(`.${id}{${style.cssText}}`), stringify);
              newStyle.textContent = serializedCss;
              newStyle.setAttribute('id', id);

              let parent = el.parentNode;

              const firstElement = parent.firstElementChild;
              const wrapperElement = wrap(firstElement);
              wrapperElement.classList.add(id);

              // Look for the first parent that is a custom element.
              while (!('host' in parent)) {
                parent = parent.parentNode;
              }

              // Prepend all styles to the shadowRoot of the closest custom element.
              if (parent.host) {
                const host = parent.host as LitElement;
                host.shadowRoot.prepend(newStyle);
              }
            }
          }
        }
      }
    },
    [styles],
  );

  useLayoutEffect(() => adoptStyles(element), [styles]);
}
