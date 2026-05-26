-- Mortéa Phase 42 — Public Launch Infrastructure

create table if not exists launch_events (
  id bigint generated always as identity primary key,
  event_name text,
  created_at timestamp with time zone default now()
);

create table if not exists launch_announcements (
  id bigint generated always as identity primary key,
  title text,
  message text,
  published boolean default false,
  created_at timestamp with time zone default now()
);
