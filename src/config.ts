// Datos generales del sitio. Cambia aquí y se actualiza en todas las páginas.
export const SITE = {
  name: 'Centro de Psicología y Cuidado Mental',
  shortName: 'Psicólogos Cali',
  url: 'https://www.psicologoscali.com',
  email: 'info@psicologoscali.com',
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

  // La página de terapia para niños estaba en "privado" en WordPress.
  // Cambia a true para publicarla y mostrarla en el menú y en las tarjetas de servicios.
  showNinos: false,
};

export const NINOS_SLUG = 'terapia-enfocada-en-ninos';

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

/** Quita enlaces a la página de niños mientras esté oculta. */
export const isVisibleHref = (href?: string | null) =>
  SITE.showNinos || !href || !href.includes(NINOS_SLUG);
