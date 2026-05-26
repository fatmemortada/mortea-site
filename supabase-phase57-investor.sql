-- Mortéa Phase 57 — Investor Ready Polish

create table if not exists investor_metrics (
  id bigint generated always as identity primary key,
  active_providers integer,
  bookings integer,
  revenue numeric,
  created_at timestamp with time zone default now()
);

create table if not exists growth_forecasts (
  id bigint generated always as identity primary key,
  forecast_name text,
  forecast_value text,
  created_at timestamp with time zone default now()
);
