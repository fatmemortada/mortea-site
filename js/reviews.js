
async function submitReview(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const message = document.querySelector("[data-review-message]");

  function setMessage(text, type = "info") {
    if (!message) return;
    message.textContent = text;
    message.dataset.type = type;
  }

  const payload = {
    client_name: form.querySelector('[name="client_name"]').value,
    client_email: form.querySelector('[name="client_email"]').value,
    provider_name: form.querySelector('[name="provider_name"]').value,
    rating: Number(form.querySelector('[name="rating"]').value),
    review_text: form.querySelector('[name="review_text"]').value,
    status: "pending"
  };

  setMessage("Submitting review...");

  const { error } = await supabaseClient
    .from("reviews")
    .insert([payload]);

  if (error) {
    console.error(error);
    setMessage(error.message, "error");
    return;
  }

  setMessage("Review submitted. It will appear after approval.", "success");
  form.reset();
}

async function loadApprovedReviews() {
  const container = document.querySelector("[data-reviews-list]");
  if (!container || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Review loading error:", error);
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = `
      <div class="review-item">
        <strong>Client reviews coming soon</strong>
        <span>★★★★★</span>
        <p>Approved client reviews will appear here after launch.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  data.forEach((review) => {
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <strong>${escapeHtml(review.client_name || "Mortéa Client")}</strong>
      <span>${"★".repeat(Number(review.rating || 5))}${"☆".repeat(5 - Number(review.rating || 5))}</span>
      <p>${escapeHtml(review.review_text || "")}</p>
      <p><small>For ${escapeHtml(review.provider_name || "Mortéa professional")}</small></p>
    `;
    container.appendChild(item);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.querySelector("[data-review-form]");
  if (reviewForm) reviewForm.addEventListener("submit", submitReview);
  loadApprovedReviews();
});
