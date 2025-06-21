// Phase 351.4 — Console Anomaly Scanner Deployment
// Scans the DOM for console panel anomalies such as duplicates, orphaned nodes, or corrupted states.

const ConsoleAnomalyScanner = (() => {
  function scan() {
    const anomalies = [];
    const panels = document.querySelectorAll('[id$="Console"]');

    panels.forEach(panel => {
      const duplicates = document.querySelectorAll(`#${panel.id}`);
      if (duplicates.length > 1) {
        anomalies.push({
          type: 'Duplicate ID',
          id: panel.id,
          count: duplicates.length
        });
      }

      if (!panel.parentElement) {
        anomalies.push({
          type: 'Orphaned Panel',
          id: panel.id
        });
      }

      if (panel.innerHTML.trim() === '') {
        anomalies.push({
          type: 'Empty Panel',
          id: panel.id
        });
      }
    });

    console.log('🔍 Console Anomaly Scanner Report:', anomalies);
    return anomalies;
  }

  return {
    scan
  };
})();

// Optional: Run on load
document.addEventListener('DOMContentLoaded', () => {
  ConsoleAnomalyScanner.scan();
});
