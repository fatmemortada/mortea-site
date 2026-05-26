-- Mortéa Phase 58 — Real World Launch Operations

create table if not exists support_tickets (
  id bigint generated always as identity primary key,
  user_id uuid,
  issue text,
  status text default 'open',
  created_at timestamp with time zone default now()
);

create table if not exists provider_success_metrics (
  id bigint generated always as identity primary key,
  provider_id bigint,
  health_score numeric,
  created_at timestamp with time zone default now()
);

create table if not exists daily_growth_logs (
  id bigint generated always as identity primary key,
  active_users integer,
  bookings integer,
  created_at timestamp with time zone default now()
);
