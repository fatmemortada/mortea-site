-- ============================================================
-- Mortéa — Sample Approved Providers
-- Run this in Supabase SQL Editor to populate discover/map pages
-- ============================================================

INSERT INTO professionals
  (business_name, owner_name, email, phone, category, country, province, city, address,
   instagram, tiktok, website, booking_link, description, status, membership_plan)
VALUES
(
  'Maison Malaak',
  'Malak',
  'info.maisonmalaak@gmail.com',
  '+1 450 000 0001',
  'Japanese Head Spa',
  'Canada', 'Québec', 'Longueuil',
  'Longueuil, QC',
  '@maisonmalaak', '@maisonmalaak', 'https://www.maisonmalaak.com', 'https://www.maisonmalaak.com/booking',
  'Head Spa & Wellness, Facials & Skin Care, Brows, Lashes & PMU. Premium luxury beauty experience in Longueuil.',
  'approved', 'professional'
),
(
  'Élan Aesthetic Clinic',
  'Sophie Martin',
  'hello@elanclinic.ca',
  '+1 514 000 0002',
  'Botox & Aesthetic Clinic',
  'Canada', 'Québec', 'Montréal',
  '1234 Rue Sainte-Catherine, Montréal, QC',
  '@elanclinic', '@elanclinic', NULL, NULL,
  'Botox, lip filler, skin rejuvenation, and medical aesthetics in Montréal. Luxury clinic experience.',
  'approved', 'professional'
),
(
  'Studio Lumière Lashes',
  'Léa Dubois',
  'lea@studiolumiere.ca',
  '+1 514 000 0003',
  'Lash Technician',
  'Canada', 'Québec', 'Montréal',
  '567 Avenue du Mont-Royal, Montréal, QC',
  '@studiolumierelashes', NULL, NULL, NULL,
  'Classic, hybrid, and volume lash extensions. Brow lamination and tinting. Luxury lash studio in Montréal.',
  'approved', 'independent'
)
ON CONFLICT (email) DO UPDATE
  SET status = 'approved',
      membership_plan = EXCLUDED.membership_plan;
