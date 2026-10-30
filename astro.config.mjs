// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Direcciones viejas -> nuevas (para no perder visitas ni posicionamiento en Google)
const redirects = {
  // Del WordPress original
  '/2023/11/30/hello-world/': '/',
  '/quienes-somos/': '/sobre-mi/',
  '/contacto/': '/contactanos/',
  // Del "centro" a la consulta individual
  '/nosotros/': '/sobre-mi/',
  '/profesionales/': '/sobre-mi/',
  '/profesional-yolima-ospina/': '/sobre-mi/',
  // Servicios que ya no se ofrecen
  '/terapia-enfocada-en-ninos/': '/servicios/',
  '/terapia-enfocada-en-adolescentes/': '/servicios/',
  '/terapia-enfocada-en-parejas/': '/servicios/',
  '/evaluacion-psicologica/': '/servicios/',
};

export default defineConfig({
  site: 'https://www.psicologoscali.com',
  // WordPress usaba URLs con "/" final; las mantenemos iguales.
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !Object.keys(redirects).some((r) => page.endsWith(r)) })],
  redirects,
});
