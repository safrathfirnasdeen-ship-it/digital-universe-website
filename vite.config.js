import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    // Hashed JS/CSS go to /build/ so they can be cached "forever";
    // files in public/assets (images) keep their names and a shorter cache.
    assetsDir: 'build',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        websites: resolve(import.meta.dirname, 'websites/index.html'),
      },
    },
  },
});
