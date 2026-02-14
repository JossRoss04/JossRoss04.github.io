import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://JossRoss04.github.io',
  //base: '/my-repo',
   vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});
