-- Mortéa Phase 43 — Performance Optimization

create table if not exists performance_logs (
  id bigint generated always as identity primary key,
  page_name text,
  load_time numeric,
  created_at timestamp with time zone default now()
);

create table if not exists cache_logs (
  id bigint generated always as identity primary key,
  cache_key text,
  cache_status text,
  created_at timestamp with time zone default now()
);
