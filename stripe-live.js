// Mortéa Phase 40 — Stripe Live Payments

function initializeStripeLive(publicKey) {
  console.log("Initializing Stripe Live:", publicKey);
}

function createCheckoutSession(amount, bookingId) {
  return {
    booking_id: bookingId,
    amount,
    status: "pending"
  };
}
