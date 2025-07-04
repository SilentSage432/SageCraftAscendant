

// consoleVisibilitySweep.js
// Phase 351.5 — Resurrection Finalization & Console Visibility Sweep

import { knownConsoleIds } from './consolePanelMemory.js';

export function performVisibilitySweep() {
  knownConsoleIds.forEach(consoleId => {
    const panel = document.getElementById(consoleId);
    if (panel) {
      if (consoleId === 'whispererConsole') {
        console.warn('⛔️ Visibility sweep skipped for whispererConsole');
        return;
      }
      panel.style.display = 'none'; // Hide all by default
      panel.classList.remove('active');
    }
  });

  // Optionally show a default panel if one exists
  const defaultPanel = document.getElementById('sovereignTerminal');
  if (defaultPanel) {
    defaultPanel.style.display = 'block';
    defaultPanel.classList.add('active');
  }

  console.log('[Sweep] Console panel visibility reset and default initialized.');
}

document.addEventListener('DOMContentLoaded', () => {
  performVisibilitySweep();
});