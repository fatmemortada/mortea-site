-- Mortéa Phase 28 — Omnichannel Communications

create table if not exists communication_preferences (
  id bigint generated always as identity primary key,
  user_id uuid,
  sms_enabled boolean default true,
  whatsapp_enabled boolean default true,
  email_enabled boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists communication_campaigns (
  id bigint generated always as identity primary key,
  campaign_name text,
  channel text,
  status text default 'draft',
  created_at timestamp with time zone default now()
);\n