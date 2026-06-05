/* ============================================================
   Mortéa — Stripe Connect
   Handles professional onboarding + client booking payments
   Backend Edge Function required for payment intent creation
   ============================================================ */

// ── Create Stripe Connect onboarding link for professional ────
async function createConnectOnboardingLink(providerId, email) {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/stripe-connect-onboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ provider_id: providerId, email })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else throw new Error(data.error || 'Failed to create onboarding link');
  } catch(e) {
    console.error('Connect onboarding error:', e);
    return null;
  }
}

// ── Create checkout session for client booking ────────────────
async function createBookingCheckout({ serviceId, serviceName, priceUsd, providerId, providerStripeAccountId, clientEmail, bookingData }) {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/create-booking-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        service_id:    serviceId,
        service_name:  serviceName,
        price_usd:     priceUsd,
        provider_id:   providerId,
        provider_stripe_account: providerStripeAccountId,
        client_email:  clientEmail,
        booking_data:  bookingData,
        fee_percent:   MORTEA_FEE_PERCENT,
        success_url:   `${window.location.origin}/booking-confirmed.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:    `${window.location.origin}/booking-request.html?id=${providerId}&cancelled=1`
      })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else throw new Error(data.error || 'Failed to create checkout');
  } catch(e) {
    console.error('Booking checkout error:', e);
    return null;
  }
}
