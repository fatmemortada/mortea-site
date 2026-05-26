-- Mortéa Phase 25 — Enterprise Admin & Moderation

create table if not exists provider_verifications (
  id bigint generated always as identity primary key,
  provider_id bigint,
  verification_status text default 'pending',
  submitted_at timestamp with time zone default now()
);

create table if not exists moderation_queue (
  id bigint generated always as identity primary key,
  entity_type text,
  entity_id bigint,
  moderation_status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists platform_activity_logs (
  id bigint generated always as identity primary key,
  action text,
  actor_id uuid,
  created_at timestamp with time zone default now()
);

create table if not exists risk_flags (
  id bigint generated always as identity primary key,
  provider_id bigint,
  risk_reason text,
  resolved boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists admin_actions (
  id bigint generated always as identity primary key,
  admin_id uuid,
  action text,
  target_entity text,
  target_id bigint,
  created_at timestamp with time zone default now()
);
