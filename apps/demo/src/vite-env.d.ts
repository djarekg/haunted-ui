/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_API: string;
  readonly VITE_UNSPLASH_PHOTO_URL_FORMAT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
