// Mortéa Phase 54 — Real Dashboard Engine

async function loadDashboardMetrics(supabaseClient, providerId) {
  const bookings = await supabaseClient
    .from("bookings")
    .select("*")
    .eq("provider_id", providerId);

  const reviews = await supabaseClient
    .from("reviews")
    .select("*")
    .eq("provider_id", providerId);

  return {
    bookings: bookings.data || [],
    reviews: reviews.data || []
  };
}\n