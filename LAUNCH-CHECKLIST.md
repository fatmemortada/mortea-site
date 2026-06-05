# Mortéa — Launch Checklist
## Everything you need to do to start selling

---

### ✅ Already done
- [x] Stripe payments working
- [x] Google Maps live on map.html
- [x] Supabase database connected
- [x] Auto-approval on payment via payment-success.html
- [x] Professional onboarding 3-step flow
- [x] Provider dashboard
- [x] Admin approval dashboard
- [x] Bilingual site (EN + FR)
- [x] 10 city pages (EN + FR)
- [x] Blog with 3 articles
- [x] Booking request system
- [x] Client accounts & favourites
- [x] Provider inbox
- [x] Referral system
- [x] SEO meta tags on all pages
- [x] Mobile CSS

---

### 🔴 Do these NOW (required to sell)

**1. Run SQL in Supabase**
Go to: https://supabase.com/dashboard/project/gnlglfjtgfygpybqlcpa/sql/new
Run the file: supabase-bookings-inbox.sql

**2. Set Stripe redirect URL**
For each payment link in Stripe Dashboard → Payment Links:
- Click ... → Edit → After payment → Redirect to:
  https://www.mortea.ca/payment-success.html

**3. Submit sitemap to Google**
Go to: https://search.google.com/search-console
- Add property: www.mortea.ca
- Submit sitemap: https://www.mortea.ca/sitemap.xml

---

### 🟡 Do these for email notifications (recommended)

**4. Set up Resend (free email sending)**
- Sign up at https://resend.com
- Add and verify domain: mortea.ca
- Get API key

**5. Deploy Supabase Edge Functions**
Install Supabase CLI, then:
```bash
supabase login
supabase link --project-ref gnlglfjtgfygpybqlcpa
supabase functions deploy stripe-webhook
supabase functions deploy send-welcome-email
supabase functions deploy send-booking-notification
supabase secrets set RESEND_API_KEY=re_xxxxx
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

**6. Add Stripe webhook**
Stripe Dashboard → Developers → Webhooks → Add endpoint:
URL: https://gnlglfjtgfygpybqlcpa.supabase.co/functions/v1/stripe-webhook
Event: checkout.session.completed

---

### 🟢 Growth (do after first 10 professionals)

**7. Google Search Console**
Submit sitemap.xml to get indexed by Google

**8. Instagram & TikTok for Mortéa**
Create @mortea.ca accounts to attract professionals and clients

**9. Restrict Google Maps key**
Google Cloud → Credentials → your key → HTTP referrers → add www.mortea.ca/*
