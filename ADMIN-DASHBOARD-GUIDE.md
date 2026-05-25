# Mortéa Phase 6 Admin Dashboard

Added:
- admin.html
- js/admin.js
- Admin dashboard styling inside style.css

Important:
This is a safe GitHub Pages admin foundation.
It does NOT expose the Supabase service_role secret key.

What works now:
- View approved professionals visible publicly.
- Generate SQL to approve, reject, or feature professionals.
- Copy SQL actions into Supabase SQL Editor.
- Keep pending professionals private.

How to review pending professionals:
1. Open Supabase.
2. Go to Table Editor.
3. Open professionals.
4. Filter status = pending.

Approve manually:
```sql
update professionals
set status = 'approved'
where email = 'professional@email.com';
```

Reject manually:
```sql
update professionals
set status = 'rejected'
where email = 'professional@email.com';
```

Mark featured:
```sql
update professionals
set membership = 'Featured Founder'
where email = 'professional@email.com';
```

Why not approve directly from GitHub Pages yet?
A public static website cannot safely hold the Supabase service_role key.
The next secure version should add:
- Supabase Auth
- admin_users table
- protected admin actions
- or Edge Functions for approval updates
