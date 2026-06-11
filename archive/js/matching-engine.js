// Mortéa Phase 21 — Beauty Matching Engine

function matchProviderToClient(provider, clientPreferences) {
  const matches = [];

  if (provider.city === clientPreferences.city) matches.push("city");
  if (provider.category === clientPreferences.category) matches.push("category");
  if (provider.price_range === clientPreferences.price_range) matches.push("price");
  if (provider.language === clientPreferences.language) matches.push("language");

  return {
    provider,
    match_score: matches.length,
    matched_fields: matches
  };
}
