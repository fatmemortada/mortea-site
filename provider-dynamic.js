function getProviderIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function linkButton(label, url, primary = false) {
  if (!url) return "";
  return `<a class="profile-btn ${primary ? "primary" : ""}" href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
}

function makeProfileLink(provider) {
  return `provider.html?id=${encodeURIComponent(provider.id)}`;
}

async function loadProviderProfile() {
  const providerId = getProviderIdFromUrl();

  if (!providerId) {
    document.getElementById("providerName").textContent = "Provider not selected";
    document.getElementById("providerBio").textContent = "Please return to Discover and choose a professional.";
    return;
  }

  const { data: provider, error } = await supabaseClient
    .from("professionals")
    .select("*")
    .eq("id", providerId)
    .single();

  if (error || !provider) {
    console.error(error);
    document.getElementById("providerName").textContent = "Provider not found";
    document.getElementById("providerBio").textContent = "This profile could not be loaded.";
    return;
  }

  const name = provider.business_name || "Professional";
  const category = provider.category || "Beauty Professional";
  const city = provider.city || "";
  const country = provider.country || "";
  const province = provider.province || "";
  const address = provider.address || "";

  document.title = `${name} — Mortéa`;
  document.getElementById("providerKicker").textContent = provider.verified ? "Verified luxury profile" : "Mortéa provider profile";
  document.getElementById("providerName").textContent = name;
  document.getElementById("providerBio").textContent = provider.description || "Luxury beauty, wellness, or aesthetics professional on Mortéa.";
  document.getElementById("providerCategory").textContent = category;
  document.getElementById("providerLocation").textContent = [city, province, country].filter(Boolean).join(" · ");
  document.getElementById("providerVerified").textContent = provider.verified ? "Verified by Mortéa" : "Profile pending verification";
  document.getElementById("providerAbout").textContent = provider.description || "No description added yet.";
  document.getElementById("providerAddress").textContent = [address, city, province, country].filter(Boolean).join(", ") || "Address not added yet.";
  document.getElementById("providerMapPin").textContent = city || "Location";

  const services = (provider.services_offered || category || "Beauty Services")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  document.getElementById("providerServices").innerHTML = services.length
    ? services.map(service => `<div class="service-row"><b>${escapeHtml(service)}</b><span>Request booking</span></div>`).join("")
    : `<div class="service-row"><b>Services coming soon</b><span>Request booking</span></div>`;

  const badges = [category, city, provider.membership || provider.plan_type, provider.verified ? "Verified" : "Pending review"]
    .filter(Boolean);

  document.getElementById("providerBadges").innerHTML = badges.map(badge => `<span class="badge">${escapeHtml(badge)}</span>`).join("");

  const actions = [
    `<a class="profile-btn primary" href="#booking">Book now</a>`,
    linkButton("Instagram", provider.instagram),
    linkButton("TikTok", provider.tiktok),
    linkButton("Website", provider.website),
  ].join("");

  document.getElementById("providerActions").innerHTML = actions;
  document.getElementById("bookingActions").innerHTML = [
    linkButton("Book", provider.booking_link, true),
    linkButton("Instagram", provider.instagram),
    linkButton("TikTok", provider.tiktok),
    linkButton("Website", provider.website)
  ].join("") || `<p class="section-lead">Booking links will appear here once added.</p>`;
}

document.addEventListener("DOMContentLoaded", loadProviderProfile);
