/* Mortéa — Client-side checkout completion helper */
async function activatePendingMorteaProfile() {
  const raw = localStorage.getItem('mortea_pending_checkout');
  const params = new URLSearchParams(window.location.search);
  let state = null;

  try { state = raw ? JSON.parse(raw) : null; } catch (_) { state = null; }

  const providerId = params.get('provider') || state?.providerId;
  const email = params.get('email') || state?.email;
  const plan = params.get('plan') || state?.plan;
  const billingCycle = params.get('billing') || state?.billingCycle;

  if (!providerId && !email) return { ok: false, reason: 'missing-profile-reference' };
  if (typeof supabaseClient === 'undefined') return { ok: false, reason: 'supabase-not-ready' };

  const updates = {
    status: 'approved',
    membership_plan: plan || 'professional',
    billing_cycle: billingCycle || 'monthly',
    subscription_status: 'active',
    activated_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  let query = supabaseClient.from('professionals').update(updates);
  query = providerId ? query.eq('id', providerId) : query.eq('email', email);
  const { error } = await query;

  if (error) return { ok: false, reason: error.message };
  localStorage.removeItem('mortea_pending_checkout');
  return { ok: true, providerId, email, plan: updates.membership_plan };
}
