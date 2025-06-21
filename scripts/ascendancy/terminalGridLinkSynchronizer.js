// 🧩 Phase 353.2 — Terminal Grid Link Synchronizer

import { ConsolePanelMemory } from './consolePanelMemory.js';
import { syncPanelToGrid } from './consoleGridEngine.js';

document.addEventListener('DOMContentLoaded', () => {
  const terminals = ConsolePanelMemory.getTerminalPanels();

  terminals.forEach(terminalId => {
    syncPanelToGrid(terminalId);
  });

  console.log('[🧭 Terminal Grid Link Synchronizer] Terminals aligned to grid.');
});
