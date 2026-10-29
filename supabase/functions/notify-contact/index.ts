// Edge Function: envía un correo cuando llega un mensaje nuevo del formulario.
// Se conecta con un "Database Webhook" de Supabase (INSERT en contact_messages).
// Requiere los secretos: RESEND_API_KEY, NOTIFY_TO (ej. psicoyolimaop@gmail.com),
// NOTIFY_FROM (remitente verificado en Resend) y WEBHOOK_SECRET.

Deno.serve(async (req) => {
  if (req.headers.get('x-webhook-secret') !== Deno.env.get('WEBHOOK_SECRET')) {
    return new Response('unauthorized', { status: 401 });
  }
  const { record: r } = await req.json();
  const esc = (s: string | null) =>
    String(s ?? '-').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: Deno.env.get('NOTIFY_FROM'),
      to: Deno.env.get('NOTIFY_TO'),
      reply_to: r.email,
      subject: `Nuevo mensaje web: ${r.nombre}`,
      html: `<p><b>Nombre:</b> ${esc(r.nombre)}<br><b>Teléfono:</b> ${esc(r.telefono)}<br>
             <b>Email:</b> ${esc(r.email)}<br><b>Servicio:</b> ${esc(r.servicio)}</p>
             <p>${esc(r.mensaje).replace(/\n/g, '<br>')}</p>`,
    }),
  });
  return new Response(res.ok ? 'ok' : await res.text(), { status: res.ok ? 200 : 500 });
});
