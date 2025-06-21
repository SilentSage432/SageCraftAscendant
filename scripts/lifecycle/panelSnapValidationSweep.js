document.addEventListener("DOMContentLoaded", () => {
  const allPanels = Array.from(document.querySelectorAll('[id]'));
  const orphanedPanels = [];
  const panelsWithNoContent = [];

  allPanels.forEach(panel => {
    const id = panel.id;
    const role = panel.getAttribute('role');
    const zone = panel.getAttribute('zone');
    const status = panel.getAttribute('status');

    if (!role || role === 'undefined' || role === 'unassigned') {
      orphanedPanels.push({
        id,
        role: role || 'MISSING',
        zone: zone || 'MISSING',
        status: status || 'MISSING'
      });
    }
    if (!panel.textContent.trim()) {
      panelsWithNoContent.push({
        id,
        role: role || 'MISSING',
        zone: zone || 'MISSING',
        status: status || 'MISSING',
        reason: 'No content'
      });
    }
  });

  if (orphanedPanels.length > 0) {
    console.groupCollapsed(`🔍 Panel Snap Validation Sweep — Found ${orphanedPanels.length} orphaned panels`);
    console.table(orphanedPanels);
    console.groupEnd();
  } else {
    console.info("✅ Panel Snap Validation Sweep — All panels have valid roles");
  }

  if (panelsWithNoContent.length > 0) {
    console.groupCollapsed(`🕳️ Contentless Panels Detected — ${panelsWithNoContent.length} panels have no inner content`);
    console.table(panelsWithNoContent);
    console.groupEnd();
  } else {
    console.info("✨ All panels contain content");
  }
});

if (!window.SovereignSweep) {
  window.SovereignSweep = {};
}

window.SovereignSweep.runSnapValidation = () => {
  const event = new Event("DOMContentLoaded");
  document.dispatchEvent(event);
};