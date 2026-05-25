-- Mortéa Phase 7 Supabase Auth Policies
-- Run this in Supabase SQL Editor.

-- 1) Optional but recommended: add user_id to professionals.
alter table professionals
add column if not exists user_id uuid references auth.users(id);

-- 2) Allow logged-in users to read their own professional profile by email.
create policy if not exists "Professionals can view own profile"
on professionals
for select
to authenticated
using (email = auth.jwt() ->> 'email');

-- 3) Allow logged-in users to update their own professional profile by email.
create policy if not exists "Professionals can update own profile"
on professionals
for update
to authenticated
using (email = auth.jwt() ->> 'email')
with check (email = auth.jwt() ->> 'email');

-- 4) Allow logged-in users to create their own professional profile.
create policy if not exists "Professionals can create own profile"
on professionals
for insert
to authenticated
with check (email = auth.jwt() ->> 'email');

-- Keep your existing public select approved policy:
-- create policy "Public can view approved professionals"
-- on professionals
-- for select
-- using (status = 'approved');

-- Keep pending records private. Public users should not be able to select pending profiles.
