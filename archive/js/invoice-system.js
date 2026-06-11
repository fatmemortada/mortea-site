// Mortéa Phase 40 — Invoice System

function generateInvoice(bookingId, amount) {
  return {
    booking_id: bookingId,
    total: amount,
    generated_at: new Date().toISOString()
  };
}
