// Mortéa Phase 21 — Smart Discovery Feed

function buildSmartFeed(providers = []) {
  return providers
    .filter(provider => provider.approved !== false)
    .sort((a, b) => {
      const aScore = (a.rating || 0) + (a.featured ? 2 : 0);
      const bScore = (b.rating || 0) + (b.featured ? 2 : 0);
      return bScore - aScore;
    });
}
