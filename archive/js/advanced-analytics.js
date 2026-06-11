// Mortéa Phase 45 — Advanced Analytics

function calculateGrowthRate(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
