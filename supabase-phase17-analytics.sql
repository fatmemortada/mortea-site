
create table analytics (
 id bigint generated always as identity primary key,
 provider_id bigint,
 profile_views integer default 0,
 bookings integer default 0,
 revenue numeric default 0
);
