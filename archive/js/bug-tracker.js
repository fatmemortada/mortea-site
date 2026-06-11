// Mortéa Phase 36 — Bug Tracker

function createBugReport(title, severity) {
  return {
    title,
    severity,
    created_at: new Date().toISOString()
  };
}
