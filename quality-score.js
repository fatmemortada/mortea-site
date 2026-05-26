// Mortéa Phase 35 — Provider Quality Scoring

function calculateQualityScore(provider) {
  let score = 0;

  if (provider.rating) score += provider.rating * 20;
  if (provider.review_count) score += Math.min(provider.review_count, 50);
  if (provider.response_rate) score += provider.response_rate * 10;
  if (provider.booking_completion_rate) score += provider.booking_completion_rate * 20;

  return Math.min(score, 100);
}
