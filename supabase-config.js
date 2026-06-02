/* ============================================================
   Mortéa — Configuration
   Update these values with your real credentials
   ============================================================ */

// ── Supabase ─────────────────────────────────────────────────
const SUPABASE_URL      = "https://gnlglfjtgfygpybqlcpa.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__Zv1DZ9ujSfmEy-YUNDg-w_pdiX55kG";
const supabaseClient    = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Google Maps ───────────────────────────────────────────────
// Add your Google Maps API key here to enable the live map.
// Get one at: https://console.cloud.google.com/
const GOOGLE_MAPS_KEY = ""; // e.g. "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX"

// ── Stripe ────────────────────────────────────────────────────
// Add your Stripe publishable key in stripe-checkout.js
// Price IDs are also configured in stripe-checkout.js
