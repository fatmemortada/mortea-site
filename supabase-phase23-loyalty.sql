-- Mortéa Phase 23 — Loyalty & Referral Ecosystem

create table if not exists loyalty_points (
  id bigint generated always as identity primary key,
  user_id uuid,
  points integer default 0,
  updated_at timestamp with time zone default now()
);

create table if not exists referrals (
  id bigint generated always as identity primary key,
  referrer_id uuid,
  referred_user_id uuid,
  reward_points integer default 0,
  created_at timestamp with time zone default now()
);

create table if not exists vip_memberships (
  id bigint generated always as identity primary key,
  user_id uuid,
  membership_tier text,
  active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists reward_transactions (
  id bigint generated always as identity primary key,
  user_id uuid,
  points integer,
  transaction_type text,
  created_at timestamp with time zone default now()
);
