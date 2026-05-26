# Mortéa Phase 14 — Supabase Storage Uploads

Phase 14 adds real image uploads for provider gallery images.

## Included

- Updated `provider-dashboard.html`
- Updated `provider.html`
- New `supabase-phase14-storage-uploads.sql`

## What changed

Providers can now:

1. Log in to the provider dashboard.
2. Add or edit services.
3. Upload gallery images directly from their computer.
4. Save the image public URL automatically to `provider_gallery`.
5. Display uploaded images on the public provider page.
6. Delete gallery images from both the database and Supabase Storage.

## Supabase setup

Run this SQL file in Supabase SQL Editor:

```sql
supabase-phase14-storage-uploads.sql
```

This creates/updates:

- Storage bucket: `provider-gallery`
- `provider_gallery.storage_path`
- Public read policy for images
- Authenticated provider upload/update/delete policies

## Important

The dashboard uses this upload path:

```text
provider-gallery/{provider_id}/{timestamp-file-name}
```

The Storage policies check that the logged-in user owns the provider profile through:

```text
professionals.user_id = auth.uid()
```

If your professionals table uses a different owner column, update the SQL policies.
