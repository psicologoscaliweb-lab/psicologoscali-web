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

1. Crea un proyecto en Supabase y ejecuta `supabase/migrations/20261029000000_contact_messages.sql` en el SQL Editor.
2. Copia `Project URL` y `anon key` a las variables `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`.
3. Los mensajes llegan a la tabla `contact_messages` (el público solo puede insertar, no leer).
4. Opcional, aviso por correo: despliega `supabase/functions/notify-contact` y crea un Database Webhook (INSERT en `contact_messages`) que la llame con el header `x-webhook-secret`.

Si las variables de Supabase no están configuradas, el formulario abre el correo del visitante como respaldo.

## Despliegue (Vercel o Netlify)

- Importa el repositorio, framework **Astro**, comando `npm run build`, carpeta `dist`.
- Agrega las variables de entorno de `.env.example`.
- Cuando todo esté revisado, apunta el dominio `psicologoscali.com` al nuevo hosting.

Las redirecciones de URLs viejas están en `astro.config.mjs`.
