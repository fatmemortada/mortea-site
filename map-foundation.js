// Mortéa Step 7 — Google Maps Foundation
// This file is front-end ready. Later, replace mockProviders with Supabase data
// and connect the map area to Google Maps JavaScript API.

const mockProviders = [
  {
    name: "Élan Aesthetic Clinic",
    category: "Botox Clinic",
    city: "Dubai",
    country: "UAE",
    distance: "0.8 km",
    services: ["Botox", "Laser", "Fillers", "Skin Rejuvenation"],
    instagram: "#",
    tiktok: "#",
    profile: "provider.html",
    available: "Today"
  },
  {
    name: "Maison Lumière",
    category: "Skin & Facial Studio",
    city: "Paris",
    country: "France",
    distance: "1.2 km",
    services: ["Facials", "Hydrafacial", "Microneedling", "Skin Rituals"],
    instagram: "#",
    tiktok: "#",
    profile: "provider.html",
    available: "Tomorrow"
  },
  {
    name: "Kyoto Head Spa",
    category: "Japanese Head Spa",
    city: "Montréal",
    country: "Canada",
    distance: "2.1 km",
    services: ["Japanese Head Spa", "Scalp Treatment", "Hair Wellness"],
    instagram: "#",
    tiktok: "#",
    profile: "provider.html",
    available: "Today"
  },
  {
    name: "Noir Lash House",
    category: "Lash & Brow Artist",
    city: "Beirut",
    country: "Lebanon",
    distance: "1.7 km",
    services: ["Lashes", "Brows", "Permanent Makeup"],
    instagram: "#",
    tiktok: "#",
    profile: "provider.html",
    available: "This week"
  },
  {
    name: "Contour Maison",
    category: "Body Contouring Clinic",
    city: "Riyadh",
    country: "Saudi Arabia",
    distance: "3.4 km",
    services: ["Body Contouring", "Wellness", "Skin Tightening"],
    instagram: "#",
    tiktok: "#",
    profile: "provider.html",
    available: "Today"
  }
];

function providerCard(provider) {
  return `
    <article class="map-provider-card">
      <div class="map-provider-thumb"></div>
      <div>
        <div class="map-provider-topline">${provider.category} · ${provider.distance}</div>
        <h3><a href="${provider.profile}">${provider.name}</a></h3>
        <p>${provider.city}, ${provider.country}</p>
        <div class="map-chip-row">
          ${provider.services.slice(0, 4).map(service => `<span>${service}</span>`).join("")}
        </div>
        <div class="map-card-actions">
          <a href="${provider.profile}">Profile</a>
          <a href="${provider.instagram}">Instagram</a>
          <a href="${provider.tiktok}">TikTok</a>
          <a href="${provider.profile}#booking">Book</a>
        </div>
      </div>
    </article>
  `;
}

function renderProviders(list = mockProviders) {
  const results = document.getElementById("mapResults");
  const count = document.getElementById("resultCount");
  if (!results) return;
  results.innerHTML = list.map(providerCard).join("");
  if (count) count.textContent = `${list.length} providers found`;
}

function filterProviders() {
  const service = (document.getElementById("serviceSearch")?.value || "").toLowerCase();
  const city = (document.getElementById("citySearch")?.value || "").toLowerCase();

  const filtered = mockProviders.filter(p => {
    const serviceMatch =
      !service ||
      p.category.toLowerCase().includes(service) ||
      p.services.some(s => s.toLowerCase().includes(service)) ||
      p.name.toLowerCase().includes(service);

    const cityMatch =
      !city ||
      p.city.toLowerCase().includes(city) ||
      p.country.toLowerCase().includes(city);

    return serviceMatch && cityMatch;
  });

  renderProviders(filtered);
}

function useMyLocation() {
  const status = document.getElementById("locationStatus");
  if (!navigator.geolocation) {
    if (status) status.textContent = "Location is not supported by this browser.";
    return;
  }

  if (status) status.textContent = "Requesting your location...";

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      if (status) {
        status.textContent = `Location detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}. Next step: connect these coordinates to Google Maps nearby search.`;
      }
    },
    () => {
      if (status) status.textContent = "Location permission was denied. You can still search by city.";
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderProviders();
  document.getElementById("mapSearchButton")?.addEventListener("click", filterProviders);
  document.getElementById("useLocationButton")?.addEventListener("click", useMyLocation);
  document.querySelectorAll("[data-map-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-map-filter") || "";
      const input = document.getElementById("serviceSearch");
      if (input) input.value = value;
      filterProviders();
    });
  });
});
