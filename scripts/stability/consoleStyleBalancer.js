// 🧩 consoleStyleBalancer.js
// Applies final balancing to panel styles for UI polish

import { getAllConsolePanels } from '../ascendancy/consoleAtlas.js';

export function balanceConsoleStyles() {
  const panels = getAllConsolePanels();

  panels.forEach(panel => {
    panel.style.borderRadius = '8px';
    panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    panel.style.transition = 'all 0.3s ease-in-out';

    // Optional: Apply signal-based visual tone adjustments
    const signalState = panel.getAttribute('data-signal-state');
    if (signalState === 'low') {
      panel.style.filter = 'grayscale(30%) brightness(95%)';
    } else if (signalState === 'high') {
      panel.style.filter = 'contrast(110%) saturate(120%)';
    } else {
      panel.style.filter = 'none';
    }
  });

  console.log('🎨 consoleStyleBalancer.js → Panel styles harmonized.');
}
