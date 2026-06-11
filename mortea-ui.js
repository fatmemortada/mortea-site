/* ============================================================
   Mortéa — UI Components v2
   Cookie banner · Back-to-top · Toast system · Skip-to-content
   Hamburger nav · Scroll reveal · Lazy images · Lang switcher
   hreflang · Country detect · Footer upgrade · Search shortcut
   ============================================================ */

// ── Register Service Worker ──────────────────────────────────
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Fail silently — service worker is a progressive enhancement
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Skip-to-content (Accessibility) ──────────────────────────
  if (!document.getElementById('skipToContent')) {
    const skip = document.createElement('a');
    skip.id = 'skipToContent';
    skip.className = 'skip-to-content';
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    document.body.prepend(skip);
  }

  // Ensure main content has an id for skip link
  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'main-content';

  // ── Cookie consent banner ─────────────────────────────────────
  if (!localStorage.getItem('mortea_cookies_accepted')) {
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <p>Mortéa uses essential cookies for authentication and session management. We do not use advertising or tracking cookies. See our <a href="/privacy.html">Privacy Policy</a>.</p>
      <div class="cookie-banner-actions">
        <button class="btn primary sm" id="acceptCookiesBtn">Accept</button>
        <button class="btn secondary sm" id="declineCookiesBtn">Decline</button>
      </div>`;
    document.body.appendChild(banner);
    // Trigger animation
    requestAnimationFrame(() => banner.classList.add('show'));

    banner.querySelector('#acceptCookiesBtn').addEventListener('click', () => {
      localStorage.setItem('mortea_cookies_accepted', '1');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    });
    banner.querySelector('#declineCookiesBtn').addEventListener('click', () => {
      localStorage.setItem('mortea_cookies_accepted', '0');
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    });
  }

  // ── Back to top button ────────────────────────────────────────
  if (!document.getElementById('backToTop')) {
    const backTop = document.createElement('button');
    backTop.id = 'backToTop';
    backTop.className = 'back-to-top';
    backTop.innerHTML = '↑';
    backTop.setAttribute('aria-label', 'Back to top');
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(backTop);

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          backTop.classList.toggle('visible', window.scrollY > 500);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  // ── Toast container ───────────────────────────────────────────
  if (!document.getElementById('toastContainer')) {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // ── Mobile hamburger menu ─────────────────────────────────────
  let navToggle = document.getElementById('navToggle');
  let navLinks  = document.getElementById('navLinks') || document.querySelector('nav .nav-links');
  if (navLinks && !navLinks.id) navLinks.id = 'navLinks';
  if (navLinks && !navToggle) {
    navToggle = document.createElement('button');
    navToggle.id = 'navToggle';
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label', 'Toggle menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    const nav = navLinks.closest('nav');
    if (nav) {
      const brand = nav.querySelector('.brand');
      if (brand) brand.insertAdjacentElement('afterend', navToggle);
      else nav.prepend(navToggle);
    }
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') &&
          !navToggle.contains(e.target) &&
          !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Global search shortcut (Ctrl+K / Cmd+K) ──────────────────
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const search = document.getElementById('discoverServiceSearch') ||
                     document.getElementById('heroServiceInput') ||
                     document.getElementById('serviceSearch');
      if (search) { search.focus(); search.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      else { window.location.href = '/discover.html'; }
    }
  });

  // ── Scroll reveal animations ──────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else if (revealEls.length > 0) {
    // Fallback: reveal all immediately
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  // ── Lazy image loading ────────────────────────────────────────
  const lazyImages = document.querySelectorAll('img[data-src], img.lazy:not(.loaded)');
  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('loaded');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

  // ── External link handling ────────────────────────────────────
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes('mortea.ca') && !link.hostname.includes('localhost')) {
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
    }
  });

  // ── Active nav link highlight ─────────────────────────────────
  (function highlightActiveNav() {
    const currentPath = location.pathname.replace(/\/$/, '') || '/index.html';
    const currentFile = currentPath.split('/').pop();
    document.querySelectorAll('.nav-links a:not(.lang):not(.pill)').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href === currentFile || currentPath.endsWith(href) ||
          (currentFile === 'index.html' && (href === 'index.html' || href === '/' || href === './'))) {
        link.style.color = 'var(--sand)';
        link.style.fontWeight = '700';
      }
    });
  })();

});

// ═══════════════════════════════════════════════════════════════
// Global utility functions
// ═══════════════════════════════════════════════════════════════

// ── Toast notification system ───────────────────────────────────
function showToast(msg, type = 'success', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-msg">${msg}</span>
    <button class="toast-close" aria-label="Dismiss">×</button>`;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'opacity .25s, transform .25s';
    setTimeout(() => toast.remove(), 300);
  });

  container.appendChild(toast);
  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  // Auto-dismiss
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'opacity .25s, transform .25s';
      setTimeout(() => toast.remove(), 300);
    }
  }, duration);
}

