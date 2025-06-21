// scripts/ascendancy/gridNodeRestorer.js
import { getAllGridNodes, refreshNodeSignal } from '../ascendancy/consoleGridBinder.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const gridNodes = getAllGridNodes();

    gridNodes.forEach((node) => {
      refreshNodeSignal(node);
    });

    console.log('[GridNodeRestorer] Signal restoration complete for all grid nodes.');
  } catch (error) {
    console.error('[GridNodeRestorer] Failed to restore grid node signals:', error);
  }
});
