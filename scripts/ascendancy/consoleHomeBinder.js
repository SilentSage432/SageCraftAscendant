

// scripts/ascendancy/consoleHomeBinder.js

/**
 * Phase 351.1 — Console Home Binder
 * Binds console panels to their designated DOM homes within the UI system.
 * Ensures each known console is appended to its appropriate dock container.
 */

import { knownConsoleIds } from './consolePanelMemory.js';

export function bindConsolesToHomes() {
  knownConsoleIds.forEach(consoleId => {
    const panel = document.getElementById(consoleId);
    const dock = document.querySelector(`[data-dock-id="${consoleId}"]`);
    if (panel && dock) {
      dock.appendChild(panel);
      console.log(`✅ Bound ${consoleId} to its dock.`);
    } else {
      console.warn(`⚠️ Could not bind ${consoleId} — Panel or Dock missing.`);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindConsolesToHomes();
});