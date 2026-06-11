/* ============================================================
   Mortéa — Provider Dynamic · Final Version
   ============================================================ */

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
}

function linkButton(label, url, primary = false) {
  if (!url) return '';
  const href = url.startsWith('http') ? url : 'https://' + url;
  return `<a class="btn ${primary ? 'primary' : 'secondary'}" href="${escapeHtml(href)}" target="_blank" rel="noopener" style="font-size:14px">${escapeHtml(label)}</a>`;
}

function normaliseWA(number) {
  if (!number) return '';
  return 'https://wa.me/' + number.replace(/[^\d]/g, '');
}

function normaliseIG(handle) {
  if (!handle) return '';
  if (handle.startsWith('http')) return handle;
  return 'https://instagram.com/' + handle.replace('@', '');
}

function normaliseTK(handle) {
  if (!handle) return '';
  if (handle.startsWith('http')) return handle;
  return 'https://tiktok.com/@' + handle.replace('@', '');
}

async function loadProviderProfile() {
  const params = new URLSearchParams(window.location.search);
  const providerId = params.get('id');

  if (!providerId) { showNotFound(); return; }

  const { data: provider, error } = await supabaseClient
    .from('professionals')
    .select('*')
    .eq('id', providerId)
    .maybeSingle();

  if (error || !provider) { showNotFound(); return; }

  // Track view
  supabaseClient.from('professionals')
    .update({ view_count: (provider.view_count || 0) + 1 })
    .eq('id', providerId)
    .then(() => {});

  document.getElementById('profileLoading').style.display = 'none';
  document.getElementById('profileContent').style.display = 'block';

  // Update page title & meta
  document.title = `${provider.business_name || 'Professional'} — Mortéa`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${provider.business_name} · ${provider.category || 'Beauty Professional'} in ${provider.city || ''} on Mortéa.`;

  // Avatar
  if (provider.photo_url) {
    const img = document.getElementById('profilePhoto');
    img.src = provider.photo_url; img.alt = provider.business_name || ''; img.style.display = 'block';
  }

  // Basic info
  document.getElementById('profileName').textContent     = provider.business_name || 'Professional';
  document.getElementById('profileCategory').textContent = provider.category || '';
  document.getElementById('profileLocation').textContent = [provider.city, provider.country].filter(Boolean).join(', ');
  document.getElementById('profileRating').textContent   = provider.avg_rating ? parseFloat(provider.avg_rating).toFixed(1) : '—';
  document.getElementById('profileReviewCount').textContent = provider.review_count || 0;
  document.getElementById('profileViews').textContent    = provider.view_count || 0;

  // CTAs
  const ctas = document.getElementById('profileCtas');
  const pid = provider.id || '';
  ctas.innerHTML = [
    `<a class="btn primary" href="booking-request.html?id=${encodeURIComponent(pid)}" style="font-size:14px">📅 Request booking</a>`,
    provider.whatsapp  ? `<a class="btn secondary" href="${normaliseWA(provider.whatsapp)}" target="_blank" rel="noopener" style="font-size:14px;background:rgba(37,211,102,.12);border-color:rgba(37,211,102,.35);color:#25d366">💬 WhatsApp</a>` : '',
    provider.booking_link ? linkButton('External booking →', provider.booking_link) : '',
    provider.instagram ? linkButton('Instagram', normaliseIG(provider.instagram)) : '',
    provider.tiktok    ? linkButton('TikTok',    normaliseTK(provider.tiktok))    : '',
    provider.website   ? linkButton('Website',   provider.website)                : ''
  ].join('');

  // Bio
  if (provider.description) {
    document.getElementById('profileAboutSection').style.display = 'block';
    document.getElementById('profileBio').textContent = provider.description;
  }

  // Services
  const services = (provider.services_offered || '').split(',').map(s => s.trim()).filter(Boolean);
  if (services.length) {
    document.getElementById('profileServicesSection').style.display = 'block';
    document.getElementById('profileServices').innerHTML =
      services.map(s => `<span class="service-tag">${escapeHtml(s)}</span>`).join('');
  }

  // Address
  const addr = [provider.address, provider.city, provider.province, provider.country].filter(Boolean).join(', ');
  document.getElementById('profileAddress').textContent = addr || 'Location on request';

  // Social links sidebar
  const socials = document.getElementById('socialLinks');
  const socialItems = [
    provider.booking_link ? `<a class="social-link" href="${escapeHtml(provider.booking_link)}" target="_blank"><span class="icon">📅</span> Book appointment</a>` : '',
    provider.whatsapp     ? `<a class="social-link" href="${normaliseWA(provider.whatsapp)}" target="_blank" rel="noopener" style="border-color:rgba(37,211,102,.25);background:rgba(37,211,102,.06)"><span class="icon">💬</span> WhatsApp</a>` : '',
    provider.instagram    ? `<a class="social-link" href="${normaliseIG(provider.instagram)}" target="_blank"><span class="icon">📸</span> Instagram</a>` : '',
    provider.tiktok       ? `<a class="social-link" href="${normaliseTK(provider.tiktok)}" target="_blank"><span class="icon">🎵</span> TikTok</a>` : '',
    provider.website      ? `<a class="social-link" href="${escapeHtml(provider.website)}" target="_blank"><span class="icon">🌐</span> Website</a>` : '',
    provider.phone        ? `<a class="social-link" href="tel:${escapeHtml(provider.phone)}"><span class="icon">📞</span> ${escapeHtml(provider.phone)}</a>` : '',
    provider.email        ? `<a class="social-link" href="mailto:${escapeHtml(provider.email)}"><span class="icon">✉️</span> Email</a>` : ''
  ].filter(Boolean);
  socials.innerHTML = socialItems.length ? socialItems.join('') : '<p style="color:var(--muted);font-size:14px">No links added yet.</p>';

  // Load reviews
  loadProviderReviews(providerId);
}

async function loadProviderReviews(providerId) {
  const { data } = await supabaseClient
    .from('reviews')
    .select('*')
    .eq('provider_id', providerId)
    .order('created_at', { ascending: false });

  if (!data || !data.length) return;

  document.getElementById('profileReviews').innerHTML = data.map(r => `
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}</div>
      <p style="margin:8px 0;color:var(--sand);font-size:15px">${escapeHtml(r.comment || '')}</p>
      <div style="font-size:13px;color:var(--muted)">${escapeHtml(r.reviewer_name || 'Anonymous')} · ${new Date(r.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
    </div>`).join('');
}

function showNotFound() {
  document.getElementById('profileLoading').style.display  = 'none';
  document.getElementById('profileNotFound').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', loadProviderProfile);


// ── Load services with prices ──────────────────────────────────
async function loadProviderServices(providerId) {
  const { data: services } = await supabaseClient
    .from('services').select('*')
    .eq('provider_id', providerId).eq('is_active', true)
    .order('price_usd');

  const section = document.getElementById('profileServicesSection');
  if (!section) return;

  if (!services || !services.length) return;

  section.style.display = 'block';
  document.getElementById('profileServices').innerHTML = services.map(s => `
    <div style="border:1px solid var(--line);border-radius:18px;padding:14px 16px;background:rgba(255,255,255,.04);display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:8px;cursor:pointer;transition:all .18s"
         onclick="window.location.href='booking-request.html?id=${providerId}&service='+encodeURIComponent('${escapeHtml(s.name||'')}')">
      <div>
        <div style="font-weight:700;font-size:15px">${escapeHtml(s.name)}</div>
        ${s.description ? `<div style="font-size:13px;color:var(--muted)">${escapeHtml(s.description)}</div>` : ''}
        ${s.duration_min ? `<div style="font-size:12px;color:var(--muted);margin-top:2px">${s.duration_min} min</div>` : ''}
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-family:Playfair Display,serif;font-size:22px;color:var(--sand)">$${parseFloat(s.price_usd).toFixed(0)}</div>
        <div style="font-size:11px;color:var(--rose);margin-top:2px">Book →</div>
      </div>
    </div>`).join('');
}