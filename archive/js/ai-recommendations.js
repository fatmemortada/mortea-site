// Mortéa Phase 21 — AI Recommendation Engine

function calculateRecommendationScore(provider, preferences = {}) {
  let score = 0;

  if (provider.rating) score += provider.rating * 20;
  if (provider.review_count) score += Math.min(provider.review_count, 50);
  if (provider.featured) score += 25;
  if (provider.city && preferences.city && provider.city.toLowerCase() === preferences.city.toLowerCase()) score += 30;
  if (provider.category && preferences.category && provider.category.toLowerCase() === preferences.category.toLowerCase()) score += 30;

  return score;
}

function recommendProviders(providers, preferences = {}) {
  return providers
    .map(provider => ({
      ...provider,
      recommendation_score: calculateRecommendationScore(provider, preferences)
    }))
    .sort((a, b) => b.recommendation_score - a.recommendation_score);
}
