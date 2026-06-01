/* ============================================================
   Mortéa — Global Luxury Beauty Discovery
   Core Script · Final Version
   ============================================================ */

// ── Professional Categories (EN) ─────────────────────────────
const categories = [
  'Beauty salons', 'Hair stylists', 'Hair color specialists', 'Barbers',
  'Makeup artists', 'Bridal beauty', 'Estheticians', 'Facial specialists',
  'Hydrafacial specialists', 'Japanese head spa', 'Nail technicians',
  'Lash technicians', 'Brow artists', 'Brow lamination', 'Waxing specialists',
  'Massage therapists', 'Wellness clinics', 'Holistic practitioners',
  'Botox clinics', 'Laser clinics', 'Medical aesthetics clinics',
  'Cosmetic injectors', 'Med spas', 'PRP specialists',
  'Microneedling specialists', 'Skin rejuvenation clinics',
  'Body contouring clinics', 'Hair restoration clinics',
  'Permanent makeup artists', 'Cosmetic tattoo artists',
  'Teeth whitening specialists', 'Beauty bloggers',
  'Beauty influencers', 'Beauty educators'
];

// ── Professional Categories (FR) ─────────────────────────────
const categoriesFr = [
  'Salons de beauté', 'Coiffeurs / stylistes capillaires', 'Coloristes', 'Barbiers',
  'Maquilleurs', 'Beauté nuptiale', 'Esthéticiennes', 'Spécialistes des soins du visage',
  'Spécialistes Hydrafacial', 'Head spa japonais', 'Techniciennes d\'ongles',
  'Techniciennes de cils', 'Spécialistes des sourcils', 'Brow lamination',
  'Spécialistes de l\'épilation', 'Massothérapeutes', 'Cliniques bien-être',
  'Praticiens holistiques', 'Cliniques Botox', 'Cliniques laser',
  'Cliniques de médecine esthétique', 'Injecteurs cosmétiques', 'Med spas',
  'Spécialistes PRP', 'Spécialistes microneedling',
  'Cliniques de rajeunissement de la peau', 'Cliniques de remodelage corporel',
  'Cliniques de restauration capillaire', 'Artistes maquillage permanent',
  'Tatoueurs cosmétiques', 'Spécialistes blanchiment dentaire',
  'Blogueurs beauté', 'Influenceurs beauté', 'Éducateurs beauté'
];

// ── Render Tag Lists ─────────────────────────────────────────
function renderTags(id, list) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = list.map(c =>
    `<span class="tag">${escapeHtml(c)}</span>`
  ).join('');
}

renderTags('category-tags', categories);
renderTags('category-tags-fr', categoriesFr);

// ── HTML Escape Utility ───────────────────────────────────────
function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
}

// ── Professional Application Form ─────────────────────────────
async function submitProfessionalApplication() {
  const btn = document.getElementById('submitProfessional');
  const msg = document.getElementById('formMessage');

  if (!btn) return;

  // Validate required fields
  const required = ['business_name', 'owner_name', 'email', 'category', 'country', 'province', 'city', 'address', 'description'];
  for (const id of required) {
    const el = document.getElementById(id);
    if (el && !el.value.trim()) {
      if (msg) {
        msg.textContent = 'Please fill in all required fields.';
        msg.className = 'error';
      }
      el.focus();
      return;
    }
  }

  // Check Supabase availability
  if (typeof supabaseClient === 'undefined') {
    if (msg) {
      msg.textContent = 'Database not connected. Please check your Supabase configuration.';
      msg.className = 'error';
    }
    return;
  }

  btn.textContent = 'Submitting…';
  btn.disabled = true;

  const payload = {
    business_name:  document.getElementById('business_name')?.value?.trim() || '',
    owner_name:     document.getElementById('owner_name')?.value?.trim() || '',
    email:          document.getElementById('email')?.value?.trim() || '',
    phone:          document.getElementById('phone')?.value?.trim() || '',
    category:       document.getElementById('category')?.value?.trim() || '',
    country:        document.getElementById('country')?.value?.trim() || '',
    province:       document.getElementById('province')?.value?.trim() || '',
    city:           document.getElementById('city')?.value?.trim() || '',
    address:        document.getElementById('address')?.value?.trim() || '',
    instagram:      document.getElementById('instagram')?.value?.trim() || '',
    tiktok:         document.getElementById('tiktok')?.value?.trim() || '',
    website:        document.getElementById('website')?.value?.trim() || '',
    booking_link:   document.getElementById('booking_link')?.value?.trim() || '',
    description:    document.getElementById('description')?.value?.trim() || ''
  };

  try {
    const { error } = await supabaseClient.from('professionals').insert([payload]);
    if (error) {
      if (msg) { msg.textContent = 'Submission error: ' + error.message; msg.className = 'error'; }
    } else {
      if (msg) { msg.textContent = '✓ Application submitted successfully! We will review your profile and be in touch.'; msg.className = ''; }
      document.getElementById('professionalForm')?.reset();
    }
  } catch (e) {
    if (msg) { msg.textContent = 'Unexpected error. Please try again.'; msg.className = 'error'; }
  } finally {
    btn.textContent = 'Submit Application';
    btn.disabled = false;
  }
}

document.getElementById('submitProfessional')?.addEventListener('click', submitProfessionalApplication);
