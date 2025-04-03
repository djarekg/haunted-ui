// import { getAuthToken } from './utils/cache-util.js';

/**
 * Apollo client configuration. Pass this to the `@hui/graphql` `useQuery` hook.
 */
export const clientConfig = {
  name: '@hui/demo',
  version: '1.0.0',
  uri: import.meta.env.VITE_GRAPHQL_API,
  // token: getAuthToken(),
} as const;
