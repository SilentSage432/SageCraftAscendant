

// === Phase 339.0 — Panel Cleanup: De-duplicate & Restore Canonical Panels ===
console.log("🧽 Phase 339.0 — Panel Sanitizer Activated");

const knownPanelIds = [
  "countConsole", "deltaAnalyzerConsole", "reportingHubConsole",
  "sessionManagerConsole", "utilityHubConsole", "oracleConsole",
  "sageFeedConsole", "grimoireConsole", "whispererConsole",
  "exceptionManagerConsole", "progressDashboardConsole",
  "masterExportHubConsole", "mappingsConsole", "toolsConsole",
  "auditConsole"
];

knownPanelIds.forEach(id => {
  const nodes = document.querySelectorAll(`#${id}`);
  if (nodes.length > 1) {
    let primary = null;
    let maxLength = -1;

    nodes.forEach(node => {
      const contentLength = node.innerHTML.trim().length;
      if (contentLength > maxLength) {
        maxLength = contentLength;
        primary = node;
      }
    });

    nodes.forEach(node => {
      if (node !== primary) {
        console.warn(`🧹 Removing duplicate panel: #${id}`);
        node.remove();
      }
    });
  }
});

console.log("✅ Phase 339.0 — Duplicate panels cleaned");