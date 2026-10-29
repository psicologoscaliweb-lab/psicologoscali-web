// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.psicologoscali.com',
  // WordPress usaba URLs con "/" final; las mantenemos iguales para no perder posicionamiento.
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !/hello-world|quienes-somos|\/contacto\/$/.test(page) })],
  redirects: {
    // URLs viejas de WordPress que ya no existen
    '/2023/11/30/hello-world/': '/',
    '/quienes-somos/': '/nosotros/',
    '/contacto/': '/contactanos/',
  },
});
