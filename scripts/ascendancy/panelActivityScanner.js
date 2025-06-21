// panelActivityScanner.js
// Phase 356.4 — Panel Activity Scanner & Log Trace Mapper

export function scanPanelActivity() {
  const panels = document.querySelectorAll('.holo-console');
  const activityLog = [];

  panels.forEach(panel => {
    const id = panel.id || 'unknown';
    const isVisible = panel.style.display !== 'none';
    const isActive = panel.classList.contains('active');

    activityLog.push({
      id,
      isVisible,
      isActive,
      timestamp: new Date().toISOString()
    });
  });

  console.log('[Panel Activity Scanner]', activityLog);
  return activityLog;
}
