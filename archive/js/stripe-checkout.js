/* Mortéa — Stripe Payment Links Version */
const MORTEA_PAYMENT_LINKS = {
  independent: 'https://buy.stripe.com/aFa5kwadZ2ob58davF3VC05',
  professional: 'https://buy.stripe.com/14AaEQ71N2ob1W147h3VC00',
  creator: 'https://buy.stripe.com/aFa7sE5XJd2PdEJ9rB3VC03'
};

async function startStripeCheckout(plan, email) {
  const url = MORTEA_PAYMENT_LINKS[plan];
  if (!url) {
    console.error('Unknown plan:', plan);
    return false;
  }

  try {
    const checkoutUrl = new URL(url);
    if (email) checkoutUrl.searchParams.set('prefilled_email', email);
    window.location.href = checkoutUrl.toString();
    return true;
  } catch (error) {
    console.error('Stripe payment link error:', error);
    return false;
  }
}

// Handle post-checkout success banner on pages that redirect with ?subscribed=1
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('subscribed') !== '1') return;

  const banner = document.createElement('div');
  banner.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:rgba(162,217,162,.15);border:1px solid rgba(162,217,162,.35);
    color:#a8e0a8;padding:14px 24px;border-radius:999px;font-size:14px;
    font-weight:600;z-index:999;backdrop-filter:blur(10px);
  `;
  banner.textContent = '✓ Membership activated! Welcome to Mortéa.';
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 5000);
});
