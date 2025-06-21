

// ✅ Phase 353.4 — Grid Element Consistency Enforcer

export function enforceConsoleGridConsistency() {
  const consoleGrids = document.querySelectorAll('.console-grid');

  consoleGrids.forEach((grid, index) => {
    const panels = grid.querySelectorAll('.holo-console');

    panels.forEach((panel, panelIndex) => {
      // Ensure each panel has a unique ID if not already set
      if (!panel.id) {
        panel.id = `console-panel-${index}-${panelIndex}`;
      }

      // Add a standardized class if missing
      if (!panel.classList.contains('holo-console')) {
        panel.classList.add('holo-console');
      }

      // Assign data attributes for grid mapping
      panel.dataset.gridIndex = index;
      panel.dataset.panelIndex = panelIndex;
    });
  });

  console.log('✅ Grid Element Consistency Enforcer: Complete');
}