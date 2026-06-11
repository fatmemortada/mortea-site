// Mortéa Phase 21 — Client Preference Storage

function saveClientPreferences(preferences) {
  localStorage.setItem("mortea_client_preferences", JSON.stringify(preferences));
}

function getClientPreferences() {
  const saved = localStorage.getItem("mortea_client_preferences");
  return saved ? JSON.parse(saved) : {};
}
