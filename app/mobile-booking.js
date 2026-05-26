// Mortéa Phase 39 — Mobile Booking Flow

export function createMobileBooking(serviceId, providerId) {
  return {
    service_id: serviceId,
    provider_id: providerId,
    created_at: new Date().toISOString()
  };
}
