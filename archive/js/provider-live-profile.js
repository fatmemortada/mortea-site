// Mortéa Phase 53 — Live Provider Profile Rendering

function renderProviderProfile(provider, reviews = [], services = [], gallery = []) {
  const name = document.getElementById("provider-name");
  const city = document.getElementById("provider-city");
  const bio = document.getElementById("provider-bio");

  if (name) name.textContent = provider.business_name || provider.name || "Mortéa Provider";
  if (city) city.textContent = provider.city || "Québec";
  if (bio) bio.textContent = provider.bio || "Luxury beauty provider on Mortéa.";

  const servicesContainer = document.getElementById("provider-services");
  if (servicesContainer) {
    servicesContainer.innerHTML = services.map(service => `
      <div class="service-card">
        <h4>${service.service_name || service.name}</h4>
        <p>${service.description || ""}</p>
        <strong>${service.price ? "$" + service.price : ""}</strong>
      </div>
    `).join("");
  }

  const reviewsContainer = document.getElementById("provider-reviews");
  if (reviewsContainer) {
    reviewsContainer.innerHTML = reviews.map(review => `
      <div class="review-card">
        <p>${review.review_text || review.comment}</p>
        <strong>${review.rating || 5}/5</strong>
      </div>
    `).join("");
  }
}
