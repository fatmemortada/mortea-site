# Mortéa Phase 13 — Services + Gallery Ecosystem

This package completes Phase 13 based on the Mortéa development session log.

## Files included

1. `supabase-phase13-services-gallery.sql`
   - Creates `provider_services`
   - Creates `provider_gallery`
   - Adds RLS policies
   - Adds public read access
   - Adds authenticated provider insert/update/delete access

2. `provider-dashboard-phase13.html`
   - Lets providers add, edit, and delete services
   - Lets providers add, edit, and delete gallery image URLs
   - Loads provider data using Supabase Auth

3. `provider-phase13.html`
   - Dynamic public provider profile page
   - Loads services
   - Loads gallery
   - Loads approved reviews
   - Supports `?id=` and `?slug=` URL parameters

## Important before using

Replace these placeholders in both HTML files:

```js
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";
```

## Supabase assumption

The SQL assumes your `professionals` table has:

```sql
user_id uuid
```

linked to `auth.uid()`.

If your column has another name, replace `p.user_id` in the SQL policies.

## How to install

1. Open Supabase.
2. Go to SQL Editor.
3. Paste and run `supabase-phase13-services-gallery.sql`.
4. Replace your current provider dashboard with the Phase 13 dashboard logic, or use this file as a reference.
5. Replace/update `provider.html` with the Phase 13 dynamic provider page logic.
6. Test using:

```text
provider.html?id=PROVIDER_ID_HERE
```

or, if you already have a slug column:

```text
provider.html?slug=maison-elise
```

## Git commands

```bash
git add .
git commit -m "Complete Mortéa phase 13 services and gallery ecosystem"
git push origin main
```

## Phase 13 completed

Mortéa now has the foundation for:
- Provider services
- Provider gallery
- Dashboard management
- Dynamic public display
- Edit/delete capability
- RLS security
- SaaS marketplace profile infrastructure
