-- Mortéa Phase 45 — Analytics & Revenue Scaling

create table if not exists revenue_reports (
  id bigint generated always as identity primary key,
  month text,
  total_revenue numeric,
  created_at timestamp with time zone default now()
);

create table if not exists provider_metrics (
  id bigint generated always as identity primary key,
  provider_id bigint,
  bookings integer,
  revenue numeric,
  created_at timestamp with time zone default now()
);

create table if not exists marketplace_kpis (
  id bigint generated always as identity primary key,
  active_users integer,
  total_bookings integer,
  total_revenue numeric,
  created_at timestamp with time zone default now()
);

create table if not exists client_lifetime_values (
  id bigint generated always as identity primary key,
  user_id uuid,
  lifetime_value numeric,
  created_at timestamp with time zone default now()
);
