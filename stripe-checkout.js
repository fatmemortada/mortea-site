/* ============================================================
   Mortéa — Stripe Checkout Integration
   Configure STRIPE_PUBLIC_KEY and price IDs below
   ============================================================ */

const STRIPE_CONFIG = {
  publicKey: 'pk_live_YOUR_STRIPE_PUBLIC_KEY_HERE',
  prices: {
    independent:  'price_INDEPENDENT_MONTHLY_ID',
    professional: 'price_PROFESSIONAL_MONTHLY_ID',
    creator:      'price_CREATOR_MONTHLY_ID'
  },
  // URLs after checkout
  successUrl: window.location.origin + '/provider-dashboard.html?subscribed=1',
  cancelUrl:  window.location.origin + '/pricing.html'
};

async function startStripeCheckout(plan, email) {
  if (!STRIPE_CONFIG.publicKey || STRIPE_CONFIG.publicKey.includes('YOUR_')) {
    console.warn('Stripe not configured. Add your public key and price IDs to stripe-checkout.js');
    return false;
  }

  const stripe = Stripe(STRIPE_CONFIG.publicKey);
  const priceId = STRIPE_CONFIG.prices[plan];

  if (!priceId || priceId.includes('price_') === false) {
    console.warn('Invalid price ID for plan:', plan);
    return false;
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    customerEmail: email || undefined,
    successUrl: STRIPE_CONFIG.successUrl,
    cancelUrl: STRIPE_CONFIG.cancelUrl,
    trialPeriodDays: 5
  });

  if (error) console.error('Stripe error:', error);
  return !error;
}

// Handle post-checkout success banner
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('subscribed') === '1') {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:rgba(162,217,162,.15);border:1px solid rgba(162,217,162,.35);
      color:#a8e0a8;padding:14px 24px;border-radius:999px;font-size:14px;
      font-weight:600;z-index:999;backdrop-filter:blur(10px);
    `;
    banner.textContent = '✓ Membership activated! Welcome to Mortéa.';
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 5000);

    // Remove query param without reload
    window.history.replaceState({}, '', window.location.pathname);
  }
});
