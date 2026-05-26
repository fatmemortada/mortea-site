// Mortéa Phase 23 — Referral System

function generateReferralCode(userId) {
  return `MORTEA-${userId}-${Date.now()}`;
}

function applyReferralReward(referrerId, referredId) {
  console.log("Referral reward applied");
}
