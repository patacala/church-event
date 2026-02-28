// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Actualiza esto con tu dominio de producción cuando despliegues
  // Ejemplo: site: 'https://tu-app.vercel.app'
  site: 'http://localhost:4321',
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercel()
});
