-- Mortéa Phase 56 — Premium Mobile UX

create table if not exists mobile_sessions_v2 (
  id bigint generated always as identity primary key,
  user_id uuid,
  session_type text,
  created_at timestamp with time zone default now()
);

create table if not exists mobile_ui_events (
  id bigint generated always as identity primary key,
  event_name text,
  created_at timestamp with time zone default now()
);
