let discoverProviders = [];

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function providerCard(provider) {
  const name = provider.business_name || "Professional";
  const category = provider.category || "Beauty Professional";
  const city = provider.city || "";
  const country = provider.country || "";
  const services = (provider.services_offered || category)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  return `
    <div class="result">
      <div class="thumb"></div>
      <div>
        <h4><a href="provider.html?id=${encodeURIComponent(provider.id)}">${escapeHtml(name)}</a></h4>
        <p>${escapeHtml(category)} · ${escapeHtml(city)}${country ? " · " + escapeHtml(country) : ""}</p>
        <div class="socials">
          ${provider.booking_link ? `<a href="${escapeHtml(provider.booking_link)}" target="_blank">Book</a>` : `<span>Profile</span>`}
          ${provider.instagram ? `<a href="${escapeHtml(provider.instagram)}" target="_blank">Instagram</a>` : ""}
          ${provider.tiktok ? `<a href="${escapeHtml(provider.tiktok)}" target="_blank">TikTok</a>` : ""}
        </div>
        <div class="taglist" style="margin-top:10px">${services.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}</div>
      </div>
    </div>
  `;
}

function renderDiscoverProviders(list) {
  const results = document.getElementById("discoverProviderResults");
  const count = document.getElementById("discoverProviderCount");
  if (!results) return;

  if (!list.length) {
    results.innerHTML = `<div class="card"><h3>No providers found yet</h3><p>Try another city or category, or add providers through the professional onboarding form.</p></div>`;
  } else {
    results.innerHTML = list.map(providerCard).join("");
  }

  if (count) count.textContent = `${list.length} live providers`;
}

async function loadDiscoverProviders() {
  const { data, error } = await supabaseClient
    .from("professionals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    renderDiscoverProviders([]);
    return;
  }

  discoverProviders = data || [];
  renderDiscoverProviders(discoverProviders);
}

function filterDiscoverProviders() {
  const service = (document.getElementById("discoverServiceSearch")?.value || "").toLowerCase();
  const city = (document.getElementById("discoverCitySearch")?.value || "").toLowerCase();

  const filtered = discoverProviders.filter(provider => {
    const searchableService = [
      provider.business_name,
      provider.category,
      provider.services_offered,
      provider.description
    ].join(" ").toLowerCase();

    const searchableCity = [
      provider.city,
      provider.province,
      provider.country,
      provider.address
    ].join(" ").toLowerCase();

    return (!service || searchableService.includes(service)) &&
           (!city || searchableCity.includes(city));
  });

  renderDiscoverProviders(filtered);
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadDiscoverProviders();

  document.getElementById("discoverSearchButton")?.addEventListener("click", filterDiscoverProviders);

  document.querySelectorAll("[data-discover-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-discover-filter") || "";
      const input = document.getElementById("discoverServiceSearch");
      if (input) input.value = value;
      filterDiscoverProviders();
    });
  });
});
