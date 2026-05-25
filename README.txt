Mortéa Static MVP - Phase 3A Luxury Ecosystem Simulation

Included updates:
- Upgraded luxury homepage sections
- New Discover page
- Three individual professional profile pages
- Visual dashboard preview
- Founding professional CTA section
- Cinematic luxury hero section
- Hover animations and premium UI transitions
- Static SVG visual assets inside /images
- GitHub Pages safe structure

Main pages:
- index.html
- discover.html
- professional-onboarding.html
- client-signup.html
- professional-signup.html
- profiles/maison-elise.html
- profiles/studio-velour.html
- profiles/ether-wellness.html

Next backend phase:
- Supabase database
- Authentication
- Stripe subscriptions
- Real profile creation
- Google Maps or Mapbox
- Booking and dashboard functionality


Stage 1 Mapping Upgrade:
- Added map.html
- Added luxury static map interface
- Added city/category search preview
- Added clickable pins for Montréal, Toronto, Dubai, Paris, Miami, Riyadh
- Added provider cards linked to profile pages
- Added near-me preview button
- Added map roadmap section
- Added images/luxury-map-lines.svg
- Updated navigation to include Map

No API key is required for this version.


Dynamic Supabase Display Upgrade:
- map.html now loads approved professionals from Supabase.
- discover.html now loads approved professionals from Supabase.
- Public display only shows rows where status = approved.
- If there is no approved data, static fallback cards still appear.
- Added supabase-sample-data.sql for testing.


Phase 6 Admin Dashboard:
- Added admin.html
- Added js/admin.js
- Added ADMIN-DASHBOARD-GUIDE.md
- Admin page can view approved professionals.
- Approval/rejection SQL is generated safely for Supabase SQL Editor.
- No service_role key is exposed in the public website.


Phase 7 Authentication:
- Added login.html
- Added signup.html
- Added provider-dashboard.html
- Added js/auth.js
- Added supabase-auth-policies.sql
- Added PHASE7-AUTH-GUIDE.md
- Provider account/dashboard foundation created.
- Admin access is visually restricted by admin email.


Phase 8 Pricing + Reviews:
- Professionals: $35/month
- Creators/Bloggers: $30/month
- Single Users: $10/month
- 5-day free trial messaging added
- pricing.html added
- reviews.html added
- client review submission added
- review approval structure added
