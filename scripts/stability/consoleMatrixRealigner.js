

// 🧠 consoleMatrixRealigner.js
// Final stability pass to ensure panels align correctly within the console matrix grid.

import { getActivePanels } from '../ascendancy/consoleAtlas.js';
import { getGridBounds, adjustPanelToGrid } from '../ascendancy/consoleGridBinder.js';
import { logCommandFeedback } from '../ascendancy/commandFeedback.js';

export function realignConsoleMatrix() {
  const panels = getActivePanels();
  const gridBounds = getGridBounds();

  panels.forEach(panel => {
    const currentBounds = panel.getBoundingClientRect();
    const expectedBounds = gridBounds[panel.id];

    if (!expectedBounds) {
      logCommandFeedback(`⚠️ No expected bounds found for panel: ${panel.id}`);
      return;
    }

    const misaligned =
      Math.abs(currentBounds.left - expectedBounds.left) > 2 ||
      Math.abs(currentBounds.top - expectedBounds.top) > 2;

    if (misaligned) {
      adjustPanelToGrid(panel.id, expectedBounds.left, expectedBounds.top);
      logCommandFeedback(`🔄 Realigned panel ${panel.id} to expected grid position.`);
    }
  });
}

// Auto-engage after short delay to allow other sync processes to settle.
window.addEventListener('load', () => {
  setTimeout(() => {
    realignConsoleMatrix();
  }, 1000);
});