-- Mortéa Phase 51 — Autonomous AI Infrastructure

create table if not exists ai_agents (
  id bigint generated always as identity primary key,
  region text,
  status text default 'active',
  created_at timestamp with time zone default now()
);

create table if not exists ai_decisions (
  id bigint generated always as identity primary key,
  recommendation text,
  confidence numeric,
  created_at timestamp with time zone default now()
);

create table if not exists self_healing_logs (
  id bigint generated always as identity primary key,
  issue_type text,
  repaired boolean default false,
  created_at timestamp with time zone default now()
);
