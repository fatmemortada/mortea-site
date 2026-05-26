-- Mortéa Phase 22 — Messaging & Beauty Concierge

create table if not exists conversations (
  id bigint generated always as identity primary key,
  client_id uuid,
  provider_id bigint,
  status text default 'open',
  created_at timestamp with time zone default now()
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  conversation_id bigint references conversations(id) on delete cascade,
  sender_id uuid,
  body text not null,
  is_ai_assisted boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists message_notifications (
  id bigint generated always as identity primary key,
  conversation_id bigint references conversations(id) on delete cascade,
  recipient_id uuid,
  notification_type text default 'new_message',
  read boolean default false,
  created_at timestamp with time zone default now()
);

alter table conversations enable row level security;
alter table messages enable row level security;
alter table message_notifications enable row level security;
