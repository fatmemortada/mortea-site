# Mortéa — Complete Setup Guide

## 1. Supabase (Database)
Run in Supabase SQL Editor → **supabase-phase-final.sql**
Then run **supabase-sample-providers.sql** to add 3 starter providers.

## 2. Stripe (Payments)
In Stripe Dashboard → Payment Links, set redirect URL for each link to:
```
https://www.mortea.ca/payment-success.html
```
Your 3 payment links:
- Single User: https://buy.stripe.com/aFa5kwadZ2ob58davF3VC05
- Professional: https://buy.stripe.com/14AaEQ71N2ob1W147h3VC00
- Beauty Creator: https://buy.stripe.com/aFa7sE5XJd2PdEJ9rB3VC03

## 3. Stripe Webhook (Auto-approval backup)
Deploy the edge function for reliable auto-approval:
```bash
supabase functions deploy stripe-webhook
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=xxx
```
Then add the webhook URL in Stripe Dashboard → Developers → Webhooks:
```
https://gnlglfjtgfygpybqlcpa.supabase.co/functions/v1/stripe-webhook
```
Event to listen for: `checkout.session.completed`

## 4. Welcome Emails (Optional)
Sign up at https://resend.com (free tier: 3,000 emails/month)
```bash
supabase functions deploy send-welcome-email
supabase secrets set RESEND_API_KEY=re_xxx
```
Verify your domain `mortea.ca` in Resend dashboard.

## 5. Google Maps
Get an API key at https://console.cloud.google.com/
Enable: Maps JavaScript API + Places API
Add to supabase-config.js:
```js
const GOOGLE_MAPS_KEY = "AIzaSy...";
```

## 6. Push to GitHub
```bash
git add .
git commit -m "All 9 improvements: auth, dashboard, Stripe, emails, SEO, mobile, FR, maps, webhook"
git push origin main
```
