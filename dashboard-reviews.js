// Mortéa Phase 54 — Dashboard Reviews

function renderDashboardReviews(reviews = []) {
  const container = document.getElementById("provider-reviews");
  if (!container) return;

  container.innerHTML = reviews.map(review => `
    <div class="review-card">
      <p>${review.review_text || ""}</p>
      <strong>${review.rating || 5}/5</strong>
    </div>
  `).join("");
}\n