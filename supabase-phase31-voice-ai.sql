-- Mortéa Phase 31 — AI Voice Concierge & Luxury Experience

create table if not exists voice_preferences (
  id bigint generated always as identity primary key,
  user_id uuid,
  voice_enabled boolean default true,
  audio_notifications boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists ai_voice_sessions (
  id bigint generated always as identity primary key,
  user_id uuid,
  voice_command text,
  ai_response text,
  created_at timestamp with time zone default now()
);

create table if not exists luxury_experience_profiles (
  id bigint generated always as identity primary key,
  user_id uuid,
  vip_level text,
  personalized_preferences jsonb,
  created_at timestamp with time zone default now()
);
