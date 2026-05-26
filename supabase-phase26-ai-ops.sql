-- Mortéa Phase 26 — AI Automation & Business Intelligence

create table if not exists automation_rules (
  id bigint generated always as identity primary key,
  provider_id bigint,
  automation_type text,
  active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists forecast_reports (
  id bigint generated always as identity primary key,
  provider_id bigint,
  forecast_type text,
  forecast_value numeric,
  created_at timestamp with time zone default now()
);

create table if not exists engagement_campaigns (
  id bigint generated always as identity primary key,
  provider_id bigint,
  campaign_name text,
  campaign_status text default 'draft',
  created_at timestamp with time zone default now()
);

create table if not exists business_metrics (
  id bigint generated always as identity primary key,
  provider_id bigint,
  metric_name text,
  metric_value numeric,
  created_at timestamp with time zone default now()
);

create table if not exists ai_recommendations (
  id bigint generated always as identity primary key,
  provider_id bigint,
  recommendation text,
  confidence_score numeric,
  created_at timestamp with time zone default now()
);
