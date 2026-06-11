// Mortéa Phase 35 — Trust Badges

function assignTrustBadges(provider) {
  const badges = [];

  if (provider.verified) badges.push("Verified Provider");
  if (provider.rating >= 4.8) badges.push("Top Rated");
  if (provider.booking_completion_rate >= 0.9) badges.push("Reliable Booking");
  if (provider.response_rate >= 0.9) badges.push("Fast Response");

  return badges;
}
