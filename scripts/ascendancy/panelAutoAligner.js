// 🧭 Phase 353.2 — Sovereign Panel Auto-Alignment Engine

import { knownConsoleIds } from './consolePanelMemory.js';

export function autoAlignPanels() {
  const panels = document.querySelectorAll('.holo-console');

  panels.forEach(panel => {
    const id = panel.id;
    if (!knownConsoleIds.includes(id)) return;

    // Simple alignment logic based on anchor positioning presets
    const anchor = document.querySelector(`[data-anchor="${id}"]`);
    if (!anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    panel.style.position = 'absolute';
    panel.style.left = `${anchorRect.left}px`;
    panel.style.top = `${anchorRect.top}px`;
    panel.style.opacity = 1;
  });
}

// Auto-align after DOM is ready
document.addEventListener('DOMContentLoaded', autoAlignPanels);
