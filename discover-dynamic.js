/* ============================================================
   Mortéa — Discover Dynamic · v2
   Grid/list views, sort, advanced filters
   ============================================================ */

let discoverProviders = [];
let currentView = 'grid';

function esc(v) {
  return String(v||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function gradientForCategory(cat) {
  const c = (cat||'').toLowerCase();
  if (c.includes('botox')||c.includes('inject')||c.includes('clinic')) return 'linear-gradient(140deg,#c9a890,#2e1510)';
  if (c.includes('lash')) return 'linear-gradient(140deg,#e8c5a8,#5c3020)';
  if (c.includes('nail')) return 'linear-gradient(140deg,#ddb89c,#4a2415)';
  if (c.includes('spa')||c.includes('wellness')) return 'linear-gradient(140deg,#cdb0a0,#3a1e14)';
  if (c.includes('hair')) return 'linear-gradient(140deg,#e0c4b0,#4e281a)';
  return 'linear-gradient(140deg,#d9b7a2,#3e2218)';
}

function gridCard(p) {
  const thumbStyle = p.photo_url
    ? `background-image:url('${esc(p.photo_url)}');background-size:cover;background-position:center`
    : gradientForCategory(p.category);
  const rating = p.avg_rating ? `<span style="color:var(--champagne);font-size:12px">★ ${parseFloat(p.avg_rating).toFixed(1)}</span>` : '';
  return `
    <article class="provider-grid-card">
      <div class="grid-thumb" style="${thumbStyle}">
        <span class="grid-cat-badge">${esc(p.category||'Professional')}</span>
      </div>
      <div class="grid-body">
        <h3><a href="provider.html?id=${encodeURIComponent(p.id)}">${esc(p.business_name)}</a></h3>
        <div class="grid-loc">${esc(p.city||'')}${p.country?', '+esc(p.country):''} ${rating}</div>
        <div class="grid-actions">
          <a class="btn primary" href="booking-request.html?id=${encodeURIComponent(p.id)}" style="font-size:12px;padding:7px 13px">Book</a>
          ${p.instagram?`<a class="btn secondary" href="https://instagram.com/${esc(p.instagram.replace('@',''))}" target="_blank" rel="noopener" style="font-size:12px;padding:7px 13px">Instagram</a>`:''}
          ${p.tiktok?`<a class="btn secondary" href="https://tiktok.com/@${esc(p.tiktok.replace('@',''))}" target="_blank" rel="noopener" style="font-size:12px;padding:7px 13px">TikTok</a>`:''}
        </div>
      </div>
    </article>`;
}

function listCard(p) {
  const thumbStyle = p.photo_url
    ? `background-image:url('${esc(p.photo_url)}');background-size:cover;background-position:center`
    : gradientForCategory(p.category);
  const services = (p.services_offered||'').split(',').map(s=>s.trim()).filter(Boolean).slice(0,3);
  return `
    <div class="result" id="card-${esc(p.id)}">
      <div class="thumb" style="${thumbStyle}" loading="lazy"></div>
      <div>
        <h4><a href="provider.html?id=${encodeURIComponent(p.id)}">${esc(p.business_name)}</a></h4>
        <p>${esc(p.category||'')}${p.city?' · '+esc(p.city):''}${p.country?', '+esc(p.country):''}${p.avg_rating?' · ★ '+parseFloat(p.avg_rating).toFixed(1):''}</p>
        <div class="socials">
          <a href="booking-request.html?id=${encodeURIComponent(p.id)}">Book</a>
          ${p.booking_link?`<a href="${esc(p.booking_link)}" target="_blank" rel="noopener">External</a>`:''}
          ${p.instagram?`<a href="https://instagram.com/${esc(p.instagram.replace('@',''))}" target="_blank" rel="noopener">Instagram</a>`:''}
          ${p.tiktok?`<a href="https://tiktok.com/@${esc(p.tiktok.replace('@',''))}" target="_blank" rel="noopener">TikTok</a>`:''}
        </div>
        ${services.length?`<div class="taglist" style="margin-top:8px">${services.map(s=>`<span class="tag">${esc(s)}</span>`).join('')}</div>`:''}
      </div>
    </div>`;
}

function renderCurrentProviders() {
  renderDiscoverProviders(discoverProviders);
}

function renderDiscoverProviders(list) {
  const results = document.getElementById('discoverProviderResults');
  const count   = document.getElementById('discoverProviderCount');
  if (!results) return;

  if (!list.length) {
    results.innerHTML = `
      <div class="empty-state">
        <h3>No providers found</h3>
        <p style="margin-bottom:18px">Try a different search, or be the first to join in your area.</p>
        <a class="btn primary" href="professional-onboarding.html">Join as a professional</a>
      </div>`;
  } else {
    const view = typeof currentView !== 'undefined' ? currentView : 'grid';
    if (view === 'grid') {
      results.innerHTML = `<div class="providers-grid">${list.map(gridCard).join('')}</div>`;
    } else {
      results.innerHTML = `<div style="display:grid;gap:14px">${list.map(listCard).join('')}</div>`;
    }
  }

  if (count) {
    count.textContent = list.length === 1 ? '1 provider' : `${list.length} providers`;
  }
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

    const approved = (data||[]).filter(p => p.status === 'approved');
    discoverProviders = approved.length ? approved : (data||[]);
    renderDiscoverProviders(discoverProviders);
  } catch(err) {
    console.error('Discover load error:', err);
    renderDiscoverProviders([]);
    if (count) count.textContent = 'Unable to load';
  }
}

function filterDiscoverProviders() {
  const service  = (document.getElementById('discoverServiceSearch')?.value||'').toLowerCase().trim();
  const city     = (document.getElementById('discoverCitySearch')?.value||'').toLowerCase().trim();
  const category = (document.getElementById('categoryFilter')?.value||'').toLowerCase().trim();
  const cityDrop = (document.getElementById('cityFilter')?.value||'').toLowerCase().trim();
  const sort     = (document.getElementById('sortFilter')?.value||'');

  let filtered = discoverProviders.filter(p => {
    const sText = [p.business_name,p.category,p.services_offered,p.description].join(' ').toLowerCase();
    const cText = [p.city,p.province,p.country,p.address].join(' ').toLowerCase();
    const serviceMatch  = !service  || sText.includes(service);
    const cityMatch     = !city     || cText.includes(city);
    const categoryMatch = !category || sText.includes(category);
    const cityDropMatch = !cityDrop || cText.includes(cityDrop);
    return serviceMatch && cityMatch && categoryMatch && cityDropMatch;
  });

  // Sort
  if (sort === 'name') {
    filtered.sort((a,b) => (a.business_name||'').localeCompare(b.business_name||''));
  } else if (sort === 'rating') {
    filtered.sort((a,b) => (parseFloat(b.avg_rating||0)) - (parseFloat(a.avg_rating||0)));
  } else if (sort === 'reviews') {
    filtered.sort((a,b) => (parseInt(b.review_count||0)) - (parseInt(a.review_count||0)));
  }

  renderDiscoverProviders(filtered);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadDiscoverProviders();

  document.getElementById('discoverSearchButton')?.addEventListener('click', filterDiscoverProviders);
  ['discoverServiceSearch','discoverCitySearch'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') filterDiscoverProviders();
    });
  });

  // Pre-fill from URL and auto-filter
  const params = new URLSearchParams(window.location.search);
  const svc = params.get('service'), city = params.get('city');
  if (svc && document.getElementById('discoverServiceSearch'))
    document.getElementById('discoverServiceSearch').value = svc;
  if (city && document.getElementById('discoverCitySearch'))
    document.getElementById('discoverCitySearch').value = city;
  if (svc || city) setTimeout(filterDiscoverProviders, 400);
});
