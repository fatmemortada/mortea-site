// Mortéa Phase 54 — Dashboard Revenue

function renderRevenueMetrics(metrics = {}) {
  const container = document.getElementById("revenue-metrics");
  if (!container) return;

  container.innerHTML = `
    <div class="metric-card">
      <strong>$${metrics.total_revenue || 0}</strong>
      <span>Total Revenue</span>
    </div>

    <div class="metric-card">
      <strong>${metrics.total_bookings || 0}</strong>
      <span>Total Bookings</span>
    </div>
  `;
}\n