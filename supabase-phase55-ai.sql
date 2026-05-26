-- Mortéa Phase 55 — Real AI Concierge Experience

create table if not exists ai_conversations (
  id bigint generated always as identity primary key,
  user_id uuid,
  message text,
  response text,
  created_at timestamp with time zone default now()
);

create table if not exists ai_user_preferences (
  id bigint generated always as identity primary key,
  user_id uuid,
  preferences jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists ai_recommendation_logs (
  id bigint generated always as identity primary key,
  user_id uuid,
  recommendation text,
  created_at timestamp with time zone default now()
);
