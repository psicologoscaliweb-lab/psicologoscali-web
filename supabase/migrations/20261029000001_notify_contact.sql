-- Aviso por correo de cada mensaje nuevo del formulario (Edge Function notify-contact).
alter table public.contact_messages add column if not exists notificado boolean not null default false;
update public.contact_messages set notificado = true where notificado = false; -- mensajes previos (pruebas)

create extension if not exists pg_net with schema extensions;

create or replace function public.notify_new_contact_message()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  perform net.http_post(
    url := 'https://wkesttoeixwtpomfmnew.supabase.co/functions/v1/notify-contact',
    body := jsonb_build_object('id', new.id),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      -- clave "anon" pública: solo sirve para pasar la verificación JWT;
      -- la función relee el mensaje con permisos propios.
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZXN0dG9laXh3dHBvbWZtbmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyODg2MzMsImV4cCI6MjEwODg2NDYzM30._wRU6Yh_pFpVeXGBBmA0eI-s5IhE_VDky-KaQu7z-Sk'
    )
  );
  return new;
end;
$$;

revoke all on function public.notify_new_contact_message() from public, anon, authenticated;

drop trigger if exists on_contact_message_insert on public.contact_messages;
create trigger on_contact_message_insert
  after insert on public.contact_messages
  for each row execute function public.notify_new_contact_message();
