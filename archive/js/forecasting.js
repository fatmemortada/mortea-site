// Mortéa Phase 26 — Revenue Forecasting

function forecastRevenue(monthlyRevenue = []) {
  const total = monthlyRevenue.reduce((a, b) => a + b, 0);
  return total / (monthlyRevenue.length || 1);
}
