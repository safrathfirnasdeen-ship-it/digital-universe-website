import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Hashed JS/CSS go to /build/ so they can be cached "forever";
    // files in public/assets (images) keep their names and a shorter cache.
    assetsDir: 'build',
  },
});
