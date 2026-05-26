-- Mortéa Phase 49 — Global AI Expansion

create table if not exists global_regions (
  id bigint generated always as identity primary key,
  region_name text,
  status text default 'planned',
  created_at timestamp with time zone default now()
);

create table if not exists international_providers (
  id bigint generated always as identity primary key,
  business_name text,
  country text,
  created_at timestamp with time zone default now()
);

create table if not exists currency_rates (
  id bigint generated always as identity primary key,
  currency_code text,
  exchange_rate numeric,
  created_at timestamp with time zone default now()
);
