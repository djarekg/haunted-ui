import { resolve } from 'node:path';
import unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3003,
    hmr: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@hui/api': resolve(__dirname, '../../apps/api/src'),
      '@hui/components': resolve(__dirname, '../../packages/components/src'),
      '@hui/core': resolve(__dirname, '../../packages/core/src'),
      '@hui/graphql': resolve(__dirname, '../../packages/graphql/src'),
      '@hui/router': resolve(__dirname, '../../packages/router/src'),
    },
    preserveSymlinks: true,
    conditions: ['browser', 'development'],
    dedupe: [
      '@apollo/client',
      '@lit-labls/context',
      '@lit-labs/observers',
      'graphql',
      'haunted',
      'lit',
      'lit/decorators',
      'lit/directives',
    ],
  },
  plugins: [
    unfonts({
      google: {
        families: ['Inter', 'Material+Symbols+Sharp'],
      },
    }),
  ],
  define: {},
});
