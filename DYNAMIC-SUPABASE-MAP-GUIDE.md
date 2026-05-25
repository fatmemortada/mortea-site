# Mortéa Dynamic Supabase Map + Discovery

This upgrade connects public display pages to Supabase.

Updated:
- map.html
- discover.html
- js/dynamic-professionals.js
- supabase-sample-data.sql

How it works:
- professional-signup.html saves applications to the `professionals` table.
- New applications default to `status = pending`.
- Public map/discovery pages show only professionals where `status = approved`.

To approve a professional:
```sql
update professionals
set status = 'approved'
where email = 'their-email@example.com';
```

To add sample data:
- Open Supabase SQL Editor
- Paste contents of `supabase-sample-data.sql`
- Run

Next phase:
- real profile pages generated from database
- admin dashboard
- authentication
- real map API with Google Maps or Mapbox
