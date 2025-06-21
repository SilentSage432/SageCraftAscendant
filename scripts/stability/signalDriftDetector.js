// 🛰️ signalDriftDetector.js
// Monitors for grid-based panel drift and reports anomalies for correction.

import { getGridBounds } from '../ascendancy/consoleGridBinder.js';
import { getActiveConsoles } from '../ascendancy/consoleAtlas.js';
import { logCommandFeedback } from '../ascendancy/commandFeedback.js';

export function detectSignalDrift() {
  const gridBounds = getGridBounds();
  const activeConsoles = getActiveConsoles();

  activeConsoles.forEach(console => {
    const { x, y } = console.position;
    const withinBounds =
      x >= gridBounds.minX &&
      x <= gridBounds.maxX &&
      y >= gridBounds.minY &&
      y <= gridBounds.maxY;

    if (!withinBounds) {
      logCommandFeedback(`⚠️ Drift detected: Console "${console.id}" is outside grid bounds.`);
      // Future enhancement: auto-correct logic
    }
  });
}

// Optional: Periodic monitoring (can be removed if controlled externally)
setInterval(() => {
  detectSignalDrift();
}, 4000);
