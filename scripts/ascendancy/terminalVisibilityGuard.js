// terminalVisibilityGuard.js
// Ensures terminals remain visible during dynamic UI transitions and grid mutations

export function enforceTerminalVisibility() {
  const terminalPanels = document.querySelectorAll('.terminal-panel');

  terminalPanels.forEach(panel => {
    if (panel.style.display === 'none' || panel.classList.contains('hidden')) {
      panel.style.display = 'block';
      panel.classList.remove('hidden');
    }

    // Optional: ensure z-index remains high during UI shifts
    panel.style.zIndex = 999;
  });

  console.log('🛡️ Terminal Visibility Guard Activated');
}

// Automatically enforce on load
document.addEventListener('DOMContentLoaded', () => {
  enforceTerminalVisibility();
});
