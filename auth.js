/* ============================================================
   Mortéa — Auth Module
   Supabase Auth: signup, login, logout, session management
   ============================================================ */

const MorteaAuth = (() => {

  // ── Sign Up (new professional or client) ──────────────────
  async function signUp(email, password, meta = {}) {
    const { data, error } = await supabaseClient.auth.signUp({
      email, password,
      options: { data: meta }
    });
    return { data, error };
  }

  // ── Sign In ───────────────────────────────────────────────
  async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email, password
    });
    return { data, error };
  }

  // ── Sign Out ──────────────────────────────────────────────
  async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) window.location.href = '/index.html';
  }

  // ── Get current session ───────────────────────────────────
  async function getSession() {
    const { data } = await supabaseClient.auth.getSession();
    return data?.session || null;
  }

  // ── Get current user ──────────────────────────────────────
  async function getUser() {
    const { data } = await supabaseClient.auth.getUser();
    return data?.user || null;
  }

  // ── Update nav UI based on auth state ────────────────────
  function updateNavUI(user) {
    const accessLink = document.querySelector('.nav-links a[href="login.html"], .nav-links a[href="../login.html"]');
    if (!accessLink) return;
    if (user) {
      accessLink.textContent = 'Dashboard';
      accessLink.href = accessLink.href.includes('../') ? '../provider-dashboard.html' : 'provider-dashboard.html';
    } else {
      accessLink.textContent = 'Access';
      accessLink.href = accessLink.href.includes('provider-dashboard') ? 'login.html' : accessLink.href;
    }
  }

  // ── Init: listen to auth changes & update nav ─────────────
  function init() {
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      updateNavUI(session?.user || null);
    });
    getUser().then(updateNavUI);
  }

  // ── Require auth — redirect to login if not authed ────────
  async function requireAuth(redirectTo = 'login.html') {
    const user = await getUser();
    if (!user) {
      window.location.href = redirectTo + '?next=' + encodeURIComponent(window.location.pathname);
      return null;
    }
    return user;
  }

  return { signUp, signIn, signOut, getSession, getUser, updateNavUI, init, requireAuth };
})();

// Auto-init when loaded
document.addEventListener('DOMContentLoaded', () => {
  if (typeof supabaseClient !== 'undefined') MorteaAuth.init();
});
