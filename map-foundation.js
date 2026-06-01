/* ============================================================
   Mortéa — Map Foundation · Final Version
   ============================================================ */

let allProviders = [];

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

  return `
    <article class="map-provider-card">
      <div class="map-provider-thumb"></div>
      <div>
        <div class="map-provider-topline">${escapeHtml(category)}</div>
        <h3><a href="provider.html?id=${encodeURIComponent(provider.id || '')}" style="color:inherit">${escapeHtml(name)}</a></h3>
        <p>${escapeHtml(city)}${country ? ', ' + escapeHtml(country) : ''}</p>
        <div class="map-card-actions">
          ${provider.booking_link ? `<a href="${escapeHtml(provider.booking_link)}" target="_blank" rel="noopener">Book</a>` : ''}
          ${provider.instagram    ? `<a href="${provider.instagram.startsWith('http') ? escapeHtml(provider.instagram) : 'https://instagram.com/' + escapeHtml(provider.instagram.replace('@',''))}" target="_blank" rel="noopener">Instagram</a>` : ''}
        </div>
      </div>
    </article>`;
}

function renderProviders(list) {
  const results = document.getElementById('mapResults');
  const count   = document.getElementById('resultCount');
  if (!results) return;

  if (!list.length) {
    results.innerHTML = `<div style="padding:28px;text-align:center;color:var(--muted)">No providers found. Try a different search.</div>`;
  } else {
    results.innerHTML = list.map(providerCard).join('');
  }

  if (count) count.textContent = `${list.length} provider${list.length !== 1 ? 's' : ''} found`;
}

function filterProviders() {
  const service = (document.getElementById('serviceSearch')?.value || '').toLowerCase().trim();
  const city    = (document.getElementById('citySearch')?.value || '').toLowerCase().trim();

  const filtered = allProviders.filter(p => {
    const sText = [p.business_name, p.category, p.services_offered, p.description].join(' ').toLowerCase();
    const cText = [p.city, p.province, p.country, p.address].join(' ').toLowerCase();
    return (!service || sText.includes(service)) && (!city || cText.includes(city));
  });

  renderProviders(filtered);
}

async function loadProviders() {
  try {
    if (typeof supabaseClient === 'undefined') throw new Error('Supabase not initialised');
    const { data, error } = await supabaseClient.from('professionals').select('*');
    if (error) throw error;
    allProviders = data || [];
    renderProviders(allProviders);
  } catch (err) {
    console.error('Map load error:', err);
    renderProviders([]);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadProviders();

  document.getElementById('mapSearchButton')?.addEventListener('click', filterProviders);

  ['serviceSearch', 'citySearch'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') filterProviders();
    });
  });

  document.querySelectorAll('[data-map-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-map-filter') || '';
      const input = document.getElementById('serviceSearch');
      if (input) input.value = input.value.toLowerCase() === val.toLowerCase() ? '' : val;
      filterProviders();
    });
  });

  // Geolocation button
  document.getElementById('useLocationButton')?.addEventListener('click', () => {
    const status = document.getElementById('locationStatus');
    if (!navigator.geolocation) {
      if (status) status.textContent = 'Geolocation is not supported by your browser.';
      return;
    }
    if (status) status.textContent = 'Locating you…';
    navigator.geolocation.getCurrentPosition(
      pos => {
        if (status) status.textContent = `Location found: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}. Google Maps API will show providers near this point.`;
      },
      () => {
        if (status) status.textContent = 'Unable to get location. Please search by city instead.';
      }
    );
  });
});
