-- ============================================================
-- Mortéa — Free Model Migration
-- Professionals join free, Mortéa takes 10% per booking
-- Run in Supabase SQL Editor
-- ============================================================

-- Add Stripe Connect fields to professionals
ALTER TABLE professionals
  ADD COLUMN IF NOT EXISTS stripe_account_id   TEXT,
  ADD COLUMN IF NOT EXISTS stripe_onboarded    BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS payout_currency     TEXT DEFAULT 'usd';

-- Services table (professionals set their own prices)
CREATE TABLE IF NOT EXISTS services (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id  UUID REFERENCES professionals(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  description  TEXT,
  price_usd    NUMERIC(10,2) NOT NULL,
  duration_min INTEGER,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_provider ON services(provider_id);
CREATE INDEX IF NOT EXISTS idx_services_active   ON services(provider_id, is_active);

ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- Add payment fields to booking_requests
ALTER TABLE booking_requests
  ADD COLUMN IF NOT EXISTS service_id          UUID REFERENCES services(id),
  ADD COLUMN IF NOT EXISTS price_usd           NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS currency            TEXT DEFAULT 'usd',
  ADD COLUMN IF NOT EXISTS amount_charged      NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS mortea_fee          NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS provider_payout     NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT,
  ADD COLUMN IF NOT EXISTS stripe_checkout_id  TEXT,
  ADD COLUMN IF NOT EXISTS payment_status      TEXT DEFAULT 'unpaid';

-- Sample services for Maison Malaak
INSERT INTO services (provider_id, name, description, price_usd, duration_min)
SELECT id, 'Japanese Head Spa', 'Deep scalp cleansing, massage, steam treatment and blow-dry. 60-90 min luxury experience.', 120.00, 75
FROM professionals WHERE email = 'info.maisonmalaak@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO services (provider_id, name, description, price_usd, duration_min)
SELECT id, 'Facial & Skin Care', 'Custom facial treatment tailored to your skin type. Includes cleansing, exfoliation, and mask.', 85.00, 60
FROM professionals WHERE email = 'info.maisonmalaak@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO services (provider_id, name, description, price_usd, duration_min)
SELECT id, 'Brow Lamination', 'Professional brow lamination and tinting for defined, fluffy brows that last 6-8 weeks.', 65.00, 45
FROM professionals WHERE email = 'info.maisonmalaak@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO services (provider_id, name, description, price_usd, duration_min)
SELECT id, 'Lash Lift & Tint', 'Semi-permanent lash lift and tint for naturally curled, darker lashes without extensions.', 75.00, 50
FROM professionals WHERE email = 'info.maisonmalaak@gmail.com'
ON CONFLICT DO NOTHING;
