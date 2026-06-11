// Mortéa Phase 53 — Provider Dashboard Live Data

async function loadProviderDashboardData(supabaseClient, providerId) {
  const [services, bookings, reviews] = await Promise.all([
    supabaseClient.from("provider_services").select("*").eq("provider_id", providerId),
    supabaseClient.from("bookings").select("*").eq("provider_id", providerId),
    supabaseClient.from("reviews").select("*").eq("provider_id", providerId)
  ]);

  return {
    services: services.data || [],
    bookings: bookings.data || [],
    reviews: reviews.data || []
  };
}

function renderDashboardSummary(data) {
  const container = document.getElementById("dashboard-summary");
  if (!container) return;

  container.innerHTML = `
    <div class="dashboard-card">${data.services.length} Services</div>
    <div class="dashboard-card">${data.bookings.length} Bookings</div>
    <div class="dashboard-card">${data.reviews.length} Reviews</div>
  `;
}
