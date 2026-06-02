-- ============================================================
-- Mortéa — Final Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Add missing columns to professionals table if they don't exist
ALTER TABLE professionals
  ADD COLUMN IF NOT EXISTS status          TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS photo_url       TEXT,
  ADD COLUMN IF NOT EXISTS services_offered TEXT,
  ADD COLUMN IF NOT EXISTS view_count      INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS review_count    INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS avg_rating      NUMERIC(3,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS membership_plan TEXT,
  ADD COLUMN IF NOT EXISTS latitude        NUMERIC(10,7),
  ADD COLUMN IF NOT EXISTS longitude       NUMERIC(10,7),
  ADD COLUMN IF NOT EXISTS updated_at      TIMESTAMPTZ DEFAULT NOW();

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id   UUID REFERENCES professionals(id) ON DELETE CASCADE,
  reviewer_name TEXT,
  rating        INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_professionals_status   ON professionals(status);
CREATE INDEX IF NOT EXISTS idx_professionals_city     ON professionals(city);
CREATE INDEX IF NOT EXISTS idx_professionals_category ON professionals(category);
CREATE INDEX IF NOT EXISTS idx_reviews_provider_id    ON reviews(provider_id);

-- Auto-update review stats on professionals when a review is inserted
CREATE OR REPLACE FUNCTION update_provider_review_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE professionals
  SET
    review_count = (SELECT COUNT(*) FROM reviews WHERE provider_id = NEW.provider_id),
    avg_rating   = (SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE provider_id = NEW.provider_id)
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_review_stats ON reviews;
CREATE TRIGGER trg_update_review_stats
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_provider_review_stats();

-- Row Level Security
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read approved professionals
DROP POLICY IF EXISTS "Public read approved professionals" ON professionals;
CREATE POLICY "Public read approved professionals"
  ON professionals FOR SELECT
  USING (status = 'approved' OR status IS NULL);

-- Anyone can insert an application
DROP POLICY IF EXISTS "Anyone can apply" ON professionals;
CREATE POLICY "Anyone can apply"
  ON professionals FOR INSERT
  WITH CHECK (true);

-- Authenticated users can update their own profile
DROP POLICY IF EXISTS "Own profile update" ON professionals;
CREATE POLICY "Own profile update"
  ON professionals FOR UPDATE
  USING (email = auth.jwt() ->> 'email');

-- Public can read reviews
DROP POLICY IF EXISTS "Public read reviews" ON reviews;
CREATE POLICY "Public read reviews"
  ON reviews FOR SELECT USING (true);

-- Anyone can submit a review
DROP POLICY IF EXISTS "Anyone can review" ON reviews;
CREATE POLICY "Anyone can review"
  ON reviews FOR INSERT WITH CHECK (true);

-- Storage bucket for provider photos (run separately in Supabase dashboard)
-- Dashboard > Storage > New bucket > Name: provider-photos > Public: ON
