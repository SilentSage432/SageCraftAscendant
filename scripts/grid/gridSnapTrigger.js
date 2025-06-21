// 🧲 gridSnapTrigger.js
// Activates magnetic snapping behavior for grid-aligned panels in real-time

import { getAllGridNodes, snapToNearestGrid } from '../ascendancy/consoleGridBinder.js';
import { updatePanelPosition } from '../ascendancy/consolePanelMemory.js';

console.log('🧲 gridSnapTrigger.js engaged');

document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    panel.addEventListener('pointerup', () => {
      const snapped = snapToNearestGrid(panel);
      if (snapped) {
        updatePanelPosition(panel.id, snapped);
      }
    });
  });
});
