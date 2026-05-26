
create table bookings (
 id bigint generated always as identity primary key,
 provider_id bigint,
 client_name text,
 service_name text,
 booking_date date,
 status text default 'pending'
);
