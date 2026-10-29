// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { HIDDEN_PAGES } from './src/hidden-pages.mjs';

export default defineConfig({
  site: 'https://www.psicologoscali.com',
  // WordPress usaba URLs con "/" final; las mantenemos iguales para no perder posicionamiento.
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) =>
      !/hello-world|quienes-somos|\/contacto\/$/.test(page) && !HIDDEN_PAGES.some((s) => page.includes(`/${s}/`)),
  })],
  redirects: {
    // URLs viejas de WordPress que ya no existen
    '/2023/11/30/hello-world/': '/',
    '/quienes-somos/': '/nosotros/',
    '/contacto/': '/contactanos/',
    // Servicios ocultos -> página general de servicios
    ...Object.fromEntries(HIDDEN_PAGES.map((slug) => [`/${slug}/`, '/servicios/'])),
  },
});
