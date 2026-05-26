-- Mortéa Phase 44 — AI Concierge Improvements

create table if not exists ai_client_profiles (
  id bigint generated always as identity primary key,
  user_id uuid,
  preferences jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists ai_recommendation_history (
  id bigint generated always as identity primary key,
  user_id uuid,
  recommendation text,
  created_at timestamp with time zone default now()
);

create table if not exists ai_followups (
  id bigint generated always as identity primary key,
  user_id uuid,
  followup_message text,
  created_at timestamp with time zone default now()
);
