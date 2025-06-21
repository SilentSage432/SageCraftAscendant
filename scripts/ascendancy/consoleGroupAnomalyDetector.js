/**
 * Phase 353.1 — Console Group Anomaly Detector
 * Detects and logs inconsistencies or unexpected states across console group bindings.
 */

export function detectGroupAnomalies() {
  const groups = document.querySelectorAll('[data-console-group]');
  const anomalies = [];

  groups.forEach(group => {
    const expectedId = group.getAttribute('data-console-group');
    const actualId = group.id || 'undefined';

    if (actualId !== expectedId) {
      anomalies.push({
        element: group,
        expected: expectedId,
        found: actualId
      });
    }
  });

  if (anomalies.length > 0) {
    console.warn('Console Group Anomalies Detected:', anomalies);
  } else {
    console.log('✅ No console group anomalies detected.');
  }
}

// Optional: Run on load
document.addEventListener('DOMContentLoaded', () => {
  detectGroupAnomalies();
});
