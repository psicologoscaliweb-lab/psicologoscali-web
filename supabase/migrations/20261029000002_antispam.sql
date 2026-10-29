-- Antispam del formulario de contacto (se aplica en el servidor, aunque un bot se salte la página).
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at);

create or replace function public.contact_messages_antispam()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- 1) Máximo 3 mensajes por correo electrónico en una hora
  if (select count(*) from contact_messages
      where lower(email) = lower(new.email) and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'demasiados mensajes' using errcode = 'P0001';
  end if;

  -- 2) Máximo 20 mensajes en total cada 10 minutos (frena ataques masivos)
  if (select count(*) from contact_messages where created_at > now() - interval '10 minutes') >= 20 then
    raise exception 'demasiados mensajes' using errcode = 'P0001';
  end if;

  -- 3) Mensajes con más de 2 enlaces: típico de spam
  if (select count(*) from regexp_matches(new.mensaje, '(https?://|www\.)', 'gi')) > 2 then
    raise exception 'mensaje no permitido' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.contact_messages_antispam() from public, anon, authenticated;

drop trigger if exists contact_messages_antispam on public.contact_messages;
create trigger contact_messages_antispam
  before insert on public.contact_messages
  for each row execute function public.contact_messages_antispam();
