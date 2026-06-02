/* ============================================================
   Mortéa — Discover Dynamic · Final Version
   ============================================================ */

let discoverProviders = [];

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
}

function providerCard(provider) {
  const name     = provider.business_name || 'Professional';
  const category = provider.category || 'Beauty Professional';
  const city     = provider.city || '';
  const country  = provider.country || '';
  const location = [city, country].filter(Boolean).join(', ');
  const services = (provider.services_offered || '')
    .split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);
  const thumbStyle = provider.photo_url
    ? `background-image:url('${escapeHtml(provider.photo_url)}');background-size:cover;background-position:center`
    : `background:linear-gradient(140deg,#d9b7a2,#3e2218)`;

  return `
    <div class="result" id="card-${escapeHtml(provider.id)}">
      <div class="thumb" style="${thumbStyle}"></div>
      <div>
        <h4><a href="provider.html?id=${encodeURIComponent(provider.id)}">${escapeHtml(name)}</a></h4>
        <p>${escapeHtml(category)}${location ? ' · ' + escapeHtml(location) : ''}</p>
        <div class="socials">
          ${provider.booking_link
            ? `<a href="${escapeHtml(provider.booking_link)}" target="_blank" rel="noopener">Book</a>`
            : `<span>Profile</span>`}
          ${provider.instagram
            ? `<a href="${provider.instagram.startsWith('http') ? escapeHtml(provider.instagram) : 'https://instagram.com/' + escapeHtml(provider.instagram.replace('@',''))}" target="_blank" rel="noopener">Instagram</a>`
            : ''}
          ${provider.tiktok
            ? `<a href="${provider.tiktok.startsWith('http') ? escapeHtml(provider.tiktok) : 'https://tiktok.com/@' + escapeHtml(provider.tiktok.replace('@',''))}" target="_blank" rel="noopener">TikTok</a>`
            : ''}
          ${provider.website
            ? `<a href="${escapeHtml(provider.website)}" target="_blank" rel="noopener">Website</a>`
            : ''}
        </div>
        ${services.length
          ? `<div class="taglist" style="margin-top:8px">${services.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>`
          : ''}
      </div>
    </div>`;
}

function renderDiscoverProviders(list) {
  const results = document.getElementById('discoverProviderResults');
  const count   = document.getElementById('discoverProviderCount');
  if (!results) return;

  if (!list.length) {
    results.innerHTML = `
      <div style="border:1px solid var(--line);border-radius:26px;padding:40px 28px;text-align:center;color:var(--muted)">
        <h3 style="font-family:'Playfair Display',serif;font-size:26px;margin-bottom:10px;color:var(--champagne)">No providers found yet</h3>
        <p style="margin-bottom:18px">Try a different city or category, or be the first to join in your area.</p>
        <a class="btn secondary" href="professional-onboarding.html">Join as a professional</a>
      </div>`;
  } else {
    results.innerHTML = list.map(providerCard).join('');
  }

  if (count) count.textContent = list.length === 1
    ? '1 provider'
    : `${list.length} providers`;
}

async function loadDiscoverProviders() {
  const count = document.getElementById('discoverProviderCount');
  if (count) count.textContent = 'Loading…';

  try {
    if (typeof supabaseClient === 'undefined') throw new Error('Supabase not initialised');

    // Load only approved/active professionals so paid members appear publicly
    const { data, error } = await supabaseClient
      .from('professionals')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;

    discoverProviders = (data || []).filter(p => !p.subscription_status || p.subscription_status === 'active');

    renderDiscoverProviders(discoverProviders);
  } catch (err) {
    console.error('Discover load error:', err);
    renderDiscoverProviders([]);
    if (count) count.textContent = 'Unable to load';
  }
}

function filterDiscoverProviders() {
  const service = (document.getElementById('discoverServiceSearch')?.value || '').toLowerCase().trim();
  const city    = (document.getElementById('discoverCitySearch')?.value  || '').toLowerCase().trim();

  const filtered = discoverProviders.filter(p => {
    const sText = [p.business_name, p.category, p.services_offered, p.description].join(' ').toLowerCase();
    const cText = [p.city, p.province, p.country, p.address].join(' ').toLowerCase();
    return (!service || sText.includes(service)) && (!city || cText.includes(city));
  });

  renderDiscoverProviders(filtered);

  document.querySelectorAll('#discoverFilters button').forEach(btn => {
    const val = (btn.getAttribute('data-discover-filter') || '').toLowerCase();
    btn.classList.toggle('active', !!service && service.includes(val));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadDiscoverProviders();

  document.getElementById('discoverSearchButton')?.addEventListener('click', filterDiscoverProviders);

  ['discoverServiceSearch', 'discoverCitySearch'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') filterDiscoverProviders();
    });
  });

  document.querySelectorAll('[data-discover-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-discover-filter') || '';
      const input = document.getElementById('discoverServiceSearch');
      if (input) input.value = input.value.toLowerCase() === value.toLowerCase() ? '' : value;
      filterDiscoverProviders();
    });
  });

  // Pre-fill from URL params (homepage search or city page link)
  const params = new URLSearchParams(window.location.search);
  const svc  = params.get('service');
  const city = params.get('city');
  if (svc  && document.getElementById('discoverServiceSearch')) document.getElementById('discoverServiceSearch').value = svc;
  if (city && document.getElementById('discoverCitySearch'))    document.getElementById('discoverCitySearch').value = city;
  if (svc || city) setTimeout(filterDiscoverProviders, 400);
});
