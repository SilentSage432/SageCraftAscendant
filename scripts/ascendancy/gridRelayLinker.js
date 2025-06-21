

// gridRelayLinker.js
// Phase 355.1 — Sovereign Grid Relay Linker Injection
// Purpose: Bind grid positions to corresponding console panels and allow dynamic routing.

export function bindGridToPanel(gridMap, panelRegistry) {
  if (!gridMap || !panelRegistry) {
    console.warn('GridRelayLinker: Missing grid map or panel registry.');
    return;
  }

  Object.entries(gridMap).forEach(([gridId, panelId]) => {
    const gridElement = document.getElementById(gridId);
    const panelElement = document.getElementById(panelId);

    if (gridElement && panelElement) {
      gridElement.addEventListener('click', () => {
        panelRegistry.activatePanel(panelId);
        console.log(`GridRelayLinker: Routed ${gridId} to ${panelId}`);
      });
    } else {
      console.warn(`GridRelayLinker: Invalid grid or panel reference → ${gridId}, ${panelId}`);
    }
  });
}