// ── Cookie consent functions ────────────────────────────────────
window.acceptCookies = function() {
  localStorage.setItem('mortea_cookies_accepted', '1');
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 400);
  }
};

window.declineCookies = function() {
  localStorage.setItem('mortea_cookies_accepted', '0');
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 400);
  }
};

// ── Share provider profile ──────────────────────────────────────
window.shareProfile = function(name, url) {
  const shareUrl = url || window.location.href;
  const text = `Check out ${name} on Mortéa — luxury beauty discovery`;
  if (navigator.share) {
    navigator.share({ title: name, text, url: shareUrl }).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('Profile link copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Could not copy link', 'error');
    });
  }
};

// ═══════════════════════════════════════════════════════════════
// Self-executing modules (run immediately, not on DOMContentLoaded)
// ═══════════════════════════════════════════════════════════════

// ── hreflang SEO tags ───────────────────────────────────────────
(function injectHreflang() {
  const BASE  = 'https://www.mortea.ca';
  const path  = location.pathname;
  const file  = path.split('/').pop() || 'index.html';
  let enPath, frPath, arPath;

  if (path.includes('/fr/')) {
    frPath = path;
    enPath = '/' + file;
    arPath = '/ar/' + file;
  } else if (path.includes('/ar/')) {
    arPath = path;
    enPath = '/' + file;
    frPath = '/fr/' + file;
  } else {
    enPath = path === '/' ? '/index.html' : path;
    frPath = '/fr/' + file;
    arPath = '/ar/' + file;
  }

  [
    { hreflang: 'x-default', href: BASE + enPath },
    { hreflang: 'en',        href: BASE + enPath },
    { hreflang: 'fr',        href: BASE + frPath },
    { hreflang: 'ar',        href: BASE + arPath },
  ].forEach(({ hreflang, href }) => {
    const l = document.createElement('link');
    l.rel = 'alternate';
    l.setAttribute('hreflang', hreflang);
    l.href = href;
    document.head.appendChild(l);
  });
})();

