
create table provider_rankings (
 id bigint generated always as identity primary key,
 provider_id bigint,
 ranking_score numeric default 0,
 featured boolean default false
);
