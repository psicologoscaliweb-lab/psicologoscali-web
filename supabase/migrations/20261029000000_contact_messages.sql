-- Mensajes del formulario de contacto del sitio web.
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null check (char_length(nombre) between 1 and 120),
  telefono    text not null check (char_length(telefono) between 5 and 30),
  email       text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  servicio    text check (char_length(servicio) <= 80),
  mensaje     text not null check (char_length(mensaje) between 1 and 4000),
  pagina      text check (char_length(pagina) <= 200),
  atendido    boolean not null default false
);

alter table public.contact_messages enable row level security;

-- El público (clave "anon" del sitio) SOLO puede insertar mensajes nuevos.
-- No puede leer, editar ni borrar: los mensajes son datos sensibles de pacientes.
drop policy if exists "web puede enviar mensajes" on public.contact_messages;
create policy "web puede enviar mensajes"
  on public.contact_messages
  for insert
  to anon
  with check (atendido = false);

-- Los mensajes se leen desde el panel de Supabase (Table Editor) o con la service_role key.
