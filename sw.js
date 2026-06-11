/* ============================================================
   Mortéa — Service Worker
   Caches static assets for performance + basic offline page
   ============================================================ */

const CACHE_NAME = 'mortea-v3-' + '20260611';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/discover.html',
  '/map.html',
  '/blog.html',
  '/login.html',
  '/pricing.html',
  '/about.html',
  '/contact.html',
  '/professional-onboarding.html',
  '/404.html',
  '/style.css',
  '/mobile.css',
  '/mortea-ui.js',
  '/supabase-config.js',
  '/auth.js',
  '/script.js',
  '/manifest.json',
];

// Install — precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Individual failures shouldn't break the SW
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch — cache-first for static, network-first for HTML
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and external requests
  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // Skip Supabase API calls
  if (url.pathname.includes('/rest/v1/') || url.pathname.includes('/auth/')) return;

  // HTML pages — network-first, fallback to cache
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('/404.html')))
    );
    return;
  }

  // Static assets — cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
