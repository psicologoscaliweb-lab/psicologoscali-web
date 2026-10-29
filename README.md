# psicologoscali-web

Sitio web de **Centro de Psicología y Cuidado Mental** (psicologoscali.com), migrado desde WordPress/Elementor a [Astro](https://astro.build) + [Supabase](https://supabase.com).

## Estructura

```
src/
  config.ts          ← teléfono, correo, WhatsApp, menú y opción de mostrar la página de niños
  data/site.json     ← TODO el texto de las páginas (extraído del export de WordPress)
  components/        ← secciones reutilizables (hero, acordeón, testimonios, formulario…)
  pages/             ← rutas: / y /[slug]/ (mismas URLs que WordPress)
public/images/       ← imágenes (se descargan con `npm run images`)
supabase/            ← tabla del formulario de contacto y función de aviso por correo
```

Para cambiar un texto, edita `src/data/site.json`. Para cambiar teléfono, correo o menú, edita `src/config.ts`.

## Uso local

```bash
npm install
cp .env.example .env     # y llena las claves de Supabase
npm run images           # descarga las imágenes del WordPress actual (una sola vez, antes de apagarlo)
npm run dev              # http://localhost:4321
```

## Formulario de contacto (Supabase)

- Proyecto Supabase: `psicologoscali` (región São Paulo). URL y clave pública están en `src/config.ts`.
- Los mensajes llegan a la tabla `contact_messages` (Table Editor). El público solo puede insertar, no leer.
- La columna `atendido` sirve para marcar los mensajes ya respondidos.
- Opcional, aviso por correo: desplegar `supabase/functions/notify-contact` y crear un Database Webhook (INSERT en `contact_messages`).

## Despliegue (Vercel o Netlify)

- Importa el repositorio, framework **Astro**, comando `npm run build`, carpeta `dist`.
- Agrega las variables de entorno de `.env.example`.
- Cuando todo esté revisado, apunta el dominio `psicologoscali.com` al nuevo hosting.

Las redirecciones de URLs viejas están en `astro.config.mjs`.
