

// 🛡️ uiRecoveryPulse.js
// Description: Monitors UI grid alignment and reapplies corrective positioning to drifting or jittering panels.

import { getAllGridNodes } from '../ascendancy/consoleGridBinder.js';
import { stabilizePanelPosition } from '../stability/consoleUIMender.js';

function emitRecoveryPulse() {
  const nodes = getAllGridNodes();

  nodes.forEach(node => {
    if (!node.classList.contains('anchored')) {
      stabilizePanelPosition(node);
    }
  });
}

// Activate pulse every 2 seconds
setInterval(emitRecoveryPulse, 2000);

console.log('🩺 UI Recovery Pulse Activated');