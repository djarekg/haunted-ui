import { Hook, type State, hook } from 'haunted';

import { proxyPushState } from '../push-state.js';
import { addCurrent, removeCurrent } from '../router.js';

type RouteParameters = {
  [key: string]: string;
};

type RouteCallback<T> = (params: RouteParameters, state: unknown) => T;

type Route<T> = {
  callback: RouteCallback<T>;
  matcher: (path: string) => readonly [string | undefined, RouteParameters, boolean];
  name?: string;
};

type RouteEntry<T> = {
  entry: RouteCallback<T>;
  name?: string;
};

type Routes<T> = {
  [path: string]: RouteEntry<T> | RouteCallback<T>;
};

type RouterOutlet<T> = {
  outlet: T;
  match: string | undefined;
  exact: boolean;
};

const paramMatcher = /:[a-zA-Z0-9]+/g;

const createRouteEntry = <T>([path, callback]: [
  string,
  RouteEntry<T> | RouteCallback<T>,
]): Route<T> => {
  let pattern = '^';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const { name: routeName, entry } =
    typeof callback === 'function' ? { name: undefined, entry: callback } : callback;

  const exact = path.slice(-1) !== '*';
  const names: string[] = [];

  while ((match = paramMatcher.exec(path))) {
    const [name] = match;
    names.push(name.slice(1));

    pattern += `${path.slice(lastIndex, match.index)}([^/]*)`;
    lastIndex = match.index + name.length;
  }

  pattern += path.slice(lastIndex, exact ? undefined : -1);

  if (exact) {
    pattern += '$';
  }

  const regex = new RegExp(pattern);

  const matcher = (path: string) => {
    const match = regex.exec(path);
    if (!match) return [undefined, {}, false] as const;

    const [string, ...values] = match;
    const params = names.reduce(
      (obj, name, i) => ({
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        ...obj,
        [name]: values[i],
      }),
      {},
    );

    return [string, params, exact] as const;
  };

  return {
    matcher,
    callback: entry,
    name: routeName,
  };
};

const useRoutes = hook(
  class<T> extends Hook<[Routes<T>, T], RouterOutlet<T>> {
    fallback: T;
    _routes: Route<T>[];
    _result!: RouterOutlet<T>;

    constructor(id: number, state: State, routes: Routes<T>, fallback: T) {
      super(id, state);
      proxyPushState(this);
      this._routes = Object.entries(routes).map(createRouteEntry);
      this.fallback = fallback;
    }

    update() {
      addCurrent(this);
      return this._result;
    }

    teardown() {
      removeCurrent(this);
    }

    matches(pathname: string) {
      let match: string | undefined;
      let params: RouteParameters;
      let exact: boolean;

      for (const { matcher, callback, name } of this._routes) {
        [match, params, exact] = matcher(pathname);
        if (match === undefined) continue;
        this._result = { outlet: callback(params, history.state), match: name, exact };
        return { match, name };
      }

      this._result = { outlet: this.fallback, match: undefined, exact: false };
      return undefined;
    }
  },
);

export { useRoutes, type Routes };
