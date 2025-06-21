// 🧲 terminalSnapDiagnostics.js
// Monitors terminal panels for magnetic grid alignment issues.

import { ConsolePanelMemory } from '../ascendancy/consolePanelMemory.js';
const getTerminalPanels = ConsolePanelMemory.getTerminalPanels;
import { isPanelSnapped } from './consoleUIMender.js';
import { logCommandFeedback } from '../ascendancy/commandFeedback.js';

export function diagnoseTerminalSnaps() {
  const terminals = getTerminalPanels();
  let issuesFound = 0;

  terminals.forEach(panel => {
    const snapped = isPanelSnapped(panel);
    if (!snapped) {
      issuesFound++;
      logCommandFeedback(`🧠 Drift detected: Panel '${panel.id}' is unsnapped or misaligned.`);
    }
  });

  if (issuesFound === 0) {
    logCommandFeedback('✅ All terminal panels are snapped correctly to the magnetic grid.');
  }
}
