// Mortéa Phase 35 — Review Insights

function analyzeReviewSentiment(reviewText) {
  const positiveWords = ["amazing", "excellent", "beautiful", "professional", "perfect"];
  const lower = reviewText.toLowerCase();

  const matches = positiveWords.filter(word => lower.includes(word));

  return {
    sentiment: matches.length > 0 ? "positive" : "neutral",
    matched_keywords: matches
  };
}
