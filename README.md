# Mortéa — Global Luxury Beauty Discovery
## Final Version — All Updates Applied

---

### What's new in this version

#### ✅ Authentication (NEW)
- `auth.js` — full Supabase Auth module: sign up, sign in, sign out, session management, nav UI updates
- `login.html` — real sign in / sign up with tabs, forgot password, role selection (client/professional)
- `fr/login.html` — French version, fully functional
- Auto-redirect already signed-in users, `?next=` param support

#### ✅ Provider Dashboard (NEW)
- `provider-dashboard.html` — full authenticated dashboard with:
  - Overview: profile stats (views, reviews, rating), profile preview
  - Profile editor: edit all fields, save directly to Supabase
  - Photo upload: uploads to Supabase Storage `provider-photos` bucket
  - Reviews tab: all reviews displayed
  - Membership tab: plan cards with Stripe checkout hooks
- Redirects unauthenticated users to login

#### ✅ Admin Approval Dashboard (NEW)
- `admin.html` — full operational dashboard with:
  - Live stats: total, pending, approved, cities
  - Real-time approve/reject buttons per application
  - Search and filter by status
  - Full application detail overlay
  - Access restricted to `ADMIN_EMAILS` list in the file

#### ✅ Stripe Integration (NEW)
- `stripe-checkout.js` — configured Stripe checkout redirect with plan/price ID slots
- `pricing.html` — plan selection triggers real Stripe checkout (or falls back to apply form)
- Post-checkout success banner shown on dashboard

#### ✅ Provider Profiles (IMPROVED)
- `provider.html` + `provider-dynamic.js` — full rebuild:
  - Profile photo displayed
  - Dynamic page title and meta description
  - View counter (auto-increments on each visit)
  - Services listed as tags
  - Reviews section with star ratings
  - Social links sidebar with all platforms
  - Address block

#### ✅ Reviews System (NEW)
- `reviews.html` — full client review submission page:
  - Live provider search
  - Star picker (1–5)
  - Comment + reviewer name
  - Saved to Supabase `reviews` table
  - Recent reviews feed from all providers

#### ✅ City Pages (IMPROVED)
- All 5 cities now load **live Supabase providers** filtered by city
- If no providers: shows a "be the first" CTA
- French versions for all 5 cities: `fr/montreal.html`, `fr/dubai.html`, `fr/paris.html`, `fr/beirut.html`, `fr/riyadh.html`

#### ✅ Homepage (IMPROVED)
- Live provider counter badge (counts approved providers)
- Social proof stats: professionals joined, cities, countries
- Scrolling marquee of all service categories
- Real providers loaded from Supabase (with photos if uploaded)
- Smart hero search pre-fills discover page

#### ✅ Map Page (IMPROVED)
- Google Maps API ready — just add `GOOGLE_MAPS_KEY` to `supabase-config.js`
- Dark luxury map theme (custom styled)
- Notice shown when key is missing, list still loads
- Marker click highlights sidebar card
- Auto-fits bounds to loaded providers
- `fr/map.html` — French page linking to full EN map

#### ✅ Supabase Schema (NEW)
- `supabase-phase-final.sql` — run in Supabase SQL Editor:
  - Adds `status`, `photo_url`, `services_offered`, `view_count`, `review_count`, `avg_rating`, `membership_plan`, `latitude`, `longitude` columns
  - Creates `reviews` table
  - Adds RLS policies (public read approved, anyone can apply, own update)
  - Auto-trigger to update review stats on professionals

#### ✅ Bilingual Completeness
- `fr/map.html` — fixed (was linking to EN map, now has FR bridge page)
- `fr/montreal.html`, `fr/dubai.html`, `fr/paris.html`, `fr/beirut.html`, `fr/riyadh.html` — all new
- All FR pages use `lang="fr"` and correct EN↔FR toggles

#### ✅ Performance
- Single consolidated `style.css` (one file, no duplication)
- JS files load after content (`</body>`)
- Supabase loaded from CDN only once per page
- `discover-dynamic.js` shows approved providers first, falls back to all pending if none approved yet

---

### Setup checklist

1. **Supabase** — Run `supabase-phase-final.sql` in your SQL Editor
2. **Supabase Storage** — Create a bucket called `provider-photos`, set to Public
3. **Auth** — Enable Email auth in Supabase Dashboard → Authentication → Providers
4. **Google Maps** — Add API key to `supabase-config.js` → `GOOGLE_MAPS_KEY`
5. **Stripe** — Add public key + price IDs to `stripe-checkout.js`
6. **Admin** — Add your email to `ADMIN_EMAILS` array in `admin.html`
7. **Deploy** — Push to GitHub → GitHub Pages picks up automatically

### File structure
```
mortea-v2/
├── index.html               ← Homepage (EN) with live stats
├── discover.html            ← Provider search
├── map.html                 ← Google Maps-ready discovery
├── provider.html            ← Individual provider profile
├── provider-dashboard.html  ← Authenticated professional dashboard
├── professional-onboarding.html ← Apply form
├── pricing.html             ← Membership plans + Stripe
├── login.html               ← Auth (sign in / sign up)
├── admin.html               ← Operator approval dashboard
├── reviews.html             ← Client review submission
├── montreal.html / dubai.html / paris.html / beirut.html / riyadh.html
├── style.css                ← Full design system
├── script.js                ← Core JS + categories + form
├── auth.js                  ← Supabase Auth module
├── discover-dynamic.js      ← Live provider search
├── provider-dynamic.js      ← Profile page logic
├── map-foundation.js        ← Map sidebar + search
├── stripe-checkout.js       ← Stripe integration
├── supabase-config.js       ← Keys + Google Maps slot
├── supabase-phase-final.sql ← Final DB schema
└── fr/                      ← French versions of all pages
    ├── index.html, discover.html, professional-onboarding.html
    ├── login.html, map.html, provider.html
    └── montreal.html, dubai.html, paris.html, beirut.html, riyadh.html
```
