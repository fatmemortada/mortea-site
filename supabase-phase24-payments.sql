-- Mortéa Phase 24 — Payments & Commission Infrastructure

create table if not exists payment_transactions (
  id bigint generated always as identity primary key,
  provider_id bigint,
  booking_id bigint,
  amount numeric,
  currency text default 'CAD',
  status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists commissions (
  id bigint generated always as identity primary key,
  payment_transaction_id bigint,
  commission_percentage numeric default 10,
  commission_amount numeric,
  created_at timestamp with time zone default now()
);

create table if not exists provider_payouts (
  id bigint generated always as identity primary key,
  provider_id bigint,
  payout_amount numeric,
  payout_status text default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists refunds (
  id bigint generated always as identity primary key,
  payment_transaction_id bigint,
  refund_amount numeric,
  refund_reason text,
  created_at timestamp with time zone default now()
);
