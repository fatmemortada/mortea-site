-- Mortéa Phase 47 — Expansion Infrastructure

create table if not exists expansion_regions (
  id bigint generated always as identity primary key,
  region_name text,
  status text default 'planned',
  created_at timestamp with time zone default now()
);

create table if not exists city_market_analysis (
  id bigint generated always as identity primary key,
  city_name text,
  market_score numeric,
  created_at timestamp with time zone default now()
);

create table if not exists regional_launches (
  id bigint generated always as identity primary key,
  region_name text,
  launch_date timestamp with time zone,
  created_at timestamp with time zone default now()
);
