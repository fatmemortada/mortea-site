-- Mortéa Phase 53 — Live Data Integration Support

create table if not exists live_data_health_checks (
  id bigint generated always as identity primary key,
  table_name text,
  status text default 'active',
  checked_at timestamp with time zone default now()
);

create table if not exists homepage_metrics (
  id bigint generated always as identity primary key,
  total_providers integer default 0,
  total_bookings integer default 0,
  total_reviews integer default 0,
  updated_at timestamp with time zone default now()
);
