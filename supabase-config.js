/* ============================================================
   Mortéa — Configuration v3
   ============================================================ */

// ── Supabase ─────────────────────────────────────────────────
const SUPABASE_URL      = "https://gnlglfjtgfygpybqlcpa.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__Zv1DZ9ujSfmEy-YUNDg-w_pdiX55kG";
const supabaseClient    = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Google Maps ───────────────────────────────────────────────
const GOOGLE_MAPS_KEY = "AIzaSyCBoCytiF2MhVT585EALvA3J70KoR8MQ88";

// ── Stripe Connect ────────────────────────────────────────────
// Mortéa takes 10% of every booking (application_fee_amount)
// Professionals receive 90% directly to their connected Stripe account
// Adaptive pricing: Stripe auto-converts to client's local currency
const MORTEA_FEE_PERCENT   = 10;
const STRIPE_CONNECT_PUBKEY = "pk_live_51Tb6jv539sddq3X5BXvVI1pUCXBOHW2o5t6vRrnAx44HZ6ycTeXbOHGWrdQ8q4TM0i8Pq3066ZLNPocbVIxWeS9D00l7tFdjo1";

// Currency map by country code (ISO 3166-1 alpha-2)
const CURRENCY_MAP = {
  CA: 'cad', US: 'usd',
  GB: 'gbp',
  FR: 'eur', DE: 'eur', IT: 'eur', ES: 'eur', NL: 'eur', BE: 'eur',
  PT: 'eur', AT: 'eur', IE: 'eur', GR: 'eur', FI: 'eur', SE: 'eur',
  AE: 'aed', SA: 'sar', LB: 'usd', KW: 'kwd', QA: 'qar',
  AU: 'aud', NZ: 'nzd', JP: 'jpy', KR: 'krw', SG: 'sgd',
  CH: 'chf', NO: 'nok', DK: 'dkk',
};

function getCurrencyForCountry(countryCode) {
  return CURRENCY_MAP[(countryCode||'').toUpperCase()] || 'usd';
}
