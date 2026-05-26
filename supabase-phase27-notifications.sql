-- Mortéa Phase 27 — Notifications & Automated Reminders

create table if not exists notifications (
  id bigint generated always as identity primary key,
  user_id uuid,
  notification_type text,
  message text,
  read boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists notification_preferences (
  id bigint generated always as identity primary key,
  user_id uuid,
  booking_confirmations boolean default true,
  booking_reminders boolean default true,
  message_alerts boolean default true,
  review_requests boolean default true,
  vip_rewards boolean default true,
  updated_at timestamp with time zone default now()
);

create table if not exists scheduled_reminders (
  id bigint generated always as identity primary key,
  user_id uuid,
  booking_id bigint,
  reminder_type text,
  scheduled_for timestamp with time zone,
  sent boolean default false,
  created_at timestamp with time zone default now()
);

alter table notifications enable row level security;
alter table notification_preferences enable row level security;
alter table scheduled_reminders enable row level security;
