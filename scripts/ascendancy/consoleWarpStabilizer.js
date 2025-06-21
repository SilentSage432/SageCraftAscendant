

// consoleWarpStabilizer.js
// Phase 351.2 — Console Warp Stabilizer Deployment

export function stabilizeConsoleWarp() {
  const panels = document.querySelectorAll('.console-panel');

  panels.forEach(panel => {
    const gridArea = panel.dataset.gridArea;
    if (!gridArea) {
      console.warn(`Panel ${panel.id || '[unnamed]'} missing data-grid-area. Assigning fallback zone.`);
      panel.dataset.gridArea = 'unassigned-zone';
    }

    // Apply warp-stabilizing class to ensure grid cohesion
    panel.classList.add('warp-stabilized');
  });

  console.log('[⚙️] Console Warp Stabilizer initialized.');
}

// Auto-invoke on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  stabilizeConsoleWarp();
});