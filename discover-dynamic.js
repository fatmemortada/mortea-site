/* ============================================================
   Mortéa — Discover Dynamic · Final Version
   Live provider search from Supabase
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

  const services = (provider.services_offered || category)
    .split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);

  const thumbGradient = category.toLowerCase().includes('botox') || category.toLowerCase().includes('clinic')
    ? 'linear-gradient(140deg,#c9a488,#2e1510)'
    : category.toLowerCase().includes('nail')
    ? 'linear-gradient(140deg,#e8c5a8,#5c3020)'
    : 'linear-gradient(140deg,#d9b7a2,#3e2218)';

  return `
    <div class="result">
      <div class="thumb" style="background:${thumbGradient}"></div>
      <div>
        <h4><a href="provider.html?id=${encodeURIComponent(provider.id || '')}">${escapeHtml(name)}</a></h4>
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
        </div>
        ${services.length
          ? `<div class="taglist" style="margin-top:10px">${services.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>`
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
      <div class="no-results">
        <h3>No providers found yet</h3>
        <p>Try a different city or category, or be the first to register in your area.</p>
        <div style="margin-top:18px">
          <a class="btn secondary" href="professional-onboarding.html">Join as a professional</a>
        </div>
      </div>`;
  } else {
    results.innerHTML = list.map(providerCard).join('');
  }

  if (count) count.textContent = list.length === 1 ? '1 live provider' : `${list.length} live providers`;
}

async function loadDiscoverProviders() {
  const count = document.getElementById('discoverProviderCount');
  if (count) count.textContent = 'Loading…';

  try {
    if (typeof supabaseClient === 'undefined') throw new Error('Supabase not initialised');

    const { data, error } = await supabaseClient
      .from('professionals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    discoverProviders = data || [];
    renderDiscoverProviders(discoverProviders);
  } catch (err) {
    console.error('Discover load error:', err);
    renderDiscoverProviders([]);
    if (count) count.textContent = 'Unable to load';
  }
}

function filterDiscoverProviders() {
  const service = (document.getElementById('discoverServiceSearch')?.value || '').toLowerCase().trim();
  const city    = (document.getElementById('discoverCitySearch')?.value || '').toLowerCase().trim();

  const filtered = discoverProviders.filter(p => {
    const sText = [p.business_name, p.category, p.services_offered, p.description].join(' ').toLowerCase();
    const cText = [p.city, p.province, p.country, p.address].join(' ').toLowerCase();
    return (!service || sText.includes(service)) && (!city || cText.includes(city));
  });

  renderDiscoverProviders(filtered);

  // Highlight active filter button
  document.querySelectorAll('#discoverFilters button').forEach(btn => {
    const val = (btn.getAttribute('data-discover-filter') || '').toLowerCase();
    btn.classList.toggle('active', !!service && service.includes(val));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadDiscoverProviders();

  document.getElementById('discoverSearchButton')?.addEventListener('click', filterDiscoverProviders);

  // Allow Enter key in inputs
  ['discoverServiceSearch', 'discoverCitySearch'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') filterDiscoverProviders();
    });
  });

  // Quick filter chips
  document.querySelectorAll('[data-discover-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-discover-filter') || '';
      const input = document.getElementById('discoverServiceSearch');
      if (input) {
        // Toggle: if already set, clear it
        if (input.value.toLowerCase() === value.toLowerCase()) {
          input.value = '';
        } else {
          input.value = value;
        }
      }
      filterDiscoverProviders();
    });
  });
});
