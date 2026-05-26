-- Mortéa Phase 14 — Supabase Storage Uploads
-- Run this in Supabase SQL Editor after Phase 13.

-- 1) Add a storage path column to connect database rows to Storage objects.
alter table public.provider_gallery
add column if not exists storage_path text;

-- 2) Create a public Storage bucket for provider gallery images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'provider-gallery',
  'provider-gallery',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- 3) Public can view gallery images.
drop policy if exists "Public can view provider gallery images" on storage.objects;
create policy "Public can view provider gallery images"
on storage.objects
for select
using (bucket_id = 'provider-gallery');

-- 4) Providers can upload images only into their own provider folder.
-- The dashboard stores images as: provider-gallery/{provider_id}/filename.jpg

drop policy if exists "Providers can upload own gallery images" on storage.objects;
create policy "Providers can upload own gallery images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'provider-gallery'
  and exists (
    select 1
    from public.professionals p
    where p.id::text = (storage.foldername(name))[1]
    and p.user_id = auth.uid()
  )
);

-- 5) Providers can update their own uploaded images.
drop policy if exists "Providers can update own gallery images" on storage.objects;
create policy "Providers can update own gallery images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'provider-gallery'
  and exists (
    select 1
    from public.professionals p
    where p.id::text = (storage.foldername(name))[1]
    and p.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'provider-gallery'
  and exists (
    select 1
    from public.professionals p
    where p.id::text = (storage.foldername(name))[1]
    and p.user_id = auth.uid()
  )
);

-- 6) Providers can delete their own uploaded images.
drop policy if exists "Providers can delete own gallery images" on storage.objects;
create policy "Providers can delete own gallery images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'provider-gallery'
  and exists (
    select 1
    from public.professionals p
    where p.id::text = (storage.foldername(name))[1]
    and p.user_id = auth.uid()
  )
);