// ── Country auto-detect → city suggestion banner ────────────────
(async function cityDetect() {
  if (localStorage.getItem('mortea_city_dismissed')) return;

  const CITY_MAP = {
    CA: { name: 'Montréal',  page: 'montreal.html',  flag: '🇨🇦' },
    US: { name: 'New York',  page: 'new-york.html',  flag: '🇺🇸' },
    MX: { name: 'New York',  page: 'new-york.html',  flag: '🇲🇽' },
    GB: { name: 'London',    page: 'london.html',    flag: '🇬🇧' },
    IE: { name: 'London',    page: 'london.html',    flag: '🇮🇪' },
    FR: { name: 'Paris',     page: 'paris.html',     flag: '🇫🇷' },
    BE: { name: 'Paris',     page: 'paris.html',     flag: '🇧🇪' },
    LU: { name: 'Paris',     page: 'paris.html',     flag: '🇱🇺' },
    CH: { name: 'Paris',     page: 'paris.html',     flag: '🇨🇭' },
    MC: { name: 'Paris',     page: 'paris.html',     flag: '🇲🇨' },
    MA: { name: 'Paris',     page: 'paris.html',     flag: '🇲🇦' },
    DZ: { name: 'Paris',     page: 'paris.html',     flag: '🇩🇿' },
    TN: { name: 'Paris',     page: 'paris.html',     flag: '🇹🇳' },
    SN: { name: 'Paris',     page: 'paris.html',     flag: '🇸🇳' },
    CI: { name: 'Paris',     page: 'paris.html',     flag: '🇨🇮' },
    CM: { name: 'Paris',     page: 'paris.html',     flag: '🇨🇲' },
    MG: { name: 'Paris',     page: 'paris.html',     flag: '🇲🇬' },
    IT: { name: 'Milan',     page: 'milan.html',     flag: '🇮🇹' },
    SM: { name: 'Milan',     page: 'milan.html',     flag: '🇸🇲' },
    VA: { name: 'Milan',     page: 'milan.html',     flag: '🇻🇦' },
    HR: { name: 'Milan',     page: 'milan.html',     flag: '🇭🇷' },
    SI: { name: 'Milan',     page: 'milan.html',     flag: '🇸🇮' },
    LB: { name: 'Beirut',    page: 'beirut.html',    flag: '🇱🇧' },
    SY: { name: 'Beirut',    page: 'beirut.html',    flag: '🇸🇾' },
    JO: { name: 'Beirut',    page: 'beirut.html',    flag: '🇯🇴' },
    PS: { name: 'Beirut',    page: 'beirut.html',    flag: '🇵🇸' },
    CY: { name: 'Beirut',    page: 'beirut.html',    flag: '🇨🇾' },
    AE: { name: 'Dubai',     page: 'dubai.html',     flag: '🇦🇪' },
    KW: { name: 'Dubai',     page: 'dubai.html',     flag: '🇰🇼' },
    QA: { name: 'Dubai',     page: 'dubai.html',     flag: '🇶🇦' },
    BH: { name: 'Dubai',     page: 'dubai.html',     flag: '🇧🇭' },
    OM: { name: 'Dubai',     page: 'dubai.html',     flag: '🇴🇲' },
    EG: { name: 'Dubai',     page: 'dubai.html',     flag: '🇪🇬' },
    IQ: { name: 'Dubai',     page: 'dubai.html',     flag: '🇮🇶' },
    PK: { name: 'Dubai',     page: 'dubai.html',     flag: '🇵🇰' },
    IN: { name: 'Dubai',     page: 'dubai.html',     flag: '🇮🇳' },
    LK: { name: 'Dubai',     page: 'dubai.html',     flag: '🇱🇰' },
    BD: { name: 'Dubai',     page: 'dubai.html',     flag: '🇧🇩' },
    NP: { name: 'Dubai',     page: 'dubai.html',     flag: '🇳🇵' },
    PH: { name: 'Dubai',     page: 'dubai.html',     flag: '🇵🇭' },
    SA: { name: 'Riyadh',    page: 'riyadh.html',    flag: '🇸🇦' },
    YE: { name: 'Riyadh',    page: 'riyadh.html',    flag: '🇾🇪' },
    KR: { name: 'Seoul',     page: 'seoul.html',     flag: '🇰🇷' },
    JP: { name: 'Seoul',     page: 'seoul.html',     flag: '🇯🇵' },
    TW: { name: 'Seoul',     page: 'seoul.html',     flag: '🇹🇼' },
    CN: { name: 'Seoul',     page: 'seoul.html',     flag: '🇨🇳' },
    HK: { name: 'Seoul',     page: 'seoul.html',     flag: '🇭🇰' },
    SG: { name: 'Seoul',     page: 'seoul.html',     flag: '🇸🇬' },
    MY: { name: 'Seoul',     page: 'seoul.html',     flag: '🇲🇾' },
    TH: { name: 'Seoul',     page: 'seoul.html',     flag: '🇹🇭' },
    ID: { name: 'Seoul',     page: 'seoul.html',     flag: '🇮🇩' },
    VN: { name: 'Seoul',     page: 'seoul.html',     flag: '🇻🇳' },
    // Major remaining countries → generic discover
    DE: null, ES: null, BR: null, NG: null, ET: null,
    CD: null, TR: null, IR: null, MM: null, ZA: null,
    CO: null, AR: null, KE: null, UG: null, TZ: null,
    GH: null, PE: null, VE: null, AU: null, NL: null,
    PT: null, SE: null, NO: null, DK: null, FI: null,
    AT: null, PL: null, CZ: null, RO: null, HU: null,
    GR: null, IL: null, NZ: null, CL: null, EC: null,
  };

  try {
    const res  = await fetch('https://ipapi.co/json/');
    if (!res.ok) return;
    const data = await res.json();
    const cc   = data.country_code;
    const base = location.pathname.includes('/fr/') ? '../' : '';

    let msg, cta, href;

    const city = CITY_MAP[cc];
    if (city) {
      const citySlug = city.page.replace('.html', '');
      if (location.pathname.includes(citySlug)) return;
      msg  = `${city.flag} Mortéa covers <strong style="color:var(--sand)">${city.name}</strong> — beauty &amp; aesthetics professionals near you.`;
      cta  = `Explore ${city.name}`;
      href = `${base}${city.page}`;
    } else if (CITY_MAP.hasOwnProperty(cc)) {
      // Null entry → generic banner
      msg  = `Mortéa is available near you — discover beauty &amp; aesthetics professionals worldwide.`;
      cta  = 'Search near you';
      href = `${base}discover.html`;
    } else {
      // Unrecognized country → still show generic
      msg  = `Mortéa is available near you — discover beauty &amp; aesthetics professionals worldwide.`;
      cta  = 'Search near you';
      href = `${base}discover.html`;
    }

    const bar = document.createElement('div');
    bar.id = 'cityBanner';
    bar.style.cssText = [
      'display:flex', 'align-items:center', 'justify-content:center',
      'padding:10px 6vw', 'background:rgba(217,183,162,.07)',
      'border-bottom:1px solid rgba(234,214,198,.12)',
      'font-size:13px', 'color:var(--champagne)', 'position:relative',
      'flex-wrap:wrap', 'gap:10px'
    ].join(';');

    bar.innerHTML = `
      <span>${msg}</span>
      <a href="${href}" style="background:var(--sand);color:#130d0a;border-radius:999px;padding:6px 16px;font-size:12px;font-weight:700;white-space:nowrap;text-decoration:none">${cta}</a>
      <button onclick="localStorage.setItem('mortea_city_dismissed','1');document.getElementById('cityBanner')?.remove()"
        style="position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;line-height:1;padding:4px" aria-label="Dismiss">×</button>`;

    const anchor = document.querySelector('.marquee-wrap') || document.querySelector('.nav');
    if (anchor) anchor.insertAdjacentElement('afterend', bar);
    else document.body.prepend(bar);

  } catch (_) { /* silently fail */ }
})();

