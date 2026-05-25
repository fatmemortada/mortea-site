# Mortéa Phase 9 Stripe-Ready Membership Guide

This phase prepares Mortéa for paid memberships.

Added:
- js/stripe-config.js
- js/stripe.js
- Stripe-ready checkout buttons on pricing.html
- Stripe checkout button in provider-dashboard.html
- supabase-phase9-stripe-fields.sql
- Payment/membership UI

Current pricing:
- Professional: $35/month with 5-day free trial
- Creator/Blogger: $30/month with 5-day free trial
- Single User: $10/month with 5-day free trial

Safe approach for GitHub Pages:
Use Stripe Payment Links first.

How to create Stripe links:
1. Open Stripe Dashboard.
2. Go to Product catalog or Payment Links.
3. Create 3 recurring monthly products:
   - Mortéa Professional — $35/month
   - Mortéa Creator — $30/month
   - Mortéa Single User — $10/month
4. Add 5-day free trial to each recurring price if available in your Stripe setup.
5. Copy each Payment Link.
6. Open js/stripe-config.js.
7. Replace:
   - REPLACE_PROFESSIONAL_35
   - REPLACE_CREATOR_30
   - REPLACE_SINGLE_USER_10
8. Commit and push.

Important:
This version redirects users to Stripe checkout.
It does not yet automatically sync paid/canceled status back to Supabase.

For automatic sync later, we need:
- Supabase Edge Function or backend endpoint
- Stripe webhook
- secure secret keys stored server-side
- subscription_status updates automatically

Run this SQL:
supabase-phase9-stripe-fields.sql

Next recommended phase:
Phase 10 — Stripe Webhook + Supabase Edge Function
This will automatically update:
- subscription_status
- payment_status
- stripe_customer_id
- stripe_subscription_id
