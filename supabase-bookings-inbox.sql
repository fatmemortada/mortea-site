-- ============================================================
-- Mortéa — Bookings, Inbox, Clients & Referrals Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Booking requests
CREATE TABLE IF NOT EXISTS booking_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id   UUID REFERENCES professionals(id) ON DELETE CASCADE,
  client_name   TEXT NOT NULL,
  client_email  TEXT NOT NULL,
  client_phone  TEXT,
  service       TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  message       TEXT,
  status        TEXT DEFAULT 'pending',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id  UUID REFERENCES professionals(id) ON DELETE CASCADE,
  sender_name  TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject      TEXT,
  body         TEXT NOT NULL,
  is_read      BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  name       TEXT,
  phone      TEXT,
  city       TEXT,
  country    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favourites
CREATE TABLE IF NOT EXISTS favourites (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID REFERENCES clients(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(client_id, provider_id)
);

-- Referrals
CREATE TABLE IF NOT EXISTS referrals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id     UUID REFERENCES professionals(id) ON DELETE SET NULL,
  referred_email  TEXT NOT NULL,
  referred_id     UUID REFERENCES professionals(id) ON DELETE SET NULL,
  status          TEXT DEFAULT 'pending',
  reward_applied  BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_booking_provider  ON booking_requests(provider_id);
CREATE INDEX IF NOT EXISTS idx_booking_status    ON booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_messages_provider ON messages(provider_id);
CREATE INDEX IF NOT EXISTS idx_messages_read     ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_fav_client        ON favourites(client_id);
CREATE INDEX IF NOT EXISTS idx_fav_provider      ON favourites(provider_id);

-- Disable RLS for simplicity (same as professionals table)
ALTER TABLE booking_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages         DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients          DISABLE ROW LEVEL SECURITY;
ALTER TABLE favourites       DISABLE ROW LEVEL SECURITY;
ALTER TABLE referrals        DISABLE ROW LEVEL SECURITY;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_booking_updated ON booking_requests;
CREATE TRIGGER trg_booking_updated
  BEFORE UPDATE ON booking_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