// ── Upgrade legacy footers ──────────────────────────────────────
(function upgradeFooter() {
  const existing = document.querySelector('footer.footer');
  if (!existing) return;
  const b = location.pathname.includes('/fr/') ? '../' : '';
  const isFr = location.pathname.includes('/fr/');
  const year = new Date().getFullYear();
  const html = `
<footer class="footer-full">
  <div class="footer-grid">
    <div class="footer-brand-col">
      <a class="brand" href="${b}index.html" style="font-size:26px">Mortéa</a>
      <p style="color:var(--muted);font-size:13px;line-height:1.7;margin-top:10px;max-width:240px">Global luxury beauty, wellness &amp; aesthetics discovery. Curated professionals worldwide.</p>
      <div style="margin-top:16px;display:flex;gap:12px;align-items:center">
        ${isFr
          ? `<a class="lang" href="${b}index.html" style="font-size:11px">EN</a>`
          : `<a class="lang" href="fr/index.html" style="font-size:11px">FR</a>`
        }
        <a class="lang" href="${b}ar/index.html" style="font-size:11px">AR</a>
      </div>
      <!-- Newsletter -->
      <div style="margin-top:18px">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--rose);font-weight:700;margin-bottom:8px">Newsletter</div>
        <form class="newsletter-form" onsubmit="event.preventDefault();var e=this.querySelector('input');if(e.value){showToast('Welcome to Mortéa! ✨','success');e.value=''}">
          <input class="input" type="email" placeholder="Your email" style="font-size:13px;padding:10px 14px" required>
          <button class="btn primary sm" type="submit" style="white-space:nowrap">Join</button>
        </form>
      </div>
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
      <a href="${b}riyadh.html">Riyadh</a>
      <a href="${b}seoul.html">Seoul</a>
      <a href="${b}milan.html">Milan</a>
      <a href="${b}beirut.html">Beirut</a>
      <a href="${b}toronto.html">Toronto</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">For Professionals</div>
      <a href="${b}professional-onboarding.html">Join for free</a>
      <a href="${b}pricing.html">How it works</a>
      <a href="${b}login.html">Dashboard login</a>
      <a href="${b}provider.html">Provider resources</a>
      <a href="${b}blog.html">Journal</a>
      <a href="${b}referral.html">Refer a professional</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title">Company</div>
      <a href="${b}about.html">About Mortéa</a>
      <a href="${b}contact.html">Contact us</a>
      <a href="${b}blog.html">Blog</a>
      <a href="${b}reviews.html">Reviews</a>
      <a href="${b}terms.html">Terms of Service</a>
      <a href="${b}privacy.html">Privacy Policy</a>
      <a href="${b}beta.html">Beta program</a>
    </div>
  </div>
  <!-- Trust badges -->
  <div class="security-strip">
    <div class="security-badge"><span class="sb-icon">🔒</span> Stripe Secure Payments</div>
    <div class="security-badge"><span class="sb-icon">🌍</span> Local Currency Support</div>
    <div class="security-badge"><span class="sb-icon">⭐</span> Verified Reviews</div>
    <div class="security-badge"><span class="sb-icon">🛡️</span> Privacy First</div>
    <div class="security-badge"><span class="sb-icon">📱</span> Mobile Friendly</div>
  </div>
  <div class="footer-bottom">
    <span>© ${year} Mortéa — Global luxury beauty discovery · Montréal, Canada · All rights reserved.</span>
  </div>
</footer>`;
  existing.insertAdjacentHTML('afterend', html);
  existing.remove();
})();

// ── Inject AR language link into nav on EN/FR pages ─────────────
(function injectArNavLink() {
  if (location.pathname.includes('/ar/')) return;
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;
  if (navLinks.querySelector('[href*="ar/"]')) return;
  const file = location.pathname.split('/').pop() || 'index.html';
  const base = location.pathname.includes('/fr/') ? '../' : '';
  const a = document.createElement('a');
  a.className = 'lang';
  a.href = `${base}ar/${file}`;
  a.textContent = 'AR';
  const lastLang = [...navLinks.querySelectorAll('.lang')].pop();
  if (lastLang) lastLang.insertAdjacentElement('afterend', a);
  else navLinks.appendChild(a);
})();
