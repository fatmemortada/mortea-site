# Mortéa Phase 8 Pricing + Reviews Guide

Added:
- pricing.html
- reviews.html
- js/reviews.js
- supabase-phase8-pricing-reviews.sql
- updated provider dashboard membership choices
- updated homepage pricing section
- updated navigation

Pricing:
- Professionals: $35/month
- Creators / Bloggers: $30/month
- Single Users / independent providers: $10/month
- 5-day free trial for paid users

Reviews:
- Clients can submit reviews on reviews.html
- Reviews are saved to Supabase as pending
- Public website only shows reviews where status = approved

Required Supabase step:
Run `supabase-phase8-pricing-reviews.sql` in Supabase SQL Editor.

Approve review example:
```sql
update reviews
set status = 'approved'
where id = 'REVIEW_ID_HERE';
```

Next Phase:
Stripe connection:
- Create Stripe products for the 3 plans
- Add checkout links/buttons
- Add subscription_status sync
- Lock/boost visibility based on paid membership
