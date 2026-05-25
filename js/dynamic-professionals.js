
async function loadApprovedProfessionals() {
  const containers = document.querySelectorAll("[data-professionals-list]");
  if (!containers.length || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("professionals")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase professionals loading error:", error);
    return;
  }

  if (!data || data.length === 0) {
    containers.forEach((container) => {
      const fallback = container.querySelector("[data-fallback]");
      if (fallback) fallback.style.display = "";
    });
    return;
  }

  containers.forEach((container) => {
    const mode = container.dataset.professionalsList;
    container.innerHTML = "";

    data.forEach((professional, index) => {
      if (mode === "map") {
        container.appendChild(createMapProviderCard(professional, index));
      } else {
        container.appendChild(createDiscoverProviderCard(professional, index));
      }
    });
  });

  renderDynamicPins(data);
}

function safeText(value, fallback = "") {
  return value && String(value).trim() ? String(value).trim() : fallback;
}

function profileUrl(professional) {
  const slug = safeText(professional.business_name, "professional")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `#profile-${slug}`;
}

function providerImage(index) {
  const images = [
    "images/profile-headspa.svg",
    "images/profile-mobile.svg",
    "images/profile-wellness.svg"
  ];
  return images[index % images.length];
}

function createMapProviderCard(professional, index) {
  const card = document.createElement("a");
  card.className = "map-provider-card";
  card.href = profileUrl(professional);

  card.innerHTML = `
    <div class="map-provider-image" style="background-image:url('${providerImage(index)}');"></div>
    <div>
      <h3>${safeText(professional.business_name, "Mortéa Professional")}</h3>
      <p>${safeText(professional.description, "Approved Mortéa professional profile.")}</p>
      <div class="map-provider-meta">
        <span>${safeText(professional.city, "City")}</span>
        <span>${safeText(professional.category, "Beauty & Wellness")}</span>
      </div>
    </div>
  `;

  return card;
}

function createDiscoverProviderCard(professional, index) {
  const card = document.createElement("a");
  card.className = "discover-card-link";
  card.href = profileUrl(professional);

  card.innerHTML = `
    <div class="discovery-card">
      <div class="discovery-image ${index % 3 === 0 ? "one" : index % 3 === 1 ? "two" : "three"}"></div>
      <div>
        <h3>${safeText(professional.business_name, "Mortéa Professional")}</h3>
        <p>${safeText(professional.description, "Approved professional inside the Mortéa luxury ecosystem.")}</p>
        <div class="card-meta">
          <span>${safeText(professional.city, "City")}</span>
          <span>${safeText(professional.category, "Beauty & Wellness")}</span>
          <span>${safeText(professional.membership, "Founder Access")}</span>
        </div>
      </div>
    </div>
  `;

  return card;
}

function renderDynamicPins(professionals) {
  const map = document.querySelector("[data-dynamic-map-pins]");
  if (!map) return;

  const approvedWithLocation = professionals.filter((p) => p.latitude && p.longitude);

  if (approvedWithLocation.length === 0) return;

  approvedWithLocation.forEach((professional, index) => {
    const pin = document.createElement("a");
    pin.className = "map-pin";
    pin.href = profileUrl(professional);

    // Temporary visual placement until real Google Maps/Mapbox is added.
    const positions = [
      [27, 39], [31, 47], [43, 64], [60, 39], [72, 55], [70, 61],
      [22, 58], [50, 48], [66, 33], [82, 43]
    ];
    const [left, top] = positions[index % positions.length];

    pin.style.left = `${left}%`;
    pin.style.top = `${top}%`;
    pin.innerHTML = `<span>${safeText(professional.city, "City")} • ${safeText(professional.category, "Provider")}</span>`;

    map.appendChild(pin);
  });
}

document.addEventListener("DOMContentLoaded", loadApprovedProfessionals);
