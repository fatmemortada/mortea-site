-- Mortéa Phase 33 — Growth & SEO Infrastructure

create table if not exists seo_pages (
  id bigint generated always as identity primary key,
  page_slug text,
  city text,
  category text,
  created_at timestamp with time zone default now()
);

create table if not exists blog_posts (
  id bigint generated always as identity primary key,
  title text,
  slug text,
  content text,
  published boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists seo_analytics (
  id bigint generated always as identity primary key,
  page_slug text,
  impressions integer default 0,
  clicks integer default 0,
  created_at timestamp with time zone default now()
);\n