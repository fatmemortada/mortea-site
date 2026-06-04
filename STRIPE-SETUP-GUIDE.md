# Stripe Setup Guide — Mortéa

## Set success URL in Stripe Dashboard

For each of your 3 payment links, you need to set the success URL so the
provider gets auto-approved after payment.

### Steps:
1. Go to Stripe Dashboard → Payment Links
2. Click the **...** on each link → **Edit**
3. Scroll to **"After payment"** section
4. Set the **Confirmation page** to: **"Don't show confirmation page"**
5. Set **Redirect URL** to:
   ```
   https://www.mortea.ca/payment-success.html
   ```
6. Save

Do this for all 3 links (Single User, Professional, Beauty Creator).

### Your 3 payment links:
- Single User: https://buy.stripe.com/aFa5kwadZ2ob58davF3VC05
- Professional: https://buy.stripe.com/14AaEQ71N2ob1W147h3VC00
- Beauty Creator: https://buy.stripe.com/aFa7sE5XJd2PdEJ9rB3VC03

### How auto-approval works:
1. Professional fills form → saved to Supabase as "pending"
2. Redirected to Stripe payment link
3. After payment → Stripe redirects to payment-success.html
4. payment-success.html detects the email and sets status to "approved"
5. Profile is instantly live on www.mortea.ca
