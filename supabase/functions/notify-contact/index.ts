// Edge Function: envía un correo a la profesional cuando llega un mensaje nuevo del formulario.
// La llama un trigger de la base de datos (ver migración 20261029000001_notify_contact.sql)
// con { id } del mensaje. La función vuelve a leer el mensaje con la service role,
// así nadie puede inventar el contenido del correo, y lo marca como notificado
// para no enviarlo dos veces.
//
// Secretos (Supabase → Edge Functions → Secrets):
//   RESEND_API_KEY  (obligatorio)
//   NOTIFY_TO       (opcional, por defecto psicoyolimaop@gmail.com)
//   NOTIFY_FROM     (opcional, por defecto "Psicólogos Cali <onboarding@resend.dev>")
import { createClient } from 'npm:@supabase/supabase-js@2';

const esc = (s: unknown) =>
  String(s ?? '-').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

Deno.serve(async (req) => {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return new Response('RESEND_API_KEY no configurada', { status: 503 });

  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== 'string') return new Response('id requerido', { status: 400 });

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: r } = await db
    .from('contact_messages')
    .select('*')
    .eq('id', id)
    .eq('notificado', false)
    .maybeSingle();
  if (!r) return new Response('nada que notificar', { status: 200 });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: Deno.env.get('NOTIFY_FROM') ?? 'Psicólogos Cali <onboarding@resend.dev>',
      to: Deno.env.get('NOTIFY_TO') ?? 'psicoyolimaop@gmail.com',
      reply_to: r.email,
      subject: `Nuevo mensaje desde la web: ${r.nombre}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#1c244b">
          <h2 style="color:#7b3fb8;margin:0 0 12px">Nuevo mensaje desde psicologoscali.com</h2>
          <p><b>Nombre:</b> ${esc(r.nombre)}<br>
             <b>Teléfono:</b> ${esc(r.telefono)}<br>
             <b>Email:</b> ${esc(r.email)}<br>
             <b>Servicio:</b> ${esc(r.servicio ?? 'No especificado')}</p>
          <p style="padding:12px 16px;background:#f1e6fb;border-radius:8px">${esc(r.mensaje).replace(/\n/g, '<br>')}</p>
          <p style="color:#5d6280;font-size:13px">Puedes responder este correo directamente para contestarle a ${esc(r.nombre)}.</p>
        </div>`,
    }),
  });

  if (!res.ok) return new Response(await res.text(), { status: 502 });
  await db.from('contact_messages').update({ notificado: true }).eq('id', id);
  return new Response('ok');
});
