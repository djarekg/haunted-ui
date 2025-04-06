import { Hook, type State, hook } from 'haunted';
import type { CSSResult } from 'lit';
import { compile, serialize, stringify } from 'stylis';

import { useCache } from '../cache/index.js';
import { hash } from '../crypto/hash.js';
import { isEmpty } from '../utils/string.js';

export const useStyles = hook(
  class StylesHook extends Hook<[styles: CSSResult | CSSResult[]], void, Element> {
    #el: State<Element>;
    #styles: CSSResult | CSSResult[];

    constructor(id: number, el: State<Element>, styles: CSSResult | CSSResult[]) {
      super(id, el);
      this.#el = el;
      this.#styles = styles || [];
      this.updateStyles(this.#styles);
    }

    update(styles: CSSResult | CSSResult[]) {
      this.#styles = styles || [];
      this.updateStyles(this.#styles);
    }

    updateStyles(styles: CSSResult | CSSResult[]) {
      if (this.#el.host) {
        if (isEmpty(styles)) {
          return;
        }

        const cache = useCache();

        for (const style of Array.isArray(styles) ? styles : [styles]) {
          const isVirtual = this.#el.virtual;
          let host = this.#el.host;

          // If element is a virtual component, then we need to find the
          // closest custom element.
          if (isVirtual) {
            while (!host.shadowRoot) {
              host = host.parentNode as Element;
            }
          }

          let hostId = host.getAttribute('hui-cache-id');

          if (!hostId) {
            hostId = crypto.randomUUID();
            host.setAttribute('hui-cache-id', hostId);
          }

          const hostCache: string[] = cache.get(hostId) || [];
          const id = `hui${hash(style.cssText).toString()}`;

          if (!hostCache.includes(id)) {
            // compile and serialize the css
            const css = isVirtual ? `.${id}{${style.cssText}}` : style.cssText;
            const serializedCss = serialize(compile(css), stringify);

            const styleSheet = new CSSStyleSheet({ baseURL: id });
            styleSheet.replaceSync(serializedCss);
            host.shadowRoot.adoptedStyleSheets = [
              ...(host.shadowRoot.adoptedStyleSheets || []),
              styleSheet,
            ];

            hostCache.push(id);
            cache.set(hostId, hostCache);
          }
        }
      }
    }
  },
);
