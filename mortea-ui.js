/* ============================================================
   Mortéa — UI Components
   Cookie banner, back-to-top, profile share buttons
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Cookie consent banner ─────────────────────────────────
  if (!localStorage.getItem('mortea_cookies_accepted')) {
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.style.cssText = `
      position:fixed;bottom:0;left:0;right:0;z-index:1000;
      background:rgba(7,5,4,.95);border-top:1px solid rgba(234,214,198,.14);
      backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
      padding:16px 6vw;display:flex;align-items:center;justify-content:space-between;
      gap:16px;flex-wrap:wrap;
    `;
    banner.innerHTML = `
      <p style="font-size:14px;color:#d4c4b8;margin:0;max-width:680px">
        Mortéa uses essential cookies for authentication and session management. 
        We don't use advertising cookies. 
        <a href="/privacy.html" style="color:var(--rose)">Privacy Policy</a>
      </p>
      <div style="display:flex;gap:10px;flex-shrink:0">
        <button onclick="acceptCookies()" style="background:var(--sand);color:#130d0a;border:none;border-radius:999px;padding:10px 20px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Accept</button>
        <button onclick="declineCookies()" style="background:none;border:1px solid rgba(234,214,198,.2);border-radius:999px;padding:10px 16px;font-size:14px;color:var(--muted);cursor:pointer;font-family:inherit">Decline</button>
      </div>`;
    document.body.appendChild(banner);
  }

  // ── Back to top button ─────────────────────────────────────
  const backTop = document.createElement('button');
  backTop.id = 'backToTop';
  backTop.innerHTML = '↑';
  backTop.title = 'Back to top';
  backTop.style.cssText = `
    position:fixed;bottom:80px;right:24px;z-index:90;
    width:42px;height:42px;border-radius:50%;
    background:rgba(7,5,4,.85);border:1px solid rgba(234,214,198,.2);
    color:var(--champagne);font-size:18px;cursor:pointer;
    display:none;align-items:center;justify-content:center;
    backdrop-filter:blur(10px);transition:all .2s;font-family:inherit;
  `;
  backTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  backTop.addEventListener('mouseover', () => backTop.style.borderColor='rgba(234,214,198,.4)');
  backTop.addEventListener('mouseout',  () => backTop.style.borderColor='rgba(234,214,198,.2)');
  document.body.appendChild(backTop);

  window.addEventListener('scroll', () => {
    backTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }, { passive: true });

  // ── Mobile hamburger menu ─────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Global search shortcut (Ctrl+K or Cmd+K) ─────────────
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const search = document.getElementById('discoverServiceSearch') ||
                     document.getElementById('serviceSearch');
      if (search) { search.focus(); search.select(); }
      else { window.location.href = '/discover.html'; }
    }
  });

});

// ── Cookie functions ──────────────────────────────────────────
function acceptCookies() {
  localStorage.setItem('mortea_cookies_accepted', '1');
  document.getElementById('cookieBanner')?.remove();
}

function declineCookies() {
  localStorage.setItem('mortea_cookies_accepted', '0');
  document.getElementById('cookieBanner')?.remove();
}

// ── Upgrade legacy footers ────────────────────────────────────
(function upgradeFooter() {
  const existing = document.querySelector('footer.footer');
  if (!existing) return;
  const b = location.pathname.includes('/fr/') ? '../' : '';
  const isFr = location.pathname.includes('/fr/');
  const html = `
<footer class="footer-full">
  <div class="footer-grid">
    <div class="footer-brand-col">
      <a class="brand" href="${b}index.html" style="font-size:26px">Mortéa</a>
      <p style="color:var(--muted);font-size:13px;line-height:1.7;margin-top:10px;max-width:220px">Global luxury beauty, wellness &amp; aesthetics discovery. Curated professionals worldwide.</p>
      ${isFr
        ? `<a class="lang" href="${b}index.html" style="display:inline-block;margin-top:14px;font-size:11px">EN · English</a>`
        : `<a class="lang" href="fr/index.html" style="display:inline-block;margin-top:14px;font-size:11px">FR · Français</a>`
      }
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Discover</div>
      <a href="${b}discover.html">Search professionals</a>
      <a href="${b}map.html">Map view</a>
      <a href="${b}montreal.html">Montréal</a>
      <a href="${b}dubai.html">Dubai</a>
      <a href="${b}paris.html">Paris</a>
      <a href="${b}london.html">London</a>
      <a href="${b}new-york.html">New York</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Professionals</div>
      <a href="${b}professional-onboarding.html">Join for free</a>
      <a href="${b}pricing.html">How it works</a>
      <a href="${b}login.html">Dashboard login</a>
      <a href="${b}blog.html">Journal</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Company</div>
      <a href="${b}about.html">About Mortéa</a>
      <a href="${b}contact.html">Contact</a>
      <a href="${b}terms.html">Terms of Service</a>
      <a href="${b}privacy.html">Privacy Policy</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Mortéa — Global luxury beauty discovery · Montréal, Canada</span>
  </div>
</footer>`;
  existing.insertAdjacentHTML('afterend', html);
  existing.remove();
})();

// ── Share provider profile ────────────────────────────────────
function shareProfile(name, url) {
  const shareUrl = url || window.location.href;
  const text = `Check out ${name} on Mortéa — luxury beauty discovery`;
  if (navigator.share) {
    navigator.share({ title: name, text, url: shareUrl });
  } else {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Profile link copied!');
    });
  }
}

function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:${type==='success'?'rgba(162,217,162,.15)':'rgba(217,162,162,.15)'};
    border:1px solid ${type==='success'?'rgba(162,217,162,.35)':'rgba(217,162,162,.35)'};
    color:${type==='success'?'#a8e0a8':'#e8aaaa'};
    padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600;
    z-index:999;white-space:nowrap;backdrop-filter:blur(10px)`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
