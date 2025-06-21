

// panelSnapRehydrator.js
// Phase 1 of Snap Logic + Recovery Cluster

import { knownConsoleIds } from './consolePanelMemory.js';

export function rehydratePanelSnaps() {
  document.addEventListener("DOMContentLoaded", () => {
    knownConsoleIds.forEach(id => {
      const panel = document.getElementById(id);
      if (!panel) return;

      const snapData = localStorage.getItem(`snapPosition_${id}`);
      if (!snapData) return;

      try {
        const { top, left } = JSON.parse(snapData);
        panel.style.top = top;
        panel.style.left = left;
        panel.style.position = 'absolute';
      } catch (e) {
        console.warn(`Snap data corrupted for panel ${id}:`, e);
      }
    });
  });
}