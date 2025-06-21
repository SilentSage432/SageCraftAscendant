import { knownConsoleIds } from '../wiring/consolePanelMemory.js';

export function rehydratePanelMemory() {
  console.groupCollapsed('%c💾 Panel Memory Rehydration', 'color: dodgerblue; font-weight: bold;');

  knownConsoleIds.forEach(consoleId => {
    const panel = document.getElementById(consoleId);
    if (!panel) {
      console.warn(`⚠️ Panel not found: ${consoleId}`);
      return;
    }

    try {
      const savedState = JSON.parse(localStorage.getItem(`panelState::${consoleId}`));
      if (savedState) {
        if (savedState.visible) {
          panel.style.display = 'block';
          panel.style.opacity = '1';
          panel.style.visibility = 'visible';
        } else {
          panel.style.display = 'none';
        }

        if (savedState.customStyles) {
          Object.entries(savedState.customStyles).forEach(([key, value]) => {
            panel.style[key] = value;
          });
        }

        console.log(`✅ Rehydrated: ${consoleId}`);
      } else {
        console.log(`ℹ️ No saved state for: ${consoleId}`);
      }
    } catch (err) {
      console.error(`❌ Error restoring ${consoleId}:`, err);
    }
  });

  console.groupEnd();
}

// Optional: Run automatically on load
window.addEventListener('DOMContentLoaded', () => {
  rehydratePanelMemory();
});
