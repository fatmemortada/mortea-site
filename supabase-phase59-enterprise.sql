-- Mortéa Phase 59 — Enterprise Scaling Infrastructure

create table if not exists enterprise_regions (
  id bigint generated always as identity primary key,
  region_name text,
  operational_status text default 'active',
  created_at timestamp with time zone default now()
);

create table if not exists enterprise_clients (
  id bigint generated always as identity primary key,
  company_name text,
  client_health numeric,
  created_at timestamp with time zone default now()
);

create table if not exists franchise_operations (
  id bigint generated always as identity primary key,
  city text,
  status text default 'planned',
  created_at timestamp with time zone default now()
);
