-- Mortéa Phase 54 — Real Dashboard System

create table if not exists dashboard_activity_logs (
  id bigint generated always as identity primary key,
  provider_id bigint,
  activity_type text,
  created_at timestamp with time zone default now()
);

create table if not exists revenue_snapshots (
  id bigint generated always as identity primary key,
  provider_id bigint,
  revenue numeric,
  bookings integer,
  created_at timestamp with time zone default now()
);\n