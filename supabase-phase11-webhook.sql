alter table professionals
add column if not exists last_payment_at timestamptz,
add column if not exists canceled_at timestamptz,
add column if not exists webhook_last_event text;
