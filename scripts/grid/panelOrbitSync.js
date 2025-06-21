// 🧲 panelOrbitSync.js
// Phase 352.4 — Links each panel’s grid position to its assigned console orbit

import { getActiveConsoles } from '../ascendancy/consoleAtlas.js';

export function syncPanelOrbits() {
  const consoles = getActiveConsoles();
  consoles.forEach(consoleEl => {
    const gridRef = consoleEl.getAttribute('data-grid-sector');
    const orbitRef = consoleEl.getAttribute('data-orbit-id');

    if (gridRef && orbitRef) {
      consoleEl.setAttribute('data-synced-orbit', `${orbitRef}-${gridRef}`);
      consoleEl.classList.add('orbit-synced');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  syncPanelOrbits();
});
