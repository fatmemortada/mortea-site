/* ============================================================
   Mortéa — Configuration v2
   ============================================================ */

// ── Supabase ─────────────────────────────────────────────────
const SUPABASE_URL      = "https://gnlglfjtgfygpybqlcpa.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__Zv1DZ9ujSfmEy-YUNDg-w_pdiX55kG";
const supabaseClient    = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Google Maps ───────────────────────────────────────────────
const GOOGLE_MAPS_KEY = "AIzaSyCBoCytiF2MhVT585EALvA3J70KoR8MQ88";

// ── Stripe ────────────────────────────────────────────────────
// Stripe publishable key and price IDs are in stripe-checkout.js
