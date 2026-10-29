// Datos generales del sitio. Cambia aquí y se actualiza en todas las páginas.
export const SITE = {
  name: 'Centro de Psicología y Cuidado Mental',
  shortName: 'Psicólogos Cali',
  url: 'https://www.psicologoscali.com',
  email: 'psicoyolimaop@gmail.com',
  phone: '323 541 1356',
  // Número en formato internacional, sin "+" ni espacios (Colombia = 57)
  whatsapp: '573235411356',
  whatsappMessage: 'Hola, quisiera información sobre una cita.',
  city: 'Cali, Colombia',

  // Supabase (formulario de contacto). Estas claves son públicas por diseño:
  // la seguridad la da la regla RLS que solo permite INSERTAR mensajes.
  // Nunca pongas aquí la clave "service_role" / "secret".
  supabaseUrl: 'https://wkesttoeixwtpomfmnew.supabase.co',
  supabaseKey: 'sb_publishable_9x_z20M1olBgf3TWQkQntw_hhi8Cshw',
};

// Las páginas ocultas se configuran en src/hidden-pages.mjs
export { HIDDEN_PAGES } from './hidden-pages.mjs';
import { HIDDEN_PAGES } from './hidden-pages.mjs';

export const NAV = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Quiénes Somos',
    children: [
      { label: 'Nuestra Historia', href: '/nosotros/' },
      { label: 'Nuestros Profesionales', href: '/profesionales/' },
    ],
  },
  {
    label: 'Nuestros Servicios',
    href: '/servicios/',
    children: [
      { label: 'Terapia para Adultos', href: '/terapia-enfocada-en-adultos/' },
      { label: 'Terapia de Parejas', href: '/terapia-enfocada-en-parejas/' },
      { label: 'Terapia para Niños', href: '/terapia-enfocada-en-ninos/' },
      { label: 'Terapia para Adolescentes', href: '/terapia-enfocada-en-adolescentes/' },
      { label: 'Psiquiatría', href: '/psiquiatria/' },
    ],
  },
  { label: 'Contáctanos', href: '/contactanos/' },
];

/** Quita enlaces a las páginas ocultas. */
export const isVisibleHref = (href?: string | null) =>
  !href || !HIDDEN_PAGES.some((slug) => href.includes(`/${slug}/`));
