// Datos generales del sitio. Cambia aquí y se actualiza en todas las páginas.
export const SITE = {
  name: 'Yolima Ospina Peña',
  role: 'Psicóloga Clínica',
  url: 'https://www.psicologoscali.com',
  email: 'psicoyolimaop@gmail.com',
  phone: '323 541 1356',
  // Número en formato internacional, sin "+" ni espacios (Colombia = 57)
  whatsapp: '573235411356',
  whatsappMessage: 'Hola Yolima, quisiera información sobre una cita.',
  city: 'Cali, Colombia',
  modality: 'Atención presencial en Cali y virtual',

  // Supabase (formulario de contacto). Estas claves son públicas por diseño:
  // la seguridad la da la regla RLS que solo permite INSERTAR mensajes.
  // Nunca pongas aquí la clave "service_role" / "secret".
  supabaseUrl: 'https://wkesttoeixwtpomfmnew.supabase.co',
  supabaseKey: 'sb_publishable_9x_z20M1olBgf3TWQkQntw_hhi8Cshw',
};

export const SERVICES = [
  {
    title: 'Terapia psicológica para adultos',
    short: 'Terapia para adultos',
    href: '/terapia-enfocada-en-adultos/',
    img: '/images/2023-12-persona-joven-ansiedad-hablando-especialista_23-2149130442.jpg',
    text: 'Un proceso personal para comprender y trabajar la ansiedad, la depresión, la angustia o las crisis emocionales.',
  },
  {
    title: 'Evaluación psicológica',
    short: 'Evaluación psicológica',
    href: '/evaluacion-psicologica/',
    img: '/images/2024-01-consejero-tomando-notas-ademas-mujer.jpg',
    text: 'Aplicación de pruebas psicológicas para conocer con más claridad tu estado emocional y orientar el proceso.',
  },
  {
    title: 'Orientación psiquiátrica',
    short: 'Orientación psiquiátrica',
    href: '/psiquiatria/',
    img: '/images/2024-01-chica-joven-tiro-medio-hablando-terapeuta.jpg',
    text: 'Si tu proceso necesita valoración médica, te oriento y te remito a un psiquiatra para que ambos acompañamientos se complementen.',
  },
];

export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi/' },
  {
    label: 'Servicios',
    href: '/servicios/',
    children: SERVICES.map((s) => ({ label: s.short, href: s.href })),
  },
  { label: 'Contacto', href: '/contactanos/' },
];

/** Se conserva por compatibilidad con componentes que filtran enlaces. */
export const isVisibleHref = (_href?: string | null) => true;
