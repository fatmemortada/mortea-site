# Mortéa Phase 7 Authentication Guide

Added:
- login.html
- signup.html
- provider-dashboard.html
- js/auth.js
- supabase-auth-policies.sql

What this phase does:
- Adds Supabase Auth signup/login.
- Adds provider dashboard foundation.
- Lets signed-in professionals create/update their profile.
- Keeps public visibility controlled through status = approved.
- Keeps admin page safer by checking the signed-in admin email visually.

Important:
Because this is still hosted on GitHub Pages, do not expose the Supabase service_role key.
Admin approval is still handled through Supabase SQL Editor until we add secure Edge Functions or a backend.

Required Supabase setup:
1. Go to Authentication → Providers.
2. Make sure Email provider is enabled.
3. Go to SQL Editor.
4. Run the contents of supabase-auth-policies.sql.

Test flow:
1. Open signup.html.
2. Create a provider account.
3. Open provider-dashboard.html.
4. Save a profile.
5. In Supabase, approve that profile:
   update professionals set status = 'approved' where email = 'provider@email.com';
6. Check map.html and discover.html.

Next Phase:
Phase 8 — Stripe Memberships
- Founder Access plan
- Studio Partner plan
- membership status
- featured placement based on subscription
