// Mortéa Phase 33 — Structured Schema Markup

function generateProviderSchema(provider) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": provider.name,
    "address": provider.address,
    "telephone": provider.phone
  };
}\n