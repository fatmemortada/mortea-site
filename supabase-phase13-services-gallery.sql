-- Mortéa Phase 13 — Services + Gallery Ecosystem
-- Run this in Supabase SQL Editor.

-- 1) Provider Services
create table if not exists public.provider_services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.professionals(id) on delete cascade,
  service_name text not null,
  service_description text,
  service_price text,
  service_duration text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) Provider Gallery
create table if not exists public.provider_gallery (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.professionals(id) on delete cascade,
  image_url text not null,
  image_alt text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3) Indexes
create index if not exists idx_provider_services_provider_id
on public.provider_services(provider_id);

create index if not exists idx_provider_gallery_provider_id
on public.provider_gallery(provider_id);

-- 4) Enable RLS
alter table public.provider_services enable row level security;
alter table public.provider_gallery enable row level security;

-- 5) Public read policies
drop policy if exists "Public can view active provider services" on public.provider_services;
create policy "Public can view active provider services"
on public.provider_services
for select
using (is_active = true);

drop policy if exists "Public can view active provider gallery" on public.provider_gallery;
create policy "Public can view active provider gallery"
on public.provider_gallery
for select
using (is_active = true);

-- 6) Authenticated provider insert/update/delete policies
-- IMPORTANT: This assumes public.professionals has a user_id uuid column linked to auth.uid().
-- If your column name is different, replace p.user_id below.

drop policy if exists "Providers can insert their own services" on public.provider_services;
create policy "Providers can insert their own services"
on public.provider_services
for insert
to authenticated
with check (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_services.provider_id
    and p.user_id = auth.uid()
  )
);

drop policy if exists "Providers can update their own services" on public.provider_services;
create policy "Providers can update their own services"
on public.provider_services
for update
to authenticated
using (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_services.provider_id
    and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_services.provider_id
    and p.user_id = auth.uid()
  )
);

drop policy if exists "Providers can delete their own services" on public.provider_services;
create policy "Providers can delete their own services"
on public.provider_services
for delete
to authenticated
using (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_services.provider_id
    and p.user_id = auth.uid()
  )
);

drop policy if exists "Providers can insert their own gallery" on public.provider_gallery;
create policy "Providers can insert their own gallery"
on public.provider_gallery
for insert
to authenticated
with check (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_gallery.provider_id
    and p.user_id = auth.uid()
  )
);

drop policy if exists "Providers can update their own gallery" on public.provider_gallery;
create policy "Providers can update their own gallery"
on public.provider_gallery
for update
to authenticated
using (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_gallery.provider_id
    and p.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_gallery.provider_id
    and p.user_id = auth.uid()
  )
);

drop policy if exists "Providers can delete their own gallery" on public.provider_gallery;
create policy "Providers can delete their own gallery"
on public.provider_gallery
for delete
to authenticated
using (
  exists (
    select 1
    from public.professionals p
    where p.id = provider_gallery.provider_id
    and p.user_id = auth.uid()
  )
);

-- 7) Updated-at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_provider_services_updated_at on public.provider_services;
create trigger set_provider_services_updated_at
before update on public.provider_services
for each row execute function public.set_updated_at();

drop trigger if exists set_provider_gallery_updated_at on public.provider_gallery;
create trigger set_provider_gallery_updated_at
before update on public.provider_gallery
for each row execute function public.set_updated_at();
