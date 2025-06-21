// 🧭 Phase 356.2 — Console Dock Relinker

import { knownConsoleIds } from './consolePanelMemory.js';

export function relinkConsolesToDock() {
  knownConsoleIds.forEach(consoleId => {
    const consoleEl = document.getElementById(consoleId);
    const targetDock = document.querySelector(`[data-dock="${consoleId}"]`);

    if (consoleEl && targetDock) {
      targetDock.appendChild(consoleEl);
      console.log(`✅ Console ${consoleId} re-docked to its target container.`);
    } else {
      console.warn(`⚠️ Missing console or dock for ${consoleId}`);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  relinkConsolesToDock();
});
