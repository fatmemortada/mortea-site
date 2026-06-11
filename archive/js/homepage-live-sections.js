// Mortéa Phase 53 — Homepage Live Sections

function renderFeaturedProviders(providers = []) {
  const container = document.getElementById("featured-providers");
  if (!container) return;

  container.innerHTML = providers.map(provider => `
    <article class="provider-card">
      <h3>${provider.business_name || provider.name || "Mortéa Provider"}</h3>
      <p>${provider.city || "Québec"}</p>
      <p>${provider.category || "Luxury Beauty"}</p>
      <a href="provider.html?id=${provider.id}">View Profile</a>
    </article>
  `).join("");
}

function renderLiveStats(stats = {}) {
  const container = document.getElementById("live-stats");
  if (!container) return;

  container.innerHTML = `
    <div class="stat-card"><strong>${stats.providers || 0}</strong><span>Providers</span></div>
    <div class="stat-card"><strong>${stats.bookings || 0}</strong><span>Bookings</span></div>
    <div class="stat-card"><strong>${stats.reviews || 0}</strong><span>Reviews</span></div>
  `;
}
