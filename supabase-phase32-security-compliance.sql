-- Mortéa Phase 32 — Security & Compliance Infrastructure

create table if not exists user_consents (
  id bigint generated always as identity primary key,
  user_id uuid,
  consent_type text,
  granted boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists security_audit_logs (
  id bigint generated always as identity primary key,
  action text,
  user_id uuid,
  created_at timestamp with time zone default now()
);

create table if not exists account_deletion_requests (
  id bigint generated always as identity primary key,
  user_id uuid,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists provider_compliance_records (
  id bigint generated always as identity primary key,
  provider_id bigint,
  compliance_type text,
  status text default 'active',
  created_at timestamp with time zone default now()
);
