const providerClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function getProviderNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('name');
}

async function loadProvider() {
  const providerName = getProviderNameFromUrl();

  if (!providerName) {
    document.getElementById('provider-name').textContent = 'Provider not found';
    return;
  }

  const { data, error } = await providerClient
    .from('professionals')
    .select('*')
    .eq('business_name', providerName)
    .single();

  if (error || !data) {
    document.getElementById('provider-name').textContent = 'Provider unavailable';
    return;
  }

  document.getElementById('provider-name').textContent = data.business_name || 'Mortéa Provider';
  document.getElementById('provider-description').textContent = data.description || 'Luxury wellness provider on Mortéa.';
  document.getElementById('provider-category').textContent = data.category || 'Luxury Wellness';
  document.getElementById('provider-city').textContent = data.city || 'Canada';
  document.getElementById('provider-plan').textContent = data.plan_type || 'Professional';

  if (data.booking_link) {
    document.getElementById('provider-booking').href = data.booking_link;
  }

  if (data.instagram) {
    document.getElementById('provider-instagram').href = data.instagram;
  }

  loadReviews(data.business_name);
}

async function loadReviews(providerName) {
  const reviewsContainer = document.getElementById('provider-reviews');

  const { data, error } = await providerClient
    .from('reviews')
    .select('*')
    .eq('provider_name', providerName)
    .eq('status', 'approved');

  if (error || !data || data.length === 0) {
    reviewsContainer.innerHTML = `
      <div class="review-item">
        <strong>No reviews yet</strong>
        <span>★★★★★</span>
        <p>This provider has not received public reviews yet.</p>
      </div>
    `;
    return;
  }

  reviewsContainer.innerHTML = '';

  data.forEach((review) => {
    const item = document.createElement('div');
    item.className = 'review-item';

    item.innerHTML = `
      <strong>${review.client_name || 'Mortéa Client'}</strong>
      <span>${'★'.repeat(review.rating || 5)}</span>
      <p>${review.review_text || ''}</p>
    `;

    reviewsContainer.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', loadProvider);
