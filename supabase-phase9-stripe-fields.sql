-- Mortéa Phase 9 Stripe Fields
-- Run in Supabase SQL Editor.

alter table professionals
add column if not exists stripe_customer_id text,
add column if not exists stripe_subscription_id text,
add column if not exists stripe_payment_link text,
add column if not exists subscription_current_period_end timestamptz,
add column if not exists trial_used boolean default false,
add column if not exists payment_status text default 'not_connected';

-- Recommended status values:
-- trial
-- active
-- past_due
-- canceled
-- not_connected

-- Until Stripe webhooks are connected, subscription_status can be updated manually:
-- update professionals
-- set subscription_status = 'active',
--     payment_status = 'active'
-- where email = 'professional@email.com';
