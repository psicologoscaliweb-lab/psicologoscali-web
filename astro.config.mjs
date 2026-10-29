// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.psicologoscali.com',
  // WordPress usaba URLs con "/" final; las mantenemos iguales para no perder posicionamiento.
  trailingSlash: 'always',
  redirects: {
    // URLs viejas de WordPress que ya no existen
    '/2023/11/30/hello-world/': '/',
    '/quienes-somos/': '/nosotros/',
    '/contacto/': '/contactanos/',
  },
});
