// Mortéa Phase 56 — Mobile Home Feed

function renderMobileFeed(providers = []) {
  const container = document.getElementById("mobile-home-feed");

  if (!container) return;

  container.innerHTML = providers.map(provider => `
    <div class="mobile-provider-card">
      <h3>${provider.name || "Luxury Provider"}</h3>
      <p>${provider.city || "Montréal"}</p>
    </div>
  `).join("");
}
