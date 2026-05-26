// Mortéa Phase 29 — Language Switcher

function switchLanguage(language) {
  localStorage.setItem("mortea_language", language);
  location.reload();
}
