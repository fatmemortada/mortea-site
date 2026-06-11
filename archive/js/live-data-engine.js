// Mortéa Phase 53 — Real Supabase Live Data Engine

async function fetchLiveProviders(supabaseClient) {
  const { data, error } = await supabaseClient
    .from("professionals")
    .select("*")
    .eq("status", "approved");

  if (error) {
    console.error("Error loading providers:", error);
    return [];
  }

  return data || [];
}

async function fetchLiveReviews(supabaseClient, providerId) {
  const { data, error } = await supabaseClient
    .from("reviews")
    .select("*")
    .eq("provider_id", providerId)
    .eq("approved", true);

  if (error) {
    console.error("Error loading reviews:", error);
    return [];
  }

  return data || [];
}
