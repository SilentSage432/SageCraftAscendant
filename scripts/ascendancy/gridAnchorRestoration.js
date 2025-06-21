

// 🧭 Phase 355.6 — Sovereign Grid Anchor Restoration Handler

import { knownConsoleIds } from './consolePanelMemory.js';

export function restoreDetachedPanels() {
  knownConsoleIds.forEach(id => {
    const panel = document.getElementById(id);
    const anchor = document.querySelector(`[data-anchor="${id}"]`);

    if (panel && anchor && !anchor.contains(panel)) {
      anchor.appendChild(panel);
      console.log(`🔁 Panel ${id} re-anchored to its sovereign grid node.`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  restoreDetachedPanels();
});