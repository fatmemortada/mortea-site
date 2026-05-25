-- Mortéa Phase 8: Pricing, 5-day trial, and client reviews
-- Run this in Supabase SQL Editor.

-- Add membership/payment fields to professionals
alter table professionals
add column if not exists plan_type text default 'professional',
add column if not exists monthly_price numeric default 35,
add column if not exists trial_starts_at timestamptz default now(),
add column if not exists trial_ends_at timestamptz default (now() + interval '5 days'),
add column if not exists subscription_status text default 'trial',
add column if not exists is_featured boolean default false;

-- Plan options:
-- professional = $35/month
-- creator = $30/month
-- single_user = $10/month

-- Reviews table
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  client_name text,
  client_email text,
  provider_name text,

  professional_id uuid references professionals(id) on delete set null,

  rating int check (rating >= 1 and rating <= 5),
  review_text text,

  status text default 'pending'
);

alter table reviews enable row level security;

drop policy if exists "Public can submit reviews" on reviews;
create policy "Public can submit reviews"
on reviews
for insert
with check (true);

drop policy if exists "Public can view approved reviews" on reviews;
create policy "Public can view approved reviews"
on reviews
for select
using (status = 'approved');

-- Optional helper updates for existing professionals
-- update professionals
-- set plan_type = 'professional', monthly_price = 35, trial_ends_at = now() + interval '5 days'
-- where plan_type is null;

-- Approve review example:
-- update reviews set status = 'approved' where id = 'review-id-here';
