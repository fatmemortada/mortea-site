-- Mortéa Phase 35 — Quality Control & Trust Infrastructure

create table if not exists provider_quality_scores (
  id bigint generated always as identity primary key,
  provider_id bigint,
  quality_score numeric default 0,
  rating_score numeric default 0,
  response_score numeric default 0,
  completion_score numeric default 0,
  updated_at timestamp with time zone default now()
);

create table if not exists provider_trust_badges (
  id bigint generated always as identity primary key,
  provider_id bigint,
  badge_name text,
  active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists review_insights (
  id bigint generated always as identity primary key,
  review_id bigint,
  sentiment text,
  keywords text[],
  created_at timestamp with time zone default now()
);

create table if not exists quality_alerts (
  id bigint generated always as identity primary key,
  provider_id bigint,
  alert_type text,
  alert_message text,
  resolved boolean default false,
  created_at timestamp with time zone default now()
);
