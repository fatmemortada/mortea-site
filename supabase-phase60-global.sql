-- Mortéa Phase 60 — Global Platform Infrastructure

create table if not exists international_operations (
  id bigint generated always as identity primary key,
  country text,
  operational_status text default 'active',
  created_at timestamp with time zone default now()
);

create table if not exists global_ai_logs (
  id bigint generated always as identity primary key,
  ai_action text,
  created_at timestamp with time zone default now()
);

create table if not exists worldwide_marketplaces (
  id bigint generated always as identity primary key,
  country text,
  status text default 'active',
  created_at timestamp with time zone default now()
);\n