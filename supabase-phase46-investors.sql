-- Mortéa Phase 46 — Investor & Partnership Infrastructure

create table if not exists investor_updates (
  id bigint generated always as identity primary key,
  title text,
  update_content text,
  created_at timestamp with time zone default now()
);

create table if not exists partnerships (
  id bigint generated always as identity primary key,
  partner_name text,
  partnership_type text,
  created_at timestamp with time zone default now()
);

create table if not exists expansion_targets (
  id bigint generated always as identity primary key,
  city text,
  province text,
  status text default 'planned',
  created_at timestamp with time zone default now()
);
