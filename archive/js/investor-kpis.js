// Mortéa Phase 57 — Investor KPIs

function renderInvestorKPIs(metrics = {}) {
  return {
    active_providers: metrics.providers || 0,
    bookings: metrics.bookings || 0,
    revenue: metrics.revenue || 0
  };
}
