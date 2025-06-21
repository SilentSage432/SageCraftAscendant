

import { knownConsoleIds } from './consolePanelMemory.js';
import { rebindConsoleToGroup } from './panelDockBinder.js';
import { logCommandFeedback } from './commandFeedback.js';

export function initializeConsoleRecovery() {
  console.groupCollapsed('%c🔁 Console Recovery Routine', 'color: limegreen; font-weight: bold;');

  let recovered = 0;
  let anomalies = 0;

  knownConsoleIds.forEach(consoleId => {
    const el = document.getElementById(consoleId);
    if (el) {
      if (!el.closest('#consolePanelGroup')) {
        rebindConsoleToGroup(el);
        recovered++;
        console.log(`✅ Rebound console: ${consoleId}`);
      }
    } else {
      anomalies++;
      console.warn(`⚠️ Missing console: ${consoleId}`);
    }
  });

  logCommandFeedback(`🔄 Recovery complete. Consoles rebound: ${recovered}, Anomalies: ${anomalies}`);

  console.groupEnd();
}

// Optional: auto-run on load
window.addEventListener('DOMContentLoaded', () => {
  initializeConsoleRecovery();
});