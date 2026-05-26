// Mortéa Phase 45 — Business KPIs

function calculateMarketplaceKPIs(data) {
  return {
    active_users: data.users || 0,
    total_bookings: data.bookings || 0,
    total_revenue: data.revenue || 0
  };
}
