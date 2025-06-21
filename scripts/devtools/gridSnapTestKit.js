

// 🧪 gridSnapTestKit.js
// Development utility to visualize grid zones and test snap logic

import { getAllGridNodes } from '../ascendancy/consoleGridBinder.js';
import { snapToNearestGrid } from '../ascendancy/consoleGridBinder.js';
import { getActivePanels } from '../ascendancy/consoleAtlas.js';

export function activateGridSnapTestMode() {
  const gridNodes = getAllGridNodes();
  const panels = getActivePanels();

  console.group('%c🧪 Grid Snap Test Mode Activated', 'color: magenta; font-weight: bold;');

  panels.forEach(panel => {
    const snapResult = snapToNearestGrid(panel, gridNodes);
    console.log(`Panel ${panel.id} snapped to:`, snapResult);
  });

  console.groupEnd();
}