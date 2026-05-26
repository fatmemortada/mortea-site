-- Mortéa Phase 39 — Mobile App Completion

create table if not exists mobile_sessions (
  id bigint generated always as identity primary key,
  user_id uuid,
  device_type text,
  created_at timestamp with time zone default now()
);

create table if not exists mobile_push_tokens (
  id bigint generated always as identity primary key,
  user_id uuid,
  push_token text,
  created_at timestamp with time zone default now()
);
