import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [sveltekit(), SvelteKitPWA()],
  server: {
    port: 3000
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
