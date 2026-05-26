-- Mortéa Phase 40 — Stripe Live Payments

create table if not exists stripe_customers (
  id bigint generated always as identity primary key,
  user_id uuid,
  stripe_customer_id text,
  created_at timestamp with time zone default now()
);

create table if not exists stripe_provider_accounts (
  id bigint generated always as identity primary key,
  provider_id bigint,
  stripe_account_id text,
  payouts_enabled boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists invoices (
  id bigint generated always as identity primary key,
  booking_id bigint,
  total numeric,
  created_at timestamp with time zone default now()
);

create table if not exists refunds (
  id bigint generated always as identity primary key,
  payment_id bigint,
  refund_amount numeric,
  created_at timestamp with time zone default now()
);
