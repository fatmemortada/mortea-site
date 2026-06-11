// Mortéa Phase 45 — Revenue Forecasting

function forecastNextMonthRevenue(revenueHistory) {
  return revenueHistory.reduce((a, b) => a + b, 0) / revenueHistory.length;
}
