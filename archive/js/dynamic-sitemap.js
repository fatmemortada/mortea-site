// Mortéa Phase 33 — Dynamic Sitemap

function generateSitemap(providers = []) {
  return providers.map(provider => `/provider/${provider.slug}`);
}\n