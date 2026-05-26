-- Mortéa Phase 30 — Enterprise Marketplace Expansion

create table if not exists enterprise_accounts (
  id bigint generated always as identity primary key,
  company_name text,
  billing_email text,
  created_at timestamp with time zone default now()
);

create table if not exists provider_locations (
  id bigint generated always as identity primary key,
  provider_id bigint,
  city text,
  address text,
  created_at timestamp with time zone default now()
);

create table if not exists staff_members (
  id bigint generated always as identity primary key,
  provider_location_id bigint,
  full_name text,
  role text,
  created_at timestamp with time zone default now()
);

create table if not exists franchise_reports (
  id bigint generated always as identity primary key,
  enterprise_account_id bigint,
  total_revenue numeric default 0,
  total_bookings integer default 0,
  created_at timestamp with time zone default now()
);
