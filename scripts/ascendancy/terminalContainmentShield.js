

// 🛡️ Terminal Containment Shield — Phase 356.0
// Ensures terminal elements remain within their display zones and do not bleed into unauthorized regions.

export function activateTerminalShield() {
  const terminalPanels = document.querySelectorAll('.terminal-panel');

  terminalPanels.forEach(panel => {
    panel.style.overflow = 'hidden';
    panel.style.maxWidth = '100%';
    panel.style.maxHeight = '100%';
    panel.style.border = '2px solid var(--terminal-boundary-color, #888)';
    panel.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  });

  console.log('🛡️ Terminal Containment Shield engaged for all terminal panels.');
}

document.addEventListener('DOMContentLoaded', activateTerminalShield);