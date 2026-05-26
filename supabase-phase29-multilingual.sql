-- Mortéa Phase 29 — Multilingual Platform

create table if not exists user_languages (
  id bigint generated always as identity primary key,
  user_id uuid,
  language_code text default 'en',
  created_at timestamp with time zone default now()
);

create table if not exists provider_translations (
  id bigint generated always as identity primary key,
  provider_id bigint,
  language_code text,
  translated_bio text,
  created_at timestamp with time zone default now()
);
