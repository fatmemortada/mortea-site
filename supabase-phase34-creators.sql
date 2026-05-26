-- Mortéa Phase 34 — Creator & Influencer Ecosystem

create table if not exists creators (
  id bigint generated always as identity primary key,
  full_name text,
  instagram_handle text,
  tiktok_handle text,
  created_at timestamp with time zone default now()
);

create table if not exists influencer_campaigns (
  id bigint generated always as identity primary key,
  campaign_name text,
  brand_name text,
  status text default 'draft',
  created_at timestamp with time zone default now()
);

create table if not exists ugc_posts (
  id bigint generated always as identity primary key,
  creator_id bigint,
  content text,
  created_at timestamp with time zone default now()
);

create table if not exists creator_analytics (
  id bigint generated always as identity primary key,
  creator_id bigint,
  impressions integer default 0,
  clicks integer default 0,
  conversions integer default 0,
  created_at timestamp with time zone default now()
);
