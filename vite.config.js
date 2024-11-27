import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/zora-pond-tracker',
  build: {
    rollupOptions: {
      external: [
        '/zora-pond-tracker/bg.jpg',
        '/zora-pond-tracker/fonts/returnofganon.woff2',
        '/zora-pond-tracker/fonts/triforce.woff2'
      ],
      output: {
        manualChunks: {
          vue: ['vue']
        }
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
