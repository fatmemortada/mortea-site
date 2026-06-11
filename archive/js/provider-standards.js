// Mortéa Phase 35 — Provider Standards

function checkProviderStandards(provider) {
  return {
    has_profile_photo: !!provider.profile_photo,
    has_services: provider.services_count > 0,
    has_location: !!provider.city,
    has_verified_contact: !!provider.verified_contact
  };
}
