-- Mortéa Phase 21 — AI Recommendation Engine

create table if not exists client_preferences (
  id bigint generated always as identity primary key,
  user_id uuid,
  city text,
  category text,
  price_range text,
  language text,
  preferred_services text[],
  created_at timestamp with time zone default now()
);

create table if not exists recommendation_events (
  id bigint generated always as identity primary key,
  provider_id bigint,
  user_id uuid,
  event_type text,
  score numeric default 0,
  created_at timestamp with time zone default now()
);

alter table client_preferences enable row level security;
alter table recommendation_events enable row level security;
