# Mortéa — Launch Checklist
## Free model: professionals join free, Mortéa takes 10% per booking

---

### ✅ Already done
- [x] Free professional onboarding (no subscription)
- [x] Auto-approved on signup
- [x] Services + pricing management in dashboard
- [x] Client pays upfront via Stripe Connect
- [x] Adaptive currency (client pays in their local currency)
- [x] 90/10 split handled by Stripe automatically
- [x] Booking request → payment → confirmation flow
- [x] Google Maps live
- [x] Bilingual EN/FR
- [x] 10 city pages
- [x] Blog
- [x] Referral system
- [x] SEO

---

### 🔴 Required before first paid booking

**1. Enable Stripe Connect**
https://dashboard.stripe.com/connect/overview
→ Get started → Platform or marketplace → Complete setup

**2. Run SQL migrations**
In Supabase SQL Editor, run:
- supabase-bookings-inbox.sql
- supabase-free-model.sql

**3. Deploy Edge Functions**
```bash
supabase login
supabase link --project-ref gnlglfjtgfygpybqlcpa
supabase functions deploy stripe-connect-onboard
supabase functions deploy create-booking-checkout
supabase functions deploy booking-webhook
supabase functions deploy send-welcome-email
supabase functions deploy send-booking-notification
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxx
supabase secrets set STRIPE_BOOKING_WEBHOOK_SECRET=whsec_xxxxx
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxxxx
supabase secrets set SITE_URL=https://www.mortea.ca
supabase secrets set RESEND_API_KEY=re_xxxxx
```

**4. Add Stripe Connect webhook**
Stripe Dashboard → Developers → Webhooks → Add endpoint:
URL: https://gnlglfjtgfygpybqlcpa.supabase.co/functions/v1/booking-webhook
Events: checkout.session.completed, payment_intent.payment_failed

**5. Submit sitemap to Google Search Console**
https://search.google.com/search-console
Add property → www.mortea.ca → Submit sitemap: https://www.mortea.ca/sitemap.xml

---

### 🟡 For each professional to activate payouts

Professionals go to their Dashboard → Payouts → Connect Stripe account
(Takes 5 min — they enter bank details directly in Stripe)

---

### How a booking works end-to-end

1. Client finds professional on Mortéa
2. Client clicks Book → selects service + fills details
3. Stripe Checkout opens (in client's local currency)
4. Client pays → Stripe splits: 90% to professional, 10% to Mortéa
5. Provider gets email notification
6. Booking appears in provider inbox as "confirmed"
7. Funds deposited to provider's bank in 2-7 days
