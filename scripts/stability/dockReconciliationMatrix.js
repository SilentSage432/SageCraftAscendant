// 🧭 dockReconciliationMatrix.js
// This module ensures each panel is correctly docked by checking DOM alignment against memory.

import { knownConsoleIds } from '../ascendancy/consolePanelMemory.js';
import { logCommandFeedback } from '../ascendancy/commandFeedback.js';

export function reconcileDockPositions() {
  knownConsoleIds.forEach(id => {
    const panel = document.getElementById(id);
    const dock = document.querySelector(`[data-dock-for="${id}"]`);

    if (!panel) {
      logCommandFeedback(`⚠️ Missing panel for ID: ${id}`);
      return;
    }

    if (!dock) {
      logCommandFeedback(`⚠️ No matching dock found for panel ID: ${id}`);
      return;
    }

    if (!dock.contains(panel)) {
      logCommandFeedback(`🔄 Re-docking panel: ${id}`);
      dock.appendChild(panel);
    }
  });

  logCommandFeedback('✅ Dock reconciliation completed.');
}
