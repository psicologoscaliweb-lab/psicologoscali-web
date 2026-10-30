// Datos generales del sitio. Cambia aquí y se actualiza en todas las páginas.
export const SITE = {
  name: 'Yolima Ospina Peña',
  role: 'Psicóloga Clínica',
  title: 'Psicóloga especialista en Psicología Clínica con orientación psicoanalítica',
  url: 'https://www.psicologoscali.com',
  email: 'psicoyolimaop@gmail.com',
  phone: '323 541 1356',
  // Número en formato internacional, sin "+" ni espacios (Colombia = 57)
  whatsapp: '573235411356',
  whatsappMessage: 'Hola Yolima, quisiera información sobre la atención psicológica.',
  city: 'Cali, Colombia',
  modality: 'Atención presencial en Cali y modalidad virtual',

  // Supabase (formulario de contacto). Estas claves son públicas por diseño:
  // la seguridad la da la regla RLS que solo permite INSERTAR mensajes.
  // Nunca pongas aquí la clave "service_role" / "secret".
  supabaseUrl: 'https://wkesttoeixwtpomfmnew.supabase.co',
  supabaseKey: 'sb_publishable_9x_z20M1olBgf3TWQkQntw_hhi8Cshw',
};

/** Enlace de WhatsApp con un mensaje inicial (para saber desde qué sección escriben). */
export const wa = (msg: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

// Tarjetas de servicios (se muestran en Inicio y Servicios)
export const SERVICES = [
  {
    title: 'Psicoterapia individual',
    short: 'Psicoterapia individual',
    href: '/terapia-enfocada-en-adultos/',
    img: '/images/2023-12-persona-joven-ansiedad-hablando-especialista_23-2149130442.jpg',
    text: 'Un espacio de encuentro y escucha para personas adultas que desean comprender su malestar emocional y trabajar aspectos de su historia y sus relaciones.',
  },
  {
    title: 'Orientación psicológica',
    short: 'Orientación psicológica',
    href: '/servicios/#orientacion',
    img: '/images/2024-01-chica-joven-tiro-medio-hablando-terapeuta.jpg',
    text: 'Un acompañamiento para abordar situaciones personales o emocionales que generan inquietud, confusión o dificultad en la vida cotidiana.',
  },
  {
    title: 'Talleres de autocuidado',
    short: 'Talleres de autocuidado',
    href: '/talleres-de-autocuidado/',
    img: '/images/2024-01-participantes-terapia-grupo-juntando-manos-unidad-sesion-centro-medico.jpg',
    text: 'Espacios grupales para mujeres cuidadoras, organizaciones e instituciones que quieren promover el bienestar emocional.',
  },
  {
    title: 'Círculo vivencial de mujeres',
    short: 'Círculo de mujeres',
    href: '/circulo-de-mujeres/',
    img: '/images/2024-01-mujer-feliz-hermosa-que-siente-feliz-mientras-abraza-mujer-grupo-rehabilitacion-mujer-joven-ofreciendo-apoyo-e1704870328964.jpg',
    text: '"Lo que estás cargando y no ves": una pausa para escucharte, reconocer lo que pesa y hacer espacio para ti.',
  },
];

export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi/' },
  {
    label: 'Servicios',
    href: '/servicios/',
    children: [
      ...SERVICES.map((s) => ({ label: s.short, href: s.href })),
      { label: 'Valoración psiquiátrica', href: '/psiquiatria/' },
    ],
  },
  { label: 'Contacto', href: '/contactanos/' },
];

/** Se conserva por compatibilidad con componentes que filtran enlaces. */
export const isVisibleHref = (_href?: string | null) => true;
