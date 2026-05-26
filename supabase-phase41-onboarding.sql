-- Mortéa Phase 41 — Real Provider Onboarding

create table if not exists provider_applications (
  id bigint generated always as identity primary key,
  business_name text,
  business_email text,
  city text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists provider_documents (
  id bigint generated always as identity primary key,
  provider_id bigint,
  document_type text,
  verified boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists onboarding_progress (
  id bigint generated always as identity primary key,
  provider_id bigint,
  onboarding_step text,
  completed boolean default false,
  created_at timestamp with time zone default now()
);
